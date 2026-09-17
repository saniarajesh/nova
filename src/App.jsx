import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import CelestialHeroShowcase from './components/CelestialHeroShowcase';
import HeroPosterPage from './components/HeroPosterPage';
import WeaponsLorePage from './components/WeaponsLorePage';
import ChatGptPortal from './components/ChatGptPortal';
import BeaconReceipt from './components/BeaconReceipt';
import SafetyModal from './components/SafetyModal';
import Footer from './components/Footer';
import { MessageSquare, Sparkles } from 'lucide-react';
import { soundFx } from './utils/soundEffects';

export default function App() {
  const [activePage, setActivePage] = useState('hero'); // 'hero' | 'weapons' | 'chat'
  const [isMuted, setIsMuted] = useState(true);
  const [submittedBeacon, setSubmittedBeacon] = useState(null);
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);

  // Read ?page=receipt&beacon=...&name=...&email=... from email CTA link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('page') === 'receipt' && params.get('beacon')) {
      setSubmittedBeacon({
        id:        params.get('beacon'),
        name:      params.get('name')      || 'Citizen',
        email:     params.get('email')     || '',
        age:       params.get('age')       || 'N/A',
        location:  params.get('location')  || 'N/A',
        category:  params.get('category')  || 'General Inquiry',
        urgency:   params.get('urgency')   || 'Standard',
        grievance: params.get('grievance') || '',
        timestamp: params.get('ts')        || new Date().toISOString()
      });
      setActivePage('chat');
      // Clean the URL without reloading so the params don't persist on refresh
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

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
            onTriggerSafety={() => setIsSafetyOpen(true)}
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


      {/* Footer (Rendered on Weapons & AI Chat pages) */}
      {activePage !== 'hero' && (
        <Footer
          onTriggerSafety={() => setIsSafetyOpen(true)}
        />
      )}

      {/* Modals */}
      <SafetyModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
      />
    </div>
  );
}
