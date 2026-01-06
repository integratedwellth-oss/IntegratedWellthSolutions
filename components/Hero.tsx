import React from 'react';
import Button from './Button';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const Hero: React.FC = () => {
  const triggerAssessment = () => { window.location.hash = '#assessment'; };
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-anchor');
    if (servicesSection) servicesSection.scrollIntoView({ behavior: 'smooth' });
    else window.location.hash = '#services';
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center items-start overflow-hidden px-6 md:px-20 bg-brand-900">
      <div className="absolute inset-0 z-0">
        <img src="https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_Business_Lunch_raaj59.jpg" alt="Strategic Meeting" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/80 to-transparent"></div>
      </div>
      <div className="max-w-5xl relative z-10 space-y-8 animate-fadeIn">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 backdrop-blur-md">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Strategic Consultancy</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-sora font-extrabold tracking-tighter text-white leading-[0.9] max-w-4xl">Where you are going <br className="hidden md:block"/> <span className="italic text-brand-gold">matters more</span> than <br className="hidden md:block"/> where you have been.</h1>
        <p className="text-lg md:text-2xl text-white/70 max-w-2xl font-medium leading-relaxed">Transforming lives through emotional, financial, and personal wellness. We combine <span className="text-white font-bold">IQ and EQ</span> for holistic business success.</p>
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-8">
          <Button size="lg" variant="secondary" onClick={triggerAssessment} className="w-full sm:w-auto rounded-xl px-10 py-5 bg-brand-gold text-brand-900 font-black uppercase shadow-[0_20px_40px_rgba(212,175,55,0.3)]">Check Financial Health</Button>
          <button onClick={scrollToServices} className="w-full sm:w-auto group flex items-center justify-center gap-4 px-10 py-5 rounded-xl border border-white/20 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">Explore Services <ArrowRight size={18} className="group-hover:translate-x-1" /></button>
        </div>
      </div>
      <div className="absolute bottom-20 right-10 hidden xl:block animate-float">
         <div className="glass-card p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl max-w-[280px]">
            <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 rounded-lg bg-brand-gold/20 flex items-center justify-center text-brand-gold"><ShieldCheck size={18} /></div><span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Protocol Active</span></div>
            <p className="text-sm font-bold text-white leading-snug">Real-time SARS Compliance & <br/> <span className="text-brand-gold">Behavioral Risk Monitoring</span></p>
         </div>
      </div>
    </div>
  );
};

export default Hero;
