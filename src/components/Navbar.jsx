import React from 'react';
import { Sparkles, Volume2, VolumeX, Radio, Compass, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function Navbar({ activePage, setActivePage, isMuted, setIsMuted }) {
  const handleToggleSound = () => {
    const isNowActive = soundFx.toggleMute();
    setIsMuted(!isNowActive);
  };

  const handleNav = (page) => {
    soundFx.playChime();
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 via-black/60 to-transparent backdrop-blur-md border-b border-red-950/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-950/90 border border-red-500/50 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.4)] group-hover:scale-105 transition-transform">
            <span className="font-serif font-black text-amber-300 text-lg">N</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-widest text-white uppercase font-serif drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                NOVA
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-red-950/80 border border-red-500/40 text-red-300">
                GUARDIAN
              </span>
            </div>
            <p className="text-[10px] font-mono tracking-[0.25em] text-amber-400/80 uppercase">
              The Celestial Weaver • Star Veils
            </p>
          </div>
        </div>

        {/* Multi-Page Navigation Tabs */}
        <div className="hidden md:flex items-center gap-2 p-1.5 rounded-2xl bg-black/60 border border-red-900/40 backdrop-blur-md shadow-xl text-xs font-serif">
          <button 
            onClick={() => handleNav('hero')} 
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activePage === 'hero'
                ? 'bg-red-950/90 border border-red-500/50 text-amber-300 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PAGE 1 • Hero Showcase</span>
          </button>

          <button 
            onClick={() => handleNav('weapons')} 
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activePage === 'weapons'
                ? 'bg-red-950/90 border border-red-500/50 text-amber-300 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-red-400" />
            <span>PAGE 2 • 3D Arsenal & Relics</span>
          </button>

          <button 
            onClick={() => handleNav('chat')} 
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              activePage === 'chat'
                ? 'bg-red-950/90 border border-red-500/50 text-amber-300 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-purple-400" />
            <span>PAGE 3 • AI Help Portal</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? "Enable Celestial Soundscape" : "Mute Soundscape"}
            className="p-2.5 rounded-xl bg-black/60 hover:bg-red-950/50 border border-white/10 hover:border-red-500/40 text-slate-300 hover:text-white transition-all backdrop-blur-md shadow-lg flex items-center gap-1.5 text-xs font-mono"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />}
            <span className="hidden sm:inline">{isMuted ? "Muted" : "Audio On"}</span>
          </button>

          {/* Direct CTA */}
          <button
            onClick={() => handleNav('chat')}
            className="group px-4 sm:px-5 py-2.5 rounded-full border border-amber-400/80 bg-gradient-to-r from-red-950/90 via-amber-950/80 to-purple-950/90 hover:from-red-900 hover:to-purple-900 text-amber-200 hover:text-white text-xs font-serif font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all flex items-center gap-2"
          >
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">Ask for Help</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

      </div>
    </nav>
  );
}
