import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

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

export default function ComparisonTable() {
  const sectionAnim = useInView();

  const features = [
    { name: 'Hallucination Risk', voiceRag: 'check', chatgpt: 'alert', knowledge: 'check' },
    { name: 'Voice Interface', voiceRag: 'check', chatgpt: 'x', knowledge: 'x' },
    { name: 'Data Sovereignty', voiceRag: 'check', chatgpt: 'x', knowledge: 'check' },
    { name: 'Real-Time Updates', voiceRag: 'check', chatgpt: 'alert', knowledge: 'alert' },
    { name: 'Hands-Free Access', voiceRag: 'check', chatgpt: 'x', knowledge: 'x' },
    { name: 'Compliance Audit Trail', voiceRag: 'check', chatgpt: 'x', knowledge: 'alert' },
    { name: 'Setup Time', voiceRag: 'check', chatgpt: 'alert', knowledge: 'alert' },
    { name: 'Customizable Persona', voiceRag: 'check', chatgpt: 'alert', knowledge: 'x' },
  ];

  const IconComponent = ({ type }: { type: string }) => {
    switch (type) {
      case 'check':
        return <CheckCircle2 style={{ width: 20, height: 20, color: '#16a34a' }} />;
      case 'x':
        return <XCircle style={{ width: 20, height: 20, color: '#dc2626' }} />;
      case 'alert':
        return <AlertCircle style={{ width: 20, height: 20, color: '#f59e0b' }} />;
      default:
        return null;
    }
  };

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
            Why Voice RAG Wins
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
            Purpose-built for conversational knowledge access. Purpose-built for zero hallucinations.
          </p>
        </div>

        <div
          className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-2`}
          style={{
            overflowX: 'auto',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            background: 'white',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '700px',
            }}
          >
            <thead>
              <tr style={{ background: 'var(--paper)', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)' }}>
                  Feature
                </th>
                <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 700, color: 'white', background: 'var(--primary)' }}>
                  Voice RAG
                </th>
                <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 700, color: 'var(--slate)' }}>
                  ChatGPT
                </th>
                <th style={{ padding: '16px 20px', textAlign: 'center', fontWeight: 700, color: 'var(--slate)' }}>
                  Knowledge Bases
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid #e2e8f0',
                    background: i % 2 === 0 ? 'white' : 'var(--paper)',
                  }}
                >
                  <td style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--ink)' }}>
                    {feature.name}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center', background: 'rgba(59, 130, 246, 0.03)' }}>
                    <IconComponent type={feature.voiceRag} />
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                    <IconComponent type={feature.chatgpt} />
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                    <IconComponent type={feature.knowledge} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-3`}
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 32,
            justifyContent: 'center',
            flexWrap: 'wrap',
            fontSize: 13,
            color: 'var(--slate)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 style={{ width: 16, height: 16, color: '#16a34a' }} />
            <span>Fully supported</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle style={{ width: 16, height: 16, color: '#f59e0b' }} />
            <span>Partial or limited</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <XCircle style={{ width: 16, height: 16, color: '#dc2626' }} />
            <span>Not supported</span>
          </div>
        </div>
      </div>
    </section>
  );
}
