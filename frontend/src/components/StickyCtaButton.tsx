import { ArrowRight } from 'lucide-react';

interface StickyCtaButtonProps {
  show: boolean;
  scrollToForm: () => void;
}

export default function StickyCtaButton({ show, scrollToForm }: StickyCtaButtonProps) {
  if (!show) return null;

  return (
    <button
      onClick={scrollToForm}
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
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        zIndex: 999,
        boxShadow: '0 12px 32px rgba(59, 130, 246, 0.3)',
        transition: 'all 0.3s',
        animation: 'pulse 2s infinite',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#1d4ed8';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(59, 130, 246, 0.4)';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--primary)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.3)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 12px 32px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 12px 32px rgba(59, 130, 246, 0.5);
          }
        }
      `}</style>
      <span>Request Demo</span>
      <ArrowRight style={{ width: 16, height: 16 }} />
    </button>
  );
}
