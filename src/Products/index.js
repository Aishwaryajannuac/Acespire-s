import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import Footer from '../components/Footer';
import { useTheme } from '../hooks/useTheme';
import Chatbot from '../Home/Chatbot';
import { useContactModal } from '../context/ContactModalContext';


// ─── HERO ─────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);

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
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const fade = (delay, dir = 'up') => ({
    opacity:   visible ? 1 : 0,
    transform: visible
      ? 'translate(0,0)'
      : dir === 'left' ? 'translateX(-40px)' : dir === 'right' ? 'translateX(40px)' : 'translateY(28px)',
    transition: `opacity 0.75s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.75s cubic-bezier(.4,0,.2,1) ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Mouse-follow ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 55% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(61,126,255,0.07) 0%, transparent 70%)`,
          transition: 'background 0.5s ease',
        }}
      />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-blue-accent/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-dark/6 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">

          {/* ── Left ── */}
          <div>
            {/* Badges */}
            <div style={fade(0.08)} className="flex flex-wrap gap-2 mb-6">
              {['Flagship Product', 'EU Compliant'].map((b) => (
                <span
                  key={b}
                  className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs text-muted font-body tracking-wide"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Provinyx brand - image from public */}
            <div style={fade(0.18)} className="flex items-center gap-2 mb-5">
              <img
                src="/Provinyx-logo.png"
                alt="Provinyx"
                className="h-6 w-auto object-contain"
                draggable={false}
              />
            </div>

            {/* Headline */}
            <h1
  style={fade(0.28)}
  className="font-display font-extrabold text-4xl sm:text-5xl lg:text-5xl leading-[1.05] tracking-tight mb-5"
>
  <span className="text-white block">
    Acespire’s{/* <span className="inline-block w-2 h-2 bg-white rounded-full align-bottom"></span> */}
  </span>

  <span className="text-blue-gradient block">Digital product passport
    {/* <span className="inline-block w-2 h-2 bg-[#558BF6] rounded-full ml-1 align-Bottom"></span> */}
  </span>
</h1>

            {/* Description */}
            <p
              style={fade(0.4)}
              className="text-muted font-body text-base sm:text-lg leading-relaxed max-w-md mb-10"
            >
              Pioneering advanced digital product passports that define the future of authenticity. Your unified platform for complete product journey transparency.
            </p>

            {/* CTAs */}
            <div style={fade(0.52)} className="flex flex-wrap items-center gap-4">
              <Link
                to="https://provinyx.com/"
                className="inline-flex items-center px-7 py-3.5 bg-blue-accent hover:bg-blue-dark text-always-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(61,126,255,0.55)] hover:scale-105 active:scale-95"
              >
               Visit Website
              </Link>
              <Link
                to="/case-studies"
                className="group inline-flex items-center gap-2 text-white/75 hover:text-white text-sm font-body transition-all duration-200"
              >
                View Case Study
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Right - Provinyx-core.png from public ── */}
          <div
            style={fade(0.45, 'right')}
            className="flex items-center justify-center lg:justify-end"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                // border: '1px solid rgba(255,255,255,0.08)',
                // boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(61,126,255,0.1)',
              }}
            >
              <img
                src="/provinyx-core.png"
                alt="Provinyx Core"
                width={472}
                height={472}
                className="block w-full max-w-[472px] h-auto lg:w-[472px] lg:h-[472px] object-cover"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
    </section>
  );
};

