import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useContactModal } from '../context/ContactModalContext';



const toRad = d => (d * Math.PI) / 180;

const project = (lat, lng, rotY, cx, cy, R) => {
  const phi    = toRad(lat);
  const lambda = toRad(lng + rotY);
  const x =  Math.cos(phi) * Math.sin(lambda);
  const y = -Math.sin(phi);
  const z =  Math.cos(phi) * Math.cos(lambda);
  return { sx: cx + R * x, sy: cy + R * y, z };
};

// ─── Responsive config hook ────────────────────────────────
// Returns globe pixel size + whether to show service nodes
const useGlobeConfig = () => {
  const compute = () => {
    const w = window.innerWidth;
    if (w < 400)  return { size: 220, showNodes: false };
    if (w < 480)  return { size: 250, showNodes: false };
    if (w < 640)  return { size: 290, showNodes: false };
    if (w < 768)  return { size: 330, showNodes: false };
    if (w < 1024) return { size: 370, showNodes: false };  // tablet: clean globe, no node overflow
    if (w < 1280) return { size: 400, showNodes: true  };
    return              { size: 460, showNodes: true  };
  };

  const [cfg, setCfg] = useState(compute);

  useEffect(() => {
    const update = () => setCfg(compute());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []); // eslint-disable-line

  return cfg;
};

// ═══════════════════════════════════════════════════════════
//  AURORA BACKGROUND - full hero canvas (ResizeObserver-aware)
// ═══════════════════════════════════════════════════════════
const AuroraBackground = ({ isDark }) => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let tick = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const bands = isDark ? [
      { yR:0.18, freq:0.0028, amp:0.14, ph:0.0, sp:0.007, rgb:'61,126,255', topA:0.055, midA:0.090 },
      { yR:0.32, freq:0.0035, amp:0.10, ph:1.8, sp:0.010, rgb:'30,160,255', topA:0.050, midA:0.085 },
      { yR:0.50, freq:0.0022, amp:0.16, ph:3.2, sp:0.006, rgb:'80,60,255',  topA:0.045, midA:0.080 },
      { yR:0.66, freq:0.0040, amp:0.09, ph:5.0, sp:0.013, rgb:'0,200,220',  topA:0.045, midA:0.075 },
      { yR:0.80, freq:0.0030, amp:0.12, ph:2.4, sp:0.009, rgb:'40,100,255', topA:0.050, midA:0.085 },
    ] : [
      { yR:0.15, freq:0.0028, amp:0.13, ph:0.0, sp:0.007, rgb:'61,126,255', topA:0.10, midA:0.18 },
      { yR:0.30, freq:0.0035, amp:0.11, ph:1.8, sp:0.010, rgb:'30,140,255', topA:0.08, midA:0.15 },
      { yR:0.50, freq:0.0022, amp:0.14, ph:3.2, sp:0.006, rgb:'80,60,200',  topA:0.07, midA:0.12 },
      { yR:0.65, freq:0.0040, amp:0.10, ph:5.0, sp:0.013, rgb:'0,160,210',  topA:0.07, midA:0.12 },
      { yR:0.82, freq:0.0030, amp:0.11, ph:2.4, sp:0.009, rgb:'61,100,220', topA:0.09, midA:0.16 },
    ];

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      bands.forEach(b => {
        const yBase = H * b.yR;
        const amp   = H * b.amp;
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W + 4; x += 4) {
          const y = yBase
            + Math.sin(x * b.freq + tick * b.sp + b.ph)                    * amp * 0.55
            + Math.sin(x * b.freq * 1.8 + tick * b.sp * 0.6 + b.ph + 1.2) * amp * 0.30
            + Math.sin(x * b.freq * 0.5 + tick * b.sp * 1.3 + b.ph + 2.4) * amp * 0.15;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, yBase - amp, 0, yBase + amp * 1.5);
        grad.addColorStop(0,    `rgba(${b.rgb},0)`);
        grad.addColorStop(0.30, `rgba(${b.rgb},${b.topA})`);
        grad.addColorStop(0.55, `rgba(${b.rgb},${b.midA})`);
        grad.addColorStop(1,    `rgba(${b.rgb},0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      tick++;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => { ro.disconnect(); cancelAnimationFrame(rafRef.current); };
  }, [isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// ═══════════════════════════════════════════════════════════
//  GLASS GLOBE - size-prop driven, re-mounts on resize
// ═══════════════════════════════════════════════════════════
const GlobeCanvas = ({ isDark, size }) => {
  const canvasRef = useRef(null);
  const rotRef    = useRef(20);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr  = Math.min(window.devicePixelRatio || 1, 2);
    const SIZE = size;
    canvas.width  = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width  = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.scale(dpr, dpr);

    const cx   = SIZE / 2;
    const cy   = SIZE / 2;
    const R    = SIZE * 0.36;
    const STEP = 12;

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      const rot = rotRef.current;

      // 1. Round outer glow
      const glowR = R * 1.52;
      const og = ctx.createRadialGradient(cx, cy, R * 0.48, cx, cy, glowR);
      if (isDark) {
        og.addColorStop(0,    'rgba(61,126,255,0.35)');
        og.addColorStop(0.38, 'rgba(61,126,255,0.14)');
        og.addColorStop(0.70, 'rgba(61,126,255,0.04)');
        og.addColorStop(1,    'rgba(61,126,255,0.00)');
      } else {
        og.addColorStop(0,    'rgba(61,126,255,0.28)');
        og.addColorStop(0.40, 'rgba(61,126,255,0.12)');
        og.addColorStop(0.72, 'rgba(61,126,255,0.03)');
        og.addColorStop(1,    'rgba(61,126,255,0.00)');
      }
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fillStyle = og;
      ctx.fill();

      // 2. Sphere clip
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      const bg = ctx.createRadialGradient(cx - R*0.22, cy - R*0.22, R*0.04, cx, cy, R);
      if (isDark) {
        bg.addColorStop(0,    'rgba(28,68,162,0.96)');
        bg.addColorStop(0.55, 'rgba(12,34,105,0.98)');
        bg.addColorStop(1,    'rgba(5,14,60,1.00)');
      } else {
        bg.addColorStop(0,    'rgba(190,220,255,0.82)');
        bg.addColorStop(0.50, 'rgba(150,195,255,0.88)');
        bg.addColorStop(1,    'rgba(100,158,240,0.94)');
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, SIZE, SIZE);

      // 3. Grid cells - back then front
      for (let pass = 0; pass < 2; pass++) {
        const isFront = pass === 1;
        for (let lat = -90 + STEP; lat <= 90; lat += STEP) {
          for (let lng = -180; lng < 180; lng += STEP) {
            const corners = [
              project(lat - STEP, lng,        rot, cx, cy, R),
              project(lat,        lng,        rot, cx, cy, R),
              project(lat,        lng + STEP, rot, cx, cy, R),
              project(lat - STEP, lng + STEP, rot, cx, cy, R),
            ];
            if (isFront && !corners.every(p => p.z >= 0)) continue;
            if (!isFront && !corners.every(p => p.z <  0)) continue;

            const depth = (corners.reduce((s, p) => s + p.z, 0) / 4 + 1) / 2;
            ctx.beginPath();
            ctx.moveTo(corners[0].sx, corners[0].sy);
            corners.slice(1).forEach(p => ctx.lineTo(p.sx, p.sy));
            ctx.closePath();

            if (isFront) {
              if (isDark) {
                ctx.fillStyle   = `rgba(90,170,255,${0.06 + depth * 0.20})`;
                ctx.strokeStyle = `rgba(140,205,255,${0.18 + depth * 0.30})`;
              } else {
                ctx.fillStyle   = `rgba(30,90,200,${0.04 + depth * 0.10})`;
                ctx.strokeStyle = `rgba(20,70,185,${0.28 + depth * 0.38})`;
              }
              ctx.lineWidth = 0.65;
            } else {
              ctx.fillStyle   = isDark ? 'rgba(30,80,180,0.05)'   : 'rgba(20,60,160,0.04)';
              ctx.strokeStyle = isDark ? 'rgba(100,160,255,0.07)' : 'rgba(20,60,160,0.06)';
              ctx.lineWidth   = 0.3;
            }
            ctx.fill();
            ctx.stroke();
          }
        }
      }

      // 4. Intersection dots
      for (let lat = -90; lat <= 90; lat += STEP) {
        for (let lng = -180; lng < 180; lng += STEP) {
          const p = project(lat, lng, rot, cx, cy, R);
          if (p.z < 0) continue;
          const depth = (p.z + 1) / 2;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 1.2 + depth * 1.0, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(185,225,255,${0.42 + depth * 0.52})`
            : `rgba(20,65,190,${0.55 + depth * 0.40})`;
          ctx.fill();
        }
      }

      // 5. Glass highlight
      const hl = ctx.createRadialGradient(cx - R*0.44, cy - R*0.40, 0, cx - R*0.10, cy - R*0.02, R*0.76);
      if (isDark) {
        hl.addColorStop(0,    'rgba(255,255,255,0.30)');
        hl.addColorStop(0.22, 'rgba(255,255,255,0.11)');
        hl.addColorStop(0.55, 'rgba(200,230,255,0.03)');
        hl.addColorStop(1,    'rgba(255,255,255,0.00)');
      } else {
        hl.addColorStop(0,    'rgba(255,255,255,0.55)');
        hl.addColorStop(0.20, 'rgba(255,255,255,0.22)');
        hl.addColorStop(0.50, 'rgba(220,235,255,0.07)');
        hl.addColorStop(1,    'rgba(255,255,255,0.00)');
      }
      ctx.fillStyle = hl;
      ctx.fillRect(0, 0, SIZE, SIZE);

      ctx.restore();

      // 6. Fresnel rim
      const rim = ctx.createRadialGradient(cx, cy, R*0.76, cx, cy, R*1.02);
      if (isDark) {
        rim.addColorStop(0,    'rgba(61,126,255,0.00)');
        rim.addColorStop(0.58, 'rgba(80,160,255,0.22)');
        rim.addColorStop(0.84, 'rgba(145,205,255,0.58)');
        rim.addColorStop(1,    'rgba(180,220,255,0.00)');
      } else {
        rim.addColorStop(0,    'rgba(30,100,230,0.00)');
        rim.addColorStop(0.58, 'rgba(40,120,240,0.20)');
        rim.addColorStop(0.84, 'rgba(61,140,255,0.50)');
        rim.addColorStop(1,    'rgba(100,170,255,0.00)');
      }
      ctx.beginPath();
      ctx.arc(cx, cy, R*1.02, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(165,218,255,0.82)' : 'rgba(40,110,230,0.65)';
      ctx.lineWidth   = 1.7;
      ctx.stroke();

      rotRef.current += 0.20;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [isDark, size]); // re-init when size or theme changes

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        filter: isDark
          ? 'drop-shadow(0 0 38px rgba(61,126,255,0.58)) drop-shadow(0 0 80px rgba(40,100,255,0.24))'
          : 'drop-shadow(0 0 30px rgba(61,126,255,0.38)) drop-shadow(0 0 60px rgba(61,126,255,0.16))',
      }}
    />
  );
};

