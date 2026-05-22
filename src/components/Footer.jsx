export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10" style={{ borderTop:'1px solid var(--border)',padding:'2.2rem 0' }}>
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono" style={{ color:'var(--muted)',fontSize:'0.62rem',letterSpacing:'0.07em' }}>
            © {year} Akash Kundu — Built with React &amp; Tailwind
          </span>
          <div className="flex flex-wrap gap-5">
            {[
              { href:'mailto:akashkundu7487@gmail.com', label:'Email',    ext:false },
              { href:'https://www.linkedin.com/in/akashkundu114/', label:'LinkedIn', ext:true },
              { href:'https://github.com/AkashKundu114',           label:'GitHub',   ext:true },
            ].map(({ href,label,ext }) => (
              <a key={label} href={href} target={ext?'_blank':undefined} rel={ext?'noopener noreferrer':undefined}
                className="font-mono uppercase transition-colors duration-200"
                style={{ color:'var(--muted)',fontSize:'0.6rem',letterSpacing:'0.1em' }}
                onMouseEnter={e=>{e.currentTarget.style.color='var(--accent)'}}
                onMouseLeave={e=>{e.currentTarget.style.color='var(--muted)'}}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
