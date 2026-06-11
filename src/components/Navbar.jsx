import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { to: '/',             label: 'Home' },
  { to: '/about',        label: 'About' },
  { to: '/skills',       label: 'Skills' },
  { to: '/projects',     label: 'Projects' },
  { to: '/certificates', label: 'Certs' },
  { to: '/education',    label: 'Education' },
  { to: '/contact',      label: 'Contact' },
]

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="nav-fixed" style={{ boxShadow: scrolled ? '0 1px 0 var(--border)' : 'none' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '3.25rem' }}>
          <Link to="/" style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: 'var(--ink)',
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '22px',
              height: '22px',
              background: 'var(--ink)',
              color: 'var(--bg)',
              borderRadius: '5px',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
            }}>AK</span>
            Akash Kundu
          </Link>
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2px' }}>
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={`nav-link${location.pathname === to ? ' active' : ''}`}>
                {label}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <a
              href="https://github.com/AkashKundu114"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm hidden md:inline-flex"
              style={{ borderRadius: 'var(--radius-pill)' }}
            >
              GitHub ↗
            </a>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => setOpen(o => !o)}
              className="theme-toggle md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        {open && (
          <div style={{
            borderTop: '1px solid var(--border)',
            padding: '12px 0 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}>
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link${location.pathname === to ? ' active' : ''}`}
                style={{ padding: '10px 12px' }}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://github.com/AkashKundu114"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
              style={{ padding: '10px 12px' }}
            >
              GitHub ↗
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
