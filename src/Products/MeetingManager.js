import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import Footer from '../components/Footer';
import Chatbot from '../Home/Chatbot';
import { useContactModal } from '../context/ContactModalContext';

// ─── HERO ─────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);
    const { openModal } = useContactModal();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const fade = (delay) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translate(0,0)' : 'translateY(28px)',
    transition: `opacity 0.75s cubic-bezier(.4,0,.2,1) ${delay}s,
                 transform 0.75s cubic-bezier(.4,0,.2,1) ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 55% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(61,126,255,0.07) 0%, transparent 70%)`,
          transition: 'background 0.5s ease',
        }}
      />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-blue-accent/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-dark/6 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-4 items-center">

          {/* Left */}
          <div>
            <div style={fade(0.08)} className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs text-muted font-body mb-7">
              Agentic AI: Meeting Manager
            </div>

            <h1
              style={fade(0.22)}
              className="font-display font-extrabold text-5xl sm:text-6xl lg:text-5xl leading-[1.05] tracking-wide mb-6"
            >
              <span className="text-blue-gradient block">Smarter Meetings.</span>
              <span className="text-white block">Zero Manual</span>
              <span className="text-blue-gradient block">Follow-Ups.</span>
            </h1>

            <p style={fade(0.38)} className="text-muted font-body text-base sm:text-lg leading-relaxed max-w-md mb-6">
              The Meeting Manager Agent is an AI-powered automation that manages everything around
              your meetings - before, during, and after - without any manual effort.
            </p>
            <p style={fade(0.44)} className="text-muted font-body text-base sm:text-lg leading-relaxed max-w-md mb-10">
              From capturing discussions to generating structured summaries and sharing them
              instantly, it ensures no insights are lost and every meeting drives action.
            </p>

            <div style={fade(0.52)} className="flex flex-wrap items-center gap-4">
             <button
                onClick={() => openModal({ enquiryType: 'products', preSelectProduct: 'Meeting Manager', sourcePage: 'Meeting Manager Page' })}
                className="inline-flex items-center px-7 py-3.5 bg-blue-accent hover:bg-blue-dark text-always-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(61,126,255,0.55)] hover:scale-105 active:scale-95"
              >
                Schedule Discovery Call
              </button>
              <Link
                to="/case-studies"
                className="inline-flex items-center px-6 py-3.5 border border-white/20 hover:border-blue-accent/50 text-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:bg-card-hover"
              >
                View Case Studies
              </Link>
            </div>
          </div>

          {/* Right - hero image */}
          <div
            style={{
              opacity:   visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(50px)',
              transition: 'opacity 0.9s cubic-bezier(.4,0,.2,1) 0.45s, transform 0.9s cubic-bezier(.4,0,.2,1) 0.45s',
            }}
            className="flex items-center justify-center lg:justify-end"
          >
            <img
              src="/Meeting1.png"
              alt="Meeting Manager Agent"
              className="w-full max-w-[520px] h-auto object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
    </section>
  );
};

