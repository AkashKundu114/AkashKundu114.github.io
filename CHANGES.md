# Navy Palette + Animation Update

Drop these files into your existing `portfolio-react` project at the same paths
(they overwrite the originals) — that's it, no new dependencies needed.

## Colour palette
New CSS variables in `src/index.css` drive the whole site, so the swap cascades
through every page automatically:

| Role | Dark theme (default) | Light theme |
|---|---|---|
| Background | Deep Blue `#182350` | Floral White `#FEFAEF` |
| Ink (text) | Floral White `#FEFAEF` | Deep Blue `#182350` |
| Muted text | Powder Blue `#AFD2FA` | darker blue tint |
| Primary accent (CTA) | Pale Brown `#B9915E` | Pale Brown `#B9915E` |
| Secondary accent (links/active states) | Powder Blue `#AFD2FA` | mid blue tint |

`--danger` was previously referenced by `tailwind.config.js` and `Contact.jsx`
but never defined — that's fixed now too, using a terracotta tone that fits
the brown/navy family instead of a random red.

Category badge colours (`Certificates`, `CertificateDetail`, `Admin`, and
`Skills`) were consolidated into one shared, palette-derived map in
`src/data/certificates.js` instead of three separate inconsistent objects.

## Animations added
- **Card hover accent line** — every `.card-hover` (project cards, skill rows,
  principle tiles, admin cards) now gets a powder→brown gradient bar that
  sweeps in from the left on hover, plus a lift + shadow.
- **Row-card hover** — left accent bar + lift, used on Projects/Certificates/
  Home's featured list.
- **Nav underline** — the active/hovered nav link gets an animated underline
  instead of a flat background swap.
- **Marquee ticker** — a true infinite-scroll tech strip (pauses on hover),
  used on the Home hero ("pipeline" row) and the bottom of Skills.
- **Stat blocks** — Home now shows live counts (projects/certs/tech) in a
  big-number stat row; Education gets a 3-card stat strip (current semester /
  CGPA / secondary score), both borrowed from the reference HTML's design.
- **Scroll-reveal everywhere** — Home previously had no `.reveal`/stagger
  wiring at all; it now fades/slides in section by section like the other
  pages, with staggered delays on grids and lists.
- **Ambient glow blob** — a soft mouse-following radial-gradient blob (powder/
  brown) was added to the global ambient background, echoing the reference
  file's cursor-tracked blob without hijacking the cursor itself.
- **Focus ring** — added a visible `:focus-visible` outline in the accent
  colour for keyboard navigation accessibility.

## Files changed
- `src/index.css` — palette + all new animation/utility classes
- `index.html`, `vite.config.js` — PWA/theme-color meta updated to Deep Blue
- `src/components/AmbientBackground.jsx` — recoloured + mouse-follow blob
- `src/components/PageTransition.jsx` — slightly richer enter/exit motion
- `src/data/certificates.js` — shared category colour map
- `src/pages/Home.jsx` — stats row, marquee, full reveal wiring, recolour
- `src/pages/About.jsx` — card-hover + stagger on principles/timeline
- `src/pages/Skills.jsx` — recoloured groups + marquee ticker
- `src/pages/Certificates.jsx`, `CertificateDetail.jsx` — shared colour map
- `src/pages/Education.jsx` — added stat-card row
- `src/pages/Projects.jsx`, `ProjectDetail.jsx` — stagger + card-hover on screenshots
- `src/pages/Contact.jsx` — card-hover, danger/accent colour fixes
- `src/pages/Admin.jsx` — danger colour fixes, shared category colours

Everything else (Navbar, Footer, App.jsx, DataContext, hooks, data/projects.js,
data/skills.js, data/education.js, backend, deploy config) was left untouched
because it already pulls all its colour from the CSS variables above and
needed no animation changes.
