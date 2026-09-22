import { useState, useEffect, useRef, FormEvent } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Loader2,
  Shield,
  Lock,
  Zap,
  ChevronRight,
  Zap as Lightning,
  Target,
  Mic,
  ChevronDown,
} from 'lucide-react';
import ProblemSection from './components/ProblemSection';
import UseCaseTabs from './components/UseCaseTabs';
import HowItWorks from './components/HowItWorks';
import TestimonialSection from './components/TestimonialSection';
import ComparisonTable from './components/ComparisonTable';
import FaqAccordion from './components/FaqAccordion';
import StickyCtaButton from './components/StickyCtaButton';
import LiveActivityFeed from './components/LiveActivityFeed';

const COUNTRIES = [
  { isoCode: 'in', name: 'India', dial: '+91' },
  { isoCode: 'us', name: 'United States', dial: '+1' },
  { isoCode: 'gb', name: 'United Kingdom', dial: '+44' },
  { isoCode: 'ca', name: 'Canada', dial: '+1' },
  { isoCode: 'au', name: 'Australia', dial: '+61' },
  { isoCode: 'de', name: 'Germany', dial: '+49' },
  { isoCode: 'fr', name: 'France', dial: '+33' },
  { isoCode: 'it', name: 'Italy', dial: '+39' },
  { isoCode: 'es', name: 'Spain', dial: '+34' },
  { isoCode: 'nz', name: 'New Zealand', dial: '+64' },
  { isoCode: 'za', name: 'South Africa', dial: '+27' },
  { isoCode: 'br', name: 'Brazil', dial: '+55' },
  { isoCode: 'mx', name: 'Mexico', dial: '+52' },
  { isoCode: 'sg', name: 'Singapore', dial: '+65' },
  { isoCode: 'my', name: 'Malaysia', dial: '+60' },
  { isoCode: 'id', name: 'Indonesia', dial: '+62' },
  { isoCode: 'th', name: 'Thailand', dial: '+66' },
  { isoCode: 'ph', name: 'Philippines', dial: '+63' },
  { isoCode: 'ae', name: 'United Arab Emirates', dial: '+971' },
  { isoCode: 'sa', name: 'Saudi Arabia', dial: '+966' },
  { isoCode: 'nl', name: 'Netherlands', dial: '+31' },
  { isoCode: 'be', name: 'Belgium', dial: '+32' },
  { isoCode: 'ch', name: 'Switzerland', dial: '+41' },
  { isoCode: 'at', name: 'Austria', dial: '+43' },
  { isoCode: 'se', name: 'Sweden', dial: '+46' },
  { isoCode: 'no', name: 'Norway', dial: '+47' },
  { isoCode: 'dk', name: 'Denmark', dial: '+45' },
  { isoCode: 'pl', name: 'Poland', dial: '+48' },
  { isoCode: 'gr', name: 'Greece', dial: '+30' },
  { isoCode: 'jp', name: 'Japan', dial: '+81' },
  { isoCode: 'cn', name: 'China', dial: '+86' },
];

