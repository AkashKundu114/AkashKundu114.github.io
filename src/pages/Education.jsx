import { useEffect } from 'react'
import { education } from '../data/education'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

const current = education.find(e => e.current)
const aisse = education.find(e => e.id === 3)
const cgpaMatch = current?.grade.match(/[\d.]+/)
const aisseMatch = aisse?.grade.match(/[\d.]+/)

const statCards = [
  { label: 'Current Semester', value: '5th', sub: 'of 8 total', border: 'var(--accent-2)' },
  { label: 'CGPA', value: cgpaMatch ? cgpaMatch[0] : '—', sub: 'out of 10.0', border: 'var(--accent)' },
  { label: 'Secondary Score', value: aisse?.grade ?? '—', sub: `AISSE ${aisse?.endYear ?? ''}`, border: 'var(--ink)' },
]

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
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: edu.current ? 'var(--accent)' : 'var(--muted)' }}>
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

          <div className="reveal stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginTop: '3rem',
          }} id="edu-stats">
            {statCards.map((s, i) => (
              <div
                key={s.label}
                className="card card-hover reveal"
                style={{ padding: '24px', borderTop: `2px solid ${s.border}`, '--i': i }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: '8px' }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.7rem', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted-2)', marginTop: '4px' }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`@media(max-width:680px){#edu-stats{grid-template-columns:1fr!important}}`}</style>
    </PageTransition>
  )
}
