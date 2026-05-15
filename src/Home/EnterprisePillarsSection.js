import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';

const pillars = [
  {
    icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/></svg>,
    title: 'Digital Product Passport',
    description: 'Secure digital identities for physical products - ensuring traceability, compliance, and full visibility from production to end consumer.',
    // href: '/products/digimark',
    accent: '#3d7eff',
  },
  {
    icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>,
    title: 'Supply Chain Excellence',
    description: 'Intelligent supply chain systems delivering real-time visibility and operational efficiency.Transforming complex logistics into streamlined, data-driven networks.',
    // href: '/services/supply-chain',
    accent: '#4fc3f7',
  },
  {
    icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/><path d="M15 15l2 2 4-4"/></svg>,
    title: 'Data Integration Hub',
    description: 'Unifying disconnected systems into a single, cohesive data platform.Eliminating silos and enabling confident, insight-led decision-making organization-wide.',
    // href: '/services/data-integration',
    accent: '#a78bfa',
  },
  {
    icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
    title: 'Cloud Strategy',
    description: 'Scalable cloud environments aligned with your business goals and security requirements.Reducing complexity and building long-term technological resilience.',
    // href: '/services/cloud-tech',
    accent: '#34d399',
  },
  {
    icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    title: 'Digital Transformation',
    description: 'Modernizing legacy systems and reimagining core processes through strategic technology adoption.Driving innovation, efficiency, and competitive advantage enterprise-wide.',
    // href: '/services/digital-transformation',
    accent: '#fb923c',
  },
  {
    icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="8" height="8" rx="1.5"/><rect x="14" y="2" width="8" height="8" rx="1.5"/><rect x="2" y="14" width="8" height="8" rx="1.5"/><rect x="14" y="14" width="8" height="8" rx="1.5"/></svg>,
    title: 'Automation',
    description: 'AI-powered automation that eliminates repetitive tasks and enhances operational throughput.Freeing teams to focus on high-value, growth-driving initiatives.',
    // href: '/services/automation',
    accent: '#f472b6',
  },
];

const PillarCard = ({ pillar, index, inView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={pillar.href}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.6s ease ${0.1 + index * 0.08}s`,
      }}
    >
      <div
        className="light-card relative h-full p-6 rounded-2xl border transition-all duration-300"
        style={{
          background:   hovered ? `rgba(24,28,42,0.9)` : 'rgba(24,28,42,0.6)',
          borderColor:  hovered ? `${pillar.accent}30` : 'rgba(255,255,255,0.06)',
          boxShadow:    hovered ? `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${pillar.accent}20` : 'none',
        }}
      >
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
          style={{ background:`${pillar.accent}18`, color:pillar.accent, boxShadow: hovered ? `0 0 20px ${pillar.accent}25` : 'none' }}
        >
          {pillar.icon}
        </div>
        <h3 className="font-display font-bold text-white text-lg mb-3">{pillar.title}</h3>
        <p className="text-muted text-sm font-body leading-relaxed">{pillar.description}</p>

        {/* Bottom accent line on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl transition-all duration-300"
          style={{ background:`linear-gradient(90deg, transparent, ${pillar.accent}, transparent)`, opacity: hovered ? 1 : 0 }}
        />
      </div>
    </Link>
  );
};

const EnterprisePillarsSection = () => {
  const [titleRef, titleInView] = useInView();
  const [gridRef,  gridInView]  = useInView();

  return (
    <section className="relative py-24 lg:py-32 bg-secondary overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-accent/3 rounded-full blur-[120px] pointer-events-none"/>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{ opacity: titleInView ? 1 : 0, transform: titleInView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
        >
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-5">Enterprise Pillars</h2>
          <p className="text-muted font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
           We cover the full spectrum of enterprise IT - supply chain, data integration, cloud, and intelligent automation.Every solution is purpose-built to deliver measurable, lasting impact for your business.

          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} inView={gridInView}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnterprisePillarsSection;
