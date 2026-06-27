import { useEffect } from 'react'
import { education } from '../data/education'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

const cur    = education.find(e => e.current)
const aisse  = education.find(e => e.id === 3)
const cgpaM  = cur?.grade.match(/[\d.]+/)
const aisseM = aisse?.grade.match(/[\d.]+/)

const statCards = [
  { label:'Current Semester', value:'5th',                  sub:'of 8 total',          accent:'var(--link)'   },
  { label:'CGPA',             value: cgpaM ? cgpaM[0]:'—', sub:'out of 10.0',          accent:'var(--accent)' },
  { label:'Secondary Score',  value: aisse?.grade ?? '—',  sub:`AISSE ${aisse?.endYear??''}`, accent:'var(--muted)'  },
]

export default function Education() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const ref = useRevealChildren()
  return (
    <PageTransition>
      <section style={{ paddingTop:'8rem' }} ref={ref}>
        <div className="container">
          <div className="label reveal">education</div>
          <h2 className="reveal" style={{ marginBottom:'0.85rem', maxWidth:'32ch' }}>Academic background.</h2>
          <p className="reveal" style={{ fontSize:'0.95rem', maxWidth:'56ch', lineHeight:1.8, marginBottom:'3rem' }}>
            Computer science fundamentals, with a consistent academic record.
          </p>

          <div className="timeline stagger">
            {education.map((edu, i) => (
              <div key={edu.id} className={`timeline-item reveal${edu.current?' is-current':''}`} style={{ '--i':i }}>
                <div style={{ marginBottom:'0.4rem', display:'flex', alignItems:'center', gap:'8px' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, color: edu.current?'var(--accent)':'var(--muted-2)', letterSpacing:'0.08em' }}>
                    {edu.startYear} — {edu.endYear}
                  </span>
                  {edu.current && <span className="tag tag-active">Current</span>}
                </div>
                <h3 style={{ marginBottom:'0.25rem', color:'var(--ink)' }}>{edu.degree}</h3>
                <p style={{ fontSize:'0.88rem', marginBottom:'0.15rem' }}>{edu.institution}</p>
                <p style={{ fontSize:'0.78rem', marginBottom:'0.6rem', color:'var(--muted-2)' }}>{edu.location}</p>
                {edu.grade && <span className="tag">{edu.grade}</span>}
              </div>
            ))}
          </div>

          {/* Stat cards */}
          <div className="reveal stagger" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px', marginTop:'3rem' }} id="edu-stats">
            {statCards.map((s,i) => (
              <div key={s.label} className="card card-hover reveal" style={{ padding:'24px', borderTop:`2px solid ${s.accent}`, '--i':i }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'9px', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--muted-2)', marginBottom:'8px' }}>{s.label}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.9rem', color:'var(--ink)', letterSpacing:'-0.04em', lineHeight:1 }}>{s.value}</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--muted-2)', marginTop:'5px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`@media(max-width:680px){#edu-stats{grid-template-columns:1fr!important}}`}</style>
    </PageTransition>
  )
}
