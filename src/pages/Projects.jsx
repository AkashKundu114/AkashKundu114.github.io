/**
 * Projects page — upgraded with:
 *  • Fuse.js fuzzy search  (tolerates typos: "pyhton" → Python results)
 *  • Multi-select tech-tag filtering  (click tags to AND-filter)
 *  • DataContext  (reads from admin-editable store, not static file)
 *  • Framer Motion page transition
 */
import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'
import { useData } from '../context/DataContext'
import { useRevealChildren } from '../hooks/useScrollReveal'
import PageTransition from '../components/PageTransition'

/* ── Fuse.js config ── */
const FUSE_OPTIONS = {
  keys: [
    { name: 'title',        weight: 2 },
    { name: 'shortDesc',    weight: 1 },
    { name: 'technologies', weight: 1.5 },
    { name: 'description',  weight: 0.5 },
  ],
  threshold: 0.35,    // 0 = exact, 1 = match anything
  minMatchCharLength: 2,
  includeScore: true,
}

export default function Projects() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const { projects } = useData()
  const navigate = useNavigate()
  const ref = useRevealChildren()

  const [query,        setQuery]        = useState('')
  const [selectedTags, setSelectedTags] = useState([]) // multi-select

  /* ── Derive all unique tech tags ── */
  const allTechs = useMemo(() =>
    [...new Set(projects.flatMap(p => p.technologies ?? []))].sort()
  , [projects])

  /* ── Fuse instance — re-built only when projects list changes ── */
  const fuse = useMemo(() => new Fuse(projects, FUSE_OPTIONS), [projects])

  /* ── Combined filter: fuzzy text AND selected tags ── */
  const filtered = useMemo(() => {
    let result = query.trim()
      ? fuse.search(query.trim()).map(r => r.item)
      : [...projects]

    if (selectedTags.length > 0) {
      result = result.filter(p =>
        selectedTags.every(tag => (p.technologies ?? []).includes(tag))
      )
    }
    return result
  }, [query, selectedTags, fuse, projects])

  const toggleTag = (tag) =>
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )

  const clearAll = () => { setQuery(''); setSelectedTags([]) }
  const hasFilters = query.trim() || selectedTags.length > 0

  return (
    <PageTransition>
      <section className="section" style={{ paddingTop: '9rem' }} ref={ref}>
        <span className="section-num">03</span>
        <div className="container">

          {/* ── Header ── */}
          <div style={{ marginBottom: '2rem' }}>
            <div className="label reveal">Selected Work</div>
            <h2 className="reveal">
              Things I've<br />
              <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>built.</em>
            </h2>
          </div>

          {/* ── Search bar ── */}
          <div
            className="reveal flex items-center gap-2 rounded"
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              padding: '0.6rem 1rem', marginBottom: '1.2rem',
              maxWidth: 480, transition: 'border-color 0.25s',
            }}
            onFocusCapture={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
            onBlurCapture={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <span style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>⌕</span>
            <input
              type="text"
              placeholder="Fuzzy search — typos OK (e.g. pyhton)"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="bg-transparent border-none outline-none font-sans"
              style={{ color: 'var(--ink)', fontSize: '0.82rem', flex: 1 }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{ color: 'var(--muted)', fontSize: '0.8rem', cursor: 'pointer', background: 'none', border: 'none' }}
              >✕</button>
            )}
          </div>

          {/* ── Tech tag multi-select ── */}
          <div className="reveal" style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                Filter by tech
              </span>
              {selectedTags.length > 0 && (
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'var(--accent)', background: 'var(--accent-dim)', border: '1px solid rgba(79,163,255,.3)', borderRadius: '100px', padding: '0.1rem 0.5rem' }}>
                  {selectedTags.length} active
                </span>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {allTechs.map(tag => {
                const active = selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      padding: '0.35rem 0.8rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.6rem', letterSpacing: '0.06em', textTransform: 'uppercase',
                      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius: 3,
                      background: active ? 'var(--accent)' : 'transparent',
                      color: active ? '#05080f' : 'var(--muted)',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' } }}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Results meta ── */}
          {hasFilters && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--muted)' }}>
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                {query && <> for "<span style={{ color: 'var(--accent)' }}>{query}</span>"</>}
                {selectedTags.length > 0 && <> · tagged <span style={{ color: 'var(--accent)' }}>{selectedTags.join(' + ')}</span></>}
              </span>
              <button
                onClick={clearAll}
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)' }}
              >
                Clear all ✕
              </button>
            </div>
          )}

          {/* ── Grid ── */}
          {filtered.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
                gap: 1,
                background: 'var(--border)',
                border: '1px solid var(--border)',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              {filtered.map(p => (
                <div
                  key={p.id}
                  className="project-card reveal"
                  onClick={() => navigate(`/projects/${p.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate(`/projects/${p.id}`)}
                >
                  <div className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '0.9rem' }}>
                    {p.year}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.7rem', color: 'var(--ink)', transition: 'color 0.25s', fontFamily: 'Syne, sans-serif' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', lineHeight: 1.7, marginBottom: '1.3rem', color: 'var(--muted)' }}>
                    {p.shortDesc}
                  </p>

                  {/* Tech tags — active selected ones highlighted */}
                  <div className="flex flex-wrap gap-1">
                    {(p.technologies ?? []).map(t => (
                      <span
                        key={t}
                        className="tech-badge"
                        style={selectedTags.includes(t) ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1 font-mono uppercase" style={{ marginTop: '1.1rem', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', color: 'var(--accent)' }}>
                    View Details →
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{ padding: '4rem', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted)', fontSize: '0.8rem', border: '1px solid var(--border)', borderRadius: 4 }}
            >
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
