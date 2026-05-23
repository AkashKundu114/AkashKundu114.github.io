import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

const metaRows = [
  { key: 'Name',      val: 'Akash Kundu' },
  { key: 'Location',  val: 'Kolkata, West Bengal' },
  { key: 'Email',     val: 'akashkundu7487@gmail.com', link: 'mailto:akashkundu7487@gmail.com' },
  { key: 'Phone',     val: '+91 9064349004', link: 'tel:+919064349004' },
  { key: 'Status',    val: '● Open to Internship Opportunities', accent: true },
  { key: 'Languages', val: 'Bengali · English · Hindi' },
]

const principles = [
  {
    icon: '◈',
    title: 'Models Are Only Half the Work',
    desc: 'A highly accurate ML model is only as impactful as the interface used to interact with it. I build both.',
    color: 'rgba(129,140,248,1)',
  },
  {
    icon: '◎',
    title: 'End-to-End Thinking',
    desc: 'From data ingestion and model training, through API design, to the final pixel — I care about the whole system.',
    color: 'rgba(79,163,255,1)',
  },
  {
    icon: '◐',
    title: 'Build to Understand',
    desc: 'Every project is a deliberate choice to learn deeply, not broadly. I ship working systems, then study why they work.',
    color: 'rgba(52,211,153,1)',
  },
]

const timeline = [
  { year: '2023', event: 'Enrolled B.Tech CSE at Techno India University. Started Udemy Web Dev Bootcamp and built first real WebSocket application.' },
  { year: '2024', event: 'Shipped 4 production projects: AI Eye Predictor, Stock Prediction System, Copper AI Assistant, and local LLM deployment. Completed IBM, Udemy Python, and Google certificates.' },
  { year: '2025', event: 'Completed Deloitte Data Analytics & Cyber simulations. Built full-stack portfolio CMS with admin panel, PWA, and FastAPI backend. Actively seeking first internship.' },
  { year: '2027', event: 'Expected B.Tech graduation — targeting a Data Engineering or AI/ML Engineering role.' },
]

export default function About() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const ref = useRevealChildren()

  return (
    <PageTransition>
      <section className="section" style={{ paddingTop: '9rem' }} ref={ref}>
        <span className="section-num">01</span>
        <div className="container">

          <div className="label reveal">About Me</div>
          <h2 className="reveal" style={{ marginBottom: '4rem' }}>
            A little about<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>who I am.</em>
          </h2>

          {/* ── Top grid: profile card + story ── */}
          <div
            className="about-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: '5rem', alignItems: 'start', marginBottom: '5rem' }}
          >
            {/* Profile card */}
            <div className="reveal" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden', position: 'sticky', top: '6rem' }}>
              <div style={{ background: 'var(--accent)', padding: '2rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: '#05080f', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)',
                  border: '2px solid rgba(79,163,255,0.3)',
                }}>
                  AK
                </div>
              </div>
              <div style={{ padding: '1.2rem' }}>
                {metaRows.map(({ key, val, link, accent }) => (
                  <div
                    key={key}
                    className="flex justify-between items-start gap-3"
                    style={{ padding: '0.72rem 0', borderBottom: '1px solid var(--border)' }}
                  >
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.56rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', flexShrink: 0, paddingTop: '0.1rem' }}>{key}</span>
                    {link
                      ? <a href={link} style={{ fontSize: '0.78rem', fontWeight: 500, textAlign: 'right', wordBreak: 'break-all', color: 'var(--ink)' }}>{val}</a>
                      : <span style={{ fontSize: '0.78rem', fontWeight: 500, textAlign: 'right', color: accent ? 'var(--accent)' : 'var(--ink)' }}>{val}</span>
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Story */}
            <div>
              <div className="reveal" style={{ marginBottom: '2rem' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>
                  The Story
                </div>
                <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: '1.2rem' }}>
                  My journey into tech is driven by a single desire: to make complex data
                  accessible and actionable. While studying Computer Science, I kept running
                  into the same realization — a highly accurate machine learning model is only
                  as impactful as the interface used to interact with it.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted)', marginBottom: '1.2rem' }}>
                  That realization shaped how I approach every project. I spend serious time
                  extracting insights from datasets and fine-tuning models, but I'm equally
                  passionate about using React and modern frameworks to build intuitive,
                  responsive interfaces that put those AI tools directly into the hands of users.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted)' }}>
                  Whether it's containerizing an API, training a vision model, or obsessing
                  over a UI interaction detail —{' '}
                  <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>
                    I love building complete, intelligent systems.
                  </strong>
                </p>
              </div>

              {/* CTA */}
              <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <Link to="/projects" className="btn btn-primary">See My Projects →</Link>
                <Link to="/skills"   className="btn btn-outline">Explore My Skills</Link>
              </div>
            </div>
          </div>

          {/* ── Principles ── */}
          <div className="reveal" style={{ marginBottom: '5rem' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.5rem' }}>
              How I Think
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="principles-grid">
              {principles.map(({ icon, title, desc, color }) => (
                <div
                  key={title}
                  style={{
                    padding: '1.6rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = color.replace('1)', '0.4)')
                    e.currentTarget.style.background = color.replace('1)', '0.06)')
                    e.currentTarget.style.boxShadow = `0 0 24px ${color.replace('1)', '0.12)')}`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = 'var(--surface)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span style={{ display: 'block', fontSize: '1.3rem', color, marginBottom: '0.8rem' }}>{icon}</span>
                  <span style={{ display: 'block', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.92rem', color: 'var(--ink)', marginBottom: '0.6rem', lineHeight: 1.25 }}>{title}</span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Timeline ── */}
          <div className="reveal">
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2rem' }}>
              Timeline
            </div>
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              <div style={{ position: 'absolute', left: 0, top: '0.5rem', bottom: '0.5rem', width: 1, background: 'var(--border)' }} />
              {timeline.map(({ year, event }, i) => (
                <div key={year} style={{ position: 'relative', paddingLeft: '2rem', paddingBottom: i < timeline.length - 1 ? '2.5rem' : 0 }}>
                  <div style={{
                    position: 'absolute', left: '-2rem', top: '0.3rem',
                    width: 9, height: 9, borderRadius: '50%',
                    background: i < 2 ? 'var(--accent)' : 'var(--border)',
                    border: '2px solid var(--bg)',
                    boxShadow: i < 2 ? '0 0 8px rgba(79,163,255,0.5)' : 'none',
                  }} />
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '0.3rem' }}>{year}</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.75 }}>{event}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @media (max-width: 960px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 640px) {
          .principles-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageTransition>
  )
}
