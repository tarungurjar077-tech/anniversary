import React, { useState } from 'react';
import { Heart, Sparkles, Gift, RotateCcw, Award } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import ParticleBurst from './ParticleBurst';

export default function FinalSurprise({ onReplay }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [burstKey, setBurstKey] = useState(null);
  const { finalSurprise, dates, recipient } = siteContent;

  const handleOpenSurprise = () => {
    setIsRevealed(true);
    setBurstKey(Date.now());
  };

  return (
    <section
      id="surprise"
      style={{
        paddingTop: '1rem',
        paddingBottom: '1rem',
        position: 'relative',
        textAlign: 'center'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Gift size={20} className="text-gold" />
            <span>The Grand Finale</span>
          </div>
          <h2 className="section-title">{finalSurprise.teaserTitle}</h2>
          <p className="section-subtitle">
            One last keepsake created just for you to celebrate our first 365 days together.
          </p>
          <div className="section-divider">
            <Sparkles size={16} className="text-gold" />
          </div>
        </div>

        {/* Particle Explosion */}
        <ParticleBurst triggerKey={burstKey} />

        {/* Surprise Box / Revealed Content */}
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          {!isRevealed ? (
            <div
              className="glass-card animate-fade-in-up"
              style={{
                padding: 'clamp(2.5rem, 6vw, 4rem)',
                border: '2px solid rgba(255, 182, 193, 0.6)',
                boxShadow: '0 20px 50px rgba(35, 3, 12, 0.6), 0 0 35px rgba(255, 182, 193, 0.3)'
              }}
            >
              {/* Pulsing Gift Box Icon */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #800020, #590D22)',
                  border: '2px solid #FFB6C1',
                  margin: '0 auto 1.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 30px rgba(255, 182, 193, 0.45)'
                }}
                className="animate-pulse-glow"
              >
                <Heart size={40} fill="#FFB6C1" color="#FFD1DC" />
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                  color: 'var(--ivory)',
                  marginBottom: '1rem',
                  lineHeight: 1.3
                }}
              >
                Ready for the final surprise, {recipient.nickname}?
              </h3>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'rgba(255, 240, 243, 0.88)',
                  maxWidth: '500px',
                  margin: '0 auto 2.5rem',
                  lineHeight: 1.6
                }}
              >
                You’ve journeyed through our 12 months and 365 reasons. Click below to unwrap the final words of our first year.
              </p>

              <button
                onClick={handleOpenSurprise}
                className="btn-primary"
                style={{
                  padding: '1.1rem 2.8rem',
                  fontSize: '1.15rem'
                }}
              >
                <Heart size={20} fill="currentColor" />
                <span>{finalSurprise.buttonText}</span>
              </button>
            </div>
          ) : (
            <div
              className="glass-card animate-fade-in-up"
              style={{
                padding: 'clamp(2.5rem, 6vw, 4.5rem)',
                border: '2px solid #FFB6C1',
                background: 'rgba(89, 13, 34, 0.88)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 60px rgba(35, 3, 12, 0.7), 0 0 45px rgba(255, 182, 193, 0.4)',
                position: 'relative'
              }}
            >
              {/* Glowing Heart Emblem */}
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(255, 182, 193, 0.6)',
                  border: '3px solid #FFF0F3'
                }}
                className="animate-pulse-glow"
              >
                <Heart size={46} fill="#800020" color="#800020" />
              </div>

              {/* Milestone Celebration Date Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 1.4rem',
                  borderRadius: '9999px',
                  background: 'rgba(255, 182, 193, 0.2)',
                  border: '1px solid #FFB6C1',
                  color: '#FFD1DC',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  marginBottom: '2rem'
                }}
              >
                <Sparkles size={16} className="text-gold" />
                <span>{dates.anniversaryDate}</span>
                <Sparkles size={16} className="text-gold" />
              </div>

              {/* Revealed Romantic Message */}
              <div
                style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.65rem)',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--ivory)',
                  lineHeight: 1.7,
                  marginBottom: '2.5rem',
                  whiteSpace: 'pre-line',
                  fontWeight: 500
                }}
              >
                {finalSurprise.revealedMessage}
              </div>

              {/* Editable Forever Promise Card */}
              <div
                style={{
                  background: 'rgba(255, 182, 193, 0.12)',
                  border: '1px solid rgba(255, 182, 193, 0.5)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  marginBottom: '2.5rem',
                  textAlign: 'left'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#FFD1DC',
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    marginBottom: '0.75rem'
                  }}
                >
                  <Award size={20} className="text-gold" />
                  <span>{finalSurprise.promiseTitle}</span>
                </div>
                <p
                  style={{
                    fontSize: '1rem',
                    color: '#FFF0F3',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-editorial)'
                  }}
                >
                  "{finalSurprise.promiseText}"
                </p>
              </div>

              {/* Replay Opening Button */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={onReplay}
                  className="btn-secondary"
                  style={{
                    padding: '0.85rem 1.8rem',
                    fontSize: '0.95rem'
                  }}
                >
                  <RotateCcw size={16} className="text-gold" />
                  <span>{finalSurprise.replayText}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
