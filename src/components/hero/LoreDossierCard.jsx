import React from 'react';

export default function LoreDossierCard({ isHovered, soundFx }) {
  return (
    <div
      className={`absolute left-[4%] top-[25%] max-w-sm transition-all duration-700 ease-out z-40 ${
        isHovered
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-12 pointer-events-none'
      }`}
    >
      <div className="bg-black/60 border border-red-950/80 p-6 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* decorative background element */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <h3 className="text-sm font-mono tracking-widest text-amber-500 glow-text-gold font-bold">
            SUBJECT CLASSIFICATION
          </h3>
          <div className="space-y-3 font-serif">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400 text-xs">Origin</span>
              <span className="text-white text-xs">Unknown / Savanah</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400 text-xs">Power Source</span>
              <span className="text-cyan-300 text-xs">Acoustic Resonance</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400 text-xs">Threat Level</span>
              <span className="text-red-400 font-bold text-xs glow-text-crimson">
                OMEGA (Protector)
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed italic border-l-2 border-red-800 pl-3">
            "Her music doesn't just soothe; it alters the very fabric of multiversal reality, shielding the innocent from cosmic erosion."
          </p>

          <button
            onMouseEnter={() => soundFx.playGuitarString(880)}
            className="w-full mt-2 py-2 border border-amber-500/30 rounded-xl text-[10px] font-mono text-amber-300 hover:bg-amber-900/30 transition-colors uppercase tracking-[0.2em]"
          >
            Access Full Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
