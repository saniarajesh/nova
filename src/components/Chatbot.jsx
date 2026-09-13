import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, User, MapPin, Mail, Calendar, HelpCircle, ArrowRight, ArrowLeft, Shield, AlertTriangle, Radio, Volume2, VolumeX, MessageSquare, FileText, Smile } from 'lucide-react';
import { NOVA_LORE } from '../data/novaContent';
import { soundFx } from '../utils/soundEffects';
import { novaVoice } from '../utils/novaVoice';

export default function Chatbot({ onComplete, onTriggerSafety }) {
  const currentFormData = NOVA_LORE.character;

  // Mode: 'freechat' (open talk with Nova) or 'intake' (structured 7-step Beacon submission)
  const [chatMode, setChatMode] = useState('freechat');

  // Free-Chat state
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'nova',
      text: "Yaho~! (≧◡≦) ✨ I'm Nova, your floating celestial buddy! You can talk to me about anything—how your day went, something that's bothering you, or just hang out! What's on your mind today? 💖",
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Dedicated reference for internal message container (never scrolls the webpage!)
  const chatContainerRef = useRef(null);

  // Intake state (7 Steps)
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    email: '',
    category: NOVA_LORE.categories[0].label,
    problem: '',
    urgency: 'standard'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(true);
  const [isNovaSpeaking, setIsNovaSpeaking] = useState(false);

  // Scroll ONLY the inner chat div without shifting the page
  useEffect(() => {
    if (chatMode === 'freechat' && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping, chatMode]);

  // Voice state listener
  useEffect(() => {
    novaVoice.onStateChange = (speaking) => {
      setIsNovaSpeaking(speaking);
    };

    return () => {
      novaVoice.stop();
    };
  }, []);

  // Intake dialogues
  const intakeDialogues = {
    1: {
      question: "Yaho~! (≧◡≦) ✨ Nova is ready to help you submit your request! What should Nova call you?",
      tip: "You can use your real name, a cute nickname, or choose to stay completely anonymous. 🌸"
    },
    2: {
      question: `Ehehe! So nice to meet you, ${formData.name || 'friend'}! (★ω★) 💖 May Nova ask how old you are?`,
      tip: "This helps me ensure the tone and resources we gather fit you perfectly! ⭐"
    },
    3: {
      question: "Waku-waku! ٩(◕‿◕｡)۶ Where in the world are you right now?",
      tip: "City, state, or country is wonderful—this helps me find allies near you! 🗺️✨"
    },
    4: {
      question: "Hai! 📬 What email address can Nova transmit your secret beacon updates to?",
      tip: "Nova guards your privacy with her life! We only send your Beacon transmission record here. 🛡️"
    },
    5: {
      question: "Nova is listening with all her heart! 👂✨ Which category fits your situation best?",
      tip: "Click the area where you need your voice amplified and protected. 💫"
    },
    6: {
      question: "Take a deep breath and tell Nova everything! 🥺💖 What happened, and how can we help?",
      tip: "Take as much room as you need! No problem is too small, and your story truly matters to Nova. 🌸"
    },
    7: {
      question: "Yosh! 🚀 How urgent is this for you right now? Nova is ready to ignite the beacon!",
      tip: "Flagging urgency helps prioritize our automated notification alert. ⚡"
    }
  };

  // Play real-time voice soundtrack on intake step change
  useEffect(() => {
    if (chatMode === 'intake' && isVoiceActive) {
      const timer = setTimeout(() => {
        novaVoice.playVoice();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [step, chatMode, isVoiceActive]);

  // Voice toggle
  const toggleVoiceMode = () => {
    const nextState = novaVoice.toggleVoice();
    setIsVoiceActive(nextState);
  };

  // Crisis detection
  const checkSafetyKeywords = (text) => {
    const dangerWords = ['suicide', 'kill myself', 'end my life', 'hurt myself', 'emergency', 'dying', 'overdose'];
    const lower = text.toLowerCase();
    return dangerWords.some(w => lower.includes(w));
  };

  // -------------------------------------------------------------
  // FREE CHAT LOGIC (Real-time talk back & writing animation)
  // -------------------------------------------------------------
  const generateNovaReply = (userText) => {
    const lower = userText.toLowerCase();

    if (checkSafetyKeywords(userText)) {
      onTriggerSafety();
      return "Wait! Please stay safe! 🥺💔 Nova cares about you so much! I'm opening our 24/7 crisis lifelines right now—you are never alone, please let someone help you! 💖";
    }

    if (lower.includes('who are you') || lower.includes('your name')) {
      return "Yaho~! (≧◡≦) ✨ I'm Nova, The Guardian of Unheard Voices! I'm a floating celestial fairy companion with a star halo and constellation cape! My mission is to make sure nobody has to suffer in silence! (★ω★) 💖";
    }

    if (lower.includes('hard day') || lower.includes('sad') || lower.includes('crying') || lower.includes('bad day') || lower.includes('lonely') || lower.includes('tired')) {
      return "Aww, come here! (つ✧ω✧)つ 💖 *big cosmic hug*! Nova is right here floating beside you! It's totally okay to feel sad or overwhelmed. Take a slow deep breath... Nova is proud of you for making it through today! 🌸✨";
    }

    if (lower.includes('food') || lower.includes('snack') || lower.includes('eat') || lower.includes('hungry') || lower.includes('paimon')) {
      return "Oho! Did someone say snacks?! ٩(◕‿◕｡)۶ 🍪✨ Nova LOVES star-jelly pastries and sweet moon-dew honey! Don't tell anyone, but Nova's tummy is always ready for a treat! What's YOUR favorite snack? (≧◡≦)";
    }

    if (lower.includes('power') || lower.includes('abilities') || lower.includes('magic')) {
      return "Hehe! Nova has four cosmic powers! ⚡ Signal Sense (hearing silent cries), 🧠 Mind Link (understanding your feelings), 🛡️ Guardian Core (protecting your privacy), and ✨ Echo Vision (finding real help)! Pretty cool, right? (★ω★) 💫";
    }

    if (lower.includes('help') || lower.includes('problem') || lower.includes('complain') || lower.includes('grievance') || lower.includes('beacon') || lower.includes('unfair')) {
      return "Nova hears you loud and clear! 👂✨ If you have an official problem or request you want transmitted, click the '⚡ Official Beacon' tab above! Nova will package your story and dispatch an automated alert to real advocates! 🚀💖";
    }

    if (lower.includes('joke') || lower.includes('funny')) {
      return "Ehehe! Why did the star go to school? ⭐ ... To get a little brighter! ٩(◕‿◕｡)۶ ✨ Tada~! Did Nova make you smile? (≧◡≦)";
    }

    if (lower.includes('thank') || lower.includes('cute') || lower.includes('love')) {
      return "Ehehe~! (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄) 💖 You're making Nova blush! You are so sweet! Nova will always be your loyal guide! ✨🌸";
    }

    const randomReplies = [
      "Nova is listening with starry eyes! (★ω★) ✨ Tell Nova more! How does that make you feel? 💖",
      "Waku-waku! ٩(◕‿◕｡)۶ Nova understands! Whatever happens, remember that your voice has power and your story matters! 🌸💫",
      "Ehehe! (≧◡≦) You're so interesting to talk to! If you ever need Nova to transmit a help signal for you, just say the word! ⭐💖",
      "Nova's antennae are vibrating with good vibes! 📡✨ You're doing amazing, and Nova is always in your corner! (つ✧ω✧)つ"
    ];
    return randomReplies[Math.floor(Math.random() * randomReplies.length)];
  };

  // Real-time typewriter effect synchronized with the real voice soundtrack
  const streamNovaReply = (fullReply) => {
    // 1. Play real-time anime voice soundtrack!
    if (isVoiceActive) {
      novaVoice.playVoice();
    }

    const msgId = Date.now() + 1;

    // Start with empty message
    setMessages(prev => [
      ...prev,
      { id: msgId, sender: 'nova', text: '', isStreaming: true, time: 'Just now' }
    ]);

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      charIndex += 2;
      if (charIndex >= fullReply.length) {
        clearInterval(typingInterval);
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: fullReply, isStreaming: false } : m));
      } else {
        const textSlice = fullReply.slice(0, charIndex);
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: textSlice } : m));
      }
    }, 28);
  };

  const handleSendFreeMessage = (textToSend) => {
    const text = textToSend !== undefined ? textToSend : inputText;
    if (!text.trim()) return;

    soundFx.playChime();
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = generateNovaReply(text);
      streamNovaReply(reply);
    }, 450);
  };

  const quickPrompts = [
    { label: "I had a hard day... 🥺", text: "I had a really hard day today... can you cheer me up?" },
    { label: "Who are you, Nova? ✨", text: "Who are you and what do you do?" },
    { label: "What's your favorite snack? 🍪", text: "What is your favorite snack, Nova?" },
    { label: "I need official help! ⚡", text: "I have a serious grievance and need official help!" },
  ];

  // -------------------------------------------------------------
  // INTAKE HANDLERS
  // -------------------------------------------------------------
  const handleIntakeNext = () => {
    setError('');
    soundFx.playChime();

    if (step === 1) {
      if (!formData.name.trim()) {
        setError('Please enter a name or alias (or click "Stay Anonymous").');
        novaVoice.playVoice();
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.age.trim()) {
        setError('Please enter your approximate age.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.location.trim()) {
        setError('Please enter your city, region, or country.');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setError('Please provide a valid email so Nova can route notification updates.');
        novaVoice.playVoice();
        return;
      }
      setStep(5);
    } else if (step === 5) {
      setStep(6);
    } else if (step === 6) {
      if (formData.problem.trim().length < 15) {
        setError('Please tell Nova a little bit more about what happened (at least 15 characters).');
        novaVoice.playVoice();
        return;
      }
      if (checkSafetyKeywords(formData.problem)) {
        onTriggerSafety();
      }
      setStep(7);
    } else if (step === 7) {
      handleIntakeSubmit();
    }
  };

  const handleIntakeSubmit = () => {
    setIsSubmitting(true);
    soundFx.playTransmission();
    novaVoice.playVoice();

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const beaconId = `BEACON-NV-${randomNum}`;

    const newBeacon = {
      id: beaconId,
      timestamp: new Date().toISOString(),
      ...formData,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('nova_beacons') || '[]');
      existing.unshift(newBeacon);
      localStorage.setItem('nova_beacons', JSON.stringify(existing));
    } catch (e) {}

    setTimeout(() => {
      setIsSubmitting(false);
      onComplete(newBeacon);
    }, 1400);
  };

  return (
    <section id="chatbot" className="relative py-20 border-t border-white/5 bg-gradient-to-b from-[#070919] via-[#0b0f2a] to-[#050714]">
      
      {/* Cosmic background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold glass-pill border border-purple-500/30 text-purple-300 mb-3 animate-pulse-slow">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>NOVA CELESTIAL CHATSPACE & INTAKE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mb-3">
            Talk to <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">NOVA</span> ✨
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Chat freely with Nova anytime, or ignite an official help beacon whenever you are ready!
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CLEAN, STABLE GLASSMORPHIC CHAT CONTAINER (Stationary, In-Place)          */}
        {/* ========================================================================= */}
        <div className="w-full rounded-3xl glass-panel border border-purple-500/30 p-4 sm:p-7 bg-[#090d24]/95 shadow-2xl relative overflow-hidden">
          
          {/* Top Control Bar: Mode Tabs & Real-Time Voice Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10 text-xs">
            
            {/* Mode Switcher Tabs */}
            <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setChatMode('freechat');
                  soundFx.playChime();
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  chatMode === 'freechat'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>💬 Free Chatspace</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setChatMode('intake');
                  soundFx.playChime();
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  chatMode === 'intake'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>⚡ Official Beacon</span>
              </button>
            </div>

            {/* Real-time Voice Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => novaVoice.playVoice()}
                title="Play Nova's real-time voice soundtrack"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-pink-200 border border-pink-400/40 text-xs font-bold transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>🎵 Nova's Voice</span>
              </button>

              <button
                type="button"
                onClick={toggleVoiceMode}
                title={isVoiceActive ? "Disable Voice" : "Enable Voice"}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isVoiceActive
                    ? 'bg-purple-600/30 border-purple-400 text-purple-200 shadow-sm'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                {isVoiceActive ? <Volume2 className="w-3.5 h-3.5 text-pink-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                <span>{isVoiceActive ? "Voice: ON" : "Muted"}</span>
              </button>
            </div>

          </div>

          {/* ============================================================== */}
          {/* VIEW 1: FREE CHATSPACE (Real-Time Talk & Typing Sync)          */}
          {/* ============================================================== */}
          {chatMode === 'freechat' ? (
            <div className="flex flex-col min-h-[440px] justify-between">
              
              {/* Stationary Internal Scroll Container (Never jumps the webpage!) */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto max-h-[350px] space-y-3.5 pr-2 mb-4 scrollbar-thin"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'nova' && (
                      <div className="relative shrink-0">
                        <div className={`w-10 h-10 rounded-full overflow-hidden border-2 bg-black animate-float transition-all ${
                          isNovaSpeaking
                            ? 'border-pink-400 shadow-lg shadow-pink-500/50 scale-105'
                            : 'border-purple-400'
                        }`}>
                          <img src={currentFormData.image} alt="Nova" className="w-full h-full object-cover" />
                        </div>
                        {isNovaSpeaking && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-pink-500 animate-ping" />
                        )}
                      </div>
                    )}

                    <div
                      className={`max-w-[84%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-sm shadow-md'
                          : 'bg-white/10 border border-purple-500/20 text-slate-100 rounded-tl-sm shadow-inner'
                      }`}
                    >
                      {msg.sender === 'nova' && (
                        <div className="text-[10px] font-bold text-cyan-300 mb-1 flex items-center justify-between font-mono">
                          <span className="flex items-center gap-1.5">
                            <span>NOVA (Guardian Guide)</span>
                            {isNovaSpeaking && (
                              <div className="flex items-center gap-0.5">
                                <span className="w-1 h-2.5 bg-pink-400 rounded-full animate-wave-1" />
                                <span className="w-1 h-3.5 bg-purple-400 rounded-full animate-wave-2" />
                                <span className="w-1 h-2 bg-cyan-400 rounded-full animate-wave-3" />
                              </div>
                            )}
                          </span>

                          <button
                            type="button"
                            onClick={() => novaVoice.playVoice()}
                            className="text-purple-300 hover:text-white p-0.5 rounded flex items-center gap-1 text-[9px]"
                            title="Play Nova's real-time voice track"
                          >
                            <Volume2 className="w-3 h-3 text-pink-400" />
                            <span>Voice</span>
                          </button>
                        </div>
                      )}

                      <p className="whitespace-pre-wrap">
                        {msg.text}
                        {msg.isStreaming && (
                          <span className="inline-block w-1.5 h-3.5 ml-1 bg-cyan-400 animate-pulse align-middle" />
                        )}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-purple-300 italic p-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-purple-400 shrink-0">
                      <img src={currentFormData.image} alt="Nova" className="w-full h-full object-cover" />
                    </div>
                    <span>Nova is getting ready to speak... ✨</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompt Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
                {quickPrompts.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendFreeMessage(chip.text)}
                    className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors shrink-0"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Free Chat Input Form (Zero Page Movement on Enter) */}
              <div className="space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendFreeMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendFreeMessage();
                      }
                    }}
                    placeholder="Talk freely with Nova... (Type your message and press Enter)"
                    className="flex-1 px-4 py-3.5 rounded-2xl bg-black/50 border border-white/15 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder:text-slate-500 text-xs sm:text-sm"
                  />

                  <button
                    type="submit"
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:scale-105 text-white transition-all shadow-md shrink-0"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Emojis & Beacon CTA Bar */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono">EMOJIS:</span>
                    {['✨', '💖', '🌸', '🥺', '🍪', '⭐', '🌈', '🎉'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setInputText(prev => prev + emoji)}
                        className="hover:scale-125 transition-transform text-sm p-0.5"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setChatMode('intake');
                      soundFx.playChime();
                    }}
                    className="text-cyan-300 hover:text-cyan-200 underline font-semibold flex items-center gap-1"
                  >
                    <span>Need official help? Ignite Beacon</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* ============================================================== */
            /* VIEW 2: GUIDED INTAKE                                          */
            /* ============================================================== */
            <div>
              
              {/* Progress Bar inside Screen */}
              <div className="mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                  <span className="text-purple-300 font-bold flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>FREQUENCY STAGE {step}/7</span>
                  </span>
                  <span className="text-cyan-300 font-bold">{Math.round((step / 7) * 100)}% COMPLETE</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${(step / 7) * 100}%` }}
                  />
                </div>
              </div>

              {/* Nova Avatar & Speech Bubble */}
              <div className="flex items-start gap-4 sm:gap-6 mb-8">
                
                {/* Avatar with speaking wave ripple */}
                <div className="relative shrink-0">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 shadow-lg bg-black animate-float transition-all ${
                    isNovaSpeaking 
                      ? 'border-pink-400 shadow-pink-500/50 scale-105 ring-4 ring-pink-500/20' 
                      : 'border-purple-400/50 shadow-purple-900/40'
                  }`}>
                    <img
                      src={currentFormData.image}
                      alt="Nova Companion"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  <span className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold border border-[#070919] flex items-center gap-1 ${
                    isNovaSpeaking ? 'bg-pink-500 text-white animate-pulse' : 'bg-emerald-400 text-black'
                  }`}>
                    {isNovaSpeaking ? 'SPEAKING' : 'ONLINE'}
                  </span>
                </div>

                {/* Speech Bubble */}
                <div className="flex-1 bg-white/5 border border-purple-500/25 p-4 sm:p-5 rounded-3xl rounded-tl-sm relative">
                  
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono flex items-center gap-1.5">
                      <span>Nova • {currentFormData.name}</span>
                      {isNovaSpeaking && (
                        <div className="flex items-center gap-0.5">
                          <span className="w-1 h-3 bg-pink-400 rounded-full animate-wave-1" />
                          <span className="w-1 h-4 bg-purple-400 rounded-full animate-wave-2" />
                          <span className="w-1 h-2 bg-cyan-400 rounded-full animate-wave-3" />
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => novaVoice.playVoice()}
                      className="text-purple-300 hover:text-white text-xs flex items-center gap-1"
                      title="Play Nova's real-time voice track"
                    >
                      <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                      <span className="text-[10px] hidden sm:inline">Play Voice</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base font-medium text-white leading-relaxed mb-2">
                    {intakeDialogues[step].question}
                  </p>
                  <p className="text-xs text-purple-300 italic">
                    ✦ {intakeDialogues[step].tip}
                  </p>
                </div>
              </div>

              {/* Input Forms */}
              <div className="space-y-6">
                
                {/* Step 1: Name */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name or preferred alias..."
                        className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl bg-black/50 border border-white/15 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder:text-slate-500 text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleIntakeNext()}
                        autoFocus
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, name: 'Anonymous Seeker' }));
                          soundFx.playChime();
                          novaVoice.playVoice();
                          setStep(2);
                        }}
                        className="text-purple-300 hover:text-purple-200 underline font-semibold flex items-center gap-1"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        <span>Prefer to stay completely anonymous? Click here</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Age */}
                {step === 2 && (
                  <div>
                    <div className="relative">
                      <Calendar className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="e.g. 19, 28, 45, or 'Over 18'..."
                        className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl bg-black/50 border border-white/15 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder:text-slate-500 text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleIntakeNext()}
                        autoFocus
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Location */}
                {step === 3 && (
                  <div>
                    <div className="relative">
                      <MapPin className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. London UK, Chicago IL, Toronto CA..."
                        className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl bg-black/50 border border-white/15 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder:text-slate-500 text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleIntakeNext()}
                        autoFocus
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Email */}
                {step === 4 && (
                  <div>
                    <div className="relative">
                      <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl bg-black/50 border border-white/15 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder:text-slate-500 text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleIntakeNext()}
                        autoFocus
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Protected by Guardian Core Zero-Knowledge encryption.</span>
                    </p>
                  </div>
                )}

                {/* Step 5: Category Selection */}
                {step === 5 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {NOVA_LORE.categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, category: cat.label });
                          soundFx.playChime();
                          novaVoice.playVoice();
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.category === cat.label
                            ? 'bg-purple-600/30 border-cyan-400 text-white shadow-lg shadow-purple-900/30'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <div className="font-semibold text-sm mb-1">{cat.label}</div>
                        <div className="text-xs text-slate-400">Click to select</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 6: Story Description */}
                {step === 6 && (
                  <div className="space-y-3">
                    <div className="relative">
                      <textarea
                        rows={5}
                        value={formData.problem}
                        onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                        placeholder="Describe your situation in detail. What occurred, who is involved, and what outcome are you seeking?..."
                        className="w-full p-4 rounded-2xl bg-black/50 border border-white/15 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder:text-slate-500 text-sm leading-relaxed"
                        autoFocus
                      />
                    </div>

                    {/* Live Resonance / Signal Strength visualizer */}
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-cyan-300">Resonance:</span>
                        <span className={`font-bold ${
                          formData.problem.length > 80 ? 'text-emerald-400' : 'text-purple-300'
                        }`}>
                          {formData.problem.length > 80 ? 'Strong Signal ✨' : 'Tuning In...'}
                        </span>
                      </div>
                      <span>{formData.problem.length} characters</span>
                    </div>
                  </div>
                )}

                {/* Step 7: Urgency Selection */}
                {step === 7 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'standard', title: 'Standard', desc: 'Need guidance & steady routing' },
                      { id: 'priority', title: 'Priority', desc: 'Facing imminent deadlines or pressure' },
                      { id: 'urgent', title: 'Critical / Urgent', desc: 'Severe distress needing rapid focus' },
                    ].map((urg) => (
                      <button
                        key={urg.id}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, urgency: urg.id });
                          soundFx.playChime();
                          novaVoice.playVoice();
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.urgency === urg.id
                            ? 'bg-pink-950/40 border-pink-400 text-white shadow-lg'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <div className="font-bold text-sm mb-1 uppercase tracking-wider text-pink-300">
                          {urg.title}
                        </div>
                        <div className="text-xs text-slate-400">{urg.desc}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setError('');
                        soundFx.playChime();
                        setStep(step - 1);
                      }}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setChatMode('freechat')}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-white/5"
                    >
                      Cancel / Back to Chat
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleIntakeNext}
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:shadow-purple-500/40"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Signal...</span>
                    ) : step === 7 ? (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Ignite Transmission Beacon 🚀</span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
