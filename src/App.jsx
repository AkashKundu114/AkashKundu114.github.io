import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider }  from './context/ThemeContext'
import { DataProvider }   from './context/DataContext'
import Navbar  from './components/Navbar'
import Footer  from './components/Footer'

/* ── Route-based code splitting ────────────────────────────────────────────
   Each page chunk is downloaded only when the user navigates to that route.
   This keeps the initial JS bundle small and improves Core Web Vitals (LCP).
   ───────────────────────────────────────────────────────────────────────── */
const Home              = lazy(() => import('./pages/Home'))
const About             = lazy(() => import('./pages/About'))
const Skills            = lazy(() => import('./pages/Skills'))
const Projects          = lazy(() => import('./pages/Projects'))
const ProjectDetail     = lazy(() => import('./pages/ProjectDetail'))
const Certificates      = lazy(() => import('./pages/Certificates'))
const CertificateDetail = lazy(() => import('./pages/CertificateDetail'))
const Education         = lazy(() => import('./pages/Education'))
const Contact           = lazy(() => import('./pages/Contact'))
const Admin             = lazy(() => import('./pages/Admin'))

/* ── Minimal skeleton shown while a lazy chunk loads ── */
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          animation: 'blink 1.2s infinite',
        }}
      >
        Loading…
      </span>
    </div>
  )
}

/* ── Animated route switcher ─────────────────────────────────────────────
   AnimatePresence + key=location.pathname lets each page play its own
   exit animation before the next page mounts (mode="wait").
   ───────────────────────────────────────────────────────────────────────── */
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"                  element={<Home />} />
        <Route path="/about"             element={<About />} />
        <Route path="/skills"            element={<Skills />} />
        <Route path="/projects"          element={<Projects />} />
        <Route path="/projects/:id"      element={<ProjectDetail />} />
        <Route path="/certificates"      element={<Certificates />} />
        <Route path="/certificates/:id"  element={<CertificateDetail />} />
        <Route path="/education"         element={<Education />} />
        <Route path="/contact"           element={<Contact />} />
        {/* Protected admin panel — not linked in the nav intentionally */}
        <Route path="/admin"             element={<Admin />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <HashRouter>
          <div className="min-h-screen bg-bg text-ink">
            <Navbar />
            <main>
              <Suspense fallback={<PageLoader />}>
                <AnimatedRoutes />
              </Suspense>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </DataProvider>
    </ThemeProvider>
  )
}
