import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number;
}

export default function LoadingScreen({ onComplete, minDuration = 1800 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const statusMessages = [
    'Initializing experience...',
    'Preparing your workspace...',
    'Loading intelligent services...',
    'Almost ready...',
  ];

  useEffect(() => {
    // Check for prefers-reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 500 : minDuration;

    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Smooth cubic ease-out curve for natural acceleration and deceleration
      const easedProgress = 1 - Math.pow(1 - rawProgress, 2.5);
      const currentPercent = Math.round(easedProgress * 100);

      setProgress(currentPercent);

      // Update status messages smoothly across progress thresholds
      if (currentPercent < 28) {
        setStatusIndex(0);
      } else if (currentPercent < 58) {
        setStatusIndex(1);
      } else if (currentPercent < 88) {
        setStatusIndex(2);
      } else {
        setStatusIndex(3);
      }

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setStatusIndex(3);

        // Brief hold at 100% before smooth fade-out sequence
        setTimeout(() => {
          setIsFadingOut(true);

          if (onComplete) {
            onComplete();
          }

          // Unmount from DOM after transition finishes
          setTimeout(() => {
            setIsMounted(false);
          }, 500);
        }, 160);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [minDuration, onComplete]);

  // Prevent scroll during loading
  useEffect(() => {
    if (isMounted && !isFadingOut) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMounted, isFadingOut]);

  if (!isMounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Adople AI"
      className="adople-loading-screen"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAFBFD',
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease',
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.02)' : 'scale(1)',
        filter: isFadingOut ? 'blur(6px)' : 'none',
        pointerEvents: isFadingOut ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes adople-fade-scale {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes adople-slide-up {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes adople-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes adople-status-fade {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes adople-pulse-aura {
          0% {
            transform: scale(0.95);
            opacity: 0.65;
          }
          100% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .adople-loading-screen,
          .adople-loading-screen * {
            animation: none !important;
            transition: opacity 0.2s ease !important;
          }
        }
      `}</style>

      {/* Subtle blue/violet ambient glow in the background */}
      <div
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45, 155, 111, 0.12) 0%, rgba(52, 211, 153, 0.05) 45%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'adople-pulse-aura 3s ease-in-out infinite alternate',
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 420,
          width: '100%',
        }}
      >
        {/* Adople AI Logo with subtle aura */}
        <div
          style={{
            position: 'relative',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'adople-fade-scale 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: 22,
              background: 'linear-gradient(135deg, rgba(45, 155, 111, 0.18) 0%, rgba(52, 211, 153, 0.12) 100%)',
              filter: 'blur(10px)',
            }}
          />
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#FFFFFF',
              border: '1px solid rgba(45, 155, 111, 0.22)',
              boxShadow: '0 12px 28px rgba(45, 155, 111, 0.16), 0 2px 6px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <img
              src="/logo.webp"
              alt="Adople AI"
              style={{
                height: 42,
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#0F172A',
            marginBottom: 6,
            fontFamily: "'Inter', system-ui, sans-serif",
            animation: 'adople-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both',
          }}
        >
          Adople AI
        </div>

        {/* Supporting line */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#64748B',
            letterSpacing: '0.02em',
            marginBottom: 28,
            fontFamily: "'Inter', system-ui, sans-serif",
            animation: 'adople-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both',
          }}
        >
          Intelligent Voice & AI Solutions
        </div>

        {/* Thin animated loading progress indicator */}
        <div
          style={{
            width: 220,
            maxWidth: '75vw',
            height: 3,
            borderRadius: 999,
            background: 'rgba(45, 155, 111, 0.12)',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: 16,
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
            animation: 'adople-fade-in 0.6s ease 0.3s both',
          }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #2D9B6F 0%, #34D399 100%)',
              borderRadius: 999,
              transition: 'width 0.12s linear',
              boxShadow: '0 0 10px rgba(45, 155, 111, 0.5)',
              position: 'relative',
            }}
          >
            {/* Shimmer highlight on leading edge */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: 24,
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.85))',
                borderRadius: 999,
              }}
            />
          </div>
        </div>

        {/* Subtle rotating status text */}
        <div
          style={{
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'adople-fade-in 0.6s ease 0.35s both',
          }}
        >
          <span
            key={statusIndex}
            style={{
              fontSize: 11.5,
              fontFamily: "'IBM Plex Mono', monospace, ui-monospace",
              color: '#64748B',
              letterSpacing: '0.03em',
              animation: 'adople-status-fade 0.3s ease',
            }}
          >
            {statusMessages[statusIndex]}
          </span>
        </div>
      </div>
    </div>
  );
}
