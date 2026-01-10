import React from 'react';
import { ShieldAlert, Zap, BarChart3, Lock, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import FinancialHealthScore from '../components/FinancialHealthScore';
import ComplianceCalendar from '../components/ComplianceCalendar';

const WarRoom = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-inter">
      
      {/* HEADER: COMMAND CENTER AUTHENTICATION */}
      <section className="pt-40 pb-20 px-6 border-b border-white/5 bg-gradient-to-b from-brand-900 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">
                <Lock size={12} /> Secure Access: Founder Level
              </div>
              <h1 className="text-5xl md:text-7xl font-black font-sora tracking-tighter">
                The <span className="text-brand-gold">War Room.</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl font-light">
                This is where we strip away the noise. No marketing fluff. Just data, governance, and strategic execution.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <Activity className="text-brand-gold mb-2" size={20} />
                <span className="block text-[10px] uppercase text-gray-500 font-bold">System Pulse</span>
                <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Active</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <BarChart3 className="text-brand-gold mb-2" size={20} />
                <span className="block text-[10px] uppercase text-gray-500 font-bold">Data Stream</span>
                <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Syncing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE DIAGNOSTIC ENGINE */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[120px] -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 space-y-8">
              <div className="p-4 bg-brand-gold/10 border-l-4 border-brand-gold rounded-r-2xl">
                <h3 className="text-brand-gold font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                  <ShieldAlert size={18} /> Phase 1: Triage
                </h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-black font-sora leading-tight">
                Identify The <br/> <span className="text-brand-gold">Friction.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Most business failures are silent. They happen in the gaps between your bank statement and your tax obligations. Our diagnostic engine highlights exactly where your foundation is cracking.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm font-bold text-gray-300 uppercase tracking-widest">
                  <Zap size={16} className="text-brand-gold" /> Operational Liquidity
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-gray-300 uppercase tracking-widest">
                  <Zap size={16} className="text-brand-gold" /> Governance Integrity
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-gray-300 uppercase tracking-widest">
                  <Zap size={16} className="text-brand-gold" /> Behavioral Risk
                </li>
              </ul>
            </div>
            
            <div className="lg:col-span-8 bg-white/5 p-8 rounded-[3rem] border border-white/10 backdrop-blur-sm shadow-2xl">
              <FinancialHealthScore />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE COMPLIANCE RADAR */}
      <section className="py-24 px-6 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <ComplianceCalendar />
          </div>
          
          <div className="lg:col-span-5 space-y-8 order-1 lg:order-2">
            <div className="p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-2xl">
              <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <ShieldCheck size={18} /> Phase 2: Fortification
              </h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-black font-sora leading-tight">
              Maintain <br/> <span className="text-brand-gold">Sovereign Compliance.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Compliance is not a chore; it is your shield. By mastering the statutory cycle, you ensure that the state and creditors can never interfere with your growth trajectory.
            </p>
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10 italic text-gray-300">
              "We monitor the calendar so you can focus on the vision."
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CALL TO COMMAND */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-6xl font-black font-sora tracking-tighter">
            Ready To <span className="text-brand-gold">Deploy?</span>
          </h2>
          <p className="text-xl text-gray-400 font-light">
            Analysis is useless without action. Book a Strategic Deployment Session with our engineering team today.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-12 py-5 bg-brand-gold text-brand-900 font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2">
              Book Tactical Review <ArrowRight size={20} />
            </button>
            <button className="px-12 py-5 border border-white/20 bg-white/5 text-white font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all">
              Download IWS Framework
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default WarRoom;
