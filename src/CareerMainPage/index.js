import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import { useTheme } from '../hooks/useTheme';
import Footer from '../components/Footer';
import roles from './careersData';
import Chatbot from '../Home/Chatbot';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const culture = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Radical Innovation',
    desc: "We don't just follow trends; we set them. Our Agentic AI solutions are born from a culture that rewards bold experimentation.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Deep Collaboration',
    desc: 'Cross-functional synergy is our superpower. Engineers, consultants, and clients work as one unified engine of growth.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Impact First',
    desc: 'We measure success by the tangible transformations we deliver to our partners, prioritizing long-term value over short-term wins.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Integrity & Trust',
    desc: 'Building the future requires a foundation of absolute transparency and ethical standards in every engagement.',
  },
];

const perks = [
  {
    icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>,
    title: 'Global Remote-First',
    desc: 'Work from anywhere in the world with our borderless office policy and home-office stipends.',
  },
  {
    icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    title: 'Growth Stipend',
    desc: '$2,500 annual budget for conferences, certifications, and continuous learning.',
  },
  {
    icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    title: 'Holistic Wellness',
    desc: 'Comprehensive medical, dental, and vision coverage, plus monthly wellness allowances.',
  },
  {
    icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    title: 'Top-Tier Tech',
    desc: 'The latest hardware of your choice plus a $1,000 setup bonus for your workspace.',
  },
  {
    icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
    title: 'Equity & Ownership',
    desc: "Generous stock options plan for every employee, because we're building this together.",
  },
  {
    icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: 'Flexible Time Off',
    desc: 'Unlimited PTO policy with a mandatory minimum of 15 days taken per year.',
  },
];

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Floating orbs animation relevant to careers/people/growth
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    // Floating orbs — represent people/talent joining a network
    const orbs = Array.from({ length: 18 }, (_, i) => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 2 + 8,
      vx:   (Math.random() - 0.5) * 0.3,
      vy:   (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.12 + 0.03,
      phase: Math.random() * Math.PI * 2,
    }));

    // Connection dots (smaller, faster)
    const dots = Array.from({ length: 40 }, () => ({
      x:   Math.random() * W,
      y:   Math.random() * H,
      r:   Math.random() * 1.8 + 0.6,
      vx:  (Math.random() - 0.5) * 0.5,
      vy:  (Math.random() - 0.5) * 0.5,
    }));

    let tick = 0;
    const accent = isDark ? '61,126,255' : '61,126,255';

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      tick += 0.012;

      // Draw orbs
      orbs.forEach((orb) => {
        const pulse = Math.sin(tick + orb.phase) * 0.015;
        const alpha = orb.opacity + pulse;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent},${alpha})`;
        ctx.fill();

        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.r) orb.x = W + orb.r;
        if (orb.x > W + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = H + orb.r;
        if (orb.y > H + orb.r) orb.y = -orb.r;
      });

      // Draw connection lines between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.strokeStyle = `rgba(${accent},${(1 - d / 110) * (isDark ? 0.1 : 0.07)})`;
            ctx.lineWidth   = 0.7;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      dots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent},${isDark ? 0.45 : 0.3})`;
        ctx.fill();

        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > W) dot.vx *= -1;
        if (dot.y < 0 || dot.y > H) dot.vy *= -1;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [isDark]);

  const fade = (delay) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  });

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'var(--color-primary)' }}
    >
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 1 }}
      />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[80px] h-[20px] bg-blue-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-44 h-44 bg-blue-dark/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <div className="order-2 lg:order-1">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-body mb-7"
              style={{
                ...fade(0.1),
                border: '1px solid rgba(61,126,255,0.3)',
                background: 'rgba(61,126,255,0.08)',
                color: '#60b4ff',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/>
              </svg>
              We're Hiring Top Talent
            </div>

            <h1
              style={{ ...fade(0.2), color: 'var(--color-text-heading)' }}
              className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.06] tracking-tight mb-6"
            >
              Build the{' '}
              <span className="text-blue-gradient">Future</span>
              {' '}of<br />
              Enterprise<br />
              Operations
            </h1>

            <p
              style={{ ...fade(0.35), color: 'var(--color-muted)' }}
              className="font-body text-base sm:text-lg leading-relaxed max-w-md mb-10"
            >
              Join a global team of visionaries, engineers, and supply chain experts dedicated to solving
              the world's most complex digital transformation challenges.
            </p>

            <div style={fade(0.48)} className="flex flex-wrap gap-4">
              <a
                href="#open-positions"
                className="inline-flex items-center px-7 py-3.5 bg-blue-accent hover:bg-blue-dark text-always-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_28px_rgba(61,126,255,0.5)] hover:scale-105 active:scale-95"
              >
                View Open Roles
              </a>
              <a
                href="#how-we-think"
                className="inline-flex items-center px-7 py-3.5 rounded-full border text-sm font-display font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  border: isDark ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(61,126,255,0.3)',
                  color: 'var(--color-text-heading)',
                }}
              >
                Our Culture
              </a>
            </div>
          </div>

          {/* FIX 2 — Right: Career-hero.png image */}
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
              // style={{
              //   border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(61,126,255,0.15)',
              //   boxShadow: isDark ? '0 24px 80px rgba(0,0,0,0.5)' : '0 24px 60px rgba(61,126,255,0.12)',
              // }}
            >
              <img
                src="/Career-hero.png"
                alt="Careers at Acespire"
                className="w-full h-auto object-cover block"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── 2. HOW WE THINK ──────────────────────────────────────────────────────────
