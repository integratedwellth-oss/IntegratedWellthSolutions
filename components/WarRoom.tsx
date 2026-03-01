import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Radio, Activity, Skull, AlertTriangle, Timer, Clock, CheckCircle, FileText, Sparkles, Loader2, Cpu, ArrowRight, Lock, MessageSquare, Mail, Scale, List, ChevronRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { createChatSession, sendMessageStream } from '../services/geminiService';

type StreamType = 'stress' | 'protocol' | 'calendar' | 'alpha';

const STREAM_LABELS: Record<StreamType, string> = {
  stress: 'COMPLIANCE AUDIT',
  protocol: 'THE ESCAPE PLAN',
  calendar: 'URGENT DEADLINES',
  alpha: 'SEND TO ARCHITECTS'
};

const WarRoom: React.FC = () => {
  const [bootSequence, setBootSequence] = useState(true);
  const [activeStream, setActiveStream] = useState<StreamType>('stress');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  const [formData, setFormData] = useState({ identifier: '', enterprise: '', email: '', whatsapp: '' });
  const [complianceScore, setComplianceScore] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getComplianceAnalysis = (val: number) => {
    if (val === 0) return { label: "CRITICAL NON-COMPLIANCE", color: "text-rose-600", definition: "You have missed multiple submissions. SARS/CIPC likely views your entity as dormant or delinquent.", consequence: "IMMINENT DEREGISTRATION AND ASSET FREEZE.", solution: "Emergency CIPC Restoration and Tax Amnesty Application", risk: "CATASTROPHIC" };
    if (val === 1) return { label: "SERIOUS ARREARS", color: "text-rose-500", definition: "You are filing late or incorrectly. Penalties are compounding daily.", consequence: "SARS PENALTIES AND INTEREST ACCUMULATION.", solution: "Forensic Accounting Catch-Up and Payment Arrangement", risk: "DANGEROUS" };
    if (val === 2) return { label: "PROCEDURAL LAG", color: "text-brand-gold", definition: "You file, but it's chaotic. You are missing deductions and overpaying tax.", consequence: "CASH FLOW LEAKS VIA FINES AND MISSED DEDUCTIONS.", solution: "Operational Compliance Overhaul", risk: "MODERATE" };
    if (val === 3) return { label: "REACTIVE COMPLIANCE", color: "text-brand-gold", definition: "You are compliant, but it consumes all your time. You work for the auditors.", consequence: "FOUNDER BURNOUT AND STRATEGIC BLINDNESS.", solution: "Automation and Retainer Partnership", risk: "STRESSFUL" };
    return { label: "SOVEREIGN STATUS", color: "text-emerald-400", definition: "Automated, predictive, and error-free. Your compliance is an asset, not a chore.", consequence: "NONE. SYSTEM IS AUDIT-PROOF.", solution: "Wealth Preservation and Legacy Structuring", risk: "SECURE" };
  };

  const deadlinesSummary = [
    { title: "Trust Tax Returns (ITR12T)", date: "Jan 19, 2026", targetDate: new Date('2026-01-19') },
    { title: "VAT Submission", date: "Feb 25, 2026", targetDate: new Date('2026-02-25') },
    { title: "Provisional Tax (IRP6)", date: "Feb 28, 2026", targetDate: new Date('2026-02-28') },
  ];

  const getDaysLeft = (target: Date) => {
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    setTransmissionLogs([]);
    const logs = ["ANALYZING DATA...", "MATCHING PROTOCOLS...", "UPLINKING TO HQ...", "SECURE."];
    for (const log of logs) {
      setTransmissionLogs(prev => [...prev, log]);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const analysis = getComplianceAnalysis(complianceScore);
      const leadPayload = {
        name: formData.identifier,
        company: formData.enterprise,
        email: formData.email,
        whatsapp: formData.whatsapp,
        segment: analysis.label,
        data: { risk: analysis.risk, problem: analysis.consequence, solution: analysis.solution },
        timestamp: serverTimestamp(),
      };

      if (db) {
        await addDoc(collection(db, 'war_room_leads'), leadPayload);
        await addDoc(collection(db, 'mail'), {
          to: formData.email,
          message: {
            subject: `ACTION REQUIRED: ${formData.enterprise} Compliance Report`,
            html: `<div style="font-family:sans-serif;color:#134e4a;padding:20px;"><h1>AUDIT COMPLETE</h1><p>Status: ${analysis.label}</p><p>Threat: ${analysis.consequence}</p><p>Solution: ${analysis.solution}</p><p><a href="https://calendly.com/enquiries-integratedwellth/30min">BOOK FREE CONSULTATION</a></p></div>`
          }
        });
      }
      setIsSuccess(true);
    } catch (error) { alert("Uplink failed. Try again."); }
    setIsTransmitting(false);
  };

  const renderContent = () => {
    if (isSuccess) return (
      <div className="space-y-12 animate-fadeIn py-10 text-center">
        <CheckCircle size={80} className="text-brand-gold mx-auto animate-bounce" />
        <h2 className="text-4xl font-black text-white uppercase">Plan Deployed</h2>
        <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="w-full bg-brand-gold text-brand-900 py-6 rounded-full font-black uppercase shadow-2xl hover:scale-105 transition-all">Book Free Consultation</button>
      </div>
    );

    if (isTransmitting) return (
      <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
        <div className="w-24 h-24 rounded-full border-4 border-brand-gold/10 border-t-brand-gold animate-spin mb-10"></div>
        <div className="w-full max-w-sm bg-black/40 rounded-3xl p-6 border border-white/10">
          {transmissionLogs.map((log, i) => (
            <div key={i} className="flex items-center gap-3 text-[11px] text-brand-gold mb-2 font-mono"><List size={12}/> {log}</div>
          ))}
        </div>
      </div>
    );

    if (activeStream === 'stress') {
      const analysis = getComplianceAnalysis(complianceScore);
      return (
        <div className="space-y-10 animate-fadeIn text-left">
          <h3 className="text-2xl font-black text-brand-gold uppercase">Compliance Audit</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-white/50 uppercase tracking-widest"><span>Non-Compliant</span><span>Sovereign</span></div>
            <input type="range" min="0" max="4" step="1" value={complianceScore} onChange={(e) => setComplianceScore(parseInt(e.target.value))} className="w-full h-4 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold" />
          </div>
          <div className="p-8 rounded-[2.5rem] border-2 border-white/10 bg-black/40">
            <p className="text-[10px] font-black uppercase text-white/40 mb-2">Status</p>
            <p className={`text-2xl font-black mb-4 ${analysis.color}`}>{analysis.label}</p>
            <p className="text-white font-medium italic mb-6">"{analysis.definition}"</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div><p className="text-xs font-black uppercase text-rose-500 mb-2">Likely Consequence</p><p className="text-sm font-bold text-white">{analysis.consequence}</p></div>
              <div><p className="text-xs font-black uppercase text-emerald-400 mb-2">Our Solution</p><p className="text-sm font-bold text-emerald-400">{analysis.solution}</p></div>
            </div>
          </div>
          <button onClick={() => setActiveStream('alpha')} className="w-full bg-brand-gold text-brand-900 rounded-full py-6 font-black uppercase tracking-widest hover:bg-white transition-all">Get Detailed Report</button>
        </div>
      );
    }

    if (activeStream === 'protocol') return (
      <div className="space-y-6 animate-fadeIn text-left">
        <h3 className="text-2xl font-black text-brand-gold uppercase">The Escape Plan</h3>
        {["THE AUDIT", "THE ARCHITECTURE", "IMPLEMENTATION", "FREEDOM"].map((t, i) => (
          <div key={i} className="p-6 bg-black/40 rounded-2xl border border-white/10 text-white font-black uppercase text-xs tracking-widest flex items-center gap-4 hover:border-brand-gold transition-colors">
            <span className="text-brand-gold">0{i+1}</span> {t}
          </div>
        ))}
        <button onClick={() => setActiveStream('alpha')} className="w-full bg-brand-gold text-brand-900 rounded-full py-6 font-black uppercase hover:bg-white transition-all">Initiate Plan</button>
      </div>
    );

    if (activeStream === 'calendar') return (
      <div className="space-y-6 animate-fadeIn text-left">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-2xl font-black text-brand-gold uppercase">Deadline Radar</h3>
          <button onClick={() => window.location.hash = '#compliance-calendar'} className="text-[10px] font-black text-white/50 hover:text-brand-gold transition-colors uppercase tracking-widest flex items-center gap-2">Access Full Calendar <ArrowRight size={12} /></button>
        </div>
        {deadlinesSummary.map((d, i) => {
          const days = getDaysLeft(d.targetDate);
          return (
            <div key={i} className={`p-6 rounded-2xl border-2 flex justify-between items-center ${days <= 30 ? 'border-rose-500 bg-rose-950/20' : 'border-white/10 bg-black/40'}`}>
              <div><p className="font-black text-white text-xs uppercase mb-1">{d.title}</p><p className="text-[10px] text-white/40 uppercase font-mono">{d.date}</p></div>
              <div className={`font-black text-sm ${days <= 30 ? 'text-rose-500' : 'text-brand-gold'}`}>{days} DAYS</div>
            </div>
          );
        })}
        <div className="p-4 bg-brand-gold/10 border border-brand-gold/20 rounded-xl text-center"><p className="text-[10px] text-brand-gold font-mono uppercase tracking-widest">&gt; SYSTEM NOTE: Full statutory timeline available in dedicated protocol.</p></div>
      </div>
    );

    return (
      <form onSubmit={handleSubmit} className="space-y-8 pt-10 text-left">
        <div className="grid md:grid-cols-2 gap-6">
          <input required className="w-full bg-black/40 border-2 border-white/10 rounded-xl px-6 py-4 text-white font-bold outline-none focus:border-brand-gold transition-colors" placeholder="FULL NAME" value={formData.identifier} onChange={(e) => setFormData({...formData, identifier: e.target.value})} />
          <input required className="w-full bg-black/40 border-2 border-white/10 rounded-xl px-6 py-4 text-white font-bold outline-none focus:border-brand-gold transition-colors" placeholder="BUSINESS NAME" value={formData.enterprise} onChange={(e) => setFormData({...formData, enterprise: e.target.value})} />
        </div>
        <input required type="email" className="w-full bg-black/40 border-2 border-white/10 rounded-xl px-6 py-4 text-white font-bold outline-none focus:border-brand-gold transition-colors" placeholder="EMAIL ADDRESS" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <button type="submit" className="w-full bg-brand-gold text-brand-900 rounded-full py-6 font-black uppercase shadow-xl hover:scale-105 hover:bg-white transition-all">Get A Detailed Report</button>
      </form>
    );
  };

  if (bootSequence) return <div className="fixed inset-0 z-[1000] bg-brand-900 flex items-center justify-center text-brand-gold font-mono uppercase tracking-[0.5em] animate-pulse">Starting War Room Protocol...</div>;

  return (
    <div className="min-h-screen bg-brand-900 text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-12 text-left">
          <h1 className="text-6xl md:text-7xl font-sora font-black tracking-tighter leading-none">THE WAR <br/><span className="text-brand-gold italic">ROOM.</span></h1>
          <p className="text-xl md:text-2xl border-l-4 border-brand-gold pl-8 text-white/70 italic leading-relaxed">Stop guessing. Get the data. Stay Sovereign.</p>
        </div>
        <div className="lg:col-span-7">
          <div className="bg-slate-950/60 border border-white/20 rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl min-h-[600px] flex flex-col">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-10">
              {Object.keys(STREAM_LABELS).map((id) => (
                <button key={id} onClick={() => setActiveStream(id as StreamType)} className={`p-4 rounded-xl border-2 transition-all text-[8px] md:text-[9px] font-black uppercase tracking-widest ${activeStream === id ? 'bg-brand-gold text-brand-900 border-brand-gold shadow-xl' : 'text-white/40 border-transparent hover:bg-white/5'}`}>{STREAM_LABELS[id as StreamType]}</button>
              ))}
            </div>
            <div className="flex-1">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;
