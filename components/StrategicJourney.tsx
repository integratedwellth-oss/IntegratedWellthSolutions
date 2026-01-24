import React from 'react';
import { Search, PenTool, Key, ShieldAlert, Target, TrendingUp, Cpu, Zap } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const PHASES = [
  {
    number: "01",
    title: "The Sovereignty Audit",
    meta: "THE FIRST STRIKE",
    icon: <Search size={32} />,
    tagline: "The 'Truth' Stage",
    description: "A high-level intelligence operation to find the 'leaks' in the founder’s time and capital. We move from operational chaos to data-driven clarity.",
    lenses: [
      { label: "Financial Integrity", desc: "Detecting leaking capital and debt inefficiencies." },
      { label: "Systems Logic", desc: "Identifying manual friction and physical touchpoints." },
      { label: "Psychology", desc: "Quantifying founder bottlenecks and decision fatigue." }
    ],
    deliverable: "Strategic Intelligence Brief",
    bgColor: "bg-white",
    textColor: "text-brand-900",
    forceColor: "#134e4a", // Dark Teal
    numberColor: "text-brand-900/10",
    accentColor: "text-brand-gold"
  },
  {
    number: "02",
    title: "Structural Architecture",
    meta: "THE MASTER BLUEPRINT",
    icon: <PenTool size={32} />,
    tagline: "The 'Blueprint' Stage",
    description: "Designing the 'Fortress' on paper. We physically re-organize the business for total capital preservation and systematic scale.",
    lenses: [
      { label: "Entity Optimization", desc: "Decoupling personal wealth from operational risk." },
      { label: "Tax Efficiency", desc: "Implementing long-term legal tax strategies." },
      { label: "Automation Engine", desc: "Designing the digital connective tissue." }
    ],
    deliverable: "The Master Sovereignty Blueprint",
    bgColor: "bg-brand-50",
    textColor: "text-brand-900",
    forceColor: "#134e4a", // Dark Teal (FORCE VISIBILITY)
    numberColor: "text-brand-900/10",
    accentColor: "text-brand-600"
  },
  {
    number: "03",
    title: "The Implementation",
    meta: "OPERATIONAL INDEPENDENCE",
    icon: <Key size={32} />,
    tagline: "The 'Construction' Stage",
    description: "Turning the keys. The IWS team enters the trenches to install the systems and train the garrison to defend your freedom.",
    lenses: [
      { label: "Systematic De-coupling", desc: "Moving responsibilities from founder to AI." },
      { label: "Stress-Test Validation", desc: "Proving structural integrity via simulations." },
      { label: "Clean Sweep", desc: "Automating self-defending statutory guardrails." }
    ],
    deliverable: "Self-Sustaining Operation",
    bgColor: "bg-brand-800",
    textColor: "text-white",
    forceColor: "#ffffff",
    numberColor: "text-white/10",
    accentColor: "text-brand-gold"
  },
  {
    number: "04",
    title: "Sovereignty Maintenance",
    meta: "ELITE STEWARDSHIP",
    icon: <ShieldAlert size={32} />,
    tagline: "The 'Sentinel' Stage",
    description: "The transition to a permanent Sentinel State. We guard the gates of your freedom, ensuring your structure never erodes.",
    lenses: [
      { label: "The Sentinel Watch", desc: "Active monitoring of business vital signs." },
      { label: "Quarterly Refinement", desc: "Tune-ups for tax strategy and latest AI." },
      { label: "Legacy Protection", desc: "Hardening structures for multi-generational wealth." }
    ],
    deliverable: "Permanent Legacy Protection",
    bgColor: "bg-brand-900",
    textColor: "text-white",
    forceColor: "#ffffff",
    numberColor: "text-white/10",
    accentColor: "text-brand-gold"
  }
];

const StrategicJourney: React.FC = () => {
  return (
    <section id="protocol" className="relative overflow-hidden font-sans">
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
          </div>
        </RevealOnScroll>
      </div>

      {PHASES.map((phase, i) => (
        <div key={i} className={`${phase.bgColor} py-40 md:py-60 px-6 relative z-10`}>
          <div className="max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              <div className={`space-y-12 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <RevealOnScroll>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <span className={`text-8xl font-sora font-black ${phase.numberColor} leading-none`}>{phase.number}</span>
                      <div className={`h-px flex-1 ${i < 2 ? 'bg-brand-900/20' : 'bg-white/20'}`} />
                      <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${phase.accentColor}`}>{phase.meta}</span>
                    </div>
                    <div className="space-y-2">
                      <p className={`${phase.accentColor} font-black uppercase tracking-widest text-xs`}>{phase.tagline}</p>
                      {/* FORCED COLOR STYLE */}
                      <h3 className="text-5xl md:text-7xl font-sora font-black tracking-tighter leading-none" style={{ color: phase.forceColor }}>{phase.title}</h3>
                    </div>
                    {/* FORCED COLOR STYLE */}
                    <p className="text-2xl font-medium leading-relaxed italic border-l-4 border-current pl-8" style={{ color: phase.forceColor, opacity: 0.8 }}>
                      "{phase.description}"
                    </p>
                  </div>
                </RevealOnScroll>
                
                <div className="grid gap-6">
                  {phase.lenses.map((lens, idx) => (
                    <RevealOnScroll key={idx} delay={0.1 * idx}>
                      <div className={`group p-8 rounded-[2.5rem] border transition-all flex gap-6 ${i < 2 ? 'bg-white border-brand-900/10 shadow-sm' : 'bg-white/10 border-white/10'}`}>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${i < 2 ? 'bg-brand-900 text-white' : 'bg-brand-gold text-brand-900'}`}>
                          {idx === 0 ? <TrendingUp size={24} /> : idx === 1 ? <Cpu size={24} /> : <Zap size={24} />}
                        </div>
                        <div>
                          {/* FORCED COLOR STYLE */}
                          <p className="font-black uppercase text-sm tracking-tight mb-1" style={{ color: phase.forceColor }}>{lens.label}</p>
                          <p className="text-sm font-medium" style={{ color: phase.forceColor, opacity: 0.6 }}>{lens.desc}</p>
                        </div>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              <div className={`relative ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <RevealOnScroll delay={0.3}>
                  <div className={`aspect-square rounded-[4rem] flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl ${i < 2 ? 'bg-brand-900 text-white' : 'bg-white text-brand-900'}`}>
                    <div className="relative z-10 flex flex-col items-center text-center space-y-8 p-12">
                      <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-colors ${i < 2 ? 'bg-brand-gold text-brand-900' : 'bg-brand-900 text-brand-gold'}`}>
                        {phase.icon}
                      </div>
                      <div className="space-y-4">
                         <p className={`text-[11px] font-black uppercase tracking-[0.6em] ${i < 2 ? 'text-white/40' : 'text-brand-900/40'}`}>Protocol Stage {phase.number}</p>
                         <p className="text-4xl md:text-5xl font-sora font-black uppercase tracking-tighter leading-tight">
                           {phase.title}
                         </p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>

            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StrategicJourney;
