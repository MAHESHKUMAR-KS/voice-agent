import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ComparisonTable() {
  const sectionAnim = useScrollReveal({ threshold: 0.1 });
  const isVisible = sectionAnim.visible;

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

  const IconComponent = ({ type, delay }: { type: string, delay: number }) => {
    let iconObj;
    switch (type) {
      case 'check':
        iconObj = { Icon: CheckCircle2, color: '#16a34a', bg: 'rgba(22, 163, 74, 0.12)', label: 'Fully supported' };
        break;
      case 'alert':
        iconObj = { Icon: AlertCircle, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', label: 'Partial or limited' };
        break;
      case 'x':
        iconObj = { Icon: XCircle, color: '#dc2626', bg: 'rgba(220, 38, 38, 0.12)', label: 'Not supported' };
        break;
      default:
        return null;
    }

    const { Icon, color, bg, label } = iconObj;
    return (
      <div 
        className="icon-wrapper" 
        style={{ animationDelay: isVisible ? `${delay}s` : '0s' }}
      >
        <span className="sr-only">{label}</span>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', background: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto'
        }}>
          <Icon style={{ width: 22, height: 22, color }} />
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        .comp-section {
          padding: 40px 0 24px;
        }

        .comp-table-wrapper {
          position: relative;
          max-width: 1024px;
          margin: 0 auto;
          padding: 24px 24px;
          margin-top: -24px;
        }

        .comp-table-scroll {
          overflow-x: auto;
          overflow-y: visible;
          padding-top: 16px;
          padding-bottom: 16px;
          margin-top: -16px;
          margin-bottom: -16px;
          -webkit-overflow-scrolling: touch;
        }

        .comp-table-container {
          background: white;
          border-radius: 16px;
          border: 1px solid var(--border);
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          min-width: 700px;
          margin: 0 auto;
        }

        .comp-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        /* Table Headers */
        .comp-table th {
          padding: 20px 16px;
          font-weight: 700;
          position: sticky;
          top: 0;
          background: white;
          z-index: 5;
          border-bottom: 1px solid var(--border);
          color: var(--ink);
        }
        
        .comp-table th.feature-cell {
          text-align: left;
          width: 31%;
          left: 0;
          z-index: 7; /* Sticky top and left */
          border-top-left-radius: 16px;
        }
        
        .comp-table th:last-child {
          border-top-right-radius: 16px;
        }

        .comp-table th.col-header {
          text-align: center;
          width: 23%;
          color: var(--slate);
        }

        /* Voice RAG Column Emphasis */
        .vr-header {
          background: var(--brand) !important;
          color: white !important;
          z-index: 6 !important; /* Above normal headers */
          border-bottom: none !important;
        }
        
        .vr-header::before {
          content: '';
          position: absolute;
          top: -12px;
          left: -1px;
          right: -1px;
          bottom: 0;
          background: var(--brand);
          border-radius: 12px 12px 0 0;
          border: 1px solid var(--brand);
          border-bottom: none;
          box-shadow: 0 -6px 16px rgba(45,155,111,0.15);
          z-index: -1;
        }

        .vr-header-content {
          position: relative;
          z-index: 1;
        }

        .vr-cell {
          background: rgba(45, 155, 111, 0.05);
          border-left: 1px solid var(--brand);
          border-right: 1px solid var(--brand);
          position: relative;
          z-index: 2;
        }

        .vr-last {
          border-bottom: 1px solid var(--brand) !important;
        }

        .vr-last::after {
          content: '';
          position: absolute;
          top: 0;
          left: -1px;
          right: -1px;
          bottom: -12px;
          background: rgba(45, 155, 111, 0.05);
          border-radius: 0 0 12px 12px;
          border: 1px solid var(--brand);
          border-top: none;
          box-shadow: 0 6px 16px rgba(45,155,111,0.15);
          z-index: -1;
        }

        /* Table Body */
        .comp-table td {
          padding: 8px 16px;
          text-align: center;
          border-bottom: 1px solid var(--border);
          height: 56px;
        }
        
        .comp-row:last-child td {
          border-bottom: none;
        }

        .comp-table td.feature-cell {
          text-align: left;
          font-weight: 500;
          color: var(--slate);
          position: sticky;
          left: 0;
          background: white;
          z-index: 4;
          transition: color 0.2s, font-weight 0.2s, background 0.2s;
        }

        .comp-row:last-child td.feature-cell {
          border-bottom-left-radius: 16px;
        }
        
        .comp-row:last-child td:last-child {
          border-bottom-right-radius: 16px;
        }

        .comp-row {
          transition: background 0.2s ease;
        }

        .comp-row:hover {
          background: rgba(0, 0, 0, 0.02);
        }

        .comp-row:hover .feature-cell {
          color: var(--ink);
          font-weight: 600;
          background: #f8fafc;
        }

        .comp-row:hover .vr-cell {
          background: rgba(45, 155, 111, 0.09);
        }

        /* Animations */
        @keyframes comp-slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes comp-pop-in {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }

        .icon-wrapper {
          opacity: 0;
        }

        .visible .icon-wrapper {
          animation: comp-pop-in 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .comp-table-container { animation: none !important; opacity: 1 !important; transform: none !important; }
          .icon-wrapper { animation: none !important; opacity: 1 !important; transform: none !important; }
        }

        /* Screen reader only */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>

      <section
        ref={sectionAnim.ref}
        className="comp-section"
      >
        <div style={{ textAlign: 'center', marginBottom: 60, padding: '0 24px' }}>
          <h2
            className={`animate-in ${isVisible ? 'visible' : ''}`}
            style={{ fontSize: 42, fontWeight: 800, marginBottom: 16, color: 'var(--ink)' }}
          >
            Why Voice RAG Wins
          </h2>
          <p
            className={`animate-in ${isVisible ? 'visible' : ''} animate-delay-1`}
            style={{ fontSize: 18, color: 'var(--slate)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}
          >
            Purpose-built for conversational knowledge access. Purpose-built for zero hallucinations.
          </p>
        </div>

        <div className="comp-table-wrapper">
          <div className="comp-table-scroll">
            <div 
              className={`comp-table-container ${isVisible ? 'visible' : ''}`}
              style={{
                animation: isVisible ? 'comp-slide-up 0.6s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
                opacity: isVisible ? undefined : 0,
              }}
            >
              <table className="comp-table">
                <thead>
                  <tr>
                    <th scope="col" className="feature-cell">Feature</th>
                    <th scope="col" className="col-header vr-header">
                      <span className="vr-header-content">Voice RAG</span>
                    </th>
                    <th scope="col" className="col-header">ChatGPT</th>
                    <th scope="col" className="col-header">Knowledge Bases</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => {
                    // Stagger: base delay + row delay + col delay
                    const baseDelay = 0.2;
                    const rowDelay = i * 0.06;
                    const vrDelay = baseDelay + rowDelay;
                    const chatDelay = baseDelay + rowDelay + 0.06;
                    const kbDelay = baseDelay + rowDelay + 0.12;

                    return (
                      <tr key={i} className="comp-row">
                        <td className="feature-cell" scope="row">
                          {feature.name}
                        </td>
                        <td className={`vr-cell ${i === features.length - 1 ? 'vr-last' : ''}`}>
                          <IconComponent type={feature.voiceRag} delay={vrDelay} />
                        </td>
                        <td>
                          <IconComponent type={feature.chatgpt} delay={chatDelay} />
                        </td>
                        <td>
                          <IconComponent type={feature.knowledge} delay={kbDelay} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className={`animate-in ${isVisible ? 'visible' : ''}`}
          style={{
            marginTop: 24,
            display: 'flex',
            gap: 32,
            justifyContent: 'center',
            flexWrap: 'wrap',
            fontSize: 13,
            color: 'var(--slate)',
            animationDelay: '0.8s', // Appears after table
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(22, 163, 74, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 style={{ width: 14, height: 14, color: '#16a34a' }} />
            </div>
            <span>Fully supported</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle style={{ width: 14, height: 14, color: '#f59e0b' }} />
            </div>
            <span>Partial or limited</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(220, 38, 38, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <XCircle style={{ width: 14, height: 14, color: '#dc2626' }} />
            </div>
            <span>Not supported</span>
          </div>
        </div>
      </section>
    </>
  );
}
