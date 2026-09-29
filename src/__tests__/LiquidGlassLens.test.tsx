import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import LiquidGlassLens from '../components/LiquidGlassLens';

describe('LiquidGlassLens Component', () => {
  it('renders children within container with default class', () => {
    const { getByTestId, getByText } = render(
      <LiquidGlassLens data-testid="lens-container">
        <span>Lens Content</span>
      </LiquidGlassLens>
    );

    const container = getByTestId('lens-container');
    expect(container).toBeInTheDocument();
    expect(container.className).toBe('liquid-glass-lens');
    expect(getByText('Lens Content')).toBeInTheDocument();
  });

  it('merges custom className with default class', () => {
    const { getByTestId } = render(
      <LiquidGlassLens className="custom-wrapper p-4" data-testid="lens" />
    );

    expect(getByTestId('lens').className).toBe('liquid-glass-lens custom-wrapper p-4');
  });

  describe('Intensity presets', () => {
    it('applies medium preset styles by default', () => {
      const { getByTestId } = render(<LiquidGlassLens data-testid="lens" />);
      const lens = getByTestId('lens');

      expect(lens.style.backdropFilter).toContain('blur(22px)');
      expect(lens.style.border).toBe('1px solid var(--border-3)');
    });

    it('applies subtle preset styles when intensity="subtle"', () => {
      const { getByTestId } = render(
        <LiquidGlassLens intensity="subtle" data-testid="lens" />
      );
      const lens = getByTestId('lens');

      expect(lens.style.backdropFilter).toContain('blur(16px)');
      expect(lens.style.border).toBe('1px solid var(--border-2)');
    });

    it('applies deep preset styles when intensity="deep"', () => {
      const { getByTestId } = render(
        <LiquidGlassLens intensity="deep" data-testid="lens" />
      );
      const lens = getByTestId('lens');

      expect(lens.style.backdropFilter).toContain('blur(28px)');
      expect(lens.style.border).toBe('1px solid rgba(255, 255, 255, 0.25)');
    });

    it('falls back to medium preset styles for invalid intensity input', () => {
      const { getByTestId } = render(
        // @ts-expect-error testing invalid intensity fallback
        <LiquidGlassLens intensity="invalid-intensity" data-testid="lens" />
      );
      const lens = getByTestId('lens');

      expect(lens.style.backdropFilter).toContain('blur(22px)');
    });
  });

  describe('Glow color box-shadow resolution', () => {
    it('uses default preset shadow when glowColor is undefined or not provided', () => {
      const { getByTestId } = render(
        <LiquidGlassLens intensity="subtle" data-testid="lens" />
      );
      const lens = getByTestId('lens');

      expect(lens.style.boxShadow).toContain('0 8px 32px rgba(0, 0, 0, 0.35)');
      expect(lens.style.boxShadow).toContain('inset 0 1px 0 rgba(255, 255, 255, 0.15)');
    });

    it('resolves standard 6-digit hex glowColor with alpha hex appended', () => {
      const { getByTestId } = render(
        <LiquidGlassLens intensity="medium" glowColor="#38bdf8" data-testid="lens" />
      );
      const lens = getByTestId('lens');

      // medium has glowAlphaHex '24'
      expect(lens.style.boxShadow).toContain('#38bdf824');
    });

    it('resolves 3-digit shorthand hex color by expanding digits and appending alpha', () => {
      const { getByTestId } = render(
        <LiquidGlassLens intensity="deep" glowColor="#abc" data-testid="lens" />
      );
      const lens = getByTestId('lens');

      // #abc -> #aabbcc + '30' for deep
      expect(lens.style.boxShadow).toContain('#aabbcc30');
    });

    it('resolves CSS variables using color-mix for safe compositing', () => {
      const { getByTestId } = render(
        <LiquidGlassLens intensity="medium" glowColor="var(--accent)" data-testid="lens" />
      );
      const lens = getByTestId('lens');

      // medium has glowAlphaPercent 15
      expect(lens.style.boxShadow).toContain(
        'color-mix(in srgb, var(--accent) 15%, transparent)'
      );
    });

    it('trims leading/trailing whitespace around glowColor', () => {
      const { getByTestId } = render(
        <LiquidGlassLens intensity="subtle" glowColor="  #123456  " data-testid="lens" />
      );
      const lens = getByTestId('lens');

      // subtle has glowAlphaHex '18'
      expect(lens.style.boxShadow).toContain('#12345618');
    });
  });

  describe('Attributes and style overrides', () => {
    it('preserves and merges custom inline style properties', () => {
      const { getByTestId } = render(
        <LiquidGlassLens
          data-testid="lens"
          style={{ padding: '24px', zIndex: 100, borderRadius: '8px' }}
        />
      );
      const lens = getByTestId('lens');

      expect(lens.style.padding).toBe('24px');
      expect(lens.style.zIndex).toBe('100');
      expect(lens.style.borderRadius).toBe('8px');
      expect(lens.style.position).toBe('relative');
    });

    it('forwards native HTML event listeners and ARIA attributes', () => {
      const handleClick = vi.fn();
      const { getByRole } = render(
        <LiquidGlassLens
          role="region"
          aria-label="Interactive Panel"
          onClick={handleClick}
        >
          Inner
        </LiquidGlassLens>
      );

      const panel = getByRole('region');
      expect(panel.getAttribute('aria-label')).toBe('Interactive Panel');

      fireEvent.click(panel);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
