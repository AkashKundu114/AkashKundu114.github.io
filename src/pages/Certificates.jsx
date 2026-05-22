import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { categoryColors } from '../data/certificates'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

export default function Certificates() {
  useEffect(() => { window.scrollTo(0,0) },[])
  const { certificates } = useData()
  const [active, setActive] = useState('All')
  const navigate = useNavigate()
  const ref = useRevealChildren()

  const allCategories = ['All', ...new Set(certificates.map(c => c.category))]
  const filtered = active === 'All' ? certificates : certificates.filter(c => c.category === active)

  return (
    <PageTransition>
      <section className="section" style={{ paddingTop:'9rem' }} ref={ref}>
        <span className="section-num">05</span>
        <div className="container">
          <div className="label reveal">Achievements</div>
          <h2 className="reveal" style={{ marginBottom:'1rem' }}>Certificates &amp;<br /><em style={{ color:'var(--accent)',fontStyle:'normal' }}>Credentials.</em></h2>
          <p className="reveal" style={{ marginBottom:'3rem',maxWidth:'50ch' }}>A growing collection of certifications spanning data science, cloud computing, AI/ML, and software engineering.</p>

          {/* Filter pills */}
          <div className="reveal flex flex-wrap gap-2" style={{ marginBottom:'3rem' }}>
            {allCategories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className="font-mono uppercase rounded-full border transition-all duration-200 cursor-pointer"
                style={{ padding:'0.35rem 1rem',fontSize:'0.6rem',letterSpacing:'0.12em',
                  background: active===cat ? 'var(--accent)' : 'transparent',
                  color: active===cat ? '#05080f' : 'var(--muted)',
                  borderColor: active===cat ? 'var(--accent)' : 'var(--border)' }}>{cat}</button>
            ))}
          </div>

          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:'1.2rem' }}>
            {filtered.map(cert => (
              <div key={cert.id} className="cert-card reveal" onClick={() => navigate(`/certificates/${cert.id}`)} role="button" tabIndex={0} onKeyDown={e => e.key==='Enter' && navigate(`/certificates/${cert.id}`)}>
                <div style={{ aspectRatio:'16/9',background:'var(--surface2)',borderBottom:'1px solid var(--border)',overflow:'hidden',position:'relative',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  {cert.image ? <img src={cert.image} alt={cert.title} style={{ width:'100%',height:'100%',objectFit:'cover' }} onError={e=>{e.target.style.display='none'}} />
                    : <div style={{ textAlign:'center',opacity:0.3 }}><div style={{ fontSize:'2.5rem',marginBottom:'0.5rem' }}>🏅</div><span className="font-mono" style={{ fontSize:'0.55rem',color:'var(--muted)',textTransform:'uppercase',letterSpacing:'0.1em' }}>Certificate</span></div>}
                  <span className="font-mono uppercase absolute" style={{ top:'0.75rem',right:'0.75rem',fontSize:'0.5rem',letterSpacing:'0.1em',background:categoryColors[cert.category]||'#94a3b8',color:'#05080f',fontWeight:700,padding:'0.2rem 0.55rem',borderRadius:'100px' }}>{cert.category}</span>
                </div>
                <div style={{ padding:'1.25rem' }}>
                  <h3 className="font-display" style={{ fontSize:'0.98rem',fontWeight:700,color:'var(--ink)',marginBottom:'0.4rem',lineHeight:1.25 }}>{cert.title}</h3>
                  <div className="flex items-center justify-between" style={{ marginBottom:'0.9rem' }}>
                    <span style={{ fontSize:'0.78rem',color:'var(--muted)' }}>{cert.issuer}</span>
                    <span className="font-mono" style={{ fontSize:'0.6rem',color:'var(--muted)' }}>{cert.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1" style={{ marginBottom:'1rem' }}>
                    {(cert.skills??[]).slice(0,3).map(s => <span key={s} className="tech-badge">{s}</span>)}
                    {(cert.skills??[]).length > 3 && <span className="tech-badge">+{cert.skills.length-3}</span>}
                  </div>
                  <div className="inline-flex items-center gap-1 font-mono uppercase" style={{ fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.06em',color:'var(--accent)' }}>View Certificate →</div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length===0 && <div style={{ textAlign:'center',padding:'4rem',color:'var(--muted)',fontSize:'0.8rem',border:'1px solid var(--border)',borderRadius:4,fontFamily:'JetBrains Mono, monospace' }}>No certificates in this category yet.</div>}
        </div>
      </section>
    </PageTransition>
  )
}
