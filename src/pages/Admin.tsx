import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Activity, Lock, Users, X, FileText, Calendar, Mail, Phone, AlertTriangle, CheckCircle } from 'lucide-react';

const Admin = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState('');
  
  // NEW: State to hold the specific lead we want to look at
  const [selectedLead, setSelectedLead] = useState<any>(null);

  useEffect(() => {
    if (!access) return;
    const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [access]);

  // LOGIN SCREEN
  if (!access) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-emerald-900/50 p-8 rounded-3xl text-center">
        <Lock className="mx-auto text-emerald-500 mb-6" size={48} />
        <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-6">Restricted Area</h2>
        <input 
          type="password" 
          placeholder="Enter Access Code"
          className="w-full bg-black border border-emerald-900 rounded-xl p-4 text-center text-white outline-none focus:border-emerald-500 transition-colors mb-4"
          onChange={e => setPassword(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && (password === 'wellth2026' ? setAccess(true) : alert('Access Denied'))}
        />
        <button 
          onClick={() => password === 'wellth2026' ? setAccess(true) : alert('Access Denied')}
          className="w-full py-4 bg-emerald-900 text-emerald-400 font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
        >
          Authenticate
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-500 font-mono pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-12 border-b border-emerald-900/50 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] mb-2 text-red-500 animate-pulse">
              <Activity size={14} /> Live Intelligence Feed
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Command <span className="text-emerald-500">Deck.</span>
            </h1>
          </div>
          <div className="hidden md:block text-right">
             <div className="text-4xl font-black text-white">{leads.length}</div>
             <div className="text-xs uppercase tracking-widest opacity-50">Active Leads</div>
          </div>
        </div>

        {/* DATA GRID */}
        <div className="grid gap-4">
          {leads.length === 0 ? (
            <div className="text-center p-20 opacity-30 uppercase tracking-widest">No Intelligence Gathered Yet</div>
          ) : (
            leads.map((lead) => (
              <div key={lead.id} className="bg-slate-900/50 border border-emerald-900/30 p-6 rounded-2xl hover:bg-slate-900 hover:border-emerald-500 transition-all group">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-500 group-hover:text-white transition-colors">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg uppercase tracking-tight">{lead.enterprise || "Unknown Entity"}</h3>
                      <p className="text-sm opacity-60">{lead.name} • {lead.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-xs font-bold uppercase tracking-widest opacity-50">Triage Score</div>
                      <div className={`text-2xl font-black ${lead.score < 20 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {lead.score}/48
                      </div>
                    </div>
                    
                    {/* ACTIVATED BUTTON */}
                    <button 
                      onClick={() => setSelectedLead(lead)}
                      className="px-6 py-3 bg-emerald-900/20 border border-emerald-900/50 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-lg hover:shadow-emerald-500/20"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* INTELLIGENCE DOSSIER MODAL (THE NEW PART) */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-emerald-500 w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* MODAL HEADER */}
              <div className="bg-emerald-900/20 p-6 border-b border-emerald-500/30 flex justify-between items-center">
                <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs">
                  <FileText size={16} /> Confidential Dossier
                </div>
                <button onClick={() => setSelectedLead(null)} className="text-emerald-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="p-8 overflow-y-auto">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">{selectedLead.enterprise}</h2>
                    <p className="text-emerald-500 font-bold text-lg">{selectedLead.name}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg border ${selectedLead.score < 20 ? 'border-red-500 bg-red-900/20 text-red-500' : 'border-emerald-500 bg-emerald-900/20 text-emerald-500'}`}>
                    <div className="text-xs font-black uppercase tracking-widest text-center">Score</div>
                    <div className="text-3xl font-black text-center">{selectedLead.score}/48</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-black/30 p-4 rounded-xl border border-emerald-900/30">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
                      <Mail size={14} /> Secure Comms
                    </div>
                    <div className="text-white">{selectedLead.email}</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl border border-emerald-900/30">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
                      <Calendar size={14} /> Timestamp
                    </div>
                    <div className="text-white">
                      {selectedLead.timestamp?.seconds 
                        ? new Date(selectedLead.timestamp.seconds * 1000).toLocaleString() 
                        : 'Pending Sync...'}
                    </div>
                  </div>
                </div>

                {/* AUTOMATED ANALYSIS */}
                <div className="bg-emerald-900/10 p-6 rounded-2xl border border-emerald-500/20">
                  <h3 className="text-white font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    {selectedLead.score < 25 ? <AlertTriangle className="text-red-500" size={18} /> : <CheckCircle className="text-emerald-500" size={18} />}
                    Strategic Analysis
                  </h3>
                  <p className="text-sm leading-relaxed text-emerald-100/80">
                    {selectedLead.score < 20 
                      ? "CRITICAL STATUS. This entity is operating in survival mode. High risk of technical debt accumulation and leadership burnout. IMMEDIATE INTERVENTION REQUIRED: Suggest 'War Room' stress test and rapid compliance audit."
                      : selectedLead.score < 35 
                      ? "CAUTION ADVISED. Operational foundation exists but lacks scalability. Founder is likely experiencing decision fatigue. Recommendation: Introduce 'Digital Innovation' protocols to remove manual sludge."
                      : "OPTIMIZED. Entity demonstrates strong technical IQ. Ready for 'Legacy Engineering' and advanced wealth mapping strategies."}
                  </p>
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="p-6 border-t border-emerald-500/30 bg-black/20 flex justify-end gap-4">
                <button 
                  onClick={() => window.open(`mailto:${selectedLead.email}`, '_blank')}
                  className="px-6 py-3 bg-emerald-600 text-white font-bold uppercase tracking-widest rounded-xl hover:bg-emerald-500 transition-colors shadow-lg"
                >
                  Initiate Contact
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