// ─── SECTION 2 - KEY CHALLENGES ───────────────────────────────────────────────
const ChallengesSection = () => {
  const [ref, inView] = useInView();

  const challenges = [
    'Important discussions getting lost after meetings',
    'Manual note-taking leading to incomplete or inconsistent summaries',
    'Delays in sharing meeting outcomes with stakeholders',
    'Lack of clarity on action items and responsibilities',
    'Time spent revisiting recordings or transcripts',
    'Inefficient collaboration and follow-up processes',
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-primary overflow-hidden">
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left - image */}
          <div
            style={{
              opacity:   inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-60px)',
              transition: 'all 0.85s cubic-bezier(.4,0,.2,1)',
            }}
            className="order-1 lg:order-1 flex items-center justify-center"
          >
            <img
              src="/Meeting2.png"
              alt="Meeting Challenges"
              className="w-full max-w-[480px] h-auto object-contain"
              draggable={false}
            />
          </div>

          {/* Right - challenges list */}
          <div
            className="order-2 lg:order-2"
            style={{
              opacity:   inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(60px)',
              transition: 'all 0.85s cubic-bezier(.4,0,.2,1) 0.15s',
            }}
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-6">
              Key Challenges
            </h2>
            <ul className="space-y-4">
              {challenges.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm sm:text-base text-white/75 font-body"
                  style={{
                    opacity:   inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(30px)',
                    transition: `all 0.65s cubic-bezier(.4,0,.2,1) ${0.3 + i * 0.08}s`,
                  }}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SECTION 3 - TECHNOLOGY STACK ─────────────────────────────────────────────
const TechStackSection = () => {
  const [ref, inView] = useInView();

  const stack = [
    { label: 'n8n',                      desc: 'Workflow automation and scheduling (runs every 30 minutes)' },
    { label: 'Microsoft Graph API',       desc: 'Calendar and Teams integration' },
    { label: 'Microsoft Teams Transcripts', desc: 'Source data for meetings' },
    { label: 'Groq AI Models',            desc: 'Intelligent summarization and structuring' },
    { label: 'Automated Chat Integration', desc: 'Posting summaries directly into Teams' },
    { label: 'Retry Mechanism',           desc: 'Ensures transcript availability and reliability' },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-primary overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-accent/4 rounded-full blur-[110px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left - tech stack text */}
          <div
            className="order-2 lg:order-1"
            style={{
              opacity:   inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-60px)',
              transition: 'all 0.85s cubic-bezier(.4,0,.2,1)',
            }}
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-8">
              Technology Stack
            </h2>
            <ul className="space-y-3.5">
              {stack.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm sm:text-base text-white/75 font-body"
                  style={{
                    opacity:   inView ? 1 : 0,
                    transform: inView ? 'translateX(0)' : 'translateX(-30px)',
                    transition: `all 0.65s cubic-bezier(.4,0,.2,1) ${0.2 + i * 0.09}s`,
                  }}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-accent shrink-0" />
                  <span>
                    <span className="font-bold text-white">{item.label}</span>
                    {' – '}{item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - image */}
          <div
            style={{
              opacity:   inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(60px)',
              transition: 'all 0.85s cubic-bezier(.4,0,.2,1) 0.15s',
            }}
            className="order-1 lg:order-2 flex items-center justify-center lg:justify-end"
          >
            <img
              src="/Meeting3.png"
              alt="Meeting Manager Technology Stack"
              className="w-full max-w-[500px] h-auto object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SECTION 4 - MEASURABLE BUSINESS IMPACT ───────────────────────────────────
const stats = [
  { value: '60%', dir: 'up',   color: '#3d7eff', title: 'Productivity Improvement', desc: 'Automate repetitive tasks to free up time for high-value work.' },
  { value: '40%', dir: 'down', color: '#3d7eff', title: 'Operational Costs',         desc: 'Reduce dependency on manual processes and minimize inefficiencies.' },
  { value: '99%', dir: 'up',   color: '#3d7eff', title: 'Process Accuracy',          desc: 'Eliminate human errors with consistent and reliable automation.' },
  { value: '50%', dir: 'up',   color: '#3d7eff', title: 'Faster Turnaround Time',    desc: 'Accelerate execution of tasks and workflows across operations.' },
];

const StatCard = ({ stat, index, inView }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="light-card relative p-6 rounded-2xl border transition-all duration-300 cursor-default overflow-hidden"
      style={{
        background:  'rgba(24,28,42,0.7)',
        borderColor: hovered ? 'rgba(61,126,255,0.35)' : 'rgba(255,255,255,0.07)',
        boxShadow:   hovered ? '0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(61,126,255,0.15)' : 'none',
        opacity:     inView ? 1 : 0,
        transform:   inView ? (hovered ? 'translateY(-5px)' : 'translateY(0)') : 'translateY(40px)',
        transition:  `opacity 0.65s cubic-bezier(.4,0,.2,1) ${0.1 + index * 0.1}s, transform 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke={stat.color} strokeWidth="2.5" strokeLinecap="round"
          style={{ transform: stat.dir === 'down' ? 'rotate(180deg)' : 'none' }}>
          <polyline points="18 15 12 9 6 15"/>
        </svg>
        <span className="font-display font-extrabold text-3xl" style={{ color: stat.color }}>
          {stat.value}
        </span>
      </div>
      <h3 className="font-display font-bold text-white text-base mb-2">{stat.title}</h3>
      <p className="text-muted font-body text-sm leading-relaxed">{stat.desc}</p>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`, opacity: hovered ? 1 : 0 }} />
    </div>
  );
};

const ImpactSection = () => {
  const [titleRef, titleInView] = useInView();
  const [gridRef,  gridInView]  = useInView();
  return (
    <section className="relative py-24 lg:py-32 bg-primary overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-accent/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-14"
          style={{ opacity: titleInView ? 1 : 0, transform: titleInView ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.75s cubic-bezier(.4,0,.2,1)' }}>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">Measurable Business Impact</h2>
          <p className="text-muted font-body text-base sm:text-lg max-w-xl mx-auto">Results that speak for themselves. We focus on ROI-driven transformation.</p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => <StatCard key={s.title} stat={s} index={i} inView={gridInView} />)}
        </div>
      </div>
    </section>
  );
};

// ─── SECTION 5 - WHY ACESPIRE ─────────────────────────────────────────────────
const WhyAcespireSection = () => {
  const [ref, inView] = useInView();
  const reasons = [
    'Automated Meeting Intelligence with zero manual effort',
    'Instant Structured Summaries delivered to your team',
    'Seamless Microsoft Teams & Calendar Integration',
    'AI-Powered Action Item Tracking and follow-up',
  ];
  return (
    <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="dark-section relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-14"
          style={{
            background:  'rgba(12,16,28,0.95)',
            border:      '1px solid rgba(61,126,255,0.2)',
            boxShadow:   '0 0 60px rgba(61,126,255,0.06)',
            opacity:     inView ? 1 : 0,
            transform:   inView ? 'translateY(0)' : 'translateY(40px)',
            transition:  'all 0.85s cubic-bezier(.4,0,.2,1)',
          }}>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-accent/6 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-2 items-center">
            <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-40px)', transition: 'all 0.8s cubic-bezier(.4,0,.2,1) 0.2s' }}>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-8">Why Acespire for Meeting Manager</h2>
              <ul className="space-y-4 mb-8">
                {reasons.map((r, i) => (
                  <li key={r} className="flex items-center gap-3 text-sm sm:text-base text-white/80 font-body"
                    style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-20px)', transition: `all 0.6s cubic-bezier(.4,0,.2,1) ${0.35 + i * 0.1}s` }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    {r}
                  </li>
                ))}
              </ul>
              <Link to="/case-studies"
                className="group inline-flex items-center gap-2 text-blue-accent hover:text-blue-light text-sm font-display font-semibold transition-all duration-200">
                Explore Our Case Studies
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
            <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.96)', transition: 'all 0.85s cubic-bezier(.4,0,.2,1) 0.3s' }}
              className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden">
                <img src="/Real-time-dashboard.png" alt="Real-Time Dashboard" className="w-full h-auto object-contain" draggable={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SECTION 6 - CTA ──────────────────────────────────────────────────────────
const CTASection = () => {
  const [ref, inView] = useInView();
  const { openModal } = useContactModal();
  return (
    <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="dark-section relative rounded-3xl overflow-hidden px-8 py-16 sm:px-14 sm:py-20 text-center"
          style={{
            background:  'linear-gradient(135deg, #1E3A8A 0%, #1E1B4B 100%)',
            opacity:     inView ? 1 : 0,
            transform:   inView ? 'scale(1)' : 'scale(0.96)',
            transition:  'opacity 0.85s cubic-bezier(.4,0,.2,1), transform 0.85s cubic-bezier(.4,0,.2,1)',
          }}>
          <div className="absolute top-[-20%] right-[-5%] w-72 h-72 rounded-full bg-white/5 blur-[70px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-5%] w-64 h-64 rounded-full bg-black/15 blur-[60px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-5 max-w-2xl mx-auto"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.75s cubic-bezier(.4,0,.2,1) 0.2s' }}>
              Ready to Make Every Meeting Count?
            </h2>
            <p className="text-white/70 font-body text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ opacity: inView ? 1 : 0, transition: 'all 0.75s cubic-bezier(.4,0,.2,1) 0.35s' }}>
              Stop losing insights after every meeting. Let AI capture, summarise, and action everything automatically.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6"
              style={{ opacity: inView ? 1 : 0, transition: 'all 0.75s cubic-bezier(.4,0,.2,1) 0.5s' }}>
              <button
                onClick={() => openModal({ enquiryType: 'products', preSelectProduct: 'Meeting Manager', sourcePage: 'Meeting Manager Page' })}
                className="inline-flex items-center px-8 py-3.5 bg-blue-accent hover:bg-blue-accent text-always-white text-sm font-display font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] active:scale-95"
              >
                Request a Demo
              </button>
              <Link to="/services/automation"
                className="inline-flex items-center px-8 py-3.5 bg-black/35 hover:bg-black/50 text-white text-sm font-display font-bold rounded-full border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95">
                Explore More Services
              </Link>
            </div>
            <p className="text-white/40 font-body text-xs"
              style={{ opacity: inView ? 1 : 0, transition: 'all 0.75s ease 0.65s' }}>
              No commitment required. Initial discovery calls are free of charge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── PAGE ASSEMBLY ─────────────────────────────────────────────────────────────
const MeetingManager = () => {
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
    <div className="relative bg-primary min-h-screen">
      <div ref={glowRef} className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(61,126,255,0.04) 0%, transparent 70%)', transform: 'translate(-50%, -50%)', transition: 'left 0.18s ease-out, top 0.18s ease-out' }} />
      <HeroSection />
      <ChallengesSection />
      <TechStackSection />
      <ImpactSection />
      <WhyAcespireSection />
      <CTASection />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default MeetingManager;