import React, { useState } from 'react';
import { Zap, Brain, Shield, Sparkles, ArrowUpRight, CheckCircle2, Eye } from 'lucide-react';
import { NOVA_LORE } from '../data/novaContent';
import { soundFx } from '../utils/soundEffects';

export default function PowersSection() {
  const [activePower, setActivePower] = useState(null);

  const iconMap = {
    Zap: Zap,
    Brain: Brain,
    Shield: Shield,
    Sparkles: Sparkles,
  };

  const handleCardClick = (power) => {
    setActivePower(power);
    soundFx.playChime();
  };

  return (
    <section id="powers" className="relative py-24 border-t border-white/5 bg-[#050714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold glass-pill border border-cyan-500/30 text-cyan-300 mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>HER CELESTIAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mb-4">
            Her <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Superpowers</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Nova does not rely on brute force. Her abilities are designed with one sacred objective: ensuring your problem is heard, understood, and solved.
          </p>
        </div>

        {/* 4 Powers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NOVA_LORE.powers.map((power, idx) => {
            const IconComponent = iconMap[power.icon] || Sparkles;
            const isSelected = activePower?.id === power.id;

            return (
              <div
                key={power.id}
                onClick={() => handleCardClick(power)}
                className={`cursor-pointer rounded-3xl p-6 glass-card border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                  isSelected 
                    ? 'border-cyan-400 bg-[#151c45] shadow-xl shadow-cyan-500/20 -translate-y-2' 
                    : 'border-white/10 hover:border-purple-500/40'
                }`}
              >
                {/* Background glow orb on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 group-hover:bg-cyan-500/15 rounded-full blur-xl transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-900/60 to-indigo-950/80 border border-purple-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-white font-display mb-1 group-hover:text-cyan-300 transition-colors">
                    {power.name}
                  </h3>
                  <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-3">
                    {power.tagline}
                  </div>

                  {/* Lore Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {power.lore}
                  </p>
                </div>

                {/* Bottom interactive hint */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-300 transition-colors">
                  <span className="font-mono text-[11px]">{power.badge}</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Power Live Demonstration Drawer */}
        {activePower && (
          <div className="mt-10 p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-purple-950/20 to-black/50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-display flex items-center gap-2">
                    <span>Power Activated: {activePower.name}</span>
                  </h4>
                  <p className="text-xs text-cyan-300 font-mono">
                    How this power activates during your chatbot intake
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActivePower(null)}
                className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-white/5 border border-white/10"
              >
                Close Preview
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">In-Lore Capability</div>
                <p>{activePower.lore}</p>
              </div>
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-cyan-400 font-bold">In the Portal / Chatbot</div>
                <p className="text-cyan-100 bg-cyan-950/50 p-3 rounded-xl border border-cyan-500/20">
                  {activePower.interactiveDetail}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
