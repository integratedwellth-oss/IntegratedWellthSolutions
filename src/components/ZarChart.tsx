import React from 'react';

export default function ZarChart() {
  // Mock data representing ZAR volatility over 12 months
  const points = "0,80 40,70 80,90 120,60 160,85 200,40 240,75 280,30 320,50 360,20 400,45";

  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] overflow-hidden group">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-white font-black uppercase tracking-tighter text-lg italic">ZAR/USD Volatility</h4>
          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">12 Month Exposure Risk</p>
        </div>
        <div className="text-red-500 font-mono text-xs font-bold animate-pulse">● LIVE DATA</div>
      </div>
      
      <div className="relative h-40 w-full flex items-end">
        <svg viewBox="0 0 400 100" className="w-full h-full stroke-[#C5A059] fill-none stroke-2">
          <polyline points={points} className="drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]" />
        </svg>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5">
        {[
          { label: 'Volatility Index', val: '8.4%' },
          { label: 'Yield Variance', val: '+2.1%' },
          { label: 'Inflation Gap', val: '4.8%' },
          { label: 'Risk Factor', val: 'HIGH' }
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-[8px] text-gray-600 font-bold uppercase mb-1">{stat.label}</div>
            <div className="text-white font-mono text-[10px] font-bold">{stat.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
