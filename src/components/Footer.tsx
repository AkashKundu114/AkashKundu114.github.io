import React, { memo } from 'react';
import { Link } from 'react-router-dom';

interface SocialLinkItem {
  readonly label: string;
  readonly href: string;
}

interface LegalLinkItem {
  readonly label: string;
  readonly to: string;
}

const LEGAL_LINKS: readonly LegalLinkItem[] = [
  { label: 'Terms', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
] as const;

const SOCIAL_LINKS: readonly SocialLinkItem[] = [
  { label: 'Email', href: 'mailto:akashkundu7487@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/akashkundu114/' },
  { label: 'GitHub', href: 'https://github.com/AkashKundu114' },
] as const;

function BrandBadge() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20px',
        height: '20px',
        background: 'var(--accent)',
        color: 'var(--bg)',
        borderRadius: 0,
        fontSize: '8px',
        fontWeight: 800,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.04em',
      }}
    >
      AK
    </span>
  );
}

function LegalLinksNav() {
  return (
    <>
      {LEGAL_LINKS.map((item, index) => (
        <React.Fragment key={item.to}>
          <span style={{ color: 'var(--border)', fontSize: '10px', margin: '0 4px' }}>·</span>
          <Link
            to={item.to}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--muted-2)',
              textDecoration: 'none',
              transition: 'color var(--t)',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = 'var(--muted-2)';
            }}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </>
  );
}

function SocialChannelsNav() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {SOCIAL_LINKS.map(({ href, label }) => {
        const isExternal = href.startsWith('http');
        return (
          <a
            key={label}
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--muted-2)',
              padding: '4px 10px',
              border: '1px solid var(--border)',
              borderRadius: 0,
              transition: 'color var(--t), border-color var(--t)',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = 'var(--accent)';
              event.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = 'var(--muted-2)';
              event.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}

function FooterComponent() {
  const currentYear = new Date().getFullYear() || 2026;

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
      <div className="container" style={{ padding: '24px 2rem' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BrandBadge />
            <span
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted-2)' }}
            >
              © {currentYear} Akash Kundu
            </span>
            <LegalLinksNav />
          </div>
          <SocialChannelsNav />
        </div>
      </div>
    </footer>
  );
}

export default memo(FooterComponent);
