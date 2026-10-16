# Portfolio Cross-Device Responsiveness Report

**Audited Application:** Akash Kundu Portfolio (`http://localhost:4173/`)  
**Auditor Lead:** Antigravity Mobile & Performance QA Lead  
**Execution Environment:** Headless Chromium via Chrome DevTools Protocol (CDP)  
**Date:** October 2026  
**Status:** 100% Pass — Zero Overflow Across All Matrix Viewports

---

## 1. Automated Viewport Audit Matrix

The portfolio was tested using real headless Chrome browser automation across all 9 standard responsive breakpoints required by the master audit specification.

| Device Category      | Viewport Dimensions | Orientation | Measured `scrollWidth` | Measured `clientWidth` | Horizontal Overflow? | Visual Layout Check                            | Screenshot Evidence                               |
| :------------------- | :------------------ | :---------- | :--------------------- | :--------------------- | :------------------- | :--------------------------------------------- | :------------------------------------------------ |
| **Narrow Mobile**    | `320 × 568`         | Portrait    | **320 px**             | **320 px**             | **No (0px)**         | Single-column, stacked CTAs, condensed marquee | `audit_screenshots/mobile_narrow_320x568.png`     |
| **Android Mobile**   | `360 × 800`         | Portrait    | **360 px**             | **360 px**             | **No (0px)**         | Compact card layout, clean line wraps          | `audit_screenshots/mobile_android_360x800.png`    |
| **Modern iPhone**    | `390 × 844`         | Portrait    | **390 px**             | **390 px**             | **No (0px)**         | Natural button padding, fluid typography       | `audit_screenshots/mobile_modern_390x844.png`     |
| **Large Mobile**     | `430 × 932`         | Portrait    | **430 px**             | **430 px**             | **No (0px)**         | Full touch target spacing, comfortable reading | `audit_screenshots/mobile_large_430x932.png`      |
| **Tablet Portrait**  | `768 × 1024`        | Portrait    | **768 px**             | **768 px**             | **No (0px)**         | 2-column domain bento grid, row cards active   | `audit_screenshots/tablet_portrait_768x1024.png`  |
| **Tablet Landscape** | `1024 × 768`        | Landscape   | **1024 px**            | **1024 px**            | **No (0px)**         | Expanded nav menu, 3D WebGL model centered     | `audit_screenshots/tablet_landscape_1024x768.png` |
| **Standard Laptop**  | `1280 × 800`        | Landscape   | **1280 px**            | **1280 px**            | **No (0px)**         | 3-column bento, stats row horizontally aligned | `audit_screenshots/laptop_standard_1280x800.png`  |
| **Desktop**          | `1440 × 900`        | Landscape   | **1440 px**            | **1440 px**            | **No (0px)**         | Max-width container (1080px) centered          | `audit_screenshots/desktop_1440x900.png`          |
| **Large Desktop**    | `1920 × 1080`       | Landscape   | **1920 px**            | **1920 px**            | **No (0px)**         | Full visual fidelity, 60 FPS WebGL simulation  | `audit_screenshots/desktop_large_1920x1080.png`   |

---

## 2. Key Responsive Behaviors & Remediation Analysis

### 1. Horizontal Scrollbar & Overflow Elimination

- **Defect Potential:** Long monospace words, technology tags, and pre-formatted code strings commonly cause mobile horizontal blowout on 320px screens.
- **Verification Result:** Zero overflow detected across all 9 viewports (`scrollWidth === clientWidth` on all tests).
- **Enforced Styles:**
  - `overflow-x: hidden` on root `body` and `html`.
  - `.marquee-wrap` handles infinite horizontal animation with `overflow: hidden` and negative margin matching page gutters.
  - `word-break: break-word` and `flex-wrap: wrap` applied to technology tag containers and meta badges.

### 2. Navigation Bar & Mobile Drawer Dynamics

- **Desktop (>= 768px):** Fixed translucent glass navbar (`backdrop-filter: blur(16px)`), horizontal nav items with active route indicator, Theme Palette cycler with live color swatch, Eco Mode battery toggle pill (`Eco ON / OFF`), CV download button, and GitHub profile link.
- **Mobile (< 768px):** Compact branding pill with hamburger toggle button (`aria-label="Toggle navigation menu"`). Clicking opens a full-screen drawer with large touch-friendly route targets (minimum 48px height), full-width CV and GitHub buttons, theme cycle button, and dedicated Eco Mode toggle (`⚡ Eco Active / 🔋 Eco OFF`), preventing misclicks.
- **Escape Key Handling:** Drawer listens for Escape key and outside clicks to smoothly dismiss.

### 3. Bento Grid & Card Breakpoints

- **Domain Cards (`Home.tsx`):**
  - Desktop (`> 900px`): `grid-template-columns: repeat(3, 1fr)`.
  - Tablet (`600px - 900px`): `grid-template-columns: repeat(2, 1fr)`.
  - Mobile (`< 600px`): `grid-template-columns: 1fr`.
- **Project Cards:** Uses CSS Flexbox row layout that automatically wraps tech tags and action buttons below 640px viewport width, maintaining full button clickability and preventing awkward line wraps.

### 4. Interactive 3D WebGL Canvas (`AdvertisingCloud3D`)

- **Resize Observer:** Automatically monitors container client width and recalculates camera aspect ratio and renderer pixel dimensions on resize.
- **Device Pixel Ratio (DPR) Clamping:** Clamped to `Math.min(window.devicePixelRatio, 2)` to avoid GPU memory exhaustion on ultra-dense mobile screens (e.g. iPhone Retina 3x).
- **Reduced Motion Adaptation:** When `prefers-reduced-motion` is detected, orbital rotations pause and tilt inertia softens, ensuring comfortable viewing for users with vestibular sensitivities.

### 5. Browser Zoom Testing (200%)

- The application was stress-tested at 200% simulated zoom level in Chromium.
- Relative `rem` and fluid `clamp()` sizing allowed typography and UI containers to expand proportionally without clipping content or causing overlapping text collisions.
