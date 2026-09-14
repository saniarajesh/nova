import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Sparkles, Eye, ArrowRight } from 'lucide-react';
import CrimsonParticlesCanvas from './CrimsonParticlesCanvas';
import CelestialStaffCore from './CelestialStaffCore';
import CodexDrawer from './CodexDrawer';
import HeroHeader from './hero/HeroHeader';
import HeroFooterBar from './hero/HeroFooterBar';
import LoreDossierCard from './hero/LoreDossierCard';
import ChordSoundboard from './hero/ChordSoundboard';
import { soundFx } from '../utils/soundEffects';

export default function CelestialHeroShowcase({ onNavigate, isMuted, setIsMuted }) {
    const [isAwakened, setIsAwakened] = useState(false);
    const [isCodexOpen, setIsCodexOpen] = useState(false);
    const [hideHud, setHideHud] = useState(false);
    const [activeString, setActiveString] = useState(null);
    const [staffBurst, setStaffBurst] = useState(null);
    const [mounted, setMounted] = useState(false);

    // Refs for direct DOM manipulation (bypasses React re-renders)
    const containerRef = useRef(null);
    const charLayerRef = useRef(null);
    const cursorPosRef = useRef({ x: 0, y: 0 });
    const targetTilt = useRef({ rx: 0, ry: 0, mx: 0, my: 0 });
    const currentTilt = useRef({ rx: 0, ry: 0, mx: 0, my: 0 });
    const scrollYRef = useRef(0);

    // State only for canvas (passed as prop) — throttled
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    // ── Entrance mount ────────────────────────────────────────────
    useEffect(() => {
        const id = setTimeout(() => setMounted(true), 120);
        return () => clearTimeout(id);
    }, []);

    // ── Lerp RAF for smooth tilt — writes directly to DOM, no setState ─
    useEffect(() => {
        let rafId;
        const lerp = (a, b, t) => a + (b - a) * t;
        const tick = () => {
            const t = currentTilt.current;
            const g = targetTilt.current;
            t.rx = lerp(t.rx, g.rx, 0.07);
            t.ry = lerp(t.ry, g.ry, 0.07);
            t.mx = lerp(t.mx, g.mx, 0.07);
            t.my = lerp(t.my, g.my, 0.07);

            // Apply transform directly to DOM — bypasses React re-render
            if (charLayerRef.current) {
                charLayerRef.current.style.transform =
                    `perspective(1200px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) translate3d(${t.mx}px, ${t.my}px, 0)`;
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, []);

    // ── Scroll listener (throttled via RAF) ────────────────────────
    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    scrollYRef.current = window.scrollY;
                    // Update parallax directly on DOM
                    const scrollContainer = charLayerRef.current?.querySelector('[data-scroll-target]');
                    if (scrollContainer) {
                        scrollContainer.style.transform = `translateY(${-scrollYRef.current * 0.4}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // ── Mouse move → tilt target (throttled cursor pos for canvas) ─
    const cursorRafRef = useRef(false);
    const handleMouseMove = useCallback((e) => {
        cursorPosRef.current = { x: e.clientX, y: e.clientY };
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        targetTilt.current = { rx: ny * -5, ry: nx * 6, mx: nx * 12, my: ny * 8 };

        // Throttle cursor pos update for canvas via RAF
        if (!cursorRafRef.current) {
            cursorRafRef.current = true;
            requestAnimationFrame(() => {
                setCursorPos({ ...cursorPosRef.current });
                cursorRafRef.current = false;
            });
        }
    }, []);

    // ── Staff Awaken ──────────────────────────────────────────────
    const handleAwakenStaff = useCallback(() => {
        soundFx.playStaffAwaken();
        setIsAwakened(true);
        const rect = containerRef.current?.getBoundingClientRect();
        const staffX = rect ? rect.left + rect.width * 0.282 : window.innerWidth * 0.28;
        const staffY = rect ? rect.top + rect.height * 0.218 : window.innerHeight * 0.22;
        setStaffBurst({ x: staffX, y: staffY, timestamp: Date.now() });
        setTimeout(() => setIsAwakened(false), 2800);
    }, []);

    // ── Chord Strummer ────────────────────────────────────────────
    const handlePlayChord = useCallback((freq, idx) => {
        setActiveString(idx);
        soundFx.playGuitarString(freq);
        setTimeout(() => setActiveString(null), 800);
    }, []);

    // ── Codex handlers ─────────────────────────────────────────────
    const openCodex = useCallback(() => setIsCodexOpen(true), []);
    const closeCodex = useCallback(() => setIsCodexOpen(false), []);

    // ── Memoized static decorative elements ────────────────────────
    const runeSymbols = useMemo(() => (
        <>
            <span className="rune-float      absolute top-[18%] left-[8%]  text-4xl text-red-500/25 pointer-events-none z-[15] font-mono">✦</span>
            <span className="rune-float-d1   absolute top-[14%] right-[9%] text-3xl text-amber-400/20 pointer-events-none z-[15] font-mono">◈</span>
            <span className="rune-float-d2   absolute top-[55%] left-[5%]  text-2xl text-red-400/20 pointer-events-none z-[15] font-mono">✧</span>
            <span className="rune-float-d3   absolute top-[60%] right-[6%] text-3xl text-amber-300/18 pointer-events-none z-[15] font-mono">⊕</span>
            <span className="rune-float-d4   absolute bottom-[22%] left-[46%] text-xl text-red-500/20 pointer-events-none z-[15] font-mono">❋</span>
        </>
    ), []);

    const novaTitle = useMemo(() => (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
            <div className="w-full flex items-center justify-between px-4 sm:px-12 md:px-20
                      font-cinzel font-black tracking-[-0.03em] text-[18vw] leading-none
                      uppercase select-none" style={{ filter: 'blur(0.4px)' }}>
                {['N', 'O', 'V', 'A'].map((l, i) => (
                    <span
                        key={l}
                        className="nova-letter nova-shimmer drop-shadow-[0_0_60px_rgba(220,38,38,0.45)]"
                        style={{ animationDelay: `${i * 0.7}s` }}
                    >
                        {l}
                    </span>
                ))}
            </div>
        </div>
    ), []);

    const tx = (extra = '') => `transition-all duration-700 ease-out ${extra}`;

    return (
        <>
            {/* Scroll spacer */}
            <div style={{ height: '250vh', pointerEvents: 'none', position: 'relative', zIndex: -1 }} />

            {/* ═══ FIXED FULL-VIEWPORT STAGE ═══ */}
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className="fixed inset-0 w-full h-full bg-[#040103] select-none overflow-hidden"
                style={{ zIndex: 10 }}
            >

                {/* ── LAYER 0: Static crimson nebula radial glow ─────────── */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-[20%] left-[22%] w-[820px] h-[820px] bg-red-700/15 rounded-full blur-[180px] nebula-pulse" />
                    <div className="absolute top-[35%] right-[18%] w-[700px] h-[700px] bg-rose-900/12 rounded-full blur-[150px] nebula-pulse-2" />
                    <div className="absolute bottom-0 inset-x-0 h-[50%] bg-gradient-to-t from-[#040103] via-[#0d0205]/70 to-transparent" />
                </div>

                {/* ── Film grain texture overlay ─────────────────────────── */}
                <div className="absolute inset-0 grain-overlay z-[5] pointer-events-none" />

                {/* ── Dynamic cursor spotlight ──────────────────────────── */}
                <div
                    className="absolute inset-0 pointer-events-none z-[6]"
                    style={{
                        background: `radial-gradient(550px circle at ${cursorPos.x}px ${cursorPos.y}px,
              rgba(239,68,68,0.10), rgba(251,191,36,0.04) 38%, transparent 75%)`,
                    }}
                />

                {/* ── Canvas: embers, constellations, shooting stars ─────── */}
                <CrimsonParticlesCanvas staffBurst={staffBurst} cursorPosition={cursorPos} />

                {/* ── LAYER 1: Huge "NOVA" title ─────────────────────────── */}
                {novaTitle}

                {/* ── Floating ambient rune symbols ──────────────────────── */}
                {runeSymbols}

                {/* ── LAYER 2: CHARACTER — scroll parallax + mouse 3D tilt ─ */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div
                        ref={charLayerRef}
                        className="relative w-full h-full max-w-[1920px] mx-auto flex items-center justify-center"
                        style={{
                            willChange: 'transform',
                            transition: 'transform 0.05s linear',
                        }}
                    >
                        {/* Scroll-driven translateY + breathing + sway */}
                        <div
                            data-scroll-target
                            className="relative w-full h-full flex items-center justify-center animate-breathe animate-sway"
                            style={{ willChange: 'transform' }}
                        >
                            {/* Floor aura glow */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-[40%]
                              bg-gradient-to-t from-red-700/25 via-red-900/10 to-transparent
                              blur-[80px] animate-pulse pointer-events-none z-0" />

                            {/* Hair aura glow halo */}
                            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[40%] h-[35%]
                              bg-gradient-to-b from-red-600/20 via-amber-900/10 to-transparent
                              blur-[60px] hair-aura pointer-events-none z-0" />

                            {/* Master Artwork Image */}
                            <img
                                src="/nova-showcase.jpg"
                                alt="NOVA Celestial Sorceress"
                                loading="eager"
                                className={`w-full h-full object-cover object-center filter contrast-[1.08] brightness-[1.03]
                            ${tx('delay-200')} ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}`}
                                style={{ transform: 'scale(1.05)', position: 'relative', zIndex: 1 }}
                            />

                            {/* Interactive Staff Core */}
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

                {/* ── Cinematic scanlines overlay ────────────────────────── */}
                <div className="absolute inset-0 scanlines-overlay z-[22] pointer-events-none opacity-40" />

                {/* ── Ground fog ─────────────────────────────────────────── */}
                <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none z-[24] overflow-hidden">
                    <div className="w-[120%] h-full bg-gradient-to-t from-red-950/50 via-red-900/12 to-transparent blur-2xl animate-mist-drift" />
                </div>

                {/* ═══ LAYER 3: HUD ═══ */}

                {/* ── Header ─────────────────────────────────────────────── */}
                <HeroHeader
                    onNavigate={onNavigate}
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                    onOpenCodex={openCodex}
                    onHideHud={() => { soundFx.playChime(); setHideHud(true); }}
                    mounted={mounted && !hideHud}
                />

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

                {/* ── Side floating cards ──────────────────────────────── */}
                <div
                    className={`absolute inset-0 z-30 max-w-7xl mx-auto w-full px-6
                      flex items-center justify-between pointer-events-none
                      ${tx()} ${hideHud ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                >
                    <LoreDossierCard mounted={mounted} onOpenCodex={openCodex} />
                    <ChordSoundboard
                        mounted={mounted}
                        activeString={activeString}
                        onPlayChord={handlePlayChord}
                        onAwakenStaff={handleAwakenStaff}
                        isAwakened={isAwakened}
                    />
                </div>

                {/* ── Scroll indicator & Know More CTA ──────────────────── */}
                <div className="absolute bottom-[4.8rem] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 transition-all duration-500">
                    <button
                        onClick={() => { soundFx.playChime(); onNavigate?.('weapons'); }}
                        className="group px-7 py-3 rounded-full border-2 border-amber-400/90 bg-gradient-to-r from-red-950/90 via-amber-950/80 to-purple-950/90
                       hover:from-red-900 hover:to-purple-900 text-amber-200 hover:text-white text-xs font-serif font-bold tracking-[0.2em] uppercase
                       shadow-[0_0_30px_rgba(251,191,36,0.45)] hover:shadow-[0_0_45px_rgba(251,191,36,0.7)] hover:scale-105 transition-all
                       backdrop-blur-md flex items-center gap-3 cursor-pointer"
                    >
                        <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                        <span>KNOW MORE ABOUT NOVA</span>
                        <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Side scroll hints */}
                <div className="absolute bottom-[5.5rem] left-8 z-40 pointer-events-none hidden md:block transition-all duration-500">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-[1px] bg-amber-400/60" />
                        <span className="text-[10px] font-mono tracking-[0.35em] text-amber-200/60 uppercase">SCROLL</span>
                    </div>
                </div>
                <div className="absolute bottom-[5.5rem] right-8 z-40 pointer-events-none hidden lg:block transition-all duration-500">
                    <span className="text-[10px] font-mono tracking-[0.4em] text-amber-400/40 uppercase">
                        THE CELESTIAL WEAVER AWAITS
                    </span>
                </div>

                {/* ── Bottom status bar ────────────────────────────────── */}
                <HeroFooterBar hideHud={hideHud} mounted={mounted} onOpenCodex={openCodex} />

                {/* ── Codex Drawer ────────────────────────────────────── */}
                <CodexDrawer isOpen={isCodexOpen} onClose={closeCodex} />

            </div>
        </>
    );
}
