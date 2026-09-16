import { useState, useEffect, useRef } from 'react';

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

interface Testimonial {
  logo: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  metric: string;
  metricLabel: string;
}

export default function TestimonialSection() {
  const sectionAnim = useInView();

  const testimonials: Testimonial[] = [
    {
      logo: '/asset/clients/elevance-health.webp',
      quote: 'We reduced call center hold times from 42 minutes to under 3 minutes. Our Voice RAG agent handles 70% of benefits inquiries without human escalation. ROI in first quarter.',
      author: 'Sarah Chen',
      title: 'VP Customer Experience',
      company: 'Elevance Health',
      metric: '93%',
      metricLabel: 'Deflection Rate'
    },
    {
      logo: '/asset/clients/AT&T.webp',
      quote: 'Field technicians now get instant answers to repair procedures hands-free. We eliminated $1.2M in unnecessary truck rolls in the first 6 months.',
      author: 'David Patel',
      title: 'Operations Director',
      company: 'AT&T Field Services',
      metric: '34%',
      metricLabel: 'Truck Roll Reduction'
    },
    {
      logo: '/asset/clients/broadridge.webp',
      quote: 'Voice RAG cut our compliance documentation query time from 45 minutes to 90 seconds. Every interaction is logged for audit — regulators love it.',
      author: 'Maria Rodriguez',
      title: 'Chief Compliance Officer',
      company: 'Broadridge Financial',
      metric: '30x',
      metricLabel: 'Faster Queries'
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
            Loved by Enterprise Teams
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
            Hear from leaders who've transformed their knowledge access with Voice RAG.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 32,
          }}
        >
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-${i + 1}`}
              style={{
                background: 'white',
                borderRadius: 12,
                padding: 32,
                border: '1px solid #e2e8f0',
                position: 'relative',
                borderTop: '4px solid var(--primary)',
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
              {/* Company Logo */}
              <div style={{ marginBottom: 24 }}>
                <img
                  src={testimonial.logo}
                  alt={testimonial.company}
                  style={{
                    height: 32,
                    width: 'auto',
                    maxWidth: 120,
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: 'var(--slate)',
                  marginBottom: 24,
                  fontStyle: 'italic',
                }}
              >
                "{testimonial.quote}"
              </p>

              {/* Metric Badge */}
              <div
                style={{
                  background: '#F0F9FF',
                  border: '1px solid #BAE6FD',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 24,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary)', marginBottom: 2 }}>
                  {testimonial.metric}
                </div>
                <div style={{ fontSize: 12, color: 'var(--slate)', fontWeight: 500 }}>
                  {testimonial.metricLabel}
                </div>
              </div>

              {/* Author */}
              <div>
                <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 14, marginBottom: 2 }}>
                  {testimonial.author}
                </div>
                <div style={{ fontSize: 13, color: 'var(--slate)', marginBottom: 2 }}>
                  {testimonial.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--slate)', fontWeight: 500 }}>
                  {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
