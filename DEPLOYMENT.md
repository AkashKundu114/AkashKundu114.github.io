# 🚀 Hosting Guide — akashkundu.me on GitHub Pages

Complete step-by-step guide to deploy your React portfolio to your custom domain
`akashkundu.me` using GitHub Pages and GitHub Actions (free, auto-deploys on every push).

---

## 📋 Prerequisites
- Git installed on your machine
- Node.js 18+ installed
- A GitHub account (yours: AkashKundu114)
- Domain `akashkundu.me` already registered via GitHub Student Pack

---

## PART 1 — Local Project Setup

### Step 1 — Install dependencies
Open a terminal inside the `portfolio-react` folder and run:
```bash
npm install
```

### Step 2 — Add your personal files to /public
Place these files inside the `public/` folder before building:

```
public/
├── cv/
│   └── AkashKundu_CV.pdf          ← Your resume PDF
├── certificates/
│   ├── nptel-python.jpg           ← Certificate images (JPG or PNG)
│   ├── coursera-ml.jpg
│   └── ...
├── projects/
│   ├── copper-ai-assistant/
│   │   ├── screenshot1.png        ← Project screenshots
│   │   └── screenshot2.png
│   └── eye-disease-predictor/
│       └── screenshot1.png
└── CNAME                          ← Already created (contains: akashkundu.me)
```

### Step 3 — Update data files with real info
- `src/data/certificates.js` → Add real certificate details + image paths
- `src/data/projects.js`     → Add real screenshot paths
- `src/pages/Contact.jsx`    → Replace `YOUR_FORM_ID` with your Formspree ID

### Step 4 — Test locally
```bash
npm run dev
```
Open http://localhost:5173 and verify everything looks correct.

### Step 5 — Build for production
```bash
npm run build
```
This creates a `dist/` folder — that's what gets deployed.

---

## PART 2 — GitHub Repository Setup

### Step 6 — Create a GitHub repository
1. Go to https://github.com/new
2. Name it exactly: `portfolio` (or any name you prefer)
3. Set it to **Public**
4. Do NOT add README or .gitignore (your project already has them)
5. Click **Create repository**

### Step 7 — Push your code to GitHub
In your terminal inside `portfolio-react/`:
```bash
git init
git add .
git commit -m "Initial commit: React portfolio"
git branch -M main
git remote add origin https://github.com/AkashKundu114/portfolio.git
git push -u origin main
```

---

## PART 3 — GitHub Actions Auto-Deploy

### Step 8 — Create the GitHub Actions workflow
Create this file in your project (the path matters exactly):

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 9 — Commit and push the workflow
```bash
git add .github/
git commit -m "Add GitHub Actions deploy workflow"
git push
```

---

## PART 4 — Enable GitHub Pages

### Step 10 — Configure Pages in GitHub settings
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

Your site will now auto-build and deploy every time you push to `main`.
You can watch the build at: `https://github.com/AkashKundu114/portfolio/actions`

---

## PART 5 — Connect Custom Domain akashkundu.me

### Step 11 — Add your domain in GitHub Pages settings
1. Still in **Settings → Pages**
2. Under **Custom domain**, type: `akashkundu.me`
3. Click **Save**
4. GitHub will try to verify the domain (wait 1–2 minutes)
5. Check **Enforce HTTPS** once it appears ✓

### Step 12 — Configure DNS at your domain registrar
Your domain `akashkundu.me` was registered via GitHub Student Pack (Namecheap or similar).
Log in to your registrar's DNS settings and add these records:

#### Option A — Root domain (akashkundu.me) → Recommended ✓
Add 4 **A records** pointing to GitHub Pages IPs:

| Type | Host | Value           | TTL  |
|------|------|-----------------|------|
| A    | @    | 185.199.108.153 | 3600 |
| A    | @    | 185.199.109.153 | 3600 |
| A    | @    | 185.199.110.153 | 3600 |
| A    | @    | 185.199.111.153 | 3600 |

