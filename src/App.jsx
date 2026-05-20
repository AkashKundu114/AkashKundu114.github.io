import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Certificates from './pages/Certificates'
import CertificateDetail from './pages/CertificateDetail'
import Education from './pages/Education'
import Contact from './pages/Contact'

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <div className="min-h-screen bg-bg text-ink">
          <Navbar />
          <main>
            <Routes>
              <Route path="/"                    element={<Home />} />
              <Route path="/about"               element={<About />} />
              <Route path="/skills"              element={<Skills />} />
              <Route path="/projects"            element={<Projects />} />
              <Route path="/projects/:id"        element={<ProjectDetail />} />
              <Route path="/certificates"        element={<Certificates />} />
              <Route path="/certificates/:id"    element={<CertificateDetail />} />
              <Route path="/education"           element={<Education />} />
              <Route path="/contact"             element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ThemeProvider>
  )
}
