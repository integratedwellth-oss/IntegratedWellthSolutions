import React from 'react';
import { useNavigate } from 'react-router-dom';
import FinancialHealthScore from '../components/FinancialHealthScore';
import { Zap, ShieldCheck, Activity } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      
      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="relative pt-48 pb-32 px-6 rounded-b-[4rem] overflow-hidden">
        
        {/* BACKGROUND IMAGE OVERLAY */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Corporate Architecture" 
            className="w-full h-full object-cover"
          />
          {/* THE DARK GRADIENT OVERLAY - Makes text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/80 to-brand-900/40"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            
            {/* NEW COMPACT SYSTEM STATUS PILL */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md text-emerald-400 text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-900/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Status: SECURE
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95] text-white font-sora drop-shadow-lg">
              Legacy <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-brand-gold italic">
                Engineering.
              </span>
            </h1>
            
            <p className="text-xl text-brand-50/90 max-w-lg leading-relaxed font-medium">
              We bridge the gap between Technical IQ and Behavioral EQ. Move from survival mode to sovereign command.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => navigate('/war-room')} 
                className="px-8 py-4 bg-brand-gold text-brand-900 font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-2"
              >
                <Zap size={18} fill="currentColor" /> Enter War Room
              </button>
              <button 
                onClick={() => document.getElementById('assess')?.scrollIntoView({behavior: 'smooth'})} 
                className="px-8 py-4 border border-white/30 bg-white/5 backdrop-blur-sm text-white font-black uppercase tracking-widest rounded-full hover:bg-white/20 transition-all"
              >
                Run Diagnostic
              </button>
            </div>
          </div>
          
          {/* VISUAL ELEMENT (Floating Abstract Graphic) */}
          <div className="relative hidden lg:block animate-float">
             {/* This space ensures the text doesn't stretch too wide, giving the 'Hero' image space to breathe on the right */}
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC SECTION */}
      <section id="assess" className="py-24 px-6 bg-slate-50 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-brand-900 uppercase tracking-tighter mb-4 font-sora">Strategic Triage</h2>
          <div className="w-24 h-1.5 bg-brand-gold mx-auto rounded-full"></div>
          <p className="text-gray-500 mt-6 text-lg">Determine your operational readiness with our diagnostic engine.</p>
        </div>
        <FinancialHealthScore />
      </section>
    </div>
  );
};

export default Home;
