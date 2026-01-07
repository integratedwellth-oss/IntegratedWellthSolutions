import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Verified Firestore connection
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Mail, Phone, AlertCircle, CheckCircle2, Lightbulb, Zap, ArrowUpRight } from 'lucide-react';
import RevealOnScroll from '../RevealOnScroll';

const AdminDashboard = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  useEffect(() => {
    // Real-time sync with the 'leads' collection
    const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-32 pb-20 px-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3 text-brand-gold font-black uppercase tracking-[0.4em] text-[10px] mb-8">
           <Zap size={14} className="animate-pulse" />
           <span>Sovereign Intelligence Protocol</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Segmented Entry List */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] uppercase font-black tracking-widest text-gray-400">
                <tr>
                  <th className="p-8">Enterprise & Founder</th>
                  <th className="p-8">Tier</th>
                  <th className="p-8 text-right">Intelligence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map(lead => (
                  <tr key={lead.id} onClick={() => setSelectedLead(lead)} 
                      className={`cursor-pointer transition-all ${selectedLead?.id === lead.id ? 'bg-brand-50' : 'hover:bg-gray-50'}`}>
                    <td className="p-8">
                      <p className="font-black text-brand-900 uppercase tracking-tighter">{lead.enterprise}</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">{lead.name}</p>
                    </td>
                    <td className="p-8">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${lead.score < 20 ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                        {lead.resultType || "Pending"}
                      </span>
                    </td>
                    <td className="p-8 text-right font-black text-brand-gold text-xs">DEEP DIVE <ArrowUpRight className="inline ml-1" size={14}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT: Detailed Intelligence Segment */}
          <div className="lg:col-span-1">
            {selectedLead ? (
              <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-t-8 border-brand-gold space-y-10 animate-fadeIn">
                <section>
                  <h2 className="text-3xl font-black text-brand-900 uppercase tracking-tighter leading-none">{selectedLead.enterprise}</h2>
                  <div className="flex gap-4 mt-4 text-[10px] font-black text-gray-400">
                    <span className="flex items-center gap-1 hover:text-brand-900"><Mail size={12}/> {selectedLead.email}</span>
                    <span className="flex items-center gap-1 hover:text-brand-900"><Phone size={12}/> {selectedLead.phone}</span>
                  </div>
                </section>

                {/* PROBLEMS (Vulnerabilities) */}
                <section className="space-y-4">
                  <h4 className="flex items-center gap-2 text-red-500 font-black uppercase text-[10px] tracking-widest"><AlertCircle size={14}/> Identified Problems</h4>
                  {selectedLead.gaps ? selectedLead.gaps.map((gap: string, i: number) => (
                    <div key={i} className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-100">{gap}</div>
                  )) : <p className="text-gray-400 text-[10px] font-bold italic">No gaps recorded.</p>}
                </section>

                {/* SOLUTIONS (Recommendations) */}
                <section className="space-y-4">
                  <h4 className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px] tracking-widest"><CheckCircle2 size={14}/> Proposed Solutions</h4>
                  {selectedLead.solutions ? selectedLead.solutions.map((sol: string, i: number) => (
                    <div key={i} className="p-4 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-2xl border border-emerald-100">{sol}</div>
                  )) : <p className="text-gray-400 text-[10px] font-bold italic">No solutions generated.</p>}
                </section>

                {/* STRATEGIC ADVICE */}
                <section className="p-8 bg-brand-900 rounded-[2.5rem] text-white shadow-xl">
                  <h4 className="text-brand-gold font-black uppercase text-[9px] tracking-widest mb-4">Sovereign Recommendation</h4>
                  <p className="text-sm font-medium italic leading-relaxed text-brand-50">
                    "{selectedLead.recommendation || "Pending strategic analysis..."}"
                  </p>
                </section>
              </div>
            ) : (
              <div className="h-full bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-200 text-gray-400 uppercase font-black text-xs">
                Select entry to initialize deep-dive
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
