
import React from 'react';
import { Search, PenTool, Key, ArrowRight, ShieldCheck, Zap, Globe, ShieldAlert, Eye, Target, TrendingUp, Cpu, Lock } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import Button from './Button';

const PHASES = [
  {
    number: "01",
    title: "The Sovereignty Audit",
    meta: "THE FIRST STRIKE",
    icon: <Search size={32} />,
    tagline: "The 'Truth' Stage",
    description: "A high-level intelligence operation to find the 'leaks' in the founder’s time and capital. We move from operational chaos to data-driven clarity.",
    lenses: [
      { label: "Financial Integrity (The Fortress)", desc: "Detecting leaking capital and debt inefficiencies." },
      { label: "Systems Logic (The Machine)", desc: "Identifying manual friction and physical touchpoints." },
      { label: "Psychology (The Architect)", desc: "Quantifying founder bottlenecks and decision fatigue." }
    ],
    deliverable: "Strategic Intelligence Brief & Sovereignty Scorecard",
    bgColor: "bg-white",
    textColor: "text-brand-900",
    accentColor: "brand-gold"
  },
  {
    number: "02",
    title: "Structural Architecture",
    meta: "THE MASTER BLUEPRINT",
    icon: <PenTool size={32} />,
    tagline: "The 'Blueprint' Stage",
    description: "Designing the 'Fortress' on paper. We physically re-organize the business for total capital preservation and systematic scale.",
    lenses: [
      { label: "Entity Optimization", desc: "Decoupling personal wealth from operational risk (Trusts/Holdings)." },
      { label: "Tax Efficiency Mapping", desc: "Implementing long-term legal tax strategies." },
      { label: "Automation Engine", desc: "Designing the digital connective tissue to remove human error." }
    ],
    deliverable: "The Master Sovereignty Blueprint & Governance Stack",
    bgColor: "bg-brand-50/50",
    textColor: "text-brand-900",
    accentColor: "brand-gold"
  },
  {
    number: "03",
    title: "The Implementation",
    meta: "OPERATIONAL INDEPENDENCE",
    icon: <Key size={32} />,
    tagline: "The 'Construction' Stage",
    description: "Turning the keys. The IWS team enters the trenches to install the systems and train the garrison to defend your freedom.",
    lenses: [
      { label: "Systematic De-coupling", desc: "Moving responsibilities from founder to AI and trained staff." },
      { label: "Stress-Test Validation", desc: "Proving structural integrity via 'Shadow Exit' simulations." },
      { label: "Clean Sweep Compliance", desc: "Automating self-defending statutory and tax guardrails." }
    ],
    deliverable: "Self-Sustaining Operation & Handover of the Keys",
    bgColor: "bg-brand-800",
    textColor: "text-white",
    accentColor: "brand-gold"
  },
  {
    number: "04",
    title: "Sovereignty Maintenance",
    meta: "ELITE STEWARDSHIP",
    icon: <ShieldAlert size={32} />,
    tagline: "The 'Sentinel' Stage",
    description: "The transition to a permanent Sentinel State. We guard the gates of your freedom, ensuring your structure never erodes.",
    lenses: [
      { label: "The Sentinel Watch", desc: "Active monitoring of business vital signs and compliance health." },
      { label: "Quarterly Refinement", desc: "Tune-ups for tax strategy and latest AI automation stacks." },
      { label: "Legacy Protection", desc: "Hardening structures for multi-generational wealth succession." }
    ],
    deliverable: "Permanent Legacy Protection & Sale-Ready Status",
    bgColor: "bg-brand-900",
    textColor: "text-white",
    accentColor: "brand-gold"
  }
];

