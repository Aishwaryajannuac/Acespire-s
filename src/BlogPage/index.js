import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import Footer from '../components/Footer';
import blogPosts, { blogCategories } from './Blogdata';
import Chatbot from '../Home/Chatbot';

// ─── HERO - Featured blog ──────────────────────────────────────────────────────
const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const featured = blogPosts.find((b) => b.featured) || blogPosts[0];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section className="relative pt-28 pb-16 bg-primary overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-blue-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page title */}
        <div style={fade(0.1)} className="mb-10">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-3"
            style={{ color: 'var(--color-text-heading)' }}>
            Intelligence{' '}
            <span style={{
              background: 'linear-gradient(90deg, #60b4ff, #3d7eff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              &amp; Insights
            </span>
          </h1>
          <p className="font-body text-base sm:text-lg max-w-2xl" style={{ color: 'var(--color-muted)' }}>
            Expert perspectives on AI integration, global supply chains, and the digital transformation
            strategies shaping tomorrow's enterprise landscape.
          </p>
        </div>

        {/* Featured card */}
        <div
          style={{
            ...fade(0.25),
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            background: 'rgba(24,28,42,0.6)',
            overflow: 'hidden',
          }}
        >
          <div className="light-card grid sm:grid-cols-2 gap-0">
            {/* Left - text */}
            <div className="p-8 sm:p-10 flex flex-col justify-center order-2 sm:order-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="px-3 py-1 rounded-full text-xs font-body font-semibold tracking-wide"
                  style={{ background: '#3d7eff', color: '#fff' }}>
                  FEATURED REPORT
                </span>
                <span className="flex items-center gap-1.5 text-xs font-body"
                  style={{ color: 'var(--color-muted)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {featured.readTime}
                </span>
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-4 leading-tight"
                style={{ color: 'var(--color-text-heading)' }}>
                {featured.title}
              </h2>

              <p className="font-body text-sm sm:text-base leading-relaxed mb-6"
                style={{ color: 'var(--color-muted)' }}>
                {featured.subtitle}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm text-always-white"
                  style={{ background: 'linear-gradient(135deg, #3d7eff, #1a4fcf)' }}>
                  {featured.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm" style={{ color: 'var(--color-text-heading)' }}>
                    {featured.author.name}
                  </p>
                  <p className="font-body text-xs" style={{ color: 'var(--color-muted)' }}>
                    {featured.author.role}
                  </p>
                </div>
              </div>

              <Link
                to={`/blogs/${featured.id}`}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-blue-accent hover:bg-blue-dark text-always-white text-sm font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_28px_rgba(61,126,255,0.5)] hover:scale-105 active:scale-95 w-fit"
              >
                Read Full Insights
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            {/* Right - image */}
            <div className="order-1 sm:order-2 h-56 sm:h-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
           className="w-full h-full object-cover object-top"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── BLOG CARD ─────────────────────────────────────────────────────────────────
const BlogCard = ({ post, index, inView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/blogs/${post.id}`}
      className="light-card group block rounded-2xl overflow-hidden border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:  'rgba(24,28,42,0.6)',
        borderColor: hovered ? 'rgba(61,126,255,0.35)' : 'rgba(255,255,255,0.07)',
        boxShadow:   hovered ? '0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(61,126,255,0.15)' : 'none',
        opacity:     inView ? 1 : 0,
        transform:   inView
          ? hovered ? 'translateY(-5px)' : 'translateY(0)'
          : 'translateY(40px)',
        transition:  `opacity 0.65s cubic-bezier(.4,0,.2,1) ${0.08 + index * 0.08}s, transform 0.35s ease, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          draggable={false}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-body font-semibold tracking-wider uppercase"
            style={{ background: 'rgba(13,15,22,0.85)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.12)' }}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Date + read time */}
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1.5 text-xs font-body" style={{ color: 'var(--color-muted)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
          <span style={{ color: 'var(--color-muted)', opacity: 0.4 }}>•</span>
          <span className="flex items-center gap-1.5 text-xs font-body" style={{ color: 'var(--color-muted)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {post.readTime}
          </span>
        </div>

        <h3 className="font-display font-bold text-base leading-snug mb-2 transition-colors duration-200"
          style={{ color: hovered ? '#60b4ff' : 'var(--color-text-heading)' }}>
          {post.title}
        </h3>

        <p className="font-body text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: 'var(--color-muted)' }}>
          {post.subtitle}
        </p>

        {/* Author + arrow */}
        <div className="flex items-center justify-between pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-always-white"
              style={{ background: 'linear-gradient(135deg, #3d7eff, #1a4fcf)' }}>
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="font-display font-semibold text-xs" style={{ color: 'var(--color-text-heading)' }}>
                {post.author.name}
              </p>
              <p className="font-body text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
                {post.author.role}
              </p>
            </div>
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: hovered ? '#3d7eff' : 'rgba(61,126,255,0.1)',
              border: '1px solid rgba(61,126,255,0.3)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-0.5 transition-all duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, #3d7eff, transparent)', opacity: hovered ? 1 : 0 }} />
    </Link>
  );
};

// ─── ALL BLOGS SECTION ─────────────────────────────────────────────────────────
const AllBlogsSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [titleRef, titleInView] = useInView();
  const [gridRef,  gridInView]  = useInView();

const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

const filtered = sorted.filter((b) => {
  const matchCat    = activeFilter === 'All' || b.category === activeFilter;
  const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      b.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
  return matchCat && matchSearch;
});

  const shown = filtered.slice(0, visibleCount);

  return (
    <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-accent/3 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter bar + search - matching screenshot layout */}
        <div
          ref={titleRef}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
          style={{
            opacity:   titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s ease',
          }}
        >
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveFilter(cat); setVisibleCount(6); }}
                className="px-4 py-2 rounded-full text-xs font-body font-semibold transition-all duration-250"
                style={{
                  background:  activeFilter === cat ? '#3d7eff' : 'rgba(255,255,255,0.05)',
                  color:       activeFilter === cat ? '#fff' : 'var(--color-muted)',
                  border:      activeFilter === cat ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow:   activeFilter === cat ? '0 0 16px rgba(61,126,255,0.4)' : 'none',
                  transform:   activeFilter === cat ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ color: 'var(--color-muted)' }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Topics, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-full text-sm font-body outline-none transition-all duration-200 w-52 sm:w-64"
              style={{
                background:   'rgba(255,255,255,0.05)',
                border:       '1px solid rgba(255,255,255,0.12)',
                color:        'var(--color-text-heading)',
                caretColor:   '#3d7eff',
              }}
            />
          </div>
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
          {shown.length > 0
            ? shown.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} inView={gridInView} />
              ))
            : (
              <div className="col-span-2 py-16 text-center">
                <p className="font-body text-base" style={{ color: 'var(--color-muted)' }}>
                  No articles found matching your search.
                </p>
              </div>
            )
          }
        </div>

        {/* Load more */}
        {visibleCount < filtered.length && (
          <div className="flex justify-center mb-16">
            <button
              onClick={() => setVisibleCount((v) => v + 6)}
              className="group inline-flex items-center gap-2 px-8 py-3.5 border border-border hover:border-blue-accent/40 font-display font-semibold text-sm rounded-full transition-all duration-300 hover:scale-105"
              style={{ color: 'var(--color-text-heading)' }}
            >
              Load More Articles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="transition-transform duration-200 group-hover:translate-y-0.5">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </button>
          </div>
        )}

        {/* ── Stay Informed - at bottom ── */}
        <StayInformed />
      </div>
    </section>
  );
};

