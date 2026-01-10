import React, { useState, useMemo } from 'react';
import { 
  Terminal, ShieldAlert, Activity, Calculator, 
  Brain, AlertTriangle, ArrowRight, 
  TrendingDown, ShieldCheck, Lock, Radio
} from 'lucide-react';
import ComplianceCalendar from './ComplianceCalendar';

const WarRoom = () => {
  // --- CORE DATA STATE ---
  const [cash, setCash] = useState<number>(500000);
  const [burn, setBurn] = useState<number>(50000);
  const [revenue, setRevenue] = useState<number>(100000);
  const [shock, setShock] = useState<number>(0);

  // --- CALCULATED FINANCIAL INTELLIGENCE ---
  const calculations = useMemo(() => {
    const adjRevenue = Math.max(0, revenue * (1 - shock / 100));
    const netFlow = adjRevenue - burn;
    const isNegative = netFlow < 0;
    const runway = isNegative ? Math.abs(cash / netFlow) : Infinity;
    
    let status = { label: 'SOVEREIGN', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', tip: 'Offensive Growth Mode' };
    if (isNegative) {
      if (runway <= 3) status = { label: 'CRITICAL', color: 'text-red-500', border: 'border-red-500/30', bg: 'bg-red-500/5', tip: 'Emergency Triage Required' };
      else if (runway <= 6) status = { label: 'CAUTION', color: 'text-brand-gold', border: 'border-brand-gold/30', bg: 'bg-brand-gold/5', tip: 'Defensive Fortification' };
      else status = { label: 'STABLE', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/5', tip: 'Strategic Optimization' };
    }

    return { netFlow, runway, status, adjRevenue };
  }, [cash, burn, revenue, shock]);

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-400 font-mono pt-28 pb-12 px-6">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* TOP BAR */}
        <header className="lg:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-[#0a0c12] border border-white/5 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-gold/10 rounded-lg text-brand-gold border border-brand-gold/20">
              <Terminal size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter">IWS Terminal</h1>
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500">
                <Radio size={10} className="text-red-500 animate-pulse" /> Tactical Simulation Active
              </div>
            </div>
          </div>
          <div className={`px-6 py-2 rounded-lg border ${calculations.status.border} ${calculations.status.bg}`}>
            <span className={`text-sm font-black tracking-tighter ${calculations.status.color}`}>{calculations.status.label}</span>
          </div>
        </header>

        {/* LEFT PANEL: SIMULATOR */}
        <main className="lg:col-span-8 space-y-6">
          <section className="bg-[#0a0c12] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 bg-white/[0.02]">
              <h2 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                <Calculator size={14} className="text-brand-gold" /> Black Swan Simulator
              </h2>
            </div>
            
            <div className="p-8 grid md:grid-cols-3 gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase">Liquid Reserves (R)</label>
                  <input type="number" value={cash} onChange={(e) => setCash(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-brand-gold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase">Monthly Burn (R)</label>
                  <input type="number" value={burn} onChange={(e) => setBurn(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-brand-gold" />
                </div>
              </div>

              <div className="md:col-span-2 space-y-6 p-6 bg-black/20 rounded-xl border border-white/5">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-gray-500 uppercase">Revenue Shock</label>
                  <span className="text-2xl font-black text-brand-gold">{shock}%</span>
                </div>
                <input type="range" min="0" max="100" value={shock} onChange={(e) => setShock(Number(e.target.value))} className="w-full accent-brand-gold" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/5 bg-white/[0.01]">
              <div className="p-8 border-r border-white/5">
                <span className="text-[10px] font-black text-gray-500 uppercase block mb-2">Survival Runway</span>
                <span className="text-4xl font-black text-white">{calculations.runway === Infinity ? '∞' : Math.floor(calculations.runway)} Months</span>
              </div>
              <div className="p-8">
                <span className="text-[10px] font-black text-gray-500 uppercase block mb-2">Net Cash Flow</span>
                <span className={`text-4xl font-black ${calculations.netFlow >= 0 ? 'text-emerald-400' : 'text-red-500'}`}>R {Math.abs(calculations.netFlow).toLocaleString()}</span>
              </div>
            </div>
          </section>

          <section className="bg-[#0a0c12] border border-white/5 rounded-2xl overflow-hidden">
            <ComplianceCalendar />
          </section>
        </main>

        {/* RIGHT PANEL: PROTOCOL */}
        <aside className="lg:col-span-4 space-y-6">
          <section className="bg-[#0a0c12] border border-brand-gold/20 rounded-2xl p-6 relative overflow-hidden group">
            <h3 className="text-xs font-black text-brand-gold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <ShieldAlert size={14} /> Tactical Protocol
            </h3>
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border-l-2 border-brand-gold">
                <p className="text-xs text-white leading-relaxed font-bold">
                  {calculations.status.tip}
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 p-2 bg-black/20 rounded-lg text-[10px] font-bold text-slate-300">
                  <ShieldCheck size={12} className="text-brand-gold" /> Audit Behavioral Leaks
                </li>
                <li className="flex items-center gap-3 p-2 bg-black/20 rounded-lg text-[10px] font-bold text-slate-300">
                  <ShieldCheck size={12} className="text-brand-gold" /> Governance Alignment
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <button className="w-full p-4 bg-brand-gold text-brand-900 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-between">
              Request Strategic Triage <ArrowRight size={14} />
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default WarRoom;
