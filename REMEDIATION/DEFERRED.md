# Deferred Items & Architectural Trade-offs

This document records architectural, tooling, and feature decisions that were intentionally deferred during the production release cleanup of `AkashKundu114.github.io`. Every item includes the rationale, current mitigation, and criteria for future re-evaluation.

---

## 1. Full Static Site Generation (SSG) / Headless Pre-rendering

- **Status:** Deferred
- **Context:** Dynamic per-route Open Graph and Twitter card preview generation (e.g. unique social previews for `/projects/copper`, `/certificates`, etc.) without client-side JavaScript execution.
- **Rationale:** 
  - The portfolio is an SPA built with Vite + React Router deployed to GitHub Pages via `public/404.html` SPA routing.
  - Adding tools like `vite-plugin-ssr`, `react-snap`, or migrating to Next.js static export would introduce significant toolchain complexity, increase build times, and potentially break dynamic Three.js canvas lifecycles and client-side theme transitions.
- **Current Mitigation:**
  - High-fidelity root metadata (`og:title`, `og:description`, `og:image`, `twitter:card`) defined in `index.html`.
  - Custom 1200x630 `public/icons/og-image.png` optimized for social crawlers.
  - Dynamic in-browser page title and meta updates handled via `useDocumentTitle` hook for browser tabs and history.
  - Standard JSON-LD `Person` schema in `index.html` for search engines.
- **Future Criteria:** Consider lightweight prerendering during the Vite build step if social preview customization for sub-routes becomes a primary requirement.

---

## 2. Headless Playwright Browser Suite in CI Runner

- **Status:** Deferred
- **Context:** Running full end-to-end headless Chromium/Firefox/WebKit browsers inside the GitHub Actions workflow (`ci.yml`).
- **Rationale:**
  - Ubuntu runners in GitHub Actions frequently encounter WebGL context initialization issues when mounting heavy Three.js canvas components in headless mode (`WebGL: CONTEXT_LOST_WEBGL`).
  - Headless browser binaries add ~2-3 minutes to CI turnaround times.
- **Current Mitigation:**
  - Unit and integration testing handled comprehensively by Vitest + React Testing Library + jsdom (13 test suites, 129 tests, 100% pass rate in ~4 seconds).
  - Responsive layout and interaction testing verified across 10 viewports during Phase A and Phase G using real local browser automation.
  - Production build verification (`vite build`) validates bundle generation and chunk integrity on every push.
- **Future Criteria:** Add a separate manual or nightly workflow (`e2e.yml`) utilizing `playwright-report` with xvfb virtual framebuffer for scheduled deep visual regression testing.

---

## 3. Serverless Contact Form API

- **Status:** Deferred
- **Context:** Hosting a serverless API function (e.g., AWS Lambda, Cloudflare Worker, or Resend API) to process contact form submissions without opening the user's email client.
- **Rationale:**
  - Exposing an unauthenticated public API endpoint on a static GitHub Pages site risks abuse, quota exhaustion, and Spam attacks without aggressive CAPTCHA or rate-limiting.
  - External form providers (Formspree, EmailJS) inject third-party trackers, scripts, and potential privacy leaks.
- **Current Mitigation:**
  - Direct, honest mailto integration to primary verified recruiter email: `mailto:akashkundu7487@gmail.com`.
  - Copy-to-clipboard functionality with clear visual feedback.
  - Prominent verified social links (LinkedIn, GitHub) in header and footer.
- **Future Criteria:** Deploy an isolated Cloudflare Worker with Turnstile bot protection if high-volume automated inbound inquiry routing is required.

---

## 4. WebGL Mesh Custom Shaders on Low-Power Mobile Hardware

- **Status:** Deferred
- **Context:** Running advanced GLSL post-processing shaders on mobile viewports.
- **Rationale:**
  - Heavy GLSL shaders significantly increase GPU thermal throttling and battery consumption on mobile devices.
- **Current Mitigation:**
  - Ambient WebGL particle canvas is automatically paced at 30 FPS ambient / 60 FPS interactive.
  - Automatic sleep timer pauses the WebGL rendering loop after 25 seconds of user inactivity.
  - Explicit "Eco Mode" toggle in navigation allows users to instantly disable WebGL animations.
  - Full `prefers-reduced-motion` CSS and JavaScript support disables all canvas particles when requested by the OS.
- **Future Criteria:** Re-evaluate if WebGPU becomes universally available and performant across mobile platforms.
