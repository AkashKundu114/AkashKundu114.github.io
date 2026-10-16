import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DataProvider } from '../context/DataContext';
import Projects from '../pages/Projects';

describe('Projects Page Component', () => {
  const renderProjectsPage = () => {
    return render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <DataProvider>
          <Projects />
        </DataProvider>
      </MemoryRouter>
    );
  };

  it('renders H1 landmark heading and all projects', () => {
    renderProjectsPage();

    const h1Heading = screen.getByRole('heading', { level: 1 });
    expect(h1Heading).toHaveTextContent(/Production & Research Systems/i);

    // Verify all 3 flagship projects appear
    expect(screen.getByText(/C.O.P.P.E.R./i)).toBeInTheDocument();
    expect(screen.getByText(/OphthalmoAI/i)).toBeInTheDocument();
    expect(screen.getByText(/Inductive Consensus Clustering \(ICC-v2\)/i)).toBeInTheDocument();
  });

  it('filters projects by search input', () => {
    renderProjectsPage();

    const searchInput = screen.getByPlaceholderText(/Search projects by tech/i);
    fireEvent.change(searchInput, { target: { value: 'Consensus' } });

    expect(screen.getByText(/Inductive Consensus Clustering \(ICC-v2\)/i)).toBeInTheDocument();
  });

  it('clears active filters when clear button is clicked', () => {
    renderProjectsPage();

    const searchInput = screen.getByPlaceholderText(/Search projects by tech/i);
    fireEvent.change(searchInput, { target: { value: 'Consensus' } });

    const clearButton = screen.getByRole('button', { name: /Clear filters/i });
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue('');
    expect(screen.getByText(/C.O.P.P.E.R./i)).toBeInTheDocument();
    expect(screen.getByText(/OphthalmoAI/i)).toBeInTheDocument();
  });
});
