import React, { useState, useMemo } from 'react';
import { Terminal, ShieldAlert, Calculator, Radio, ShieldCheck, ArrowRight } from 'lucide-react';
// FIX: Go up one level (../) then into components
import ComplianceCalendar from '../components/ComplianceCalendar'; 

const WarRoom = () => {
  const [cash, setCash] = useState<number>(500000);
  const [burn, setBurn] = useState<number>(50000);
  const [revenue, setRevenue] = useState<number>(100000);
  const [shock, setShock] = useState<number>(0);

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
    <div className="min-h-screen bg-[#05070a] text-slate-400 font-mono pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-center p-6 bg-[#0a0c12] border border-white/5 rounded-2xl">
          <div className="flex items-center gap-4">
            <Terminal className="text-brand-gold" size={24} />
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter">IWS Terminal</h1>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
                <Radio size={10} className="text-red-500 animate-pulse" /> Live Simulation
              </div>
            </div>
          </div>
          <div className={`px-6 py-2 rounded-lg border ${calculations.status.border} ${calculations.status.bg}`}>
            <span className={`text-sm font-black ${calculations.status.color}`}>{calculations.status.label}</span>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-6">
          <main className="lg:col-span-8 space-y-6">
            <section className="bg-[#0a0c12] border border-white/5 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-8">
                <Calculator size={18} className="text-brand-gold" />
                <h2 className="text-xs font-black text-white uppercase tracking-widest">Black Swan Stress Test</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Cash Reserves</label>
                  <input type="number" value={cash} onChange={(e) => setCash(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-gold outline-none" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Revenue Shock (%)</label>
                  <input type="range" min="0" max="100" value={shock} onChange={(e) => setShock(Number(e.target.value))} className="w-full accent-brand-gold" />
                </div>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                <div>
                  <span className="block text-[10px] text-gray-500 uppercase mb-2">Runway Projection</span>
                  <span className="text-3xl font-black text-white">{calculations.runway === Infinity ? '∞' : `${Math.floor(calculations.runway)} Mo`}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-500 uppercase mb-2">Net Cash Flow</span>
                  <span className={`text-3xl font-black ${calculations.netFlow >= 0 ? 'text-emerald-400' : 'text-red-500'}`}>R{Math.abs(calculations.netFlow).toLocaleString()}</span>
                </div>
              </div>
            </section>
            {/* The component below needs to exist in src/components/ComplianceCalendar.tsx */}
            <ComplianceCalendar />
          </main>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#0a0c12] border border-brand-gold/20 rounded-2xl p-6">
              <h3 className="text-xs font-black text-brand-gold uppercase tracking-widest mb-6 flex items-center gap-2">
                <ShieldAlert size={14} /> Tactical Protocol
              </h3>
              <div className="p-4 bg-white/5 rounded-xl border-l-2 border-brand-gold mb-6">
                <p className="text-xs text-white leading-relaxed font-bold">{calculations.status.tip}</p>
              </div>
              <button className="w-full py-4 bg-brand-gold text-brand-900 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2">
                Request Strategic Triage <ArrowRight size={14} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;
