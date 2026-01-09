import React from 'react';
import { ArrowRight, Users, Building2, Rocket, GraduationCap, CheckCircle2 } from 'lucide-react';

const WhoWeHelp = () => {
  const sectors = [
    {
      id: "startups",
      icon: <Rocket size={32} />,
      title: "Startups & Founders",
      desc: "Build a solid foundation before you scale. We structure your entity for tax efficiency and investor readiness from day one.",
      services: ["CIPC Registration", "Tax Clearance", "Founder Strategy"]
    },
    {
      id: "business",
      icon: <Building2 size={32} />,
      title: "Established Business",
      desc: "Optimize operations and ensure 2026 Compliance. We automate your finance function to remove the manual sludge.",
      services: ["Management Accounts", "Tax Planning", "System Automation"]
    },
    {
      id: "npo",
      icon: <Users size={32} />,
      title: "NGOs / NPOs",
      desc: "Navigate the complex regulatory landscape of Non-Profits. We ensure you remain compliant to secure funding.",
      services: ["NPO Registration", "PBO Status", "Grant Reporting"]
    },
    {
      id: "individuals",
      icon: <GraduationCap size={32} />,
      title: "Private Individuals",
      desc: "Wealth isn't just income; it's retention. We map your personal financial trajectory for generational impact.",
      services: ["Wealth Mapping", "Personal Tax", "Estate Planning"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-20 px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-900 tracking-tight mb-6 font-sora">
            Target <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-600">Sectors.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
            Tailored protocols for every stage of the business lifecycle. Select your category to view specialized protocols.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sectors.map((s, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:border-brand-gold/30 transition-all duration-500 group hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.2)]">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-brand-gold transition-all duration-500 shadow-sm">
                  {s.icon}
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-colors">
                    <ArrowRight className="text-gray-300 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" size={18} />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-brand-900 tracking-tight mb-4 font-sora">{s.title}</h3>
              <p className="text-gray-600 font-medium leading-relaxed mb-10 min-h-[80px]">{s.desc}</p>
              
              {/* THE NEW BUTTON STYLE */}
              <div className="flex flex-wrap gap-3">
                {s.services.map((tag, t) => (
                  <span key={t} className="px-4 py-2 bg-gradient-to-b from-white to-brand-50 border border-brand-gold/20 text-xs font-bold uppercase tracking-wider text-brand-900 rounded-lg shadow-sm flex items-center gap-2 group-hover:border-brand-gold/50 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
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
