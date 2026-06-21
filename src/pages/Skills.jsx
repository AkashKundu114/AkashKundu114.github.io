import { useEffect } from 'react'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

const groups = [
  {
    name: 'Languages',
    icon: '{ }',
    color: '#3D6FB4',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    name: 'AI & Data',
    icon: '◈',
    color: '#2B3A6E',
    items: ['PyTorch', 'Scikit-learn', 'CatBoost', 'Computer Vision', 'Grad-CAM', 'Ollama (LLMs)', 'Pandas', 'NumPy'],
  },
  {
    name: 'Backend & Infrastructure',
    icon: '⬡',
    color: '#8C6B3F',
    items: ['FastAPI', 'Node.js', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'Docker', 'Azure', 'Git', 'CI/CD'],
  },
  {
    name: 'Frontend',
    icon: '◎',
    color: '#B9915E',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Tauri', 'Framer Motion', 'PWA', 'Vite'],
  },
  {
    name: 'Visualisation',
    icon: '▦',
    color: '#6FA8E0',
    items: ['Tableau', 'Matplotlib', 'Seaborn'],
  },
]

const marqueeSkills = [
  'PyTorch', 'FastAPI', 'React', 'Node.js', 'CatBoost', 'Ollama', 'Docker',
  'PostgreSQL', 'Tauri', 'Pandas', 'TypeScript', 'Scikit-learn', 'Grad-CAM', 'Azure',
]

export default function Skills() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const ref = useRevealChildren()

  return (
    <PageTransition>
      <section style={{ paddingTop: '96px' }} ref={ref}>
        <div className="container">
          <div className="label reveal">technical stack</div>
          <h2 className="reveal" style={{ marginBottom: '12px', maxWidth: '28ch' }}>
            What I work with day to day.
          </h2>
          <p className="reveal" style={{ fontSize: '13px', maxWidth: '52ch', lineHeight: 1.8, marginBottom: '48px', fontFamily: 'var(--font-mono)' }}>
            Most days split between AI/data work and the backend or frontend wrapped around it. Grouped by layer — not a ranking.
          </p>

          <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {groups.map((g, i) => (
              <div
                key={g.name}
                className="card card-hover reveal"
                style={{ padding: '20px 24px', '--i': i }}
              >
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '16px',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    minWidth: '200px',
                  }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '30px',
                      height: '30px',
                      background: g.color + '14',
                      border: `1px solid ${g.color}40`,
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: g.color,
                      fontFamily: 'var(--font-mono)',
                    }}>{g.icon}</span>
                    <h3 style={{ fontSize: '0.875rem' }}>{g.name}</h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', flex: 1 }}>
                    {g.items.map(item => (
                      <span key={item} className="tag">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{
            marginTop: '32px',
            padding: '16px 20px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--accent)',
            borderRadius: 'var(--radius-card)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.06em', marginTop: '1px', whiteSpace: 'nowrap' }}>NOTE//</span>
            <p style={{ fontSize: '12px', lineHeight: 1.7, fontFamily: 'var(--font-mono)' }}>
              Python and React are daily drivers. Java and Spring Boot are coursework-level. Everything in the AI & Data row comes from real project work — training, evaluating, and deploying models — not tutorial completion.
            </p>
          </div>

          <div className="reveal marquee-wrap" style={{ marginTop: '40px' }}>
            <div className="marquee-track">
              {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
                <span key={s + i} className="marquee-item">
                  <span className="marquee-diamond">◆</span>{s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
