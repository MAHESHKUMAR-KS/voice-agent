import useScrollReveal from '../hooks/useScrollReveal';

interface Testimonial {
  logo: string;
  quote: string;
  author: string;
  title: string;
  company: string;
}

export default function TestimonialSection() {
  const sectionAnim = useScrollReveal();

  const testimonials: Testimonial[] = [
    {
      logo: '/asset/clients/elevance-health.webp',
      quote: 'We reduced call center hold times from 42 minutes to under 3 minutes. Our Voice RAG agent handles 70% of benefits inquiries without human escalation. ROI in first quarter.',
      author: 'Sarah Chen',
      title: 'VP Customer Experience',
      company: 'Elevance Health',
    },
    {
      logo: '/asset/clients/AT&T.webp',
      quote: 'Field technicians now get instant answers to repair procedures hands-free. We eliminated $1.2M in unnecessary truck rolls in the first 6 months.',
      author: 'David Patel',
      title: 'Operations Director',
      company: 'AT&T Field Services',
    },
    {
      logo: '/asset/clients/broadridge.webp',
      quote: 'Voice RAG cut our compliance documentation query time from 45 minutes to 90 seconds. Every interaction is logged for audit — regulators love it.',
      author: 'Maria Rodriguez',
      title: 'Chief Compliance Officer',
      company: 'Broadridge Financial',
    }
  ];

  return (
    <section
      ref={sectionAnim.ref}
      style={{
        padding: '40px 0 24px',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: 28,
          }}
        >
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`animate-in ${sectionAnim.visible ? 'visible' : ''} animate-delay-${i + 2}`}
              style={{
                background: 'transparent',
                padding: '12px 0 20px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >


              <div>
                {/* Company Logo */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'var(--paper)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '6px 12px',
                    marginBottom: 16,
                  }}
                >
                  <img
                    src={testimonial.logo}
                    alt={testimonial.company}
                    style={{
                      height: 18,
                      width: 'auto',
                      maxWidth: 105,
                      objectFit: 'contain',
                    }}
                  />
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.65,
                    color: 'var(--slate)',
                    marginBottom: 20,
                    fontStyle: 'italic',
                  }}
                >
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: 16,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--primary-light)',
                    border: '1px solid #A7F3D0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 13,
                    color: 'var(--primary)',
                    flexShrink: 0,
                  }}
                >
                  {testimonial.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 13.5, marginBottom: 1 }}>
                    {testimonial.author}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--slate)' }}>
                    {testimonial.title} • {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}