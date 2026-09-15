import { useState, useEffect, useRef, FormEvent } from 'react';
import {
  Mic,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Play,
  Shield,
  Clock,
  TrendingUp,
  Headphones,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface FormData {
  full_name: string;
  work_email: string;
  job_title: string;
  company_name: string;
  use_case: string;
  phone: string;
}

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

function App() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    work_email: '',
    job_title: '',
    company_name: '',
    use_case: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroAnim = useInView();
  const metricsAnim = useInView();
  const demoAnim = useInView();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError(data.message || 'Failed to submit. Please try again.');
      }
    } catch {
      setError('Network error. Backend may not be running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>

      {/* ============ HEADER ============ */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          height: 68,
          gap: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginRight: 'auto' }}>
            <img src="/logo.webp" alt="Adople AI" style={{ height: 38, width: 'auto' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--primary)' }}>Adople AI</div>
              <div className="mono" style={{ fontSize: 8, color: 'var(--slate)', letterSpacing: '0.08em' }}>
                VOICE AGENT PLATFORM
              </div>
            </div>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#features" style={{
              textDecoration: 'none', fontSize: 14, fontWeight: 500, color: 'var(--slate)',
              transition: 'color 0.2s'
            }}>Features</a>
            <a href="#demo" style={{
              textDecoration: 'none', fontSize: 14, fontWeight: 500, color: 'var(--slate)',
              transition: 'color 0.2s'
            }}>Demo</a>
          </nav>

          <a href="#demo" className="btn-primary" style={{ padding: '10px 22px', fontSize: 14 }}>
            <span>Get Demo</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </a>
        </div>
      </header>

      {/* ============ HERO SECTION ============ */}
      <section className="hero-section" style={{ padding: '100px 0 80px' }} id="hero">
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

          <div
            ref={heroAnim.ref}
            className="hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 60,
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <div>
              <div
                className={`animate-in ${heroAnim.visible ? 'visible' : ''}`}
                style={{ marginBottom: 20 }}
              >
                <span className="float-badge">
                  <Sparkles style={{ width: 14, height: 14, color: 'var(--accent)' }} />
                  <span className="mono" style={{ fontSize: 12, letterSpacing: '0.06em', fontWeight: 600 }}>
                    AI VOICE DEFLECTION
                  </span>
                </span>
              </div>

              <h1
                className={`animate-in hero-title ${heroAnim.visible ? 'visible' : ''} animate-delay-1`}
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  lineHeight: 1.1,
                  marginBottom: 24,
                  letterSpacing: '-0.03em',
                }}
              >
                Customer calls<br />answered instantly.
                <span className="gradient-text" style={{ display: 'block', paddingBottom: 4 }}>
                  No waiting.
                </span>
              </h1>

              <p
                className={`animate-in ${heroAnim.visible ? 'visible' : ''} animate-delay-2`}
                style={{
                  fontSize: 18,
                  color: 'var(--slate)',
                  lineHeight: 1.75,
                  marginBottom: 36,
                  maxWidth: 480,
                }}
              >
                Deploy a voice AI agent that handles FAQs, billing, scheduling, and escalations — working 24/7 with zero training required.
              </p>

              <div
                className={`animate-in ${heroAnim.visible ? 'visible' : ''} animate-delay-3`}
                style={{ display: 'grid', gap: 10, marginBottom: 36 }}
              >
                {[
                  { icon: '⚡', text: '65% call deflection on day one', bg: '#FEF3C7' },
                  { icon: '🎯', text: 'Deploy in 14 days, live forever', bg: '#DBEAFE' },
                  { icon: '🔒', text: 'HIPAA-ready, your data stays yours', bg: '#D1FAE5' }
                ].map((item, i) => (
                  <div key={i} className="feature-pill">
                    <div className="feature-icon" style={{ background: item.bg }}>
                      {item.icon}
                    </div>
                    <span style={{ fontWeight: 500 }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <div
                className={`animate-in ${heroAnim.visible ? 'visible' : ''} animate-delay-4`}
                style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
              >
                <a href="#demo" className="btn-primary">
                  <span>See It In Action</span>
                  <ArrowRight style={{ width: 18, height: 18 }} />
                </a>
                <a href="#demo" className="btn-secondary" style={{ padding: '12px 24px' }}>
                  <Play style={{ width: 16, height: 16 }} />
                  <span>Watch Demo</span>
                </a>
              </div>
            </div>

            {/* Right: Animated Voice Visualization */}
            <div
              className={`animate-in ${heroAnim.visible ? 'visible' : ''} animate-delay-2`}
            >
              <div className="voice-viz">
                <div className="voice-ring" />
                <div className="voice-ring" />
                <div className="voice-ring" />
                <div className="voice-ring" />
                <div className="voice-core">
                  <Mic style={{ width: 40, height: 40, color: 'var(--white)' }} />
                </div>

                {/* Floating stat badges */}
                <div style={{
                  position: 'absolute',
                  top: '12%',
                  right: '8%',
                  background: 'var(--white)',
                  borderRadius: 14,
                  padding: '12px 18px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  animation: 'core-float 4s ease-in-out infinite',
                  animationDelay: '0.5s',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: '#DBEAFE',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <TrendingUp style={{ width: 18, height: 18, color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>65%</div>
                    <div style={{ fontSize: 10, color: 'var(--slate)' }}>Call deflection</div>
                  </div>
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '15%',
                  left: '5%',
                  background: 'var(--white)',
                  borderRadius: 14,
                  padding: '12px 18px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  animation: 'core-float 4s ease-in-out infinite',
                  animationDelay: '1.5s',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: '#D1FAE5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Clock style={{ width: 18, height: 18, color: '#16a34a' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>24/7</div>
                    <div style={{ fontSize: 10, color: 'var(--slate)' }}>Always on</div>
                  </div>
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '8%',
                  right: '15%',
                  background: 'var(--white)',
                  borderRadius: 14,
                  padding: '10px 16px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  animation: 'core-float 4s ease-in-out infinite',
                  animationDelay: '2.2s',
                }}>
                  <div className="sound-bars">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="sound-bar" />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--slate)', fontWeight: 500 }}>Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div style={{ marginTop: 80, textAlign: 'center' }}>
            <p className="mono" style={{
              fontSize: 11, color: 'var(--slate-light)', letterSpacing: '0.08em', marginBottom: 24,
              fontWeight: 500, textTransform: 'uppercase',
            }}>
              Trusted by support teams at
            </p>
            <div className="logo-bar">
              {['Stripe', 'Shopify', 'Zendesk', 'HubSpot', 'Twilio'].map(name => (
                <span key={name} style={{
                  fontWeight: 700, fontSize: 20, color: 'var(--ink)', letterSpacing: '-0.01em',
                }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ METRICS SECTION ============ */}
      <section id="features" style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div
          ref={metricsAnim.ref}
          style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p
              className={`mono animate-in ${metricsAnim.visible ? 'visible' : ''}`}
              style={{
                fontSize: 12, color: 'var(--primary)', letterSpacing: '0.08em', fontWeight: 600,
                marginBottom: 12, textTransform: 'uppercase',
              }}
            >
              Why teams switch
            </p>
            <h2
              className={`section-title animate-in ${metricsAnim.visible ? 'visible' : ''} animate-delay-1`}
              style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em' }}
            >
              Results from day one,<br />
              <span className="gradient-text">not day ninety.</span>
            </h2>
          </div>

          <div
            className="metrics-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 20,
            }}
          >
            {[
              {
                icon: <TrendingUp style={{ width: 22, height: 22, color: 'var(--primary)' }} />,
                metric: '65%',
                label: 'Call deflection',
                detail: 'Average on day one',
                bg: '#DBEAFE',
              },
              {
                icon: <Clock style={{ width: 22, height: 22, color: '#7C3AED' }} />,
                metric: '< 14 days',
                label: 'Time to deploy',
                detail: 'Full production ready',
                bg: '#EDE9FE',
              },
              {
                icon: <Shield style={{ width: 22, height: 22, color: '#16a34a' }} />,
                metric: 'HIPAA',
                label: 'Compliant',
                detail: 'SOC 2 Type II certified',
                bg: '#D1FAE5',
              },
              {
                icon: <Headphones style={{ width: 22, height: 22, color: '#ea580c' }} />,
                metric: '24/7',
                label: 'Always available',
                detail: 'Zero hold time',
                bg: '#FEF3C7',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`metric-card animate-in ${metricsAnim.visible ? 'visible' : ''}`}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: item.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  {item.icon}
                </div>
                <div className="mono" style={{
                  fontSize: 32, fontWeight: 800, color: 'var(--ink)',
                  letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6,
                }}>
                  {item.metric}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 13, color: 'var(--slate)' }}>
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DEMO + FORM SECTION ============ */}
      <section id="demo" style={{
        padding: '80px 0 100px',
        background: 'linear-gradient(180deg, var(--paper) 0%, #EFF6FF 100%)',
      }}>
        <div
          ref={demoAnim.ref}
          style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}
        >
          <div
            className="demo-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 460px',
              gap: 56,
              alignItems: 'start',
            }}
          >
            {/* Left: Demo Video */}
            <div>
              <h2
                className={`section-title animate-in ${demoAnim.visible ? 'visible' : ''}`}
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  marginBottom: 20,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                }}
              >
                Watch the voice agent
                <span className="gradient-text" style={{ display: 'block' }}>in action.</span>
              </h2>
              <p
                className={`animate-in ${demoAnim.visible ? 'visible' : ''} animate-delay-1`}
                style={{
                  fontSize: 17,
                  color: 'var(--slate)',
                  lineHeight: 1.75,
                  marginBottom: 32,
                  maxWidth: 480,
                }}
              >
                See how it handles customer calls, answers FAQs, schedules appointments, and escalates complex issues — end-to-end.
              </p>

              <div
                className={`video-card animate-in ${demoAnim.visible ? 'visible' : ''} animate-delay-2`}
              >
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  <div className="play-btn">
                    <Play style={{ width: 28, height: 28, color: 'var(--white)', marginLeft: 3 }} />
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--slate)', fontWeight: 500 }}>
                    Demo Video — 4:12
                  </div>
                </div>
              </div>

              {/* Trust signals */}
              <div
                className={`animate-in ${demoAnim.visible ? 'visible' : ''} animate-delay-3`}
                style={{
                  display: 'flex', gap: 24, marginTop: 28, flexWrap: 'wrap',
                }}
              >
                {[
                  { icon: <Shield style={{ width: 14, height: 14 }} />, text: 'SOC 2 Certified' },
                  { icon: <Clock style={{ width: 14, height: 14 }} />, text: 'Setup in minutes' },
                  { icon: <CheckCircle2 style={{ width: 14, height: 14 }} />, text: 'No credit card required' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 13, color: 'var(--slate)', fontWeight: 500,
                  }}>
                    <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form Card */}
            <div
              className={`form-card animate-in ${demoAnim.visible ? 'visible' : ''} animate-delay-1`}
            >
              {!isSuccess ? (
                <>
                  <div className="form-header">
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, marginBottom: 6, color: 'var(--white)' }}>
                        Request Demo
                      </h3>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                        Get instant access to the live voice agent.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} style={{ padding: 24, display: 'grid', gap: 16 }}>
                    {error && (
                      <div style={{
                        background: '#fee2e2',
                        border: '1px solid #fecaca',
                        color: '#991b1b',
                        fontSize: 13,
                        padding: 12,
                        borderRadius: 10,
                      }}>
                        {error}
                      </div>
                    )}

                    {[
                      { label: 'FULL NAME', name: 'full_name', type: 'text', placeholder: 'John Smith' },
                      { label: 'WORK EMAIL', name: 'work_email', type: 'email', placeholder: 'john@company.com' },
                      { label: 'JOB TITLE', name: 'job_title', type: 'text', placeholder: 'VP Support' },
                      { label: 'COMPANY', name: 'company_name', type: 'text', placeholder: 'Acme Corp' },
                    ].map(field => (
                      <div key={field.name}>
                        <label className="lbl" style={{ display: 'block', marginBottom: 6 }}>
                          {field.label} <span style={{ color: 'var(--danger)' }}>*</span>
                        </label>
                        <input
                          className="form-input"
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof FormData]}
                          onChange={handleInputChange}
                          required
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="lbl" style={{ display: 'block', marginBottom: 6 }}>
                        USE CASE <span style={{ color: 'var(--danger)' }}>*</span>
                      </label>
                      <select
                        className="form-input"
                        name="use_case"
                        value={formData.use_case}
                        onChange={handleInputChange}
                        required
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="">Select use case...</option>
                        <option value="Customer Support">Customer Support</option>
                        <option value="Sales Qualification">Sales Qualification</option>
                        <option value="Billing">Billing</option>
                        <option value="Scheduling">Scheduling</option>
                        <option value="HR Services">HR Services</option>
                      </select>
                    </div>

                    <div>
                      <label className="lbl" style={{ display: 'block', marginBottom: 6 }}>
                        PHONE <span style={{ color: 'var(--danger)' }}>*</span>
                      </label>
                      <input
                        className="form-input"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="form-submit" style={{ marginTop: 4 }}>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        {isSubmitting ? (
                          <>
                            <Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} />
                            Sending...
                          </>
                        ) : (
                          <>
                            Get Demo Access
                            <ChevronRight style={{ width: 18, height: 18 }} />
                          </>
                        )}
                      </span>
                    </button>

                    <p style={{ fontSize: 11, color: 'var(--slate)', lineHeight: 1.5, margin: 0, textAlign: 'center' }}>
                      No spam. One engineer reaches out within 24 hours.
                    </p>
                  </form>
                </>
              ) : (
                <div style={{
                  padding: '48px 32px',
                  textAlign: 'center',
                  display: 'grid',
                  gap: 16,
                  animation: 'fade-in-up 0.5s ease-out',
                }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: '#D1FAE5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto',
                  }}>
                    <CheckCircle2 style={{ width: 32, height: 32, color: 'var(--success)' }} />
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                    Demo Unlocked
                  </h3>
                  <p style={{ fontSize: 15, color: 'var(--slate)', margin: 0, lineHeight: 1.6 }}>
                    Our team will contact you within 24 hours.<br />Check your email for next steps.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="site-footer" style={{ padding: '64px 0 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div
            className="footer-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: 48,
              marginBottom: 40,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <img src="/logo.webp" alt="Adople AI" style={{ height: 36, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--white)', fontSize: 18 }}>Adople AI</div>
                  <div className="mono" style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
                    VOICE AGENT PLATFORM
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 360 }}>
                Enterprise-grade AI voice agents that deflect calls, handle support, and scale your business.
              </p>
            </div>

            <div>
              <h4 className="mono" style={{
                marginBottom: 20, fontSize: 11, letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: 600,
              }}>
                Product
              </h4>
              <ul style={{ listStyle: 'none', display: 'grid', gap: 12, fontSize: 14 }}>
                <li><a href="#demo">Request Demo</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mono" style={{
                marginBottom: 20, fontSize: 11, letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: 600,
              }}>
                Company
              </h4>
              <ul style={{ listStyle: 'none', display: 'grid', gap: 12, fontSize: 14 }}>
                <li><a href="#">About</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>

          <div style={{
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 20,
            flexWrap: 'wrap',
            fontSize: 13,
            color: 'rgba(255,255,255,0.3)',
          }}>
            <span>&copy; 2026 Adople AI. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 20 }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.3)' }}>Privacy</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.3)' }}>Terms</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.3)' }}>Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
