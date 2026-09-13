import React, { useState } from 'react';
import { Sparkles, Music, Volume2, ArrowRight, Radio, Shield, BookOpen, Compass, Zap, Play } from 'lucide-react';
import { NOVA_LORE } from '../data/novaContent';
import { soundFx } from '../utils/soundEffects';
import { novaVoice } from '../utils/novaVoice';

export default function HeroPosterPage({ onNavigate }) {
  const char = NOVA_LORE.character;
  const [activeNote, setActiveNote] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const notes = [
    { label: 'C4', name: 'Earth Pulse', freq: 261.63 },
    { label: 'E4', name: 'Memory Echo', freq: 329.63 },
    { label: 'G4', name: 'Hope Wave', freq: 392.00 },
    { label: 'B4', name: 'Multiverse Resonance', freq: 493.88 }
  ];

  const handlePlayString = (idx, freq) => {
    setActiveNote(idx);
    soundFx.playGuitarString(freq);
    setTimeout(() => setActiveNote(null), 900);
  };

  const handlePlayVoice = () => {
    setIsSpeaking(true);
    soundFx.playCelestialChord();
    novaVoice.playOriginalVoice(() => {
      setIsSpeaking(false);
    });
  };

  return (
    <section className="relative min-h-[94vh] w-full overflow-hidden bg-[#03040c] text-white flex flex-col justify-between select-none">
      
      {/* ========================================================================= */}
      {/* 1. BATMAN-POSTER STYLE GIANT VERTICAL TYPOGRAPHY (RUNNING BEHIND HERO)   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        {/* Giant Monolithic Letters 'N O V A' Running Vertically Down Center */}
        <div className="flex flex-col items-center justify-center font-black tracking-tighter text-white/[0.05] leading-[0.78] text-[26vh] sm:text-[32vh] uppercase font-display select-none transform scale-y-110">
          <span className="hover:text-purple-500/15 transition-colors">N</span>
          <span className="hover:text-pink-500/15 transition-colors">O</span>
          <span className="hover:text-cyan-500/15 transition-colors">V</span>
          <span className="hover:text-purple-500/15 transition-colors">A</span>
        </div>

        {/* Ambient Dark-Cinema Lighting (Batman Movie Style) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03040c] via-transparent to-[#03040c]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03040c] via-transparent to-[#03040c] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. THE THREE-SECTION CINEMATIC POSTER (HERO FACE CENTER + FLANKING SIDES) */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center min-h-[700px]">

          {/* ------------------------------------------------------------------- */}
          {/* LEFT SIDE: POSTER WRITING & LORE (RUNNING ALONGSIDE HER FACE)       */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col justify-center space-y-6 text-left">
            
            {/* Top Category Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-[0.25em] uppercase bg-purple-950/80 border border-purple-500/40 text-purple-300 backdrop-blur-md shadow-lg">
                WHITEMATRIX AI MACHINE TEST
              </span>
            </div>

            {/* Giant Left Title */}
            <div>
              <p className="text-xs font-mono tracking-[0.35em] text-cyan-400 font-bold uppercase mb-1">
                GUARDIAN OF WONDER
              </p>
              <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white leading-none">
                SONOVA
              </h1>
              <p className="text-xs font-mono text-purple-300/80 uppercase tracking-widest mt-1.5">
                SAVIOR OF THE WORLD • AGE 20
              </p>
            </div>

            {/* Cinematic Origin Narrative (per user instruction) */}
            <div className="border-l-2 border-purple-500/70 pl-4 py-1 space-y-2">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                She lived a long life alone and suffered, turning into a woman who possesses the beauty of music inside her soul.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                She made melody her weapon to fight against the multiverse destruction, evolving into an untouchable radiant protector.
              </p>
            </div>

            {/* Character Specs Box */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-2.5 text-xs shadow-xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400 font-mono">POWER VECTOR</span>
                <span className="font-bold text-pink-300">Music + Knowledge</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-slate-400 font-mono">PRIMARY WEAPON</span>
                <span className="font-bold text-cyan-300">The Harmonic Lens</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-mono">AESTHETIC STYLE</span>
                <span className="font-bold text-amber-300">Modern • Vintage • Free</span>
              </div>
            </div>

            {/* Navigation Button */}
            <button
              onClick={() => onNavigate('weapons')}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 hover:scale-[1.02]"
            >
              <Music className="w-4 h-4" />
              <span>Explore Weapons & Lore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* ------------------------------------------------------------------- */}
          {/* CENTER: THE BATMAN-STYLE HERO FACE (PROMINENT, MAGNIFIED PORTRAIT)  */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-center relative my-2 lg:my-0">
            
            {/* Concentric Pulsing Soundwave Rings Radiating Outward */}
            <div className="absolute w-[440px] h-[440px] sm:w-[560px] sm:h-[560px] rounded-full border border-purple-500/20 animate-pulse-ring pointer-events-none" />
            <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full border border-cyan-500/20 animate-pulse-ring pointer-events-none [animation-delay:2s]" />
            <div className="absolute -inset-4 sm:-inset-10 rounded-full bg-gradient-to-t from-purple-600/25 via-pink-600/20 to-cyan-500/20 blur-3xl opacity-70 pointer-events-none" />

            {/* Central Movie-Poster Frame Focusing Directly on Nova's Face */}
            <div className="relative w-full max-w-[430px] aspect-[9/13] rounded-3xl overflow-hidden border-2 border-white/20 shadow-[0_0_60px_rgba(168,85,247,0.35)] bg-[#0c0e22] group">
              
              {/* Zoomed & Positioned Hero Face */}
              <img
                src="/nova-full-body.png"
                alt="Nova Superhero Face Portrait"
                className="w-full h-full object-cover object-top filter contrast-[1.12] brightness-[1.04] transition-transform duration-1000 group-hover:scale-110"
                style={{
                  objectPosition: '50% 12%',
                  transform: 'scale(1.38)'
                }}
              />

              {/* Batman Poster Style Atmospheric Smoke / Vignette Layers */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#03040c] via-transparent to-[#03040c]/40 opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#03040c]" />

              {/* Distressed Vertical Watermark (Like Batman Poster Title Edge) */}
              <div className="absolute top-6 left-5 text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-300/80 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                ✦ MULTIVERSE HARMONY V3.5
              </div>

              {/* Voice Quote Play Button (Top Right) */}
              <button
                onClick={handlePlayVoice}
                className="absolute top-5 right-5 p-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-110 transition-transform shadow-xl shadow-pink-500/40 flex items-center gap-1.5 text-xs font-bold z-20"
                title="Hear Nova Speak (Original Voice Track)"
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce text-amber-300' : ''}`} />
                <span className="text-[11px]">Play Voice</span>
              </button>

              {/* Poster Bottom Card with Cinematic Name & Quote */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2 z-20 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-wider uppercase leading-none">
                      N O V A
                    </h2>
                    <p className="text-xs text-purple-300 font-mono tracking-widest uppercase mt-1">
                      Guardian of Wonder
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-6 bg-cyan-400 rounded-full animate-wave-1" />
                    <span className="w-1.5 h-8 bg-purple-400 rounded-full animate-wave-2" />
                    <span className="w-1.5 h-5 bg-pink-400 rounded-full animate-wave-3" />
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic border-t border-white/10 pt-2 font-serif">
                  "{char.quote}"
                </p>
              </div>

            </div>

            {/* Poster Subtitle */}
            <div className="mt-3 text-[11px] text-slate-400 font-mono tracking-widest uppercase flex items-center gap-2">
              <span>✦ SOUND RESISTANCE PROTOCOL</span>
              <span>•</span>
              <span className="text-pink-400">JYOTHI COLLEGE & WHITEMATRIX</span>
            </div>

          </div>

          {/* ------------------------------------------------------------------- */}
          {/* RIGHT SIDE: WEAPONS, QUOTES & INTERACTIVE STRUMMER                  */}
          {/* ------------------------------------------------------------------- */}
          <div className="lg:col-span-3 order-3 flex flex-col justify-center space-y-6 text-left">
            
            {/* Cinematic Quote Card from Character Sheet */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-cyan-950/30 border border-purple-500/30 backdrop-blur-md shadow-xl">
              <p className="text-xs text-purple-200 font-serif italic mb-2 leading-relaxed">
                "She doesn't just see the world, she feels it, learns from it, and turns its stories into music. Because for Nova, the world is worth saving — and so are its dreams."
              </p>
              <div className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase font-bold text-right">
                — NOVA CODEX 01
              </div>
            </div>

            {/* Interactive Harmonic String Strummer (Celestial Soundboard) */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <Music className="w-3.5 h-3.5 text-pink-400" />
                  <span>The Harmonic Lens Strum</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Audio FX</span>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">
                Touch Nova's celestial guitar chords:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {notes.map((note, idx) => (
                  <button
                    key={note.label}
                    onClick={() => handlePlayString(idx, note.freq)}
                    onMouseEnter={() => handlePlayString(idx, note.freq)}
                    className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      activeNote === idx
                        ? 'bg-pink-600/40 border-pink-400 shadow-md shadow-pink-500/50 scale-105'
                        : 'bg-white/5 border-white/10 hover:border-purple-400/50 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xs font-bold text-white font-mono">{note.label}</span>
                    <span className="text-[10px] text-purple-300 font-medium">{note.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action to Launch ChatGPT AI Portal */}
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('chat')}
                className="w-full py-4 px-5 rounded-2xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 hover:scale-[1.02] glow-violet"
              >
                <Radio className="w-4 h-4 animate-pulse text-amber-300" />
                <span>Launch AI Help Portal (ChatGPT)</span>
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                Automated Email Dispatch: 🦸 Someone Needs Your Help!
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CINEMATIC BOTTOM BANNER STATS                                          */}
      {/* ========================================================================= */}
      <div className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-md py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>MULTIVERSE RESIDUAL FREQUENCY: ACTIVE (432Hz)</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <span>SAVIOR OF THE MULTIVERSE</span>
            <span>AGE: 20</span>
            <span>POWER: MUSIC + KNOWLEDGE</span>
            <span>WEAPON: HARMONIC LENS</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => soundFx.playCelestialChord()}
              className="text-[11px] text-purple-300 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3 h-3 text-pink-400" />
              <span>Chime Symphony</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
