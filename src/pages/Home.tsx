import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';

const domains = [
  {
    label: 'AI & Data',
    icon: '◈',
    desc: 'Training models and pipelines — from raw inputs to something a product can act on.',
    tags: ['PyTorch', 'CatBoost', 'Ollama', 'Pandas', 'Computer Vision', 'SQL'],
    color: '#AFD2FA',
  },
  {
    label: 'Backend',
    icon: '◉',
    desc: 'APIs and services between a model and its users — built reliable, not just demo-able.',
    tags: ['FastAPI', 'Node.js', 'Spring Boot', 'PostgreSQL', 'Docker'],
    color: '#B9915E',
  },
  {
    label: 'Frontend',
    icon: '◎',
    desc: 'Interfaces that make everything above usable — fast, responsive, friction-free.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Tauri', 'PWA'],
    color: '#FEFAEF',
  },
];

const ticker = [
  'Neural Network',
  'Memory Nodes',
  'Logic Gates',
  'Prompt Forge',
  'Pattern Recognition',
  'Data Synthesis',
  'Anomaly Detection',
  'Output Stage',
  'Render Pipeline',
  'Inference Core',
  'Feature Extractor',
];

function NetCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf,
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
    { n: certificates.length, l: 'certificates' },
    { n: `${techCount}+`, l: 'technologies' },
    { n: '2027', l: 'graduation' },
  ];

  return (
    <PageTransition>
      <div ref={ref}>
        <section
          style={{
            paddingTop: '88px',
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
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  padding: '5px 14px',
                  border: '1px solid rgba(185,145,94,0.35)',
                  background: 'rgba(185,145,94,0.08)',
                  borderRadius: 0,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: 'var(--success)',
                    animation: 'pulse-dot 2.4s ease-in-out infinite',
                    flexShrink: 0,
                  }}
                />
                Available for internships
              </span>
            </div>

            <h1
              className="reveal heading-xl"
              style={{ maxWidth: '820px', marginBottom: '28px', lineHeight: 1.02 }}
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
                lineHeight: 1.8,
                maxWidth: '500px',
                marginBottom: '36px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--muted)',
              }}
            >
              B.Tech CSE student at Techno India University, Kolkata — building across the full
              stack from ML model to production UI.
            </p>

            <div
              className="reveal"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '52px' }}
            >
              <Link to="/projects" className="btn btn-primary btn-lg">
                View projects
              </Link>
              <Link to="/contact" className="btn btn-lg">
                Get in touch
              </Link>
              <a href="/cv/AkashKundu_Resume.pdf" download className="btn btn-lg">
                Resume ↓
              </a>
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
                {[...ticker, ...ticker].map((node, i) => (
                  <span
                    key={node + i}
                    className="marquee-item"
                    style={{
                      color:
                        i % 3 === 0
                          ? 'var(--link)'
                          : i % 3 === 1
                            ? 'var(--accent)'
                            : 'var(--muted-2)',
                    }}
                  >
                    <span className="marquee-diamond">◆</span>
                    {node}
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
                <div
                  key={d.label}
                  className="card card-hover reveal"
                  style={{ padding: '28px 24px', '--i': i }}
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
                        width: '30px',
                        height: '30px',
                        fontSize: '14px',
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
                </div>
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
                <h2>Recent projects</h2>
              </div>
              <Link to="/projects" className="btn btn-sm">
                All projects →
              </Link>
            </div>
            <div
              className="stagger"
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {featured.map((p, i) => (
                <div
                  key={p.id}
                  className="row-card reveal"
                  onClick={() => navigate(`/projects/${p.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${p.id}`)}
                  style={{ '--i': i }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '16px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 240 }}>
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
                      </div>
                      <h3 style={{ marginBottom: '6px', fontSize: '0.95rem', color: 'var(--ink)' }}>
                        {p.title}
                      </h3>
                      <p style={{ fontSize: '13px', lineHeight: 1.65, maxWidth: '54ch' }}>
                        {p.shortDesc}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px',
                        maxWidth: '220px',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-sm"
                          style={{
                            padding: '2px 8px',
                            fontSize: '11px',
                            height: 'auto',
                            minHeight: 0,
                          }}
                        >
                          Source ↗
                        </a>
                      )}
                      {p.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
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
            <div
              className="reveal"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '24px',
                borderLeft: '2px solid var(--accent)',
                paddingLeft: '24px',
              }}
            >
              <div>
                <div className="label">status</div>
                <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2.1rem)' }}>Open to internships.</h2>
                <p style={{ fontSize: '13px', marginTop: '6px' }}>
                  Data analytics · AI/ML · full-stack — Kolkata, India
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">
                  Get in touch
                </Link>
                <a
                  href="https://www.linkedin.com/in/akashkundu114/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
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
