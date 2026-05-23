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
    <PageTransition>
      <section className="section" style={{ paddingTop: '9rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Project not found.</p>
          <Link to="/projects" className="btn btn-outline">← Back to Projects</Link>
        </div>
      </section>
    </PageTransition>
  )

  const hasScreenshots = project.screenshots?.length > 0
  const hasAI = Boolean(project.aiArchitecture)
  const hasUI = Boolean(project.uiDeployment)

  return (
    <PageTransition>
      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div style={{ position: 'relative', maxWidth: '90vw' }} onClick={e => e.stopPropagation()}>
            <img src={project.screenshots[lightbox].src} alt={project.screenshots[lightbox].caption}
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 4 }} />
            <p style={{ marginTop: '0.75rem', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)' }}>
              {project.screenshots[lightbox].caption}
            </p>
            {project.screenshots.length > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', gap: '1rem' }}>
                <button className="btn btn-outline btn-sm" onClick={() => setLightbox(i => (i - 1 + project.screenshots.length) % project.screenshots.length)}>← Prev</button>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', alignSelf: 'center' }}>
                  {lightbox + 1} / {project.screenshots.length}
                </span>
                <button className="btn btn-outline btn-sm" onClick={() => setLightbox(i => (i + 1) % project.screenshots.length)}>Next →</button>
              </div>
            )}
            <button onClick={() => setLightbox(null)} aria-label="Close"
              style={{ position: 'absolute', top: '-2rem', right: 0, background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
          </div>
        </div>
      )}

      <section className="section" style={{ paddingTop: '9rem' }} ref={ref}>
        <div className="container">

          {/* Back */}
          <button onClick={() => navigate('/projects')} className="reveal inline-flex items-center gap-2 font-mono uppercase mb-8"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '0.64rem', letterSpacing: '0.1em', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
            ← Back to Projects
          </button>

          {/* ── Hero ── */}
          <div className="reveal" style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid rgba(79,163,255,0.2)', padding: '0.2rem 0.7rem', borderRadius: '100px' }}>
                {project.year}
              </span>
              {project.liveLink && (
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(52,211,153,1)', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)', padding: '0.2rem 0.7rem', borderRadius: '100px' }}>
                  Live
                </span>
              )}
            </div>

            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 5vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.2rem' }}>
              {project.title}
            </h1>

            {project.problem && (
              <div style={{ padding: '1rem 1.4rem', background: 'rgba(79,163,255,0.06)', border: '1px solid rgba(79,163,255,0.18)', borderLeft: '3px solid var(--accent)', borderRadius: '0 4px 4px 0', marginBottom: '1.5rem', maxWidth: '70ch' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.4rem' }}>
                  The Problem
                </div>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--muted)' }}>{project.problem}</p>
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {(project.technologies ?? []).map(t => (
                <span key={t} className="skill-tag" style={{ fontSize: '0.72rem', padding: '0.3rem 0.8rem' }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {project.github   && <a href={project.github}   target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">GitHub ↗</a>}
              {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Live Demo ↗</a>}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              CASE STUDY — TWO SECTIONS
              ══════════════════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>

            {/* ── Section 1: The Data & AI Architecture ── */}
            {hasAI && (
              <CaseStudySection
                sectionNum="01"
                accent="rgba(129,140,248,1)"
                bg="rgba(129,140,248,0.05)"
                border="rgba(129,140,248,0.2)"
                label="The Data & AI Architecture"
                heading={project.aiArchitecture.heading}
                body={project.aiArchitecture.body}
                points={project.aiArchitecture.points}
                stack={project.aiArchitecture.stack}
              />
            )}

            {/* ── Section 2: The User Interface & Deployment ── */}
            {hasUI && (
              <CaseStudySection
                sectionNum="02"
                accent="rgba(52,211,153,1)"
                bg="rgba(52,211,153,0.05)"
                border="rgba(52,211,153,0.2)"
                label="The User Interface & Deployment"
                heading={project.uiDeployment.heading}
                body={project.uiDeployment.body}
                points={project.uiDeployment.points}
                stack={project.uiDeployment.stack}
                deployed={project.uiDeployment.deployed}
              />
            )}
          </div>

          {/* ── Overview + Key Features + Screenshots grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'start' }} className="detail-grid">

            {/* Left */}
            <div>
              {/* Overview */}
              <div className="reveal" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.75rem' }}>
                  Overview
                </div>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: 'var(--muted)', whiteSpace: 'pre-line' }}>
                  {project.description}
                </p>
              </div>

              {/* Screenshots */}
              <div className="reveal">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Screenshots</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>
                {hasScreenshots ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {project.screenshots.map((shot, i) => (
                      <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden', cursor: 'zoom-in', transition: 'all 0.25s' }}
                        onClick={() => setLightbox(i)}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'scale(1.02)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'scale(1)' }}>
                        <img src={shot.src} alt={shot.caption} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />
                        <div style={{ padding: '0.5rem 0.8rem' }}>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--muted)' }}>{shot.caption}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ border: '2px dashed var(--border)', borderRadius: 4, padding: '3rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.6rem', opacity: 0.3 }}>🖼</div>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)' }}>Screenshots coming soon.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right — Key Features sidebar */}
            <div>
              <div className="reveal" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '2rem', position: 'sticky', top: '6rem' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.2rem' }}>
                  Key Features
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(project.features ?? []).map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.1rem', fontSize: '0.7rem' }}>◆</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.75rem' }}>
                    Full Stack Used
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {(project.technologies ?? []).map(t => <span key={t} className="tech-badge">{t}</span>)}
                  </div>
                </div>

                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline"
                    style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                    View Source Code ↗
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
    </PageTransition>
  )
}

/* ── Case Study Section Component ─────────────────────────────────────── */
function CaseStudySection({ sectionNum, accent, bg, border, label, heading, body, points, stack, deployed }) {
  return (
    <div
      className="reveal"
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 6,
        overflow: 'hidden',
      }}
    >
      {/* Header strip */}
      <div style={{
        background: accent.replace('1)', '0.1)'),
        borderBottom: `1px solid ${border}`,
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, opacity: 0.7 }}>
          {sectionNum}
        </span>
        <div style={{ flex: 1, height: 1, background: accent.replace('1)', '0.2)') }} />
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, fontWeight: 700 }}>
          {label}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }} className="case-body">
        {/* Left */}
        <div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3, marginBottom: '1rem' }}>
            {heading}
          </h3>
          <p style={{ fontSize: '0.87rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '1.2rem' }}>
            {body}
          </p>
          {deployed && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.8rem', background: accent.replace('1)', '0.1)'), border: `1px solid ${accent.replace('1)', '0.2)')}`, borderRadius: 3 }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.54rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: accent }}>
                Deployed:
              </span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: accent }}>{deployed}</span>
            </div>
          )}
        </div>

        {/* Right */}
        <div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {(points ?? []).map((p, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <span style={{ color: accent, flexShrink: 0, marginTop: '0.1rem', fontSize: '0.65rem' }}>▸</span>
                <span style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.65 }}>{p}</span>
              </li>
            ))}
          </ul>
          {stack && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {stack.map(s => (
                <span key={s} style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                  padding: '0.22rem 0.6rem', background: accent.replace('1)', '0.1)'), border: `1px solid ${accent.replace('1)', '0.2)')}`,
                  borderRadius: 3, color: accent,
                }}>{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) { .case-body { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
