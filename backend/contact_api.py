import os
import re
import smtplib
import html
from email.mime.multipart import MIMEMultipart
from email.mime.text      import MIMEText
from datetime             import datetime

from fastapi                import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses      import JSONResponse
from pydantic               import BaseModel, EmailStr, field_validator
from dotenv                 import load_dotenv

from slowapi              import Limiter, _rate_limit_exceeded_handler
from slowapi.util         import get_remote_address
from slowapi.errors       import RateLimitExceeded

load_dotenv()

SMTP_HOST      = os.getenv("SMTP_HOST",      "smtp.gmail.com")
SMTP_PORT      = int(os.getenv("SMTP_PORT",  "587"))
SMTP_USER      = os.getenv("SMTP_USER",      "")
SMTP_PASS      = os.getenv("SMTP_PASS",      "")
TO_EMAIL       = os.getenv("TO_EMAIL",       "akashkundu7487@gmail.com")
ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN", "http://localhost:5173")

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Akash Kundu — Contact API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins  = [ALLOWED_ORIGIN, "http://localhost:5173"],
    allow_methods  = ["POST", "OPTIONS"],
    allow_headers  = ["Content-Type", "Accept"],
)

class ContactMessage(BaseModel):
    name:    str
    email:   EmailStr
    message: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2 or len(v) > 80:
            raise ValueError("Name must be 2–80 characters")
        return html.escape(v)

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 10 or len(v) > 2000:
            raise ValueError("Message must be 10–2000 characters")
        return html.escape(v)

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip().lower()

        blocked = {"mailinator.com", "guerrillamail.com", "tempmail.com"}
        domain  = v.split("@")[-1]
        if domain in blocked:
            raise ValueError("Disposable email addresses are not accepted")
        return v

def send_email(msg: ContactMessage) -> None:
    subject = f"[Portfolio] New message from {msg.name}"
    timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")

    html_body = f"""
    <html><body style="font-family:sans-serif;color:#1a1a2e;max-width:600px;margin:0 auto;padding:2rem">
      <h2 style="color:#4fa3ff;border-bottom:2px solid #4fa3ff;padding-bottom:.5rem">
        New Portfolio Contact
      </h2>
      <table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
        <tr><td style="padding:.5rem;color:#666;width:100px;vertical-align:top"><strong>From</strong></td>
            <td style="padding:.5rem">{msg.name}</td></tr>
        <tr><td style="padding:.5rem;color:#666;vertical-align:top"><strong>Email</strong></td>
            <td style="padding:.5rem"><a href="mailto:{msg.email}">{msg.email}</a></td></tr>
        <tr><td style="padding:.5rem;color:#666;vertical-align:top"><strong>Time</strong></td>
            <td style="padding:.5rem">{timestamp}</td></tr>
      </table>
      <div style="background:#f8f9ff;border-left:4px solid #4fa3ff;padding:1rem 1.5rem;border-radius:4px;margin:1rem 0">
        <strong style="color:#666;font-size:.8rem;text-transform:uppercase;letter-spacing:.1em">Message</strong>
        <p style="margin:.5rem 0 0;line-height:1.7;white-space:pre-wrap">{msg.message}</p>
      </div>
      <p style="font-size:.75rem;color:#999;margin-top:2rem">
        Sent from akashkundu.me contact form
      </p>
    </body></html>
    """

    email = MIMEMultipart("alternative")
    email["Subject"] = subject
    email["From"]    = SMTP_USER
    email["To"]      = TO_EMAIL
    email["Reply-To"]= msg.email
    email.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.ehlo()
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SMTP_USER, [TO_EMAIL], email.as_string())

@app.post("/api/contact")
@limiter.limit("5/minute")
async def contact(request: Request, msg: ContactMessage):
    if not SMTP_USER or not SMTP_PASS:
        raise HTTPException(
            status_code=503,
            detail="Email service not configured — set SMTP_USER and SMTP_PASS"
        )

    try:
        send_email(msg)
    except smtplib.SMTPAuthenticationError:
        raise HTTPException(status_code=500, detail="SMTP authentication failed")
    except smtplib.SMTPException as exc:
        raise HTTPException(status_code=500, detail=f"SMTP error: {exc}")
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Failed to send email")

    return JSONResponse({"ok": True, "message": "Message delivered successfully"})

@app.get("/health")
async def health():
    return {"status": "ok", "smtp_configured": bool(SMTP_USER and SMTP_PASS)}
