import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import useInView from '../hooks/useInView';
import { useTheme } from '../hooks/useTheme';
import Footer from '../components/Footer';
import services from './ServiceData';
import Chatbot from '../Home/Chatbot';
import { useContactModal } from '../context/ContactModalContext';

// ─── HERO ─────────────────────────────────────────────────────────────────────
const HeroSection = ({ service }) => {
  const [visible,  setVisible]  = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.6, y: 0.5 });
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { openModal } = useContactModal();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const fade = (delay) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  // Render headline with blue-gradient word highlighted
  const renderTitle = () =>
    service.heroTitle.map((line, i) => {
      if (line === service.heroTitleBlue) {
        return (
          <span key={i} className="block">
            <span className="text-blue-gradient">{line}</span>
          </span>
        );
      }
      if (line.includes(service.heroTitleBlue)) {
        const parts = line.split(service.heroTitleBlue);
        return (
          <span key={i} className="block">
            {parts[0]}
            <span className="text-blue-gradient">{service.heroTitleBlue}</span>
            {parts[1]}
          </span>
        );
      }
      return <span key={i} className="block">{line}</span>;
    });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'var(--color-primary)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 55% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(61,126,255,0.07) 0%, transparent 70%)`,
          transition: 'background 0.5s ease',
        }}
      />
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-blue-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <div className="order-2 lg:order-1">
            <div
              className="inline-flex items-center px-3.5 py-1.5 rounded-full border text-xs font-body mb-7"
              style={{
                ...fade(0.08),
                border: '1px solid rgba(61,126,255,0.3)',
                background: 'rgba(61,126,255,0.08)',
                color: '#60b4ff',
              }}
            >
              {service.badge}
            </div>

            <h1
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight mb-6"
              style={{ ...fade(0.2), color: 'var(--color-text-heading)' }}
            >
              {renderTitle()}
            </h1>

            <p
              className="font-body text-base sm:text-lg leading-relaxed max-w-md mb-10"
              style={{ ...fade(0.35), color: 'var(--color-muted)' }}
            >
              {service.heroDesc}
            </p>

            {/* CTAs - "Connect with us" opens modal pre-filled for this service */}
            <div style={fade(0.48)} className="flex flex-wrap gap-4">
              <button
                onClick={() => openModal({
                  enquiryType:      'service',
                  preSelectService: service.badge.replace('Service Deep Dive: ', ''),
                  sourcePage:       service.badge,
                })}
                className="inline-flex items-center px-6 py-3.5 bg-blue-accent hover:bg-blue-dark text-always-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_28px_rgba(61,126,255,0.5)] hover:scale-105 active:scale-95"
              >
                Connect with Us
              </button>
              <Link
                to="/case-studies"
                className="inline-flex items-center px-6 py-3.5 rounded-full border text-sm font-display font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  border:     isDark ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(61,126,255,0.3)',
                  color:      'var(--color-text-heading)',
                  background: 'transparent',
                }}
              >
                {service.caseStudyLabel}
              </Link>
            </div>
          </div>

          {/* Right - hero image */}
          <div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            style={{
              opacity:   visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s',
            }}
          >
            <div
              className="relative w-full max-w-[520px] rounded-2xl overflow-hidden"
              style={{
                border:     isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(61,126,255,0.15)',
                boxShadow:  isDark ? '0 24px 80px rgba(0,0,0,0.5)' : '0 24px 60px rgba(61,126,255,0.12)',
              }}
            >
              <img
                src={service.heroImage}
                alt={service.badge}
                className="w-full h-auto object-cover block"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--color-primary), transparent)' }}
      />
    </section>
  );
};

