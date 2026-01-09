import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ShieldAlert, Users, Activity, Lock, Search } from 'lucide-react';

const Admin = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState('');

  // REAL-TIME DATABASE CONNECTION
  useEffect(() => {
    if (!access) return;
    const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [access]);

  // SIMPLE SECURITY GATE
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
    <div className="min-h-screen bg-slate-950 text-emerald-500 font-mono pt-32 px-6">
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

        {/* INTEL GRID */}
        <div className="grid gap-4">
          {leads.length === 0 ? (
            <div className="text-center p-20 opacity-30 uppercase tracking-widest">No Intelligence Gathered Yet</div>
          ) : (
            leads.map((lead) => (
              <div key={lead.id} className="bg-slate-900/50 border border-emerald-900/30 p-6 rounded-2xl hover:bg-slate-900 hover:border-emerald-500 transition-all group">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  
                  {/* IDENTITY */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-500 group-hover:text-white transition-colors">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg uppercase tracking-tight">{lead.enterprise || "Unknown Entity"}</h3>
                      <p className="text-sm opacity-60">{lead.name} • {lead.email}</p>
                    </div>
                  </div>

                  {/* SCORE */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-xs font-bold uppercase tracking-widest opacity-50">Triage Score</div>
                      <div className={`text-2xl font-black ${lead.score < 20 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {lead.score}/48
                      </div>
                    </div>
                    
                    {/* ACTION */}
                    <button className="px-6 py-3 bg-emerald-900/20 border border-emerald-900/50 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                      View Profile
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Admin;
