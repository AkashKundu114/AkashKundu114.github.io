import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Fuse, { IFuseOptions } from 'fuse.js';
import { useData } from '../context/DataContext';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import LiquidGlassLens from '../components/LiquidGlassLens';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Project } from '../data/projects';

const MAX_SEARCH_LENGTH = 80;

const FUSE_OPTIONS: IFuseOptions<Project> = {
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

/**
 * Sanitizes search input to prevent anomalous inputs or runaway regexes.
 */
function sanitizeSearchQuery(input: string): string {
  if (typeof input !== 'string') return '';
  return Array.from(input.slice(0, MAX_SEARCH_LENGTH))
    .filter((char) => {
      const code = char.charCodeAt(0);
      return (code >= 32 && code <= 126) || code > 159;
    })
    .join('');
}

/**
 * Collects sorted unique technologies from projects.
 */
function extractAllTechnologies(projectList: readonly Project[]): string[] {
  if (!projectList || projectList.length === 0) return [];
  const techSet = new Set<string>();
  for (const project of projectList) {
    if (Array.isArray(project.technologies)) {
      for (const tech of project.technologies) {
        if (tech && tech.trim()) {
          techSet.add(tech.trim());
        }
      }
    }
  }
  return Array.from(techSet).sort();
}

/**
 * Filters projects through Fuse fuzzy query and exact tag intersection.
 */
function filterProjects(
  projectList: readonly Project[],
  query: string,
  selectedTags: readonly string[],
  fuseInstance: Fuse<Project>
): Project[] {
  if (!projectList || projectList.length === 0) return [];

  const trimmedQuery = query.trim();
  let searchResults: Project[] = trimmedQuery
    ? fuseInstance.search(trimmedQuery).map((match) => match.item)
    : [...projectList];

  if (selectedTags.length > 0) {
    searchResults = searchResults.filter((project) => {
      const technologies = project.technologies ?? [];
      return selectedTags.every((requiredTag) => technologies.includes(requiredTag));
    });
  }

  return searchResults;
}

export default function Projects() {
  useDocumentTitle(
    'Projects — Akash Kundu',
    'Flagship AI systems, medical screening platforms, and consensus clustering research.'
  );

  const { projects = [] } = useData();
  const containerRef = useRevealChildren();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allTechnologies = useMemo(
    () => extractAllTechnologies(projects),
    [projects]
  );

  const fuseInstance = useMemo(
    () => new Fuse(projects, FUSE_OPTIONS),
    [projects]
  );

  const filteredProjects = useMemo(
    () => filterProjects(projects, searchQuery, selectedTags, fuseInstance),
    [projects, searchQuery, selectedTags, fuseInstance]
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = sanitizeSearchQuery(event.target.value);
    setSearchQuery(cleanValue);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedTags.length > 0;

  return (
    <PageTransition>
      <section className="section" style={{ paddingTop: '96px' }} ref={containerRef}>
        <div className="container">
          <div className="label reveal">portfolio &amp; systems</div>
          <h1 className="reveal heading-lg" style={{ marginBottom: '12px', maxWidth: '28ch' }}>
            Production &amp; Research Systems.
          </h1>
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

          {/* Search & Tag Filter Bar */}
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
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search projects by tech, architecture, or title..."
                value={searchQuery}
                maxLength={MAX_SEARCH_LENGTH}
                onChange={handleQueryChange}
                aria-label="Search projects"
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
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="tag tag-active"
                  style={{ cursor: 'pointer' }}
                >
                  Clear filters ✕
                </button>
              )}
            </div>

            {/* Tag Selection Chips */}
            {allTechnologies.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {allTechnologies.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`tag${isSelected ? ' tag-active' : ''}`}
                      style={{
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      aria-pressed={isSelected}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            )}
          </LiquidGlassLens>

          {/* Filter Status Badge */}
          {hasActiveFilters && (
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
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} matched
            </div>
          )}

          {/* Filtered Project Cards List */}
          {filteredProjects.length > 0 ? (
            <div
              className="stagger"
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {filteredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className="row-card reveal"
                  style={{ '--i': index, padding: '20px 24px' } as React.CSSProperties}
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
                          flexWrap: 'wrap',
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
                          {project.year}
                        </span>
                        {project.status && <span className="tag">{project.status}</span>}
                        {project.screenshots && project.screenshots.length > 0 && (
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
                        {project.liveLink && (
                          <span
                            className="tag"
                            style={{
                              borderColor: 'var(--success)',
                              color: 'var(--success)',
                              background: 'rgba(109, 235, 170, 0.1)',
                            }}
                          >
                            Live ↗
                          </span>
                        )}
                      </div>
                      <h3 style={{ marginBottom: '6px', fontSize: '1rem' }}>
                        <Link
                          to={`/projects/${project.id}`}
                          style={{
                            color: 'var(--ink)',
                            textDecoration: 'none',
                          }}
                        >
                          {project.title}
                        </Link>
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
                        {project.shortDesc}
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
                        {(project.technologies ?? []).map((tech) => (
                          <span
                            key={tech}
                            className={`tag${selectedTags.includes(tech) ? ' tag-active' : ''}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm"
                            style={{ padding: '3px 10px', fontSize: '10px' }}
                          >
                            GitHub ↗
                          </a>
                        )}
                        <Link
                          to={`/projects/${project.id}`}
                          className="btn btn-sm btn-primary"
                          style={{ padding: '3px 10px', fontSize: '10px' }}
                        >
                          Deep Dive →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', marginBottom: '12px' }}>
                No projects matched your criteria.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="btn btn-sm"
                >
                  Clear search &amp; filter criteria
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
