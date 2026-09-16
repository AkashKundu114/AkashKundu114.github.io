import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tactile3DButton, GlassButton } from './EvilButtons';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/certificates', label: 'Certs' },
  { to: '/education', label: 'Education' },
  { to: '/contact', label: 'Contact' },
];

function MenuIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`nav-fixed ${scrolled ? 'liquid-glass-panel shadow-lg' : ''}`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'all 0.3s ease',
        borderBottom: scrolled ? '1px solid var(--border-2)' : '1px solid transparent',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '3.4rem',
          }}
        >
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '0.88rem',
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '26px',
                height: '26px',
                background: 'var(--accent)',
                color: 'var(--bg)',
                fontSize: '10px',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em',
                borderRadius: 0,
                boxShadow: '0 0 12px var(--accent-glow)',
              }}
            >
              AK
            </span>
            Akash Kundu
          </Link>

          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2px' }}>
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link${location.pathname === to ? ' active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href="/cv/AkashKundu_CV.pdf"
              download
              className="hidden lg:inline-flex"
            >
              <GlassButton size="sm">
                CV ↓
              </GlassButton>
            </a>
            <Tactile3DButton
              href="https://github.com/AkashKundu114"
              target="_blank"
              size="sm"
              className="hidden md:inline-flex"
            >
              GitHub ↗
            </Tactile3DButton>
            <button
              onClick={() => setOpen((o) => !o)}
              className="theme-toggle md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {open && (
          <div
            className="liquid-glass-panel"
            style={{
              borderTop: '1px solid var(--border)',
              padding: '16px',
              marginTop: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              animation: 'fadeSlideUp 0.2s var(--ease)',
            }}
          >
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
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <a
                href="/cv/AkashKundu_CV.pdf"
                download
                style={{ flex: 1 }}
              >
                <GlassButton size="sm" className="w-full">
                  Download CV ↓
                </GlassButton>
              </a>
              <Tactile3DButton
                href="https://github.com/AkashKundu114"
                target="_blank"
                size="sm"
                style={{ flex: 1 }}
              >
                GitHub ↗
              </Tactile3DButton>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
