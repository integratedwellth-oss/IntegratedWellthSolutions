import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, TrendingDown, Lock } from 'lucide-react';

const WarRoom = () => {
  const [cash, setCash] = useState(100000);
  const [burn, setBurn] = useState(25000);
  const [shock, setShock] = useState(0);
  const [runway, setRunway] = useState(0);
  
  useEffect(() => {
    const netBurn = burn * (1 + shock / 100);
    if (netBurn > 0) {
        setRunway(cash / netBurn);
    } else {
        setRunway(999);
    }
  }, [cash, burn, shock]);

  return (
    <div className="min-h-screen bg-brand-dark pt-32 px-6 font-mono text-emerald-500">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="border-b border-emerald-900/50 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-red-500/30 bg-red-950/20 text-red-500 text-xs font-black uppercase tracking-widest mb-4">
            <ShieldAlert size={14} /> Live Simulation Environment
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">The War Room<span className="text-emerald-500">.</span></h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* INPUTS */}
          <div className="space-y-8 bg-slate-900/50 p-8 rounded-3xl border border-emerald-900/20">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-emerald-700">Cash Reserves (ZAR)</label>
              <input type="number" value={cash} onChange={e => setCash(Number(e.target.value))} className="w-full bg-black border border-emerald-800 rounded-lg p-4 text-white text-xl focus:border-emerald-400 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-emerald-700">Monthly Burn Rate (ZAR)</label>
              <input type="number" value={burn} onChange={e => setBurn(Number(e.target.value))} className="w-full bg-black border border-emerald-800 rounded-lg p-4 text-white text-xl focus:border-emerald-400 outline-none transition-colors" />
            </div>
            <div className="pt-6 border-t border-emerald-900/30">
              <label className="flex justify-between text-xs font-bold uppercase tracking-widest mb-4 text-red-400">
                <span>Black Swan Event (Shock)</span>
                <span>{shock}% Impact</span>
              </label>
              <input type="range" min="0" max="100" value={shock} onChange={e => setShock(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500" />
            </div>
          </div>

          {/* OUTPUTS */}
          <div className="space-y-6">
            <div className={`p-10 rounded-3xl border-2 transition-all ${runway < 3 ? 'bg-red-950/20 border-red-500/50' : 'bg-emerald-950/20 border-emerald-500/50'}`}>
              <h3 className="text-xs font-black uppercase tracking-widest opacity-50 mb-2">Survival Timeline</h3>
              <div className="text-6xl font-black text-white">{runway >= 999 ? "∞" : runway.toFixed(1)} <span className="text-2xl text-white/50">Months</span></div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl border border-emerald-900/30">
              <Activity className="mb-4" />
              <h4 className="text-white font-bold uppercase mb-2">Strategic Intelligence</h4>
              <p className="text-sm opacity-80 leading-relaxed">
                {runway < 3 
                  ? "CRITICAL ALERT: Your runway is below the safety threshold. Initiate 'Defensive Protocol' immediately. Cut variable costs and activate credit lines."
                  : "STATUS STABLE: You have strategic maneuverability. Consider allocating surplus to 'Legacy Engineering' modules."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WarRoom;