// ─── STAY INFORMED ─────────────────────────────────────────────────────────────
const StayInformed = () => {
  const [ref, inView] = useInView();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); }
  };

  return (
    <div
      ref={ref}
      className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center dark-section"
      style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #1E1B4B 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
        opacity:   inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(.4,0,.2,1)',
      }}
    >
      {/* Blobs */}
      <div className="absolute top-[-20%] right-[-5%] w-64 h-64 rounded-full bg-white/5 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-5%] w-56 h-56 rounded-full bg-black/15 blur-[50px] pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
          style={{ background: 'rgba(61,126,255,0.25)', border: '1px solid rgba(61,126,255,0.4)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60b4ff" strokeWidth="1.8">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>

        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
          Stay Informed
        </h2>
        <p className="font-body text-sm sm:text-base mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Get monthly strategic insights delivered directly to your inbox.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 py-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span className="text-white font-body">You're subscribed. Thank you!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-full text-sm font-body outline-none"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                caretColor: '#3d7eff',
              }}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-[#1E3A8A] text-sm font-display font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] active:scale-95 whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
        )}

        <p className="font-body text-xs mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Zero spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

// ─── PAGE ASSEMBLY ─────────────────────────────────────────────────────────────
const BlogPage = () => {
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
      <AllBlogsSection />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default BlogPage;