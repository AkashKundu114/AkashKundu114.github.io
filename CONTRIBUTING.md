# Contributing to Akash Kundu Portfolio

Thank you for your interest in contributing to this repository. This document outlines the standards, workflows, and quality gates for proposing changes.

---

## 🛠️ Development Setup

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/AkashKundu114/AkashKundu114.github.io.git
   cd AkashKundu114.github.io
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start local development server:**

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173/` in your browser.

4. **Verify local test suite:**
   ```bash
   npm test
   ```

---

## 🌿 Git Workflow & Branching

- Always create a new branch from `main`:
  - `feat/feature-name` for new user-facing capabilities
  - `fix/bug-description` for bug fixes
  - `docs/documentation-update` for documentation improvements
  - `refactor/scope-of-change` for code improvements without functional change
  - `test/test-description` for adding or improving test coverage

- **Commit Message Format:** Follow Conventional Commits:
  - `feat(scope): concise description`
  - `fix(scope): concise description`
  - `docs(scope): concise description`
  - `refactor(scope): concise description`
  - `test(scope): concise description`

---

## 📐 Coding Conventions

- **Language:** TypeScript 5.x with strict type checking. Avoid `any` types; prefer explicit interfaces or generics.
- **Styling:** CSS Custom Properties (CSS variables) adhering to the 5 defined theme palettes (`data-theme="theme-1"` through `"theme-5"`), Tailwind CSS utilities, and custom modular classes in `src/index.css`.
- **Formatting:** Prettier with 2 spaces, single quotes, and semicolons enabled (see `.editorconfig` and `prettier.config.js`).
- **Linting:** ESLint 9+ via `npm run lint`. Ensure zero errors and zero warnings before submitting.
- **Accessibility:** Ensure all interactive elements have visible focus indicators (`:focus-visible`), appropriate ARIA attributes, semantic HTML landmarks (`<main>`, `<nav>`, `<header>`, `<footer>`), and support `prefers-reduced-motion`.
- **Security:** Sanitize any external or dynamic URLs with `sanitizeUrl()` from `src/utils/security.ts`. Never commit secrets or credentials.

---

## 🧪 Quality Verification Checklist

Before creating a Pull Request, verify that all quality gates pass locally:

```bash
# 1. Run full unit and integration test suite
npm test

# 2. Check TypeScript types
npm run typecheck

# 3. Check code style and lint rules
npm run lint

# 4. Verify production bundle build
npm run build
```

---

## 📬 Submitting a Pull Request

1. Push your branch to your fork.
2. Open a Pull Request targeting `main`.
3. Provide a clear description of:
   - What changed and why.
   - Any manual or automated testing performed.
   - Relevant screenshots or screen recordings for UI changes.
4. Ensure automated GitHub Actions CI checks pass.
