import React, { useState, useMemo } from 'react';
import { 
  Terminal, ShieldAlert, Activity, Calculator, 
  Brain, AlertTriangle, ArrowRight, Gauge, 
  TrendingDown, ShieldCheck, Lock, Radio
} from 'lucide-react';
import ComplianceCalendar from '../components/ComplianceCalendar';

const WarRoom = () => {
  // --- 1. CORE DATA STATE ---
  const [cash, setCash] = useState<number>(500000);
  const [burn, setBurn] = useState<number>(50000);
  const [revenue, setRevenue] = useState<number>(100000);
  const [shock, setShock] = useState<number>(0);

  // --- 2. CALCULATED FINANCIAL INTELLIGENCE ---
  const calculations = useMemo(() => {
    const adjRevenue = Math.max(0, revenue * (1 - shock / 100));
    const netFlow = adjRevenue - burn;
    const isNegative = netFlow < 0;
    const runway = isNegative ? Math.abs(cash / netFlow) : Infinity;
    
    // Tactical Status Logic
    let status = { label: 'SOVEREIGN', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', tip: 'Offensive Growth Mode' };
    if (isNegative) {
      if (runway <= 3) status = { label: 'CRITICAL', color: 'text-red-500', border: 'border-red-500/30', bg: 'bg-red-500/5', tip: 'Emergency Triage Required' };
      else if (runway <= 6) status = { label: 'CAUTION', color: 'text-brand-gold', border: 'border-brand-gold/30', bg: 'bg-brand-gold/5', tip: 'Defensive Fortification' };
      else status = { label: 'STABLE', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/5', tip: 'Strategic Optimization' };
    }

    return { netFlow, runway, status, adjRevenue };
  }, [cash, burn, revenue, shock]);

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-400 font-mono selection:bg-brand-gold selection:text-black pt-28 pb-12 px-6">
      
      {/* --- GRID LAYOUT --- */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* TOP BAR / SYSTEM STATUS (Full Width) */}
        <header className="lg:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-[#0a0c12] border border-white/5 rounded-2xl mb-2">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-gold/10 rounded-lg text-brand-gold border border-brand-gold/20">
              <Terminal size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white font-sora tracking-tighter uppercase">IWS Terminal: War Room</h1>
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-gray-500">
                <Radio size={10} className="text-red-500 animate-pulse" /> Live Tactical Simulation
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-6">
            <div className="text-right">
              <span className="block text-[10px] font-black text-gray-500 uppercase">Access Level</span>
              <span className="text-xs font-bold text-white flex items-center gap-1 justify-end"><Lock size={12} className="text-brand-gold" /> Founder_Admin</span>
            </div>
            <div className={`px-6 py-2 rounded-lg border ${calculations.status.border} ${calculations.status.bg}`}>
              <span className={`text-sm font-black tracking-tighter ${calculations.status.color}`}>{calculations.status.label}</span>
            </div>
          </div>
        </header>

        {/* LEFT PANEL: BLACK SWAN STRESS TEST (Simulation Core) */}
        <main className="lg:col-span-8 space-y-6">
          <section className="bg-[#0a0c12] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                <Calculator size={14} className="text-brand-gold" /> Black Swan Simulator
              </h2>
              <span className="text-[10px] text-gray-500">INPUT VARIABLES</span>
            </div>
            
            <div className="p-8 grid md:grid-cols-3 gap-10">
              {/* Financial Inputs */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Liquid Reserves (R)</label>
                  <input 
                    type="number" value={cash} onChange={(e) => setCash(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-brand-gold outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Operational Burn (R)</label>
                  <input 
                    type="number" value={burn} onChange={(e) => setBurn(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-brand-gold outline-none transition-all"
                  />
                </div>
              </div>

              {/* Stress Slider */}
              <div className="md:col-span-2 space-y-6 p-6 bg-black/20 rounded-xl border border-white/5">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Market Revenue Shock</label>
                  <span className="text-2xl font-black text-brand-gold">{shock}% <span className="text-[10px] text-gray-500 uppercase">Impact</span></span>
                </div>
                <input 
                  type="range" min="0" max="100" value={shock} onChange={(e) => setShock(Number(e.target.value))}
                  className="w-full accent-brand-gold"
                />
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <span className="block text-[8px] text-gray-500 uppercase mb-1">Base Revenue</span>
                    <span className="text-xs font-bold text-white">R {revenue.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] text-gray-500 uppercase mb-1">Adjusted Yield</span>
                    <span className="text-xs font-bold text-brand-gold">R {calculations.adjRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation Results (Survival Timeline) */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/5 bg-white/[0.01]">
              <div className="p-8 border-r border-white/5">
                <span className="text-[10px] font-black text-gray-500 uppercase block mb-2 tracking-widest">Survival Runway</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{calculations.runway === Infinity ? '∞' : calculations.runway}</span>
                  <span className="text-xs font-bold text-gray-500 uppercase">Months</span>
                </div>
                <p className="text-[9px] text-gray-500 mt-2 italic uppercase">Projection based on current burn</p>
              </div>
              <div className="p-8 border-r border-white/5">
                <span className="text-[10px] font-black text-gray-500 uppercase block mb-2 tracking-widest">Adjusted Net Flow</span>
                <span className={`text-4xl font-black ${calculations.netFlow >= 0 ? 'text-emerald-400' : 'text-red-500'}`}>
                  R {Math.abs(calculations.netFlow).toLocaleString()}
                </span>
                <span className="text-[10px] block font-bold text-gray-600 mt-2 uppercase">{calculations.netFlow >= 0 ? 'Monthly Surplus' : 'Monthly Deficit'}</span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-[10px] font-black text-gray-500 uppercase block mb-2 tracking-widest">Protocol Tip</span>
                <p className="text-xs font-bold text-white leading-relaxed flex items-center gap-2">
                  <Activity size={14} className="text-brand-gold" /> {calculations.status.tip}
                </p>
              </div>
            </div>
          </section>

          {/* GOVERNANCE: COMPLIANCE INTEGRATION */}
          <section className="bg-[#0a0c12] border border-white/5 rounded-2xl shadow-2xl overflow-hidden">
            <ComplianceCalendar />
          </section>
        </main>

        {/* RIGHT PANEL: PSYCHOLOGY & ACTION (Triage Side) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* BEHAVIORAL EQ MODULE */}
          <section className="bg-[#0a0c12] border border-brand-gold/20 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Brain size={80} />
            </div>
            <h3 className="text-xs font-black text-brand-gold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <ShieldAlert size={14} /> Tactical Protocol
            </h3>
            
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-xl border-l-2 border-brand-gold">
                <p className="text-xs text-white leading-relaxed font-bold">
                  {calculations.status.label === 'CRITICAL' 
                    ? "EMERGENCY: Halt all emotional capital expenditure. The ego must be decoupled from the P&L immediately."
                    : "STABILITY: Institutional daring is only possible with governance armor. Continue building sovereign reserves."}
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">DEFENSIVE CHECKLIST</span>
                {[
                  "Audit Variable Leaks",
                  "Statutory Alignment",
                  "
