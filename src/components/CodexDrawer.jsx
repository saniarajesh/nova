import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  Feather, 
  Compass, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  ScrollText, 
  Clock,
  Bookmark,
  Layers,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const CODEX_FOLIO_SPREADS = [
  {
    spreadIndex: 0,
    leftPageNum: 1,
    rightPageNum: 2,
    folioBadge: 'FOLIO I • ZERO DAWN',
    chapterTitle: 'The Solitary Songstress of the Red Nebula',
    dropCapLetter: 'S',
    firstParagraph: 'he walked alone across the fractured dimensions of the multiverse. Where kingdoms collapsed into silence and sorrow devoured the voices of the fallen, Nova endured in isolation. Through decades of quiet grief, she discovered that sound never truly perishes; every tear, every unvoiced wish, and every memory reverberates in the fabric of the cosmos as high-harmonic resonance.',
    secondParagraph: 'Refusing to let the quiet extinguish hope, she wove the sorrow into melody and the stars into celestial iron. She forged the Harmonic Astrolabe — transforming pain into an untouchable radiant aegis to guard every soul awaiting salvation.',
    quote: 'Suffering carved silence into her spirit. But inside that void, melody became her blade.',
    stampDate: 'Pre-Cycle Genesis Epoch',
    sketchType: 'astrolabe_core',
    sketchFig: 'FIG 1.0',
    sketchTitle: 'PENCIL SCHEMATIC: GENESIS ASTROLABE CORE',
    sketchSubtitle: 'Hand-drawn celestial coordinates • 432Hz Fundamental Pitch',
    metadata: [
      { label: 'DESIGNATION', value: 'NOVA / CELESTIAL WEAVER', color: 'text-amber-300' },
      { label: 'HARMONIC VECTOR', value: '432Hz COSMIC FREQUENCY', color: 'text-red-400' },
      { label: 'ORIGIN REALM', value: 'CRIMSON CONVERGENCE', color: 'text-purple-300' },
      { label: 'STATUS', value: 'IMMUTABLE CANON • LOCKED', color: 'text-emerald-400' }
    ],
    audioNote: 261.63, // C4
    audioLabel: 'C4 (261.63Hz) Genesis Core'
  },
  {
    spreadIndex: 1,
    leftPageNum: 3,
    rightPageNum: 4,
    folioBadge: 'FOLIO II • HUMAN PILGRIMAGE',
    chapterTitle: 'The Continental Pilgrimage & The Starlit Journal',
    dropCapLetter: 'F',
    firstParagraph: 'or years before ascending to the celestial mantle, Sonova traveled across continents entirely on foot. She carried only a battered cloth traveler\'s journal, walking from bustling industrial metropolis corridors to forgotten highland hamlets.',
    secondParagraph: 'She sat by weary laborers and suffering families, listening to unvoiced grievances, quiet dreams, and ancestral songs. She recorded every story into her journal, realizing that empathy is the ultimate cosmic energy that no dark dimensional entity could ever replicate or conquer.',
    quote: 'Same planet. Different stories. One home. Knowledge is another kind of power.',
    stampDate: 'Cycle 2018 Standard Year',
    sketchType: 'grimoire_journal',
    sketchFig: 'FIG 2.0',
    sketchTitle: 'PENCIL SCHEMATIC: THE LIVING STARLIT JOURNAL',
    sketchSubtitle: 'Field sketch of the velvet chronicle & brass compass clasp',
    metadata: [
      { label: 'CHRONICLE RELIC', value: 'GRIMOIRE OF STAR VEILS', color: 'text-amber-300' },
      { label: 'EMPATHY LEVEL', value: '100% UNCONDITIONAL', color: 'text-red-400' },
      { label: 'PILGRIMAGE REACH', value: 'ALL 7 CONTINENTS', color: 'text-purple-300' },
      { label: 'STATUS', value: 'SACRED HISTORICAL RECORD', color: 'text-emerald-400' }
    ],
    audioNote: 329.63, // E4
    audioLabel: 'E4 (329.63Hz) Memory Wave'
  },
  {
    spreadIndex: 2,
    leftPageNum: 5,
    rightPageNum: 6,
    folioBadge: 'FOLIO III • SACRED FORGING',
    chapterTitle: 'The Harmonic Astrolabe & The 432Hz Crucible',
    dropCapLetter: 'U',
    firstParagraph: 'pon the crumbling peaks of Ancient Aethelgard, when dimensional ruptures first leaked entropy into our reality, Nova raised her newly forged astrolabe. Its concentric gold rings rotated in celestial harmony, aligning directly with the cosmic frequency of 432Hz.',
    secondParagraph: 'Channeling the acoustic memories archived in her heart, she struck the first celestial chord. A blinding 10,000-lumen kinetic starlight aura erupted, purifying the rift and establishing her eternal sanctuary for the unheard.',
    quote: 'Not just a dreamer... I am the one who turns dreams into reality.',
    stampDate: 'Astral Cycle 2021',
    sketchType: 'violin_wand',
    sketchFig: 'FIG 3.0',
    sketchTitle: 'PENCIL SCHEMATIC: HARMONIC VIOLIN WAND',
    sketchSubtitle: 'Counter-rotating armillary rings & 4-string acoustic bow',
    metadata: [
      { label: 'RELIC WEAPON', value: 'HARMONIC ASTROLABE CORE', color: 'text-amber-300' },
      { label: 'BURST OUTPUT', value: '18.7 EXAWATTS (STARS)', color: 'text-red-400' },
      { label: 'GYROSCOPE', value: '360° CONCENTRIC RINGS', color: 'text-purple-300' },
      { label: 'RESONANCE', value: 'PURIFYING SOLAR FLARE', color: 'text-emerald-400' }
    ],
    audioNote: 392.00, // G4
    audioLabel: 'G4 (392.00Hz) Stellar Pulse'
  },
  {
    spreadIndex: 3,
    leftPageNum: 7,
    rightPageNum: 8,
    folioBadge: 'FOLIO IV • ETERNAL GUARDIANSHIP',
    chapterTitle: 'The Starlit Beacon & The Watch for Unheard Voices',
    dropCapLetter: 'T',
    firstParagraph: 'o vanquish cosmic terrors was not enough. Nova dedicated her eternal mantle to the daily struggles of ordinary human souls—fighting isolation in quiet bedrooms, exploitation in workplaces, and systemic negligence across the globe.',
    secondParagraph: 'Operating 24 hours a day across all frequencies, her Harmonic Signal Sense captures the faintest cry for help, instantly routing encryption-backed dispatch alerts, institutional protection, and unconditional compassion to ensure no person suffers alone.',
    quote: 'Every person\'s story is sacred. No voice in this multiverse is too small to be heard.',
    stampDate: 'Present Era • Active Watch',
    sketchType: 'beacon_network',
    sketchFig: 'FIG 4.0',
    sketchTitle: 'PENCIL SCHEMATIC: OMNIPRESENT BEACON MATRIX',
    sketchSubtitle: 'Constellation dispatch nodes & encrypted frequency vectors',
    metadata: [
      { label: 'BEACON SANCTUM', value: 'GLOBAL DISPATCH ONLINE', color: 'text-amber-300' },
      { label: 'VIGIL COVERAGE', value: '24/7/365 OMNIPRESENT', color: 'text-red-400' },
      { label: 'PROTECTION', value: 'ABSOLUTE AEGIS SHIELD', color: 'text-purple-300' },
      { label: 'GUARDIAN STATUS', value: 'ETERNAL SAVIOR • ONLINE', color: 'text-emerald-400' }
    ],
    audioNote: 493.88, // B4
    audioLabel: 'B4 (493.88Hz) Nebula Veil'
  }
];

