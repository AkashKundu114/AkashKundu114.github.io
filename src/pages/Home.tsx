import { useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { skills } from '../data/skills';
import { Project } from '../data/projects';
import { Certificate } from '../data/certificates';
import { ShinyButton, Tactile3DButton, GlassButton } from '../components/EvilButtons';
import LiquidGlassLens from '../components/LiquidGlassLens';
import { sanitizeUrl } from '../utils/security';

const AdvertisingCloud3D = lazy(() => import('../components/AdvertisingCloud3D'));

interface EngineeringDomain {
  label: string;
  icon: string;
  description: string;
  technologies: string[];
  color: string;
}

interface StatMetric {
  value: string | number;
  label: string;
}

const ENGINEERING_DOMAINS: readonly EngineeringDomain[] = [
  {
    label: 'AI & Data Engineering',
    icon: '◈',
    description:
      'Training models, agentic state-machines, and high-throughput vector pipelines from raw data to production.',
    technologies: [
      'PyTorch',
      'LangGraph',
      'Agentic AI',
      'MCP',
      'Ollama',
      'Sarvam AI',
      'pgvector',
      'SQL',
    ],
    color: '#AFD2FA',
  },
  {
    label: 'Backend & Multi-Tenant Systems',
    icon: '◉',
    description:
      'Low-latency async microservices, tenant-isolated relational databases, and centralized observability.',
    technologies: [
      'C#',
      'ASP.NET',
      'FastAPI',
      'Node.js',
      'MS SQL Server',
      'PostgreSQL',
      'Redis',
      'Docker',
    ],
    color: '#B9915E',
  },
  {
    label: 'Modern Frontend & 3D Web UI',
    icon: '◎',
    description:
      'Performant, tactile, and reactive interfaces — procedural Three.js WebGL, Vue.js, and desktop apps.',
    technologies: [
      'Three.js',
      'WebGL',
      'React',
      'Vue.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
    ],
    color: '#FEFAEF',
  },
];

function calculatePortfolioMetrics(
  projectList: readonly Project[],
  certificateList: readonly Certificate[]
): StatMetric[] {
  const safeProjects = projectList ?? [];
  const safeCertificates = certificateList ?? [];

  const uniqueTechnologies = new Set<string>();
  for (const project of safeProjects) {
    if (Array.isArray(project.technologies)) {
      for (const tech of project.technologies) {
        if (tech && tech.trim()) {
          uniqueTechnologies.add(tech.trim());
        }
      }
    }
  }

  const techCount = uniqueTechnologies.size;

  return [
    { value: safeProjects.length, label: 'projects shipped' },
    { value: safeCertificates.length, label: 'industry certs' },
    { value: techCount > 0 ? `${techCount}+` : '0', label: 'technologies' },
    { value: '2027', label: 'final year (grad)' },
  ];
}

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  radius: number;
}

function ParticleNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let isIntersecting = true;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth || 300;
      canvas.height = canvas.offsetHeight || 300;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = 26;
    const particles: NodeParticle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (canvas.width || 300),
      y: Math.random() * (canvas.height || 300),
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      phase: Math.random() * Math.PI * 2,
      radius: Math.random() * 1.8 + 0.6,
    }));

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    });

    observer.observe(canvas);

    const renderLoop = () => {
      if (!isIntersecting) return;

      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.x += particle.vx + Math.sin(time + particle.phase) * 0.12;
        particle.y += particle.vy + Math.cos(time + particle.phase) * 0.12;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.09;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(175, 210, 250, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const particle of particles) {
        const alpha = 0.2 + Math.sin(time + particle.phase) * 0.08;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(175, 210, 250, ${alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

export default function Home() {
  useDocumentTitle(
    'Akash Kundu — AI Systems & Research Engineer',
    'Personal engineering portfolio of Akash Kundu — AI Systems, Autonomous Agents, and ML Research.'
  );

  const { projects = [], certificates = [] } = useData();
  const containerRef = useRevealChildren();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredProjects = useMemo(() => projects.slice(0, 4), [projects]);

  const summaryStats = useMemo(
    () => calculatePortfolioMetrics(projects, certificates),
    [projects, certificates]
  );

  const marqueeSkillsList = useMemo(
    () => (skills && skills.length > 0 ? skills.map((s) => s.name) : []),
    []
  );

  return (
    <PageTransition>
      <div ref={containerRef}>
        <section
          style={{
            paddingTop: '96px',
            paddingBottom: '64px',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '92vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ParticleNetworkCanvas />

          <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
            <div className="reveal" style={{ marginBottom: '28px' }}>
              <LiquidGlassLens
                intensity="subtle"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  padding: '6px 16px',
                  borderRadius: 0,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--success)',
                    animation: 'pulse-dot 2.4s ease-in-out infinite',
                    flexShrink: 0,
                  }}
                />
                Final Year CSE · Open to Full-Time &amp; Pre-Placement Internships
              </LiquidGlassLens>
            </div>

            <h1
              className="reveal heading-xl"
              style={{ maxWidth: '840px', marginBottom: '28px', lineHeight: 1.04 }}
            >
              Map your thoughts. <span style={{ color: 'var(--muted)' }}>Synthesize data.</span>{' '}
              <span style={{ color: 'var(--accent)', WebkitTextStroke: '0px' }}>
                Generate reality.
              </span>
            </h1>

            <p
              className="reveal"
              style={{
                fontSize: '15px',
                lineHeight: 1.85,
                maxWidth: '540px',
                marginBottom: '36px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--ink-2)',
              }}
            >
              Final-year B.Tech CSE student at Techno India University, Kolkata. Architecting
              production-grade autonomous AI agents, local-first ML operating systems, and
              high-throughput full-stack platforms.
            </p>

            <div
              className="reveal"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '52px' }}
            >
              <ShinyButton to="/projects" size="lg" variant="primary">
                Explore Projects →
              </ShinyButton>
              <Tactile3DButton to="/contact" size="lg" variant="secondary">
                Get in Touch
              </Tactile3DButton>
              <GlassButton href="/cv/AkashKundu_CV.pdf" download size="lg">
                Download Resume ↓
              </GlassButton>
            </div>

            <div
              className="reveal"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '44px', marginBottom: '44px' }}
              id="stats-row"
            >
              {summaryStats.map((metric) => (
                <div key={metric.label} className="stat-block">
                  <div className="stat-number">
                    <span>{metric.value}</span>
                  </div>
                  <div className="stat-label">{metric.label}</div>
                </div>
              ))}
            </div>

            {marqueeSkillsList.length > 0 && (
              <div className="reveal marquee-wrap" style={{ margin: '0 -2rem' }}>
                <div className="marquee-track">
                  {[...marqueeSkillsList, ...marqueeSkillsList].map((skillName, index) => (
                    <span
                      key={`${skillName}-${index}`}
                      className="marquee-item"
                      style={{
                        color: index % 2 === 0 ? 'var(--link)' : 'var(--accent)',
                      }}
                    >
                      <span className="marquee-diamond">◆</span>
                      {skillName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="label reveal">what I work on</div>
            <h2 className="reveal" style={{ marginBottom: '32px', maxWidth: '26ch' }}>
              Three layers, every project.
            </h2>
            <div
              className="bento-grid stagger"
              style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
              id="domain-grid"
            >
              {ENGINEERING_DOMAINS.map((domain, index) => (
                <LiquidGlassLens
                  key={domain.label}
                  intensity="subtle"
                  className="card card-hover reveal"
                  style={{ padding: '28px 24px', '--i': index } as React.CSSProperties}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '16px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        fontSize: '15px',
                        color: domain.color,
                        border: `1px solid ${domain.color}28`,
                        background: `${domain.color}0c`,
                        borderRadius: 0,
                      }}
                    >
                      {domain.icon}
                    </span>
                    <h3 style={{ color: 'var(--ink)' }}>{domain.label}</h3>
                  </div>
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.75,
                      marginBottom: '20px',
                      color: 'var(--ink-2)',
                    }}
                  >
                    {domain.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {domain.technologies.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </LiquidGlassLens>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '10px' }}>
          <div className="container">
            <div className="label reveal">interactive 3D architecture · WebGL</div>
            <div
              className="reveal"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <h2 style={{ marginBottom: '8px' }}>Advertising Cloud &amp; AI Agent Engine</h2>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--ink-2)',
                    maxWidth: '62ch',
                    lineHeight: 1.7,
                  }}
                >
                  Interactive 3D procedural simulation inspired by ThreeUI &amp; Three.js — modeling
                  cross-channel marketing optimization, multi-tenant databases, and agentic LLM
                  swarms.
                </p>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent)',
                  padding: '6px 14px',
                  border: '1px solid rgba(175, 210, 250, 0.25)',
                  background: 'rgba(175, 210, 250, 0.05)',
                }}
              >
                60 FPS · Three.js GPU Accelerated
              </div>
            </div>

            <div className="reveal">
              <Suspense
                fallback={
                  <div
                    style={{
                      height: '420px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--muted)',
                    }}
                  >
                    Initializing 3D Simulation...
                  </div>
                }
              >
                <AdvertisingCloud3D />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div
              className="reveal"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '28px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <div className="label">selected work</div>
                <h2>Flagship engineering projects</h2>
              </div>
              <Link to="/projects" className="btn btn-sm">
                All projects ({projects.length}) →
              </Link>
            </div>

            {featuredProjects.length > 0 ? (
              <div
                className="stagger"
                style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                {featuredProjects.map((project, index) => (
                  <article
                    key={project.id}
                    className="row-card reveal"
                    style={{ '--i': index, padding: '20px 24px' } as React.CSSProperties}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '18px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 260 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                            flexWrap: 'wrap',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '10px',
                              color: 'var(--muted-2)',
                              letterSpacing: '0.08em',
                            }}
                          >
                            {project.year}
                          </span>
                          {project.status && <span className="tag">{project.status}</span>}
                          {project.screenshots && project.screenshots.length > 0 && (
                            <span
                              className="tag"
                              style={{
                                borderColor: 'var(--accent)',
                                color: 'var(--accent)',
                                background: 'var(--accent-soft)',
                              }}
                            >
                              Architecture Snapshot ✓
                            </span>
                          )}
                        </div>
                        <h3 style={{ marginBottom: '6px', fontSize: '1rem' }}>
                          <Link
                            to={`/projects/${project.id}`}
                            style={{
                              color: 'var(--ink)',
                              textDecoration: 'none',
                            }}
                          >
                            {project.title}
                          </Link>
                        </h3>
                        <p
                          style={{
                            fontSize: '13px',
                            lineHeight: 1.65,
                            maxWidth: '56ch',
                            color: 'var(--ink-2)',
                          }}
                        >
                          {project.shortDesc}
                        </p>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: '10px',
                          minWidth: '200px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '4px',
                            justifyContent: 'flex-end',
                          }}
                        >
                          {(project.technologies ?? []).slice(0, 4).map((tech) => (
                            <span key={tech} className="tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          {sanitizeUrl(project.github) && (
                            <a
                              href={sanitizeUrl(project.github)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm"
                              style={{ padding: '3px 10px', fontSize: '10px' }}
                            >
                              Code ↗
                            </a>
                          )}
                          <Link
                            to={`/projects/${project.id}`}
                            className="btn btn-sm btn-primary"
                            style={{ padding: '3px 10px', fontSize: '10px' }}
                          >
                            Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                  No featured projects available.
                </p>
              </div>
            )}
          </div>
        </section>

        <section
          className="section"
          style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
        >
          <div className="container">
            <LiquidGlassLens
              intensity="medium"
              className="reveal"
              style={{
                padding: '36px 32px',
                borderLeft: '4px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '24px',
              }}
            >
              <div>
                <div className="label">hiring status · final year</div>
                <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
                  Graduating 2027 · Open to Roles.
                </h2>
                <p style={{ fontSize: '14px', marginTop: '6px', color: 'var(--ink-2)' }}>
                  Actively interviewing for AI Engineering, MLOps, &amp; Full-Stack Software
                  Engineer roles. Based in Kolkata, open to Relocation &amp; Remote.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <ShinyButton to="/contact" size="md">
                  Get In Touch →
                </ShinyButton>
                <Tactile3DButton
                  href="https://www.linkedin.com/in/akashkundu114/"
                  target="_blank"
                  size="md"
                >
                  LinkedIn Profile ↗
                </Tactile3DButton>
              </div>
            </LiquidGlassLens>
          </div>
        </section>
      </div>

      <style>{`
        @media(max-width:900px){#domain-grid{grid-template-columns:1fr!important}}
        @media(max-width:560px){#stats-row{gap:28px!important}}
      `}</style>
    </PageTransition>
  );
}
