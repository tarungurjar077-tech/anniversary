import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function MusicPlayer({ isAutoPlayRequested = false }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [synthAudioActive, setSynthAudioActive] = useState(false);
  const synthCtxRef = useRef(null);
  const synthTimerRef = useRef(null);

  // Initialize and handle playback
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Attempt play when requested (e.g. from Opening experience)
  useEffect(() => {
    if (isAutoPlayRequested && audioRef.current && !isPlaying) {
      startPlayback();
    }
  }, [isAutoPlayRequested]);

  // Fallback romantic harmonic chime generator using Web Audio API if MP3 is missing
  const startAmbientSynth = () => {
    try {
      if (!window.AudioContext && !window.webkitAudioContext) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!synthCtxRef.current) {
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Gentle romantic arpeggio notes (F, A, C, E, G in Hz)
      const notes = [174.61, 220.00, 261.63, 329.63, 392.00, 523.25];
      let step = 0;

      const playChime = () => {
        if (!synthAudioActive) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[step % notes.length], ctx.currentTime);
        step = (step + 1) % notes.length;

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08 * volume, ctx.currentTime + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 3.5);
      };

      setSynthAudioActive(true);
      playChime();
      synthTimerRef.current = setInterval(playChime, 2400);
    } catch (e) {
      console.warn('Ambient chime audio initialized in silent mode.', e);
    }
  };

  const stopAmbientSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    setSynthAudioActive(false);
  };

  const startPlayback = () => {
    if (!audioRef.current) return;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch((err) => {
          console.info('Audio file /music/our-song.mp3 not yet added or autoplay restricted. Starting ambient chimes.', err);
          setHasError(true);
          setErrorMessage('Drop our-song.mp3 in public/music/ to play your custom song! Playing ambient chimes now.');
          setIsPlaying(true);
          startAmbientSynth();
        });
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopAmbientSynth();
      setIsPlaying(false);
    } else {
      startPlayback();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleAudioError = () => {
    setHasError(true);
    setErrorMessage('Custom MP3 not found at public/music/our-song.mp3. Ambient gentle chimes active.');
  };

  return (
    <>
      {/* Underlying Audio Element */}
      <audio
        ref={audioRef}
        src="/music/our-song.mp3"
        loop
        preload="auto"
        onError={handleAudioError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Persistent Dock (Maroon & Light Pink) */}
      <aside
        aria-label="Background music player"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 90,
          background: 'rgba(89, 13, 34, 0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 182, 193, 0.5)',
          borderRadius: '24px',
          boxShadow: '0 12px 32px rgba(35, 3, 12, 0.6), 0 0 15px rgba(255, 182, 193, 0.25)',
          padding: isCollapsed ? '0.5rem 0.9rem' : '0.75rem 1.25rem',
          color: 'var(--ivory)',
          transition: 'all 0.35s ease',
          maxWidth: isCollapsed ? '160px' : '340px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          {/* Track icon and equalizer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #800020, #590D22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #FFB6C1',
                flexShrink: 0
              }}
            >
              <Music size={18} color="#FFD1DC" />
            </div>

            {!isCollapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--ivory)', whiteSpace: 'nowrap' }}>
                  Our Song
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    color: isPlaying ? '#FFD1DC' : 'rgba(255, 240, 243, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {isPlaying ? (
                    <>
                      <span className="eq-bar" />
                      <span className="eq-bar" />
                      <span className="eq-bar" />
                      <span className="eq-bar" />
                      <span style={{ marginLeft: '4px' }}>Playing</span>
                    </>
                  ) : (
                    <span>Paused</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#FFB6C1',
                color: '#590D22',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s ease',
                boxShadow: '0 2px 8px rgba(255, 182, 193, 0.4)'
              }}
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: '2px' }} />}
            </button>

            {/* Mute/Unmute */}
            {!isCollapsed && (
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute music' : 'Mute music'}
                style={{
                  color: isMuted ? '#FF8FA3' : '#FFD1DC',
                  padding: '6px'
                }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            )}

            {/* Collapse toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? 'Expand music player' : 'Collapse music player'}
              style={{ color: 'rgba(255, 240, 243, 0.75)', padding: '4px' }}
            >
              {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Volume slider & MP3 status tip when expanded */}
        {!isCollapsed && (
          <div style={{ marginTop: '0.6rem', borderTop: '1px solid rgba(255, 182, 193, 0.22)', paddingTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255, 240, 243, 0.8)' }}>Volume:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Music volume"
                style={{
                  width: '100%',
                  accentColor: '#FFB6C1',
                  cursor: 'pointer',
                  height: '4px'
                }}
              />
            </div>

            {hasError && (
              <div
                style={{
                  marginTop: '0.4rem',
                  fontSize: '0.68rem',
                  color: '#FFD1DC',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '4px',
                  lineHeight: 1.3
                }}
              >
                <AlertCircle size={12} style={{ flexShrink: 0, marginTop: '1px' }} />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
