import React from 'react';
import { ShieldCheck, HeartHandshake, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { NOVA_LORE } from '../data/novaContent';

export default function MissionSection() {

  const pillars = [
    {
      title: "Universal Dignity",
      subtitle: "Zero Dismissal",
      desc: "No complaint is 'too trivial'. Whether it is an unfair work schedule, a broken lease, or feeling completely invisible, Nova treats your experience with absolute respect.",
      icon: HeartHandshake,
      accent: "from-pink-500 to-purple-600"
    },
    {
      title: "Rapid Amplification",
      subtitle: "Piercing Red Tape",
      desc: "Traditional complaint boxes sit in email folders for months. Nova immediately formats, categorizes, and activates a cryptographic Beacon ID ready for real-world escalation.",
      icon: Zap,
      accent: "from-cyan-400 to-blue-600"
    },
    {
      title: "Real-World Intervention",
      subtitle: "Not Just Words",
      desc: "Nova isn't just an empathetic listener. Her system dispatches direct notification alerts to support contacts, advocacy groups, and your own inbox to start the resolution process.",
      icon: ShieldCheck,
      accent: "from-purple-500 to-indigo-600"
    }
  ];

  return (
    <section id="mission" className="relative py-24 border-t border-white/5 bg-[#070919]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold glass-pill border border-pink-500/30 text-pink-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>THE SACRED OATH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mb-4">
            "No voice should <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">disappear.</span>"
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Too many people suffer in silence because they feel nobody cares or that the process is hopelessly rigged. Nova exists to prove that your story matters.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl glass-card border border-white/10 hover:border-purple-500/40 relative overflow-hidden flex flex-col justify-between group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors" />

                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${pillar.accent} p-3.5 flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest mb-1">
                    {pillar.subtitle}
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Guaranteed by the Resonance Protocol</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Quote */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/60 via-indigo-950/60 to-black/60 border border-purple-500/30 text-center max-w-4xl mx-auto shadow-2xl">
          <p className="text-xl sm:text-2xl font-bold text-white font-display italic mb-3">
            "When you speak to Nova, you are not whispering into an empty sky. You are igniting a beacon that summons allies to your side."
          </p>
          <p className="text-sm text-purple-300 font-semibold">
            — Nova, The Guardian of Unheard Voices
          </p>
        </div>

      </div>
    </section>
  );
}
