import { useState, useEffect } from 'react';
import { UserCheck, Calendar, Database, Languages, CheckCircle2 } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  icon: 'qualified' | 'booked' | 'crm' | 'language';
}

export default function LiveActivityFeed() {
  const feedAnim = useScrollReveal();

  const activities: ActivityItem[] = [
    { id: '1', user: 'Healthcare Team', action: 'Voice session started', timestamp: '2 seconds ago', icon: 'qualified' },
    { id: '2', user: 'Restaurant Staff', action: 'Menu PDF uploaded', timestamp: '8 seconds ago', icon: 'booked' },
    { id: '3', user: 'Support Team', action: 'Custom prompt configured', timestamp: '15 seconds ago', icon: 'crm' },
    { id: '4', user: 'Education Dept', action: 'Transcript exported', timestamp: '22 seconds ago', icon: 'language' },
  ];

  const getIcon = (type: string) => {
    const iconMap = {
      qualified: { Icon: UserCheck, color: '#EC4899', bg: 'rgba(236, 72, 153, 0.1)' },
      booked: { Icon: Calendar, color: '#16A34A', bg: 'rgba(22, 163, 74, 0.1)' },
      crm: { Icon: Database, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
      language: { Icon: Languages, color: '#F97316', bg: 'rgba(249, 115, 22, 0.1)' },
    };
    return iconMap[type as keyof typeof iconMap] || iconMap.qualified;
  };

  return (
    <div
      ref={feedAnim.ref}
      className={`live-activity-feed animate-in ${feedAnim.visible ? 'visible' : ''}`}
      style={{
        background: 'rgba(245, 243, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(139, 92, 246, 0.1)',
        borderRadius: 16,
        padding: 24,
        maxWidth: 440,
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: '1px solid rgba(139, 92, 246, 0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#16A34A',
            animation: 'pulse 2s infinite',
          }} />
          <h3 style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--ink)',
            margin: 0,
          }}>
            Live Activity
          </h3>
        </div>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--slate)',
          fontFamily: 'IBM Plex Mono, monospace',
        }}>
          247 sessions active
        </span>
      </div>

      {/* Activity Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {activities.map((activity, index) => {
          const { Icon, color, bg } = getIcon(activity.icon);
          return (
            <div
              key={activity.id}
              className={`activity-item animate-in stagger-item ${feedAnim.visible ? 'visible' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(139, 92, 246, 0.06)',
                borderRadius: 12,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon style={{ width: 18, height: 18, color }} />
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  marginBottom: 2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {activity.user}
                </div>
                <div style={{
                  fontSize: 12,
                  color: 'var(--slate)',
                }}>
                  {activity.action}
                </div>
              </div>

              {/* Status & Time */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 4,
              }}>
                <CheckCircle2 style={{
                  width: 14,
                  height: 14,
                  color: '#16A34A',
                }} />
                <span style={{
                  fontSize: 10,
                  color: 'var(--slate-light)',
                  fontFamily: 'IBM Plex Mono, monospace',
                  whiteSpace: 'nowrap',
                }}>
                  {activity.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        marginTop: 20,
        paddingTop: 16,
        borderTop: '1px solid rgba(139, 92, 246, 0.08)',
      }}>
        {[
          { label: 'Voice sessions', value: '1,243' },
          { label: 'PDFs uploaded', value: '892' },
          { label: 'Transcripts', value: '1.1K' },
        ].map((stat, i) => (
          <div key={i} style={{
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 16,
              fontWeight: 800,
              color: 'var(--brand)',
              marginBottom: 2,
              fontFamily: 'Inter, sans-serif',
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: 10,
              color: 'var(--slate)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontFamily: 'IBM Plex Mono, monospace',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .activity-item {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .activity-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-item:nth-child(1) { transition-delay: 0.1s; }
        .stagger-item:nth-child(2) { transition-delay: 0.2s; }
        .stagger-item:nth-child(3) { transition-delay: 0.3s; }
        .stagger-item:nth-child(4) { transition-delay: 0.4s; }
      `}</style>
    </div>
  );
}
