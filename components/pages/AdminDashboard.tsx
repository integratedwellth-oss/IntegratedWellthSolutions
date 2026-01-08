import React, { useState, useEffect } from 'react';
// Force the .ts extension to avoid collision with firebase.json
import { db } from '../../firebase'; 
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Mail, Phone, AlertCircle, CheckCircle2, Zap, ArrowUpRight, BarChart3 } from 'lucide-react';

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

  // Intelligence Mapping Logic based on the 48-point Strategic Triage
  const getDeepDive = (score: number) => {
    if (score <= 19) return {
      problems: ["Severe Technical Debt", "SARS AI Vulnerability", "Leadership Isolation"],
      solutions: ["Immediate Compliance Triage", "Automation of Record-Keeping", "Strategic Advisor Onboarding"],
      advice: "Critical exposure detected. Prioritize defensive buffer creation before SARS AI triangulation flags personal vs business discrepancies."
    };
    if (score <= 34) return {
      problems: ["Technical Stagnation", "Decision Fatigue", "Fragile Cash Buffer"],
      solutions: ["System Integration", "Continuous Accounting Hub", "12-Month Liquidity Roadmap"],
      advice: "Founder is surviving but not scaling. Focus on removing the 'Mental Tax' of admin sludge to allow for strategic vision."
    };
    return {
      problems: ["Institutional Scaling Barriers", "Intergenerational Risk"],
      solutions: ["3D Wealth Mapping", "Legacy Engineering", "Institutional Memory Systems"],
      advice: "Entity is optimized for current ops. Shift focus to engineering an institutional legacy that survives beyond the founder."
    };
  };

  return (
    <div className="pt-32 pb-20 px-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div className="flex items-center gap-3 text-brand-gold font-black uppercase tracking-[0.4em] text-[10px]">
           <Zap size={14} className="animate-pulse" />
           <span>Strategic Intelligence Command</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Lead List Hub */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] uppercase font-black tracking-widest text-gray-400">
                <tr>
                  <th className="p-8">Enterprise & Founder</th>
                  <th className="p-8">Triage Tier</th>
                  <th className="p-8 text-right">Action</th>
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
                      <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${lead.score <= 19 ? 'bg-red-50 text-red-500' : lead.score <= 34 ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'}`}>
                        {lead.resultType} ({lead.score}/48)
                      </span>
                    </td>
                    <td className="p-8 text-right font-black text-brand-gold text-xs italic">DEEP DIVE <ArrowUpRight className="inline ml-1" size={14}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT: High-Resolution Triage Intelligence */}
          <div className="lg:col-span-1">
            {selectedLead ? (
              <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-t-8 border-brand-gold space-y-10 animate-fadeIn">
                <section>
                  <h2 className="text-3xl font-black text-brand-900 uppercase tracking-tighter leading-none">{selectedLead.enterprise}</h2>
                  <div className="flex gap-4 mt-4 text-[10px] font-black text-gray-400">
                    <span className="flex items-center gap-1"><Mail size={12}/> {selectedLead.email}</span>
                    <span className="flex items-center gap-1"><Phone size={12}/> {selectedLead.phone}</span>
                  </div>
                </section>

                {/* VULNERABILITIES (Problems) */}
                <section className="space-y-4">
                  <h4 className="flex items-center gap-2 text-red-500 font-black uppercase text-[10px] tracking-widest"><AlertCircle size={14}/> Technical Debt & IQ Gaps</h4>
                  {getDeepDive(selectedLead.score).problems.map((prob, i) => (
                    <div key={i} className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-100 italic">{prob}</div>
                  ))}
                </section>

                {/* SOLUTIONS (Recommendations) */}
                <section className="space-y-4">
                  <h4 className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px] tracking-widest"><CheckCircle2 size={14}/> Integrated Solutions</h4>
                  {getDeepDive(selectedLead.score).solutions.map((sol, i) => (
                    <div key={i} className="p-4 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-2xl border border-emerald-100 italic">{sol}</div>
                  ))}
                </section>

                {/* SOVEREIGN RECOMMENDATION */}
                <section className="p-8 bg-brand-900 rounded-[2.5rem] text-white shadow-xl">
                  <h4 className="text-brand-gold font-black uppercase text-[9px] tracking-widest mb-4">Strategic Pulse</h4>
                  <p className="text-sm font-medium italic leading-relaxed text-brand-50">
                    "{getDeepDive(selectedLead.score).advice}"
                  </p>
                </section>
              </div>
            ) : (
              <div className="h-full bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-200 flex flex-col items-center justify-center space-y-4">
                <BarChart3 size={48} className="text-gray-200" />
                <p className="text-gray-400 uppercase font-black text-xs">Initialize Intelligence Deep-Dive</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
