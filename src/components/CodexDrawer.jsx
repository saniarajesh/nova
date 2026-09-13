import React, { useState, useEffect } from 'react';
import { X, BookOpen, Feather, Shield, Sparkles, Compass, Music, Save, Check, Download } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function CodexDrawer({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('lore'); // 'lore' | 'weapon' | 'powers' | 'notes'
  const [userNotes, setUserNotes] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nova_lore_draft') || 
`# CHAPTER II: THE WHISPER OF THE VOID
When the celestial sky cracked and red nebula flooded the horizon, Nova raised the Harmonic Astrolabe.

Her eyes mirrored the dying stars. She was not merely a warrior; she was the solitary archivist of everything lost to the silent dark.

"Every soul has a frequency," she murmured, watching the gold rings spin. "If they cannot speak, my staff shall sing for them."`;
    }
    return '';
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveNotes = () => {
    localStorage.setItem('nova_lore_draft', userNotes);
    setIsSaved(true);
    soundFx.playChime();
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleDownloadNotes = () => {
    const blob = new Blob([userNotes], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nova-lore-chronicles.md';
    a.click();
    URL.revokeObjectURL(url);
    soundFx.playChime();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md transition-all duration-500 animate-fadeIn">
      {/* Background backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Drawer Container */}
      <div className="relative w-full max-w-2xl h-full bg-[#080306]/95 border-l border-red-900/40 shadow-2xl flex flex-col z-10 text-slate-200 overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Drawer Header */}
        <div className="relative z-10 px-6 py-5 border-b border-red-950/80 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-950/60 border border-red-500/30 text-amber-300 shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black font-cinzel tracking-wider text-white">
                NOVA CODEX & CHRONICLES
              </h2>
              <p className="text-[11px] font-mono text-amber-400/80 tracking-widest uppercase">
                The Celestial Archive • Living Lore Repository
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playChime();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-red-500/30 transition-all"
            title="Close Codex"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="relative z-10 px-6 pt-3 flex gap-2 border-b border-red-950/60 overflow-x-auto">
          {[
            { id: 'lore', label: 'Origin Lore', icon: Feather },
            { id: 'weapon', label: 'The Astrolabe', icon: Compass },
            { id: 'powers', label: 'Star Rites', icon: Sparkles },
            { id: 'notes', label: 'Write Lore', icon: Music, badge: 'Active Scribe' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playChime();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-mono tracking-wider uppercase border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-amber-400 text-amber-300 bg-white/[0.02]'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-red-500/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-red-950 border border-red-500/50 text-red-300">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm leading-relaxed">
          
          {/* TAB 1: ORIGIN LORE */}
          {activeTab === 'lore' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-red-950/30 to-purple-950/20 border border-red-900/30 shadow-lg">
                <span className="text-[10px] font-mono tracking-[0.3em] text-red-400 uppercase font-bold">
                  ARCHIVAL RECORD • ZERO DAWN
                </span>
                <h3 className="text-2xl font-bold font-cinzel text-white mt-1 mb-3">
                  The Solitary Songstress of the Red Nebula
                </h3>
                <p className="text-slate-300 leading-relaxed font-serif text-base first-letter:text-4xl first-letter:font-bold first-letter:text-amber-400 first-letter:mr-2 first-letter:float-left">
                  She walked alone across the fractured dimensions of the multiverse. Where kingdoms collapsed into silence and sorrow devoured the voices of the fallen, Nova endured in isolation. Through decades of quiet grief, she discovered that sound never truly perishes; every tear, every unvoiced wish, and every memory reverberates in the fabric of the cosmos as high-harmonic resonance.
                </p>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  Refusing to let the quiet extinguish hope, she wove the sorrow into melody and the stars into celestial iron. She forged the Harmonic Astrolabe — transforming pain into an untouchable radiant aegis to guard every soul awaiting salvation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-slate-500 block mb-1">DESIGNATION</span>
                  <span className="text-amber-300 font-bold text-sm">NOVA / CELESTIAL WEAVER</span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-slate-500 block mb-1">HARMONIC VECTOR</span>
                  <span className="text-red-400 font-bold text-sm">432Hz COSMIC FREQUENCY</span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-slate-500 block mb-1">STATUS</span>
                  <span className="text-emerald-400 font-bold text-sm">ETERNAL VIGIL • ACTIVE</span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-slate-500 block mb-1">ORIGIN REALM</span>
                  <span className="text-purple-300 font-bold text-sm">CRIMSON CONVERGENCE</span>
                </div>
              </div>

              <div className="border-l-2 border-amber-400/80 pl-4 py-1 italic text-slate-300 font-serif">
                "She doesn't merely see the world; she feels its reverberations, hears the pulse of lost memories, and turns its silent tragedies into an unbreakable song."
              </div>
            </div>
          )}

          {/* TAB 2: THE ASTROLABE (WEAPON) */}
          {activeTab === 'weapon' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/20 to-red-950/30 border border-amber-500/20">
                <span className="text-[10px] font-mono tracking-[0.3em] text-amber-400 uppercase font-bold">
                  SACRED ARTIFACT DOSSIER
                </span>
                <h3 className="text-2xl font-bold font-cinzel text-white mt-1 mb-3">
                  The Harmonic Lens (Celestial Astrolabe)
                </h3>
                <p className="text-slate-300 font-serif leading-relaxed">
                  An ancient armillary sphere crafted from stellar gold and crystallized nebula core. The concentric rings orbit perpetually according to the celestial coordinate planes, focusing galactic starlight into concentrated resonance beams capable of shattering void anomalies.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Astrolabe Sub-Components
                </h4>

                {[
                  {
                    title: 'Core Stellar Plasma',
                    desc: 'Harvested from a collapsed neutron star, radiating perpetual indigo and violet energy.',
                    rating: 'Infinity Grade'
                  },
                  {
                    title: 'Triple Armillary Rings',
                    desc: 'Gilded celestial iron rings calibrated to track astral declination and harmonic waves.',
                    rating: 'Concentric 360° Gyroscope'
                  },
                  {
                    title: 'Diffraction Star Spikes',
                    desc: 'Four primary and four diagonal prismatic emitters casting starlight scalpel blades.',
                    rating: 'Starlight Dispersion'
                  },
                  {
                    title: 'Obsidian Staff Shaft',
                    desc: 'Reinforced cosmic lattice with gold filigree runic conduits channeling energy to her fingertips.',
                    rating: 'Zero-Conductance Grip'
                  }
                ].map((comp, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start justify-between gap-4">
                    <div>
                      <h5 className="font-bold text-white text-xs font-cinzel">{comp.title}</h5>
                      <p className="text-xs text-slate-400 mt-1">{comp.desc}</p>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300/80 whitespace-nowrap bg-amber-950/40 px-2 py-1 rounded border border-amber-500/20">
                      {comp.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STAR RITES (POWERS) */}
          {activeTab === 'powers' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30">
                <h3 className="text-lg font-bold font-cinzel text-purple-200">
                  Resonant Rites of the Star Veils
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Techniques wielded by Nova to restore equilibrium when dark celestial entities invade.
                </p>
              </div>

              {[
                {
                  name: 'Celestial Requiem (Ultimate)',
                  type: 'Multiverse Cleansing Rite',
                  desc: 'Nova strikes her astrolabe against the cosmic void, emitting an expanding 432Hz shockwave that vaporizes discordant anomalies while healing ally soul matrices.',
                  element: 'Crimson Radiant'
                },
                {
                  name: 'Veil of the Star Weaver',
                  type: 'Defensive Harmonic Cloak',
                  desc: 'Forms an untouchable barrier of floating stardust and golden constellation runes, reflecting hostile kinetic and psychic discharges.',
                  element: 'Stellar Gold'
                },
                {
                  name: 'Astral String Strum',
                  type: 'Precision Starlight Beam',
                  desc: 'She plucks invisible cosmic strings strung between the astrolabe rings, sending piercing beams of concentrated harmonic light.',
                  element: 'Violet Pulse'
                }
              ].map((rite, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-red-500/30 transition-all">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm font-cinzel">{rite.name}</h4>
                    <span className="text-[10px] font-mono text-red-300 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/40">
                      {rite.element}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">{rite.type}</span>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{rite.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: LIVE WRITING PAD ("and writting along later") */}
          {activeTab === 'notes' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-cinzel text-amber-200">
                    The Chronicle Scribe (Story & Lore Notebook)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Write new chapters, dialogue, lore expansions, and thoughts here. Automatically saved locally.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadNotes}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all text-xs flex items-center gap-1.5"
                    title="Export as Markdown file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export .md</span>
                  </button>
                  <button
                    onClick={handleSaveNotes}
                    className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-mono flex items-center gap-1.5 transition-all shadow-md"
                  >
                    {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{isSaved ? 'Saved!' : 'Save Story'}</span>
                  </button>
                </div>
              </div>

              {/* Textarea for user writing */}
              <div className="relative">
                <textarea
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Write your story, character thoughts, and lore entries here..."
                  rows={16}
                  className="w-full bg-black/60 border border-red-900/40 rounded-xl p-4 font-mono text-xs text-slate-200 focus:outline-none focus:border-amber-400/70 transition-all resize-y leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>✦ Stored locally in your browser cache</span>
                <span>{userNotes.length} characters • {userNotes.split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="relative z-10 px-6 py-4 border-t border-red-950/80 bg-black/50 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>CHRONICLE STATUS: SYNCHRONIZED</span>
          </div>
          <button
            onClick={() => {
              soundFx.playCelestialChord();
            }}
            className="text-amber-300 hover:text-white flex items-center gap-1.5 transition-colors font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Play Celestial Chime</span>
          </button>
        </div>

      </div>
    </div>
  );
}
