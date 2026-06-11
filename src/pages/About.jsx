import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

const meta = [
  { key: 'Location', val: 'Kolkata, West Bengal' },
  { key: 'Email', val: 'akashkundu7487@gmail.com', link: 'mailto:akashkundu7487@gmail.com' },
  { key: 'Phone', val: '+91 9064349004', link: 'tel:+919064349004' },
  { key: 'Status', val: 'Open to internships' },
  { key: 'Languages', val: 'Bengali, English, Hindi' },
]

const principles = [
  {
    title: 'A model is half the work',
    desc: 'An accurate model that nobody can use is not a finished project. I try to ship the interface alongside the model, not as an afterthought.',
  },
  {
    title: 'End to end, on purpose',
    desc: 'I like understanding a system from the data going in to the pixels coming out — it makes the trade-offs at each layer easier to reason about.',
  },
  {
    title: 'Depth over breadth, one project at a time',
    desc: 'Each project is picked to learn something specific in depth, then documented properly so the learning sticks.',
  },
]

const timeline = [
  { year: '2023', event: 'Started B.Tech CSE at Techno India University. Began the Web Development bootcamp and built a first WebSocket chat app.', current: false },
  { year: '2024', event: 'Shipped the eye-disease predictor, the AI hardware benchmark engine, and an early version of Copper. Completed IBM and Python certifications.', current: false },
  { year: '2025', event: 'Completed Deloitte\'s data analytics and cyber simulations. Rebuilt this site as a full-stack portfolio with an admin CMS and a FastAPI backend.', current: true },
  { year: '2027', event: 'Expected graduation — looking for a role in data engineering or applied ML.', current: true },
]

export default function About() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const ref = useRevealChildren()

  return (
    <PageTransition>
      <section style={{ paddingTop: '8rem' }} ref={ref}>
        <div className="container">
          <div className="label reveal">about</div>
          <h2 className="reveal" style={{ marginBottom: '3rem', maxWidth: '32ch' }}>
            B.Tech CSE student, building things across the AI and web stack.
          </h2>

          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '3.5rem', alignItems: 'start', marginBottom: '4.5rem' }}>
            <div className="reveal card" style={{ padding: '1.25rem 1.5rem' }}>
              {meta.map(({ key, val, link }) => (
                <div key={key} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '0.25rem' }}>
                    {key.toUpperCase()}
                  </div>
                  {link
                    ? <a href={link} style={{ fontSize: '0.85rem', fontWeight: 500 }}>{val}</a>
                    : <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{val}</span>}
                </div>
              ))}
              <div style={{ paddingTop: '0.75rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '0.25rem' }}>
                  EDUCATION
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>B.Tech CSE, Techno India University — class of 2027</span>
              </div>
            </div>

            <div className="reveal">
              <p style={{ fontSize: '1rem', lineHeight: 1.85, marginBottom: '1.1rem' }}>
                I got into this because I kept running into the same problem: a model that
                works well in a notebook is still a long way from something a person can
                actually use. Closing that gap — between a trained model and a usable
                interface — is what most of my projects are about.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.85, marginBottom: '1.1rem' }}>
                In practice that means spending time on data preparation and model training,
                then just as much time on the API and frontend that sit in front of it.
                I'd rather have one project working end to end than three half-finished ones.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.85, marginBottom: '1.75rem' }}>
                Outside of coursework, I'm currently working on Copper, an offline desktop
                assistant built on Tauri and a locally-run LLM, and rebuilding this site's
                backend to move off localStorage onto a proper API.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <Link to="/projects" className="btn btn-primary">See my projects</Link>
                <Link to="/skills" className="btn">Skills</Link>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ marginBottom: '4.5rem' }}>
            <div className="label">how I work</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }} className="principles-grid">
              {principles.map(({ title, desc }) => (
                <div key={title} style={{ background: 'var(--surface)', padding: '1.5rem' }}>
                  <h3 style={{ marginBottom: '0.6rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.86rem', lineHeight: 1.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="label">timeline</div>
            <div className="timeline">
              {timeline.map(({ year, event, current }) => (
                <div key={year} className={`timeline-item${current ? ' is-current' : ''}`}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: current ? 'var(--accent)' : 'var(--muted)', marginBottom: '0.35rem' }}>
                    {year}
                  </div>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.75, maxWidth: '60ch' }}>{event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 880px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 700px) {
          .principles-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageTransition>
  )
}
