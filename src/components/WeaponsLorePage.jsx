import React, { useState } from 'react';
import { Music, Sparkles, BookOpen, Compass, Zap, ArrowRight, Radio } from 'lucide-react';
import { NOVA_LORE } from '../data/novaContent';
import { soundFx } from '../utils/soundEffects';
import Interactive3DModelCard from './Interactive3DModelCard';

export default function WeaponsLorePage({ onNavigate }) {
  const [activeWeapon, setActiveWeapon] = useState('harmonic_lens');
  const [activeDimension, setActiveDimension] = useState(0);

  const currentWeapon = NOVA_LORE.weapons.find(w => w.id === activeWeapon) || NOVA_LORE.weapons[0];

  return (
    <div className="min-h-screen bg-[#040103] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* Background celestial glows */}
      <div className="absolute top-20 left-1/4 w-[550px] h-[550px] bg-red-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-amber-900/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">

        {/* ========================================================================= */}
        {/* 1. HEADER SECTION                                                         */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-red-950/80 border border-amber-500/40 text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PAGE 2 • 3D ARSENAL OF MUSIC & LIVING WISDOM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white uppercase">
            Her Weapons & <span className="bg-gradient-to-r from-red-400 via-amber-300 to-purple-400 bg-clip-text text-transparent">3D Grimoire Relics</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif">
            "Not just weapons... they are extensions of her soul." Explore Nova's 3D relics—strum her starlight guitar, inspect her violin wand astrolabe, and turn the pages of her celestial grimoire book in full 3D rotation.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. WEAPON SELECTION TABS                                                  */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {NOVA_LORE.weapons.filter(w => w.id !== 'astrolabe_codex').map((w) => (
            <button
              key={w.id}
              onClick={() => {
                setActiveWeapon(w.id);
                soundFx.playChime();
              }}
              className={`px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 border font-serif ${
                activeWeapon === w.id
                  ? 'bg-gradient-to-r from-red-900 via-amber-900 to-purple-950 text-amber-200 border-amber-400 shadow-xl shadow-red-950/60 scale-105'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-amber-400/40'
              }`}
            >
              {w.id === 'harmonic_lens' && <Zap className="w-4 h-4 text-amber-400" />}
              {w.id === 'starlit_guitar' && <Music className="w-4 h-4 text-red-400" />}
              {w.id === 'starlit_journal' && <BookOpen className="w-4 h-4 text-purple-400" />}
              <span>{w.name}</span>
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 3. ACTIVE 3D WEAPON & RELIC DISPLAY                                       */}
        {/* ========================================================================= */}
        <div className="w-full">
          <Interactive3DModelCard key={currentWeapon.id} item={currentWeapon} />
        </div>

        {/* ========================================================================= */}
        {/* 4. THE WORLD SHE SAVES: 5 DIMENSIONS                                      */}
        {/* ========================================================================= */}
        <div className="space-y-6 pt-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif uppercase">
              The Dimensions Nova Protects
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-serif">
              "Same planet. Different stories. One home." Five realms protected by Nova's starlight.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {NOVA_LORE.dimensionsSaved.map((dim, idx) => (
              <div
                key={dim.id}
                onClick={() => {
                  setActiveDimension(idx);
                  soundFx.playChime();
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                  activeDimension === idx
                    ? 'bg-red-950/60 border-amber-400 shadow-lg shadow-red-950/40 -translate-y-1'
                    : 'bg-white/[0.03] border-white/10 hover:border-amber-400/40'
                }`}
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-3">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5 font-serif">{dim.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-serif">{dim.desc}</p>
                </div>
                <div className="text-[10px] font-mono text-amber-300/80 uppercase tracking-wider mt-4">
                  Domain 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. HER ORIGIN NARRATIVE & NAVIGATION                                       */}
        {/* ========================================================================= */}
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-red-950/60 via-purple-950/40 to-black p-8 sm:p-12 text-left relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="text-xs font-mono text-amber-400 font-bold tracking-widest uppercase">
              {NOVA_LORE.origin.heading}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif uppercase">
              A Common Girl Forged into an Untouchable Guardian
            </h3>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed font-serif">
              {NOVA_LORE.origin.storyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('chat')}
                className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-amber-600 to-purple-600 hover:shadow-red-500/50 shadow-xl transition-all flex items-center gap-2"
              >
                <Radio className="w-4 h-4" />
                <span>PAGE 3 • OPEN AI HELP PORTAL (CHAT)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('hero')}
                className="px-6 py-3.5 rounded-full font-semibold text-xs text-slate-300 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-serif"
              >
                ← PAGE 1 • BACK TO HERO SHOWCASE
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
