import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#/';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            textAlign: 'center',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '560px',
              padding: '36px',
              borderColor: 'var(--danger-soft)',
              background: 'var(--surface)',
            }}
          >
            <div className="label" style={{ color: 'var(--danger)', justifyContent: 'center' }}>
              RUNTIME EXCEPTION CAUGHT
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '14px', color: 'var(--ink)' }}>
              Component Render Failure
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--muted)',
                marginBottom: '24px',
                lineHeight: 1.6,
              }}
            >
              {this.state.error?.message || 'An unexpected rendering error occurred in this view.'}
            </p>
            <button
              onClick={this.handleReset}
              className="btn btn-primary"
              style={{ cursor: 'pointer' }}
            >
              Reload Interface
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
