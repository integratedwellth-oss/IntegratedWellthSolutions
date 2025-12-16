import React from 'react';

const LOGOS = [
  { name: "SARS Practitioner", text: "SARS" },
  { name: "CIBA", text: "CIBA" },
  { name: "Zoho", text: "Zoho" },
  { name: "CIPC", text: "CIPC" },
];

const TrustedBy: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
          Aligned with Industry Standards
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Using text placeholders styled as logos since we don't have the SVG assets yet. 
              In production, replace these divs with <img> tags. */}
          {LOGOS.map((logo, idx) => (
            <div key={idx} className="text-xl md:text-2xl font-bold text-gray-400 flex items-center gap-2">
               {/* Generic icon placeholder */}
               <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
               {logo.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;