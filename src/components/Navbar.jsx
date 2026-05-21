import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { to: '/',            label: 'Home' },
  { to: '/about',       label: 'About' },
  { to: '/skills',      label: 'Skills' },
  { to: '/projects',    label: 'Projects' },
  { to: '/certificates',label: 'Certificates' },
  { to: '/education',   label: 'Education' },
  { to: '/contact',     label: 'Contact' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setOpen(false), [location])

  return (
    <nav className="nav-fixed" style={{ boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.5)' : 'none' }}>
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-display font-extrabold text-lg tracking-tight" style={{ letterSpacing: '-0.03em', color: 'var(--ink)' }}>
            Akash<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>

          <ul className="hidden md:flex items-center gap-0.5 list-none">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className="block px-3 py-1.5 rounded transition-all duration-200"
                    style={{ color: active ? 'var(--accent)' : 'var(--muted)', background: active ? 'var(--accent-dim)' : 'transparent', fontSize: '0.72rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500 }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.background = 'var(--surface2)' } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'transparent' } }}
                  >{label}</Link>
                </li>
              )
            })}
            <li>
              <a href="https://www.linkedin.com/in/akashkundu114/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border rounded transition-all duration-200"
                style={{ color: 'var(--muted)', borderColor: 'var(--border)', fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-dim)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent' }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </li>
            <li>
              <button onClick={toggleTheme} aria-label="Toggle theme"
                className="flex items-center justify-center w-8 h-8 rounded border transition-all duration-200 cursor-pointer font-mono text-base"
                style={{ background: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--ink)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-dim)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface2)' }}
              >{theme === 'dark' ? '☀' : '☾'}</button>
            </li>
          </ul>

          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme} className="flex items-center justify-center w-8 h-8 rounded border font-mono text-base" style={{ background: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--ink)' }}>
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <button onClick={() => setOpen(o => !o)} className="flex flex-col gap-1.5 cursor-pointer p-1" aria-label="Toggle menu">
              <span className="block w-5 h-px transition-all duration-200" style={{ background: 'var(--ink)', transform: open ? 'rotate(45deg) translate(4px,4px)' : '' }} />
              <span className="block w-5 h-px transition-all duration-200" style={{ background: 'var(--ink)', opacity: open ? 0 : 1 }} />
              <span className="block w-5 h-px transition-all duration-200" style={{ background: 'var(--ink)', transform: open ? 'rotate(-45deg) translate(4px,-4px)' : '' }} />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t mt-2 pt-2 pb-3 flex flex-col gap-0.5" style={{ borderColor: 'var(--border)' }}>
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="block px-3 py-2 rounded transition-all duration-200"
                style={{ color: location.pathname === to ? 'var(--accent)' : 'var(--muted)', background: location.pathname === to ? 'var(--accent-dim)' : 'transparent', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}
              >{label}</Link>
            ))}
            <a href="https://www.linkedin.com/in/akashkundu114/" target="_blank" rel="noopener noreferrer"
              className="block px-3 py-2" style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              LinkedIn ↗
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
