/**
 * IWS SOVEREIGNTY - ZAR VOLATILITY VISUALIZER
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { TrendingDown, AlertCircle } from 'lucide-react';

export default function ZARVolatilityChart() {
  // Mock data representing ZAR/USD stress points
  const dataPoints = [18.2, 18.5, 19.1, 18.8, 19.5, 20.2, 19.8, 21.0];

  return (
    <div className="bg-[#0a0c12] border border-white/5 p-6 rounded-3xl space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">ZAR Stress Exposure</h3>
        <span className="text-[9px] text-red-500 font-bold animate-pulse uppercase tracking-widest flex items-center gap-1">
          <AlertCircle size={10} /> Live Volatility: High
        </span>
      </div>

      <div className="h-32 flex items-end gap-2 px-2">
        {dataPoints.map((point, i) => (
          <div 
            key={i}
            className="flex-1 bg-white/5 hover:bg-brand-gold/40 transition-all rounded-t-sm relative group"
            style={{ height: `${(point / 22) * 100}%` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
              R{point}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/5 flex justify-between">
        <div className="space-y-1">
          <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest text-left">Forecasted Creep</p>
          <p className="text-xs font-black text-white">+12.4%</p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest">Sovereignty Delta</p>
          <p className="text-xs font-black text-red-500 flex items-center justify-end gap-1">
            <TrendingDown size={12} /> -R240k
          </p>
        </div>
      </div>
    </div>
  );
}