// ─── PILLAR CARD ──────────────────────────────────────────────────────────────
const PillarCard = ({ pillar, index, inView }) => {
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border overflow-hidden flex flex-col"
      style={{
        background:  isDark ? 'rgba(24,28,42,0.85)' : '#ffffff',
        borderColor: hovered
          ? '#3d7eff'
          : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(61,126,255,0.2)',
        boxShadow: hovered
          ? isDark
            ? '0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(61,126,255,0.25)'
            : '0 12px 40px rgba(61,126,255,0.12), 0 0 0 1px rgba(61,126,255,0.25)'
          : isDark ? 'none' : '0 2px 12px rgba(61,126,255,0.07)',
        opacity:   inView ? 1 : 0,
        transform: inView
          ? hovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)'
          : 'translateY(35px)',
        transition: `opacity 0.65s cubic-bezier(.4,0,.2,1) ${0.08 + index * 0.08}s,
                     transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
    >
      <div className="p-6 flex flex-col flex-1">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
          style={{
            background: hovered ? 'rgba(61,126,255,0.2)' : 'rgba(61,126,255,0.12)',
            border:     `1px solid ${hovered ? 'rgba(61,126,255,0.5)' : 'rgba(61,126,255,0.25)'}`,
            color:      '#3d7eff',
          }}
        >
          {pillar.icon}
        </div>
        <h3
          className="font-display font-bold text-lg mb-3 transition-colors duration-300"
          style={{ color: hovered ? '#3d7eff' : 'var(--color-text-heading)' }}
        >
          {pillar.title}
        </h3>
        <p className="font-body text-sm leading-relaxed flex-1" style={{ color: 'var(--color-muted)' }}>
          {pillar.desc}
        </p>
      </div>
      <div
        className="h-0.5 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, transparent, #3d7eff, transparent)',
          opacity: hovered ? 1 : 0,
        }}
      />
    </div>
  );
};

// ─── CORE PILLARS SECTION ─────────────────────────────────────────────────────
const PillarsSection = ({ service }) => {
  const [titleRef, titleInView] = useInView();
  const [gridRef,  gridInView]  = useInView();

  const colClass = service.pillars.length <= 4
    ? 'grid-cols-1 sm:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'var(--color-secondary)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.2), transparent)' }} />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-accent/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-14"
          style={{ opacity: titleInView ? 1 : 0, transform: titleInView ? 'translateY(0)' : 'translateY(28px)', transition: 'all 0.75s ease' }}
        >
          <div className="max-w-lg">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: 'var(--color-text-heading)' }}>
              Core <span className="text-blue-gradient">Service Pillars</span>
            </h2>
            <p className="font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {service.pillarsSubtitle}
            </p>
          </div>
        </div>

        <div ref={gridRef} className={`grid ${colClass} gap-5`}>
          {service.pillars.map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} index={i} inView={gridInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── OPERATIONAL FRAMEWORK ────────────────────────────────────────────────────
// Now reads frameworkSteps from service prop - unique per service
const FrameworkSection = ({ service }) => {
  const [titleRef, titleInView] = useInView();
  const [stepsRef, stepsInView] = useInView();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'var(--color-primary)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.2), transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{ opacity: titleInView ? 1 : 0, transform: titleInView ? 'translateY(0)' : 'translateY(28px)', transition: 'all 0.75s ease' }}
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ color: 'var(--color-text-heading)' }}>
            The Acespire <span className="text-blue-gradient">Operational Framework</span>
          </h2>
          <p className="font-body text-sm sm:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            Our four-pillar approach ensures that digital transformation is not just implemented,
            but integrated into your core business DNA.
          </p>
        </div>

        <div ref={stepsRef} className="relative">
          {/* Desktop connector line */}
          <div
            className="hidden lg:block absolute top-[28px] left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg,
                transparent 6%,
                ${isDark ? 'rgba(61,126,255,0.25)' : 'rgba(61,126,255,0.3)'} 12%,
                ${isDark ? 'rgba(61,126,255,0.25)' : 'rgba(61,126,255,0.3)'} 88%,
                transparent 94%)`,
              opacity: stepsInView ? 1 : 0,
              transition: 'opacity 0.8s ease 0.4s',
            }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {service.frameworkSteps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} inView={stepsInView} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ step, index, inView, isDark }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center text-center"
      style={{
        opacity:   inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(35px)',
        transition: `opacity 0.65s ease ${0.15 + index * 0.15}s, transform 0.65s ease ${0.15 + index * 0.15}s`,
      }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-lg mb-6 relative z-10 transition-all duration-300"
        style={{
          background:  hovered ? '#3d7eff' : isDark ? 'rgba(24,28,42,0.95)' : '#ffffff',
          border:      `2px solid ${hovered ? '#3d7eff' : 'rgba(61,126,255,0.35)'}`,
          color:       hovered ? '#ffffff' : '#3d7eff',
          boxShadow:   hovered ? '0 0 24px rgba(61,126,255,0.5)' : 'none',
          transform:   hovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {step.num}
      </div>
      <h3
        className="font-display font-bold text-base mb-2 transition-colors duration-300"
        style={{ color: hovered ? '#3d7eff' : 'var(--color-text-heading)' }}
      >
        {step.title}
      </h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        {step.desc}
      </p>
    </div>
  );
};

// ─── MEASURABLE BUSINESS IMPACT ───────────────────────────────────────────────
// Now reads impactStats from service prop - unique per service
const ImpactSection = ({ service }) => {
  const [titleRef, titleInView] = useInView();
  const [gridRef,  gridInView]  = useInView();

  return (
    <section className="relative py-24 lg:py-32 bg-secondary overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className="text-center mb-14"
          style={{ opacity: titleInView ? 1 : 0, transform: titleInView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.75s cubic-bezier(.4,0,.2,1)' }}
        >
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: 'var(--color-text-heading)' }}>
            Measurable Business Impact
          </h2>
          <p className="font-body text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            Results that speak for themselves. We focus on ROI-driven transformation.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {service.impactStats.map((stat, i) => (
            <StatCard key={stat.title} stat={stat} index={i} inView={gridInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, index, inView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="light-card relative p-6 rounded-2xl border transition-all duration-300 cursor-default overflow-hidden"
      style={{
        background:  'rgba(24,28,42,0.7)',
        borderColor: hovered ? 'rgba(61,126,255,0.35)' : 'rgba(255,255,255,0.07)',
        boxShadow:   hovered ? '0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(61,126,255,0.15)' : 'none',
        opacity:     inView ? 1 : 0,
        transform:   inView ? (hovered ? 'translateY(-5px)' : 'translateY(0)') : 'translateY(40px)',
        transition:  `opacity 0.65s cubic-bezier(.4,0,.2,1) ${0.1 + index * 0.1}s, transform 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="#3d7eff" strokeWidth="2.5" strokeLinecap="round"
          style={{ transform: stat.dir === 'down' ? 'rotate(180deg)' : 'none' }}
        >
          <polyline points="18 15 12 9 6 15"/>
        </svg>
        <span className="font-display font-extrabold text-3xl" style={{ color: '#3d7eff' }}>
          {stat.value}
        </span>
      </div>
      <h3 className="font-display font-bold text-white text-base mb-2">{stat.title}</h3>
      <p className="text-muted font-body text-sm leading-relaxed">{stat.desc}</p>
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, #3d7eff, transparent)', opacity: hovered ? 1 : 0 }}
      />
    </div>
  );
};

// ─── WHY ACESPIRE ─────────────────────────────────────────────────────────────
// Now reads whyTitle / whyReasons from service prop - unique per service
const WhyAcespireSection = ({ service }) => {
  const [ref, inView] = useInView();

  return (
    <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="dark-section relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-14"
          style={{
            background:  'rgba(12,16,28,0.95)',
            border:      '1px solid rgba(61,126,255,0.2)',
            boxShadow:   '0 0 60px rgba(61,126,255,0.06)',
            opacity:     inView ? 1 : 0,
            transform:   inView ? 'translateY(0)' : 'translateY(40px)',
            transition:  'all 0.85s cubic-bezier(.4,0,.2,1)',
          }}
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-accent/6 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 gap-2 items-center">
            {/* Left - checklist */}
            <div
              style={{
                opacity:   inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-40px)',
                transition: 'all 0.8s cubic-bezier(.4,0,.2,1) 0.2s',
              }}
            >
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-8">
                {service.whyTitle}
              </h2>
              <ul className="space-y-4 mb-8">
                {service.whyReasons.map((r, i) => (
                  <li
                    key={r}
                    className="flex items-center gap-3 text-sm sm:text-base text-white/80 font-body"
                    style={{
                      opacity:   inView ? 1 : 0,
                      transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.6s cubic-bezier(.4,0,.2,1) ${0.35 + i * 0.1}s`,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="#3d7eff" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    {r}
                  </li>
                ))}
              </ul>
              <Link
                to="/case-studies"
                className="group inline-flex items-center gap-2 text-blue-accent hover:text-blue-light text-sm font-display font-semibold transition-all duration-200"
              >
                Explore Our Case Studies
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            {/* Right - dashboard image */}
            <div
              style={{
                opacity:   inView ? 1 : 0,
                transform: inView ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.96)',
                transition: 'all 0.85s cubic-bezier(.4,0,.2,1) 0.3s',
              }}
              className="flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden">
                <img
                  src="/Real-time-dashboard.png"
                  alt="Real-Time Dashboard"
                  className="w-full h-auto object-contain"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── CTA ──────────────────────────────────────────────────────────────────────
// Now reads ctaTitle / ctaSubtitle from service prop - unique per service
const CTASection = ({ service }) => {
  const [ref, inView] = useInView();
  const { openModal } = useContactModal();

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden" style={{ background: 'var(--color-secondary)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="relative rounded-3xl overflow-hidden px-8 py-16 sm:px-14 sm:py-20 text-center dark-section"
          style={{
            background:  'linear-gradient(135deg, #1E3A8A 0%, #1E1B4B 100%)',
            opacity:     inView ? 1 : 0,
            transform:   inView ? 'scale(1)' : 'scale(0.96)',
            transition:  'all 0.85s cubic-bezier(.4,0,.2,1)',
          }}
        >
          <div className="absolute top-[-20%] right-[-5%] w-72 h-72 rounded-full bg-white/5 blur-[70px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-5%] w-64 h-64 rounded-full bg-black/15 blur-[60px] pointer-events-none" />

          <div className="relative z-10">
            <h2
              className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5 max-w-2xl mx-auto"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.75s ease 0.2s' }}
            >
              {service.ctaTitle}
            </h2>
            <p
              className="font-body text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.7)', opacity: inView ? 1 : 0, transition: 'all 0.75s ease 0.35s' }}
            >
              {service.ctaSubtitle}
            </p>
            <div
              className="flex flex-wrap items-center justify-center gap-4"
              style={{ opacity: inView ? 1 : 0, transition: 'all 0.75s ease 0.5s' }}
            >
              <button
                onClick={() => openModal({
                  enquiryType:      'service',
                  preSelectService: service.badge.replace('Service Deep Dive: ', ''),
                  sourcePage:       `${service.badge} - CTA`,
                })}
                className="inline-flex items-center px-8 py-3.5 bg-white hover:bg-gray-50 text-[#1E3A8A] text-sm font-display font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] active:scale-95"
              >
                Book a Consultation
              </button>
              <Link
                to="/case-studies"
                className="inline-flex items-center px-8 py-3.5 bg-black/35 hover:bg-black/50 text-white text-sm font-display font-bold rounded-full border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Explore Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── PAGE ASSEMBLY ─────────────────────────────────────────────────────────────
const ServiceTemplate = () => {
  const { serviceId } = useParams();
  const service = services.find((s) => s.id === serviceId);
  const glowRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const move = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top  = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [serviceId]);

  if (!service) return <Navigate to="/" replace />;

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-primary)' }}>
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full"
        style={{
          background:  'radial-gradient(circle, rgba(61,126,255,0.04) 0%, transparent 70%)',
          transform:   'translate(-50%, -50%)',
          transition:  'left 0.18s ease-out, top 0.18s ease-out',
        }}
      />
      <HeroSection      service={service} />
      <PillarsSection   service={service} />
      <FrameworkSection service={service} />
      <ImpactSection    service={service} />
      <WhyAcespireSection service={service} />
      <CTASection       service={service} />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ServiceTemplate;