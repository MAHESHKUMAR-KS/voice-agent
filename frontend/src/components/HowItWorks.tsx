import { Upload, Settings, Rocket, Zap } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function HowItWorks() {
  const sectionAnim = useScrollReveal({ threshold: 0.15 });
  const isVisible = sectionAnim.visible;

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
    <>
      <style>{`
        .hiw-section {
          padding: 40px 0 24px;
          width: 100%;
          overflow: hidden;
        }

        .hiw-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
          box-sizing: border-box;
        }

        .hiw-header {
          text-align: center;
          margin-bottom: 72px;
        }

        .hiw-steps {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          position: relative;
          z-index: 1;
        }

        .hiw-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .hiw-step-visual {
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
          width: 100%;
          position: relative;
        }

        .hiw-circle {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: linear-gradient(135deg, #34D399 0%, #059669 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 0 0 6px rgba(45, 155, 111, 0.12);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: scale(0.9);
          opacity: 0.5;
        }

        .hiw-circle:hover {
          transform: translateY(-4px) scale(1) !important;
        }

        .hiw-circle:hover .hiw-icon {
          transform: rotate(8deg) scale(1.1);
        }

        .hiw-icon {
          color: white;
          width: 32px;
          height: 32px;
          transition: transform 0.3s ease;
        }

        .hiw-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--brand);
          color: var(--brand);
          font-weight: 800;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0);
        }

        .hiw-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 12px 0;
        }

        .hiw-desc {
          font-size: 15px;
          color: #334155;
          line-height: 1.6;
          margin: 0;
          max-width: 280px;
        }

        .hiw-step-content {
          opacity: 0;
          transform: translateY(12px);
        }

        /* Banner */
        .hiw-banner {
          margin-top: 80px;
          padding: 44px 32px;
          border: 1px solid transparent;
          background: linear-gradient(135deg, #F0FDF9 0%, #DCFCE7 100%) padding-box,
                      linear-gradient(135deg, #34D399 0%, rgba(52,211,153,0.1) 100%) border-box;
          border-radius: 16px;
          position: relative;
          text-align: center;
          box-shadow: 0 12px 32px rgba(45, 155, 111, 0.08);
          opacity: 0;
          transform: translateY(20px);
        }

        .hiw-banner-pill {
          display: inline-block;
          background: var(--brand);
          color: white;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 20px;
        }

        .hiw-banner-title {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 12px 0;
        }

        .hiw-banner-desc {
          font-size: 15px;
          color: #334155;
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Desktop specific */
        @media (min-width: 768px) {
          .hiw-step:not(:last-child)::after {
            content: '';
            position: absolute;
            top: 36.5px;
            left: calc(50% + 48px);
            width: calc(100% - 96px);
            height: 3px;
            background: linear-gradient(90deg, #A7F3D0 0%, #059669 100%);
            border-radius: 2px;
            z-index: -1;
            transform-origin: left;
            transform: scaleX(0);
          }
          .hiw-step:nth-child(1)::after { background: linear-gradient(90deg, #A7F3D0 0%, #34D399 100%); }
          .hiw-step:nth-child(2)::after { background: linear-gradient(90deg, #34D399 0%, #059669 100%); }
        }

        /* Mobile specific */
        @media (max-width: 767px) {
          .hiw-steps {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hiw-step {
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
            gap: 24px;
          }
          .hiw-step-visual {
            margin-bottom: 0;
            width: auto;
          }
          .hiw-desc {
            max-width: 100%;
          }
          .hiw-step:not(:last-child)::after {
            content: '';
            position: absolute;
            left: 36.5px;
            top: 86px;
            bottom: -24px;
            width: 3px;
            background: linear-gradient(180deg, #A7F3D0 0%, #059669 100%);
            border-radius: 2px;
            transform-origin: top;
            transform: scaleY(0);
          }
          .hiw-step:nth-child(1)::after { background: linear-gradient(180deg, #A7F3D0 0%, #34D399 100%); }
          .hiw-step:nth-child(2)::after { background: linear-gradient(180deg, #34D399 0%, #059669 100%); }
          .hiw-banner {
            padding: 32px 20px;
          }
          .hiw-banner-title {
            font-size: 24px;
          }
        }

        /* Animations */
        .visible .hiw-step:nth-child(1) .hiw-circle { animation: hiw-lightUp 0.5s ease 0s forwards; }
        .visible .hiw-step:nth-child(2) .hiw-circle { animation: hiw-lightUp 0.5s ease 0.5s forwards; }
        .visible .hiw-step:nth-child(3) .hiw-circle { animation: hiw-lightUp 0.5s ease 1s forwards; }

        @keyframes hiw-lightUp {
          to { transform: scale(1); opacity: 1; box-shadow: 0 0 0 8px rgba(45, 155, 111, 0.15), 0 8px 24px rgba(45, 155, 111, 0.25); }
        }

        .visible .hiw-step:nth-child(1) .hiw-badge { animation: hiw-badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards; }
        .visible .hiw-step:nth-child(2) .hiw-badge { animation: hiw-badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s forwards; }
        .visible .hiw-step:nth-child(3) .hiw-badge { animation: hiw-badgePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s forwards; }

        @keyframes hiw-badgePop {
          to { transform: scale(1); }
        }

        .visible .hiw-step:nth-child(1) .hiw-step-content { animation: hiw-textFadeIn 0.5s ease 0.1s forwards; }
        .visible .hiw-step:nth-child(2) .hiw-step-content { animation: hiw-textFadeIn 0.5s ease 0.6s forwards; }
        .visible .hiw-step:nth-child(3) .hiw-step-content { animation: hiw-textFadeIn 0.5s ease 1.1s forwards; }

        @keyframes hiw-textFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 768px) {
          .visible .hiw-step:nth-child(1)::after { animation: hiw-drawLineX 0.4s ease 0.2s forwards; }
          .visible .hiw-step:nth-child(2)::after { animation: hiw-drawLineX 0.4s ease 0.7s forwards; }
        }
        @media (max-width: 767px) {
          .visible .hiw-step:nth-child(1)::after { animation: hiw-drawLineY 0.4s ease 0.2s forwards; }
          .visible .hiw-step:nth-child(2)::after { animation: hiw-drawLineY 0.4s ease 0.7s forwards; }
        }

        @keyframes hiw-drawLineX { to { transform: scaleX(1); } }
        @keyframes hiw-drawLineY { to { transform: scaleY(1); } }

        .visible .hiw-banner { animation: hiw-textFadeIn 0.6s ease 1.6s forwards; }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hiw-circle { transform: scale(1) !important; opacity: 1 !important; box-shadow: 0 0 0 8px rgba(45, 155, 111, 0.15) !important; animation: none !important; }
          .hiw-badge { transform: scale(1) !important; animation: none !important; }
          .hiw-step-content { opacity: 1 !important; transform: none !important; animation: none !important; }
          .hiw-banner { opacity: 1 !important; transform: none !important; animation: none !important; }
          .hiw-step::after { transform: scaleX(1) scaleY(1) !important; animation: none !important; }
          .hiw-circle:hover { transform: none !important; }
          .hiw-circle:hover .hiw-icon { transform: none !important; }
        }
      `}</style>

      <section
        ref={sectionAnim.ref}
        className="hiw-section"
      >
        <div className={`hiw-container ${isVisible ? 'visible' : ''}`}>
          
          <div className="hiw-header">
            <h2
              className={`animate-in ${isVisible ? 'visible' : ''}`}
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
              className={`animate-in ${isVisible ? 'visible' : ''} animate-delay-1`}
              style={{
                fontSize: 18,
                color: '#334155',
                maxWidth: 600,
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Three simple steps from document to voice expert.
            </p>
          </div>

          <ol className="hiw-steps">
            {steps.map((step, i) => (
              <li key={i} className="hiw-step">
                <div className="hiw-step-visual">
                  <div className="hiw-circle">
                    <step.Icon className="hiw-icon" />
                    <div className="hiw-badge">{i + 1}</div>
                  </div>
                </div>

                <div className="hiw-step-content">
                  <h3 className="hiw-title">{step.title}</h3>
                  <p className="hiw-desc">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="hiw-banner">
            <Zap 
              style={{ width: 32, height: 32, color: 'var(--brand)', margin: '0 auto 16px', opacity: 0.8 }} 
              aria-hidden="true" 
            />
            <div className="hiw-banner-pill">
              Quick Win
            </div>
            <h3 className="hiw-banner-title">
              Live in 24 hours
            </h3>
            <p className="hiw-banner-desc">
              Most pilots go live within 24-48 hours. Upload your docs, configure persona, deploy to phone system or web widget.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
