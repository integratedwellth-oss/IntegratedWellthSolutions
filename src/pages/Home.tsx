/**
 * IWS SOVEREIGNTY - HOME TERMINAL
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  TrendingUp, 
  Lock, 
  ArrowRight, 
  ChevronRight,
  BarChart3
} from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[#05070a] min-h-screen text-white">
      {/* Tactical Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-8 animate-pulse">
              <ShieldCheck size={12} /> Institutional Governance Protocol v1.1
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Wealth <br /> 
              <span className="text-brand-gold">Sovereignty.</span>
            </h1>
            
            <p className="text-gray-400 text-sm md:text-lg font-medium leading-relaxed max-w-xl mb-10 font-mono">
              The transition from reactive income management to institutional-grade wealth architecture. 
              Built for South African founders navigating systemic volatility.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/war-room" 
                className="group px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-brand-gold transition-all flex items-center justify-center gap-2"
              >
                Enter War Room <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                Schedule Triage
              </Link>
            </div>
          </div>
        </div>

        {/* Tactical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </section>

      {/* Risk Vectors Section */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#080a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 p-8 bg-white/5 border border-white/5 rounded-3xl hover:border-brand-gold/30 transition-all">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-6">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Fiscal Triage</h3>
              <p className="text-xs text-gray-500 font-bold leading-relaxed uppercase tracking-tighter">
                Real-time stress testing against ZAR volatility and South African structural shocks.
              </p>
            </div>

            <div className="space-y-4 p-8 bg-white/5 border border-white/5 rounded-3xl hover:border-brand-gold/30 transition-all">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-6">
                <Lock size={24} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Asset Shielding</h3>
              <p className="text-xs text-gray-500 font-bold leading-relaxed uppercase tracking-tighter">
                Offshore legal layering and structural protection against regulatory creep.
              </p>
            </div>

            <div className="space-y-4 p-8 bg-white/5 border border-white/5 rounded-3xl hover:border-brand-gold/30 transition-all">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-6">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-white">Wealth Alpha</h3>
              <p className="text-xs text-gray-500 font-bold leading-relaxed uppercase tracking-tighter">
                Optimizing tax leakage to recapture lost capital for institutional growth.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
