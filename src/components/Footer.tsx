export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
      <div className="container" style={{ padding: '28px 2rem' }}>
        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'12px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px', height: '20px',
              background: 'var(--accent)',
              color: 'var(--bg)',
              borderRadius: 0,
              fontSize: '8px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
            }}>AK</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--muted-2)' }}>
              © {year} Akash Kundu
            </span>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
            {[
              { href:'mailto:akashkundu7487@gmail.com', label:'Email'    },
              { href:'https://www.linkedin.com/in/akashkundu114/', label:'LinkedIn' },
              { href:'https://github.com/AkashKundu114', label:'GitHub' },
            ].map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--accent)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--muted-2)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
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
