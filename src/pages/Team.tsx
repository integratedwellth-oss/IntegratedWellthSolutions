import React from 'react';
import { Target, Eye, ShieldCheck } from 'lucide-react';

const team = [
  {
    name: "Marcia Kgaphola",
    role: "Founder & Principal Consultant",
    specialty: "Chartered Business Accountant (CIBA) | Hons Psychological Counselling",
    img: "https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg"
  },
  {
    name: "Thabo Leslie Motsumi",
    role: "AI & Digital Marketing",
    specialty: "Architect of automated systems and digital dominance strategies.",
    img: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png"
  },
  {
    name: "Enias Mafokoane",
    role: "Executive Coach",
    specialty: "Driving professional excellence and leadership resilience.",
    img: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Enias_Mafokoane._Executive_Coach_dd47qt.jpg"
  },
  {
    name: "Lazarus Kaseke",
    role: "Chartered Accountant (SA)",
    specialty: "Building the fortress walls that protect your wealth from erosion.",
    img: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Lazarus_Kaseke._CA_SA_sbcpnw.jpg"
  }
];

export default function Team() {
  return (
    <div className="bg-[#f8f9fa] pt-40 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Mission & Vision Section */}
        <section className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="bg-[#1a4d4d] w-12 h-12 rounded-2xl flex items-center justify-center text-[#C5A059]">
              <Target size={24} />
            </div>
            <h2 className="text-3xl font-black text-[#1a4d4d] uppercase italic">Our Mission</h2>
            <p className="text-lg text-[#1a4d4d]/70 leading-relaxed font-medium">
              To architect structural excellence for high-net-worth founders, bridging the gap between operational psychology and financial sovereignty.
            </p>
          </div>

          <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="bg-[#1a4d4d] w-12 h-12 rounded-2xl flex items-center justify-center text-[#C5A059]">
              <Eye size={24} />
            </div>
            <h2 className="text-3xl font-black text-[#1a4d4d] uppercase italic">Our Vision</h2>
            <p className="text-lg text-[#1a4d4d]/70 leading-relaxed font-medium">
              To be the premier intelligence terminal for capital preservation, where business math meets human behavioral mastery.
            </p>
          </div>
        </section>

        {/* The Team Grid */}
        <header className="text-center mb-20">
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
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
              </div>
              <div className="px-2">
                <h3 className="text-2xl font-black text-[#1a4d4d] leading-none mb-2">{member.name}</h3>
                <p className="text-[#C5A059] text-[10px] font-black uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-xs text-[#1a4d4d]/60 font-medium leading-relaxed uppercase tracking-tight">
                  {member.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
