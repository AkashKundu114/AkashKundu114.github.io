import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { to: '/',             label: 'Home' },
  { to: '/about',        label: 'About' },
  { to: '/skills',       label: 'Skills' },
  { to: '/projects',     label: 'Projects' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/education',    label: 'Education' },
  { to: '/contact',      label: 'Contact' },
]

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
    </svg>
  )
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location])

  return (
    <nav className="nav-fixed">
      <div className="container">
        <div className="flex items-center justify-between" style={{ height: '3.4rem' }}>
          <Link to="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem' }}>
            akash<span style={{ color: 'var(--accent)' }}>.</span>kundu
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={`nav-link${location.pathname === to ? ' active' : ''}`}>
                {label}
              </Link>
            ))}
            <a
              href="https://github.com/AkashKundu114"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              style={{ marginLeft: '0.4rem', borderLeft: '1px solid var(--border)', paddingLeft: '1rem' }}
            >
              GitHub ↗
            </a>
            <button onClick={toggleTheme} className="theme-toggle" style={{ marginLeft: '0.6rem' }} aria-label="Toggle theme">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button onClick={() => setOpen(o => !o)} className="theme-toggle" aria-label="Toggle menu" style={{ width: 30, height: 30 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden flex flex-col" style={{ borderTop: '1px solid var(--border)', padding: '0.5rem 0 0.9rem' }}>
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={`nav-link${location.pathname === to ? ' active' : ''}`} style={{ padding: '0.55rem 0' }}>
                {label}
              </Link>
            ))}
            <a href="https://github.com/AkashKundu114" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ padding: '0.55rem 0' }}>
              GitHub ↗
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
