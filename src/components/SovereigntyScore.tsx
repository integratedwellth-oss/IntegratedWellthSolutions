/**
 * IWS SOVEREIGNTY - AI READOUT COMPONENT
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { BrainCircuit, TrendingDown, Target } from 'lucide-react';

interface ScoreProps {
  archetype: string;
  insights: string[];
  leakage: number;
}

export default function SovereigntyScore({ archetype, insights, leakage }: ScoreProps) {
  return (
    <div className="bg-[#0a0c12] border border-white/5 p-8 rounded-3xl space-y-8 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrainCircuit className="text-brand-gold animate-pulse" size={24} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">AI Diagnostic Output</h3>
        </div>
        <span className="text-[10px] bg-brand-gold text-brand-900 px-2 py-1 rounded font-black uppercase tracking-widest">
          {archetype}
        </span>
      </div>

      <div className="grid gap-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
            <Target className="text-brand-gold shrink-0" size={16} />
            <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-tighter italic">
              {insight}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-white/5">
        <div className="flex justify-between items-center text-red-500">
          <div className="flex items-center gap-2">
            <TrendingDown size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Est. Structural Leakage</span>
          </div>
          <span className="text-xl font-black">R{leakage.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
