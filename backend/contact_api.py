import html
import logging
import os
import re
import smtplib
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Set

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, Field, field_validator
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

# Configure structured logging
logger = logging.getLogger("contact_api")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)

load_dotenv()

# Configuration constants
DEFAULT_SMTP_HOST = "smtp.gmail.com"
DEFAULT_SMTP_PORT = 587
DEFAULT_SMTP_TIMEOUT_SECONDS = 10
DEFAULT_RECIPIENT_EMAIL = "akashkundu7487@gmail.com"
DEFAULT_ALLOWED_ORIGIN = "http://localhost:5173"

SMTP_HOST: str = os.getenv("SMTP_HOST", DEFAULT_SMTP_HOST)
try:
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", str(DEFAULT_SMTP_PORT)))
except ValueError:
    SMTP_PORT = DEFAULT_SMTP_PORT

SMTP_USER: str = os.getenv("SMTP_USER", "").strip()
SMTP_PASS: str = os.getenv("SMTP_PASS", "").strip()
TO_EMAIL: str = os.getenv("TO_EMAIL", DEFAULT_RECIPIENT_EMAIL).strip()
ALLOWED_ORIGIN: str = os.getenv("ALLOWED_ORIGIN", DEFAULT_ALLOWED_ORIGIN).strip()

# Boundary validation limits
MIN_NAME_LENGTH = 2
MAX_NAME_LENGTH = 100
MIN_MESSAGE_LENGTH = 10
MAX_MESSAGE_LENGTH = 3000
MAX_EMAIL_LENGTH = 254

# Security patterns
EMAIL_FORMAT_REGEX = re.compile(
    r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$"
)
HEADER_INJECTION_REGEX = re.compile(r"[\r\n]")

# Common disposable email provider domains to block
DISPOSABLE_EMAIL_DOMAINS: Set[str] = {
    "mailinator.com",
    "guerrillamail.com",
    "tempmail.com",
    "10minutemail.com",
    "throwawaymail.com",
    "yopmail.com",
    "trashmail.com",
    "sharklasers.com",
    "dispostable.com",
}

# Rate limiting configuration (5 requests per minute per IP)
RATE_LIMIT_RULE = "5/minute"
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Akash Kundu - Contact API",
    description="Secure contact submission service with sanitization, boundary checks, and SMTP relay.",
    version="1.1.0",
)
app.state.limiter = limiter

def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded) -> JSONResponse:
    client_ip = get_remote_address(request)
    logger.warning("Rate limit exceeded for IP %s on path %s", client_ip, request.url.path)
    return JSONResponse(
        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
        content={
            "ok": False,
            "error": "Rate limit exceeded. Please wait a minute before submitting again."
        }
    )

app.add_exception_handler(RateLimitExceeded, rate_limit_exceeded_handler)

# Allowed CORS origins
CORS_ALLOWED_ORIGINS = [
    ALLOWED_ORIGIN,
    "http://localhost:5173",
    "https://akashkundu.me",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["POST", "OPTIONS", "GET"],
    allow_headers=["Content-Type", "Accept", "Authorization"],
)

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Content-Security-Policy"] = "default-src 'self'"
    return response

class ContactMessage(BaseModel):
    name: str = Field(
        ...,
        min_length=MIN_NAME_LENGTH,
        max_length=MAX_NAME_LENGTH,
        description="Sender full name"
    )
    email: EmailStr = Field(
        ...,
        max_length=MAX_EMAIL_LENGTH,
        description="Sender email address"
    )
    message: str = Field(
        ...,
        min_length=MIN_MESSAGE_LENGTH,
        max_length=MAX_MESSAGE_LENGTH,
        description="Message content"
    )

    @field_validator("name")
    @classmethod
    def validate_and_sanitize_name(cls, raw_name: str) -> str:
        if not raw_name or not isinstance(raw_name, str):
            raise ValueError("Sender name is required.")
        
        trimmed_name = raw_name.strip()
        if len(trimmed_name) < MIN_NAME_LENGTH or len(trimmed_name) > MAX_NAME_LENGTH:
            raise ValueError(f"Name must be between {MIN_NAME_LENGTH} and {MAX_NAME_LENGTH} characters.")

        # Prevent SMTP header injection
        if HEADER_INJECTION_REGEX.search(trimmed_name):
            raise ValueError("Name cannot contain newline or carriage return characters.")

        return html.escape(trimmed_name)

    @field_validator("email")
    @classmethod
    def validate_and_sanitize_email(cls, raw_email: str) -> str:
        if not raw_email or not isinstance(raw_email, str):
            raise ValueError("Email address is required.")

        normalized_email = raw_email.strip().lower()
        if len(normalized_email) > MAX_EMAIL_LENGTH:
            raise ValueError(f"Email exceeds maximum length of {MAX_EMAIL_LENGTH} characters.")

        if not EMAIL_FORMAT_REGEX.match(normalized_email):
            raise ValueError("Invalid email format.")

        email_domain = normalized_email.split("@")[-1]
        if email_domain in DISPOSABLE_EMAIL_DOMAINS:
            raise ValueError("Disposable or temporary email addresses are not accepted.")

        return normalized_email

    @field_validator("message")
    @classmethod
    def validate_and_sanitize_message(cls, raw_message: str) -> str:
        if not raw_message or not isinstance(raw_message, str):
            raise ValueError("Message body is required.")

        trimmed_message = raw_message.strip()
        if len(trimmed_message) < MIN_MESSAGE_LENGTH or len(trimmed_message) > MAX_MESSAGE_LENGTH:
            raise ValueError(f"Message must be between {MIN_MESSAGE_LENGTH} and {MAX_MESSAGE_LENGTH} characters.")

        return html.escape(trimmed_message)