// ─── BUILT FOR LEGACY ─────────────────────────────────────────────────────────
const steps = [
  {
    num: '01', title: 'Collect & Record',
    desc: 'Product data is captured at every lifecycle stage and stored as cryptographic hashes on the blockchain.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#3d7eff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
  },
  {
    num: '02', title: 'Assign Digital Identity',
    desc: 'Every product and supply chain actor receives a unique cryptographic identity for tamper-proof verification.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#3d7eff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    num: '03', title: 'Update in Real Time ',
    desc: 'The Digital Product Passport updates continuously as the product moves through its lifecycle.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#3d7eff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    num: '04', title: 'Analyse & Report',
    desc: 'AI transforms raw DPP data into automated compliance reports, flags, and predictive insights.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#3d7eff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
];

const LegacySection = () => {
  const [leftRef,  leftInView]  = useInView();
  const [rightRef, rightInView] = useInView();

  return (
    <section className="relative py-24 lg:py-32 bg-secondary overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-accent/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-accent/20 to-transparent" />
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-accent/4 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left ── */}
          <div
            ref={leftRef}
            style={{
              opacity:   leftInView ? 1 : 0,
              transform: leftInView ? 'translateX(0)' : 'translateX(-50px)',
              transition: 'all 0.8s cubic-bezier(.4,0,.2,1)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <img
                src="/Provinyx-logo.png"
                alt="Provinyx"
                className="h-6 w-auto object-contain"
                // draggable={false}
              />
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-5">
              Where Every Product Tells Its True Story
            </h2>
            <p className="text-muted font-body text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
             Provinyx is a blockchain-driven platform that assigns a unique digital identity to every product, ensuring authenticity from factory to consumer.
            </p>
            <ul className="space-y-3.5">
              {['Blockchain Security', 'QR-Based Tracking', 'EU DPP Compliant'].map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-body text-white/80"
                  style={{
                    opacity:   leftInView ? 1 : 0,
                    transform: leftInView ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s ease ${0.4 + i * 0.1}s`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            {/* <Link
                to="https://provinyx.com/"
                className="inline-flex items-center mt-8 px-7 py-3.5 bg-blue-accent hover:bg-blue-dark text-always-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(61,126,255,0.55)] hover:scale-105 active:scale-95"
              >
               Visit Website
              </Link> */}
              <Link
                to="https://provinyx.com/"
                className="group inline-flex mt-8 items-center gap-2 text-white/75 hover:text-white text-sm font-body transition-all duration-200"
              >
                View Website
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                </Link>
          </div>

          {/* ── Right - 2×2 steps, exact reference UI ── */}
          {/* Each step: circle icon | STEP label | title | desc - NO card box */}
          <div ref={rightRef} className="grid grid-cols-2 gap-x-10 gap-y-10">
            {steps.map((s, i) => (
              <div
                key={s.num}
                style={{
                  opacity:   rightInView ? 1 : 0,
                  transform: rightInView ? 'translateY(0)' : 'translateY(35px)',
                  transition: `opacity 0.65s cubic-bezier(.4,0,.2,1) ${0.1 + i * 0.1}s, transform 0.65s cubic-bezier(.4,0,.2,1) ${0.1 + i * 0.1}s`,
                }}
              >
                {/* Circle icon - matches reference */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background: 'rgba(61,126,255,0.1)',
                    border: '1px solid rgba(61,126,255,0.3)',
                  }}
                >
                  {s.icon}
                </div>

                {/* STEP label */}
                <p className="text-blue-accent font-display font-bold text-xs tracking-[0.15em] mb-1.5">
                  STEP {s.num}
                </p>

                {/* Title */}
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-muted font-body text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── AGENTIC AI SUITE ─────────────────────────────────────────────────────────
const agentProducts = [
  {
    id: 'hireon',
    title: 'HireOn AI',
    desc: 'Redefines recruitment through autonomous intelligence, deep-skill mapping, and cultural fit analysis to hire the right talent.',
    href: '/products/hireon',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    watermarkIcon: (
      <svg viewBox="0 0 100 100" width="90" height="90" fill="none">
        <circle cx="50" cy="32" r="20" fill="currentColor"/>
        <path d="M8 95 Q8 62 50 62 Q92 62 92 95Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'digimark',
    title: 'DigiMark AI',
    desc: 'DigiMark AI autonomously creates, schedules, and publishes brand-aligned content across every major social platform.',
    href: '/products/digimark',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    watermarkIcon: (
      <svg viewBox="0 0 100 100" width="90" height="90" fill="none">
        <polyline points="8,85 38,42 62,58 92,12" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="76,12 92,12 92,28" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'nextlead',
    title: 'NexLead AI',
    desc: 'Autonomous lead scoring, hyper-personalized outreach, and predictive closing - all in one intelligent platform.',
    href: '/products/nextlead',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    watermarkIcon: (
      <svg viewBox="0 0 100 100" width="90" height="90" fill="none">
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="5"/>
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="5"/>
        <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="5"/>
        <circle cx="50" cy="50" r="5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'meeting-manager',
    title: 'Meeting Manager',
    desc: 'Meeting Intelligence autonomously captures key decisions, generates summaries, and assigns follow-up tasks in real time.',
    href: '/products/meeting-manager',
    icon: (
      /* Bot icon */
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="11" width="18" height="10" rx="2"/>
        <circle cx="12" cy="5" r="2"/>
        <path d="M12 7v4"/>
        <line x1="8" y1="16" x2="8" y2="16"/>
        <line x1="12" y1="16" x2="12" y2="16"/>
        <line x1="16" y1="16" x2="16" y2="16"/>
      </svg>
    ),
    watermarkIcon: (
      /* Bot watermark */
      <svg viewBox="0 0 100 100" width="90" height="90" fill="none">
        <rect x="12" y="42" width="76" height="48" rx="10" stroke="currentColor" strokeWidth="5"/>
        <circle cx="50" cy="22" r="10" stroke="currentColor" strokeWidth="5"/>
        <line x1="50" y1="32" x2="50" y2="42" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="32" cy="66" r="6" fill="currentColor"/>
        <circle cx="50" cy="66" r="6" fill="currentColor"/>
        <circle cx="68" cy="66" r="6" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'invoice-agent',
    title: 'Invoice Agent',
    desc: 'Our Invoice Agent autonomously extracts, validates, and reconciles invoices across your entire financial ecosystem.',
    href: '/products/invoice-processing-agent',
    icon: (
      /* Invoice / receipt icon */
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 00-2 2v16l3-2 2 2 2-2 2 2 2-2 3 2V4a2 2 0 00-2-2z"/>
        <line x1="9" y1="9" x2="15" y2="9"/>
        <line x1="9" y1="13" x2="15" y2="13"/>
        <line x1="9" y1="17" x2="12" y2="17"/>
      </svg>
    ),
    watermarkIcon: (
      /* Invoice watermark */
      <svg viewBox="0 0 100 100" width="90" height="90" fill="none">
        <path d="M65 5H20a8 8 0 00-8 8v74l12-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8V13a8 8 0 00-8-8z" stroke="currentColor" strokeWidth="5"/>
        <line x1="32" y1="32" x2="68" y2="32" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <line x1="32" y1="48" x2="68" y2="48" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
        <line x1="32" y1="64" x2="52" y2="64" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// ─── CARD ─────────────────────────────────────────────────────────────────────

// ─── CARD - replace existing AgentCard ───────────────────────────────────────
const AgentCard = ({
  product, isAutoActive, inView, index,
  onClick, delay,
  hoveredIdx, onHoverEnter, onHoverLeave,   // ← new props
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { openModal } = useContactModal();

  const isHovered   = hoveredIdx === index;
  const isShrunk    = hoveredIdx !== null && hoveredIdx !== index;
  const isBlue      = isHovered;

  // Three-state transform: enlarged | normal | shrunk
  const getTransform = () => {
    if (!inView) return 'translateY(30px) scale(1)';
    if (isHovered) return 'translateY(-10px) scale(1.10)';
    if (isShrunk)  return 'translateY(4px)  scale(0.90)';
    return 'translateY(0) scale(1)';
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}
      className="relative rounded-2xl border overflow-hidden flex flex-col cursor-pointer"
      style={{
        background: isBlue
          ? 'linear-gradient(145deg, #2d52d4 0%, #3d7eff 60%, #5a8fff 100%)'
          : isDark ? 'rgba(24,28,42,0.9)' : '#ffffff',
        borderColor: isBlue
          ? 'transparent'
          : isAutoActive
            ? '#3d7eff'
            : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.2)',
        boxShadow: isBlue
          ? '0 20px 56px rgba(61,126,255,0.60)'
          : isAutoActive
            ? '0 0 0 2px #3d7eff, 0 6px 24px rgba(61,126,255,0.18)'
            : isDark ? 'none' : '0 2px 12px rgba(61,126,255,0.07)',
        opacity:    inView ? 1 : 0,
        transform:  getTransform(),
        // Slower enlarge, snappier return - both clearly perceptible
        transition: `
          opacity    0.6s cubic-bezier(.4,0,.2,1) ${delay ?? (0.08 + index * 0.07)}s,
          transform  0.38s cubic-bezier(.34,1.28,.64,1),
          background 0.28s ease,
          border-color 0.28s ease,
          box-shadow 0.28s ease
        `,
        // Ensure enlarged card renders on top
        zIndex: isHovered ? 10 : 1,
      }}
    >
      {/* Watermark */}
      <div
        className="absolute top-2 right-2 pointer-events-none select-none"
        style={{
          color: isBlue
            ? 'rgba(255,255,255,0.15)'
            : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(61,126,255,0.07)',
        }}
      >
        {product.watermarkIcon}
      </div>

      <div className="relative p-5 flex flex-col flex-1">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
          style={{
            background: isBlue ? 'rgba(255,255,255,0.2)' : 'rgba(61,126,255,0.12)',
            border:     `1px solid ${isBlue ? 'rgba(255,255,255,0.3)' : 'rgba(61,126,255,0.25)'}`,
            color:      isBlue ? '#ffffff' : '#3d7eff',
            transition: 'all 0.28s ease',
          }}
        >
          {product.icon}
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-base mb-2 leading-snug"
          style={{
            color:      isBlue ? '#ffffff' : 'var(--color-text-heading)',
            transition: 'color 0.28s ease',
          }}
        >
          {product.title}
        </h3>

        {/* Desc */}
        <p
          className="font-body text-xs leading-relaxed flex-1 mb-4"
          style={{
            color:      isBlue ? 'rgba(255,255,255,0.82)' : 'var(--color-muted)',
            transition: 'color 0.28s ease',
          }}
        >
          {product.desc}
        </p>

        {/* Buttons */}
        <div
          className="flex flex-wrap gap-1.5 pt-3"
          style={{
            borderTop: `1px solid ${
              isBlue
                ? 'rgba(255,255,255,0.18)'
                : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(61,126,255,0.12)'
            }`,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal({ enquiryType: 'products' });
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-body hover:opacity-80 transition-opacity"
            style={{
              background: isBlue ? 'rgba(255,255,255,0.15)' : 'transparent',
              border:     `1px solid ${isBlue ? 'rgba(255,255,255,0.3)' : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(61,126,255,0.25)'}`,
              color:      isBlue ? '#ffffff' : 'var(--color-muted)',
            }}
          >
            Request Demo
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <Link
            to={product.href}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-display font-bold hover:opacity-90 transition-opacity"
            style={{
              background: isBlue ? '#ffffff' : '#3d7eff',
              color:      isBlue ? '#2d52d4' : '#ffffff',
            }}
          >
            Learn More
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
// ─── MOBILE CARD (simplified, no hover issues on touch) ───────────────────────
const MobileAgentCard = ({ product, isCenter, isDark, onClick }) => {

  const { openModal } = useContactModal();

  return (
    <div
      className="shrink-0 rounded-2xl border overflow-hidden flex flex-col cursor-pointer"
      onClick={onClick}
      style={{
        width: '68vw',
        minHeight: 260,
        scrollSnapAlign: 'center',
        background: isCenter
          ? 'linear-gradient(145deg, #2d52d4 0%, #3d7eff 60%, #5a8fff 100%)'
          : isDark
          ? 'rgba(24,28,42,0.9)'
          : '#ffffff',
        borderColor: isCenter
          ? 'transparent'
          : isDark
          ? 'rgba(255,255,255,0.08)'
          : 'rgba(61,126,255,0.2)',
        boxShadow: isCenter
          ? '0 8px 32px rgba(61,126,255,0.45)'
          : 'none',
        opacity: isCenter ? 1 : 0.55,
        transform: isCenter ? 'scale(1)' : 'scale(0.92)',
        transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <div className="relative p-5 flex flex-col flex-1">

        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{
            background: isCenter
              ? 'rgba(255,255,255,0.2)'
              : 'rgba(61,126,255,0.12)',
            border: `1px solid ${
              isCenter
                ? 'rgba(255,255,255,0.3)'
                : 'rgba(61,126,255,0.25)'
            }`,
            color: isCenter ? '#ffffff' : '#3d7eff',
          }}
        >
          {product.icon}
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-sm mb-2"
          style={{
            color: isCenter
              ? '#ffffff'
              : 'var(--color-text-heading)',
          }}
        >
          {product.title}
        </h3>

        {/* Description */}
        <p
          className="font-body text-xs leading-relaxed flex-1 mb-4"
          style={{
            color: isCenter
              ? 'rgba(255,255,255,0.8)'
              : 'var(--color-muted)',
          }}
        >
          {product.desc}
        </p>

        {/* Footer Buttons */}
        <div
          className="flex flex-wrap gap-1.5 pt-3"
          style={{
            borderTop: `1px solid ${
              isCenter
                ? 'rgba(255,255,255,0.18)'
                : 'rgba(61,126,255,0.12)'
            }`,
          }}
        >

          {/* Request Demo Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal({ enquiryType: 'products' });
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-body hover:opacity-80 transition-opacity"
            style={{
              background: isCenter
                ? 'rgba(255,255,255,0.15)'
                : 'transparent',
              border: `1px solid ${
                isCenter
                  ? 'rgba(255,255,255,0.3)'
                  : 'rgba(61,126,255,0.25)'
              }`,
              color: isCenter
                ? '#ffffff'
                : 'var(--color-muted)',
            }}
          >
            Request Demo

            <svg
              width="9"
              height="9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Learn More */}
          <Link
            to={product.href}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-display font-bold"
            style={{
              background: isCenter ? '#ffffff' : '#3d7eff',
              color: isCenter ? '#2d52d4' : '#ffffff',
            }}
          >
            Learn More

            <svg
              width="9"
              height="9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

        </div>
      </div>
    </div>
  );
};

// ─── AGENTIC SUITE SECTION ─────────────────────────────────────────────────────
// ─── AGENTIC SUITE SECTION - replace existing AgenticSuiteSection ─────────────
const AgenticSuiteSection = () => {
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);   // ← new
  const [titleRef,   titleInView]   = useInView();
  const [inViewRef,  inView]        = useInView();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mobileScrollRef = useRef(null);

  // Pause auto-rotate while a card is hovered
  useEffect(() => {
    if (hoveredIdx !== null) return;
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % agentProducts.length);
    }, 3000);
    return () => clearInterval(t);
  }, [hoveredIdx]);

  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const vw      = window.innerWidth;
    const cardW   = vw * 0.68;
    const gap     = vw * 0.04;
    const padLeft = vw * 0.16;
    const cardCenter = padLeft + activeIdx * (cardW + gap) + cardW / 2;
    el.scrollTo({ left: cardCenter - vw / 2, behavior: 'smooth' });
  }, [activeIdx]);

  const goPrev = () => setActiveIdx((i) => (i - 1 + agentProducts.length) % agentProducts.length);
  const goNext = () => setActiveIdx((i) => (i + 1) % agentProducts.length);

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'var(--color-primary)' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue-accent/3 rounded-full blur-[140px] pointer-events-none" />

      {/* ↓ max-w-7xl matches all other sections - fixes the side-padding issue */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-14"
          style={{
            opacity:    titleInView ? 1 : 0,
            transform:  titleInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
        >
          <h2
            className="font-display font-extrabold text-4xl sm:text-5xl mb-4"
            style={{ color: 'var(--color-text-heading)' }}
          >
            Agentic AI Suite
          </h2>
          <p
            className="font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-muted)' }}
          >
            Autonomous intelligence designed to operate as a seamless extension of your team.
          </p>
        </div>

        <div ref={inViewRef}>

          {/* ── DESKTOP (lg+): 5-column grid ── */}
          {/* overflow-visible so enlarged cards aren't clipped */}
          <div className="hidden lg:grid grid-cols-5 gap-4 overflow-visible">
            {agentProducts.map((product, i) => (
              <AgentCard
                key={product.id}
                product={product}
                isAutoActive={i === activeIdx}
                inView={inView}
                index={i}
                onClick={() => setActiveIdx(i)}
                hoveredIdx={hoveredIdx}
                onHoverEnter={() => { setHoveredIdx(i); setActiveIdx(i); }}
                onHoverLeave={() => setHoveredIdx(null)}
              />
            ))}
          </div>

          {/* ── TABLET (sm → lg): 3 top + 2 centred bottom ── */}
          <div className="hidden sm:block lg:hidden overflow-visible">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {agentProducts.slice(0, 3).map((product, i) => (
                <AgentCard
                  key={product.id}
                  product={product}
                  isAutoActive={i === activeIdx}
                  inView={inView}
                  index={i}
                  delay={0.08 + i * 0.07}
                  onClick={() => setActiveIdx(i)}
                  hoveredIdx={hoveredIdx}
                  onHoverEnter={() => { setHoveredIdx(i); setActiveIdx(i); }}
                  onHoverLeave={() => setHoveredIdx(null)}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-[67%] mx-auto">
              {agentProducts.slice(3).map((product, i) => (
                <AgentCard
                  key={product.id}
                  product={product}
                  isAutoActive={(i + 3) === activeIdx}
                  inView={inView}
                  index={i + 3}
                  delay={0.08 + (i + 3) * 0.07}
                  onClick={() => setActiveIdx(i + 3)}
                  hoveredIdx={hoveredIdx}
                  onHoverEnter={() => { setHoveredIdx(i + 3); setActiveIdx(i + 3); }}
                  onHoverLeave={() => setHoveredIdx(null)}
                />
              ))}
            </div>
          </div>

          {/* ── MOBILE (<sm): snap carousel - unchanged ── */}
          <div className="sm:hidden">
            <div
              ref={mobileScrollRef}
              className="flex gap-[4vw] overflow-x-auto"
              style={{
                scrollbarWidth:  'none',
                msOverflowStyle: 'none',
                scrollSnapType:  'x mandatory',
                paddingLeft:     '16vw',
                paddingRight:    '16vw',
                paddingBottom:   '8px',
              }}
            >
              {agentProducts.map((product, i) => (
                <MobileAgentCard
                  key={product.id}
                  product={product}
                  isCenter={i === activeIdx}
                  isDark={isDark}
                  onClick={() => setActiveIdx(i)}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-5">
              <button onClick={goPrev}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: isDark ? 'rgba(61,126,255,0.15)' : 'rgba(61,126,255,0.1)', border: '1px solid rgba(61,126,255,0.35)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div className="flex gap-1.5">
                {agentProducts.map((_, i) => (
                  <button key={i} onClick={() => setActiveIdx(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:      i === activeIdx ? 22 : 7,
                      height:     7,
                      background: i === activeIdx ? '#3d7eff' : isDark ? 'rgba(255,255,255,0.18)' : 'rgba(61,126,255,0.22)',
                    }} />
                ))}
              </div>
              <button onClick={goNext}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 bg-blue-accent hover:bg-blue-dark"
                style={{ boxShadow: '0 0 16px rgba(61,126,255,0.4)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>

          {/* Dots - tablet & desktop */}
          <div className="hidden sm:flex justify-center gap-2 mt-8"
            style={{ opacity: inView ? 1 : 0, transition: 'all 0.6s ease 0.5s' }}>
            {agentProducts.map((_, i) => (
              <button key={i} onClick={() => setActiveIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width:      i === activeIdx ? 28 : 8,
                  height:     8,
                  background: i === activeIdx ? '#3d7eff' : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(61,126,255,0.2)',
                }} />
            ))}
          </div>
        </div>
      </div>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};
const ChainshieldSection = () => {
  const [visible, setVisible] = useState(false);
  const [ref, inView] = useInView();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (inView) setVisible(true);
  }, [inView]);

  const fade = (delay, dir = 'up') => ({
    opacity: visible ? 1 : 0,
    transform: visible
      ? 'translate(0,0)'
      : dir === 'left'  ? 'translateX(-40px)'
      : dir === 'right' ? 'translateX(40px)'
      : 'translateY(28px)',
    transition: `opacity 0.75s cubic-bezier(.4,0,.2,1) ${delay}s,
                 transform 0.75s cubic-bezier(.4,0,.2,1) ${delay}s`,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--color-secondary)' }}
    >
      {/* Ambient blobs - mirrors hero */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-blue-accent/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3  w-64   h-64   bg-blue-dark/6  rounded-full blur-[90px]  pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">

          {/* ── LEFT - Chainshields mobile image ── */}
          <div
            style={fade(0.45, 'left')}
            className="flex items-center justify-center lg:justify-start order-2 lg:order-1 rounded-full"
          >
            <img
              src="/Chainshields-mobile.png"
              alt="ChainShields App"
              className="block w-full max-w-[420px] h-auto object-contain drop-shadow-2xl rounded-[10%]"
              draggable={false}
            />
          </div>

          {/* ── RIGHT - text, mirrors hero left column ── */}
          <div className="order-1 lg:order-2">
            {/* Badges */}
            <div style={fade(0.08)} className="flex flex-wrap gap-2 mb-6">
              {['Mobile App', 'Real-Time Auth'].map((b) => (
                <span
                  key={b}
                  className="px-3.5 py-1.5 rounded-full border text-xs font-body tracking-wide"
                  style={{
                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(61,126,255,0.25)',
                    background:  isDark ? 'rgba(255,255,255,0.05)' : 'rgba(61,126,255,0.06)',
                    color: 'var(--color-muted)',
                  }}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Logo */}
            <div style={fade(0.18)} className="flex items-center gap-2 mb-5">
              {isDark ? (  <img
                src="/Chainshields.png"
                alt="ChainShields"
                className="h-7 w-auto object-contain"
                draggable={false}
              /> ): (
                 <img
                src="/Chainshields-dark.png"
                alt="ChainShields"
                className="h-7 w-auto object-contain"
                draggable={false}
              />
              )}
             
            </div>

            {/* Headline */}
            <h2
              // style={fade(0.28)}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-5xl leading-[1.05] tracking-tight mb-5"
              style={{ color: 'var(--color-text-heading)', ...fade(0.28) }}
            >
              <span className="block" style={{ color: 'var(--color-text-heading)' }}>
                One Scan.
              </span>
              <span className="text-blue-gradient block">
                Total Confidence.
              </span>
            </h2>

            {/* Description */}
            <p
              
              className="font-body text-base sm:text-lg leading-relaxed max-w-md mb-8"
              style={{ ...fade(0.40), color: 'var(--color-muted)', ...fade(0.40) }}
            >
              Our real-time authentication app empowers end users to verify product
              authenticity instantly - anywhere, at any time. One scan reveals the
              complete, tamper-proof product journey.
            </p>

            {/* Feature checklist */}
            <ul className="space-y-3 mb-10">
              {[
                'Instant QR-based product verification',
                'Blockchain-secured authenticity records',
                'Works offline - no internet required',
                'Consumer-facing and enterprise-ready',
              ].map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-body"
                  style={{
                    color: 'var(--color-muted)',
                    opacity:   visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(20px)',
                    transition: `all 0.6s ease ${0.48 + i * 0.08}s`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="#3d7eff" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div style={fade(0.72)} className="flex flex-wrap items-center gap-4">
              <a
                href="https://chainshields.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3.5 bg-blue-accent hover:bg-blue-dark text-always-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(61,126,255,0.55)] hover:scale-105 active:scale-95"
              >
                Visit Website
              </a>
              <Link
                to="/case-studies"
                className="group inline-flex items-center gap-2 text-sm font-body transition-all duration-200"
                style={{ color: 'var(--color-muted)' }}
              >
                View Case Study
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--color-secondary), transparent)' }} />
    </section>
  );
};
// ─── CTA - exact gradient from reference ──────────────────────────────────────
const CTASection = () => {
  const [ref, inView] = useInView();
  const { openModal } = useContactModal();

  return (
    <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="dark-section relative rounded-3xl overflow-hidden px-8 py-16 sm:px-14 sm:py-20 text-center"
          style={{
            /* exact blue-to-purple gradient matching reference */
        background: 'linear-gradient(135deg, #1E3A8A 0%, #1E1B4B 100%)',
            opacity:   inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 0.85s cubic-bezier(.4,0,.2,1), transform 0.85s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {/* Blobs */}
          {/* <div className="absolute top-[-25%] right-[-3%] w-80 h-80 rounded-full bg-white/6 blur-[70px] pointer-events-none" />
          <div className="absolute bottom-[-25%] left-[-3%] w-72 h-72 rounded-full bg-black/15 blur-[60px] pointer-events-none" /> */}
          {/* Faint grid overlay */}
          {/* <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          /> */}

          <div className="relative z-10">
            <h2
              className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5 max-w-3xl mx-auto"
              style={{
                opacity:   inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.75s cubic-bezier(.4,0,.2,1) 0.2s',
              }}
            >
              Ready to Elevate Your Operations?
            </h2>

            <p
              className="text-white/70 font-body text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
              style={{
                opacity:   inView ? 1 : 0,
                transition: 'all 0.75s cubic-bezier(.4,0,.2,1) 0.35s',
              }}
            >
              Join hundreds of enterprise leaders who have reclaimed visibility and
              efficiency with Acespire. Book a custom solution walkthrough today.
            </p>

            <div
              className="flex flex-wrap items-center justify-center gap-4"
              style={{
                opacity:   inView ? 1 : 0,
                transition: 'all 0.75s cubic-bezier(.4,0,.2,1) 0.5s',
              }}
            >
             <button onClick={() => openModal({ enquiryType: 'products'})}
                className="inline-flex items-center px-8 py-3.5 bg-white hover:bg-gray-50 text-[#2d4fd6] text-sm font-display font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] active:scale-95"
              >
                Request a Demo
              </button>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-3.5 bg-black/35 hover:bg-black/50 text-white text-sm font-display font-bold rounded-full border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Our Values
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── PAGE ASSEMBLY ─────────────────────────────────────────────────────────────
const ProductsPage = () => {
  const glowRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top  = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div className="relative bg-primary min-h-screen">
      {/* Global cursor glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(61,126,255,0.04) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.18s ease-out, top 0.18s ease-out',
        }}
      />
      <HeroSection />
      <LegacySection />
      <ChainshieldSection />
      <AgenticSuiteSection />
      
      <CTASection />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default ProductsPage;