Also add a **CNAME** for www:

| Type  | Host | Value                        | TTL  |
|-------|------|------------------------------|------|
| CNAME | www  | AkashKundu114.github.io.     | 3600 |

#### If you used Namecheap (GitHub Student Pack):
1. Log in → Domain List → Manage → Advanced DNS
2. Delete any existing A records
3. Add the 4 A records above (Host = @)
4. Add the CNAME record (Host = www)
5. Click ✓ to save each record

### Step 13 — Wait for DNS propagation
DNS changes take **5 minutes to 48 hours** to propagate worldwide.
Check status at: https://dnschecker.org/#A/akashkundu.me

### Step 14 — Verify everything works
Once DNS propagates:
- Visit: https://akashkundu.me → should show your portfolio ✓
- Visit: https://www.akashkundu.me → should redirect to akashkundu.me ✓
- HTTPS padlock should be green ✓

---

## PART 6 — Updating Your Portfolio

Every time you make changes:
```bash
# Make your changes to src/data/projects.js, certificates.js, etc.
git add .
git commit -m "Update: added new project screenshots"
git push
```
GitHub Actions will automatically rebuild and redeploy in ~2 minutes.

---

## 🗂 File Structure Reference

```
portfolio-react/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Auto-deploy workflow
├── public/
│   ├── CNAME                   ← akashkundu.me (already created)
│   ├── cv/
│   │   └── AkashKundu_CV.pdf   ← ADD YOUR CV HERE
│   ├── certificates/           ← ADD CERT IMAGES HERE
│   └── projects/               ← ADD SCREENSHOTS HERE
├── src/
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   ├── projects.js         ← EDIT to add projects + screenshot paths
│   │   ├── skills.js           ← EDIT to add/remove skills
│   │   ├── certificates.js     ← EDIT to add your certificates
│   │   └── education.js        ← EDIT if education changes
│   ├── hooks/
│   │   └── useScrollReveal.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── Certificates.jsx
│   │   ├── CertificateDetail.jsx
│   │   ├── Education.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## ❓ Common Issues

### Build fails on GitHub Actions
- Check the Actions tab for the error log
- Usually a missing import or syntax error — fix locally with `npm run build` first

### Custom domain shows "404" or old site
- Check that `public/CNAME` contains exactly `akashkundu.me` (no spaces, no https://)
- Re-enter the custom domain in GitHub Pages settings and save again

### HTTPS not working / "Not Secure"
- Wait up to 24 hours after DNS propagation for GitHub to issue an SSL certificate
- Make sure "Enforce HTTPS" is checked in Pages settings

### Contact form not sending
- Sign up at https://formspree.io (free: 50 submissions/month)
- Create a new form → copy the endpoint like `https://formspree.io/f/xyzabcde`
- Replace `YOUR_FORM_ID` in `src/pages/Contact.jsx`

### Screenshots not showing
- Ensure images are placed in `public/projects/<project-id>/` folder
- Update the `screenshots` array in `src/data/projects.js` with the correct paths
- Paths start with `/` e.g. `/projects/copper-ai-assistant/chat.png`

---

## ✅ Launch Checklist

- [ ] `npm install` completed without errors
- [ ] `npm run build` completed without errors
- [ ] CV PDF placed at `public/cv/AkashKundu_CV.pdf`
- [ ] Certificate images placed in `public/certificates/`
- [ ] `src/data/certificates.js` updated with real image paths
- [ ] Formspree endpoint set in `src/pages/Contact.jsx`
- [ ] GitHub repository created and code pushed
- [ ] GitHub Pages set to deploy via GitHub Actions
- [ ] Custom domain `akashkundu.me` entered in Pages settings
- [ ] DNS A records added at your domain registrar
- [ ] DNS propagated (check dnschecker.org)
- [ ] https://akashkundu.me loads correctly ✓
- [ ] HTTPS enforced ✓
