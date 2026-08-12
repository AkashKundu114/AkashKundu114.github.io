# Akash Kundu — Full-Stack AI Engineer Portfolio

A production-class portfolio showcasing engineering expertise across AI, backend architectures, and modern web applications.

[![Built with React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)
[![Powered by Vite](https://img.shields.io/badge/Vite-8.2.1-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![FastAPI Backend](https://img.shields.io/badge/FastAPI-1.0-009688.svg)](https://fastapi.tiangolo.com/)

## 🚀 Architecture Overview
This portfolio goes beyond a static site, incorporating a full-stack Headless CMS architecture.
For a deep dive into the technical decisions, read the [Technical White Paper](WHITE_PAPER.md).

- **Frontend**: React + TypeScript, Vite PWA, Framer Motion, Tailwind CSS
- **Data Layer**: API-ready Abstraction via React Context
- **Backend**: FastAPI Microservice (Rate-limiting, Security Headers, SMTP integration)
- **CI/CD**: Fully automated deployment via GitHub Actions

## 🌟 Key Features
- **PWA Ready**: Works completely offline with cached assets.
- **Dynamic Search**: Fuse.js fuzzy search for instant project filtering.
- **Admin Dashboard**: Secured CRUD interface for managing content dynamically.
- **Performance Optimized**: Perfect Lighthouse score with semantic HTML and image optimization.

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AkashKundu114/AkashKundu114.github.io.git
   cd AkashKundu114.github.io
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Frontend**
   ```bash
   npm run dev
   ```

4. **Start the Backend Microservice** (Requires Python)
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn contact_api:app --reload
   ```

## 🔒 Security Posture
- 256-bit AES considerations for underlying systems.
- Rate limiters and CSRF protection implemented on the FastAPI endpoints.
- 0 known `npm audit` vulnerabilities.

## 📝 License
This project is open source and available under the [MIT License](LICENSE).
