# Phase A: Initial Comprehensive Repository & Site Audit Report

**Target Repository:** `github.com/AkashKundu114/AkashKundu114.github.io`  
**Live Site URL:** `https://akashkundu.me` / `https://akashkundu114.github.io`  
**Audit Date:** 2026-10-17  
**Auditor:** Subagent R (Orchestrator Read-Only Baseline Assessment)  
**Branch:** `cleanup/public-site`  

---

## 1. Tooling & Infrastructure Baseline

| Category | Specification | Evidence / File Source |
| -------- | ------------- | ---------------------- |
| **Framework & Version** | React 18.3.1 | [`package.json`](file:///d:/akashkundu/package.json#L16) |
| **Bundler & Version** | Vite 8.2.1 | [`package.json`](file:///d:/akashkundu/package.json#L39) |
| **Language & Typings** | TypeScript ~5.5.4 (Strict mode) | [`tsconfig.json`](file:///d:/akashkundu/tsconfig.json) |
| **Router Type** | `HashRouter` (React Router v6.24.0 with v7 future flags) | [`src/App.tsx`](file:///d:/akashkundu/src/App.tsx#L80) |
| **Package Manager** | npm 10.x | [`package-lock.json`](file:///d:/akashkundu/package-lock.json) |
| **Node.js Runtime** | Node.js 20.x LTS / 24.x | GitHub Actions setup [`deploy.yml`](file:///d:/akashkundu/.github/workflows/deploy.yml#L24) |
| **Build Command** | `npm run build` (`vite build`) | [`package.json`](file:///d:/akashkundu/package.json#L8) |
| **Test Runner** | Vitest 4.1.12 with JSDOM | [`vitest.config.ts`](file:///d:/akashkundu/vitest.config.ts) |
| **PWA Plugin** | `vite-plugin-pwa` 1.3.0 (Workbox `generateSW`) | [`vite.config.js`](file:///d:/akashkundu/vite.config.js#L8) |
| **Deployment Method** | GitHub Actions (`actions/deploy-pages@v4`) | [`.github/workflows/deploy.yml`](file:///d:/akashkundu/.github/workflows/deploy.yml) |
| **Custom Domain** | `akashkundu.me` | [`public/CNAME`](file:///d:/akashkundu/public/CNAME) |
| **Base Path** | `/` (Absolute root) | [`vite.config.js`](file:///d:/akashkundu/vite.config.js#L62) |

---

## 2. Repository File Tree & Asset Weight Analysis

Total Tracked Files: ~95 files.  
Total Working Tree Size: ~45 MB (excluding `node_modules` and `.git`).

### Files Exceeding 1.0 MB Threshold
1. `public/certificates/oracle_agentic_ai.png` — **1.41 MB** (Needs compression to WebP/optimized PNG).
2. `public/certificates/oracle_ai_database.png` — **1.15 MB** (Needs compression to WebP/optimized PNG).

### Production Bundle Size Baseline (`dist/assets/`)
*Captured from `npm run build` logged in `REMEDIATION/site_logs/baseline_build.log`:*
- `index-BUyFMmhR.js`: 332.51 kB (108.60 kB gzip)
- `index-URGAAW5z.css`: 25.73 kB (6.43 kB gzip)
- `three-DmZXPHwl.js`: 536.43 kB (133.08 kB gzip) — *Isolated into separate lazy chunk*
- `Home-C6rlTWdh.js`: 13.11 kB (4.53 kB gzip)
- `Projects-CRJIP5zm.js`: 30.39 kB (10.83 kB gzip)
- `Admin-BxPT0a9Y.js`: 24.29 kB (6.04 kB gzip)
- Total PWA precache: **36 entries (1,097.78 KiB)**

---

## 3. Secrets & Privacy Audit (Working Tree & Git History)

An automated regex and entropy scan was executed across all working tree files (`scripts/security_audit.cjs`) and git history (`git log -S`):

### Critical Findings:
1. **Personal Phone Number Exposure:**
   - Phone number `+91 9064349004` was identified in:
     - `index.html` (JSON-LD schema line 59: `"telephone": "+919064349004"`)
     - `src/pages/About.tsx` (Line 72)
     - `src/pages/Contact.tsx` (Line 78)
     - `src/__tests__/security.test.ts`
     - `public/cv/resume_cdac.tex` & `public/cv/resume_sde.tex`
     - `docs/PORTFOLIO_PRIVACY_REPORT.md`
   - *Action:* Remove phone number completely from HTML, components, resumes, and test fixtures in Phase B.

2. **Secondary Personal Email:**
   - Alternate email `akashkundu1152@gmail.com` was identified in `public/cv/resume_cdac.tex`, `public/cv/resume_sde.tex`, and binary `AkashKundu_CV.pdf`.
   - *Action:* Standardize exclusively on the primary public contact email `akashkundu7487@gmail.com`. Strip alternate email.

3. **Untracked Local SMTP Password:**
   - `backend/.env` contains a plaintext Gmail App Password (`ahucxrkplgfkovoh`) and sender email `anony.mousea623@gmail.com`.
   - *Verification:* Checked via `git log -S ahucxrkplgfkovoh --all` — this secret was **NEVER** committed to Git history. It is local only and gitignored.
   - *Action:* Document rotation in `REMEDIATION/HISTORY_PLAN.md` and sanitize `backend/.env`.

4. **Client-Side Admin SHA-256 Hash:**
   - Hash `45cbd2273491a7d411b202c15a0ca20bbc270d3fc838cfd7f363d30e8d5a83be` is referenced in `.env`, `.env.example`, `deploy.yml`, and `security.test.ts`.
   - *Action:* Convert the `/admin` view into a transparent "Demonstration Management Studio" client sandbox with zero real credentials.

5. **Absolute Local File Paths:**
   - Several markdown files in `docs/` contain Windows drive paths (`D:\akashkundu`, `D:\C.O.P.P.E.R`).
   - *Verification:* Verified zero absolute drive paths exist in the client distribution bundle (`dist/`).

---

## 4. Admin Page Assessment

- **Route:** `/#/admin` ([`src/pages/Admin.tsx`](file:///d:/akashkundu/src/pages/Admin.tsx))
- **Mechanism:** Prompts for a password, computes client-side SHA-256 using `crypto.subtle.digest`, and compares against `VITE_ADMIN_PASSWORD_HASH`.
- **Exposed Data:** Allows editing local state in `localStorage` (`DataContext.tsx`) for projects and certificates.
- **Security Reality:** Because the website is statically hosted on GitHub Pages, client-side password verification provides zero real authorization boundary. Anyone inspecting client code can view the hash or modify their own local storage directly.
- **Decision:** As required by Phase B guidelines, transform the Admin page into an honest, clearly labelled "Demonstration Management Studio" with an explicit disclaimer: *"This is a client-side sandbox for demonstration purposes; edits persist only in your local browser cache."*

---

## 5. Content & Project Inventory

Cross-verified against local project repositories (`D:\C.O.P.P.E.R`, `D:\OphthalmoAI`, `D:\icc-clustering`, `D:\AI-SATHI`, `D:\Projects\resumepilot`, `D:\Projects\Stealth-Chat`, `D:\Projects\stocksage-india`):

| Project ID | Project Title | Verified Status | Key Metrics / Evidence |
| ---------- | ------------- | --------------- | ---------------------- |
| `copper-ai-assistant` | C.O.P.P.E.R. | Completed / Verified | 685 tests (644 Pytest + 41 Vitest); ~9,856 QPS dispatch; 12 agents (+5 roadmap); 100% Threat Catch. |
| `eye-disease-predictor` | OphthalmoAI | Completed / Verified | 335 tests (312 Pytest + 23 Vitest); 85.18% accuracy; 0.9818 Macro AUROC; 0.0381 ECE; ONNX Web edge. |
| `icc-clustering` | Inductive Consensus Clustering (ICC-v2) | Research / Verified | 113 Pytest tests; Rank #1 on cancer microarrays; -74.2% peak RAM; Submitted IEEE TKDE / ICDE manuscripts. |
| `ai-sathi` | AI-SATHI (Kotha-Khata) | Completed / Verified | 389 tests; 0% hallucination on scheme matching; Sarvam AI + Ollama cascade; Field-tested 8 SHGs. |
| `resumepilot` | ResumePilot | Available in `D:\Projects\resumepilot` | Next.js 15, Supabase, Clerk, Stripe, Gemini AI. |
| `e2ee-chat` | Stealth-Comms (E2EE Chat) | Available in `D:\Projects\Stealth-Chat` | 256-bit AES E2EE, WebSockets, JWT, Docker/K8s deployment. |
| `portfolio-cms` | Portfolio CMS | Completed / Verified | 129 Vitest tests, HashRouter, DataContext localStorage abstraction, Workbox PWA. |

---

## 6. Quality & Accessibility Inventory

1. **Test Suite:**
   - Vitest: **129/129 tests passed** across 13 suites in 3.41s.
2. **TypeScript Compilation:**
   - `npx tsc --noEmit`: **0 errors**.
3. **Linter:**
   - ESLint: **0 errors, 0 warnings**.
4. **Supply Chain Audit (`npm audit`):**
   - 9 vulnerabilities in devDependencies (`braces` and `postcss-selector-parser` via Tailwind v3 CLI) and `react-router` 6.24.0.
   - *Mitigation:* Runtime open-redirect risks are strictly mitigated by `sanitizeUrl()` and `sanitizeRedirectPath()`.
5. **Deep Linking on GitHub Pages:**
   - The site uses `HashRouter` (`/#/`, `/#/projects`), ensuring deep links do not 404 on static hosts.
   - Missing: `public/404.html` to gracefully catch and redirect non-hash direct hits (e.g. `https://akashkundu114.github.io/projects`).
6. **External Network Requests:**
   - Google Fonts (`fonts.googleapis.com` and `fonts.gstatic.com`) loaded in `index.html`.
   - *Remediation:* Self-host Inter and JetBrains Mono or configure privacy-preserving fallbacks without third-party tracking.
7. **Accessibility (WCAG 2.2 AA):**
   - Semantic landmarks `<main>`, `<nav>`, `<footer>` present.
   - Skip-to-content link present.
   - Contrast passes across all 5 themes.
   - Reduced motion needs explicit handling in 3D canvas and animations.

---

## 7. Baseline Gate A Verdict

- `REMEDIATION/site_logs/baseline_build.log` — Saved (Exit 0, 990ms build time)
- `REMEDIATION/site_logs/baseline_test.log` — Saved (Exit 0, 129 tests passed)
- `REMEDIATION/site_logs/baseline_lint.log` — Saved (Exit 0, clean)
- `REMEDIATION/site_logs/baseline_typecheck.log` — Saved (Exit 0, clean)
- `REMEDIATION/baseline/bundle_sizes.json` — Saved (Total bundles: 24, Home chunk: 13.11 kB)
- `REMEDIATION/baseline/screenshots/` — 19 responsive baseline screenshots archived

**Phase A Gate Status: PASSED & RECORDED.**
