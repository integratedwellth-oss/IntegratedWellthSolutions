
import React, { useState } from 'react';
import { ShieldCheck, Calendar, Clock, CheckCircle2, AlertCircle, Info, ArrowRight, User, Building2, HeartHandshake, Zap, TrendingDown, DollarSign, Search, Filter, ShieldAlert, Cpu, Lock, Globe, Download, FileSpreadsheet } from 'lucide-react';
import Button from './Button';
import RevealOnScroll from './RevealOnScroll';
import { generatePDFReport, generateCSVExport } from '../services/exportService';

type Category = 'individual' | 'corporate' | 'npo';

interface Milestone {
  id: string;
  title: string;
  date: string;
  targetDate: Date;
  description: string;
  checklist: string[];
  impact: string;
  category: Category;
  financialImpact?: string; // e.g. "High Capital Outflow"
  strategicPillar?: string;
}

const MILESTONES: Milestone[] = [
  // Individuals
  {
    id: 'irp6-ind',
    title: 'Provisional Tax (IRP6)',
    date: '28 Feb 2026',
    targetDate: new Date('2026-02-28'),
    description: 'Final payment for the 2026 tax year. This is the "Fortress Check" to ensure no underestimation penalties erosion your capital.',
    impact: 'Protect personal liquidity and avoid the 20% underestimation penalty.',
    checklist: ['Verify total 2026 earnings', 'Calculate estimated tax liability', 'Reserve capital for IRP6 payment'],
    category: 'individual',
    financialImpact: 'High Capital Outflow',
    strategicPillar: 'Liquidity Lock-Down'
  },
  {
    id: 'itr12t',
    title: 'Trust Tax Returns (ITR12T)',
    date: '19 Jan 2026',
    targetDate: new Date('2026-01-19'),
    description: 'The intergenerational safety net. Final submission for Trust-specific declarations.',
    impact: 'Ensures the "Family Vault" remains compliant and tax-efficient.',
    checklist: ['Review Trust deed compliance', 'Finalise beneficiary distributions', 'Upload Section 7(C) loan accounts'],
    category: 'individual',
    strategicPillar: 'Gap Audit'
  },
  // Corporate
  {
    id: 'cipc-annual',
    title: 'CIPC Annual Returns',
    date: 'Anniversary Month',
    targetDate: new Date('2026-03-31'), 
    description: 'Mandatory annual declaration. Failure triggers automatic deregistration and asset freezing.',
    impact: 'Maintain your legal "Right to Exist" and operational sovereignty.',
    checklist: ['File Beneficial Ownership (BO) disclosure', 'Submit Annual Financial Statements', 'Pay prescribed fees'],
    category: 'corporate',
    strategicPillar: 'Tactical Accountability'
  },
  {
    id: 'emp501',
    title: 'SARS EMP501 Reconciliation',
    date: '31 May 2026',
    targetDate: new Date('2026-05-31'),
    description: 'Annual reconciliation of PAYE. SARS uses this for real-time audit triangulation.',
    impact: 'Critical data hygiene; avoids the "Red Flag" audit trigger.',
    checklist: ['Verify employee tax numbers', 'Reconcile IRP5 certificates', 'Audit payroll vs medical aid'],
    category: 'corporate',
    financialImpact: 'Data Integrity Audit',
    strategicPillar: 'Risk Signalization'
  },
  {
    id: 'vat-q1',
    title: 'VAT Period 02/2026',
    date: '25 Mar 2026',
    targetDate: new Date('2026-03-25'),
    description: 'Quarterly VAT declaration. The primary liquidity event for many founders.',
    impact: 'Avoid the 10% late payment penalty and daily interest.',
    checklist: ['Verify all Tax Invoices', 'Reconcile Input vs Output VAT', 'Forecast cash reserve for payment'],
    category: 'corporate',
    financialImpact: 'Significant Cash Outflow',
    strategicPillar: 'Liquidity Lock-Down'
  },
  {
    id: 'due-diligence',
    title: 'Quarterly Compliance Pulse',
    date: 'Continuous Audit',
    targetDate: new Date('2026-06-30'),
    description: 'The "Sale-Ready" continuous audit protocol. Keeping your data investor-grade 365 days a year.',
    impact: 'Adds 10-20% to valuation by proving organizational maturity.',
    checklist: ['Audit Director Loan accounts', 'Review inter-company agreements', 'Verify minute book records'],
    category: 'corporate',
    strategicPillar: 'Sale-Ready Audit'
  },
  // NPO
  {
    id: 'npo-digital',
    title: 'DSD Digital Migration',
    date: '27 Feb 2026',
    targetDate: new Date('2026-02-27'),
    description: 'Transition to the new online NPO framework. Mandatory for donor-readiness.',
    impact: 'Keeps your NPO status "Active" in the national database.',
    checklist: ['Audit current DSD status', 'Digitize constitution & board IDs', 'Submit updated office bearer list'],
    category: 'npo',
    strategicPillar: 'Tactical Accountability'
  },
  {
    id: 'it3d',
    title: 'Section 18A Third-Party Data',
    date: '31 May 2026',
    targetDate: new Date('2026-05-31'),
    description: 'New mandatory data submission for donor tax certificates.',
    impact: 'Maintains donor trust. Without this, their tax breaks are rejected.',
    checklist: ['Validate donor IT numbers', 'Export IT3(d) XML from systems', 'Issue Section 18A receipts'],
    category: 'npo',
    financialImpact: 'Donor Retention Risk',
    strategicPillar: 'Risk Signalization'
  }
];

