import { useEffect } from 'react';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import { ShinyButton, Tactile3DButton, GlassButton } from '../components/EvilButtons';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

interface ProfileMetadataItem {
  label: string;
  value: string;
  href?: string;
}

interface EngineeringPrinciple {
  id: string;
  title: string;
  description: string;
}

interface CareerMilestone {
  year: string;
  event: string;
  isCurrent?: boolean;
}

const PROFILE_METADATA: readonly ProfileMetadataItem[] = [
  { label: 'Location', value: 'Kolkata, West Bengal (Open to Relocate / Remote)' },
  { label: 'Email', value: 'akashkundu7487@gmail.com', href: 'mailto:akashkundu7487@gmail.com' },
  { label: 'Phone', value: '+91 9064349004', href: 'tel:+919064349004' },
  { label: 'Status', value: 'Open to Full-Time & Pre-Placement Roles (2027)' },
  { label: 'Languages', value: 'Bengali · English · Hindi' },
  { label: 'Education', value: 'B.Tech CSE - Techno India University, 2027' },
];

const ENGINEERING_PRINCIPLES: readonly EngineeringPrinciple[] = [
  {
    id: '01',
    title: 'A model is half the work',
    description:
      'An accurate model nobody can use is not a finished project. I ship the interface alongside the model, not as an afterthought.',
  },
  {
    id: '02',
    title: 'End to end, on purpose',
    description:
      'Understanding a system from data in to pixels out makes the trade-offs at each layer easier to reason about.',
  },
  {
    id: '03',
    title: 'Depth over breadth',
    description:
      'Each project is picked to learn something specific in depth, then documented properly so the learning actually sticks.',
  },
];

const CAREER_TIMELINE: readonly CareerMilestone[] = [
  {
    year: '2023',
    event:
      'Began B.Tech CSE at Techno India University. Built an E2EE Multi-User Chat Application and established foundational web development skills.',
    isCurrent: false,
  },
  {
    year: '2024',
    event:
      'Developed early computer vision models and machine learning benchmarking tools. Completed foundational certifications.',
    isCurrent: false,
  },
  {
    year: '2025',
    event:
      'Architected a full-stack headless CMS (FastAPI + React PWA) powering this portfolio. Engineered OphthalmoAI, a clinical-grade ocular disease prediction ensemble.',
    isCurrent: false,
  },
  {
    year: '2026',
    event:
      'AI Research Intern at Purposive AI, building AI-SATHI: a voice-first LangGraph operating system deployed on Azure. Launched COPPER, a local-first Electron AI OS orchestrating 12 specialized agents (+5 roadmap).',
    isCurrent: true,
  },
  {
    year: '2027',
    event:
      'Expected graduation. Actively seeking AI Engineer / Software Engineer (SWE) roles to build scalable ML systems and agentic workflows.',
    isCurrent: false,
  },
];

const BIO_PARAGRAPHS = [
  'I build agentic AI systems, RAG pipelines, and computer vision models. I got into this because a model that works well in a Jupyter notebook is still a long way from something a person can actually use. Closing that gap — between a trained model and a usable interface — is what my projects are about.',
  'In practice, that means spending time on data prep and model fine-tuning, then just as much time engineering the FastAPI backend, LangGraph state-machines, and Electron/React frontends that sit in front of it.',
  'Currently, I am an AI Research & Social Innovation Intern at Purposive AI, building voice-first Bengali AI tools (AI-SATHI) for rural micro-entrepreneurs, while scaling COPPER, my local-first 12-agent personal AI OS.',
];

export default function About() {
  useDocumentTitle(
    'About — Akash Kundu',
    'Background, engineering principles, and experience of Akash Kundu.'
  );

  const containerRef = useRevealChildren();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <section className="section" ref={containerRef}>
        <div className="container">
          <div className="label reveal">about</div>
          <h1 className="reveal heading-lg" style={{ marginBottom: '48px', maxWidth: '28ch' }}>
            B.Tech CSE student &amp; aspiring AI Engineer / SWE building scalable ML systems and agentic
            workflows.
          </h1>

          {/* Profile Overview & Metadata Grid */}
          <div
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: '260px 1fr',
              gap: '48px',
              alignItems: 'start',
              marginBottom: '64px',
            }}
            id="about-grid"
          >
            {/* Metadata Card */}
            <div className="card card-hover" style={{ padding: 0, overflow: 'hidden' }}>
              {PROFILE_METADATA.map(({ label, value, href }) => (
                <div
                  key={label}
                  style={{ padding: '13px 20px', borderBottom: '1px solid var(--border)' }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      color: 'var(--accent)',
                      marginBottom: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        fontSize: '12px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--ink)',
                        fontWeight: 500,
                      }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontSize: '12px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--ink)',
                        fontWeight: 500,
                      }}
                    >
                      {value}
                    </span>
                  )}
                </div>
              ))}
              <div style={{ padding: '16px 20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <ShinyButton to="/projects" size="sm">
                  Projects →
                </ShinyButton>
                <Tactile3DButton to="/contact" size="sm">
                  Contact
                </Tactile3DButton>
                <GlassButton href="/cv/AkashKundu_CV.pdf" download size="sm">
                  Resume ↓
                </GlassButton>
              </div>
            </div>

            {/* Narrative Bio */}
            <div>
              {BIO_PARAGRAPHS.map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.85,
                    marginBottom: '16px',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--muted)',
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Core Engineering Principles */}
          <div className="reveal" style={{ marginBottom: '64px' }}>
            <div className="label">how I work</div>
            <div
              className="stagger"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}
              id="principles-grid"
            >
              {ENGINEERING_PRINCIPLES.map(({ id, title, description }, index) => (
                <div
                  key={id}
                  className="card card-hover reveal"
                  style={{ padding: '26px 24px', '--i': index } as React.CSSProperties}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: 'var(--accent)',
                      marginBottom: '14px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {id}
                  </div>
                  <h3 style={{ marginBottom: '10px', fontSize: '0.9rem' }}>{title}</h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.75 }}>{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Milestones Timeline */}
          <div className="reveal">
            <div className="label">timeline</div>
            <div className="timeline stagger">
              {CAREER_TIMELINE.map(({ year, event, isCurrent }, index) => (
                <div
                  key={`${year}-${index}`}
                  className={`timeline-item reveal${isCurrent ? ' is-current' : ''}`}
                  style={{ '--i': index } as React.CSSProperties}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: isCurrent ? 'var(--accent)' : 'var(--muted-2)',
                      marginBottom: '6px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {year}
                    {isCurrent && (
                      <span
                        className="tag tag-active"
                        style={{ marginLeft: '8px', fontSize: '9px' }}
                      >
                        now
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.75,
                      maxWidth: '55ch',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media(max-width:860px){#about-grid{grid-template-columns:1fr!important;gap:28px!important}}
        @media(max-width:680px){#principles-grid{grid-template-columns:1fr!important}}
      `}</style>
    </PageTransition>
  );
}
