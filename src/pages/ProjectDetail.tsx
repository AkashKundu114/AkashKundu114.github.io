import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import { ShinyButton, Tactile3DButton, GlassButton } from '../components/EvilButtons';
import LiquidGlassLens from '../components/LiquidGlassLens';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ProjectScreenshot } from '../data/projects';

interface ArchitecturalSectionProps {
  label: string;
  heading: string;
  body: string;
  points: string[];
  stack?: string[];
}

function ArchitecturalSection({ label, heading, body, points, stack }: ArchitecturalSectionProps) {
  return (
    <div className="card" style={{ padding: '24px', marginBottom: '14px' }}>
      <div className="label" style={{ marginBottom: '8px' }}>
        {label}
      </div>
      <h3 style={{ fontSize: '1rem', lineHeight: 1.4, color: 'var(--ink)', marginBottom: '14px' }}>
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
      {points && points.length > 0 && (
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: stack && stack.length > 0 ? '16px' : 0,
          }}
        >
          {points.map((pointText, index) => (
            <li
              key={`${index}-${pointText.slice(0, 16)}`}
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
              {pointText}
            </li>
          ))}
        </ul>
      )}
      {stack && stack.length > 0 && (
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
          {stack.map((technologyName) => (
            <span key={technologyName} className="tag">
              {technologyName}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRevealChildren();
  const { projects = [] } = useData();

  const sanitizedId = typeof id === 'string' ? id.trim() : '';
  const currentProject = useMemo(
    () => (sanitizedId ? projects.find((project) => project.id === sanitizedId) : undefined),
    [projects, sanitizedId]
  );

  useDocumentTitle(
    currentProject ? `${currentProject.title} — Akash Kundu` : 'Project Blueprint — Akash Kundu',
    currentProject?.shortDesc
  );

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const screenshots: ProjectScreenshot[] = useMemo(
    () => (currentProject?.screenshots && Array.isArray(currentProject.screenshots) ? currentProject.screenshots : []),
    [currentProject]
  );

  const hasScreenshots = screenshots.length > 0;

  const closeLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  const navigateLightbox = useCallback(
    (direction: 'next' | 'prev') => {
      if (screenshots.length <= 1) return;
      setActiveLightboxIndex((currentIndex) => {
        const index = currentIndex ?? 0;
        if (direction === 'next') {
          return (index + 1) % screenshots.length;
        }
        return (index - 1 + screenshots.length) % screenshots.length;
      });
    },
    [screenshots.length]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sanitizedId]);

  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowRight') {
        navigateLightbox('next');
      } else if (event.key === 'ArrowLeft') {
        navigateLightbox('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, closeLightbox, navigateLightbox]);

  if (!currentProject) {
    return (
      <PageTransition>
        <section style={{ paddingTop: '100px', minHeight: '60vh' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '520px' }}>
            <div className="label" style={{ marginBottom: '12px', color: 'var(--danger)' }}>
              404 // NOT FOUND
            </div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>
              Project Not Found
            </h2>
            <p style={{ marginBottom: '24px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted-2)' }}>
              The engineering system blueprint you requested does not exist or has been archived.
            </p>
            <Tactile3DButton to="/projects">
              ← Return to Projects
            </Tactile3DButton>
          </div>
        </section>
      </PageTransition>
    );
  }

  const activeScreenshot =
    activeLightboxIndex !== null && screenshots[activeLightboxIndex]
      ? screenshots[activeLightboxIndex]
      : null;

  return (
    <PageTransition>
      {/* Lightbox Dialog Overlay */}
      {activeScreenshot && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeScreenshot.caption} - Architectural snapshot`}
        >
          <div
            style={{ position: 'relative', maxWidth: '92vw', maxHeight: '90vh' }}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeScreenshot.src}
              alt={activeScreenshot.caption}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '4px',
                border: '1px solid var(--border-3)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '14px',
                gap: '12px',
                background: 'rgba(0, 0, 0, 0.75)',
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
                {activeScreenshot.caption}
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {screenshots.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateLightbox('prev')}
                      className="btn btn-sm"
                      aria-label="Previous snapshot"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => navigateLightbox('next')}
                      className="btn btn-sm"
                      aria-label="Next snapshot"
                    >
                      Next →
                    </button>
                  </>
                )}
                <button
                  onClick={closeLightbox}
                  className="btn btn-sm btn-danger"
                  aria-label="Close snapshot dialog"
                >
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section style={{ paddingTop: '88px', paddingBottom: '72px' }} ref={containerRef}>
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

          {/* Hero Overview Block */}
          <LiquidGlassLens
            intensity="subtle"
            className="reveal"
            style={{ padding: '32px', marginBottom: '32px' }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}
            >
              <span className="tag">{currentProject.year}</span>
              {currentProject.status && <span className="tag tag-active">{currentProject.status}</span>}
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
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                marginBottom: '16px',
                lineHeight: 1.1,
                color: 'var(--ink)',
              }}
            >
              {currentProject.title}
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
              {currentProject.shortDesc}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '24px' }}>
              {(currentProject.technologies ?? []).map((techName) => (
                <span key={techName} className="tag">
                  {techName}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {currentProject.github && (
                <Tactile3DButton
                  href={currentProject.github}
                  target="_blank"
                  size="md"
                  variant="secondary"
                >
                  GitHub Repository ↗
                </Tactile3DButton>
              )}
              {currentProject.liveLink && (
                <ShinyButton
                  href={currentProject.liveLink}
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

          {/* Main 2-Column Content Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.55fr) minmax(0, 1fr)',
              gap: '24px',
              alignItems: 'start',
            }}
            id="detail-grid"
          >
            {/* Left Column: Description, Snapshots, Architecture */}
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
                  {currentProject.description}
                </p>

                {currentProject.problem && (
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
                      {currentProject.problem}
                    </p>
                  </div>
                )}

                {currentProject.id === 'eye-disease-predictor' && (
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

              {/* Visual Snapshots Section */}
              <div className="reveal" style={{ marginBottom: '14px' }}>
                <div className="label" style={{ marginBottom: '12px' }}>
                  technical architecture &amp; visual snapshots
                </div>
                {hasScreenshots ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {screenshots.map((shot, shotIndex) => (
                      <div
                        key={`${shotIndex}-${shot.src}`}
                        className="card card-hover"
                        style={{
                          overflow: 'hidden',
                          border: '1px solid var(--border-3)',
                          cursor: 'pointer',
                        }}
                        onClick={() => setActiveLightboxIndex(shotIndex)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveLightboxIndex(shotIndex);
                          }
                        }}
                        aria-label={`Enlarge architectural diagram: ${shot.caption}`}
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
                              background: 'rgba(0, 0, 0, 0.7)',
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

              {currentProject.aiArchitecture && (
                <div className="reveal">
                  <ArchitecturalSection
                    label="data &amp; model architecture"
                    heading={currentProject.aiArchitecture.heading}
                    body={currentProject.aiArchitecture.body}
                    points={currentProject.aiArchitecture.points}
                    stack={currentProject.aiArchitecture.stack}
                  />
                </div>
              )}

              {currentProject.uiDeployment && (
                <div className="reveal">
                  <ArchitecturalSection
                    label="interface &amp; deployment infrastructure"
                    heading={currentProject.uiDeployment.heading}
                    body={currentProject.uiDeployment.body}
                    points={currentProject.uiDeployment.points}
                    stack={currentProject.uiDeployment.stack}
                  />
                </div>
              )}
            </div>

            {/* Right Column: Key Deliverables & Quick Actions */}
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
                  {(currentProject.features ?? []).map((featureText, featureIndex) => (
                    <li
                      key={`${featureIndex}-${featureText.slice(0, 16)}`}
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
                      {featureText}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentProject.liveLink && (
                    <ShinyButton
                      href={currentProject.liveLink}
                      target="_blank"
                      size="md"
                      variant="primary"
                      className="w-full text-center"
                    >
                      Launch Live Demo ↗
                    </ShinyButton>
                  )}
                  {currentProject.github && (
                    <Tactile3DButton
                      href={currentProject.github}
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
