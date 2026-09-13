import React from 'react';
import { MessageSquareHeart, Sparkles, Radio, Send, ArrowRight } from 'lucide-react';
import { NOVA_LORE } from '../data/novaContent';
import { soundFx } from '../utils/soundEffects';

export default function HowItWorks() {
  const iconMap = {
    MessageSquareHeart: MessageSquareHeart,
    Sparkles: Sparkles,
    Radio: Radio,
    Send: Send,
  };

  const scrollToChat = () => {
    soundFx.playChime();
    const elem = document.getElementById('chatbot');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="relative py-24 border-t border-white/5 bg-[#050714]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold glass-pill border border-purple-500/30 text-purple-300 mb-3">
            <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>THE 4-STEP TRANSMISSION CYCLE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mb-4">
            How <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Nova Helps</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            From the moment you open your heart to the final dispatch, here is the transparent path your story takes.
          </p>
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-14">
          {NOVA_LORE.howItWorks.map((stepItem, idx) => {
            const Icon = iconMap[stepItem.icon] || Sparkles;
            return (
              <div
                key={stepItem.step}
                className="p-6 rounded-3xl glass-card border border-white/10 hover:border-purple-500/50 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Number Watermark */}
                <div className="absolute -top-3 -right-2 text-7xl font-black text-white/5 font-display select-none group-hover:text-purple-500/10 transition-colors">
                  {stepItem.step}
                </div>

                <div>
                  {/* Step Icon & Number */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600/30 to-cyan-500/30 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      STEP {stepItem.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-purple-300 transition-colors">
                    {stepItem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-cyan-300">
                  <span>Phase {stepItem.step} Active</span>
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Trigger */}
        <div className="text-center">
          <button
            onClick={scrollToChat}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white font-bold text-sm shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
          >
            <span>Begin Step 01: Tell Your Story to Nova</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
