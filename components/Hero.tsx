import React from 'react';
import Button from './Button'; 
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden px-6 md:px-12 lg:px-24 bg-brand-900">
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_Business_Lunch_raaj59.jpg"
          alt="IWS Strategic Session"
          className="w-full h-full object-cover opacity-40 mix-blend-normal object-center"
          // PERFORMANCE: This tells the browser to prioritize this image for the speed score
          fetchpriority="high" 
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/90 to-brand-900/30"></div>
      </div>

      <div className="max-w-7xl relative z-10 space-y-8 animate-fadeIn pt-20">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-md">
          <Zap size={14} className="text-brand-gold" aria-hidden="true" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">The SARS Safety Net Is Active</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-sora font-black tracking-tighter text-white leading-[0.95] max-w-5xl">
            Where you <br className="hidden md:block"/>
            are going <br className="hidden md:block"/>
            <span className="text-brand-gold italic">matters more</span> <br className="hidden md:block"/>
            than...
          </h1>
        </div>

        <p className="text-lg md:text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
          Stop working for your business and start making your business work for you. <br className="hidden md:block"/>
          We provide a <span className="text-white font-black underline decoration-brand-gold decoration-4 underline-offset-4">Safety Buffer</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.location.hash = '#assessment'}
            className="w-full sm:w-auto rounded-full px-10 py-6 text-lg shadow-2xl bg-brand-gold text-brand-900 font-black uppercase"
            aria-label="Start Compliance Assessment"
          >
            Start My Compliance Assessment
          </Button>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto group flex items-center justify-center gap-4 px-8 py-6 rounded-full border border-white/20 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Explore Ecosystem <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
