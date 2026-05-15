import React, { useState } from 'react';
import useInView from '../hooks/useInView';
import { useTheme } from '../hooks/useTheme';

const REASONS = [
  {
    num: '01',
    title: 'Deep Domain Expertise',
    desc: 'With over 40 years of combined experience across IT, supply chain, and digital transformation, we bring industry knowledge that goes far beyond surface-level consulting.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Consulting Backed by Proprietary Products',
    desc: 'Uniquely positioned as both a consulting firm and product innovator - strategic guidance supported by purpose-built tools engineered from real-world experience.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4M7 8l2 2 4-4 2 2"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'End-to-End IT Capabilities',
    desc: 'From cloud strategy and data integration to AI-powered automation and supply chain optimization - Acespire delivers the full spectrum of enterprise IT under one roof.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'A Partner, Not Just a Vendor',
    desc: 'Every engagement is built on trust, transparency, and long-term commitment. We measure success by the outcomes we create for the businesses that choose to work with us.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
];

const ReasonCard = ({ reason, index, inView, isDark }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start gap-4 rounded-xl p-5"
      style={{
        background: hovered
          ? isDark ? 'rgba(61,126,255,0.07)' : 'rgba(61,126,255,0.05)'
          : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.80)',
        border: `1px solid ${
          hovered
            ? isDark ? 'rgba(61,126,255,0.30)' : 'rgba(61,126,255,0.28)'
            : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(61,126,255,0.12)'
        }`,
        boxShadow: hovered
          ? isDark
            ? '0 8px 28px rgba(0,0,0,0.35)'
            : '0 8px 24px rgba(61,126,255,0.10)'
          : 'none',
        opacity:   inView ? 1 : 0,
        transform: inView
          ? hovered ? 'translateY(-3px)' : 'translateY(0)'
          : 'translateY(28px)',
        transition: `
          opacity    0.65s cubic-bezier(.4,0,.2,1) ${0.1 + index * 0.1}s,
          transform  0.3s ease,
          background 0.25s ease,
          border-color 0.25s ease,
          box-shadow 0.25s ease
        `,
      }}
    >
      {/* Left: number + icon stacked */}
      <div className="shrink-0 flex flex-col items-center gap-2 pt-0.5">
        {/* Step number */}
        <span
          className="font-display font-bold text-[10px] tracking-[0.12em]"
          style={{ color: isDark ? 'rgba(61,126,255,0.7)' : 'rgba(37,99,235,0.65)' }}
        >
          {reason.num}
        </span>
        {/* Icon circle */}
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-250"
          style={{
            background: hovered
              ? isDark ? 'rgba(61,126,255,0.20)' : 'rgba(61,126,255,0.12)'
              : isDark ? 'rgba(61,126,255,0.10)' : 'rgba(61,126,255,0.08)',
            border: `1px solid ${isDark ? 'rgba(61,126,255,0.22)' : 'rgba(61,126,255,0.18)'}`,
            color: '#3d7eff',
          }}
        >
          {reason.icon}
        </div>
      </div>

      {/* Right: text */}
      <div className="min-w-0">
        <h3
          className="font-display font-bold text-sm sm:text-[15px] leading-snug mb-2 transition-colors duration-250"
          style={{ color: hovered ? '#3d7eff' : 'var(--color-text-heading)' }}
        >
          {reason.title}
        </h3>
        <p
          className="font-body text-xs sm:text-sm leading-relaxed"
          style={{ color: 'var(--color-muted)' }}
        >
          {reason.desc}
        </p>
      </div>
    </div>
  );
};

const WhyWorkWithUsSection = () => {
  const [titleRef, titleInView] = useInView();
  const [cardsRef, cardsInView] = useInView();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: 'var(--color-secondary)' }}
    >
      {/* Ambient blobs */}
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-blue-accent/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-accent/3 rounded-full blur-[90px] pointer-events-none" />

      {/* Top divider */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.20), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_1.55fr] lg:gap-16 xl:gap-20 items-start">

          {/* ── Left: sticky header column ── */}
          <div
            ref={titleRef}
            className="mb-10 lg:mb-0 lg:sticky lg:top-32"
            style={{
              opacity:    titleInView ? 1 : 0,
              transform:  titleInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.75s ease, transform 0.75s ease',
            }}
          >
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-5 text-[10px] font-body font-semibold tracking-widest uppercase"
              style={{
                background:  isDark ? 'rgba(61,126,255,0.09)' : 'rgba(61,126,255,0.06)',
                borderColor: isDark ? 'rgba(61,126,255,0.28)' : 'rgba(61,126,255,0.20)',
                color:       isDark ? '#60b4ff' : '#2563eb',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-accent animate-pulse" />
              Our Commitment
            </div>

            {/* Headline */}
            <h2
              className="font-display font-extrabold leading-[1.08] tracking-tight mb-5"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                color: 'var(--color-text-heading)',
              }}
            >
              Why Work{' '}
              <span className="text-blue-gradient">With Us?</span>
            </h2>

            <p
              className="font-body text-sm sm:text-base leading-relaxed mb-8 max-w-sm"
              style={{ color: 'var(--color-muted)' }}
            >
              Four pillars that define how we show up for every client, every engagement, every time.
            </p>

            {/* Mini stats */}
            {/* <div className="grid grid-cols-2 gap-4">
              {[
                { value: '40+', label: 'Years Experience' },
                { value: '150+', label: 'Enterprise Clients' },
                { value: '7',    label: 'Own Products' },
                { value: '98%',  label: 'Client Retention' },
              ].map((s) => (
                <div key={s.label}
                  className="rounded-lg px-4 py-3 text-center"
                  style={{
                    background:  isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.70)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(61,126,255,0.12)'}`,
                  }}
                >
                  <div
                    className="font-display font-extrabold text-xl mb-0.5"
                    style={{ color: isDark ? '#93c5fd' : '#1d4ed8' }}
                  >
                    {s.value}
                  </div>
                  <div className="font-body text-[10px] tracking-wide"
                    style={{ color: 'var(--color-muted)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* ── Right: cards column ── */}
          <div ref={cardsRef} className="flex flex-col gap-3">
            {REASONS.map((reason, i) => (
              <ReasonCard
                key={reason.num}
                reason={reason}
                index={i}
                inView={cardsInView}
                isDark={isDark}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUsSection;