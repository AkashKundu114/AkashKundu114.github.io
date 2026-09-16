import React from 'react';

interface LiquidGlassLensProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glowColor?: string;
  intensity?: 'subtle' | 'medium' | 'deep';
}

export default function LiquidGlassLens({
  children,
  className = '',
  style = {},
  glowColor,
  intensity = 'medium',
  ...rest
}: LiquidGlassLensProps) {
  const intensityStyles: Record<string, React.CSSProperties> = {
    subtle: {
      backdropFilter: 'blur(16px) saturate(140%)',
      WebkitBackdropFilter: 'blur(16px) saturate(140%)',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      border: '1px solid var(--border-2)',
      boxShadow: glowColor
        ? `0 8px 32px ${glowColor}18, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
        : '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
    },
    medium: {
      backdropFilter: 'blur(22px) saturate(160%)',
      WebkitBackdropFilter: 'blur(22px) saturate(160%)',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
      border: '1px solid var(--border-3)',
      boxShadow: glowColor
        ? `0 12px 40px ${glowColor}24, inset 0 1px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 0 rgba(0, 0, 0, 0.3)`
        : '0 16px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.3)',
    },
    deep: {
      backdropFilter: 'blur(28px) saturate(180%) contrast(105%)',
      WebkitBackdropFilter: 'blur(28px) saturate(180%) contrast(105%)',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: glowColor
        ? `0 20px 50px ${glowColor}30, inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.4)`
        : '0 24px 50px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.4)',
    },
  };

  const selectedIntensity = intensityStyles[intensity] || intensityStyles.medium;

  const combinedStyle: React.CSSProperties = {
    position: 'relative',
    ...selectedIntensity,
    ...style,
  };

  return (
    <div className={`liquid-glass-lens ${className}`} style={combinedStyle} {...rest}>
      {children}
    </div>
  );
}
