import React, { useState } from 'react';
import { 
  Users, ShieldAlert, Calendar, CheckCircle2, 
  Search, Filter, ArrowUpRight, MessageSquare, 
  FileText, Zap, Phone, Mail, AlertCircle, Lightbulb, Target
} from 'lucide-react';
import RevealOnScroll from '../RevealOnScroll';

// Detailed Lead Model
interface DetailedLead {
  id: string;
  name: string;
  enterprise: string;
  email: string;
  phone: string;
  score: number;
  resultType: string;
  gaps: string[]; // Problems identified
  solutions: string[]; // How IWS fixes it
  recommendation: string; // Strategic advice
}

// Mock Data representing your Firestore 'leads' collection
const DETAILED_LEADS: DetailedLead[] = [
  {
    id: "1",
    name: "Thabiso Nothana",
    enterprise: "Nothana Holdings",
    email: "thabiso@nothana.co.za",
    phone: "0812355910",
    score: 15,
    resultType: "Critical Triage",
    gaps: ["Retrospective reporting only", "Manual tech-stack", "SARS AI Vulnerability"],
    solutions: ["Real-time Bookkeeping Stack", "SARS 2026 Audit-Ready Blueprint"],
    recommendation: "Immediate intervention to resolve technical debt before 2026 watershed."
  },
  {
    id: "2",
    name: "Kidibone Lidovho",
    enterprise: "Bluevalley Transport",
    email: "ceo@bluevalley.com",
    phone: "0744940771",
    score: 22,
    resultType: "Reflection Needed",
    gaps: ["Leadership Isolation", "Poor data triangulation", "Inconsistent CIPC status"],
    solutions: ["Neural Resilience Coaching", "Compliance Dashboard Integration"],
    recommendation: "Shift focus to institutional scaling and donor-readiness."
  }
];

const AdminDashboard: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState<DetailedLead | null>(null);

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header Protocol */}
        <div className="flex justify-between items-center mb-12">
          <RevealOnScroll>
            <div className="flex items-center gap-3 text-brand-gold font-black uppercase tracking-[0.4em] text-[10px] mb-2">
               <Zap size={14} className="animate-pulse" />
               <span>Sovereign Command Protocol</span>
            </div>
            <h1 className="text-4xl font-sora font-extrabold text-brand-900 tracking-tighter uppercase">
              Lead <span className="text-brand-gold italic">Intelligence Center.</span>
            </h1>
          </RevealOnScroll>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: Segmented Lead List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-xl font-bold text-brand-900 uppercase tracking-tighter italic">Founders Triage</h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input type="text" placeholder="Search Command..." className="pl-10 pr-4 py-2 bg-gray-50 rounded-full text-[10px] font-bold outline-none border-none" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <th className="px-8 py-5">Entity & Contact</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Primary Gap</th>
                      <th className="px-8 py-5 text-right">Protocol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {DETAILED_LEADS.map((lead) => (
                      <tr 
                        key={lead.id} 
                        onClick={() => setSelectedLead(lead)}
                        className={`cursor-pointer transition-all ${selectedLead?.id === lead.id ? 'bg-brand-50/50' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-8 py-6">
                          <p className="font-black text-brand-900">{lead.enterprise}</p>
                          <div className="flex gap-3 mt-1">
                            <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1"><User size={10} /> {lead.name}</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-1"><Phone size={10} /> {lead.phone}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${lead.score < 20 ? 'bg-red-50 text-red-500' : 'bg-brand-gold/10 text-brand-gold'}`}>
                            {lead.resultType}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                           <p className="text-xs font-bold text-brand-900/60 uppercase">{lead.gaps[0]}</p>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <ArrowUpRight size={18} className="text-gray-300 ml-auto" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT: Detailed Deep-Dive (Selected Lead) */}
          <div className="lg:col-span-1">
            {selectedLead ? (
              <RevealOnScroll>
                <div className="bg-white rounded-[3rem] shadow-2xl border-t-8 border-brand-gold p-10 space-y-8 animate-fadeIn">
                  {/* Profile Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-black text-brand-900 tracking-tighter uppercase">{selectedLead.enterprise}</h2>
                      <p className="text-brand-gold font-bold text-xs uppercase tracking-widest italic">{selectedLead.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-brand-900/10 italic">#{selectedLead.score}</p>
                    </div>
                  </div>

                  {/* 1. PROBLEMS (Where business lacks) */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-500 font-black uppercase text-[10px] tracking-widest">
                      <AlertCircle size={14} />
                      <span>Identified Vulnerabilities</span>
                    </div>
                    <div className="grid gap-2">
                      {selectedLead.gaps.map((gap, i) => (
                        <div key={i} className="bg-red-50/50 p-4 rounded-xl border border-red-100 text-xs font-bold text-red-700">
                          {gap}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. SOLUTIONS (How IWS fixes it) */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px] tracking-widest">
                      <CheckCircle2 size={14} />
                      <span>Proposed Solutions</span>
                    </div>
                    <div className="grid gap-2">
                      {selectedLead.solutions.map((sol, i) => (
                        <div key={i} className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-xs font-bold text-emerald-700">
                          {sol}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. RECOMMENDATIONS */}
                  <div className="p-6 bg-brand-900 rounded-3xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Lightbulb size={100} />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-brand-gold font-black uppercase text-[10px] tracking-[0.3em] mb-4">Strategic Advice</h4>
                      <p className="text-sm font-medium leading-relaxed italic">
                        "{selectedLead.recommendation}"
                      </p>
                    </div>
                  </div>

                  {/* Immediate Protocol Actions */}
                  <div className="pt-6 grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-4 bg-gray-100 text-brand-900 rounded-full font-black uppercase text-[9px] tracking-widest hover:bg-brand-900 hover:text-white transition-all">
                      <MessageSquare size={14} /> WhatsApp
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 bg-brand-gold text-brand-900 rounded-full font-black uppercase text-[9px] tracking-widest hover:scale-105 transition-all">
                      <Calendar size={14} /> Call Log
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ) : (
              <div className="h-full bg-gray-100 rounded-[3rem] border-2 border-dashed border-gray-300 flex items-center justify-center p-20 text-center">
                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Select a founder to initialize deep-dive intelligence</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
