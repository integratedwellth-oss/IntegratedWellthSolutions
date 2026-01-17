import React from 'react';
import Button from './Button';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 bg-brand-900 overflow-hidden">
      {/* Background Image - Increased Opacity */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_Business_Lunch_raaj59.jpg"
          alt="Strategy"
          className="w-full h-full object-cover opacity-30 object-center" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-8 backdrop-blur-md">
          <Zap size={14} className="text-brand-gold" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-gold">The SARS Safety Net Is Active</span>
        </div>

        {/* Font size reduced for better mobile/desktop balance */}
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-sora font-black tracking-tighter text-white leading-[1.1] mb-8">
          Where you are going <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white italic">matters more.</span>
        </h1>

        <p className="text-lg text-brand-100/80 max-w-2xl font-medium leading-relaxed mb-10 border-l-4 border-brand-gold pl-6">
          We provide a <strong className="text-white">Safety Buffer</strong> between the stress of the numbers and the life you want to live.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.location.hash = '#assessment'}
            className="w-full sm:w-auto rounded-full px-12 py-6 text-base font-black uppercase tracking-widest shadow-2xl bg-brand-gold text-brand-900 hover:bg-white transition-all"
          >
            Start Freedom Plan
          </Button>
          <button
            onClick={() => {
              const el = document.getElementById('services-anchor');
              if(el) el.scrollIntoView({behavior: 'smooth'});
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-6 rounded-full border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Explore Ecosystem <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Floating Card - Smaller & Better Placed */}
      <div className="absolute bottom-12 right-6 hidden lg:block z-20 animate-float">
        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl max-w-xs">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-900">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[9px] font-black text-white/50 uppercase tracking-widest">Security Status</p>
              <p className="text-xs font-bold text-emerald-400 uppercase">Audit Shield Active</p>
            </div>
          </div>
          <p className="text-sm font-medium text-white">We fix the messy books so you don't have to.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
