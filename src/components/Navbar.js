import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const serviceLinks = [
  { label: 'Supply Chain Excellence', href: '/services/supply-chain' },
  { label: 'Data Integration',        href: '/services/data-integration' },
  { label: 'Cloud Tech',              href: '/services/cloud-tech' },
  { label: 'Digital Transformation',  href: '/services/digital-transformation' },
  { label: 'Automation',              href: '/services/automation' },
];

/* Sun — shown in dark mode, clicking switches to light */
const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"  x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1"  y1="12" x2="3"  y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78"  x2="5.64"  y2="18.36"/>
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
  </svg>
);

/* Half moon — shown in light mode, clicking switches to dark */
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
  </svg>
);

const Navbar = () => {
  const [scrolled,     setScrolled]     = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const location    = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setServicesOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => { setMobileOpen(false); setServicesOpen(false); }, [location]);

  const navLink = (href, label) => (
    <Link
      to={href}
      className={`px-3.5 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-lg ${
        location.pathname === href
          ? 'text-blue-accent'
          : isDark
            ? 'text-muted hover:text-white'
            : 'text-muted hover:text-[#0d0f16]'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
    scrolled
      ? isDark
        ? 'bg-[#0d0f16]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-white/15'
        : 'bg-[#f0f4ff]/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(61,126,255,0.1)] border-blue-accent/20'
      : isDark
        ? 'bg-transparent border-white/15'
        : 'bg-[#f0f4ff]/95 backdrop-blur-xl border-blue-accent/15'
  }`}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[70px]">

          {/* Logo */}
         {/* Logo — dark bg pill in light mode so white logo stays visible */}
<a href="/" className="flex items-center group">
  {isDark ? (
    <img
      src="/Acespire-solutions.png"
      alt="Acespire Solutions"
      className="h-9 w-auto object-contain transition-all duration-300"
      draggable={false}
    />
  ) : (
    <div
      className="flex items-center px-3 py-1.5 rounded-xl"
      // style={{ background: 'rgba(73, 104, 219, 0.88)' }}
    >
      <img
        src="/Acespire-solutions-logo2.png"
        alt="Acespire Solutions"
        className="h-9 w-auto object-contain transition-all duration-300"
        draggable={false}
      />
    </div>
  )}
</a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLink('/', 'Home')}

            {/* Services dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`flex items-center gap-1 px-3.5 py-2 text-sm font-body font-medium transition-colors duration-200 rounded-lg ${
                  servicesOpen
                    ? 'text-blue-accent'
                    : isDark
                      ? 'text-muted hover:text-white'
                      : 'text-muted hover:text-[#0d0f16]'
                }`}
              >
                Services
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-60 rounded-xl overflow-hidden z-50 border shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                  style={{
                    background:  isDark ? '#181c2a' : '#ffffff',
                    borderColor: isDark ? '#1e2235' : '#c5d0e8',
                  }}
                >
                  <div className="p-1.5">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href} to={link.href}
                        className={`block px-4 py-2.5 text-sm rounded-lg transition-all duration-150 font-body ${
                          isDark
                            ? 'text-muted hover:text-white hover:bg-[#1e2235]'
                            : 'text-[#556080] hover:text-[#0d0f16] hover:bg-[#edf1fd]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLink('/about',        'About')}
            {navLink('/products',     'Products')}
            {navLink('/case-studies', 'Case Studies')}
            {navLink('/blogs',        'Blogs')}
            {navLink('/careers',      'Careers')}
          </div>

          {/* Right: theme toggle + CTA + hamburger */}
          <div className="flex items-center gap-3">

            {/* ── Theme Toggle ──
                Dark mode  → show SUN icon   (click to go light)
                Light mode → show MOON icon  (click to go dark)  */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                background:  isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.1)',
                border:      isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(61,126,255,0.3)',
                color:       isDark ? '#8892a4' : '#3d7eff',
              }}
            >
              {/* Sun in dark mode, Moon in light mode */}
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* CTA */}
            <Link
              to="/contact"
              className="hidden lg:flex items-center px-5 py-2.5 bg-blue-accent hover:bg-blue-dark text-always-white text-sm font-body font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(61,126,255,0.4)] hover:scale-105 active:scale-95"
              style={{ color: '#ffffff !important'}}>
              Connect with us
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isDark ? 'text-muted hover:text-white' : 'text-muted hover:text-[#0d0f16]'
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div
          className="backdrop-blur-xl border-t px-4 py-4 space-y-1"
          style={{
            background:  isDark ? 'rgba(13,15,22,0.98)' : 'rgba(240,244,255,0.98)',
            borderColor: isDark ? '#1e2235' : '#c5d0e8',
          }}
        >
          {[
            { href: '/',             label: 'Home'         },
            { href: '/about',        label: 'About'        },
            { href: '/products',     label: 'Products'     },
            { href: '/case-studies', label: 'Case Studies' },
            { href: '/blogs',        label: 'Blogs'    },
            { href: '/careers',      label: 'Careers'      },
          ].map(({ href, label }) => (
            <Link key={href} to={href}
              className={`block px-4 py-3 text-sm font-body rounded-lg transition-all ${
                isDark
                  ? 'text-muted hover:text-white hover:bg-[#1e2235]'
                  : 'text-[#556080] hover:text-[#0d0f16] hover:bg-[#edf1fd]'
              }`}>
              {label}
            </Link>
          ))}

          <div className="px-4 py-2">
            <p className="text-xs text-muted/50 uppercase tracking-widest mb-2 font-body">Services</p>
            {serviceLinks.map((link) => (
              <Link key={link.href} to={link.href}
                className={`block py-2 pl-3 text-sm transition-colors font-body ${
                  isDark ? 'text-muted hover:text-white' : 'text-[#556080] hover:text-[#0d0f16]'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile theme toggle row */}
          <div className="px-4 py-2 flex items-center justify-between">
            <span className={`text-sm font-body ${isDark ? 'text-muted' : 'text-[#556080]'}`}>
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background:  isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.1)',
                border:      isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(61,126,255,0.3)',
                color:       isDark ? '#8892a4' : '#3d7eff',
              }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          <div className="pt-3 dark-section">
            <Link to="/contact"
              className="block text-center px-5 py-3 bg-blue-accent text-always-white text-sm font-body font-semibold rounded-full hover:bg-blue-dark transition-all"
                style={{ color: '#ffffff !important' }}>
                
              Connect with us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;