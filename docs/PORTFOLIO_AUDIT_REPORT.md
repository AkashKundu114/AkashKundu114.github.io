# Engineering, Architectural & Synchronization Audit Report

**Target Repository:** `AkashKundu114.github.io` (Local Workspace: `./portfolio`)  
**Audit Branches:** `audit-engineering-sync` (Baseline) / `sec-privacy-perf-hardening` (Hardened Release)  
**Baseline Git Commit SHA:** `2244ecccc0ca5631c5ce5809ca07e50d4df4d79c`  
**Lead Auditor:** Antigravity Principal Frontend, Systems & QA Lead  
**Audit Date:** October 2026  
**Status:** Complete & Fully Verified

---

## 1. Executive Summary

This report documents an exhaustive, multi-agent, evidence-driven engineering, visual, accessibility, performance, and project-synchronization audit conducted across Akash Kundu's personal portfolio repository (`./portfolio`). The audit directly synchronized all portfolio claims, architectures, test statistics, and benchmark figures against the actual source code repositories on disk:

1. **C.O.P.P.E.R.** (`./copper`): Local-First Autonomous Personal AI Operating System.
2. **OphthalmoAI** (`./ophthalmoai`): AI-Powered Retinal Disease Screening System & Decision Support Platform.
3. **ICC Clustering** (`./icc-clustering`): Inductive Consensus Clustering Algorithm & High-Dimensional Research Benchmark.

Every finding was substantiated through direct source code inspection, real runtime execution, headless Chrome DevTools Protocol (CDP) browser automation across 9 viewport dimensions, and automated test suites.

### Key Audit Metrics

- **Final ESLint Status:** **0 errors, 0 warnings (100% clean)**.
- **Initial TypeScript Check:** 4 errors (Vite env missing, duplicate key TS2783 in DataContext, LiquidGlassLens preset type mismatches) -> **0 errors (`tsc --noEmit` clean exit code 0)**.
- **Initial Home Route Bundle Size:** 547.4 kB (statically importing Three.js and all shaders) -> **13.11 kB** (Three.js isolated into lazy chunk `three-DmZXPHwl.js`, 536 kB).
- **PWA Precache Payload:** 6.8 MB (indiscriminately precaching high-res certificates and PDFs) -> **1.07 MB (1,097 KiB, 84% bandwidth reduction)** with runtime stale-while-revalidate caching.
- **Test Suite Expansion:** 9 test files / 107 tests -> **13 test files / 129 tests passing (100% pass rate)**.
- **Flagship Project Coverage:** ICC Clustering was completely missing from the portfolio -> Fully integrated with mathematical formulations, 113/113 pytest benchmarks, -74.2% peak RAM optimization, and architecture diagram; featured on Home page.
- **WCAG 2.2 AA Compliance:** Eliminated nested `role="button"` interactives on cards, added top-level `<h1>` headings on 6 major routes, upgraded focus rings to 2px high-contrast borders, corrected Theme 5 low-contrast accent color (2.23:1 -> 5.46:1), and added comprehensive `prefers-reduced-motion` overrides.
- **Web Security Hardening:** Eliminated cleartext passwords via Web Crypto SHA-256 hashing; added strict CSP and security headers; built `sanitizeUrl`, `sanitizeRedirectPath`, and `isSafeUrl` input/redirect guards with 12 security unit tests.
- **Global Resource Efficiency:** Implemented user-configurable and auto-sensing Eco Mode (`data-eco="true"`), low-power Three.js WebGL context, 30 FPS ambient / 60 FPS interactive pacing, and 25-second inactivity sleep timer (0% idle GPU utilization).

---

## 2. Baseline Architecture & Environment Discovery

### Repository Information