const HowWeThinkSection = () => {
  const [titleRef, titleInView] = useInView();
  const [gridRef,  gridInView]  = useInView();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="how-we-think"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'var(--color-secondary)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.2), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{ opacity: titleInView ? 1 : 0, transform: titleInView ? 'translateY(0)' : 'translateY(28px)', transition: 'all 0.8s ease' }}
        >
          <h2
            className="font-display font-extrabold text-4xl sm:text-5xl mb-3 tracking-wide uppercase"
            style={{ color: 'var(--color-text-heading)' }}
          >
            How We Think
          </h2>
          <div className="w-14 h-1 bg-blue-accent mx-auto mb-5 rounded-full" />
          <p className="font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            At Acespire, our culture is built on four fundamental pillars that drive our mission to
            redefine enterprise excellence.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {culture.map((item, i) => (
            <CultureCard key={item.title} item={item} index={i} inView={gridInView} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CultureCard = ({ item, index, inView, isDark }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border p-6 flex flex-col transition-all duration-300"
      style={{
        background:  isDark ? 'rgba(24,28,42,0.85)' : '#ffffff',
        borderColor: hovered ? '#3d7eff' : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(61,126,255,0.2)',
        boxShadow:   hovered ? '0 12px 40px rgba(0,0,0,0.3)' : isDark ? 'none' : '0 2px 12px rgba(61,126,255,0.07)',
        opacity:     inView ? 1 : 0,
        transform:   inView
          ? hovered ? 'translateY(-5px)' : 'translateY(0)'
          : 'translateY(35px)',
        transition:  `opacity 0.65s ease ${0.08 + index * 0.1}s, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
        style={{
          background: hovered ? 'rgba(61,126,255,0.2)' : 'rgba(61,126,255,0.12)',
          border: `1px solid ${hovered ? 'rgba(61,126,255,0.5)' : 'rgba(61,126,255,0.25)'}`,
          color: '#3d7eff',
        }}
      >
        {item.icon}
      </div>
      <h3 className="font-display font-bold text-base mb-2 transition-colors duration-300"
        style={{ color: hovered ? '#3d7eff' : 'var(--color-text-heading)' }}>
        {item.title}
      </h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        {item.desc}
      </p>
      <div className="h-0.5 mt-5 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, #3d7eff, transparent)', opacity: hovered ? 1 : 0 }} />
    </div>
  );
};

// ─── 3. PERKS ─────────────────────────────────────────────────────────────────
const PerksSection = () => {
  const [titleRef, titleInView] = useInView();
  const [gridRef,  gridInView]  = useInView();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'var(--color-primary)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.2), transparent)' }} />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[300px_1fr] gap-12 lg:gap-20 items-start">

          {/* Left heading */}
          <div
            ref={titleRef}
            style={{ opacity: titleInView ? 1 : 0, transform: titleInView ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.8s ease' }}
          >
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl leading-tight mb-5"
              style={{ color: 'var(--color-text-heading)' }}>
              Perks Designed for{' '}
              <span className="text-blue-gradient">Excellence</span>
            </h2>
            <p className="font-body text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              We provide the resources and environment you need to perform at your peak and maintain a
              sustainable work-life integration.
            </p>
          </div>

          {/* Right grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {perks.map((perk, i) => (
              <PerkCard key={perk.title} perk={perk} index={i} inView={gridInView} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PerkCard = ({ perk, index, inView, isDark }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border p-5 transition-all duration-300"
      style={{
        background:  isDark ? 'rgba(24,28,42,0.8)' : '#ffffff',
        borderColor: hovered ? 'rgba(61,126,255,0.4)' : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(61,126,255,0.18)',
        boxShadow:   hovered ? '0 8px 32px rgba(0,0,0,0.3)' : isDark ? 'none' : '0 2px 10px rgba(61,126,255,0.06)',
        opacity:     inView ? 1 : 0,
        transform:   inView ? hovered ? 'translateY(-4px)' : 'translateY(0)' : 'translateY(30px)',
        transition:  `opacity 0.6s ease ${0.06 + index * 0.07}s, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
        style={{
          background: hovered ? 'rgba(61,126,255,0.2)' : 'rgba(61,126,255,0.1)',
          border: `1px solid ${hovered ? 'rgba(61,126,255,0.45)' : 'rgba(61,126,255,0.22)'}`,
          color: '#3d7eff',
        }}>
        {perk.icon}
      </div>
      <h3 className="font-display font-bold text-sm mb-1.5" style={{ color: 'var(--color-text-heading)' }}>
        {perk.title}
      </h3>
      <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        {perk.desc}
      </p>
    </div>
  );
};

// ─── 4. OPEN POSITIONS ────────────────────────────────────────────────────────
const OpenPositionsSection = () => {
  const [titleRef, titleInView] = useInView();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="open-positions"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'var(--color-secondary)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.2), transparent)' }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className="mb-14"
          style={{ opacity: titleInView ? 1 : 0, transform: titleInView ? 'translateY(0)' : 'translateY(28px)', transition: 'all 0.8s ease' }}
        >
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl mb-3" style={{ color: 'var(--color-text-heading)' }}>
            Open{' '}
            <span className="text-blue-gradient">Positions</span>
          </h2>
          <p className="font-body text-base sm:text-lg max-w-xl leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            Ready to make your mark? We are currently seeking pioneers for the following roles
            across our global divisions.
          </p>
        </div>

        {/* Role list */}
        <div className="space-y-5">
          {roles.map((role, i) => (
            <RoleRow key={role.id} role={role} index={i} isDark={isDark} inView={titleInView} />
          ))}
        </div>

        {/* Don't see fit */}
        <div className="mt-16">
          <NoFitCard isDark={isDark} inView={titleInView} />
        </div>
      </div>
    </section>
  );
};

const RoleRow = ({ role, index, isDark }) => {
  const [hovered, setHovered] = useState(false);
  const [ref, rowInView] = useInView();

  // FIX 4 — alternate: even index slides from left, odd from right
  const fromLeft  = index % 2 === 0;
  const slideFrom = fromLeft ? 'translateX(-50px)' : 'translateX(50px)';

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl border p-6 sm:p-8 transition-all duration-300"
      style={{
        background:  isDark ? 'rgba(24,28,42,0.8)' : '#ffffff',
        borderColor: hovered ? '#3d7eff' : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(61,126,255,0.18)',
        boxShadow:   hovered ? '0 8px 40px rgba(0,0,0,0.3)' : isDark ? 'none' : '0 2px 12px rgba(61,126,255,0.07)',
        opacity:     rowInView ? 1 : 0,
        transform:   rowInView ? 'translateX(0)' : slideFrom,
        transition:  `opacity 0.7s cubic-bezier(.4,0,.2,1) ${index * 0.08}s,
                      transform 0.7s cubic-bezier(.4,0,.2,1) ${index * 0.08}s,
                      border-color 0.3s ease,
                      box-shadow 0.3s ease`,
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
            {role.tags.map((tag) => (
              <span key={tag}
                className="px-3 py-1 rounded-full text-[10px] font-body font-semibold tracking-wider"
                style={{
                  background: isDark ? 'rgba(61,126,255,0.12)' : 'rgba(61,126,255,0.08)',
                  border: '1px solid rgba(61,126,255,0.3)',
                  color: '#3d7eff',
                }}>
                {tag}
              </span>
            ))}
            <span className="px-3 py-1 rounded-full text-[10px] font-body"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(61,126,255,0.05)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61,126,255,0.18)',
                color: 'var(--color-muted)',
              }}>
              {role.location}
            </span>
          </div>

          <h3
            className="font-display font-extrabold text-xl sm:text-2xl mb-3 transition-colors duration-300"
            style={{ color: hovered ? '#3d7eff' : 'var(--color-text-heading)' }}
          >
            {role.title}
          </h3>

          <ul className="space-y-1.5">
            {role.qualifications.slice(0, 3).map((q, qi) => (
              <li key={qi} className="flex items-start gap-2">
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#3d7eff' }} />
                <span className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Apply button */}
        <div className="flex items-center shrink-0">
          <Link
            to={`/careers/${role.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-accent hover:bg-blue-dark text-always-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(61,126,255,0.5)] hover:scale-105 active:scale-95"
          >
            Apply Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

const NoFitCard = () => {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className="relative rounded-3xl overflow-hidden"
      style={{
        opacity:   inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(.4,0,.2,1) 0.2s',
        minHeight: 420,
      }}
    >
      {/* Background image — Career-cta.png */}
      <img
        src="/Career-cta.png"
        alt="Don't see the right fit"
        className="absolute inset-0 w-full h-full object-cover object-center"
        draggable={false}
      />

      {/* Top-half: light overlay to let image show clearly */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 40%, rgba(15, 25, 112, 0.92) 62%, rgba(30,30,150,0.97) 100%)',
        }}
      />

      {/* Content — sits on the bottom blue half */}
      <div className="dark-section relative z-10 flex flex-col items-center justify-end h-full px-8 pb-10 pt-52 text-center">
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-3">
          Don't see the right fit?
        </h3>
        <p
          className="font-body text-sm sm:text-base mb-8 max-w-lg mx-auto"
          style={{ color: 'rgba(255,255,255,0.78)' }}
        >
          We're always looking for extraordinary talent. If you believe you can bring value to
          Acespire in a way not listed above, we'd love to hear from you.
        </p>
        <a
          href="https://hireon.acespireconsulting.com/apply/78"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-display font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] active:scale-95"
          style={{
            background: 'rgba(13,15,22,0.75)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(8px)',
          }}
        >
          Submit General Application
        </a>
      </div>
    </div>
  );
};

// ─── 5. CTA ───────────────────────────────────────────────────────────────────
// const CTASection = () => {
//   const [ref, inView] = useInView();

//   return (
//     <section className="relative py-16 lg:py-24 overflow-hidden" style={{ background: 'var(--color-primary)' }}>
//       <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.2), transparent)' }} />
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div
//           ref={ref}
//           className="relative rounded-3xl overflow-hidden px-8 py-16 sm:px-14 sm:py-20 text-center dark-section"
//           style={{
//             background: 'linear-gradient(135deg, #1E3A8A 0%, #1E1B4B 100%)',
//             opacity:   inView ? 1 : 0,
//             transform: inView ? 'scale(1)' : 'scale(0.96)',
//             transition: 'all 0.85s cubic-bezier(.4,0,.2,1)',
//           }}
//         >
//           <div className="absolute top-[-20%] right-[-5%] w-72 h-72 rounded-full bg-white/5 blur-[70px] pointer-events-none" />
//           <div className="absolute bottom-[-20%] left-[-5%] w-64 h-64 rounded-full bg-black/15 blur-[60px] pointer-events-none" />

//           <div className="relative z-10">
//             <h2
//               className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5 max-w-2xl mx-auto"
//               style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.75s ease 0.2s' }}
//             >
//               Ready to Shape the Future of Enterprise?
//             </h2>
//             <p
//               className="font-body text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
//               style={{ color: 'rgba(255,255,255,0.7)', opacity: inView ? 1 : 0, transition: 'all 0.75s ease 0.35s' }}
//             >
//               Explore our open roles and take the first step toward a career that matters.
//             </p>
//             <div
//               className="flex flex-wrap items-center justify-center gap-4"
//               style={{ opacity: inView ? 1 : 0, transition: 'all 0.75s ease 0.5s' }}
//             >
//               <a
//                 href="#open-positions"
//                 className="inline-flex items-center px-8 py-3.5 bg-white hover:bg-gray-50 text-[#1E3A8A] text-sm font-display font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] active:scale-95"
//               >
//                 View All Roles
//               </a>
//               <Link
//                 to="/contact"
//                 className="inline-flex items-center gap-2 px-8 py-3.5 bg-black/35 hover:bg-black/50 text-white text-sm font-display font-bold rounded-full border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
//               >
//                 Talk to Our Team
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                   <path d="M5 12h14M12 5l7 7-7 7"/>
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// ─── PAGE ─────────────────────────────────────────────────────────────────────
const CareerMainPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-primary)' }}>
      <HeroSection />
      <HowWeThinkSection />
      <PerksSection />
      <OpenPositionsSection />
      {/* <CTASection /> */}
      <Chatbot />
      <Footer />
    </div>
  );
};

export default CareerMainPage;