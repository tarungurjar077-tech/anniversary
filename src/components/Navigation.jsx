import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function Navigation({ onLogoClick }) {
  const { dates } = siteContent;

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 80,
        background: 'rgba(89, 13, 34, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 182, 193, 0.45)',
        boxShadow: '0 8px 30px rgba(35, 3, 12, 0.55)',
        height: 'var(--header-height)'
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        {/* Brand Logo & Title (Tap returns to Cover) */}
        <div
          onClick={onLogoClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: onLogoClick ? 'pointer' : 'default',
            color: 'var(--ivory)'
          }}
          title={onLogoClick ? 'Return to opening cover' : ''}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #800020, #590D22)',
              border: '1.5px solid #FFB6C1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(255, 182, 193, 0.4)'
            }}
            className="animate-pulse-glow"
          >
            <Heart size={20} fill="#FFB6C1" color="#FFD1DC" />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1.15rem',
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
                color: 'var(--ivory)'
              }}
            >
              Happy Anniversary
            </div>
            <div
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.25rem',
                color: 'var(--blush)',
                lineHeight: 1
              }}
            >
              My Cutie ❤️
            </div>
          </div>
        </div>

        {/* Milestone Badge on Right */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.4rem 1.1rem',
            borderRadius: '9999px',
            background: 'rgba(255, 182, 193, 0.16)',
            border: '1px solid rgba(255, 182, 193, 0.45)',
            fontSize: '0.85rem',
            color: '#FFD1DC',
            fontWeight: 600
          }}
        >
          <Sparkles size={14} className="text-gold" />
          <span>{dates.startDate} – {dates.anniversaryDate}</span>
          <Sparkles size={14} className="text-gold" />
        </div>
      </div>
    </header>
  );
}
