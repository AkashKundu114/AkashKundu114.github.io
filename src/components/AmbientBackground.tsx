import React, { memo } from 'react';

export interface AmbientBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

function AmbientBackgroundComponent({ className = '', style }: AmbientBackgroundProps) {
  const containerClassName = className
    ? `ambient-mesh-container ${className}`
    : 'ambient-mesh-container';

  return (
    <div className={containerClassName} style={style} aria-hidden="true">
      <div className="glass-ambient-orb orb-accent" />
      <div className="glass-ambient-orb orb-link" />
      <div className="glass-ambient-orb orb-secondary" />
    </div>
  );
}

export default memo(AmbientBackgroundComponent);