const StrategicJourney: React.FC = () => {
  return (
    <section id="protocol" className="relative overflow-hidden font-sans">
      {/* The Connecting Vertical Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-900/10 via-brand-gold to-brand-gold/20 hidden lg:block z-0" />

      {/* Intro Section */}
      <div className="bg-white py-32 md:py-48 px-6 relative z-10 text-center">
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-brand-900/10 bg-brand-50 text-brand-900">
               <Target size={16} className="text-brand-gold animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em]">The IWS Sovereignty Protocol</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-sora font-extrabold text-brand-900 tracking-tighter leading-[0.8]">
              THE MAP TO <br/> <span className="text-brand-gold italic">FREEDOM.</span>
            </h2>
            <p className="text-xl md:text-3xl text-brand-900/40 font-medium leading-relaxed">
              A comprehensive engineering methodology designed to transform your business from a "Founder's Job" into a "Sovereign Asset."
            </p>
          </div>
        </RevealOnScroll>
      </div>

      {/* The Phases - Progressive Descent */}
      {PHASES.map((phase, i) => (
        <div key={i} className={`${phase.bgColor} ${phase.textColor} py-40 md:py-60 px-6 relative z-10 transition-colors duration-1000`}>
          <div className="max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Content Block */}
              <div className={`space-y-12 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <RevealOnScroll>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <span className={`text-8xl font-sora font-black opacity-10 leading-none`}>{phase.number}</span>
                      <div className={`h-px flex-1 ${i < 2 ? 'bg-brand-900/10' : 'bg-white/10'}`} />
                      <span className={`text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold`}>{phase.meta}</span>
                    </div>
                    <div className="space-y-2">
                       <p className="text-brand-gold font-black uppercase tracking-widest text-xs">{phase.tagline}</p>
                       <h3 className="text-5xl md:text-7xl font-sora font-black tracking-tighter leading-none">{phase.title}</h3>
                    </div>
                    <p className={`text-2xl opacity-70 font-medium leading-relaxed italic border-l-4 border-brand-gold/30 pl-8`}>
                       "{phase.description}"
                    </p>
                  </div>
                </RevealOnScroll>

                <div className="grid gap-6">
                  {phase.lenses.map((lens, idx) => (
                    <RevealOnScroll key={idx} delay={0.1 * idx}>
                      <div className={`group p-8 rounded-[2.5rem] border transition-all flex gap-6 ${i < 2 ? 'bg-white border-brand-900/5 shadow-sm' : 'bg-white/5 border-white/10'}`}>
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${i < 2 ? 'bg-brand-900 text-white' : 'bg-brand-gold text-brand-900'}`}>
                            {idx === 0 ? <TrendingUp size={24} /> : idx === 1 ? <Cpu size={24} /> : <Zap size={24} />}
                         </div>
                         <div>
                            <p className="font-black uppercase text-sm tracking-tight mb-1">{lens.label}</p>
                            <p className="opacity-60 text-sm font-medium">{lens.desc}</p>
                         </div>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>

                <RevealOnScroll>
                  <div className={`pt-10 border-t flex flex-col md:flex-row md:items-center gap-6 ${i < 2 ? 'border-brand-900/5' : 'border-white/10'}`}>
                     <div>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-1">Critical Phase Deliverable:</p>
                       <p className="text-xl font-bold uppercase tracking-tighter text-brand-gold">{phase.deliverable}</p>
                     </div>
                  </div>
                </RevealOnScroll>
              </div>

              {/* Visual Block */}
              <div className={`relative ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <RevealOnScroll delay={0.3}>
                  <div className={`aspect-square rounded-[4rem] flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl ${i < 2 ? 'bg-brand-900 text-white' : 'bg-white text-brand-900'}`}>
                    <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                       <Globe size={800} className="absolute -right-20 -bottom-20" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center text-center space-y-8 p-12">
                       <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center shadow-2xl animate-float transition-colors ${i < 2 ? 'bg-brand-gold text-brand-900' : 'bg-brand-900 text-brand-gold'}`}>
                          {phase.icon}
                       </div>
                       <div className="space-y-4">
                         <p className={`text-[11px] font-black uppercase tracking-[0.6em] ${i < 2 ? 'text-white/40' : 'text-brand-900/40'}`}>Protocol Stage {phase.number}</p>
                         <p className="text-4xl md:text-5xl font-sora font-black uppercase tracking-tighter leading-tight">
                            {phase.title.split(' ').map((word, idx) => (
                              <span key={idx} className="block">{word}</span>
                            ))}
                         </p>
                       </div>
                    </div>
                  </div>
                </RevealOnScroll>
                
                {/* Decorative floating indicators */}
                <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${i < 2 ? 'bg-brand-gold' : 'bg-white'}`} />
                <div className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-10 ${i < 2 ? 'bg-brand-900' : 'bg-brand-gold'}`} />
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Strategic Re-direct Section */}
      <section className="bg-brand-900 text-white py-60 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[140px] translate-y-1/2 translate-x-1/2" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-16">
          <RevealOnScroll>
            <div className="space-y-8">
              <h2 className="text-5xl md:text-8xl font-sora font-black tracking-tighter uppercase leading-[0.85]">
                READY TO AUDIT <br/> <span className="text-brand-gold italic">YOUR FORTRESS?</span>
              </h2>
              <p className="text-2xl md:text-3xl text-brand-100/60 font-light leading-relaxed italic">
                "The journey to sovereignty begins with a single data transmission."
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="flex flex-col items-center gap-12">
               <Button 
                onClick={() => window.location.hash = '#warroom'}
                size="lg" 
                className="rounded-[2.5rem] px-20 py-10 text-3xl font-black bg-brand-gold text-brand-900 shadow-[0_40px_100px_rgba(212,175,55,0.4)] hover:bg-white transition-all border border-white/10 hover:scale-105 uppercase tracking-widest"
              >
                ENTER THE WAR ROOM
              </Button>
              
              <div className="flex items-center gap-8 text-white/40 font-black uppercase tracking-widest text-[10px]">
                 <span className="flex items-center gap-2"><Lock size={14} /> Encrypted Entry</span>
                 <div className="w-1 h-1 rounded-full bg-white/20" />
                 <span className="flex items-center gap-2"><Eye size={14} /> Private Diagnosis</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </section>
  );
};

export default StrategicJourney;
