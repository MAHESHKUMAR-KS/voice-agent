import { useState, useEffect, useRef } from 'react';
import { UserCheck, Calendar, Database, Languages, CheckCircle2 } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  icon: 'qualified' | 'booked' | 'crm' | 'language';
}

// ── Stat counter hook ──────────────────────────────────────────
function useCounter(target: number, active: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return val;
}

// Format raw number → display string matching original labels
function formatStat(raw: number, label: string): string {
  if (label === 'Transcripts') {
    return (raw / 1000).toFixed(1) + 'K';
  }
  if (raw >= 1000) {
    return raw.toLocaleString();
  }
  return String(raw);
}

// ── Icon config ────────────────────────────────────────────────
const iconMap = {
  qualified: { Icon: UserCheck,  color: '#16A34A', bg: 'rgba(22,163,74,0.10)'  },
  booked:    { Icon: Calendar,   color: '#2D9B6F', bg: 'rgba(45,155,111,0.10)' },
  crm:       { Icon: Database,   color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
  language:  { Icon: Languages,  color: '#0EA5E9', bg: 'rgba(14,165,233,0.10)' },
};

// ── Stats ──────────────────────────────────────────────────────
const STATS = [
  { label: 'Voice Sessions', rawValue: 1243 },
  { label: 'PDFs Uploaded',  rawValue: 892  },
  { label: 'Transcripts',    rawValue: 1100 },
];

// ── Component ──────────────────────────────────────────────────
export default function LiveActivityFeed() {
  const feedAnim = useScrollReveal({ threshold: 0.1 });
  const isVisible = feedAnim.visible;

  // Per-stat counters (rules-of-hooks: always call, conditionally activate)
  const c0 = useCounter(STATS[0].rawValue, isVisible);
  const c1 = useCounter(STATS[1].rawValue, isVisible);
  const c2 = useCounter(STATS[2].rawValue, isVisible);
  const counts = [c0, c1, c2];

  const activities: ActivityItem[] = [
    { id: '1', user: 'Healthcare Team',  action: 'Voice session started',     timestamp: '2 seconds ago',  icon: 'qualified' },
    { id: '2', user: 'Restaurant Staff', action: 'Menu PDF uploaded',          timestamp: '8 seconds ago',  icon: 'booked'    },
    { id: '3', user: 'Support Team',     action: 'Custom prompt configured',   timestamp: '15 seconds ago', icon: 'crm'       },
    { id: '4', user: 'Education Dept',   action: 'Transcript exported',        timestamp: '22 seconds ago', icon: 'language'  },
  ];

  return (
    <>
      {/* ── Scoped keyframes ── */}
      <style>{`
        /* Glow wrapper float */
        @keyframes laf-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }

        /* Pulsing live dot */
        @keyframes laf-dot-pulse {
          0%, 100% { opacity: 1;   transform: scale(1);    box-shadow: 0 0 0 0 rgba(22,163,74,0.5); }
          50%       { opacity: 0.7; transform: scale(1.15); box-shadow: 0 0 0 6px rgba(22,163,74,0);  }
        }

        /* Row slide-in */
        @keyframes laf-row-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* Check-icon pop */
        @keyframes laf-check-pop {
          0%   { opacity: 0; transform: scale(0.4); }
          70%  { transform: scale(1.25); }
          100% { opacity: 1; transform: scale(1);   }
        }

        /* Hover: green-tinted border */
        .laf-row:hover {
          transform: translateY(-2px);
          border-color: rgba(45,155,111,0.30) !important;
          box-shadow: 0 6px 18px rgba(45,155,111,0.10);
        }

        /* Reduce motion overrides */
        @media (prefers-reduced-motion: reduce) {
          .laf-float,
          .laf-dot,
          .laf-row,
          .laf-check { animation: none !important; }
          .laf-row   { opacity: 1 !important; transform: none !important; }
          .laf-check { opacity: 1 !important; transform: none !important; }
          .laf-row:hover { transform: none !important; }
        }
      `}</style>

      {/* ── Glow halo behind card ── */}
      <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: 460 }}>
        <div style={{
          position: 'absolute',
          inset: -24,
          background: 'radial-gradient(ellipse at 60% 50%, rgba(45,155,111,0.13) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          borderRadius: 40,
        }} />

        {/* ── Card ── */}
        <div
          ref={feedAnim.ref}
          className="laf-float"
          style={{
            position: 'relative',
            zIndex: 1,
            background: 'linear-gradient(160deg, #ffffff 0%, #f0fdf9 100%)',
            border: '1px solid rgba(45,155,111,0.14)',
            borderRadius: 20,
            padding: '24px 24px 20px',
            boxShadow: '0 8px 32px rgba(45,155,111,0.10), 0 1px 4px rgba(0,0,0,0.04)',
            animation: 'laf-float 6s ease-in-out infinite',
            width: '100%',
          }}
        >

          {/* ── Header ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 18,
            paddingBottom: 14,
            borderBottom: '1px solid rgba(45,155,111,0.10)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              {/* Pulsing dot */}
              <div
                className="laf-dot"
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: '#16A34A',
                  flexShrink: 0,
                  animation: 'laf-dot-pulse 2s ease-in-out infinite',
                }}
              />
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', margin: 0, lineHeight: 1 }}>
                Live Activity
              </h3>
            </div>
            <span style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#475569',
              fontFamily: 'IBM Plex Mono, monospace',
              letterSpacing: '0.01em',
            }}>
              247 sessions active
            </span>
          </div>

          {/* ── Activity Rows ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {activities.map((activity, index) => {
              const { Icon, color, bg } = iconMap[activity.icon];
              const delay = `${0.12 + index * 0.10}s`;
              return (
                <div
                  key={activity.id}
                  className="laf-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 14px',
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(45,155,111,0.09)',
                    borderRadius: 13,
                    transition: 'transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
                    cursor: 'default',
                    /* staggered reveal */
                    animation: isVisible
                      ? `laf-row-in 0.48s cubic-bezier(0.22,1,0.36,1) ${delay} both`
                      : 'none',
                    opacity: isVisible ? undefined : 0,
                  }}
                >
                  {/* Icon tile */}
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 11,
                    background: bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon style={{ width: 19, height: 19, color }} />
                  </div>

                  {/* Text block – left-aligned */}
                  <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 650,
                      color: '#0f172a',
                      lineHeight: 1.2,
                      marginBottom: 3,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {activity.user}
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: '#475569',
                      lineHeight: 1.3,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {activity.action}
                    </div>
                  </div>

                  {/* Right column: check + timestamp */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 5,
                    flexShrink: 0,
                  }}>
                    <CheckCircle2
                      className="laf-check"
                      style={{
                        width: 16,
                        height: 16,
                        color: '#16A34A',
                        animation: isVisible
                          ? `laf-check-pop 0.38s cubic-bezier(0.22,1,0.36,1) ${parseFloat(delay) + 0.28}s both`
                          : 'none',
                        opacity: isVisible ? undefined : 0,
                      }}
                    />
                    <span style={{
                      fontSize: 11,
                      color: '#64748b',
                      fontFamily: 'IBM Plex Mono, monospace',
                      letterSpacing: '0.01em',
                      whiteSpace: 'nowrap',
                    }}>
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Stats Footer ── */}
          <div style={{
            marginTop: 18,
            paddingTop: 16,
            borderTop: '1px solid rgba(45,155,111,0.12)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
          }}>
            {STATS.map((stat, i) => (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  padding: '0 8px',
                  borderRight: i < 2 ? '1px solid rgba(45,155,111,0.12)' : 'none',
                }}
              >
                <div style={{
                  fontSize: 21,
                  fontWeight: 800,
                  color: 'var(--brand)',
                  lineHeight: 1.1,
                  marginBottom: 4,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em',
                }}>
                  {formatStat(counts[i], stat.label)}
                </div>
                <div style={{
                  fontSize: 10,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                  fontFamily: 'IBM Plex Mono, monospace',
                  lineHeight: 1.3,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>{/* /card */}
      </div>{/* /glow wrapper */}

      {/* ── Responsive overrides ── */}
      <style>{`
        @media (max-width: 640px) {
          .laf-float {
            border-radius: 16px !important;
            padding: 20px 16px 16px !important;
          }
        }
      `}</style>
    </>
  );
}
