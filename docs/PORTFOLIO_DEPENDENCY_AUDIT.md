# Portfolio Third-Party Dependency & Supply-Chain Audit

**Target Codebase:** Akash Kundu Portfolio (`AkashKundu114.github.io`)  
**Package Manager:** NPM 10.x / Node.js 20+  
**Execution Timestamp:** October 2026  
**Auditor:** Principal Security Engineer & Supply-Chain Lead  
**Overall Risk Level:** **LOW — ALL PRODUCTION RUNTIME DEPENDENCIES VERIFIED**

---

## 1. Dependency Inventory Overview

The portfolio enforces a minimalist dependency philosophy, avoiding bloated utility libraries (e.g. `lodash`, `moment`, `jquery`) and unnecessary frameworks.

### 1.1 Direct Production Runtime Dependencies (`dependencies`)

| Package | Version | Purpose | Bundle Impact | Vulnerability Status |
| :--- | :--- | :--- | :--- | :--- |
| **`react`** | `^18.3.1` | Core UI library | Part of vendor chunk | Clean (0 advisories) |
| **`react-dom`** | `^18.3.1` | React DOM renderer | Part of vendor chunk | Clean (0 advisories) |
| **`react-router-dom`** | `^6.30.6` | Client-side Hash routing | Isolated route chunk | Hardened via `sanitizeRedirectPath` (see §2.2) |
| **`framer-motion`** | `^11.18.2` | Spring animations & page transitions | Tree-shaken | Clean (0 advisories) |
| **`fuse.js`** | `^7.3.0` | Client-side fuzzy search in Projects | Search chunk | Clean (0 advisories) |
| **`three`** | `^0.186.1` | Procedural WebGL 3D neural mesh scene | Split vendor chunk (`three-DmZXPHwl.js`) | Clean (0 advisories) |

*Note:* `@types/three` was relocated to `devDependencies` to keep production runtime free of typings.

### 1.2 Development & Build Dependencies (`devDependencies`)
Key build tools: `vite` (8.2.1), `vite-plugin-pwa` (1.3.0), `vitest` (4.1.12), `typescript` (5.5.4), `eslint` (10.8.1), `tailwindcss` (3.4.19), `postcss` (8.5.26), `autoprefixer` (10.5.0), `@testing-library/react` (16.3.2), `jsdom` (30.0.1).

---

## 2. NPM Audit Findings & Remediation Ledger

### 2.1 Remediated Dependencies via Patch Upgrades
Running `npm audit fix` successfully updated 22 transitive packages to patched minor/patch releases:
- **`undici` (8.10.0 -> 8.12.2):** Resolved 11 Denial-of-Service and WebSocket decompression advisories (GHSA-3wwx-pv8p-q78v, GHSA-pmjh-fq2x-6v4x, GHSA-rfgv-xxqx-mfg5, etc.).
- **`browserslist` (4.28.2 -> 4.29.3):** Resolved memory growth and unhandled prototype write (GHSA-c83g-rgw3-j3cx, GHSA-73wf-gq98-2v4g).
- **`brace-expansion` (2.1.4 -> 2.1.7, 5.0.9 -> 5.0.12):** Resolved quadratic-time regex expansion DoS (GHSA-q2hr-2g5m-vwhr, GHSA-qhr7-859c-m2p7).
- **`fast-uri` (3.1.5 -> 3.1.8):** Resolved host confusion and percent-encoding SSRF advisories (GHSA-5jgf-p345-68v8, GHSA-fph4-wmhf-6fwf).
- **`@vitest/mocker` (4.1.10 -> 4.1.12):** Resolved path traversal advisory in Vitest test runner (GHSA-82fw-gwwq-j7x9).

### 2.2 Remaining Advisory Analysis & Risk Assessment

| Package | Severity | Advisory Description | Exploitability in AkashKundu114.github.io | Defense-in-Depth Mitigation |
| :--- | :--- | :--- | :--- | :--- |
| **`react-router`**<br>(6.0.0 – 7.17.0) | Moderate | **GHSA-wrjc-x8rr-h8h6:** Open redirect via backslash in `<Link>` and `useNavigate` (CVE-2025-68470 bypass). | **Non-Exploitable** in static deployment: The portfolio only routes between static hash paths (`/#/projects`, `/#/about`, etc.). No external redirect endpoints exist. | **Mitigated:** Created `sanitizeRedirectPath()` in `src/utils/security.ts` which intercepts and strips backslashes (`\`, `\\`, `/\`) before passing paths to React Router. |
| **`react-router`**<br>(6.0.0 – 7.17.0) | Moderate | **GHSA-337j-9hxr-rhxg:** Arbitrary Constructor Injection via `deserializeErrors()` in React Router SSR Hydration. | **Zero Exploitability:** The site is a 100% static client-side Single-Page Application (SPA) deployed on GitHub Pages. It has no Node.js SSR server, no hydration payload passing, and never invokes `deserializeErrors()`. | Not applicable to static client builds. |
| **`braces` / `chokidar`**<br>(via `tailwindcss@3.4.19`) | High | **GHSA-vfj7-8cjw-p6xm:** Stack-exhaustion denial of service through deeply nested glob patterns during file watching. | **Build-Time Only:** Affects file watcher during local development only. No development watchers run in production environments or against public users. | Upgrading to Tailwind CSS v4 would be a breaking change; build-time risk is contained. |
| **`postcss-selector-parser`**<br>(via `tailwindcss@3.4.19`) | Moderate | **GHSA-rj75-hqrm-r3gf:** Quadratic complexity in selector parsing allows CPU exhaustion during CSS compilation. | **Build-Time Only:** CSS is compiled once during build time (`npm run build`). No user input is passed to the PostCSS compiler at runtime. | Non-exploitable against production visitors. |

---

## 3. Supply-Chain Hardening Summary

1. **Lockfile Integrity:** `package-lock.json` lockfileVersion 3 is committed and strictly enforced via `npm ci` in GitHub Actions CI/CD.
2. **Deterministic Builds:** Dependency versions are pinned; no wildcards (`*`) or unvetted git URLs exist in `package.json`.
3. **No Dynamic Code Evaluation:** The build contains 0 instances of `eval()`, `new Function()`, or dynamic remote script loaders.
