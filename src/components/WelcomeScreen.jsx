import React, { useState } from 'react';
import { Heart, Sparkles, Music } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function WelcomeScreen({ onOpenHeart, onStartMusic }) {
  const [isOpening, setIsOpening] = useState(false);
  const { openingScreen, dates } = siteContent;

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Trigger music synchronously inside the click gesture so mobile & desktop browsers never block it
    if (onStartMusic) {
      onStartMusic();
    }
    // Let the envelope unfold visibly before revealing the chapters
    setTimeout(() => {
      onOpenHeart();
    }, 650);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'radial-gradient(circle at 50% 30%, #800020 0%, #590D22 58%, #3B0614 100%)',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        color: 'var(--ivory)',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      {/* Decorative Light Pink Stars / Sparks */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(rgba(255, 182, 193, 0.22) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.65,
          pointerEvents: 'none'
        }}
      />

      <div
        className="animate-fade-in-up"
        style={{
          maxWidth: '600px',
          width: '100%',
          position: 'relative',
          zIndex: 10,
          margin: 'auto'
        }}
      >
        {/* Intimate Greeting */}
        <div
          className="text-handwriting"
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            color: 'var(--blush)',
            marginBottom: '0.4rem',
            filter: 'drop-shadow(0 2px 8px rgba(35, 3, 12, 0.5))'
          }}
        >
          {openingScreen.salutation}
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontSize: 'clamp(2.1rem, 5.5vw, 3.3rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--ivory)',
            marginBottom: '0.85rem',
            textShadow: '0 4px 20px rgba(35, 3, 12, 0.6)'
          }}
        >
          {openingScreen.heading}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
            color: 'rgba(255, 240, 243, 0.9)',
            marginBottom: '1.25rem',
            lineHeight: 1.5,
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          {openingScreen.subtitle}
        </p>

        {/* Milestone Date Ribbon */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1.3rem',
            borderRadius: '9999px',
            background: 'rgba(255, 182, 193, 0.18)',
            border: '1px solid rgba(255, 182, 193, 0.55)',
            color: '#FFD1DC',
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            marginBottom: '2rem',
            boxShadow: '0 4px 16px rgba(35, 3, 12, 0.35)'
          }}
        >
          <Sparkles size={15} className="text-gold" />
          <span>{openingScreen.dates || dates.dateRangeLabel}</span>
          <Sparkles size={15} className="text-gold" />
        </div>

        {/* Animated Love Letter Envelope */}
        <div
          className={`envelope-wrapper ${isOpening ? 'is-open' : 'animate-float'}`}
          onClick={handleOpenClick}
          role="button"
          tabIndex={0}
          aria-label="Open anniversary love letter"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpenClick();
            }
          }}
          style={{ marginBottom: '2rem' }}
        >
          <div className="envelope-base">
            <div className="envelope-pocket-left" />
            <div className="envelope-pocket-right" />
            <div className="envelope-letter">
              <div
                style={{
                  color: '#800020',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginBottom: '0.25rem'
                }}
              >
                For My Cutie ❤️
              </div>
              <div
                style={{
                  color: '#590D22',
                  fontSize: '0.8rem',
                  fontStyle: 'italic'
                }}
              >
                365 Days of Loving You
              </div>
              <Heart
                size={22}
                fill="#800020"
                color="#800020"
                style={{ marginTop: '0.5rem' }}
              />
            </div>
            <div className="envelope-pocket" />
            <div className="envelope-flap" />
            <div className="wax-seal">
              <Heart size={26} fill="#800020" color="#800020" />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={handleOpenClick}
            className="btn-primary"
            style={{
              padding: '0.95rem 2.4rem',
              fontSize: '1.1rem'
            }}
          >
            <Heart size={20} fill="currentColor" />
            <span>{isOpening ? 'Opening Our Story...' : openingScreen.buttonText}</span>
          </button>
        </div>

        {/* Music hint */}
        <p
          style={{
            marginTop: '1rem',
            fontSize: '0.82rem',
            color: 'rgba(255, 240, 243, 0.78)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem'
          }}
        >
          <Music size={14} className="text-gold" />
          <span>Includes romantic background music</span>
        </p>
      </div>
    </div>
  );
}
