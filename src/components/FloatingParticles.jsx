import React, { useMemo } from 'react';

/**
 * FloatingParticles
 * Renders subtle floating rose petals, light-pink hearts, and soft sparkles.
 */
export default function FloatingParticles({ reducedMotion = false }) {
  if (reducedMotion) return null;

  // Generate deterministic particles for smooth 60fps ambient movement
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.1 + 3) % 96}%`,
      duration: `${12 + (i % 7) * 3}s`,
      delay: `${(i % 9) * 1.5}s`,
      size: i % 3 === 0 ? '18px' : i % 3 === 1 ? '14px' : '11px',
      type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'petal' : 'sparkle',
      opacity: 0.2 + (i % 4) * 0.08
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            bottom: '-40px',
            fontSize: p.size,
            opacity: p.opacity,
            animation: `heartFloat ${p.duration} infinite ease-in`,
            animationDelay: p.delay,
            filter: 'drop-shadow(0 0 6px rgba(255, 182, 193, 0.55))'
          }}
        >
          {p.type === 'heart' ? '🩷' : p.type === 'petal' ? '🌸' : '✨'}
        </span>
      ))}
    </div>
  );
}
