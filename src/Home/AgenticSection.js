import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';

/*
  Place these images in your /public folder:
    /Nextlead.png    — used for all 3 carousel cards (swap per product if you have them)
    /HireOn.png      — optional per-product image
    /DigiMark.png    — optional per-product image
*/
const agents = [
   {
    id: 'hireon', tag: 'Agentic AI', name: 'HireOn AI', subtitle: 'Intelligent Recruitment Hub',
    href: '/products/hireon', color: '#a78bfa',
    image: '/Nextlead.png',          // swap to /HireOn.png when available
    features: ['AI-powered candidate screening', 'Automated interview scheduling', 'Skills gap analysis', 'Onboarding workflow automation'],
  },
  {
    id: 'nexlead', tag: 'Agentic AI', name: 'NexLead AI', subtitle: 'Automated Lead Interaction',
    href: '/products/nextlead', color: '#3d7eff',
    image: '/Nextlead.png',
    features: ['High-intent lead identification', 'Conversational sales intelligence', 'Revenue leakage detection', 'Autonomous CRM management'],
  },
 
  {
    id: 'digimark', tag: 'Product Intelligence', name: 'DigiMark', subtitle: 'Digital Product Authentication',
    href: '/products/digimark', color: '#34d399',
    image: '/Nextlead.png',          // swap to /DigiMark.png when available
    features: ['Blockchain-based product IDs', 'QR code instant verification', 'Supply chain transparency', 'Anti-counterfeiting protection'],
  },
   {
    id: 'meeting-manager', tag: 'Agentic AI', name: 'Meeting Manager', subtitle: 'Intelligent Meeting Automation',
    href: '/products/meeting-manager', color: '#fb923c', image: '/Nextlead.png',
    features: ['Automated meeting summaries', 'Action item extraction', 'Decision tracking', 'Follow-up workflow automation'],
  },
  {
    id: 'invoice-agent', tag: 'Agentic AI', name: 'Invoice Agent', subtitle: 'Intelligent Invoice Processing',
    href: '/products/invoice-processing-agent', color: '#60b4ff', image: '/Nextlead.png',
    features: ['Intelligent data extraction', 'Automated invoice validation', 'ERP system integration', 'Exception handling & alerts'],
  },
];

const AgenticSection = () => {
  const [current,   setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);
  const [ref, inView] = useInView();

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((idx + agents.length) % agents.length);
    setTimeout(() => setAnimating(false), 400);
  }, [animating]);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(t);
  }, [current, inView, goTo]);

  const agent = agents[current];

  return (
    <section className="relative py-24 lg:py-32 bg-primary overflow-hidden">
      {/* Subtle ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="text-center mb-16"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-muted font-body mb-5">
            Our AI Suite
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
            The Era of Agentic Intelligence
          </h2>
          <p className="text-muted font-body text-base max-w-xl mx-auto leading-relaxed">
           Introducing your new digital workforce. Our purpose-built AI agents handle lead generation, hiring workflows, and content creation - autonomously and at scale - delivering measurable results without adding to your team's workload.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative flex items-center gap-4"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease 0.3s' }}
        >
          {/* Prev */}
          <button
            onClick={() => goTo(current - 1)}
            className="shrink-0 w-11 h-11 rounded-full border border-border bg-card hover:bg-card-hover hover:border-blue-accent/40 flex items-center justify-center text-muted hover:text-white transition-all duration-200 z-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Card */}
          <div
            className="light-card flex-1 rounded-2xl border overflow-hidden"
            style={{
              background: 'rgba(18,22,36,0.8)',
              borderColor: `${agent.color}25`,
              opacity:   animating ? 0 : 1,
              transform: animating ? 'scale(0.97)' : 'scale(1)',
              transition: 'opacity 0.3s ease, transform 0.3s ease, border-color 0.4s ease',
            }}
          >
           <div className="grid sm:grid-cols-2 gap-0 items-stretch">

              {/* Image panel — Nextlead.png (or per-agent image) */}
              {/* Image panel — full height, no crop, no blank space */}
<div
  className="relative overflow-hidden border-b sm:border-b-0 sm:border-r border-white/5"
  style={{ background: 'rgba(10,14,26,0.95)' }}
>
  {/* Coloured tint glow */}
  <div
    className="absolute inset-0 pointer-events-none z-10"
    style={{
      background: `radial-gradient(ellipse at 30% 50%, ${agent.color}12 0%, transparent 60%)`,
    }}
  />
  <img
    src={agent.image}
    alt={agent.name}
    className="w-full h-full object-contain object-center transition-transform duration-700 hover:scale-[1.03]"
    draggable={false}
    style={{ display: 'block' }}
  />
</div>

              {/* Content panel */}
              <div className="p-7 sm:p-9 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${agent.color}20`, color: agent.color }}
                  >
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="8" cy="8" r="3" />
                      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M3.5 12.5l1.4-1.4M11.1 4.9l1.4-1.4" />
                    </svg>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-body border"
                    style={{ borderColor: `${agent.color}30`, color: agent.color, background: `${agent.color}10` }}
                  >
                    {agent.tag}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-1">{agent.name}</h3>
                <p className="text-muted font-body text-sm mb-6">{agent.subtitle}</p>

                <ul className="space-y-2.5 mb-8">
                  {agent.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm font-body text-white/80">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="2"
                        strokeLinecap="round" stroke={agent.color} className="shrink-0">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to={agent.href}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-display font-semibold text-always-white transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${agent.color}, ${agent.color}bb)`, boxShadow: `0 4px 20px ${agent.color}30` }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={() => goTo(current + 1)}
            className="shrink-0 w-11 h-11 rounded-full bg-blue-accent hover:bg-blue-dark flex items-center justify-center text-white transition-all duration-200 hover:scale-105 shadow-[0_0_20px_rgba(61,126,255,0.4)] z-10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {agents.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === current ? 28 : 8, height: 8, background: i === current ? '#3d7eff' : 'rgba(255,255,255,0.15)' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgenticSection;
