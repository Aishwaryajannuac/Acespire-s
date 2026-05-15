import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import Footer from '../components/Footer';
import Chatbot from '../Home/Chatbot';
import MagicRings from '../components/MagicRings';
import { useTheme } from '../hooks/useTheme'; 

// ─── Reusable fade wrapper ───────────────────────────────────────────────────
const Reveal = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  const dirs = {
    up:    { from: 'translateY(40px)',  to: 'translateY(0)' },
    left:  { from: 'translateX(-50px)', to: 'translateX(0)' },
    right: { from: 'translateX(50px)',  to: 'translateX(0)' },
    scale: { from: 'scale(0.88)',       to: 'scale(1)'      },
  };
  const d = dirs[direction] || dirs.up;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:   inView ? 1 : 0,
        transform: inView ? d.to : d.from,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ─── 1. HERO ─────────────────────────────────────────────────────────────────
// ─── Drop this HeroSection into AboutUs.jsx ──────────────────────────────────
// 1. Add this import near the top of AboutUs.jsx (alongside your other imports):
//      import MagicRings from '../components/MagicRings';
//    (adjust path to wherever you place MagicRings.jsx)
//
// 2. Replace the existing HeroSection function entirely with this one.
// ─────────────────────────────────────────────────────────────────────────────

const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();       // already imported in AboutUs
  const isDark = theme === 'dark';

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">

      {/* ── MagicRings - full-bleed background, perfectly centred ── */}
      <div className="absolute inset-0">
        <MagicRings
          // Blue → indigo matches site palette in both themes
          color={isDark ? '#3d7eff' : '#2563eb'}
          colorTwo={isDark ? '#818cf8' : '#6366f1'}
          ringCount={6}
          speed={0.55}          // slow, ambient
          attenuation={12}      // tighter glow - keeps rings clean
          lineThickness={1.4}
          baseRadius={0.22}     // rings start small so they don't crowd the text
          radiusStep={0.09}
          scaleRate={0.12}
          opacity={isDark ? 0.72 : 0.55}   // subtler in light mode
          noiseAmount={0.04}    // very faint grain
          ringGap={1.6}
          fadeIn={0.65}
          fadeOut={0.55}
          rotation={18}         // slight tilt for visual interest
          followMouse={true}
          mouseInfluence={0.18} // gentle - rings breathe toward cursor
          hoverScale={1.12}
          parallax={0.06}
          clickBurst={false}
          blur={0}
        />
      </div>

      {/* Darken ring edges so text is always readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(7,9,18,0.60) 100%)'
            : 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(240,245,255,0.55) 100%)',
        }}
      />

      {/* Original accent blobs - kept exactly as before */}
      <div
        className="absolute bottom-0 left-0 w-[520px] h-[520px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(34,197,94,0.22) 0%, rgba(34,197,94,0.08) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-[580px] h-[580px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(61,126,255,0.28) 0%, rgba(61,126,255,0.10) 40%, transparent 70%)',
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Content - unchanged from original ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
        {/* Badge */}
        <div
          style={fade(0.1)}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#558BF6]/30 bg-white/5 text-xs text-muted font-body mb-8 shadow-[0_0_10px_rgba(85,139,246,0.2)]"
        >
          Our Identity
        </div>

        {/* Headline */}
        <h1
          style={fade(0.25)}
          className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-white block">Trusted Expertise.</span>
          <span className="text-blue-gradient">Transformative Impact.</span>
        </h1>

        {/* Subtitle */}
        <p
          style={fade(0.4)}
          className="text-muted font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Acespire brings decades of deep expertise and purpose-built solutions for today's digital enterprises.
        </p>

        {/* CTA */}
        <div style={fade(0.55)}>
          <Link
            to="/products"
            className="group inline-flex items-center gap-3 px-7 py-4 bg-blue-accent hover:bg-blue-dark text-always-white text-base font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_35px_rgba(61,126,255,0.5)] hover:scale-105 active:scale-95"
          >
            Our Products
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
    </section>
  );
};

