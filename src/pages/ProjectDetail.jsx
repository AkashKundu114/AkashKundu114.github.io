import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { useRevealChildren } from '../hooks/useScrollReveal'

export default function ProjectDetail() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { id } = useParams()
  const navigate = useNavigate()
  const ref = useRevealChildren()
  const [lightbox, setLightbox] = useState(null) // index of open screenshot

  const project = projects.find(p => p.id === id)

  if (!project) {
    return (
      <section className="section" style={{ paddingTop: '9rem' }}>
        <div className="container text-center">
          <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Project not found.</p>
          <Link to="/projects" className="btn btn-outline">← Back to Projects</Link>
        </div>
      </section>
    )
  }

  const hasScreenshots = project.screenshots && project.screenshots.length > 0

  return (
    <>
      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div style={{ position: 'relative', maxWidth: '90vw' }} onClick={e => e.stopPropagation()}>
            <img
              src={project.screenshots[lightbox].src}
              alt={project.screenshots[lightbox].caption}
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 4 }}
            />
            <p
              className="font-mono text-center"
              style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}
            >
              {project.screenshots[lightbox].caption}
            </p>

            {/* Prev / Next */}
            {project.screenshots.length > 1 && (
              <div className="flex justify-between" style={{ marginTop: '1rem', gap: '1rem' }}>
                <button
                  onClick={() => setLightbox(i => (i - 1 + project.screenshots.length) % project.screenshots.length)}
                  className="btn btn-outline btn-sm"
                >← Prev</button>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', alignSelf: 'center' }}>
                  {lightbox + 1} / {project.screenshots.length}
                </span>
                <button
                  onClick={() => setLightbox(i => (i + 1) % project.screenshots.length)}
                  className="btn btn-outline btn-sm"
                >Next →</button>
              </div>
            )}

            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute', top: '-2rem', right: 0,
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
                fontSize: '1.2rem', cursor: 'pointer',
              }}
              aria-label="Close"
            >✕</button>
          </div>
        </div>
      )}

      <section className="section" style={{ paddingTop: '9rem' }} ref={ref}>
        <div className="container">

          {/* Back */}
          <button
            onClick={() => navigate('/projects')}
            className="reveal inline-flex items-center gap-2 font-mono uppercase mb-8 transition-colors"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.65rem', letterSpacing: '0.1em' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)' }}
          >
            ← Back to Projects
          </button>

          {/* Title block */}
          <div className="reveal" style={{ marginBottom: '3rem' }}>
            <div className="flex flex-wrap items-center gap-3" style={{ marginBottom: '0.75rem' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'var(--accent)', background: 'var(--accent-dim)',
                  border: '1px solid rgba(184,255,0,0.2)', padding: '0.2rem 0.7rem', borderRadius: '100px',
                }}
              >
                {project.year}
              </span>
            </div>
            <h1
              className="font-display font-bold"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem' }}
            >
              {project.title}
            </h1>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5" style={{ marginBottom: '1.5rem' }}>
              {project.technologies.map(t => (
                <span key={t} className="skill-tag" style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem' }}>{t}</span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <GitHubIcon /> View on GitHub
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  Live Demo ↗
                </a>
              )}
            </div>
          </div>

          {/* Main content grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)',
              gap: '4rem',
              alignItems: 'start',
            }}
            className="detail-grid"
          >
            {/* Left – Description + Screenshots */}
            <div>
              {/* Description */}
              <div
                className="reveal"
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 4, padding: '2rem', marginBottom: '2rem',
                }}
              >
                <h3 className="font-display" style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--ink)' }}>Overview</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--muted)', whiteSpace: 'pre-line' }}>
                  {project.description}
                </p>
              </div>

              {/* Screenshots */}
              <div className="reveal">
                <div className="flex items-center gap-3" style={{ marginBottom: '1.2rem' }}>
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--muted)' }}
                  >
                    Screenshots
                  </span>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>

                {hasScreenshots ? (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {project.screenshots.map((shot, i) => (
                      <div
                        key={i}
                        className="reveal"
                        style={{
                          background: 'var(--surface)', border: '1px solid var(--border)',
                          borderRadius: 4, overflow: 'hidden', cursor: 'zoom-in',
                          transition: 'border-color 0.25s, transform 0.25s',
                        }}
                        onClick={() => setLightbox(i)}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'var(--accent)'
                          e.currentTarget.style.transform = 'scale(1.02)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'var(--border)'
                          e.currentTarget.style.transform = 'scale(1)'
                        }}
                      >
                        <img
                          src={shot.src}
                          alt={shot.caption}
                          style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                        />
                        <div style={{ padding: '0.6rem 0.8rem' }}>
                          <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>
                            {shot.caption}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Placeholder when no screenshots yet */
                  <div
                    style={{
                      border: '2px dashed var(--border)', borderRadius: 4,
                      padding: '3rem', textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem', opacity: 0.3 }}>🖼</div>
                    <p className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>
                      Screenshots coming soon.
                    </p>
                    <p className="font-mono" style={{ fontSize: '0.58rem', color: 'var(--muted)', marginTop: '0.4rem' }}>
                      Add images to <code>/public/projects/{project.id}/</code> and update <code>src/data/projects.js</code>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right – Features */}
            <div>
              <div
                className="reveal"
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 4, padding: '2rem', position: 'sticky', top: '6rem',
                }}
              >
                <h3
                  className="font-display"
                  style={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--ink)' }}
                >
                  Key Features
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.15rem', fontSize: '0.75rem' }}>◆</span>
                      <span style={{ fontSize: '0.87rem', color: 'var(--muted)', lineHeight: 1.6 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                  <span className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                    Technologies Used
                  </span>
                  <div className="flex flex-wrap gap-1.5" style={{ marginTop: '0.75rem' }}>
                    {project.technologies.map(t => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>
                </div>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
                  >
                    <GitHubIcon /> View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </>
  )
}

function GitHubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}
