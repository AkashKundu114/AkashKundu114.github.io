import React, { memo } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'accent' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: React.ReactNode;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  id?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

interface ShinyThemeConfig {
  background: string;
  textColor: string;
  borderColor: string;
  glowColor: string;
}

const SHINY_VARIANT_THEMES: Record<ButtonVariant, ShinyThemeConfig> = {
  primary: {
    background: 'var(--accent)',
    textColor: 'var(--bg)',
    borderColor: 'var(--accent)',
    glowColor: 'var(--accent-glow)',
  },
  secondary: {
    background: 'var(--surface-2)',
    textColor: 'var(--ink)',
    borderColor: 'var(--border-2)',
    glowColor: 'rgba(210, 232, 255, 0.15)',
  },
  accent: {
    background: 'var(--surface)',
    textColor: 'var(--accent)',
    borderColor: 'var(--accent)',
    glowColor: 'var(--accent-glow)',
  },
  danger: {
    background: 'var(--danger-soft)',
    textColor: 'var(--danger)',
    borderColor: 'var(--danger)',
    glowColor: 'rgba(224, 123, 106, 0.3)',
  },
  ghost: {
    background: 'transparent',
    textColor: 'var(--muted)',
    borderColor: 'var(--border)',
    glowColor: 'transparent',
  },
};

const SHINY_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-[11px]',
  md: 'px-5 py-2.5 text-[12px]',
  lg: 'px-7 py-3 text-[13px]',
};

const TACTILE_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[10px]',
  md: 'px-4.5 py-2.5 text-[11px]',
  lg: 'px-6 py-3.5 text-[12px]',
};

const GLITCH_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-[10px]',
  md: 'px-4 py-2 text-[11px]',
  lg: 'px-6 py-2.5 text-[12px]',
};

const GLASS_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1 text-[10px]',
  md: 'px-4.5 py-2 text-[11px]',
  lg: 'px-6 py-2.5 text-[12px]',
};

const SHINY_SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 450,
  damping: 25,
} as const;

/**
 * Ensures external links automatically include safe rel attributes.
 */
function resolveAnchorSecurityRel(target?: string, rel?: string): string | undefined {
  if (rel) {
    return rel;
  }
  return target === '_blank' ? 'noopener noreferrer' : undefined;
}

