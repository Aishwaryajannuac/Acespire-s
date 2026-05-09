import React from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';

const CTASection = () => {
  const [ref, inView] = useInView();

  return (
    <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="relative rounded-3xl overflow-hidden p-10 sm:p-14 lg:p-20 text-center"
          style={{
            background: 'linear-gradient(135deg, #3558e8 0%, #4a6cf7 40%, #5b7fef 100%)',
            opacity:   inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.96)',
            transition: 'all 0.8s ease',
          }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-[-30%] right-[-5%] w-80 h-80 rounded-full bg-white/5 blur-[60px] pointer-events-none"/>
          <div className="absolute bottom-[-20%] left-[-5%] w-64 h-64 rounded-full bg-black/10 blur-[50px] pointer-events-none"/>
          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{ backgroundImage:'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)', backgroundSize:'40px 40px' }}
          />

          <div className="relative z-10">
            <h2
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-always-white leading-tight mb-5 max-w-2xl mx-auto"
              style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(20px)', transition:'all 0.7s ease 0.2s' }}
            >
              Ready to redefine your enterprise intelligence?
            </h2>

            <p
              className="text-[#000000]/70 font-body text-base sm:text-lg mb-10 max-w-lg mx-auto"
              style={{ opacity:inView?1:0, transition:'all 0.7s ease 0.35s' }}
            >
              Join the league of forward-thinking companies leveraging Acespire to dominate their markets.
            </p>

            <div style={{ opacity:inView?1:0, transition:'all 0.7s ease 0.5s' }}>
              <Link
                to="/contact"
                className="inline-flex items-center px-9 py-4 bg-white hover:bg-gray-50 text-blue-dark text-base font-display font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] active:scale-95"
              >
                Let's Talk Business
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
