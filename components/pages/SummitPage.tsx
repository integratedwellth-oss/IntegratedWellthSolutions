import React, { useEffect, useState } from 'react';
import { ShieldCheck, Zap, ArrowRight, MapPin, Calendar, Clock, CheckCircle2, AlertTriangle, TrendingUp, HelpCircle, TrendingDown, Mic2, Lock, Target, Cpu, ChevronRight } from 'lucide-react';
import RevealOnScroll from '../RevealOnScroll';

export default function SummitPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

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
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="pt-24 pb-20 px-6 min-h-screen selection:bg-[#d4af37]/30"
      style={{ 
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        backgroundColor: '#f0fdfa', // Mint Seafoam background
        color: '#3E2723' // Foundational Brown text
      }}
    >
      
      {/* 1. HERO: THE VALUE ARBITRAGE HOOK */}
      <section className="max-w-7xl mx-auto py-20 lg:py-32 border-b border-[#134e4a]/20">
        <RevealOnScroll width="100%">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
               <div className="flex items-center gap-1 shadow-xl rounded-lg overflow-hidden">
                 <div className="bg-[#134e4a] text-[#f0fdfa] px-3 py-1 font-black text-xs tracking-widest uppercase">Integrated</div>
                 <div className="bg-[#3E2723] text-[#d4af37] px-3 py-1 font-black text-xs tracking-widest uppercase">Wellth</div>
               </div>
               <span className="text-[#134e4a] font-black uppercase text-[10px] tracking-[0.4em]">Official 2026 Protocol</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8 font-sora text-[#3E2723]">
              Operational <br /> <span className="text-[#134e4a]">Clarity.</span>
            </h1>
            
            <p className="text-xl text-[#64748b] italic font-medium leading-relaxed max-w-2xl mx-auto">
              The only tactical briefing in South Africa that aligns your <span className="text-[#3E2723] underline decoration-[#d4af37]/50">Financial Architecture</span> with your <span className="text-[#3E2723] underline decoration-[#d4af37]/50">Digital Sovereignty</span>.
            </p>
          </div>
        </RevealOnScroll>

        {/* HERO IMAGES GRID */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
           <RevealOnScroll>
             <div className="relative rounded-[3rem] h-[400px] overflow-hidden border-2 border-[#3E2723]/10 shadow-2xl group">
                <img 
                  src="https://res.cloudinary.com/dka0498ns/image/upload/v1765644818/Accountability_Partnership._SMMEs_review_session._egzihs.jpg" 
                  className="w-full h-full object-cover sepia-[.3] group-hover:sepia-0 transition-all duration-1000" 
                  alt="SMMEs Review Session" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#3E2723] to-transparent text-left">
                   <p className="text-xs font-black uppercase text-[#d4af37] tracking-widest">Accountability Protocol</p>
                   <p className="text-[#f0fdfa] font-bold text-sm">Strategic Review Session</p>
                </div>
             </div>
           </RevealOnScroll>
           <RevealOnScroll delay={0.2}>
             <div className="relative rounded-[3rem] h-[400px] overflow-hidden border-2 border-[#3E2723]/10 shadow-2xl group">
                <img 
                  src="https://res.cloudinary.com/dka0498ns/image/upload/v1765321878/Integrated_Wellth_Financial_Literacy._nscht7.jpg" 
                  className="w-full h-full object-cover sepia-[.3] group-hover:sepia-0 transition-all duration-1000" 
                  alt="Financial Literacy" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#3E2723] to-transparent text-left">
                   <p className="text-xs font-black uppercase text-[#d4af37] tracking-widest">Financial Intelligence</p>
                   <p className="text-[#f0fdfa] font-bold text-sm">Literacy & Compliance</p>
                </div>
             </div>
           </RevealOnScroll>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="p-8 border-2 border-[#d4af37]/30 bg-white/80 backdrop-blur-md rounded-3xl space-y-4 shadow-2xl relative overflow-hidden">
             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#134e4a]/60">
                <span>Market Value: R8,500.00</span>
                <span className="text-[#f0fdfa] bg-[#3E2723] px-2 py-0.5 rounded">Secure Access: 50 Units</span>
             </div>
             <div className="text-5xl font-black text-center text-[#3E2723]">R849.99</div>
             <p className="text-[#64748b] text-xs italic text-center">Strategic Value Transfer of R7,650.01 to your Entity.</p>
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')}
              className="w-full sm:w-fit bg-[#134e4a] text-[#f0fdfa] px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 uppercase tracking-tighter border-2 border-[#134e4a] hover:bg-[#0f3d3a]"
            >
              Initiate Access Protocol <ArrowRight size={24} className="text-[#d4af37]" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section className="py-32 max-w-5xl mx-auto border-b border-[#134e4a]/20">
        <div className="text-center mb-20 space-y-4">
           <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic font-sora text-[#3E2723]">System <span className="text-[#134e4a]">Vulnerabilities</span></h3>
           <p className="text-[#64748b] font-medium">Most entities are operating without a secure perimeter. Your craft is excellent, but your infrastructure is exposed.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {[
             { title: "Financial Blindspots", desc: "Lack of visibility into true profitability vs. operational activity.", icon: <TrendingDown size={32} color="#3E2723" /> },
             { title: "Compliance Risk", desc: "Exposure to audit failure due to unstructured record keeping.", icon: <AlertTriangle size={32} color="#d4af37" /> },
             { title: "Digital Invisibility", desc: "Local market cannot locate your entity due to broken digital architecture.", icon: <Zap size={32} color="#134e4a" /> }
           ].map((p, i) => (
             <div key={i} className="p-10 border border-[#134e4a]/20 rounded-[3rem] bg-white/60 backdrop-blur-sm text-center space-y-4 hover:border-[#d4af37]/50 transition-all group">
                <div className="flex justify-center mb-4 bg-[#f0fdfa] w-16 h-16 rounded-full items-center mx-auto border border-[#134e4a]/10 group-hover:scale-110 transition-transform">{p.icon}</div>
                <h4 className="font-black uppercase text-sm tracking-widest text-[#3E2723]">{p.title}</h4>
                <p className="text-[#64748b] text-xs leading-relaxed italic">{p.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* 3. THE SPEAKERS */}
      <section className="py-32 max-w-6xl mx-auto border-b border-[#134e4a]/20">
        <div className="text-center mb-20">
           <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6 font-sora text-[#3E2723]">The <span className="text-[#134e4a]">Architects</span></h3>
           <p className="text-[#64748b] font-black uppercase tracking-widest text-[10px]">Two Specialists. One Day. Total System Integrity.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           {/* MARCIA */}
           <div className="p-10 border border-[#3E2723]/20 rounded-[4rem] bg-white/60 backdrop-blur-sm space-y-8 hover:border-[#d4af37]/30 transition-all shadow-lg text-left">
              <div className="relative rounded-[3rem] overflow-hidden border-2 border-[#3E2723]/10 mb-6 h-[300px]">
                 <img 
                   src="https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg" 
                   className="w-full h-full object-cover sepia-[.2] hover:sepia-0 transition-all duration-700" 
                   alt="Marcia" 
                 />
              </div>
              <span className="text-[#134e4a] font-black uppercase text-[10px] tracking-widest">Phase 1: Foundation</span>
              <h4 className="text-3xl font-black uppercase leading-none font-sora text-[#3E2723]">Financial <br /> <span className="text-[#134e4a]">Architecture</span></h4>
              <div className="space-y-4 text-sm text-[#64748b]">
                 <p className="flex items-center gap-3"><CheckCircle2 size={16} color="#d4af37"/> Automated Ledger Systems</p>
                 <p className="flex items-center gap-3"><CheckCircle2 size={16} color="#d4af37"/> Funding & Compliance Readiness</p>
              </div>
           </div>

           {/* THABO */}
           <div className="p-10 border border-[#3E2723]/20 rounded-[4rem] bg-white/60 backdrop-blur-sm space-y-8 hover:border-[#d4af37]/30 transition-all shadow-lg text-left">
              <div className="relative rounded-[3rem] overflow-hidden border-2 border-[#3E2723]/10 mb-6 h-[300px]">
                 <img 
                   src="https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png" 
                   className="w-full h-full object-cover sepia-[.2] hover:sepia-0 transition-all duration-700" 
                   alt="Thabo" 
                 />
              </div>
              <span className="text-[#134e4a] font-black uppercase text-[10px] tracking-widest">Phase 2: Optimization</span>
              <h4 className="text-3xl font-black uppercase leading-none font-sora text-[#3E2723]">Digital <br /> <span className="text-[#134e4a]">Sovereignty</span></h4>
              <div className="space-y-4 text-sm text-[#64748b]">
                 <p className="flex items-center gap-3"><CheckCircle2 size={16} color="#d4af37"/> Local SEO & GMB Domination</p>
                 <p className="flex items-center gap-3"><CheckCircle2 size={16} color="#d4af37"/> Marketing Automation Frameworks</p>
              </div>
           </div>
        </div>
      </section>

      {/* 4. KEYNOTE */}
      <section className="py-32 max-w-4xl mx-auto border-b border-[#134e4a]/20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-6">
            <Target size={16} color="#d4af37" />
            <span className="text-[#3E2723] font-black uppercase text-[10px] tracking-[0.3em]">Command Briefing</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-12 font-sora text-[#3E2723]">Strategic <span className="text-[#134e4a]">Leadership</span></h3>
          <div className="relative rounded-[4rem] overflow-hidden border-2 border-[#d4af37]/20 bg-white/60 backdrop-blur-md shadow-xl p-10 flex flex-col md:flex-row items-center gap-10 text-left">
              <img src="https://res.cloudinary.com/dka0498ns/image/upload/v1770754623/Business_Coach_and_Mentor_Tukisang_Senne_cgtyyw.jpg" className="w-48 h-48 rounded-full object-cover border-4 border-[#d4af37]/30 shadow-xl" alt="Tukisang" />
              <div className="space-y-4">
                 <h4 className="text-4xl font-black uppercase text-[#3E2723] font-sora">Tukisang Senne</h4>
                 <p className="text-[#134e4a] font-black uppercase tracking-widest text-[10px]">Executive Coach & Mentor</p>
                 <p className="text-[#64748b] text-sm italic">"Bridging the gap between technical excellence and strategic command."</p>
              </div>
          </div>
      </section>

      {/* 5. LOGISTICS */}
      <section className="py-32 max-w-4xl mx-auto text-center">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-[#134e4a]/20 rounded-[2.5rem] bg-white/60 backdrop-blur-sm shadow-sm">
               <Calendar className="mx-auto mb-4 text-[#134e4a]" size={32} />
               <p className="text-xs font-black uppercase text-[#64748b] tracking-widest mb-2">Date</p>
               <p className="text-xl font-black text-[#3E2723]">Feb 28, 2026</p>
            </div>
            <div className="p-8 border border-[#134e4a]/20 rounded-[2.5rem] bg-white/60 backdrop-blur-sm shadow-sm">
               <Clock className="mx-auto mb-4 text-[#134e4a]" size={32} />
               <p className="text-xs font-black uppercase text-[#64748b] tracking-widest mb-2">Time</p>
               <p className="text-xl font-black text-[#3E2723]">09:00 - 16:00</p>
            </div>
            <div className="p-8 border border-[#134e4a]/20 rounded-[2.5rem] bg-white/60 backdrop-blur-sm shadow-sm">
               <MapPin className="mx-auto mb-4 text-[#134e4a]" size={32} />
               <p className="text-xs font-black uppercase text-[#64748b] tracking-widest mb-2">Location</p>
               <p className="text-xl font-black text-[#3E2723]">Munyaka, Waterfall</p>
            </div>
         </div>

         {/* Countdown */}
         <div className="mt-20 p-12 border border-[#134e4a]/20 rounded-[3rem] bg-[#3E2723] text-white text-center shadow-2xl relative overflow-hidden">
            <p className="text-xs font-black uppercase text-[#d4af37] tracking-[0.3em] mb-8 relative z-10">Operation Commences In</p>
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto relative z-10">
               {[{ val: timeLeft.days, label: "Days" }, { val: timeLeft.hours, label: "Hours" }, { val: timeLeft.mins, label: "Mins" }, { val: timeLeft.secs, label: "Secs" }].map((t, i) => (
                 <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                   <div className="text-3xl md:text-5xl font-black text-[#d4af37] mb-1 font-sora">{t.val}</div>
                   <div className="text-[10px] font-bold uppercase text-white/40 tracking-widest">{t.label}</div>
                 </div>
               ))}
            </div>
            <Lock className="absolute -bottom-10 -right-10 text-[#d4af37] opacity-5" size={250} />
         </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 text-center">
        <button 
          onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')}
          className="inline-flex items-center gap-3 bg-[#134e4a] text-[#f0fdfa] px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl uppercase tracking-tighter border-2 border-[#134e4a]"
        >
          Secure Clearance <ArrowRight size={24} color="#d4af37" />
        </button>
        <p className="mt-6 text-[#64748b] text-xs font-bold uppercase tracking-widest">Access Limited: 50 Units • R 849.99</p>
      </section>
    </div>
  );
}
