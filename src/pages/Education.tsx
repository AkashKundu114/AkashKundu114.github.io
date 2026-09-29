import { useEffect, useMemo } from 'react';
import { education, EducationItem } from '../data/education';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';

interface EducationStatCard {
  label: string;
  value: string;
  sub: string;
  accent: string;
}

/**
 * Derives summary metrics from education records with safe fallbacks.
 */
function extractEducationStats(items: readonly EducationItem[]): EducationStatCard[] {
  if (!items || items.length === 0) {
    return [
      { label: 'Completed Semesters', value: '-', sub: 'No records', accent: 'var(--link)' },
      { label: 'Cumulative GPA', value: '-', sub: 'No records', accent: 'var(--accent)' },
      { label: 'Secondary Score', value: '-', sub: 'No records', accent: 'var(--muted)' },
    ];
  }

  const currentProgram = items.find((item) => Boolean(item.current));
  const secondaryRecord = items.find((item) => item.id === 3);

  const parsedCgpaMatch = currentProgram?.grade ? currentProgram.grade.match(/[\d.]+/) : null;
  const cumulativeGpa = parsedCgpaMatch ? parsedCgpaMatch[0] : (currentProgram?.grade ?? '7.59');

  return [
    {
      label: 'Completed Semesters',
      value: '6th',
      sub: 'of 8 total',
      accent: 'var(--link)',
    },
    {
      label: 'Cumulative GPA',
      value: cumulativeGpa,
      sub: 'out of 10.0 (till 6th sem)',
      accent: 'var(--accent)',
    },
    {
      label: 'Secondary Score',
      value: secondaryRecord?.grade ?? '-',
      sub: secondaryRecord ? `AISSE ${secondaryRecord.endYear}` : 'Secondary School',
      accent: 'var(--muted)',
    },
  ];
}

export default function Education() {
  const containerRef = useRevealChildren();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const statCards = useMemo(() => extractEducationStats(education), []);

  return (
    <PageTransition>
      <section className="section" ref={containerRef}>
        <div className="container">
          <div className="label reveal">education</div>
          <h2 className="reveal" style={{ marginBottom: '0.85rem', maxWidth: '32ch' }}>
            Academic background.
          </h2>
          <p
            className="reveal"
            style={{ fontSize: '0.95rem', maxWidth: '56ch', lineHeight: 1.8, marginBottom: '3rem' }}
          >
            Computer science fundamentals, with a consistent academic record.
          </p>

          <div className="timeline stagger">
            {education.map((item, index) => (
              <div
                key={item.id}
                className={`timeline-item reveal${item.current ? ' is-current' : ''}`}
                style={{ '--i': index } as React.CSSProperties}
              >
                <div
                  style={{
                    marginBottom: '0.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: item.current ? 'var(--accent)' : 'var(--muted-2)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {item.startYear} - {item.endYear}
                  </span>
                  {item.current && <span className="tag tag-active">Current</span>}
                </div>
                <h3 style={{ marginBottom: '0.25rem', color: 'var(--ink)' }}>{item.degree}</h3>
                <p style={{ fontSize: '0.88rem', marginBottom: '0.15rem' }}>{item.institution}</p>
                <p style={{ fontSize: '0.78rem', marginBottom: '0.6rem', color: 'var(--muted-2)' }}>
                  {item.location}
                </p>
                {item.grade && <span className="tag">{item.grade}</span>}
              </div>
            ))}
          </div>

          <div
            className="reveal stagger"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              marginTop: '3rem',
            }}
            id="edu-stats"
          >
            {statCards.map((stat, index) => (
              <div
                key={stat.label}
                className="card card-hover reveal"
                style={{
                  padding: '24px',
                  borderTop: `2px solid ${stat.accent}`,
                  '--i': index,
                } as React.CSSProperties}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--muted-2)',
                    marginBottom: '8px',
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1.9rem',
                    color: 'var(--ink)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--muted-2)',
                    marginTop: '5px',
                  }}
                >
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`@media(max-width:680px){#edu-stats{grid-template-columns:1fr!important}}`}</style>
    </PageTransition>
  );
}
