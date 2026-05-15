import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import Footer from '../components/Footer';
import caseStudies, { categories } from './caseStudiesData';
import Chatbot from '../Home/Chatbot';
import { useContactModal } from '../context/ContactModalContext';

// ─── HERO - timed carousel over featured case studies ─────────────────────────
const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [activeIdx, setActiveIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const timerRef  = useRef(null);

  // Newest-first among featured studies
  const featured = caseStudies
    .filter((c) => c.featured)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const current = featured[activeIdx];

  // Auto-advance every 6 s
  useEffect(() => {
    if (featured.length <= 1) return;
    timerRef.current = setInterval(() => advance(1), 6000);
    return () => clearInterval(timerRef.current);
  }, [activeIdx, featured.length]); // eslint-disable-line

  const advance = (dir) => {
    clearInterval(timerRef.current);
    setTransitioning(true);
    setTimeout(() => {
      setActiveIdx((i) => (i + dir + featured.length) % featured.length);
      setTransitioning(false);
    }, 320);
  };

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
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.75s cubic-bezier(.4,0,.2,1) ${delay}s,
                 transform 0.75s cubic-bezier(.4,0,.2,1) ${delay}s`,
  });

  // Slide content opacity - fades out on transition, back in on mount
  const slideStyle = {
    opacity:    transitioning ? 0 : 1,
    transform:  transitioning ? 'translateY(10px)' : 'translateY(0)',
    transition: 'opacity 0.32s ease, transform 0.32s ease',
  };

  if (!current) return null;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Mouse-follow glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 55% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(61,126,255,0.07) 0%, transparent 70%)`,
          transition: 'background 0.5s ease',
        }}
      />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-blue-accent/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-dark/6 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── LEFT ── */}
          <div className="order-2 lg:order-1">
            {/* Badge row: Featured + slide counter */}
            <div style={fade(0.08)} className="flex items-center gap-3 mb-7">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs text-muted font-body">
                Featured Case Study
              </span>
              {featured.length > 1 && (
                <span className="text-muted font-body text-xs">
                  {activeIdx + 1} / {featured.length}
                </span>
              )}
            </div>

            {/* Slide content - fades on change */}
            <div style={slideStyle}>
              {/* Headline */}
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight mb-6">
                <span className="text-white">
                  {current.title.replace(current.titleHighlight, '')}
                </span>
                {current.titleHighlight && (
                  <span className="text-blue-gradient block">{current.titleHighlight}</span>
                )}
              </h1>

              {/* Tagline */}
              <p className="text-muted font-body text-base sm:text-lg leading-relaxed max-w-lg mb-8">
                {current.tagline}
              </p>

              {/* Problem / Solution / Result */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { label: 'Problem',  text: current.problem  },
                  { label: 'Solution', text: current.solution },
                  { label: 'Result',   text: current.result   },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="#3d7eff" strokeWidth="2" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                      <span className="font-display font-bold text-white text-xs">{item.label}</span>
                    </div>
                    <p className="text-muted font-body text-xs leading-relaxed line-clamp-3">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={`/case-studies/${current.id}`}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-blue-accent hover:bg-blue-dark text-always-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(61,126,255,0.55)] hover:scale-105 active:scale-95"
                >
                  Read Full Case Study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    className="transition-transform duration-200 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                {/* <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3.5 border border-white/20 hover:border-blue-accent/50 text-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:bg-card-hover"
                >
                  Request Similar Result
                </Link> */}
              </div>
            </div>

            {/* Carousel nav - dots + arrows */}
            {featured.length > 1 && (
              <div style={fade(0.68)} className="flex items-center gap-4 mt-10">
                {/* Prev */}
                <button
                  onClick={() => advance(-1)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(61,126,255,0.12)',
                    border:     '1px solid rgba(61,126,255,0.35)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#3d7eff" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {featured.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setTransitioning(true); setTimeout(() => { setActiveIdx(i); setTransitioning(false); }, 320); }}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width:      i === activeIdx ? 28 : 8,
                        height:     8,
                        background: i === activeIdx ? '#3d7eff' : 'rgba(255,255,255,0.2)',
                      }}
                    />
                  ))}
                </div>

                {/* Next */}
                <button
                  onClick={() => advance(1)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 bg-blue-accent hover:bg-blue-dark"
                  style={{ boxShadow: '0 0 16px rgba(61,126,255,0.4)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="#ffffff" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>

                {/* Progress bar */}
                <div className="flex-1 h-0.5 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div
                    className="h-full rounded-full bg-blue-accent"
                    style={{
                      width:      `${((activeIdx + 1) / featured.length) * 100}%`,
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT - hero image + metric cards ── */}
          <div
            className="order-1 lg:order-2 relative flex items-center justify-center lg:justify-end"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? 'translateX(0)' : 'translateX(50px)',
              transition: 'opacity 0.9s cubic-bezier(.4,0,.2,1) 0.45s, transform 0.9s cubic-bezier(.4,0,.2,1) 0.45s',
            }}
          >
            <div className="relative w-full max-w-[540px]" style={slideStyle}>
  {/* Fixed height container - forces identical image size regardless of source dimensions */}
  <div className="w-full h-[380px] lg:h-[420px] rounded-2xl overflow-hidden">
    <img
      src={current.heroImage}
      alt={current.title}
      className="w-full h-full object-cover block"
      draggable={false}
    />
  </div>

              {/* Metric overlays */}
              <div className="absolute bottom-2 left-1 flex flex-col gap-3">
                {current.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="px-5 py-3 rounded-xl border border-white/10"
                    style={{ background: 'rgba(15,18,30,0.95)', backdropFilter: 'blur(12px)' }}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="#3d7eff" strokeWidth="2" strokeLinecap="round">
                        {m.icon === 'chart'
                          ? <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>
                          : <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        }
                      </svg>
                      <span className="font-display font-extrabold text-xl text-blue-accent">
                        {m.value}
                      </span>
                    </div>
                    <p className="text-muted font-body text-[10px] tracking-widest uppercase">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
    </section>
  );
};

// ─── CARD ─────────────────────────────────────────────────────────────────────
const CaseCard = ({ cs, index, inView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/case-studies/${cs.id}`}
      className="light-card group block rounded-2xl overflow-hidden border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:  'rgba(20,24,38,0.85)',
        borderColor: hovered ? 'rgba(61,126,255,0.35)' : 'rgba(255,255,255,0.08)',
        boxShadow:   hovered
          ? '0 16px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(61,126,255,0.15)'
          : 'none',
        opacity:     inView ? 1 : 0,
        transform:   inView
          ? hovered ? 'translateY(-6px)' : 'translateY(0)'
          : 'translateY(45px)',
        transition:  `opacity 0.65s cubic-bezier(.4,0,.2,1) ${0.06 + index * 0.07}s,
                      transform 0.4s cubic-bezier(.4,0,.2,1),
                      box-shadow 0.3s ease,
                      border-color 0.3s ease`,
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={cs.cardImage}
          alt={cs.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-body font-semibold tracking-wider uppercase"
            style={{
              background:    'rgba(10,14,26,0.85)',
              backdropFilter:'blur(8px)',
              color:         'rgba(255,255,255,0.85)',
              border:        '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {cs.category}
          </span>
        </div>
        {/* Arrow */}
        <div
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: 'rgba(10,14,26,0.85)', opacity: hovered ? 1 : 0.6 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </div>
        {/* Featured badge */}
        {cs.featured && (
          <div className="absolute bottom-3 right-3">
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-display font-bold"
              style={{
                background: 'rgba(61,126,255,0.85)',
                color:      '#fff',
              }}
            >
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-body font-semibold tracking-widest uppercase mb-2"
          style={{ color: '#3d7eff' }}>
          {cs.industry}
        </p>
        <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-blue-light transition-colors duration-200 leading-snug">
          {cs.title}
        </h3>
        <div className="pt-4 border-t border-white/6">
          <p className="text-muted/60 font-body text-xs mb-1">Key Outcome:</p>
          <p className="text-white/60 font-body text-sm leading-relaxed line-clamp-2">
            {cs.result}
          </p>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="h-0.5 transition-all duration-300"
        style={{
          background: 'linear-gradient(90deg, transparent, #3d7eff, transparent)',
          opacity: hovered ? 1 : 0,
        }}
      />
    </Link>
  );
};

// ─── SUCCESS LIBRARY - ALL studies, newest first ──────────────────────────────
const LibrarySection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [titleRef, titleInView] = useInView();
  const [gridRef,  gridInView]  = useInView();

  // All studies sorted newest → oldest, then filtered by category
  const sorted = [...caseStudies].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filtered = activeFilter === 'All'
    ? sorted
    : sorted.filter((c) => c.category === activeFilter);

  const shown = filtered.slice(0, visibleCount);

  return (
    <section className="relative py-20 lg:py-22 bg-primary overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-accent/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div
          ref={titleRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
          style={{
            opacity:   titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.75s cubic-bezier(.4,0,.2,1)',
          }}
        >
          <div>
            <h2 className="font-display font-bold text-4xl text-white mb-2">
              Success Library
            </h2>
            <p className="text-muted font-body text-base">
              Browse our full track record across industries - newest first.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveFilter(cat); setVisibleCount(6); }}
                className="px-4 py-2 rounded-full text-xs font-body font-semibold transition-all duration-250"
                style={{
                  background:  activeFilter === cat ? '#3d7eff' : 'rgba(255,255,255,0.05)',
                  color:       activeFilter === cat ? '#fff' : 'rgba(255,255,255,0.6)',
                  border:      activeFilter === cat ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
                  transform:   activeFilter === cat ? 'scale(1.04)' : 'scale(1)',
                  boxShadow:   activeFilter === cat ? '0 0 16px rgba(61,126,255,0.4)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {shown.map((cs, i) => (
            <CaseCard key={cs.id} cs={cs} index={i} inView={gridInView} />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div
            className="flex justify-center"
            style={{
              opacity:    gridInView ? 1 : 0,
              transform:  gridInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(.4,0,.2,1) 0.4s',
            }}
          >
            <button
              onClick={() => setVisibleCount((v) => v + 6)}
              className="group inline-flex items-center gap-2 px-8 py-3.5 border border-border hover:border-blue-accent/40 text-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:bg-card-hover hover:scale-105"
            >
              Load More Results
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                className="transition-transform duration-200 group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// ─── CTA ──────────────────────────────────────────────────────────────────────
const CTASection = () => {
  const [ref, inView] = useInView();
  const { openModal } = useContactModal();

  return (
    <section className="relative py-16 lg:py-24 bg-secondary overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-accent/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="dark-section relative rounded-3xl overflow-hidden px-8 pt-16 pb-12 sm:px-14 sm:pt-20"
          style={{
            background:  'linear-gradient(135deg, #1E3A8A 0%, #1E1B4B 100%)',
            opacity:     inView ? 1 : 0,
            transform:   inView ? 'scale(1)' : 'scale(0.96)',
            transition:  'opacity 0.85s cubic-bezier(.4,0,.2,1), transform 0.85s cubic-bezier(.4,0,.2,1)',
          }}
        >
          <div className="absolute top-[-20%] right-[-5%] w-72 h-72 rounded-full bg-white/5 blur-[70px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-5%] w-64 h-64 rounded-full bg-black/15 blur-[60px] pointer-events-none" />

          <div className="relative z-10 text-center">
            <h2
              className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-5 max-w-2xl mx-auto"
              style={{
                opacity:    inView ? 1 : 0,
                transform:  inView ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.75s cubic-bezier(.4,0,.2,1) 0.2s',
              }}
            >
              Ready to see these results in{' '}
              <span className="italic text-blue-gradient">your</span> business?
            </h2>
            <p
              className="text-white/70 font-body text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ opacity: inView ? 1 : 0, transition: 'all 0.75s cubic-bezier(.4,0,.2,1) 0.35s' }}
            >
              We don't just consult - we execute. Partner with Acespire to turn your enterprise
              challenges into measurable competitive advantages.
            </p>
            <div
              className="flex flex-wrap items-center justify-center gap-4 mb-10"
              style={{ opacity: inView ? 1 : 0, transition: 'all 0.75s cubic-bezier(.4,0,.2,1) 0.5s' }}
            >
             <button onClick={() => openModal({ enquiryType: 'business'})}
                className="inline-flex items-center px-8 py-3.5 bg-blue-accent hover:bg-blue-dark text-white text-sm font-display font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(61,126,255,0.5)] active:scale-95"
              >
                Start Your Transformation
              </button>
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-display font-semibold transition-all duration-200"
              >
                Explore Our Products
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── PAGE ASSEMBLY ─────────────────────────────────────────────────────────────
const CaseStudiesPage = () => {
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
        className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full"
        style={{
          background:  'radial-gradient(circle, rgba(61,126,255,0.04) 0%, transparent 70%)',
          transform:   'translate(-50%, -50%)',
          transition:  'left 0.18s ease-out, top 0.18s ease-out',
        }}
      />
      <HeroSection />
      <LibrarySection />
      <CTASection />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;