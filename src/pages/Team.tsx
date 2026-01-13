import React from 'react';

const team = [
  { name: "Marcia Kgaphola", role: "Principal Consultant", desc: "Specialist in structural capital preservation." },
  { name: "Thabo Leslie Motsumi", role: "Digital Architecture", desc: "Lead for AI-driven intelligence systems." },
  { name: "Enias Mafokoane", role: "Executive Strategy", desc: "Corporate resilience and coaching." },
  { name: "Lazarus Kaseke", role: "Financial Oversight", desc: "Chartered Accountant (SA) for IWS." }
];

export default function Team() {
  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#C5A059] mb-4">The Collective</h2>
        <h1 className="text-5xl md:text-7xl font-black text-[#1a4d4d] italic tracking-tighter uppercase">The Architects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((m, i) => (
          <div key={i} className="premium-card group">
            <div className="aspect-square bg-gray-200 overflow-hidden">
               <div className="w-full h-full bg-[#1a4d4d] flex items-center justify-center text-white/20 font-black text-4xl">
                 {m.name[0]}
               </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-[#1a4d4d] mb-1">{m.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#C5A059] mb-4">{m.role}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
