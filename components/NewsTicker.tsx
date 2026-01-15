
import React from 'react';
import { Zap, Calendar } from 'lucide-react';

const NewsTicker: React.FC = () => {
  const feedItems = [
    "IRP6 PROVISIONAL TAX DEADLINE: FEB 28, 2026",
    "CIPC ANNUAL RENEWAL PROTOCOL ACTIVE: MAR 31, 2026",
    "EMP501 RECON PULSE: MAY 31, 2026",
    "VAT PERIOD 02/2026 SUBMISSION: MAR 25",
    "ITR12T TRUST TAX RETURNS FINAL CALL: JAN 19",
    "MARCIA KGAPHOLA LIVE @ MUNYAKA ESTATE",
    "FINANCIAL CLARITY SUMMIT • FEB 28, 2026",
    "STRATEGIC AUDITS OPEN FOR Q3 PIPELINE"
  ];

  return (
    <div className="bg-brand-900 text-white overflow-hidden py-5 border-y border-white/10 relative z-20 shadow-2xl">
      {/* Edge Fades for Seamless Flow */}
      <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-brand-900 via-brand-900/80 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-brand-900 via-brand-900/80 to-transparent z-10"></div>
      
      <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
        {[1, 2, 3, 4].map(group => (
          <div key={group} className="flex items-center gap-16">
            {feedItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-16 font-sora font-black text-[11px] uppercase tracking-[0.4em] text-white/90">
                {idx === 0 && (
                  <div className="flex items-center gap-4 text-brand-gold shrink-0">
                    <Zap size={14} className="animate-pulse fill-brand-gold" />
                    <span className="tracking-[0.6em]">SYSTEM FEED:</span>
                  </div>
                )}
                <span className="flex items-center gap-8">
                  {/* Highlight compliance items with a specific icon color or prefix if needed */}
                  {item.includes('DEADLINE') || item.includes('DUE') || item.includes('RECON') ? (
                    <span className="flex items-center gap-3">
                      <Calendar size={12} className="text-brand-gold" />
                      {item}
                    </span>
                  ) : item}
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/30"></div>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          /* Speed increased from 40s to 20s (2X faster) */
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
