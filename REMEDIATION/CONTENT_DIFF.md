# Content & Presentation Diff Report

**Target Repository:** `github.com/AkashKundu114/AkashKundu114.github.io`  
**Date:** 2026-10-17  
**Branch:** `cleanup/public-site`  

---

## 1. Project Ordering & Featured Hierarchy

| Position | Previous Order | New Curated Order | Strategic Rationale |
| -------- | -------------- | ----------------- | ------------------- |
| **#1** | `ai-sathi` | **`copper-ai-assistant`** (C.O.P.P.E.R.) | Flagship personal AI OS demonstrating multi-agent orchestration, sub-0.10ms routing, and 685 verified tests. |
| **#2** | `copper-ai-assistant` | **`eye-disease-predictor`** (OphthalmoAI) | Calibrated tri-backbone computer vision platform with 0.9818 AUROC and in-browser WASM edge inference. |
| **#3** | `eye-disease-predictor` | **`icc-clustering`** (ICC-v2) | Deep algorithmic research with -74.2% peak RAM reduction and submitted IEEE TKDE/ICDE manuscripts. |
| **#4** | `icc-clustering` | **`ai-sathi`** (Kotha-Khata) | Production voice operating system deployed on Azure Container Apps with LangGraph and PostgreSQL RAG. |
| **#5** | `ai-hardware-benchmark` | `ai-hardware-benchmark` | Machine learning CatBoost regression prototype. |
| **#6** | `e2ee-chat` | `e2ee-chat` (Stealth-Comms) | 256-bit AES real-time WebSocket communications system. |
| **#7** | `portfolio-cms` | `portfolio-cms` | Headless DataContext PWA powering this portfolio website. |

*Impact:* The home page featured projects (`projects.slice(0, 4)`) now directly present the four strongest technical systems (COPPER, OphthalmoAI, ICC-v2, AI-SATHI) within the first 30 seconds of recruiter arrival.

---

## 2. Privacy & Personal Identifiable Information (PII) Sanitization

| Field / Location | Previous Value | Remediated Value |
| ---------------- | -------------- | ---------------- |
| `index.html` (JSON-LD) | `"telephone": "+919064349004"` | **Removed entirely** |
| `src/pages/About.tsx` | Phone row displaying `+91 9064349004` | **Removed row** |
| `src/pages/Contact.tsx` | Phone channel card `+91 9064349004` | **Removed card** |
| `public/cv/resume_cdac.tex` | `+91 9064349004` & `akashkundu1152@gmail.com` | **Standardized on primary `akashkundu7487@gmail.com`** |
| `public/cv/resume_sde.tex` | `+91 9064349004` & `akashkundu1152@gmail.com` | **Standardized on primary `akashkundu7487@gmail.com`** |
| `backend/.env` | Plaintext SMTP password & personal sender email | **Sanitized with environment placeholders** |

---

## 3. Resume & Asset Consolidation

| Asset | Previous State | Remediated State |
| ----- | -------------- | ---------------- |
| Canonical Resume | Divergent LaTeX outputs & unlinked PDFs | **`public/cv/Akash_Kundu_Resume.pdf`** generated with sanitized metadata and linked consistently in Navbar, About, Home, and ProjectDetail. |
| Certificate Images | `oracle_agentic_ai.png` (1.41 MB) & `oracle_ai_database.png` (1.15 MB) | **Losslessly quantized to 642 KB and 650 KB** (all repo assets < 1.0 MB). |
| Deep Linking | Missing 404 handler for direct routes | **`public/404.html`** added to gracefully redirect direct browser routes into HashRouter paths (`/#/...`). |

---

## 4. Admin Presentation

- **Previous:** Fake client-side password modal comparing `crypto.subtle.digest` against an exposed hash.
- **Remediated:** Honest **"Demonstration Management Studio"** client sandbox with explicit educational banner explaining that mutations persist solely in the visitor's local browser cache (`localStorage`) and require zero production server credentials.
