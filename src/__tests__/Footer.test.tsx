import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  const renderFooter = () =>
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Footer />
      </MemoryRouter>
    );

  it('renders copyright with current year and author name', () => {
    const currentYear = new Date().getFullYear().toString();
    const { getByText } = renderFooter();

    expect(getByText('AK')).toBeInTheDocument();
    expect(getByText(`© ${currentYear} Akash Kundu`)).toBeInTheDocument();
  });

  it('renders legal links for Terms and Privacy Policy', () => {
    const { getByText } = renderFooter();

    const termsLink = getByText('Terms').closest('a');
    expect(termsLink).toBeInTheDocument();
    expect(termsLink?.getAttribute('href')).toBe('/terms');

    const privacyLink = getByText('Privacy Policy').closest('a');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink?.getAttribute('href')).toBe('/privacy');
  });

  it('renders external social links with correct target, rel, and href', () => {
    const { getByText } = renderFooter();

    const emailLink = getByText('Email');
    expect(emailLink.getAttribute('href')).toBe('mailto:akashkundu7487@gmail.com');
    expect(emailLink.getAttribute('target')).toBeNull();

    const linkedInLink = getByText('LinkedIn');
    expect(linkedInLink.getAttribute('href')).toBe('https://www.linkedin.com/in/akashkundu114/');
    expect(linkedInLink.getAttribute('target')).toBe('_blank');
    expect(linkedInLink.getAttribute('rel')).toBe('noopener noreferrer');

    const githubLink = getByText('GitHub');
    expect(githubLink.getAttribute('href')).toBe('https://github.com/AkashKundu114');
    expect(githubLink.getAttribute('target')).toBe('_blank');
    expect(githubLink.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('handles mouseEnter and mouseLeave hover states on legal and social links', () => {
    const { getByText } = renderFooter();

    const termsLink = getByText('Terms');
    fireEvent.mouseEnter(termsLink);
    expect(termsLink.style.color).toBe('var(--accent)');
    fireEvent.mouseLeave(termsLink);
    expect(termsLink.style.color).toBe('var(--muted-2)');

    const githubLink = getByText('GitHub');
    fireEvent.mouseEnter(githubLink);
    expect(githubLink.style.color).toBe('var(--accent)');
    expect(githubLink.style.borderColor).toBe('var(--accent)');
    fireEvent.mouseLeave(githubLink);
    expect(githubLink.style.color).toBe('var(--muted-2)');
    expect(githubLink.style.borderColor).toBe('var(--border)');
  });
});
