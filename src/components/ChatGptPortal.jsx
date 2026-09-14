import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Sparkles, User, Radio, Mail, MapPin, Calendar, 
  ShieldCheck, AlertCircle, Plus, MessageSquare, Trash2, 
  Info, Volume2, VolumeX, Download, CheckCircle2, ChevronRight, ExternalLink, ArrowRight, Compass, Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NOVA_LORE } from '../data/novaContent';
import { soundFx } from '../utils/soundEffects';
import { sendNovaBeaconEmail } from '../utils/email';

export default function ChatGptPortal({ onComplete, onNavigate, initialSession = null }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: "Welcome to the Nova Multiverse AI Dispatch Portal. I am Nova's intelligent intake agent, powered by the Harmonic Lens and Starlit Journal.\n\nTo begin establishing your direct help beacon, what is your name or preferred alias?",
      time: 'Just now'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Name, 2: Age, 3: Location, 4: Email, 5: Grievance, 6: Complete
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    location: '',
    email: '',
    grievance: '',
    category: 'General Inquiry',
    urgency: 'Standard'
  });

  const [sessions, setSessions] = useState([
    { id: 'sess-1', title: 'Multiverse Resonance Channel', date: 'Active Now' },
    { id: 'sess-2', title: 'Harmonic Shield Inquiries', date: 'Yesterday' },
    { id: 'sess-3', title: 'Starlit Journal Consult', date: 'Sep 11' }
  ]);

  const [activeSessionId, setActiveSessionId] = useState('sess-1');
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [emailNotificationSent, setEmailNotificationSent] = useState(null);
  const scrollContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const promptStarters = [
    {
      title: "🚨 File Official Grievance",
      subtitle: "Begin conversational intake to transmit an emergency beacon",
      action: "I need to file an official grievance and request Nova's help."
    },
    {
      title: "🛡️ Request Harmonic Protection",
      subtitle: "Deploy acoustic resonance shield for personal/community crisis",
      action: "How can Nova's Harmonic Lens protect my situation?"
    },
    {
      title: "📖 Consult the Starlit Journal",
      subtitle: "Access living multiversal wisdom and ethical guidance",
      action: "What knowledge from the Starlit Journal applies to my difficulty?"
    },
    {
      title: "✨ What Can Nova Do?",
      subtitle: "Comprehensive explanation of Nova's powers & weapons",
      action: "EXPLAIN_NOVA"
    }
  ];

  const handleSend = (textToSend = null) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    soundFx.playChime();
    const newMsg = {
      id: Date.now(),
      role: 'user',
      text: query,
      time: 'Just now'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputVal('');
    setIsTyping(true);

    if (query === 'EXPLAIN_NOVA') {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            role: 'assistant',
            text: `### 🌟 What Nova Can Do & What She Provides to This World\n\n**Hero Identity:** Sonova (Nova), Age 20 — Savior of the World & Guardian of Wonder.\n\n- **Weapon 1: The Harmonic Violin Wand & Astrolabe (Music Power)**\n  A celestial instrument that translates human pain and memories into pure acoustic frequencies. It erects impenetrable sound barriers, shatters multiversal anomalies, and transmutes despair into courageous hope.\n\n- **Weapon 2: Celestial Starlight Guitar**\n  Forged with obsidian wood and inlaid with glowing constellations. Plays cosmic chords that soothe fractured souls.\n\n- **Weapon 3 & 4: The Grimoire Book & Astrolabe Codex (Knowledge Power)**\n  Living tomes holding cultural records, legal truths, and ancient star charts. Translates problems into actionable, peaceful solutions.\n\n- **The 5 Realms She Protects:**\n  1. *The Environment* (Biomes, flora, and fauna)\n  2. *People & Cultures* (Laborers, youth, civil safety)\n  3. *Stories & History* (Preventing memory erasure)\n  4. *Music & Art* (Cultivating creativity against violence)\n  5. *The Future* (Shielding the next generation's dreams)\n\nWould you like to transmit your own grievance to Nova right now? What is your name?`,
            time: 'Just now'
          }
        ]);
      }, 1000);
      return;
    }

    const isAction = promptStarters.some(s => s.action === query);
    if (isAction && currentStep === 1) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            role: 'assistant',
            text: `Understood. To proceed with this intake, I need to know who I am speaking with. What is your name or preferred alias?`,
            time: 'Just now'
          }
        ]);
      }, 1000);
      return;
    }

    // Step-by-step intake wizard logic
    setTimeout(() => {
      setIsTyping(false);
      let botReply = '';
      let nextStep = currentStep;

      if (currentStep === 1) {
        setUserData(prev => ({ ...prev, name: query }));
        botReply = `Thank you, **${query}**. Now, what is your age? (Or approximate age category)`;
        nextStep = 2;
      } else if (currentStep === 2) {
        setUserData(prev => ({ ...prev, age: query }));
        botReply = `Received. Location or city where you are located?`;
        nextStep = 3;
      } else if (currentStep === 3) {
        setUserData(prev => ({ ...prev, location: query }));
        botReply = `Got it. What is your contact email address? (So Nova's candidate notification can be dispatched)`;
        nextStep = 4;
      } else if (currentStep === 4) {
        setUserData(prev => ({ ...prev, email: query }));
        botReply = `Thank you. Finally, please describe your grievance or what you need Nova's help with:`;
        nextStep = 5;
      } else if (currentStep === 5) {
        const finalUserData = { 
          ...userData, 
          grievance: query,
          problem: query,
          id: 'NOVA-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
          timestamp: new Date().toISOString()
        };
        setUserData(finalUserData);
        nextStep = 6;

        botReply = `### ✦ BEACON ESTABLISHED SUCCESSFULLY!\n\nYour distress signal has been processed by the Harmonic Lens and recorded into the Starlit Journal.\n\n- **Name:** ${finalUserData.name}\n- **Category:** ${finalUserData.category}\n- **Grievance:** "${finalUserData.grievance}"\n\nGenerating your cryptographic Beacon Receipt...`;

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        if (onComplete) {
          sendNovaBeaconEmail(finalUserData).catch(err => console.error("Email dispatch failed:", err));
          setTimeout(() => {
            onComplete(finalUserData);
          }, 2000);
        }
      } else {
        botReply = `Your beacon is active. Nova has received your message: "${query}". Is there anything else you would like to append to your journal entry?`;
      }

      setCurrentStep(nextStep);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: botReply,
          time: 'Just now'
        }
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#040103] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-serif selection:bg-red-600 selection:text-white">
      
      {/* Background celestial glows matching Page 1 */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-red-700/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-amber-700/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 grain-overlay z-[5] pointer-events-none" />
      <div className="absolute inset-0 scanlines-overlay z-[6] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* ── Page Header matching Page 1 style ─────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-950/60 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-red-950/80 border border-amber-500/40 text-amber-300">
                PAGE 3 • CELESTIAL AI DISPATCH PORTAL
              </span>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                BEACON SYSTEM ACTIVE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight text-white uppercase mt-2">
              Talk to <span className="bg-gradient-to-r from-red-400 via-amber-300 to-purple-400 bg-clip-text text-transparent">Nova AI Guardian</span>
            </h1>
          </div>

          {/* Quick Page Nav Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate && onNavigate('hero')}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-serif transition-all"
            >
              ← Page 1 (Hero)
            </button>
            <button
              onClick={() => onNavigate && onNavigate('weapons')}
              className="px-4 py-2 rounded-full border border-amber-500/40 bg-red-950/60 text-amber-300 text-xs font-serif transition-all hover:scale-105"
            >
              Page 2 (3D Relics) →
            </button>
          </div>
        </div>

        {/* ── Main Chat Interface Grid ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: Orbital Status & Channel Manager */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Status Radar Card */}
            <div className="p-6 rounded-3xl bg-black/60 border border-red-900/40 backdrop-blur-xl shadow-2xl space-y-4 border-glow">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    INTAKE RADAR
                  </span>
                </div>
                <span className="text-[10px] font-mono text-red-400">432Hz Core</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-400">Guardian Identity:</span>
                  <span className="text-amber-300 font-bold">Sonova (Nova)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-400">Harmonic Protection:</span>
                  <span className="text-emerald-400 font-bold">100% Absolute</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-400">Distress Vector:</span>
                  <span className="text-purple-300 font-bold">Instant Dispatch</span>
                </div>
              </div>

              {/* Intake Step Progress */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>BEACON INTAKE PROGRESS:</span>
                  <span className="text-amber-300 font-bold">STEP {Math.min(currentStep, 5)} OF 5</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${(Math.min(currentStep, 5) / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Prompt Starters */}
            <div className="p-6 rounded-3xl bg-black/60 border border-red-900/40 backdrop-blur-xl shadow-2xl space-y-3 border-glow">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                ✦ SELECT INTAKE ACTION:
              </span>
              <div className="space-y-2 mt-2 relative">
                <select 
                  onChange={(e) => {
                    if (e.target.value) {
                      const selectedOption = promptStarters.find(s => s.action === e.target.value);
                      if (selectedOption) {
                        setUserData(prev => ({
                          ...prev,
                          category: selectedOption.title.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]\s*/gu, ''), // Strip emojis
                          urgency: selectedOption.title.includes('Grievance') ? 'Critical' : 'High'
                        }));
                      }
                      handleSend(e.target.value);
                      e.target.value = ""; // Reset after selection
                    }
                  }}
                  defaultValue=""
                  className="w-full p-3.5 pr-10 rounded-2xl border border-white/20 bg-black/60 text-amber-200 text-xs font-bold hover:border-amber-400/60 transition-all cursor-pointer appearance-none outline-none focus:border-amber-400 shadow-inner"
                >
                  <option value="" disabled>-- Choose an Action Category --</option>
                  {promptStarters.map((starter, idx) => (
                    <option key={idx} value={starter.action} className="bg-black text-amber-200">
                      {starter.title}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Compass className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Main Chat Window */}
          <div className="lg:col-span-8 flex flex-col h-[650px] rounded-3xl bg-black/65 border border-red-900/50 backdrop-blur-xl shadow-2xl overflow-hidden border-glow">
            
            {/* Chat Top Banner */}
            <div className="p-4 px-6 border-b border-red-950/60 bg-red-950/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-950 border border-amber-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-serif uppercase tracking-wider">
                    Nova Intake Agent
                  </h3>
                  <p className="text-[10px] text-amber-300/80 font-mono">
                    Harmonic Lens & Starlit Journal Active
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playChime();
                  setMessages([
                    {
                      id: Date.now(),
                      role: 'assistant',
                      text: "Welcome to the Nova Multiverse AI Dispatch Portal. What is your name or preferred alias?",
                      time: 'Just now'
                    }
                  ]);
                  setCurrentStep(1);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1 font-mono"
                title="Reset Conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4" ref={scrollContainerRef}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-red-950 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-md">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-red-950 via-amber-950 to-purple-950 border border-amber-500/40 text-amber-100 rounded-tr-none shadow-lg'
                        : 'bg-white/[0.04] border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-serif">
                      {msg.text}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 mt-2 text-right">
                      {msg.time}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-xl bg-red-950 border border-amber-500/40 flex items-center justify-center shrink-0 animate-pulse">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-amber-300 font-mono text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span>Harmonic Lens decoding resonance...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 border-t border-red-950/60 bg-black/80 flex items-center gap-3"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type your message or details..."
                className="flex-1 bg-white/[0.04] border border-white/15 focus:border-amber-400 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-all font-serif"
              />

              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-red-950 via-amber-950 to-purple-950 border-amber-400 text-amber-200 hover:text-white shadow-lg"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
