import { useEffect } from 'react'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

/* ── Domain definitions ─────────────────────────────────────────────────── */
const coreDomain = {
  icon: '◈',
  label: 'The Core — AI & Data Science',
  subtitle: 'Primary Depth',
  desc: 'Where the thinking happens. Model training, data pipelines, feature engineering, and insight extraction.',
  accent: 'rgba(129, 140, 248, 1)',
  border: 'rgba(129, 140, 248, 0.22)',
  bg:     'rgba(129, 140, 248, 0.06)',
  glow:   'rgba(129, 140, 248, 0.2)',
  groups: [
    { name: 'Languages & Data',  items: ['Python', 'SQL', 'Pandas', 'NumPy'] },
    { name: 'ML & Deep Learning', items: ['Scikit-learn', 'TensorFlow', 'Keras', 'Grad-CAM', 'LoRA Fine-Tuning', 'NLP', 'LLM', 'Ollama'] },
    { name: 'Visualisation',      items: ['Tableau', 'Matplotlib', 'Seaborn'] },
  ],
}

const supportDomains = [
  {
    icon: '◎',
    label: 'The Engine',
    subtitle: 'Backend & APIs',
    desc: 'Building the systems that serve intelligence at scale with security and performance.',
    accent: 'rgba(79, 163, 255, 1)',
    border: 'rgba(79, 163, 255, 0.22)',
    bg:     'rgba(79, 163, 255, 0.06)',
    glow:   'rgba(79, 163, 255, 0.2)',
    items: ['Java', 'Spring Boot', 'FastAPI', 'Python', 'SQL', 'REST APIs', 'WebSocket', 'Docker', 'Redis', 'CI/CD', 'Git / GitHub'],
  },
  {
    icon: '◐',
    label: 'The Interface',
    subtitle: 'Frontend & UX',
    desc: 'Crafting the interfaces that make AI models accessible and delightful to real users.',
    accent: 'rgba(52, 211, 153, 1)',
    border: 'rgba(52, 211, 153, 0.22)',
    bg:     'rgba(52, 211, 153, 0.06)',
    glow:   'rgba(52, 211, 153, 0.2)',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'HTML5', 'CSS3', 'PWA', 'Vite'],
  },
]

export default function Skills() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const ref = useRevealChildren()

  return (
    <PageTransition>
      <section className="section" style={{ paddingTop: '9rem' }} ref={ref}>
        <span className="section-num">02</span>
        <div className="container">

          {/* Header */}
          <div className="label reveal">Technical Skills</div>
          <h2 className="reveal" style={{ marginBottom: '1rem' }}>
            What I<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>know &amp; build with.</em>
          </h2>
          <p className="reveal" style={{ fontSize: '1rem', maxWidth: '58ch', lineHeight: 1.8, marginBottom: '4rem' }}>
            I specialize in training AI models and analyzing data, backed by the
            full-stack engineering skills required to deploy them into
            real-world applications.
          </p>

          {/* T-shaped layout */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>

            {/* ── CORE — full width (the vertical bar of the T) ── */}
            <div
              style={{
                background: coreDomain.bg,
                border: `1px solid ${coreDomain.border}`,
                borderRadius: 6,
                padding: '2.5rem',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                transition: 'box-shadow 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 40px ${coreDomain.glow}`; e.currentTarget.style.borderColor = 'rgba(129,140,248,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = coreDomain.border }}
            >
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <span style={{ fontSize: '1.5rem', color: coreDomain.accent }}>{coreDomain.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'var(--ink)', lineHeight: 1 }}>{coreDomain.label}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.57rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: coreDomain.accent, marginTop: '0.3rem' }}>{coreDomain.subtitle}</div>
                  </div>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted)', maxWidth: '45ch', lineHeight: 1.7 }}>{coreDomain.desc}</p>
              </div>

              {/* Skill groups */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {coreDomain.groups.map(group => (
                  <div key={group.name}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(129,140,248,0.7)', marginBottom: '0.7rem' }}>
                      {group.name}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {group.items.map(item => (
                        <Chip key={item} label={item} accent={coreDomain.accent} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── SUPPORT — two columns (the horizontal bar of the T) ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="support-grid">
              {supportDomains.map(d => (
                <SupportCard key={d.label} domain={d} />
              ))}
            </div>
          </div>

          {/* T-shape label */}
          <p className="reveal" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', textAlign: 'center', marginTop: '1rem' }}>
            T-shaped skillset — depth in AI &amp; Data, breadth across the full stack
          </p>

        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .support-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageTransition>
  )
}

function SupportCard({ domain }) {
  const { icon, label, subtitle, desc, accent, border, bg, glow, items } = domain
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 6,
        padding: '2rem',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 32px ${glow}`; e.currentTarget.style.borderColor = accent.replace('1)', '0.4)') }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = border }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '1.1rem', color: accent }}>{icon}</span>
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', lineHeight: 1 }}>{label}</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginTop: '0.2rem' }}>{subtitle}</div>
        </div>
      </div>
      <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.2rem' }}>{desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {items.map(item => <Chip key={item} label={item} accent={accent} />)}
      </div>
    </div>
  )
}

function Chip({ label, accent }) {
  return (
    <span style={{
      padding: '0.28rem 0.7rem',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.58rem', letterSpacing: '0.05em', textTransform: 'uppercase',
      background: accent.replace('1)', '0.1)'),
      border: `1px solid ${accent.replace('1)', '0.2)')}`,
      borderRadius: 3,
      color: accent,
      transition: 'background 0.2s',
    }}>
      {label}
    </span>
  )
}
