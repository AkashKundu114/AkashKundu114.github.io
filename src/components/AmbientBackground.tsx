import React from 'react';

export default function AmbientBackground() {
  return (
    <div className="ambient-mesh-container" aria-hidden="true">
      {/* 3 GPU-accelerated luminous gradient orbs that provide vibrant colors for the glass to refract */}
      <div className="glass-ambient-orb orb-accent" />
      <div className="glass-ambient-orb orb-link" />
      <div className="glass-ambient-orb orb-secondary" />
    </div>
  );
}
