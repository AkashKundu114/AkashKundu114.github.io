import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Link } from 'react-router-dom';

// Common base styles and types
export interface BaseButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}

/**
 * 1. ShinyButton
 * Dynamic sweeping light beam with tactile spring bounce and neon rim.
 */
export function ShinyButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  to,
  href,
  onClick,
  ...props
}: BaseButtonProps & HTMLMotionProps<'button'>) {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-[11px]',
    md: 'px-5 py-2.5 text-[12px]',
    lg: 'px-7 py-3 text-[13px]',
  }[size];

  const variantStyles: Record<string, { bg: string; text: string; border: string; glow: string }> =
    {
      primary: {
        bg: 'var(--accent)',
        text: 'var(--bg)',
        border: 'var(--accent)',
        glow: 'var(--accent-glow)',
      },
      secondary: {
        bg: 'var(--surface-2)',
        text: 'var(--ink)',
        border: 'var(--border-2)',
        glow: 'rgba(210, 232, 255, 0.15)',
      },
      accent: {
        bg: 'var(--surface)',
        text: 'var(--accent)',
        border: 'var(--accent)',
        glow: 'var(--accent-glow)',
      },
      danger: {
        bg: 'var(--danger-soft)',
        text: 'var(--danger)',
        border: 'var(--danger)',
        glow: 'rgba(224, 123, 106, 0.3)',
      },
      ghost: {
        bg: 'transparent',
        text: 'var(--muted)',
        border: 'var(--border)',
        glow: 'transparent',
      },
    };

  const v = variantStyles[variant] || variantStyles.primary;

  const content = (
    <>
      {/* Light shimmer sweep */}
      <span className="evil-shimmer-sweep" aria-hidden="true" />
      <span className="relative z-10 flex items-center gap-2 font-mono font-bold tracking-wider uppercase">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </span>
    </>
  );

  const buttonClass = `evil-shiny-btn relative inline-flex items-center justify-center overflow-hidden font-mono select-none transition-all duration-200 cursor-pointer ${sizeClasses} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.97, y: 1 },
    transition: { type: 'spring', stiffness: 450, damping: 25 },
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link
          to={to}
          className={buttonClass}
          style={{
            background: v.bg,
            color: v.text,
            borderColor: v.border,
            boxShadow: `0 0 20px ${v.glow}`,
          }}
          onClick={onClick as any}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <a
          href={href}
          className={buttonClass}
          style={{
            background: v.bg,
            color: v.text,
            borderColor: v.border,
            boxShadow: `0 0 20px ${v.glow}`,
          }}
          target={props.target}
          rel={props.rel || (props.target === '_blank' ? 'noopener noreferrer' : undefined)}
          download={props.download}
          onClick={onClick as any}
        >
          {content}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      className={buttonClass}
      style={{
        background: v.bg,
        color: v.text,
        borderColor: v.border,
        boxShadow: `0 0 20px ${v.glow}`,
      }}
      onClick={onClick}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
}

/**
 * 2. Tactile3DButton
 * Mechanical push button with true isometric bottom depth and physical spring recoil.
 */
export function Tactile3DButton({
  children,
  variant = 'secondary',
  size = 'md',
  className = '',
  icon,
  to,
  href,
  onClick,
  ...props
}: BaseButtonProps & HTMLMotionProps<'button'>) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-4.5 py-2.5 text-[11px]',
    lg: 'px-6 py-3.5 text-[12px]',
  }[size];

  const isPrimary = variant === 'primary';

  const content = (
    <span className="flex items-center gap-2 font-mono font-bold tracking-wider uppercase">
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );

  const buttonClass = `evil-tactile-btn ${isPrimary ? 'evil-tactile-primary' : 'evil-tactile-secondary'} relative inline-flex items-center justify-center font-mono select-none transition-all cursor-pointer ${sizeClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClass} onClick={onClick as any}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={buttonClass}
        target={props.target}
        rel={props.rel || (props.target === '_blank' ? 'noopener noreferrer' : undefined)}
        download={props.download}
        onClick={onClick as any}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick} {...(props as any)}>
      {content}
    </button>
  );
}

/**
 * 3. GlitchButton
 * Cyberpunk / terminal button with chromatic RGB split flash and corner tech brackets.
 */
export function GlitchButton({
  children,
  size = 'md',
  className = '',
  icon,
  to,
  href,
  onClick,
  ...props
}: BaseButtonProps & HTMLMotionProps<'button'>) {
  const sizeClasses = {
    sm: 'px-3 py-1 text-[10px]',
    md: 'px-4 py-2 text-[11px]',
    lg: 'px-6 py-2.5 text-[12px]',
  }[size];

  const textContent = typeof children === 'string' ? children : 'ACTION';

  const content = (
    <span className="evil-glitch-wrapper relative inline-flex items-center gap-2 font-mono font-bold tracking-widest uppercase">
      <span className="evil-corner-tl" />
      <span className="evil-corner-br" />
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="evil-glitch-text" data-text={textContent}>
        {children}
      </span>
    </span>
  );

  const buttonClass = `evil-glitch-btn relative inline-flex items-center justify-center font-mono select-none overflow-hidden cursor-pointer ${sizeClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClass} onClick={onClick as any}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={buttonClass}
        target={props.target}
        rel={props.rel || (props.target === '_blank' ? 'noopener noreferrer' : undefined)}
        download={props.download}
        onClick={onClick as any}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick} {...(props as any)}>
      {content}
    </button>
  );
}

/**
 * 4. GlassButton
 * Apple-style liquid glass lens button with live refraction blur and specular highlight.
 */
export function GlassButton({
  children,
  size = 'md',
  className = '',
  icon,
  to,
  href,
  onClick,
  ...props
}: BaseButtonProps & HTMLMotionProps<'button'>) {
  const sizeClasses = {
    sm: 'px-3 py-1 text-[10px]',
    md: 'px-4.5 py-2 text-[11px]',
    lg: 'px-6 py-2.5 text-[12px]',
  }[size];

  const content = (
    <span className="relative z-10 flex items-center gap-2 font-mono font-bold tracking-wider uppercase text-ink">
      {icon && <span className="flex-shrink-0 text-accent">{icon}</span>}
      <span>{children}</span>
    </span>
  );

  const buttonClass = `evil-glass-btn relative inline-flex items-center justify-center font-mono select-none cursor-pointer ${sizeClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClass} onClick={onClick as any}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={buttonClass}
        target={props.target}
        rel={props.rel || (props.target === '_blank' ? 'noopener noreferrer' : undefined)}
        download={props.download}
        onClick={onClick as any}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick} {...(props as any)}>
      {content}
    </button>
  );
}
