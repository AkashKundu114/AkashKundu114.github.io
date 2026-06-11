import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import PageTransition from '../components/PageTransition'

const domains = [
  {
    label: 'AI & Data',
    desc: 'Training models, building data pipelines, and turning raw data into something a product can act on.',
    tags: ['Python', 'PyTorch', 'CatBoost', 'Pandas', 'Computer Vision', 'SQL', 'Ollama'],
  },
  {
    label: 'Backend',
    desc: 'APIs and services that sit between a model and the people using it — built to be reliable, not just demo-able.',
    tags: ['FastAPI', 'Node.js', 'Spring Boot', 'PostgreSQL', 'Docker', 'Azure'],
  },
  {
    label: 'Frontend',
    desc: 'Interfaces that make the work above usable — fast, responsive, and free of unnecessary complexity.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Tauri', 'PWA'],
  },
]

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { projects } = useData()
  const navigate = useNavigate()
  const featured = projects.slice(0, 3)

  return (
    <PageTransition>
      <section style={{ paddingTop: '8.5rem', paddingBottom: '4.5rem' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="status-line" style={{ marginBottom: '1.5rem' }}>
            <span className="status-dot" />
            open to internships — kolkata, india
          </div>

          <h1 style={{ marginBottom: '1.25rem' }}>
            Software for turning data into something useful — and a UI in front of it.
          </h1>

          <p style={{ fontSize: '1rem', lineHeight: 1.85, marginBottom: '2rem', maxWidth: '58ch' }}>
            I'm a final-year B.Tech Computer Science student at Techno India University,
            Kolkata. I work across the stack — training and evaluating ML models, building
            APIs to serve them, and writing the React frontends people actually use.
          </p>

          <div className="flex flex-wrap gap-2.5" style={{ marginBottom: '2.5rem' }}>
            <Link to="/projects" className="btn btn-primary">View projects</Link>
            <Link to="/contact" className="btn">Get in touch</Link>
            <a href="/cv/AkashKundu_CV.pdf" download className="btn">Resume</a>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--muted)' }}>
            <a href="https://github.com/AkashKundu114" target="_blank" rel="noopener noreferrer" style={{ transition: 'color var(--t)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
              github.com/AkashKundu114
            </a>
            <a href="https://www.linkedin.com/in/akashkundu114/" target="_blank" rel="noopener noreferrer" style={{ transition: 'color var(--t)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
              linkedin.com/in/akashkundu114
            </a>
            <a href="mailto:akashkundu7487@gmail.com" style={{ transition: 'color var(--t)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
              akashkundu7487@gmail.com
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="label">what I work on</div>
          <h2 style={{ marginBottom: '2.5rem', maxWidth: '32ch' }}>
            Most of my projects move between these three layers.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }} className="domain-grid">
            {domains.map(d => (
              <div key={d.label} style={{ background: 'var(--surface)', padding: '1.75rem' }}>
                <h3 style={{ marginBottom: '0.6rem' }}>{d.label}</h3>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>{d.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {d.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="label">selected work</div>
              <h2>Recent projects</h2>
            </div>
            <Link to="/projects" className="btn btn-sm">All projects →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {featured.map(p => (
              <div
                key={p.id}
                className="row-card"
                onClick={() => navigate(`/projects/${p.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/projects/${p.id}`)}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>{p.year}</span>
                      {p.status && <span className="tag">{p.status}</span>}
                    </div>
                    <h3 style={{ marginBottom: '0.5rem' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.86rem', lineHeight: 1.7, maxWidth: '60ch' }}>{p.shortDesc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5" style={{ maxWidth: 220, justifyContent: 'flex-end' }}>
                    {p.technologies.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`@media(max-width:768px){.domain-grid{grid-template-columns:1fr!important}}`}</style>
    </PageTransition>
  )
}