interface FormData {
  full_name: string;
  work_email: string;
  job_title: string;
  company_name: string;
  use_case: string;
  other_use_case: string;
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

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

function PhoneInputWrapper({ value, onChange, required }: PhoneInputProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showDropdown && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [showDropdown]);

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dial.includes(searchTerm) ||
      country.isoCode.includes(searchTerm)
  );

  const handleSelectCountry = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    setSearchTerm('');
    onChange('');
  };

  const phoneNumber = value.startsWith(selectedCountry.dial)
    ? value.slice(selectedCountry.dial.length).trim()
    : value.trim();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const phoneOnly = inputValue.replace(/\D/g, '');
    onChange(selectedCountry.dial + phoneOnly);
  };

  const handlePhoneInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      onChange(selectedCountry.dial);
    }
  };

  return (
    <div
      ref={dropdownRef}
      style={{
        display: 'flex',
        gap: 0,
        position: 'relative',
        width: '100%',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        background: '#f7f9fc',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 14px',
          background: '#eef2f7',
          border: 'none',
          borderRight: '1px solid #e2e8f0',
          fontFamily: 'inherit',
          fontSize: '14px',
          fontWeight: 600,
          color: '#0a1628',
          cursor: 'pointer',
          outline: 'none',
          borderRadius: '8px 0 0 8px',
          transition: 'background 0.2s',
          minWidth: '110px',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#eef2f7')}
      >
        <img
          src={`https://flagcdn.com/w20/${selectedCountry.isoCode}.png`}
          alt={selectedCountry.name}
          style={{
            width: '20px',
            height: '14px',
            objectFit: 'cover',
            borderRadius: '2px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        />
        <span style={{ fontWeight: 600 }}>{selectedCountry.dial}</span>
        <ChevronDown
          style={{
            width: 10,
            height: 10,
            transition: 'transform 0.3s',
            transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            background: 'white',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
            marginBottom: '4px',
            zIndex: 99999,
            width: '300px',
            maxWidth: '90vw',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-6px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div
            style={{
              padding: '8px',
              background: 'white',
              borderBottom: '1px solid #edf2f7',
            }}
          >
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'white',
                border: '2px solid #3b82f6',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.15)',
              }}
            />
          </div>
          <div
            style={{
              maxHeight: '220px',
              overflowY: 'auto',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.isoCode}
                  type="button"
                  onClick={() => handleSelectCountry(country)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: 'none',
                    background: 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    borderBottom: '1px solid #f3f4f6',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
                >
                  <img
                    src={`https://flagcdn.com/w20/${country.isoCode}.png`}
                    alt={country.name}
                    style={{
                      width: '20px',
                      height: '14px',
                      objectFit: 'cover',
                      borderRadius: '2px',
                    }}
                  />
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#0a1628', flex: 1 }}>
                    {country.name}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#8896ab' }}>
                    {country.dial}
                  </span>
                </button>
              ))
            ) : (
              <div style={{ padding: '14px', textAlign: 'center', color: '#8896ab', fontSize: '14px' }}>
                No country found
              </div>
            )}
          </div>
        </div>
      )}

      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        onFocus={handlePhoneInputFocus}
        required={required}
        placeholder="081234 56789"
        style={{
          border: 'none',
          background: 'transparent',
          padding: '12px 16px',
          flex: 1,
          width: '100%',
          outline: 'none',
          fontSize: '14px',
          fontFamily: 'inherit',
          color: '#0a1628',
          caretColor: '#0a1628',
          WebkitTextFillColor: '#0a1628',
          WebkitAutofillColor: '#0a1628'
        }}
        onInput={(e) => {
          const target = e.currentTarget as HTMLInputElement;
          target.style.color = target.value ? '#0a1628' : '#0a1628';
          (target as any).style['::placeholder'] = '#cbd5e1';
        }}
      />
      <style>{`
        input[type="tel"]::placeholder {
          color: #cbd5e1;
          opacity: 1;
        }
        input[type="tel"]::-webkit-input-placeholder {
          color: #cbd5e1;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    work_email: '',
    job_title: '',
    company_name: '',
    use_case: '',
    other_use_case: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowStickyCta(window.scrollY > 800);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroAnim = useInView();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const apiKey = import.meta.env.VITE_FUNNEL_API_KEY;
      if (!apiKey) {
        throw new Error('API key not configured. Please check .env file.');
      }

      const payload = {
        full_name: formData.full_name,
        work_email: formData.work_email,
        phone: formData.phone,
        company_name: formData.company_name,
        job_title: formData.job_title,
        use_case: formData.use_case,
        other_use_case: formData.other_use_case
      };
      console.log('Sending payload:', payload);

      const response = await fetch('http://localhost:9045/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);
      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.error('Backend error:', data);
        setError(data.message || data.error || 'Failed to submit. Please try again.');
      }
    } catch {
      setError('Network error. Backend may not be running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clients = [
    { name: 'Adople', logo: '/asset/clients/Adople-logo.webp' },
    { name: 'AT&T', logo: '/asset/clients/AT&T.webp' },
    { name: 'Broadridge', logo: '/asset/clients/broadridge.webp' },
    { name: 'Confluence', logo: '/asset/clients/confluence.webp' },
    { name: 'Crocs', logo: '/asset/clients/crocs.webp' },
    { name: 'Elevance Health', logo: '/asset/clients/elevance-health.webp' },
    { name: 'Lilly', logo: '/asset/clients/Lilly.webp' },
    { name: 'NHS', logo: '/asset/clients/nhs.jpg' },
    { name: 'Randstad', logo: '/asset/clients/randstad.webp' },
    { name: 'Syngenta', logo: '/asset/clients/syngenta.webp' },
    { name: 'Vodafone', logo: '/asset/clients/vodafone.webp' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <StickyCtaButton show={showStickyCta} scrollToForm={scrollToForm} />

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
                VOICE RAG PLATFORM
              </div>
            </div>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#features" style={{
              textDecoration: 'none', fontSize: 14, fontWeight: 500, color: 'var(--slate)',
              transition: 'color 0.2s',
              cursor: 'pointer'
            }} onClick={scrollToForm}>Features</a>
            <a href="#form" style={{
              textDecoration: 'none', fontSize: 14, fontWeight: 500, color: 'var(--slate)',
              transition: 'color 0.2s',
              cursor: 'pointer'
            }} onClick={scrollToForm}>Demo</a>
          </nav>

          <button onClick={scrollToForm} className="btn-primary" style={{ padding: '10px 22px', fontSize: 14, border: 'none', cursor: 'pointer' }}>
            <span>See Demo</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
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
              gridTemplateColumns: '1fr',
              gap: 0,
              alignItems: 'start',
              textAlign: 'center',
            }}
          >
            {/* Main Content - Centered */}
            <div>
              {/* Outcome Badge */}
              <div
                className={`animate-in ${heroAnim.visible ? 'visible' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#F5F3FF',
                  border: '1px solid #DDD6FE',
                  borderRadius: 32,
                  padding: '10px 20px',
                  marginBottom: 48,
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--primary)',
                }}
              >
                <Mic style={{ width: 14, height: 14 }} />
                Speech-to-Speech AI • PDF Knowledge Base • Real-Time Voice
              </div>

              <h1
                className={`animate-in hero-title ${heroAnim.visible ? 'visible' : ''} animate-delay-1`}
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  lineHeight: 1.2,
                  marginBottom: 24,
                  letterSpacing: '-0.03em',
                  maxWidth: 1000,
                  margin: '0 auto 24px',
                }}
              >
                Turn Your Documents Into
                <span className="gradient-text" style={{ display: 'block', paddingBottom: 4 }}>
                  Conversational Voice Assistants
                </span>
              </h1>

              <p
                className={`animate-in ${heroAnim.visible ? 'visible' : ''} animate-delay-2`}
                style={{
                  fontSize: 18,
                  color: 'var(--slate)',
                  lineHeight: 1.75,
                  marginBottom: 48,
                  maxWidth: 680,
                  margin: '0 auto 48px',
                }}
              >
                Upload PDFs, configure your assistant's persona, and have natural voice conversations with an AI that answers from your documents. Perfect for healthcare, restaurants, education, support, and any knowledge-based interaction.
              </p>

              {/* Trust Row */}
              <div
                className={`animate-in ${heroAnim.visible ? 'visible' : ''} animate-delay-3`}
                style={{ display: 'flex', gap: 32, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}
              >
                {[
                  { Icon: Mic, text: 'Real-Time Voice' },
                  { Icon: Target, text: 'Custom Personas' },
                  { Icon: Lock, text: 'Your Data Only' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500, color: 'var(--slate)' }}>
                    <item.Icon style={{ width: 16, height: 16, color: 'var(--primary)' }} />
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Primary CTAs */}
              <div
                className={`animate-in ${heroAnim.visible ? 'visible' : ''} animate-delay-4`}
                style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <button onClick={scrollToForm} className="btn-primary" style={{ border: 'none', cursor: 'pointer' }}>
                  <span>Try Voice Assistant</span>
                  <ArrowRight style={{ width: 18, height: 18 }} />
                </button>
                <button onClick={scrollToForm} style={{
                  border: '2px solid var(--primary)',
                  background: 'transparent',
                  color: 'var(--primary)',
                  padding: '12px 28px',
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--primary)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                >
                  <span>See How It Works</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Activity Feed - Centered */}
          <div className={`animate-in ${heroAnim.visible ? 'visible' : ''} animate-delay-5`} style={{
            marginTop: 80,
            display: 'flex',
            justifyContent: 'center',
          }}>
            <LiveActivityFeed />
          </div>

          {/* ============ CLIENTS MARQUEE (Section 4) ============ */}
          <div style={{ marginTop: 120, textAlign: 'center' }}>
            <p className="mono" style={{
              fontSize: 11, color: 'var(--slate-light)', letterSpacing: '0.08em', marginBottom: 32,
              fontWeight: 500, textTransform: 'uppercase',
            }}>
              Trusted by teams at
            </p>
            <div
              onMouseEnter={() => setIsMarqueeHovered(true)}
              onMouseLeave={() => setIsMarqueeHovered(false)}
              style={{
                overflow: 'hidden',
                position: 'relative',
                background: 'rgba(59, 130, 246, 0.03)',
                borderRadius: 16,
                padding: '32px 0',
              }}
            >
              <style>{`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .marquee-container {
                  display: flex;
                  gap: 64px;
                  animation: marquee 30s linear infinite;
                  will-change: transform;
                }
                .marquee-container.paused {
                  animation-play-state: paused;
                }
              `}</style>
              <div className={`marquee-container ${isMarqueeHovered ? 'paused' : ''}`}>
                {[...clients, ...clients].map((client, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      cursor: 'pointer',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      style={{
                        height: 40,
                        width: 'auto',
                        maxWidth: 140,
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============ PLACEHOLDER SECTIONS ============ */}
          <ProblemSection />

          <UseCaseTabs scrollToForm={scrollToForm} />

          <HowItWorks />

          <TestimonialSection />

          <ComparisonTable />

          {/* Section 10: Form Section */}
          <div
            ref={formRef}
            style={{ marginTop: 80, padding: '80px 0', borderTop: '1px solid #e2e8f0' }}
          >
            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontSize: 42, fontWeight: 800, marginBottom: 16 }}>
                Try Voice Assistant
              </h2>
              <p style={{ fontSize: 16, color: 'var(--slate)', lineHeight: 1.6 }}>
                Upload your PDFs, configure your assistant, and start talking. No credit card required.
              </p>
            </div>

            <div
              className={`form-card`}
              style={{ maxWidth: 500, margin: '0 auto' }}
            >
              {!isSuccess ? (
                <>
                  <div className="form-header">
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, marginBottom: 6, color: 'var(--white)' }}>
                        Get Started with Voice Assistant
                      </h3>
                      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                        Start creating conversational assistants from your documents.
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
                        gridColumn: '1 / -1',
                      }}>
                        {error}
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, gridColumn: '1 / -1' }}>
                      {[
                        { label: 'FULL NAME', name: 'full_name', type: 'text', placeholder: 'John Smith' },
                        { label: 'JOB TITLE', name: 'job_title', type: 'text', placeholder: 'VP Support' },
                        { label: 'WORK EMAIL', name: 'work_email', type: 'email', placeholder: 'john@company.com', note: 'Work email only (not gmail, yahoo, outlook)' },
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
                          {field.note && (
                            <p style={{ fontSize: 11, color: 'var(--slate)', marginTop: 4, margin: 0 }}>
                              {field.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="lbl" style={{ display: 'block', marginBottom: 6 }}>
                        TARGET USE CASE <span style={{ color: 'var(--danger)' }}>*</span>
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
                        <option value="Field Support">Field Support</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Customer Care">Customer Care</option>
                        <option value="Internal SOP">Internal SOP</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {formData.use_case === 'Other' && (
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label className="lbl" style={{ display: 'block', marginBottom: 6 }}>
                          PLEASE SPECIFY <span style={{ color: 'var(--danger)' }}>*</span>
                        </label>
                        <input
                          className="form-input"
                          type="text"
                          name="other_use_case"
                          value={formData.other_use_case}
                          onChange={handleInputChange}
                          required={formData.use_case === 'Other'}
                          placeholder="Describe your use case..."
                        />
                      </div>
                    )}

                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="lbl" style={{ display: 'block', marginBottom: 6 }}>
                        PHONE <span style={{ color: 'var(--danger)' }}>*</span>
                      </label>
                      <PhoneInputWrapper
                        value={formData.phone}
                        onChange={(phone: string) => setFormData(prev => ({ ...prev, phone }))}
                        required
                      />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="form-submit" style={{ marginTop: 4, gridColumn: '1 / -1' }}>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        {isSubmitting ? (
                          <>
                            <Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} />
                            Sending...
                          </>
                        ) : (
                          <>
                            Start Building Your Assistant
                            <ChevronRight style={{ width: 18, height: 18 }} />
                          </>
                        )}
                      </span>
                    </button>

                    <p style={{ fontSize: 11, color: 'var(--slate)', lineHeight: 1.5, margin: 0, textAlign: 'center', gridColumn: '1 / -1' }}>
                      No spam. Engineer contacts you within 24 hours.
                    </p>
                  </form>
                </>
              ) : (
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  animation: 'fade-in-up 0.5s ease-out',
                }}>
                  <div style={{
                    textAlign: 'center',
                    padding: '16px 0',
                  }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48, height: 48, borderRadius: '50%',
                      background: '#D1FAE5',
                      marginBottom: 12,
                    }}>
                      <CheckCircle2 style={{ width: 24, height: 24, color: 'var(--success)' }} />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px 0' }}>
                      Sandbox Access Unlocked
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--slate)', margin: '0 0 16px 0' }}>
                      Your live demo is ready to view below.
                    </p>
                  </div>

                  <video
                    controls
                    controlsList="nodownload"
                    autoPlay
                    style={{
                      width: '100%',
                      borderRadius: 12,
                      background: '#000',
                      aspectRatio: '16 / 9',
                    }}
                  >
                    <source src="/asset/Voice Agent_New - Trim.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>

          <FaqAccordion scrollToForm={scrollToForm} />
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="site-footer" style={{ padding: '64px 0 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
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
                    VOICE RAG PLATFORM
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 360 }}>
                Turn any document into an interactive voice expert. Zero hallucinations, complete data sovereignty, instant deployment.
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
                <li><a href="#" style={{ cursor: 'pointer' }} onClick={scrollToForm}>View Demo</a></li>
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
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>&copy; 2026 Adople AI. All rights reserved.</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Lock style={{ width: 12, height: 12 }} />
                Zero third-party LLM training. Full data sovereignty.
              </span>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              <a href="#" style={{ color: 'rgba(255,255,255,0.3)' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.3)' }}>Terms of Service</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.3)' }}>Contact Us</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
