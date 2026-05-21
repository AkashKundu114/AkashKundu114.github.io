import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { skills } from '../data/skills'

export default function Home() {
  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative flex items-center min-h-screen overflow-hidden hero-grid"
        style={{ paddingTop: '6rem' }}
      >
        <div className="container">
          <div className="relative z-10 max-w-3xl">

            {/* Availability tag */}
            <div
              className="fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono uppercase mb-8"
              style={{
                background: 'var(--accent-dim)',
                borderColor: 'rgba(184,255,0,0.22)',
                color: 'var(--accent)',
                fontSize: '0.66rem', letterSpacing: '0.12em',
              }}
            >
              <span style={{ fontSize: '0.42rem', animation: 'blink 1.6s infinite' }}>●</span>
              Available for Internship — Kolkata, India
            </div>

            {/* Headline */}
            <h1 className="fade-up d1 hero-title mb-7">
              Turning<br />
              <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>raw data</em><br />
              into insight.
            </h1>

            <p
              className="fade-up d2 mb-9"
              style={{ fontSize: '1.05rem', maxWidth: '52ch', color: 'var(--muted)', lineHeight: 1.75 }}
            >
              B.Tech CSE student at Techno India University with a passion for data
              analytics, AI-driven applications, and building tools that solve
              real-world problems.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-6 fade-up d3">
              <Link to="/projects" className="btn btn-primary">View Projects →</Link>
              <Link to="/contact"  className="btn btn-outline">Get in Touch</Link>

              {/* ── CV Download Button ── */}
              <a
                href="/cv/AkashKundu_CV.pdf"
                download
                className="btn btn-outline"
                title="Download my latest CV"
              >
                {/* Arrow down icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-6 2h12v2H6v-2z" />
                </svg>
                Download CV
              </a>
            </div>

            {/* Social chips */}
            <div className="flex flex-wrap gap-2 fade-up d4 mb-14">
              {[
                { href: 'https://www.linkedin.com/in/akashkundu114/', label: 'LinkedIn', icon: <LinkedInIcon /> },
                { href: 'https://github.com/AkashKundu114',           label: 'GitHub',   icon: <GitHubIcon /> },
                { href: 'mailto:akashkundu7487@gmail.com',             label: 'Email',    icon: <EmailIcon /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="social-chip inline-flex items-center gap-1.5 font-mono uppercase rounded border transition-all duration-200"
                  style={{
                    color: 'var(--muted)', borderColor: 'var(--border)',
                    padding: '0.38rem 0.75rem', fontSize: '0.62rem', letterSpacing: '0.1em',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.background = 'var(--accent-dim)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--muted)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {icon} {label}
                </a>
              ))}
            </div>

            {/* Stats */}
            <div
              className="flex flex-wrap gap-10 fade-up d5"
              style={{ paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}
            >
              {[
                { num: '5+',   label: 'Projects Built' },
                { num: '16+',  label: 'Technologies' },
                { num: '7.61', label: 'Current CGPA' },
                { num: "'27",  label: 'Graduating' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <span className="block font-bold font-display text-ink" style={{ fontSize: '2rem' }}>{num}</span>
                  <span className="block font-mono uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Strip ───────────────────────────────────────── */}
      <section
        className="relative z-10"
        style={{ padding: '4rem 0', borderTop: '1px solid var(--border)' }}
      >
        <div className="container">
          <div className="label reveal">Technologies</div>
          <div className="flex flex-wrap gap-2 reveal reveal-delay-1">
            {skills.map(sk => (
              <span key={sk.id} className="skill-tag">{sk.name}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ── Icons ── */
function LinkedInIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
}
function GitHubIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
}
function EmailIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
}
