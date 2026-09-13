import React, { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import CelestialHeroShowcase from './components/CelestialHeroShowcase';
import HeroPosterPage from './components/HeroPosterPage';
import WeaponsLorePage from './components/WeaponsLorePage';
import ChatGptPortal from './components/ChatGptPortal';
import BeaconReceipt from './components/BeaconReceipt';
import GuardianConsole from './components/GuardianConsole';
import SafetyModal from './components/SafetyModal';
import Footer from './components/Footer';
import { MessageSquare, Sparkles } from 'lucide-react';
import { soundFx } from './utils/soundEffects';

export default function App() {
  const [activePage, setActivePage] = useState('hero'); // 'hero' | 'weapons' | 'chat'
  const [isMuted, setIsMuted] = useState(true);
  const [submittedBeacon, setSubmittedBeacon] = useState(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);

  const handleNavigate = (page) => {
    soundFx.playChime();
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`${activePage === 'hero' ? '' : 'min-h-screen'} bg-[#040103] text-slate-100 relative selection:bg-red-600 selection:text-white`}>
      {/* Animated Cosmic Particles (for secondary pages) */}
      {activePage !== 'hero' && <ParticleBackground />}

      {/* Navigation Header with Page Tabs (for secondary pages) */}
      {activePage !== 'hero' && (
        <Navbar
          activePage={activePage}
          setActivePage={handleNavigate}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
      )}

      {/* Main Content Area */}
      <main className={`${activePage === 'hero' ? 'p-0' : 'pt-20'} relative z-10`}>
        {activePage === 'hero' && (
          <CelestialHeroShowcase
            onNavigate={handleNavigate}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
          />
        )}

        {activePage === 'weapons' && (
          <WeaponsLorePage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'chat' && (
          <section className="p-0">
            {submittedBeacon ? (
              <BeaconReceipt
                beaconData={submittedBeacon}
                onReset={() => setSubmittedBeacon(null)}
                onOpenConsole={() => setIsConsoleOpen(true)}
              />
            ) : (
              <ChatGptPortal
                onComplete={(beacon) => setSubmittedBeacon(beacon)}
                onNavigate={handleNavigate}
              />
            )}
          </section>
        )}
      </main>

      {/* Floating Quick-Access to AI Dispatch (Visible on other pages) */}
      {activePage !== 'chat' && (
        <button
          onClick={() => handleNavigate('chat')}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-cyan-400 text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group border border-white/20 glow-violet"
          title="Open AI Help Portal (ChatGPT)"
        >
          <MessageSquare className="w-5 h-5 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-bold uppercase tracking-wider pl-1">
            Talk to AI Agent
          </span>
        </button>
      )}

      {/* Footer (Rendered on Weapons & AI Chat pages) */}
      {activePage !== 'hero' && (
        <Footer
          onOpenConsole={() => setIsConsoleOpen(true)}
          onTriggerSafety={() => setIsSafetyOpen(true)}
        />
      )}

      {/* Modals */}
      <GuardianConsole
        isOpen={isConsoleOpen}
        onClose={() => setIsConsoleOpen(false)}
      />

      <SafetyModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
      />
    </div>
  );
}
