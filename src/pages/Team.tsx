import React from 'react';
import { Target, Compass, Heart, Linkedin, Mail } from 'lucide-react';

const Team = () => {
  const members = [
    {
      name: "Marcia Kgaphola",
      role: "Founder & Principal Consultant",
      bio: "Strategic visionary bridging the gap between technical compliance and founder psychology.",
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765057729/Founder_Marcia_Kgaphola_agebxi.jpg"
    },
    {
      name: "Thabo Leslie Motsumi",
      role: "AI & Digital Marketing",
      bio: "Architect of automated systems and digital dominance strategies.",
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png"
    },
    {
      name: "Enias Mafokoane",
      role: "Executive Coach",
      bio: "Driving professional excellence and leadership resilience.",
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Enias_Mafokoane._Executive_Coach_dd47qt.jpg"
    },
    {
      name: "Lazarus Kaseke",
      role: "Chartered Accountant (SA)",
      bio: "Ensuring financial integrity and robust governance structures.",
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Lazarus_Kaseke._CA_SA_sbcpnw.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-brand-900 uppercase tracking-tighter mb-6">
            Command <span className="text-brand-gold">Structure.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            A collective of strategists, financial experts, and systems thinkers dedicated to your legacy.
          </p>
        </div>

        {/* TEAM GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {members.map((m, i) => (
            <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
              <div className="h-80 overflow-hidden relative">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="flex gap-3">
                    <button className="bg-brand-gold p-2 rounded-full text-brand-900"><Linkedin size={18} /></button>
                    <button className="bg-white p-2 rounded-full text-brand-900"><Mail size={18} /></button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-brand-900 uppercase tracking-tight">{m.name}</h3>
                <div className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3">{m.role}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* VALUES */}
        <div className="grid md:grid-cols-3 gap-8 border-t border-gray-200 pt-16">
          <div className="text-center p-6">
            <Target className="mx-auto text-brand-gold mb-4" size={40} />
            <h3 className="font-black text-brand-900 uppercase mb-2">Vision</h3>
            <p className="text-sm text-gray-500">To be the leading holistic empowerment partner in Africa.</p>
          </div>
          <div className="text-center p-6">
            <Compass className="mx-auto text-brand-gold mb-4" size={40} />
            <h3 className="font-black text-brand-900 uppercase mb-2">Mission</h3>
            <p className="text-sm text-gray-500">Blending financial management, EQ, and digital innovation.</p>
          </div>
          <div className="text-center p-6">
            <Heart className="mx-auto text-brand-gold mb-4" size={40} />
            <h3 className="font-black text-brand-900 uppercase mb-2">Values</h3>
            <p className="text-sm text-gray-500">Integrity, empathy, and collaborative co-creation.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Team;