interface PolymorphicActionContainerProps {
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  disabled?: boolean;
  className: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  title?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

/**
 * Unified polymorphic component rendering React Router Link, anchor, or HTML button.
 */
function PolymorphicActionContainer({
  to,
  href,
  target,
  rel,
  download,
  disabled,
  className,
  style,
  onClick,
  children,
  title,
  id,
  type = 'button',
  ariaLabel,
}: PolymorphicActionContainerProps) {
  if (to && !disabled) {
    return (
      <Link
        to={to}
        id={id}
        title={title}
        className={className}
        style={style}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        id={id}
        title={title}
        className={className}
        style={style}
        target={target}
        rel={resolveAnchorSecurityRel(target, rel)}
        download={download}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      id={id}
      title={title}
      type={type}
      className={className}
      style={style}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}

/**
 * 1. ShinyButton
 * Dynamic sweeping light beam with tactile spring bounce and neon rim.
 */
export const ShinyButton = memo(function ShinyButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  to,
  href,
  onClick,
  disabled,
  style,
  target,
  rel,
  download,
  ...remainingProps
}: BaseButtonProps & Omit<HTMLMotionProps<'button'>, keyof BaseButtonProps>) {
  const sizeClass = SHINY_SIZE_CLASSES[size] ?? SHINY_SIZE_CLASSES.md;
  const theme = SHINY_VARIANT_THEMES[variant] ?? SHINY_VARIANT_THEMES.primary;

  const combinedStyles: React.CSSProperties = {
    background: theme.background,
    color: theme.textColor,
    borderColor: theme.borderColor,
    boxShadow: `0 0 20px ${theme.glowColor}`,
    ...style,
  };

  const buttonClassName = `evil-shiny-btn relative inline-flex items-center justify-center overflow-hidden font-mono select-none transition-all duration-200 cursor-pointer ${sizeClass} ${className}`;

  const buttonContent = (
    <>
      <span className="evil-shimmer-sweep" aria-hidden="true" />
      <span className="relative z-10 flex items-center gap-2 font-mono font-bold tracking-wider uppercase">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </span>
    </>
  );

  const motionInteractiveProps = {
    whileHover: disabled ? undefined : { scale: 1.02, y: -1 },
    whileTap: disabled ? undefined : { scale: 0.97, y: 1 },
    transition: SHINY_SPRING_TRANSITION,
  };

  if (to || href) {
    return (
      <motion.div {...motionInteractiveProps} className="inline-block">
        <PolymorphicActionContainer
          to={to}
          href={href}
          target={target}
          rel={rel}
          download={download}
          disabled={disabled}
          className={buttonClassName}
          style={combinedStyles}
          onClick={onClick}
          ariaLabel={remainingProps['aria-label']}
        >
          {buttonContent}
        </PolymorphicActionContainer>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionInteractiveProps}
      className={buttonClassName}
      style={combinedStyles}
      disabled={disabled}
      onClick={onClick}
      {...remainingProps}
    >
      {buttonContent}
    </motion.button>
  );
});

/**
 * 2. Tactile3DButton
 * Mechanical push button with true isometric bottom depth and physical spring recoil.
 */
export const Tactile3DButton = memo(function Tactile3DButton({
  children,
  variant = 'secondary',
  size = 'md',
  className = '',
  icon,
  to,
  href,
  target,
  rel,
  download,
  onClick,
  disabled,
  style,
  ...remainingProps
}: BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>) {
  const sizeClass = TACTILE_SIZE_CLASSES[size] ?? TACTILE_SIZE_CLASSES.md;
  const isPrimaryVariant = variant === 'primary';
  const tactileVariantClass = isPrimaryVariant ? 'evil-tactile-primary' : 'evil-tactile-secondary';
  const buttonClassName = `evil-tactile-btn ${tactileVariantClass} relative inline-flex items-center justify-center font-mono select-none transition-all cursor-pointer ${sizeClass} ${className}`;

  const buttonContent = (
    <span className="flex items-center gap-2 font-mono font-bold tracking-wider uppercase">
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );

  return (
    <PolymorphicActionContainer
      to={to}
      href={href}
      target={target}
      rel={rel}
      download={download}
      disabled={disabled}
      className={buttonClassName}
      style={style}
      onClick={onClick}
      ariaLabel={remainingProps['aria-label']}
      type={remainingProps.type}
    >
      {buttonContent}
    </PolymorphicActionContainer>
  );
});

/**
 * 3. GlitchButton
 * Cyberpunk / terminal button with chromatic RGB split flash and corner tech brackets.
 */
export const GlitchButton = memo(function GlitchButton({
  children,
  size = 'md',
  className = '',
  icon,
  to,
  href,
  target,
  rel,
  download,
  onClick,
  disabled,
  style,
  ...remainingProps
}: BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>) {
  const sizeClass = GLITCH_SIZE_CLASSES[size] ?? GLITCH_SIZE_CLASSES.md;
  const buttonTextLabel = typeof children === 'string' ? children : 'ACTION';
  const buttonClassName = `evil-glitch-btn relative inline-flex items-center justify-center font-mono select-none overflow-hidden cursor-pointer ${sizeClass} ${className}`;

  const buttonContent = (
    <span className="evil-glitch-wrapper relative inline-flex items-center gap-2 font-mono font-bold tracking-widest uppercase">
      <span className="evil-corner-tl" />
      <span className="evil-corner-br" />
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="evil-glitch-text" data-text={buttonTextLabel}>
        {children}
      </span>
    </span>
  );

  return (
    <PolymorphicActionContainer
      to={to}
      href={href}
      target={target}
      rel={rel}
      download={download}
      disabled={disabled}
      className={buttonClassName}
      style={style}
      onClick={onClick}
      ariaLabel={remainingProps['aria-label']}
      type={remainingProps.type}
    >
      {buttonContent}
    </PolymorphicActionContainer>
  );
});

/**
 * 4. GlassButton
 * Apple-style liquid glass lens button with live refraction blur and specular highlight.
 */
export const GlassButton = memo(function GlassButton({
  children,
  size = 'md',
  className = '',
  icon,
  to,
  href,
  target,
  rel,
  download,
  onClick,
  disabled,
  style,
  ...remainingProps
}: BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>) {
  const sizeClass = GLASS_SIZE_CLASSES[size] ?? GLASS_SIZE_CLASSES.md;
  const buttonClassName = `evil-glass-btn relative inline-flex items-center justify-center font-mono select-none cursor-pointer ${sizeClass} ${className}`;

  const buttonContent = (
    <span className="relative z-10 flex items-center gap-2 font-mono font-bold tracking-wider uppercase text-ink">
      {icon && <span className="flex-shrink-0 text-accent">{icon}</span>}
      <span>{children}</span>
    </span>
  );

  return (
    <PolymorphicActionContainer
      to={to}
      href={href}
      target={target}
      rel={rel}
      download={download}
      disabled={disabled}
      className={buttonClassName}
      style={style}
      onClick={onClick}
      ariaLabel={remainingProps['aria-label']}
      type={remainingProps.type}
    >
      {buttonContent}
    </PolymorphicActionContainer>
  );
});
