import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

const domains = [
  {
    label: 'AI & Data',
    icon: '◈',
    desc: 'Training models and data pipelines — from raw inputs to something a product can act on.',
    tags: ['PyTorch', 'CatBoost', 'Ollama', 'Pandas', 'Computer Vision', 'SQL'],
    nodeColor: '#3D6FB4',
  },
  {
    label: 'Backend',
    icon: '◉',
    desc: 'APIs and services between a model and the people using it — built reliable, not just demo-able.',
    tags: ['FastAPI', 'Node.js', 'Spring Boot', 'PostgreSQL', 'Docker'],
    nodeColor: '#8C6B3F',
  },
  {
    label: 'Frontend',
    icon: '◎',
    desc: 'Interfaces that make everything above usable — fast, responsive, friction-free.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Tauri', 'PWA'],
    nodeColor: '#B9915E',
  },
]

const systemNodes = [
  'Neural Network', 'Memory Nodes', 'Logic Gates',
  'Prompt Forge', 'Pattern Recognition', 'Data Synthesis',
  'Anomaly Detection', 'Output Stage', 'Render Pipeline',
]

function AmbientCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, t = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const nodes = Array.from({ length: 22 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      t += 0.012
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      // dark: Powder Blue network on Deep Blue · light: Deep Blue network on Floral White
      const lineColor = isDark ? 'rgba(175,210,250,' : 'rgba(24,35,80,'
      const dotColor  = isDark ? 'rgba(175,210,250,' : 'rgba(24,35,80,'

      nodes.forEach(n => {
        n.x += n.vx + Math.sin(t + n.phase) * 0.15
        n.y += n.vy + Math.cos(t + n.phase) * 0.15
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.1
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = lineColor + alpha + ')'
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      nodes.forEach(n => {
        const alpha = 0.22 + Math.sin(t + n.phase) * 0.08
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = dotColor + alpha + ')'
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { projects, certificates } = useData()
  const navigate = useNavigate()
  const ref = useRevealChildren()
  const featured = projects.slice(0, 3)

  const techCount = new Set(projects.flatMap(p => p.technologies ?? [])).size

  const stats = [
    { n: projects.length, l: 'AI/ML & full-stack projects' },
    { n: certificates.length, l: 'Certificates earned' },
    { n: `${techCount}+`, l: 'Technologies used' },
    { n: '2027', l: 'Expected graduation' },
  ]

  return (
    <PageTransition>
      <div ref={ref}>
      <section style={{ paddingTop: '96px', paddingBottom: '64px', position: 'relative', overflow: 'hidden' }}>
        <AmbientCanvas />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ marginBottom: '24px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--accent)',
              padding: '4px 12px',
              border: '1px solid var(--border-2)',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--surface)',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--success)', animation: 'pulse-dot 2.4s ease-in-out infinite',
              }} />
              ENV ALPHA v1.2.0_rc — OPEN TO INTERNSHIPS
            </span>
          </div>
          <h1 className="reveal" style={{ maxWidth: '780px', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: '1.04' }}>
            Map your thoughts.<br /><span style={{ color: 'var(--accent-2)' }}>Synthesize data.</span><br /><span style={{ color: 'var(--accent)' }}>Generate reality.</span>
          </h1>

          <p className="reveal" style={{ fontSize: '15px', lineHeight: 1.75, maxWidth: '520px', marginBottom: '32px', fontFamily: 'var(--font-mono)', fontWeight: 400, color: 'var(--muted)' }}>
            B.Tech CSE student at Techno India University, Kolkata. I build across the full stack — training ML models, wiring the APIs in front of them, and writing the React interfaces people actually use.
          </p>

          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
            <Link to="/projects" className="btn btn-primary btn-lg btn-pill">View projects</Link>
            <Link to="/contact" className="btn btn-lg btn-pill">Get in touch</Link>
            <a href="/cv/AkashKundu_CV.pdf" download className="btn btn-lg btn-pill">Resume ↓</a>
          </div>

          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginBottom: '40px' }} id="stats-row">
            {stats.map(s => (
              <div key={s.l} className="stat-block">
                <div className="stat-number"><span>{s.n}</span></div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="reveal marquee-wrap" style={{ margin: '0 -2rem' }}>
            <div className="marquee-track">
              {[...systemNodes, ...systemNodes].map((node, i) => (
                <span key={node + i} className="marquee-item" style={{
                  color: i % 3 === 0 ? 'var(--node-blue)' : i % 3 === 1 ? 'var(--node-green)' : 'var(--node-amber)',
                }}>
                  <span className="marquee-diamond">◆</span>{node}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="label">what I work on</div>
          <h2 className="reveal" style={{ marginBottom: '32px', maxWidth: '28ch' }}>
            Three layers, every project.
          </h2>

          <div className="bento-grid stagger" style={{ gridTemplateColumns: 'repeat(3,1fr)' }} id="domain-grid">
            {domains.map((d, i) => (
              <div
                key={d.label}
                className="card card-hover reveal"
                style={{ padding: '28px 24px', '--i': i }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px', height: '32px',
                    background: d.nodeColor + '14',
                    border: `1px solid ${d.nodeColor}40`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: d.nodeColor,
                  }}>{d.icon}</span>
                  <h3>{d.label}</h3>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.7, marginBottom: '18px', color: 'var(--muted)' }}>{d.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {d.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="label">selected work</div>
              <h2>Recent projects</h2>
            </div>
            <Link to="/projects" className="btn btn-sm" style={{ borderRadius: 'var(--radius-pill)' }}>All projects →</Link>
          </div>

          <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {featured.map((p, i) => (
              <div
                key={p.id}
                className="row-card reveal"
                onClick={() => navigate(`/projects/${p.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/projects/${p.id}`)}
                style={{ '--i': i }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted-2)' }}>{p.year}</span>
                      {p.status && <span className="tag">{p.status}</span>}
                    </div>
                    <h3 style={{ marginBottom: '6px', fontSize: '0.95rem' }}>{p.title}</h3>
                    <p style={{ fontSize: '13px', lineHeight: 1.65, maxWidth: '55ch' }}>{p.shortDesc}</p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', maxWidth: '220px', justifyContent: 'flex-end' }}>
                    {p.technologies.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', borderLeft: '3px solid var(--accent)', paddingLeft: '20px' }}>
          <div>
            <div className="label">status</div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>Open to internships.</h2>
            <p style={{ fontSize: '13px', marginTop: '8px' }}>Data analytics · AI/ML · full-stack — Kolkata, India</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-pill">Get in touch</Link>
            <a href="https://www.linkedin.com/in/akashkundu114/" target="_blank" rel="noopener noreferrer" className="btn btn-pill">LinkedIn ↗</a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          #domain-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          #domain-grid { grid-template-columns: 1fr !important; }
          #stats-row { gap: 24px !important; }
        }
      `}</style>
      </div>
    </PageTransition>
  )
}
