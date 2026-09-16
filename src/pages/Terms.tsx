import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import LiquidGlassLens from '../components/LiquidGlassLens';
import { ShinyButton, Tactile3DButton, GlassButton } from '../components/EvilButtons';

export default function Terms() {
  const location = useLocation();
  const ref = useRevealChildren();

  useEffect(() => {
    if (location.hash === '#medical-disclaimer' || location.hash === '#clinical') {
      const el = document.getElementById('medical-disclaimer');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location]);

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
            <span style={{ color: 'var(--accent)' }}>Terms &amp; Conditions</span>
          </div>

          <div className="label" style={{ marginBottom: '8px' }}>
            // TERMS OF SERVICE &amp; STATUTORY DISCLAIMERS
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
            Terms &amp; Conditions
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
            Permitted usage, open-source licensing, and statutory clinical/assistive AI disclaimers
            governing this portfolio, the local-first automation of <strong>COPPER</strong>, the assistive pipelines
            of <strong>AI-SATHI</strong>, and the academic computer vision research of <strong>OphthalmoAI</strong>.
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
            <span style={{ color: 'var(--muted-2)' }}>Looking for data governance?</span>
            <Link to="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
              Read Privacy Policy →
            </Link>
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Section 1 */}
          <LiquidGlassLens preset="subtle">
            <div style={{ padding: '28px' }}>
              <div className="label" style={{ marginBottom: '12px' }}>
                SECTION 1.0 // ACCEPTANCE &amp; PERMITTED USE
              </div>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: 'var(--ink)',
                }}
              >
                1. Scope of Service &amp; Permitted Access
              </h2>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.8,
                  color: 'var(--ink-2)',
                  marginBottom: '14px',
                }}
              >
                By accessing <code>akashkundu.me</code>, exploring engineering blueprints, reviewing source repositories,
                or evaluating interactive demonstrations, you acknowledge and agree to comply with these Terms and Conditions.
                This platform is the engineering portfolio and academic research showcase of Akash Kundu (Full-Stack Engineer &amp; AI Researcher).
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)' }}>
                All software benchmarks, architecture schematics, and live demos are published strictly for technical evaluation,
                hiring review, and educational inquiry. Commercial redistribution or mass automated scraping without explicit
                written consent is prohibited.
              </p>
            </div>
          </LiquidGlassLens>

          {/* Section 2 */}
          <div className="card" style={{ padding: '28px' }}>
            <div className="label" style={{ marginBottom: '12px' }}>
              SECTION 2.0 // INTELLECTUAL PROPERTY &amp; OPEN SOURCE
            </div>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--ink)',
              }}
            >
              2. Open-Source Licensing &amp; Attribution
            </h2>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.8,
                color: 'var(--ink-2)',
                marginBottom: '14px',
              }}
            >
              Unless explicitly identified as proprietary partner or client intellectual property (e.g. Purposive AI enterprise components),
              the software projects featured across this portfolio are authored by Akash Kundu and distributed under permissive
              open-source licenses (MIT or Apache 2.0) via{' '}
              <a href="https://github.com/AkashKundu114" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                GitHub
              </a>.
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)' }}>
              <li><strong>Author Attribution:</strong> Permissive licenses require that original author notices and copyright disclaimers remain intact when adapting or forking codebases.</li>
              <li><strong>No Commercial Warranty:</strong> All open-source repositories, Jupyter notebooks, and Docker images are provided &ldquo;AS IS&rdquo; without warranty of merchantability or fitness for a particular purpose.</li>
            </ul>
          </div>

          {/* Section 3: CRITICAL MEDICAL DISCLAIMER (OPHTHALMOAI) */}
          <div
            id="medical-disclaimer"
            className="card"
            style={{
              padding: '28px',
              border: '1px solid rgba(229, 115, 115, 0.45)',
              background: 'rgba(229, 115, 115, 0.06)',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#E57373',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '10px',
                fontWeight: 700,
              }}
            >
              SECTION 3.0 // STATUTORY MEDICAL &amp; CLINICAL AI DISCLAIMER
            </div>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 800,
                marginBottom: '14px',
                color: 'var(--ink)',
              }}
            >
              3. OphthalmoAI: Academic Research Only — Not a Certified Medical Device
            </h2>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.85,
                color: 'var(--ink-2)',
                marginBottom: '16px',
              }}
            >
              <strong>OphthalmoAI</strong> is an academic computer science research system engineered to evaluate deep learning
              vision backbones (ConvNeXt-Small, DenseNet-201, and EfficientNet-V2-M) and explainable visual attention (Grad-CAM).
            </p>
            <div
              style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '16px 20px',
                borderLeft: '4px solid #E57373',
                marginBottom: '16px',
                fontSize: '13px',
                lineHeight: 1.75,
                color: '#FEFAEF',
                fontFamily: 'var(--font-mono)',
              }}
            >
              CRITICAL NOTICE: OphthalmoAI is NOT certified as Software as a Medical Device (SaMD) by the United States Food
              and Drug Administration (FDA), European Medicines Agency (CE Mark), or the Indian Central Drugs Standard Control
              Organization (CDSCO). It must NEVER be used for clinical diagnosis, patient triage, surgical planning, or prescribing treatment.
            </div>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.8,
                color: 'var(--ink-2)',
                marginBottom: '14px',
              }}
            >
              <strong>Grad-CAM Saliency Maps:</strong> The Grad-CAM attention heatmaps generated by the pipeline highlight convolutional
              activation gradient intensity for academic interpretability. They do not represent histological examinations, optical coherence
              tomography (OCT), or certified slit-lamp biomicroscopy.
            </p>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)', marginBottom: '16px' }}>
              <strong>Emergency Care Directive:</strong> If you or someone you know is experiencing ocular pain, visual changes, sudden onset
              of floaters, or physical injury, seek immediate clinical evaluation from a licensed ophthalmologist or emergency medical facility.
            </p>
            <Tactile3DButton to="/projects/eye-disease-predictor" size="sm" variant="secondary">
              View OphthalmoAI Engineering Specs ↗
            </Tactile3DButton>
          </div>

          {/* Section 4 */}
          <div className="card" style={{ padding: '28px' }}>
            <div className="label" style={{ marginBottom: '12px' }}>
              SECTION 4.0 // ASSISTIVE AI &amp; SYSTEM AUTOMATION
            </div>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--ink)',
              }}
            >
              4. Generative AI &amp; Desktop Automation Limitations
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginTop: '12px',
              }}
            >
              <div style={{ background: 'var(--surface-2)', padding: '18px', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--accent)', marginBottom: '8px' }}>
                  AI-SATHI (Voice-Ledger Assistant)
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-2)' }}>
                  Spoken Bengali voice-to-text transcripts and PDF ledger reports generated via Sarvam AI and Ollama
                  are strictly assistive. Self-Help Group coordinators and entrepreneurs must verify ledger line items
                  before submitting reports to microfinance or banking institutions.
                </p>
              </div>

              <div style={{ background: 'var(--surface-2)', padding: '18px', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--accent)', marginBottom: '8px' }}>
                  COPPER (Local-First AI OS)
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-2)' }}>
                  COPPER integrates the Guardian Alignment Engine to intercept destructive terminal commands with 0.002ms latency.
                  However, local system actions, file modifications, and CLI executions on the user host machine remain subject to
                  user review and developer discretion.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="card" style={{ padding: '28px' }}>
            <div className="label" style={{ marginBottom: '12px' }}>
              SECTION 5.0 // LIMITATION OF LIABILITY
            </div>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                marginBottom: '12px',
                color: 'var(--ink)',
              }}
            >
              5. Limitation of Liability &amp; Disclaimers
            </h2>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'var(--ink-2)' }}>
              In no event shall Akash Kundu be liable for any direct, indirect, special, incidental, or consequential damages
              arising from the use, interpretation, execution, or inability to use the software, research demonstrations, or
              architectural documentation published across this website.
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
              NEED LEGAL OR ETHICS CLARIFICATION?
            </div>
            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
              Inquiries regarding academic licensing, code reuse, or clinical research collaborations.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <ShinyButton href="mailto:akashkundu7487@gmail.com" size="sm" variant="primary">
              Contact Akash ↗
            </ShinyButton>
            <GlassButton to="/privacy" size="sm">
              View Privacy Policy →
            </GlassButton>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
