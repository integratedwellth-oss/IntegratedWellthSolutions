import React from 'react';

export default function StatCard({ label, value, trend }: { label: string, value: string, trend?: string }) {
  return (
    <div className="p-6 bg-[#0a0c12] border border-white/5 rounded-2xl">
      <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">{label}</div>
      <div className="text-2xl font-black text-white italic tracking-tighter mb-1">{value}</div>
      {trend && <div className="text-[10px] text-brand-gold font-bold uppercase tracking-tighter">{trend}</div>}
    </div>
  );
}
