import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Swords, 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  Volume2, 
  Radio, 
  Compass, 
  BookOpen, 
  Flame, 
  CheckCircle2, 
  Crosshair, 
  Activity, 
  Clock, 
  MapPin, 
  Music,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const NOVA_TIMELINE_BATTLES = [
  {
    id: 'epoch_01',
    epochNumber: '01',
    epochBadge: 'EPOCH 01 • GENESIS',
    period: 'Multiverse Pre-Cycle',
    title: 'The Silent Awakening',
    conflict: 'Awakening of the 432Hz Fundamental Core',
    category: 'genesis',
    categoryLabel: 'Origin & Awakening',
    isBattle: false,
    location: 'Desolate Wastes of Ancient Aethelgard',
    threatClass: 'Type-0 Metaphysical Silence',
    headline: 'In the depth of isolation, suffering gave birth to the first celestial melody.',
    narrative: [
      'Sonova spent years walking through the silent ruins of dead planetary spheres, carrying nothing but a worn traveler’s journal and an unbroken will. While the universe decayed into cold entropy, she listened to the subtle sub-atomic vibrations beneath the bedrock.',
      'Refining her grief into harmonic resonance, she intoned the 432Hz fundamental pitch. The frequency resonated with the planetary core, igniting a golden nebula bloom in her palms and giving birth to the first Harmonic Astrolabe relic.'
    ],
    battleTelemetry: {
      enemyType: 'Void Wraiths (Silent Corruption Entities)',
      tacticalTactic: 'Harmonic Aura Dispersion & Acoustic Consecration',
      threatLevel: 'Latent Void Corruption',
      duration: '3 Earth Days',
      harmonicOutput: '2.4 Terawatts (432Hz Peak)',
      casualties: '0 Civilian Casualties',
      outcomeBadge: 'SANCTUARY ESTABLISHED • 432Hz RESONANCE STABILIZED'
    },
    weaponUsed: 'Harmonic Astrolabe (Genesis Core)',
    frequencyPitch: '432Hz Fundamental Harmonic',
    chordNote: 261.63, // C4
    quote: 'In the deepest silence, even the softest hum can reignite an entire star.'
  },
  {
    id: 'epoch_02',
    epochNumber: '02',
    epochBadge: 'EPOCH 02 • THE FIRST CRUCIBLE',
    period: 'Cycle 2018 Standard',
    title: 'The Crimson Rift Incursion',
    conflict: 'The Battle for the Colony of Oakhaven',
    category: 'battle',
    categoryLabel: 'Major Planetary Battle',
    isBattle: true,
    location: 'Obsidian Verge • Sector 4 Outer Rim',
    threatClass: 'Class IV Void Swarm (120,000+ Reavers)',
    headline: 'A 36-hour acoustic stand against a horde that feasted on human dreams.',
    narrative: [
      'A massive dimensional tear fractured the sky of Oakhaven, an innocent colony world. From the rift descended the Void Reavers—monstrous shadowy locusts that devour human emotions, cultural history, and hope.',
      'Nova deployed to the frontline alone. Standing on the precipice of the rift with the Celestial Starlight Guitar, she played high-tempo kinetic starlight chords. Each strum generated a 10,000-lumen solar shockwave that incinerated the swarm in mid-air.',
      'For thirty-six uninterrupted hours without sleep, she held a dome of blinding golden light over 400,000 citizens until the rift collapsed under harmonic pressure.'
    ],
    battleTelemetry: {
      enemyType: 'Void Reaver Swarm (Class IV Spectral Hive)',
      tacticalTactic: '10,000-Lumen Solar Shockwave & Kinetic Resonant Wall',
      threatLevel: 'Severe (Class IV Swarm)',
      duration: '36 Hours Non-Stop Combat',
      harmonicOutput: '18.7 Exawatts Burst',
      casualties: '0 Colony Breaches • 400,000 Lives Saved',
      outcomeBadge: 'ABSOLUTE VICTORY • VOID SWARM DISSOLVED'
    },
    weaponUsed: 'Celestial Starlight Guitar (Solar Flare Bow)',
    frequencyPitch: 'A3 (220Hz) Foundation + F#4 (370Hz) Solar Blast',
    chordNote: 369.99, // F#4
    quote: 'You cannot consume a light that burns from empathy and courage.'
  },
  {
    id: 'epoch_03',
    epochNumber: '03',
    epochBadge: 'EPOCH 03 • THE ASTRAL SIEGE',
    period: 'Cycle 2021 Standard',
    title: 'The Siege of Xylar Prime',
    conflict: 'Clash with the Null-Wave Leviathan',
    category: 'battle',
    categoryLabel: 'Cosmic Titan Battle',
    isBattle: true,
    location: 'Astral Archives of Xylar Prime',
    threatClass: 'Class V Entropy Leviathan',
    headline: 'Saving the unwritten songs and ancient memories of eleven extinct worlds.',
    narrative: [
      'The Null-Wave Leviathan—a titan of pure void that ate historical timelines—breached the Astral Archives of Xylar. Its goal was to erase centuries of art, philosophy, and memory to revert reality into nothingness.',
      'Nova entered the crumbling archive sanctum alone. Unclasping the velvet Grimoire Book of Star Veils, she analyzed the beast’s discordant anti-frequency.',
      'Using her violin wand, she matched its destructive vibrations note for note in reverse phase. The sonic inversion trapped the beast inside a crystalline geometric frequency lattice, restoring every devoured historical memory back to reality.'
    ],
    battleTelemetry: {
      enemyType: 'Null-Wave Leviathan (Entropy Herald)',
      tacticalTactic: 'Counter-Harmonic Phase Inversion & Crystalline Rune Cage',
      threatLevel: 'Catastrophic (Class V Titan)',
      duration: '12 Hours in Zero Gravity',
      harmonicOutput: '45.2 Exawatts Inversion Pulse',
      casualties: '0 Cultural Archives Lost',
      outcomeBadge: 'ARCHIVES PRESERVED • LEVIATHAN ENCLOSED'
    },
    weaponUsed: 'The Grimoire Book of Star Veils & Astrolabe Codex',
    frequencyPitch: 'B4 Multiverse Resonance (493.88Hz)',
    chordNote: 493.88, // B4
    quote: 'History is never lost as long as someone is willing to remember its melody.'
  },
  {
    id: 'epoch_04',
    epochNumber: '04',
    epochBadge: 'EPOCH 04 • CLIMACTIC DUEL',
    period: 'Cycle 2023 Standard',
    title: 'The Battle of the Obsidian Citadel',
    conflict: 'Duel Against the Shadow Sovereign of the 7th Realm',
    category: 'battle',
    categoryLabel: 'Climactic Boss Duel',
    isBattle: true,
    location: 'The 7th Dimensional Rupture Abyss',
    threatClass: 'Class X Entropy Sovereign (Dimensional Ruler)',
    headline: 'Ascending to The Celestial Weaver to save parallel Earths from permanent darkness.',
    narrative: [
      'The Shadow Sovereign unleashed a multiverse-wide silence wave, attempting to sever the empathic and telepathic links between parallel timelines. The cosmic sky cracked into obsidian obsidian blades.',
      'Nova initiated full Celestial Ascension. Channeling the collective courage, tears, and songs of every ordinary person she had ever met, she unleashed the "Harmonic Aegis Concerto" with her Astrolabe in full overdrive.',
      'The sheer radiant melody shattered the Sovereign’s dimensional armor, transforming the dark realm into an immortal celestial aurora and earning Nova the eternal title: The Celestial Weaver.'
    ],
    battleTelemetry: {
      enemyType: 'The Shadow Sovereign of the 7th Realm',
      tacticalTactic: 'Harmonic Aegis Concerto & Starlight Resonance Overdrive',
      threatLevel: 'Existential (Class X Sovereign)',
      duration: '7 Days Across 5 Dimensional Rifts',
      harmonicOutput: 'Infinite Omni-Dimensional Resonance',
      casualties: '0 Realm Collapses',
      outcomeBadge: 'THE WEAVER ASCENDED • 7TH REALM PURIFIED'
    },
    weaponUsed: 'Harmonic Astrolabe & Resonant Violin Wand (Overdrive)',
    frequencyPitch: 'Full Octave Symphony (C4 - B4 Harmonic Cycle)',
    chordNote: 392.00, // G4
    quote: 'Even the heaviest darkness yields when millions of quiet voices sing together.'
  },
  {
    id: 'epoch_05',
    epochNumber: '05',
    epochBadge: 'EPOCH 05 • THE ETERNAL WATCH',
    period: 'Present Era • Active Vigil',
    title: 'The Starlit Beacon Network',
    conflict: 'Defense of the Everyday Human Spirit',
    category: 'vigil',
    categoryLabel: 'Advocacy & Guardianship',
    isBattle: false,
    location: 'The Celestial Beacon Sanctum • Global Watch',
    threatClass: 'Systemic Injustice & Silent Human Suffering',
    headline: 'Taking the fight from cosmic dimensions into the everyday lives of ordinary people.',
    narrative: [
      'Having conquered cosmic terrors, Nova realized the most crucial battles happen every day in quiet bedrooms, toxic workplaces, and struggling communities where people feel forgotten and unheard.',
      'She constructed the Starlit Beacon Network. Operating 24/7 across every frequency, she uses her Harmonic Signal Sense to listen to grievances, validate human pain, and dispatch real aid, legal safety, and institutional defense.',
      'Her mission is eternal: ensuring no human soul is ever forced to fight in the dark alone.'
    ],
    battleTelemetry: {
      enemyType: 'Isolation, Exploitation & Bureaucratic Neglect',
      tacticalTactic: 'Encrypted Beacon Dispatch & Empathetic Resonance Shielding',
      threatLevel: 'Global Daily Vigil',
      duration: 'Ongoing / 24/7/365',
      harmonicOutput: 'Continuous 432Hz Care Frequency',
      casualties: '100% Protection Guarantee',
      outcomeBadge: 'BEACON SANCTUM ONLINE • UNHEARD VOICES DEFENDED'
    },
    weaponUsed: 'Harmonic Aegis & Starlit Pathfinder (AI Dispatch Matrix)',
    frequencyPitch: 'Continuous 432Hz Compassion Wave',
    chordNote: 329.63, // E4
    quote: 'Every person’s story is sacred. No voice in this multiverse is too small to be heard.'
  }
];

