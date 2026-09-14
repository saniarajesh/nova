import React from 'react';
import { Volume2, VolumeX, Radio } from 'lucide-react';
import { NOVA_LORE } from '../../data/novaContent';

export default function HeroHeader({ isMuted, setIsMuted, soundFx }) {
  return (
    <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-start z-50">
      <div className="space-y-1">
        <div className="text-[10px] font-mono tracking-[0.4em] text-red-500 uppercase glow-text-crimson">
          PROJECT {NOVA_LORE.name}
        </div>
        <div className="text-xs font-serif text-slate-400 tracking-wider">
          Guardian of Wonder • Savannah Sector
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Ambient Sound Toggle */}
        <button
          onClick={() => setIsMuted(!soundFx.toggleMute())}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/40 hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-md relative group"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
          )}
          {!isMuted && (
            <div className="absolute inset-0 rounded-full border border-amber-400/50 animate-ping opacity-50" />
          )}
        </button>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 backdrop-blur-md">
          <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span className="text-[10px] font-mono text-red-300 tracking-widest font-bold">
            SIGNAL: ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}
