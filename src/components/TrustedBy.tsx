import React from 'react';
import { ShieldCheck, Building2, LayoutGrid, FileText } from 'lucide-react';

const LOGOS = [
  { 
    name: "SARS", 
    icon: <ShieldCheck size={20} />, 
    label: "SARS Practitioner",
    hoverColor: "group-hover:text-emerald-600"
  },
  { 
    name: "CIBA", 
    icon: <Building2 size={20} />, 
    label: "Professional Body",
    hoverColor: "group-hover:text-blue-600" 
  },
  { 
    name: "Zoho", 
    icon: <LayoutGrid size={20} />, 
    label: "Strategic Partner",
    hoverColor: "group-hover:text-red-500" 
  },
  { 
    name: "CIPC", 
    icon: <FileText size={20} />, 
    label: "Registered Agent",
    hoverColor: "group-hover:text-cyan-600" 
  },
];

const TrustedBy: React.FC = () => {
  return (
    <section className="bg-white border-b border-brand-900/5 py-16 md:py-20 relative overflow-hidden">
      {/* Subtle background texture for depth */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] font-black text-brand-900/30 uppercase tracking-[0.6em]">
            Aligned with Industry Standards
          </p>
          <div className="mt-4 h-[1px] w-12 bg-brand-gold/30 mx-auto"></div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center">
          {LOGOS.map((logo, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-5 group cursor-default transition-all duration-700"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-900 group-hover:text-brand-gold group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] group-hover:-translate-y-1 transition-all duration-500 border border-brand-900/5">
                {logo.icon}
              </div>

              {/* Textual Branding */}
              <div className="flex flex-col">
                <span className={`text-2xl font-black text-brand-900/40 tracking-tighter uppercase leading-none transition-colors duration-500 ${logo.hoverColor}`}>
                  {logo.name}
                </span>
                <span className="text-[8px] font-bold text-brand-900/20 uppercase tracking-[0.2em] mt-1.5 group-hover:text-brand-900/60 transition-colors duration-500">
                  {logo.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