// ═══════════════════════════════════════════════════════════
//  SERVICE NODES - 5 services at 72° apart (scale-aware)
//  Hidden on mobile/tablet, shown on desktop with CSS scale
// ═══════════════════════════════════════════════════════════
const DEG_R = 215; // orbit radius in base (460px) coordinates
const angAt = a => ({
  x: Math.round(Math.cos(toRad(a)) * DEG_R),
  y: Math.round(Math.sin(toRad(a)) * DEG_R),
});

const SERVICES = [
  { label: 'Data Integration',   ...angAt(-90),  anchor: 'top'   },
  { label: 'Cloud Services',     ...angAt(-18),  anchor: 'left'  },
  { label: 'Automation',         ...angAt(54),   anchor: 'left'  },
  { label: 'Digital Transform.', ...angAt(126),  anchor: 'right' },
  { label: 'Supply Chain',       ...angAt(198),  anchor: 'right' },
];

const ServiceNodes = ({ isDark, scale = 1 }) => {
  const svgRef = useRef(null);
  const rafRef = useRef(null);
  const pktRef = useRef(SERVICES.map((_, i) => ({ t: -(i * 0.25) })));

  useEffect(() => {
    const tick = () => {
      pktRef.current.forEach(p => {
        p.t += 0.0042;
        if (p.t > 1.28) p.t = -0.18;
      });
      const svg = svgRef.current;
      if (!svg) { rafRef.current = requestAnimationFrame(tick); return; }
      SERVICES.forEach((svc, i) => {
        const dot = svg.querySelector(`#pkt-${i}`);
        if (!dot) return;
        const t  = Math.max(0, Math.min(1, pktRef.current[i].t));
        dot.setAttribute('cx', `${300 + svc.x * t}`);
        dot.setAttribute('cy', `${300 + svc.y * t}`);
        dot.setAttribute('opacity', t > 0.04 && t < 0.95 ? '1' : '0');
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const dotFill = isDark ? '#8fd4ff' : '#1a5fd8';
  const lineCol = isDark ? 'rgba(110,185,255,0.30)' : 'rgba(30,100,220,0.26)';
  const ringCol = isDark ? 'rgba(100,175,255,0.45)' : 'rgba(30,100,220,0.40)';
  const pillBg  = isDark ? 'rgba(8,22,68,0.82)'    : 'rgba(230,240,255,0.88)';
  const pillBd  = isDark ? 'rgba(90,160,255,0.38)'  : 'rgba(40,110,230,0.30)';
  const textFill= isDark ? 'rgba(185,218,255,0.94)' : 'rgba(20,70,190,0.92)';

  const PW = 128;
  const PH = 26;

  const pillX = s => s.anchor === 'left'  ? 300 + s.x + 14
               : s.anchor === 'right' ? 300 + s.x - 14 - PW
               :                        300 + s.x - PW / 2;
  const pillY = s => s.anchor === 'top'
    ? 300 + s.y - PH - 14
    : 300 + s.y - PH / 2;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 600"
      width="640" height="640"
      className="absolute pointer-events-none"
      style={{
        top: '50%', left: '50%',
        transform: `translate(-50%,-50%) scale(${scale})`,
        transformOrigin: 'center center',
        overflow: 'visible',
      }}
    >
      <defs>
        <style>{`
          @keyframes pingA  { 0%{r:5;opacity:.85} 100%{r:22;opacity:0} }
          @keyframes pingB  { 0%{r:5;opacity:.55} 100%{r:18;opacity:0} }
          @keyframes driftD { to{stroke-dashoffset:-28} }
          .la  { animation: driftD 1.4s linear infinite; }
          .pa1 { animation: pingA  2.6s ease-out infinite; }
          .pa2 { animation: pingB  2.6s ease-out infinite 1.3s; }
        `}</style>
        <filter id="glo" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {SERVICES.map((svc, i) => {
        const nx  = 300 + svc.x;
        const ny  = 300 + svc.y;
        const px  = pillX(svc);
        const py  = pillY(svc);
        const del = `${i * 0.32}s`;
        return (
          <g key={svc.label}>
            <line x1="300" y1="300" x2={nx} y2={ny}
              stroke={lineCol} strokeWidth="1.1"
              strokeDasharray="7 7" className="la"
              style={{ animationDelay:`${i*0.27}s` }} />
            <circle id={`pkt-${i}`} r="3.6" fill={dotFill} opacity="0" filter="url(#glo)" />
            <circle cx={nx} cy={ny} r="5" fill="none" stroke={ringCol} strokeWidth="1.2"
              className="pa1" style={{ animationDelay:del }} />
            <circle cx={nx} cy={ny} r="5" fill="none" stroke={ringCol} strokeWidth="1"
              className="pa2" style={{ animationDelay:del }} />
            <circle cx={nx} cy={ny} r="5.5" fill={dotFill} filter="url(#glo)" />
            <rect x={px} y={py} width={PW} height={PH} rx="13"
              fill={pillBg} stroke={pillBd} strokeWidth="0.8" />
            <text x={px + PW/2} y={py + PH/2 + 4.5}
              textAnchor="middle" fontSize="10.5" fontWeight="600"
              fontFamily="inherit" fill={textFill} letterSpacing="0.3">
              {svc.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════
//  MOBILE SERVICE PILLS - shown below globe on small screens
// ═══════════════════════════════════════════════════════════
const MobileServicePills = ({ isDark }) => {
  const pillBase = isDark
    ? 'border border-blue-400/30 bg-blue-950/50 text-blue-200'
    : 'border border-blue-300/50 bg-blue-50/80 text-blue-800';

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 px-4 lg:hidden">
      {['Supply Chain','Data Integration','Digital Transform.','Cloud Services','Automation'].map(s => (
        <span key={s}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide ${pillBase}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
          {s}
        </span>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
//  HERO SECTION
// ═══════════════════════════════════════════════════════════
const HeroSection = () => {
  const [visible,  setVisible]  = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { size: globeSize, showNodes } = useGlobeConfig();
  const { openModal } = useContactModal();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const h = e => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const fade = d => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${d}s, transform 0.7s ease ${d}s`,
  });

  // Globe container height: tight on mobile (no nodes), roomy on desktop (nodes extend beyond globe)
  const globeContainerH = showNodes
    ? 'h-[520px] xl:h-[580px]'
    : `h-[${globeSize + 20}px]`;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
    >
      {/* Aurora - adapts to full width automatically */}
      <AuroraBackground isDark={isDark} />

      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 55% at ${mousePos.x*100}% ${mousePos.y*100}%, rgba(61,126,255,0.07) 0%, transparent 70%)`,
          transition: 'background 0.7s ease',
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-blue-accent/4 rounded-full blur-[100px] lg:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-blue-dark/6 rounded-full blur-[70px] lg:blur-[90px] pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10 sm:pt-24 sm:pb-12 lg:pt-8 lg:pb-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-8 items-center">

          {/* ── Left: copy ── */}
          <div className="text-center lg:text-left order-1 lg:order-1">
            {/* Badge */}
            <div style={fade(0.1)} className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 rounded-full border border-blue-accent/30 bg-blue-accent/10 mb-6 sm:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-accent animate-pulse" />
              <span className="text-blue-light text-[11px] sm:text-xs font-body font-medium tracking-wide">
                Next-Gen Consulting Solutions
              </span>
            </div>

            {/* Headline */}
            <h1
              style={fade(0.25)}
              className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl leading-[1.45] sm:leading-[1.5] lg:leading-[1.05] tracking-tight mb-5 sm:mb-8"
            >
              <span className="text-white block">We Build the</span>
              <span className="text-blue-gradient">Technology Infrastructure</span>
              <span className="text-white block">That Powers Your Growth.</span>
            </h1>

            {/* Sub-copy */}
            <p
              style={fade(0.4)}
              className="text-muted text-sm sm:text-base lg:text-lg font-body leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 sm:mb-10"
            >
              Acespire Solutions helps enterprises modernize faster, operate smarter, and scale with confidence.
            </p>

            {/* CTA */}
            <div style={fade(0.55)} className="flex justify-center lg:justify-start">
               <button
    onClick={() => openModal({ enquiryType: 'business', sourcePage: 'Home Page' })}
    className="group inline-flex items-center gap-3 px-5 py-3 sm:px-7 sm:py-4 bg-blue-accent hover:bg-blue-dark text-always-white text-sm sm:text-base font-display font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(61,126,255,0.55)] hover:scale-105 active:scale-95"
  >
    Request Strategy Session
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      className="transition-transform duration-200 group-hover:translate-x-1">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </button>
            </div>
          </div>

          {/* ── Right: Globe ── */}
          <div
            className="relative order-2 lg:order-2 flex flex-col items-center justify-center"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s',
            }}
          >
            {/* Globe + nodes wrapper */}
            <div
              className="relative flex items-center justify-center"
              style={{
                // Height accommodates globe + node overflow on desktop
                height: showNodes
                  ? Math.max(globeSize + 180, 520)
                  : globeSize + 24,
                width: showNodes
                  ? Math.max(globeSize + 200, 560)
                  : globeSize + 24,
              }}
            >
              {/* Service nodes (desktop only - shown via showNodes flag) */}
              {/* {showNodes && (
                <ServiceNodes
                  isDark={isDark}
                  scale={globeSize / 460}
                />
              )} */}

              {/* Globe - key forces remount on size change */}
              <GlobeCanvas
                key={`globe-${globeSize}`}
                size={globeSize}
                isDark={isDark}
              />
            </div>

            {/* Service pills (mobile/tablet only) */}
            {/* {!showNodes && <MobileServicePills isDark={isDark} />} */}
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;