import React, { useState, useEffect, useRef } from "react";

/* ─── GLOBAL STYLES ─────────────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #080808; color: #e2e2e2; font-family: 'DM Sans', -apple-system, sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #080808; }
    ::-webkit-scrollbar-thumb { background: #222; border-radius: 4px; }
    .f-syne { font-family: 'Syne', -apple-system, sans-serif; }
    .f-dm   { font-family: 'DM Sans', -apple-system, sans-serif; }

    /* --- Animations --- */
    @keyframes fadeUp   { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes pulse-dot{ 0%,100%{opacity:1;} 50%{opacity:.35;} }
    @keyframes drift    { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-7px);} }
    @keyframes scan     { 0%{top:0%} 100%{top:100%} }
    @keyframes shimmer  { 0%,100%{opacity:.25;} 50%{opacity:.55;} }

    /* --- Scroll reveal --- */
    .sr { opacity:0; transform:translateY(20px); transition:opacity .65s cubic-bezier(.16,1,.3,1), transform .65s cubic-bezier(.16,1,.3,1); }
    .sr.on { opacity:1; transform:translateY(0); }

    /* --- Cards --- */
    .card {
      background: #101010;
      border: 1px solid rgba(255,255,255,.055);
      border-radius: 14px;
      transition: border-color .25s ease, transform .25s cubic-bezier(.16,1,.3,1);
    }
    .card:hover { border-color: rgba(255,255,255,.12); transform:translateY(-2px); }

    /* --- Buttons --- */
    .btn-w {
      background:#ececec; color:#080808;
      font-family:'DM Sans',sans-serif; font-weight:500; border:none; cursor:pointer;
      transition: background .2s ease, transform .15s ease;
    }
    .btn-w:hover { background:#fff; transform:translateY(-1px); }
    .btn-g {
      background:transparent; color:#e2e2e2;
      font-family:'DM Sans',sans-serif; font-weight:400;
      border:1px solid rgba(255,255,255,.1); cursor:pointer;
      transition: border-color .2s ease, background .2s ease, transform .15s ease;
    }
    .btn-g:hover { border-color:rgba(255,255,255,.2); background:rgba(255,255,255,.04); transform:translateY(-1px); }

    /* --- Nav --- */
    .nav-bg {
      background:rgba(8,8,8,.82) !important;
      backdrop-filter: blur(22px) !important;
      -webkit-backdrop-filter: blur(22px) !important;
      border-bottom: 1px solid rgba(255,255,255,.055) !important;
    }

    /* --- Gradient text --- */
    .g-text {
      background: linear-gradient(175deg, #f0f0f0 10%, #484848 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* --- Online dot --- */
    .dot-live { animation: pulse-dot 2.2s ease-in-out infinite; }

    /* --- FAQ --- */
    .faq-body {
      max-height: 0; overflow: hidden; opacity: 0;
      transition: max-height .38s cubic-bezier(.16,1,.3,1), opacity .3s ease;
    }
    .faq-body.open { max-height: 360px; opacity: 1; }

    /* --- Social card --- */
    .soc {
      border: 1px solid rgba(255,255,255,.065);
      border-radius: 14px;
      transition: border-color .25s ease, transform .25s ease, background .25s ease;
    }
    .soc:hover { border-color: rgba(255,255,255,.16); background: rgba(255,255,255,.025); transform:translateY(-2px); }

    /* --- Dashboard --- */
    .db-bar { transition: height .6s cubic-bezier(.16,1,.3,1); }

    /* --- Hero grid --- */
    .hero-grid {
      background-image:
        radial-gradient(ellipse 65% 42% at 50% 0%, rgba(255,255,255,.032) 0%, transparent 68%),
        linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
      background-size: auto, 72px 72px, 72px 72px;
      mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 35%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 35%, transparent 100%);
    }
    .hero-glow {
      background: radial-gradient(ellipse 60% 40% at 50% 40%, rgba(255,255,255,.012) 0%, transparent 70%);
    }

    /* --- Float decoration --- */
    .float { animation: drift 5s ease-in-out infinite; }

    /* Footer links */
    .flink { color:#2e2e2e; text-decoration:none; font-size:13px; transition:color .2s ease; }
    .flink:hover { color:#777; }
  `}</style>
);

/* ─── ICON LIBRARY ──────────────────────────────────────────── */
const Ic = ({ d, size = 20, sw = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {typeof d === 'string' ? <path d={d} /> : d}
  </svg>
);
const IcBrain = (p) => <Ic {...p} d={<><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></>} />;
const IcZap = (p) => <Ic {...p} d={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>} />;
const IcChart = (p) => <Ic {...p} d={<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></>} />;
const IcCpu = (p) => <Ic {...p} d={<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></>} />;
const IcRefresh = (p) => <Ic {...p} d={<><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></>} />;
const IcSliders = (p) => <Ic {...p} d={<><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>} />;
const IcTarget = (p) => <Ic {...p} d={<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>} />;
const IcUsers = (p) => <Ic {...p} d={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>} />;
const IcDl = (p) => <Ic {...p} d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>} />;
const IcArrow = ({ size = 14 }) => <Ic size={size} d={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />;
const IcPlus = ({ size = 15 }) => <Ic size={size} sw={2} d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} />;
const IcMinus = ({ size = 15 }) => <Ic size={size} sw={2} d={<line x1="5" y1="12" x2="19" y2="12"/>} />;
const IcStar = (p) => <Ic {...p} d={<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>} />;
const IcShield = (p) => <Ic {...p} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;

const IcTelegram = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
  </svg>
);
const IcTikTok = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l.04-8.95a8.24 8.24 0 0 0 4.82 1.55V4.47a4.85 4.85 0 0 1-1.09-.22z"/>
  </svg>
);
const IcDiscord = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.016.01.033.021.043a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

/* ─── HOOK: scroll reveal ────────────────────────────────────── */
function useSR(ref, delay = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const nodes = el.querySelectorAll('.sr');
        nodes.forEach((n, i) => setTimeout(() => n.classList.add('on'), delay + i * 75));
        obs.disconnect();
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

/* ─── HOOK: window width ─────────────────────────────────────── */
function useW() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

/* ─── SECTION LABEL ──────────────────────────────────────────── */
const SLabel = ({ text }) => (
  <span className="f-dm" style={{
    fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase',
    color: '#3a3a3a', display: 'block', marginBottom: '16px',
  }}>{text}</span>
);

/* ─── NAVBAR ─────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const w = useW();
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className={scrolled ? 'nav-bg' : ''} style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      padding: '0 clamp(1.25rem, 4vw, 2.5rem)',
      height: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all .35s ease',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{
          width: 30, height: 30, background: '#ececec', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="f-syne" style={{ fontWeight: 800, fontSize: 13, color: '#080808' }}>A</span>
        </div>
        <span className="f-syne" style={{ fontWeight: 700, fontSize: 15, color: '#e2e2e2' }}>Affow</span>
      </div>

      {/* Links */}
      {w > 720 && (
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {['Features', 'Dashboard', 'FAQ', 'Community'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="f-dm" style={{
              color: '#3e3e3e', textDecoration: 'none', fontSize: 13,
              transition: 'color .2s',
            }}
              onMouseEnter={e => e.target.style.color = '#aaa'}
              onMouseLeave={e => e.target.style.color = '#3e3e3e'}
            >{l}</a>
          ))}
        </div>
      )}

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="f-dm" style={{
          fontSize: 10, color: '#3a3a3a', letterSpacing: '.09em', textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,.07)', borderRadius: 100, padding: '4px 11px',
        }}>Early Access</span>
        <button className="btn-w" style={{ padding: '7px 16px', borderRadius: 8, fontSize: 13 }}>
          Get Started
        </button>
      </div>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function Hero() {
  const [online, setOnline] = useState(2347);
  const [in_, setIn] = useState(false);
  useEffect(() => {
    setTimeout(() => setIn(true), 80);
    const t = setInterval(() => {
      setOnline(p => Math.max(2042, Math.min(3000, p + Math.floor(Math.random() * 7) - 3)));
    }, 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: 'clamp(110px,15vw,140px) clamp(1.25rem,4vw,2.5rem) 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG grid */}
      <div className="hero-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div className="hero-glow" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Decorative rings */}
      <div style={{
        position: 'absolute', width: 520, height: 520,
        borderRadius: '50%', border: '1px solid rgba(255,255,255,.025)',
        top: '50%', left: '50%', transform: 'translate(-50%,-55%)',
        pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', width: 320, height: 320,
        borderRadius: '50%', border: '1px solid rgba(255,255,255,.035)',
        top: '50%', left: '50%', transform: 'translate(-50%,-58%)',
        pointerEvents: 'none',
      }}/>

      <div style={{
        position: 'relative', maxWidth: 840,
        opacity: in_ ? 1 : 0, transform: in_ ? 'translateY(0)' : 'translateY(26px)',
        transition: 'all .9s cubic-bezier(.16,1,.3,1)',
      }}>
        {/* Badge row */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 38, flexWrap: 'wrap' }}>
          <span className="f-dm" style={{
            fontSize: 10, color: '#3a3a3a', letterSpacing: '.1em', textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,.07)', borderRadius: 100, padding: '4px 13px',
          }}>v2.4.1 — Production</span>

          <span className="f-dm" style={{
            fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
            background: 'rgba(255,255,255,.055)', color: '#c0c0c0',
            border: '1px solid rgba(255,255,255,.1)', borderRadius: 100, padding: '4px 13px',
          }}>Early Access</span>

          <span className="f-dm" style={{
            fontSize: 10, color: '#4a4a4a', letterSpacing: '.07em',
            border: '1px solid rgba(255,255,255,.07)', borderRadius: 100, padding: '4px 13px',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span className="dot-live" style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}/>
            {online.toLocaleString()} online now
          </span>
        </div>

        {/* Headline */}
        <h1 className="f-syne g-text" style={{
          fontSize: 'clamp(34px, 6.5vw, 76px)',
          fontWeight: 800, lineHeight: 1.05,
          letterSpacing: '-0.035em', marginBottom: 26,
        }}>
          The Future of Competitive<br />Brawl Stars Assistance
        </h1>

        {/* Sub */}
        <p className="f-dm" style={{
          fontSize: 'clamp(15px,1.8vw,18px)', color: '#444', lineHeight: 1.75,
          maxWidth: 560, margin: '0 auto 48px', fontWeight: 300,
        }}>
          Advanced AI-driven systems designed for modern<br />competitive gameplay optimization.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-w" style={{
            padding: '13px 26px', borderRadius: 10, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <IcDl size={15} /> Download
          </button>
          <button className="btn-g" style={{
            padding: '13px 26px', borderRadius: 10, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <IcUsers size={15} /> Community
          </button>
          <button className="btn-g" style={{
            padding: '13px 26px', borderRadius: 10, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            Learn More <IcArrow size={13} />
          </button>
        </div>
      </div>

      {/* Scroll line */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        opacity: in_ ? .35 : 0, transition: 'opacity 1s ease 1.2s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <span className="f-dm" style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#333' }}>Scroll</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, #444, transparent)' }}/>
      </div>
    </section>
  );
}

/* ─── WHY CHOOSE ─────────────────────────────────────────────── */
const features = [
  { Icon: IcBrain,   title: 'Intelligent Architecture',  desc: 'A multi-layer AI core processes gameplay patterns in real time — adaptive, precise, and built to evolve alongside every meta shift.' },
  { Icon: IcCpu,     title: 'Adaptive Systems',          desc: 'Dynamic modules recalibrate continuously using community telemetry. No manual tuning. The platform learns so you don\'t have to.' },
  { Icon: IcZap,     title: 'Zero-Friction Experience',  desc: 'Sub-100ms response across all supported environments. Clean interfaces, seamless integration — designed to stay invisible in use.' },
  { Icon: IcRefresh, title: 'Rapid Update Cycle',        desc: 'A rolling deployment pipeline responds to Brawl Stars patches within hours, not days. Your competitive edge is never interrupted.' },
  { Icon: IcChart,   title: 'Advanced Optimization',     desc: 'Deep performance telemetry across every competitive dimension — from macro decision patterns to micro mechanic efficiency scores.' },
  { Icon: IcSliders, title: 'Premium Tech Stack',        desc: 'Edge-deployed inference models, encrypted pipelines, and a constantly evolving feature set engineered specifically for serious play.' },
];

function WhyChoose() {
  const ref = useRef(null);
  useSR(ref);
  return (
    <section id="features" ref={ref} style={{ padding: 'clamp(80px,10vw,120px) clamp(1.25rem,4vw,2.5rem)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div className="sr" style={{ marginBottom: 64, textAlign: 'center' }}>
          <SLabel text="Why Affow" />
          <h2 className="f-syne" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#e2e2e2', marginBottom: 16 }}>
            Built differently.
          </h2>
          <p className="f-dm" style={{ color: '#3e3e3e', fontSize: 16, maxWidth: 440, margin: '0 auto', lineHeight: 1.75 }}>
            Most tools stop at features. Affow is a system — one that compounds in value the more you play.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 14 }}>
          {features.map(({ Icon, title, desc }, i) => (
            <div key={i} className="sr card" style={{ padding: 28, transitionDelay: `${i*60}ms` }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'rgba(255,255,255,.045)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#666', marginBottom: 18,
              }}>
                <Icon size={17} />
              </div>
              <h3 className="f-syne" style={{ fontSize: 15, fontWeight: 700, color: '#d8d8d8', marginBottom: 10, letterSpacing: '-.01em' }}>
                {title}
              </h3>
              <p className="f-dm" style={{ fontSize: 13.5, color: '#3a3a3a', lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STATISTICS ─────────────────────────────────────────────── */
const statsData = [
  { val: 5000, suf: '+',  label: 'Active Users',     sub: 'and growing' },
  { val: 5000, suf: '+',  label: 'Downloads',         sub: 'all platforms' },
  { val: 98,   suf: '%',  label: 'Uptime',            sub: 'production' },
  { val: 2400, suf: '+',  label: 'Live Sessions',     sub: 'right now' },
  { val: 40,   suf: 'ms', label: 'Avg Latency',       sub: 'AI inference' },
  { val: 72,   suf: 'h',  label: 'Update Cycle',      sub: 'post-patch' },
];

function StatCard({ val, suf, label, sub, active, delay }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 1800, t0 = Date.now();
    const run = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const e = 1 - (1 - p) ** 3;
      setN(Math.round(e * val));
      if (p < 1) requestAnimationFrame(run);
    };
    const id = setTimeout(() => requestAnimationFrame(run), delay);
    return () => clearTimeout(id);
  }, [active, val, delay]);
  return (
    <div style={{
      background: '#0d0d0d', border: '1px solid rgba(255,255,255,.055)',
      borderRadius: 14, padding: '28px 20px', textAlign: 'center',
    }}>
      <div className="f-syne" style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-.05em', color: '#e2e2e2', lineHeight: 1, marginBottom: 8 }}>
        {n.toLocaleString()}{suf}
      </div>
      <div className="f-dm" style={{ fontSize: 13, color: '#aaa', marginBottom: 4, fontWeight: 500 }}>{label}</div>
      <div className="f-dm" style={{ fontSize: 11, color: '#2e2e2e' }}>{sub}</div>
    </div>
  );
}

function Statistics() {
  const ref = useRef(null);
  const [act, setAct] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAct(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} style={{
      padding: 'clamp(80px,10vw,120px) clamp(1.25rem,4vw,2.5rem)',
      borderTop: '1px solid rgba(255,255,255,.04)',
      borderBottom: '1px solid rgba(255,255,255,.04)',
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60,
          opacity: act ? 1 : 0, transform: act ? 'none' : 'translateY(20px)',
          transition: 'all .6s cubic-bezier(.16,1,.3,1)',
        }}>
          <SLabel text="By the Numbers" />
          <h2 className="f-syne" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 800, letterSpacing: '-.03em', color: '#e2e2e2' }}>
            Growing fast.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: 12 }}>
          {statsData.map((s, i) => <StatCard key={i} {...s} active={act} delay={i * 90} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── DASHBOARD PREVIEW ──────────────────────────────────────── */
const chartBars = [40, 55, 47, 68, 63, 78, 72, 84, 80, 88, 86, 95];

function Dashboard() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const w = useW();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const slim = w < 780;
  return (
    <section id="dashboard" ref={ref} style={{ padding: 'clamp(80px,10vw,120px) clamp(1.25rem,4vw,2.5rem)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 56,
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(22px)',
          transition: 'all .7s cubic-bezier(.16,1,.3,1)',
        }}>
          <SLabel text="Platform Preview" />
          <h2 className="f-syne" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 800, letterSpacing: '-.03em', color: '#e2e2e2', marginBottom: 14 }}>
            The dashboard.
          </h2>
          <p className="f-dm" style={{ color: '#3e3e3e', fontSize: 15 }}>Live analytics. AI insights. Real-time performance tracking.</p>
        </div>

        {/* Mockup shell */}
        <div style={{
          background: '#0c0c0c', border: '1px solid rgba(255,255,255,.075)',
          borderRadius: 20, overflow: 'hidden',
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(28px) scale(.985)',
          transition: 'all .85s cubic-bezier(.16,1,.3,1) .12s',
        }}>
          {/* Browser bar */}
          <div style={{
            padding: '12px 18px', background: '#090909',
            borderBottom: '1px solid rgba(255,255,255,.055)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {['#2a2a2a','#2a2a2a','#2a2a2a'].map((c,i)=>(
                  <div key={i} style={{ width:9,height:9,borderRadius:'50%',background:c }}/>
                ))}
              </div>
              <span className="f-dm" style={{ color: '#2e2e2e', fontSize: 12 }}>affow.app — Dashboard</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span className="dot-live" style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}/>
              <span className="f-dm" style={{ color: '#4ade80', fontSize: 11 }}>Live</span>
            </div>
          </div>

          {/* Dashboard body */}
          <div style={{ display: 'flex', minHeight: 480 }}>
            {/* Sidebar */}
            {!slim && (
              <div style={{ width: 178, borderRight: '1px solid rgba(255,255,255,.045)', padding: '18px 0', flexShrink: 0 }}>
                <div style={{ padding: '0 15px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, background: '#ececec', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="f-syne" style={{ fontWeight: 800, fontSize: 11, color: '#080808' }}>A</span>
                    </div>
                    <span className="f-syne" style={{ fontSize: 14, fontWeight: 700, color: '#e2e2e2' }}>Affow</span>
                  </div>
                </div>
                {[
                  { Icon: IcChart,  label: 'Analytics', active: true  },
                  { Icon: IcBrain,  label: 'AI Coach',  active: false },
                  { Icon: IcTarget, label: 'Sessions',  active: false },
                  { Icon: IcZap,    label: 'Optimizer', active: false },
                  { Icon: IcSliders,label: 'Settings',  active: false },
                ].map(({ Icon, label, active }, i) => (
                  <div key={i} style={{
                    padding: '8px 15px', display: 'flex', alignItems: 'center', gap: 9,
                    background: active ? 'rgba(255,255,255,.055)' : 'transparent',
                    borderRight: `2px solid ${active ? 'rgba(255,255,255,.25)' : 'transparent'}`,
                    cursor: 'pointer', marginBottom: 2,
                  }}>
                    <Icon size={13} color={active ? '#d8d8d8' : '#2e2e2e'} />
                    <span className="f-dm" style={{ fontSize: 12.5, color: active ? '#d8d8d8' : '#2e2e2e' }}>{label}</span>
                  </div>
                ))}
                <div style={{ padding: '20px 15px 0' }}>
                  <div style={{
                    background: 'rgba(74,222,128,.06)', border: '1px solid rgba(74,222,128,.14)',
                    borderRadius: 8, padding: '9px 10px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}/>
                      <span className="f-dm" style={{ fontSize: 10.5, color: '#4ade80' }}>Session Active</span>
                    </div>
                    <span className="f-dm" style={{ fontSize: 10.5, color: '#2e2e2e' }}>2h 17m runtime</span>
                  </div>
                </div>
              </div>
            )}

            {/* Main */}
            <div style={{ flex: 1, padding: 20, overflow: 'hidden', minWidth: 0 }}>
              {/* Top stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 10, marginBottom: 16 }}>
                {[
                  { l: 'Win Rate', v: '73.2%', d: '+2.1%', pos: true },
                  { l: 'Trophy Push', v: '+842', d: 'this week', pos: true },
                  { l: 'AI Score', v: '94/100', d: 'Optimal', pos: true },
                  { l: 'Reaction', v: '87ms', d: '-12ms avg', pos: true },
                ].map((s, i) => (
                  <div key={i} style={{
                    background: '#111', border: '1px solid rgba(255,255,255,.055)',
                    borderRadius: 10, padding: '13px 14px',
                  }}>
                    <div className="f-dm" style={{ fontSize: 10.5, color: '#2e2e2e', marginBottom: 5 }}>{s.l}</div>
                    <div className="f-syne" style={{ fontSize: 20, fontWeight: 700, color: '#e2e2e2', letterSpacing: '-.025em' }}>{s.v}</div>
                    <div className="f-dm" style={{ fontSize: 10.5, color: '#4ade80', marginTop: 3 }}>{s.d}</div>
                  </div>
                ))}
              </div>

              {/* Chart row */}
              <div style={{ display: 'grid', gridTemplateColumns: slim ? '1fr' : '1fr 260px', gap: 10, marginBottom: 10 }}>
                {/* Bar chart */}
                <div style={{ background: '#111', border: '1px solid rgba(255,255,255,.055)', borderRadius: 10, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span className="f-dm" style={{ fontSize: 12, color: '#555' }}>Performance Score</span>
                    <span className="f-dm" style={{ fontSize: 10.5, color: '#2a2a2a' }}>Last 12 sessions</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 72 }}>
                    {chartBars.map((v, i) => (
                      <div key={i} style={{ flex: 1 }}>
                        <div style={{
                          background: i === chartBars.length - 1 ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.09)',
                          borderRadius: '3px 3px 0 0',
                          height: vis ? `${(v / 100) * 72}px` : '4px',
                          transition: `height .55s cubic-bezier(.16,1,.3,1) ${i * 35 + 300}ms`,
                        }}/>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 1, background: 'rgba(255,255,255,.045)', margin: '5px 0 7px' }}/>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="f-dm" style={{ fontSize: 10, color: '#222' }}>Session 1</span>
                    <span className="f-dm" style={{ fontSize: 10, color: '#222' }}>Now</span>
                  </div>
                </div>

                {/* AI Recs */}
                {!slim && (
                  <div style={{ background: '#111', border: '1px solid rgba(255,255,255,.055)', borderRadius: 10, padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 13 }}>
                      <IcBrain size={12} color="#555" />
                      <span className="f-dm" style={{ fontSize: 12, color: '#555' }}>AI Recommendations</span>
                    </div>
                    {[
                      { t: 'Switch to Leon for current meta', p: 'High', c: '#f87171' },
                      { t: 'Adjust angle in Gem Grab mode', p: 'Med',  c: '#fbbf24' },
                      { t: 'Trophy road: optimal at 850',   p: 'Low',  c: '#3e3e3e' },
                    ].map((r, i) => (
                      <div key={i} style={{
                        padding: '8px 9px', background: 'rgba(255,255,255,.025)',
                        borderRadius: 7, marginBottom: 6,
                      }}>
                        <span className="f-dm" style={{ fontSize: 9.5, color: r.c, textTransform: 'uppercase', letterSpacing: '.07em', display: 'block', marginBottom: 3 }}>{r.p}</span>
                        <span className="f-dm" style={{ fontSize: 11, color: '#444', lineHeight: 1.5 }}>{r.t}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modules */}
              <div style={{ background: '#111', border: '1px solid rgba(255,255,255,.055)', borderRadius: 10, padding: '13px 16px' }}>
                <span className="f-dm" style={{ fontSize: 12, color: '#555', display: 'block', marginBottom: 10 }}>Active Modules</span>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  {['Performance Tracker','AI Coach','Meta Analyzer','Session Logger','Trophy Optimizer','Brawler Stats'].map((m, i) => (
                    <span key={i} className="f-dm" style={{
                      padding: '4px 11px', background: 'rgba(255,255,255,.03)',
                      border: '1px solid rgba(255,255,255,.065)',
                      borderRadius: 100, fontSize: 10.5, color: '#444',
                      display: 'flex', alignItems: 'center', gap: 5,
                    }}>
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}/>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'Is it safe to use?',
    a: 'Affow is designed with platform integrity in mind. The tool operates as an external companion — it does not inject into game memory, modify client files, or interact with Brawl Stars processes in any prohibited manner. All analysis is performed externally using session data you voluntarily share. We maintain transparent development practices and platform safety is a core design principle, not an afterthought.',
  },
  {
    q: 'Which devices are supported?',
    a: 'Affow supports iOS (iPhone and iPad, iOS 15+), Android (phones and tablets running Android 9+), and PC-based emulators including BlueStacks 5, LDPlayer 9, and NoxPlayer 7. The interface adapts intelligently across all supported environments, delivering a consistent and refined experience regardless of device.',
  },
  {
    q: 'How often is the platform updated?',
    a: 'We operate on a rolling release pipeline. Critical updates following major Brawl Stars patches are deployed within 24 to 72 hours. AI model recalibrations, feature refinements, and performance optimizations follow a weekly cadence. You will always be on the latest version automatically — no manual action required.',
  },
  {
    q: 'Is emulator support available?',
    a: 'Yes. Emulator support is first-class. Affow is specifically optimized for BlueStacks 5+, LDPlayer 9, and NoxPlayer 7+ environments. PC-based competitive players gain access to additional tooling: latency monitoring, input efficiency analysis, and advanced session statistics that are exclusive to emulator mode.',
  },
  {
    q: 'Is there community support?',
    a: 'Our community is active across Telegram and Discord. Technical support inquiries typically receive a response within a few hours. The community server features dedicated channels for bug reports, feature requests, strategy discussion, and direct feedback loops that actively shape platform development priorities.',
  },
];

function FaqItem({ q, a, idx }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sr" style={{ borderBottom: '1px solid rgba(255,255,255,.05)', transitionDelay: `${idx * 60}ms` }}>
      <button onClick={() => setOpen(p => !p)} style={{
        width: '100%', padding: '22px 0', background: 'none', border: 'none',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        <span className="f-syne" style={{ fontSize: 15, fontWeight: 600, color: '#d8d8d8', textAlign: 'left' }}>{q}</span>
        <span style={{
          color: open ? '#777' : '#2e2e2e', flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform .3s ease, color .2s ease',
        }}>
          <IcPlus size={15} />
        </span>
      </button>
      <div className={`faq-body${open ? ' open' : ''}`}>
        <p className="f-dm" style={{ color: '#3a3a3a', fontSize: 14, lineHeight: 1.82, paddingBottom: 20, maxWidth: 680 }}>{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const ref = useRef(null);
  useSR(ref, 0);
  return (
    <section id="faq" ref={ref} style={{
      padding: 'clamp(80px,10vw,120px) clamp(1.25rem,4vw,2.5rem)',
      borderTop: '1px solid rgba(255,255,255,.04)',
      maxWidth: 800, margin: '0 auto',
    }}>
      <div className="sr" style={{ marginBottom: 60 }}>
        <SLabel text="FAQ" />
        <h2 className="f-syne" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 800, letterSpacing: '-.03em', color: '#e2e2e2' }}>
          Common questions.
        </h2>
      </div>
      {faqs.map((f, i) => <FaqItem key={i} {...f} idx={i + 1} />)}
    </section>
  );
}

/* ─── COMMUNITY ──────────────────────────────────────────────── */
function Community() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.14 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id="community" ref={ref} style={{
      padding: 'clamp(80px,10vw,120px) clamp(1.25rem,4vw,2.5rem)',
      borderTop: '1px solid rgba(255,255,255,.04)',
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 56,
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(22px)',
          transition: 'all .7s cubic-bezier(.16,1,.3,1)',
        }}>
          <SLabel text="Community" />
          <h2 className="f-syne" style={{ fontSize: 'clamp(28px,4vw,50px)', fontWeight: 800, letterSpacing: '-.03em', color: '#e2e2e2', marginBottom: 14 }}>
            Join the network.
          </h2>
          <p className="f-dm" style={{ color: '#3a3a3a', fontSize: 15, lineHeight: 1.75 }}>
            Thousands of competitive players. One shared platform.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14,
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(22px)',
          transition: 'all .7s cubic-bezier(.16,1,.3,1) .14s',
        }}>
          {/* Telegram */}
          <a href="https://t.me/affow" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <div className="soc" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
              <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,.04)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d8d8d8' }}>
                <IcTelegram size={21} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="f-syne" style={{ fontSize: 15, fontWeight: 700, color: '#d8d8d8', marginBottom: 4 }}>Telegram</div>
                <div className="f-dm" style={{ fontSize: 13, color: '#333' }}>@affow</div>
              </div>
              <div style={{ color: '#2a2a2a' }}><IcArrow size={13} /></div>
            </div>
          </a>

          {/* TikTok */}
          <a href="https://tiktok.com/@affowl" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <div className="soc" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
              <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,.04)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d8d8d8' }}>
                <IcTikTok size={21} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="f-syne" style={{ fontSize: 15, fontWeight: 700, color: '#d8d8d8', marginBottom: 4 }}>TikTok</div>
                <div className="f-dm" style={{ fontSize: 13, color: '#333' }}>@affowl</div>
              </div>
              <div style={{ color: '#2a2a2a' }}><IcArrow size={13} /></div>
            </div>
          </a>

          {/* Discord */}
          <div className="soc" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 14, opacity: .55, cursor: 'default' }}>
            <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,.03)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
              <IcDiscord size={21} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="f-syne" style={{ fontSize: 15, fontWeight: 700, color: '#666', marginBottom: 4 }}>Discord</div>
              <div className="f-dm" style={{ fontSize: 12.5, color: '#2e2e2e', lineHeight: 1.65 }}>
                Community servers are currently limited during early access.
              </div>
            </div>
            <span className="f-dm" style={{
              fontSize: 9.5, color: '#2e2e2e', letterSpacing: '.08em', textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,.055)', borderRadius: 100, padding: '3px 10px',
              alignSelf: 'flex-start',
            }}>Coming Soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,.045)', padding: '36px clamp(1.25rem,4vw,2.5rem)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 24, height: 24, background: '#e8e8e8', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="f-syne" style={{ fontWeight: 800, fontSize: 10, color: '#080808' }}>A</span>
          </div>
          <span className="f-syne" style={{ fontWeight: 700, fontSize: 13, color: '#2e2e2e' }}>Affow</span>
          <span style={{ color: '#1e1e1e', fontSize: 13 }}>·</span>
          <span className="f-dm" style={{ fontSize: 12, color: '#1e1e1e' }}>v2.4.1 — Early Access</span>
        </div>
        <div style={{ display: 'flex', gap: 22 }}>
          {['Privacy', 'Terms', 'Support', 'Changelog'].map(l => (
            <a key={l} href="#" className="flink f-dm">{l}</a>
          ))}
        </div>
        <span className="f-dm" style={{ fontSize: 12, color: '#1e1e1e' }}>© 2025 Affow. All rights reserved.</span>
      </div>
    </footer>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <G />
      <div style={{ background: '#080808', minHeight: '100vh', color: '#e2e2e2' }}>
        <Navbar />
        <Hero />
        <WhyChoose />
        <Statistics />
        <Dashboard />
        <FAQ />
        <Community />
        <Footer />
      </div>
    </>
  );
}
