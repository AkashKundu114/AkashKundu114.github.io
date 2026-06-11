import { useEffect } from 'react'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

const groups = [
  {
    name: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    name: 'AI & Data',
    items: ['PyTorch', 'Scikit-learn', 'CatBoost', 'Computer Vision', 'Grad-CAM', 'Ollama (LLMs)', 'Pandas', 'NumPy'],
  },
  {
    name: 'Backend & infrastructure',
    items: ['FastAPI', 'Node.js', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'Docker', 'Azure', 'Git', 'CI/CD'],
  },
  {
    name: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Tauri', 'Framer Motion', 'PWA', 'Vite'],
  },
  {
    name: 'Visualisation',
    items: ['Tableau', 'Matplotlib', 'Seaborn'],
  },
]

export default function Skills() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const ref = useRevealChildren()

  return (
    <PageTransition>
      <section style={{ paddingTop: '8rem' }} ref={ref}>
        <div className="container">
          <div className="label reveal">skills</div>
          <h2 className="reveal" style={{ marginBottom: '0.85rem', maxWidth: '32ch' }}>
            What I work with day to day.
          </h2>
          <p className="reveal" style={{ fontSize: '0.95rem', maxWidth: '58ch', lineHeight: 1.8, marginBottom: '3rem' }}>
            Most days are split between AI/data work and the backend or frontend code that
            wraps around it. Roughly grouped below — not a ranking.
          </p>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {groups.map(g => (
              <div key={g.name} className="card" style={{ padding: '1.4rem 1.6rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.4rem 1.5rem' }}>
                  <h3 style={{ minWidth: 200 }}>{g.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map(item => <span key={item} className="tag">{item}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
