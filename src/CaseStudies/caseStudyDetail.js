import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import useInView from '../hooks/useInView';
import Footer from '../components/Footer';
import caseStudies, { categories } from './caseStudiesData';
import { useTheme } from '../hooks/useTheme';
import Chatbot from '../Home/Chatbot';

// ─── Content formatter ────────────────────────────────────────────────────────
const formatContent = (content) => {
  if (!content) return [];

  const specialSections = ['Benefits', 'Solutions Implemented', 'Challenges'];
  let currentMainSection = null;

  return content
    .split('\n')
    .map((line, index) => {
      const clean = line.trim();
      if (!clean) return null;

      // ── Section headers ──
      if (clean.match(/^[A-Z][a-zA-Z\s]{3,}$/) && !clean.endsWith('.')) {
        currentMainSection = clean;
        return (
          <h2
            key={`h-${index}`}
            className="font-display font-bold text-2xl mt-14 mb-6 pb-3"
            style={{
              color: 'var(--color-text-heading)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {clean}
          </h2>
        );
      }

      // ── Numbered items - FIX 2: always inline "N. Title: desc" ──
      if (clean.match(/^\d+\.\s[A-Z]/)) {
        const dotIdx = clean.indexOf('. ');
        const num  = clean.slice(0, dotIdx);
        const rest = clean.slice(dotIdx + 2);
        const colonIdx = rest.indexOf(':');
        const hasColon = colonIdx > 0 && colonIdx < 80;

        if (hasColon) {
          // "N. Title: description" - all on one line
          const title = rest.slice(0, colonIdx).trim();
          const desc  = rest.slice(colonIdx + 1).trim();
          return (
            <p
              key={`n-${index}`}
              className="font-body text-base lg:text-lg leading-relaxed mb-5"
              style={{ color: 'var(--color-muted)' }}
            >
              <span
                className="font-bold"
                style={{ color: 'var(--color-text-heading)' }}
              >
                {num}. {title}:
              </span>{' '}
              {desc}
            </p>
          );
        }

        // No colon - numbered point without description
        return (
          <p
            key={`n-${index}`}
            className="font-body text-base lg:text-lg leading-relaxed mb-5"
            style={{ color: 'var(--color-muted)' }}
          >
            <span
              className="font-bold"
              style={{ color: 'var(--color-text-heading)' }}
            >
              {num}.
            </span>{' '}
            {rest}
          </p>
        );
      }

      // ── Sub-items (a., b., c.) ──
      if (clean.match(/^[a-z]\.\s/)) {
        return (
          <p
            key={`sub-${index}`}
            className="font-body text-base leading-relaxed mb-4 ml-6"
            style={{ color: 'var(--color-muted)' }}
          >
            {clean}
          </p>
        );
      }

      // ── Regular paragraph ──
      return (
        <p
          key={`p-${index}`}
          className="font-body text-base lg:text-lg leading-relaxed mb-6"
          style={{ color: 'var(--color-muted)' }}
        >
          {clean}
        </p>
      );
    })
    .filter(Boolean);
};

// ─── CATEGORY CAROUSEL with auto-advance ─────────────────────────────────────
const CategoryCarousel = ({ label, items, currentId }) => {
// REPLACE with:
const filtered = items.filter((c) => c.id !== currentId);
const [idx, setIdx] = useState(0);

// Reset idx whenever currentId changes or filtered length changes
useEffect(() => {
  setIdx(0);
}, [currentId, filtered.length]);

// Guard: if idx is out of bounds, clamp it
const safeIdx = Math.min(idx, Math.max(filtered.length - 1, 0));
const cs = filtered[safeIdx];

  const next = useCallback(
    () => setIdx((i) => (i + 1) % filtered.length),
    [filtered.length]
  );
  const prev = () => setIdx((i) => (i - 1 + filtered.length) % filtered.length);

  // FIX 3 - auto-advance every 5 seconds
  useEffect(() => {
    if (filtered.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [filtered.length, next]);

  if (filtered.length === 0) return null;



  return (
    <div className="mb-8">
      {/* Category label */}
      <p
        className="font-display font-bold text-xs tracking-widest uppercase mb-3"
        style={{ color: '#3d7eff' }}
      >
        {label}
      </p>

      {/* Card */}
      <div
        className="light-card rounded-xl overflow-hidden border transition-all duration-300"
        style={{
          background: 'rgba(24,28,42,0.7)',
          borderColor: 'rgba(255,255,255,0.07)',
        }}
      >
        {/* Thumbnail */}
        <div className="w-full overflow-hidden" style={{ height: 140 }}>
                        <Link
              to={`/case-studies/${cs.id}`}>
          <img
            src={cs.cardImage}
            alt={cs.title}
            className="w-full h-full object-cover transition-transform duration-500"
            draggable={false}
          />
          </Link>
          
        </div>

        {/* Text */}
        <div className="p-4">
              <Link
              to={`/case-studies/${cs.id}`}>
          <p
            className="font-body text-xs mb-1.5"
            style={{ color: 'var(--color-muted)' }}
          >
            {cs.category}
            <span className="mx-1.5" style={{ color: '#3d7eff' }}>•</span>
            {new Date(cs.date).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric',
            })}
          </p>

          <h4
            className="font-display font-semibold text-sm leading-snug mb-3"
            style={{ color: 'var(--color-text-heading)' }}
          >
            {cs.title}
          </h4>

          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <Link
              to={`/case-studies/${cs.id}`}
              className="font-body text-xs font-semibold tracking-wide hover:text-blue-light transition-colors"
              style={{ color: '#3d7eff' }}
            >
              READ MORE →
            </Link>

            {filtered.length > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prev}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(61,126,255,0.15)',
                    border: '1px solid rgba(61,126,255,0.3)',
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="#3d7eff" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>

                {/* Dot indicators */}
                <div className="flex gap-1">
                  {filtered.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
  width:      i === safeIdx ? 14 : 6,
  height:     6,
  background: i === safeIdx ? '#3d7eff' : 'rgba(255,255,255,0.2)',
}}

                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(61,126,255,0.15)',
                    border: '1px solid rgba(61,126,255,0.3)',
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="#3d7eff" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
const CaseStudyDetail = () => {
  const { slug } = useParams();
  const cs = caseStudies.find((c) => c.id === slug);
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
  }, [slug]);

  if (!cs) return <Navigate to="/case-studies" replace />;

  return (
    <div className="relative bg-primary min-h-screen">
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(61,126,255,0.04) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.18s ease-out, top 0.18s ease-out',
        }}
      />
      <HeroBlock cs={cs} />
      <MainContent cs={cs} />
      <Footer />
    </div>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const HeroBlock = ({ cs }) => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <>
      {/* ── Section 1: Image only - no text on top of image ── */}
      <section
        className="relative pt-16"
        style={{ background: '#000' }}
      >
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.2s' }}>
          {/* Desktop */}
          <div className="hidden sm:block w-full overflow-hidden" style={{ height: '72vh' }}>
            <img
              src={cs.heroImage}
              alt={cs.title}
              className="w-full h-full object-cover object-center block"
              draggable={false}
            />
          </div>
          {/* Mobile square */}
          <div className="sm:hidden w-full overflow-hidden" style={{ aspectRatio: '1/1' }}>
            <img
              src={cs.heroImage}
              alt={cs.title}
              className="w-full h-full object-cover object-center block"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* ── Section 2: Title block - completely separate, always correct bg ── */}
      <section
        style={{
          background:   isDark ? '#13161f' : '#ffffff',
          borderBottom: isDark
            ? '1px solid rgba(61,126,255,0.15)'
            : '1px solid rgba(61,126,255,0.2)',
        }}
      >
        <div className="w-full px-4 sm:px-10 lg:px-16 py-8">

          {/* Breadcrumb */}
          <div style={fade(0.1)} className="flex items-center gap-2 text-xs mb-5">
            <Link
              to="/case-studies"
              className="hover:text-blue-accent transition-colors font-body"
              style={{ color: 'var(--color-muted)' }}
            >
              Case Studies
            </Link>
            <span style={{ color: 'var(--color-muted)' }}>/</span>
            <span
              className="font-body truncate max-w-[200px] sm:max-w-lg"
              style={{ color: 'var(--color-muted)', opacity: 0.6 }}
            >
              {cs.title}
            </span>
          </div>

          {/* Badges */}
          <div style={fade(0.2)} className="flex flex-wrap gap-2 mb-5">
            {[cs.category, cs.industry].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-xs font-body font-semibold tracking-wide"
                style={{
                  border:     '1px solid rgba(61,126,255,0.35)',
                  background: 'rgba(61,126,255,0.1)',
                  color:      '#3d7eff',
                }}
              >
                {tag}
              </span>
            ))}
            <span
              className="px-3.5 py-1.5 rounded-full text-xs font-body"
              style={{
                border:     isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61,126,255,0.2)',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(61,126,255,0.06)',
                color:      'var(--color-muted)',
              }}
            >
              {new Date(cs.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              ...fade(0.3),
              color: isDark ? '#ffffff' : '#0d0f16',
            }}
            className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl leading-tight"
          >
            {cs.title}
          </h1>
        </div>
      </section>
    </>
  );
};

