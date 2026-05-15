/**
 * ContactModal.jsx
 *
 * Place this file at:  src/components/ContactModal.jsx
 *
 * This component is rendered by ContactModalProvider automatically.
 * You never import/render it directly — just call openModal() from the hook.
 *
 * Google Sheets integration:
 *   1. Create a Google Sheet
 *   2. Deploy the GoogleAppsScript.js (see that file) as a Web App
 *   3. Replace GOOGLE_SCRIPT_URL below with your deployed URL
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../hooks/useTheme';

// ─── REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL ──────────────────
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwxHFHqc35nkxldwCXe5xiBwMlSv0mPW5A9-Mv6RhTl54pkcRpl2ExwLtX6ch-O3288/exec';
// ─────────────────────────────────────────────────────────────────────────────

const ENQUIRY_TABS = [
  { id: 'general',  label: 'General Enquiry'  },
  { id: 'business', label: 'Business Enquiry' },
  { id: 'service',  label: 'Service Enquiry'  },
  { id: 'products', label: 'Products'         },
  { id: 'feedback', label: 'Feedback'         },
];

export const SERVICES_LIST = [
  'Supply Chain',
  'Data Integration',
  'Digital Transformation',
  'Cloud Services',
  'Automation',
];

export const PRODUCTS_LIST = [
  'Provinyx',
  'ChainShields',
  'HireOn AI',
  'NexLead',
  'DigiMark',
  'Meeting Manager',
  'Invoice Agent',
];

// ─── Submit to Google Sheets via Apps Script ──────────────────────────────────
const submitToSheets = async (payload) => {
  const params = new URLSearchParams(payload);
  const res = await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
    method: 'GET', // Apps Script GET is easier to deploy without CORS issues
  });
  if (!res.ok) throw new Error('Submission failed');
  return res.json();
};

// ─── MODAL COMPONENT ──────────────────────────────────────────────────────────
const ContactModal = ({
  enquiryType:    initialType      = 'general',
  preSelectService: initService    = null,
  preSelectProduct: initProduct    = null,
  sourcePage                       = null,
  onClose,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const overlayRef  = useRef(null);
  const cardRef     = useRef(null);

  const [activeTab,  setActiveTab]  = useState(initialType);
  const [form,       setForm]       = useState({
    name:    '',
    email:   '',
    company: '',
    phone:   '',
    service: initService || '',
    product: initProduct || '',
    message: '',
  });
  const [focused,   setFocused]   = useState('');
  const [status,    setStatus]    = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg,  setErrorMsg]  = useState('');

  // Sync pre-selects when tab changes
  useEffect(() => {
    if (activeTab === 'service' && initService) {
      setForm(f => ({ ...f, service: initService }));
    }
    if (activeTab === 'products' && initProduct) {
      setForm(f => ({ ...f, product: initProduct }));
    }
  }, [activeTab, initService, initProduct]);

  // Close on Escape
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  // Click outside card to close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const payload = {
      timestamp:   new Date().toISOString(),
      source:      sourcePage || window.location.pathname,
      enquiryType: ENQUIRY_TABS.find(t => t.id === activeTab)?.label || activeTab,
      name:        form.name,
      email:       form.email,
      company:     form.company,
      phone:       form.phone,
      interestedIn: activeTab === 'service' ? form.service
                  : activeTab === 'products' ? form.product
                  : '',
      message:     form.message,
    };

    try {
      await submitToSheets(payload);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
    }
  };

  // ── Styles ────────────────────────────────────────────────
  const inputStyle = {
    background:   isDark ? 'rgba(24,28,42,0.9)' : '#f0f5ff',
    border:       `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(61,126,255,0.22)'}`,
    color:        isDark ? '#e2e8f0' : '#0f172a',
    borderRadius: 10,
    padding:      '11px 14px',
    fontSize:     13,
    fontFamily:   'Outfit, sans-serif',
    width:        '100%',
    outline:      'none',
    transition:   'border-color 0.2s, box-shadow 0.2s',
  };

  const focusedStyle = (field) => focused === field
    ? { borderColor: '#3d7eff', boxShadow: '0 0 0 3px rgba(61,126,255,0.14)' }
    : {};

  const labelStyle = {
    display:     'block',
    fontSize:    11,
    fontWeight:  600,
    marginBottom: 5,
    color:       isDark ? 'rgba(160,180,220,0.85)' : 'rgba(30,60,130,0.70)',
    fontFamily:  'Outfit, sans-serif',
    letterSpacing: '0.03em',
  };

  const cardBg    = isDark ? '#0d1120' : '#ffffff';
  const cardBorder= isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.15)';

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      style={{
        backdropFilter:         'blur(10px)',
        WebkitBackdropFilter:   'blur(10px)',
        background:             isDark
          ? 'rgba(5,8,20,0.75)'
          : 'rgba(200,215,255,0.40)',
      }}
    >
      {/* Modal card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background:  cardBg,
          border:      `1px solid ${cardBorder}`,
          boxShadow:   isDark
            ? '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(61,126,255,0.12)'
            : '0 30px 80px rgba(61,126,255,0.18), 0 0 0 1px rgba(61,126,255,0.10)',
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-5 pt-5 pb-4 shrink-0"
          style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(61,126,255,0.10)'}` }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(61,126,255,0.14)', border: '1px solid rgba(61,126,255,0.28)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="#3d7eff" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-base leading-none"
                style={{ color: isDark ? '#e2e8f0' : '#0f172a' }}>
                Get in Touch
              </h2>
              <p className="text-[11px] mt-0.5 font-body"
                style={{ color: isDark ? 'rgba(160,180,220,0.7)' : 'rgba(30,60,130,0.55)' }}>
               We’ll get back to you shortly.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-150"
            style={{
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(61,126,255,0.07)',
              color:      isDark ? 'rgba(180,200,240,0.8)'  : 'rgba(30,60,130,0.6)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6"  y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* ── Enquiry-type tabs ── */}
        <div
          className="px-5 pt-4 pb-3 shrink-0"
          style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(61,126,255,0.08)'}` }}
        >
          <div className="flex flex-wrap gap-1.5">
            {ENQUIRY_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-3 py-1 rounded-full text-[11px] font-display font-semibold transition-all duration-200"
                style={{
                  background: activeTab === tab.id
                    ? '#3d7eff'
                    : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(61,126,255,0.07)',
                  border: activeTab === tab.id
                    ? '1px solid transparent'
                    : `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(61,126,255,0.18)'}`,
                  color: activeTab === tab.id
                    ? '#ffffff'
                    : isDark ? 'rgba(160,185,230,0.85)' : 'rgba(30,80,160,0.75)',
                  boxShadow: activeTab === tab.id ? '0 0 10px rgba(61,126,255,0.35)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Scrollable form body ── */}
        <div className="flex-1 overflow-y-auto px-5 py-4"
          style={{ scrollbarWidth: 'none' }}>

          {status === 'success' ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.35)' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="#34d399" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3 className="font-display font-bold text-lg mb-1.5"
                style={{ color: isDark ? '#e2e8f0' : '#0f172a' }}>
                Message Sent!
              </h3>
              <p className="font-body text-sm mb-6"
                style={{ color: isDark ? 'rgba(160,180,220,0.75)' : 'rgba(30,60,130,0.60)' }}>
                We’ll get back to you shortly.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full text-sm font-display font-semibold text-always-white transition-all duration-200 hover:scale-105"
                style={{ background: '#3d7eff' }}
              >
                Close
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label style={labelStyle}>Full Name <span style={{ color: '#f87171' }}>*</span></label>
                  <input
                    name="name" type="text" placeholder="John Doe" required
                    value={form.name} onChange={handleChange}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle, ...focusedStyle('name') }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Work Email <span style={{ color: '#f87171' }}>*</span></label>
                  <input
                    name="email" type="email" placeholder="john@company.com" required
                    value={form.email} onChange={handleChange}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle, ...focusedStyle('email') }}
                  />
                </div>
              </div>

              {/* Row 2: Company + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label style={labelStyle}>Company</label>
                  <input
                    name="company" type="text" placeholder="Acme Corp"
                    value={form.company} onChange={handleChange}
                    onFocus={() => setFocused('company')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle, ...focusedStyle('company') }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input
                    name="phone" type="tel" placeholder="+1 (555) 000-0000"
                    value={form.phone} onChange={handleChange}
                    onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle, ...focusedStyle('phone') }}
                  />
                </div>
              </div>

              {/* Service dropdown — only for service tab */}
              {activeTab === 'service' && (
                <div>
                  <label style={labelStyle}>Interested In (Service)</label>
                  <div className="relative">
                    <select
                      name="service"
                      value={form.service} onChange={handleChange}
                      onFocus={() => setFocused('service')} onBlur={() => setFocused('')}
                      style={{ ...inputStyle, ...focusedStyle('service'), appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="">Select a Service</option>
                      {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={isDark ? 'rgba(160,180,220,0.7)' : 'rgba(30,80,160,0.55)'}
                      strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              )}

              {/* Product dropdown — only for products tab */}
              {activeTab === 'products' && (
                <div>
                  <label style={labelStyle}>Interested In (Product)</label>
                  <div className="relative">
                    <select
                      name="product"
                      value={form.product} onChange={handleChange}
                      onFocus={() => setFocused('product')} onBlur={() => setFocused('')}
                      style={{ ...inputStyle, ...focusedStyle('product'), appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="">Select a Product</option>
                      {PRODUCTS_LIST.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={isDark ? 'rgba(160,180,220,0.7)' : 'rgba(30,80,160,0.55)'}
                      strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label style={labelStyle}>
                  {activeTab === 'feedback' ? 'Your Feedback' : 'How can we help?'}
                </label>
                <textarea
                  name="message" rows={4}
                  placeholder={
                    activeTab === 'feedback'
                      ? 'Share your experience or suggestions...'
                      : 'Tell us about your project or challenges...'
                  }
                  value={form.message} onChange={handleChange}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                  style={{ ...inputStyle, ...focusedStyle('message'), resize: 'vertical' }}
                />
              </div>

              {/* Error */}
              {status === 'error' && (
                <p className="text-xs font-body text-red-400">{errorMsg}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-display font-bold text-sm text-always-white transition-all duration-300 hover:shadow-[0_0_28px_rgba(61,126,255,0.5)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #3d7eff, #1a4fcf)' }}
              >
                {status === 'loading' ? (
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                ) : (
                  <>
                    Send Message
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </button>

              <p className="text-center text-[10px] font-body"
                style={{ color: isDark ? 'rgba(130,155,200,0.55)' : 'rgba(30,60,130,0.40)' }}>
                Your information is safe with us. We never share your data.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;