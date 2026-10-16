# Codebase Modernization & Full-Stack Refactoring Log

## Version 2.1.0 — Architecture Hardening & 3D WebGL Integration

A comprehensive, ground-up refactoring of the portfolio codebase emphasizing modular architecture, descriptive naming, boundary condition checks, type safety, test-driven validation, and 3D WebGL integration.

---

### 1. Academic & Profile Updates

- **CGPA**: Updated cumulative grade point average to **7.59 / 10.0** till 6th semester in `src/data/education.ts` and `src/pages/Education.tsx`.
- **Status**: Updated academic status to reflect completion of 6 semesters with active 4th-year coursework.

---

### 2. Procedural 3D WebGL Integration (ThreeUI-Inspired)

- Added [`AdvertisingCloud3D.tsx`](src/components/AdvertisingCloud3D.tsx) utilizing Three.js and hardware-accelerated WebGL.
- **Architectural Design**:
  - Procedural geodesic wireframe icosahedron with an emissive inner core and spherical particle starfield.
  - 5 interactive orbital satellite nodes modeling multi-channel AdTech & AI streams (AI Agent Swarm, Search & RTB Engine, Social Attribution Mesh, Multi-Tenant Data Store, ELK Telemetry).
  - Smooth inertial mouse-tilt tracking with canvas dimension boundary guards.
  - Interactive mode toggles (_Advertising Cloud_, _AI Agent Swarm_, _Multi-Tenant Mesh_) and clickable telemetry cards.
  - Memory-safe lifecycle: Full GPU asset disposal (`disposeSceneBundle`) and `IntersectionObserver` pause mechanics to maintain 60 FPS without leaking VRAM.

---

### 3. Component Architecture (`src/components/`)

- **Polymorphic Action Container**: Unified navigation routing across `ShinyButton`, `Tactile3DButton`, `GlitchButton`, and `GlassButton` in `EvilButtons.tsx`, eliminating repeated branching and casting.
- **Defensive Boundary Handling**:
  - `CustomCursor.tsx`: Added window/document undefined checks, sanitized dimensions with `Math.max(1, innerWidth)`, and extracted modular canvas drawing functions.
  - `LiquidGlassLens.tsx`: Added resilient CSS variable/hex color blending resolving box shadows safely.
  - `Navbar.tsx`: Extracted modular subcomponents (`BrandIdentity`, `DesktopNavLinks`, `MobileDrawer`), added `Escape` key dismissal, and fixed DOM nesting violations.
  - `Footer.tsx`: Modularized legal and social link iterators with immutable configurations and dynamic year fallback.
  - `PageTransition.tsx` & `AmbientBackground.tsx`: Added strict prop typing, `React.memo` wrapping, and null child guards.

---

### 4. Data, Context & Hooks (`src/data/`, `src/context/`, `src/hooks/`)

- **Eliminated Redundant Legacy Files**: Removed obsolete `src/hooks/useScrollReveal.js`.
- **Hardened Scroll Reveal Hook** (`src/hooks/useScrollReveal.ts`):
  - Generic typing (`RefObject<T | null>`).
  - Added boundary checks for `window` availability, element connectivity (`isConnected`), and `IntersectionObserver` existence.
  - Added resilient fallback timeout timers (1200ms) with unmount cleanup to guarantee visibility even if observers are stalled.
- **Resilient State Management** (`src/context/`):
  - `DataContext.tsx`: Try/catch wrapping on storage reads and writes (`safeReadStore`, `safeWriteStore`) guarding against privacy sandbox `SecurityError` and quota limits. Added defensive CRUD operation fallbacks.
  - `ThemeContext.tsx`: Defensive theme validation, DOM attribute synchronization, and safe storage persistence.
- **Data Lookup & Search Helpers** (`src/data/`):
  - Added boundary-checked search and filter functions to `projects.ts`, `skills.ts`, `education.ts`, and `certificates.ts`.
  - Rewrote skills into discrete, proper technologies across distinct categories without merged compound titles.

---

### 5. Page Components Hardening (`src/pages/`)

- **Route Parameter Boundaries**: Sanitized ID route parameters in `ProjectDetail.tsx` and `CertificateDetail.tsx` with dedicated 404 fallback cards.
- **Search & Filter Boundaries**: Clamped search queries in `Projects.tsx` to 80 characters, sanitized non-printable control characters, and added clear filter reset actions.
- **Form Validation & Accessibility**: Formulated strict RFC-compliant regex validation and character count boundaries in `Contact.tsx`.
- **Keyboard Navigation**: Implemented keyboard event triggers (`Enter`, `Space`, `Escape`, `ArrowLeft`, `ArrowRight`) across card lists and image lightboxes.
- **Clean Semantic Markup**: Structured headers, navigation, and content sections cleanly with zero implicit type coercions.

---

### 6. Backend Microservice (`backend/contact_api.py`)

- **Input Validation**: Strict min/max boundaries on `name` (2–100 chars), `email` (max 254 chars, RFC regex, disposable domain blocklist), and `message` (10–3000 chars).
- **SMTP Injection Protection**: Prohibited carriage returns (`\r`) and line breaks (`\n`) in the name and subject fields to block header injection attacks.
- **Network Resilience**: Configured explicit socket timeouts (`DEFAULT_SMTP_TIMEOUT_SECONDS = 10`) on SMTP connections to prevent thread starvation.
- **Security & Error Handling**: Mapped specific HTTP status codes (400, 429, 500, 503, 504) with HTML body escaping.

---

### 7. Comprehensive Test Suite Expansion (`src/__tests__/`)

Expanded the test suite from 1 smoke test to **107 comprehensive automated unit tests** across 9 test files (100% pass rate):

- `data.test.ts` (32 tests): Validates schemas, uniqueness invariants, and search/lookup helpers.
- `useScrollReveal.test.tsx` (13 tests): Validates immediate viewport triggers, observer registration, and timeout fallbacks.
- `DataContext.test.tsx` (16 tests): Validates initial state hydration, CRUD operations, and storage quota resilience.
- `ThemeContext.test.tsx` (6 tests): Validates theme switching, DOM attribute binding, and fallback context handling.
- `EvilButtons.test.tsx` (16 tests): Validates button variants, router links, download anchors, and size mappings.
- `Navbar.test.tsx` (6 tests): Validates desktop routes, mobile drawer toggle, and scroll threshold styling.
- `Footer.test.tsx` (4 tests): Validates legal/social links, dynamic copyright year, and hover states.
- `LiquidGlassLens.test.tsx` (13 tests): Validates intensity presets, hex and CSS variable shadow blending.
- `App.test.tsx` (1 test): Validates root application rendering.
