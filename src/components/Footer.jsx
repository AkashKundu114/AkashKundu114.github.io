export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ padding: '1.75rem' }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>
            © {year} Akash Kundu
          </span>
          <div className="flex flex-wrap gap-4">
            {[
              { href: 'mailto:akashkundu7487@gmail.com', label: 'Email' },
              { href: 'https://www.linkedin.com/in/akashkundu114/', label: 'LinkedIn', ext: true },
              { href: 'https://github.com/AkashKundu114', label: 'GitHub', ext: true },
            ].map(({ href, label, ext }) => (
              <a
                key={label}
                href={href}
                target={ext ? '_blank' : undefined}
                rel={ext ? 'noopener noreferrer' : undefined}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)', transition: 'color var(--t)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
