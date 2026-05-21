import { useEffect } from 'react'
import { getGroupedSkills } from '../data/skills'
import { useRevealChildren } from '../hooks/useScrollReveal'

export default function Skills() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const ref = useRevealChildren()
  const grouped = getGroupedSkills()
  return (
    <section className="section" style={{ paddingTop: '9rem' }} ref={ref}>
      <span className="section-num">02</span>
      <div className="container">
        <div className="label reveal">Technical Skills</div>
        <h2 className="reveal" style={{ marginBottom: '1rem' }}>What I<br /><em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>know &amp; use.</em></h2>
        <p className="reveal" style={{ marginBottom: '4rem', maxWidth: '55ch' }}>A toolkit built through projects, coursework, and self-directed learning across languages, frameworks, and modern developer tooling.</p>
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="reveal" style={{ marginBottom: '3rem' }}>
            <div className="flex items-center gap-4" style={{ marginBottom: '1rem' }}>
              <span className="font-mono uppercase whitespace-nowrap" style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--muted)' }}>{category}</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span className="font-mono" style={{ fontSize: '0.58rem', color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid rgba(79,163,255,0.2)', padding: '0.1rem 0.5rem', borderRadius: '100px' }}>{items.length}</span>
            </div>
            <div className="flex flex-wrap gap-2">{items.map(sk => <span key={sk.id} className="skill-tag">{sk.name}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
