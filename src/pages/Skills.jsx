import { useEffect } from 'react'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

const groups = [
  {
    name: 'Languages',
    icon: '{ }',
    color: '#2563eb',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    name: 'AI & Data',
    icon: '◈',
    color: '#7c3aed',
    items: ['PyTorch', 'Scikit-learn', 'CatBoost', 'Computer Vision', 'Grad-CAM', 'Ollama (LLMs)', 'Pandas', 'NumPy'],
  },
  {
    name: 'Backend & Infrastructure',
    icon: '⬡',
    color: '#16a34a',
    items: ['FastAPI', 'Node.js', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'Docker', 'Azure', 'Git', 'CI/CD'],
  },
  {
    name: 'Frontend',
    icon: '◎',
    color: '#d97706',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Tauri', 'Framer Motion', 'PWA', 'Vite'],
  },
  {
    name: 'Visualisation',
    icon: '▦',
    color: '#0891b2',
    items: ['Tableau', 'Matplotlib', 'Seaborn'],
  },
]

export default function Skills() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const ref = useRevealChildren()

  return (
    <PageTransition>
      <section style={{ paddingTop: '96px' }} ref={ref}>
        <div className="container">
          <div className="label reveal">skills</div>
          <h2 className="reveal" style={{ marginBottom: '12px', maxWidth: '28ch' }}>
            What I work with day to day.
          </h2>
          <p className="reveal" style={{ fontSize: '13px', maxWidth: '52ch', lineHeight: 1.8, marginBottom: '48px', fontFamily: 'var(--font-mono)' }}>
            Most days split between AI/data work and the backend or frontend wrapped around it. Grouped by layer — not a ranking.
          </p>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {groups.map((g, i) => (
              <div
                key={g.name}
                className="card card-hover"
                style={{ padding: '20px 24px' }}
              >
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '16px',
                }}>
                  {/* Group header */}
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
                      background: g.color + '12',
                      border: `1px solid ${g.color}30`,
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: g.color,
                      fontFamily: 'var(--font-mono)',
                    }}>{g.icon}</span>
                    <h3 style={{ fontSize: '0.875rem' }}>{g.name}</h3>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', flex: 1 }}>
                    {g.items.map(item => (
                      <span key={item} className="tag">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Proficiency note */}
          <div className="reveal" style={{
            marginTop: '32px',
            padding: '16px 20px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-card)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted-2)', fontWeight: 600, letterSpacing: '0.06em', marginTop: '1px', whiteSpace: 'nowrap' }}>NOTE//</span>
            <p style={{ fontSize: '12px', lineHeight: 1.7, fontFamily: 'var(--font-mono)' }}>
              Python and React are daily drivers. Java and Spring Boot are coursework-level. Everything in the AI & Data row comes from real project work — training, evaluating, and deploying models — not tutorial completion.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
