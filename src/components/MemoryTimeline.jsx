import React, { useState } from 'react';
import { memories } from '../data/memories';
import MemoryCard from './MemoryCard';
import TiltCard from './TiltCard';
import { Calendar, Sparkles, Heart, ArrowRight } from 'lucide-react';

export default function MemoryTimeline() {
  // null means show all 12 months overview grid first; number means specific month opened
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);

  const handleOpenMonth = (index) => {
    setSelectedMonthIndex(index);
  };

  const handleBackToGrid = () => {
    setSelectedMonthIndex(null);
  };

  const handlePrev = () => {
    setSelectedMonthIndex((prev) => Math.max(0, (prev ?? 0) - 1));
  };

  const handleNext = () => {
    setSelectedMonthIndex((prev) => Math.min(memories.length - 1, (prev ?? 0) + 1));
  };

  // If a specific month is selected, render that month's full detail
  if (selectedMonthIndex !== null) {
    const activeChapter = memories[selectedMonthIndex];
    return (
      <div className="container animate-fade-in-up" style={{ padding: '1rem 0' }}>
        <MemoryCard
          chapter={activeChapter}
          currentIndex={selectedMonthIndex}
          totalChapters={memories.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onBackToMonths={handleBackToGrid}
        />
      </div>
    );
  }

  // Default view: Show all 12 months names first in an interactive grid
  return (
    <div className="container" style={{ padding: '1rem 0' }}>
      {/* Section Header */}
      <div className="section-header" style={{ marginBottom: '2.5rem' }}>
        <div className="section-tag">
          <Heart size={20} fill="var(--blush)" color="var(--blush)" />
          <span>Our Year Together</span>
        </div>
        <h2 className="section-title">12 Months of Us</h2>
        <p className="section-subtitle">
          Tap on any month below to open our photographs, captions, and memories from that time.
        </p>
        <div className="section-divider">
          <Sparkles size={16} className="text-gold" />
        </div>
      </div>

      {/* 12 Months Interactive Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem',
          maxWidth: '1100px',
          margin: '0 auto 2rem'
        }}
      >
        {memories.map((m, idx) => (
          <TiltCard key={m.id} maxTilt={10}>
            <div
              onClick={() => handleOpenMonth(idx)}
              className="glass-card"
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                border: '1.5px solid rgba(255, 182, 193, 0.45)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                minHeight: '170px',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Top row: Chapter badge & Date */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem'
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#590D22',
                    background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                    letterSpacing: '0.04em'
                  }}
                >
                  CHAPTER {m.id}
                </span>

                <span
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(255, 240, 243, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Calendar size={12} className="text-gold" />
                  <span>{m.date}</span>
                </span>
              </div>

              {/* Month Name & Heading */}
              <div>
                <h3
                  style={{
                    fontSize: '1.35rem',
                    color: '#FFD1DC',
                    marginBottom: '0.35rem',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  {m.month}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--ivory)',
                    lineHeight: 1.4,
                    opacity: 0.95
                  }}
                >
                  {m.heading}
                </p>
              </div>

              {/* Tap prompt */}
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#FFB6C1',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}
              >
                <span>Open Memories</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
