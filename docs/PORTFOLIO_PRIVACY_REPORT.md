# Portfolio Privacy & Public Information Audit Report

**Application:** Akash Kundu Engineering Portfolio (`AkashKundu114.github.io`)  
**Auditor Perspective:** Independent Unfamiliar Visitor, Technical Recruiter, and Privacy Auditor  
**Execution Timestamp:** October 2026  
**Final Status:** **VERIFIED — ZERO TRACKING, ZERO UNINTENDED PII LEAKS, ZERO CREDENTIAL EXPOSURES**

---

## 1. Privacy Principles & Visitor Perspective

When an unfamiliar visitor navigates to `https://AkashKundu114.github.io`, the website executes in strict accordance with a **zero-telemetry, privacy-first architecture**:
1. **No Invasive Third-Party Trackers:**
   - No Google Analytics (`gtag.js` / `analytics.js`).
   - No Meta / Facebook Pixel (`fbevents.js`).
   - No session recorders (Hotjar, FullStory, Clarity, LogRocket).
   - No advertising beacons or retargeting cookies.
2. **No HTTP Cookies Created:**
   - The site operates completely cookie-free (`document.cookie` is empty).
   - All client preferences are stored strictly in client-controlled Web Storage.
3. **Transparent Public Disclosures:**
   - A comprehensive, dedicated Privacy Policy is accessible at [`/privacy`](file:///d:/akashkundu/src/pages/Privacy.tsx) and Terms of Service at [`/terms`](file:///d:/akashkundu/src/pages/Terms.tsx).

---

## 2. Web Storage & Client-Side Data Audit

| Storage Mechanism | Key / Identifier | Purpose | Lifetime | Sensitive Data Exposed? |
| :--- | :--- | :--- | :--- | :--- |
| **LocalStorage** | `portfolio_theme` | Stores the active color theme (`theme-1` to `theme-5`). | Persistent across sessions | **No** (pure UI preference string) |
| **LocalStorage** | `portfolio_projects` | Holds user custom modifications if using the client-side Admin dashboard. | Persistent across sessions | **No** (portfolio content only) |
| **LocalStorage** | `portfolio_certificates`| Holds user custom certificate additions in client dashboard. | Persistent across sessions | **No** (certification metadata only) |
| **SessionStorage** | `_adminAuthed` | Temporary session flag indicating administrative unlock status. | Current tab session only | **No** (boolean indicator `'1'`) |
| **Cookies** | *(None)* | Not used. | N/A | **No cookies created** |

---

## 3. Contact Form Data Flow & Transmission Privacy

The contact form located at [`src/pages/Contact.tsx`](file:///d:/akashkundu/src/pages/Contact.tsx) was audited from submission to destination:
- **Transmission Method:** HTTP `POST` using `fetch()`. Form values are NEVER appended to URL query parameters (which would leak into browser history, ISP logs, and HTTP Referer headers).
- **Client-Side Persistence:** Form inputs (`name`, `email`, `message`) are held in ephemeral React state only. They are NEVER persisted to `localStorage`, `sessionStorage`, or indexed databases.
- **Console / Telemetry Logging:** No `console.log()` statements print user names, email addresses, or message content.
- **Destination Verification:** Submissions are routed solely to the configured `VITE_CONTACT_API` or Formspree endpoint. If no endpoint is configured in the environment, the form halts and informs the user safely without leaking data.

---

## 4. External Dependencies & Third-Party Network Calls

| External Host / Resource | Type | Purpose | Privacy Safeguard |
| :--- | :--- | :--- | :--- |
| **`fonts.googleapis.com`** | CSS Stylesheet | Typography font definitions (`Space Grotesk`, `Space Mono`) | Preconnected with `crossorigin`. Cached for 365 days via Workbox `CacheFirst` strategy to minimize repeated requests. |
| **`fonts.gstatic.com`** | Font Files | WOFF2 font binary files | Cached for 365 days via Workbox `CacheFirst`. |
| **`api.akashkundu.me`** | REST API | Contact message delivery | Explicitly declared in CSP `connect-src` and `form-action`. |

No other external hosts, CDNs, or scripts are loaded at runtime.

---

## 5. Artifact Inspection & Build Output Cleanliness

A full inspection of the generated production bundle in `dist/` verified:
- **Environment Files:** `.env` and `.env.local` are explicitly ignored by Git and never copied to `dist/`.
- **Source Maps:** Production build does not publish unminified `.map` files containing local machine file paths or development comments.
- **Test Fixtures & Mocks:** Vitest test files (`*.test.tsx`, `*.test.ts`) are excluded from the Rolldown production bundle.
- **Document Metadata:** Public PDF resumes in `public/cv/` (`AkashKundu_CV.pdf`, `resume_cdac.pdf`) contain only professional portfolio contact details that the user has explicitly designated for recruiter outreach (`akashkundu7487@gmail.com`, `+91 9064349004`, Kolkata, India). No personal government IDs or private home addresses are present.
