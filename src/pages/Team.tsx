import React from 'react';

const team = [
  { name: "Marcia Kgaphola", role: "Founder & Principal Consultant", img: "/marcia.jpg" },
  { name: "Thabo Leslie Motsumi", role: "AI & Digital Marketing", img: "/thabo.jpg" },
  { name: "Enias Mafokoane", role: "Executive Coach", img: "/enias.jpg" },
  { name: "Lazarus Kaseke", role: "Chartered Accountant (SA)", img: "/lazarus.jpg" }
];

export default function Team() {
  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
      <header className="text-center mb-20">
        <h1 className="text-5xl font-black text-[#1a4d4d] italic tracking-tighter mb-4 uppercase">The Architects</h1>
        <p className="max-w-2xl mx-auto text-gray-500 font-medium">A collective of strategists and financial experts dedicated to structural excellence.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, i) => (
          <div key={i} className="iws-card group">
            <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
              <img src={member.img} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-[#1a4d4d] leading-none mb-2">{member.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#C5A059]">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
