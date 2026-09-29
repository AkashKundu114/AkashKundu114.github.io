import React, { memo, useMemo } from 'react';

export type GlassIntensity = 'subtle' | 'medium' | 'deep';

export interface LiquidGlassLensProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
  intensity?: GlassIntensity;
}

interface IntensityConfig {
  backdropFilter: string;
  background: string;
  border: string;
  defaultShadow: string;
  glowAlphaHex: string;
  glowAlphaPercent: number;
  insetShadow: string;
}

const INTENSITY_PRESETS: Record<GlassIntensity, IntensityConfig> = {
  subtle: {
    backdropFilter: 'blur(16px) saturate(140%)',
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
    border: '1px solid var(--border-2)',
    defaultShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
    glowAlphaHex: '18',
    glowAlphaPercent: 10,
    insetShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
  },
  medium: {
    backdropFilter: 'blur(22px) saturate(160%)',
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
    border: '1px solid var(--border-3)',
    defaultShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
    glowAlphaHex: '24',
    glowAlphaPercent: 15,
    insetShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(0, 0, 0, 0.3)',
  },
  deep: {
    backdropFilter: 'blur(28px) saturate(180%) contrast(105%)',
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    defaultShadow: '0 24px 50px rgba(0, 0, 0, 0.55)',
    glowAlphaHex: '30',
    glowAlphaPercent: 20,
    insetShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.4)',
  },
};

/**
 * Builds safe cross-browser box-shadow styles supporting hex, rgb, and CSS variables.
 */
function resolveBoxShadow(glowColor: string | undefined, preset: IntensityConfig): string {
  if (!glowColor || typeof glowColor !== 'string') {
    return `${preset.defaultShadow}, ${preset.insetShadow}`;
  }

  const trimmedColor = glowColor.trim();

  // Standard 6-digit hex: #RRGGBB -> #RRGGBBAA
  if (/^#[0-9a-fA-F]{6}$/.test(trimmedColor)) {
    return `0 12px 40px ${trimmedColor}${preset.glowAlphaHex}, ${preset.insetShadow}`;
  }

  // 3-digit shorthand hex: #RGB -> #RRGGBBAA
  if (/^#[0-9a-fA-F]{3}$/.test(trimmedColor)) {
    const expanded = trimmedColor
      .slice(1)
      .split('')
      .map((character) => character + character)
      .join('');
    return `0 12px 40px #${expanded}${preset.glowAlphaHex}, ${preset.insetShadow}`;
  }

  // CSS variables or color functions: use color-mix for safe alpha compositing
  return `0 12px 40px color-mix(in srgb, ${trimmedColor} ${preset.glowAlphaPercent}%, transparent), ${preset.insetShadow}`;
}

function LiquidGlassLensComponent({
  children,
  className = '',
  style = {},
  glowColor,
  intensity = 'medium',
  ...restAttributes
}: LiquidGlassLensProps) {
  const preset = INTENSITY_PRESETS[intensity] ?? INTENSITY_PRESETS.medium;

  const combinedStyles = useMemo<React.CSSProperties>(() => {
    return {
      position: 'relative',
      backdropFilter: preset.backdropFilter,
      WebkitBackdropFilter: preset.backdropFilter,
      background: preset.background,
      border: preset.border,
      boxShadow: resolveBoxShadow(glowColor, preset),
      ...style,
    };
  }, [preset, glowColor, style]);

  const containerClassName = className
    ? `liquid-glass-lens ${className}`
    : 'liquid-glass-lens';

  return (
    <div className={containerClassName} style={combinedStyles} {...restAttributes}>
      {children}
    </div>
  );
}

export default memo(LiquidGlassLensComponent);