// Helper component to render authentic pencil sketch illustrations
function PencilSketchIllustration({ type }) {
  if (type === 'astrolabe_core') {
    return (
      <svg viewBox="0 0 460 210" className="w-full h-auto text-amber-300/85 stroke-current fill-none">
        <defs>
          <pattern id="spread-hatch-1" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.22" />
          </pattern>
        </defs>
        <rect x="8" y="8" width="444" height="194" fill="url(#spread-hatch-1)" rx="10" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="5 5" />
        
        {/* Armillary Concentric Rings */}
        <circle cx="230" cy="105" r="75" strokeWidth="1.3" strokeDasharray="4 3" />
        <ellipse cx="230" cy="105" rx="68" ry="34" strokeWidth="1.1" transform="rotate(-30 230 105)" />
        <ellipse cx="230" cy="105" rx="68" ry="34" strokeWidth="1.1" transform="rotate(40 230 105)" />
        <circle cx="230" cy="105" r="20" strokeWidth="1.6" stroke="rgba(251,191,36,0.95)" />
        <circle cx="230" cy="105" r="8" fill="currentColor" fillOpacity="0.5" />
        
        {/* Rays */}
        <line x1="230" y1="20" x2="230" y2="190" strokeWidth="0.8" strokeOpacity="0.5" />
        <line x1="145" y1="105" x2="315" y2="105" strokeWidth="0.8" strokeOpacity="0.5" />
        <line x1="170" y1="45" x2="290" y2="165" strokeWidth="0.75" strokeOpacity="0.4" />
        <line x1="170" y1="165" x2="290" y2="45" strokeWidth="0.75" strokeOpacity="0.4" />
        
        {/* Sine waves */}
        <path d="M 25 105 Q 65 50, 105 105 T 185 105" strokeWidth="1.1" stroke="rgba(239,68,68,0.75)" strokeDasharray="3 3" />
        <path d="M 275 105 Q 315 160, 355 105 T 435 105" strokeWidth="1.1" stroke="rgba(239,68,68,0.75)" strokeDasharray="3 3" />
        
        {/* Annotations */}
        <text x="22" y="28" fill="currentColor" fillOpacity="0.8" fontSize="8.5" fontFamily="monospace">FIG 1.0 // GENESIS CORE GYROSCOPE</text>
        <text x="22" y="40" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontFamily="monospace">f = 432.00 Hz • HARMONIC LOCK</text>
        <text x="310" y="28" fill="currentColor" fillOpacity="0.7" fontSize="7.5" fontFamily="monospace">360° TRIPLE GIMBAL CALIBRATION</text>
        <text x="310" y="188" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontFamily="monospace">FLUX: 10,000 lm SOLAR AURA</text>
        <circle cx="105" cy="105" r="3" fill="currentColor" />
        <circle cx="355" cy="105" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'grimoire_journal') {
    return (
      <svg viewBox="0 0 460 210" className="w-full h-auto text-amber-300/85 stroke-current fill-none">
        <defs>
          <pattern id="spread-hatch-2" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.22" />
          </pattern>
        </defs>
        <rect x="8" y="8" width="444" height="194" fill="url(#spread-hatch-2)" rx="10" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="5 5" />
        
        {/* Open Book Outline */}
        <path d="M 230 40 L 230 165 M 230 40 C 185 34, 115 34, 80 46 L 80 160 C 115 148, 185 148, 230 165 C 275 148, 345 148, 380 160 L 380 46 C 345 34, 275 34, 230 40 Z" strokeWidth="1.4" />
        <path d="M 88 52 C 120 42, 185 42, 224 56 L 224 158 C 185 144, 120 144, 88 154 Z" strokeWidth="0.7" strokeOpacity="0.45" />
        <path d="M 372 52 C 340 42, 275 42, 236 56 L 236 158 C 275 144, 340 144, 372 154 Z" strokeWidth="0.7" strokeOpacity="0.45" />
        
        {/* Compass Rose on Right Page */}
        <circle cx="305" cy="102" r="28" strokeWidth="0.8" strokeDasharray="3 2" />
        <polygon points="305,78 311,98 331,102 311,106 305,126 299,106 279,102 299,98" fill="currentColor" fillOpacity="0.3" strokeWidth="1" />
        
        {/* Constellation Star Lines on Left Page */}
        <polyline points="120,72 150,88 180,68 198,110 155,128" strokeWidth="1" stroke="rgba(239,68,68,0.8)" />
        <circle cx="120" cy="72" r="2.5" fill="currentColor" />
        <circle cx="150" cy="88" r="3" fill="currentColor" />
        <circle cx="180" cy="68" r="2.5" fill="currentColor" />
        <circle cx="198" cy="110" r="3.5" fill="currentColor" />
        <circle cx="155" cy="128" r="2.5" fill="currentColor" />

        <text x="22" y="28" fill="currentColor" fillOpacity="0.8" fontSize="8.5" fontFamily="monospace">FIG 2.0 // STARLIT GRIMOIRE &amp; MAPS</text>
        <text x="22" y="188" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontFamily="monospace">ARCHIVE: 7 CONTINENTS • LIVING WISDOM</text>
        <text x="295" y="188" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontFamily="monospace">STELLAR DECLINATION 45°N</text>
      </svg>
    );
  }

  if (type === 'violin_wand') {
    return (
      <svg viewBox="0 0 460 210" className="w-full h-auto text-amber-300/85 stroke-current fill-none">
        <defs>
          <pattern id="spread-hatch-3" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.22" />
          </pattern>
        </defs>
        <rect x="8" y="8" width="444" height="194" fill="url(#spread-hatch-3)" rx="10" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="5 5" />
        
        {/* Staff Shaft */}
        <line x1="60" y1="160" x2="400" y2="45" strokeWidth="2.2" stroke="rgba(251,191,36,0.95)" />
        <line x1="58" y1="158" x2="398" y2="43" strokeWidth="0.8" strokeOpacity="0.5" />
        
        {/* Staff Head Astrolabe Sphere */}
        <circle cx="365" cy="55" r="36" strokeWidth="1.3" strokeDasharray="4 2" />
        <ellipse cx="365" cy="55" rx="36" ry="16" strokeWidth="1" transform="rotate(-30 365 55)" />
        <ellipse cx="365" cy="55" rx="36" ry="16" strokeWidth="1" transform="rotate(45 365 55)" />
        <circle cx="365" cy="55" r="12" fill="currentColor" fillOpacity="0.45" />
        
        {/* 4 Resonance Strings */}
        <line x1="130" y1="135" x2="310" y2="75" strokeWidth="0.7" stroke="rgba(239,68,68,0.75)" />
        <line x1="132" y1="138" x2="312" y2="78" strokeWidth="0.7" stroke="rgba(239,68,68,0.75)" />
        <line x1="134" y1="141" x2="314" y2="81" strokeWidth="0.7" stroke="rgba(239,68,68,0.75)" />
        <line x1="136" y1="144" x2="316" y2="84" strokeWidth="0.7" stroke="rgba(239,68,68,0.75)" />
        
        {/* Shockwave Arc */}
        <path d="M 290 20 Q 360 80, 240 140" strokeWidth="1.3" stroke="rgba(251,191,36,0.85)" strokeDasharray="5 3" />
        
        <text x="22" y="28" fill="currentColor" fillOpacity="0.8" fontSize="8.5" fontFamily="monospace">FIG 3.0 // HARMONIC LENS RELIC BLUEPRINT</text>
        <text x="22" y="40" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontFamily="monospace">TUNING: C4 • E4 • G4 • B4 (432Hz HARMONIC)</text>
        <text x="290" y="188" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontFamily="monospace">BURST OUTPUT: 18.7 EXAWATTS</text>
      </svg>
    );
  }

  // beacon_network
  return (
    <svg viewBox="0 0 460 210" className="w-full h-auto text-amber-300/85 stroke-current fill-none">
      <defs>
        <pattern id="spread-hatch-4" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.22" />
        </pattern>
      </defs>
      <rect x="8" y="8" width="444" height="194" fill="url(#spread-hatch-4)" rx="10" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="5 5" />
      
      {/* Central Beacon Node */}
      <circle cx="230" cy="105" r="44" strokeWidth="0.8" strokeDasharray="5 4" />
      <circle cx="230" cy="105" r="28" strokeWidth="1.2" stroke="rgba(239,68,68,0.85)" />
      <circle cx="230" cy="105" r="10" fill="currentColor" fillOpacity="0.55" />
      
      {/* Pulses */}
      <circle cx="230" cy="105" r="65" strokeWidth="0.6" strokeOpacity="0.35" strokeDasharray="3 5" />
      <circle cx="230" cy="105" r="85" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="2 7" />
      
      {/* Satellites */}
      <line x1="230" y1="105" x2="90" y2="55" strokeWidth="0.9" stroke="rgba(251,191,36,0.7)" />
      <line x1="230" y1="105" x2="370" y2="55" strokeWidth="0.9" stroke="rgba(251,191,36,0.7)" />
      <line x1="230" y1="105" x2="110" y2="155" strokeWidth="0.9" stroke="rgba(251,191,36,0.7)" />
      <line x1="230" y1="105" x2="350" y2="155" strokeWidth="0.9" stroke="rgba(251,191,36,0.7)" />
      
      <circle cx="90" cy="55" r="6" fill="currentColor" fillOpacity="0.35" strokeWidth="1.1" />
      <circle cx="370" cy="55" r="6" fill="currentColor" fillOpacity="0.35" strokeWidth="1.1" />
      <circle cx="110" cy="155" r="6" fill="currentColor" fillOpacity="0.35" strokeWidth="1.1" />
      <circle cx="350" cy="155" r="6" fill="currentColor" fillOpacity="0.35" strokeWidth="1.1" />

      <text x="22" y="28" fill="currentColor" fillOpacity="0.8" fontSize="8.5" fontFamily="monospace">FIG 4.0 // STARLIT BEACON DISPATCH SCHEMATIC</text>
      <text x="22" y="188" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontFamily="monospace">COVERAGE: 24/7/365 OMNIPRESENT</text>
      <text x="310" y="188" fill="currentColor" fillOpacity="0.6" fontSize="7.5" fontFamily="monospace">AES-256 CANON BEACON</text>
    </svg>
  );
}

export default function CodexDrawer({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('story_pages'); // 'story_pages' | 'weapon' | 'powers'
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipType, setFlipType] = useState('right'); // 'right' (forward) | 'left' (backward)

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextSpread();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevSpread();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSpread, isFlipping]);

  if (!isOpen) return null;

  const currentFolio = CODEX_FOLIO_SPREADS[currentSpread];

  const triggerSpreadFlip = (newIndex, type) => {
    if (newIndex === currentSpread || isFlipping) return;
    setFlipType(type);
    setIsFlipping(true);
    soundFx.playPageTurn();
    setCurrentSpread(newIndex);
    setTimeout(() => {
      setIsFlipping(false);
    }, 950);
  };

  const handlePrevSpread = () => {
    if (currentSpread > 0) {
      triggerSpreadFlip(currentSpread - 1, 'left');
    }
  };

  const handleNextSpread = () => {
    if (currentSpread < CODEX_FOLIO_SPREADS.length - 1) {
      triggerSpreadFlip(currentSpread + 1, 'right');
    }
  };

  const handleSelectSpread = (idx, noteFreq) => {
    if (idx === currentSpread) return;
    const type = idx > currentSpread ? 'right' : 'left';
    triggerSpreadFlip(idx, type);
    if (noteFreq) {
      setTimeout(() => soundFx.playGuitarString(noteFreq), 150);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 bg-black/90 backdrop-blur-xl transition-all duration-500 animate-fadeIn select-none">
      
      {/* Background backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* ═════════════════════════════════════════════════════════════════════
          FULL-PAGE / WHOLE-SCREEN GRAND CELESTIAL GRIMOIRE BOOK SPREAD
      ═════════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full max-w-7xl h-[95vh] max-h-[940px] bg-[#120409] border-4 border-amber-500/50 rounded-[2.5rem] shadow-[0_0_120px_rgba(239,68,68,0.45),0_25px_70px_rgba(0,0,0,0.95)] flex flex-col z-10 text-slate-200 overflow-hidden">
        
        {/* Masked Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-red-600/12 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-purple-700/12 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute inset-0 grain-overlay pointer-events-none" />

        {/* ── Top Book Bar & Controls ─────────────────────────────────── */}
        <div className="relative z-20 px-6 py-4 border-b-2 border-amber-500/30 flex items-center justify-between bg-black/70 backdrop-blur-md">
          {/* Header title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-950/90 border border-red-500/50 text-amber-300 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-cinzel tracking-wider text-white uppercase drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                NOVA CODEX &amp; CHRONICLES
              </h2>
              <p className="text-[10px] font-mono text-amber-400/80 tracking-[0.25em] uppercase">
                Celestial Two-Page Grimoire • Canonical Repository
              </p>
            </div>
          </div>

          {/* Center Tabs */}
          <div className="hidden md:flex items-center gap-2 p-1 rounded-2xl bg-black/60 border border-red-900/50">
            {[
              { id: 'story_pages', label: 'Grimoire Folios', icon: ScrollText, badge: '2-Page Spread' },
              { id: 'weapon', label: 'Sacred Astrolabe', icon: Compass },
              { id: 'powers', label: 'Celestial Rites', icon: Sparkles },
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
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-red-950/90 border border-amber-400/80 text-amber-300 font-bold shadow-[0_0_15px_rgba(251,191,36,0.25)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[8px] bg-red-950 border border-red-500/40 text-amber-300">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              soundFx.playChime();
              onClose();
            }}
            className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 hover:border-red-500/40 transition-all shadow-md active:scale-95"
            title="Close Book (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Main Book Body ──────────────────────────────────────────── */}
        <div className="relative z-10 flex-1 overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
          
          {/* ═════════════════════════════════════════════════════════════
              TAB 1: WHOLE-PAGE 2-PAGE SPREAD WITH 3D FLIP ANIMATION
          ═════════════════════════════════════════════════════════════ */}
          {activeTab === 'story_pages' ? (
            <div className="relative w-full h-full flex flex-col justify-between book-perspective">
              
              {/* Grand Open Book Double-Page Surface */}
              <div className="relative w-full flex-1 flex flex-col lg:flex-row rounded-3xl bg-[#090206]/98 border-2 border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
                
                {/* Silk Bookmark Ribbon */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-red-600 to-amber-500 rounded-b-md shadow-2xl flex items-end justify-center pb-1 text-[9px] font-bold text-black pointer-events-none z-30">
                  ✦
                </div>

                {/* ── LEFT PAGE (Story Narrative & Chapter Prose) ───────── */}
                <div 
                  onClick={handlePrevSpread}
                  className={`w-full lg:w-1/2 h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-amber-500/20 relative overflow-y-auto scrollbar-thin scrollbar-thumb-red-900/40 cursor-pointer transition-all duration-300 ${
                    isFlipping && flipType === 'left' ? 'anim-slow-turn-backward' : ''
                  }`}
                >
                  {/* Left Page Edge Shadow */}
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-amber-600/30 to-transparent border-r border-amber-500/10 pointer-events-none" />
                  
                  <div>
                    {/* Folio Stamp & Epoch Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
                      <span className="px-3 py-1 rounded-md bg-red-950/90 border border-red-500/50 text-amber-300 text-[10px] font-mono tracking-[0.25em] uppercase font-bold shadow-sm">
                        {currentFolio.folioBadge}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-red-400" />
                        <span>{currentFolio.stampDate}</span>
                      </span>
                    </div>

                    {/* Chapter Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-white mb-6 uppercase tracking-wide drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                      {currentFolio.chapterTitle}
                    </h3>

                    {/* Narrative Paragraphs with Drop Cap */}
                    <div className="space-y-4 text-slate-200 font-serif leading-relaxed text-base sm:text-lg">
                      <p className="first-letter:text-5xl first-letter:font-black first-letter:font-cinzel first-letter:text-amber-400 first-letter:mr-3 first-letter:float-left first-letter:leading-none first-letter:drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
                        {currentFolio.dropCapLetter}{currentFolio.firstParagraph}
                      </p>

                      <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed pt-2">
                        {currentFolio.secondParagraph}
                      </p>
                    </div>

                    {/* Canonical Quote Banner */}
                    <div className="my-6 p-4 rounded-2xl bg-black/60 border-l-4 border-amber-400 text-amber-200 font-serif italic text-sm sm:text-base shadow-inner">
                      "{currentFolio.quote}"
                    </div>
                  </div>

                  {/* Left Page Footer Stamp */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>PAGE {currentFolio.leftPageNum} OF 8</span>
                    <span className="hidden sm:inline">NOVA CANONICAL ARCHIVE</span>
                    {currentSpread > 0 && (
                      <span className="text-amber-400/80 font-bold flex items-center gap-1">
                        <ChevronLeft className="w-3.5 h-3.5" /> Prev Folio
                      </span>
                    )}
                  </div>
                </div>

                {/* ── CENTER SPINE CREASE (Realistic Fold) ──────────────── */}
                <div className="hidden lg:block w-3 h-full book-spine-crease pointer-events-none z-20 shrink-0" />

                {/* ── RIGHT PAGE (Pencil Sketch Schematic & Technical Data) */}
                <div 
                  onClick={handleNextSpread}
                  className={`w-full lg:w-1/2 h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-y-auto scrollbar-thin scrollbar-thumb-red-900/40 cursor-pointer transition-all duration-300 ${
                    isFlipping && flipType === 'right' ? 'anim-slow-turn-forward' : ''
                  }`}
                >
                  {/* Right Page Folded Corner Hint */}
                  {currentSpread < CODEX_FOLIO_SPREADS.length - 1 && (
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-amber-400/30 via-red-600/20 to-transparent rounded-bl-3xl border-b border-l border-amber-400/40 flex items-start justify-end p-2 pointer-events-none">
                      <span className="text-[10px] font-mono text-amber-300">↗</span>
                    </div>
                  )}

                  <div>
                    {/* Schematic Header */}
                    <div className="flex items-center justify-between border-b border-amber-500/20 pb-3 mb-4">
                      <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold">
                        <Feather className="w-4 h-4 text-amber-400" />
                        <span>{currentFolio.sketchTitle}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 italic">
                        {currentFolio.sketchSubtitle}
                      </span>
                    </div>

                    {/* Authentic SVG Pencil Sketch Drawing */}
                    <div className="p-3.5 rounded-2xl bg-black/70 border border-amber-500/30 pencil-sketch-overlay shadow-inner mb-6">
                      <PencilSketchIllustration type={currentFolio.sketchType} />
                    </div>

                    {/* Metadata Matrix */}
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-6">
                      {currentFolio.metadata.map((meta, i) => (
                        <div key={i} className="p-3 rounded-xl bg-black/50 border border-white/5">
                          <span className="text-slate-500 block text-[9px] uppercase tracking-wider mb-0.5">
                            {meta.label}
                          </span>
                          <span className={`font-bold text-xs truncate block ${meta.color}`}>
                            {meta.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Page Action & Footer Stamp */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playGuitarString(currentFolio.audioNote);
                      }}
                      className="px-4 py-2 rounded-full bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-amber-200 hover:text-white transition-all flex items-center gap-2 shadow-md active:scale-95"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{currentFolio.audioLabel}</span>
                    </button>

                    <div className="flex items-center gap-3 text-slate-500">
                      <span>PAGE {currentFolio.rightPageNum} OF 8</span>
                      {currentSpread < CODEX_FOLIO_SPREADS.length - 1 ? (
                        <span className="text-amber-400/80 font-bold flex items-center gap-1">
                          Next Folio <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold">✦ Final Chapter</span>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Folio Navigation Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 px-2">
                {/* Previous Folio Button */}
                <button
                  onClick={handlePrevSpread}
                  disabled={currentSpread === 0}
                  className="px-5 py-2.5 rounded-xl bg-black/70 hover:bg-red-950/70 border border-white/10 hover:border-amber-400/50 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-md active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Folio Spread</span>
                </button>

                {/* Folio Jump Pills */}
                <div className="flex items-center gap-2">
                  {CODEX_FOLIO_SPREADS.map((folio, idx) => (
                    <button
                      key={folio.spreadIndex}
                      onClick={() => handleSelectSpread(idx, folio.audioNote)}
                      className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                        currentSpread === idx
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.35)]'
                          : 'bg-black/50 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span>Folio {idx + 1}</span>
                    </button>
                  ))}
                </div>

                {/* Next Folio Button */}
                <button
                  onClick={handleNextSpread}
                  disabled={currentSpread === CODEX_FOLIO_SPREADS.length - 1}
                  className="px-5 py-2.5 rounded-xl bg-red-950/90 hover:bg-red-900 border border-red-500/60 text-amber-300 text-xs font-mono font-bold flex items-center gap-2 transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-md active:scale-95"
                >
                  <span>Next Folio Spread</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : activeTab === 'weapon' ? (
            /* ═════════════════════════════════════════════════════════════
                TAB 2: SACRED ASTROLABE DOSSIER
            ═════════════════════════════════════════════════════════════ */
            <div className="h-full overflow-y-auto p-6 space-y-6 animate-fadeIn">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/30 via-[#0a0307]/95 to-black/95 border border-amber-500/30 shadow-xl">
                <span className="text-[10px] font-mono tracking-[0.3em] text-amber-400 uppercase font-bold">
                  SACRED ARTIFACT DOSSIER • CANON
                </span>
                <h3 className="text-2xl font-bold font-cinzel text-white mt-1 mb-3">
                  The Harmonic Lens (Celestial Astrolabe)
                </h3>
                <p className="text-slate-300 font-serif leading-relaxed text-sm">
                  An ancient armillary sphere crafted from stellar gold and crystallized nebula core. The concentric rings orbit perpetually according to the celestial coordinate planes, focusing galactic starlight into concentrated resonance beams capable of shattering void anomalies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div key={idx} className="p-4 rounded-2xl bg-black/50 border border-white/5 flex items-start justify-between gap-4">
                    <div>
                      <h5 className="font-bold text-white text-xs font-cinzel">{comp.title}</h5>
                      <p className="text-xs text-slate-400 mt-1">{comp.desc}</p>
                    </div>
                    <span className="text-[10px] font-mono text-amber-300 whitespace-nowrap bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30 shadow-sm">
                      {comp.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ═════════════════════════════════════════════════════════════
                TAB 3: CELESTIAL RITES
            ═════════════════════════════════════════════════════════════ */
            <div className="h-full overflow-y-auto p-6 space-y-4 animate-fadeIn">
              <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-950/30 to-black/90 border border-purple-500/30">
                <h3 className="text-lg font-bold font-cinzel text-purple-200">
                  Resonant Rites of the Star Veils
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Canonical harmonic rites wielded by Nova to restore equilibrium when dark entities invade.
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
                <div key={idx} className="p-4 rounded-2xl bg-black/50 border border-white/5 hover:border-red-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm font-cinzel">{rite.name}</h4>
                    <span className="text-[10px] font-mono text-red-300 bg-red-950/70 px-2.5 py-0.5 rounded-full border border-red-500/40">
                      {rite.element}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">{rite.type}</span>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{rite.desc}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* ── Book Bottom Bar ─────────────────────────────────────────── */}
        <div className="relative z-20 px-6 py-3 border-t-2 border-amber-500/30 bg-black/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>IMMUTABLE CANONICAL GRIMOIRE</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-slate-400">KEYBOARD: [←] / [→] TO TURN PAGES</span>
          </div>

          <button
            onClick={() => soundFx.playCelestialChord()}
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
