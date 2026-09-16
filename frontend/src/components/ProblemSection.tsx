import { useState, useEffect, useRef } from 'react';
import { Clock, Wrench, FileText } from 'lucide-react';

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

export default function ProblemSection() {
  const sectionAnim = useInView();

  const problems = [
    {
      Icon: Clock,
      title: 'Support Teams Buried in Ticket Backlog',
      bullets: [
        'Average 45-minute hold times',
        'Agents toggling between 12+ systems',
        '68% of calls are repeat questions',
        'Overnight/weekend coverage gaps'
      ],
      stat: '45 min'
    },
    {
      Icon: Wrench,
      title: 'Field Techs Stuck Without Answers',
      bullets: [
        '300-page manuals impossible to search mid-job',
        'Hands-free access not available',
        'Outdated paper documentation',
        '$2,400 average truck roll cost'
      ],
      stat: '$2.4K'
    },
    {
      Icon: FileText,
      title: 'Knowledge Trapped in Static Files',
      bullets: [
        'PDFs and SharePoint folders don\'t talk back',
        'ChatGPT hallucinates policy details',
        'No audit trail of what was actually said',
        'Compliance teams can\'t verify answers'
      ],
      stat: '0 audit'
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
            The Problem
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
            Knowledge workers waste hours searching for answers. Your customers wait. Your reputation suffers.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 32,
          }}
        >
          {problems.map((problem, i) => (
            <div
              key={i}
              className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-${i + 1}`}
              style={{
                background: 'white',
                borderRadius: 12,
                padding: 32,
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    background: '#FEE2E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <problem.Icon style={{ width: 24, height: 24, color: '#DC2626' }} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#DC2626', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {problem.stat}
                </div>
              </div>

              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 16,
                  color: 'var(--ink)',
                }}
              >
                {problem.title}
              </h3>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'grid',
                  gap: 10,
                }}
              >
                {problem.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: 14,
                      color: 'var(--slate)',
                      lineHeight: 1.6,
                      paddingLeft: 20,
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: '#DC2626',
                        fontWeight: 700,
                      }}
                    >
                      •
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
