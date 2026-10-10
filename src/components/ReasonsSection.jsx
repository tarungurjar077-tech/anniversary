import React, { useState, useMemo, useRef } from 'react';
import { reasons } from '../data/reasons';
import { Heart, Sparkles, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

const PACKET_SIZE = 20;

export default function ReasonsSection() {
  const [activePacketIndex, setActivePacketIndex] = useState(0);
  const packetTopRef = useRef(null);

  // Group all 365 reasons into packets of 20-20 (1-20, 21-40, ..., 361-365)
  const packets = useMemo(() => {
    const result = [];
    for (let i = 0; i < reasons.length; i += PACKET_SIZE) {
      const slice = reasons.slice(i, i + PACKET_SIZE);
      const startNum = slice[0].id;
      const endNum = slice[slice.length - 1].id;
      result.push({
        index: result.length,
        label: `${startNum} – ${endNum}`,
        startNum,
        endNum,
        items: slice
      });
    }
    return result;
  }, []);

  const currentPacket = packets[activePacketIndex] || packets[0];

  const handleSelectPacket = (idx) => {
    setActivePacketIndex(idx);
    if (packetTopRef.current) {
      packetTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handlePrevPacket = () => {
    if (activePacketIndex > 0) {
      handleSelectPacket(activePacketIndex - 1);
    }
  };

  const handleNextPacket = () => {
    if (activePacketIndex < packets.length - 1) {
      handleSelectPacket(activePacketIndex + 1);
    }
  };

  return (
    <div className="container" style={{ padding: '1rem 0' }} ref={packetTopRef}>
      {/* Section Header */}
      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <div className="section-tag">
          <Heart size={20} fill="var(--blush)" color="var(--blush)" />
          <span>Every Single Day</span>
        </div>
        <h2 className="section-title">All 365 Reasons I Love You</h2>
        <p className="section-subtitle">
          Organized in packets of 20–20. Tap any packet below to read those 20 reasons sequentially line by line.
        </p>
        <div className="section-divider">
          <Sparkles size={16} className="text-gold" />
        </div>
      </div>

      {/* 20-20 Packets Selector Grid */}
      <div
        className="glass-card"
        style={{
          maxWidth: '900px',
          margin: '0 auto 2rem',
          padding: '1.25rem 1.4rem',
          border: '1px solid rgba(255, 182, 193, 0.5)'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.92rem',
              fontWeight: 700,
              color: 'var(--ivory)'
            }}
          >
            <Layers size={16} className="text-gold" />
            <span>Select a 20–20 Reason Packet ({packets.length} Packets Total):</span>
          </div>
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#590D22',
              background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)',
              padding: '0.25rem 0.85rem',
              borderRadius: '9999px'
            }}
          >
            Showing Reasons {currentPacket.label} of 365
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))',
            gap: '0.6rem'
          }}
        >
          {packets.map((pkt) => {
            const isSelected = pkt.index === activePacketIndex;
            return (
              <button
                key={pkt.index}
                onClick={() => handleSelectPacket(pkt.index)}
                style={{
                  padding: '0.55rem 0.65rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  background: isSelected
                    ? 'linear-gradient(135deg, #FFD1DC 0%, #FFB6C1 100%)'
                    : 'rgba(255, 182, 193, 0.14)',
                  color: isSelected ? '#590D22' : '#FFF0F3',
                  border: isSelected
                    ? '1.5px solid #FFF0F3'
                    : '1px solid rgba(255, 182, 193, 0.38)',
                  boxShadow: isSelected
                    ? '0 6px 16px rgba(35, 3, 12, 0.45), 0 0 12px rgba(255, 182, 193, 0.5)'
                    : 'none',
                  transform: isSelected ? 'translateY(-1px) scale(1.03)' : 'none',
                  transition: 'all 0.25s ease',
                  textAlign: 'center'
                }}
              >
                {pkt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Packet Banner + Top Prev/Next Controls */}
      <div
        style={{
          maxWidth: '850px',
          margin: '0 auto 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <button
          onClick={handlePrevPacket}
          disabled={activePacketIndex === 0}
          className="btn-secondary"
          style={{
            padding: '0.55rem 1.15rem',
            fontSize: '0.88rem',
            opacity: activePacketIndex === 0 ? 0.4 : 1,
            cursor: activePacketIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronLeft size={16} />
          <span>Previous 20</span>
        </button>

        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#FFD1DC',
            textAlign: 'center'
          }}
        >
          Packet {activePacketIndex + 1} of {packets.length} — Reasons {currentPacket.label}
        </div>

        <button
          onClick={handleNextPacket}
          disabled={activePacketIndex === packets.length - 1}
          className="btn-secondary"
          style={{
            padding: '0.55rem 1.15rem',
            fontSize: '0.88rem',
            opacity: activePacketIndex === packets.length - 1 ? 0.4 : 1,
            cursor: activePacketIndex === packets.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <span>Next 20</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Sequential Line-Wise 20 Reasons in Current Packet */}
      <div
        key={currentPacket.index}
        className="animate-fade-in-up"
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}
      >
        {currentPacket.items.map((r) => (
          <div
            key={r.id}
            className="glass-card"
            style={{
              padding: '1rem 1.4rem',
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              border: '1px solid rgba(255, 182, 193, 0.4)',
              transition: 'transform 0.2s ease, border-color 0.2s ease'
            }}
          >
            {/* Number Pill */}
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 800,
                fontSize: '0.95rem',
                color: '#590D22',
                background: 'linear-gradient(135deg, #FFD1DC, #FFB6C1)',
                padding: '0.2rem 0.65rem',
                borderRadius: '9999px',
                minWidth: '54px',
                textAlign: 'center',
                flexShrink: 0,
                letterSpacing: '0.02em'
              }}
            >
              #{r.id}
            </span>

            {/* Reason Text */}
            <p
              style={{
                fontSize: '1.08rem',
                lineHeight: 1.6,
                color: 'var(--ivory)',
                fontFamily: 'var(--font-editorial)',
                flex: 1
              }}
            >
              {r.text}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Packet Navigation Controls */}
      <div
        style={{
          maxWidth: '850px',
          margin: '1.75rem auto 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        <button
          onClick={handlePrevPacket}
          disabled={activePacketIndex === 0}
          className="btn-secondary"
          style={{
            padding: '0.65rem 1.35rem',
            fontSize: '0.92rem',
            opacity: activePacketIndex === 0 ? 0.4 : 1,
            cursor: activePacketIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronLeft size={16} />
          <span>Previous 20 Reasons</span>
        </button>

        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFD1DC' }}>
          Reasons {currentPacket.label} of 365
        </span>

        <button
          onClick={handleNextPacket}
          disabled={activePacketIndex === packets.length - 1}
          className="btn-secondary"
          style={{
            padding: '0.65rem 1.35rem',
            fontSize: '0.92rem',
            opacity: activePacketIndex === packets.length - 1 ? 0.4 : 1,
            cursor: activePacketIndex === packets.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <span>Next 20 Reasons</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Section Closing Note */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '2rem 1.5rem',
          borderTop: '1px solid rgba(255, 182, 193, 0.35)'
        }}
      >
        <div
          className="text-handwriting"
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            color: 'var(--blush)',
            marginBottom: '0.5rem'
          }}
        >
          365 reasons, one person: you.
        </div>
        <p style={{ fontSize: '1rem', color: 'rgba(255, 240, 243, 0.85)' }}>
          And a lifetime still to write beside you.
        </p>
      </div>
    </div>
  );
}
