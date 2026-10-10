import React, { useState, useEffect } from 'react';

/**
 * ParticleBurst
 * Triggers an explosive burst of romantic pink/maroon hearts & sparkles on demand
 */
export default function ParticleBurst({ triggerKey, x = '50%', y = '50%' }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!triggerKey) return;

    const count = 16;
    const newParticles = Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * 2 * Math.PI + (Math.random() - 0.5) * 0.5;
      const distance = 80 + Math.random() * 140;
      const dx = `${Math.cos(angle) * distance}px`;
      const dy = `${Math.sin(angle) * distance}px`;
      const rot = `${(Math.random() - 0.5) * 720}deg`;
      const size = 12 + Math.random() * 16;
      const emoji = ['🩷', '❤️', '✨', '🌸', '💖'][Math.floor(Math.random() * 5)];

      return {
        id: Math.random(),
        dx,
        dy,
        rot,
        size,
        emoji
      };
    });

    setParticles(newParticles);
    const timer = setTimeout(() => {
      setParticles([]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [triggerKey]);

  if (particles.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 999
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            fontSize: `${p.size}px`,
            '--dx': p.dx,
            '--dy': p.dy,
            '--rot': p.rot,
            animation: 'burstParticle 0.85s cubic-bezier(0.1, 0.9, 0.2, 1) forwards'
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
