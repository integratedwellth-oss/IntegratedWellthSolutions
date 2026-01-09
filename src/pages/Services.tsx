import React from 'react';
import { Shield, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

const Services = () => {
  const pillars = [
    {
      icon: <Shield size={32} />,
      title: "Financial Management",
      desc: "Technical IQ readiness for the 2026 SARS AI era. We handle the compliance sludge so you can focus on command.",
      points: ["Continuous Accounting", "Tax Triage", "Audit Readiness"]
    },
    {
      icon: <Zap size={32} />,
      title: "Emotional Intelligence",
      desc: "Behavioral EQ to resolve Leadership Isolation. We protect the founder's mind as a business asset.",
      points: ["Neural Resilience", "Decision Support", "Mindset Strategy"]
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Digital Innovation",
      desc: "Automated tech-stacks that eliminate manual debt. Scale without adding headcount.",
      points: ["System Integration", "Data Triangulation", "Workflow Logic"]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-brand-900 uppercase tracking-tighter mb-6">
            Strategic <span className="text-brand-gold">Capabilities.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Integrated solutions designed to navigate technical debt and behavioral isolation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 hover:border-brand-gold hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h3 className="text-2xl font-black text-brand-900 mb-4 uppercase tracking-tighter italic">{p.title}</h3>
              <p className="text-gray-600 mb-8 font-medium leading-relaxed">{p.desc}</p>
              <ul className="space-y-4 pt-6 border-t border-gray-100">
                {p.points.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[10px] font-black text-brand-900 uppercase tracking-widest">
                    <CheckCircle2 size={16} className="text-brand-gold" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
