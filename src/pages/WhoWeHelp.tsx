import React from 'react';
import { ArrowRight, Users, Building2, Rocket, GraduationCap } from 'lucide-react';

const WhoWeHelp = () => {
  const sectors = [
    {
      id: "startups",
      icon: <Rocket size={32} />,
      title: "Startups",
      desc: "Build a solid foundation before you scale. Structure for success from day one.",
      services: ["Registration", "Tax Clearance", "Initial Strategy"]
    },
    {
      id: "business",
      icon: <Building2 size={32} />,
      title: "Existing Business",
      desc: "Optimize operations and ensure 2026 Compliance while managing growth.",
      services: ["Management Accounts", "Tax Planning", "Strategic Workshops"]
    },
    {
      id: "npo",
      icon: <Users size={32} />,
      title: "NGOs / NPOs",
      desc: "Navigate the complex world of PBO registration and grant management.",
      services: ["NPO Registration", "PBO Status", "Grant Reporting"]
    },
    {
      id: "individuals",
      icon: <GraduationCap size={32} />,
      title: "Individuals",
      desc: "Plan your career and personal wealth map early for a secure future.",
      services: ["Wealth Mapping", "Career Guidance", "Personal Tax"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-brand-900 uppercase tracking-tighter mb-6">
            Target <span className="text-brand-gold">Sectors.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Tailored protocols for every stage of the business lifecycle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sectors.map((s, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 hover:border-brand-gold transition-all duration-300 group hover:shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-900 group-hover:bg-brand-gold transition-colors">
                  {s.icon}
                </div>
                <ArrowRight className="text-gray-300 group-hover:text-brand-gold -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-black text-brand-900 uppercase tracking-tight mb-4">{s.title}</h3>
              <p className="text-gray-600 font-medium mb-8 h-12">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.services.map((tag, t) => (
                  <span key={t} className="px-3 py-1 bg-gray-50 text-xs font-bold uppercase text-gray-500 rounded-full border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoWeHelp;
