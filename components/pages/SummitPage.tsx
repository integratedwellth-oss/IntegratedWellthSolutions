// src/pages/SummitPage.tsx
import { useEffect, useState } from 'react';
import { ArrowRight, MapPin, Calendar, Clock, CheckCircle2, Shield, Zap, TrendingDown, AlertTriangle, Radio, Lock, Eye, Target, Database, User, Users, Flame } from 'lucide-react';

export default function SummitPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isVisible, setIsVisible] = useState(false);

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

    setIsVisible(true);
    return () => clearInterval(interval);
  }, []);

  const valueBreakdown = [
    {
      id: "01",
      title: "Strategic Financial & AI Mastery",
      value: "R8,500.00",
      icon: <Database size={20} />,
      items: [
        "Custom Chart of Accounts Architecture",
        "AI Marketing Ecosystem Implementation",
        "Answer Engine Optimization (AEO) Protocol",
        "Predictive Profit Forecasting Systems"
      ]
    },
    {
      id: "02",
      title: "Digital Entity Audit & GMB Domination",
      value: "R3,800.00",
      icon: <Target size={20} />,
      items: [
        "Mirror Rule Compliance Audit",
        "Google Business Profile Conversion Engine",
        "Ghost Removal (Digital Invisibility Fix)",
        "Knowledge Graph Verification Strategy"
      ]
    },
    {
      id: "03",
      title: "2 Months Professional Bookkeeping",
      value: "R4,000.00",
      icon: <Shield size={20} />,
      items: [
        "Data Integrity Management",
        "Automated Ledger Systems (Zoho/Wave)",
        "Compliance Guardianship",
        "Audit-Ready Financial Infrastructure"
      ]
    }
  ];

  return (
    <div 
      className="min-h-screen selection:bg-[#d4af37]/30 overflow-x-hidden"
      style={{ 
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        backgroundColor: '#f0fdfa',
        color: '#3E2723'
      }}
    >
      {/* HERO SECTION: PAIN POINT HOOK */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #134e4a 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0fdfa] via-transparent to-[#f0fdfa]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Classification Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Radio size={14} className="text-[#d4af37] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#134e4a]">Confidential Briefing</span>
          </div>

          {/* MAIN PAIN POINT HEADLINE */}
          <h1 
            className={`text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ fontFamily: "'Sora', sans-serif", color: '#3E2723' }}
          >
            Your Business Is<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#134e4a] to-[#d4af37]">Bleeding Cash</span><br />
            <span className="text-3xl md:text-5xl lg:text-6xl text-[#64748b]">And You Can't See Where</span>
          </h1>

          <p className={`text-lg md:text-xl text-[#64748b] max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            You're working harder than ever, but your financials are a black box. 
            Your customers can't find you online. And every month feels like you're 
            <span className="text-[#3E2723] font-bold"> gambling in the dark</span>.
          </p>

          {/* IMMEDIATE VALUE PROPOSITION */}
          <div className={`bg-white rounded-3xl shadow-2xl border-2 border-[#d4af37]/20 p-8 max-w-4xl mx-auto transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#134e4a] mb-2">The Fix</p>
                <p className="text-2xl md:text-3xl font-black text-[#3E2723]" style={{ fontFamily: "'Sora', sans-serif" }}>
                  1 Day. Total Clarity.<br />
                  <span className="text-[#d4af37]">R16,300 Value.</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#64748b] line-through">R16,300.00</p>
                  <p className="text-4xl md:text-5xl font-black text-[#134e4a]" style={{ fontFamily: "'Sora', sans-serif" }}>R849.99</p>
                </div>
                <a 
                  href="https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#134e4a] text-[#f0fdfa] px-8 py-4 rounded-2xl font-black uppercase tracking-wider hover:scale-105 transition-all shadow-xl flex items-center gap-2 group"
                >
                  Secure Access
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-[#64748b] border-t border-[#134e4a]/10 pt-4">
              <span className="flex items-center gap-1"><Lock size={12} /> Only 50 Seats</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> 28 Feb 2026</span>
              <span className="flex items-center gap-1"><MapPin size={12} /> Munyaka, Waterfall</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#134e4a]/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#134e4a] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM: VISUALIZED */}
      <section className="py-20 bg-[#3E2723] text-[#f0fdfa] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dka0498ns/image/upload/v1765644818/Accountability_Partnership._SMMEs_review_session._egzihs.jpg')] opacity-10 bg-cover bg-center"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              The <span className="text-[#d4af37]">Fog</span> Of Business
            </h2>
            <p className="text-[#f0fdfa]/60 text-lg">Three critical failures killing South African SMEs right now</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <TrendingDown size={32} />, title: "Financial Blindness", desc: "You don't know if you're truly profitable or just busy. No system, no clarity, no control." },
              { icon: <AlertTriangle size={32} />, title: "Compliance Risk", desc: "You fear the 'Audit' conversation because your books are a mess. One SARS letter away from disaster." },
              { icon: <Zap size={32} />, title: "Digital Ghost", desc: "You exist physically but you're invisible online. Customers can't find you. Google doesn't know you exist." }
            ].map((item, i) => (
              <div key={i} className="bg-[#f0fdfa]/5 backdrop-blur-sm border border-[#f0fdfa]/10 rounded-3xl p-8 text-center hover:bg-[#f0fdfa]/10 transition-all">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black uppercase tracking-widest mb-3">{item.title}</h3>
                <p className="text-[#f0fdfa]/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE BREAKDOWN: THE ARBITRAGE */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] bg-[#d4af37]/10 px-4 py-2 rounded-full">Asset Injection Protocol</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-6 mb-4" style={{ fontFamily: "'Sora', sans-serif", color: '#3E2723' }}>
              What You <span className="text-[#134e4a]">Receive</span>
            </h2>
            <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
              This is not a workshop. This is a <span className="text-[#3E2723] font-bold">full-scale infrastructure injection</span> into your business.
            </p>
          </div>

          <div className="space-y-6">
            {valueBreakdown.map((asset, index) => (
              <div 
                key={asset.id} 
                className="bg-white rounded-3xl shadow-xl border border-[#134e4a]/10 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Asset Header */}
                  <div className="lg:w-1/3 bg-[#134e4a] p-8 flex flex-col justify-between text-[#f0fdfa]">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#d4af37]">
                          {asset.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37]">Asset {asset.id}</span>
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tight leading-tight mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
                        {asset.title}
                      </h3>
                    </div>
                    <div className="pt-4 border-t border-[#f0fdfa]/20">
                      <p className="text-[10px] uppercase tracking-widest text-[#f0fdfa]/50 mb-1">Market Value</p>
                      <p className="text-3xl font-black text-[#d4af37]" style={{ fontFamily: "'Sora', sans-serif" }}>{asset.value}</p>
                    </div>
                  </div>

                  {/* Asset Content */}
                  <div className="lg:w-2/3 p-8">
                    <ul className="space-y-4">
                      {asset.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-[#f0fdfa] border border-[#134e4a]/5">
                          <CheckCircle2 size={20} className="text-[#d4af37] shrink-0 mt-0.5" />
                          <span className="text-[#3E2723] font-medium text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL VALUE CALCULATION */}
          <div className="mt-12 bg-[#3E2723] rounded-3xl p-8 md:p-12 text-[#f0fdfa] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Total Asset Value
                </h3>
                <p className="text-[#f0fdfa]/60">Professional services equivalent if procured separately</p>
              </div>
              <div className="text-right">
                <p className="text-6xl md:text-7xl font-black text-[#d4af37]" style={{ fontFamily: "'Sora', sans-serif" }}>R16,300</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#f0fdfa]/50 mt-2">Your Investment: R849.99</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPEAKERS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#134e4a]">The Architects</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-4" style={{ fontFamily: "'Sora', sans-serif", color: '#3E2723' }}>
              Mission <span className="text-[#d4af37]">Control</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Marcia Kgaphola */}
            <div className="group">
              <div className="relative rounded-3xl overflow-hidden mb-6 bg-[#f0fdfa]">
                <img 
                  src="https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Marcia_Kgaphola._Founder_x8bkog.jpg"
                  alt="Marcia Kgaphola - Founder"
                  className="w-full h-[400px] object-cover object-top sepia-[.2] group-hover:sepia-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37]">Host & Financial Architect</span>
                  <h3 className="text-2xl font-black text-[#f0fdfa] uppercase tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>Marcia Kgaphola</h3>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#64748b] leading-relaxed">
                  Chartered Business Accountant (CIBA) and founder of Integrated Wellth Solutions. 
                  Specializes in transforming financial chaos into strategic clarity for SMMEs.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#134e4a]">
                  <Database size={12} /> Financial Sovereignty Protocol
                </div>
              </div>
            </div>

            {/* Thabo Leslie Motsumi */}
            <div className="group">
              <div className="relative rounded-3xl overflow-hidden mb-6 bg-[#f0fdfa]">
                <img 
                  src="https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png"
                  alt="Thabo Leslie Motsumi - Digital Strategist"
                  className="w-full h-[400px] object-cover object-top sepia-[.2] group-hover:sepia-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37]">Digital Intelligence Officer</span>
                  <h3 className="text-2xl font-black text-[#f0fdfa] uppercase tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>Thabo Leslie Motsumi</h3>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#64748b] leading-relaxed">
                  Founder of Happy Hunter Digital. AI and SEO strategist who engineers digital 
                  visibility for businesses invisible to the modern consumer.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#134e4a]">
                  <Target size={12} /> Digital Authority Systems
                </div>
              </div>
            </div>

            {/* Tukisang Senne */}
            <div className="group">
              <div className="relative rounded-3xl overflow-hidden mb-6 bg-[#f0fdfa]">
                <img 
                  src="https://res.cloudinary.com/dka0498ns/image/upload/v1770754623/Business_Coach_and_Mentor_Tukisang_Senne_cgtyyw.jpg"
                  alt="Tukisang Senne - Keynote Speaker"
                  className="w-full h-[400px] object-cover object-top sepia-[.2] group-hover:sepia-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37]">Keynote Command</span>
                  <h3 className="text-2xl font-black text-[#f0fdfa] uppercase tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>Tukisang Senne</h3>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#64748b] leading-relaxed">
                  Executive Business Coach and Mentor. Bridges the gap between technical excellence 
                  and strategic leadership for scaling enterprises.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#134e4a]">
                  <User size={12} /> Leadership Architecture
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT DETAILS & COUNTDOWN */}
      <section className="py-24 bg-[#134e4a] text-[#f0fdfa] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dka0498ns/image/upload/v1765321878/Integrated_Wellth_Financial_Literacy._nscht7.jpg')] opacity-5 bg-cover bg-center"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-4 block">Mission Parameters</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8" style={{ fontFamily: "'Sora', sans-serif" }}>
                Secure Your<br />Clearance
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f0fdfa]/5 border border-[#f0fdfa]/10">
                  <div className="w-12 h-12 rounded-xl bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#f0fdfa]/50">Date</p>
                    <p className="text-xl font-black">28 February 2026</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f0fdfa]/5 border border-[#f0fdfa]/10">
                  <div className="w-12 h-12 rounded-xl bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#f0fdfa]/50">Time</p>
                    <p className="text-xl font-black">09:00 - 16:00 SAST</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f0fdfa]/5 border border-[#f0fdfa]/10">
                  <div className="w-12 h-12 rounded-xl bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#f0fdfa]/50">Location</p>
                    <p className="text-xl font-black">Munyaka, Waterfall City</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]">
                  <div className="w-12 h-12 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#d4af37]">
                    <Eye size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#f0fdfa]/50">Capacity</p>
                    <p className="text-xl font-black text-[#d4af37]">50 Units Only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown & Seats Alert */}
            <div className="space-y-6">
              {/* Countdown Timer */}
              <div className="bg-[#3E2723] rounded-3xl p-8 border border-[#d4af37]/20">
                <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-6">Operation Commences In</p>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { val: timeLeft.days, label: "Days" },
                    { val: timeLeft.hours, label: "Hours" },
                    { val: timeLeft.mins, label: "Mins" },
                    { val: timeLeft.secs, label: "Secs" }
                  ].map((t, i) => (
                    <div key={i} className="bg-[#134e4a] rounded-2xl p-4 text-center border border-[#f0fdfa]/10">
                      <div className="text-3xl md:text-4xl font-black text-[#d4af37]" style={{ fontFamily: "'Sora', sans-serif" }}>{t.val}</div>
                      <div className="text-[10px] font-bold uppercase text-[#f0fdfa]/50 tracking-widest mt-1">{t.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEATS TAKEN ALERT - HIGH VISIBILITY */}
              <div className="bg-[#d4af37] rounded-3xl p-6 border-4 border-[#3E2723] shadow-2xl animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#3E2723] flex items-center justify-center text-[#d4af37] shadow-lg">
                      <Users size={32} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3E2723]/70 mb-1">Security Clearance Status</p>
                      <p className="text-3xl md:text-4xl font-black text-[#3E2723]" style={{ fontFamily: "'Sora', sans-serif" }}>
                        20 SEATS <span className="text-[#134e4a]">TAKEN</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-5xl font-black text-[#3E2723]" style={{ fontFamily: "'Sora', sans-serif" }}>30</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#3E2723]/70">Remaining</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#3E2723] mb-2">
                    <span>Capacity Filled</span>
                    <span>40%</span>
                  </div>
                  <div className="h-4 bg-[#3E2723]/20 rounded-full overflow-hidden border-2 border-[#3E2723]">
                    <div className="h-full bg-[#3E2723] rounded-full transition-all duration-1000" style={{ width: '40%' }}></div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[#3E2723] text-xs font-bold">
                  <Flame size={16} className="text-red-600" />
                  <span>High demand: 5 seats reserved in the last 24 hours</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[#f0fdfa]/60 text-sm mb-6">
                  Every day you wait is revenue lost to Financial Fog and Digital Invisibility.
                </p>
                <a 
                  href="https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#d4af37] text-[#3E2723] px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl uppercase tracking-tighter group w-full justify-center border-4 border-[#d4af37] hover:bg-[#f0fdfa]"
                >
                  Initiate Access Protocol
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA STRIP */}
      <section className="bg-[#f0fdfa] py-12 border-t border-[#134e4a]/10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#134e4a] flex items-center justify-center text-[#d4af37]">
              <Lock size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Security Clearance</p>
              <p className="text-lg font-black text-[#3E2723]">R15,450.01 Net Arbitrage Value</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-3xl font-black text-[#134e4a]" style={{ fontFamily: "'Sora', sans-serif" }}>R849.99</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#64748b] line-through">R16,300.00 Value</p>
            </div>
            <a 
              href="https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#134e4a] text-[#f0fdfa] px-8 py-4 rounded-2xl font-black uppercase tracking-wider hover:scale-105 transition-all shadow-xl flex items-center gap-2"
            >
              Secure Clearance <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* CLASSIFICATION FOOTER */}
      <div className="bg-[#3E2723] text-[#f0fdfa]/30 py-4 text-center text-[10px] font-mono uppercase tracking-widest">
        Confidential // IntegratedWellth Solutions // 2026 // Authorized Personnel Only
      </div>
    </div>
  );
}
