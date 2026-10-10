import React, { useState, useEffect, useRef } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Navigation from './components/Navigation';
import MemoryTimeline from './components/MemoryTimeline';
import ReasonsSection from './components/ReasonsSection';
import LoveLetter from './components/LoveLetter';
import FinalSurprise from './components/FinalSurprise';
import MusicPlayer from './components/MusicPlayer';
import FloatingParticles from './components/FloatingParticles';
import ParticleBurst from './components/ParticleBurst';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [isOpened, setIsOpened] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.search.includes('open=true') || window.location.hash.length > 1;
    }
    return false;
  });

  // Stages: 0 = 12 Months, 1 = 365 Reasons, 2 = Love Letter, 3 = Final Surprise
  const [activeStage, setActiveStage] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [autoPlayRequested, setAutoPlayRequested] = useState(false);
  const [burstKey, setBurstKey] = useState(null);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const totalStages = 4;

  const goToStage = (targetStage, dir = null) => {
    if (targetStage === activeStage) return;
    const direction = dir || (targetStage > activeStage ? 'next' : 'prev');
    setSlideDirection(direction);
    setActiveStage(targetStage);
    setBurstKey(Date.now());
  };

  const nextStage = () => {
    if (activeStage < totalStages - 1) {
      goToStage(activeStage + 1, 'next');
    }
  };

  const prevStage = () => {
    if (activeStage > 0) {
      goToStage(activeStage - 1, 'prev');
    }
  };

  // Keyboard navigation (Left / Right arrows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        nextStage();
      } else if (e.key === 'ArrowLeft') {
        prevStage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStage]);

  // Mobile Touch Swipe navigation
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        nextStage();
      } else {
        prevStage();
      }
    }
  };

  const handleOpenHeart = () => {
    setIsOpened(true);
    setActiveStage(0);
    setAutoPlayRequested(true);
    setBurstKey(Date.now());
  };

  const handleReplay = () => {
    setActiveStage(0);
    setIsOpened(false);
  };

  return (
    <div
      className="stage-viewport"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Floating Particles */}
      <FloatingParticles />

      {/* Global Particle Burst Engine */}
      <ParticleBurst triggerKey={burstKey} />

      {/* Opening Cinematic Screen (Envelope & Wax Seal) */}
      {!isOpened && <WelcomeScreen onOpenHeart={handleOpenHeart} />}

      {/* Main Experience */}
      {isOpened && (
        <>
          {/* Streamlined Header Bar */}
          <Navigation onLogoClick={handleReplay} />

          {/* Floating Left / Right Navigation Arrows */}
          {activeStage > 0 && (
            <button
              onClick={prevStage}
              className="floating-stage-arrow left"
              aria-label="Previous chapter"
              title="Previous chapter"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {activeStage < totalStages - 1 && (
            <button
              onClick={nextStage}
              className="floating-stage-arrow right"
              aria-label="Next chapter"
              title="Next chapter"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Active Stage Container */}
          <main className="stage-main-area">
            <div
              key={activeStage}
              className={`stage-container ${
                slideDirection === 'next' ? 'stage-slide-next' : 'stage-slide-prev'
              }`}
            >
              <div className="stage-scroll-inner">
                {/* STAGE 0: Our Year (12 Monthly Chapters Grid & Individual Month Drilldown) */}
                {activeStage === 0 && (
                  <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto' }}>
                    <MemoryTimeline />

                    <div style={{ textAlign: 'center', marginTop: '2.5rem', paddingBottom: '2rem' }}>
                      <button
                        onClick={() => goToStage(1, 'next')}
                        className="btn-primary"
                        style={{ padding: '0.95rem 2.4rem', fontSize: '1.08rem' }}
                      >
                        <span>Continue to All 365 Reasons</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STAGE 1: All 365 Reasons (In Packets of 20-20) */}
                {activeStage === 1 && (
                  <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto' }}>
                    <ReasonsSection />

                    <div style={{ textAlign: 'center', marginTop: '2.5rem', paddingBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => goToStage(0, 'prev')}
                        className="btn-secondary"
                        style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
                      >
                        <ChevronLeft size={18} />
                        <span>Back to 12 Months</span>
                      </button>
                      <button
                        onClick={() => goToStage(2, 'next')}
                        className="btn-primary"
                        style={{ padding: '0.95rem 2.4rem', fontSize: '1.08rem' }}
                      >
                        <span>Read My Love Letter</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STAGE 2: My Love Letter */}
                {activeStage === 2 && (
                  <div style={{ maxWidth: '850px', width: '100%', margin: '0 auto' }}>
                    <LoveLetter />

                    <div style={{ textAlign: 'center', marginTop: '2.5rem', paddingBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => goToStage(1, 'prev')}
                        className="btn-secondary"
                        style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}
                      >
                        <ChevronLeft size={18} />
                        <span>Back to 365 Reasons</span>
                      </button>
                      <button
                        onClick={() => goToStage(3, 'next')}
                        className="btn-primary"
                        style={{ padding: '0.95rem 2.4rem', fontSize: '1.08rem' }}
                      >
                        <span>Open Your Final Surprise</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STAGE 3: Grand Finale Surprise */}
                {activeStage === 3 && (
                  <div style={{ maxWidth: '850px', width: '100%', margin: '0 auto' }}>
                    <FinalSurprise onReplay={handleReplay} />

                    <div style={{ textAlign: 'center', marginTop: '1rem', paddingBottom: '2rem' }}>
                      <button
                        onClick={() => goToStage(2, 'prev')}
                        className="btn-secondary"
                        style={{ padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}
                      >
                        <ChevronLeft size={16} />
                        <span>Back to Love Letter</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>

          {/* Persistent Floating Music Player */}
          <MusicPlayer isAutoPlayRequested={autoPlayRequested} />
        </>
      )}
    </div>
  );
}
