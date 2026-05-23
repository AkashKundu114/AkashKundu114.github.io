import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { skills } from '../data/skills'
import { useData } from '../context/DataContext'
import PageTransition from '../components/PageTransition'

const domains = [
  {
    icon: '◈', label: 'AI & Data',
    desc: 'Training models, building pipelines, and extracting insight from raw data.',
    tags: ['Python', 'PyTorch', 'Scikit-learn', 'CatBoost', 'Pandas', 'Computer Vision', 'Ollama', 'SQL'],
    accent: 'rgba(129,140,248,1)', glow: 'rgba(129,140,248,0.18)',
    bg: 'rgba(129,140,248,0.06)', border: 'rgba(129,140,248,0.18)',
  },
  {
    icon: '◎', label: 'Backend & APIs',
    desc: 'Engineering the systems that serve intelligence securely at scale.',
    tags: ['FastAPI', 'Node.js', 'Spring Boot', 'Docker', 'PostgreSQL', 'Azure', 'CI/CD'],
    accent: 'rgba(79,163,255,1)', glow: 'rgba(79,163,255,0.18)',
    bg: 'rgba(79,163,255,0.06)', border: 'rgba(79,163,255,0.18)',
  },
  {
    icon: '◐', label: 'Frontend & UX',
    desc: 'Crafting the interfaces that bring algorithms to life for real users.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Tauri', 'Framer Motion', 'PWA'],
    accent: 'rgba(52,211,153,1)', glow: 'rgba(52,211,153,0.18)',
    bg: 'rgba(52,211,153,0.06)', border: 'rgba(52,211,153,0.18)',
  },
]

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4,0,0.2,1] } } }

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { projects } = useData()
  const navigate = useNavigate()
  const featured = projects.slice(0, 3)

  return (
    <PageTransition>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="hero-grid relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: '6rem' }}>
        <div className="container">
          <motion.div className="relative z-10 max-w-4xl" variants={stagger} initial="hidden" animate="show">

            {/* Badge */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono uppercase mb-8"
                style={{ background:'var(--accent-dim)', borderColor:'rgba(79,163,255,0.25)', color:'var(--accent)', fontSize:'0.62rem', letterSpacing:'0.14em' }}>
                <span style={{ fontSize:'0.4rem', animation:'blink 1.6s infinite' }}>●</span>
                Open to Internships — Kolkata, India
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} style={{ fontSize:'clamp(2.4rem,7vw,5rem)', marginBottom:'1.8rem', lineHeight:1.05 }}>
              Building intelligent,<br />
              <em style={{ color:'var(--accent)', fontStyle:'normal' }}>data-driven</em>{' '}
              applications<br />
              <span style={{ color:'var(--muted)', fontSize:'0.72em' }}>from the model to the UI.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p variants={fadeUp} style={{ fontSize:'1.05rem', maxWidth:'58ch', color:'var(--muted)', lineHeight:1.8, marginBottom:'2.5rem' }}>
              Aspiring AI Engineer specializing in machine learning, data pipelines, and
              crafting seamless web experiences to bring algorithms to life. B.Tech CSE
              student at Techno India University — I build{' '}
              <strong style={{ color:'var(--ink)', fontWeight:600 }}>complete, intelligent systems</strong>,
              not just isolated components.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-6">
              <Link to="/projects" className="btn btn-primary">View Projects →</Link>
              <Link to="/contact"  className="btn btn-outline">Get in Touch</Link>
              <a href="/cv/AkashKundu_CV.pdf" download className="btn btn-outline">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-6 2h12v2H6v-2z"/></svg>
                Download CV
              </a>
            </motion.div>

            {/* Social chips */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {[
                { href:'https://www.linkedin.com/in/akashkundu114/', label:'LinkedIn' },
                { href:'https://github.com/AkashKundu114',           label:'GitHub' },
                { href:'mailto:akashkundu7487@gmail.com',             label:'Email' },
                { href:'https://akashkundu.me',                       label:'akashkundu.me' },
              ].map(({ href, label }) => (
                <a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono uppercase rounded border transition-all duration-200"
                  style={{ color:'var(--muted)', borderColor:'var(--border)', padding:'0.38rem 0.75rem', fontSize:'0.6rem', letterSpacing:'0.1em' }}
                  onMouseEnter={e=>{ e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--accent-dim)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='transparent' }}>
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT I BUILD — T-SHAPED DOMAIN CARDS ──────────────────── */}
      <section style={{ padding:'6rem 0', borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div style={{ maxWidth:640, marginBottom:'3rem' }}>
            <div className="label" style={{ marginBottom:'1rem' }}>What I Build</div>
            <h2 style={{ marginBottom:'1rem' }}>
              End-to-end{' '}
              <em style={{ color:'var(--accent)', fontStyle:'normal' }}>intelligent systems.</em>
            </h2>
            <p style={{ fontSize:'1rem', lineHeight:1.8, maxWidth:'55ch' }}>
              I specialize in training AI models and analyzing data, backed by the
              full-stack engineering skills required to deploy them into
              real-world applications.
            </p>
          </div>

          {/* T-shape: wide AI card on top, two below */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <DomainCard domain={domains[0]} wide />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }} className="domain-row">
              <DomainCard domain={domains[1]} />
              <DomainCard domain={domains[2]} />
            </div>
          </div>

          <p style={{ marginTop:'1.5rem', fontFamily:'JetBrains Mono,monospace', fontSize:'0.58rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--muted)', textAlign:'center' }}>
            T-shaped skillset — depth in AI &amp; Data, breadth across the full stack
          </p>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ──────────────────────────────────────── */}
      <section style={{ padding:'6rem 0', borderTop:'1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'2.5rem', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <div className="label" style={{ marginBottom:'0.75rem' }}>Selected Work</div>
              <h2>Things I've <em style={{ color:'var(--accent)', fontStyle:'normal' }}>built.</em></h2>
            </div>
            <Link to="/projects" className="btn btn-outline btn-sm" style={{ alignSelf:'flex-end' }}>All Projects →</Link>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:1, background:'var(--border)', border:'1px solid var(--border)', borderRadius:4, overflow:'hidden' }}>
            {featured.map(p => (
              <div key={p.id} className="project-card" onClick={() => navigate(`/projects/${p.id}`)} role="button" tabIndex={0} onKeyDown={e => e.key==='Enter' && navigate(`/projects/${p.id}`)}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.75rem' }}>
                  <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.58rem', letterSpacing:'0.1em', color:'var(--muted)' }}>{p.year}</div>
                  {p.status && (
                    <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.48rem', letterSpacing:'0.1em', textTransform:'uppercase', padding:'0.1rem 0.5rem', borderRadius:'100px',
                      background: p.status==='Completed' ? 'rgba(52,211,153,0.1)' : 'rgba(79,163,255,0.1)',
                      color: p.status==='Completed' ? 'rgba(52,211,153,1)' : 'rgba(79,163,255,1)',
                      border: p.status==='Completed' ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(79,163,255,0.3)' }}>
                      {p.status}
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize:'1rem', marginBottom:'0.65rem', color:'var(--ink)', transition:'color 0.25s', fontFamily:'Syne,sans-serif', lineHeight:1.25 }}>{p.title}</h3>
                <p style={{ fontSize:'0.82rem', lineHeight:1.7, marginBottom:'1.2rem', color:'var(--muted)' }}>{p.shortDesc}</p>
                <div className="flex flex-wrap gap-1">
                  {p.technologies.slice(0,4).map(t => <span key={t} className="tech-badge">{t}</span>)}
                  {p.technologies.length > 4 && <span className="tech-badge">+{p.technologies.length-4}</span>}
                </div>
                <div style={{ marginTop:'1rem', fontFamily:'JetBrains Mono,monospace', fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.06em', color:'var(--accent)' }}>Case Study →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`@media(max-width:640px){.domain-row{grid-template-columns:1fr!important}}`}</style>
    </PageTransition>
  )
}

function DomainCard({ domain, wide }) {
  const { icon, label, desc, tags, accent, glow, bg, border } = domain
  return (
    <div
      style={{ background:bg, border:`1px solid ${border}`, borderRadius:6, padding: wide ? '2rem 2.5rem' : '1.75rem 2rem', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', transition:'box-shadow 0.3s,border-color 0.3s', display: wide ? 'grid' : 'block', gridTemplateColumns: wide ? '1fr 1fr' : undefined, gap: wide ? '2rem' : undefined, alignItems: wide ? 'start' : undefined }}
      onMouseEnter={e=>{ e.currentTarget.style.boxShadow=`0 0 32px ${glow}`; e.currentTarget.style.borderColor=accent.replace('1)','0.4)') }}
      onMouseLeave={e=>{ e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor=border }}>
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.75rem' }}>
          <span style={{ fontSize:'1.2rem', color:accent }}>{icon}</span>
          <div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1.1rem', color:'var(--ink)', lineHeight:1 }}>{label}</div>
            <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.55rem', letterSpacing:'0.12em', textTransform:'uppercase', color:accent, marginTop:'0.2rem' }}>
              {label==='AI & Data' ? 'Core Expertise · Depth' : label==='Backend & APIs' ? 'Engineering Breadth' : 'Interface Breadth'}
            </div>
          </div>
        </div>
        <p style={{ fontSize:'0.88rem', color:'var(--muted)', lineHeight:1.7, maxWidth:'44ch' }}>{desc}</p>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginTop: wide ? 0 : '1.2rem', alignContent:'flex-start' }}>
        {tags.map(tag => (
          <span key={tag} style={{ padding:'0.3rem 0.75rem', fontFamily:'JetBrains Mono,monospace', fontSize:'0.6rem', letterSpacing:'0.06em', textTransform:'uppercase', background:accent.replace('1)','0.1)'), border:`1px solid ${accent.replace('1)','0.22)')}`, borderRadius:3, color:accent }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}
