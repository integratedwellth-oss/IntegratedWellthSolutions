import React from 'react';
import { Search, PenTool, Key, ShieldAlert, Target, TrendingUp, Cpu, Zap } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const PHASES = [
  {
    number: "01",
    title: "Finding the Mess",
    meta: "STEP ONE",
    icon: <Search size={32} />,
    tagline: "The 'Truth' Stage",
    description: "We look at your books to find out where you are losing money, where you are behind on your taxes, and why you feel so tired. We find the real truth about your business.",
    lenses: [
      { label: "Tax Health", desc: "Checking if SARS is happy with your records." },
      { label: "Money Leaks", desc: "Finding where your hard-earned cash is disappearing." },
      { label: "Stress Check", desc: "Identifying the tasks that are burning you out." }
    ],
    deliverable: "The 'Clear Picture' Report",
    hexBg: "#ffffff",
    textColor: "text-brand-900",
    forceColor: "#134e4a",
    numberColor: "text-brand-900/10",
    accentColor: "text-brand-gold"
  },
  {
    number: "02",
    title: "Building Your Fortress",
    meta: "STEP TWO",
    icon: <PenTool size={32} />,
    tagline: "The 'Protection' Stage",
    description: "We create a plan to protect your money. We make sure your personal assets are safe from business risks. We build a 'wall' around your wealth.",
    lenses: [
      { label: "Asset Protection", desc: "Separating your home and savings from your business." },
      { label: "Legal Structure", desc: "Setting up the right company types for safety." },
      { label: "Tax Planning", desc: "Making sure you don't pay a cent more than you have to." }
    ],
    deliverable: "Your Business Safety Blueprint",
    hexBg: "#f0fdfa",
    textColor: "text-brand-900",
    forceColor: "#134e4a",
    numberColor: "text-brand-900/10",
    accentColor: "text-brand-600"
  },
  {
    number: "03",
    title: "Setting Up Autopilot",
    meta: "STEP THREE",
    icon: <Key size={32} />,
    tagline: "The 'Systems' Stage",
    description: "We set up simple computer tools and train people to use them. We use smart technology to do the boring work for you so you can focus on growth.",
    lenses: [
      { label: "Cloud Systems", desc: "Moving your paperwork to easy tools like Xero or Zoho." },
      { label: "Staff Training", desc: "Teaching your team how to handle the daily tasks." },
      { label: "Automation", desc: "Using tech to handle repetitive admin work." }
    ],
    deliverable: "A Self-Running System",
    hexBg: "#3E2723", 
    textColor: "text-white",
    forceColor: "#ffffff",
    numberColor: "text-white/10",
    accentColor: "text-brand-gold"
  },
  {
    number: "04",
    title: "Watching the Gates",
    meta: "STEP FOUR",
    icon: <ShieldAlert size={32} />,
    tagline: "The 'Freedom' Stage",
    description: "We stay on as your guards. We watch your deadlines every day to make sure you stay compliant. You finally own a business instead of a stressful job.",
    lenses: [
      { label: "Daily Monitoring", desc: "We watch your books so you don't have to." },
      { label: "Deadline Security", desc: "Never missing a SARS or CIPC date again." },
      { label: "Growth Advice", desc: "Monthly meetings to keep you on the right path." }
    ],
    deliverable: "Total Peace of Mind",
    hexBg: "#134e4a", 
    textColor: "text-white",
    forceColor: "#ffffff",
    numberColor: "text-white/10",
    accentColor: "text-brand-gold"
  }
];

const StrategicJourney: React.FC = () => {
  return (
    <section id="protocol" className="relative overflow-hidden font-sans">
      <div className="bg-white py-32 md:py-48 px-6 relative z-10 text-center border-b border-brand-900/5">
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-brand-900/10 bg-brand-50 text-brand-900">
              <Target size={16} className="text-brand-gold animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">The IWS Freedom Roadmap</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-sora font-extrabold text-brand-900 tracking-tighter leading-[0.8]">
              THE PLAN TO <br/> <span className="text-brand-gold italic">FREEDOM.</span>
            </h2>
            <p className="text-xl md:text-2xl text-brand-900/60 font-medium leading-relaxed max-w-2xl mx-auto">
              We take you from a stressful job to a silent, money-making machine in four simple steps.
            </p>
          </div>
        </RevealOnScroll>
      </div>

      {PHASES.map((phase, i) => (
        <div key={i} style={{ backgroundColor: phase.hexBg }} className={`${phase.textColor} py-40 md:py-60 px-6 relative z-10`}>
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
                      <h3 className="text-5xl md:text-7xl font-sora font-black tracking-tighter leading-none" style={{ color: phase.forceColor }}>{phase.title}</h3>
                    </div>
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
                         <p className={`text-[11px] font-black uppercase tracking-[0.6em] ${i < 2 ? 'text-white/40' : 'text-brand-900/40'}`}>PHASE {phase.number}</p>
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
