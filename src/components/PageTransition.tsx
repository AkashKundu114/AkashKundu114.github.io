import React, { memo } from 'react';
import { motion, type Variants, type Transition } from 'framer-motion';

export interface PageTransitionProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const PAGE_VARIANTS: Variants = {
  initial: { opacity: 0, y: 10, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.995 },
};

const DEFAULT_TRANSITION: Transition = {
  duration: 0.24,
  ease: [0.4, 0, 0.2, 1],
};

const BASE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  zIndex: 1,
  minHeight: '100vh',
};

function PageTransitionComponent({ children, className, style }: PageTransitionProps) {
  if (!children) {
    return null;
  }

  const mergedStyles: React.CSSProperties = {
    ...BASE_CONTAINER_STYLE,
    ...style,
  };

  return (
    <motion.div
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={DEFAULT_TRANSITION}
      className={className}
      style={mergedStyles}
    >
      {children}
    </motion.div>
  );
}

export default memo(PageTransitionComponent);
