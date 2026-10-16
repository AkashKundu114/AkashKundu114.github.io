# Portfolio Automated Verification & Test Results Report

**Target Codebase:** Akash Kundu Portfolio (`AkashKundu114.github.io`)  
**Test Framework:** Vitest 4.1.12, React Testing Library 16.3.2, JSDOM 30.0.1, ESLint 10.8.1, TypeScript 5.5.4  
**Lead Auditor:** Antigravity Principal QA & Automated Test Lead  
**Execution Timestamp:** October 2026  
**Final Verdict:** **100% PASSING — ZERO ERRORS, ZERO LINT WARNINGS ACROSS ALL GATES**

---

## 1. Test Suite Summary Table

| Test Suite / File                            | Category           | Tests Executed | Passed  | Failed | Duration    | Coverage Scope                                                                                                                                                                                                  |
| :------------------------------------------- | :----------------- | :------------- | :------ | :----- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`src/__tests__/security.test.ts`**         | Security / Unit    | 12             | 12      | 0      | 14 ms       | URL sanitization (`sanitizeUrl`), javascript/data URI neutralization, open redirect interception (`sanitizeRedirectPath`), SHA-256 Web Crypto hashing (`hashPasswordSha256`), safe URL validation (`isSafeUrl`) |
| **`src/__tests__/data.test.ts`**             | Unit               | 32             | 32      | 0      | 20 ms       | Project schema integrity, tech arrays, certificate IDs, skill categories                                                                                                                                        |
| **`src/__tests__/EvilButtons.test.tsx`**     | Component          | 16             | 16      | 0      | 162 ms      | ShinyButton, Tactile3DButton, GlassButton variants, hover, active, keyboard, future flag compliant                                                                                                              |
| **`src/__tests__/DataContext.test.tsx`**     | Context / State    | 16             | 16      | 0      | 74 ms       | DataProvider mounting, useData hook, error boundaries on outside access                                                                                                                                         |
| **`src/__tests__/LiquidGlassLens.test.tsx`** | Visual / Component | 13             | 13      | 0      | 222 ms      | Intensity presets, refraction styles, child rendering, custom classes                                                                                                                                           |
| **`src/__tests__/useScrollReveal.test.tsx`** | Hooks / Animation  | 13             | 13      | 0      | 69 ms       | IntersectionObserver integration, stagger delay calculation, visibility toggling                                                                                                                                |
| **`src/__tests__/ThemeContext.test.tsx`**    | Context / Theme    | 8              | 8       | 0      | 45 ms       | Theme switching (theme-1 to theme-5), localStorage persistence, data-theme attribute, Eco Mode toggling (`isEcoMode`, `toggleEcoMode`), data-eco attribute synchronization                                      |
| **`src/__tests__/Navbar.test.tsx`**          | Navigation / A11y  | 8              | 8       | 0      | 165 ms      | Brand logo, nav links, active state indicator, mobile toggle button, theme switch, Eco Mode toggle button and attribute synchronization                                                                         |
| **`src/__tests__/Footer.test.tsx`**          | Navigation / A11y  | 4              | 4       | 0      | 109 ms      | Copyright notice, dynamic year, social links, resume download link, future flag compliant                                                                                                                       |
| **`src/__tests__/Projects.test.tsx`**        | Page / Integration | 3              | 3       | 0      | 299 ms      | H1 landmark, rendering of COPPER/OphthalmoAI/ICC Clustering, concurrent deferred search (`useDeferredValue`), single-character short-circuit                                                                    |
| **`src/__tests__/ErrorBoundary.test.tsx`**   | Resilience         | 2              | 2       | 0      | 161 ms      | Component crash interception, fallback UI render, reload interface action                                                                                                                                       |
| **`src/__tests__/NotFound.test.tsx`**        | Page / Routing     | 1              | 1       | 0      | 116 ms      | 404 route status, H1 heading, Return Home navigation link                                                                                                                                                       |
| **`src/__tests__/App.test.tsx`**             | Root Integration   | 1              | 1       | 0      | 82 ms       | Full app mount with HashRouter, ThemeProvider, and DataProvider                                                                                                                                                 |
| **TOTAL**                                    | —                  | **129**        | **129** | **0**  | **~3.35 s** | **100% Pass Rate**                                                                                                                                                                                              |

---

## 2. Command Execution Evidence

### 2.1 Vitest Execution

**Command:** `npm run test -- --run`

