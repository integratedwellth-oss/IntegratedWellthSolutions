
import React from 'react';
import Button from './Button';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

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
    <div className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden px-6 md:px-24 bg-brand-900">
      {/* Strategic Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_Business_Lunch_raaj59.jpg" 
          alt="Business Meeting" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/95 to-transparent"></div>
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>

      <div className="max-w-7xl relative z-10 space-y-12 animate-fadeIn pt-20">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-md">
           <Zap size={14} className="text-brand-gold" />
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold">The SARS Safety Net Is Active</span>
        </div>

        <div className="space-y-2">
          {/* Title optimized for 4 lines */}
          <h1 className="text-5xl md:text-[8rem] lg:text-[9.5rem] font-sora font-black tracking-tighter text-white leading-[0.85] max-w-6xl">
            Where you <br className="hidden md:block"/>
            are going <br className="hidden md:block"/>
            <span className="text-brand-gold italic">matters more</span> <br className="hidden md:block"/>
            than...
          </h1>
        </div>

        <p className="text-lg md:text-2xl lg:text-3xl text-white/60 max-w-4xl font-medium leading-relaxed">
          Stop working for your business and start making your business work for you. <br className="hidden md:block"/>
          We provide a <span className="text-white font-black underline decoration-brand-gold decoration-4 underline-offset-8">Safety Buffer</span> between the stress of the numbers and the life you want to live.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 pt-10">
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={triggerAssessment}
            className="w-full sm:w-auto rounded-3xl px-16 py-8 text-xl shadow-[0_40px_80px_rgba(212,175,55,0.25)] hover:scale-105 transition-all bg-brand-gold text-brand-900 font-black uppercase tracking-[0.2em]"
          >
            Start Your Freedom Plan
          </Button>
          <button 
            onClick={scrollToServices}
            className="w-full sm:w-auto group flex items-center justify-center gap-4 px-10 py-8 rounded-3xl border border-white/20 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            How We Help You <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Reassurance Floating Element */}
      <div className="absolute bottom-32 right-24 hidden xl:block animate-float">
         <div className="glass-card p-12 rounded-[4rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl max-w-[420px]">
            <div className="flex items-center gap-5 mb-8">
               <div className="w-16 h-16 rounded-2xl bg-brand-gold/20 flex items-center justify-center text-brand-gold shadow-inner border border-brand-gold/10">
                  <ShieldCheck size={32} />
               </div>
               <div className="flex flex-col">
                 <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] leading-none">Security Status</span>
                 <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-2">SARS Audit Shield Active</span>
               </div>
            </div>
            <p className="text-2xl font-bold text-white leading-relaxed">
              We fix the messy books <br/> 
              <span className="text-brand-gold font-black italic">So You Don't Have To.</span>
            </p>
         </div>
      </div>
    </div>
  );
};

export default Hero;
