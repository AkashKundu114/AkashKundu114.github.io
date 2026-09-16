import React, { useState, useEffect } from 'react';
import { Glass, GlassOptics } from '@samasante/liquid-glass';

interface LiquidGlassLensProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  optics?: Partial<GlassOptics>;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
  intensity?: 'subtle' | 'medium' | 'deep';
  as?: React.ElementType;
}

const OPTICS_PRESETS: Record<string, Partial<GlassOptics>> = {
  subtle: {
    frost: 3,
    dispersion: 0.25,
    strength: 0.28,
    specular: 0.85,
    sheen: 0.45,
    sheenAngle: 125,
    curvature: 0.15,
    depth: 0.25,
    bend: 0.18,
  },
  medium: {
    frost: 5,
    dispersion: 0.42,
    strength: 0.45,
    specular: 1.1,
    sheen: 0.65,
    sheenAngle: 135,
    curvature: 0.32,
    depth: 0.45,
    bend: 0.3,
  },
  deep: {
    frost: 8,
    dispersion: 0.6,
    strength: 0.65,
    specular: 1.4,
    sheen: 0.85,
    sheenAngle: 140,
    curvature: 0.48,
    depth: 0.6,
    bend: 0.45,
  },
};

export default function LiquidGlassLens({
  children,
  optics,
  className = '',
  style = {},
  glowColor,
  intensity = 'medium',
  ...rest
}: LiquidGlassLensProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mergedOptics: Partial<GlassOptics> = {
    ...OPTICS_PRESETS[intensity],
    ...(optics || {}),
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid var(--border-2)',
    boxShadow: glowColor
      ? `0 8px 32px ${glowColor}1a, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
      : '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
    ...style,
  };

  if (!mounted) {
    return (
      <div className={`liquid-glass-fallback ${className}`} style={containerStyle} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <Glass
      className={`liquid-glass-lens ${className}`}
      style={containerStyle}
      optics={mergedOptics}
      {...rest}
    >
      {children}
    </Glass>
  );
}
