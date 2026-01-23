import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Radio, Activity, Skull, AlertTriangle, Timer, Clock, CheckCircle, FileText, Sparkles, Loader2, Cpu, ArrowRight, Lock, MessageSquare, Mail, Scale, ChevronRight } from 'lucide-react';
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

  const [formData, setFormData] = useState({ 
    identifier: '', 
    enterprise: '', 
    email: '',
    whatsapp: '',
    parameters: '' 
  });
  
  // New Metric: Compliance Health (0 = Years Behind, 4 = Perfect)
  const [complianceScore, setComplianceScore] = useState(1); 

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getComplianceAnalysis = (val: number) => {
    if (val === 0) return { 
      label: "CRITICAL NON-COMPLIANCE", 
      color: "text-rose-600", 
      consequence: "IMMINENT DEREGISTRATION & ASSET FREEZE.",
      solution: "Emergency CIPC Restoration & Tax Amnesty Application",
      risk: "CATASTROPHIC"
    };
    if (val === 1) return { 
      label: "SERIOUS ARREARS", 
      color: "text-rose-500", 
      consequence: "200% SARS PENALTIES & INTEREST ACCUMULATION.",
      solution: "Forensic Accounting Catch-Up & Payment Arrangement",
      risk: "DANGEROUS"
    };
    if (val === 2) return { 
      label: "PROCEDURAL LAG", 
      color: "text-brand-gold", 
      consequence: "CASH FLOW LEAKS VIA FINES & MISSED DEDUCTIONS.",
      solution: "Operational Compliance Overhaul",
      risk: "MODERATE"
    };
    if (val === 3) return { 
      label: "REACTIVE COMPLIANCE", 
      color: "text-brand-gold", 
      consequence: "FOUNDER BURNOUT & STRATEGIC BLINDNESS.",
      solution: "Automation & Retainer Partnership",
      risk: "STRESSFUL"
    };
    return { 
      label: "SOVEREIGN STATUS", 
      color: "text-emerald-400", 
      consequence: "NONE. SYSTEM IS AUDIT-PROOF.",
      solution: "Wealth Preservation & Legacy Structuring",
      risk: "SECURE"
    };
  };

  const deadlines = [
    { title: "Trust Tax Returns (ITR12T)", date: "Jan 19, 2026", targetDate: new Date('2026-01-19') },
    { title: "VAT Submission", date: "Feb 25, 2026", targetDate: new Date('2026-02-25') },
    { title: "Provisional Tax (IRP6)", date: "Feb 28, 2026", targetDate: new Date('2026-02-28') },
    { title: "CIPC Company Renewal", date: "Mar 31, 2026", targetDate: new Date('2026-03-31') },
    { title: "Staff Tax (EMP501)", date: "May 31, 2026", targetDate: new Date('2026-05-31') }
  ];

  const getDaysLeft = (target: Date) => {
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const handleAiAppraisal = async () => {
    const analysis = getComplianceAnalysis(complianceScore);
    setIsAnalyzing(true);
    setAiAnalysis('');
    if (!chatRef.current) chatRef.current = createChatSession();

    const prompt = `Business Risk Diagnostic. 
    Current Status: ${analysis.label}. 
    Consequence: ${analysis.consequence}.
    Recommended Solution: ${analysis.solution}.
    Provide a brutal 3-sentence reality check on why they need to book a consultation immediately. Don't be polite, be factual.`;

    try {
      const stream = await sendMessageStream(chatRef.current, prompt);
      let fullText = '';
      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          setAiAnalysis(fullText);
        }
      }
    } catch (e) {
      setAiAnalysis("### CONNECTION ERROR\nCould not reach the advisor. Your compliance risk remains **CRITICAL**.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    setTransmissionLogs([]);
    const logs = ["ANALYZING COMPLIANCE GAP...", "MATCHING SOLUTION PROTOCOL...", "GENERATING RECOVERY PLAN...", "UPLINKING TO HQ...", "SECURE."];
    
    // Simulate log typing
    const addLog = (msg: string) => setTransmissionLogs(prev => [...prev, msg]);
    for (const log of logs) {
      addLog(log);
      await new Promise(r => setTimeout(r, 600));
    }
    
    try {
      const analysis = getComplianceAnalysis(complianceScore);
      
      // 1. DATA CAPTURE (With Solution & Pain Points)
      const leadPayload = {
        name: formData.identifier,
        company: formData.enterprise,
        email: formData.email,
        whatsapp: formData.whatsapp,
        segment: analysis.label, // Segmentation Key
        data: {
            risk_level: analysis.risk,
            pain_point: analysis.consequence,
            recommended_solution: analysis.solution 
        },
        timestamp: serverTimestamp(),
      };
      
      if (db) {
        // A. Store for Dashboard
        await addDoc(collection(db, 'war_room_leads'), leadPayload);

        // B. Trigger Email (Via Firebase Extensions)
        await addDoc(collection(db, 'mail'), {
          to: formData.email,
          message: {
            subject: `⚠️ ACTION REQUIRED: ${formData.enterprise} Compliance Report`,
            html: `
              <div style="font-family: Arial, sans-serif; color: #134e4a; padding: 20px;">
                <h1 style="color: #d4af37;">COMPLIANCE AUDIT RESULTS</h1>
                <p>Hello ${formData.identifier},</p>
                <p>Our War Room has analyzed your compliance standing against the current SARS/CIPC calendar.</p>
                
                <div style="background: #fef2f2; padding: 15px; border-left: 4px solid #e11d48; margin: 20px 0;">
                  <h3 style="color: #be123c; margin-top: 0;">⚠️ DIAGNOSIS: ${analysis.label}</h3>
                  <p><strong>Immediate Threat:</strong> ${analysis.consequence}</p>
                </div>

                <div style="background: #f0fdfa; padding: 15px; border-left: 4px solid #0d9488; margin: 20px 0;">
                   <h3 style="color: #0f766e; margin-top: 0;">✅ REQUIRED SOLUTION</h3>
                   <p><strong>Protocol:</strong> ${analysis.solution}</p>
                   <p>We need to execute this immediately to stop further liability.</p>
                </div>

                <p style="text-align: center; margin: 40px 0;">
                  <a href="https://calendly.com/enquiries-integratedwellth/30min" style="background-color: #d4af37; color: #000; padding: 15px 30px; text-decoration: none; font-weight: 900; border-radius: 50px; font-size: 16px;">BOOK YOUR FREE CONSULTATION</a>
                </p>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />

                <h3>🎟️ EXCLUSIVE SUMMIT INVITATION</h3>
                <p>Join Marcia Kgaphola at the <strong>Financial Clarity Summit</strong> on Feb 28, 2026.</p>
                <p><a href="https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/" style="color: #134e4a; font-weight: bold;">Secure Your Seat Here</a></p>
              </div>
            `
          }
        });
      }

      setIsTransmitting(false);
      setIsSuccess(true);
    } catch (error) {
      setIsTransmitting(false);
      alert("Transmission failed. Re-try uplink.");
    }
  };

  const handleDownloadIntel = () => {
    const analysis = getComplianceAnalysis(complianceScore);
    generatePDFReport({
      title: "COMPLIANCE RECOVERY PLAN",
      subtitle: `${formData.enterprise} | ${analysis.label}`,
      sections: [
        {
            heading: "Executive Summary",
            content: `Current Status: ${analysis.risk}. Immediate action required to prevent ${analysis.consequence}`
        },
        {
            heading: "Required Intervention",
            content: analysis.solution
        },
        {
          heading: "Next Steps",
          content: "1. Book Discovery Call with IWS.\n2. Hand over e-filing credentials for forensic review.\n3. Establish payment plan or dispute resolution."
        }
      ]
    }, `IWS_Recovery_Plan_${formData.enterprise}.pdf`);
  };

  if (bootSequence) {
    return (
      <div className="fixed inset-0 z-[1000] bg-brand-900 flex flex-col items-center justify-center p-6 text-brand-gold font-mono text-center">
        <Terminal size={24} className="animate-pulse mb-6" />
        <span className="text-[10px] uppercase tracking-[0.5em]">Starting War Room Protocol...</span>
      </div>
    );
  }

  const analysis = getComplianceAnalysis(complianceScore);

  return (
    <div className="min-h-screen bg-brand-900 text-white selection:bg-brand-gold/20 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-48 pb-32 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 backdrop-blur-md">
                <Radio size={14} className="text-brand-gold animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">IWS COMMAND CENTER ACTIVE</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-sora font-extrabold tracking-tighter leading-[0.8] mt-8">
                THE WAR <br/> <span className="text-brand-gold italic">ROOM.</span>
              </h1>
              <p className="text-2xl text-white font-medium leading-relaxed mt-10 border-l-4 border-brand-gold/40 pl-10">
                Compliance is binary. You are either <span className="text-emerald-400 font-bold">Safe</span> or you are <span className="text-rose-500 font-bold">Exposed</span>. Find out where you stand.
              </p>
            </RevealOnScroll>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'THREAT LEVEL', value: analysis.risk, icon: <AlertTriangle size={16} className={analysis.color} /> },
                { label: 'SYSTEM STATUS', value: 'LIVE MONITOR', icon: <Activity size={16} className="text-emerald-400 animate-pulse" /> },
              ].map((stat, i) => (
                <div key={i} className="bg-black/30 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl group hover:border-brand-gold/40 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    {stat.icon}
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{stat.label}</span>
                  </div>
                  <p className={`text-2xl font-black tracking-tighter uppercase ${stat.label === 'THREAT LEVEL' ? analysis.color : 'text-white'}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-slate-900/60 border border-white/20 rounded-[4rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden group min-h-[850px] flex flex-col">
                
                {/* Navigation */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12 bg-black/60 p-2 rounded-[2.5rem] border border-white/10">
                  {Object.keys(STREAM_LABELS).map((id) => (
                    <button
                      key={id}
                      onClick={() => setActiveStream(id as StreamType)}
                      className={`flex flex-col items-center justify-center p-4 rounded-[1.8rem] transition-all duration-300 relative border-2 ${activeStream === id ? 'bg-brand-gold text-brand-900 border-white shadow-[0_0_30px_rgba(212,175,55,0.3)] scale-105 z-10' : 'text-white border-transparent hover:bg-white/10'}`}
                    >
                      <span className={`text-[9px] font-black uppercase tracking-widest text-center leading-tight ${activeStream === id ? 'text-brand-900' : 'text-white'}`}>
                        {STREAM_LABELS[id as StreamType]}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex-1">
                   {isSuccess ? (
                    <div className="space-y-12 animate-fadeIn py-10 text-center">
                      <CheckCircle size={80} className="text-brand-gold mx-auto animate-bounce" />
                      <h2 className="text-4xl md:text-5xl font-sora font-black text-white uppercase tracking-tighter">PLAN DEPLOYED.</h2>
                      <p className="text-xl text-white/60 font-medium leading-relaxed">Your recovery strategy has been emailed to you.</p>
                      <button onClick={handleDownloadIntel} className="w-full flex items-center justify-center gap-4 py-8 rounded-[2.5rem] bg-brand-gold text-brand-900 font-black uppercase tracking-[0.4em] text-sm transition-all hover:scale-105 shadow-2xl">
                        <FileText size={18} /> DOWNLOAD RECOVERY PDF
                      </button>
                      <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="text-brand-gold font-bold text-sm hover:underline uppercase tracking-widest mt-4">
                        Book Your Free Consultation Now ->
                      </button>
                    </div>
                  ) : isTransmitting ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-10 py-20 animate-fadeIn">
                       <div className="w-24 h-24 rounded-full border-4 border-brand-gold/10 border-t-brand-gold animate-spin"></div>
                       <div className="w-full max-w-sm bg-black/40 rounded-3xl p-6 font-mono border border-white/10">
                          {transmissionLogs.map((log, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] text-brand-gold mb-2">
                               {/* REPLACED UNSAFE TEXT WITH ICON */}
                               <ChevronRight size={12} /> {log}
                            </div>
                          ))}
                       </div>
                    </div>
                  ) : activeStream === 'stress' ? (
                      // COMPLIANCE AUDIT UI
                      <div className="space-y-10 animate-fadeIn">
                         <div className="space-y-4">
                             <h3 className="text-2xl font-black text-brand-gold uppercase tracking-tighter">Where is your Compliance At?</h3>
                             <p className="text-white/60 text-sm">Drag the slider to match your current situation.</p>
                         </div>
                         
                         <div className="flex justify-between items-center bg-black/60 p-8 rounded-[2rem] border border-white/10">
                             <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Current Status</span>
                                <span className={`text-2xl md:text-3xl font-black ${analysis.color}`}>{analysis.label}</span>
                             </div>
                          </div>
                          
                          <input type="range" min="0" max="4" step="1" value={complianceScore} onChange={(e) => setComplianceScore(parseInt(e.target.value))} className="w-full h-6 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold" />
                          <div className="flex justify-between text-[10px] font-black text-white/30 uppercase tracking-widest px-2">
                             <span>Critical</span>
                             <span>Sovereign</span>
                          </div>

                          {/* DYNAMIC RISK & SOLUTION BOX */}
                          <div className={`p-8 rounded-[2.5rem] border-2 ${complianceScore < 3 ? 'border-rose-500/50 bg-rose-950/20' : 'border-emerald-500/50 bg-emerald-950/20'} transition-all`}>
                             <div className="mb-6">
                                <p className="text-[10px] font-black uppercase text-white/50 tracking-widest mb-2">Likely Consequence</p>
                                <p className="text-lg md:text-xl font-bold text-white leading-tight">{analysis.consequence}</p>
                             </div>
                             <div>
                                <p className="text-[10px] font-black uppercase text-brand-gold tracking-widest mb-2">Required Solution</p>
                                <div className="flex items-center gap-3">
                                   <Scale className="text-brand-gold" size={20} />
                                   <p className="text-lg font-bold text-brand-gold">{analysis.solution}</p>
                                </div>
                             </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <button onClick={handleAiAppraisal} disabled={isAnalyzing} className="flex items-center justify-center gap-4 bg-white/10 border border-white/20 text-white rounded-[2rem] py-6 font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-white/20">
                              {isAnalyzing ? <Loader2 className="animate-spin" size={16} /> : <Cpu size={16} />} ANALYZE RISK
                            </button>
                            {complianceScore < 3 && (
                                <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="bg-rose-600 text-white rounded-[2rem] py-6 font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2">
                                  STOP THE BLEED <ArrowRight size={16} />
                                </button>
                            )}
                          </div>
                          {aiAnalysis && (
                             <div className="p-8 bg-brand-gold/10 border-l-4 border-brand-gold text-white/90 rounded-r-2xl text-sm leading-relaxed">
                                {aiAnalysis}
                             </div>
                          )}
                      </div>
                   ) : activeStream === 'protocol' ? (
                     <div className="space-y-8 animate-fadeIn">
                        <h3 className="text-2xl font-black text-brand-gold uppercase tracking-tighter">THE 4-PHASE PROTOCOL</h3>
                        <div className="grid gap-4">
                          {[
                            { step: "01", title: "THE AUDIT", desc: "We find the leaks in your capital." },
                            { step: "02", title: "THE ARCHITECTURE", desc: "We design your legal fortress." },
                            { step: "03", title: "IMPLEMENTATION", desc: "We install the systems." },
                            { step: "04", title: "FREEDOM", desc: "You exit operations." }
                          ].map((p, idx) => (
                            <button 
                              key={idx} 
                              onClick={() => setSelectedPhase(idx)}
                              className={`flex gap-6 p-6 rounded-[2rem] border-2 transition-all text-left ${selectedPhase === idx ? 'bg-brand-gold border-white' : 'bg-black/40 border-white/10'}`}
                            >
                               <div className={`text-3xl font-black ${selectedPhase === idx ? 'text-brand-900' : 'text-brand-gold/30'}`}>{p.step}</div>
                               <div>
                                  <p className={`font-black uppercase text-xs mb-1 tracking-widest ${selectedPhase === idx ? 'text-brand-900' : 'text-white'}`}>{p.title}</p>
                                  <p className={`text-xs font-medium ${selectedPhase === idx ? 'text-brand-900/70' : 'text-white/50'}`}>{p.desc}</p>
                               </div>
                            </button>
                          ))}
                        </div>
                        <button onClick={() => setActiveStream('alpha')} className="w-full bg-brand-gold text-brand-900 rounded-[2rem] py-6 font-black uppercase tracking-[0.4em] text-xs transition-all hover:scale-105">
                            INITIATE PROTOCOL
                        </button>
                     </div>
                   ) : activeStream === 'calendar' ? (
                     <div className="space-y-8 animate-fadeIn">
                        <h3 className="text-2xl font-black text-brand-gold uppercase tracking-tighter">CRITICAL DATES</h3>
                        <div className="grid gap-4">
                          {deadlines.map((d, i) => {
                            const days = getDaysLeft(d.targetDate);
                            const isCritical = days <= 7;
                            return (
                              <div key={i} className={`flex justify-between items-center p-6 bg-black/60 border-2 rounded-[2rem] ${isCritical ? 'border-rose-500 bg-rose-950/20' : 'border-white/10'}`}>
                                 <div>
                                    <h4 className="text-sm font-black uppercase text-white">{d.title}</h4>
                                    <p className="text-[10px] text-white/50 uppercase tracking-widest">{d.date}</p>
                                 </div>
                                 <div className={`text-right font-black ${isCritical ? 'text-rose-500' : 'text-brand-gold'}`}>
                                    {days} DAYS
                                 </div>
                              </div>
                            );
                          })}
                        </div>
                     </div>
                   ) : (
                    <form onSubmit={handleSubmit} className="space-y-10 animate-fadeIn pt-10">
                      <div className="text-center mb-8">
                         <h3 className="text-2xl font-black text-white uppercase tracking-tighter">DEPLOY RECOVERY TEAM</h3>
                         <p className="text-white/60 text-sm mt-2">Submit your details to receive your customized <span className="text-brand-gold font-bold">Recovery Plan</span> & <span className="text-brand-gold font-bold">Compliance Calendar</span>.</p>
                      </div>
                      <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-brand-gold/60 ml-2">Your Identity</label>
                            <input required type="text" value={formData.identifier} onChange={(e) => setFormData({...formData, identifier: e.target.value})} className="w-full bg-black/60 border-2 border-white/10 rounded-[1.5rem] px-8 py-6 focus:border-brand-gold outline-none font-bold text-white text-base transition-all" placeholder="FOUNDER NAME" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-brand-gold/60 ml-2">Enterprise Name</label>
                            <input required type="text" value={formData.enterprise} onChange={(e) => setFormData({...formData, enterprise: e.target.value})} className="w-full bg-black/60 border-2 border-white/10 rounded-[1.5rem] px-8 py-6 focus:border-brand-gold outline-none font-bold text-white text-base transition-all" placeholder="BUSINESS LEGAL IDENTITY" />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-brand-gold/60 ml-2">Secure Email</label>
                            <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/60 border-2 border-white/10 rounded-[1.5rem] px-8 py-6 focus:border-brand-gold outline-none font-bold text-white text-base transition-all" placeholder="INTEL DESTINATION" />
                          </div>
                          <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-brand-gold/60 ml-2">WhatsApp Feed</label>
                            <input type="tel" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-black/60 border-2 border-white/10 rounded-[1.5rem] px-8 py-6 focus:border-brand-gold outline-none font-bold text-white text-base transition-all" placeholder="+27..." />
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-brand-gold text-brand-900 rounded-[2.5rem] py-10 font-black uppercase tracking-[0.5em] text-base transition-all hover:scale-105 shadow-2xl mt-12">
                        CONFIRM UPLINK <ArrowRight size={24} className="inline ml-6" />
                      </button>
                    </form>
                   )}
                </div>

                <div className="pt-12 mt-auto border-t border-white/10 flex items-center justify-between opacity-50">
                  <div className="flex items-center gap-3">
                    <Lock size={14} className="text-brand-gold" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">SECURE CHANNEL 256-BIT ENCRYPTED</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;
