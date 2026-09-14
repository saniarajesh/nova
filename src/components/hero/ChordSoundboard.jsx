import React, { useState } from 'react';

export default function ChordSoundboard({ soundFx }) {
  const [activeChord, setActiveChord] = useState(null);

  const chordPadConfig = [
    { note: 'C4', freq: 261.63, label: 'Heal' },
    { note: 'E4', freq: 329.63, label: 'Shield' },
    { note: 'G4', freq: 392.00, label: 'Truth' },
    { note: 'A4', freq: 440.00, label: 'Hope' },
  ];

  return (
    <div className="absolute right-[4%] top-[25%] max-w-[200px] z-40 hidden md:block">
      <div className="bg-black/40 border border-white/10 p-4 rounded-3xl backdrop-blur-md shadow-2xl">
        <h3 className="text-[9px] font-mono tracking-[0.2em] text-slate-400 mb-3 text-center">
          ACOUSTIC TRIGGERS
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {chordPadConfig.map((pad, i) => (
            <button
              key={i}
              onMouseEnter={() => {
                setActiveChord(i);
                soundFx.playGuitarString(pad.freq);
              }}
              onMouseLeave={() => setActiveChord(null)}
              className={`relative h-16 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                activeChord === i
                  ? 'bg-amber-500/20 border-amber-400 scale-105 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                  : 'bg-white/5 border-white/10 hover:border-white/30'
              }`}
            >
              <span className={`text-xs font-bold font-mono transition-colors ${
                activeChord === i ? 'text-amber-300' : 'text-slate-300'
              }`}>
                {pad.note}
              </span>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest">
                {pad.label}
              </span>
              {/* ripple effect on active */}
              {activeChord === i && (
                <div className="absolute inset-0 rounded-xl border border-amber-400/50 animate-ping opacity-50 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
