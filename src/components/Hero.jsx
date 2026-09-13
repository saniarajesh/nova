import React from 'react';
import { Radio, Sparkles, Zap, ArrowRight, Star, Volume2 } from 'lucide-react';
import { NOVA_LORE } from '../data/novaContent';
import { soundFx } from '../utils/soundEffects';
import { novaVoice } from '../utils/novaVoice';

export default function Hero() {
  const char = NOVA_LORE.character;

  const scrollToChat = () => {
    soundFx.playChime();
    const elem = document.getElementById('chatbot');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPowers = () => {
    soundFx.playChime();
    const elem = document.getElementById('powers');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      
      {/* Background radial cosmic glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full blur-3xl pointer-events-none bg-purple-600/15 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-pill border border-purple-500/30 text-purple-300 mb-6 animate-pulse-slow">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>THE GUARDIAN OF UNHEARD VOICES</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.1] mb-6">
              Every voice <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 glow-text-violet">
                deserves to be heard.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
              When systems fail, offices hang up, and the world looks away, NOVA tunes into the silence.
              Share your grievance, hardship, or quiet request—she turns your whisper into an unignorable signal.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={scrollToChat}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:shadow-purple-500/40 glow-violet"
              >
                <Radio className="w-5 h-5 animate-pulse" />
                <span>TALK TO NOVA</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={scrollToPowers}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl font-semibold text-sm text-slate-200 glass-card hover:text-white hover:border-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Explore Her Powers</span>
              </button>
            </div>

            {/* Feature Pills / Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              {NOVA_LORE.stats.map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="text-xl sm:text-2xl font-black text-white font-display">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Character Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Character Card Container */}
            <div className="relative group w-full max-w-md">
              
              {/* Glowing Aura Ring */}
              <div className="absolute -inset-1 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500" />

              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/20 p-5 shadow-2xl">
                
                {/* Character Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {char.badge}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>Always Listening</span>
                  </div>
                </div>

                {/* Character Image with Floating Animation */}
                <div className="relative rounded-2xl overflow-hidden aspect-square border border-white/10 bg-black/40">
                  <img
                    src={char.image}
                    alt="Nova - Guardian of Unheard Voices"
                    className="w-full h-full object-cover object-center animate-float hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Bottom Image Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        NOVA
                      </h3>
                      <p className="text-xs text-purple-200">
                        {char.title}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-5 bg-cyan-400 rounded-full animate-wave-1" />
                      <div className="w-1.5 h-7 bg-purple-400 rounded-full animate-wave-2" />
                      <div className="w-1.5 h-4 bg-pink-400 rounded-full animate-wave-3" />
                      <div className="w-1.5 h-6 bg-cyan-300 rounded-full animate-wave-4" />
                    </div>
                  </div>
                </div>

                {/* Speech Bubble / Quote with Voice Play Button */}
                <div className="mt-4 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-100 italic relative flex items-start justify-between gap-3">
                  <div className="absolute -top-2 left-6 w-3 h-3 bg-purple-950/80 border-t border-l border-purple-500/30 transform rotate-45" />
                  <p className="flex-1">"{char.quote}"</p>
                  <button
                    onClick={() => novaVoice.playOriginalVoice()}
                    className="p-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-400/40 transition-colors shrink-0 flex items-center gap-1 not-italic font-bold"
                    title="Hear Nova speak her anime voice track"
                  >
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    <span className="text-[10px]">Voice</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
