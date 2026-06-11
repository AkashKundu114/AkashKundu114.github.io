import { useEffect } from 'react'
import { education } from '../data/education'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

export default function Education() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const ref = useRevealChildren()

  return (
    <PageTransition>
      <section style={{ paddingTop: '8rem' }} ref={ref}>
        <div className="container">
          <div className="label reveal">education</div>
          <h2 className="reveal" style={{ marginBottom: '0.85rem', maxWidth: '32ch' }}>
            Academic background.
          </h2>
          <p className="reveal" style={{ fontSize: '0.95rem', maxWidth: '58ch', lineHeight: 1.8, marginBottom: '3rem' }}>
            Computer science fundamentals, with a consistent academic record.
          </p>

          <div className="timeline stagger">
            {education.map((edu, i) => (
              <div
                key={edu.id}
                className={`timeline-item reveal${edu.current ? ' is-current' : ''}`}
                style={{ '--i': i }}
              >
                <div className="flex items-center gap-2" style={{ marginBottom: '0.4rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: edu.current ? 'var(--ink)' : 'var(--muted)' }}>
                    {edu.startYear} — {edu.endYear}
                  </span>
                  {edu.current && <span className="tag tag-active">Current</span>}
                </div>
                <h3 style={{ marginBottom: '0.25rem' }}>{edu.degree}</h3>
                <p style={{ fontSize: '0.88rem', marginBottom: '0.15rem' }}>{edu.institution}</p>
                <p style={{ fontSize: '0.8rem', marginBottom: '0.6rem' }}>{edu.location}</p>
                {edu.grade && <span className="tag">{edu.grade}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
