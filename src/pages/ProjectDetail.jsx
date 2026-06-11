import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

function SectionBlock({ label, heading, body, points, stack }) {
  return (
    <div className="card" style={{ padding: '24px', marginBottom: '12px' }}>
      <div style={{ marginBottom: '16px' }}>
        <div className="label" style={{ marginBottom: '8px' }}>{label}</div>
        <h3 style={{ fontSize: '0.95rem', lineHeight: 1.4 }}>{heading}</h3>
      </div>
      <p style={{ fontSize: '13px', lineHeight: 1.8, marginBottom: '16px', fontFamily: 'var(--font-mono)' }}>{body}</p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: stack ? '16px' : 0 }}>
        {points.map((pt, i) => (
          <li key={i} style={{
            fontSize: '13px',
            lineHeight: 1.65,
            paddingLeft: '16px',
            position: 'relative',
            fontFamily: 'var(--font-mono)',
            color: 'var(--muted)',
          }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--ink)', fontWeight: 600 }}>—</span>
            {pt}
          </li>
        ))}
      </ul>
      {stack && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
          {stack.map(s => <span key={s} className="tag">{s}</span>)}
        </div>
      )}
    </div>
  )
}

export default function ProjectDetail() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { id } = useParams()
  const navigate = useNavigate()
  const ref = useRevealChildren()
  const { projects } = useData()
  const [lightbox, setLightbox] = useState(null)
  const project = projects.find(p => p.id === id)

  if (!project) return (
    <section style={{ paddingTop: '96px' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{ marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>Project not found.</p>
        <Link to="/projects" className="btn btn-pill">← Back to projects</Link>
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
            {project.screenshots.length > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', gap: '12px' }}>
                <button onClick={() => setLightbox(i => (i - 1 + project.screenshots.length) % project.screenshots.length)} className="btn btn-sm btn-pill">← Prev</button>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', alignSelf: 'center' }}>
                  {lightbox + 1} / {project.screenshots.length}
                </span>
                <button onClick={() => setLightbox(i => (i + 1) % project.screenshots.length)} className="btn btn-sm btn-pill">Next →</button>
              </div>
            )}
            <button onClick={() => setLightbox(null)} aria-label="Close"
              style={{ position: 'absolute', top: '-28px', right: 0, background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', cursor: 'pointer' }}>✕</button>
          </div>
        </div>
      )}

      <section style={{ paddingTop: '96px' }} ref={ref}>
        <div className="container">
          {/* Back nav */}
          <button onClick={() => navigate('/projects')} className="reveal btn btn-sm btn-pill" style={{ marginBottom: '32px', gap: '6px' }}>
            ← Projects
          </button>

          {/* Header */}
          <div className="reveal" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="tag">{project.year}</span>
              {project.status && <span className="tag">{project.status}</span>}
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '16px', lineHeight: 1.1 }}>{project.title}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
              {(project.technologies ?? []).map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-pill">Source ↗</a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm btn-pill">Live ↗</a>
              )}
            </div>
          </div>

          {/* Body grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)',
            gap: '24px',
            alignItems: 'start',
          }} id="detail-grid">
            <div>
              {/* Overview */}
              <div className="reveal card" style={{ padding: '24px', marginBottom: '12px' }}>
                <div className="label" style={{ marginBottom: '8px' }}>overview</div>
                <p style={{ fontSize: '13px', lineHeight: 1.8, fontFamily: 'var(--font-mono)', whiteSpace: 'pre-line' }}>{project.description}</p>
              </div>

              {/* AI Architecture */}
              {project.aiArchitecture && (
                <div className="reveal">
                  <SectionBlock
                    label="data & ai"
                    heading={project.aiArchitecture.heading}
                    body={project.aiArchitecture.body}
                    points={project.aiArchitecture.points}
                    stack={project.aiArchitecture.stack}
                  />
                </div>
              )}

              {/* UI & Deployment */}
              {project.uiDeployment && (
                <div className="reveal">
                  <SectionBlock
                    label="interface & deployment"
                    heading={project.uiDeployment.heading}
                    body={project.uiDeployment.body}
                    points={project.uiDeployment.points}
                    stack={project.uiDeployment.stack}
                  />
                </div>
              )}

              {/* Screenshots */}
              <div className="reveal">
                <div className="label" style={{ marginBottom: '14px' }}>screenshots</div>
                {hasScreenshots ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                    {project.screenshots.map((shot, i) => (
                      <div key={i} className="card" style={{ overflow: 'hidden', cursor: 'zoom-in' }} onClick={() => setLightbox(i)}>
                        <img src={shot.src} alt={shot.caption} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                        <div style={{ padding: '8px 12px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted-2)' }}>{shot.caption}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card" style={{ padding: '36px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>No screenshots yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar: Key features */}
            <div>
              <div className="reveal card" style={{ padding: '24px', position: 'sticky', top: '5rem' }}>
                <div className="label" style={{ marginBottom: '14px' }}>key features</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {(project.features ?? []).map((f, i) => (
                    <li key={i} style={{
                      fontSize: '13px',
                      lineHeight: 1.65,
                      paddingLeft: '16px',
                      position: 'relative',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--muted)',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--ink)', fontWeight: 600 }}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn" style={{ width: '100%', justifyContent: 'center', borderRadius: 'var(--radius-pill)' }}>
                    View source ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`@media(max-width:768px){#detail-grid{grid-template-columns:1fr!important;gap:16px!important}}`}</style>
    </PageTransition>
  )
}
