import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import { useTheme } from '../hooks/useTheme';
import caseStudies from '../CaseStudies/caseStudiesData';

// ─── Per-card accent colours ───────────────────────────────────────────────────
const ACCENTS = ['#3d7eff', '#a78bfa', '#34d399', '#fb923c', '#60b4ff'];

const CaseStudiesSection = () => {
  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const perPage    = 3;
  const totalPages = Math.ceil(caseStudies.length / perPage);
  const visible    = caseStudies.slice(page * perPage, page * perPage + perPage);

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'var(--color-secondary)' }}
    >
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-accent/4 rounded-full blur-[100px] pointer-events-none"/>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}
        >
          <div>
            <h2
              className="font-display font-extrabold text-4xl sm:text-5xl mb-3"
              style={{ color: 'var(--color-text-heading)' }}
            >
              Success Measured in Impact
            </h2>
            <p className="font-body text-base" style={{ color: 'var(--color-muted)' }}>
              Quantifiable results from our global engagements.
            </p>
          </div>
          <Link
            to="/case-studies"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-body transition-all duration-200 w-fit hover:border-blue-accent/40 hover:scale-105"
            style={{
              borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(61,126,255,0.25)',
              color:       'var(--color-muted)',
            }}
          >
            Explore All Case Studies
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </Link>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visible.map((cs, i) => {
            const accent     = ACCENTS[(page * perPage + i) % ACCENTS.length];
            const globalIdx  = page * perPage + i;

            return (
              <CaseCard
                key={cs.id}
                cs={cs}
                accent={accent}
                inView={inView}
                index={i}
                isDark={isDark}
              />
            );
          })}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 hover:border-blue-accent/40"
              style={{
                borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(61,126,255,0.25)',
                color:       'var(--color-muted)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, pi) => (
                <button
                  key={pi}
                  onClick={() => setPage(pi)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:      pi === page ? 24 : 8,
                    height:     8,
                    background: pi === page
                      ? '#3d7eff'
                      : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(61,126,255,0.25)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full bg-blue-accent flex items-center justify-center text-white hover:bg-blue-dark transition-all disabled:opacity-30"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// ─── INDIVIDUAL CARD ───────────────────────────────────────────────────────────
const CaseCard = ({ cs, accent, inView, index, isDark }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/case-studies/${cs.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block rounded-2xl overflow-hidden border transition-all duration-300"
      style={{
        background:  isDark ? 'rgba(24,28,42,0.7)' : '#ffffff',
        borderColor: hovered
          ? `${accent}50`
          : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(61,126,255,0.2)',
        boxShadow: hovered
          ? isDark ? '0 16px 48px rgba(0,0,0,0.5)' : '0 16px 40px rgba(61,126,255,0.12)'
          : 'none',
        transform: inView
          ? hovered ? 'translateY(-5px)' : 'translateY(0)'
          : 'translateY(40px)',
        opacity:   inView ? 1 : 0,
        transition: `opacity 0.6s ease ${0.1 + index * 0.1}s,
                     transform 0.3s ease,
                     box-shadow 0.3s ease,
                     border-color 0.3s ease`,
      }}
    >
      {/* ── Image / thumbnail ── */}
      <div className="h-44 relative overflow-hidden">
        <img
          src={cs.cardImage}
          alt={cs.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }}
        />
        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-body font-semibold"
            style={{
              background: `${accent}25`,
              color:       accent,
              border:      `1px solid ${accent}40`,
            }}
          >
            {cs.industry}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-6">
        {/* Date */}
        <p
          className="font-body text-xs mb-2"
          style={{ color: 'var(--color-muted)', opacity: 0.6 }}
        >
          {new Date(cs.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
        </p>

        {/* Title */}
        <h3
          className="font-display font-bold text-lg mb-4 leading-snug transition-colors duration-200"
          style={{ color: hovered ? accent : 'var(--color-text-heading)' }}
        >
          {cs.title}
        </h3>

        {/* Problem / Solution */}
        <div className="space-y-3 mb-5">
          <div>
            <p
              className="text-xs font-body uppercase tracking-wider mb-1"
              style={{ color: 'var(--color-muted)', opacity: 0.55 }}
            >
              Problem
            </p>
            <p
              className="text-sm font-body leading-relaxed"
              style={{ color: 'var(--color-muted)', fontStyle: 'italic' }}
            >
              "{cs.problem}"
            </p>
          </div>
          <div>
            <p
              className="text-xs font-body uppercase tracking-wider mb-1"
              style={{ color: 'var(--color-muted)', opacity: 0.55 }}
            >
              Solution
            </p>
            <p
              className="text-sm font-body leading-relaxed line-clamp-2"
              style={{ color: 'var(--color-muted)' }}
            >
              {cs.solution}
            </p>
          </div>
        </div>

        {/* Result */}
        {/* <div
          className="flex items-center gap-2 pt-4"
          style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(61,126,255,0.1)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
          </svg>
          <span
            className="font-display font-bold text-xs tracking-wider"
            style={{ color: accent }}
          >
            {cs.result}
          </span>
        </div> */}
      </div>

      {/* Bottom accent on hover */}
      <div
        className="h-0.5 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </Link>
  );
};

export default CaseStudiesSection;