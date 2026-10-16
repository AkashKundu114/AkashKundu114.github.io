import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ShinyButton, Tactile3DButton, GlitchButton, GlassButton } from '../components/EvilButtons';

const renderWithRouter = (ui: React.ReactElement) =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {ui}
    </MemoryRouter>
  );

describe('EvilButtons Component Suite', () => {
  describe('ShinyButton', () => {
    it('renders as a standard button when neither "to" nor "href" is specified', () => {
      const handleClick = vi.fn();
      const { getByRole } = render(<ShinyButton onClick={handleClick}>Click Me</ShinyButton>);

      const button = getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Click Me');

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders as a React Router Link when "to" is provided', () => {
      const { getByRole } = renderWithRouter(
        <ShinyButton to="/projects">View Projects</ShinyButton>
      );

      const link = getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe('/projects');
      expect(link).toHaveTextContent('View Projects');
    });

    it('renders as an anchor tag with secure rel when "href" and target="_blank" are provided', () => {
      const { getByRole } = render(
        <ShinyButton href="https://example.com" target="_blank" download="file.pdf">
          Download PDF
        </ShinyButton>
      );

      const anchor = getByRole('link');
      expect(anchor.getAttribute('href')).toBe('https://example.com');
      expect(anchor.getAttribute('target')).toBe('_blank');
      expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
      expect(anchor.getAttribute('download')).toBe('file.pdf');
    });

    it('applies variant styling accurately and defaults unknown variant to primary styles', () => {
      const { getByRole, rerender } = render(<ShinyButton variant="danger">Delete</ShinyButton>);
      let button = getByRole('button');
      expect(button.style.color).toBe('var(--danger)');

      rerender(
        <ShinyButton variant={'unknown-variant' as unknown as 'primary'}>Fallback</ShinyButton>
      );
      button = getByRole('button');
      expect(button.style.color).toBe('var(--bg)');
    });

    it('renders with optional icon and size classes', () => {
      const { getByTestId, getByRole } = render(
        <ShinyButton
          size="lg"
          icon={<span data-testid="test-icon">★</span>}
          className="extra-custom-class"
        >
          Starred
        </ShinyButton>
      );

      expect(getByTestId('test-icon')).toBeInTheDocument();
      const button = getByRole('button');
      expect(button.className).toContain('px-7');
      expect(button.className).toContain('extra-custom-class');
    });
  });

  describe('Tactile3DButton', () => {
    it('renders as button and applies secondary variant by default', () => {
      const handleClick = vi.fn();
      const { getByRole } = render(
        <Tactile3DButton onClick={handleClick}>Tactile Push</Tactile3DButton>
      );

      const button = getByRole('button');
      expect(button.className).toContain('evil-tactile-secondary');
      expect(button.className).toContain('px-4.5');

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies primary variant class when specified', () => {
      const { getByRole } = render(<Tactile3DButton variant="primary">Submit</Tactile3DButton>);
      expect(getByRole('button').className).toContain('evil-tactile-primary');
    });

    it('renders as a Router Link when "to" is provided', () => {
      const { getByRole } = renderWithRouter(
        <Tactile3DButton to="/contact">Contact</Tactile3DButton>
      );

      const link = getByRole('link');
      expect(link.getAttribute('href')).toBe('/contact');
    });

    it('renders as an anchor with custom rel when "href" is provided', () => {
      const { getByRole } = render(
        <Tactile3DButton href="https://github.com" rel="external">
          GitHub
        </Tactile3DButton>
      );

      const anchor = getByRole('link');
      expect(anchor.getAttribute('href')).toBe('https://github.com');
      expect(anchor.getAttribute('rel')).toBe('external');
    });
  });

  describe('GlitchButton', () => {
    it('renders button with data-text attribute matching string children', () => {
      const { container, getByRole } = render(<GlitchButton size="sm">CYBER</GlitchButton>);

      const button = getByRole('button');
      expect(button.className).toContain('evil-glitch-btn');
      expect(button.className).toContain('px-3');

      const glitchText = container.querySelector('.evil-glitch-text');
      expect(glitchText?.getAttribute('data-text')).toBe('CYBER');
    });

    it('falls back data-text to "ACTION" when children is not a simple string', () => {
      const { container } = render(
        <GlitchButton>
          <span>Non-String Child</span>
        </GlitchButton>
      );

      const glitchText = container.querySelector('.evil-glitch-text');
      expect(glitchText?.getAttribute('data-text')).toBe('ACTION');
    });

    it('renders as Router Link when "to" is provided', () => {
      const { getByRole } = renderWithRouter(<GlitchButton to="/skills">Skills</GlitchButton>);
      expect(getByRole('link').getAttribute('href')).toBe('/skills');
    });

    it('renders as anchor when "href" is provided', () => {
      const { getByRole } = render(
        <GlitchButton href="https://example.com" target="_blank">
          Ext
        </GlitchButton>
      );
      expect(getByRole('link').getAttribute('href')).toBe('https://example.com');
      expect(getByRole('link').getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  describe('GlassButton', () => {
    it('renders liquid glass button with icon and children', () => {
      const handleClick = vi.fn();
      const { getByRole, getByTestId } = render(
        <GlassButton
          onClick={handleClick}
          size="lg"
          icon={<span data-testid="glass-icon">💎</span>}
        >
          Glass Action
        </GlassButton>
      );

      const button = getByRole('button');
      expect(button.className).toContain('evil-glass-btn');
      expect(button.className).toContain('px-6');
      expect(getByTestId('glass-icon')).toBeInTheDocument();

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders as Link when "to" is provided', () => {
      const { getByRole } = renderWithRouter(<GlassButton to="/about">About Us</GlassButton>);

      expect(getByRole('link').getAttribute('href')).toBe('/about');
    });

    it('renders as anchor when "href" is provided', () => {
      const { getByRole } = render(
        <GlassButton href="/cv/resume.pdf" download="resume.pdf">
          Download
        </GlassButton>
      );

      const anchor = getByRole('link');
      expect(anchor.getAttribute('href')).toBe('/cv/resume.pdf');
      expect(anchor.getAttribute('download')).toBe('resume.pdf');
    });
  });
});
