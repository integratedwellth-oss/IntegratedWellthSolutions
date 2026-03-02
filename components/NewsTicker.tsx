import React from 'react';
import { Zap, Calendar } from 'lucide-react';

const NewsTicker: React.FC = () => {
  // Compliance deadlines pulled from Calendar Page, styled for urgency
  const feedItems = [
    "DEADLINE: FEB 28 | IRP6 2ND PERIOD PAYMENT DUE",
    "ALERT: MAR 31 | CIPC ANNUAL RETURNS MANDATORY",
    "APR 07: EMP201 PAYROLL SUBMISSION",
    "MAY 31: EMP501 INTERIM RECONCILIATION - AUDIT SENSITIVE",
    "JUN 30: VOLUNTARY IRP6 TOP-UP WINDOW",
    "JUL 01: INDIVIDUAL TAX FILING OPENS",
    "VAT THRESHOLD INCREASED TO R2.3M - REVIEW NOW"
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
                    <span className="tracking-[0.6em]">COMPLIANCE FEED:</span>
                  </div>
                )}
                <span className="flex items-center gap-8">
                  {/* Highlighting items that include DEADLINE, DUE, or ALERT */}
                  {(item.includes('DEADLINE') || item.includes('DUE') || item.includes('ALERT')) ? (
                    <span className="flex items-center gap-3 text-rose-400">
                      <Calendar size={12} className="text-rose-400" />
                      {item}
                    </span>
                  ) : (
                    <span className="flex items-center gap-3 text-white/90">
                      <Calendar size={12} className="text-brand-gold" />
                      {item}
                    </span>
                  )}
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
