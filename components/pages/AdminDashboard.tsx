import React, { useState, useEffect } from 'react';
import { 
  Users, ShieldAlert, Calendar, CheckCircle2, 
  Search, Filter, ArrowUpRight, MessageSquare, 
  FileText, Zap, Phone, Mail, AlertCircle, Lightbulb, Target, User, Building
} from 'lucide-react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import RevealOnScroll from '../RevealOnScroll';

interface Lead {
  id: string;
  name: string;
  enterprise: string;
  email: string;
  phone: string;
  score: number;
  resultType: string;
}

const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // REAL-TIME FIREBASE SYNC: Pulling directly from your 'leads' collection
  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const leadsData: Lead[] = [];
      querySnapshot.forEach((doc) => {
        leadsData.push({ id: doc.id, ...doc.data() } as Lead);
      });
      setLeads(leadsData);
    });
    return () => unsubscribe();
  }, []);

  // Strategic Intelligence Mapping
  const getIntelligence = (score: number) => {
    if (score < 20) return {
      problems: ["SARS AI Era Vulnerability", "Retrospective Technical Debt", "Leadership Isolation"],
      solutions: ["Immediate Compliance Triage", "Real-time Bookkeeping Stack", "Neural Resilience Protocol"],
      recommendation: "Deploy defensive buffer immediately to avoid automated SARS flags."
    };
    return {
      problems: ["Strategic Stagnation", "Cognitive Overload", "Legacy Gaps"],
      solutions: ["Institutional Scaling Framework", "Capacity Assessment", "Wealth Mapping"],
      recommendation: "Focus on engineering the business for institutional scale and long-term legacy."
    };
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-12">
          <RevealOnScroll>
            <h1 className="text-4xl font-sora font-extrabold text-brand-900 tracking-tighter uppercase italic">
              Strategic <span className="text-brand-gold">Intelligence Center.</span>
            </h1>
          </RevealOnScroll>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Segmented Lead List */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <th className="px-8 py-5">Enterprise & Contact</th>
                  <th className="px-8 py-5">Score</th>
                  <th className="px-8 py-5">Diagnostic Tier</th>
                  <th className="px-8 py-5 text-right">View Deep-Dive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {leads.map((lead) => (
                  <tr key={lead.id} onClick={() => setSelectedLead(lead)} className={`cursor-pointer transition-all ${selectedLead?.id === lead.id ? 'bg-brand-50' : 'hover:bg-gray-50'}`}>
                    <td className="px-8 py-6">
                      <p className="font-black text-brand-900 uppercase">{lead.enterprise}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase">{lead.name} • {lead.phone}</p>
                    </td>
                    <td className="px-8 py-6 font-black text-brand-900 italic">#{lead.score}</td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${lead.score < 20 ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                        {lead.resultType}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right"><ArrowUpRight size={18} className="text-gray-300 ml-auto" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT: High-Resolution Deep-Dive */}
          <div className="lg:col-span-1">
            {selectedLead ? (
              <div className="bg-white rounded-[3rem] shadow-2xl p-10 space-y-8 animate-fadeIn border-t-8 border-brand-gold">
                <div>
                  <h2 className="text-2xl font-black text-brand-900 uppercase tracking-tighter">{selectedLead.enterprise}</h2>
                  <div className="flex gap-4 mt-2">
                    <a href={`mailto:${selectedLead.email}`} className="text-[10px] font-bold text-gray-400 flex items-center gap-1 hover:text-brand-gold"><Mail size={12}/> EMAIL</a>
                    <a href={`tel:${selectedLead.phone}`} className="text-[10px] font-bold text-gray-400 flex items-center gap-1 hover:text-brand-gold"><Phone size={12}/> CONTACT</a>
                  </div>
                </div>

                {/* 1. PROBLEMS (Where business lacks) */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-red-500 font-black uppercase text-[10px] tracking-widest"><AlertCircle size={14}/> Identified Problems</h4>
                  {getIntelligence(selectedLead.score).problems.map((p, i) => (
                    <div key={i} className="p-4 bg-red-50 rounded-xl border border-red-100 text-xs font-bold text-red-700">{p}</div>
                  ))}
                </div>

                {/* 2. SOLUTIONS */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px] tracking-widest"><CheckCircle2 size={14}/> IWS Recommendations</h4>
                  {getIntelligence(selectedLead.score).solutions.map((s, i) => (
                    <div key={i} className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs font-bold text-emerald-700">{s}</div>
                  ))}
                </div>

                {/* 3. STRATEGIC ADVICE */}
                <div className="p-8 bg-brand-900 rounded-[2.5rem] text-white">
                  <h4 className="text-brand-gold font-black uppercase text-[9px] tracking-[0.3em] mb-4">Final Recommendation</h4>
                  <p className="text-sm font-medium italic leading-relaxed">"{getIntelligence(selectedLead.score).recommendation}"</p>
                </div>
              </div>
            ) : (
              <div className="h-full bg-white rounded-[3rem] border-2 border-dashed border-gray-200 flex items-center justify-center p-12 text-gray-400 font-bold uppercase text-xs">
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
