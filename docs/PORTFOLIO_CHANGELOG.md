# Portfolio Audit & Engineering Synchronization Changelog

All notable changes made to the `AkashKundu114.github.io` codebase during the Master Audit & Project Synchronization are documented in this file.

---

## [Unreleased] - Audit Branch: `audit-engineering-sync` (October 2026)

### Added
- **Flagship Project Addition:**
  - Added `icc-clustering` (Inductive Consensus Clustering ICC-v2) to `src/data/projects.ts` with complete mathematical specifications, VSSG feature gating, $\mathcal{O}(NL)$ bipartite co-association memory benchmarks (-39.1% RAM), 76/76 passing pytest tests, and submitted IEEE TKDE / ICDE manuscripts.
  - Created high-resolution dark-aesthetic vector architecture snapshot: `public/projects/icc-clustering-architecture.svg`.
- **New Components & Hooks:**
  - `src/components/ErrorBoundary.tsx`: React error boundary catching rendering exceptions and displaying actionable recovery UI with `role="alert"`.
  - `src/pages/NotFound.tsx`: Styled 404 route matching the portfolio's cyberpunk glass aesthetic, equipped with return home and explore projects CTAs.
  - `src/hooks/useDocumentTitle.ts`: Reusable hook updating `document.title` and meta description on route transitions.
- **Automated Unit & Integration Tests:**
  - `src/__tests__/NotFound.test.tsx`: Tests 404 page rendering, H1 landmark, and navigation links.
  - `src/__tests__/ErrorBoundary.test.tsx`: Tests component error boundary interception and recovery actions.
  - `src/__tests__/Projects.test.tsx`: Tests project search, tag filtering, H1 heading, and presence of COPPER, OphthalmoAI, and ICC Clustering.
- **SEO & PWA Assets:**
  - `public/robots.txt`: Search crawler directives allowing all indexable content while disallowing admin routes.
  - `public/sitemap.xml`: XML sitemap declaring canonical URLs for all routes.
  - `public/icons/og-image.png`: 1200x630 branded Open Graph / Twitter Card social preview.
  - `public/icons/icon-192.png`: 192x192 PWA application icon.
  - `public/icons/icon-512.png`: 512x512 PWA maskable application icon.
- **Audit Documentation Suite (`docs/`):**
  - `docs/PORTFOLIO_AUDIT_REPORT.md`: Comprehensive engineering and architectural audit report.
  - `docs/PORTFOLIO_UI_UX_MATRIX.md`: Typography, spacing, theme contrast, and button suite design system matrix.
  - `docs/PORTFOLIO_RESPONSIVENESS_REPORT.md`: Cross-device verification across 9 viewports via CDP automation.
  - `docs/PORTFOLIO_ACCESSIBILITY_PERFORMANCE_REPORT.md`: WCAG 2.2 AA certification and Core Web Vitals optimization report.
  - `docs/PROJECT_SYNCHRONIZATION_MATRIX.md`: Ground truth synchronization ledger across COPPER, OphthalmoAI, and ICC Clustering.
  - `docs/PORTFOLIO_TEST_RESULTS.md`: Automated test execution logs (114 passing tests across 12 files, 0 errors).
  - `docs/PORTFOLIO_CHANGELOG.md`: Detailed changelog of all modifications.

