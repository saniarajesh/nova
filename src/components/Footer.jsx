import React from 'react';
import { Sparkles, Radio, Heart, Shield, Terminal, ArrowUp } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function Footer({ onOpenConsole, onTriggerSafety }) {
  const scrollToTop = () => {
    soundFx.playChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToChat = () => {
    soundFx.playChime();
    const elem = document.getElementById('chatbot');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-20 pb-12 border-t border-white/10 bg-[#04050d] text-slate-400">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner CTA */}
        <div className="text-center max-w-3xl mx-auto mb-16 pb-16 border-b border-white/10">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display mb-4">
            "Your story matters."
          </h3>
          <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-lg mx-auto">
            Never let hardship make you believe your voice is too small to be heard. Nova is always here to listen.
          </p>
          <button
            onClick={scrollToChat}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white font-bold text-sm shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>ASK FOR HELP</span>
          </button>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-xs">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg font-display">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>NOVA — The Guardian of Unheard Voices</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              An original superhero advocacy experience created to champion unheard voices, bridge bureaucratic divides, and ensure every human story receives dignity and care.
            </p>
          </div>

          {/* Quick Access */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider mb-2 font-mono">
              Navigation
            </div>
            <div>
              <a href="#story" className="hover:text-purple-300 transition-colors">Who is Nova</a>
            </div>
            <div>
              <a href="#powers" className="hover:text-purple-300 transition-colors">Her Powers</a>
            </div>
            <div>
              <a href="#mission" className="hover:text-purple-300 transition-colors">Her Mission</a>
            </div>
            <div>
              <a href="#how-it-works" className="hover:text-purple-300 transition-colors">How It Works</a>
            </div>
          </div>

          {/* Special Tools / Reviewer Access */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider mb-2 font-mono">
              Systems & Safety
            </div>
            <div>
              <button
                onClick={onTriggerSafety}
                className="text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1 text-left"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Crisis Lifelines</span>
              </button>
            </div>
            <div>
              <button
                onClick={onOpenConsole}
                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-left font-mono"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Guardian Console (Admin)</span>
              </button>
            </div>
            <div>
              <button
                onClick={scrollToTop}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NOVA Project. An Original Superhero Initiative. All voices protected.</p>
          <p className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>Encrypted with Guardian Core Protocol</span>
          </p>
        </div>

      </div>

    </footer>
  );
}
