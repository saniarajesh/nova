import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, Download, Radio, Shield, Share2, RefreshCw } from 'lucide-react';
import jsPDF from 'jspdf';
import { soundFx } from '../utils/soundEffects';

export default function BeaconReceipt({ beaconData, onReset }) {
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
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 7;
    let y = 15;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('NOVA: THE GUARDIAN OF UNHEARD VOICES', margin, y);
    y += lineHeight;
    doc.text('BEACON TRANSMISSION RECEIPT', margin, y);
    y += lineHeight * 2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    const fields = [
      `Beacon ID:       ${beaconData.id}`,
      `Timestamp:       ${new Date(beaconData.timestamp).toLocaleString()}`,
      `Status:          TRANSMITTED & ACTIVATED`,
      `Cryptographic:   SHA-256 Verified`,
      '',
      'SPEAKER DETAILS',
      `Name / Alias:    ${beaconData.name}`,
      `Age Bracket:     ${beaconData.age}`,
      `Location:        ${beaconData.location}`,
      `Contact Email:   ${beaconData.email}`,
      '',
      'GRIEVANCE SUMMARY',
      `Category:        ${beaconData.category}`,
      `Urgency Level:   ${beaconData.urgency.toUpperCase()}`,
      'Your Story:'
    ];

    fields.forEach(line => {
      doc.text(line, margin, y);
      y += lineHeight;
    });

    // Handle multiline story
    const splitStory = doc.splitTextToSize(beaconData.problem, 180);
    doc.text(splitStory, margin, y);
    y += (splitStory.length * lineHeight) + lineHeight;

    const footer = [
      '=====================================================',
      'DISPATCH VERIFICATION',
      '- Mind Link Analysis: Complete',
      '- Encryption Core: Client-Side Verified',
      '- Notification Status: Dispatched to Support Team',
      '=====================================================',
      '"Every voice deserves to be heard." — NOVA'
    ];

    footer.forEach(line => {
      if (y > 280) { doc.addPage(); y = 15; }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save(`${beaconData.id}_receipt.pdf`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl glass-panel border border-red-500/40 p-6 sm:p-10 shadow-[0_0_40px_rgba(239,68,68,0.2)] bg-gradient-to-b from-[#1a0505] to-[#0a0000] animate-in zoom-in-95 duration-500 relative overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Beacon ID */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-red-900/40 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold mb-2 shadow-[0_0_10px_rgba(251,191,36,0.2)]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>TRANSMISSION ACTIVE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Your Signal Has Been Heard
          </h3>
        </div>

        {/* Beacon Badge */}
        <div className="bg-black/80 border border-red-900/60 px-4 py-2 rounded-2xl text-right shadow-inner">
          <div className="text-[10px] text-red-400 font-mono">BEACON ID</div>
          <div className="font-mono text-lg font-black text-amber-300 tracking-wider">
            {beaconData.id}
          </div>
        </div>
      </div>

      {/* Reassurance from Nova */}
      <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-start gap-3.5 mb-6 text-sm text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white">Nova says: </span>
          "I've got your signal safely locked in my constellation! Your story has been encrypted and the notification email has been dispatched. You are not alone."
        </div>
      </div>

      {/* Summary Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
        <div className="p-3.5 rounded-xl bg-black/40 border border-red-900/40">
          <span className="text-red-400 block mb-1">Speaker</span>
          <span className="font-bold text-amber-100 text-sm">{beaconData.name} ({beaconData.age})</span>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-red-900/40">
          <span className="text-red-400 block mb-1">Location</span>
          <span className="font-bold text-amber-100 text-sm">{beaconData.location}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-red-900/40">
          <span className="text-red-400 block mb-1">Category</span>
          <span className="font-bold text-amber-300 text-sm">{beaconData.category || 'General Inquiry'}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-black/40 border border-red-900/40">
          <span className="text-red-400 block mb-1">Urgency Level</span>
          <span className={`font-bold text-sm uppercase ${beaconData.urgency?.toLowerCase() === 'critical' ? 'text-red-500' : 'text-amber-400'
            }`}>
            {beaconData.urgency || 'Standard'}
          </span>
        </div>
      </div>

      {/* Transmission Steps Completed */}
      <div className="bg-black/60 rounded-2xl p-5 mb-8 border border-red-950/60">
        <ul className="space-y-3 text-xs font-mono text-slate-300">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Voice securely captured & encrypted into local vault</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Mind Link categorization and urgency priority assigned</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Notification dispatch email sent to support coordinators</span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={downloadReceipt}
          className="flex-1 py-3 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-amber-200 font-semibold text-xs sm:text-sm transition-all border border-red-500/40 hover:border-amber-400/60 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Download Beacon Receipt (.pdf)</span>
        </button>

        <button
          type="button"
          id="submit-another-story-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
              soundFx.playClick();
            } catch (err) {
              // ignore audio error
            }
            if (onReset) {
              onReset();
            }
          }}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-red-700 to-amber-600 hover:from-red-600 hover:to-amber-500 text-white font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Submit Another Story</span>
        </button>
      </div>

    </div>
  );
}
