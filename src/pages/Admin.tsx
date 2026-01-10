/**
 * IWS SOVEREIGNTY - LEAD INTELLIGENCE TERMINAL
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Activity, User, Briefcase, Smartphone, AlertCircle } from 'lucide-react';

export default function Admin() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-6 font-mono">
      <div className="max-w-6xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Triage Terminal</h1>
          <p className="text-[10px] text-brand-gold font-bold uppercase tracking-[0.3em]">Live Intelligence Feed</p>
        </header>

        <div className="grid gap-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-[#0a0c12] border border-white/5 p-6 rounded-2xl flex flex-wrap items-center justify-between gap-6 hover:border-brand-gold/30 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-brand-gold border border-white/10">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">{lead.name}</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-2">
                    <Briefcase size={10} /> {lead.business}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Contact Info</p>
                <p className="text-xs text-brand-gold flex items-center gap-2 font-black">
                  <Smartphone size={12} /> {lead.whatsapp}
                </p>
              </div>

              <div className="flex flex-col gap-1 min-w-[150px]">
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Risk Score</p>
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-full bg-white/5 rounded-full overflow-hidden`}>
                    <div 
                      className={`h-full ${lead.assessment?.runway < 6 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${Math.min(100, (lead.assessment?.runway || 0) * 10)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-white">{lead.assessment?.runway?.toFixed(1)}m</span>
                </div>
              </div>

              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white transition-all">
                Full Dossier
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
