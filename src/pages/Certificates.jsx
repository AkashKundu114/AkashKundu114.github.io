import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { categoryColors } from '../data/certificates'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

const isNew = (cert) => cert.date?.includes('2026')

export default function Certificates() {
  useEffect(() => { window.scrollTo(0,0) }, [])
  const { certificates } = useData()
  const [active, setActive] = useState('All')
  const navigate = useNavigate()
  const ref = useRevealChildren()

  const allCategories = ['All', ...new Set(certificates.map(c => c.category))]
  const filtered = active === 'All' ? certificates : certificates.filter(c => c.category === active)
  const recentCerts = certificates.filter(isNew)

  return (
    <PageTransition>
      <section className="section" style={{ paddingTop: '9rem' }} ref={ref}>
        <span className="section-num">05</span>
        <div className="container">

          {/* ── Header ── */}
          <div className="label reveal">Achievements</div>
          <h2 className="reveal" style={{ marginBottom: '1rem' }}>
            Certificates &amp;<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>Credentials.</em>
          </h2>
          <p className="reveal" style={{ marginBottom: '3.5rem', maxWidth: '52ch' }}>
            Certifications spanning AI agents, cloud platforms, data science, and software
            engineering.
          </p>

          {/* ── Recently Earned ── */}
          {recentCerts.length > 0 && (
            <div className="reveal" style={{ marginBottom: '3.5rem' }}>
              <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
                <span className="font-mono uppercase" style={{ fontSize: '0.58rem', letterSpacing: '0.15em', color: 'var(--muted)' }}>
                  Recently Earned
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <span className="font-mono" style={{ fontSize: '0.52rem', letterSpacing: '0.1em', color: 'rgba(52,211,153,1)', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', padding: '0.15rem 0.6rem', borderRadius: '100px' }}>
                  ● 2026
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px,1fr))', gap: '1rem' }}>
                {recentCerts.map(cert => (
                  <div
                    key={cert.id}
                    onClick={() => navigate(`/certificates/${cert.id}`)}
                    role="button" tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && navigate(`/certificates/${cert.id}`)}
                    style={{
                      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6,
                      padding: '1.4rem', cursor: 'pointer', transition: 'all 0.25s',
                      display: 'flex', gap: '1.1rem', alignItems: 'flex-start',
                      position: 'relative', overflow: 'hidden',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.background = 'var(--surface2)'
                      e.currentTarget.style.boxShadow = 'var(--accent-glow)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.background = 'var(--surface)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {/* Left accent strip */}
                    <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: categoryColors[cert.category] || 'var(--accent)', borderRadius: '6px 0 0 6px' }} />

                    {/* Thumbnail */}
                    <div style={{ width: 68, height: 68, borderRadius: 4, background: 'var(--surface2)', border: '1px solid var(--border)', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {cert.image
                        ? <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
                        : <span style={{ fontSize: '1.6rem', opacity: 0.35 }}>🏅</span>}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="flex items-center gap-1.5" style={{ marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                        <span className="font-mono uppercase" style={{ fontSize: '0.46rem', letterSpacing: '0.1em', background: categoryColors[cert.category] || '#94a3b8', color: '#05080f', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '100px' }}>
                          {cert.category}
                        </span>
                        <span className="font-mono uppercase" style={{ fontSize: '0.46rem', letterSpacing: '0.1em', background: 'rgba(52,211,153,0.15)', color: 'rgba(52,211,153,1)', border: '1px solid rgba(52,211,153,0.3)', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '100px' }}>
                          New
                        </span>
                      </div>
                      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.2, marginBottom: '0.25rem' }}>
                        {cert.title}
                      </div>
                      <div style={{ fontSize: '0.73rem', color: 'var(--muted)', marginBottom: '0.55rem' }}>
                        {cert.issuer}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(cert.skills ?? []).slice(0, 3).map(s => <span key={s} className="tech-badge">{s}</span>)}
                        {(cert.skills ?? []).length > 3 && <span className="tech-badge">+{cert.skills.length - 3}</span>}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="font-mono" style={{ fontSize: '0.56rem', color: 'var(--muted)', flexShrink: 0, alignSelf: 'flex-end', letterSpacing: '0.05em' }}>
                      {cert.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Filter pills + count ── */}
          <div className="reveal" style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="font-mono uppercase transition-all duration-200 border rounded-full cursor-pointer"
                style={{
                  padding: '0.35rem 1rem', fontSize: '0.6rem', letterSpacing: '0.12em',
                  background: active === cat ? 'var(--accent)' : 'transparent',
                  color: active === cat ? '#05080f' : 'var(--muted)',
                  borderColor: active === cat ? 'var(--accent)' : 'var(--border)',
                }}
              >
                {cat}
              </button>
            ))}
            <span className="font-mono" style={{ marginLeft: 'auto', fontSize: '0.56rem', color: 'var(--muted)', letterSpacing: '0.08em', flexShrink: 0 }}>
              {filtered.length} of {certificates.length}
            </span>
          </div>

          {/* ── Full grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.2rem' }}>
            {filtered.map(cert => (
              <div
                key={cert.id}
                className="cert-card reveal"
                onClick={() => navigate(`/certificates/${cert.id}`)}
                role="button" tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/certificates/${cert.id}`)}
              >
                {/* Card image area */}
                <div style={{ aspectRatio: '16/9', background: 'var(--surface2)', borderBottom: '1px solid var(--border)', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cert.image
                    ? <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
                    : <div style={{ textAlign: 'center', opacity: 0.3 }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏅</div>
                        <span className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Certificate</span>
                      </div>}

                  {/* Category badge */}
                  <span className="absolute font-mono uppercase" style={{ top: '0.75rem', right: '0.75rem', fontSize: '0.5rem', letterSpacing: '0.1em', background: categoryColors[cert.category] || '#94a3b8', color: '#05080f', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: '100px' }}>
                    {cert.category}
                  </span>

                  {/* New badge */}
                  {isNew(cert) && (
                    <span className="absolute font-mono uppercase" style={{ top: '0.75rem', left: '0.75rem', fontSize: '0.46rem', letterSpacing: '0.08em', background: 'rgba(52,211,153,0.9)', color: '#05080f', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '100px' }}>
                      New
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div style={{ padding: '1.25rem' }}>
                  <h3 className="font-display" style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.4rem', lineHeight: 1.25 }}>
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.9rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{cert.issuer}</span>
                    <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>{cert.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1" style={{ marginBottom: '1rem' }}>
                    {(cert.skills ?? []).slice(0, 3).map(s => <span key={s} className="tech-badge">{s}</span>)}
                    {(cert.skills ?? []).length > 3 && <span className="tech-badge">+{cert.skills.length - 3}</span>}
                  </div>
                  <div className="inline-flex items-center gap-1 font-mono uppercase" style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--accent)' }}>
                    View Certificate →
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)', fontSize: '0.8rem', border: '1px solid var(--border)', borderRadius: 4, fontFamily: 'JetBrains Mono, monospace' }}>
              No certificates in this category yet.
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
