import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

interface FAQ {
  question: string;
  answer: string;
}

export default function FaqAccordion({ scrollToForm }: { scrollToForm: () => void }) {
  const sectionAnim = useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      question: 'How long does implementation take?',
      answer: 'Most pilots go live within 24-48 hours. Upload your docs, configure persona, deploy to phone system or web widget. Full enterprise implementations typically take 2-4 weeks with dedicated support.'
    },
    {
      question: 'What types of documents can I upload?',
      answer: 'PDFs, Word docs, SharePoint folders, Confluence pages, text files, and more. We ingest and chunk automatically. We support documents up to 500MB and handle both English and multi-language content.'
    },
    {
      question: 'How do you prevent AI hallucinations?',
      answer: 'Deterministic RAG grounding — our agent only answers from your documents. If an answer isn\'t found, it says "I don\'t have that information" instead of fabricating. Every response is traceable to source material.'
    },
    {
      question: 'Where is my data hosted?',
      answer: 'Your choice: your AWS/Azure/GCP cloud, or our SOC 2 certified infrastructure. Zero data sent to OpenAI or third-party LLM training. You maintain full control and compliance.'
    },
    {
      question: 'How much does it cost?',
      answer: 'Custom pricing based on volume and features. Typical pilot: $2k-5k/month. Enterprise plans include SLA, dedicated support, custom integrations, and volume discounts.'
    },
    {
      question: 'What integrations do you support?',
      answer: 'Twilio, Five9, Genesys for phone. Slack, Teams, Zendesk for chat. REST API for custom integrations. We also support webhooks and custom deployment options.'
    }
  ];

  return (
    <section
      ref={sectionAnim.ref}
      style={{
        padding: '100px 0',
        background: 'var(--paper)',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
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
            Common Questions
          </h2>
          <p
            className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-1`}
            style={{
              fontSize: 18,
              color: 'var(--slate)',
              lineHeight: 1.6,
            }}
          >
            Everything you need to know about Voice RAG.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 12,
          }}
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-${Math.min(i + 2, 6)}`}
              style={{
                background: 'white',
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                transition: 'all 0.3s',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                aria-controls={`faq-panel-${i}`}
                id={`faq-heading-${i}`}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  border: 'none',
                  background: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--paper)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--ink)',
                    margin: 0,
                    textAlign: 'left',
                  }}
                >
                  {faq.question}
                </h3>
                <ChevronDown
                  style={{
                    width: 20,
                    height: 20,
                    color: 'var(--primary)',
                    flexShrink: 0,
                    transition: 'transform 0.3s',
                    transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {openFaq === i && (
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-heading-${i}`}
                  style={{
                    padding: '0 24px 20px',
                    borderTop: '1px solid #e2e8f0',
                    animation: 'fade-in-down 0.3s ease-out',
                  }}
                >
                  <style>{`
                    @keyframes fade-in-down {
                      from { opacity: 0; transform: translateY(-8px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                  `}</style>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: 'var(--slate)',
                      margin: 0,
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div
          className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-5`}
          style={{
            marginTop: 80,
            padding: 48,
            background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
            borderRadius: 12,
            border: '1px solid #DDD6FE',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--ink)',
              marginBottom: 12,
            }}
          >
            Ready to eliminate your support backlog?
          </h3>
          <p
            style={{
              fontSize: 15,
              color: 'var(--slate)',
              marginBottom: 24,
            }}
          >
            Get sandbox access + 30-minute strategy call. No credit card required.
          </p>
          <button
            onClick={scrollToForm}
            style={{
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              padding: '14px 32px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#7C3AED';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--primary)';
            }}
          >
            Start Free Pilot
            <ArrowRight style={{ width: 18, height: 18 }} />
          </button>
        </div>
      </div>
    </section>
  );
}
