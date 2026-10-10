import React, { useState, useEffect } from 'react';
import { Camera, Heart, Calendar, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import TiltCard from './TiltCard';

/**
 * PolaroidPhoto
 * Renders a Polaroid-style framed photo with a caption, subtle tilt, and automatic multi-extension fallback.
 */
function PolaroidPhoto({ src, caption, isFeatured = false, rotation = 0 }) {
  const candidateUrls = [
    src,
    `${src}.jpg`,
    `${src}.JPG`,
    `${src}.png`,
    `${src}.PNG`,
    `${src}.jpeg`
  ];
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setAttemptIndex(0);
    setImgError(false);
  }, [src]);

  const handleImageError = () => {
    if (attemptIndex < candidateUrls.length - 1) {
      setAttemptIndex((prev) => prev + 1);
    } else {
      setImgError(true);
    }
  };

  return (
    <div
      style={{
        background: '#FFF5F7',
        padding: isFeatured ? '14px 14px 28px 14px' : '10px 10px 22px 10px',
        borderRadius: '6px',
        boxShadow: '0 12px 28px rgba(35, 3, 12, 0.5), 0 2px 6px rgba(0,0,0,0.15)',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        maxWidth: isFeatured ? '100%' : '260px',
        margin: '0 auto',
        border: '1px solid #FFB6C1'
      }}
      className="polaroid-frame"
    >
      {/* Little decorative light-pink tape pin on top */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10px',
          width: '50px',
          height: '16px',
          background: 'rgba(255, 182, 193, 0.85)',
          borderRadius: '2px',
          boxShadow: '0 2px 4px rgba(35, 3, 12, 0.25)',
          transform: 'rotate(-2deg)'
        }}
      />

      {/* Image or Graceful Placeholder */}
      <div
        style={{
          width: '100%',
          aspectRatio: isFeatured ? '4/3' : '1/1',
          background: imgError
            ? 'radial-gradient(circle, #800020 0%, #4A0E17 100%)'
            : '#FFE4E9',
          borderRadius: '4px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {!imgError ? (
          <img
            src={candidateUrls[attemptIndex]}
            alt={caption || 'Anniversary memory photo'}
            loading="lazy"
            onError={handleImageError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        ) : (
          <div
            style={{
              padding: '1.25rem',
              textAlign: 'center',
              color: 'var(--ivory)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              height: '100%'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255, 182, 193, 0.22)',
                border: '1px solid #FFB6C1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Camera size={24} color="#FFD1DC" />
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: isFeatured ? '1rem' : '0.85rem',
                color: '#FFD1DC',
                fontWeight: 600
              }}
            >
              Our Cherished Photo
            </div>
            <p
              style={{
                fontSize: '0.72rem',
                color: 'rgba(255, 240, 243, 0.85)',
                lineHeight: 1.25,
                maxWidth: '220px'
              }}
            >
              Drop image file at:
              <br />
              <code style={{ color: '#FFB6C1', fontSize: '0.68rem' }}>{src}</code>
            </p>
          </div>
        )}
      </div>

      {/* Polaroid Handwritten Caption */}
      <div
        className="text-handwriting"
        style={{
          marginTop: '0.75rem',
          fontSize: isFeatured ? '1.35rem' : '1.1rem',
          color: '#6B0F24',
          textAlign: 'center',
          lineHeight: 1.2,
          padding: '0 0.5rem'
        }}
      >
        {caption || 'A moment frozen in love ❤️'}
      </div>
    </div>
  );
}

