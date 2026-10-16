import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

function ProblemChild({ shouldThrow }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('Simulated component crash');
  }
  return <div>Component rendered normally</div>;
}

describe('ErrorBoundary Component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Component rendered normally')).toBeInTheDocument();
  });

  it('catches render errors and displays fallback UI', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Component Render Failure')).toBeInTheDocument();
    expect(screen.getByText(/Simulated component crash/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reload Interface/i })).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
