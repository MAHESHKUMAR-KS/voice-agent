import { ArrowRight } from 'lucide-react';

interface StickyCtaButtonProps {
  show: boolean;
  scrollToForm: () => void;
}

export default function StickyCtaButton({ show, scrollToForm }: StickyCtaButtonProps) {
  return (
    <button
      onClick={scrollToForm}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        background: 'var(--primary)',
        color: 'white',
        border: 'none',
        padding: '14px 24px',
        borderRadius: 10,
        fontWeight: 700,
        fontSize: 14,
        cursor: show ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        zIndex: 999,
        boxShadow: '0 12px 32px rgba(45, 155, 111, 0.3)',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(16px)',
        pointerEvents: show ? 'auto' : 'none',
        visibility: show ? 'visible' : 'hidden',
        transition: 'opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.25s, box-shadow 0.25s',
        animation: show ? 'pulse 2s infinite' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!show) return;
        e.currentTarget.style.background = '#1E7A54';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(45, 155, 111, 0.4)';
        e.currentTarget.style.transform = 'translateY(0) scale(1.05)';
      }}
      onMouseLeave={(e) => {
        if (!show) return;
        e.currentTarget.style.background = 'var(--primary)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(45, 155, 111, 0.3)';
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 12px 32px rgba(45, 155, 111, 0.3);
          }
          50% {
            box-shadow: 0 12px 32px rgba(45, 155, 111, 0.5);
          }
        }
      `}</style>
      <span>Request Demo</span>
      <ArrowRight style={{ width: 16, height: 16 }} />
    </button>
  );
}
