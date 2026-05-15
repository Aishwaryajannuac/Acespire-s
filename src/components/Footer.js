import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

// ─── LEGAL CONTENT ────────────────────────────────────────────────────────────
const LEGAL = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { heading: 'Information We Collect', body: 'We collect your name, email, company details, and browsing data when you interact with our website or services.' },
      { heading: 'How We Use It', body: 'Your information is used only to respond to enquiries and deliver relevant consulting solutions.' },
      { heading: 'Data Security', body: 'We protect all personal data using industry-standard encryption and secure storage systems.' },
      { heading: 'No Data Selling', body: 'Acespire Consulting never sells, rents, or shares your personal data with third parties for commercial gain.' },
      { heading: 'Trusted Third Parties', body: 'We only work with vetted partners who are contractually bound to keep your data confidential.' },
      { heading: 'Your Rights', body: 'You can access, update, or delete your data anytime by contacting us at info@acespireconsulting.com.' },
    ],
    contact: 'info@acespireconsulting.com',
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      { heading: 'Acceptance of Terms', body: 'Using our website means you fully agree to these Terms of Service.' },
      { heading: 'Services', body: 'We offer professional consulting solutions and may modify or discontinue services at any time.' },
      { heading: 'Intellectual Property', body: 'All content on this site is owned by Acespire Consulting and may not be copied or reused without permission.' },
      { heading: 'User Responsibilities', body: 'You agree to use our platform lawfully; any misuse will result in immediate termination of access.' },
      { heading: 'Limitation of Liability', body: 'Acespire Consulting is not liable for any damages arising from the use of our website or services.' },
      { heading: 'Confidentiality & Changes', body: 'All shared information is kept strictly confidential, and we reserve the right to update these terms at any time.' },
    ],
    contact: 'info@acespireconsulting.com',
  },
  cookies: {
    title: 'Cookie Settings',
    sections: [
      { heading: 'What Are Cookies', body: 'Small files stored on your device to improve your browsing experience.' },
      { heading: 'How We Use Them', body: 'To analyse traffic, remember preferences, and enhance site performance.' },
      { heading: 'Essential Cookies', body: 'Required for the website to function and cannot be turned off.' },
      { heading: 'Optional Cookies', body: 'Analytics and marketing cookies are only enabled with your consent.' },
      { heading: 'Third-Party Cookies', body: 'Trusted tools like Google Analytics may place their own cookies on your device.' },
      { heading: 'Managing Preferences', body: 'Update or withdraw cookie consent anytime via your browser or our preferences panel.' },
    ],
    contact: 'info@acespireconsulting.com',
  },
};

