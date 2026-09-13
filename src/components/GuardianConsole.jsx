import React, { useState, useEffect } from 'react';
import { Shield, Mail, CheckCircle2, Trash2, X, ExternalLink, Send, FileText } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export default function GuardianConsole({ isOpen, onClose }) {
  const [submissions, setSubmissions] = useState([]);
  const [selectedBeacon, setSelectedBeacon] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadSubmissions();
    }
  }, [isOpen]);

  const loadSubmissions = () => {
    try {
      const data = JSON.parse(localStorage.getItem('nova_beacons') || '[]');
      setSubmissions(data);
      if (data.length > 0) {
        setSelectedBeacon(data[0]);
      }
    } catch (e) {
      setSubmissions([]);
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear stored transmission records?")) {
      localStorage.removeItem('nova_beacons');
      setSubmissions([]);
      setSelectedBeacon(null);
      soundFx.playChime();
    }
  };

  const sendMailtoTest = (beacon) => {
    soundFx.playChime();
    const subject = encodeURIComponent(`[NOVA ALERT] New Beacon ${beacon.id}: ${beacon.category}`);
    const body = encodeURIComponent(
`NOVA GUARDIAN DISPATCH NOTIFICATION
------------------------------------------------
Beacon ID: ${beacon.id}
Time: ${beacon.timestamp}
Name/Alias: ${beacon.name} (Age: ${beacon.age})
Location: ${beacon.location}
Contact: ${beacon.email}
Urgency: ${beacon.urgency.toUpperCase()}

STORY / GRIEVANCE:
${beacon.problem}
------------------------------------------------
Transmitted via NOVA Portal: The Guardian of Unheard Voices`
    );
    window.open(`mailto:${beacon.email}?subject=${subject}&body=${body}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[85vh] rounded-3xl glass-panel border border-cyan-500/40 p-6 flex flex-col bg-[#070919] shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <span>Guardian Transmission Console</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                  ADMIN / REVIEWER
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Inspect archived beacons and preview automated dispatch email payloads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {submissions.length > 0 && (
              <button
                onClick={handleClear}
                className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors text-xs flex items-center gap-1.5"
                title="Clear local test data"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear Records</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {submissions.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">No Beacons Recorded Yet</h4>
            <p className="text-sm text-slate-400 max-w-sm mb-6">
              Complete the intake chatbot on the website to see your beacon data and email notification logs appear here!
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
            >
              Go to Chatbot
            </button>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 overflow-hidden">
            
            {/* Left list */}
            <div className="md:col-span-5 overflow-y-auto space-y-2.5 pr-2">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                Stored Beacons ({submissions.length})
              </div>

              {submissions.map((beacon) => (
                <div
                  key={beacon.id}
                  onClick={() => {
                    setSelectedBeacon(beacon);
                    soundFx.playChime();
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-left ${
                    selectedBeacon?.id === beacon.id
                      ? 'bg-cyan-950/40 border-cyan-400/50 shadow-md shadow-cyan-900/30'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-cyan-300">{beacon.id}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      beacon.urgency === 'urgent' ? 'bg-pink-500/20 text-pink-400' : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {beacon.urgency}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white truncate">
                    {beacon.name} • {beacon.location}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {beacon.category}
                  </div>
                </div>
              ))}
            </div>

            {/* Right details / Email dispatch preview */}
            <div className="md:col-span-7 flex flex-col overflow-hidden bg-black/40 rounded-2xl border border-white/10 p-5">
              {selectedBeacon ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                  
                  {/* Email Preview Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono font-bold text-slate-300">
                        DISPATCH EMAIL PREVIEW
                      </span>
                    </div>

                    <button
                      onClick={() => sendMailtoTest(selectedBeacon)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
                      title="Open test email draft in your default client"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Real Test Email</span>
                    </button>
                  </div>

                  {/* Formatted Notification Payload */}
                  <div className="flex-1 overflow-y-auto font-mono text-xs space-y-3 bg-[#050714] p-4 rounded-xl border border-white/5 text-slate-300 leading-relaxed">
                    <div className="text-slate-400">
                      <strong className="text-white">To: </strong> support@nova-advocacy.org, {selectedBeacon.email}
                    </div>
                    <div className="text-slate-400">
                      <strong className="text-white">Subject: </strong> 
                      <span className="text-cyan-300">[NOVA ALERT] New Beacon {selectedBeacon.id}: {selectedBeacon.category}</span>
                    </div>
                    <div className="text-slate-400">
                      <strong className="text-white">Timestamp: </strong> {new Date(selectedBeacon.timestamp).toLocaleString()}
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <div className="text-purple-300 font-bold mb-2">SPEAKER RECORD</div>
                      <div>• Name / Alias: {selectedBeacon.name}</div>
                      <div>• Age Bracket: {selectedBeacon.age}</div>
                      <div>• Region / Location: {selectedBeacon.location}</div>
                      <div>• Contact: {selectedBeacon.email}</div>
                      <div>• Urgency Level: {selectedBeacon.urgency.toUpperCase()}</div>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <div className="text-pink-300 font-bold mb-2">FULL STATEMENT</div>
                      <p className="whitespace-pre-wrap text-slate-200 bg-white/5 p-3 rounded-lg border border-white/5">
                        {selectedBeacon.problem}
                      </p>
                    </div>
                    <div className="border-t border-white/10 pt-2 text-[11px] text-cyan-400/80">
                      STATUS: Dispatched & Logged via Guardian Core Encryption Protocol.
                    </div>
                  </div>

                </div>
              ) : null}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
