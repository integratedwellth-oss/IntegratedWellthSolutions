
import React, { useState, useEffect } from 'react';
import { Terminal, ShieldAlert, Lock, Database, Zap, ArrowRight, Radio, Activity, Cpu, Globe, UserCheck, Heart, AlertTriangle, Timer, Briefcase, TrendingDown, Calendar, ShieldCheck, ChevronRight, Workflow, Search, PenTool, Key, Ghost, Skull, Eye, FileText, CheckCircle, MessageSquare, Mail, Server } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { generatePDFReport } from '../services/exportService';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

type StreamType = 'alpha' | 'sigma' | 'delta' | 'stress' | 'calendar' | 'protocol';

const STREAM_LABELS: Record<StreamType, string> = {
  stress: 'STRUCTURAL STRESS',
  protocol: 'SOVEREIGNTY PROTOCOL',
  calendar: 'COMPLIANCE CALENDAR',
  alpha: 'ALPHA INTELLIGENCE',
  sigma: 'SIGMA NODES',
  delta: 'DELTA ANALYSIS'
};

const WarRoom: React.FC = () => {
  const [bootSequence, setBootSequence] = useState(true);
  const [activeStream, setActiveStream] = useState<StreamType>('stress'); 
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);
  
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
    const timer = setTimeout(() => setBootSequence(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const getSovereigntyLabel = (val: number) => {
    if (val === 0) return { 
      label: "INSTANT COLLAPSE", 
      time: "24 HOURS",
      color: "text-red-500", 
      desc: "Total systemic failure. Revenue and compliance halt immediately without your presence.",
      risk: "CATASTROPHIC"
    };
    if (val === 1) return { 
      label: "TERMINAL DECLINE", 
      time: "30 DAYS",
      color: "text-rose-400", 
      desc: "Cash flow evaporates as operational friction mounts. Key man risk is critical.",
      risk: "HIGH"
    };
    if (val === 2) return { 
      label: "SYSTEMIC EROSION", 
      time: "90 DAYS",
      color: "text-brand-gold", 
      desc: "The business survives but loses significant value. Structure lacks independent logic.",
      risk: "MODERATE"
    };
    if (val === 3) return { 
      label: "STABLE ASSET", 
      time: "1 YEAR",
      color: "text-emerald-400", 
      desc: "Systems maintain momentum. Asset requires only annual strategic reset.",
      risk: "LOW"
    };
    return { 
      label: "TOTAL SOVEREIGNTY", 
      time: "INFINITE",
      color: "text-brand-500", 
      desc: "Fully decoupled machine. Produces wealth autonomously while you focus on legacy.",
      risk: "NEUTRALIZED"
    };
  };

  const getDependencyStatus = (val: number) => {
    if (val > 80) return { label: "CRITICAL KEY MAN RISK", color: "text-red-500", agitation: "Extension of personality, not a company." };
    if (val > 50) return { label: "VULNERABLE FRAGILITY", color: "text-brand-gold", agitation: "Relies on intuition rather than protocol." };
    return { label: "DECOUPLED CORE", color: "text-emerald-400", agitation: "Logic-driven systems achieved." };
  };

  const addLog = (msg: string) => {
    setTransmissionLogs(prev => [...prev.slice(-4), msg]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    setTransmissionLogs([]);
    
    const logs = [
      "INITIALIZING SECURE UPLINK...",
      "PACKETIZING STRUCTURAL DATA...",
      "ENCRYPTING FOUNDER IDENTITY...",
      "BYPASSING LATENCY BARRIERS...",
      "COMMIT TO SOVEREIGNTY CORE..."
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      addLog(logs[i]);
    }
    
    try {
      const sov = getSovereigntyLabel(sovereignty);
      const leadPayload = {
        personal_identity: formData.identifier,
        enterprise_identity: formData.enterprise,
        secure_email: formData.email,
        whatsapp_node: formData.whatsapp || 'NOT PROVIDED',
        founder_stress_context: formData.parameters,
        simulation_results: {
          dependency_pct: dependency,
          survival_time: sov.time,
          risk_parameter: sov.risk,
          diagnostic_outcome: sov.label
        },
        transmission_timestamp: serverTimestamp(),
        source: 'WAR_ROOM_STRESS_TEST'
      };

      if (db) {
        await addDoc(collection(db, 'war_room_leads'), leadPayload);
      }

      setIsTransmitting(false);
      setIsSuccess(true);

    } catch (error) {
      console.error("Transmission Failure:", error);
      setIsTransmitting(false);
      alert("Transmission Failure. Protocol interrupted.");
    }
  };

  const handleDownloadIntel = () => {
    const sov = getSovereigntyLabel(sovereignty);
    const dep = getDependencyStatus(dependency);

    generatePDFReport({
      title: "PRELIMINARY INTELLIGENCE REPORT",
      subtitle: `Enterprise: ${formData.enterprise} | Identity: ${formData.identifier}`,
      sections: [
        {
          heading: "Structural Stress Metrics",
          content: `Evaluation of ${formData.enterprise} dependency on ${formData.identifier}.`,
          table: {
            headers: ["Metric", "Value", "Risk Status"],
            rows: [
              ["Founder Dependency", `${dependency}%`, dep.label],
              ["Simulated Survival", sov.time, sov.label],
              ["Risk Parameter", sov.risk, "ACTION REQUIRED"]
            ]
          }
        },
        {
          heading: "Diagnostic Insights",
          content: [
            `Current State: ${sov.desc}`,
            "Decoupling required immediately to preserve capital."
          ]
        }
      ]
    }, `IWS_Intel_${formData.enterprise.replace(/\s+/g, '_')}.pdf`);
  };

  if (bootSequence) {
    return (
      <div className="fixed inset-0 z-[1000] bg-slate-950 flex flex-col items-center justify-center p-6 text-emerald-500 font-mono text-center">
        <div className="max-w-md w-full space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Terminal size={20} className="animate-pulse" />
            <span className="text-xs uppercase tracking-[0.4em]">CALCULATING STRUCTURAL DECAY...</span>
          </div>
          <div className="h-1 w-full bg-emerald-500/10 rounded-full overflow-hidden mt-6">
            <div className="h-full bg-emerald-500 animate-[scan_2s_linear_infinite]" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-gold/20 relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      <div className="max-w-7xl mx-auto px-6 pt-48 pb-32 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/5 backdrop-blur-md">
                <Radio size={14} className="text-brand-gold animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">War Room: Active Simulation</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-sora font-extrabold tracking-tighter leading-[0.8] mt-8">
                THE WAR <br/> <span className="text-brand-gold italic">ROOM.</span>
              </h1>
              <p className="text-2xl text-white/50 font-light leading-relaxed mt-10 border-l-2 border-brand-gold/40 pl-10">
                A high-fidelity engine for your business survival. Most founders realize too late that <span className="text-white font-bold italic underline decoration-brand-gold decoration-4 underline-offset-8">they are the bottleneck.</span>
              </p>
            </RevealOnScroll>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'SIMULATED SURVIVAL', value: getSovereigntyLabel(sovereignty).time, icon: <Skull size={16} className={getSovereigntyLabel(sovereignty).color} /> },
                { label: 'FAILURE RISK', value: getSovereigntyLabel(sovereignty).risk, icon: <AlertTriangle size={16} className={getSovereigntyLabel(sovereignty).color} /> },
                { label: 'SOVEREIGNTY SCORE', value: `${Math.round(((100 - dependency) / 2 + sovereignty * 10))}%`, icon: <Timer size={16} className="text-brand-gold" /> },
                { label: 'STATUS', value: 'LIVE FEED', icon: <Activity size={16} className="text-emerald-500 animate-pulse" /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl group hover:border-brand-gold/30 transition-all">
                  <div className="flex items-center gap-3 mb-3 opacity-40">
                    {stat.icon}
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">{stat.label}</span>
                  </div>
                  <p className="text-xl font-black tracking-tighter uppercase whitespace-nowrap">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <RevealOnScroll delay={0.2}>
              <div className="bg-slate-900/60 border border-white/10 rounded-[4rem] p-10 md:p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden group min-h-[850px] flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
                
                <div className="flex flex-wrap bg-black/40 p-2 rounded-[2.5rem] md:rounded-full border border-white/5 w-fit mb-12 mx-auto md:mx-0">
                  {['stress', 'protocol', 'calendar', 'alpha'].map((id) => (
                    <button
                      key={id}
                      onClick={() => setActiveStream(id as StreamType)}
                      className={`flex flex-col items-center justify-center min-w-[110px] px-6 py-4 rounded-full transition-all duration-500 ${activeStream === id ? 'bg-brand-gold text-brand-900 shadow-2xl scale-105' : 'text-white/30 hover:text-white/60'}`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">{STREAM_LABELS[id as StreamType]}</span>
                    </button>
                  ))}
                </div>

                <div className="flex-1">
                {isSuccess ? (
                  <div className="space-y-12 animate-fadeIn py-10 text-center">
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                       <CheckCircle size={48} className="text-white" />
                    </div>
                    <div className="space-y-4">
                       <h2 className="text-4xl font-sora font-black text-white uppercase tracking-tighter">DIAGNOSTIC DATA <br/> <span className="text-emerald-500">TRANSMITTED.</span></h2>
                       <p className="text-xl text-white/40 font-medium leading-relaxed">
                        The Architects are analyzing your structural failures. Delivery to <span className="text-brand-gold font-bold">{formData.email}</span> within 24 hours.
                       </p>
                    </div>
                    <div className="grid gap-4">
                       <button onClick={handleDownloadIntel} className="w-full flex items-center justify-center gap-4 py-8 rounded-[2.5rem] bg-brand-gold text-brand-900 font-black uppercase tracking-[0.4em] text-xs transition-all hover:scale-105 shadow-2xl">
                         <FileText size={18} /> DOWNLOAD PRELIMINARY INTEL BRIEF
                       </button>
                    </div>
                  </div>
                ) : isTransmitting ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-12 py-20 animate-fadeIn">
                     <div className="relative">
                        <div className="w-32 h-32 rounded-full border-4 border-brand-gold/10 border-t-brand-gold animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Server size={32} className="text-brand-gold animate-pulse" />
                        </div>
                     </div>
                     <div className="w-full max-w-sm bg-black/40 rounded-3xl p-8 font-mono border border-white/5 shadow-inner">
                        {transmissionLogs.map((log, i) => (
                          <p key={i} className="text-[10px] text-emerald-500/80 mb-2 leading-none">
                            <span className="opacity-30 mr-2">[{new Date().toLocaleTimeString()}]</span>
                            >> {log}
                          </p>
                        ))}
                        <div className="w-2 h-4 bg-emerald-500 animate-pulse inline-block mt-2"></div>
                     </div>
                     <p className="text-xs font-black uppercase tracking-[0.5em] text-white/40 animate-pulse">Establishing Sovereignty Tunnel...</p>
                  </div>
                ) : activeStream === 'stress' ? (
                  <div className="space-y-12 animate-fadeIn">
                    <div className="space-y-10">
                       <h2 className="text-4xl font-sora font-black text-brand-gold uppercase tracking-tighter leading-none">STRUCTURAL <br/> STRESS TEST.</h2>
                       <div className="space-y-6 pt-2">
                          <div className="flex flex-col gap-2">
                             <label className="text-xl font-black text-white leading-tight uppercase tracking-tight">If you stopped working today, how long would the business survive?</label>
                             <div className="flex justify-between items-center mt-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Founder-Decoupling Simulation</span>
                                <span className={`text-2xl font-black ${getSovereigntyLabel(sovereignty).color}`}>{getSovereigntyLabel(sovereignty).time}</span>
                             </div>
                          </div>
                          <div className="relative pt-4 pb-8">
                             <input type="range" min="0" max="4" step="1" value={sovereignty} onChange={(e) => setSovereignty(parseInt(e.target.value))} className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-gold" />
                          </div>
                          <div className={`p-10 rounded-[3rem] border border-white/5 bg-black/60 transition-all`}>
                             <p className={`text-sm font-black uppercase tracking-widest mb-1 ${getSovereigntyLabel(sovereignty).color}`}>Diagnostic Outcome: {getSovereigntyLabel(sovereignty).label}</p>
                             <p className="text-lg font-bold text-white italic">"{getSovereigntyLabel(sovereignty).desc}"</p>
                          </div>
                       </div>
                    </div>
                    <button onClick={() => setActiveStream('alpha')} className="w-full bg-brand-gold text-brand-900 rounded-[2.5rem] py-10 font-black uppercase tracking-[0.5em] text-sm transition-all hover:scale-[1.02] shadow-2xl">
                      REQUEST STRUCTURAL INTERVENTION <ArrowRight size={22} className="inline ml-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12 animate-fadeIn">
                    <div className="space-y-10">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold/80 ml-4 flex items-center gap-2"><UserCheck size={12} /> Full Name</label>
                          <input required type="text" value={formData.identifier} onChange={(e) => setFormData({...formData, identifier: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-6 focus:border-brand-gold outline-none font-mono text-xs" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold/80 ml-4 flex items-center gap-2"><Briefcase size={12} /> Entity Name</label>
                          <input required type="text" value={formData.enterprise} onChange={(e) => setFormData({...formData, enterprise: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-6 focus:border-brand-gold outline-none font-mono text-xs" />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold/80 ml-4 flex items-center gap-2"><Mail size={12} /> Email</label>
                          <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-6 focus:border-brand-gold outline-none font-mono text-xs" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold/80 ml-4 flex items-center gap-2"><MessageSquare size={12} /> WhatsApp</label>
                          <input type="tel" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-6 focus:border-brand-gold outline-none font-mono text-xs" />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-brand-gold text-brand-900 rounded-[2.5rem] py-10 font-black uppercase tracking-[0.5em] text-sm transition-all hover:scale-105 shadow-2xl">
                      Initiate Structural Intervention <ArrowRight size={22} className="inline ml-4" />
                    </button>
                  </form>
                )}
                </div>

                <div className="pt-10 mt-auto border-t border-white/5 flex items-center justify-between opacity-30">
                  <div className="flex items-center gap-3">
                    <Lock size={12} />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">ENCRYPTED SECURE CHANNEL</span>
                  </div>
                  <span className="text-[9px] font-mono tracking-tighter">IWS_ST_0x992B</span>
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
