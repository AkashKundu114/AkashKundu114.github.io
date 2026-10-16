import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { categoryColors, Certificate } from '../data/certificates';
import { useRevealChildren } from '../hooks/useScrollReveal';
import PageTransition from '../components/PageTransition';
import { sanitizeUrl } from '../utils/security';

interface MetadataRow {
  label: string;
  value: string;
}

/**
 * Builds display metadata rows for a certificate, filtering out undefined or empty values.
 */
function extractCertificateMetadata(cert: Certificate): MetadataRow[] {
  const candidateRows: Array<{ label: string; value: string | undefined | null }> = [
    { label: 'Issued by', value: cert.issuer },
    { label: 'Date', value: cert.date },
    { label: 'Credential ID', value: cert.credentialId },
  ];

  return candidateRows
    .filter((row): row is MetadataRow => typeof row.value === 'string' && row.value.trim().length > 0)
    .map((row) => ({ label: row.label, value: row.value.trim() }));
}

export default function CertificateDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRevealChildren();
  const { certificates } = useData();
  const [isZoomed, setIsZoomed] = useState(false);

  const sanitizedId = typeof id === 'string' ? id.trim() : '';
  const currentCert = useMemo(
    () => (sanitizedId ? certificates.find((item) => item.id === sanitizedId) : undefined),
    [certificates, sanitizedId]
  );

  const closeZoom = useCallback(() => {
    setIsZoomed(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sanitizedId]);

  useEffect(() => {
    if (!isZoomed) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed, closeZoom]);

  if (!currentCert) {
    return (
      <PageTransition>
        <section className="section" style={{ paddingTop: '100px', minHeight: '60vh' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '520px' }}>
            <div className="label" style={{ marginBottom: '12px', color: 'var(--danger)' }}>
              404 // NOT FOUND
            </div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>
              Certificate Not Found
            </h2>
            <p style={{ marginBottom: '24px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted-2)' }}>
              The certificate credential you requested could not be located in the verification registry.
            </p>
            <Link to="/certificates" className="btn btn-primary">
              ← Return to Certificates
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  const badgeColor = categoryColors[currentCert.category] || '#5C6A99';
  const metadataRows = extractCertificateMetadata(currentCert);
  const coveredSkills = Array.isArray(currentCert.skills) ? currentCert.skills : [];
  const isPdfDocument = Boolean(currentCert.file?.toLowerCase().endsWith('.pdf'));

  return (
    <PageTransition>
      {isZoomed && currentCert.image && (
        <div
          className="lightbox-overlay"
          onClick={closeZoom}
          role="dialog"
          aria-modal="true"
          aria-label={`${currentCert.title} Zoomed Preview`}
        >
          <div
            style={{ position: 'relative', maxWidth: '92vw', maxHeight: '90vh' }}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={currentCert.image}
              alt={currentCert.title}
              loading="lazy"
              decoding="async"
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              }}
            />
            <button
              onClick={closeZoom}
              aria-label="Close zoomed certificate preview"
              style={{
                position: 'absolute',
                top: '-32px',
                right: 0,
                background: 'none',
                border: 'none',
                color: 'var(--ink)',
                fontSize: '1.25rem',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <section className="section" ref={containerRef}>
        <div className="container">
          <button
            onClick={() => navigate('/certificates')}
            className="reveal btn btn-sm"
            style={{ marginBottom: '32px' }}
          >
            ← Certificates
          </button>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)',
              gap: '28px',
              alignItems: 'start',
            }}
            id="cert-detail-grid"
          >
            {/* Certificate Media Panel */}
            <div className="reveal">
              {isPdfDocument ? (
                <iframe
                  src={currentCert.file}
                  title={`${currentCert.title} PDF Document`}
                  className="card"
                  style={{
                    width: '100%',
                    height: '540px',
                    border: '1px solid var(--border)',
                    borderRadius: 0,
                  }}
                />
              ) : currentCert.image ? (
                <div
                  className="card card-hover"
                  style={{ overflow: 'hidden', cursor: 'zoom-in', marginBottom: '10px' }}
                  onClick={() => setIsZoomed(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsZoomed(true);
                    }
                  }}
                  aria-label="Expand certificate image"
                >
                  <img
                    src={currentCert.image}
                    alt={currentCert.title}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      display: 'block',
                      objectFit: 'contain',
                      background: 'var(--surface-2)',
                    }}
                  />
                </div>
              ) : (
                <div
                  className="card"
                  style={{ padding: '60px 24px', textAlign: 'center', marginBottom: '10px' }}
                >
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted-2)' }}>
                    No certificate preview image provided.
                  </p>
                </div>
              )}
            </div>

            {/* Certificate Details Column */}
            <div style={{ position: 'sticky', top: '5rem' }}>
              <div className="reveal" style={{ marginBottom: '12px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '3px 11px',
                    background: `${badgeColor}16`,
                    color: badgeColor,
                    border: `1px solid ${badgeColor}35`,
                    borderRadius: 0,
                  }}
                >
                  {currentCert.category}
                </span>
              </div>

              <h1
                className="reveal"
                style={{
                  fontSize: 'clamp(1.3rem, 3.5vw, 1.9rem)',
                  marginBottom: '8px',
                  lineHeight: 1.08,
                }}
              >
                {currentCert.title}
              </h1>
              <p
                className="reveal"
                style={{ fontSize: '13px', marginBottom: '24px', fontFamily: 'var(--font-mono)', color: 'var(--muted-2)' }}
              >
                {currentCert.issuer}
              </p>

              {metadataRows.length > 0 && (
                <div
                  className="reveal card"
                  style={{ padding: 0, overflow: 'hidden', marginBottom: '18px' }}
                >
                  {metadataRows.map(({ label, value }) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '16px',
                        padding: '11px 18px',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9px',
                          fontWeight: 700,
                          color: 'var(--accent)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          flexShrink: 0,
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 500,
                          textAlign: 'right',
                          wordBreak: 'break-all',
                          color: 'var(--ink)',
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {currentCert.description && (
                <div className="reveal" style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '13px', lineHeight: 1.8, fontFamily: 'var(--font-body)', color: 'var(--ink-2)' }}>
                    {currentCert.description}
                  </p>
                </div>
              )}

              {coveredSkills.length > 0 && (
                <div className="reveal" style={{ marginBottom: '22px' }}>
                  <div className="label" style={{ marginBottom: '10px' }}>
                    skills covered
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {coveredSkills.map((skillName) => (
                      <span key={skillName} className="tag">
                        {skillName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div
                className="reveal"
                style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}
              >
                {sanitizeUrl(currentCert.file) && (
                  <a
                    href={sanitizeUrl(currentCert.file)}
                    download
                    className="btn btn-primary"
                    style={{ justifyContent: 'center' }}
                  >
                    Download certificate ↓
                  </a>
                )}
                {sanitizeUrl(currentCert.verifyUrl) && (
                  <a
                    href={sanitizeUrl(currentCert.verifyUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ justifyContent: 'center' }}
                  >
                    Verify credential ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:768px){#cert-detail-grid{grid-template-columns:1fr!important;gap:18px!important}}`}</style>
    </PageTransition>
  );
}
