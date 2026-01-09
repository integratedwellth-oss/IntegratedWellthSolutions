import React from 'react';
import { useNavigate } from 'react-router-dom';
import FinancialHealthScore from '../components/FinancialHealthScore';
import { Zap, ShieldCheck } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 bg-brand-900 text-white rounded-b-[4rem] relative overflow-hidden shadow-2xl">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-black uppercase tracking-widest">
              <Zap size={14} /> Integrated Intelligence v2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter leading-[0.9]">
              Legacy <br/><span className="text-brand-gold italic">Engineering.</span>
            </h1>
            <p className="text-xl text-brand-50/80 max-w-lg leading-relaxed">
              We bridge the gap between Technical IQ and Behavioral EQ. Move from survival mode to sovereign command.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/war-room')} className="px-8 py-4 bg-brand-gold text-brand-900 font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform shadow-lg shadow-brand-gold/20">
                Enter War Room
              </button>
              <button onClick={() => document.getElementById('assess')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 border border-white/20 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors">
                Run Diagnostic
              </button>
            </div>
          </div>
          
          {/* VISUAL ELEMENT */}
          <div className="relative hidden lg:block">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-[2.5rem] animate-float">
              <ShieldCheck size={48} className="text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">System Status: SECURE</h3>
              <p className="text-sm opacity-60">Real-time tax compliance and psychological sentiment analysis active.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC SECTION */}
      <section id="assess" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-black text-brand-900 uppercase tracking-tighter">Strategic Triage</h2>
          <p className="text-gray-500 mt-4">Determine your operational readiness.</p>
        </div>
        <FinancialHealthScore />
      </section>
    </div>
  );
};

export default Home;