const ComplianceTracker: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('corporate');
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string, index: number) => {
    const key = `${id}-${index}`;
    setCompletedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateProgress = (id: string, checklist: string[]) => {
    const total = checklist.length;
    const completed = checklist.filter((_, i) => completedItems[`${id}-${i}`]).length;
    return Math.round((completed / total) * 100);
  };

  const getDaysLeft = (target: Date) => {
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const getStatus = (days: number) => {
    if (days <= 7) return { label: 'Immediate Action', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' };
    if (days <= 30) return { label: 'Active Focus', color: 'text-brand-gold', bg: 'bg-brand-gold/10', border: 'border-brand-gold/20' };
    return { label: 'Safe Harbor', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
  };

  const filteredMilestones = MILESTONES.filter(m => m.category === activeCategory);

  const handleExportPDF = () => {
    generatePDFReport({
      title: `${activeCategory.toUpperCase()} GOVERNANCE ROADMAP`,
      subtitle: "Mandatory Statutory & Fiscal Obligations | 2026 Cycle",
      sections: [
        {
          heading: "Operational Guardrails Checklist",
          content: "The following milestones represent the baseline requirements for your entity's sovereignty. Maintaining compliance is the primary driver of institutional bankability.",
          table: {
            headers: ["Obligation", "Due Date", "Strategic Impact"],
            rows: filteredMilestones.map(m => [m.title, m.date, m.impact])
          }
        },
        {
          heading: "Structural Risk Mitigation",
          content: [
            "Provisional Tax must be calculated based on 2026 projected revenue to avoid Section 89Quat interest.",
            "CIPC status should be verified monthly to prevent administrative deregistration.",
            "Trust Distributions must be documented in board minutes at the time of award."
          ]
        }
      ]
    }, `IWS_Roadmap_${activeCategory}.pdf`);
  };

  const handleExportCSV = () => {
    const csvData = filteredMilestones.map(m => ({
      Title: m.title,
      Deadline: m.date,
      Strategic_Impact: m.impact,
      Category: m.category,
      Financial_Warning: m.financialImpact || 'N/A'
    }));
    generateCSVExport(csvData, `IWS_Deadlines_${activeCategory}.csv`);
  };

  return (
    <div className="bg-slate-950 min-h-screen pt-40 pb-32 font-sans text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Strategic Header */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5 backdrop-blur-md">
                <ShieldCheck size={16} className="text-brand-gold animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">The Strategic Defense Protocol</span>
              </div>
              <h1 className="text-7xl md:text-[9rem] font-sora font-extrabold tracking-tighter leading-[0.8]">
                OPERATIONAL <br/> <span className="text-brand-gold italic">GUARDRAILS.</span>
              </h1>
            </div>
            <div className="md:w-1/3 space-y-6">
              <p className="text-xl text-white/50 font-medium leading-relaxed border-l-2 border-brand-gold/40 pl-8">
                We transform regulatory panic into <span className="text-white font-bold">Systemic Predictability</span>. This is the heartbeat of your business sovereignty.
              </p>
              
              {/* Tactical Export Nodes */}
              <div className="flex gap-4">
                 <button 
                  onClick={handleExportPDF}
                  className="flex-1 flex items-center justify-center gap-3 bg-brand-900 border border-white/10 rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest text-brand-gold hover:bg-brand-gold hover:text-brand-900 transition-all shadow-2xl"
                 >
                    <Download size={14} /> Roadmap PDF
                 </button>
                 <button 
                  onClick={handleExportCSV}
                  className="flex-1 flex items-center justify-center gap-3 bg-brand-900 border border-white/10 rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest text-brand-gold hover:bg-brand-gold hover:text-brand-900 transition-all shadow-2xl"
                 >
                    <FileSpreadsheet size={14} /> Ledger CSV
                 </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Category Switcher */}
        <div className="flex justify-center mb-20">
          <div className="bg-black/40 p-2 rounded-[2.5rem] flex gap-2 border border-white/5 backdrop-blur-xl shadow-inner">
            {[
              { id: 'individual', label: 'Personal Wealth', icon: <User size={16} /> },
              { id: 'corporate', label: 'The Enterprise', icon: <Building2 size={16} /> },
              { id: 'npo', label: 'The Mission', icon: <HeartHandshake size={16} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as Category)}
                className={`flex items-center gap-3 px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeCategory === tab.id ? 'bg-brand-gold text-brand-900 shadow-[0_15px_30px_rgba(212,175,55,0.4)] scale-105' : 'text-white/30 hover:text-white'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Milestone Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredMilestones.map((m, idx) => {
            const daysLeft = getDaysLeft(m.targetDate);
            const status = getStatus(daysLeft);
            const progress = calculateProgress(m.id, m.checklist);

            return (
              <RevealOnScroll key={m.id} delay={idx * 0.1} width="100%">
                <div className={`group bg-white/5 border-2 ${status.border} p-12 md:p-16 rounded-[4rem] backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:shadow-brand-gold/5 h-full flex flex-col relative overflow-hidden`}>
                  
                  {m.financialImpact && (
                    <div className="absolute top-10 right-10 flex items-center gap-2 px-4 py-2 bg-rose-500/5 rounded-full border border-rose-500/10 text-rose-500">
                       <TrendingDown size={14} />
                       <span className="text-[10px] font-black uppercase tracking-widest">{m.financialImpact}</span>
                    </div>
                  )}

                  <div className="mb-12">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${status.bg} ${status.color} text-[10px] font-black uppercase tracking-widest mb-6`}>
                      <Clock size={12} />
                      {status.label}
                    </div>
                    {m.strategicPillar && (
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold mb-2">{m.strategicPillar}</p>
                    )}
                    <h3 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">{m.title}</h3>
                    <p className="text-sm font-bold text-white/20 uppercase tracking-[0.3em]">{m.date}</p>
                  </div>

                  <p className="text-lg text-white/60 font-medium leading-relaxed mb-12 flex-grow border-l-2 border-brand-gold/20 pl-8 italic">
                    "{m.description}"
                  </p>

                  <div className="space-y-6 mb-12">
                     <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.5em]">The Clean Sweep Protocol</p>
                     <div className="grid gap-3">
                        {m.checklist.map((item, i) => (
                          <button 
                            key={i} 
                            onClick={() => toggleCheck(m.id, i)}
                            className="flex items-center gap-5 p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-brand-gold hover:bg-white/5 transition-all text-left group/btn"
                          >
                             <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all flex-shrink-0 ${completedItems[`${m.id}-${i}`] ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 'border-white/10 bg-black/20'}`}>
                                {completedItems[`${m.id}-${i}`] && <CheckCircle2 size={16} />}
                             </div>
                             <span className={`text-sm font-bold ${completedItems[`${m.id}-${i}`] ? 'text-emerald-500/40 line-through' : 'text-white/80'}`}>
                                {item}
                             </span>
                          </button>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between items-end">
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Structural Integrity</p>
                        <p className={`text-[10px] font-black ${progress === 100 ? 'text-emerald-500' : 'text-brand-gold'}`}>{progress}% SECURED</p>
                     </div>
                     <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ease-out ${progress === 100 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-brand-gold'}`} 
                          style={{ width: `${progress}%` }} 
                        />
                     </div>
                  </div>

                  <div className="mt-12 pt-10 border-t border-white/5 flex items-center gap-5">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${status.bg} ${status.color} shadow-sm border border-white/5`}>
                        <Info size={22} />
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-brand-gold uppercase tracking-widest mb-1">Defense Link</p>
                        <p className="text-sm font-bold text-white/40 leading-tight">
                           {m.impact}
                        </p>
                     </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComplianceTracker;