def build_email_html_body(contact_message: ContactMessage, formatted_timestamp: str) -> str:
    return f"""
    <html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#1a1a2e;max-width:600px;margin:0 auto;padding:2rem">
      <h2 style="color:#4fa3ff;border-bottom:2px solid #4fa3ff;padding-bottom:.5rem;margin-top:0">
        New Portfolio Contact
      </h2>
      <table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
        <tr>
          <td style="padding:.5rem;color:#666;width:100px;vertical-align:top"><strong>From</strong></td>
          <td style="padding:.5rem">{contact_message.name}</td>
        </tr>
        <tr>
          <td style="padding:.5rem;color:#666;vertical-align:top"><strong>Email</strong></td>
          <td style="padding:.5rem"><a href="mailto:{contact_message.email}">{contact_message.email}</a></td>
        </tr>
        <tr>
          <td style="padding:.5rem;color:#666;vertical-align:top"><strong>Time</strong></td>
          <td style="padding:.5rem">{formatted_timestamp}</td>
        </tr>
      </table>
      <div style="background:#f8f9ff;border-left:4px solid #4fa3ff;padding:1rem 1.5rem;border-radius:4px;margin:1rem 0">
        <strong style="color:#666;font-size:.8rem;text-transform:uppercase;letter-spacing:.1em">Message</strong>
        <p style="margin:.5rem 0 0;line-height:1.7;white-space:pre-wrap">{contact_message.message}</p>
      </div>
      <p style="font-size:.75rem;color:#999;margin-top:2rem">
        Sent from akashkundu.me contact form
      </p>
    </body></html>
    """

def build_email_mime_message(contact_message: ContactMessage) -> MIMEMultipart:
    subject = f"[Portfolio] New message from {contact_message.name}"
    current_time_utc = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    html_content = build_email_html_body(contact_message, current_time_utc)

    mime_email = MIMEMultipart("alternative")
    mime_email["Subject"] = subject
    mime_email["From"] = SMTP_USER
    mime_email["To"] = TO_EMAIL
    mime_email["Reply-To"] = contact_message.email
    mime_email.attach(MIMEText(html_content, "html"))
    return mime_email

def send_email_via_smtp(email_message: MIMEMultipart, recipient_address: str) -> None:
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=DEFAULT_SMTP_TIMEOUT_SECONDS) as smtp_client:
        smtp_client.ehlo()
        smtp_client.starttls()
        smtp_client.login(SMTP_USER, SMTP_PASS)
        smtp_client.sendmail(SMTP_USER, [recipient_address], email_message.as_string())

@app.post("/api/contact")
@limiter.limit(RATE_LIMIT_RULE)
async def contact_endpoint(request: Request, contact_payload: ContactMessage):
    if not SMTP_USER or not SMTP_PASS:
        logger.error("Email service requested but SMTP credentials are missing.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Email service not configured - missing SMTP credentials."
        )

    try:
        mime_message = build_email_mime_message(contact_payload)
        send_email_via_smtp(mime_message, TO_EMAIL)
        logger.info("Delivered contact email from %s to %s", contact_payload.email, TO_EMAIL)
    except smtplib.SMTPAuthenticationError as auth_error:
        logger.error("SMTP authentication failed: %s", auth_error)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Mail server authentication failed."
        )
    except (smtplib.SMTPConnectError, smtplib.SMTPServerDisconnected) as connection_error:
        logger.error("SMTP connection failure: %s", connection_error)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Unable to establish connection to SMTP relay."
        )
    except (smtplib.SMTPRecipientsRefused, smtplib.SMTPSenderRefused) as refused_error:
        logger.error("SMTP sender or recipient rejected: %s", refused_error)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mail service refused sender or recipient address."
        )
    except smtplib.SMTPException as smtp_general_error:
        logger.error("SMTP delivery failure: %s", smtp_general_error)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"SMTP transmission error: {smtp_general_error}"
        )
    except (TimeoutError, OSError) as timeout_error:
        logger.error("SMTP socket timeout: %s", timeout_error)
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="Connection to SMTP server timed out."
        )
    except Exception as unexpected_error:
        logger.exception("Unexpected error during contact submission: %s", unexpected_error)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An internal server error occurred while delivering message."
        )

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"ok": True, "message": "Message delivered successfully"}
    )

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "smtp_configured": bool(SMTP_USER and SMTP_PASS),
    }
