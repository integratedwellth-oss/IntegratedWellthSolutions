import React, { useState } from 'react';
import { Calendar, ShieldCheck, Clock, CheckCircle2, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface Milestone {
  id: string;
  title: string;
  audience: 'Individual' | 'Company' | 'NPO';
  date: string;
  countdown: string;
  nudge: string;
  progress: number;
  requirements: string[];
  prerequisite?: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 'it12t',
    title: "Trust Tax Returns (ITR12T)",
    audience: 'Individual',
    date: "2026-01-19",
    countdown: "Finalize Your Legacy",
    nudge: "Protect the wealth you've built for the next generation.",
    progress: 80,
    requirements: ["Trust Deed", "Financial Statements", "Beneficiary Details"]
  },
  {
    id: 'irp6',
    title: "Provisional Tax Payment 2 (IRP6)",
    audience: 'Individual',
    date: "2026-02-28",
    countdown: "Secure Your Surplus",
    nudge: "Spread the load now to avoid a future tax bomb.",
    progress: 45,
    requirements: ["Estimated Taxable Income", "Tax Certificates"]
  },
  {
    id: 'npo-digital',
    title: "Online NPO Registration Launch",
    audience: 'NPO',
    date: "2026-02-27",
    countdown: "Digital Compliance Transition",
    nudge: "SARS is moving fully digital. Ensure your PBO status is protected.",
    progress: 10,
    requirements: ["Founding Documents", "Board Resolution", "PBO Number"]
  },
  {
    id: 'cipc-annual',
    title: "CIPC Annual Returns & BO",
    audience: 'Company',
    date: "Anniversary Month",
    countdown: "Protect Legal Status",
    nudge: "You cannot file returns without Beneficial Ownership (BO) completion.",
    progress: 60,
    requirements: ["Company Financials", "BO Filing Confirmation"],
    prerequisite: "Beneficial Ownership Filing"
  }
];

const ComplianceCalendar: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Individual' | 'Company' | 'NPO'>('All');

  const filteredMilestones = filter === 'All' 
    ? MILESTONES 
    : MILESTONES.filter(m => m.audience === filter);

  return (
    <section className="py-24 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <RevealOnScroll>
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-brand-gold mb-2 italic">Predictive Reassurance</h2>
            <h3 className="text-4xl md:text-5xl font-sora font-extrabold text-brand-900 tracking-tighter">Compliance <span className="text-brand-gold italic">Calendar.</span></h3>
          </RevealOnScroll>
          
          <div className="flex bg-white p-1.5 rounded-full border border-gray-100 shadow-sm">
            {['All', 'Individual', 'Company', 'NPO'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === type ? 'bg-brand-900 text-white' : 'text-gray-400 hover:text-brand-900'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {filteredMilestones.map((milestone, idx) => (
            <RevealOnScroll key={milestone.id} delay={idx * 0.1}>
              <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden">
                {/* Traffic Light Status */}
                <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10 transition-colors ${milestone.progress > 75 ? 'bg-emerald-500' : milestone.progress > 40 ? 'bg-brand-gold' : 'bg-red-500'}`} />
                
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em]">{milestone.audience} Milestone</span>
                    <h4 className="text-2xl font-bold text-brand-900">{milestone.title}</h4>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-black text-brand-900/40 uppercase tracking-widest">{milestone.date}</span>
                    <div className="flex items-center gap-2 mt-1 text-emerald-500">
                      <Clock size={14} />
                      <span className="text-[10px] font-bold uppercase italic">Live Counter Active</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8 p-6 bg-brand-50/50 rounded-2xl border border-brand-900/5">
                  <p className="text-brand-900 font-bold mb-2">"{milestone.countdown}"</p>
                  <p className="text-sm text-gray-600 leading-relaxed italic">{milestone.nudge}</p>
                </div>

                {/* Zeigarnik Progress Bar */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-brand-900/40">
                    <span>Task Completion</span>
                    <span>{milestone.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out ${milestone.progress > 75 ? 'bg-emerald-500' : 'bg-brand-gold'}`}
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>

                {/* Sludge Reducer Checklist */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {milestone.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      {req}
                    </div>
                  ))}
                  {milestone.prerequisite && (
                    <div className="col-span-2 flex items-center gap-2 text-[10px] font-black text-red-500 uppercase bg-red-50 p-3 rounded-lg border border-red-100">
                      <AlertTriangle size={14} />
                      Prerequisite Badge: {milestone.prerequisite}
                    </div>
                  )}
                </div>

                <button className="w-full flex items-center justify-center gap-3 py-4 bg-brand-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-gold hover:text-brand-900 transition-all">
                  <FileText size={16} />
                  Access Document Vault <ArrowRight size={14} />
                </button>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComplianceCalendar;