### Changed
- **Frontend Architecture, UI & Code-Splitting:**
  - `src/components/Navbar.tsx`: Added interactive Theme Cycler / Switcher button with tactile feedback, accessible `aria-label`, and dynamic active theme name/swatch badge in both desktop navigation and mobile drawer menu; allows instant live toggling across all 5 themes (`Cyber Neon`, `Emerald Matrix`, `Solar Gold`, `Amethyst Void`, `Crimson Flare`); exported `THEME_METADATA` from `src/context/ThemeContext.tsx`.
  - `src/App.tsx`: Wrapped routes with `<ErrorBoundary>`, added wildcard route `<Route path="*" element={<NotFound />} />`, integrated `<a href="#main-content">Skip to main content</a>`, assigned `id="main-content"` and `tabIndex={-1}` to `<main>`, and passed `future={{ v7_startTransition: true, v7_relativeSplatPath: true }}` to `HashRouter`.
  - `src/pages/Home.tsx`: Lazy-loaded `AdvertisingCloud3D` with `<Suspense>` fallback, dropping the initial Home chunk from **547.4 kB to 13.03 kB**; refactored project cards from `div role="button"` to semantic `<article className="row-card">` with native `<Link>` navigation; integrated `useDocumentTitle`.
  - `src/components/AdvertisingCloud3D.tsx`: Replaced deprecated `THREE.Clock` with standard `performance.now()` delta timer; added `window.matchMedia('(prefers-reduced-motion: reduce)')` check to stop orbital rotation when reduced motion is preferred.
  - `vite.config.js`: Configured Rolldown `manualChunks(id)` function separating Three.js into a distinct vendor chunk (`three-*.js`); updated Workbox PWA caching to ignore certificates and CV folders, slashing precache payload from **6.8 MB to 1.08 MB (84% reduction)** while establishing 30-day `StaleWhileRevalidate` runtime caching.
- **Accessibility & Headings (WCAG 2.2 AA):**
  - `index.html`: Removed redundant `role="main"` and `aria-label` from `<div id="root">`; preloaded `Space Grotesk` and `Space Mono` fonts; ensured entry script references `/src/main.tsx`.
  - `src/pages/Projects.tsx`: Changed page title from `<h2>` to `<h1 className="reveal heading-lg">`; refactored project cards to semantic `<article>` without nested interactive buttons; integrated `useDocumentTitle`.
  - `src/pages/About.tsx`: Changed page title from `<h2>` to `<h1>`; synchronized COPPER agent count claim from 30 to 12; integrated `useDocumentTitle`.
  - `src/pages/Skills.tsx`: Changed page title from `<h2>` to `<h1>`; integrated `useDocumentTitle`.
  - `src/pages/Education.tsx`: Changed page title from `<h2>` to `<h1>`; integrated `useDocumentTitle`.
  - `src/pages/Certificates.tsx`: Changed page title from `<h2>` to `<h1>`; integrated `useDocumentTitle`.
  - `src/pages/Contact.tsx`: Changed page title from `<h2>` to `<h1>`; integrated `useDocumentTitle`.
  - `src/pages/ProjectDetail.tsx`: Integrated dynamic `useDocumentTitle`.
  - `src/index.css`:
    - Updated Theme 5 `--accent` from `#be0015` (2.23:1 contrast) to `#ff5c6d` (**5.46:1 contrast ratio**, passing WCAG AA).
    - Upgraded `:focus-visible` to `outline: 2px solid var(--accent); outline-offset: 3px;`.
    - Added `@media (prefers-reduced-motion: reduce)` rules pausing marquee scroll, disabling status pulse, and canceling motion transforms.
- **TypeScript & ESLint Corrections:**
  - `src/vite-env.d.ts`: Added `/// <reference types="vite/client" />` to fix missing environment types.
  - `src/main.tsx`: Added non-null assertion on `document.getElementById('root')!`.
  - `src/context/DataContext.tsx`: Fixed duplicate spread key warning TS2783.
  - `src/pages/Privacy.tsx` & `src/pages/Terms.tsx`: Corrected invalid `preset="subtle"` to `intensity="subtle"` on `LiquidGlassLens`.
  - `src/hooks/useScrollReveal.ts`: Converted reassigned `let` variables to `const` to satisfy `prefer-const`.
  - `src/components/Footer.tsx`: Removed unused `index` callback parameter.
  - `package.json`: Moved `@types/three` from `dependencies` to `devDependencies`.

### Removed
- **Dead Code & Legacy Files:**
  - Safely deleted `original_index.css` (87 kB unreferenced legacy stylesheet).
  - Safely deleted `original_tailwind.config.js` (unreferenced legacy Tailwind configuration).
  - Safely deleted `strip_comments.js` (one-off legacy cleanup utility script).
  - Uninstalled unused npm dependencies: `@samasante/liquid-glass` (already replaced with internal `LiquidGlassLens.tsx`) and `strip-comments`.
  - Fixed syntax error in `.gitignore` (`-e node_modules` removed).
