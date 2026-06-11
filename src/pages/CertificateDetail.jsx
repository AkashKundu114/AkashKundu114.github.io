import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
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
    <section style={{ paddingTop: '8rem' }}>
      <div className="container text-center">
        <p style={{ marginBottom: '1.5rem' }}>Certificate not found.</p>
        <Link to="/certificates" className="btn">← Back to certificates</Link>
      </div>
    </section>
  )

  return (
    <PageTransition>
      {zoomed && cert.image && (
        <div className="lightbox-overlay" onClick={() => setZoomed(false)} role="dialog" aria-modal="true">
          <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
            <img src={cert.image} alt={cert.title} />
            <button onClick={() => setZoomed(false)} aria-label="Close"
              style={{ position: 'absolute', top: '-2rem', right: 0, background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
          </div>
        </div>
      )}

      <section style={{ paddingTop: '8rem' }} ref={ref}>
        <div className="container">
          <button onClick={() => navigate('/certificates')} className="reveal nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '2rem' }}>
            ← Back to certificates
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: '3rem', alignItems: 'start' }} className="cert-detail-grid">
            <div className="reveal">
              {cert.image ? (
                <div className="card" style={{ overflow: 'hidden', cursor: 'zoom-in' }} onClick={() => setZoomed(true)}>
                  <img src={cert.image} alt={cert.title} style={{ width: '100%', display: 'block', objectFit: 'contain', background: 'var(--surface-2)' }} />
                </div>
              ) : (
                <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>No certificate image added yet.</p>
                </div>
              )}
              {cert.file?.endsWith('.pdf') && (
                <div style={{ marginTop: '1.25rem' }}>
                  <iframe src={cert.file} title={`${cert.title} PDF`} className="card" style={{ width: '100%', height: '480px' }} />
                </div>
              )}
            </div>

            <div style={{ position: 'sticky', top: '5rem' }}>
              <div className="reveal" style={{ marginBottom: '0.75rem' }}>
                <span className="tag">{cert.category}</span>
              </div>
              <h1 className="reveal" style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', marginBottom: '0.5rem' }}>{cert.title}</h1>
              <p className="reveal" style={{ fontSize: '0.95rem', marginBottom: '1.75rem' }}>{cert.issuer}</p>

              <div className="reveal card" style={{ marginBottom: '1.25rem' }}>
                {[
                  { label: 'Issued by', value: cert.issuer },
                  { label: 'Date', value: cert.date },
                  { label: 'Credential ID', value: cert.credentialId },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start gap-4" style={{ padding: '0.75rem 1.1rem', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--muted)', flexShrink: 0 }}>{label.toUpperCase()}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 500, textAlign: 'right', wordBreak: 'break-all' }}>{value}</span>
                  </div>
                ))}
              </div>

              {cert.description && (
                <div className="reveal" style={{ marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.87rem', lineHeight: 1.8 }}>{cert.description}</p>
                </div>
              )}

              <div className="reveal" style={{ marginBottom: '1.75rem' }}>
                <div className="label" style={{ marginBottom: '0.6rem' }}>skills covered</div>
                <div className="flex flex-wrap gap-1.5">
                  {(cert.skills ?? []).map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>

              <div className="reveal flex flex-col gap-2">
                {cert.file && <a href={cert.file} download className="btn btn-primary" style={{ justifyContent: 'center' }}>Download certificate</a>}
                {cert.verifyUrl && <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ justifyContent: 'center' }}>Verify credential ↗</a>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){.cert-detail-grid{grid-template-columns:1fr!important;gap:2rem!important}}`}</style>
    </PageTransition>
  )
}
