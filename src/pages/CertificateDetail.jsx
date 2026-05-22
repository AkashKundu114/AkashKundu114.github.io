import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { categoryColors } from '../data/certificates'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

export default function CertificateDetail() {
  useEffect(() => { window.scrollTo(0,0) },[])
  const { id } = useParams()
  const navigate = useNavigate()
  const ref = useRevealChildren()
  const { certificates } = useData()
  const [zoomed, setZoomed] = useState(false)
  const cert = certificates.find(c => c.id === id)

  if (!cert) return (
    <section className="section" style={{ paddingTop:'9rem' }}>
      <div className="container text-center">
        <p style={{ color:'var(--muted)',marginBottom:'2rem' }}>Certificate not found.</p>
        <Link to="/certificates" className="btn btn-outline">← Back to Certificates</Link>
      </div>
    </section>
  )

  return (
    <PageTransition>
      {zoomed && cert.image && (
        <div className="lightbox-overlay" onClick={() => setZoomed(false)} role="dialog" aria-modal="true">
          <div style={{ position:'relative' }} onClick={e => e.stopPropagation()}>
            <img src={cert.image} alt={cert.title} style={{ maxWidth:'92vw',maxHeight:'88vh',objectFit:'contain',borderRadius:4 }} />
            <button onClick={() => setZoomed(false)} style={{ position:'absolute',top:'-2rem',right:0,background:'none',border:'none',color:'rgba(255,255,255,0.6)',fontSize:'1.2rem',cursor:'pointer' }} aria-label="Close">✕</button>
          </div>
        </div>
      )}

      <section className="section" style={{ paddingTop:'9rem' }} ref={ref}>
        <div className="container">
          <button onClick={() => navigate('/certificates')} className="reveal inline-flex items-center gap-2 font-mono uppercase mb-8"
            style={{ background:'none',border:'none',cursor:'pointer',color:'var(--muted)',fontSize:'0.65rem',letterSpacing:'0.1em',transition:'color 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.color='var(--accent)'}} onMouseLeave={e=>{e.currentTarget.style.color='var(--muted)'}}>← Back to Certificates</button>

          <div style={{ display:'grid',gridTemplateColumns:'minmax(0,1.6fr) minmax(0,1fr)',gap:'4rem',alignItems:'start' }} className="cert-detail-grid">
            {/* Left – image */}
            <div className="reveal">
              <div className="flex items-center gap-3" style={{ marginBottom:'1.2rem' }}>
                <span className="font-mono uppercase" style={{ fontSize:'0.6rem',letterSpacing:'0.15em',color:'var(--muted)' }}>Certificate</span>
                <div style={{ flex:1,height:1,background:'var(--border)' }} />
                {cert.image && <button onClick={() => setZoomed(true)} className="font-mono uppercase" style={{ background:'none',border:'none',cursor:'zoom-in',color:'var(--accent)',fontSize:'0.58rem',letterSpacing:'0.1em' }}>⤢ Zoom</button>}
              </div>
              {cert.image ? (
                <div style={{ border:'1px solid var(--border)',borderRadius:4,overflow:'hidden',cursor:'zoom-in',transition:'all 0.25s' }}
                  onClick={() => setZoomed(true)}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.boxShadow='var(--accent-glow)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.boxShadow='none'}}>
                  <img src={cert.image} alt={cert.title} style={{ width:'100%',display:'block',objectFit:'contain',background:'var(--surface2)' }} />
                </div>
              ) : (
                <div style={{ border:'2px dashed var(--border)',borderRadius:4,padding:'5rem 2rem',textAlign:'center' }}>
                  <div style={{ fontSize:'3rem',marginBottom:'1rem',opacity:0.25 }}>🏅</div>
                  <p className="font-mono" style={{ fontSize:'0.68rem',color:'var(--muted)' }}>No certificate image added yet.</p>
                </div>
              )}
              {cert.file?.endsWith('.pdf') && (
                <div style={{ marginTop:'1.5rem' }}>
                  <div className="flex items-center gap-3" style={{ marginBottom:'1rem' }}>
                    <span className="font-mono uppercase" style={{ fontSize:'0.6rem',letterSpacing:'0.15em',color:'var(--muted)' }}>PDF Preview</span>
                    <div style={{ flex:1,height:1,background:'var(--border)' }} />
                  </div>
                  <iframe src={cert.file} title={`${cert.title} PDF`} style={{ width:'100%',height:'500px',border:'1px solid var(--border)',borderRadius:4 }} />
                </div>
              )}
            </div>

            {/* Right – details */}
            <div style={{ position:'sticky',top:'6rem' }}>
              <div className="reveal" style={{ marginBottom:'1rem' }}>
                <span className="font-mono uppercase rounded-full" style={{ fontSize:'0.58rem',letterSpacing:'0.12em',background:categoryColors[cert.category]||'#94a3b8',color:'#05080f',fontWeight:700,padding:'0.25rem 0.8rem' }}>{cert.category}</span>
              </div>
              <h1 className="reveal font-display font-bold" style={{ fontSize:'clamp(1.4rem,4vw,2rem)',letterSpacing:'-0.02em',lineHeight:1.15,marginBottom:'0.5rem' }}>{cert.title}</h1>
              <p className="reveal" style={{ fontSize:'1rem',color:'var(--muted)',marginBottom:'2rem' }}>{cert.issuer}</p>

              <div className="reveal" style={{ background:'var(--surface)',border:'1px solid var(--border)',borderRadius:4,overflow:'hidden',marginBottom:'1.5rem' }}>
                {[
                  { label:'Issued By',     value:cert.issuer },
                  { label:'Date',          value:cert.date },
                  { label:'Credential ID', value:cert.credentialId },
                ].map(({ label,value }) => (
                  <div key={label} className="flex justify-between items-start gap-4" style={{ padding:'0.85rem 1.2rem',borderBottom:'1px solid var(--border)' }}>
                    <span className="font-mono" style={{ fontSize:'0.57rem',letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--muted)',flexShrink:0 }}>{label}</span>
                    <span style={{ fontSize:'0.82rem',fontWeight:500,color:'var(--ink)',textAlign:'right',wordBreak:'break-all' }}>{value}</span>
                  </div>
                ))}
              </div>

              {cert.description && <div className="reveal" style={{ marginBottom:'1.5rem' }}><p style={{ fontSize:'0.87rem',lineHeight:1.75,color:'var(--muted)' }}>{cert.description}</p></div>}

              <div className="reveal" style={{ marginBottom:'2rem' }}>
                <span className="font-mono uppercase" style={{ fontSize:'0.58rem',letterSpacing:'0.12em',color:'var(--muted)',display:'block',marginBottom:'0.6rem' }}>Skills Covered</span>
                <div className="flex flex-wrap gap-1.5">
                  {(cert.skills??[]).map(s => <span key={s} className="skill-tag" style={{ fontSize:'0.72rem',padding:'0.3rem 0.7rem' }}>{s}</span>)}
                </div>
              </div>

              <div className="reveal flex flex-col gap-2">
                {cert.file && <a href={cert.file} download className="btn btn-primary" style={{ justifyContent:'center' }}>↓ Download Certificate</a>}
                {cert.verifyUrl && <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent:'center' }}>✓ Verify Credential ↗</a>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){.cert-detail-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </PageTransition>
  )
}
