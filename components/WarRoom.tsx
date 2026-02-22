import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Radio, Activity, Skull, AlertTriangle, Timer, Clock, CheckCircle, FileText, Sparkles, Loader2, Cpu, ArrowRight, Lock, MessageSquare, Mail, Scale, List } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { generatePDFReport } from '../services/exportService';
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
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const chatRef = useRef<any>(null);

  const [formData, setFormData] = useState({ identifier: '', enterprise: '', email: '', whatsapp: '', parameters: '' });
  const [complianceScore, setComplianceScore] = useState(1); 

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getComplianceAnalysis = (val: number) => {
    if (val === 0) return { label: "CRITICAL NON-COMPLIANCE", color: "text-rose-600", consequence: "IMMINENT DEREGISTRATION & ASSET FREEZE.", solution: "Emergency CIPC Restoration & Tax Amnesty Application", risk: "CATASTROPHIC" };
    if (val === 1) return { label: "SERIOUS ARREARS", color: "text-rose-500", consequence: "200% SARS PENALTIES & INTEREST.", solution: "Forensic Accounting Catch-Up & Payment Arrangement", risk: "DANGEROUS" };
    if (val === 2) return { label: "PROCEDURAL LAG", color: "text-brand-gold", consequence: "CASH FLOW LEAKS VIA FINES.", solution: "Operational Compliance Overhaul", risk: "MODERATE" };
    if (val === 3) return { label: "REACTIVE COMPLIANCE", color: "text-brand-gold", consequence: "FOUNDER BURNOUT & BLINDNESS.", solution: "Automation & Retainer Partnership", risk: "STRESSFUL" };
    return { label: "SOVEREIGN STATUS", color: "text-emerald-400", consequence: "NONE. SYSTEM IS AUDIT-PROOF.", solution: "Wealth Preservation & Legacy Structuring", risk: "SECURE" };
  };

  const deadlines = [
    { title: "Trust Tax Returns (ITR12T)", date: "Jan 19, 2026", targetDate: new Date('2026-01-19') },
    { title: "VAT Submission", date: "Feb 25, 2026", targetDate: new Date('2026-02-25') },
    { title: "Provisional Tax (IRP6)", date: "Feb 28, 2026", targetDate: new Date('2026-02-28') }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    setTransmissionLogs([]);
    const logs = ["ANALYZING COMPLIANCE GAP...", "MATCHING SOLUTION PROTOCOL...", "UPLINKING TO HQ...", "SECURE."];
    
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
        detailed_intelligence: { risk_status: analysis.label, immediate_threat: analysis.consequence, required_solution: analysis.solution },
        timestamp: serverTimestamp(),
      };
      
      if (db) {
        await addDoc(collection(db, 'war_room_leads'), leadPayload);
        await addDoc(collection(db, 'mail'), {
          to: formData.email,
          message: {
            subject: `⚠️ ACTION REQUIRED: ${formData.enterprise} Compliance Report`,
            html: `<h1>Strategic Alert</h1><p>Risk: ${analysis.label}</p><p>Solution: ${analysis.solution}</p><p><a href="https://calendly.com/enquiries-integratedwellth/30min">Book Call</a></p>`
          }
        });
      }
      setIsSuccess(true);
    } catch (error) { console.error(error); }
    setIsTransmitting(false);
  };

  const renderContent = () => {
    if (isSuccess) return (
      <div className="space-y-12 animate-fadeIn py-10 text-center text-white">
        <CheckCircle size={80} className="text-brand-gold mx-auto animate-bounce" />
        <h2 className="text-4xl font-black uppercase">PLAN DEPLOYED.</h2>
        <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="w-full bg-brand-gold text-brand-900 py-6 rounded-full font-black uppercase tracking-widest text-sm shadow-2xl">Book Your Free Consultation Now</button>
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
        <div className="space-y-10 animate-fadeIn">
          <h3 className="text-2xl font-black text-brand-gold uppercase tracking-tighter">Compliance Audit</h3>
          <input type="range" min="0" max="4" step="1" value={complianceScore} onChange={(e) => setComplianceScore(parseInt(e.target.value))} className="w-full h-6 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold" />
          <div className="p-8 rounded-[2.5rem] border-2 border-rose-500/50 bg-rose-950/20">
             <p className="text-lg font-bold text-white mb-4">{analysis.consequence}</p>
             <p className="text-lg font-bold text-brand-gold flex items-center gap-2"><Scale size={20}/> {analysis.solution}</p>
          </div>
          <button onClick={() => setActiveStream('alpha')} className="w-full bg-brand-gold text-brand-900 rounded-full py-6 font-black uppercase tracking-widest shadow-xl">Get Detailed Report</button>
        </div>
      );
    }

    if (activeStream === 'protocol') return (
      <div className="space-y-4 animate-fadeIn">
        {["THE AUDIT", "THE ARCHITECTURE", "IMPLEMENTATION", "FREEDOM"].map((t, i) => (
          <div key={i} className="p-6 bg-black/40 rounded-2xl border border-white/10 text-white font-black uppercase text-xs tracking-widest">Step 0{i+1}: {t}</div>
        ))}
      </div>
    );

    if (activeStream === 'calendar') return (
      <div className="space-y-4 animate-fadeIn">
        {deadlines.map((d, i) => (
          <div key={i} className="p-6 bg-black/40 rounded-2xl border border-rose-500/30 flex justify-between items-center">
            <span className="font-black text-white text-xs uppercase">{d.title}</span>
            <span className="text-brand-gold font-mono">{d.date}</span>
          </div>
        ))}
      </div>
    );

    return (
      <form onSubmit={handleSubmit} className="space-y-8 pt-10">
        <div className="grid md:grid-cols-2 gap-6">
          <input required className="w-full bg-black/40 border-2 border-white/10 rounded-xl px-6 py-4 text-white font-bold" placeholder="NAME" value={formData.identifier} onChange={(e) => setFormData({...formData, identifier: e.target.value})} />
          <input required className="w-full bg-black/40 border-2 border-white/10 rounded-xl px-6 py-4 text-white font-bold" placeholder="BUSINESS" value={formData.enterprise} onChange={(e) => setFormData({...formData, enterprise: e.target.value})} />
        </div>
        <input required type="email" className="w-full bg-black/40 border-2 border-white/10 rounded-xl px-6 py-4 text-white font-bold" placeholder="EMAIL" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <button type="submit" className="w-full bg-brand-gold text-brand-900 rounded-full py-6 font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105">Get A Detailed Report</button>
      </form>
    );
  };

  if (bootSequence) return <div className="fixed inset-0 z-[1000] bg-brand-900 flex items-center justify-center text-brand-gold font-mono uppercase tracking-[0.5em]">Starting War Room Protocol...</div>;

  return (
    <div className="min-h-screen bg-brand-900 text-white pt-48 pb-32 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-12">
           <h1 className="text-7xl font-sora font-black tracking-tighter leading-none">THE WAR <br/><span className="text-brand-gold italic">ROOM.</span></h1>
           <p className="text-2xl border-l-4 border-brand-gold pl-10 text-white/70 italic">Compliance is binary. You are either Safe or Exposed.</p>
        </div>
        <div className="lg:col-span-7">
           <div className="bg-slate-900/60 border border-white/20 rounded-[4rem] p-10 backdrop-blur-3xl shadow-2xl min-h-[750px] flex flex-col">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12">
                {Object.keys(STREAM_LABELS).map((id) => (
                  <button key={id} onClick={() => setActiveStream(id as StreamType)} className={`p-4 rounded-2xl border-2 transition-all text-[9px] font-black uppercase tracking-widest ${activeStream === id ? 'bg-brand-gold text-brand-900 border-white' : 'text-white/40 border-transparent hover:bg-white/5'}`}>{STREAM_LABELS[id as StreamType]}</button>
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
