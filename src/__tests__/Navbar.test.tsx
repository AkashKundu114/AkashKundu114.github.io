import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '../context/ThemeContext';

describe('Navbar Component', () => {
  beforeEach(() => {
    window.scrollY = 0;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderNavbar = (initialEntries = ['/']) => {
    return render(
      <ThemeProvider>
        <MemoryRouter
          initialEntries={initialEntries}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Navbar />
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  it('renders brand logo initials and name linking to home', () => {
    const { getByText } = renderNavbar();

    expect(getByText('AK')).toBeInTheDocument();
    const brandLink = getByText('Akash Kundu').closest('a');
    expect(brandLink).toBeInTheDocument();
    expect(brandLink?.getAttribute('href')).toBe('/');
  });

  it('renders theme palette switcher button and allows cycling themes', () => {
    const { getByLabelText } = renderNavbar();

    const themeButton = getByLabelText(/Current theme palette/i);
    expect(themeButton).toBeInTheDocument();

    fireEvent.click(themeButton);
    expect(document.documentElement.getAttribute('data-theme')).toBeTruthy();
  });

  it('renders all primary desktop navigation links with correct active status', () => {
    const { getAllByText } = renderNavbar(['/projects']);

    const links = [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Skills', href: '/skills' },
      { label: 'Projects', href: '/projects' },
      { label: 'Certs', href: '/certificates' },
      { label: 'Education', href: '/education' },
      { label: 'Contact', href: '/contact' },
    ];

    links.forEach(({ label, href }) => {
      const match = getAllByText(label)[0].closest('a');
      expect(match).toBeInTheDocument();
      expect(match?.getAttribute('href')).toBe(href);

      if (href === '/projects') {
        expect(match?.classList.contains('active')).toBe(true);
      } else {
        expect(match?.classList.contains('active')).toBe(false);
      }
    });
  });

  it('toggles mobile menu drawer on button click and updates aria-expanded', () => {
    const { getByLabelText, queryByText, getByText } = renderNavbar();

    const toggleButton = getByLabelText('Toggle navigation menu');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');

    expect(queryByText('Download CV ↓')).not.toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
    expect(getByText('Download CV ↓')).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
    expect(queryByText('Download CV ↓')).not.toBeInTheDocument();
  });

  it('closes mobile menu when Escape key is pressed', () => {
    const { getByLabelText, getByText, queryByText } = renderNavbar();

    const toggleButton = getByLabelText('Toggle navigation menu');
    fireEvent.click(toggleButton);
    expect(getByText('Download CV ↓')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(queryByText('Download CV ↓')).not.toBeInTheDocument();
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('adds glass panel style when page is scrolled past 24px and removes when scrolled back up', () => {
    const { container } = renderNavbar();
    const nav = container.querySelector('nav');
    expect(nav?.classList.contains('liquid-glass-panel')).toBe(false);

    act(() => {
      window.scrollY = 50;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(nav?.classList.contains('liquid-glass-panel')).toBe(true);
    expect(nav?.classList.contains('shadow-lg')).toBe(true);

    act(() => {
      window.scrollY = 10;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(nav?.classList.contains('liquid-glass-panel')).toBe(false);
    expect(nav?.classList.contains('shadow-lg')).toBe(false);
  });

  it('renders CV download and GitHub external links with correct attributes', () => {
    const { container } = renderNavbar();

    const cvLink = container.querySelector('a[href="/cv/AkashKundu_CV.pdf"]');
    expect(cvLink).toBeInTheDocument();
    expect(cvLink?.hasAttribute('download')).toBe(true);

    const githubLink = container.querySelector('a[href="https://github.com/AkashKundu114"]');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink?.getAttribute('target')).toBe('_blank');
    expect(githubLink?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('renders Eco Mode toggle button and toggles state when clicked', () => {
    const { getByTitle } = renderNavbar();
    const ecoBtn = getByTitle(/Toggle Eco Mode/i);
    expect(ecoBtn).toBeInTheDocument();

    fireEvent.click(ecoBtn);
    expect(document.documentElement.getAttribute('data-eco')).toBe('true');
  });
});
