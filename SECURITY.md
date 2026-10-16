# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | :white_check_mark: |
| < 2.0   | :x:                |

---

## Reporting a Vulnerability

I take the security and integrity of this website and its associated systems seriously. If you identify a security vulnerability, please disclose it responsibly:

- **Contact:** Send an email to **[akashkundu7487@gmail.com](mailto:akashkundu7487@gmail.com)** with the subject line `[SECURITY] Vulnerability Report - Portfolio`.
- **Details to include:**
  - Description of the vulnerability and its potential impact.
  - Reproducible steps or Proof of Concept (PoC) using benign test data.
  - Affected components, routes, or files.
- **Expectations:**
  - I will acknowledge receipt of your report within 48 hours.
  - I will investigate and prepare a remediating patch as soon as possible.
  - Please do not disclose the issue publicly until a fix has been verified and deployed.

---

## Threat Model & Security Posture

### 1. Static Frontend (GitHub Pages)

- **Content Security Policy (CSP):** Strict CSP meta tag limiting script execution to `'self'`, blocking untrusted object embeds, restricting form submissions to known endpoints, and controlling connect destinations.
- **URL & Protocol Sanitization:** All external and internal links pass through `sanitizeUrl()` and `sanitizeRedirectPath()` in `src/utils/security.ts`, mitigating XSS, protocol injection (`javascript:`, `data:`, `vbscript:`, `blob:`), and open redirect bypasses (e.g. CVE-2025-68470).
- **Client-Side Admin Demonstration:** The administrative panel at `/#/admin` uses client-side SHA-256 hash comparison via Web Crypto API. No backend privilege escalation exists on static hosting, and no sensitive credentials or keys are bundled in client assets.
- **Privacy & Telemetry:** Zero third-party trackers, zero advertising pixels, zero telemetry cookies, and strict `Referrer-Policy: strict-origin-when-cross-origin`.

### 2. Contact API Microservice (Python FastAPI)

- **Input Validation:** Strict character boundaries on all form fields (RFC 5321 / RFC 5322 compliant regex). Disposable email domains are rejected.
- **Header Injection Mitigation:** Strips carriage returns (`\r`) and newlines (`\n`) from message fields and headers before invoking SMTP.
- **Rate Limiting:** IP-based rate limiting enforced via `slowapi` to prevent mail server abuse and brute-force exhaustion.
- **Credential Isolation:** SMTP passwords and server configurations are loaded exclusively through environment variables and never committed to version control.
