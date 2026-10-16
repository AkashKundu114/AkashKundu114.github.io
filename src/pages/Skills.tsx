import { useEffect, useMemo } from 'react';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import { skills, Skill } from '../data/skills';
import { ShinyButton, Tactile3DButton } from '../components/EvilButtons';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

interface SkillCategoryDefinition {
  name: string;
  icon: string;
  color: string;
}

interface SkillGroupDisplay extends SkillCategoryDefinition {
  items: string[];
}

const CATEGORY_DEFINITIONS: readonly SkillCategoryDefinition[] = [
  { name: 'Languages', icon: 'λ', color: '#AFD2FA' },
  { name: 'AI & ML', icon: '◈', color: '#B9915E' },
  { name: 'Backend & DB', icon: '◉', color: '#FEFAEF' },
  { name: 'Full-Stack UI', icon: '◎', color: '#6debaa' },
  { name: 'Cloud & DevOps', icon: '◬', color: '#AFD2FA' },
];

function buildSkillGroups(
  allSkills: readonly Skill[],
  definitions: readonly SkillCategoryDefinition[]
): SkillGroupDisplay[] {
  if (!allSkills || allSkills.length === 0) {
    return [];
  }

  return definitions
    .map((category) => {
      const categorySkills = allSkills
        .filter((skill) => skill.category === category.name)
        .map((skill) => skill.name);

      return {
        ...category,
        items: categorySkills,
      };
    })
    .filter((group) => group.items.length > 0);
}

export default function Skills() {
  useDocumentTitle(
    'Skills — Akash Kundu',
    'Technical stack, languages, AI frameworks, and engineering tools.'
  );

  const containerRef = useRevealChildren();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skillGroups = useMemo(() => buildSkillGroups(skills, CATEGORY_DEFINITIONS), []);

  const marqueeSkills = useMemo(
    () => (skills && skills.length > 0 ? skills.map((skill) => skill.name) : []),
    []
  );

  return (
    <PageTransition>
      <section style={{ paddingTop: '88px' }} ref={containerRef}>
        <div className="container">
          <div className="label reveal">technical stack</div>
          <h1 className="reveal heading-lg" style={{ marginBottom: '12px', maxWidth: '28ch' }}>
            What I work with day to day.
          </h1>
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
            Engineered across the full lifecycle: model fine-tuning, vector pipelines, low-latency
            FastAPI gateways, and responsive reactive interfaces.
          </p>

          {skillGroups.length > 0 ? (
            <div
              className="stagger"
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {skillGroups.map((group, groupIndex) => (
                <div
                  key={group.name}
                  className="card card-hover reveal"
                  style={{ padding: '20px 24px', '--i': groupIndex } as React.CSSProperties}
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
                          background: `${group.color}0e`,
                          border: `1px solid ${group.color}30`,
                          borderRadius: 0,
                          fontSize: '13px',
                          color: group.color,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {group.icon}
                      </span>
                      <h3 style={{ fontSize: '0.875rem', color: 'var(--ink)' }}>{group.name}</h3>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', flex: 1 }}>
                      {group.items.map((itemName) => (
                        <span key={itemName} className="tag">
                          {itemName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ padding: '36px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                No technical skills configured.
              </p>
            </div>
          )}

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
              Every skill listed above has been validated in production or offline benchmarked
              pipelines (AI-SATHI, COPPER, OphthalmoAI, Portfolio CMS) — backed by passing Pytest
              suites, Alembic migrations, and real latency profiles.
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

          {marqueeSkills.length > 0 && (
            <div className="reveal marquee-wrap" style={{ marginTop: '48px' }}>
              <div className="marquee-track">
                {[...marqueeSkills, ...marqueeSkills].map((skillName, marqueeIndex) => (
                  <span
                    key={`${skillName}-${marqueeIndex}`}
                    className="marquee-item"
                    style={{
                      color: marqueeIndex % 2 === 0 ? 'var(--link)' : 'var(--accent)',
                    }}
                  >
                    <span className="marquee-diamond">◆</span>
                    {skillName}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
