import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import useInView from '../hooks/useInView';
import Footer from '../components/Footer';
import blogPosts, { blogCategories } from './Blogdata';
import { useTheme } from '../hooks/useTheme';
import Chatbot from '../Home/Chatbot';

// ─── Content formatter — same spacious style as CaseStudyDetail ───────────────
const formatContent = (content) => {
  if (!content) return [];

  return content
    .split('\n')
    .map((line, index) => {
      const clean = line.trim();
      if (!clean) return null;

      // Bullet points
      if (clean.startsWith('- ')) {
        return (
          <div key={`b-${index}`} className="flex items-start gap-3 mb-3 ml-2">
            <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#3d7eff' }} />
            <p className="font-body text-base lg:text-lg leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {clean.slice(2)}
            </p>
          </div>
        );
      }

      // Section headers — ALL CAPS words or title-case standalone lines
      if (
        clean.match(/^[A-Z][a-zA-Z\s&,:/-]{4,}$/) &&
        !clean.endsWith('.') &&
        !clean.startsWith('-') &&
        clean.length < 80
      ) {
        return (
          <h2
            key={`h-${index}`}
            className="font-display font-bold text-2xl mt-14 mb-6 pb-3"
            style={{
              color: 'var(--color-text-heading)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {clean}
          </h2>
        );
      }

      // Numbered items with colon → inline bold title + description
      if (clean.match(/^\d+\.\s[A-Z]/)) {
        const dotIdx = clean.indexOf('. ');
        const num  = clean.slice(0, dotIdx);
        const rest = clean.slice(dotIdx + 2);
        const colonIdx = rest.indexOf(':');
        const hasColon = colonIdx > 0 && colonIdx < 80;

        if (hasColon) {
          const title = rest.slice(0, colonIdx).trim();
          const desc  = rest.slice(colonIdx + 1).trim();
          return (
            <p key={`n-${index}`} className="font-body text-base lg:text-lg leading-relaxed mb-5"
              style={{ color: 'var(--color-muted)' }}>
              <span className="font-bold" style={{ color: 'var(--color-text-heading)' }}>
                {num}. {title}:
              </span>{' '}
              {desc}
            </p>
          );
        }
        return (
          <p key={`n-${index}`} className="font-body text-base lg:text-lg leading-relaxed mb-5"
            style={{ color: 'var(--color-muted)' }}>
            <span className="font-bold" style={{ color: 'var(--color-text-heading)' }}>{num}.</span>{' '}
            {rest}
          </p>
        );
      }

      // What this means — highlight line
      if (clean.startsWith('What this means for businesses:')) {
        const parts = clean.split('What this means for businesses:');
        return (
          <p key={`wt-${index}`} className="font-body text-sm sm:text-base leading-relaxed mb-6 mt-2 pl-4 py-2 rounded-lg"
            style={{
              color: 'var(--color-muted)',
              borderLeft: '3px solid #3d7eff',
              background: 'rgba(61,126,255,0.06)',
            }}>
            <span className="font-semibold" style={{ color: '#60b4ff' }}>What this means for businesses: </span>
            {parts[1]}
          </p>
        );
      }

      // Impact lines
      if (clean.startsWith('Impact:') || clean.startsWith('**Impact:**')) {
        const text = clean.replace(/\*\*/g, '').replace('Impact:', '').trim();
        return (
          <p key={`imp-${index}`} className="font-body text-sm leading-relaxed mb-5 pl-4 py-1.5 rounded-lg"
            style={{
              color: 'var(--color-muted)',
              borderLeft: '3px solid #34d399',
              background: 'rgba(52,211,153,0.05)',
            }}>
            <span className="font-semibold" style={{ color: '#34d399' }}>Impact: </span>
            {text}
          </p>
        );
      }

      // Regular paragraph
      return (
        <p key={`p-${index}`} className="font-body text-base lg:text-lg leading-relaxed mb-6"
          style={{ color: 'var(--color-muted)' }}>
          {clean.replace(/\*\*/g, '')}
        </p>
      );
    })
    .filter(Boolean);
};

// ─── RELATED BLOG CAROUSEL ────────────────────────────────────────────────────
const BlogCarousel = ({ label, items, currentId }) => {
  const filtered = items.filter((b) => b.id !== currentId);
  const [idx, setIdx] = useState(0);

  useEffect(() => { setIdx(0); }, [currentId, filtered.length]);

  const next = useCallback(
    () => setIdx((i) => (i + 1) % filtered.length),
    [filtered.length]
  );
  const prev = () => setIdx((i) => (i - 1 + filtered.length) % filtered.length);

  useEffect(() => {
    if (filtered.length <= 1) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [filtered.length, next]);

  if (filtered.length === 0) return null;

  const safeIdx = Math.min(idx, filtered.length - 1);
  const post = filtered[safeIdx];
  if (!post) return null;

  return (
    <div className="mb-8">
      <p className="font-display font-bold text-xs tracking-widest uppercase mb-3" style={{ color: '#3d7eff' }}>
        {label}
      </p>

      <div className="light-card rounded-xl overflow-hidden border transition-all duration-300"
        style={{ background: 'rgba(24,28,42,0.7)', borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="w-full overflow-hidden" style={{ height: 140 }}>
             <Link to={`/blogs/${post.id}`}>
          <img src={post.image} alt={post.title}
            className="w-full h-full object-cover object-top transition-transform duration-500"
            draggable={false} />
            </Link>
        </div>

        <div className="p-4">
             <Link to={`/blogs/${post.id}`}>
          <p className="font-body text-xs mb-1.5" style={{ color: 'var(--color-muted)' }}>
            {post.category}
            <span className="mx-1.5" style={{ color: '#3d7eff' }}>•</span>
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
          <h4 className="font-display font-semibold text-sm leading-snug mb-3"
            style={{ color: 'var(--color-text-heading)' }}>
            {post.title}
          </h4>

          <div className="flex items-center justify-between pt-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <Link to={`/blogs/${post.id}`}
              className="font-body text-xs font-semibold tracking-wide hover:text-blue-light transition-colors"
              style={{ color: '#3d7eff' }}>
              READ MORE →
            </Link>

            {filtered.length > 1 && (
              <div className="flex items-center gap-1.5">
                <button onClick={prev}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(61,126,255,0.15)', border: '1px solid rgba(61,126,255,0.3)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <div className="flex gap-1">
                  {filtered.map((_, i) => (
                    <button key={i} onClick={() => setIdx(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width:      i === safeIdx ? 14 : 6,
                        height:     6,
                        background: i === safeIdx ? '#3d7eff' : 'rgba(255,255,255,0.2)',
                      }} />
                  ))}
                </div>
                <button onClick={next}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(61,126,255,0.15)', border: '1px solid rgba(61,126,255,0.3)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3d7eff" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find((b) => b.id === slug);
  const glowRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const move = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top  = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [slug]);

  if (!post) return <Navigate to="/blogs" replace />;

  return (
    <div className="relative bg-primary min-h-screen">
      <div ref={glowRef}
        className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(61,126,255,0.04) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.18s ease-out, top 0.18s ease-out',
        }} />
      <HeroBlock post={post} />
      <MainContent post={post} />
      <Footer />
    </div>
  );
};

// ─── HERO BLOCK ───────────────────────────────────────────────────────────────
const HeroBlock = ({ post }) => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay) => ({
    opacity:   visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <>
      {/* ── Section 1: Image only ── */}
      <section className="relative pt-16" style={{ background: '#000' }}>
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.2s' }}>
          {/* Desktop */}
          <div className="hidden sm:block w-full overflow-hidden" style={{ height: '72vh' }}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover object-top block"
              draggable={false}
            />
          </div>
          {/* Mobile square */}
          <div className="sm:hidden w-full overflow-hidden" style={{ aspectRatio: '1/1' }}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover object-top block"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* ── Section 2: Title block — separate section, explicit bg ── */}
      <section
        style={{
          background:   isDark ? '#13161f' : '#ffffff',
          borderBottom: isDark
            ? '1px solid rgba(61,126,255,0.15)'
            : '1px solid rgba(61,126,255,0.2)',
        }}
      >
        <div className="w-full px-4 sm:px-10 lg:px-16 py-8">

          {/* Breadcrumb */}
          <div style={fade(0.1)} className="flex items-center gap-2 text-xs mb-5">
            <Link
              to="/blogs"
              className="hover:text-blue-accent transition-colors font-body"
              style={{ color: 'var(--color-muted)' }}
            >
              Blogs
            </Link>
            <span style={{ color: 'var(--color-muted)' }}>/</span>
            <span
              className="font-body truncate max-w-[200px] sm:max-w-lg"
              style={{ color: 'var(--color-muted)', opacity: 0.6 }}
            >
              {post.title}
            </span>
          </div>

          {/* Badges */}
          <div style={fade(0.2)} className="flex flex-wrap gap-2 mb-5">
            <span
              className="px-3.5 py-1.5 rounded-full text-xs font-body font-semibold tracking-wide"
              style={{
                border:     '1px solid rgba(61,126,255,0.35)',
                background: 'rgba(61,126,255,0.1)',
                color:      '#3d7eff',
              }}
            >
              {post.category}
            </span>
            <span
              className="px-3.5 py-1.5 rounded-full text-xs font-body"
              style={{
                border:     isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61,126,255,0.2)',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(61,126,255,0.06)',
                color:      'var(--color-muted)',
              }}
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
            <span
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-body"
              style={{
                border:     isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(61,126,255,0.2)',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(61,126,255,0.06)',
                color:      'var(--color-muted)',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              ...fade(0.3),
              color: isDark ? '#ffffff' : '#0d0f16',
            }}
            className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl leading-tight"
          >
            {post.title}
          </h1>
        </div>
      </section>
    </>
  );
};

// ─── MAIN CONTENT + SIDEBAR ───────────────────────────────────────────────────
const MainContent = ({ post }) => {
  const [ref, inView] = useInView();

  return (
    <section className="relative py-10 bg-primary overflow-hidden">
      <div ref={ref} className="w-full px-4 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 items-start">

          {/* LEFT: article */}
          <div style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(.4,0,.2,1)',
          }}>
            {/* Author */}
            <div className="flex items-center gap-3 mb-8 pb-5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-base text-white"
                style={{ background: 'linear-gradient(135deg, #3d7eff, #1a4fcf)' }}>
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="font-display font-semibold text-sm" style={{ color: 'var(--color-text-heading)' }}>
                  {post.author.name}
                </p>
                <p className="font-body text-xs" style={{ color: 'var(--color-muted)' }}>
                  {post.author.role}
                </p>
              </div>
            </div>

            {/* Subtitle */}
            <p className="font-body text-base sm:text-lg leading-relaxed mb-8 pl-4 py-2 rounded-lg"
              style={{ borderLeft: '3px solid #3d7eff', color: 'var(--color-muted)', background: 'rgba(61,126,255,0.04)' }}>
              {post.subtitle}
            </p>

            {/* Article body */}
            <div>{formatContent(post.content)}</div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[post.category, post.blogType].map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-body"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'var(--color-muted)' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Back */}
            <div className="mt-8">
              <Link to="/blogs"
                className="group inline-flex items-center gap-2 text-sm font-body text-blue-accent hover:text-blue-light transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="transition-transform duration-200 group-hover:-translate-x-1">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Back to Blogs
              </Link>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-24 space-y-8"
            style={{
              opacity:   inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(20px)',
              transition: 'all 0.8s cubic-bezier(.4,0,.2,1) 0.2s',
            }}>
            <h2 className="font-display font-semibold text-lg mb-6 pb-4"
              style={{ color: 'var(--color-text-heading)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              More Articles
            </h2>

            {blogCategories.filter((c) => c !== 'All').map((cat) => {
              const catItems = blogPosts.filter((b) => b.id !== post.id && b.category === cat);
              if (catItems.length === 0) return null;
              return (
                <BlogCarousel key={cat} label={cat} items={catItems} currentId={post.id} />
              );
            })}

            {/* CTA */}
            <div className="mt-4 p-5 rounded-2xl text-center dark-section"
              style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E1B4B 100%)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="font-display font-bold text-white text-sm mb-1.5">
                Want to learn more?
              </p>
              <p className="font-body text-xs mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Talk to our experts about your supply chain challenges.
              </p>
              <Link to="/contact"
                className="block w-full py-2.5 bg-blue-accent hover:bg-blue-dark text-white text-xs font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_16px_rgba(61,126,255,0.5)]">
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </div>
      <Chatbot />
    </section>
    
  );
};

export default BlogDetail;