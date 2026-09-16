import { useEffect } from 'react';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import { skills } from '../data/skills';
import { ShinyButton, Tactile3DButton } from '../components/EvilButtons';

const groupDefs = [
  { name: 'Languages', icon: 'λ', color: '#AFD2FA' },
  { name: 'AI & ML', icon: '◈', color: '#B9915E' },
  { name: 'Backend & DB', icon: '◉', color: '#FEFAEF' },
  { name: 'Full-Stack UI', icon: '◎', color: '#6debaa' },
  { name: 'Cloud & DevOps', icon: '◬', color: '#AFD2FA' },
];

const marqueeSkills = skills.map((s) => s.name);

export default function Skills() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const ref = useRevealChildren();

  const groups = groupDefs
    .map((g) => ({
      ...g,
      items: skills.filter((s) => s.category === g.name).map((s) => s.name),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <PageTransition>
      <section style={{ paddingTop: '88px' }} ref={ref}>
        <div className="container">
          <div className="label reveal">technical stack</div>
          <h2 className="reveal" style={{ marginBottom: '12px', maxWidth: '28ch' }}>
            What I work with day to day.
          </h2>
          <p
            className="reveal"
            style={{
              fontSize: '13px',
              maxWidth: '56ch',
              lineHeight: 1.8,
              marginBottom: '48px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Engineered across the full lifecycle: model fine-tuning, vector pipelines, low-latency FastAPI
            gateways, and responsive reactive interfaces.
          </p>

          <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {groups.map((g, i) => (
              <div
                key={g.name}
                className="card card-hover reveal"
                style={{ padding: '20px 24px', '--i': i }}
              >
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      minWidth: '210px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '30px',
                        height: '30px',
                        background: `${g.color}0e`,
                        border: `1px solid ${g.color}30`,
                        borderRadius: 0,
                        fontSize: '13px',
                        color: g.color,
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {g.icon}
                    </span>
                    <h3 style={{ fontSize: '0.875rem', color: 'var(--ink)' }}>{g.name}</h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', flex: 1 }}>
                    {g.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="reveal"
            style={{
              marginTop: '28px',
              padding: '16px 20px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderLeft: '2px solid var(--accent)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--accent)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginTop: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              PROVEN
            </span>
            <p style={{ fontSize: '12px', lineHeight: 1.75, fontFamily: 'var(--font-mono)' }}>
              Every skill listed above has been validated in production or offline benchmarked pipelines
              (AI-SATHI, COPPER, OphthalmoAI, Portfolio CMS) — backed by passing Pytest suites, Alembic
              migrations, and real latency profiles.
            </p>
          </div>

          <div
            className="reveal"
            style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}
          >
            <ShinyButton to="/projects" size="sm">
              See Projects in Action →
            </ShinyButton>
            <Tactile3DButton to="/contact" size="sm">
              Discuss Tech Requirements
            </Tactile3DButton>
          </div>

          <div className="reveal marquee-wrap" style={{ marginTop: '48px' }}>
            <div className="marquee-track">
              {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
                <span
                  key={s + i}
                  className="marquee-item"
                  style={{
                    color: i % 2 === 0 ? 'var(--link)' : 'var(--accent)',
                  }}
                >
                  <span className="marquee-diamond">◆</span>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
