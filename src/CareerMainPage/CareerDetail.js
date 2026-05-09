import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import useInView from '../hooks/useInView';
import Footer from '../components/Footer';
import roles from './careersData';
import Chatbot from '../Home/Chatbot';

const BulletList = ({ items, inView, delay }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li
        key={i}
        className="flex items-start gap-3"
        style={{
          opacity:   inView ? 1 : 0,
          transform: inView ? 'translateX(0)' : 'translateX(-16px)',
          transition: `all 0.5s ease ${delay + i * 0.06}s`,
        }}
      >
        <span
          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: '#3d7eff' }}
        />
        <span className="font-body text-sm sm:text-base leading-relaxed"
          style={{ color: 'var(--color-muted)' }}>
          {item}
        </span>
      </li>
    ))}
  </ul>
);

const CareerDetail = () => {
  const { role: roleSlug } = useParams();
  const job = roles.find((r) => r.slug === roleSlug);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const glowRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [respRef,  respInView]  = useInView();
  const [qualRef,  qualInView]  = useInView();
  const [charRef,  charInView]  = useInView();

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 80);
    const move = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top  = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', move);
    return () => { clearTimeout(t); window.removeEventListener('mousemove', move); };
  }, [roleSlug]);

  if (!job) return <Navigate to="/careers" replace />;

  const applyUrl = `https://hireon.acespireconsulting.com/apply/${job.hireonId}`;

  const fade = (delay) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  const sectionStyle = (inV, delay = 0) => ({
    opacity:   inV ? 1 : 0,
    transform: inV ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.75s cubic-bezier(.4,0,.2,1) ${delay}s`,
  });

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-primary)' }}>
      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(61,126,255,0.04) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.18s ease-out, top 0.18s ease-out',
        }}
      />

      {/* ── Header block ── */}
      <section
        style={{ background: isDark ? '#13161f' : '#ffffff', borderBottom: `1px solid ${isDark ? 'rgba(61,126,255,0.15)' : 'rgba(61,126,255,0.2)'}` }}
        className="relative pt-24 pb-10"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-10">

          {/* Breadcrumb */}
          <div style={fade(0.1)} className="flex items-center gap-2 text-xs mb-6">
            <Link to="/careers" className="hover:text-blue-accent transition-colors font-body" style={{ color: 'var(--color-muted)' }}>
              Careers
            </Link>
            <span style={{ color: 'var(--color-muted)' }}>/</span>
            <span className="font-body truncate max-w-xs" style={{ color: 'var(--color-muted)', opacity: 0.6 }}>
              {job.title}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{ ...fade(0.2), color: 'var(--color-text-heading)' }}
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4"
          >
            {job.title}
          </h1>

          {/* Meta badges */}
          <div style={fade(0.3)} className="flex flex-wrap gap-2 mb-6">
            {[`${job.mode} · ${job.type}`, job.location, job.department].map((meta) => (
              <span key={meta}
                className="px-3 py-1.5 rounded-full text-xs font-body font-semibold tracking-wide uppercase"
                style={{
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(61,126,255,0.25)'}`,
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(61,126,255,0.06)',
                  color: 'var(--color-muted)',
                }}
              >
                {meta}
              </span>
            ))}
          </div>

          {/* Apply Now button */}
          <div style={fade(0.4)}>
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-blue-accent hover:bg-blue-dark text-always-white text-sm font-display font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(61,126,255,0.5)] hover:scale-105 active:scale-95"
            >
              Apply Now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="relative py-12 lg:py-16" style={{ background: 'var(--color-primary)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-start">

            {/* LEFT — article */}
            <div>
              {/* Summary */}
              <p
                className="font-body text-base sm:text-lg leading-relaxed mb-12 pl-4 py-2 rounded-lg"
                style={{
                  ...fade(0.5),
                  borderLeft: '3px solid #3d7eff',
                  background: isDark ? 'rgba(61,126,255,0.05)' : 'rgba(61,126,255,0.05)',
                  color: 'var(--color-muted)',
                }}
              >
                {job.summary}
              </p>

              {/* Responsibilities */}
              <div ref={respRef} className="mb-12" style={sectionStyle(respInView)}>
                <h2
                  className="font-display font-bold text-xl sm:text-2xl mb-6 pb-3"
                  style={{ color: 'var(--color-text-heading)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.12)'}` }}
                >
                  Job Responsibilities
                </h2>
                <BulletList items={job.responsibilities} inView={respInView} delay={0.1} />
              </div>

              {/* Qualifications */}
              <div ref={qualRef} className="mb-12" style={sectionStyle(qualInView, 0.05)}>
                <h2
                  className="font-display font-bold text-xl sm:text-2xl mb-6 pb-3"
                  style={{ color: 'var(--color-text-heading)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.12)'}` }}
                >
                  Qualifications
                </h2>
                <BulletList items={job.qualifications} inView={qualInView} delay={0.1} />
              </div>

              {/* Characteristics */}
              <div ref={charRef} className="mb-12" style={sectionStyle(charInView, 0.05)}>
                <h2
                  className="font-display font-bold text-xl sm:text-2xl mb-6 pb-3"
                  style={{ color: 'var(--color-text-heading)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.12)'}` }}
                >
                  Characteristics
                </h2>
                <BulletList items={job.characteristics} inView={charInView} delay={0.1} />
              </div>

              {/* Bottom apply */}
              <div
                className="pt-8"
                style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.12)'}` }}
              >
                <a
                  href={applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-blue-accent hover:bg-blue-dark text-always-white text-sm font-display font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(61,126,255,0.5)] hover:scale-105 active:scale-95"
                >
                  Apply Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* RIGHT — sidebar */}
            <aside
              className="lg:sticky lg:top-28 space-y-5"
              style={{
                opacity:   visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(20px)',
                transition: 'all 0.8s ease 0.5s',
              }}
            >
              {/* Job summary card */}
              <div
                className="p-5 rounded-2xl border"
                style={{
                  background:  isDark ? 'rgba(24,28,42,0.8)' : '#ffffff',
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.18)',
                }}
              >
                <h3 className="font-display font-bold text-sm mb-4 pb-3"
                  style={{ color: 'var(--color-text-heading)', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(61,126,255,0.12)'}` }}>
                  Role Details
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Department', value: job.department },
                    { label: 'Location',   value: job.location   },
                    { label: 'Type',       value: job.type       },
                    { label: 'Mode',       value: job.mode       },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-body text-[10px] uppercase tracking-widest mb-0.5" style={{ color: 'var(--color-muted)' }}>{label}</p>
                      <p className="font-display font-semibold text-sm" style={{ color: 'var(--color-text-heading)' }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other roles */}
              <div>
                <h3 className="font-display font-bold text-sm mb-3" style={{ color: 'var(--color-text-heading)' }}>
                  Other Open Roles
                </h3>
                <div className="space-y-2">
                  {roles.filter((r) => r.slug !== job.slug).map((r) => (
                    <Link
                      key={r.id}
                      to={`/careers/${r.slug}`}
                      className="group block p-3.5 rounded-xl border transition-all duration-250 hover:border-blue-accent/40"
                      style={{
                        background:  isDark ? 'rgba(24,28,42,0.6)' : '#ffffff',
                        borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(61,126,255,0.15)',
                      }}
                    >
                      <p className="font-display font-semibold text-xs mb-0.5 group-hover:text-blue-accent transition-colors" style={{ color: 'var(--color-text-heading)' }}>
                        {r.title}
                      </p>
                      <p className="font-body text-[10px]" style={{ color: 'var(--color-muted)' }}>
                        {r.mode} · {r.department}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA box */}
              <div
                className="p-5 rounded-2xl text-center dark-section"
                style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E1B4B 100%)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <p className="font-display font-bold text-white text-sm mb-1.5">Not the right fit?</p>
                <p className="font-body text-xs mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  We're always looking for exceptional talent.
                </p>
                <a
                  href="https://hireon.acespireconsulting.com/apply/78"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2.5 bg-blue-accent hover:bg-blue-dark text-white text-xs font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_16px_rgba(61,126,255,0.5)]"
                >
                  Submit General Application
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
<Chatbot />
      <Footer />
      
    </div>
  );
};

export default CareerDetail;