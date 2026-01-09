import React from 'react';
import { Target, Compass, Heart, Linkedin, Mail } from 'lucide-react';

const Team = () => {
  const members = [
    {
      name: "Marcia Kgaphola",
      role: "Founder & Principal Consultant",
      bio: "Strategic visionary bridging the gap between technical compliance and founder psychology. Marcia specializes in turning financial anxiety into command capability.",
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765057729/Founder_Marcia_Kgaphola_agebxi.jpg"
    },
    {
      name: "Thabo Leslie Motsumi",
      role: "AI & Digital Marketing",
      bio: "Architect of automated systems and digital dominance strategies. Thabo ensures your brand isn't just seen, but felt across the digital landscape.",
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png"
    },
    {
      name: "Enias Mafokoane",
      role: "Executive Coach",
      bio: "Driving professional excellence and leadership resilience. Enias focuses on the 'Human Operating System', ensuring the leader can handle the weight of success.",
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Enias_Mafokoane._Executive_Coach_dd47qt.jpg"
    },
    {
      name: "Lazarus Kaseke",
      role: "Chartered Accountant (SA)",
      bio: "Ensuring financial integrity and robust governance structures. Lazarus builds the fortress walls that protect your wealth from regulatory risk.",
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Lazarus_Kaseke._CA_SA_sbcpnw.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-20 px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-900 tracking-tight mb-6 font-sora">
            Command <span className="text-brand-gold">Structure.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            A collective of strategists, financial experts, and systems thinkers dedicated to your legacy. We do not just consult; we co-pilot.
          </p>
        </div>

        {/* TEAM GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {members.map((m, i) => (
            <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="h-80 overflow-hidden relative">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <button className="bg-brand-gold p-2.5 rounded-full text-brand-900 hover:bg-white transition-colors"><Linkedin size={18} /></button>
                    <button className="bg-white/10 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white hover:text-brand-900 transition-colors"><Mail size={18} /></button>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-lg font-bold text-brand-900 leading-tight font-sora mb-1">{m.name}</h3>
                <div className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-4">{m.role}</div>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MISSION / VISION / VALUES (FULL COPY) */}
        <div className="grid md:grid-cols-3 gap-12 pt-16 border-t border-gray-200">
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-900 group-hover:bg-brand-900 group-hover:text-brand-gold transition-colors duration-500">
                <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-900 uppercase tracking-tight mb-4 font-sora">Our Vision</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              To be the premier holistic empowerment partner in Africa, creating a generation of sovereign business owners who possess both the Technical IQ to manage wealth and the Behavioral EQ to sustain it.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-900 group-hover:bg-brand-900 group-hover:text-brand-gold transition-colors duration-500">
                <Compass size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-900 uppercase tracking-tight mb-4 font-sora">Our Mission</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              To bridge the gap between compliance and command. We execute this by deploying integrated financial systems, automated digital workflows, and executive coaching—turning chaotic businesses into disciplined, legacy-ready assets.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-900 group-hover:bg-brand-900 group-hover:text-brand-gold transition-colors duration-500">
                <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-900 uppercase tracking-tight mb-4 font-sora">Core Values</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              <span className="font-bold text-brand-900">Integrity:</span> Truth in every ledger.<br/>
              <span className="font-bold text-brand-900">Empathy:</span> Understanding the founder's burden.<br/>
              <span className="font-bold text-brand-900">Co-Creation:</span> We build with you, not just for you.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Team;
