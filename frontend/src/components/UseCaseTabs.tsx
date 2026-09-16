import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

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

interface UseCase {
  id: string;
  title: string;
  scenario: string;
  solution: string;
  outcome: string;
  metrics: string[];
}

export default function UseCaseTabs({ scrollToForm }: { scrollToForm: () => void }) {
  const sectionAnim = useInView();
  const [activeTab, setActiveTab] = useState('field-support');

  const useCases: Record<string, UseCase> = {
    'field-support': {
      id: 'field-support',
      title: 'Field Support',
      scenario: 'A field service technician needs hands-free access to repair procedures while working on industrial equipment.',
      solution: 'Upload equipment manuals (PDF/Word) → Configure voice persona (technical expert tone) → Deploy to phone system or mobile app',
      outcome: 'Truck rolls reduced by 34% • First-time fix rate: 89% → 96% • Training time cut from 6 weeks to 2 weeks',
      metrics: ['34%', 'Truck Rolls', 'Reduced']
    },
    'customer-care': {
      id: 'customer-care',
      title: 'Customer Care',
      scenario: 'Support agents spend hours searching knowledge bases while customers wait on hold.',
      solution: 'Upload FAQs, policy docs, troubleshooting guides → Configure friendly persona → Deploy to call center platform',
      outcome: 'Hold times: 42 min → 3 min • 70% deflection rate • First-call resolution: 64% → 91%',
      metrics: ['70%', 'Deflection', 'Rate']
    },
    'healthcare': {
      id: 'healthcare',
      title: 'Healthcare',
      scenario: 'Healthcare staff need instant access to benefits documentation while maintaining HIPAA compliance.',
      solution: 'Upload benefits plans, coverage policies → Configure compliant persona with audit logging → Deploy to secure phone/web',
      outcome: 'Claims processed 3.2x faster • 100% audit trail • Zero PHI exposure incidents',
      metrics: ['3.2x', 'Faster', 'Claims']
    },
    'internal-sop': {
      id: 'internal-sop',
      title: 'Internal Knowledge',
      scenario: 'New employees take weeks to learn company procedures and policies.',
      solution: 'Upload SOPs, training materials, HR policies → Configure onboarding persona → Deploy to Slack/Teams',
      outcome: 'Onboarding time: 6 weeks → 10 days • Knowledge retention: 58% → 87% • HR support tickets -64%',
      metrics: ['6 weeks', '→', '10 days']
    }
  };

  const currentUseCase = useCases[activeTab];

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
            Solutions for Every Use Case
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
            Voice RAG works across industries and departments. See how teams like yours are transforming knowledge access.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-2`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 16,
            marginBottom: 48,
            maxWidth: 800,
            margin: '0 auto 48px',
          }}
        >
          {Object.values(useCases).map((useCase) => (
            <button
              key={useCase.id}
              onClick={() => setActiveTab(useCase.id)}
              style={{
                padding: '12px 16px',
                border: activeTab === useCase.id ? '2px solid var(--primary)' : '2px solid #e2e8f0',
                background: activeTab === useCase.id ? 'var(--primary)' : 'white',
                color: activeTab === useCase.id ? 'white' : 'var(--slate)',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== useCase.id) {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.color = 'var(--primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== useCase.id) {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.color = 'var(--slate)';
                }
              }}
            >
              {useCase.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-3`}
          style={{
            animation: 'fade-in-up 0.5s ease-out',
          }}
        >
          <style>{`
            @keyframes fade-in-up {
              from { opacity: 0; transform: translateY(12px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          <div
            style={{
              background: 'var(--paper)',
              borderRadius: 12,
              padding: 48,
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                Scenario
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--slate)', margin: 0 }}>
                {currentUseCase.scenario}
              </p>
            </div>

            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                Solution
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--slate)', margin: 0 }}>
                {currentUseCase.solution}
              </p>
            </div>

            <div style={{ marginBottom: 32, padding: '20px', background: 'white', borderRadius: 8, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                Outcome
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--slate)', margin: 0 }}>
                {currentUseCase.outcome}
              </p>
            </div>

            <button
              onClick={scrollToForm}
              style={{
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                padding: '12px 28px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--primary)';
              }}
            >
              See This In Action
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
