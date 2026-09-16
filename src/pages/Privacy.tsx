import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import LiquidGlassLens from '../components/LiquidGlassLens';
import { ShinyButton, GlassButton } from '../components/EvilButtons';

export default function Privacy() {
  const ref = useRevealChildren();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="container" style={{ padding: '80px 2rem 100px' }} ref={ref}>
        {/* Header Breadcrumb & Title */}
        <div className="reveal" style={{ maxWidth: '820px', marginBottom: '36px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--muted-2)',
              marginBottom: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <Link to="/" style={{ color: 'var(--muted-2)', textDecoration: 'none' }}>
              Home
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--accent)' }}>Privacy Policy</span>
          </div>

          <div className="label" style={{ marginBottom: '8px' }}>
            // DATA GOVERNANCE &amp; PRIVACY COMMITMENT
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '16px',
              color: 'var(--ink)',
            }}
          >
            Privacy Policy
          </h1>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'var(--ink-2)',
              fontFamily: 'var(--font-body)',
              maxWidth: '700px',
              marginBottom: '20px',
            }}
          >
            Data governance, local-first offline processing standards, and medical de-identification principles
            governing this portfolio, the privacy-first architecture of <strong>COPPER</strong>, the ephemeral audio handling of{' '}
            <strong>AI-SATHI</strong>, and the clinical research guidelines of <strong>OphthalmoAI</strong>.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 16px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            }}
          >
            <span style={{ color: 'var(--muted-2)' }}>Looking for terms &amp; medical disclaimers?</span>
            <Link to="/terms" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
              Read Terms &amp; Conditions →
            </Link>
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Section 1 */}
          <LiquidGlassLens preset="subtle">
            <div style={{ padding: '28px' }}>
              <div className="label" style={{ marginBottom: '12px' }}>
                SECTION 1.0 // PORTFOLIO DATA PRACTICES
              </div>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: 'var(--ink)',
                }}
              >
                1. Zero-Tracking &amp; Telemetry-Free Architecture
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.8,
                  color: 'var(--ink-2)',
                  marginBottom: '14px',
                }}
              >
                This portfolio (<code>akashkundu.me</code>) is built with strict privacy-by-design standards:
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)' }}>
                <li><strong>No Invasive Web Trackers:</strong> We do not deploy Google Analytics, Meta Pixel, Hotjar, or third-party marketing tags.</li>
                <li><strong>No Commercial Monetization:</strong> We do not collect, trade, or monetize your browser data or browsing session history.</li>
                <li><strong>No User Fingerprinting:</strong> IP addresses and canvas fingerprinting vectors are never captured or retained.</li>
              </ul>
            </div>
          </LiquidGlassLens>

          {/* Section 2 */}
          <div className="card" style={{ padding: '28px' }}>
            <div className="label" style={{ marginBottom: '12px' }}>
              SECTION 2.0 // LOCAL-FIRST ARCHITECTURE (COPPER)
            </div>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--ink)',
              }}
            >
              2. COPPER AI OS: 100% Offline &amp; Epistemic Privacy
            </h2>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.8,
                color: 'var(--ink-2)',
                marginBottom: '14px',
              }}
            >
              Unlike traditional cloud assistants, <strong>COPPER</strong> was explicitly engineered to prevent data leakage and telemetry surveillance:
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px',
                marginTop: '12px',
              }}
            >
              <div style={{ padding: '16px', border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--accent)', marginBottom: '6px' }}>
                  Zero Cloud Sync
                </div>
                <div style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                  Epistemic long-term memory, session state, and vector embeddings are persisted strictly within local SQLite databases
                  and ChromaDB instances on the user&apos;s physical disk. No memories are synced to remote cloud infrastructure.
                </div>
              </div>

              <div style={{ padding: '16px', border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--accent)', marginBottom: '6px' }}>
                  Local Foundation Models
                </div>
                <div style={{ fontSize: '12px', color: 'var(--ink-2)', lineHeight: 1.65 }}>
                  Inference executes completely offline via Ollama (Qwen2.5-Coder, DeepSeek-R1-Distill). User queries, source code, and
                  prompts never travel over the internet to commercial AI API vendors.
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="card" style={{ padding: '28px' }}>
            <div className="label" style={{ marginBottom: '12px' }}>
              SECTION 3.0 // HEALTHCARE &amp; CLINICAL DATA STANDARDS
            </div>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--ink)',
              }}
            >
              3. OphthalmoAI Patient Data &amp; De-Identification
            </h2>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.8,
                color: 'var(--ink-2)',
                marginBottom: '14px',
              }}
            >
              The development and evaluation of <strong>OphthalmoAI</strong> adheres strictly to biomedical ethics principles aligned with HIPAA Safe Harbor and the Indian Digital Personal Data Protection Act (DPDPA):
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)' }}>
              <li>
                <strong>Public Benchmarks Only:</strong> The ensemble meta-classifier was trained and validated exclusively on 5,663
                pre-anonymized, de-identified clinical fundus datasets from publicly licensed academic repositories.
              </li>
              <li>
                <strong>No Live Endpoint Retention:</strong> Any sample fundus image uploaded to the demonstration API for Grad-CAM evaluation is
                processed exclusively in volatile RAM and immediately purged upon response delivery. No images are saved to cloud buckets or databases.
              </li>
              <li>
                <strong>Zero Protected Health Information (PHI):</strong> No patient names, hospital identifiers, medical record numbers (MRNs),
                or demographic metadata are ever accepted or stored.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="card" style={{ padding: '28px' }}>
            <div className="label" style={{ marginBottom: '12px' }}>
              SECTION 4.0 // PILOT VOICE NOTE HANDLING
            </div>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--ink)',
              }}
            >
              4. AI-SATHI Spoken Audio Ephemeral Protocol
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)' }}>
              During the 100-user, 2,000 msg/day field pilot supporting rural Self-Help Group (SHG) micro-entrepreneurs in West Bengal,
              spoken Bengali audio notes delivered via WhatsApp were processed via ephemeral streaming. Speech-to-text conversion
              isolated the ledger numbers, after which the raw voice streams were immediately destroyed to ensure zero biometric voiceprint retention.
            </p>
          </div>

          {/* Section 5 */}
          <div className="card" style={{ padding: '28px' }}>
            <div className="label" style={{ marginBottom: '12px' }}>
              SECTION 5.0 // CACHING &amp; STORAGE
            </div>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--ink)',
              }}
            >
              5. Progressive Web App (PWA) Caching &amp; LocalStorage
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)' }}>
              This website operates as an installable Progressive Web App (PWA). Workbox service workers cache application assets for
              fast offline loading. LocalStorage is used exclusively for:
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)', marginTop: '8px' }}>
              <li>Preserving your selected interface theme (e.g. <code>theme-1</code>, <code>theme-2</code>).</li>
              <li>Storing administrative authentication session tokens for portfolio content updates.</li>
            </ul>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)', marginTop: '8px' }}>
              No marketing cookies, session trackers, or third-party storage vectors are utilized.
            </p>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div
          className="reveal"
          style={{
            marginTop: '48px',
            padding: '24px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', marginBottom: '4px' }}>
              QUESTIONS REGARDING DATA GOVERNANCE?
            </div>
            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
              Reach out for data privacy inquiries, code removal, or research verification.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <ShinyButton href="mailto:akashkundu7487@gmail.com" size="sm" variant="primary">
              Contact Akash ↗
            </ShinyButton>
            <GlassButton to="/terms" size="sm">
              View Terms &amp; Conditions →
            </GlassButton>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
