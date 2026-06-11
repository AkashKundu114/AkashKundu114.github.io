import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

export default function Certificates() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { certificates } = useData()
  const [active, setActive] = useState('All')
  const navigate = useNavigate()
  const ref = useRevealChildren()

  const allCategories = ['All', ...new Set(certificates.map(c => c.category))]
  const filtered = active === 'All' ? certificates : certificates.filter(c => c.category === active)

  return (
    <PageTransition>
      <section style={{ paddingTop: '8rem' }} ref={ref}>
        <div className="container">
          <div className="label reveal">certificates</div>
          <h2 className="reveal" style={{ marginBottom: '0.85rem', maxWidth: '32ch' }}>
            Certifications &amp; coursework.
          </h2>
          <p className="reveal" style={{ fontSize: '0.95rem', maxWidth: '58ch', lineHeight: 1.8, marginBottom: '2rem' }}>
            A running list of completed certifications across data, AI/ML, security, and
            web development.
          </p>

          <div className="reveal flex flex-wrap gap-1.5" style={{ marginBottom: '2rem' }}>
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`tag${active === cat ? ' tag-accent' : ''}`}
                style={{ cursor: 'pointer', background: active === cat ? 'var(--accent-soft)' : 'transparent' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map(cert => (
              <div
                key={cert.id}
                className="row-card reveal"
                onClick={() => navigate(`/certificates/${cert.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/certificates/${cert.id}`)}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                      <span className="tag">{cert.category}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>{cert.date}</span>
                    </div>
                    <h3 style={{ marginBottom: '0.35rem' }}>{cert.title}</h3>
                    <p style={{ fontSize: '0.86rem' }}>{cert.issuer}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5" style={{ maxWidth: 240, justifyContent: 'flex-end' }}>
                    {(cert.skills ?? []).slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="card" style={{ padding: '3rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--muted)' }}>
              No certificates in this category yet.
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
