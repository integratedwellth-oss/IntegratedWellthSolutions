import React from 'react';
import { Zap, Calendar } from 'lucide-react';

const NewsTicker: React.FC = () => {
  const feedItems = [
    "FEB 28: PROVISIONAL TAX (IRP6) DEADLINE - ACTION REQUIRED",
    "MAR 31: CIPC ANNUAL RENEWAL PROTOCOL DUE",
    "APR 07: EMP201 PAYROLL SUBMISSION DEADLINE",
    "MAY 31: EMP501 INTERIM RECONCILIATION - AUDIT SENSITIVE",
    "MAY 31: NPO SECTION 18A DATA SUBMISSION",
    "JUN 30: VOLUNTARY PROVISIONAL TAX TOP-UP WINDOW",
    "JUL 01: INDIVIDUAL TAX FILING SEASON OPENS",
    "VAT COMPULSORY THRESHOLD INCREASING TO R2.3M"
  ];

  return (
    <div className="bg-brand-900 text-white overflow-hidden py-5 border-y border-white/10 relative z-20 shadow-2xl">
      {/* Edge Fades */}
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
                  {item.includes('DEADLINE') || item.includes('DUE') || item.includes('SENSITIVE') ? (
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
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
