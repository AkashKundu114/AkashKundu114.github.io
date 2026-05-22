import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

export default function ProjectDetail() {
  useEffect(() => { window.scrollTo(0,0) },[])
  const { id } = useParams()
  const navigate = useNavigate()
  const ref = useRevealChildren()
  const { projects } = useData()
  const [lightbox, setLightbox] = useState(null)
  const project = projects.find(p => p.id === id)

  if (!project) return (
    <section className="section" style={{ paddingTop:'9rem' }}>
      <div className="container text-center">
        <p style={{ color:'var(--muted)',marginBottom:'2rem' }}>Project not found.</p>
        <Link to="/projects" className="btn btn-outline">← Back to Projects</Link>
      </div>
    </section>
  )

  const hasScreenshots = project.screenshots?.length > 0

  return (
    <PageTransition>
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <div style={{ position:'relative',maxWidth:'90vw' }} onClick={e => e.stopPropagation()}>
            <img src={project.screenshots[lightbox].src} alt={project.screenshots[lightbox].caption} style={{ maxWidth:'100%',maxHeight:'80vh',objectFit:'contain',borderRadius:4 }} />
            <p className="font-mono text-center" style={{ marginTop:'0.75rem',fontSize:'0.7rem',color:'rgba(255,255,255,0.6)' }}>{project.screenshots[lightbox].caption}</p>
            {project.screenshots.length > 1 && (
              <div className="flex justify-between" style={{ marginTop:'1rem',gap:'1rem' }}>
                <button onClick={() => setLightbox(i => (i-1+project.screenshots.length)%project.screenshots.length)} className="btn btn-outline btn-sm">← Prev</button>
                <span className="font-mono" style={{ fontSize:'0.65rem',color:'rgba(255,255,255,0.4)',alignSelf:'center' }}>{lightbox+1} / {project.screenshots.length}</span>
                <button onClick={() => setLightbox(i => (i+1)%project.screenshots.length)} className="btn btn-outline btn-sm">Next →</button>
              </div>
            )}
            <button onClick={() => setLightbox(null)} style={{ position:'absolute',top:'-2rem',right:0,background:'none',border:'none',color:'rgba(255,255,255,0.6)',fontSize:'1.2rem',cursor:'pointer' }} aria-label="Close">✕</button>
          </div>
        </div>
      )}

      <section className="section" style={{ paddingTop:'9rem' }} ref={ref}>
        <div className="container">
          <button onClick={() => navigate('/projects')} className="reveal inline-flex items-center gap-2 font-mono uppercase mb-8" style={{ background:'none',border:'none',cursor:'pointer',color:'var(--muted)',fontSize:'0.65rem',letterSpacing:'0.1em',transition:'color 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.color='var(--accent)'}} onMouseLeave={e=>{e.currentTarget.style.color='var(--muted)'}}>← Back to Projects</button>

          <div className="reveal" style={{ marginBottom:'3rem' }}>
            <span className="font-mono" style={{ fontSize:'0.6rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--accent)',background:'var(--accent-dim)',border:'1px solid rgba(79,163,255,0.2)',padding:'0.2rem 0.7rem',borderRadius:'100px' }}>{project.year}</span>
            <h1 className="font-display font-bold" style={{ fontSize:'clamp(1.8rem,5vw,3rem)',letterSpacing:'-0.02em',lineHeight:1.1,marginBottom:'1.5rem',marginTop:'0.75rem' }}>{project.title}</h1>
            <div className="flex flex-wrap gap-1.5" style={{ marginBottom:'1.5rem' }}>
              {(project.technologies??[]).map(t => <span key={t} className="skill-tag" style={{ fontSize:'0.75rem',padding:'0.3rem 0.8rem' }}>{t}</span>)}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.github   && <a href={project.github}   target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">GitHub ↗</a>}
              {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Live Demo ↗</a>}
            </div>
          </div>

          <div style={{ display:'grid',gridTemplateColumns:'minmax(0,1.5fr) minmax(0,1fr)',gap:'4rem',alignItems:'start' }} className="detail-grid">
            <div>
              <div className="reveal" style={{ background:'var(--surface)',border:'1px solid var(--border)',borderRadius:4,padding:'2rem',marginBottom:'2rem' }}>
                <h3 className="font-display" style={{ fontSize:'1rem',marginBottom:'1rem',color:'var(--ink)' }}>Overview</h3>
                <p style={{ fontSize:'0.92rem',lineHeight:1.8,color:'var(--muted)',whiteSpace:'pre-line' }}>{project.description}</p>
              </div>
              <div className="reveal">
                <div className="flex items-center gap-3" style={{ marginBottom:'1.2rem' }}>
                  <span className="font-mono uppercase" style={{ fontSize:'0.6rem',letterSpacing:'0.15em',color:'var(--muted)' }}>Screenshots</span>
                  <div style={{ flex:1,height:1,background:'var(--border)' }} />
                </div>
                {hasScreenshots ? (
                  <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'1rem' }}>
                    {project.screenshots.map((shot,i) => (
                      <div key={i} className="reveal" style={{ background:'var(--surface)',border:'1px solid var(--border)',borderRadius:4,overflow:'hidden',cursor:'zoom-in',transition:'all 0.25s' }}
                        onClick={() => setLightbox(i)} onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.transform='scale(1.02)'}} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='scale(1)'}}>
                        <img src={shot.src} alt={shot.caption} style={{ width:'100%',aspectRatio:'16/9',objectFit:'cover',display:'block' }} />
                        <div style={{ padding:'0.6rem 0.8rem' }}><span className="font-mono" style={{ fontSize:'0.6rem',color:'var(--muted)' }}>{shot.caption}</span></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ border:'2px dashed var(--border)',borderRadius:4,padding:'3rem',textAlign:'center' }}>
                    <div style={{ fontSize:'2rem',marginBottom:'0.75rem',opacity:0.3 }}>🖼</div>
                    <p className="font-mono" style={{ fontSize:'0.68rem',color:'var(--muted)' }}>Screenshots coming soon.</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="reveal" style={{ background:'var(--surface)',border:'1px solid var(--border)',borderRadius:4,padding:'2rem',position:'sticky',top:'6rem' }}>
                <h3 className="font-display" style={{ fontSize:'1rem',marginBottom:'1.5rem',color:'var(--ink)' }}>Key Features</h3>
                <ul style={{ listStyle:'none',display:'flex',flexDirection:'column',gap:'0.9rem' }}>
                  {(project.features??[]).map((f,i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span style={{ color:'var(--accent)',flexShrink:0,marginTop:'0.15rem',fontSize:'0.75rem' }}>◆</span>
                      <span style={{ fontSize:'0.87rem',color:'var(--muted)',lineHeight:1.6 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop:'2rem',paddingTop:'1.5rem',borderTop:'1px solid var(--border)' }}>
                  <span className="font-mono" style={{ fontSize:'0.58rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--muted)' }}>Technologies Used</span>
                  <div className="flex flex-wrap gap-1.5" style={{ marginTop:'0.75rem' }}>
                    {(project.technologies??[]).map(t => <span key={t} className="tech-badge">{t}</span>)}
                  </div>
                </div>
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ marginTop:'1.5rem',width:'100%',justifyContent:'center' }}>View Source Code</a>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){.detail-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </PageTransition>
  )
}
