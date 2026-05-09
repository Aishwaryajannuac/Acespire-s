import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import { useTheme } from '../hooks/useTheme';
import Footer from '../components/Footer';
import Chatbot from '../Home/Chatbot';

// ─── OFFICE DATA ──────────────────────────────────────────────────────────────
const offices = [
  {
    id: 'india',
    title: 'India Office',
    city: 'Bengaluru',
    address: '91080 WORKSPACE PVT LTD, 2nd Floor, J.P. Nagar 2nd Phase, Bengaluru, Karnataka 560078',
    phone: '+91 94161-15310',
    email: 'sf@acespire.solutions',
    mapUrl: 'https://goo.gl/maps/XwHf1Gh82GJXchF98',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7777.785022941267!2d77.58336437358793!3d12.914629516127762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae150cb8cb36b9%3A0x6c3556604fe30ab5!2s91080%2C%2024th%20Main%20Rd%2C%20R.K%20Colony%2C%20Marenahalli%2C%202nd%20Phase%2C%20J.%20P.%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560078%2C%20India!5e0!3m2!1sen!2sus!4v1738651803993!5m2!1sen!2sus',
  },
  {
    id: 'usa',
    title: 'USA Office',
    city: 'Frisco, TX',
    address: '6135 Frisco Square Blvd, Suite 400, #283 Frisco, TX 75034',
    phone: '+1 972-672-9843',
    email: 'usa@acespire.solutions',
    mapUrl: 'https://goo.gl/maps/XwHf1Gh82GJXchF98',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.5468565432!2d-96.8242!3d33.0754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c3c9b9b9b9b9b%3A0x3adb8e5c7b98c1e0!2s6135%20Frisco%20Square%20Blvd%2C%20Frisco%2C%20TX%2075034!5e0!3m2!1sen!2sus!4v1234567890',
  },
  {
    id: 'mexico',
    title: 'Mexico Office',
    city: 'Ciudad de México',
    address: '# 78 Mar Tirreno St, Miguel Hidalgo, Ciudad de México, México',
    phone: '+1 (214)-430-1863',
    email: 'mx@acespire.solutions',
    mapUrl: 'https://maps.app.goo.gl/vbwnqf41HJb1AzKW7',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.0046765988354!2d-99.18613662501254!3d19.45536518182896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f898baf6202d%3A0x3d7163c0e7caef64!2sMar%20Tirreno%2078A%2C%20Popotla%2C%20Miguel%20Hidalgo%2C%2011400%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20Mexico!5e0!3m2!1sen!2sin!4v1776673296646!5m2!1sen!2sin',
  },
];

const services = [
  'Supply Chain Excellence',
  'Data Integration',
  'Cloud Technology',
  'Digital Transformation',
  'Automation',
  'HireOn AI',
  'DigiMark AI',
  'NexLead AI',
  'Meeting Manager',
  'Invoice Agent',
  'Other',
];

// ─── 1. HERO ──────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Particle network animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const DOTS = 55;
    const particles = Array.from({ length: DOTS }, () => ({
      x:   Math.random() * W,
      y:   Math.random() * H,
      vx:  (Math.random() - 0.5) * 0.4,
      vy:  (Math.random() - 0.5) * 0.4,
      r:   Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const dotColor  = isDark ? 'rgba(61,126,255,0.55)' : 'rgba(61,126,255,0.35)';
      const lineColor = isDark ? 'rgba(61,126,255,0.12)' : 'rgba(61,126,255,0.08)';

      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth   = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // dots
      particles.forEach((p) => {
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [isDark]);

  const fade = (delay) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  });

  return (
    <section
      className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
      style={{ background: 'var(--color-primary)' }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.9 }}
      />

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-accent/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-dark/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div
        
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-body mb-8"
          style={{
            ...fade(0.1),
            border: '1px solid rgba(61,126,255,0.3)',
            background: 'rgba(61,126,255,0.08)',
            color: '#60b4ff',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87"/>
          </svg>
          Contact Us
        </div>

        {/* Headline */}
        <h1
        
          className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.06] tracking-tight mb-6"
          style={{ ...fade(0.22), color: 'var(--color-text-heading)' }}
        >
          Let's Build the{' '}
          <span className="text-blue-gradient">Next</span>
          <br />
          <span className="text-blue-gradient">Generation</span>
          {' '}of Enterprise.
        </h1>

        {/* Sub */}
        <p
        
          className="font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          style={{ ...fade(0.38), color: 'var(--color-muted)' }}
        >
          From supply chain resilience to agentic AI workflows, our team of experts is ready to
          accelerate your journey. Reach out to start a pilot or request a deep-dive demonstration.
        </p>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--color-primary), transparent)' }}
      />
    </section>
  );
};

