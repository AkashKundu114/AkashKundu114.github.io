import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'
import { useData } from '../context/DataContext'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

const FUSE_OPTIONS = {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'shortDesc', weight: 1 },
    { name: 'technologies', weight: 1.5 },
    { name: 'description', weight: 0.5 },
  ],
  threshold: 0.35,
  minMatchCharLength: 2,
  includeScore: true,
}

export default function Projects() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const { projects } = useData()
  const navigate = useNavigate()
  const ref = useRevealChildren()

  const [query, setQuery]           = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  const allTechs = useMemo(() =>
    [...new Set(projects.flatMap(p => p.technologies ?? []))].sort()
  , [projects])

  const fuse = useMemo(() => new Fuse(projects, FUSE_OPTIONS), [projects])

  const filtered = useMemo(() => {
    let result = query.trim() ? fuse.search(query.trim()).map(r => r.item) : [...projects]
    if (selectedTags.length > 0) {
      result = result.filter(p => selectedTags.every(tag => (p.technologies ?? []).includes(tag)))
    }
    return result
  }, [query, selectedTags, fuse, projects])

  const toggleTag = (tag) =>
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

  const clearAll = () => { setQuery(''); setSelectedTags([]) }
  const hasFilters = query.trim() || selectedTags.length > 0

  return (
    <PageTransition>
      <section style={{ paddingTop: '96px' }} ref={ref}>
        <div className="container">
          <div className="label reveal">selected work</div>
          <h2 className="reveal" style={{ marginBottom: '12px', maxWidth: '28ch' }}>
            Things I've built.
          </h2>
          <p className="reveal" style={{ fontSize: '13px', maxWidth: '52ch', lineHeight: 1.8, marginBottom: '36px', fontFamily: 'var(--font-mono)' }}>
            End-to-end builds — models, APIs, and the interfaces in front of them.
          </p>

          <div className="reveal card" style={{
            padding: '16px 20px',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" style={{ color: 'var(--muted-2)', flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search projects — typos OK"
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--ink)',
                }}
              />
              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="tag"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >clear</button>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {allTechs.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`tag${selectedTags.includes(tag) ? ' tag-active' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {hasFilters && (
            <div className="reveal" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--muted-2)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} />
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className="row-card reveal"
                  onClick={() => navigate(`/projects/${p.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate(`/projects/${p.id}`)}
                  style={{ '--i': i }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted-2)' }}>{p.year}</span>
                        {p.status && <span className="tag">{p.status}</span>}
                      </div>
                      <h3 style={{ marginBottom: '6px', fontSize: '0.95rem' }}>{p.title}</h3>
                      <p style={{ fontSize: '13px', lineHeight: 1.65, maxWidth: '55ch', fontFamily: 'var(--font-mono)' }}>{p.shortDesc}</p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', maxWidth: '240px', justifyContent: 'flex-end' }}>
                      {(p.technologies ?? []).map(t => (
                        <span key={t} className={`tag${selectedTags.includes(t) ? ' tag-active' : ''}`}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                No projects match.{' '}
                <button onClick={clearAll} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', textDecoration: 'underline' }}>
                  Clear filters
                </button>
              </p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
