import React from 'react';
import { Target, Eye, ShieldCheck } from 'lucide-react';

const team = [
  {
    name: "Marcia Kgaphola",
    role: "Chartered Business Accountant (CIBA)",
    specialty: "Hons Psychological Counselling | Risk & Project Management",
    img: "https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg"
  },
  {
    name: "Thabo Leslie Motsumi",
    role: "AI & Digital Strategy Lead",
    specialty: "SEO Automation | Google Profile Optimization | Smart Marketing",
    img: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png"
  },
  {
    name: "Enias Mafokoane",
    role: "Executive Coach",
    specialty: "High-Performance Leadership & Corporate Strategy",
    img: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Enias_Mafokoane._Executive_Coach_dd47qt.jpg"
  },
  {
    name: "Lazarus Kaseke",
    role: "Chartered Accountant (SA)",
    specialty: "Financial Governance & Structural Oversight",
    img: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Lazarus_Kaseke._CA_SA_sbcpnw.jpg"
  }
];

export default function Team() {
  return (
    <div className="bg-[#f8f9fa] pt-40 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section 1: Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="bg-[#1a4d4d] w-12 h-12 rounded-2xl flex items-center justify-center text-[#C5A059]">
              <Target size={24} />
            </div>
            <h2 className="text-3xl font-black text-[#1a4d4d] uppercase italic">Our Mission</h2>
            <p className="text-lg text-[#1a4d4d]/70 leading-relaxed font-medium">
              To architect structural excellence for high-net-worth founders, bridging the gap between operational psychology and financial sovereignty through rigorous intelligence.
            </p>
          </div>

          <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="bg-[#1a4d4d] w-12 h-12 rounded-2xl flex items-center justify-center text-[#C5A059]">
              <Eye size={24} />
            </div>
            <h2 className="text-3xl font-black text-[#1a4d4d] uppercase italic">Our Vision</h2>
            <p className="text-lg text-[#1a4d4d]/70 leading-relaxed font-medium">
              To be the premier intelligence terminal for capital preservation in Africa, where business math meets human behavioral mastery.
            </p>
          </div>
        </section>

        {/* Section 2: The Collective */}
        <header className="text-center mb-20 space-y-4">
          <div className="flex justify-center mb-6">
            <span className="bg-[#1a4d4d] text-[#C5A059] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
              Strategic Intelligence
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-[#1a4d4d] italic tracking-tighter uppercase leading-none">
            The Architects
          </h1>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="group">
              <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] mb-8 bg-[#1a4d4d] shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a4d4d]/80 via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="px-2">
                <h3 className="text-2xl font-black text-[#1a4d4d] leading-none mb-2">{member.name}</h3>
                <p className="text-[#C5A059] text-[10px] font-black uppercase tracking-widest mb-4">{member.role}</p>
                <div className="h-[2px] w-8 bg-[#C5A059] mb-4"></div>
                <p className="text-xs text-[#1a4d4d]/60 font-medium leading-relaxed uppercase tracking-tight">
                  {member.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 3: Value Statement */}
        <footer className="mt-32 text-center bg-[#1a4d4d] rounded-[50px] p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck size={200} />
          </div>
          <h3 className="text-4xl font-black italic uppercase mb-6 relative z-10">Built on Integrity</h3>
          <p className="max-w-2xl mx-auto text-white/70 text-lg font-medium relative z-10">
            Our collective expertise spans across psychology, digital automation, and high-level financial governance to ensure your capital remains sovereign.
          </p>
        </footer>
      </div>
    </div>
  );
}