```text
 RUN  v4.1.12 D:/akashkundu

 ✓ src/__tests__/security.test.ts (12 tests) 14ms
 ✓ src/__tests__/data.test.ts (32 tests) 20ms
 ✓ src/__tests__/useScrollReveal.test.tsx (13 tests) 69ms
 ✓ src/__tests__/ThemeContext.test.tsx (8 tests) 45ms
 ✓ src/__tests__/DataContext.test.tsx (16 tests) 74ms
 ✓ src/__tests__/Footer.test.tsx (4 tests) 109ms
 ✓ src/__tests__/ErrorBoundary.test.tsx (2 tests) 161ms
 ✓ src/__tests__/LiquidGlassLens.test.tsx (13 tests) 222ms
 ✓ src/__tests__/App.test.tsx (1 test) 82ms
 ✓ src/__tests__/NotFound.test.tsx (1 test) 116ms
 ✓ src/__tests__/Navbar.test.tsx (8 tests) 165ms
 ✓ src/__tests__/EvilButtons.test.tsx (16 tests) 162ms
 ✓ src/__tests__/Projects.test.tsx (3 tests) 299ms

 Test Files  13 passed (13)
      Tests  129 passed (129)
   Start at  13:51:03
   Duration  3.35s (transform 591ms, setup 5.96s, import 3.36s, tests 1.54s, environment 21.06s)
```

### 2.2 TypeScript Static Type Checking

**Command:** `npx tsc --noEmit`

```text
Exit code: 0
Stdout: (Clean - zero diagnostic messages)
Stderr: (Clean - zero diagnostic messages)
```

### 2.3 ESLint Analysis

**Command:** `npm run lint`

```text
> akash-kundu-portfolio@2.0.0 lint
> eslint .

(Clean - 0 problems: 0 errors, 0 warnings)
Exit code: 0
```

### 2.4 Production Build & Rolldown Chunking

**Command:** `npm run build`

```text
> akash-kundu-portfolio@2.0.0 build
> vite build

vite v8.2.1 building client environment for production...
transforming...✓ 410 modules transformed.
rendering chunks...
computing gzip size...
dist/registerSW.js                            0.13 kB
dist/manifest.webmanifest                     0.53 kB
dist/index.html                               6.06 kB │ gzip:   1.89 kB
dist/assets/index-URGAAW5z.css               25.73 kB │ gzip:   6.43 kB
dist/assets/PageTransition-BUha9yEq.js        0.55 kB │ gzip:   0.36 kB
dist/assets/useDocumentTitle-BeVBQJW5.js      0.66 kB │ gzip:   0.30 kB
dist/assets/useScrollReveal-D63CG3HK.js       0.93 kB │ gzip:   0.51 kB
dist/assets/NotFound-BTHnsbv7.js              1.33 kB │ gzip:   0.70 kB
dist/assets/skills-h4ZnjjRR.js                1.95 kB │ gzip:   0.53 kB
dist/assets/LiquidGlassLens-B2mGGfeP.js       2.00 kB │ gzip:   0.80 kB
dist/assets/Skills-oBYcE8e-.js                4.16 kB │ gzip:   1.73 kB
dist/assets/Education-B6HTA4P0.js             4.51 kB │ gzip:   1.77 kB
dist/assets/CertificateDetail-BbLX1YK-.js     6.27 kB │ gzip:   2.33 kB
dist/assets/About-Brp2o09j.js                 6.51 kB │ gzip:   2.64 kB
dist/assets/Contact-CCDAj2JB.js               7.85 kB │ gzip:   2.79 kB
dist/assets/jsx-runtime-CF72uaaz.js           7.95 kB │ gzip:   3.07 kB
dist/assets/Certificates-D7jIh0Sm.js          8.91 kB │ gzip:   2.57 kB
dist/assets/Privacy-Bsg9N39x.js               9.66 kB │ gzip:   3.44 kB
dist/assets/Terms-zqm90t0v.js                10.65 kB │ gzip:   3.98 kB
dist/assets/ProjectDetail-DYZmqThG.js        11.89 kB │ gzip:   3.65 kB
dist/assets/Home-BT_nKIc7.js                 13.11 kB │ gzip:   4.53 kB
dist/assets/AdvertisingCloud3D-uL6-gulV.js   13.26 kB │ gzip:   5.08 kB
dist/assets/Admin-Bpm-OrVc.js                24.29 kB │ gzip:   6.04 kB
dist/assets/Projects-CkCIGo-R.js             30.39 kB │ gzip:  10.83 kB
dist/assets/index-BYPyKKkU.js               332.30 kB │ gzip: 108.54 kB
dist/assets/three-DmZXPHwl.js               536.43 kB │ gzip: 133.08 kB

✓ built in 1.24s

PWA v1.3.0
mode      generateSW
precache  36 entries (1097.44 KiB)
files generated
  dist/sw.js
  dist/workbox-e5cff4b9.js
Exit code: 0
```

### 2.5 Headless Chrome CDP Viewport & Route Telemetry

**Command:** `node scratch/cdp_audit.mjs` (targeting live preview `http://localhost:4173/`)

- Total Viewports Audited: 9/9 (`320px` to `1920px`) -> **0 overflow detected**.
- Total Routes Audited: 9/9 -> **0 missing image alts, 0 missing button labels, 0 broken links**.
- Browser Console Messages: **0 warnings, 0 runtime errors**.
- Browser Uncaught Exceptions: **0 exceptions**.
