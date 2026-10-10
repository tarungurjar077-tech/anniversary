import React from 'react';
import { siteContent } from '../data/siteContent';
import { Heart, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

export default function LoveLetter() {
  const { loveLetter } = siteContent;

  return (
    <section
      id="letter"
      style={{
        paddingTop: '1rem',
        paddingBottom: '1rem',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Heart size={20} fill="var(--blush)" color="var(--blush)" />
            <span>From My Heart</span>
          </div>
          <h2 className="section-title">My Love Letter To You</h2>
          <p className="section-subtitle">
            A handwritten reflection on the past 365 days of us, and my forever promise to you.
          </p>
          <div className="section-divider">
            <Sparkles size={16} className="text-gold" />
          </div>
        </div>

        {/* Light Pink Stationery Styled Love Letter Card with Maroon Ink */}
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            position: 'relative'
          }}
        >
          {/* Decorative Backing Glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '-10px',
              background: 'radial-gradient(circle, rgba(255, 182, 193, 0.35) 0%, transparent 70%)',
              filter: 'blur(20px)',
              zIndex: 0
            }}
          />

          <TiltCard maxTilt={5}>
            <article
              className="animate-fade-in-up"
              style={{
                position: 'relative',
                zIndex: 1,
                background: '#FFF0F3',
                color: '#4A0E17',
                borderRadius: '16px',
                padding: 'clamp(2rem, 6vw, 4.5rem)',
                boxShadow: '0 24px 60px rgba(35, 3, 12, 0.6), inset 0 0 40px rgba(255, 182, 193, 0.35)',
                border: '2px solid #FFB6C1'
              }}
            >
              {/* Top Maroon & Light Pink Wax Seal Decoration */}
              <div
                style={{
                  position: 'absolute',
                  top: '-26px',
                  left: 'calc(50% - 26px)',
                  width: '52px',
                  height: '52px',
                  background: 'radial-gradient(circle, #800020 30%, #4A0E17 90%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(35, 3, 12, 0.45)',
                  border: '2px solid #FFB6C1',
                  color: '#FFD1DC'
                }}
              >
                <Heart size={24} fill="#FFD1DC" color="#FFD1DC" />
              </div>

              {/* Letter Salutation */}
              <div
                className="text-handwriting"
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                  color: '#800020',
                  lineHeight: 1.2,
                  marginBottom: '1.75rem',
                  borderBottom: '1px dashed #FF8FA3',
                  paddingBottom: '0.75rem'
                }}
              >
                {loveLetter.salutation}
              </div>

              {/* Letter Opening / Intro */}
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
                  lineHeight: 1.8,
                  color: '#590D22',
                  marginBottom: '1.5rem',
                  fontWeight: 500
                }}
              >
                {loveLetter.intro}
              </p>

              {/* Letter Body Paragraphs */}
              {loveLetter.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.05rem, 2.4vw, 1.18rem)',
                    lineHeight: 1.8,
                    color: '#4A0E17',
                    marginBottom: '1.5rem'
                  }}
                >
                  {p}
                </p>
              ))}

              {/* Closing & Signature */}
              <div
                style={{
                  marginTop: '3rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px dashed #FF8FA3',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#800020',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  {loveLetter.signature.greeting}
                </div>

                <div
                  style={{
                    fontSize: '0.95rem',
                    color: '#6B0F24',
                    fontWeight: 600
                  }}
                >
                  {loveLetter.signature.date}
                </div>

                <div
                  style={{
                    fontStyle: 'italic',
                    color: '#590D22',
                    fontSize: '1.05rem',
                    fontFamily: 'var(--font-editorial)',
                    marginTop: '0.25rem'
                  }}
                >
                  "{loveLetter.signature.tagline}"
                </div>

                <div
                  className="text-handwriting"
                  style={{
                    fontSize: '2.4rem',
                    color: '#800020',
                    marginTop: '1rem',
                    lineHeight: 1
                  }}
                >
                  {loveLetter.signature.signoff}
                </div>
              </div>
            </article>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
