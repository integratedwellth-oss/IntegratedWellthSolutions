import React from 'react';
import { Zap, Calendar } from 'lucide-react';

const NewsTicker: React.FC = () => {
  // Compliance deadlines pulled from Calendar Page, styled for urgency
  const feedItems = [
    "CRITICAL: JUL 12 | SARS AUTO-ASSESSMENTS ROLLOUT - VERIFY NOW",
    "DEADLINE: JUL 07 | MONTHLY EMP201 SUBMISSION & PAYMENT DUE",
    "ALERT: JUL 13 | SARS INDIVIDUAL TAX SEASON OPENS",
    "DEADLINE: JUL 31 | CIT (ITR14) FOR COMPANIES WITH JAN YEAR-END",
    "DEADLINE: AUG 31 | FIRST PROVISIONAL TAX (IRP6) & CIT (FEB YEAR-END) DUE",
    "ALERT: SEP 15 | EMP501 INTERIM RECONCILIATION WINDOW OPENS",
    "ALERT: SEP 19 | TRUST TAX RETURN (ITR12T) SEASON OPENS",
    "DEADLINE: OCT 23 | ITR12 NON-PROVISIONAL FILING via eFILING CLOSING",
    "DEADLINE: OCT 31 | EMP501 MID-YEAR EMPLOYER INTERIM RECON SUBMISSION",
    "CRITICAL: JAN 22 | SARS PROVISIONAL TAXPAYERS & TRUSTS (ITR12T) CLOSING",
    "DEADLINE: FEB 26 | SECOND PROVISIONAL TAX (IRP6) DUE (FEB YEAR-END)",
    "TAX UPDATE: MANDATORY IRP5 TAX ID VALIDATION NOW ENFORCED BY SARS",
    "TAX UPDATE: SEC 20A LOSS RING-FENCING THRESHOLD LOWERED TO 39% FOR INDIVIDUALS",
    "TAX UPDATE: COMPULSORY VAT REGISTRATION THRESHOLD INCREASED TO R2.0M",
    "PRACTICE INFO: SARS TAX PRACTITIONER MODERNISATION PHASE 1 NOW ACTIVE"
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
                  {/* Highlighting items that include DEADLINE, DUE, ALERT, or CRITICAL */}
                  {(item.includes('DEADLINE') || item.includes('DUE') || item.includes('ALERT') || item.includes('CRITICAL')) ? (
                    <span className="flex items-center gap-3 text-rose-400">
                      <Calendar size={12} className="text-rose-400 animate-pulse" />
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