// ─── LEGAL MODAL ──────────────────────────────────────────────────────────────
const LegalModal = ({ type, onClose, isDark }) => {
  const content  = LEGAL[type];
  const overlayRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Mount → animate in
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setVisible(true), 10);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  // Escape key
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []); // eslint-disable-line

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleOverlay = (e) => {
    if (e.target === overlayRef.current) handleClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{
        backdropFilter:       'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        background: isDark ? 'rgba(4,6,18,0.70)' : 'rgba(200,215,255,0.45)',
        transition: 'opacity 0.3s ease',
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className="relative w-full max-w-lg max-h-[88vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background:  isDark ? '#0d1120' : '#ffffff',
          border:      `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.14)'}`,
          boxShadow:   isDark
            ? '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(61,126,255,0.10)'
            : '0 30px 80px rgba(61,126,255,0.16), 0 0 0 1px rgba(61,126,255,0.08)',
          transform:  visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
          transition: 'transform 0.32s cubic-bezier(.34,1.1,.64,1), opacity 0.32s ease',
          opacity:    visible ? 1 : 0,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(61,126,255,0.10)'}`,
            background:   isDark ? 'rgba(255,255,255,0.02)' : 'rgba(61,126,255,0.03)',
          }}
        >
          <div className="flex items-center gap-3">
            {/* Blue dot */}
            <div className="w-2 h-2 rounded-full bg-blue-accent" />
            <h2
              className="font-display font-extrabold text-base"
              style={{ color: isDark ? '#e2e8f0' : '#0f172a' }}
            >
              {content.title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150"
            style={{
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(61,126,255,0.07)',
              color:      isDark ? 'rgba(180,200,240,0.8)'  : 'rgba(30,60,130,0.6)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div
          className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
          style={{ scrollbarWidth: 'thin', scrollbarColor: isDark ? 'rgba(61,126,255,0.3) transparent' : 'rgba(61,126,255,0.2) transparent' }}
        >
          {content.sections.map((s, i) => (
            <div key={i} className="flex gap-3">
              {/* Number pill */}
              <div
                className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-display font-bold mt-0.5"
                style={{
                  background: 'rgba(61,126,255,0.12)',
                  border:     '1px solid rgba(61,126,255,0.22)',
                  color:      '#3d7eff',
                }}
              >
                {i + 1}
              </div>
              <div>
                <p
                  className="font-display font-bold text-sm mb-1"
                  style={{ color: isDark ? '#e2e8f0' : '#0f172a' }}
                >
                  {s.heading}
                </p>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: isDark ? 'rgba(160,180,220,0.80)' : 'rgba(40,60,100,0.70)' }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="shrink-0 px-6 py-4 flex items-center justify-between"
          style={{
            borderTop:  `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(61,126,255,0.10)'}`,
            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(61,126,255,0.02)',
          }}
        >
          <p className="font-body text-xs" style={{ color: isDark ? 'rgba(140,160,200,0.6)' : 'rgba(60,80,130,0.55)' }}>
            Queries:{' '}
            <a
              href={`mailto:${content.contact}`}
              className="hover:text-blue-accent transition-colors underline"
            >
              {content.contact}
            </a>
          </p>
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-full text-xs font-display font-semibold text-always-white transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #3d7eff, #1a4fcf)' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [modal, setModal] = useState(null); // 'privacy' | 'terms' | 'cookies' | null

  const MAP_URL =
    'https://www.google.com/maps/search/?api=1&query=91080+WORKSPACE+PVT+LTD+JP+Nagar+Bengaluru+Karnataka';

  return (
    <>
      <footer className="bg-primary border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* ── Brand ── */}
            <div className="lg:col-span-1">
              <a href="/" className="flex items-center group mb-4">
                {isDark ? (
                  <img
                    src="/Acespire-solutions.png"
                    alt="Acespire Solutions"
                    className="h-9 w-auto object-contain transition-all duration-300"
                    draggable={false}
                  />
                ) : (
                  <img
                    src="/Acespire-solutions-logo2.png"
                    alt="Acespire Solutions"
                    className="h-9 w-auto object-contain transition-all duration-300"
                    draggable={false}
                  />
                )}
              </a>
              <p className="text-muted text-sm font-body leading-relaxed mb-6">
                Pioneering the future of enterprise operations through Digital Transformation,
                Agentic AI, and Supply Chain excellence.
              </p>

              {/* Social icons - Twitter, LinkedIn, YouTube */}
              <div className="flex items-center gap-3">
                {[
                  {
                    label: 'Twitter',
                    href:  'https://twitter.com/Acespire_21',
                    icon: (
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'LinkedIn',
                    href:  'https://www.linkedin.com/company/acespire-consulting-solutions/',
                    icon: (
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'YouTube',
                    href:  'https://www.youtube.com/@DigiMark-Acy',
                    icon: (
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                      </svg>
                    ),
                  },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted hover:text-blue-accent hover:border-blue-accent/40 transition-all duration-200 hover:scale-110"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Services ── */}
            <div>
              <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-5">
                Services
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'Supply Chain',           href: '/services/supply-chain' },
                  { label: 'Digital Transformation', href: '/services/digital-transformation' },
                  { label: 'Data Integration',       href: '/services/data-integration' },
                  { label: 'Cloud Solutions',        href: '/services/cloud-tech' },
                  { label: 'Automation',             href: '/services/automation' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className="text-muted hover:text-white text-sm font-body transition-colors duration-200 inline-block hover:translate-x-1"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Company ── */}
            <div>
              <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-5">
                Company
              </h4>
              <ul className="space-y-3">
                {[
                  { label: 'About',        href: '/about'        },
                  { label: 'Products',     href: '/products'     },
                  { label: 'Case Studies', href: '/case-studies' },
                  { label: 'Blogs',        href: '/blogs'        },
                  { label: 'Careers',      href: '/careers'      },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className="text-muted hover:text-white text-sm font-body transition-colors duration-200 inline-block hover:translate-x-1"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact ── */}
            <div>
              <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-5">
                Global HQ
              </h4>
              <ul className="space-y-4">

                {/* Address - clickable → Google Maps */}
                <li>
                  <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke="#3d7eff" strokeWidth="2" className="mt-0.5 shrink-0">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span className="text-muted group-hover:text-white text-sm font-body leading-relaxed transition-colors duration-200">
                      91080 WORKSPACE PVT LTD #951, 24th Main road, 2nd Floor,
                      J.P. Nagar 2nd phase, Bengaluru, Karnataka 560078
                    </span>
                  </a>
                </li>

                {/* Phone */}
                <li className="flex items-center gap-3">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="#3d7eff" strokeWidth="2" className="shrink-0">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.9v2.02z"/>
                  </svg>
                  <a
                    href="tel:+919416115310"
                    className="text-muted hover:text-white text-sm font-body transition-colors duration-200"
                  >
                    +91 94161-15310
                  </a>
                </li>

                {/* Email */}
                <li className="flex items-center gap-3">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="#3d7eff" strokeWidth="2" className="shrink-0">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <a
                    href="mailto:info@acespireconsulting.com"
                    className="text-muted hover:text-white text-sm font-body transition-colors duration-200"
                  >
                    info@acespireconsulting.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted/60 text-xs font-body">
              © 2026 Acespire Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {[
                { label: 'Privacy Policy',   key: 'privacy'  },
                { label: 'Terms of Service', key: 'terms'    },
                { label: 'Cookie Settings',  key: 'cookies'  },
              ].map(({ label, key }) => (
                <button
                  key={key}
                  onClick={() => setModal(key)}
                  className="text-muted/60 hover:text-muted text-xs font-body transition-colors cursor-pointer bg-transparent border-none outline-none"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Legal modal (renders outside footer in the DOM layer) ── */}
      {modal && (
        <LegalModal
          type={modal}
          onClose={() => setModal(null)}
          isDark={isDark}
        />
      )}
    </>
  );
};

export default Footer;