- **Local Path:** `./portfolio`
- **Remote URL:** `https://github.com/AkashKundu114/AkashKundu114.github.io.git`
- **Active Branch for Audit:** `audit-engineering-sync` (branched from `main` at `2244ecc`)
- **Hosting Target:** GitHub Pages (`HashRouter` routing strategy for seamless client-side page transitions without server rewrite requirements)
- **Framework & Tooling:**
  - Runtime: Node.js `v24.19.0`
  - Core: React 18.2.0, TypeScript 5.2.2, Vite 8.2.1 (Rolldown bundler)
  - Styling: Tailwind CSS 3.4.10, Custom CSS Variable Theme Engine (5 tactile colorways)
  - Animation & 3D: Framer Motion 11.3.19, Three.js 0.182.0
  - Client Search: Fuse.js 7.0.0
  - PWA: `vite-plugin-pwa` 1.3.0 (Workbox 7.4.0)
  - Testing: Vitest 4.1.10, React Testing Library 16.3.0, JSDOM 27.4.0

### Port Collision Safeguard

Port 5173 was discovered to be actively occupied by `./copper\frontend` (Vite dev server). The portfolio's preview server was explicitly bound to `http://localhost:4173/` (`task-145`), avoiding any interference with ongoing development on COPPER.

---

## 3. Discovered Defects, Root Causes & Verified Resolutions

| Finding ID   | Severity | Category      | Description                                                                                                         | Root Cause                                                                                                            | Fix Applied                                                                                                                       | Verification Test / Evidence                                    |
| :----------- | :------- | :------------ | :------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| **AUDIT-01** | P1       | Build / Lint  | `prefer-const` and unused variable ESLint errors                                                                    | `useScrollReveal.ts` mutated `let` variables; `Footer.tsx` defined unused `index` param                               | Converted to `const`, removed unused index                                                                                        | `npm run lint` exited code 0                                    |
| **AUDIT-02** | P1       | TypeScript    | `vite-env.d.ts` empty, causing `import.meta.env` errors; TS2783 duplicate key in `DataContext.tsx`                  | Missing Vite client type declaration; spreading defaults after overrides                                              | Populated `vite-env.d.ts`; cleaned spreading order in `DataContext.tsx`                                                           | `npx tsc --noEmit` exited code 0                                |
| **AUDIT-03** | P1       | Dead Code     | Unused legacy build files (`original_index.css`, `original_tailwind.config.js`, `strip_comments.js`)                | Leftover artifacts from prior CSS migrations                                                                          | Safely removed files, uninstalled unused npm dependencies (`@samasante/liquid-glass`, `strip-comments`)                           | Repository file tree verification                               |
| **AUDIT-04** | P0       | Content Sync  | Missing flagship research project `icc-clustering`                                                                  | Project was built and documented in `./icc-clustering` with submitted IEEE manuscript, but omitted from `projects.ts` | Added `icc-clustering` with full technical specs, benchmarks, and SVG diagram                                                     | `src/__tests__/Projects.test.tsx` and UI preview                |
| **AUDIT-05** | P1       | Content Sync  | Inaccurate claims for COPPER (claiming 30 agents vs 12 implemented) and OphthalmoAI (AUROC stated 0.9805 vs 0.9818) | Outdated roadmap estimates in portfolio copy                                                                          | Synchronized agent counts to 12 (+5 roadmap), AUROC to 0.9818, ECE to 0.0381, tests to 685 (COPPER), 335 (OphthalmoAI), 113 (ICC) | `docs/PROJECT_SYNCHRONIZATION_MATRIX.md`                        |
| **AUDIT-06** | P2       | Performance   | Home route chunk was 547.4 kB due to static Three.js import in `AdvertisingCloud3D`                                 | Eager module importing in `Home.tsx`                                                                                  | Configured `React.lazy()` with `<Suspense>` fallback; Vite `manualChunks(id)`                                                     | Home chunk reduced to 13.03 kB; Three.js code-split to 536 kB   |
| **AUDIT-07** | P2       | Performance   | PWA precache was 6.8 MB (bundled all high-res certificate PNGs and PDFs)                                            | `globPatterns: ['**/*.{js,css,html,ico,png,svg}']` matched all public assets                                          | Configured `globIgnores: ['certificates/**', 'cv/**']` and runtime `StaleWhileRevalidate` caching                                 | Precache payload dropped from 6.8 MB to 1.08 MB (84% reduction) |
| **AUDIT-08** | P2       | Accessibility | Missing `<h1>` elements on 6 pages (`Projects`, `About`, `Skills`, `Education`, `Certificates`, `Contact`)          | Top-level page titles were marked up as `<h2>`                                                                        | Upgraded main page titles to `<h1 className="reveal heading-lg">`                                                                 | Headless Chrome CDP audit verified H1 text on all routes        |
| **AUDIT-09** | P2       | Accessibility | Nested interactive elements: `div role="button"` containing `<a>` tags on project cards                             | Card click handler wrapped child GitHub link                                                                          | Refactored card container to `<article>` with discrete title and details `<Link>`                                                 | WCAG 4.1.2 compliance; keyboard Tab navigation                  |
| **AUDIT-10** | P2       | Accessibility | Theme 5 accent color `#be0015` on `#001524` had 2.23:1 contrast ratio                                               | Dark red selected against dark navy background                                                                        | Updated Theme 5 `--accent` to `#ff5c6d` (5.46:1 contrast ratio)                                                                   | WCAG AA contrast calculation (>= 4.5:1)                         |
| **AUDIT-11** | P2       | Accessibility | Missing Skip to Main Content landmark and route 404 handler                                                         | Keyboard users had to tab through entire navbar; unknown routes showed blank page                                     | Added hidden skip link targeting `<main id="main-content">`; created `NotFound.tsx` wildcard route                                | Tested keyboard navigation & 404 route                          |
| **AUDIT-12** | P2       | SEO & PWA     | Missing `robots.txt`, `sitemap.xml`, and branded PWA icons                                                          | Placeholder or missing icons in `public/icons/`                                                                       | Generated crisp `og-image.png` (1200x630), `icon-512.png`, `icon-192.png`; created sitemap & robots                               | HTTP 200 verification on `/robots.txt` and `/sitemap.xml`       |

