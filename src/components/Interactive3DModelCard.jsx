import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Sparkles, RefreshCw, Volume2 } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function Interactive3DModelCard({ item }) {
  const [rotation, setRotation] = useState({ x: 10, y: -15 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [isAwakened, setIsAwakened] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const startPos = useRef({ x: 0, y: 0 });
  const animFrame = useRef(null);

  // Auto 3D Orbit loop
  useEffect(() => {
    if (!isAutoSpinning || isDragging) return;

    let lastTime = performance.now();
    const animate = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      setRotation(prev => ({
        x: Math.sin(now * 0.001) * 8,
        y: (prev.y + delta * 20) % 360
      }));
      animFrame.current = requestAnimationFrame(animate);
    };

    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [isAutoSpinning, isDragging]);

  // Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    startPos.current = { x: e.clientX, y: e.clientY };

    setRotation(prev => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.6
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    soundFx.playChime();
    setRotation({ x: 10, y: -15 });
    setIsAutoSpinning(true);
  };

  const handleAwaken = () => {
    soundFx.playStaffAwaken();
    setIsAwakened(true);
    setTimeout(() => setIsAwakened(false), 2500);
  };

  // Hotspots definitions per item
  const hotspots = item.id === 'harmonic_lens' ? [
    { x: '35%', y: '25%', label: 'Astrolabe Core', detail: 'Pulsates at 432Hz core frequency' },
    { x: '65%', y: '45%', label: 'Resonance Strings', detail: '4 celestial strings tuned to cosmic harmonics' },
    { x: '75%', y: '70%', label: 'Starlight Scroll', detail: 'Inlaid with obsidian and gold star runes' }
  ] : item.id === 'starlit_guitar' ? [
    { x: '40%', y: '50%', label: 'Constellation Body', detail: 'Obsidian wood with active starlight orbit rings' },
    { x: '70%', y: '30%', label: 'Harmonic Neck', detail: 'Fretboard with inlaid golden moon phases' },
    { x: '85%', y: '15%', label: 'Headstock Relic', detail: 'Anchors celestial tuning pegs' }
  ] : [
    { x: '50%', y: '40%', label: 'Star Veil Compass', detail: 'Four-point golden starlight emblem' },
    { x: '75%', y: '25%', label: 'Ancient Parchment', detail: 'Decoded star charts and distress maps' },
    { x: '35%', y: '70%', label: 'Velvet Spine', detail: 'Bound with multiversal memory matrix ribbons' }
  ];

  return (
    <div className="relative w-full rounded-3xl border border-amber-500/30 bg-black/70 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">

      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-red-950/20 via-purple-950/20 to-amber-950/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header Controls */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-amber-500/10 border border-amber-500/40 text-amber-300">
              3D INTERACTIVE MODEL
            </span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              DRAG TO ROTATE 360°
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
            {item.name}
          </h2>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 border ${isAutoSpinning
              ? 'bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            title="Toggle Automatic 3D Orbit"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoSpinning ? 'animate-spin-slow' : ''}`} />
            <span>{isAutoSpinning ? 'Auto-Orbit ON' : 'Auto-Orbit OFF'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all"
            title="Reset 3D Rotation View"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleAwaken}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center gap-1.5 border ${isAwakened
              ? 'bg-red-600 border-amber-300 text-white shadow-lg shadow-red-600/50 scale-105'
              : 'bg-gradient-to-r from-red-950 to-purple-950 border-amber-500/40 text-amber-300 hover:border-amber-400'
              }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{isAwakened ? 'Relic Ignited!' : 'Awaken Relic'}</span>
          </button>
        </div>
      </div>

      {/* 3D Model Stage Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">

        {/* Left 3D Interactive Stage Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative w-full max-w-[520px] aspect-square rounded-3xl cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
            style={{ perspective: '1200px' }}
          >
            {/* 3D Orbit Ring Guides */}
            <div className="absolute inset-4 rounded-full border border-dashed border-amber-500/20 pointer-events-none animate-spin-slow" style={{ animationDuration: '30s' }} />
            <div className="absolute inset-16 rounded-full border border-dashed border-purple-500/20 pointer-events-none animate-spin-reverse" style={{ animationDuration: '40s' }} />

            {/* Floating 3D Object Card Container */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-75"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(20px)`,
              }}
            >
              {/* 3D Floor Shadow */}
              <div
                className="absolute bottom-6 w-[75%] h-12 bg-black/80 blur-2xl rounded-full pointer-events-none"
                style={{
                  transform: `translateY(140px) rotateX(90deg) scale(${1 + Math.abs(rotation.x) * 0.01})`,
                }}
              />

              {/* The High-Res Weapon/Book Artwork rendered in 3D Space */}
              <div className="relative w-[75%] aspect-[4/5] rounded-[24px] overflow-hidden border-2 border-amber-400/40 shadow-[0_0_50px_rgba(239,68,68,0.35)] group bg-black/80 backdrop-blur-2xl border-glow">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-contain filter contrast-[1.08] brightness-[1.03] transition-all duration-300"
                  style={{ transform: 'scale(1.02)' }}
                />

                {/* Relic Starlight Glow Burst when awakened */}
                {isAwakened && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/40 via-amber-300/40 to-purple-600/40 mix-blend-screen pointer-events-none animate-ping" />
                )}

                {/* Inner shadow depth overlay */}
                <div className="absolute inset-0 pointer-events-none rounded-[24px]"
                  style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5), inset 0 0 80px rgba(0,0,0,0.25)' }}
                />

                {/* Dynamic Lighting Shine Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(${135 + rotation.y}deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)`,
                  }}
                />

                {/* Hotspot Floating Nodes */}
                {hotspots.map((spot, idx) => (
                  <div
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFx.playChime();
                      setActiveHotspot(activeHotspot === idx ? null : idx);
                    }}
                    className="absolute cursor-pointer z-30 group/spot"
                    style={{ left: spot.x, top: spot.y }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-300 border border-white shadow-[0_0_10px_#fbbf24]" />
                    </div>

                    {/* Hotspot Tooltip */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-black/90 border border-amber-400/60 text-left backdrop-blur-md shadow-2xl transition-all duration-300 ${activeHotspot === idx ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none group-hover/spot:opacity-100 group-hover/spot:scale-100'
                      }`}>
                      <div className="text-[11px] font-bold text-amber-300 font-serif">{spot.label}</div>
                      <div className="text-[10px] text-slate-300 leading-tight mt-0.5">{spot.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instruction Overlay Banner */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/80 border border-amber-500/30 text-[10px] font-mono text-amber-300/80 tracking-widest uppercase backdrop-blur-md shadow-lg pointer-events-none">
              ✦ CLICK & DRAG TO ROTATE IN 3D SPACE
            </div>
          </div>
        </div>

        {/* Right Details & Audio Synthesizer */}
        <div className="lg:col-span-5 space-y-5 text-left">
          <div>
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold">
              {item.category} • {item.tagline}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mt-1">
              "{item.quote}"
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mt-3 font-serif">
              {item.description}
            </p>
          </div>

          {/* Key Capabilities */}
          <div className="space-y-2 border-t border-white/10 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Relic Capabilities:
            </h4>
            <div className="space-y-2">
              {item.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 font-serif">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-1" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* String Frequency Synthesizer (if weapon has frequencies) */}
          {item.soundFrequencies && (
            <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 font-mono">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Pluck Cosmic Strings</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Click to Strum</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {item.soundFrequencies.map((str) => (
                  <button
                    key={str.note}
                    onClick={() => {
                      soundFx.playGuitarString(str.freq);
                    }}
                    className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-amber-400 hover:bg-white/10 text-center transition-all"
                  >
                    <div className="text-xs font-bold text-white font-mono">{str.note}</div>
                    <div className="text-[9px] text-amber-300/80 truncate">{str.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
