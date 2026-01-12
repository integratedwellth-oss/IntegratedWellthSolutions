/**
 * IWS SOVEREIGNTY - WAR ROOM SIMULATOR
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Zap, ShieldAlert, ChevronRight } from 'lucide-react';

export default function WarRoom() {
  const navigate = useNavigate();
  const [cash, setCash] = useState(500000);
  const [burn, setBurn] = useState(100000);
  const [shock, setShock] = useState(20);
  const [runway, setRunway] = useState(0);

  // Real-time Fiscal Calculation Logic
  useEffect(() => {
    const calculatedRunway = cash / (burn * (1 + shock / 100));
    setRunway(calculatedRunway);
  }, [cash, burn, shock]);

  const handleTriage = () => {
    // Passes the simulation results to the Success/Lead page
    navigate('/success', { state: { runway, shock, cash } });
  };

  return (
    <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-6 font-mono">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Fiscal War Room</h1>
          <p className="text-xs text-brand-gold font-bold uppercase tracking-[0.3em]">Simulation Mode: Systemic Shock Testing</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="space-y-10 bg-white/5 p-8 rounded-3xl border border-white/10">
            <div className="space-y-4">
              <label className="text-[10px] text-gray-500 uppercase font-black flex justify-between">
                Liquid Reserves (ZAR) <span>R{cash.toLocaleString()}</span>
              </label>
              <input 
                type="range" min="100000" max="5000000" step="100000" 
                value={cash} onChange={(e) => setCash(Number(e.target.value))}
                className="w-full accent-brand-gold"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] text-gray-500 uppercase font-black flex justify-between">
                Monthly Burn <span>R{burn.toLocaleString()}</span>
              </label>
              <input 
                type="range" min="20000" max="500000" step="10000" 
                value={burn} onChange={(e) => setBurn(Number(e.target.value))}
                className="w-full accent-brand-gold"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] text-red-500 uppercase font-black flex justify-between">
                Systemic Shock (ZAR/SARS) <span>{shock}%</span>
              </label>
              <input 
                type="range" min="0" max="100" 
                value={shock} onChange={(e) => setShock(Number(e.target.value))}
                className="w-full accent-red-600"
              />
            </div>
          </div>

          {/* Results Display */}
          <div className="flex flex-col justify-center space-y-8 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Projected Survival Runway</p>
              <h2 className={`text-7xl font-black tracking-tighter ${runway < 6 ? 'text-red-500' : 'text-emerald-400'}`}>
                {runway.toFixed(1)} <span className="text-xl italic uppercase">Months</span>
              </h2>
            </div>

            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4">
              <ShieldAlert className={runway < 6 ? 'text-red-500' : 'text-emerald-400'} />
              <p className="text-[10px] text-gray-400 uppercase leading-relaxed font-bold">
                {runway < 6 
                  ? "CRITICAL: Liquidity trap detected. Your structure cannot absorb this shock."
                  : "STABLE: Architecture is currently resilient. Governance required for optimization."}
              </p>
            </div>

            <button 
              onClick={handleTriage}
              className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-brand-gold transition-all flex items-center justify-center gap-2"
            >
              Initialize Triage Protocol <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
