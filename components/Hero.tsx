import React from 'react';
import Button from './Button';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const Hero: React.FC = () => {
  const triggerAssessment = () => {
    window.location.hash = '#assessment';
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-anchor');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#services';
    }
  };

  return (
    <div className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center items-start overflow-hidden px-6 md:px-24 bg-brand-900">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_Business_Lunch_raaj59.jpg" 
          alt="Strategic Meeting" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay object-right md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/85 to-transparent"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>

      <div className="max-w-4xl relative z-10 space-y-10 animate-fadeIn pt-20">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 backdrop-blur-md">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">Strategic Consultancy Protocol</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter text-white leading-[1.05] max-w-3xl">
          Where you are going <br className="hidden md:block"/> 
          <span className="italic text-brand-gold">matters more</span> than <br className="hidden md:block"/>
          where you have been.
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-xl font-medium leading-relaxed">
          Transforming lives through emotional, financial, and personal wellness. 
          We bridge the gap between <span className="text-white font-bold">Technical IQ</span> and <span className="text-brand-gold font-bold">Behavioral EQ</span> for holistic business success.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={triggerAssessment}
            className="w-full sm:w-auto rounded-xl px-12 py-5 text-sm shadow-[0_20px_40px_rgba(212,175,55,0.3)] hover:scale-105 transition-all bg-brand-gold text-brand-900 font-black uppercase tracking-widest"
          >
            Check Financial Health
          </Button>
          <button 
            onClick={scrollToServices}
            className="w-full sm:w-auto group flex items-center justify-center gap-4 px-10 py-5 rounded-xl border border-white/20 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Explore Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-24 right-12 hidden lg:block animate-float">
         <div className="glass-card p-7 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl max-w-[300px]">
            <div className="flex items-center gap-3 mb-5">
               <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold shadow-inner">
                  <ShieldCheck size={22} />
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">Security Status</span>
                 <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mt-1">Protocol Active</span>
               </div>
            </div>
            <p className="text-sm font-bold text-white leading-relaxed">
              Real-time SARS Compliance & <br/> 
              <span className="text-brand-gold">Neural Risk Monitoring Engaged</span>
            </p>
         </div>
      </div>
    </div>
  );
};

export default Hero;
