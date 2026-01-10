import React, { useState } from 'react';
import { 
  ShieldAlert, Zap, TrendingDown, Lock, Activity, Terminal, 
  AlertTriangle, ArrowRight, Brain, Calculator, ShieldCheck 
} from 'lucide-react';
import ComplianceCalendar from '../components/ComplianceCalendar';

const WarRoom = () => {
  // Defensive State Initialization
  const [cash, setCash] = useState<number>(500000);
  const [burn, setBurn] = useState<number>(50000);
  const [revenue, setRevenue] = useState<number>(75000);
  const [shock, setShock] = useState<number>(0);

  // Meticulous Math with Fallbacks to prevent NaN crashes
  const adjustedRevenue = (revenue || 0) * (1 - (shock || 0) / 100);
  const netCashFlow = adjustedRevenue - (burn || 0);
  
  // Calculate Runway with a safety check for division by zero
  const runway = netCashFlow >= 0 
    ? 'Infinite' 
    : Math.abs(Math.floor((cash || 0) / netCashFlow));

  const getStatus = () => {
    if (netCashFlow > 20000) return { label: 'SOVEREIGN', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
    if (netCashFlow > 0) return { label: 'STABLE', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
    if (runway !== 'Infinite' && Number(runway) < 6) return { label: 'CRITICAL', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
    return { label: 'CAUTION', color: 'text-brand-gold', bg: 'bg-brand-gold/10', border: 'border-brand-gold/20' };
  };

  const status = getStatus();

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 font-mono">
      
      {/* HEADER */}
      <div className="pt-32 pb-12 px-6 border-b border-white/5 bg-gradient-to-b from-[#0a0c10] to-transparent">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-gold mb-2">
              <Terminal size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">IWS Tactical Interface v4.0.1</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white font-sora tracking-tighter uppercase">
              War <span className="text-brand-gold">Room.</span>
            </h1>
          </div>
          <div className={`px-6 py-4 rounded-xl border ${status.border} ${status.bg} backdrop-blur-xl`}>
            <span className="block text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Operational Status</span>
            <span className={`text-2xl font-black tracking-tighter ${status.color}`}>{status.label}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-12 gap-8">
        {/* LEFT: SIMULATOR & COMPLIANCE */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-[#0f1218] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Calculator size={120} /></div>
            <div className="flex items-center gap-3 mb-8">
              <ShieldAlert className="text-brand-gold" size={24} />
              <h2 className="text-xl font-bold text-white uppercase font-sora">Black Swan Stress Test</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-500 uppercase">Liquid Cash (R)</label>
                <input type="number" value={cash} onChange={(e) => setCash(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold outline-none" />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-500 uppercase">Monthly Burn (R)</label>
                <input type="number" value={burn} onChange={(e) => setBurn(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold outline-none" />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-500 uppercase">Revenue Shock ({shock}%)</label>
                <input type="range" min="0" max="100" value={shock} onChange={(e) => setShock(Number(e.target.value))} className="w-full accent-brand-gold" />
              </div>
            </div>
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-black text-gray-500 uppercase block mb-2">Adjusted Net Flow</span>
                <span className={`text-3xl font-black ${netCashFlow >= 0 ? 'text-emerald-400' : 'text-red-500'}`}>R {netCashFlow.toLocaleString()}</span>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-black text-gray-500 uppercase block mb-2">Survival Runway</span>
                <span className="text-3xl font-black text-white">{runway} {runway === 'Infinite' ? '' : 'Months'}</span>
              </div>
            </div>
          </div>
          <ComplianceCalendar />
        </div>

        {/* RIGHT: PSYCHOLOGY */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-brand-900 border border-brand-gold/20 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Brain size={100} /></div>
            <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2"><Activity size={16} /> Psychological Protocol</h3>
            <div className="space-y-6 relative z-10">
              <p className="text-white text-lg font-bold">{status.label === 'CRITICAL' ? 'Emergency Decoupling Required.' : 'Fortress Mentality Engaged.'}</p>
              <p className="text-gray-400 text-sm italic">"{status.label === 'CRITICAL' ? 'Stop all non-essential spending. Stabilize the ego before the bank account.' : 'Stability is the foundation of institutional daring.'}"</p>
              <ul className="space-y-4 text-xs font-bold text-gray-400 uppercase">
                <li className="flex items-center gap-3"><AlertTriangle className="text-brand-gold" size={14} /> Audit Behavioral Leaks</li>
                <li className="flex items-center gap-3"><ShieldCheck className="text-brand-gold" size={14} /> Enforce Governance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;
