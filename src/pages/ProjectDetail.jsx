import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

export default function ProjectDetail() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { id } = useParams()
  const navigate = useNavigate()
  const ref = useRevealChildren()
  const { projects } = useData()
  const [lightbox, setLightbox] = useState(null)
  const project = projects.find(p => p.id === id)

  if (!project) return (
    <section style={{ paddingTop: '8rem' }}>
      <div className="container text-center">
        <p style={{ marginBottom: '1.5rem' }}>Project not found.</p>
        <Link to="/projects" className="btn">← Back to projects</Link>
      </div>
    </section>
  )

  const hasScreenshots = project.screenshots?.length > 0

  return (
    <PageTransition>
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <div style={{ position: 'relative', maxWidth: '90vw' }} onClick={e => e.stopPropagation()}>
            <img src={project.screenshots[lightbox].src} alt={project.screenshots[lightbox].caption} />
            <p style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
              {project.screenshots[lightbox].caption}
            </p>
            {project.screenshots.length > 1 && (
              <div className="flex justify-between" style={{ marginTop: '1rem', gap: '1rem' }}>
                <button onClick={() => setLightbox(i => (i - 1 + project.screenshots.length) % project.screenshots.length)} className="btn btn-sm">← Prev</button>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', alignSelf: 'center' }}>
                  {lightbox + 1} / {project.screenshots.length}
                </span>
                <button onClick={() => setLightbox(i => (i + 1) % project.screenshots.length)} className="btn btn-sm">Next →</button>
              </div>
            )}
            <button onClick={() => setLightbox(null)} aria-label="Close"
              style={{ position: 'absolute', top: '-2rem', right: 0, background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
          </div>
        </div>
      )}

      <section style={{ paddingTop: '8rem' }} ref={ref}>
        <div className="container">
          <button onClick={() => navigate('/projects')} className="reveal nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '2rem' }}>
            ← Back to projects
          </button>

          <div className="reveal" style={{ marginBottom: '2.5rem' }}>
            <span className="tag" style={{ marginBottom: '0.75rem' }}>{project.year}</span>
            <h1 style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>{project.title}</h1>
            <div className="flex flex-wrap gap-1.5" style={{ marginBottom: '1.25rem' }}>
              {(project.technologies ?? []).map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm">Source ↗</a>}
              {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Live ↗</a>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)', gap: '3rem', alignItems: 'start' }} className="detail-grid">
            <div>
              <div className="reveal card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.85rem' }}>Overview</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{project.description}</p>
              </div>

              {project.aiArchitecture && (
                <div className="reveal card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
                  <div className="label" style={{ marginBottom: '0.5rem' }}>data &amp; AI</div>
                  <h3 style={{ marginBottom: '0.85rem' }}>{project.aiArchitecture.heading}</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>{project.aiArchitecture.body}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {project.aiArchitecture.points.map((pt, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', lineHeight: 1.7, paddingLeft: '1rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.uiDeployment && (
                <div className="reveal card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
                  <div className="label" style={{ marginBottom: '0.5rem' }}>interface &amp; deployment</div>
                  <h3 style={{ marginBottom: '0.85rem' }}>{project.uiDeployment.heading}</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>{project.uiDeployment.body}</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {project.uiDeployment.points.map((pt, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', lineHeight: 1.7, paddingLeft: '1rem', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="reveal">
                <h3 style={{ marginBottom: '1rem' }}>Screenshots</h3>
                {hasScreenshots ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem' }}>
                    {project.screenshots.map((shot, i) => (
                      <div key={i} className="card" style={{ overflow: 'hidden', cursor: 'zoom-in' }} onClick={() => setLightbox(i)}>
                        <img src={shot.src} alt={shot.caption} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                        <div style={{ padding: '0.6rem 0.8rem' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)' }}>{shot.caption}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>No screenshots yet.</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="reveal card" style={{ padding: '1.75rem', position: 'sticky', top: '5rem' }}>
                <h3 style={{ marginBottom: '1.1rem' }}>Key features</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {(project.features ?? []).map((f, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', lineHeight: 1.65, paddingLeft: '1rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>{f}
                    </li>
                  ))}
                </ul>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
                    View source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){.detail-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </PageTransition>
  )
}