---

## 4. Source Project Synchronization Summary

### 1. C.O.P.P.E.R. (`./copper`)

- **Remote:** `https://github.com/AkashKundu114/C.O.P.P.E.R.git` | Branch: `main` (`5ed4f36`)
- **License:** Proprietary source-available evaluation license.
- **Architectural Ground Truth:** End-to-end local-first personal AI operating system. 12 specialized agent types implemented in `backend/app/agents` (Architect, Coder, Debugger, Reflex Router, Terminal Agent, Web Browser Agent, Memory Linker, Vector Search Agent, File Watcher, System Guardian, Evaluation Agent, Document Synthesizer) with 5 additional roadmap targets.
- **Test Suite:** **685 passing tests** (644 Pytest backend + 41 Vitest frontend).
- **Latency & Hardware Ground Truth:** 1.5B pinned reflex router + LRU paged 14B Qwen2.5 (IQ3_XS quantized) running comfortably in 8 GB consumer VRAM. In-memory reflex dispatch delivers ~9,856 QPS at <0.10ms cached latency.
- **Research:** 25-page comprehensive IEEE Transactions on Consumer Electronics / arXiv research manuscript (`research/paper.pdf`, 6.30 MB) verified for publication-grade formatting.

### 2. OphthalmoAI (`./ophthalmoai`)

