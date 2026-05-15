import React from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';

const ProvinyxSection = () => {
  const [ref, inView] = useInView();

  return (
    <section className="relative py-16 lg:py-24 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="dark-section relative rounded-3xl overflow-hidden p-8 lg:p-12"
          style={{
            background: 'linear-gradient(135deg, #0c1a3d 0%, #0a1428 50%, #060d1e 100%)',
            border: '1px solid rgba(61,126,255,0.2)',
            opacity:   inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease',
          }}
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-accent/8 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">

            {/* Left - text */}
            <div>
              {/* Provinyx brand badge */}
              <div
                className="flex items-center gap-2 mb-6"
                style={{ opacity: inView ? 1 : 0, transition: 'all 0.6s ease 0.2s' }}
              >
                 <img
                src="/Provinyx-logo.png"
                alt="Provinyx"
                className="h-6 w-auto object-contain"
                draggable={false}
              />
              </div>

              <h2
                className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5"
                style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-30px)', transition: 'all 0.7s ease 0.3s' }}
              >
                Acespire's Digital<br />Product Passport
              </h2>

              <p
                className="text-muted font-body text-sm sm:text-base leading-relaxed mb-8 max-w-md"
                style={{ opacity: inView ? 1 : 0, transition: 'all 0.6s ease 0.45s' }}
              >
                Our DPP solution gives every product a verifiable digital identity - enabling end-to-end traceability and compliance.Bringing transparency, authenticity, and trust to every stage of your supply chain.
              </p>

              <div
                className="flex flex-wrap gap-3 mb-8"
                style={{ opacity: inView ? 1 : 0, transition: 'all 0.6s ease 0.55s' }}
              >
                {[
                  { label: 'Complete product Lifecycle', icon: '↻' },
                  { label: 'Sustainability', icon: '♻' },
                ].map((f) => (
                  <div key={f.label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-accent/25 bg-blue-accent/10 text-sm text-white/80 font-body">
                    <span className="text-blue-accent">{f.icon}</span>
                    {f.label}
                  </div>
                ))}
              </div>

              <div style={{ opacity: inView ? 1 : 0, transition: 'all 0.6s ease 0.65s' }}>
                <Link
                  to="https://provinyx.com/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-accent hover:bg-blue-dark text-white text-sm font-display font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(61,126,255,0.4)] hover:scale-105"
                >
                  Learn More About Provinyx
                </Link>
              </div>
            </div>

            {/* Right - Provinyx-dashboard.png */}
            <div
              className="relative h-64 sm:h-72 lg:h-80"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'scale(1)' : 'scale(0.9)', transition: 'all 0.8s ease 0.4s' }}
            >
              <div className="group relative h-full rounded-2xl overflow-hidden border border-blue-accent/15 bg-[#0a1628]">
                {/* Glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-accent/5 to-transparent pointer-events-none z-10" />

                <img
                  src="/Provinyx-dashboard.png"
                  alt="Provinyx Dashboard"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProvinyxSection;
