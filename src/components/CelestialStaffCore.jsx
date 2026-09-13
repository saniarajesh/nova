import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function CelestialStaffCore({ onAwaken, isAwakened }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute cursor-pointer group z-30 select-none"
      style={{
        // Positioning relative to the 16:9 container matching the staff's astrolabe sphere
        left: '28.2%',
        top: '21.8%',
        transform: 'translate(-50%, -50%)',
      }}
      onClick={onAwaken}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Click to awaken Nova's Celestial Astrolabe Core"
    >
      {/* Outer Atmospheric Pulse Halo */}
      <div
        className={`absolute -inset-16 rounded-full transition-all duration-700 pointer-events-none ${
          isAwakened
            ? 'bg-gradient-to-r from-red-600/50 via-purple-600/50 to-amber-400/40 blur-2xl scale-150 animate-pulse'
            : isHovered
            ? 'bg-gradient-to-r from-purple-600/30 via-red-600/25 to-amber-300/25 blur-xl scale-125'
            : 'bg-gradient-to-r from-purple-600/15 via-red-600/15 to-transparent blur-lg scale-100'
        }`}
      />

      {/* Rotating Outer Astrolabe Ring 1 */}
      <div
        className={`w-32 h-32 rounded-full border border-amber-400/40 border-dashed transition-all duration-500 pointer-events-none ${
          isAwakened
            ? 'animate-spin border-amber-300 scale-125'
            : isHovered
            ? 'animate-spin-slow border-amber-300/80 scale-110'
            : 'animate-spin-slow'
        }`}
        style={{ animationDuration: isAwakened ? '3s' : isHovered ? '8s' : '22s' }}
      >
        {/* Tiny Orbiting Celestial Nodes */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#fbbf24]" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_#f87171]" />
      </div>

      {/* Counter-Rotating Astrolabe Ring 2 */}
      <div
        className="absolute inset-2 rounded-full border border-purple-400/30 transition-all duration-500 pointer-events-none"
        style={{
          animation: 'spin-rev 16s linear infinite',
          animationDuration: isAwakened ? '2.5s' : isHovered ? '6s' : '16s',
        }}
      >
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#c084fc]" />
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_#fef08a]" />
      </div>

      {/* Pulsing Ethereal Stellar Core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Deep Violet / Crimson Plasma Sphere */}
        <div
          className={`w-14 h-14 rounded-full transition-transform duration-500 flex items-center justify-center ${
            isAwakened
              ? 'scale-135 shadow-[0_0_45px_#f43f5e,0_0_90px_#a855f7]'
              : isHovered
              ? 'scale-115 shadow-[0_0_30px_#ec4899,0_0_60px_#8b5cf6]'
              : 'scale-100 shadow-[0_0_20px_#a855f7,0_0_40px_#e11d48]'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(216,180,254,0.85) 30%, rgba(147,51,234,0.7) 60%, rgba(225,29,72,0.4) 100%)',
          }}
        >
          {/* Intense Pure White Center Star */}
          <div
            className={`w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#ffffff] transition-all duration-300 ${
              isAwakened ? 'scale-150 animate-ping' : ''
            }`}
          />
        </div>

        {/* 4-Point Celestial Starburst Diffraction Spikes */}
        <div
          className={`absolute w-36 h-[1.5px] bg-gradient-to-r from-transparent via-amber-200 to-transparent transition-all duration-500 pointer-events-none ${
            isAwakened ? 'scale-x-150 opacity-100' : isHovered ? 'scale-x-125 opacity-90' : 'opacity-70 scale-x-100'
          }`}
        />
        <div
          className={`absolute h-36 w-[1.5px] bg-gradient-to-b from-transparent via-amber-200 to-transparent transition-all duration-500 pointer-events-none ${
            isAwakened ? 'scale-y-150 opacity-100' : isHovered ? 'scale-y-125 opacity-90' : 'opacity-70 scale-y-100'
          }`}
        />

        {/* Diagonal Soft Flare Spikes */}
        <div
          className={`absolute w-28 h-[1px] bg-gradient-to-r from-transparent via-purple-300/80 to-transparent rotate-45 transition-all duration-500 pointer-events-none ${
            isAwakened ? 'scale-x-140' : 'scale-x-100'
          }`}
        />
        <div
          className={`absolute w-28 h-[1px] bg-gradient-to-r from-transparent via-purple-300/80 to-transparent -rotate-45 transition-all duration-500 pointer-events-none ${
            isAwakened ? 'scale-x-140' : 'scale-x-100'
          }`}
        />
      </div>

      {/* Floating Interactive Micro-Badge */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap transition-all duration-300 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border backdrop-blur-md ${
          isAwakened
            ? 'opacity-100 bg-red-950/80 border-amber-400/60 text-amber-300 shadow-lg shadow-red-950/60'
            : isHovered
            ? 'opacity-100 -translate-y-1 bg-black/80 border-purple-500/50 text-purple-200 shadow-md'
            : 'opacity-0 translate-y-1'
        }`}
      >
        <Sparkles className="w-3 h-3 text-amber-400 animate-spin-slow" />
        <span>{isAwakened ? '✦ ASTROLABE AWAKENED' : '✦ CLICK TO IGNITE CORE'}</span>
      </div>
    </div>
  );
}
