import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';

const meta = [
  { key: 'Location', val: 'Kolkata, West Bengal' },
  { key: 'Email', val: 'akashkundu7487@gmail.com', link: 'mailto:akashkundu7487@gmail.com' },
  { key: 'Phone', val: '+91 9064349004', link: 'tel:+919064349004' },
  { key: 'Status', val: 'Open to internships' },
  { key: 'Languages', val: 'Bengali · English · Hindi' },
  { key: 'Education', val: 'B.Tech CSE — Techno India University, 2027' },
];

const principles = [
  {
    id: '01',
    title: 'A model is half the work',
    desc: 'An accurate model nobody can use is not a finished project. I ship the interface alongside the model, not as an afterthought.',
  },
  {
    id: '02',
    title: 'End to end, on purpose',
    desc: 'Understanding a system from data in to pixels out makes the trade-offs at each layer easier to reason about.',
  },
  {
    id: '03',
    title: 'Depth over breadth',
    desc: 'Each project is picked to learn something specific in depth, then documented properly so the learning actually sticks.',
  },
];

const timeline = [
  {
    year: '2023',
    event:
      'Began B.Tech CSE at Techno India University. Built an E2EE Multi-User Chat Application and established foundational web development skills.',
    current: false,
  },
  {
    year: '2024',
    event:
      'Developed early computer vision models and machine learning benchmarking tools. Completed foundational certifications.',
    current: false,
  },
  {
    year: '2025',
    event:
      'Architected a full-stack headless CMS (FastAPI + React PWA) powering this portfolio. Engineered OphthalmoAI, a clinical-grade ocular disease prediction ensemble.',
    current: false,
  },
  {
    year: '2026',
    event:
      'AI Research Intern at Purposive AI, building AI-SATHI: a voice-first LangGraph operating system deployed on Azure. Launched COPPER, a local-first Electron AI OS orchestrating 30 specialized agents.',
    current: true,
  },
  {
    year: '2027',
    event:
      'Expected graduation. Actively seeking AI Engineer / Software Engineer (SWE) roles to build scalable ML systems and agentic workflows.',
    current: false,
  },
];

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const ref = useRevealChildren();
  return (
    <PageTransition>
      <section className="section" ref={ref}>
        <div className="container">
          <div className="label reveal">about</div>
          <h2 className="reveal" style={{ marginBottom: '48px', maxWidth: '28ch' }}>
            B.Tech CSE student & aspiring AI Engineer / SWE building scalable ML systems and agentic
            workflows.
          </h2>

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
            <div className="card card-hover" style={{ padding: 0, overflow: 'hidden' }}>
              {meta.map(({ key, val, link }) => (
                <div
                  key={key}
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
                    {key}
                  </div>
                  {link ? (
                    <a
                      href={link}
                      style={{
                        fontSize: '12px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--ink)',
                        fontWeight: 500,
                      }}
                    >
                      {val}
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
                      {val}
                    </span>
                  )}
                </div>
              ))}
              <div style={{ padding: '14px 20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Link to="/projects" className="btn btn-primary btn-sm">
                  Projects
                </Link>
                <Link to="/contact" className="btn btn-sm">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              {[
                'I build agentic AI systems, RAG pipelines, and computer vision models. I got into this because a model that works well in a Jupyter notebook is still a long way from something a person can actually use. Closing that gap — between a trained model and a usable interface — is what my projects are about.',
                'In practice, that means spending time on data prep and model fine-tuning, then just as much time engineering the FastAPI backend, LangGraph state-machines, and Electron/React frontends that sit in front of it.',
                'Currently, I am an AI Research & Social Innovation Intern at Purposive AI, building voice-first Bengali AI tools (AI-SATHI) for rural micro-entrepreneurs, while scaling COPPER, my local-first 30-agent personal AI OS.',
              ].map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.85,
                    marginBottom: '16px',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--muted)',
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ marginBottom: '64px' }}>
            <div className="label">how I work</div>
            <div
              className="stagger"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}
              id="principles-grid"
            >
              {principles.map(({ id, title, desc }, i) => (
                <div
                  key={id}
                  className="card card-hover reveal"
                  style={{ padding: '26px 24px', '--i': i }}
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
                  <p style={{ fontSize: '13px', lineHeight: 1.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="label">timeline</div>
            <div className="timeline stagger">
              {timeline.map(({ year, event, current }, i) => (
                <div
                  key={year + event}
                  className={`timeline-item reveal${current ? ' is-current' : ''}`}
                  style={{ '--i': i }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: current ? 'var(--accent)' : 'var(--muted-2)',
                      marginBottom: '6px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {year}
                    {current && (
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
