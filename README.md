# Akash Kundu — Full-Stack AI Engineer Portfolio

A production-class portfolio showcasing engineering expertise across AI systems, multi-tenant backend architectures, and modern high-performance web applications.

[![Built with React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)
[![Powered by Vite](https://img.shields.io/badge/Vite-8.2.1-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![FastAPI Backend](https://img.shields.io/badge/FastAPI-1.0-009688.svg)](https://fastapi.tiangolo.com/)
[![Tests](https://img.shields.io/badge/Tests-107%20Passed-success.svg)](https://vitest.dev/)
[![Three.js](https://img.shields.io/badge/3D%20WebGL-Three.js-black.svg)](https://threejs.org/)

## 🚀 Architecture Overview
This portfolio goes beyond a static website, incorporating a decoupled, headless, and offline-first reactive architecture:
For an in-depth architectural breakdown, consult the [Technical White Paper](WHITE_PAPER.md).

- **Frontend**: React 18 + TypeScript, Vite PWA, Procedural Three.js 3D WebGL, Framer Motion, Tailwind CSS
- **Data Layer**: Strongly typed, boundary-checked React Context with fallback hydration and resilient storage
- **Backend Microservice**: Python FastAPI with RFC-compliant validation, rate-limiting, security headers, and SMTP integration
- **Test Infrastructure**: Vitest + React Testing Library (107 automated unit tests covering data schemas, hooks, context, and UI)
- **CI/CD**: Automated GitHub Actions verification (linting, tests, bundling, and deployment)

## 🌟 Key Features
- **Procedural 3D WebGL Engine**: Hardware-accelerated Three.js interactive simulation modeling advertising cloud multi-channel routing, agentic LLM swarms, and multi-tenant data mesh at 60 FPS.
- **PWA Offline-First**: Workbox service workers precaching assets for instant loads and zero-network availability.
- **Dynamic Fuzzy Search**: Fuse.js fuzzy search with sanitized query boundaries and instant tag intersection.
- **Admin Management Studio**: Secured CRUD interface for project and certificate telemetry management.
- **Defensive Boundary Handling**: Complete null/undefined guards, route fallback views, input sanitization, and quota exception safety.

## 🎓 Academic Profile
- **Institution**: Techno India University, Kolkata (2023 – 2027)
- **Degree**: B.Tech in Computer Science & Engineering
- **Cumulative GPA**: **7.59 / 10.0** (till 6th semester completed)

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

3. **Run Test Suite**
   ```bash
   npm test
   ```

4. **Start the Frontend**
   ```bash
   npm run dev
   ```

5. **Start the Backend Microservice** (Requires Python 3.10+)
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn contact_api:app --reload
   ```

## 🔒 Security Posture
- RFC 5321 / RFC 5322 strict input validation and SMTP header injection mitigation.
- IP-based rate limiting via `slowapi` on API endpoints.
- Strict CORS, Content-Type, and security headers.
- Zero known high vulnerabilities in production dependencies.

## 📝 License
This project is open source and available under the [MIT License](LICENSE).