// ─── 2. FOUNDER QUOTE ────────────────────────────────────────────────────────
const QuoteSection = () => {
  const [ref, inView] = useInView();

  return (
    <section className="relative py-24 bg-secondary overflow-hidden">
      {/* Fix 5 - inject Noto Sans for the quote */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@1,700&display=swap');
        .quote-noto { font-family: 'Noto Sans', sans-serif; font-weight: 700; font-style: italic; }
      `}</style>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-accent/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-accent/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-accent/4 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quote icon */}
        <div
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}
          className="w-12 h-12 rounded-xl bg-blue-accent/15 border border-blue-accent/25 flex items-center justify-center mb-8"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>

        {/* Fix 5 - Noto Sans Bold Italic for quote text */}
        <blockquote
          className="quote-noto text-xl sm:text-1xl lg:text-2xl text-white leading-relaxed mb-8"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.15s' }}
        >
          "Acespire began as a consulting company ,delivering expert IT and supply chain consulting services to businesses that needed more than generic advice. We rolled up our sleeves, worked closely with our clients, and solved real problems. Consulting was and remains our bread and butter"
        </blockquote>

        {/* Body */}
        <div
          className="space-y-4 mb-8"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.3s' }}
        >
          <p className="text-muted font-body text-sm sm:text-base leading-relaxed">
            With every engagement, every supply chain challenge we untangled, and every digital transformation we guided, Acespire accumulated something invaluable: deep, hard-earned domain knowledge. We began to see patterns. We identified gaps that no existing product in the market was addressing.
          </p>
          <p className="text-muted font-body text-sm sm:text-base leading-relaxed">
            So we built them ourselves.
          </p>
          <p className="text-muted font-body text-sm sm:text-base leading-relaxed">
            That insight gave birth to Acespire's product journey - purpose-built solutions engineered from years of frontline consulting experience. Our products are not ideas from a boardroom. They are answers to real problems we encountered in the field, refined through expertise, and built for the enterprises we know best.
          </p>
          <p className="text-muted font-body text-sm sm:text-base leading-relaxed">
            Today, Acespire stands at the intersection of consulting excellence and product innovation. Consulting is our foundation ; it keeps us grounded, client-focused, and sharp. Our products are our evolution ;a testament to how deeply we understand the industries we serve.
If consulting is our bread and butter, our products are the cake - and at Acespire, our focus is to deliver best for both.

          </p>
        </div>

        {/* Attribution */}
        <div
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)', transition: 'all 0.6s ease 0.45s' }}
        >
          <p className="font-display font-bold text-white text-base">Kush Gupta</p>
          <p className="text-blue-accent font-body text-sm mt-0.5">Founder & Chief Executive</p>
        </div>
      </div>
    </section>
  );
};

// ─── 3. PILLARS ──────────────────────────────────────────────────────────────
const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
        <path d="M15.54 8.46a5 5 0 010 7.07M8.46 8.46a5 5 0 000 7.07" />
      </svg>
    ),
    title: 'Relentless Innovation',
    desc:  "We don't settle for 'best practice.' We invent the 'next practice' through constant R&D and rapid prototyping.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Radical Collaboration',
    desc:  'Our consultants embed deeply with your teams, treating your business challenges as our own personal mission.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Enterprise Integrity',
    desc:  "Security and ethics aren't features; they're the foundation. Our AI systems are built on 'Privacy-by-Design' principles.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: 'Measurable Impact',
    desc:  "We are obsessed with outcomes. If it doesn't move the needle on your bottom line, we aren't doing it.",
  },
];

const PillarCard = ({ pillar, index, inView }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="light-card relative p-6 rounded-2xl border cursor-default"
      style={{
        opacity:     inView ? 1 : 0,
        transform:   inView ? 'translateY(0)' : 'translateY(40px)',
        transition:  `opacity 0.6s ease ${0.1 + index * 0.1}s, transform 0.6s ease ${0.1 + index * 0.1}s, box-shadow 0.3s ease, border-color 0.3s ease`,
        background:  'rgba(24,28,42,0.6)',
        borderColor: hovered ? 'rgba(61,126,255,0.35)' : 'rgba(255,255,255,0.06)',
        boxShadow:   hovered ? '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(61,126,255,0.15)' : 'none',
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
        style={{
          background: hovered ? 'rgba(61,126,255,0.2)' : 'rgba(61,126,255,0.1)',
          color: '#3d7eff',
          boxShadow: hovered ? '0 0 20px rgba(61,126,255,0.25)' : 'none',
        }}
      >
        {pillar.icon}
      </div>
      <h3 className="font-display font-bold text-white text-lg mb-3">{pillar.title}</h3>
      <p className="text-muted font-body text-sm leading-relaxed">{pillar.desc}</p>
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, #3d7eff, transparent)', opacity: hovered ? 1 : 0 }}
      />
    </div>
  );
};

const PillarsSection = () => {
  const [titleRef, titleInView] = useInView();
  const [gridRef,  gridInView]  = useInView();

  return (
    <section className="relative py-24 lg:py-32 bg-primary overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-accent/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{ opacity: titleInView ? 1 : 0, transform: titleInView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#558BF6]/30 text-[#558BF6] bg-white/5 text-xs font-body mb-8 shadow-[0_0_10px_rgba(85,139,246,0.2)]">
            Pillars
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white">
            The Pillars of Acespire
          </h2>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} pillar={p} index={i} inView={gridInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── 4. TIMELINE ─────────────────────────────────────────────────────────────
const timelineItems = [
  {
    year: '2019', side: 'right',
    title: 'It All Started Here',
    desc:  'Acespire emerged from independent consulting, fuelled by rising demand for data integration expertise and a belief in building through partnerships, not transactions.',
  },
  {
    year: '2020', side: 'left',
    title: 'Building Momentum',
    desc:  'Kicked off multiple strategic projects and established our foundational partnership with o9 Solutions - setting the tone for how we grow: collaboratively.',
  },
  {
    year: '2021-2022', side: 'right',
    title: 'Expanding Our Reach',
    desc:  'Grew our delivery capabilities across the US and India, achieved AWS partnership, and built a strong track record of successful project delivery.',
  },
  {
    year: '2023', side: 'left',
    title: 'R&D & Global Presence',
    desc:  'Launched a Centre of Excellence for data integration and supply chain best practices - which quickly evolved into a product innovation hub. Opened our Mexico office to serve a broader global market.',
  },
  {
    year: '2024', side: 'right',
    title: 'Product development',
    desc:  'Expanded toward building proprietary products. Conceived the idea of Agentic AI solutions designed to automate and elevate enterprise supply chain operations.',
  },
   {
    year: '2025', side: 'left',
    title: 'Two Divisions, One Mission',
    desc:  'Established two clear business pillars - Services and Products. Partnered with Databricks and Snowflake, and brought Agentic AI from concept to reality.',
  },
  {
    year: '2026', side: 'right',
    title: 'Just Getting Started',
    desc:  'Launched Provinyx, our flagship Digital Product Passport platform. Expanding strategic partnerships across the supply chain ecosystem and scaling our product portfolio for global impact.',
  },
];

// Fix 3 - Mobile: line on far left, all cards on right
//          Desktop: alternating left/right
const TimelineItem = ({ item, index }) => {
  const [ref, inView] = useInView();
  const isLeft = item.side === 'left';

  return (
    <div ref={ref} className="relative flex items-start md:items-center gap-0">

      {/* ── DESKTOP left card ── */}
      <div className="hidden md:flex flex-1 justify-end pr-10">
        {isLeft ? (
          <div
            className="light-card w-full max-w-xl p-5 rounded-2xl border"
            style={{
              opacity:    inView ? 1 : 0,
              transform:  inView ? 'translateX(0)' : 'translateX(-40px)',
              transition: `all 0.7s ease ${index * 0.12}s`,
              background: 'rgba(24,28,42,0.7)',
              borderColor: 'rgba(255,255,255,0.07)',
            }}
          >
            <span className="text-blue-accent font-display font-bold text-sm">{item.year}</span>
            <h3 className="font-display font-bold text-white text-lg mt-1 mb-2">{item.title}</h3>
            <p className="text-muted font-body text-sm leading-relaxed">{item.desc}</p>
          </div>
        ) : <div className="w-full max-w-xs" />}
      </div>

      {/* ── Centre dot (desktop) / Left dot (mobile) ── */}
      <div className="relative flex flex-col items-center shrink-0">
        <div
          className="w-4 h-4 rounded-full border-2 border-blue-accent bg-primary z-10"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0)',
            transition: `all 0.5s ease ${index * 0.12 + 0.2}s`,
            boxShadow: '0 0 12px rgba(61,126,255,0.6)',
          }}
        />
      </div>

      {/* ── DESKTOP right card ── */}
      <div className="hidden md:flex flex-1 justify-end pl-10">
        {!isLeft ? (
          <div
            className="light-card w-full max-w-xl p-5 rounded-2xl border"
            style={{
              opacity:    inView ? 1 : 0,
              transform:  inView ? 'translateX(0)' : 'translateX(40px)',
              transition: `all 0.7s ease ${index * 0.12}s`,
              background: 'rgba(24,28,42,0.7)',
              borderColor: 'rgba(255,255,255,0.07)',
            }}
          >
            <span className="text-blue-accent font-display font-bold text-left block text-sm">{item.year}</span>
            <h3 className="font-display font-bold text-white text-lg mt-1 mb-2 text-left">{item.title}</h3>
            <p className="text-muted font-body text-sm leading-relaxed text-left">{item.desc}</p>
          </div>
        ) : <div className="w-full max-w-xs" />}
      </div>

      {/* ── MOBILE card - always right of dot ── */}
      <div
        className="md:hidden flex-1 pl-6"
        style={{
          opacity:    inView ? 1 : 0,
          transform:  inView ? 'translateX(0)' : 'translateX(30px)',
          transition: `all 0.7s ease ${index * 0.12}s`,
        }}
      >
        <div
          className="p-4 rounded-2xl border"
          style={{ background: 'rgba(24,28,42,0.7)', borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <span className="text-blue-accent font-display font-bold text-sm">{item.year}</span>
          <h3 className="font-display font-bold text-white text-base mt-1 mb-1.5">{item.title}</h3>
          <p className="text-muted font-body text-sm leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

const TimelineSection = () => {
  const [titleRef, titleInView] = useInView();

  return (
    <section className="relative py-24 lg:py-32 bg-secondary overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-accent/20 to-transparent" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{ opacity: titleInView ? 1 : 0, transform: titleInView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#558BF6]/30 text-[#558BF6] bg-white/5 text-xs font-body mb-8 shadow-[0_0_10px_rgba(85,139,246,0.2)]">
            Our Journey
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white">
            The Evolution of Excellence
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Desktop - vertical line in centre */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-accent/30 to-transparent" />
          {/* Mobile - vertical line on far left */}
          <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-accent/30 to-transparent" />

          <div className="space-y-10 md:space-y-12">
            {timelineItems.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── 5. CULTURE CTA ──────────────────────────────────────────────────────────
// Fix 1 - Glassdoor block: target icon → rating number → 5 stars → label
const GlassdoorCard = ({ inView }) => (
  <div
    className="flex justify-center sm:justify-end"
    style={{
      opacity:   inView ? 1 : 0,
      transform: inView ? 'scale(1)' : 'scale(0.9)',
      transition: 'all 0.7s ease 0.35s',
    }}
  >
    <div
      className="relative w-76 h-48 flex items-center justify-center rounded-2xl border border-blue-accent/30"
      style={{ background: 'rgba(15,18,30,0.9)' }}
    >
      {/* Faint Glassdoor person icon watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl">
        <svg viewBox="0 0 120 120" width="200" height="200" opacity="0.06" fill="white">
          <circle cx="60" cy="35" r="22" />
          <path d="M10 110 Q10 75 60 75 Q110 75 110 110Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
        {/* Target / bullseye icon */}
        {/* <svg viewBox="0 0 36 36" width="16" height="16" fill="none">
          <circle cx="18" cy="18" r="16" stroke="rgba(61,126,255,0.4)" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="11" stroke="rgba(61,126,255,0.5)" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="6"  stroke="rgba(61,126,255,0.7)" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="2"  fill="#3d7eff" />
        </svg> */}

        {/* Rating number */}
        <span className="font-display font-extrabold text-4xl text-blue-accent leading-none">5/5</span>

        {/* 5 stars */}
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => (
            <svg viewBox="0 0 36 36" width="16" height="16" fill="none">
          <circle cx="18" cy="18" r="16" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="11" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="6"  stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="18" cy="18" r="2"  fill="#ffffff" />
        </svg>
          ))}
        </div>

        {/* Label */}
        <span className="text-muted font-body text-[14px] tracking-widest uppercase leading-tight">
          AmbitionBox Employee Rating
        </span>
      </div>
    </div>
  </div>
);

const CultureSection = () => {
  const [ref, inView] = useInView();

  return (
    <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="dark-section relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-14"
          style={{
            background: 'rgba(15,18,30,0.9)',
            border: '1px solid rgba(61,126,255,0.35)',
            boxShadow: '0 0 60px rgba(61,126,255,0.08)',
            opacity:   inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease',
          }}
        >
          {/* Corner glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-accent/6 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-dark/8 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
            {/* Left text */}
            <div
              style={{
                opacity:   inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.7s ease 0.2s',
              }}
            >
              <h2 className="font-display font-extrabold text-3xl sm:text-3xl lg:text-4xl leading-tight mb-4">
                <span className="text-white">Join the </span>
                <span className="text-blue-gradient">Acespire</span>
                <span className="text-white"> Culture.</span>
              </h2>
              <p className="text-muted font-body text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                We aren't looking for employees. We're looking for problem-solvers,
                disruptors, and builders who want to define the future of enterprise intelligence.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/careers"
                  className="inline-flex items-center px-6 py-3 bg-blue-accent hover:bg-blue-dark text-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(61,126,255,0.4)] hover:scale-105 active:scale-95"
                >
                  View Open Roles
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 border border-border hover:border-blue-accent/40 text-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:bg-card-hover"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right - Fix 1: Glassdoor card */}
            <GlassdoorCard inView={inView} />
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── PAGE ASSEMBLY ────────────────────────────────────────────────────────────
const AboutUs = () => {
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
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(61,126,255,0.04) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.2s ease-out, top 0.2s ease-out',
        }}
      />
      <HeroSection />
      <QuoteSection />
      
      <TimelineSection />
      <PillarsSection />
      <CultureSection />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default AboutUs;