import React from 'react';
import { ShieldAlert, Heart, Phone, ExternalLink, X } from 'lucide-react';
import { NOVA_LORE } from '../data/novaContent';

export default function SafetyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-pink-500/40 p-6 sm:p-8 bg-[#0e1128] shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
            <Heart className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-display">
              You Are Never Alone
            </h3>
            <p className="text-xs text-pink-300 font-semibold">
              Immediate Care & Crisis Support
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Nova sensed deep distress in your words. While Nova is here to amplify your story, your immediate safety and well-being come first. 
          Please reach out to these free, confidential, 24/7 lifelines:
        </p>

        {/* Hotline list */}
        <div className="space-y-3 mb-6">
          {NOVA_LORE.crisisHotlines.map((hotline, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">
                  {hotline.name}
                </div>
                <div className="text-xs text-slate-400">
                  {hotline.description}
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm font-bold text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-lg border border-pink-500/30">
                  {hotline.number}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            I Understand, Return to Nova
          </button>
        </div>

      </div>
    </div>
  );
}
