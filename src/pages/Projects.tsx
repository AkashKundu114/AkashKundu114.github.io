import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { useData } from '../context/DataContext';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import LiquidGlassLens from '../components/LiquidGlassLens';
import { ShinyButton, Tactile3DButton } from '../components/EvilButtons';

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
};

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { projects } = useData();
  const navigate = useNavigate();
  const ref = useRevealChildren();
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTechs = useMemo(
    () => [...new Set(projects.flatMap((p) => p.technologies ?? []))].sort(),
    [projects]
  );
  const fuse = useMemo(() => new Fuse(projects, FUSE_OPTIONS), [projects]);
  const filtered = useMemo(() => {
    let r = query.trim() ? fuse.search(query.trim()).map((x) => x.item) : [...projects];
    if (selectedTags.length)
      r = r.filter((p) => selectedTags.every((t) => (p.technologies ?? []).includes(t)));
    return r;
  }, [query, selectedTags, fuse, projects]);

  const toggleTag = (t: string) =>
    setSelectedTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const clearAll = () => {
    setQuery('');
    setSelectedTags([]);
  };
  const hasFilters = query.trim() !== '' || selectedTags.length > 0;

  return (
    <PageTransition>
      <section className="section" style={{ paddingTop: '96px' }} ref={ref}>
        <div className="container">
          <div className="label reveal">portfolio &amp; systems</div>
          <h2 className="reveal" style={{ marginBottom: '12px', maxWidth: '28ch' }}>
            Production &amp; Research Systems.
          </h2>
          <p
            className="reveal"
            style={{
              fontSize: '13px',
              maxWidth: '56ch',
              lineHeight: 1.8,
              marginBottom: '36px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--ink-2)',
            }}
          >
            End-to-end builds — PyTorch vision backbones, LangGraph agent swarms, FastAPI pipelines, and
            production desktop/web interfaces.
          </p>

          <LiquidGlassLens
            intensity="subtle"
            className="reveal card"
            style={{ padding: '18px 22px', marginBottom: '24px' }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                style={{ color: 'var(--accent)', flexShrink: 0 }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search projects by tech, architecture, or title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
                  className="tag tag-active"
                  style={{ cursor: 'pointer' }}
                >
                  Clear filters ✕
                </button>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {allTechs.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`tag${selectedTags.includes(tag) ? ' tag-active' : ''}`}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </LiquidGlassLens>

          {hasFilters && (
            <div
              className="reveal"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--accent)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  background: 'var(--accent)',
                  borderRadius: '50%',
                }}
              />
              {filtered.length} project{filtered.length !== 1 ? 's' : ''} matched
            </div>
          )}

          {filtered.length > 0 ? (
            <div
              className="stagger"
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className="row-card reveal"
                  onClick={() => navigate(`/projects/${p.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${p.id}`)}
                  style={{ '--i': i, padding: '20px 24px' } as any}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '18px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 260 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '8px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            color: 'var(--muted-2)',
                            letterSpacing: '0.06em',
                          }}
                        >
                          {p.year}
                        </span>
                        {p.status && <span className="tag">{p.status}</span>}
                        {p.screenshots && p.screenshots.length > 0 && (
                          <span
                            className="tag"
                            style={{
                              borderColor: 'var(--accent)',
                              color: 'var(--accent)',
                              background: 'var(--accent-soft)',
                            }}
                          >
                            Snapshot Available ✓
                          </span>
                        )}
                        {p.liveLink && (
                          <span
                            className="tag"
                            style={{
                              borderColor: 'var(--success)',
                              color: 'var(--success)',
                              background: 'rgba(109,235,170,0.1)',
                            }}
                          >
                            Live ↗
                          </span>
                        )}
                      </div>
                      <h3 style={{ marginBottom: '6px', fontSize: '1rem', color: 'var(--ink)' }}>
                        {p.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '13px',
                          lineHeight: 1.65,
                          maxWidth: '56ch',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--ink-2)',
                        }}
                      >
                        {p.shortDesc}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: '10px',
                        minWidth: '220px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '4px',
                          justifyContent: 'flex-end',
                        }}
                      >
                        {(p.technologies ?? []).map((t) => (
                          <span
                            key={t}
                            className={`tag${selectedTags.includes(t) ? ' tag-active' : ''}`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="btn btn-sm"
                            style={{ padding: '3px 10px', fontSize: '10px' }}
                          >
                            GitHub ↗
                          </a>
                        )}
                        <span
                          className="btn btn-sm btn-primary"
                          style={{ padding: '3px 10px', fontSize: '10px' }}
                        >
                          Deep Dive →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                No projects match current filters.{' '}
                <button
                  onClick={clearAll}
                  style={{
                    color: 'var(--accent)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    textDecoration: 'underline',
                  }}
                >
                  Clear filters
                </button>
              </p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
