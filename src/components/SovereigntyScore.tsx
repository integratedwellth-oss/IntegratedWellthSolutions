import React from 'react';

export default function SovereigntyScore({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s > 75) return '#22c55e'; // Safe
    if (s > 45) return '#C5A059'; // Warning
    return '#ef4444'; // Danger
  };

  return (
    <div className="p-10 bg-white/5 border border-white/10 rounded-[40px] text-center backdrop-blur-sm">
      <div className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] mb-6">Sovereignty Score</div>
      <div className="relative inline-flex items-center justify-center">
        <div className="text-7xl font-black italic tracking-tighter" style={{ color: getColor(score) }}>
          {score}%
        </div>
      </div>
      <div className="mt-8 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-1000 ease-out"
          style={{ width: `${score}%`, backgroundColor: getColor(score) }}
        />
      </div>
      <p className="mt-6 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
        {score > 70 ? 'Structural Integrity: High' : 'Structural Integrity: Compromised'}
      </p>
    </div>
  );
}
