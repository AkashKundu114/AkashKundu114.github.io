import { useEffect } from 'react'
import { education } from '../data/education'
import { useRevealChildren } from '../hooks/useScrollReveal'

export default function Education() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const ref = useRevealChildren()

  return (
    <section className="section" style={{ paddingTop: '9rem' }} ref={ref}>
      <span className="section-num">04</span>
      <div className="container">

        <div className="label reveal">Academic Background</div>
        <h2 className="reveal" style={{ marginBottom: '1rem' }}>
          Education &amp;<br />
          <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>Qualifications.</em>
        </h2>
        <p className="reveal" style={{ marginBottom: '4rem', maxWidth: '50ch' }}>
          Grounded in computer science fundamentals with a strong academic record
          and a focus on practical, applied learning.
        </p>

        <div className="edu-timeline reveal">
          {education.map((edu) => (
            <div key={edu.id} className="edu-item">
              <span
                className="font-mono uppercase"
                style={{ display: 'block', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '0.5rem' }}
              >
                {edu.startYear} — {edu.endYear}
                {edu.current && (
                  <span
                    className="font-mono"
                    style={{
                      marginLeft: '0.75rem', fontSize: '0.5rem',
                      background: 'var(--accent-dim)', color: 'var(--accent)',
                      border: '1px solid rgba(184,255,0,0.3)',
                      padding: '0.1rem 0.5rem', borderRadius: '100px',
                    }}
                  >
                    Current
                  </span>
                )}
              </span>

              <div
                className="font-display font-bold"
                style={{ fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.25rem' }}
              >
                {edu.degree}
              </div>

              <div style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '0.2rem' }}>
                {edu.institution}
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                {edu.location}
              </div>

              {edu.grade && (
                <span
                  className="font-mono inline-block"
                  style={{
                    marginTop: '0.7rem', fontSize: '0.6rem', letterSpacing: '0.07em',
                    color: 'var(--accent)', background: 'var(--accent-dim)',
                    border: '1px solid rgba(184,255,0,0.2)',
                    padding: '0.22rem 0.65rem', borderRadius: '100px',
                  }}
                >
                  {edu.grade}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
