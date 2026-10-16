import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ShinyButton } from '../components/EvilButtons';

export default function NotFound() {
  useDocumentTitle('404 Not Found', 'The requested page could not be found.');

  return (
    <PageTransition>
      <section
        className="section"
        style={{
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '120px',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <div className="label" style={{ justifyContent: 'center' }}>
            {'ERROR 404 // ROUTE NOT FOUND'}
          </div>
          <h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              marginBottom: '20px',
              color: 'var(--ink)',
            }}
          >
            404
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: 'var(--muted)',
              lineHeight: 1.8,
              marginBottom: '36px',
            }}
          >
            The requested trajectory does not exist or has been shifted in the local coordinate
            space.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <ShinyButton to="/" size="md">
              ← Return Home
            </ShinyButton>
            <Link to="/projects" className="btn btn-secondary">
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
