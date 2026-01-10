import React, { useState } from 'react';
import { Terminal, ShieldAlert, Calculator, Radio } from 'lucide-react';

const WarRoom = () => {
  const [cash, setCash] = useState(500000);
  const [shock, setShock] = useState(0);

  return (
    <div className="min-h-screen bg-[#05070a] text-white pt-32 px-6 font-mono">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="p-6 border border-brand-gold/20 bg-brand-gold/5 rounded-2xl flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter">IWS Tactical Terminal</h1>
            <p className="text-[10px] text-gray-500 uppercase font-bold flex items-center gap-2">
              <Radio size={10} className="text-red-500 animate-pulse" /> System Active
            </p>
          </div>
          <div className="px-4 py-1 border border-emerald-500/50 text-emerald-500 text-xs font-black rounded">
            SOVEREIGN
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 p-10 bg-[#0a0c12] border border-white/5 rounded-3xl">
          <div className="space-y-6">
            <label className="block text-[10px] font-black text-gray-500 uppercase">Reserves (R)</label>
            <input 
              type="number" 
              value={cash} 
              onChange={(e) => setCash(Number(e.target.value))}
              className="w-full bg-black border border-white/10 p-3 rounded-lg outline-none focus:border-brand-gold"
            />
            
            <label className="block text-[10px] font-black text-gray-500 uppercase">Revenue Shock ({shock}%)</label>
            <input 
              type="range" 
              value={shock} 
              onChange={(e) => setShock(Number(e.target.value))}
              className="w-full accent-brand-gold" 
            />
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col justify-center">
            <span className="text-[10px] font-black text-gray-500 uppercase mb-2">Simulated Outcome</span>
            <div className="text-4xl font-black text-brand-gold">R {(cash * (1 - shock/100)).toLocaleString()}</div>
            <p className="text-[10px] text-gray-400 mt-4 italic">Analysis: Liquid stability confirmed at current shock levels.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;
