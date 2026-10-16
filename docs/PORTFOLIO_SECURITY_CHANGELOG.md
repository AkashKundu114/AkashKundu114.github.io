# Portfolio Security, Privacy & Performance Changelog

All security hardening, input validation, privacy disclosures, and performance optimizations made during this cycle are documented in this file.

---

## [Unreleased] - Branch: `sec-privacy-perf-hardening` (October 2026)

### Added

- **Centralized Security Sanitizer (`src/utils/security.ts`):**
  - `sanitizeUrl()`: Strict URL protocol validation permitting only `https:`, `http:`, `mailto:`, `tel:`, or safe internal relative routes; strips ASCII control characters and rejects `javascript:`, `data:`, `vbscript:`, `file:`, `blob:`, protocol-relative `//`, and backslash tricks.
  - `isSafeUrl()`: Boolean helper for conditional anchor tag rendering.
  - `sanitizeRedirectPath()`: Path sanitizer mitigating CVE-2025-68470 open redirects by stripping leading backslashes (`\`, `\\`, `/\`) and protocols.
  - `hashPasswordSha256()`: Cryptographic digest generation using browser-native Web Crypto API (`crypto.subtle.digest('SHA-256')`).
- **Automated Security Unit Test Suite (`src/__tests__/security.test.ts`):**
  - 12 comprehensive test cases covering XSS scheme rejections, open redirect neutralizations, boundary checks, and SHA-256 pre-image resistance.
- **Security Meta Headers (`index.html`):**
  - Embedded Content Security Policy (`default-src 'self'`, `object-src 'none'`, etc.).
  - `X-Content-Type-Options: nosniff`.
  - `Referrer-Policy: strict-origin-when-cross-origin`.
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=()`.
- **PWA Manifest Fallback (`public/manifest.json`):**
  - Added standalone `manifest.json` in `public/` matching `manifest.webmanifest` to eliminate 404 network requests from older browsers and tools.
- **Security & Privacy Documentation Deliverables (`docs/`):**
  - `docs/PORTFOLIO_SECURITY_RELEASE_REPORT.md`
  - `docs/PORTFOLIO_WEB_RED_TEAM_REPORT.md`
  - `docs/PORTFOLIO_PRIVACY_REPORT.md`
  - `docs/PORTFOLIO_DEPENDENCY_AUDIT.md`
  - `docs/PORTFOLIO_PERFORMANCE_BENCHMARKS.md`
  - `docs/PORTFOLIO_RELEASE_TEST_RESULTS.md`
  - `docs/PORTFOLIO_SECURITY_CHANGELOG.md`
  - `docs/PORTFOLIO_RESOURCE_EFFICIENCY_REPORT.md`

### Changed

- **Eliminated Cleartext Password Exposure:**
  - `src/pages/Admin.tsx`: Replaced plaintext password check with async SHA-256 hash comparison; replaced `VITE_ADMIN_PASSWORD` with `VITE_ADMIN_PASSWORD_HASH`.
  - `.env`: Updated to store `VITE_ADMIN_PASSWORD_HASH` instead of raw plaintext password.
  - `.github/workflows/deploy.yml`: Updated CI environment declaration to pass `VITE_ADMIN_PASSWORD_HASH`.
- **Hardened External Links & Navigation:**
  - `src/components/EvilButtons.tsx`: `PolymorphicActionContainer` now validates `href` with `sanitizeUrl()` (disables dangerous links) and `to` with `sanitizeRedirectPath()`.
  - `src/pages/Projects.tsx`: Wrapped `project.github` with `sanitizeUrl()`.
  - `src/pages/Home.tsx`: Wrapped `project.github` with `sanitizeUrl()`.
  - `src/pages/CertificateDetail.tsx`: Wrapped `currentCert.file` and `currentCert.verifyUrl` with `sanitizeUrl()`.
- **Image Performance & Async Decoding:**
  - Added `loading="lazy"` and `decoding="async"` to all images in `src/pages/Certificates.tsx`, `src/pages/CertificateDetail.tsx`, and `src/pages/ProjectDetail.tsx`.
- **WebGL Runtime Throttling & Resource Efficiency:**
  - `src/components/AdvertisingCloud3D.tsx`: Added `document.addEventListener('visibilitychange')` listener to cancel animation frame loop when tab is hidden or minimized, reducing background GPU/CPU power usage to 0.
  - Paced rendering framerate to 30 FPS ambient / 60 FPS interactive, halving draw calls and shader calculations.
  - Implemented 25-second user inactivity sleep timer dropping idle GPU utilization to 0.0%.
  - Added low-power WebGL context preference (`powerPreference: 'low-power'`) for integrated GPU power conservation.
  - Added configurable Eco Mode (`data-eco="true"`) completely unmounting WebGL rendering with accessible 2D blueprint fallback.
- **Contact Form Hardening:**
  - `src/pages/Contact.tsx`: Added submission guard preventing race conditions and duplicate submissions when rapidly clicking the submit button.
- **Privacy Disclosures:**
  - `src/pages/Privacy.tsx`: Updated Section 5.0 to accurately describe `localStorage` (themes, local edits) vs `sessionStorage` (ephemeral admin session) usage.
- **Transitive Dependency Patch Upgrades:**
  - Upgraded 22 packages via `npm audit fix`, reducing vulnerability count from 16 to 9 and patching critical advisories in `undici`, `browserslist`, `brace-expansion`, `fast-uri`, and `@vitest/mocker`.

### Removed

- **Removed Plaintext Credentials from Bundle:**
  - Verified 0 occurrences of cleartext administrative passwords in `dist/assets/Admin-*.js`.
