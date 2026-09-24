import { useState, useRef, useEffect } from 'react';
import { ArrowRight, FileText, Mic2, Sparkles, Stethoscope, Utensils, GraduationCap, Briefcase, ChevronRight, ChevronDown } from 'lucide-react';
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

function useMixedCounter(targetStr: string, active: boolean, duration = 800) {
  const [val, setVal] = useState(targetStr);
  const started = useRef(false);

  useEffect(() => {
    started.current = false;
  }, [targetStr]);

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

interface UseCase {
  id: string;
  title: string;
  icon: any;
  scenario: string;
  steps: { icon: any; label: string; detail: string }[];
  metrics: { value: string; label: string }[];
}

export default function UseCaseTabs({ scrollToForm }: { scrollToForm: () => void }) {
  const sectionAnim = useScrollReveal({ threshold: 0.1 });
  const isVisible = sectionAnim.visible;
  const [activeTab, setActiveTab] = useState('healthcare');
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const useCases: Record<string, UseCase> = {
    healthcare: {
      id: 'healthcare',
      title: 'Healthcare',
      icon: Stethoscope,
      scenario: 'Patients need clear explanations of benefits documents without waiting on hold.',
      steps: [
        { icon: FileText, label: 'Upload Documents', detail: 'Benefits plans, coverage policies, claim procedures' },
        { icon: Mic2, label: 'Configure Persona', detail: 'Friendly medical helper, HIPAA-compliant language' },
        { icon: Sparkles, label: 'Start Talking', detail: 'Ask questions in plain language, get instant voice answers' },
      ],
      metrics: [
        { value: '3.2x', label: 'Faster Claims' },
        { value: '100%', label: 'Audit Trail' },
        { value: 'Zero', label: 'PHI Exposure' },
      ],
    },
    restaurant: {
      id: 'restaurant',
      title: 'Restaurant',
      icon: Utensils,
      scenario: 'Customers call asking about menu items, ingredients, and dietary restrictions.',
      steps: [
        { icon: FileText, label: 'Upload Menu', detail: 'Full menu PDFs with ingredients, allergens, prep notes' },
        { icon: Mic2, label: 'Configure Persona', detail: 'Friendly server, knowledgeable about dishes and pairings' },
        { icon: Sparkles, label: 'Start Talking', detail: 'Customers ask about dishes, get personalized recommendations' },
      ],
      metrics: [
        { value: '85%', label: 'Call Deflection' },
        { value: '2 min', label: 'Avg. Call Time' },
        { value: '4.8★', label: 'Satisfaction' },
      ],
    },
    education: {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      scenario: 'Students and parents need quick answers about curriculum and school policies.',
      steps: [
        { icon: FileText, label: 'Upload Materials', detail: 'Curriculum guides, handbooks, course catalogs' },
        { icon: Mic2, label: 'Configure Persona', detail: 'Patient teacher, clear explanations for all ages' },
        { icon: Sparkles, label: 'Start Talking', detail: 'Ask about requirements, schedules, and resources' },
      ],
      metrics: [
        { value: '6 → 2', label: 'Weeks Onboarding' },
        { value: '87%', label: 'Retention' },
        { value: '-64%', label: 'Support Tickets' },
      ],
    },
    support: {
      id: 'support',
      title: 'Technical Support',
      icon: Briefcase,
      scenario: 'Field techs need instant access to repair manuals while hands-on with equipment.',
      steps: [
        { icon: FileText, label: 'Upload Manuals', detail: 'Equipment manuals, troubleshooting guides, SOPs' },
        { icon: Mic2, label: 'Configure Persona', detail: 'Technical expert, precise step-by-step instructions' },
        { icon: Sparkles, label: 'Start Talking', detail: 'Hands-free voice guidance during repairs' },
      ],
      metrics: [
        { value: '34%', label: 'Fewer Truck Rolls' },
        { value: '96%', label: 'First-Time Fix' },
        { value: '3 weeks', label: 'Training Saved' },
      ],
    },
  };

  const useCaseKeys = Object.keys(useCases);
  const currentUseCase = useCases[activeTab];

  useEffect(() => {
    const activeIndex = useCaseKeys.indexOf(activeTab);
    const activeEl = tabRefs.current[activeIndex];
    if (activeEl) {
      setHighlightStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
      // Ensure active tab is scrolled into view on mobile
      if (window.innerWidth < 768) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab, useCaseKeys]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = null;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % useCaseKeys.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + useCaseKeys.length) % useCaseKeys.length;
    }
    if (nextIndex !== null) {
      e.preventDefault();
      tabRefs.current[nextIndex]?.focus();
      setActiveTab(useCaseKeys[nextIndex]);
    }
  };

  return (
    <>
      <style>{`
        .uct-section {
          padding: 32px 0 24px;
          width: 100%;
          overflow: hidden;
        }

        .uct-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
          box-sizing: border-box;
        }

        .uct-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .uct-track-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .uct-track {
          display: inline-flex;
          background: white;
          border-radius: 99px;
          padding: 6px;
          border: 1px solid var(--border);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          position: relative;
        }

        .uct-tab {
          height: 48px;
          padding: 0 24px;
          border-radius: 99px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 2;
          color: var(--slate);
          transition: color 0.2s;
          cursor: pointer;
          border: none;
          background: transparent;
          outline: none;
          white-space: nowrap;
        }

        .uct-tab[aria-selected="true"] {
          color: var(--brand);
        }

        .uct-tab:hover:not([aria-selected="true"]) {
          color: var(--ink);
        }

        .uct-tab:focus-visible {
          box-shadow: 0 0 0 2px white, 0 0 0 4px var(--brand);
        }

        .uct-highlight {
          position: absolute;
          top: 6px;
          bottom: 6px;
          background: rgba(45,155,111,0.08);
          border: 1px solid var(--brand);
          border-radius: 99px;
          z-index: 1;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .uct-notch {
          position: absolute;
          top: 100%;
          width: 2px;
          height: 24px;
          background: linear-gradient(to bottom, var(--brand), transparent);
          transition: left 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 0;
        }

        .uct-panel-container {
          background: white;
          border-radius: 20px;
          padding: 40px;
          border: 1px solid var(--border);
          box-shadow: 0 12px 32px rgba(0,0,0,0.04);
          min-height: 520px;
          position: relative;
        }

        .uct-panel-anim {
          animation: uct-panelFadeIn 0.25s ease-out;
        }

        @keyframes uct-panelFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .uct-challenge-pill {
          display: inline-flex;
          padding: 6px 16px;
          background: rgba(45,155,111,0.1);
          color: var(--brand);
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .uct-challenge-text {
          font-size: 18px;
          font-weight: 500;
          color: var(--ink);
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto 48px;
        }

        .uct-steps {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 48px;
        }

        .uct-step-card {
          flex: 1;
          background: white;
          border-radius: 16px;
          border: 1px solid var(--border);
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-height: 180px;
        }

        .uct-step-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(45,155,111,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .uct-step-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
        }

        .uct-step-desc {
          font-size: 14px;
          color: #334155;
          line-height: 1.5;
          margin: 0;
        }

        .uct-step-arrow {
          color: var(--brand);
          opacity: 0.6;
          flex-shrink: 0;
        }
        
        .desktop-arrow { display: block; }
        .mobile-arrow { display: none; }

        .uct-stats-band {
          display: flex;
          background: rgba(45,155,111,0.06);
          border-radius: 16px;
          padding: 28px 24px;
          border: 1px solid rgba(45,155,111,0.1);
        }

        .uct-stat {
          flex: 1;
          text-align: center;
        }

        .uct-stat-val {
          font-size: 36px;
          font-weight: 800;
          color: var(--brand);
          margin-bottom: 6px;
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.02em;
        }

        .uct-stat-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #334155;
          font-weight: 600;
        }

        .uct-stat-divider {
          width: 1px;
          background: rgba(45,155,111,0.15);
          margin: 0 20px;
        }

        .uct-cta-container {
          text-align: center;
          margin-top: 32px;
        }

        .uct-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--brand);
          color: white;
          padding: 14px 32px;
          border-radius: 99px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(45,155,111,0.25);
          transition: all 0.2s;
          outline: none;
        }

        .uct-cta:focus-visible {
          box-shadow: 0 0 0 2px white, 0 0 0 4px var(--brand);
        }

        .uct-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(45,155,111,0.3);
        }

        .uct-cta-arrow {
          width: 18px;
          height: 18px;
          transition: transform 0.2s;
        }

        .uct-cta:hover .uct-cta-arrow {
          transform: translateX(4px);
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .uct-tab {
            padding: 0 16px;
            font-size: 13px;
          }
          .uct-step-card {
            padding: 20px 16px;
          }
          .uct-stat-val {
            font-size: 32px;
          }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .uct-track-wrapper {
            justify-content: flex-start;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 8px;
            margin-bottom: 16px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .uct-track-wrapper::-webkit-scrollbar {
            display: none;
          }
          .uct-tab {
            scroll-snap-align: center;
            flex-shrink: 0;
            height: 44px;
          }
          .uct-panel-container {
            padding: 24px 20px;
            min-height: auto;
          }
          .uct-steps {
            flex-direction: column;
            gap: 12px;
            margin-bottom: 32px;
          }
          .uct-step-card {
            width: 100%;
            min-height: auto;
            box-sizing: border-box;
          }
          .desktop-arrow { display: none; }
          .mobile-arrow { display: block; }
          .uct-step-arrow {
            transform: rotate(0);
          }
          .uct-stats-band {
            flex-direction: row;
            padding: 16px;
            border-radius: 12px;
          }
          .uct-stat-val {
            font-size: 24px;
          }
          .uct-stat-label {
            font-size: 10px;
            letter-spacing: 0.05em;
          }
          .uct-stat-divider {
            margin: 0 8px;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-in { animation: none !important; opacity: 1 !important; transform: none !important; }
          .uct-highlight, .uct-notch { transition: none !important; }
          .uct-panel-anim { animation: none !important; }
          .uct-cta:hover { transform: none !important; }
          .uct-cta:hover .uct-cta-arrow { transform: none !important; }
        }
      `}</style>

      <section ref={sectionAnim.ref} className="uct-section">
        <div className="uct-container">
          <div className="uct-header">
            <h2
              className={`animate-in ${isVisible ? 'visible' : ''}`}
              style={{ fontSize: 42, fontWeight: 800, marginBottom: 16, color: 'var(--ink)' }}
            >
              Voice Assistant for Every Industry
            </h2>
            <p
              className={`animate-in ${isVisible ? 'visible' : ''} animate-delay-1`}
              style={{ fontSize: 18, color: 'var(--slate)', maxWidth: 650, margin: '0 auto', lineHeight: 1.6 }}
            >
              Upload your documents, configure your assistant's persona, and have natural conversations. Adapts to any domain.
            </p>
          </div>

          <div className={`animate-in ${isVisible ? 'visible' : ''} animate-delay-2`}>
            <div className="uct-track-wrapper">
              <div className="uct-track" role="tablist" aria-label="Industry Use Cases">
                <div className="uct-highlight" style={highlightStyle} aria-hidden="true" />
                <div className="uct-notch" style={{ left: highlightStyle.left + highlightStyle.width / 2 - 1 }} aria-hidden="true" />
                
                {useCaseKeys.map((key, index) => {
                  const useCase = useCases[key];
                  const isSelected = activeTab === key;
                  return (
                    <button
                      key={useCase.id}
                      ref={el => tabRefs.current[index] = el}
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls={`panel-${useCase.id}`}
                      id={`tab-${useCase.id}`}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => setActiveTab(useCase.id)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="uct-tab"
                    >
                      <useCase.icon style={{ width: 18, height: 18 }} />
                      <span>{useCase.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div 
              id={`panel-${currentUseCase.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${currentUseCase.id}`}
              className="uct-panel-container"
            >
              <div key={activeTab} className="uct-panel-anim">
                
                <div style={{ textAlign: 'center' }}>
                  <div className="uct-challenge-pill">
                    The Challenge
                  </div>
                  <p className="uct-challenge-text">
                    {currentUseCase.scenario}
                  </p>
                </div>

                <div className="uct-steps">
                  {currentUseCase.steps.map((step, index) => {
                    const StepIcon = step.icon;
                    return (
                      <div key={index} style={{ display: 'contents' }}>
                        <div className="uct-step-card">
                          <div className="uct-step-icon">
                            <StepIcon style={{ width: 22, height: 22, color: 'var(--brand)' }} />
                          </div>
                          <h4 className="uct-step-title">{step.label}</h4>
                          <p className="uct-step-desc">{step.detail}</p>
                        </div>
                        {index < currentUseCase.steps.length - 1 && (
                          <div className="uct-step-arrow" aria-hidden="true">
                            <ChevronRight className="desktop-arrow" size={24} />
                            <ChevronDown className="mobile-arrow" size={24} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="uct-stats-band">
                  {currentUseCase.metrics.map((metric, index) => (
                    <div key={index} style={{ display: 'contents' }}>
                      <div className="uct-stat">
                        <div className="uct-stat-val">
                          {useMixedCounter(metric.value, isVisible)}
                        </div>
                        <div className="uct-stat-label">{metric.label}</div>
                      </div>
                      {index < currentUseCase.metrics.length - 1 && (
                        <div className="uct-stat-divider" aria-hidden="true" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="uct-cta-container">
                  <button onClick={scrollToForm} className="uct-cta">
                    Try This Use Case
                    <ArrowRight className="uct-cta-arrow" />
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
