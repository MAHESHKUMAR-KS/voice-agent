import { useState, useEffect, useRef } from 'react';
import { Clock, Wrench, FileText, X } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

// Helper to extract numeric part for animation
function extractLastNumber(str: string) {
  const match = str.match(/(.*?)((?:-?)\d+\.?\d*)([^\d]*)$/);
  if (!match) return { prefix: str, num: null, suffix: '', isFloat: false };
  return {
    prefix: match[1],
    num: parseFloat(match[2]),
    suffix: match[3],
    isFloat: match[2].includes('.')
  };
}

function useMixedCounter(targetStr: string, active: boolean, duration = 1000) {
  const [val, setVal] = useState('0');
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(targetStr);
      started.current = true;
      return;
    }

    const { prefix, num, suffix, isFloat } = extractLastNumber(targetStr);
    if (num === null) {
      setVal(targetStr);
      started.current = true;
      return;
    }

    started.current = true;
    const start = performance.now();
    const startNum = 0;

    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const currentNum = startNum + (num - startNum) * ease;
      
      const displayNum = isFloat ? currentNum.toFixed(1) : Math.round(currentNum).toString();
      setVal(prefix + displayNum + suffix);
      
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        setVal(targetStr);
      }
    };
    requestAnimationFrame(step);
  }, [active, targetStr, duration]);

  return val;
}

const problems = [
  {
    Icon: Clock,
    title: 'Support Teams Buried in Ticket Backlog',
    bullets: [
      'Average 45-minute hold times',
      'Agents toggling between 12+ systems',
      '68% of calls are repeat questions',
      'Overnight/weekend coverage gaps',
    ],
    statValue: '45',
    statSuffix: '\u00A0MIN',
  },
  {
    Icon: Wrench,
    title: 'Field Techs Stuck Without Answers',
    bullets: [
      '300-page manuals impossible to search mid-job',
      'Hands-free access not available',
      'Outdated paper documentation',
      '$2,400 average truck roll cost',
    ],
    statValue: '$2.4',
    statSuffix: 'K',
  },
  {
    Icon: FileText,
    title: 'Knowledge Trapped in Static Files',
    bullets: [
      "PDFs and SharePoint folders don't talk back",
      'ChatGPT hallucinates policy details',
      'No audit trail of what was actually said',
      "Compliance teams can't verify answers",
    ],
    statValue: '0',
    statSuffix: '\u00A0AUDIT',
  },
];

export default function ProblemSection() {
  const sectionAnim = useScrollReveal({ threshold: 0.08 });
  const isVisible = sectionAnim.visible;

  return (
    <>
      <style>{`
        @keyframes ps-card-in {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes ps-bullet-in {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        
        .ps-section {
          padding: 100px 0 24px;
          background: transparent;
        }

        .ps-card {
          background: white;
          border-radius: 16px;
          padding: 32px 28px;
          border: 1px solid rgba(45,155,111,0.15);
          box-shadow: 0 4px 20px rgba(45,155,111,0.06), 0 1px 4px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }

        .ps-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(52,211,153,0.1) 0%, rgba(255,255,255,0) 40%);
          pointer-events: none;
          z-index: 0;
        }

        .ps-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--brand), #34D399);
        }

        .ps-card:hover {
          transform: translateY(-4px);
          border-color: rgba(45,155,111,0.4);
          box-shadow: 0 16px 40px rgba(45,155,111,0.12), 0 4px 12px rgba(0,0,0,0.04);
        }

        .ps-content {
          position: relative;
          z-index: 1;
        }

        .ps-stat-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .ps-stat {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 48px;
          font-weight: 800;
          color: var(--brand);
          line-height: 1;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.03em;
          display: flex;
          align-items: baseline;
        }

        .ps-stat-suffix {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .ps-icon-tile {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(45,155,111,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ps-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.35;
          margin: 0 0 24px 0;
        }

        .ps-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .ps-bullet {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 15px;
          color: #334155;
          line-height: 1.6;
        }

        .ps-bullet-icon {
          flex-shrink: 0;
          margin-top: 4px;
          color: rgba(45,155,111,0.8);
        }

        /* Responsive layout */
        .ps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          align-items: stretch;
        }

        @media (max-width: 1024px) {
          .ps-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 767px) {
          .ps-section { padding-bottom: 96px; }
          .ps-stat { font-size: 38px !important; }
          .ps-stat-suffix { font-size: 16px !important; }
          .ps-card { padding: 28px 24px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ps-card { animation: none !important; opacity: 1 !important; transform: none !important; }
          .ps-card:hover { transform: none !important; }
          .ps-bullet { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <section
        ref={sectionAnim.ref}
        className="ps-section"
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2
              className={`animate-in ${isVisible ? 'visible' : ''}`}
              style={{ fontSize: 42, fontWeight: 800, marginBottom: 16, color: 'var(--ink)' }}
            >
              The Problem
            </h2>
            <p
              className={`animate-in ${isVisible ? 'visible' : ''} animate-delay-1`}
              style={{ fontSize: 18, color: 'var(--slate)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}
            >
              Knowledge workers waste hours searching for answers. Your customers wait. Your reputation suffers.
            </p>
          </div>

          <div className="ps-grid">
            {problems.map((problem, i) => {
              const cardDelay = `${0.10 + i * 0.12}s`;
              return (
                <div
                  key={i}
                  className="ps-card"
                  style={{
                    animation: isVisible
                      ? `ps-card-in 0.52s cubic-bezier(0.22,1,0.36,1) ${cardDelay} both`
                      : 'none',
                    opacity: isVisible ? undefined : 0,
                  }}
                >
                  <div className="ps-content">
                    <div className="ps-stat-row">
                      <div className="ps-stat">
                        <span>{useMixedCounter(problem.statValue, isVisible)}</span>
                        <span className="ps-stat-suffix">{problem.statSuffix}</span>
                      </div>
                      <div className="ps-icon-tile" aria-hidden="true">
                        <problem.Icon style={{ width: 20, height: 20, color: 'var(--brand)' }} />
                      </div>
                    </div>

                    <h3 className="ps-title">
                      {problem.title}
                    </h3>

                    <ul className="ps-bullets">
                      {problem.bullets.map((bullet, j) => {
                        const bulletDelay = `${parseFloat(cardDelay) + 0.22 + j * 0.06}s`;
                        return (
                          <li
                            key={j}
                            className="ps-bullet"
                            style={{
                              animation: isVisible
                                ? `ps-bullet-in 0.38s ease ${bulletDelay} both`
                                : 'none',
                              opacity: isVisible ? undefined : 0,
                            }}
                          >
                            <X
                              className="ps-bullet-icon"
                              style={{ width: 14, height: 14 }}
                              aria-hidden="true"
                            />
                            <span>{bullet}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
