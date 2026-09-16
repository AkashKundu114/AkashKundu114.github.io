import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import { skills } from '../data/skills';
import { ShinyButton, Tactile3DButton, GlassButton } from '../components/EvilButtons';
import LiquidGlassLens from '../components/LiquidGlassLens';

const domains = [
  {
    label: 'AI & Data Engineering',
    icon: '◈',
    desc: 'Training models, agentic state-machines, and high-throughput vector pipelines from raw data to production.',
    tags: ['PyTorch', 'LangGraph', 'Ollama', 'Sarvam AI', 'pgvector', 'OpenCV', 'SQL'],
    color: '#AFD2FA',
  },
  {
    label: 'Backend & Systems',
    icon: '◉',
    desc: 'Low-latency async microservices, schema-migrated databases, and offline runtime engines.',
    tags: ['FastAPI', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'WebSockets', 'Alembic'],
    color: '#B9915E',
  },
  {
    label: 'Modern Frontend & UI',
    icon: '◎',
    desc: 'Performant, tactile, and reactive interfaces — cross-platform desktop and installable PWAs.',
    tags: ['React 18', 'TypeScript', 'Tailwind', 'Electron', 'Framer Motion', 'PWA'],
    color: '#FEFAEF',
  },
];

const marqueeSkills = skills.map((s) => s.name);

function NetCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf: number,
      t = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const nodes = Array.from({ length: 26 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      ph: Math.random() * Math.PI * 2,
      r: Math.random() * 1.8 + 0.6,
    }));
    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx + Math.sin(t + n.ph) * 0.12;
        n.y += n.vy + Math.cos(t + n.ph) * 0.12;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            const a = (1 - d / 150) * 0.09;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(175,210,250,${a})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        const a = 0.2 + Math.sin(t + n.ph) * 0.08;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(175,210,250,${a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { projects, certificates } = useData();
  const navigate = useNavigate();
  const ref = useRevealChildren();
  const featured = projects.slice(0, 3);
  const techCount = new Set(projects.flatMap((p) => p.technologies ?? [])).size;

  const stats = [
    { n: projects.length, l: 'projects shipped' },
    { n: certificates.length, l: 'industry certs' },
    { n: `${techCount}+`, l: 'technologies' },
    { n: '2027', l: 'final year (grad)' },
  ];

  return (
    <PageTransition>
      <div ref={ref}>
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
          <NetCanvas />
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
              {stats.map((s) => (
                <div key={s.l} className="stat-block">
                  <div className="stat-number">
                    <span>{s.n}</span>
                  </div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="reveal marquee-wrap" style={{ margin: '0 -2rem' }}>
              <div className="marquee-track">
                {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
                  <span
                    key={s + i}
                    className="marquee-item"
                    style={{
                      color: i % 2 === 0 ? 'var(--link)' : 'var(--accent)',
                    }}
                  >
                    <span className="marquee-diamond">◆</span>
                    {s}
                  </span>
                ))}
              </div>
            </div>
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
              style={{ gridTemplateColumns: 'repeat(3,1fr)' }}
              id="domain-grid"
            >
              {domains.map((d, i) => (
                <LiquidGlassLens
                  key={d.label}
                  intensity="subtle"
                  className="card card-hover reveal"
                  style={{ padding: '28px 24px', '--i': i } as any}
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
                        color: d.color,
                        border: `1px solid ${d.color}28`,
                        background: `${d.color}0c`,
                        borderRadius: 0,
                      }}
                    >
                      {d.icon}
                    </span>
                    <h3 style={{ color: 'var(--ink)' }}>{d.label}</h3>
                  </div>
                  <p style={{ fontSize: '13px', lineHeight: 1.75, marginBottom: '20px' }}>
                    {d.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {d.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </LiquidGlassLens>
              ))}
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
            <div
              className="stagger"
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {featured.map((p, i) => (
                <div
                  key={p.id}
                  className="row-card reveal"
                  onClick={() => navigate(`/projects/${p.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${p.id}`)}
                  style={{ '--i': i, padding: '20px 24px' } as any}
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
                          {p.year}
                        </span>
                        {p.status && <span className="tag">{p.status}</span>}
                        {p.screenshots && p.screenshots.length > 0 && (
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
                      <h3 style={{ marginBottom: '6px', fontSize: '1rem', color: 'var(--ink)' }}>
                        {p.title}
                      </h3>
                      <p style={{ fontSize: '13px', lineHeight: 1.65, maxWidth: '56ch', color: 'var(--ink-2)' }}>
                        {p.shortDesc}
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
                        {p.technologies.slice(0, 4).map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="btn btn-sm"
                            style={{ padding: '3px 10px', fontSize: '10px' }}
                          >
                            Code ↗
                          </a>
                        )}
                        <span
                          className="btn btn-sm btn-primary"
                          style={{ padding: '3px 10px', fontSize: '10px' }}
                        >
                          Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2.2rem)' }}>
                  Graduating 2027 · Open to Roles.
                </h2>
                <p style={{ fontSize: '14px', marginTop: '6px', color: 'var(--ink-2)' }}>
                  Actively interviewing for AI Engineering, MLOps, &amp; Full-Stack Software Engineer roles.
                  Based in Kolkata, open to Relocation &amp; Remote.
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
