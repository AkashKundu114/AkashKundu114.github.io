import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

const catColors = {
  'Data Science': '#2563eb',
  'Programming':  '#16a34a',
  'Cloud':        '#0891b2',
  'AI/ML':        '#7c3aed',
  'Web Dev':      '#d97706',
  'General':      '#6b7280',
}

export default function Certificates() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const { certificates } = useData()
  const [active, setActive] = useState('All')
  const navigate = useNavigate()
  const ref = useRevealChildren()

  const allCategories = ['All', ...new Set(certificates.map(c => c.category))]
  const filtered = active === 'All' ? certificates : certificates.filter(c => c.category === active)

  return (
    <PageTransition>
      <section style={{ paddingTop: '96px' }} ref={ref}>
        <div className="container">
          <div className="label reveal">certificates</div>
          <h2 className="reveal" style={{ marginBottom: '12px', maxWidth: '28ch' }}>
            Certifications &amp; coursework.
          </h2>
          <p className="reveal" style={{ fontSize: '13px', maxWidth: '52ch', lineHeight: 1.8, marginBottom: '32px', fontFamily: 'var(--font-mono)' }}>
            Completed certifications across data, AI/ML, security, and web development.
          </p>

          {/* Category filter */}
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`tag${active === cat ? ' tag-active' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map((cert, i) => {
              const color = catColors[cert.category] || '#6b7280'
              return (
                <div
                  key={cert.id}
                  className="row-card reveal"
                  onClick={() => navigate(`/certificates/${cert.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate(`/certificates/${cert.id}`)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          fontWeight: 600,
                          padding: '2px 10px',
                          borderRadius: 'var(--radius-pill)',
                          background: color + '14',
                          color: color,
                          border: `1px solid ${color}30`,
                        }}>{cert.category}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted-2)' }}>{cert.date}</span>
                      </div>
                      <h3 style={{ marginBottom: '4px', fontSize: '0.95rem' }}>{cert.title}</h3>
                      <p style={{ fontSize: '13px', fontFamily: 'var(--font-mono)' }}>{cert.issuer}</p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', maxWidth: '240px', justifyContent: 'flex-end' }}>
                      {(cert.skills ?? []).slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>No certificates in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
