// src/pages/SummitPage.tsx
import { useEffect, useState } from 'react';
import { Shield, Lock, FileText, Target, Radio, AlertTriangle, CheckCircle, ArrowRight, MapPin, Calendar, Clock, User, Eye, Database, Zap } from 'lucide-react';

export default function SummitPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [securityClearance, setSecurityClearance] = useState(false);

  useEffect(() => {
    const target = new Date("February 28, 2026 09:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    // Simulate security clearance animation
    setTimeout(() => setSecurityClearance(true), 800);

    return () => clearInterval(interval);
  }, []);

  const assets = [
    {
      id: "ASSET-01",
      title: "STRATEGIC FINANCIAL & AI MASTERY",
      value: "R8,500.00",
      icon: <Database size={24} />,
      deliverables: [
        "LEDGER ARCHITECTURE: Direct guidance on building a custom Chart of Accounts live, ensuring your business is 'Funding Ready' for banks and investors.",
        "AI-DRIVEN ORCHESTRATION: Implementation strategies for AI marketing ecosystems that automate customer engagement and lead nurturing.",
        "AEO PROTOCOL: Training on Answer Engine Optimization—restructuring your business data into semantic clusters so AI models (ChatGPT/Gemini) cite you as the authority.",
        "TRANSITION FIX: Moving from 'Bank Balance Watching' to predictive, strategic profit forecasting."
      ]
    },
    {
      id: "ASSET-02",
      title: "DIGITAL ENTITY AUDIT & GMB DOMINATION",
      value: "R3,800.00",
      icon: <Target size={24} />,
      deliverables: [
        "MIRROR RULE COMPLIANCE: A character-perfect audit of your digital footprint across Google Maps and local directories to reveal 'Signal Mismatches.'",
        "CONVERSION ENGINE SETUP: Direct support in turning a standard Google Business Profile into an active revenue engine using Q&A seeding and geotagged imagery.",
        "GHOST REMOVAL: Identifying exactly why your business exists in physical reality but remains invisible to the 2026 Smart Filter.",
        "TRANSITION FIX: Eliminating 'Digital Invisibility' by forcing the Knowledge Graph to verify your entity."
      ]
    },
    {
      id: "ASSET-03",
      title: "2 MONTHS PROFESSIONAL BOOKKEEPING SUPPORT",
      value: "R4,000.00",
      icon: <Shield size={24} />,
      deliverables: [
        "DATA INTEGRITY: Professional management of your financial nodes to ensure your ledger is 100% compliant.",
        "OPERATIONAL CONSISTENCY: Building the habit of automated bookkeeping using software frameworks (Zoho/Wave) configured during the session.",
        "COMPLIANCE GUARDIANSHIP: Removing the 'Audit Anxiety' by ensuring your books are perpetually ready for scrutiny.",
        "TRANSITION FIX: Automating the back-end of the business to free up the founder for high-level decision making."
      ]
    }
  ];

  return (
    <div 
      className="min-h-screen pb-32 selection:bg-[#d4af37]/30"
      style={{ 
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        backgroundColor: '#f0fdfa',
        color: '#3E2723'
      }}
    >
      {/* TOP SECRET HEADER BAR */}
      <div className="bg-[#3E2723] text-[#f0fdfa] py-2 overflow-hidden relative">
        <div className="flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
          <Lock size={12} className="text-[#d4af37]" />
          <span>Confidential Strategic Report // Clearance Level: Strategic Partner</span>
          <Lock size={12} className="text-[#d4af37]" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2Q0YWYzNyIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* CLASSIFICATION HEADER */}
      <div className="bg-[#134e4a] text-[#f0fdfa] py-8 px-6 border-b-4 border-[#d4af37]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-[#3E2723] rounded-lg flex items-center justify-center border-2 border-[#d4af37]">
                <Eye className="text-[#d4af37]" size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37]">IntegratedWellth Solutions</p>
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Strategic Command
                </h1>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-[#f0fdfa]/60">Report Classification</p>
              <div className="flex items-center gap-2 text-[#d4af37] font-black text-lg uppercase tracking-widest">
                <Shield size={20} />
                Confidential
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 text-[10px] uppercase tracking-wider border-t border-[#f0fdfa]/20 pt-4">
            <div><span className="text-[#f0fdfa]/50">Project:</span> <span className="font-bold text-[#f0fdfa]">Summit 2026 // SME Clarity</span></div>
            <div><span className="text-[#f0fdfa]/50">Directive:</span> <span className="font-bold text-[#f0fdfa]">Asset Breakdown Analysis</span></div>
            <div><span className="text-[#f0fdfa]/50">Date:</span> <span className="font-bold text-[#f0fdfa]">28 February 2026</span></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        
        {/* EXECUTIVE SUMMARY */}
        <section className={`transition-all duration-1000 ${securityClearance ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-[#3E2723] text-[#f0fdfa] p-8 rounded-2xl shadow-2xl border-l-4 border-[#d4af37] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FileText size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Radio className="text-[#d4af37] animate-pulse" size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37]">Executive Summary</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
                Value Transfer Analysis
              </h2>
              <p className="text-[#f0fdfa]/80 text-sm md:text-base leading-relaxed max-w-3xl">
                This report provides a granular breakdown of the high-value strategic assets being transferred to every attendee during the Summit. 
                <span className="text-[#d4af37] font-bold"> This is not a "training session"</span>—it is a full-scale injection of professional infrastructure designed to mend the digital and financial architecture of a South African SME.
              </p>
            </div>
          </div>
        </section>

        {/* STRATEGIC ARBITRAGE SUMMARY - MOVED TO TOP FOR IMPACT */}
        <section className="bg-white rounded-3xl shadow-xl border-2 border-[#d4af37]/30 overflow-hidden">
          <div className="bg-[#d4af37] px-6 py-4 flex items-center justify-between">
            <h3 className="text-[#3E2723] font-black uppercase tracking-widest text-sm flex items-center gap-2">
              <Zap size={18} /> Strategic Arbitrage Summary
            </h3>
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#3E2723] text-[#d4af37] px-3 py-1 rounded-full">Top Secret</span>
          </div>
          <div className="p-8 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-[#f0fdfa] rounded-2xl border border-[#134e4a]/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#64748b] mb-2">Total Asset Value</p>
              <p className="text-4xl font-black text-[#3E2723]" style={{ fontFamily: "'Sora', sans-serif" }}>R16,300</p>
            </div>
            <div className="text-center p-6 bg-[#134e4a]/5 rounded-2xl border border-[#134e4a]/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#64748b] mb-2">Ticket Price</p>
              <p className="text-4xl font-black text-[#134e4a]" style={{ fontFamily: "'Sora', sans-serif" }}>R849.99</p>
            </div>
            <div className="text-center p-6 bg-[#d4af37]/10 rounded-2xl border-2 border-[#d4af37] relative overflow-hidden">
              <div className="absolute inset-0 bg-[#d4af37]/5 animate-pulse"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#3E2723] mb-2 relative z-10">Net Arbitrage Gain</p>
              <p className="text-4xl font-black text-[#3E2723] relative z-10" style={{ fontFamily: "'Sora', sans-serif" }}>R15,450</p>
            </div>
          </div>
          <div className="px-8 pb-8">
            <div className="bg-[#3E2723] text-[#f0fdfa] p-6 rounded-xl flex items-start gap-4">
              <AlertTriangle className="text-[#d4af37] shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-black uppercase tracking-widest text-sm mb-2 text-[#d4af37]">The Hard Truth</h4>
                <p className="text-sm leading-relaxed text-[#f0fdfa]/90">
                  Attending this summit results in an immediate net gain of <span className="text-[#d4af37] font-bold">R15,450.01</span> in professional services and consulting deliverables. 
                  The cost of non-attendance is not just the lost value, but the continued loss of revenue caused by Digital Invisibility and Financial Fog.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ASSET BREAKDOWN SECTIONS */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-[#134e4a]/20"></div>
            <h3 className="text-xl font-black uppercase tracking-[0.2em] text-[#134e4a]">Asset Breakdown</h3>
            <div className="h-px flex-1 bg-[#134e4a]/20"></div>
          </div>

          {assets.map((asset, index) => (
            <section 
              key={asset.id} 
              className="bg-white rounded-3xl shadow-lg border border-[#3E2723]/10 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
            >
              {/* Asset Header */}
              <div className="bg-[#134e4a] text-[#f0fdfa] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3E2723] border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                    {asset.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-1">Asset {asset.id}</p>
                    <h4 className="text-lg md:text-xl font-black uppercase tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                      {asset.title}
                    </h4>
                  </div>
                </div>
                <div className="bg-[#3E2723] px-6 py-3 rounded-xl border border-[#d4af37]/30">
                  <p className="text-[10px] uppercase tracking-widest text-[#f0fdfa]/60 mb-1">Market Value</p>
                  <p className="text-2xl font-black text-[#d4af37]" style={{ fontFamily: "'Sora', sans-serif" }}>{asset.value}</p>
                </div>
              </div>

              {/* Asset Content */}
              <div className="p-8">
                <div className="mb-6">
                  <h5 className="text-xs font-black uppercase tracking-widest text-[#134e4a] mb-4 flex items-center gap-2">
                    <Target size={14} /> The Deliverable
                  </h5>
                  <ul className="space-y-4">
                    {asset.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#3E2723]/80 leading-relaxed">
                        <CheckCircle size={18} className="text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* EVENT DETAILS - TACTICAL BRIEFING STYLE */}
        <section className="bg-[#3E2723] rounded-3xl p-8 text-[#f0fdfa] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
          
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3" style={{ fontFamily: "'Sora', sans-serif" }}>
            <MapPin className="text-[#d4af37]" /> Mission Parameters
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#f0fdfa]/5 backdrop-blur-sm p-6 rounded-2xl border border-[#f0fdfa]/10">
              <Calendar className="text-[#d4af37] mb-3" size={24} />
              <p className="text-[10px] uppercase tracking-widest text-[#f0fdfa]/50 mb-1">Date</p>
              <p className="text-xl font-black">28 February 2026</p>
            </div>
            <div className="bg-[#f0fdfa]/5 backdrop-blur-sm p-6 rounded-2xl border border-[#f0fdfa]/10">
              <Clock className="text-[#d4af37] mb-3" size={24} />
              <p className="text-[10px] uppercase tracking-widest text-[#f0fdfa]/50 mb-1">Time</p>
              <p className="text-xl font-black">09:00 - 16:00</p>
            </div>
            <div className="bg-[#f0fdfa]/5 backdrop-blur-sm p-6 rounded-2xl border border-[#f0fdfa]/10">
              <User className="text-[#d4af37] mb-3" size={24} />
              <p className="text-[10px] uppercase tracking-widest text-[#f0fdfa]/50 mb-1">Capacity</p>
              <p className="text-xl font-black">50 Units Only</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-[#134e4a]/50 backdrop-blur-md rounded-2xl p-6 border border-[#d4af37]/20">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-4">Operation Commences In</p>
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { val: timeLeft.days, label: "Days" },
                { val: timeLeft.hours, label: "Hours" },
                { val: timeLeft.mins, label: "Mins" },
                { val: timeLeft.secs, label: "Secs" }
              ].map((t, i) => (
                <div key={i} className="bg-[#3E2723] rounded-xl p-4 text-center border border-[#d4af37]/20">
                  <div className="text-3xl md:text-4xl font-black text-[#d4af37]" style={{ fontFamily: "'Sora', sans-serif" }}>{t.val}</div>
                  <div className="text-[10px] font-bold uppercase text-[#f0fdfa]/50 tracking-widest mt-1">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#3E2723] text-[10px] font-black uppercase tracking-widest">
            <Lock size={12} /> Security Clearance Required
          </div>
          
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#3E2723]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Secure Your <span className="text-[#134e4a]">Clearance</span>
          </h3>
          
          <p className="text-[#64748b] max-w-xl mx-auto">
            Access to this strategic briefing is limited to 50 entities. 
            Clearance granted on a first-come, first-served basis.
          </p>

          <a 
            href="https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#134e4a] text-[#f0fdfa] px-12 py-6 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl uppercase tracking-tighter border-2 border-[#134e4a] hover:bg-[#0f3d3a] group"
          >
            Initiate Access Protocol 
            <ArrowRight size={24} className="text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="pt-8 border-t border-[#134e4a]/10">
            <div className="flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-[#64748b]">
              <span className="flex items-center gap-2"><Shield size={14} className="text-[#134e4a]" /> Secure Transaction</span>
              <span className="flex items-center gap-2"><CheckCircle size={14} className="text-[#134e4a]" /> Immediate Confirmation</span>
              <span className="flex items-center gap-2"><Lock size={14} className="text-[#134e4a]" /> Data Protected</span>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER CLASSIFICATION */}
      <div className="bg-[#3E2723] text-[#f0fdfa]/30 py-4 text-center text-[10px] font-mono uppercase tracking-widest border-t border-[#d4af37]/20">
        Confidential // IntegratedWellth Solutions // 2026 // Authorized Personnel Only
      </div>
    </div>
  );
}
