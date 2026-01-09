import React from 'react';
import { useNavigate } from 'react-router-dom';
import FinancialHealthScore from '../components/FinancialHealthScore';
import { Zap, ShieldCheck } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      
      {/* HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 rounded-b-[3rem] overflow-hidden shadow-2xl">
        
        {/* BACKGROUND IMAGE - Replaced Skyscraper with Executive Context */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            alt="Executive Command" 
            className="w-full h-full object-cover"
          />
          {/* Heavy gradient to ensure text pops */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-900/90 to-brand-900/50"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-10 animate-in slide-in-from-left duration-700">
            
            {/* COMPACT STATUS PILL */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase tracking-widest shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Status: SECURE
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1] text-white font-sora drop-shadow-2xl">
              Legacy <br/>
              <span className="text-brand-gold italic">
                Engineering.
              </span>
            </h1>
            
            <p className="text-xl text-brand-50/90 max-w-lg leading-relaxed font-medium">
              We bridge the gap between Technical IQ and Behavioral EQ. Move from survival mode to sovereign command.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => navigate('/war-room')} 
                className="px-8 py-4 bg-brand-gold text-brand-900 font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center gap-2"
              >
                <Zap size={18} fill="currentColor" /> Enter War Room
              </button>
              <button 
                onClick={() => document.getElementById('assess')?.scrollIntoView({behavior: 'smooth'})} 
                className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-black uppercase tracking-widest rounded-full hover:bg-white/20 transition-all"
              >
                Run Diagnostic
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC SECTION */}
      <section id="assess" className="py-24 px-6 bg-slate-50 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-brand-900 uppercase tracking-tighter mb-4 font-sora">Strategic Triage</h2>
          <div className="w-24 h-1.5 bg-brand-gold mx-auto rounded-full"></div>
          <p className="text-gray-500 mt-6 text-lg">Determine your operational readiness with our comprehensive diagnostic engine.</p>
        </div>
        <FinancialHealthScore />
      </section>
    </div>
  );
};

export default Home;
