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
  User,
  Mail,
  Briefcase,
  Building2,
  Sparkles,
  ShieldCheck,
  FileCheck,
  Headset,
  RotateCcw,
} from 'lucide-react';
import ProblemSection from './components/ProblemSection';
import UseCaseTabs from './components/UseCaseTabs';
import HowItWorks from './components/HowItWorks';
import TestimonialSection from './components/TestimonialSection';
import ComparisonTable from './components/ComparisonTable';
import FaqAccordion from './components/FaqAccordion';
import StickyCtaButton from './components/StickyCtaButton';
import LiveActivityFeed from './components/LiveActivityFeed';
import LoadingScreen from './components/LoadingScreen';
import useScrollReveal from './hooks/useScrollReveal';

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
      className="phone-input-container"
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
          background: 'rgba(45, 155, 111, 0.05)',
          border: 'none',
          borderRight: '1.5px solid var(--border)',
          fontFamily: 'inherit',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--ink)',
          cursor: 'pointer',
          borderRadius: '9px 0 0 9px',
          transition: 'background 0.2s',
          minWidth: '105px',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(45, 155, 111, 0.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(45, 155, 111, 0.05)')}
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
            border: '1px solid #2D9B6F',
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
                border: '2px solid #2D9B6F',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(45, 155, 111, 0.15)',
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const [showLockNotice, setShowLockNotice] = useState(false);
  const [isFormHighlighted, setIsFormHighlighted] = useState(false);

  const handleLockedVideoClick = () => {
    if (!isSuccess) {
      setShowLockNotice(true);
      setIsFormHighlighted(true);
      fullNameInputRef.current?.focus();
      setTimeout(() => {
        setIsFormHighlighted(false);
      }, 1500);
      setTimeout(() => {
        setShowLockNotice(false);
      }, 3500);
    }
  };

  useEffect(() => {
    if (isSuccess && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay prevented, ready for user interaction:', err);
      });
    }
  }, [isSuccess]);

  const handleRestartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleResetForm = () => {
    setIsSuccess(false);
    setFormData({
      full_name: '',
      work_email: '',
      job_title: '',
      company_name: '',
      use_case: '',
      other_use_case: '',
      phone: ''
    });
    setError('');
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowStickyCta(window.scrollY > 800);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroAnim = useScrollReveal();
  const marqueeAnim = useScrollReveal();
  const formSectionAnim = useScrollReveal();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
      <LoadingScreen />
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
              <div style={{ fontWeight: 800, fontSize: 17, color: '#0f172a' }}>Adople AI</div>
              <div className="mono" style={{ fontSize: 8, color: 'var(--slate)', letterSpacing: '0.08em' }}>
                VOICE RAG PLATFORM
              </div>
            </div>
          </div>

          <nav className="header-nav">
            <a href="#features" style={{
              textDecoration: 'none', fontSize: 14, fontWeight: 500, color: 'var(--slate)',
              transition: 'color 0.2s',
              cursor: 'pointer'
            }} onClick={(e) => scrollToAnchor(e, 'features')}>Features</a>
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
              gap: 60,
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Main Content - Left */}
            <div className="hero-content">
              {/* Outcome Badge */}
              <div
                className={`animate-in ${heroAnim.visible ? 'visible' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#F0FDF9',
                  border: '1px solid #A7F3D0',
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
                }}
              >
                Turn Your Documents Into
                <span className="gradient-text" style={{ display: 'block', paddingBottom: 4 }}>
                  Conversational Voice Assistants
                </span>
              </h1>

              <p
                className={`animate-in hero-description ${heroAnim.visible ? 'visible' : ''} animate-delay-2`}
                style={{
                  fontSize: 18,
                  color: 'var(--slate)',
                  lineHeight: 1.75,
                  marginBottom: 48,
                  maxWidth: 600,
                }}
              >
                Upload PDFs, configure your assistant's persona, and have natural voice conversations with an AI that answers from your documents. Perfect for healthcare, restaurants, education, support, and any knowledge-based interaction.
              </p>

            </div>

            {/* Live Activity Feed - Right Side */}
            <div className={`animate-in ${heroAnim.visible ? 'visible' : ''} animate-delay-5`} id="hero-activity-feed">
              <LiveActivityFeed />
            </div>
          </div>

          {/* Primary CTAs - Centered Across Full Hero */}
          <div
            className={`hero-cta-row animate-in ${heroAnim.visible ? 'visible' : ''} animate-delay-3`}
            style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40, marginTop: 40 }}
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

          {/* Trust Row - Centered Across Full Hero */}
          <div
            className={`animate-in ${heroAnim.visible ? 'visible' : ''} animate-delay-4`}
            style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}
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

          {/* ============ CLIENTS MARQUEE (Section 4) ============ */}
          <div ref={marqueeAnim.ref} style={{ marginTop: 120, textAlign: 'center' }}>
            <p className={`mono animate-in ${marqueeAnim.visible ? 'visible' : ''}`} style={{
              fontSize: 11, color: 'var(--slate-light)', letterSpacing: '0.08em', marginBottom: 32,
              fontWeight: 500, textTransform: 'uppercase',
            }}>
              Trusted by teams at
            </p>
            <div
              className={`animate-in ${marqueeAnim.visible ? 'visible' : ''} animate-delay-1`}
              onMouseEnter={() => setIsMarqueeHovered(true)}
              onMouseLeave={() => setIsMarqueeHovered(false)}
              style={{
                overflow: 'hidden',
                position: 'relative',
                background: 'rgba(45, 155, 111, 0.03)',
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
            ref={(el) => {
              (formRef as any).current = el;
              (formSectionAnim.ref as any).current = el;
            }}
            id="demo"
            className="demo-section-container"
            style={{ marginTop: 32, padding: '40px 0 90px', borderTop: '1px solid #e2e8f0', position: 'relative' }}
          >
            <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center', marginBottom: 48, position: 'relative', zIndex: 1 }}>
              <div
                className={`animate-in ${formSectionAnim.visible ? 'visible' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 16px',
                  borderRadius: 24,
                  background: 'rgba(45, 155, 111, 0.08)',
                  border: '1px solid rgba(45, 155, 111, 0.2)',
                  marginBottom: 16,
                  color: 'var(--primary)',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                <Sparkles style={{ width: 14, height: 14 }} />
                <span>FAST 60-SECOND ONBOARDING • NO CREDIT CARD REQUIRED</span>
              </div>
              <h2
                className={`animate-in ${formSectionAnim.visible ? 'visible' : ''}`}
                style={{ fontSize: 44, fontWeight: 800, marginBottom: 16, color: 'var(--ink)' }}
              >
                Try Voice Assistant
              </h2>
              <p
                className={`animate-in ${formSectionAnim.visible ? 'visible' : ''} animate-delay-1`}
                style={{ fontSize: 17, color: 'var(--slate)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto' }}
              >
                Upload your PDFs, configure your assistant, and start talking. No credit card required.
              </p>
            </div>

            <div className="demo-split-grid" style={{ position: 'relative', zIndex: 2 }}>
              {/* Left Side: Video Playcard (Matches Screenshot) */}
              <div className={`demo-video-card animate-in ${formSectionAnim.visible ? 'visible' : ''} animate-delay-2`}>
                <div
                  className={`video-media-wrapper ${!isSuccess ? 'is-locked' : 'is-unlocked'}`}
                  onClick={!isSuccess ? handleLockedVideoClick : undefined}
                >
                  {/* Top-Left Badge */}
                  <div className="platform-demo-badge">
                    {isSuccess ? (
                      <>
                        <span className="live-pulse-dot" />
                        <span>Interactive Demo</span>
                      </>
                    ) : (
                      <span>Platform Demo</span>
                    )}
                  </div>

                  {isSuccess ? (
                    <video
                      ref={videoRef}
                      controls
                      autoPlay
                      playsInline
                      controlsList="nodownload"
                      className="demo-active-video"
                    >
                      <source src="/asset/Voice Agent_New - Trim.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="video-poster-container">
                      <img
                        src="/demo-poster.jpg"
                        alt="Voice Assistant Platform Demo"
                        className="video-poster-img"
                      />
                      <div className="video-poster-overlay" />

                      {/* Center Play Button (Teal circle matching screenshot) */}
                      <button
                        type="button"
                        className="demo-center-play-btn"
                        aria-label="Play Demo Video"
                        onClick={handleLockedVideoClick}
                      >
                        <div className="demo-play-btn-pulse" />
                        <svg
                          className="demo-play-icon"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>

                      {/* Locked Feedback Popover */}
                      {showLockNotice && (
                        <div className="video-lock-popover">
                          <Lock style={{ width: 14, height: 14, color: '#00B4D8' }} />
                          <span>Fill out the form to unlock this video!</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Subtext under video frame */}
                <div className="video-card-caption">
                  {!isSuccess ? (
                    <p>
                      Unlock to see how Adople AI Voice Assistant engages users, analyzes documents, and answers questions in real-time.
                    </p>
                  ) : (
                    <p className="caption-unlocked">
                      <CheckCircle2 style={{ width: 16, height: 16, color: '#10b981', flexShrink: 0 }} />
                      <span>Demo Unlocked — Adople AI Voice Assistant live document intelligence walkthrough.</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Right Side: Watch a Demo Form Card (Matches Screenshot) */}
              {!isSuccess ? (
                <div className={`demo-watch-card ${isFormHighlighted ? 'highlight-pulse' : ''} animate-in ${formSectionAnim.visible ? 'visible' : ''} animate-delay-3`}>
                  <div>
                    <div className="demo-watch-header">
                      <h3 className="demo-watch-title">Watch a Demo</h3>
                      <p className="demo-watch-subtitle">
                        Enter your details below to access the interactive Voice Assistant product demo.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {error && (
                        <div style={{
                          background: '#fee2e2',
                          border: '1px solid #fecaca',
                          color: '#991b1b',
                          fontSize: 13,
                          padding: 12,
                          borderRadius: 9,
                        }}>
                          {error}
                        </div>
                      )}

                      <div className="demo-watch-grid">
                        {/* Row 1: Full Name & Work Email */}
                        <div>
                          <input
                            ref={fullNameInputRef}
                            className="demo-clean-input"
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            required
                            placeholder="Full Name *"
                            aria-label="Full Name"
                          />
                        </div>

                        <div>
                          <input
                            className="demo-clean-input"
                            type="email"
                            name="work_email"
                            value={formData.work_email}
                            onChange={handleInputChange}
                            required
                            placeholder="Work Email *"
                            aria-label="Work Email"
                          />
                        </div>

                        {/* Row 2: Job Title & Company Name */}
                        <div>
                          <input
                            className="demo-clean-input"
                            type="text"
                            name="job_title"
                            value={formData.job_title}
                            onChange={handleInputChange}
                            required
                            placeholder="Job Title *"
                            aria-label="Job Title"
                          />
                        </div>

                        <div>
                          <input
                            className="demo-clean-input"
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleInputChange}
                            required
                            placeholder="Company Name *"
                            aria-label="Company Name"
                          />
                        </div>

                        {/* Row 3: Target Use Case & Phone */}
                        <div style={{ position: 'relative' }}>
                          <select
                            className="demo-clean-input"
                            name="use_case"
                            value={formData.use_case}
                            onChange={handleInputChange}
                            required
                            aria-label="Target Use Case"
                            style={{
                              cursor: 'pointer',
                              color: formData.use_case ? '#0f172a' : '#94a3b8',
                              appearance: 'none',
                              paddingRight: 32,
                            }}
                          >
                            <option value="" disabled>Target Use Case *</option>
                            <option value="Field Support" style={{ color: '#0f172a' }}>Field Support</option>
                            <option value="Healthcare" style={{ color: '#0f172a' }}>Healthcare</option>
                            <option value="Customer Care" style={{ color: '#0f172a' }}>Customer Care</option>
                            <option value="Internal SOP" style={{ color: '#0f172a' }}>Internal SOP</option>
                            <option value="Other" style={{ color: '#0f172a' }}>Other</option>
                          </select>
                          <ChevronDown
                            style={{
                              position: 'absolute',
                              right: 12,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: 14,
                              height: 14,
                              color: '#94a3b8',
                              pointerEvents: 'none',
                            }}
                          />
                        </div>

                        <div>
                          <PhoneInputWrapper
                            value={formData.phone}
                            onChange={(phone: string) => setFormData(prev => ({ ...prev, phone }))}
                            required
                          />
                        </div>
                      </div>

                      {formData.use_case === 'Other' && (
                        <div>
                          <input
                            className="demo-clean-input"
                            type="text"
                            name="other_use_case"
                            value={formData.other_use_case}
                            onChange={handleInputChange}
                            required={formData.use_case === 'Other'}
                            placeholder="Please specify your use case *"
                            aria-label="Please specify your use case"
                          />
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="demo-cta-submit-btn"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} />
                            <span>Unlocking Demo...</span>
                          </>
                        ) : (
                          <span>Watch a Demo</span>
                        )}
                      </button>

                      <div className="demo-security-note">
                        <Lock style={{ width: 12, height: 12, color: '#009E90' }} />
                        <span>No spam. No obligation</span>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className={`demo-watch-card animate-in ${formSectionAnim.visible ? 'visible' : ''} animate-delay-3`}>
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', textAlign: 'center', padding: '16px 8px' }}>
                    <div style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      boxShadow: '0 4px 16px rgba(16, 185, 129, 0.25)',
                    }}>
                      <CheckCircle2 style={{ width: 30, height: 30, color: '#10b981' }} />
                    </div>

                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>
                      Demo Access Unlocked!
                    </h3>
                    <p style={{ fontSize: 13.5, color: '#64748b', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                      Your interactive product demo is currently playing on the left.
                    </p>

                    <div style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 12,
                      padding: '14px 18px',
                      textAlign: 'left',
                      marginBottom: 20,
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#009E90', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                        Subscriber Details
                      </div>
                      <div style={{ fontSize: 13, color: '#1e293b', marginBottom: 4 }}>
                        <strong>Name:</strong> {formData.full_name || 'Demo User'}
                      </div>
                      <div style={{ fontSize: 13, color: '#1e293b', marginBottom: 4 }}>
                        <strong>Email:</strong> {formData.work_email}
                      </div>
                      {formData.company_name && (
                        <div style={{ fontSize: 13, color: '#1e293b' }}>
                          <strong>Company:</strong> {formData.company_name}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={handleRestartVideo}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '10px 18px',
                          background: '#009E90',
                          color: '#ffffff',
                          borderRadius: 8,
                          border: 'none',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <RotateCcw style={{ width: 14, height: 14 }} />
                        <span>Restart Video</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetForm}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '10px 18px',
                          background: '#f1f5f9',
                          color: '#475569',
                          borderRadius: 8,
                          border: '1px solid #cbd5e1',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span>Submit Another Request</span>
                      </button>
                    </div>

                    <div className="demo-security-note" style={{ marginTop: 22 }}>
                      <Lock style={{ width: 12, height: 12, color: '#009E90' }} />
                      <span>A voice solutions engineer will contact you within 24 hours.</span>
                    </div>
                  </div>
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
          <div className="footer-grid" style={{ marginBottom: 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <img src="/logo.webp" alt="Adople AI" style={{ height: 36, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--white)', fontSize: 18 }}>Adople AI</div>
                  <div className="mono" style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em' }}>
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
                color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontWeight: 600,
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
                color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontWeight: 600,
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
            color: 'rgba(255,255,255,0.6)',
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
              <a href="#" style={{ color: 'rgba(255,255,255,0.6)' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.6)' }}>Terms of Service</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.6)' }}>Contact Us</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
