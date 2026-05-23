# Akash Kundu — Portfolio

> **Building intelligent, data-driven applications from the model to the UI.**

A production-grade personal portfolio built with React 18, featuring a full-stack admin CMS, Framer Motion page transitions, Fuse.js fuzzy search, PWA support, and a FastAPI contact microservice — deployed to a custom domain via GitHub Actions CI/CD.

[![Live](https://img.shields.io/badge/Live-akashkundu.me-4fa3ff?style=flat-square)](https://akashkundu.me)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.11x-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)

---

## ✦ Live Features

| Feature | Technology |
|---|---|
| Page transitions | Framer Motion `AnimatePresence` |
| Fuzzy search + multi-tag filter | Fuse.js |
| Route-based code splitting | `React.lazy` + `Suspense` |
| Progressive Web App | `vite-plugin-pwa` + Workbox |
| Admin CMS | React Context + localStorage |
| Contact API | FastAPI + smtplib + slowapi rate limiting |
| CI/CD | GitHub Actions → GitHub Pages |
| SEO / ATS | JSON-LD Person schema + full Open Graph |

---

## 🗂 Project Structure

```
portfolio/
├── .github/
│   └── workflows/deploy.yml        # GitHub Actions CI/CD
│
├── backend/
│   └── contact_api.py              # FastAPI contact microservice
│
├── public/
│   ├── icons/                      # PWA icons (192px, 512px, favicon.svg)
│   ├── certificates/               # Certificate PDFs + images
│   ├── cv/AkashKundu_CV.pdf        # Downloadable CV
│   └── CNAME                       # akashkundu.me
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── PageTransition.jsx      # Framer Motion wrapper
│   │
│   ├── context/
│   │   ├── ThemeContext.jsx         # Dark / light mode
│   │   └── DataContext.jsx          # CMS data layer (localStorage → API-ready)
│   │
│   ├── data/
│   │   ├── projects.js              # Projects with P→I→I case study fields
│   │   ├── certificates.js          # All 6 certificates
│   │   ├── education.js
│   │   └── skills.js
│   │
│   ├── hooks/
│   │   └── useScrollReveal.js       # Intersection Observer reveal
│   │
│   ├── pages/
│   │   ├── Home.jsx                 # Hero + T-shaped domain cards + featured projects
│   │   ├── About.jsx                # Story narrative + principles + timeline
│   │   ├── Skills.jsx               # Glassmorphism T-shaped skill cards
│   │   ├── Projects.jsx             # Fuse.js fuzzy + multi-tag filter
│   │   ├── ProjectDetail.jsx        # Case study: AI Architecture + UI & Deployment
│   │   ├── Certificates.jsx
│   │   ├── CertificateDetail.jsx
│   │   ├── Education.jsx
│   │   ├── Contact.jsx              # Backend-ready contact form
│   │   └── Admin.jsx                # Password-gated CMS dashboard
│   │
│   ├── App.jsx                      # Lazy routes + AnimatePresence
│   ├── main.jsx
│   └── index.css                    # Design tokens + global styles
│
├── .env.example                     # Environment variable reference
├── AkashKundu_CV.tex                # LaTeX source for the CV
├── index.html                       # JSON-LD schema + SEO meta
├── vite.config.js                   # Vite + VitePWA config
├── tailwind.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 10+
- Python 3.11+ *(only for the contact API backend)*

### 1. Clone and install

```bash
git clone https://github.com/AkashKundu114/portfolio.git
cd portfolio
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Admin dashboard password
VITE_ADMIN_PASSWORD=your_secret_password

# Contact form endpoint — choose one:
VITE_CONTACT_API=http://localhost:8000/api/contact
# VITE_FORMSPREE_ID=your_formspree_id
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Build for production

```bash
npm run build
npm run preview      # preview the built output
```

---

## 🔐 Admin Dashboard

Navigate to **`/#/admin`** (not linked in the nav intentionally).

**Default password:** set via `VITE_ADMIN_PASSWORD` in `.env`.

### What the admin can do

| Action | Description |
|---|---|
| Add project | Full form with title, description, tech tags, GitHub/live links, features |
| Edit project | Pre-filled form — all fields editable |
| Delete project | Confirmation modal, irreversible |
| Add certificate | Issuer, date, skills, category, image/PDF paths |
| Export JSON | Downloads `portfolio-data.json` for backup or backend seeding |
| Reset to defaults | Restores bundled static data |

### Adding your own content

1. Open `/#/admin` and log in.
2. Click **+ Add Project** or **+ Add Certificate**.
3. Fill in the form — changes appear instantly on every page.
4. To add screenshots, place images in `public/projects/<project-id>/` and update the `screenshots` array in `src/data/projects.js`.

### Connecting a real backend

The `DataContext.jsx` is architected for a clean swap:

```jsx
// Currently (localStorage):
const persist = (key, setter) => (data) => {
  setter(data)
  localStorage.setItem(key, JSON.stringify(data))
}

// To use a backend API, replace with:
const saveProjects = async (data) => {
  setProjects(data)
  await fetch('/api/projects', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
```

---

## 📬 Contact Form Backend (FastAPI)

The `backend/contact_api.py` is a production-ready microservice with:

- ✅ Rate limiting — **5 requests / minute per IP** via `slowapi`
- ✅ Input sanitization — HTML escaping, length validation, disposable email blocking
- ✅ SMTP email delivery via Gmail App Passwords
- ✅ CORS configured for your domain
- ✅ Health check endpoint at `/health`

### Setup

```bash
cd backend
pip install fastapi uvicorn[standard] pydantic[email] python-dotenv slowapi
```

Create `backend/.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youraddress@gmail.com
SMTP_PASS=your_gmail_app_password
TO_EMAIL=akashkundu7487@gmail.com
ALLOWED_ORIGIN=https://akashkundu.me
```

> **Gmail App Password:** Settings → Security → 2-Step Verification → App Passwords

### Run

```bash
uvicorn contact_api:app --reload --port 8000
```

Test it:

```bash
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello from the API!"}'
```

### Deploy the backend (free options)

| Platform | Free Tier | Notes |
|---|---|---|
| [Railway](https://railway.app) | 500 hrs/month | Connect GitHub, set env vars, always-on |
| [Render](https://render.com)   | Unlimited (sleeps) | Sleeps after 15 min idle |
| [Fly.io](https://fly.io)       | 3 shared VMs | Best uptime, CLI-based deploy |

After deploying, set `VITE_CONTACT_API=https://your-api-url.railway.app/api/contact` in your GitHub repository secrets.

---

## 📱 PWA (Progressive Web App)

The portfolio is installable as a PWA on any device:

- **Service Worker:** Workbox caches all static assets and Google Fonts
- **Offline support:** Core pages available without a network connection
- **Install prompt:** Appears automatically on Chrome / Edge / Safari iOS

### Required icons (place in `public/icons/`)

| File | Size | Usage |
|---|---|---|
| `favicon.svg` | SVG | Browser tab |
| `icon-192.png` | 192×192 | PWA home screen |
| `icon-512.png` | 512×512 | PWA splash + maskable |
| `og-image.png` | 1200×630 | Open Graph / LinkedIn preview |

Generate PNG icons from the provided `favicon.svg` using [Squoosh](https://squoosh.app) or [RealFaviconGenerator](https://realfavicongenerator.net).

---

## 🚢 Deployment (GitHub Pages + Custom Domain)

### Automatic deployment

Every push to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Installs dependencies with `npm ci`
2. Builds with Vite (environment secrets injected)
3. Deploys the `dist/` folder to GitHub Pages

### GitHub repository secrets

Go to **Settings → Secrets → Actions** and add:

| Secret | Value |
|---|---|
| `VITE_ADMIN_PASSWORD` | Your admin password |
| `VITE_CONTACT_API` | Your FastAPI backend URL |

### Custom domain DNS (Namecheap / GitHub Student Pack)

**A records** pointing to GitHub Pages:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | AkashKundu114.github.io. |

Then in **GitHub → Settings → Pages → Custom domain**: enter `akashkundu.me` and enable **Enforce HTTPS**.

---

## 🎨 Theming

The entire colour system lives in CSS custom properties in `src/index.css`:

```css
:root {                              /* dark mode (default) */
  --bg:      #05080f;
  --accent:  #4fa3ff;                /* change this to rebrand the whole site */
  --ink:     #e8edf5;
  --muted:   #5a7090;
  --surface: #0d1117;
}
[data-theme="light"] {
  --bg:      #f0f4fa;
  --accent:  #1565c0;
}
```

---

## 📄 CV

The LaTeX source (`AkashKundu_CV.tex`) compiles to an ATS-optimised single-column PDF.

**Compile on Overleaf (free):**
1. Upload `AkashKundu_CV.tex` to [overleaf.com](https://overleaf.com)
2. Set compiler to **pdfLaTeX**
3. Download the compiled PDF
4. Replace `public/cv/AkashKundu_CV.pdf`

---

## 📜 License

This project is open for inspiration and reference. Please don't deploy it as-is with my personal information. If you build something from it, a star ⭐ is always appreciated.

---

<div align="center">
  Built with React · Tailwind · Framer Motion · Vite · FastAPI<br/>
  <a href="https://akashkundu.me">akashkundu.me</a> · 
  <a href="https://www.linkedin.com/in/akashkundu114/">LinkedIn</a> · 
  <a href="https://github.com/AkashKundu114">GitHub</a>
</div>
