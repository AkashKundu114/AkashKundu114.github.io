import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import { useRevealChildren } from '../hooks/useScrollReveal'

export default function Projects() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const ref = useRevealChildren()

  const filtered = projects.filter(p => {
    const q = query.toLowerCase()
    return (
      p.title.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.technologies.some(t => t.toLowerCase().includes(q))
    )
  })

  return (
    <section className="section" style={{ paddingTop: '9rem' }} ref={ref}>
      <span className="section-num">03</span>
      <div className="container">

        {/* Header + Search */}
        <div
          className="flex flex-wrap justify-between items-end gap-5"
          style={{ marginBottom: '2.5rem' }}
        >
          <div>
            <div className="label reveal">Selected Work</div>
            <h2 className="reveal">
              Things I've<br />
              <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>built.</em>
            </h2>
          </div>

          {/* Search bar */}
          <div
            className="reveal flex items-center gap-2 rounded"
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              padding: '0.55rem 1rem', transition: 'border-color 0.25s',
            }}
            onFocusCapture={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
            onBlurCapture={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>⌕</span>
            <input
              type="text"
              placeholder="Search projects, tech…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="bg-transparent border-none outline-none font-sans"
              style={{ color: 'var(--ink)', fontSize: '0.82rem', width: 210 }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ color: 'var(--muted)', fontSize: '0.8rem', cursor: 'pointer', background: 'none', border: 'none' }}>✕</button>
            )}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div
            className="projects-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
              gap: 1,
              background: 'var(--border)',
              border: '1px solid var(--border)',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            {filtered.map(p => (
              <div
                key={p.id}
                className="project-card reveal"
                onClick={() => navigate(`/projects/${p.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/projects/${p.id}`)}
              >
                <div
                  className="font-mono"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '0.9rem' }}
                >
                  {p.year}
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.7rem', color: 'var(--ink)', transition: 'color 0.25s', fontFamily: 'Syne, sans-serif' }}>
                  {p.title}
                </h3>

                <p style={{ fontSize: '0.84rem', lineHeight: 1.7, marginBottom: '1.3rem', color: 'var(--muted)' }}>
                  {p.shortDesc}
                </p>

                <div className="flex flex-wrap gap-1">
                  {p.technologies.map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>

                <div
                  className="inline-flex items-center gap-1 font-mono uppercase"
                  style={{ marginTop: '1.1rem', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--accent)' }}
                >
                  View Details →
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center font-mono"
            style={{ padding: '4rem', color: 'var(--muted)', fontSize: '0.8rem', border: '1px solid var(--border)', borderRadius: 4 }}
          >
            No projects match "{query}".
          </div>
        )}

      </div>
    </section>
  )
}
