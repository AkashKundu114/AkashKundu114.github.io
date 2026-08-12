import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { categoryColors } from '../data/certificates'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

export default function CertificateDetail() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { id } = useParams()
  const navigate = useNavigate()
  const ref = useRevealChildren()
  const { certificates } = useData()
  const [zoomed, setZoomed] = useState(false)
  const cert = certificates.find(c => c.id === id)

  if (!cert) return (
    <section style={{ paddingTop:'96px' }}>
      <div className="container" style={{ textAlign:'center' }}>
        <p style={{ marginBottom:'20px', fontFamily:'var(--font-mono)' }}>Certificate not found.</p>
        <Link to="/certificates" className="btn">← Back to certificates</Link>
      </div>
    </section>
  )
  const color = categoryColors[cert.category] || '#5C6A99'

  return (
    <PageTransition>
      {zoomed && cert.image && (
        <div className="lightbox-overlay" onClick={() => setZoomed(false)} role="dialog" aria-modal="true">
          <div style={{ position:'relative' }} onClick={e => e.stopPropagation()}>
            <img src={cert.image} alt={cert.title} />
            <button onClick={() => setZoomed(false)} aria-label="Close"
              style={{ position:'absolute', top:'-28px', right:0, background:'none', border:'none', color:'rgba(254,250,239,0.6)', fontSize:'1.1rem', cursor:'none' }}>✕</button>
          </div>
        </div>
      )}

      <section style={{ paddingTop:'96px' }} ref={ref}>
        <div className="container">
          <button onClick={() => navigate('/certificates')} className="reveal btn btn-sm" style={{ marginBottom:'32px' }}>← Certificates</button>

          <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1.5fr) minmax(0,1fr)', gap:'28px', alignItems:'start' }} id="cert-detail-grid">
            <div className="reveal">
              {cert.image ? (
                <div className="card card-hover" style={{ overflow:'hidden', cursor:'none', marginBottom:'10px' }} onClick={() => setZoomed(true)}>
                  <img src={cert.image} alt={cert.title} style={{ width:'100%', display:'block', objectFit:'contain', background:'var(--surface-2)' }} />
                </div>
              ) : (
                <div className="card" style={{ padding:'60px 24px', textAlign:'center', marginBottom:'10px' }}>
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:'12px' }}>No certificate image added yet.</p>
                </div>
              )}
              {cert.file?.endsWith('.pdf') && (
                <iframe src={cert.file} title={`${cert.title} PDF`} className="card"
                  style={{ width:'100%', height:'480px', border:'1px solid var(--border)', borderRadius:0 }} />
              )}
            </div>

            <div style={{ position:'sticky', top:'5rem' }}>
              <div className="reveal" style={{ marginBottom:'12px' }}>
                <span style={{
                  fontFamily:'var(--font-mono)', fontSize:'9px', fontWeight:700,
                  padding:'3px 11px', background:`${color}16`, color, border:`1px solid ${color}35`, borderRadius:0,
                }}>{cert.category}</span>
              </div>

              <h1 className="reveal" style={{ fontSize:'clamp(1.3rem,3.5vw,1.9rem)', marginBottom:'8px', lineHeight:1.08 }}>{cert.title}</h1>
              <p className="reveal" style={{ fontSize:'13px', marginBottom:'24px', fontFamily:'var(--font-mono)' }}>{cert.issuer}</p>

              <div className="reveal card" style={{ padding:0, overflow:'hidden', marginBottom:'18px' }}>
                {[{label:'Issued by',value:cert.issuer},{label:'Date',value:cert.date},{label:'Credential ID',value:cert.credentialId}]
                  .filter(r => r.value)
                  .map(({ label, value }) => (
                    <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px', padding:'11px 18px', borderBottom:'1px solid var(--border)' }}>
                      <span style={{ fontFamily:'var(--font-mono)', fontSize:'9px', fontWeight:700, color:'var(--accent)', letterSpacing:'0.1em', textTransform:'uppercase', flexShrink:0 }}>{label}</span>
                      <span style={{ fontSize:'11px', fontFamily:'var(--font-mono)', fontWeight:500, textAlign:'right', wordBreak:'break-all', color:'var(--ink)' }}>{value}</span>
                    </div>
                  ))}
              </div>

              {cert.description && (
                <div className="reveal" style={{ marginBottom:'20px' }}>
                  <p style={{ fontSize:'13px', lineHeight:1.8, fontFamily:'var(--font-mono)' }}>{cert.description}</p>
                </div>
              )}

              <div className="reveal" style={{ marginBottom:'22px' }}>
                <div className="label" style={{ marginBottom:'10px' }}>skills covered</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
                  {(cert.skills??[]).map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>

              <div className="reveal" style={{ display:'flex', flexDirection:'column', gap:'7px' }}>
                {cert.file     && <a href={cert.file}     download className="btn btn-primary" style={{ justifyContent:'center' }}>Download certificate ↓</a>}
                {cert.verifyUrl && <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ justifyContent:'center' }}>Verify credential ↗</a>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){#cert-detail-grid{grid-template-columns:1fr!important;gap:18px!important}}`}</style>
    </PageTransition>
  )
}