// ─── 2. FORM + GLOBAL PRESENCE ────────────────────────────────────────────────
const ContactFormSection = () => {
  const [formRef, formInView] = useInView();
  const [sideRef, sideInView] = useInView();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [form, setForm]         = useState({ name: '', email: '', company: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeOffice, setActiveOffice] = useState(0);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    background:   isDark ? 'rgba(24,28,42,0.8)' : '#f5f8ff',
    border:       `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(61,126,255,0.2)'}`,
    color:        'var(--color-text-heading)',
    borderRadius: 12,
    padding:      '12px 16px',
    fontSize:     14,
    fontFamily:   'Outfit, sans-serif',
    width:        '100%',
    outline:      'none',
    transition:   'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  const focusStyle = (focused) => focused
    ? { borderColor: '#3d7eff', boxShadow: '0 0 0 3px rgba(61,126,255,0.12)' }
    : {};

  const [focused, setFocused] = useState('');

  return (
    <section
      className="relative py-16 lg:py-24 overflow-hidden"
      style={{ background: 'var(--color-secondary)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.2), transparent)' }} />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-accent/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Form ── */}
          <div
            ref={formRef}
            style={{
              opacity:   formInView ? 1 : 0,
              transform: formInView ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s cubic-bezier(.4,0,.2,1)',
            }}
          >
            <h2
              className="font-display font-extrabold text-3xl sm:text-4xl mb-2"
              style={{ color: 'var(--color-text-heading)' }}
            >
              Start a Conversation
            </h2>
            <p className="font-body text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
              Fill out the form below, Our team will contact you.
            </p>

            {submitted ? (
              <div
                className="flex flex-col items-center justify-center py-16 rounded-2xl border text-center"
                style={{
                  background:  isDark ? 'rgba(24,28,42,0.8)' : '#ffffff',
                  borderColor: 'rgba(52,211,153,0.4)',
                }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.4)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--color-text-heading)' }}>
                  Message Sent!
                </h3>
                <p className="font-body text-sm" style={{ color: 'var(--color-muted)' }}>
                  We'll reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-xs font-semibold mb-1.5" style={{ color: 'var(--color-muted)' }}>
                      Full Name
                    </label>
                    <input
                      name="name" type="text" placeholder="John Doe" required
                      value={form.name} onChange={handleChange}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                      style={{ ...inputStyle, ...focusStyle(focused === 'name') }}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold mb-1.5" style={{ color: 'var(--color-muted)' }}>
                      Work Email
                    </label>
                    <input
                      name="email" type="email" placeholder="john@company.com" required
                      value={form.email} onChange={handleChange}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                      style={{ ...inputStyle, ...focusStyle(focused === 'email') }}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-xs font-semibold mb-1.5" style={{ color: 'var(--color-muted)' }}>
                      Company
                    </label>
                    <input
                      name="company" type="text" placeholder="Acme Corp"
                      value={form.company} onChange={handleChange}
                      onFocus={() => setFocused('company')} onBlur={() => setFocused('')}
                      style={{ ...inputStyle, ...focusStyle(focused === 'company') }}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold mb-1.5" style={{ color: 'var(--color-muted)' }}>
                      Phone Number
                    </label>
                    <input
                      name="phone" type="tel" placeholder="+1 (555) 000-0000"
                      value={form.phone} onChange={handleChange}
                      onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                      style={{ ...inputStyle, ...focusStyle(focused === 'phone') }}
                    />
                  </div>
                </div>

                {/* Service select */}
                <div>
                  <label className="block font-body text-xs font-semibold mb-1.5" style={{ color: 'var(--color-muted)' }}>
                    Interested In
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={form.service} onChange={handleChange}
                      onFocus={() => setFocused('service')} onBlur={() => setFocused('')}
                      style={{
                        ...inputStyle,
                        ...focusStyle(focused === 'service'),
                        appearance: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="">Select a Service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-body text-xs font-semibold mb-1.5" style={{ color: 'var(--color-muted)' }}>
                    How can we help?
                  </label>
                  <textarea
                    name="message" rows={5} placeholder="Tell us about your project or challenges..."
                    value={form.message} onChange={handleChange}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle, ...focusStyle(focused === 'message'), resize: 'vertical' }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-display font-bold text-sm text-always-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(61,126,255,0.5)] hover:scale-[1.01] active:scale-[0.99]"
                  style={{ background: 'linear-gradient(135deg, #3d7eff, #1a4fcf)' }}
                >
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>

                <p className="font-body text-[11px] text-center" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>
                  By submitting this form, you agree to our{' '}
                  <Link to="#" className="underline hover:text-blue-accent transition-colors">Privacy Policy</Link>.
                  We'll use your information to contact you about our services.
                </p>
              </form>
            )}
          </div>

          {/* ── RIGHT: Global Presence + Footprint + Social ── */}
          <div
            ref={sideRef}
            className="space-y-6"
            style={{
              opacity:   sideInView ? 1 : 0,
              transform: sideInView ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s cubic-bezier(.4,0,.2,1) 0.15s',
            }}
          >
            {/* Global Presence header */}
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(61,126,255,0.15)', border: '1px solid rgba(61,126,255,0.3)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/>
                </svg>
              </div>
              <h3 className="font-display font-extrabold text-2xl" style={{ color: 'var(--color-text-heading)' }}>
                Global Presence
              </h3>
            </div>

            {/* Office tabs */}
            <div className="flex gap-2 flex-wrap">
              {offices.map((o, i) => (
                <button
                  key={o.id}
                  onClick={() => setActiveOffice(i)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-display font-semibold transition-all duration-250"
                  style={{
                    background:  i === activeOffice ? '#3d7eff' : isDark ? 'rgba(24,28,42,0.8)' : 'rgba(61,126,255,0.06)',
                    border:      i === activeOffice ? '1px solid transparent' : `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.2)'}`,
                    color:       i === activeOffice ? '#ffffff' : 'var(--color-muted)',
                    boxShadow:   i === activeOffice ? '0 0 12px rgba(61,126,255,0.4)' : 'none',
                  }}
                >
                  {o.city || o.title}
                </button>
              ))}
            </div>

            {/* Office cards */}
            {offices.map((office, i) => (
              <div
                key={office.id}
                className="rounded-2xl border p-5 transition-all duration-300"
                style={{
                  display:     i === activeOffice ? 'block' : 'none',
                  background:  isDark ? 'rgba(24,28,42,0.8)' : '#ffffff',
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.18)',
                  boxShadow:   isDark ? 'none' : '0 4px 20px rgba(61,126,255,0.07)',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(61,126,255,0.12)', border: '1px solid rgba(61,126,255,0.25)' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                      <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  </div>
                  <h4 className="font-display font-bold text-base" style={{ color: 'var(--color-text-heading)' }}>
                    {office.title}
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {/* Address — links to maps */}
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 group"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2" strokeLinecap="round" className="mt-0.5 shrink-0">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span
                      className="font-body text-xs leading-relaxed group-hover:text-blue-accent transition-colors"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {office.address}
                    </span>
                  </a>

                  {/* Phone */}
                  <a href={`tel:${office.phone}`} className="flex items-center gap-2.5 group">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 9.81a19.79 19.79 0 01-.01-8.63 2 2 0 012-1.18h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 14.9v2.02z"/>
                    </svg>
                    <span
                      className="font-body text-xs group-hover:text-blue-accent transition-colors"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {office.phone}
                    </span>
                  </a>

                  {/* Email */}
                  {office.email && (
                    <a href={`mailto:${office.email}`} className="flex items-center gap-2.5 group">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      <span
                        className="font-body text-xs group-hover:text-blue-accent transition-colors"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {office.email}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Digital Footprint — image */}
            <div>
              <p
                className="font-body text-[10px] font-bold tracking-widest uppercase mb-3"
                style={{ color: 'var(--color-muted)' }}
              >
                Our Digital Footprint
              </p>
              <div
                className="relative rounded-2xl overflow-hidden border"
                style={{
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.15)',
                  height: 180,
                }}
              >
                {/* Embedded map of India office as visual */}
                <iframe
                  src={offices[activeOffice].embedUrl}
                  className="w-full h-full"
                  style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
                {/* Overlay bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2.5"
                  style={{
                    background: isDark ? 'rgba(13,15,22,0.88)' : 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span className="font-body text-xs" style={{ color: 'var(--color-muted)' }}>
                    Global Connectivity Enabled
                  </span>
                  <span
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-display font-bold"
                    style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                    LIVE STATUS
                  </span>
                </div>
              </div>
            </div>

            {/* Connect on Social */}
            <div
              className="rounded-2xl border p-5"
              style={{
                background:  isDark ? 'rgba(24,28,42,0.8)' : '#ffffff',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.18)',
              }}
            >
              <h4 className="font-display font-bold text-base mb-1" style={{ color: 'var(--color-text-heading)' }}>
                Connect on Social
              </h4>
              <p className="font-body text-xs mb-4" style={{ color: 'var(--color-muted)' }}>
                Stay updated with our latest insights on Agentic AI and Supply Chain resilience.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-display font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_16px_rgba(61,126,255,0.3)]"
                  style={{
                    background:  isDark ? 'rgba(61,126,255,0.12)' : 'rgba(61,126,255,0.08)',
                    border:      '1px solid rgba(61,126,255,0.3)',
                    color:       '#3d7eff',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-display font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_16px_rgba(61,126,255,0.3)]"
                  style={{
                    background:  isDark ? 'rgba(61,126,255,0.12)' : 'rgba(61,126,255,0.08)',
                    border:      '1px solid rgba(61,126,255,0.3)',
                    color:       '#3d7eff',
                  }}
                >
                  {/* X / Twitter icon */}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── 3. CTA ───────────────────────────────────────────────────────────────────
const CTASection = () => {
  const [ref, inView] = useInView();

  return (
    <section
      className="relative py-16 lg:py-24 overflow-hidden"
      style={{ background: 'var(--color-primary)' }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(61,126,255,0.2), transparent)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="relative rounded-3xl overflow-hidden px-8 py-16 sm:px-14 sm:py-20"
          style={{
            background: 'linear-gradient(135deg, #1E3A8A 0%, #1E1B4B 100%)',
            opacity:   inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.96)',
            transition: 'all 0.85s cubic-bezier(.4,0,.2,1)',
          }}
        >
          <div className="absolute top-[-20%] right-[-5%] w-72 h-72 rounded-full bg-white/5 blur-[70px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-5%] w-64 h-64 rounded-full bg-black/15 blur-[60px] pointer-events-none" />

          <div className="relative z-10 text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-body mb-7"
              style={{
                opacity: inView ? 1 : 0, transition: 'all 0.7s ease 0.1s',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/>
              </svg>
              Executive Engagement
            </div>

            <h2
              className="font-display font-extrabold text-3xl sm:text-3xl lg:text-4xl text-always-white leading-tight mb-5 max-w-2xl mx-auto"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.75s ease 0.2s' }}
            >
              Ready to architect your{' '}
              <span style={{ color: '#60b4ff !important' }}>AI-driven</span> future?
            </h2>

            <p
              className="font-body text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.7)', opacity: inView ? 1 : 0, transition: 'all 0.75s ease 0.35s' }}
            >
              Join 150+ enterprise leaders who have transformed their operations with
              Acespire's Digital Transformation framework.
            </p>

            <div
              className="flex flex-wrap items-center justify-center gap-4"
              style={{ opacity: inView ? 1 : 0, transition: 'all 0.75s ease 0.5s' }}
            >
              <Link
                to="#"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-3.5 bg-blue-accent hover:bg-blue-dark text-white text-sm font-display font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(61,126,255,0.5)] active:scale-95"
              >
                Book a Strategy Session
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-black/35 hover:bg-black/50 text-always-white text-sm font-display font-bold rounded-full border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                View Case Studies
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── PAGE ASSEMBLY ─────────────────────────────────────────────────────────────
const ContactUs = () => {
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
    <div className="relative min-h-screen" style={{ background: 'var(--color-primary)' }}>
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(61,126,255,0.04) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.18s ease-out, top 0.18s ease-out',
        }}
      />
      <HeroSection />
      <ContactFormSection />
      <CTASection />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default ContactUs;