import React from 'react';
import { Shield, Lock, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="max-w-4xl space-y-8">
        <h1 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter italic leading-[0.85]">
          Capital <span className="text-[#C5A059]">Sovereignty</span>
        </h1>
        <p className="text-gray-400 text-xl font-medium max-w-2xl italic border-l-2 border-[#C5A059] pl-6">
          Advanced fiscal shielding for a volatile era. We architect structural resilience for global citizens.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
        {[
          { icon: <Globe size={32}/>, title: "Jurisdiction", desc: "Optimized offshore placement." },
          { icon: <Lock size={32}/>, title: "Shielding", desc: "Multi-layered asset sequestration." },
          { icon: <Shield size={32}/>, title: "Audits", desc: "Stress-testing local exposure." }
        ].map((item, i) => (
          <div key={i} className="group p-12 bg-[#0a0c12] border border-white/5 rounded-[48px] hover:border-[#C5A059]/40 transition-all">
            <div className="text-[#C5A059] mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4">{item.title}</h3>
            <p className="text-gray-500 text-[11px] leading-relaxed font-bold uppercase">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
