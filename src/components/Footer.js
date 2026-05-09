import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const Footer = () => {
  const { theme } = useTheme();
   const isDark = theme === 'dark';
    
  return (
    <footer className="bg-primary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand — acespire-solutions.png */}
          <div className="lg:col-span-1">
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
            <p className="text-muted text-sm font-body leading-relaxed mb-6">
              Pioneering the future of enterprise operations through Digital Transformation,
              Agentic AI, and Supply Chain excellence.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'Twitter',  d: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { label: 'LinkedIn', d: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
                { label: 'GitHub',   d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' },
              ].map(({ label, d }) => (
                <a key={label} href="#"
                  className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted hover:text-blue-accent hover:border-blue-accent/40 transition-all duration-200 hover:scale-110">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'Supply Chain',           href: '/services/supply-chain' },
                { label: 'Digital Transformation', href: '/services/digital-transformation' },
                { label: 'Data Integration',        href: '/services/data-integration' },
                { label: 'Cloud Solutions',         href: '/services/cloud-tech' },
                { label: 'Automation',              href: '/services/automation' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-muted hover:text-white text-sm font-body transition-colors duration-200 inline-block hover:translate-x-1">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About',        href: '/about' },
                { label: 'Products',     href: '/products' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Blogs',        href: '/blogs' },
                { label: 'Careers',      href: '/careers' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-muted hover:text-white text-sm font-body transition-colors duration-200 inline-block hover:translate-x-1">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm tracking-wider uppercase mb-5">Global HQ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2" className="mt-0.5 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-muted text-sm font-body leading-relaxed">
                  91080 WORKSPACE PVT LTD #951, 24th Main road, 2nd Floor, J.P. Nagar 2nd phase, Bengaluru, Karnataka 560078
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2" className="shrink-0">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.9v2.02z"/>
                </svg>
                <a href="tel:+18002273747" className="text-muted hover:text-white text-sm font-body transition-colors">
                  +91 94161-15310
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2" className="shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:hello@acespire.solutions" className="text-muted hover:text-white text-sm font-body transition-colors">
                  info@acespiresolutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted/60 text-xs font-body">
            © 2026 Acespire Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
              <Link key={item} to="#" className="text-muted/60 hover:text-muted text-xs font-body transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