export default function MemoryCard({
  chapter,
  currentIndex,
  totalChapters,
  onPrev,
  onNext,
  onBackToMonths
}) {
  return (
    <article
      className="glass-card animate-fade-in-up"
      style={{
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Banner: Chapter index, Back to Months, and Date badge */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(255, 182, 193, 0.35)',
          paddingBottom: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {onBackToMonths && (
            <button
              onClick={onBackToMonths}
              className="btn-secondary"
              style={{
                padding: '0.4rem 0.95rem',
                fontSize: '0.85rem',
                background: 'rgba(255, 182, 193, 0.2)',
                borderColor: '#FFB6C1'
              }}
              aria-label="Back to all months"
            >
              <ChevronLeft size={16} />
              <span>← All Months</span>
            </button>
          )}

          <span
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)',
              color: '#590D22',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.04em'
            }}
          >
            CHAPTER {chapter.id} OF {totalChapters}
          </span>
          <span
            style={{
              fontSize: '1rem',
              color: '#FFD1DC',
              fontFamily: 'var(--font-serif)',
              fontWeight: 600
            }}
          >
            {chapter.month}
          </span>
        </div>

        {/* Date Field */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.9rem',
            color: '#FFF0F3',
            background: 'rgba(255, 182, 193, 0.14)',
            padding: '0.3rem 0.8rem',
            borderRadius: '9999px',
            border: '1px solid var(--glass-border)'
          }}
        >
          <Calendar size={14} className="text-gold" />
          <span>{chapter.date}</span>
        </div>
      </div>

      {/* Main Chapter Content Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Heading, Captions, Notes */}
        <div>
          <h3
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: 'var(--ivory)',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}
          >
            {chapter.heading}
          </h3>

          <p
            style={{
              fontSize: '1.15rem',
              color: '#FFD1DC',
              fontStyle: 'italic',
              fontFamily: 'var(--font-editorial)',
              marginBottom: '1.25rem',
              lineHeight: 1.5
            }}
          >
            "{chapter.caption}"
          </p>

          {chapter.notes && (
            <div
              style={{
                background: 'rgba(74, 14, 23, 0.6)',
                borderLeft: '3px solid #FFB6C1',
                padding: '1rem 1.25rem',
                borderRadius: '0 12px 12px 0',
                marginBottom: '1.5rem',
                fontSize: '0.95rem',
                color: '#FFF0F3',
                lineHeight: 1.6
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#FFB6C1',
                  fontWeight: 700,
                  marginBottom: '0.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Sparkles size={12} className="text-gold" />
                <span>Memory Notes</span>
              </div>
              {chapter.notes}
            </div>
          )}

          {/* Additional Photos Strip if available */}
          {chapter.additionalPhotos && chapter.additionalPhotos.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--blush)',
                  fontFamily: 'var(--font-serif)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Heart size={14} fill="currentColor" />
                <span>More glimpses of us this month:</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  justifyContent: 'flex-start'
                }}
              >
                {chapter.additionalPhotos.map((photo, i) => (
                  <PolaroidPhoto
                    key={i}
                    src={photo.url}
                    caption={photo.caption}
                    rotation={i % 2 === 0 ? -2 : 2}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Featured Polaroid Photo */}
        <div>
          <TiltCard maxTilt={14}>
            <PolaroidPhoto
              src={chapter.featuredPhoto?.url}
              caption={chapter.featuredPhoto?.caption}
              isFeatured={true}
              rotation={1.5}
            />
          </TiltCard>
        </div>
      </div>

      {/* Bottom Month Switcher Controls */}
      <div
        style={{
          marginTop: '2.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 182, 193, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="btn-secondary"
          style={{
            opacity: currentIndex === 0 ? 0.4 : 1,
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
          }}
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
          <span>Previous Month</span>
        </button>

        <span
          style={{
            fontSize: '0.9rem',
            color: '#FFD1DC',
            fontWeight: 600
          }}
        >
          Month {currentIndex + 1} of {totalChapters}
        </span>

        <button
          onClick={onNext}
          disabled={currentIndex === totalChapters - 1}
          className="btn-secondary"
          style={{
            opacity: currentIndex === totalChapters - 1 ? 0.4 : 1,
            cursor: currentIndex === totalChapters - 1 ? 'not-allowed' : 'pointer'
          }}
          aria-label="Next month"
        >
          <span>Next Month</span>
          <ChevronRight size={18} />
        </button>
      </div>

      <style>{`
        .polaroid-frame:hover {
          transform: translateY(-6px) rotate(0deg) scale(1.02) !important;
          box-shadow: 0 20px 35px rgba(35, 3, 12, 0.65) !important;
        }
      `}</style>
    </article>
  );
}
