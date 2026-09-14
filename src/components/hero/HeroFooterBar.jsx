import React from 'react';
import { ArrowRight } from 'lucide-react';
import { NOVA_LORE } from '../../data/novaContent';

export default function HeroFooterBar({ onNavigate }) {
  return (
    <div className="absolute bottom-8 inset-x-0 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-6 z-40">
      {/* Lore Summary snippet */}
      <div className="max-w-xl text-left bg-black/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <p className="text-sm font-serif text-slate-300 leading-relaxed">
          <span className="text-amber-400 font-bold">"{NOVA_LORE.tagline}"</span><br />
          {NOVA_LORE.subhero}
        </p>
      </div>

      {/* Navigation to Weapons (Page 2) */}
      <button
        onClick={() => onNavigate('weapons')}
        className="group relative px-8 py-4 rounded-full overflow-hidden border border-amber-500/50 hover:border-amber-400 transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-amber-900 to-purple-900 opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center gap-3 font-bold text-xs tracking-[0.2em] text-white">
          <span>ENTER THE ARSENAL</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
    </div>
  );
}
