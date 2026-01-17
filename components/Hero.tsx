import React from 'react';
import Button from '../Button';
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
    <div className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden px-6 md:px-12 lg:px-24 bg-brand-900">
      {/* Strategic Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_Business_Lunch_raaj59.jpg"
          alt="Business Meeting"
          className="w-full h-full object-cover opacity-40 mix-blend-normal object-center" // Increased opacity
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/90 to-brand-900/30"></div>
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      </div>

      <div className="max-w-7xl relative z-10 space-y-8 animate-fadeIn pt-20">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-md">
          <Zap size={14} className="text-brand-gold" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">The SARS Safety Net Is Active</span>
        </div>

        <div className="space-y-2">
          {/* Title sized correctly for readability */}
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-sora font-black tracking-tighter text-white leading-[0.95] max-w-5xl">
            Where you <br className="hidden md:block"/>
            are going <br className="hidden md:block"/>
            <span className="text-brand-gold italic">matters more</span> <br className="hidden md:block"/>
            than...
          </h1>
        </div>

        <p className="text-lg md:text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
          Stop working for your business and start making your business work for you. <br className="hidden md:block"/>
          We provide a <span className="text-white font-black underline decoration-brand-gold decoration-4 underline-offset-4">Safety Buffer</span> between the stress of the numbers and the life you want to live.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
          <Button
            size="lg"
            variant="secondary"
            onClick={triggerAssessment}
            className="w-full sm:w-auto rounded-full px-10 py-6 text-lg shadow-[0_20px_40px_rgba(212,175,55,0.25)] hover:scale-105 transition-all bg-brand-gold text-brand-900 font-black uppercase tracking-[0.15em]"
          >
            Start Your Freedom Plan
          </Button>
          <button
            onClick={scrollToServices}
            className="w-full sm:w-auto group flex items-center justify-center gap-4 px-8 py-6 rounded-full border border-white/20 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            How We Help You <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Reassurance Floating Element - Resized and Repositioned */}
      <div className="absolute bottom-24 right-6 lg:bottom-32 lg:right-24 hidden lg:block animate-float z-20">
        <div className="glass-card p-6 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl max-w-[320px]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold shadow-inner border border-brand-gold/10">
              <ShieldCheck size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.2em] leading-none">Security Status</span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1">SARS Audit Shield Active</span>
            </div>
          </div>
          <p className="text-lg font-bold text-white leading-snug">
            We fix the messy books <br/>
            <span className="text-brand-gold font-black italic">So You Don't Have To.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