// ─── MAIN CONTENT + SIDEBAR ───────────────────────────────────────────────────
const MainContent = ({ cs }) => {
  const [ref, inView] = useInView();

  return (
    <section className="relative py-10 bg-primary overflow-hidden">
      <div
        ref={ref}
        className="w-full px-4 sm:px-10 lg:px-16"
      >
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 items-start">

          {/* ── LEFT: article ── */}
          <div
            style={{
              opacity:   inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(.4,0,.2,1)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
borderRight: '1px solid rgba(255,255,255,0.08)',
borderBottom: '1px solid rgba(255,255,255,0.08)',
borderLeft: '1px solid rgba(255,255,255,0.08)',
padding: '24px',
borderTopRightRadius: '16px',
borderBottomRightRadius: '16px',
borderBottomLeftRadius: '16px',
borderTopLeftRadius: '16px',
              
            }}
          >
            {/* Client */}
            <p
              className="font-body text-sm mb-8 pb-5"
              style={{
                color: 'var(--color-muted)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              Client:{' '}
              <span
                className="font-semibold"
                style={{ color: 'var(--color-text-heading)' }}
              >
                {cs.client}
              </span>
            </p>

            {/* Article body */}
            <div>{formatContent(cs.content)}</div>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2 mt-12 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-body"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'var(--color-muted)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Back */}
            <div className="mt-8">
              <Link
                to="/case-studies"
                className="group inline-flex items-center gap-2 text-sm font-body text-blue-accent hover:text-blue-light transition-colors duration-200"
              >
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                >
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Back to Case Studies
              </Link>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside
            className="lg:sticky lg:top-24 space-y-8"
            style={{
              opacity:   inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(20px)',
              transition: 'all 0.8s cubic-bezier(.4,0,.2,1) 0.2s',
            }}
          >
            <h2
              className="font-display font-semibold text-lg mb-6 pb-4"
              style={{
                color: 'var(--color-text-heading)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Recent Projects
            </h2>

            {/* One auto-carousel per category */}
            {['Supply Chain', 'Digital Transformation', 'AI & Automation', 'Cloud Tech'].map((cat) => {
              const catItems = caseStudies.filter(
                (c) => c.id !== cs.id && c.category === cat
              );
              if (catItems.length === 0) return null;
              return (
                <CategoryCarousel
                  key={cat}
                  label={cat}
                  items={catItems}
                  currentId={cs.id}
                />
              );
            })}

            {/* CTA */}
            <div
              className="mt-4 p-5 rounded-2xl text-center dark-section"
              style={{
                background: 'linear-gradient(135deg, #1E3A8A 0%, #1E1B4B 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <p className="font-display font-bold text-white text-sm mb-1.5">
                Want similar results?
              </p>
              <p
                className="font-body text-xs mb-4"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                Partner with Acespire to transform your operations.
              </p>
              <Link
                to="/contact"
                className="block w-full py-2.5 bg-blue-accent hover:bg-blue-dark text-white text-xs font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_16px_rgba(61,126,255,0.5)]"
              >
                Request a Consultation
              </Link>
            </div>
          </aside>
        </div>
      </div>
      <Chatbot />
    </section>
  );
};

export default CaseStudyDetail;