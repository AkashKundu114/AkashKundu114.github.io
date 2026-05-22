import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { to:'/',             label:'Home' },
  { to:'/about',        label:'About' },
  { to:'/skills',       label:'Skills' },
  { to:'/projects',     label:'Projects' },
  { to:'/certificates', label:'Certs' },
  { to:'/education',    label:'Education' },
  { to:'/contact',      label:'Contact' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [location])

  const linkStyle = (active) => ({
    color: active ? 'var(--accent)' : 'var(--muted)',
    background: active ? 'var(--accent-dim)' : 'transparent',
    fontSize: '0.72rem', letterSpacing: '0.05em',
    textTransform: 'uppercase', fontWeight: 500,
  })

  return (
    <nav className="nav-fixed" style={{ boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.5)' : 'none' }}>
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" style={{ fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:'1.1rem',letterSpacing:'-0.03em',color:'var(--ink)',textDecoration:'none' }}>
            Akash<span style={{ color:'var(--accent)' }}>.</span>
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-0.5 list-none">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to
              return (
                <li key={to}>
                  <Link to={to} className="block px-3 py-1.5 rounded transition-all duration-200" style={linkStyle(active)}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.color='var(--ink)'; e.currentTarget.style.background='var(--surface2)' } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.background='transparent' } }}>
                    {label}
                  </Link>
                </li>
              )
            })}
            <li>
              <a href="https://www.linkedin.com/in/akashkundu114/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border rounded transition-all duration-200 ml-1"
                style={{ color:'var(--muted)',borderColor:'var(--border)',fontSize:'0.7rem',letterSpacing:'0.04em',textTransform:'uppercase',fontWeight:600 }}
                onMouseEnter={e=>{e.currentTarget.style.color='var(--accent)';e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.background='var(--accent-dim)'}}
                onMouseLeave={e=>{e.currentTarget.style.color='var(--muted)';e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='transparent'}}>
                LinkedIn
              </a>
            </li>
            <li>
              <button onClick={toggleTheme} aria-label="Toggle theme"
                className="flex items-center justify-center w-8 h-8 rounded border transition-all duration-200 cursor-pointer font-mono text-base ml-1"
                style={{ background:'var(--surface2)',borderColor:'var(--border)',color:'var(--ink)' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.background='var(--accent-dim)'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='var(--surface2)'}}>
                {theme==='dark' ? '☀' : '☾'}
              </button>
            </li>
          </ul>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme} className="flex items-center justify-center w-8 h-8 rounded border font-mono text-base" style={{ background:'var(--surface2)',borderColor:'var(--border)',color:'var(--ink)' }}>{theme==='dark'?'☀':'☾'}</button>
            <button onClick={() => setOpen(o => !o)} className="flex flex-col gap-1.5 cursor-pointer p-1" aria-label="Toggle menu">
              <span className="block w-5 h-px transition-all duration-200" style={{ background:'var(--ink)',transform:open?'rotate(45deg) translate(4px,4px)':'' }} />
              <span className="block w-5 h-px transition-all duration-200" style={{ background:'var(--ink)',opacity:open?0:1 }} />
              <span className="block w-5 h-px transition-all duration-200" style={{ background:'var(--ink)',transform:open?'rotate(-45deg) translate(4px,-4px)':'' }} />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t mt-2 pt-2 pb-3 flex flex-col gap-0.5" style={{ borderColor:'var(--border)' }}>
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="block px-3 py-2 rounded transition-all duration-200"
                style={{ color:location.pathname===to?'var(--accent)':'var(--muted)',background:location.pathname===to?'var(--accent-dim)':'transparent',fontSize:'0.8rem',letterSpacing:'0.08em',textTransform:'uppercase',fontWeight:500 }}>
                {label}
              </Link>
            ))}
            <a href="https://www.linkedin.com/in/akashkundu114/" target="_blank" rel="noopener noreferrer" className="block px-3 py-2" style={{ color:'var(--muted)',fontSize:'0.8rem',letterSpacing:'0.08em',textTransform:'uppercase' }}>LinkedIn ↗</a>
          </div>
        )}
      </div>
    </nav>
  )
}
