
import React from 'react';
import { ShieldCheck, Building2, LayoutGrid, FileText, Activity } from 'lucide-react';

const LOGOS = [
  { name: "SARS", icon: <ShieldCheck size={20} />, label: "SARS Practitioner" },
  { name: "CIBA", icon: <Building2 size={20} />, label: "CIBA" },
  { name: "Zoho", icon: <LayoutGrid size={20} />, label: "Zoho Books" },
  { name: "CIPC", icon: <FileText size={20} />, label: "CIPC" },
];

const TrustedBy: React.FC = () => {
  return (
    <div className="bg-white border-b border-brand-900/5 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-black text-brand-900/30 uppercase tracking-[0.5em] mb-12">
          Aligned with Industry Standards
        </p>
        
        <div className="flex flex-wrap justify-center gap-10 md:gap-24 items-center">
          {LOGOS.map((logo, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-4 group cursor-default transition-all duration-500 opacity-40 hover:opacity-100"
            >
              <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-brand-gold transition-all duration-500 shadow-sm border border-brand-900/5">
                {logo.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black text-brand-900 tracking-tighter uppercase leading-none">
                  {logo.name}
                </span>
                <span className="text-[8px] font-bold text-brand-900/40 uppercase tracking-widest mt-1">
                  Verified Entity
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
