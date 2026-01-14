import React from 'react';
import { Target, Eye, ShieldCheck, Zap } from 'lucide-react';

const team = [
  {
    name: "Marcia Kgaphola",
    role: "Founding Architect",
    specialty: "CIBA | Hons Psychological Counselling",
    img: "https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg"
  },
  {
    name: "Thabo Leslie Motsumi",
    role: "AI & Digital Lead",
    specialty: "SEO Automation | Digital Dominance",
    img: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png"
  },
  {
    name: "Enias Mafokoane",
    role: "Executive Coach",
    specialty: "Leadership Resilience & Strategy",
    img: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Enias_Mafokoane._Executive_Coach_dd47qt.jpg"
  },
  {
    name: "Lazarus Kaseke",
    role: "Chartered Accountant (SA)",
    specialty: "Financial Governance & Risk",
    img: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Lazarus_Kaseke._CA_SA_sbcpnw.jpg"
  }
];

export default function Team() {
  return (
    <div className="bg-[#051111] pt-40 pb-32 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* The Mission: High-Contrast Cards */}
        <section className="grid md:grid-cols-2 gap-8 mb-40">
          <div className="bg-[#0a1f1f] p-12 rounded-[20px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <Target size={120} />
            </div>
            <h2 className="text-[#C5A059] font-black uppercase tracking-[0.3em] text-xs mb-6">Mission</h2>
            <p className="text-3xl font-light leading-snug italic text-white/90">
              "We architect structural excellence for high-net-worth founders, bridging the gap between <span className="text-[#C5A059]">human psychology</span> and <span className="text-[#C5A059]">financial sovereignty</span>."
            </p>
          </div>

          <div className="bg-[#0a1f1f] p-12 rounded-[20px] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <Zap size={120} />
            </div>
            <h2 className="text-[#C5A059] font-black uppercase tracking-[0.3em] text-xs mb-6">Vision</h2>
            <p className="text-3xl font-light leading-snug italic text-white/90">
              To be the <span className="text-[#C5A059]">Premier Intelligence Terminal</span> for capital preservation, where business math meets human behavioral mastery.
            </p>
          </div>
        </section>

        {/* The Grid: No more teal boxes */}
        <div className="grid lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="relative group overflow-hidden bg-[#0a1f1f] rounded-[15px] border border-white/5">
              <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#051111] via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 p-8 w-full">
                <p className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.2em] mb-2">{member.role}</p>
                <h3 className="text-2xl font-black italic uppercase leading-none mb-3">{member.name}</h3>
                <div className="h-[1px] w-full bg-white/10 mb-4"></div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
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