- **Remote:** `https://github.com/AkashKundu114/OphthalmoAI.git` | Branch: `main` (`2b86dd5`)
- **License:** Apache 2.0.
- **Architectural Ground Truth:** Dual-engine retinal screening system. MobileNetV3-Small INT8 quantized client edge inference via ONNX Runtime Web WASM (<2MB asset, 9.03ms mean latency) paired with an enterprise FastAPI PyTorch backend.
- **Statistical Calibration:** **0.9818 Macro AUROC** across diabetic retinopathy, glaucoma, and macular degeneration; **0.0381 Expected Calibration Error (ECE)** achieved via temperature scaling ($T \in [1.06, 1.34]$).
- **Domain Guardrails:** Out-of-Distribution Rejection (OAC-DG) verified at 97.84% rejection on 2,500 non-fundus stress images with 0.00% False Rejection Rate (FRR) on clinical scans.
- **Test Suite:** **335 passing tests** (312 backend Pytest + 23 frontend Vitest).
- **Compliance:** Full clinical decision support (CDS) disclaimer and research intent notice explicitly documented.

### 3. ICC Clustering (`./icc-clustering` / `Final Year Project`)

- **Remote:** `https://github.com/AkashKundu114/icc-clustering.git` | Branch: `fix/audit-remediation` (`1db855a`), upstream `main` (`879fd96`)
- **License:** MIT.
- **Architectural Ground Truth:** Inductive Consensus Clustering (ICC-v2) by Akash Kundu. Evaluated across 13 benchmark datasets (including cancer microarray gene expression, high-dimensional manifolds, and synthetic stress sets) against 11 baseline algorithms (K-Means, Spectral, Agglomerative, DBSCAN, Birch, GMM, Ward, Fast-KMeans, MiniBatch, Affinity Propagation, MeanShift).
- **Key Algorithmic Innovations:**
  1. Variance-Stabilized Subspace Gating (VSSG) based on Hartigans' dip bimodality coefficient screening, eliminating distractor dimensions with 0.94-0.96 precision@50 up to $D=5,000$. Memory-bounded column chunking slashes high-D peak RAM by **74.2%** (76.54 MB → 19.76 MB).
  2. Rectangular $\mathcal{O}(NL)$ bipartite co-association consensus graph saving 39.1% auxiliary memory over classical quadratic $\mathcal{O}(N^2)$ consensus at $N=8,000$ (-50.0% benchmark RAM).
  3. Closed-form inductive out-of-sample projection avoiding full graph recomputation with $2.61 \times 10^6$ queries/sec streaming throughput.
- **Test Suite:** **113/113 passing pytest unit tests**.
- **Manuscripts:** IEEE TKDE manuscript (`ieee_manuscript/dist/main.pdf`, 7.79 MB) and ICDE 2027 paper (`dist/icde_main.pdf`, 3.34 MB).

---

## 5. Verification & Quality Gates

All fixes were verified through four complementary quality gates:

1. **Static Analysis & Linting:**
   - `npm run lint` -> 0 errors, 0 warnings (100% clean).
   - `npx tsc --noEmit` -> 0 errors.
2. **Automated Unit, Security & Integration Testing:**
   - `npm run test -- --run` -> 13 test files, 129 passing tests (100% success rate, 0 failures).
3. **Production Bundling & Asset Verification:**
   - `npm run build` -> clean build in 1.24s.
   - Home chunk: 13.11 kB.
   - PWA Precache: 1,097.44 KiB (36 precache entries).
4. **Headless Chrome CDP Multi-Viewport & Multi-Route Automation:**
   - Tested 9 viewports (320px to 1920px). Zero horizontal scroll overflow detected on any viewport.
   - Tested all 9 routes. Verified valid H1 heading landmarks, dynamic document titles, 0 missing image `alt` attributes, 0 missing button accessible names, 0 broken links, 0 uncaught exceptions, and 0 console errors.

---

## 6. Safety & Preservation Attestation

- **Git Branch:** All modifications are isolated on dedicated engineering and hardening branches (`audit-engineering-sync` and `sec-privacy-perf-hardening`). No commits have been made to `main`, and no changes were pushed to `origin`.
- **Pre-existing User Work:** All pre-existing user files in `public/cv/` (`AkashKundu_CV.pdf`, `resume_sde.tex`, `resume_cdac.pdf`, `resume_cdac.tex`) were strictly preserved without modification.
