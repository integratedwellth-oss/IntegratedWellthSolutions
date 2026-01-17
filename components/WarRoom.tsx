import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Radio, Activity, Skull, AlertTriangle, Timer, Clock, CheckCircle, FileText, Sparkles, Loader2, Cpu, ArrowRight, Lock, UserCheck, Briefcase, Mail, MessageSquare } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { generatePDFReport } from '../services/exportService';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

type StreamType = 'stress' | 'protocol' | 'calendar' | 'alpha';

const STREAM_LABELS: Record<StreamType, string> = {
  stress: 'BUSINESS STRESS TEST',
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
  
  // AI State
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
  
  const [dependency, setDependency] = useState(85); 
  const [sovereignty, setSovereignty] = useState(1); 

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getSovereigntyLabel = (val: number) => {
    if (val === 0) return { 
      label: "TOTAL BUSINESS COLLAPSE", 
      time: "24 HOURS",
      color: "text-rose-500", 
      desc: "Immediate failure. Your business stops the moment you stop working.",
      risk: "CATASTROPHIC"
    };
    if (val === 1) return { 
      label: "RAPID DECLINE", 
      time: "30 DAYS",
      color: "text-rose-400", 
      desc: "The business will die quickly. You have built a job, not an asset.",
      risk: "DANGEROUS"
    };
    if (val === 2) return { 
      label: "GRADUAL EROSION", 
      time: "90 DAYS",
      color: "text-brand-gold", 
      desc: "The business survives but loses money every day you are gone.",
      risk: "MODERATE"
    };
    if (val === 3) return { 
      label: "STABLE ASSET", 
      time: "1 YEAR",
      color: "text-brand-gold", 
      desc: "Your business has some systems, but it still needs you eventually.",
      risk: "CONTROLLED"
    };
    return { 
      label: "TOTAL FREEDOM", 
      time: "FOREVER",
      color: "text-emerald-400", 
      desc: "Perfect structure. The business makes money while you sleep.",
      risk: "NEUTRALIZED"
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
    const sov = getSovereigntyLabel(sovereignty);
    setIsAnalyzing(true);
    setAiAnalysis('');
    if (!chatRef.current) chatRef.current = createChatSession();

    const prompt = `Business Diagnostic Request. 
    Founder says business dies in ${sov.time} without them. 
    Risk: ${sov.risk}.
    Provide a 3-sentence reality check in SIMPLE English. Tell them why they are stuck and how to fix it. Start with '### AUDIT RESULTS RECEIVED'`;

    try {
      const stream = await sendMessageStream(chatRef.current, prompt);
      let fullText = '';
      for await (const chunk of stream) {
        const text = (chunk as GenerateContentResponse).text;
        if (text) {
          fullText += text;
          setAiAnalysis(fullText);
        }
      }
    } catch (e) {
      setAiAnalysis("### CONNECTION ERROR\nCould not reach the advisor. Your business risk remains **CRITICAL**.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addLog = (msg: string) => {
    setTransmissionLogs(prev => [...prev.slice(-4), msg]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    setTransmissionLogs([]);
    const logs = ["PREPARING DATA PACKETS...", "ENCRYPTING IDENTITY...", "OPENING ARCHITECT TUNNEL...", "SENDING DATA...", "UPLINK FINISHED."];
    for (const log of logs) {
      await new Promise(r => setTimeout(r, 600));
      addLog(log);
    }
    
    try {
      const sov = getSovereigntyLabel(sovereignty);
      const leadPayload = {
        name: formData.identifier,
        company: formData.enterprise,
        email: formData.email,
        whatsapp: formData.whatsapp,
        results: { survival: sov.time, risk: sov.risk, ai: aiAnalysis },
        timestamp: serverTimestamp(),
      };
      if (db) await addDoc(collection(db, 'war_room_leads'), leadPayload);
      setIsTransmitting(false);
      setIsSuccess(true);
    } catch (error) {
      setIsTransmitting(false);
      alert("Transmission failed. Re-try uplink.");
    }
  };

  const handleDownloadIntel = () => {
    const sov = getSovereigntyLabel(sovereignty);
    generatePDFReport({
      title: "YOUR FREEDOM PLAN",
      subtitle: `${formData.enterprise} | Strategic Brief`,
      sections: [
        {
          heading: "Step 1: The Business Audit (IQ + EQ)",
          content: "We find the messy accounting numbers (IQ) and the psychological stress points (EQ) that are keeping you trapped in the daily grind."
        },
        {
          heading: "Step 2: The Architecture",
          content: "We design a legal and tax fortress to protect your money and separate your personal life from business risks."
        },
        {
          heading: "Step 3: The Implementation",
          content: "We install AI systems and train your staff so you no longer have to handle every small problem yourself."
        },
        {
          heading: "Step 4: Total Sovereignty",
          content: "You step back and let the business work for you. You become the owner, not the employee."
        },
        {
          heading: "Current Stats",
          content: `Survival: ${sov.time} | Risk: ${sov.risk} | Diagnostic: ${sov.desc}`
        }
      ]
    }, `IWS_Freedom_Plan_${formData.enterprise}.pdf`);
  };

  if (bootSequence) {
    return (
      <div className="fixed inset-0 z-[1000] bg-brand-900 flex flex-col items-center justify-center p-6 text-brand-gold font-mono text-center">
        <Terminal size={24} className="animate-pulse mb-6" />
        <span className="text-[10px] uppercase tracking-[0.5em]">Starting War Room Protocol...</span>
        <div className="h-1 w-64 bg-white/10 rounded-full overflow-hidden mt-8">
          <div className="h-full bg-brand-gold animate-[scan_1.5s_linear_infinite]" style={{ width: '100%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-900 text-white selection:bg-brand-gold/20 relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
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
                Stop working FOR your business. Build a machine that works <span className="text-brand-gold font-black italic underline decoration-brand-gold decoration-4 underline-offset-8">FOR YOU.</span>
              </p>
            </RevealOnScroll>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'SURVIVAL TIME', value: getSovereigntyLabel(sovereignty).time, icon: <Skull size={16} className={getSovereigntyLabel(sovereignty).color} /> },
                { label: 'RISK LEVEL', value: getSovereigntyLabel(sovereignty).risk, icon: <AlertTriangle size={16} className={getSovereigntyLabel(sovereignty).color} /> },
                { label: 'FREEDOM SCORE', value: `${(100 - (dependency / 2) + sovereignty * 10).toFixed(0)}%`, icon: <Timer size={16} className="text-brand-gold" /> },
                { label: 'DATA FEED', value: 'LIVE', icon: <Activity size={16} className="text-brand-gold animate-pulse" /> },
              ].map((stat, i) => (
                <div key={i} className="bg-black/30 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl group hover:border-brand-gold/40 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    {stat.icon}
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-black tracking-tighter uppercase text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <RevealOnScroll delay={0.2}>
              <div className="bg-slate-900/60 border border-white/20 rounded-[4rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden group min-h-[850px] flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
                
                {/* Tactical Navigation */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12 bg-black/60 p-2 rounded-[2.5rem] border border-white/10">
                  {Object.keys(STREAM_LABELS).map((id) => (
                    <button
                      key={id}
                      onClick={() => setActiveStream(id as StreamType)}
                      className={`flex flex-col items-center justify-center p-5 rounded-[1.8rem] transition-all duration-300 relative border-2 ${activeStream === id ? 'bg-brand-gold text-brand-900 border-white shadow-[0_0_30px_rgba(212,175,55,0.3)] scale-105 z-10' : 'text-white border-transparent hover:bg-white/10'}`}
                    >
                      <span className={`text-[10px] font-black uppercase tracking-tighter text-center leading-tight ${activeStream === id ? 'text-brand-900' : 'text-white'}`}>
                        {STREAM_LABELS[id as StreamType]}
                      </span>
                      {activeStream === id && (
                         <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-900 rounded-full animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex-1">
                {isSuccess ? (
                  <div className="space-y-12 animate-fadeIn py-10 text-center">
                    <CheckCircle size={80} className="text-brand-gold mx-auto animate-bounce" />
                    <h2 className="text-4xl md:text-5xl font-sora font-black text-white uppercase tracking-tighter">DATA SENT TO ARCHITECTS.</h2>
                    <p className="text-xl text-white/60 font-medium leading-relaxed">Check your secure email within 24 hours.</p>
                    <button onClick={handleDownloadIntel} className="w-full flex items-center justify-center gap-4 py-8 rounded-[2.5rem] bg-brand-gold text-brand-900 font-black uppercase tracking-[0.4em] text-sm transition-all hover:scale-105 shadow-2xl">
                      <FileText size={18} /> DOWNLOAD YOUR FREEDOM PLAN
                    </button>
                  </div>
                ) : isTransmitting ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-10 py-20 animate-fadeIn">
                     <div className="w-24 h-24 rounded-full border-4 border-brand-gold/10 border-t-brand-gold animate-spin"></div>
                     <div className="w-full max-w-sm bg-black/40 rounded-3xl p-6 font-mono border border-white/10">
                        {transmissionLogs.map((log, i) => (
                          <p key={i} className="text-[11px] text-brand-gold mb-2">>> {log}</p>
                        ))}
                     </div>
                  </div>
                ) : activeStream === 'stress' ? (
                  <div className="space-y-12 animate-fadeIn">
                    <h2 className="text-5xl font-sora font-black text-brand-gold uppercase tracking-tighter leading-none">BUSINESS <br/> STRESS TEST.</h2>
                    <div className="space-y-10">
                       <div className="space-y-6">
                          <label className="text-xl font-bold text-white uppercase tracking-tight block">How long can your business survive if you stop working today?</label>
                          <div className="flex justify-between items-center bg-black/60 p-8 rounded-[2rem] border border-white/10">
                             <span className="text-[12px] font-black uppercase text-white/40 tracking-widest">Survival Time</span>
                             <span className={`text-5xl font-black ${getSovereigntyLabel(sovereignty).color}`}>{getSovereigntyLabel(sovereignty).time}</span>
                          </div>
                          <div className="px-2">
                             <input type="range" min="0" max="4" step="1" value={sovereignty} onChange={(e) => setSovereignty(parseInt(e.target.value))} className="w-full h-4 bg-white/20 rounded-full appearance-none cursor-pointer accent-brand-gold" />
                          </div>
                       </div>

                       {aiAnalysis ? (
                        <div className="p-10 rounded-[3rem] border-2 border-brand-gold/30 bg-brand-gold/5 animate-fadeIn">
                           <div className="flex items-center gap-3 mb-6">
                              <Sparkles size={24} className="text-brand-gold" />
                              <p className="text-[12px] font-black uppercase text-brand-gold tracking-[0.4em]">ALPHA APPRAISAL</p>
                           </div>
                           <div className="text-lg text-white/90 leading-relaxed font-medium">
                              {aiAnalysis.split('\n').map((line, i) => (
                                <p key={i} className="mb-4">{line.replace('### ', '')}</p>
                              ))}
                           </div>
                        </div>
                       ) : (
                        <div className="p-10 rounded-[3rem] bg-black/80 border border-white/10 shadow-inner">
                           <p className={`text-xs font-black uppercase mb-3 tracking-widest ${getSovereigntyLabel(sovereignty).color}`}>Diagnostic Result: {getSovereigntyLabel(sovereignty).label}</p>
                           <p className="text-2xl font-bold text-white leading-relaxed italic">"{getSovereigntyLabel(sovereignty).desc}"</p>
                        </div>
                       )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <button onClick={handleAiAppraisal} disabled={isAnalyzing} className="flex items-center justify-center gap-4 bg-white/10 border border-white/20 text-white rounded-[2rem] py-8 font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-white/20">
                        {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <Cpu size={20} />} RUN AI ADVISOR
                      </button>
                      <button onClick={() => setActiveStream('alpha')} className="bg-brand-gold text-brand-900 rounded-[2rem] py-8 font-black uppercase tracking-[0.3em] text-xs transition-all hover:scale-105 shadow-xl">
                        GET FREEDOM PLAN <ArrowRight size={20} className="inline ml-2" />
                      </button>
                    </div>
                  </div>
                ) : activeStream === 'protocol' ? (
                  <div className="space-y-12 animate-fadeIn">
                    <h2 className="text-5xl font-sora font-black text-brand-gold uppercase tracking-tighter leading-none">THE ESCAPE <br/> PLAN.</h2>
                    <div className="grid gap-4">
                      {[
                        { step: "01", title: "THE BUSINESS AUDIT", desc: "Finding the messy books and psychological bottlenecks." },
                        { step: "02", title: "THE ARCHITECTURE", desc: "Designing a legal fortress to preserve your capital." },
                        { step: "03", title: "THE IMPLEMENTATION", desc: "Installing AI systems and staff guardrails for independence." },
                        { step: "04", title: "TOTAL FREEDOM", desc: "The business makes money while you focus on what you love." }
                      ].map((p, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setSelectedPhase(idx)}
                          className={`flex gap-8 p-8 rounded-[2.5rem] border-2 transition-all text-left group ${selectedPhase === idx ? 'bg-brand-gold border-white shadow-xl scale-[1.02]' : 'bg-black/40 border-white/10 hover:border-brand-gold/40'}`}
                        >
                           <div className={`text-4xl font-black ${selectedPhase === idx ? 'text-brand-900' : 'text-brand-gold/30'}`}>{p.step}</div>
                           <div>
                              <p className={`font-black uppercase text-sm mb-1 tracking-tighter ${selectedPhase === idx ? 'text-brand-900' : 'text-white'}`}>{p.title}</p>
                              <p className={`text-base font-medium ${selectedPhase === idx ? 'text-brand-900/70' : 'text-white/50'}`}>{p.desc}</p>
                              {selectedPhase === idx && (
                                <div className="mt-4 flex items-center gap-2">
                                   <div className="h-1 w-12 bg-brand-900 rounded-full animate-pulse" />
                                   <span className="text-[10px] font-black text-brand-900 uppercase tracking-widest">PHASE SELECTED FOR ENGAGEMENT</span>
                                </div>
                              )}
                           </div>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setActiveStream('alpha')} className="w-full bg-brand-gold text-brand-900 rounded-[2.5rem] py-10 font-black uppercase tracking-[0.4em] text-sm transition-all hover:scale-105 shadow-2xl">
                        START YOUR ESCAPE <ArrowRight size={22} className="inline ml-4" />
                    </button>
                  </div>
                ) : activeStream === 'calendar' ? (
                  <div className="space-y-12 animate-fadeIn">
                    <h2 className="text-5xl font-sora font-black text-brand-gold uppercase tracking-tighter leading-none">URGENT <br/> DEADLINES.</h2>
                    <div className="grid gap-4">
                      {deadlines.map((d, i) => {
                        const days = getDaysLeft(d.targetDate);
                        const isCritical = days <= 7;
                        return (
                          <div key={i} className={`flex justify-between items-center p-8 bg-black/60 border-2 rounded-[2.5rem] transition-all ${isCritical ? 'border-rose-500 animate-pulse bg-rose-950/20' : 'border-white/10'}`}>
                             <div>
                                <p className={`text-[10px] font-black uppercase mb-1 tracking-[0.2em] ${isCritical ? 'text-rose-500' : 'text-white/30'}`}>{isCritical ? 'CRITICAL RISK DETECTED' : 'SYSTEM OBLIGATION'}</p>
                                <h4 className={`text-xl font-black uppercase tracking-tighter ${isCritical ? 'text-white' : 'text-white/90'}`}>{d.title}</h4>
                             </div>
                             <div className="text-right">
                                <p className={`text-2xl font-black ${isCritical ? 'text-rose-500' : 'text-white'}`}>{d.date}</p>
                                <p className={`text-[11px] font-bold uppercase tracking-widest ${isCritical ? 'text-rose-500/60' : 'text-white/30'}`}>{days} DAYS LEFT</p>
                             </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="p-8 bg-brand-gold/5 border border-brand-gold/20 rounded-[2rem] flex items-center gap-6">
                       <Clock className="text-brand-gold shrink-0" size={32} />
                       <p className="text-base font-medium leading-relaxed text-white/80">Our **Sentinel Protocol** tracks these dates in real-time. Missing a single CIPC or VAT deadline triggers cascading penalties. We stop the leak.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10 animate-fadeIn pt-10">
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
                      UPLINK TO ARCHITECTS <ArrowRight size={24} className="inline ml-6" />
                    </button>
                  </form>
                )}
                </div>

                <div className="pt-12 mt-auto border-t border-white/10 flex items-center justify-between opacity-50">
                  <div className="flex items-center gap-3">
                    <Lock size={14} className="text-brand-gold" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">SECURE CHANNEL 256-BIT ENCRYPTED</span>
                  </div>
                  <span className="text-[10px] font-mono text-brand-gold tracking-widest">SIG: {new Date().getTime().toString(16).toUpperCase()}</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;
