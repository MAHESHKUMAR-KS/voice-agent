import { Clock, Wrench, FileText } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ProblemSection() {
  const sectionAnim = useScrollReveal();

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
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: 32,
          }}
        >
          {problems.map((problem, i) => (
            <div
              key={i}
              className={`problem-card animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-${i + 2}`}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div className="problem-icon-container">
                  <problem.Icon className="problem-icon" style={{ width: 24, height: 24, color: '#DC2626' }} />
                </div>
                <div className="problem-stat-badge">
                  {problem.stat}
                </div>
              </div>

              <h3 className="problem-title">
                {problem.title}
              </h3>

              <ul className="problem-bullets">
                {problem.bullets.map((bullet, j) => (
                  <li key={j} className="problem-bullet-item">
                    <span className="problem-bullet-dot">
                      •
                    </span>
                    <span>{bullet}</span>
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
