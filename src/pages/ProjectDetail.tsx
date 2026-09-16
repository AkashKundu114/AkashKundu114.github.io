import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import { ShinyButton, Tactile3DButton, GlassButton } from '../components/EvilButtons';
import LiquidGlassLens from '../components/LiquidGlassLens';

interface SectionBlockProps {
  label: string;
  heading: string;
  body: string;
  points: string[];
  stack?: string[];
}

function SectionBlock({ label, heading, body, points, stack }: SectionBlockProps) {
  return (
    <div className="card" style={{ padding: '24px', marginBottom: '12px' }}>
      <div className="label" style={{ marginBottom: '8px' }}>
        {label}
      </div>
      <h3
        style={{ fontSize: '1rem', lineHeight: 1.4, color: 'var(--ink)', marginBottom: '14px' }}
      >
        {heading}
      </h3>
      <p
        style={{
          fontSize: '13px',
          lineHeight: 1.8,
          marginBottom: '16px',
          fontFamily: 'var(--font-body)',
          color: 'var(--ink-2)',
        }}
      >
        {body}
      </p>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: stack ? '16px' : 0,
        }}
      >
        {points.map((pt, i) => (
          <li
            key={i}
            style={{
              fontSize: '13px',
              lineHeight: 1.65,
              paddingLeft: '18px',
              position: 'relative',
              fontFamily: 'var(--font-body)',
              color: 'var(--ink-2)',
            }}
          >
            <span
              style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontWeight: 700 }}
            >
              ◈
            </span>
            {pt}
          </li>
        ))}
      </ul>
      {stack && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            borderTop: '1px solid var(--border)',
            paddingTop: '14px',
            marginTop: '12px',
          }}
        >
          {stack.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const ref = useRevealChildren();
  const { projects } = useData();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const project = projects.find((p) => p.id === id);

  if (!project)
    return (
      <section style={{ paddingTop: '88px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>Project not found.</p>
          <Tactile3DButton to="/projects">
            ← Back to projects
          </Tactile3DButton>
        </div>
      </section>
    );

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <PageTransition>
      {lightbox !== null && hasScreenshots && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            style={{ position: 'relative', maxWidth: '92vw', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.screenshots[lightbox].src}
              alt={project.screenshots[lightbox].caption}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '4px',
                border: '1px solid var(--border-3)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '14px',
                gap: '12px',
                background: 'rgba(0,0,0,0.7)',
                padding: '8px 16px',
                borderRadius: '4px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--ink)',
                }}
              >
                {project.screenshots[lightbox].caption}
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {project.screenshots.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setLightbox(
                          (i) =>
                            ((i ?? 0) - 1 + project.screenshots.length) % project.screenshots.length
                        )
                      }
                      className="btn btn-sm"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() =>
                        setLightbox((i) => ((i ?? 0) + 1) % project.screenshots.length)
                      }
                      className="btn btn-sm"
                    >
                      Next →
                    </button>
                  </>
                )}
                <button
                  onClick={() => setLightbox(null)}
                  className="btn btn-sm btn-danger"
                >
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section style={{ paddingTop: '88px', paddingBottom: '72px' }} ref={ref}>
        <div className="container">
          <div style={{ marginBottom: '28px' }}>
            <Tactile3DButton
              onClick={() => navigate('/projects')}
              size="sm"
              variant="secondary"
            >
              ← Back to Projects
            </Tactile3DButton>
          </div>

          <LiquidGlassLens
            intensity="subtle"
            className="reveal"
            style={{ padding: '32px', marginBottom: '32px' }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}
            >
              <span className="tag">{project.year}</span>
              {project.status && <span className="tag tag-active">{project.status}</span>}
              {hasScreenshots && (
                <span
                  className="tag"
                  style={{
                    background: 'var(--accent-soft)',
                    borderColor: 'var(--accent)',
                    color: 'var(--accent)',
                  }}
                >
                  Architecture Preview Available
                </span>
              )}
            </div>
            <h1
              style={{
                fontSize: 'clamp(1.8rem,4vw,2.6rem)',
                marginBottom: '16px',
                lineHeight: 1.1,
                color: 'var(--ink)',
              }}
            >
              {project.title}
            </h1>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                maxWidth: '68ch',
                color: 'var(--ink-2)',
                marginBottom: '20px',
              }}
            >
              {project.shortDesc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '24px' }}>
              {(project.technologies ?? []).map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {project.github && (
                <Tactile3DButton
                  href={project.github}
                  target="_blank"
                  size="md"
                  variant="secondary"
                >
                  GitHub Repository ↗
                </Tactile3DButton>
              )}
              {project.liveLink && (
                <ShinyButton
                  href={project.liveLink}
                  target="_blank"
                  size="md"
                  variant="primary"
                >
                  Live Demo ↗
                </ShinyButton>
              )}
              <GlassButton
                href="/cv/AkashKundu_CV.pdf"
                download
                size="md"
              >
                View in Resume ↓
              </GlassButton>
            </div>
          </LiquidGlassLens>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1.55fr) minmax(0,1fr)',
              gap: '24px',
              alignItems: 'start',
            }}
            id="detail-grid"
          >
            <div>
              <div className="reveal card" style={{ padding: '28px', marginBottom: '14px' }}>
                <div className="label" style={{ marginBottom: '10px' }}>
                  engineering overview
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.85,
                    fontFamily: 'var(--font-body)',
                    whiteSpace: 'pre-line',
                    color: 'var(--ink-2)',
                  }}
                >
                  {project.description}
                </p>

                {project.problem && (
                  <div
                    style={{
                      marginTop: '20px',
                      padding: '14px 18px',
                      background: 'var(--surface-2)',
                      borderLeft: '3px solid var(--accent)',
                    }}
                  >
                    <div className="label" style={{ marginBottom: '6px' }}>
                      problem statement
                    </div>
                    <p style={{ fontSize: '12px', lineHeight: 1.7, color: 'var(--ink)' }}>
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.id === 'eye-disease-predictor' && (
                  <div
                    style={{
                      marginTop: '16px',
                      padding: '14px 18px',
                      background: 'rgba(229, 115, 115, 0.08)',
                      border: '1px solid rgba(229, 115, 115, 0.35)',
                      borderLeft: '3px solid #E57373',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: '#E57373',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        marginBottom: '6px',
                      }}
                    >
                      ⚠ Clinical Research &amp; SaMD Policy Notice
                    </div>
                    <p style={{ fontSize: '12px', lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: '8px' }}>
                      OphthalmoAI is strictly an academic research exploration and is <strong>not certified as Software as a Medical Device (SaMD)</strong> by the FDA, CE, or CDSCO. Not intended for clinical diagnosis, patient triage, or direct medical treatment.
                    </p>
                    <Link
                      to="/terms#medical-disclaimer"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: '#E57373',
                        textDecoration: 'underline',
                        fontWeight: 600,
                      }}
                    >
                      View Statutory Medical &amp; AI Disclaimers ↗
                    </Link>
                  </div>
                )}
              </div>

              {/* Visual Architecture and Snapshot Showcase */}
              <div className="reveal" style={{ marginBottom: '14px' }}>
                <div className="label" style={{ marginBottom: '12px' }}>
                  technical architecture &amp; visual snapshots
                </div>
                {hasScreenshots ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {project.screenshots.map((shot, i) => (
                      <div
                        key={i}
                        className="card card-hover"
                        style={{
                          overflow: 'hidden',
                          border: '1px solid var(--border-3)',
                          cursor: 'pointer',
                        }}
                        onClick={() => setLightbox(i)}
                      >
                        <div style={{ position: 'relative' }}>
                          <img
                            src={shot.src}
                            alt={shot.caption}
                            style={{
                              width: '100%',
                              aspectRatio: '16/9',
                              objectFit: 'cover',
                              display: 'block',
                              background: '#0a0a0f',
                            }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '12px',
                              right: '12px',
                              background: 'rgba(0,0,0,0.7)',
                              border: '1px solid var(--border-2)',
                              padding: '4px 8px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '10px',
                              color: 'var(--accent)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                            }}
                          >
                            <span>🔍 Click to expand</span>
                          </div>
                        </div>
                        <div
                          style={{
                            padding: '12px 16px',
                            background: 'var(--surface)',
                            borderTop: '1px solid var(--border)',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              color: 'var(--ink)',
                              lineHeight: 1.5,
                              display: 'block',
                            }}
                          >
                            {shot.caption}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card" style={{ padding: '36px', textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted-2)' }}>
                      Interactive architecture snapshot generating...
                    </p>
                  </div>
                )}
              </div>

              {project.aiArchitecture && (
                <div className="reveal">
                  <SectionBlock
                    label="data &amp; model architecture"
                    heading={project.aiArchitecture.heading}
                    body={project.aiArchitecture.body}
                    points={project.aiArchitecture.points}
                    stack={project.aiArchitecture.stack}
                  />
                </div>
              )}

              {project.uiDeployment && (
                <div className="reveal">
                  <SectionBlock
                    label="interface &amp; deployment infrastructure"
                    heading={project.uiDeployment.heading}
                    body={project.uiDeployment.body}
                    points={project.uiDeployment.points}
                    stack={project.uiDeployment.stack}
                  />
                </div>
              )}
            </div>

            <div>
              <div
                className="reveal card"
                style={{ padding: '24px', position: 'sticky', top: '5rem' }}
              >
                <div className="label" style={{ marginBottom: '14px' }}>
                  key engineering deliverables
                </div>
                <ul
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginBottom: '24px',
                  }}
                >
                  {(project.features ?? []).map((f, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: '13px',
                        lineHeight: 1.65,
                        paddingLeft: '16px',
                        position: 'relative',
                        fontFamily: 'var(--font-body)',
                        color: 'var(--ink-2)',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--accent)',
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {project.liveLink && (
                    <ShinyButton
                      href={project.liveLink}
                      target="_blank"
                      size="md"
                      variant="primary"
                      className="w-full text-center"
                    >
                      Launch Live Demo ↗
                    </ShinyButton>
                  )}
                  {project.github && (
                    <Tactile3DButton
                      href={project.github}
                      target="_blank"
                      size="md"
                      className="w-full text-center"
                    >
                      View Source Code ↗
                    </Tactile3DButton>
                  )}
                  <Tactile3DButton
                    to="/contact"
                    size="sm"
                    variant="secondary"
                    className="w-full text-center"
                  >
                    Contact About This Project
                  </Tactile3DButton>
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border)',
                    textAlign: 'center',
                  }}
                >
                  <Link
                    to="/terms"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--muted-2)',
                      textDecoration: 'none',
                      transition: 'color var(--t)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-2)')}
                  >
                    Terms &amp; Ethics Policy ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){#detail-grid{grid-template-columns:1fr!important;gap:16px!important}}`}</style>
    </PageTransition>
  );
}
