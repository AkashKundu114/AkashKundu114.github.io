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

  const [query, setQuery] = useState('')
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
      <section style={{ paddingTop: '8rem' }} ref={ref}>
        <div className="container">
          <div className="label reveal">projects</div>
          <h2 className="reveal" style={{ marginBottom: '2rem', maxWidth: '32ch' }}>
            Things I've built.
          </h2>

          <div className="reveal" style={{ marginBottom: '1rem', maxWidth: 420 }}>
            <input
              type="text"
              placeholder="Search projects (typos OK)"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="form-input"
              style={{ fontSize: '0.85rem' }}
            />
          </div>

          <div className="reveal" style={{ marginBottom: '2rem' }}>
            <div className="flex flex-wrap gap-1.5">
              {allTechs.map(tag => {
                const active = selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`tag${active ? ' tag-accent' : ''}`}
                    style={{
                      cursor: 'pointer',
                      background: active ? 'var(--accent-soft)' : 'transparent',
                    }}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>

          {hasFilters && (
            <div className="reveal flex items-center justify-between" style={{ marginBottom: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>
              <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
              <button onClick={clearAll} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}>
                clear filters
              </button>
            </div>
          )}

          {filtered.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filtered.map(p => (
                <div
                  key={p.id}
                  className="row-card reveal"
                  onClick={() => navigate(`/projects/${p.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate(`/projects/${p.id}`)}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted)' }}>{p.year}</span>
                        {p.status && <span className="tag">{p.status}</span>}
                      </div>
                      <h3 style={{ marginBottom: '0.5rem' }}>{p.title}</h3>
                      <p style={{ fontSize: '0.86rem', lineHeight: 1.7, maxWidth: '60ch' }}>{p.shortDesc}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5" style={{ maxWidth: 240, justifyContent: 'flex-end' }}>
                      {(p.technologies ?? []).map(t => (
                        <span key={t} className={`tag${selectedTags.includes(t) ? ' tag-accent' : ''}`}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: '3rem', textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--muted)', fontSize: '0.8rem' }}>
              {hasFilters
                ? <>No projects match. <button onClick={clearAll} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}>Clear filters</button></>
                : 'No projects added yet.'}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
