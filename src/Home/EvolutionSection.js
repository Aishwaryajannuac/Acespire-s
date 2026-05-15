import React, { useState } from 'react';
import useInView from '../hooks/useInView';

const EvolutionSection = () => {
  const [leftRef,  leftInView]  = useInView();
  const [rightRef, rightInView] = useInView();
  const [imgHovered, setImgHovered] = useState(false);

  const points = [
    {
      icon: (
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="#3d7eff" strokeWidth="1.8">
          <polygon points="10,2 13,8 19,8 14,12 16,18 10,14 4,18 6,12 1,8 7,8" />
        </svg>
      ),
      title: 'Our Vision',
      description: 'We envision a future where every product carries a verifiable, trusted digital identity - redefining transparency and accountability across global supply chains.',
    },
    {
      icon: (
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="#3d7eff" strokeWidth="1.8">
          <path d="M10 2L12.5 7.5L18 8L14 12L15 17.5L10 14.5L5 17.5L6 12L2 8L7.5 7.5Z" />
        </svg>
      ),
      title: 'Our Mission',
      description: 'We protect product integrity through innovative technology and anti-counterfeiting solutions. Enabling businesses to strengthen operations and build unwavering consumer confidence.',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-primary overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left content */}
          <div
            ref={leftRef}
            style={{
              opacity:   leftInView ? 1 : 0,
              transform: leftInView ? 'translateX(0)' : 'translateX(-50px)',
              transition: 'all 0.8s ease',
            }}
          >
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mb-12">
              <span className="text-white">Beyond Transformation:</span>
              <br />
              <span className="text-blue-gradient">Our Evolution.</span>
            </h2>

            <div className="space-y-8">
              {points.map((point, i) => (
                <div
                  key={point.title}
                  className="flex gap-4 group"
                  style={{
                    opacity:   leftInView ? 1 : 0,
                    transform: leftInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease ${0.3 + i * 0.15}s`,
                  }}
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-accent/15 border border-blue-accent/20 flex items-center justify-center group-hover:bg-blue-accent/25 group-hover:border-blue-accent/40 transition-all duration-300">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg mb-2">{point.title}</h3>
                    <p className="text-muted font-body text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Target-evolution.png */}
          <div
            ref={rightRef}
            className="flex items-center justify-center"
            style={{
              opacity:   rightInView ? 1 : 0,
              transform: rightInView ? 'scale(1)' : 'scale(0.85)',
              transition: 'all 0.9s ease 0.2s',
            }}
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Card background */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-card to-card-alt border border-border" />

              {/* Glow behind image */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-500"
                style={{
                  background: imgHovered
                    ? 'radial-gradient(ellipse at center, rgba(61,126,255,0.18) 0%, transparent 70%)'
                    : 'radial-gradient(ellipse at center, rgba(61,126,255,0.08) 0%, transparent 70%)',
                }}
              />

              {/* Target-evolution.png */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img
                  src="/Target-evolution.png"
                  alt="Our Evolution - Target"
                  className="w-full h-full object-contain transition-all duration-500"
                  draggable={false}
                  onMouseEnter={() => setImgHovered(true)}
                  onMouseLeave={() => setImgHovered(false)}
                  style={{
                    filter: imgHovered
                      ? 'drop-shadow(0 0 24px rgba(61,126,255,0.6))'
                      : 'drop-shadow(0 0 12px rgba(61,126,255,0.2))',
                    transform: imgHovered ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvolutionSection;
