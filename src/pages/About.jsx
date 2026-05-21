import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRevealChildren } from '../hooks/useScrollReveal'

const metaRows = [
  { key: 'Name',      val: 'Akash Kundu' },
  { key: 'Location',  val: 'Kolkata, West Bengal' },
  { key: 'Email',     val: 'akashkundu7487@gmail.com', link: 'mailto:akashkundu7487@gmail.com' },
  { key: 'Phone',     val: '+91 9064349004' },
  { key: 'Status',    val: '● Open to internship opportunities', accent: true },
  { key: 'Languages', val: 'Bengali · English · Hindi' },
]

const strengths = [
  { icon: '◈', title: 'Analytical Thinking', desc: 'Extracts actionable insights from complex datasets with structured analysis.' },
  { icon: '◎', title: 'Attention to Detail', desc: 'Ensures accuracy and precision in coding, data analysis, and execution.' },
  { icon: '◐', title: 'Adaptability',        desc: 'Quickly learns new tools, frameworks, and workflows to deliver results.' },
]

export default function About() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const ref = useRevealChildren()

  return (
    <section className="section" style={{ paddingTop: '9rem' }} ref={ref}>
      <span className="section-num">01</span>
      <div className="container">

        <div className="label reveal">About Me</div>
        <h2 className="reveal" style={{ marginBottom: '4rem' }}>
          A little about<br />
          <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>who I am.</em>
        </h2>

        <div
          className="about-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '5rem', alignItems: 'start' }}
        >
          {/* Profile card */}
          <div className="reveal" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ background: 'var(--accent)', padding: '1.8rem', display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: '#05080f', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif', fontSize: '1.7rem', fontWeight: 800, color: 'var(--accent)',
                }}
              >
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
                  <span className="font-mono" style={{ fontSize: '0.57rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', flexShrink: 0, paddingTop: '0.15rem' }}>{key}</span>
                  {link
                    ? <a href={link} style={{ fontSize: '0.78rem', fontWeight: 500, textAlign: 'right', wordBreak: 'break-all', color: 'var(--ink)' }}>{val}</a>
                    : <span style={{ fontSize: '0.78rem', fontWeight: 500, textAlign: 'right', color: accent ? 'var(--accent)' : 'var(--ink)' }}>{val}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Bio content */}
          <div>
            <p className="reveal" style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '1.2rem' }}>
              Pursuing a B.Tech in Computer Science at Techno India University. Eager to apply analytical and creative
              problem-solving skills in a professional setting, seeking internships that offer hands-on experience with
              real-world data challenges while contributing innovative insights to support organisational goals.
            </p>
            <p className="reveal" style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--muted)' }}>
              Interested in Data Analytics with a focus on extracting insights from data, visualisation, and building
              data-driven solutions. Skilled in programming and modern development tools with experience in AI-driven
              solutions, responsive applications, collaborative workflows, and deployment practices.
            </p>

            {/* Strengths */}
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.8rem', marginTop: '2rem' }}>
              {strengths.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  style={{ padding: '1.2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', transition: 'all 0.25s' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.background = 'var(--accent-dim)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = 'var(--surface)'
                  }}
                >
                  <span style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{icon}</span>
                  <span className="block font-mono uppercase" style={{ fontSize: '0.58rem', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '0.3rem' }}>{title}</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{desc}</p>
                </div>
              ))}
            </div>

            <div className="reveal" style={{ marginTop: '2.5rem' }}>
              <Link to="/projects" className="btn btn-primary">See My Projects →</Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
