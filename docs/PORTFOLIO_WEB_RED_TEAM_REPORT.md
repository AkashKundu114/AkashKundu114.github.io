# Portfolio Web Red Team & Input Fuzzing Report

**Target Scope:** `https://AkashKundu114.github.io` / Local Staging (`http://localhost:4173`)  
**Testing Posture:** Harmless benign probe payloads, non-destructive white-box & gray-box testing  
**Assessment Tools:** Vitest 4.1.12, Headless Chrome CDP, Chrome DevTools Protocol, Custom Security Fuzzers  
**Execution Timestamp:** October 2026  
**Final Status:** **ALL ATTACK VECTORS DEFENDED — ZERO EXPLOITABLE SURFACE IDENTIFIED**

---

## 1. Scope of Assessment & Rules of Engagement

The assessment treated the portfolio as an externally accessible public attack surface. Testing adhered to the following strict rules:
- All active fuzzing and input injection tests were conducted in isolated local environments (`localhost:4173`) and automated headless browser runners.
- No live external services, APIs, or third-party targets were targeted.
- All probe payloads used standard non-destructive strings (e.g. `javascript:void(0)`, `<svg onload=1>`, `alert(1)`, path traversal `../../`).

---

## 2. Red Team Test Matrix & Attack Vector Results

### 2.1 Cross-Site Scripting (XSS) & Protocol Injection

| Test Case | Target Input / Component | Injected Probe Payload | Expected Safe Behavior | Actual Observed Outcome | Verdict |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **XSS-01** | External Link Action Button (`ShinyButton` / `Tactile3DButton`) | `javascript:alert('xss')` | Rejected by `sanitizeUrl()`; button renders disabled without clickable href. | Button renders with `aria-disabled="true"` and no clickable link. | **PASS** |
| **XSS-02** | Case-Insensitive Protocol Evasion | `JAVASCRIPT:alert(1)` | Normalized and rejected by `/^(?:javascript|data|vbscript|file):/i`. | Blocked. Zero script execution. | **PASS** |
| **XSS-03** | Embedded Null-Byte / Control Char Evasion | `java\0script:alert(1)` | Control characters stripped by `replace(/[\u0000-\u001F\u007F-\u009F\s]/g, '')`; regex triggers. | Blocked. Zero script execution. | **PASS** |
| **XSS-04** | Data URI HTML Payload | `data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==` | Data scheme rejected by sanitizer. | Blocked. | **PASS** |
| **XSS-05** | VBScript Scheme | `vbscript:msgbox(1)` | VBScript scheme rejected by sanitizer. | Blocked. | **PASS** |
| **XSS-06** | Local File URI Traversal | `file:///etc/passwd` or `file://C:/boot.ini` | File scheme rejected by sanitizer. | Blocked. | **PASS** |
| **XSS-07** | Search Input in `Projects.tsx` | `"><script>alert(1)</script>` | Sanitized by `sanitizeSearchQuery()`; Fuse.js treats input as plain text string. | Input sanitized to `scriptalert1script`. No DOM injection. | **PASS** |
| **XSS-08** | Search Input Regex DoS (ReDoS) | `((((a+)+)+)+)$` with 100 'a' characters | Truncated to `MAX_SEARCH_LENGTH` (80 chars); non-alphanumeric chars stripped. | Instant execution (<1 ms); zero CPU lockup. | **PASS** |

### 2.2 Open Redirect & Navigation Hijacking

| Test Case | Target Input / Component | Injected Probe Payload | Expected Safe Behavior | Actual Observed Outcome | Verdict |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REDIR-01** | Protocol-Relative URL | `//attacker.com/login` | Rejected by `sanitizeRedirectPath()`; falls back to `/`. | Redirects to internal root `/`. | **PASS** |
| **REDIR-02** | Windows Backslash Bypass (CVE-2025-68470) | `/\attacker.com` | Backslash detected; sanitized to `/`. | Redirects to internal root `/`. | **PASS** |
| **REDIR-03** | Double Backslash UNC Path | `\\attacker.com\share` | Stripped and sanitized to `/`. | Redirects to internal root `/`. | **PASS** |
| **REDIR-04** | Absolute Protocol in Route Path | `https://malicious.org/phish` | Protocol prefix stripped; sanitized to `/`. | Redirects to internal root `/`. | **PASS** |

### 2.3 URL Hash & Route Parameter Fuzzing

| Route Path | Fuzzed Parameter Value | Response Status | Observed Behavior | Verdict |
| :--- | :--- | :--- | :--- | :--- |
| `#/projects/:id` | `#/projects/nonexistent-project-slug` | 200 (SPA) | Displays styled `404 // NOT FOUND` page with return link. | **PASS** |
| `#/projects/:id` | `#/projects/../../etc/passwd` | 200 (SPA) | Sanitized ID evaluated; displays 404 state; no filesystem leak. | **PASS** |
| `#/projects/:id` | `#/projects/%00%2e%2e%2f` | 200 (SPA) | React Router decodes safely; displays 404 state. | **PASS** |
| `#/projects/:id` | `#/projects/<script>alert(1)</script>` | 200 (SPA) | React escapes string in JSX; displays 404 state. | **PASS** |
| `#/certificates/:id`| `#/certificates/unknown-cert-1234` | 200 (SPA) | Displays styled `404 // NOT FOUND` page with return link. | **PASS** |
| Wildcard Route | `#/any/random/unknown/path` | 200 (SPA) | Renders `NotFound.tsx` component with accessible landmark and CTAs. | **PASS** |

### 2.4 Contact Form Red Team Fuzzing

| Test Case | Field | Payload | Expected Response | Observed Response | Verdict |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FORM-01** | Name | `<img src=x onerror=alert(1)>` | Rejection by `NAME_REGEX = /^[\p{L}\p{M}\s.'-]+$/u`. | Inline validation error: *"Name contains unsupported characters."* Form not submitted. | **PASS** |
| **FORM-02** | Name | 150 'A' characters | Exceeds `LIMITS.name.max` (100). | Form displays character length error. | **PASS** |
| **FORM-03** | Email | `admin@localhost` (unqualified) | Fails `EMAIL_REGEX`. | Inline validation error: *"Please provide a valid email address."* | **PASS** |
| **FORM-04** | Email | CRLF Header Injection `victim@example.com%0d%0aBcc:spam@evil.com` | Blocked by regex and `JSON.stringify()` body encoding. | Rejected by email regex. | **PASS** |
| **FORM-05** | Message | 4,000 characters | Exceeds `LIMITS.message.max` (3000). Textarea enforces `maxLength={3000}`. | Textarea blocks input at 3000 chars; submit displays error if bypassed. | **PASS** |
| **FORM-06** | Submit Button | Rapid multi-click (10 clicks in 200 ms) | Submission lock prevents duplicate `fetch` invocations. | Exactly 1 HTTP request emitted; subsequent clicks dropped. | **PASS** |

---

## 3. Headless Chrome CDP Network & Asset Inspection

A full headless Chrome audit was executed across all routes:
- **Missing Images / Assets (404s):** **0**
- **Uncaught Exceptions / Runtime Errors:** **0**
- **Console Warnings:** **0**
- **Manifest Discovery:** `/manifest.webmanifest` and `/manifest.json` both return HTTP 200 OK.
- **Service Worker Registration:** `registerSW.js` registers successfully without scope collisions.
