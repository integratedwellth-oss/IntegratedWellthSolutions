
import React from 'react';
import { PILLARS } from '../constants';
import { Calculator, Brain, UserCheck, Briefcase, ShieldCheck, ArrowUpRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const iconMap: Record<string, React.ReactNode> = {
  Calculator: <Calculator size={28} />,
  Brain: <Brain size={28} />,
  UserCheck: <UserCheck size={28} />,
  Briefcase: <Briefcase size={28} />,
  ShieldCheck: <ShieldCheck size={28} />
};

const Services: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
          <RevealOnScroll>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-brand-900 text-white shadow-2xl">
                 <ShieldCheck size={18} className="text-brand-gold" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Strategic Ecosystem</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-sora font-extrabold text-brand-900 tracking-tighter leading-tight md:leading-[1.1]">
                PILLARS OF <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-900 to-brand-gold italic">PRECISION.</span>
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-2xl text-brand-900/60 font-medium leading-relaxed max-w-xl md:mt-16">
              Accounting handles your history. We engineer your trajectory through multidisciplinary technical IQ and behavioral EQ.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar, index) => (
            <RevealOnScroll key={index} delay={index * 0.1} width="100%">
              <div className="bg-gray-50 rounded-[2.5rem] p-12 border border-brand-900/5 hover:border-brand-gold hover:bg-white hover:shadow-2xl transition-all duration-500 h-full flex flex-col group">
                <div className="w-16 h-16 bg-white text-brand-900 rounded-2xl flex items-center justify-center mb-10 shadow-sm group-hover:bg-brand-900 group-hover:text-white transition-all transform group-hover:rotate-6 border border-brand-900/5">
                  {iconMap[pillar.iconName]}
                </div>
                <h3 className="text-2xl font-black text-brand-900 mb-4 uppercase tracking-tighter leading-none">{pillar.title}</h3>
                <p className="text-brand-900/60 leading-relaxed mb-10 flex-grow text-sm">{pillar.description}</p>
                <button 
                   onClick={() => window.location.hash = '#contact'}
                   className="flex items-center justify-between w-full text-[10px] font-black uppercase tracking-widest text-brand-900/40 group-hover:text-brand-gold transition-colors pt-6 border-t border-brand-900/5"
                >
                  Learn More <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                </button>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
