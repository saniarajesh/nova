import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Compass, Volume2, VolumeX, BookOpen, Eye, EyeOff, Radio, Music, Zap, ArrowRight, ChevronDown } from 'lucide-react';
import CrimsonParticlesCanvas from './CrimsonParticlesCanvas';
import CelestialStaffCore from './CelestialStaffCore';
import CodexDrawer from './CodexDrawer';
import NovaStoryTimeline from './NovaStoryTimeline';
import Footer from './Footer';
import { soundFx } from '../utils/soundEffects';

export default function CelestialHeroShowcase({ onNavigate, isMuted, setIsMuted, onOpenConsole, onTriggerSafety }) {
  const [isAwakened, setIsAwakened] = useState(false);
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [hideHud, setHideHud] = useState(false);
  const [activeString, setActiveString] = useState(null);
  const [staffBurst, setStaffBurst] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false); // entrance animation gate
  const [novaEntered, setNovaEntered] = useState(false); // Enter key gate for NOVA animation

  // Mouse tilt (character only)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, moveX: 0, moveY: 0 });

  // Scroll parallax (character only)
  const [scrollY, setScrollY] = useState(0);

  const containerRef = useRef(null);
  const targetTilt = useRef({ rx: 0, ry: 0, mx: 0, my: 0 });
  const currentTilt = useRef({ rx: 0, ry: 0, mx: 0, my: 0 });

  // ── Entrance mount ────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(id);
  }, []);

  // ── Enter key → activate NOVA animation ──────────────────────────────────
  useEffect(() => {
    if (novaEntered) return; // already activated, stop listening
    const handleKey = (e) => {
      if (e.key === 'Enter') {
        setNovaEntered(true);
        soundFx.playChime();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [novaEntered]);

  // ── Lerp RAF for smooth tilt ──────────────────────────────────────────────
  useEffect(() => {
    let rafId;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      currentTilt.current.rx = lerp(currentTilt.current.rx, targetTilt.current.rx, 0.07);
      currentTilt.current.ry = lerp(currentTilt.current.ry, targetTilt.current.ry, 0.07);
      currentTilt.current.mx = lerp(currentTilt.current.mx, targetTilt.current.mx, 0.07);
      currentTilt.current.my = lerp(currentTilt.current.my, targetTilt.current.my, 0.07);
      setTilt({
        rotateX: currentTilt.current.rx,
        rotateY: currentTilt.current.ry,
        moveX: currentTilt.current.mx,
        moveY: currentTilt.current.my,
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Scroll listener ───────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Mouse move → tilt target ──────────────────────────────────────────────
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    targetTilt.current = { rx: ny * -5, ry: nx * 6, mx: nx * 12, my: ny * 8 };
  };

  // ── Staff Awaken ──────────────────────────────────────────────────────────
  const handleAwakenStaff = () => {
    soundFx.playStaffAwaken();
    setIsAwakened(true);
    const rect = containerRef.current?.getBoundingClientRect();
    const staffX = rect ? rect.left + rect.width * 0.282 : window.innerWidth * 0.28;
    const staffY = rect ? rect.top + rect.height * 0.218 : window.innerHeight * 0.22;
    setStaffBurst({ x: staffX, y: staffY, timestamp: Date.now() });
    setTimeout(() => setIsAwakened(false), 2800);
  };

  // ── Chord Strummer ────────────────────────────────────────────────────────
  const handlePlayChord = (freq, idx) => {
    setActiveString(idx);
    soundFx.playGuitarString(freq);
    setTimeout(() => setActiveString(null), 800);
  };

  const celestialChords = [
    { label: 'C4', name: 'Solitary Core', freq: 261.63 },
    { label: 'E4', name: 'Memory Wave', freq: 329.63 },
    { label: 'G4', name: 'Stellar Pulse', freq: 392.00 },
    { label: 'B4', name: 'Nebula Veil', freq: 493.88 },
  ];

  const charScrollOffset = scrollY * 0.4;

  // ── Transition helpers ────────────────────────────────────────────────────
  const tx = (extra = '') =>
    `transition-all duration-700 ease-out ${extra}`;
  const vis = (delay = '') =>
    mounted
      ? `opacity-100 translate-y-0 translate-x-0 ${delay}`
      : 'opacity-0 translate-y-5';

  return (
    <div className="w-full bg-[#040103] text-slate-100 selection:bg-red-600 selection:text-white">
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO STAGE VIEWPORT (Full Screen Landing)
      ═══════════════════════════════════════════════════════════════════════ */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-screen min-h-[700px] bg-[#040103] select-none overflow-hidden"
      >

        {/* ── LAYER 0: Static crimson nebula radial glow ─────────────────────── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[20%] left-[22%] w-[820px] h-[820px] bg-red-700/15 rounded-full blur-[180px] nebula-pulse" />
          <div className="absolute top-[35%] right-[18%] w-[700px] h-[700px] bg-rose-900/12 rounded-full blur-[150px] nebula-pulse-2" />
          <div className="absolute bottom-0 inset-x-0 h-[50%] bg-gradient-to-t from-[#040103] via-[#0d0205]/70 to-transparent" />
        </div>

        {/* ── Film grain texture overlay (Soul Knight inspo) ─────────────────── */}
        <div className="absolute inset-0 grain-overlay z-[5] pointer-events-none" />

        {/* ── Dynamic cursor spotlight ────────────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none z-[6]"
          style={{
            background: `radial-gradient(550px circle at ${cursorPos.x}px ${cursorPos.y}px,
              rgba(239,68,68,0.10), rgba(251,191,36,0.04) 38%, transparent 75%)`,
          }}
        />

        {/* ── Canvas: embers, constellations, shooting stars, cursor trail ────── */}
        <CrimsonParticlesCanvas staffBurst={staffBurst} cursorPosition={cursorPos} />

        {/* ── LAYER 1: Huge "NOVA" title — static until Enter pressed ──────────── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 overflow-hidden">
          <div className="w-full flex items-center justify-between px-4 sm:px-12 md:px-20
                          font-cinzel font-black tracking-[-0.03em] text-[18vw] leading-none
                          uppercase select-none" style={{ filter: 'blur(0.4px)' }}>
            {['N', 'O', 'V', 'A'].map((l, i) => (
              <span
                key={l}
                className={`nova-letter${novaEntered ? ' nova-letter--live' : ''} drop-shadow-[0_0_60px_rgba(220,38,38,0.45)]`}
              >
                {l}
              </span>
            ))}
          </div>

          {/* "Press Enter" prompt — visible only before activation */}
          {!novaEntered && (
            <div className="press-enter-prompt mt-6 flex items-center gap-3 text-slate-400 font-mono text-sm tracking-[0.3em] uppercase">
              <span className="inline-block w-5 h-5 border border-slate-500 rounded-sm flex items-center justify-center text-[10px] font-bold text-slate-500">↵</span>
              <span>Press Enter to Awaken</span>
            </div>
          )}
        </div>

        {/* ── Floating ambient rune symbols ───────────────────────────────────── */}
        <span className="rune-float      absolute top-[18%] left-[8%]  text-4xl text-red-500/25 pointer-events-none z-[15] font-mono">✦</span>
        <span className="rune-float-d1   absolute top-[14%] right-[9%] text-3xl text-amber-400/20 pointer-events-none z-[15] font-mono">◈</span>
        <span className="rune-float-d2   absolute top-[55%] left-[5%]  text-2xl text-red-400/20 pointer-events-none z-[15] font-mono">✧</span>
        <span className="rune-float-d3   absolute top-[60%] right-[6%] text-3xl text-amber-300/18 pointer-events-none z-[15] font-mono">⊕</span>
        <span className="rune-float-d4   absolute bottom-[22%] left-[46%] text-xl text-red-500/20 pointer-events-none z-[15] font-mono">❋</span>




        {/* ── LAYER 2: CHARACTER — scroll parallax + mouse 3D tilt ────────────── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div
            className="relative w-full h-full max-w-[1920px] mx-auto flex items-center justify-center"
            style={{
              perspective: '1200px',
              transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translate3d(${tilt.moveX}px, ${tilt.moveY}px, 0)`,
              transition: 'transform 0.05s linear',
              willChange: 'transform',
            }}
          >
            {/* Scroll-driven translateY + breathing + sway */}
            <div
              className="relative w-full h-full flex items-center justify-center animate-breathe animate-sway"
              style={{
                transform: `translateY(${-charScrollOffset}px)`,
                transition: 'transform 0.1s linear',
                willChange: 'transform',
              }}
            >
              {/* Floor aura glow behind character feet */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-[40%]
                              bg-gradient-to-t from-red-700/25 via-red-900/10 to-transparent
                              blur-[80px] animate-pulse pointer-events-none z-0" />

              {/* Hair aura glow halo (top) */}
              <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[40%] h-[35%]
                              bg-gradient-to-b from-red-600/20 via-amber-900/10 to-transparent
                              blur-[60px] hair-aura pointer-events-none z-0" />

              {/* Master Artwork Image */}
              <img
                src="/nova-showcase.jpg"
                alt="NOVA Celestial Sorceress"
                className={`w-full h-full object-cover object-center filter contrast-[1.08] brightness-[1.03]
                            ${tx('delay-200')} ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}`}
                style={{ transform: 'scale(1.05)', position: 'relative', zIndex: 1 }}
              />

              {/* Interactive Staff Core (pointer-events re-enabled) */}
              <div className="pointer-events-auto" style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
                <CelestialStaffCore onAwaken={handleAwakenStaff} isAwakened={isAwakened} />
              </div>

              {/* Flare burst overlay on staff activation */}
              {isAwakened && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-amber-300/40 to-purple-600/25
                                mix-blend-screen pointer-events-none animate-ping z-[3]" />
              )}

              {/* Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040103] via-transparent to-[#040103]/50 pointer-events-none z-[4]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#040103]/85 via-transparent to-[#040103]/85 pointer-events-none z-[4]" />
              <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#040103] to-transparent pointer-events-none z-[4]" />
            </div>
          </div>
        </div>

        {/* ── Cinematic scanlines overlay ──────────────────────────────────────── */}
        <div className="absolute inset-0 scanlines-overlay z-[22] pointer-events-none opacity-40" />

        {/* ── Ground fog ───────────────────────────────────────────────────────── */}
        <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-[24] overflow-hidden">
          <div className="w-[120%] h-full bg-gradient-to-t from-red-950/50 via-red-900/12 to-transparent blur-2xl animate-mist-drift" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            LAYER 3: HUD — all locked to viewport, never scrolls
        ═══════════════════════════════════════════════════════════════════════ */}

        {/* ── Header: gradient fade from black to transparent (Soul Knight inspo) */}
        <header
          className={`absolute top-0 left-0 right-0 z-40 w-full px-6 py-5
                      bg-gradient-to-b from-black/80 via-black/30 to-transparent
                      flex items-center justify-between
                      ${tx()} ${hideHud ? 'opacity-0 -translate-y-6 pointer-events-none' : mounted ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 -translate-y-4'}`}
        >
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/90 border border-red-500/50
                            flex items-center justify-center backdrop-blur-md
                            shadow-[0_0_22px_rgba(239,68,68,0.4)]">
              <span className="font-cinzel font-black text-amber-300 text-lg">N</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black font-cinzel tracking-widest text-white uppercase drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                  NOVA
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase
                                 bg-red-950/80 border border-red-500/40 text-red-300">
                  PROTAGONIST
                </span>
              </div>
              <p className="text-[10px] font-mono tracking-[0.25em] text-amber-400/80 uppercase subtitle-flicker">
                The Celestial Weaver • Star Veils
              </p>
            </div>
          </div>

          {/* Centre nav */}
          <div className="hidden md:flex items-center gap-2 p-1 rounded-2xl
                          bg-black/50 border border-red-900/40 backdrop-blur-md shadow-xl text-xs font-mono">
            <button className="px-3 py-1.5 rounded-xl bg-red-950/80 border border-red-500/50
                               text-amber-300 font-bold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Showcase</span>
            </button>
            <button onClick={() => onNavigate?.('weapons')}
              className="px-3 py-1.5 rounded-xl text-slate-300 hover:text-amber-300
                         hover:bg-white/5 transition-all flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-red-400" />
              <span>Weapons &amp; Lore</span>
            </button>
            <button onClick={() => onNavigate?.('chat')}
              className="px-3 py-1.5 rounded-xl text-slate-300 hover:text-amber-300
                         hover:bg-white/5 transition-all flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Portal</span>
            </button>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => { const s = soundFx.toggleMute(); setIsMuted(!s); }}
              className="p-2.5 rounded-xl bg-black/60 hover:bg-red-950/50 border border-white/10
                         hover:border-red-500/40 text-slate-300 hover:text-white transition-all
                         backdrop-blur-md shadow-lg flex items-center gap-1.5 text-xs font-mono"
            >
              {isMuted
                ? <VolumeX className="w-4 h-4 text-slate-500" />
                : <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />}
              <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio On'}</span>
            </button>

            {/* Primary CTA — rounded pill (Soul Knight inspo) */}
            <button
              onClick={() => { soundFx.playChime(); setIsCodexOpen(true); }}
              className="group px-5 py-2.5 rounded-full border-2 border-amber-400/70
                         bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 hover:text-white
                         font-mono text-xs tracking-[0.15em] uppercase flex items-center gap-2
                         shadow-[0_0_22px_rgba(251,191,36,0.3)] hover:shadow-[0_0_35px_rgba(251,191,36,0.5)]
                         transition-all backdrop-blur-md font-bold"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Open Codex</span>
              <ArrowRight className="w-3 h-3 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => { soundFx.playChime(); setHideHud(true); }}
              className="p-2.5 rounded-xl bg-black/60 hover:bg-white/10 border border-white/10
                         text-slate-400 hover:text-white transition-all backdrop-blur-md"
              title="Showcase Mode"
            >
              <EyeOff className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Restore HUD pill */}
        {hideHud && (
          <button
            onClick={() => { soundFx.playChime(); setHideHud(false); }}
            className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full bg-black/80 border
                       border-amber-400/50 text-amber-300 text-[10px] font-mono tracking-[0.3em] uppercase
                       backdrop-blur-md shadow-2xl flex items-center gap-2 hover:scale-105 transition-all
                       shadow-[0_0_20px_rgba(251,191,36,0.3)] animate-pulse"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Restore HUD</span>
          </button>
        )}

        {/* ── Side floating cards ──────────────────────────────────────────────── */}
        <div
          className={`absolute inset-0 z-30 max-w-7xl mx-auto w-full px-6
                      flex items-center justify-between pointer-events-none
                      ${tx()} ${hideHud ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        >
          {/* Left Lore Dossier */}
          <div
            className={`pointer-events-auto max-w-[280px] hidden lg:flex flex-col space-y-3
                        bg-black/55 border border-red-900/40 p-5 rounded-2xl backdrop-blur-md
                        shadow-2xl border-glow
                        ${tx()} ${mounted ? 'opacity-100 translate-x-0 delay-300' : 'opacity-0 -translate-x-6'}`}
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-red-400 uppercase font-bold">
                CELESTIAL DOSSIER 01
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>

            <p className="text-xs text-slate-300 font-serif leading-relaxed italic">
              "Suffering carved silence into her spirit. But inside that void, melody became her blade."
            </p>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-slate-500 block text-[9px]">WEAPON</span>
                <span className="text-amber-300 font-bold">Harmonic Astrolabe</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                <span className="text-slate-500 block text-[9px]">FREQUENCY</span>
                <span className="text-red-400 font-bold">432Hz Core</span>
              </div>
            </div>

            {/* Entity scan data bars */}
            <div className="space-y-1.5 pt-1">
              {[
                { label: 'RESONANCE', pct: '82%', color: 'bg-red-500' },
                { label: 'CELESTIAL SYNC', pct: '94%', color: 'bg-amber-400' },
                { label: 'HARMONIC FIELD', pct: '71%', color: 'bg-purple-500' },
              ].map(bar => (
                <div key={bar.label}>
                  <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-0.5">
                    <span>{bar.label}</span><span>{bar.pct}</span>
                  </div>
                  <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${bar.color} rounded-full`}
                      style={{ width: bar.pct, transition: 'width 1.5s ease-out' }} />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => { soundFx.playChime(); setIsCodexOpen(true); }}
              className="w-full py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-red-950/40
                         border border-white/10 hover:border-red-500/40 text-[11px] font-mono
                         text-slate-300 hover:text-amber-300 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Read Full Origin Story</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </button>
          </div>

          {/* Right Chord Soundboard */}
          <div
            className={`pointer-events-auto hidden xl:flex flex-col space-y-3
                        bg-black/55 border border-red-900/40 p-5 rounded-2xl backdrop-blur-md
                        shadow-2xl w-[260px] border-glow
                        ${tx()} ${mounted ? 'opacity-100 translate-x-0 delay-500' : 'opacity-0 translate-x-6'}`}
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span>Harmonic Lens</span>
              </div>
              <span className="text-[10px] font-mono text-red-400">Audio Rites</span>
            </div>

            <p className="text-[11px] text-slate-400">Pluck Nova's celestial chords:</p>

            <div className="grid grid-cols-2 gap-2">
              {celestialChords.map((chord, idx) => (
                <button
                  key={chord.label}
                  onClick={() => handlePlayChord(chord.freq, idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${activeString === idx
                    ? 'bg-red-600/40 border-amber-400 shadow-md shadow-red-500/50 scale-105'
                    : 'bg-white/5 border-white/10 hover:border-red-400/50 hover:bg-white/10'
                    }`}
                >
                  <span className="text-xs font-bold text-white font-mono">{chord.label}</span>
                  <span className="text-[9px] text-amber-300/80 font-medium truncate">{chord.name}</span>
                </button>
              ))}
            </div>

            {/* Staff ignite — rounded pill style */}
            <button
              onClick={handleAwakenStaff}
              className={`group w-full py-2.5 px-4 rounded-full font-bold text-xs uppercase tracking-wider
                          transition-all flex items-center justify-center gap-2 border ${isAwakened
                  ? 'bg-red-600 border-amber-300 text-white shadow-[0_0_30px_rgba(239,68,68,0.6)] scale-105'
                  : 'border-amber-500/50 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]'
                }`}
            >
              <Zap className={`w-3.5 h-3.5 ${isAwakened ? 'animate-bounce text-yellow-300' : 'text-amber-400 group-hover:scale-125 transition-transform'}`} />
              <span>{isAwakened ? 'Core Ignited!' : 'Ignite Astrolabe'}</span>
            </button>
          </div>
        </div>

        {/* ── Scroll indicator & Action CTAs ───────────────────────────────────── */}
        <div
          className={`absolute bottom-[4.6rem] left-1/2 -translate-x-1/2 z-40
                      flex flex-wrap items-center justify-center gap-3 transition-all duration-500 max-w-[90vw]`}
        >
          {/* Primary CTA: Scroll down to landscape Story Timeline */}
          <button
            onClick={() => {
              soundFx.playChime();
              const elem = document.getElementById('nova-timeline');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group px-6 py-3 rounded-full border-2 border-amber-400/90 bg-gradient-to-r from-red-950/90 via-amber-950/80 to-purple-950/90
                       hover:from-red-900 hover:to-purple-900 text-amber-200 hover:text-white text-xs font-serif font-bold tracking-[0.2em] uppercase
                       shadow-[0_0_30px_rgba(251,191,36,0.45)] hover:shadow-[0_0_45px_rgba(251,191,36,0.7)] hover:scale-105 transition-all
                       backdrop-blur-md flex items-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
            <span>EXPLORE STORY &amp; BATTLES</span>
            <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
          </button>

          {/* Secondary CTA: Go to Weapons & Lore page */}
          <button
            onClick={() => {
              soundFx.playChime();
              onNavigate?.('weapons');
            }}
            className="hidden sm:flex px-5 py-3 rounded-full border border-white/20 bg-black/60 hover:bg-white/10
                       text-slate-300 hover:text-white text-xs font-mono font-semibold tracking-wider uppercase
                       backdrop-blur-md items-center gap-2 transition-all hover:border-amber-400/50"
          >
            <span>Weapons &amp; Lore</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* Side scroll hints */}
        <div
          className={`absolute bottom-[5.2rem] left-8 z-40 pointer-events-none hidden md:block transition-all duration-500`}
          style={{ opacity: Math.max(0, 1 - scrollY / 90) }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-amber-400/60" />
            <span className="text-[10px] font-mono tracking-[0.35em] text-amber-200/60 uppercase flex items-center gap-1.5">
              <span>SCROLL DOWN</span>
              <ChevronDown className="w-3 h-3 text-amber-400 animate-bounce" />
            </span>
          </div>
        </div>
        <div
          className="absolute bottom-[5.2rem] right-8 z-40 pointer-events-none hidden lg:block transition-all duration-500"
          style={{ opacity: Math.max(0, 1 - scrollY / 90) }}
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-amber-400/40 uppercase">
            STORY CHRONICLES BELOW
          </span>
        </div>

        {/* ── Bottom status bar ────────────────────────────────────────────────── */}
        <footer
          className={`absolute bottom-0 left-0 right-0 z-40 border-t border-red-950/60
                      bg-gradient-to-t from-black/70 to-transparent backdrop-blur-sm
                      py-3.5 px-6 transition-all duration-700
                      ${hideHud ? 'opacity-0 translate-y-6 pointer-events-none' : mounted ? 'opacity-100 translate-y-0 delay-[700ms]' : 'opacity-0 translate-y-4'}`}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="tracking-wider">
                CELESTIAL FREQUENCY: <strong className="text-amber-300">432Hz HARMONIC</strong>
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="hidden sm:inline">GUARDIAN OF THE UNHEARD</span>
            </div>

            <div className="hidden lg:block text-slate-300 font-serif italic text-xs">
              "In the dark between dimensions, she made music her unbreakable sanctuary."
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => soundFx.playCelestialChord()}
                className="text-amber-400 hover:text-white transition-colors flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Harmonic Symphony</span>
              </button>
              <button onClick={() => { soundFx.playChime(); setIsCodexOpen(true); }}
                className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Codex Chronicles</span>
              </button>
            </div>
          </div>
        </footer>

      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          NOVA'S STORY TIMELINE (LANDSCAPE MODE WITH BATTLES)
      ═══════════════════════════════════════════════════════════════════════ */}
      <NovaStoryTimeline onNavigate={onNavigate} />

      {/* ═══════════════════════════════════════════════════════════════════════
          GLOBAL FOOTER
      ═══════════════════════════════════════════════════════════════════════ */}
      <Footer
        onOpenConsole={onOpenConsole}
        onTriggerSafety={onTriggerSafety}
      />

      {/* ── Codex Drawer ─────────────────────────────────────────────────────── */}
      <CodexDrawer isOpen={isCodexOpen} onClose={() => setIsCodexOpen(false)} />

    </div>
  );
}