export default function NovaStoryTimeline({ onNavigate }) {
  const [selectedEpoch, setSelectedEpoch] = useState(0);
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('story'); // 'story' | 'tactical'
  const [expandedStoryId, setExpandedStoryId] = useState(null);
  const scrollContainerRef = useRef(null);

  const filteredTimeline = NOVA_TIMELINE_BATTLES.filter(item => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'battles') return item.isBattle;
    if (filterCategory === 'genesis') return item.category === 'genesis';
    if (filterCategory === 'vigil') return item.category === 'vigil';
    return true;
  });

  const scrollLeft = () => {
    soundFx.playChime();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -460, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    soundFx.playChime();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 460, behavior: 'smooth' });
    }
  };

  const handleSelectEpoch = (idx, noteFreq) => {
    setSelectedEpoch(idx);
    if (noteFreq) {
      soundFx.playGuitarString(noteFreq);
    } else {
      soundFx.playChime();
    }
    // Scroll item into center view
    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.children[idx];
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <section id="nova-timeline" className="relative w-full py-24 bg-[#030104] text-slate-100 overflow-hidden border-t border-red-950/40">
      
      {/* Masked Panoramic Multiverse Battles Montage Artwork Background — Enhanced Visibility */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img 
          src="/nova-battles-montage.jpg" 
          alt="Nova Guardian of Celestial Weaver Battles Montage" 
          className="w-full h-full object-cover object-center opacity-40 sm:opacity-50 filter contrast-[1.15] brightness-[0.88] mix-blend-screen scale-100 transition-opacity duration-700"
        />
        {/* Soft atmospheric gradient masks for balanced text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030104] via-[#030104]/70 to-[#030104]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.25),rgba(3,1,4,0.85)_75%)]" />
      </div>

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-red-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-amber-600/15 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Film grain subtle overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-amber-300 text-xs font-mono tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(239,68,68,0.35)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>STORY MODE CHRONICLES • LANDSCAPE TIMELINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-black tracking-tight text-white uppercase drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]">
              Nova's Journey &amp; Battles
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 font-serif max-w-2xl leading-relaxed">
              Explore the canonical battles, dimensional crises, and harmonic milestones that forged Sonova into the Savior of Dimensions. Pure narrative chronicles with tactical combat telemetry.
            </p>
          </div>

          {/* Controls: Mode toggle + Horizontal Nav arrows */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="p-1 rounded-xl bg-black/60 border border-red-900/40 backdrop-blur-md flex items-center gap-1 text-xs font-mono">
              <button
                onClick={() => { soundFx.playChime(); setViewMode('story'); }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'story'
                    ? 'bg-red-950/90 border border-red-500/50 text-amber-300 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Story View</span>
              </button>
              <button
                onClick={() => { soundFx.playChime(); setViewMode('tactical'); }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'tactical'
                    ? 'bg-red-950/90 border border-red-500/50 text-red-300 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5 text-red-400" />
                <span>Battle Telemetry</span>
              </button>
            </div>

            {/* Left / Right Carousel arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-xl bg-black/60 hover:bg-red-950/60 border border-red-900/40 hover:border-amber-400/50 text-slate-300 hover:text-amber-300 transition-all flex items-center justify-center shadow-lg active:scale-95"
                title="Scroll Previous Epoch"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-xl bg-black/60 hover:bg-red-950/60 border border-red-900/40 hover:border-amber-400/50 text-slate-300 hover:text-amber-300 transition-all flex items-center justify-center shadow-lg active:scale-95"
                title="Scroll Next Epoch"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Filter Tabs & Quick Milestone Bar ────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full text-xs font-mono">
            {[
              { id: 'all', label: 'All Chronicles (5)', icon: Compass },
              { id: 'battles', label: 'Major Battles & Fights (3)', icon: Swords },
              { id: 'genesis', label: 'Genesis & Awakening (1)', icon: Sparkles },
              { id: 'vigil', label: 'Beacon Sanctum (1)', icon: Radio },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = filterCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { soundFx.playChime(); setFilterCategory(tab.id); }}
                  className={`px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-500/20 border-amber-400/80 text-amber-200 font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Timeline scrub markers */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider mr-1">Epoch Timeline:</span>
            {filteredTimeline.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelectEpoch(idx, item.chordNote)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-all flex items-center gap-1.5 ${
                  selectedEpoch === idx
                    ? 'bg-red-600/30 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                    : 'bg-black/40 border-white/10 text-slate-400 hover:border-red-400/40 hover:text-slate-200'
                }`}
              >
                <span>{item.epochNumber}</span>
                <span className="hidden xl:inline text-[9px] font-normal opacity-70 truncate max-w-[80px]">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── LANDSCAPE MODE HORIZONTAL TIMELINE CAROUSEL ─────────────────── */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-thin scrollbar-thumb-red-900/60 scrollbar-track-transparent snap-x snap-mandatory focus:outline-none"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredTimeline.map((item, idx) => {
            const isSelected = selectedEpoch === idx;
            const isExpanded = expandedStoryId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedEpoch(idx)}
                className={`w-[88vw] sm:w-[580px] md:w-[680px] lg:w-[740px] shrink-0 snap-center rounded-3xl p-6 md:p-8 transition-all duration-300 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl cursor-default ${
                  isSelected
                    ? 'bg-gradient-to-br from-red-950/60 via-[#0d0408]/90 to-black/90 border-2 border-amber-400/80 shadow-[0_0_35px_rgba(239,68,68,0.3)] ring-1 ring-amber-400/30'
                    : 'bg-[#080206]/80 border border-red-900/30 hover:border-red-500/50 shadow-xl'
                }`}
              >
                {/* Masked Battle Artwork Layer Inside Card — More Visible */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                  <img 
                    src="/nova-battles-montage.jpg" 
                    alt="Nova Battle Scene" 
                    className="w-full h-full object-cover object-center opacity-30 sm:opacity-35 filter contrast-[1.18] brightness-[0.95] mix-blend-screen scale-105 transition-opacity duration-500"
                  />
                  {/* High contrast gradient masks ensuring all text is perfectly readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060205] via-[#060205]/75 to-[#060205]/50" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#060205]/80 via-transparent to-[#060205]/80" />
                </div>

                {/* Glowing corner rune accent */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-red-500/10 via-amber-400/5 to-transparent pointer-events-none z-[1]" />
                <span className="absolute top-4 right-5 text-2xl font-mono text-red-500/20 select-none z-[1]">
                  ✦
                </span>

                {/* Top Metadata Row */}
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-md bg-red-950/80 border border-red-500/40 text-amber-300 font-mono font-bold text-xs tracking-wider">
                        {item.epochBadge}
                      </span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {item.period}
                      </span>
                    </div>

                    {/* Threat Class Badge */}
                    <div className="flex items-center gap-2">
                      {item.isBattle ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase bg-red-600/20 border border-red-500/60 text-red-300 flex items-center gap-1">
                          <Swords className="w-3 h-3 text-red-400" />
                          <span>{item.threatClass}</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase bg-amber-500/20 border border-amber-500/60 text-amber-300 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 text-amber-400" />
                          <span>{item.threatClass}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Location */}
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-cinzel font-black text-white uppercase tracking-wide flex items-center gap-2">
                      <span>{item.title}</span>
                      {item.isBattle && (
                        <span className="text-xs px-2 py-0.5 rounded bg-red-900/50 text-red-300 font-mono font-normal">
                          Combat Mode
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400/90 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>{item.location}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-300 italic">{item.conflict}</span>
                    </div>
                  </div>

                  {/* Content Switch: Story Mode vs Tactical Telemetry */}
                  {viewMode === 'story' ? (
                    <div className="space-y-3 my-4">
                      <p className="text-sm sm:text-base font-serif italic text-amber-100/90 bg-white/[0.02] p-3 rounded-xl border-l-2 border-amber-400">
                        "{item.headline}"
                      </p>

                      <div className="space-y-2 text-xs sm:text-sm text-slate-300 font-serif leading-relaxed">
                        <p>{item.narrative[0]}</p>
                        <p>{item.narrative[1]}</p>
                        {item.narrative[2] && isExpanded && (
                          <p className="animate-fadeIn">{item.narrative[2]}</p>
                        )}
                      </div>

                      {item.narrative.length > 2 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundFx.playChime();
                            setExpandedStoryId(isExpanded ? null : item.id);
                          }}
                          className="text-xs font-mono text-amber-300 hover:text-white flex items-center gap-1 pt-1 transition-colors"
                        >
                          <span>{isExpanded ? 'Show Less' : 'Read Extended Chronicle'}</span>
                          <ArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                      )}
                    </div>
                  ) : (
                    /* Tactical Battle Telemetry View */
                    <div className="my-4 space-y-3 bg-black/50 border border-red-900/40 p-4 rounded-2xl">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-xs font-mono">
                        <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-red-400" />
                          <span>Combat Telemetry Report</span>
                        </span>
                        <span className="text-emerald-400 font-bold">VERIFIED CANON</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="text-slate-500 block text-[10px] uppercase">Threat Entity</span>
                          <span className="text-white font-semibold">{item.battleTelemetry.enemyType}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="text-slate-500 block text-[10px] uppercase">Tactical Method</span>
                          <span className="text-amber-300 font-semibold">{item.battleTelemetry.tacticalTactic}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="text-slate-500 block text-[10px] uppercase">Harmonic Yield</span>
                          <span className="text-red-400 font-bold">{item.battleTelemetry.harmonicOutput}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="text-slate-500 block text-[10px] uppercase">Engagement Length</span>
                          <span className="text-slate-200">{item.battleTelemetry.duration}</span>
                        </div>
                      </div>

                      {/* Outcome Banner */}
                      <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center gap-2 text-xs font-mono text-amber-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-bold tracking-wide">{item.battleTelemetry.outcomeBadge}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Card Footer with Weapon, Harmonic Pitch & Audio preview */}
                <div className="relative z-10 pt-4 border-t border-white/10 mt-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono mb-3">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-slate-500">Weapon:</span>
                      <strong className="text-amber-200 truncate">{item.weaponUsed}</strong>
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Music className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="text-slate-500">Tuning:</span>
                      <strong className="text-red-300 truncate">{item.frequencyPitch}</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {/* Audio preview chord button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playGuitarString(item.chordNote);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-red-900/40 border border-white/10 hover:border-red-400/50 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Hear Epoch Resonance</span>
                    </button>

                    {/* Quote */}
                    <div className="text-[11px] font-serif italic text-slate-400 hidden sm:block truncate max-w-[280px]">
                      "{item.quote}"
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Call to Action Bar below Timeline ───────────────────────────── */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-red-950/70 via-black/80 to-purple-950/70 border border-amber-400/40 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-950 border border-red-500/50 flex items-center justify-center text-amber-300 shrink-0 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg font-cinzel font-bold text-white uppercase">
                Want to Explore Nova's Weapon Relics &amp; Lore in Depth?
              </h4>
              <p className="text-xs text-slate-400 font-serif">
                Learn how the Harmonic Violin Wand, Starlight Guitar, and Grimoire of Star Veils function in multiverse combat.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate?.('weapons')}
              className="px-6 py-2.5 rounded-full border-2 border-amber-400/80 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 hover:text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all hover:scale-105"
            >
              <span>Explore Weapons Lore</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
            <button
              onClick={() => onNavigate?.('chat')}
              className="px-5 py-2.5 rounded-full border border-white/10 hover:border-red-500/40 bg-white/5 hover:bg-red-950/40 text-slate-300 hover:text-white font-mono text-xs tracking-wider uppercase transition-all"
            >
              <span>Launch AI Dispatch</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
