import { useState } from 'react';
import { ArrowRight, FileText, Mic2, Sparkles, Stethoscope, Utensils, GraduationCap, Briefcase } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

interface UseCase {
  id: string;
  title: string;
  icon: any;
  scenario: string;
  steps: { icon: any; label: string; detail: string }[];
  metrics: { value: string; label: string }[];
  color: string;
}

export default function UseCaseTabs({ scrollToForm }: { scrollToForm: () => void }) {
  const sectionAnim = useScrollReveal();
  const [activeTab, setActiveTab] = useState('healthcare');

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
      color: '#8B5CF6',
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
      color: '#EC4899',
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
      color: '#0EA5E9',
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
      color: '#16A34A',
    },
  };

  const currentUseCase = useCases[activeTab];

  return (
    <section
      id="features"
      ref={sectionAnim.ref}
      style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, #FFFFFF 0%, var(--paper) 100%)',
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
            Voice Assistant for Every Industry
          </h2>
          <p
            className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-1`}
            style={{
              fontSize: 18,
              color: 'var(--slate)',
              maxWidth: 650,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Upload your documents, configure your assistant's persona, and have natural conversations. Adapts to any domain.
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-2`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))',
            gap: 12,
            marginBottom: 48,
            maxWidth: 700,
            margin: '0 auto 48px',
          }}
        >
          {Object.values(useCases).map((useCase) => {
            const Icon = useCase.icon;
            return (
              <button
                key={useCase.id}
                onClick={() => setActiveTab(useCase.id)}
                style={{
                  padding: '14px 12px',
                  border: activeTab === useCase.id ? `2px solid ${useCase.color}` : '2px solid #e2e8f0',
                  background: activeTab === useCase.id
                    ? `linear-gradient(135deg, ${useCase.color}15 0%, ${useCase.color}05 100%)`
                    : 'white',
                  color: activeTab === useCase.id ? useCase.color : 'var(--slate)',
                  borderRadius: 12,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== useCase.id) {
                    e.currentTarget.style.borderColor = useCase.color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${useCase.color}20`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== useCase.id) {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <Icon style={{ width: 20, height: 20 }} />
                <span>{useCase.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content Card */}
        <div
          key={activeTab}
          className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-3`}
          style={{
            animation: 'fade-in-up 0.4s ease-out',
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 20,
              padding: 40,
              border: '1px solid #e2e8f0',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
            }}
          >
            {/* Scenario */}
            <div style={{ marginBottom: 40, textAlign: 'center' }}>
              <div style={{
                display: 'inline-flex',
                padding: '8px 16px',
                background: `${currentUseCase.color}15`,
                borderRadius: 8,
                marginBottom: 16,
              }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: currentUseCase.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  The Challenge
                </span>
              </div>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink)', fontWeight: 500, maxWidth: 700, margin: '0 auto' }}>
                {currentUseCase.scenario}
              </p>
            </div>

            {/* Steps */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
              gap: 24,
              marginBottom: 40,
            }}>
              {currentUseCase.steps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={index}
                    style={{
                      background: 'var(--paper)',
                      padding: 24,
                      borderRadius: 16,
                      border: '1px solid #e2e8f0',
                      position: 'relative',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = `0 8px 20px ${currentUseCase.color}15`;
                      e.currentTarget.style.borderColor = `${currentUseCase.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: `${currentUseCase.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                    }}>
                      <StepIcon style={{ width: 22, height: 22, color: currentUseCase.color }} />
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
                      {step.label}
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--slate)' }}>
                      {step.detail}
                    </div>
                    {index < currentUseCase.steps.length - 1 && (
                      <img
                        src="/arrowhead-pointing-to-the-right.png"
                        alt="arrow"
                        style={{
                          position: 'absolute',
                          right: -27,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 28,
                          height: 28,
                          filter: `invert(${currentUseCase.color === '#8B5CF6' ? '20%' : currentUseCase.color === '#EC4899' ? '25%' : currentUseCase.color === '#0EA5E9' ? '30%' : '35%'}) sepia(${currentUseCase.color === '#8B5CF6' ? '50%' : currentUseCase.color === '#EC4899' ? '45%' : currentUseCase.color === '#0EA5E9' ? '40%' : '35%'}) hue-rotate(${currentUseCase.color === '#8B5CF6' ? '270deg' : currentUseCase.color === '#EC4899' ? '320deg' : currentUseCase.color === '#0EA5E9' ? '200deg' : '180deg'}) saturate(${currentUseCase.color === '#8B5CF6' ? '180%' : currentUseCase.color === '#EC4899' ? '170%' : currentUseCase.color === '#0EA5E9' ? '160%' : '150%'})`,
                          opacity: 0.7,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))',
              gap: 20,
              padding: 28,
              background: `linear-gradient(135deg, ${currentUseCase.color}08 0%, ${currentUseCase.color}02 100%)`,
              borderRadius: 16,
              marginBottom: 32,
            }}>
              {currentUseCase.metrics.map((metric, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: currentUseCase.color,
                    marginBottom: 6,
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {metric.value}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: 'var(--slate)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 600,
                  }}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={scrollToForm}
                className="btn-primary"
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                }}
              >
                <span>Try This Use Case</span>
                <ArrowRight style={{ width: 18, height: 18 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
