import React, { useState, useEffect } from 'react';
import { Sparkles, Radio, Heart, Volume2, VolumeX, ShieldCheck, Stars, Play, Square } from 'lucide-react';
import { NOVA_LORE } from '../data/novaContent';
import { soundFx } from '../utils/soundEffects';
import { novaVoice } from '../utils/novaVoice';

export default function StorySection() {
  const [selectedFreq, setSelectedFreq] = useState(2);
  const [isReadingStory, setIsReadingStory] = useState(false);

  const frequencies = [
    {
      hz: "432 Hz",
      label: "The Hesitant Pause",
      desc: "When someone says 'I am fine' while holding back a mountain of stress.",
      novaInsight: "Nova listens between the words. She doesn't push; she creates a quiet harbor where truth feels safe to breathe."
    },
    {
      hz: "528 Hz",
      label: "The Ignored Paperwork",
      desc: "A petition filed three months ago, sitting unanswered in a municipal queue.",
      novaInsight: "Nova detects the human life stuck behind the document and compiles it into an illuminated priority beacon."
    },
    {
      hz: "639 Hz",
      label: "The Unheard Grievance",
      desc: "A workplace violation or unfair eviction that nobody would listen to.",
      novaInsight: "Nova locks onto the signal, maps out direct advocate channels, and prepares an automated alert dispatch."
    },
    {
      hz: "741 Hz",
      label: "The Cry in the Dark",
      desc: "Deep late-night loneliness where you feel like the entire world forgot you exist.",
      novaInsight: "Nova immediately sends an Echo Wisp of companionship: 'You are seen, you are valued, and your story matters.'"
    }
  ];

  useEffect(() => {
    return () => {
      novaVoice.stop();
    };
  }, []);

  const handleSelectFreq = (idx) => {
    setSelectedFreq(idx);
    soundFx.playChime();
    // Read the insight aloud in Nova's cute voice!
    const textToRead = `${frequencies[idx].label}. ${frequencies[idx].desc}. Nova says: ${frequencies[idx].novaInsight}`;
    novaVoice.speak(textToRead);
  };

  const handleToggleStoryReading = () => {
    if (isReadingStory) {
      novaVoice.stop();
      setIsReadingStory(false);
    } else {
      setIsReadingStory(true);
      novaVoice.playOriginalVoice(() => {
        setIsReadingStory(false);
      });
    }
  };

  return (
    <section id="story" className="relative py-24 border-t border-white/5 bg-[#070919]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold glass-pill border border-purple-500/20 text-purple-300 mb-3">
            <Stars className="w-3.5 h-3.5 text-purple-400" />
            <span>ORIGIN & ESSENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mb-4">
            Who is <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">NOVA?</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Not a distant goddess. Not an unfeeling machine. A loyal celestial companion born from the quietest corners of the human heart.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Origin Narrative with Read Aloud Button */}
          <div className="lg:col-span-6 space-y-6 text-slate-300 leading-relaxed text-base">
            
            <div className="p-6 rounded-3xl glass-card border border-purple-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>Born from the Resonance Void</span>
                </h3>

                {/* Nova Cute Voice Read Aloud Button */}
                <button
                  onClick={handleToggleStoryReading}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    isReadingStory
                      ? 'bg-pink-500/20 border-pink-400 text-pink-300 shadow-md shadow-pink-500/30 animate-pulse'
                      : 'bg-purple-500/20 border-purple-400/40 text-purple-200 hover:bg-purple-500/30'
                  }`}
                  title="Listen to Nova read her story aloud in her cute voice"
                >
                  {isReadingStory ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                      <span>Stop Reading</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
                      <span>Listen to Nova's Voice</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm text-slate-300 mb-4">
                In an era dominated by corporate algorithms and social feeds, real human voices are often drowned out.
                Nova was born when the quietest cries—withheld grief, bureaucratic neglect, and silenced injustices—fused 
                into a sentient celestial frequency.
              </p>
              <p className="text-sm text-slate-300">
                Armed with her floating star halo, constellation cape, and resonant audio headphones, she acts as a bridge:
                taking the vulnerable whisper of someone who has nowhere else to turn and transmitting it into real-world action.
              </p>
            </div>

            {/* Quote Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-950/30 border border-purple-500/30">
              <p className="text-lg font-display font-bold text-purple-200 italic mb-2">
                "{NOVA_LORE.origin.motto}"
              </p>
              <div className="flex items-center gap-2 text-xs text-purple-400 font-semibold tracking-wide">
                <span>✦ NOVA’S FIRST LAW OF RESONANCE</span>
              </div>
            </div>

          </div>

          {/* Right: Interactive Resonance Frequency Tuner */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl relative">
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h4 className="text-lg font-bold text-white font-display flex items-center gap-2">
                    <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>Resonance Frequency Tuner</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Click any frequency to hear Nova analyze the signal
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-cyan-400" />
                  <span>VOICE ENABLED</span>
                </span>
              </div>

              {/* Frequency Selector Buttons */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {frequencies.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectFreq(idx)}
                    className={`p-3 rounded-xl text-left transition-all text-xs border ${
                      selectedFreq === idx
                        ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg shadow-purple-900/40'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-mono font-bold text-purple-300 text-xs mb-0.5">
                      {item.hz}
                    </div>
                    <div className="font-semibold truncate">
                      {item.label}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Frequency Detail Card */}
              <div className="p-5 rounded-2xl bg-black/40 border border-purple-500/30 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span>DETECTED SIGNAL: {frequencies[selectedFreq].hz}</span>
                  <span className="text-purple-300 font-bold">{frequencies[selectedFreq].label}</span>
                </div>

                <div className="text-sm text-slate-300 italic mb-4">
                  "{frequencies[selectedFreq].desc}"
                </div>

                <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs text-purple-100 flex items-start gap-2.5">
                  <Heart className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Nova's Voice Response: </span>
                    {frequencies[selectedFreq].novaInsight}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
