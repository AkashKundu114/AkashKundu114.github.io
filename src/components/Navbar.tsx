import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tactile3DButton, GlassButton } from './EvilButtons';
import { useTheme, AVAILABLE_THEMES, THEME_METADATA } from '../context/ThemeContext';

export interface NavItem {
  readonly to: string;
  readonly label: string;
}

export const NAVIGATION_ITEMS: readonly NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/certificates', label: 'Certs' },
  { to: '/education', label: 'Education' },
  { to: '/contact', label: 'Contact' },
] as const;

const SCROLL_THRESHOLD_PIXELS = 24;
const RESUME_CV_URL = '/cv/AkashKundu_CV.pdf';
const GITHUB_PROFILE_URL = 'https://github.com/AkashKundu114';

function HamburgerMenuIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseMenuIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function BrandIdentity() {
  return (
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
  );
}

interface DesktopNavLinksProps {
  currentPath: string;
}

function DesktopNavLinks({ currentPath }: DesktopNavLinksProps) {
  return (
    <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2px' }}>
      {NAVIGATION_ITEMS.map(({ to, label }) => {
        const isActive = currentPath === to;
        return (
          <Link
            key={to}
            to={to}
            className={`nav-link${isActive ? ' active' : ''}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

interface MobileDrawerProps {
  currentPath: string;
  onLinkClick: () => void;
  theme: string;
  onCycleTheme: () => void;
  isEcoMode: boolean;
  onToggleEcoMode: () => void;
}

function MobileDrawer({
  currentPath,
  onLinkClick,
  theme,
  onCycleTheme,
  isEcoMode,
  onToggleEcoMode,
}: MobileDrawerProps) {
  return (
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
      {NAVIGATION_ITEMS.map(({ to, label }) => {
        const isActive = currentPath === to;
        return (
          <Link
            key={to}
            to={to}
            className={`nav-link${isActive ? ' active' : ''}`}
            style={{ padding: '10px 12px' }}
            onClick={onLinkClick}
          >
            {label}
          </Link>
        );
      })}

      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <div style={{ flex: 1 }}>
          <GlassButton
            href={RESUME_CV_URL}
            download
            size="sm"
            className="w-full"
            onClick={onLinkClick}
          >
            Download CV ↓
          </GlassButton>
        </div>
        <div style={{ flex: 1 }}>
          <Tactile3DButton
            href={GITHUB_PROFILE_URL}
            target="_blank"
            size="sm"
            className="w-full"
            onClick={onLinkClick}
          >
            GitHub ↗
          </Tactile3DButton>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 4px',
          borderTop: '1px solid var(--border)',
          marginTop: '6px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: THEME_METADATA[theme]?.accentColor || 'var(--accent)',
              boxShadow: '0 0 6px var(--accent)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              color: 'var(--ink)',
            }}
          >
            Palette: {THEME_METADATA[theme]?.label || theme}
          </span>
        </div>
        <button
          onClick={onCycleTheme}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            padding: '4px 10px',
            background: 'var(--surface-2)',
            border: '1px solid var(--border-2)',
            color: 'var(--accent)',
            cursor: 'pointer',
          }}
          aria-label="Switch to next theme palette"
        >
          Cycle Theme 🎨
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 4px',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: isEcoMode ? '#34d399' : 'var(--muted-2)',
              boxShadow: isEcoMode ? '0 0 6px #34d399' : 'none',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              color: 'var(--ink)',
            }}
          >
            Eco Mode: {isEcoMode ? 'ON' : 'OFF'}
          </span>
        </div>
        <button
          onClick={onToggleEcoMode}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            padding: '4px 10px',
            background: isEcoMode ? 'rgba(52, 211, 153, 0.15)' : 'var(--surface-2)',
            border: `1px solid ${isEcoMode ? 'rgba(52, 211, 153, 0.4)' : 'var(--border-2)'}`,
            color: isEcoMode ? '#34d399' : 'var(--muted)',
            cursor: 'pointer',
          }}
          aria-label={`Toggle Eco Mode. Currently ${isEcoMode ? 'ON' : 'OFF'}`}
        >
          {isEcoMode ? '⚡ Eco Active' : '🔋 Eco OFF'}
        </button>
      </div>
    </div>
  );
}

function NavbarComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, changeTheme, isEcoMode, toggleEcoMode } = useTheme();

  const cycleTheme = useCallback(() => {
    const currentIndex = AVAILABLE_THEMES.indexOf(theme);
    const nextTheme = AVAILABLE_THEMES[(currentIndex + 1) % AVAILABLE_THEMES.length] ?? 'theme-1';
    changeTheme(nextTheme);
  }, [theme, changeTheme]);

  // Close mobile drawer on route transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Monitor scroll position with passive listener
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleWindowScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(currentScrollY > SCROLL_THRESHOLD_PIXELS);
    };

    handleWindowScroll();
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  // Close mobile drawer when user presses the Escape key
  useEffect(() => {
    if (!isMobileMenuOpen || typeof window === 'undefined') {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((previousState) => !previousState);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const navContainerClass = `nav-fixed ${isScrolled ? 'liquid-glass-panel shadow-lg' : ''}`;
  const navContainerStyle: React.CSSProperties = {
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transition: 'all 0.3s ease',
    borderBottom: isScrolled ? '1px solid var(--border-2)' : '1px solid transparent',
  };

  return (
    <nav className={navContainerClass} style={navContainerStyle}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '3.4rem',
          }}
        >
          <BrandIdentity />
          <DesktopNavLinks currentPath={location.pathname} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={toggleEcoMode}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: isEcoMode ? 'rgba(52, 211, 153, 0.12)' : 'var(--surface-2)',
                border: `1px solid ${isEcoMode ? 'rgba(52, 211, 153, 0.4)' : 'var(--border-2)'}`,
                padding: '4px 9px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: isEcoMode ? '#34d399' : 'var(--ink)',
                cursor: 'pointer',
                borderRadius: 0,
                transition: 'all 0.15s ease',
              }}
              aria-label={`Eco Mode is currently ${isEcoMode ? 'ON' : 'OFF'}. Click to toggle low-resource power saving.`}
              title={`Toggle Eco Mode (Currently ${isEcoMode ? 'ON' : 'OFF'})`}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: isEcoMode ? '#34d399' : 'var(--muted-2)',
                  boxShadow: isEcoMode ? '0 0 6px #34d399' : 'none',
                  flexShrink: 0,
                }}
              />
              <span className="hidden sm:inline" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Eco {isEcoMode ? 'ON' : 'OFF'}
              </span>
            </button>

            <button
              onClick={cycleTheme}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--surface-2)',
                border: '1px solid var(--border-2)',
                padding: '4px 9px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--ink)',
                cursor: 'pointer',
                borderRadius: 0,
                transition: 'all 0.15s ease',
              }}
              aria-label={`Current theme palette: ${THEME_METADATA[theme]?.label || theme}. Click to cycle palette.`}
              title={`Switch Theme Palette (Current: ${THEME_METADATA[theme]?.label || theme})`}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: THEME_METADATA[theme]?.accentColor || 'var(--accent)',
                  boxShadow: '0 0 6px var(--accent)',
                  flexShrink: 0,
                }}
              />
              <span className="hidden sm:inline" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {THEME_METADATA[theme]?.label || theme}
              </span>
            </button>

            <GlassButton
              href={RESUME_CV_URL}
              download
              size="sm"
              className="hidden lg:inline-flex"
            >
              CV ↓
            </GlassButton>

            <Tactile3DButton
              href={GITHUB_PROFILE_URL}
              target="_blank"
              size="sm"
              className="hidden md:inline-flex"
            >
              GitHub ↗
            </Tactile3DButton>

            <button
              onClick={toggleMobileMenu}
              className="theme-toggle md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <CloseMenuIcon /> : <HamburgerMenuIcon />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <MobileDrawer
            currentPath={location.pathname}
            onLinkClick={closeMobileMenu}
            theme={theme}
            onCycleTheme={cycleTheme}
            isEcoMode={isEcoMode}
            onToggleEcoMode={toggleEcoMode}
          />
        )}
      </div>
    </nav>
  );
}

export default memo(NavbarComponent);
