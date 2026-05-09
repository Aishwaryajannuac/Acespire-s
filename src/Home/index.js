import React, { useEffect, useRef } from 'react';
import HeroSection             from './HeroSection';
import PartnersSection         from './PartnersSection';
import EnterprisePillarsSection from './EnterprisePillarsSection';
import EvolutionSection        from './EvolutionSection';
import ProvinyxSection         from './ProvinyxSection';
import AgenticSection          from './AgenticSection';
import CaseStudiesSection      from './CaseStudiesSection';
import CTASection              from './CTASection';
import Footer                  from '../components/Footer';
import Chatbot                 from './Chatbot';

/* Subtle cursor glow that follows the mouse */
const CursorGlow = () => {
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
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(61,126,255,0.04) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.2s ease-out, top 0.2s ease-out',
      }}
    />
  );
};

const HomePage = () => {
  return (
    <div className="relative bg-primary min-h-screen">
      <CursorGlow />
      <HeroSection />
      <PartnersSection />
      <EnterprisePillarsSection />
      <EvolutionSection />
      <ProvinyxSection />
      <AgenticSection />
      <CaseStudiesSection />
      <CTASection />
      <Chatbot />
      <Footer />

    </div>
  );
};

export default HomePage;
