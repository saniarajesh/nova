import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, Download, Radio, Shield, Share2, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function BeaconReceipt({ beaconData, onReset, onOpenConsole }) {
  useEffect(() => {
    soundFx.playTransmission();

    // Trigger celebratory cosmic confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#06b6d4', '#f43f5e', '#fbbf24']
      });
    } catch (e) {
      // ignore
    }
  }, []);

  if (!beaconData) return null;

  const downloadReceipt = () => {
    soundFx.playChime();
    const content = `=====================================================
NOVA: THE GUARDIAN OF UNHEARD VOICES
BEACON TRANSMISSION RECEIPT
=====================================================
Beacon ID:       ${beaconData.id}
Timestamp:       ${new Date(beaconData.timestamp).toLocaleString()}
Status:          TRANSMITTED & ACTIVATED
Cryptographic:   SHA-256 Verified

SPEAKER DETAILS
Name / Alias:    ${beaconData.name}
Age Bracket:     ${beaconData.age}
Location:        ${beaconData.location}
Contact Email:   ${beaconData.email}

GRIEVANCE SUMMARY
Category:        ${beaconData.category}
Urgency Level:   ${beaconData.urgency.toUpperCase()}
Your Story:
${beaconData.problem}

=====================================================
DISPATCH VERIFICATION
- Mind Link Analysis: Complete
- Encryption Core: Client-Side Verified
- Notification Status: Dispatched to Support Team
=====================================================
"Every voice deserves to be heard." — NOVA
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${beaconData.id}_receipt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl glass-panel border border-cyan-500/40 p-6 sm:p-10 shadow-2xl bg-gradient-to-b from-[#0e1233] to-[#080a1c] animate-in zoom-in-95 duration-500 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Beacon ID */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>TRANSMISSION ACTIVE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Your Signal Has Been Heard
          </h3>
        </div>

        {/* Beacon Badge */}
        <div className="bg-black/50 border border-cyan-400/40 px-4 py-2 rounded-2xl text-right">
          <div className="text-[10px] text-slate-400 font-mono">BEACON ID</div>
          <div className="font-mono text-lg font-black text-cyan-300 tracking-wider">
            {beaconData.id}
          </div>
        </div>
      </div>

      {/* Reassurance from Nova */}
      <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-start gap-3.5 mb-6 text-sm text-purple-200">
        <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white">Nova says: </span>
          "I've got your signal safely locked in my constellation! Your story has been encrypted and the notification email has been dispatched. You are not alone."
        </div>
      </div>

      {/* Summary Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
          <span className="text-slate-400 block mb-1">Speaker</span>
          <span className="font-bold text-white text-sm">{beaconData.name} ({beaconData.age})</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
          <span className="text-slate-400 block mb-1">Location</span>
          <span className="font-bold text-white text-sm">{beaconData.location}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
          <span className="text-slate-400 block mb-1">Category</span>
          <span className="font-bold text-cyan-300 text-sm">{beaconData.category}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
          <span className="text-slate-400 block mb-1">Urgency Level</span>
          <span className={`font-bold text-sm uppercase ${
            beaconData.urgency === 'urgent' ? 'text-pink-400' : 'text-purple-300'
          }`}>
            {beaconData.urgency}
          </span>
        </div>
      </div>

      {/* Transmission Steps Completed */}
      <div className="space-y-2 mb-8 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs">
        <div className="flex items-center gap-2 text-cyan-300">
          <CheckCircle2 className="w-4 h-4" />
          <span>Voice securely captured & encrypted into local vault</span>
        </div>
        <div className="flex items-center gap-2 text-purple-300">
          <CheckCircle2 className="w-4 h-4" />
          <span>Mind Link categorization and urgency priority assigned</span>
        </div>
        <div className="flex items-center gap-2 text-pink-300">
          <CheckCircle2 className="w-4 h-4" />
          <span>Notification dispatch email sent to support coordinators ({beaconData.email})</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={downloadReceipt}
          className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Download Beacon Receipt (.txt)</span>
        </button>

        <button
          onClick={onReset}
          className="py-3 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Submit Another Story</span>
        </button>
      </div>

    </div>
  );
}
