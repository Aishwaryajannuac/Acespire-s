import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const OrbitDot = ({ radius, size, duration, delay, color }) => (
  <div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    style={{ animation: `spin ${duration}s linear ${delay}s infinite` }}
  >
    <div
      className="absolute rounded-full"
      style={{
        width: size, height: size,
        background: color,
        top: '50%', left: '50%',
        marginTop: -(size / 2), marginLeft: radius,
        boxShadow: `0 0 ${size * 3}px ${color}`,
      }}
    />
  </div>
);

const HeroSection = () => {
  const [visible,   setVisible]   = useState(false);
  const [mousePos,  setMousePos]  = useState({ x: 0.7, y: 0.5 });
  const [tilt,      setTilt]      = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const heroRef    = useRef(null);
  const diamondRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
      });
      if (diamondRef.current) {
        const dr = diamondRef.current.getBoundingClientRect();
        const tx = ((e.clientX - (dr.left + dr.width / 2))  / (dr.width  / 2)) * 12;
        const ty = ((e.clientY - (dr.top  + dr.height / 2)) / (dr.height / 2)) * -12;
        setTilt({ x: tx, y: ty });
      }
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const fade = (delay) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Ambient glow follows mouse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(61,126,255,0.07) 0%, transparent 70%)`,
          transition: 'background 0.6s ease',
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-blue-dark/8 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left content */}
          <div>
            <div style={fade(0.1)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-accent/30 bg-blue-accent/10 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-accent animate-pulse" />
              <span className="text-blue-light text-xs font-body font-medium tracking-wide">
                Next-Gen Consulting Solutions
              </span>
            </div>

            <h1 style={fade(0.25)} className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.55] tracking-tight mb-8">
              <span className="text-white block">We Build the</span>
              {/* <span className="text-white">the </span> */}
              <span className="text-blue-gradient">Technology Infrastructure</span>
              <span className="text-white block">That Powers Your Growth.</span>
            </h1>

            <p style={fade(0.4)} className="text-muted text-base sm:text-lg font-body leading-relaxed max-w-md mb-10">
             Acespire Solutions helps enterprises modernize faster, operate smarter, and scale with confidence.
            </p>

            <div style={fade(0.55)}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-blue-accent hover:bg-blue-dark text-always-white text-base font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(61,126,255,0.55)] hover:scale-105 active:scale-95"
              >
                Request Strategy Session
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right — Diamond */}
          {/* Right — Diamond card */}
<div
  className="relative h-[420px] sm:h-[500px] lg:h-[540px] flex items-center justify-center"
  style={{
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s',
  }}
>
  {/* Outer soft ambient glow — stays behind card */}
  <div
    className="absolute w-[420px] h-[420px] rounded-full pointer-events-none"
    style={{
      background: 'radial-gradient(circle, rgba(61,126,255,0.18) 0%, rgba(61,126,255,0.06) 40%, transparent 70%)',
      filter: 'blur(40px)',
      transition: 'opacity 0.4s ease',
      opacity: isHovered ? 1 : 0.6,
    }}
  />

  {/* The card */}
  <div
    ref={diamondRef}
    // onMouseEnter={() => setIsHovered(true)}
    // onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
    className="relative cursor-pointer select-none"
    style={{
      // transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${isHovered ? 1.04 : 1})`,
      transition: isHovered
        ? 'transform 0.15s ease-out, box-shadow 0.4s ease'
        : 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease',
      borderRadius: '20px',
      boxShadow: isHovered
        ? '0 0 0 1px rgba(61,126,255,0.5), 0 0 40px rgba(61,126,255,0.35), 0 30px 80px rgba(0,0,0,0.6)'
        : '0 0 0 1px rgba(61,126,255,0.2), 0 0 20px rgba(61,126,255,0.15), 0 20px 60px rgba(0,0,0,0.5)',
    }}
  >
    <img
      src="/Diamond.png"
      alt="Intelligent Enterprise"
      className="w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px] object-cover block"
      draggable={false}
      style={{
        borderRadius: '20px',
        transition: 'filter 0.4s ease',
        filter: isHovered
          ? 'brightness(1.12) saturate(1.2)'
          : 'brightness(1) saturate(1)',
      }}
    />

    {/* Corner accent lines — top-left */}
    {/* <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
      style={{ opacity: isHovered ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>
      <div className="absolute top-3 left-3 w-4 h-px bg-blue-accent" />
      <div className="absolute top-3 left-3 w-px h-4 bg-blue-accent" />
    </div> */}
    {/* Corner accent lines — top-right */}
    {/* <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
      style={{ opacity: isHovered ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>
      <div className="absolute top-3 right-3 w-4 h-px bg-blue-accent" />
      <div className="absolute top-3 right-3 w-px h-4 bg-blue-accent" />
    </div> */}
    {/* Corner accent lines — bottom-left */}
    {/* <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none"
      style={{ opacity: isHovered ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>
      <div className="absolute bottom-3 left-3 w-4 h-px bg-blue-accent" />
      <div className="absolute bottom-3 left-3 w-px h-4 bg-blue-accent" />
    </div> */}
    {/* Corner accent lines — bottom-right */}
    {/* <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
      style={{ opacity: isHovered ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>
      <div className="absolute bottom-3 right-3 w-4 h-px bg-blue-accent" />
      <div className="absolute bottom-3 right-3 w-px h-4 bg-blue-accent" />
    </div> */}

    {/* Scan line sweep on hover */}
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ borderRadius: '20px' }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.8), transparent)',
          animation: isHovered ? 'scanDown 1.2s ease-in-out infinite' : 'none',
        }}
      />
    </div>

    {/* Subtle inner vignette lift on hover */}
    <div
      className="absolute inset-0 pointer-events-none transition-opacity duration-400"
      style={{
        borderRadius: '20px',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(61,126,255,0.08) 0%, transparent 65%)',
        opacity: isHovered ? 1 : 0,
      }}
    />
  </div>

  {/* Floating particle dots around the card */}
  {/* {[
    { top: '10%', left: '8%',   size: 3, delay: '0s',   dur: '4s'   },
    { top: '85%', left: '10%',  size: 2, delay: '1.5s', dur: '5s'   },
    { top: '15%', right: '6%',  size: 4, delay: '0.8s', dur: '3.5s' },
    { top: '80%', right: '8%',  size: 2, delay: '2.2s', dur: '4.5s' },
    { top: '48%', left: '3%',   size: 3, delay: '1s',   dur: '6s'   },
    { top: '50%', right: '3%',  size: 2, delay: '3s',   dur: '4s'   },
  ].map((p, i) => (
    <div key={i}
      className="absolute rounded-full bg-blue-accent pointer-events-none"
      style={{
        width: p.size, height: p.size,
        top: p.top, left: p.left, right: p.right,
        animation: `pulse ${p.dur} ease-in-out ${p.delay} infinite`,
        opacity: 0.5,
        boxShadow: `0 0 ${p.size * 4}px rgba(61,126,255,0.8)`,
      }}
    />
  ))} */}
</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary to-transparent pointer-events-none" />

      <style>{`
  @keyframes scanDown {
    0%   { top: 0%;   opacity: 0;   }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
`}</style>
    </section>
  );
};

export default HeroSection;
