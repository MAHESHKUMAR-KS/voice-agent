import { useState, useEffect, useRef } from 'react';
import { Upload, Settings, Rocket } from 'lucide-react';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function HowItWorks() {
  const sectionAnim = useInView();

  const steps = [
    {
      Icon: Upload,
      title: 'Upload Your Docs',
      description: 'Drop PDFs, Word files, SOPs, or knowledge base content. Instant ingestion.'
    },
    {
      Icon: Settings,
      title: 'Configure Voice',
      description: 'Set tone (friendly vs technical), define boundaries, map FAQ patterns. Zero hallucinations.'
    },
    {
      Icon: Rocket,
      title: 'Go Live',
      description: 'Deploy to phone, web, or mobile. Live in 24 hours. Complete sovereignty.'
    }
  ];

  return (
    <section
      ref={sectionAnim.ref}
      style={{
        padding: '100px 0',
        background: 'white',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2
            className={`animate-in ${sectionAnim.visible ? 'visible' : ''}`}
            style={{
              fontSize: 42,
              fontWeight: 800,
              marginBottom: 16,
              color: 'var(--ink)',
            }}
          >
            How It Works
          </h2>
          <p
            className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-1`}
            style={{
              fontSize: 18,
              color: 'var(--slate)',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Three simple steps from document to voice expert.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 40,
            position: 'relative',
          }}
        >
          {/* Connecting Line */}
          <div
            style={{
              position: 'absolute',
              top: 60,
              left: '16.66%',
              right: '16.66%',
              height: '2px',
              background: 'linear-gradient(to right, transparent, #3b82f6 20%, #3b82f6 80%, transparent)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-${i + 1}`}
              style={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
                    position: 'relative',
                  }}
                >
                  <step.Icon style={{ width: 40, height: 40, color: 'white' }} />
                  <div
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'white',
                      border: '2px solid var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      fontSize: 14,
                    }}
                  >
                    {i + 1}
                  </div>
                </div>
              </div>

              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 12,
                  color: 'var(--ink)',
                  textAlign: 'center',
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  color: 'var(--slate)',
                  lineHeight: 1.6,
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Win Highlight */}
        <div
          className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-4`}
          style={{
            marginTop: 80,
            padding: 32,
            background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
            borderRadius: 12,
            border: '1px solid #BAE6FD',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Quick Win
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px 0' }}>
            Live in 24 hours
          </p>
          <p style={{ fontSize: 14, color: 'var(--slate)', margin: 0 }}>
            Most pilots go live within 24-48 hours. Upload your docs, configure persona, deploy to phone system or web widget.
          </p>
        </div>
      </div>
    </section>
  );
}
