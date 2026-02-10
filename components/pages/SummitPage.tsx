import React, { useEffect, useState } from 'react';
import { ShieldCheck, Zap, ArrowRight, MapPin, Calendar, Clock, CheckCircle2, AlertTriangle, TrendingUp, HelpCircle, TrendingDown, Mic2, Lock, Target, Cpu, ChevronRight, Star } from 'lucide-react';
import RevealOnScroll from '../RevealOnScroll';

export default function SummitPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const TICKET_LINK = "https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/";
  const CTA_TEXT = "BOOK YOUR SEAT";
  const KEYNOTE_IMAGE = "https://res.cloudinary.com/dka0498ns/image/upload/v1770754623/Business_Coach_and_Mentor_Tukisang_Senne_cgtyyw.jpg";

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
      className="pt-24 pb-20 px-4 md:px-6 min-h-screen selection:bg-[#d4af37]/30"
      style={{ 
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        backgroundColor: '#f0fdfa', 
        color: '#3E2723' 
      }}
    >
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto py-16 md:py-32 border-b border-[#134e4a]/10">
        <RevealOnScroll width="100%">
          <div className="text-center mb-16 px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
               <div className="flex items-center gap-0 shadow-2xl rounded-xl overflow-hidden border border-black/5">
                 <div className="bg-[#134e4a] text-[#f0fdfa] px-4 py-2 font-black text-xs md:text-sm tracking-widest uppercase">Integrated</div>
                 <div className="bg-[#3E2723] text-[#d4af37] px-4 py-2 font-black text-xs md:text-sm tracking-widest uppercase">Wellth</div>
               </div>
               <span className="text-[#134e4a] font-black uppercase text-[10px] tracking-[0.4em] w-full md:w-auto text-center">Official 2026 Protocol</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 font-sora text-[#3E2723]">
              Operational <br /> <span className="text-[#134e4a]">Clarity.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#64748b] italic font-medium leading-relaxed max-w-2xl mx-auto">
              The only tactical briefing in South Africa that aligns your <span className="text-[#3E2723] underline decoration-[#d4af37] decoration-2">Financial Architecture</span> with your <span className="text-[#3E2723] underline decoration-[#d4af37] decoration-2">Digital Sovereignty</span>.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
           <div className="relative rounded-[2.5rem] md:rounded-[3.5rem] h-[350px] md:h-[450px] overflow-hidden border-2 border-[#3E2723]/10 shadow-2xl group">
              <img src="https://res.cloudinary.com/dka0498ns/image/upload/v1765644818/Accountability_Partnership._SMMEs_review_session._egzihs.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Review Session" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 text-left">
                 <p className="text-[10px] font-black uppercase text-[#d4af37] tracking-widest mb-1">Architecture</p>
                 <p className="text-white font-black text-xl uppercase tracking-tighter leading-none">Strategic Review</p>
              </div>
           </div>
           <div className="relative rounded-[2.5rem] md:rounded-[3.5rem] h-[350px] md:h-[450px] overflow-hidden border-2 border-[#3E2723]/10 shadow-2xl group">
              <img src="https://res.cloudinary.com/dka0498ns/image/upload/v1765321878/Integrated_Wellth_Financial_Literacy._nscht7.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Financial Literacy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 text-left">
                 <p className="text-[10px] font-black uppercase text-[#d4af37] tracking-widest mb-1">Intelligence</p>
                 <p className="text-white font-black text-xl uppercase tracking-tighter leading-none">Compliance Audit</p>
              </div>
           </div>
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-10">
          <div className="p-10 border-2 border-[#d4af37]/30 bg-white rounded-[3rem] shadow-2xl relative overflow-hidden">
             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#134e4a] opacity-60 mb-6">
                <span>Value: R8,500.00</span>
                <span className="bg-[#3E2723] text-white px-3 py-1 rounded-full">50 Seats Only</span>
             </div>
             <div className="text-6xl font-black text-[#3E2723] font-sora tracking-tighter">R849.99</div>
             <p className="text-[#64748b] text-sm mt-4 font-medium italic">Strategic Value Transfer to your Business Entity.</p>
          </div>

          <button 
            onClick={() => window.open(TICKET_LINK, '_blank')}
            className="w-full bg-[#3E2723] text-white py-8 rounded-[2rem] font-black text-2xl hover:bg-[#134e4a] transition-all shadow-2xl flex items-center justify-center gap-4 uppercase tracking-widest border-2 border-[#d4af37]/20"
          >
            {CTA_TEXT} <ArrowRight size={28} className="text-[#d4af37]" />
          </button>
        </div>
      </section>

      {/* 2. THE ARCHITECTS SECTION */}
      <section className="py-32 max-w-7xl mx-auto border-b border-[#134e4a]/10">
        <div className="text-center mb-20 px-4">
           <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter font-sora text-[#3E2723] mb-4">The <span className="text-[#134e4a]">Architects</span></h2>
           <p className="text-[#64748b] font-black uppercase tracking-[0.4em] text-[10px]">Command Level Intelligence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-10 rounded-[4rem] shadow-xl border border-[#134e4a]/5 flex flex-col items-start text-left">
              <div className="w-full h-[350px] rounded-[3rem] overflow-hidden mb-8 border-2 border-[#3E2723]/5">
                 <img src="https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg" className="w-full h-full object-cover" alt="Marcia" />
              </div>
              <h4 className="text-3xl font-black uppercase text-[#3E2723] font-sora mb-2">Marcia Kgaphola</h4>
              <p className="text-[#134e4a] font-black uppercase text-xs tracking-widest mb-6">Financial Architecture</p>
              <p className="text-[#64748b] leading-relaxed italic border-l-4 border-[#d4af37] pl-6 text-sm">"We bridge the gap between technical accounting and the psychology of business growth."</p>
           </div>

           <div className="bg-white p-10 rounded-[4rem] shadow-xl border border-[#134e4a]/5 flex flex-col items-start text-left">
              <div className="w-full h-[350px] rounded-[3rem] overflow-hidden mb-8 border-2 border-[#3E2723]/5">
                 <img src="https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png" className="w-full h-full object-cover" alt="Thabo" />
              </div>
              <h4 className="text-3xl font-black uppercase text-[#3E2723] font-sora mb-2">Thabo L. Motsumi</h4>
              <p className="text-[#134e4a] font-black uppercase text-xs tracking-widest mb-6">Digital Sovereignty</p>
              <p className="text-[#64748b] leading-relaxed italic border-l-4 border-[#d4af37] pl-6 text-sm">"Standardizing the digital footprint of African entities for global market scaling."</p>
           </div>
        </div>
      </section>

      {/* 3. KEYNOTE SPEAKER - RE-ENGINEERED FOR ABSOLUTE VISIBILITY */}
      <section className="py-32 max-w-6xl mx-auto border-b border-[#134e4a]/10 px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-6">
              <Target size={16} color="#d4af37" />
              <span className="text-[#3E2723] font-black uppercase text-[10px] tracking-[0.3em]">Command Briefing</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none font-sora text-[#3E2723]">Strategic <span className="text-[#134e4a]">Leadership</span></h3>
          </div>

          <div className="bg-[#3E2723] rounded-[4rem] overflow-hidden shadow-2xl border-4 border-[#d4af37]/20 grid grid-cols-1 lg:grid-cols-2">
              {/* IMAGE CONTAINER - HEIGHT FORCED FOR MOBILE */}
              <div className="relative h-[450px] lg:h-full min-h-[400px] overflow-hidden">
                  <img 
                    src={KEYNOTE_IMAGE} 
                    className="w-full h-full object-cover" 
                    alt="Tukisang Senne Keynote Speaker" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] via-transparent to-transparent lg:hidden" />
              </div>
              
              <div className="p-10 md:p-20 flex flex-col justify-center space-y-8 text-left bg-[#3E2723]">
                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-[#d4af37] font-black uppercase text-[10px] tracking-[0.4em]">
                        <Star size={14} className="fill-[#d4af37]" /> Keynote Speaker
                     </div>
                     <h4 className="text-4xl md:text-6xl font-black text-white font-sora uppercase leading-none">Tukisang <br/> Senne</h4>
                     <p className="text-[#d4af37] font-bold uppercase text-xs tracking-widest pt-2">Business Coach & Mentor</p>
                  </div>
                  
                  <p className="text-brand-50 text-lg md:text-xl font-medium leading-relaxed italic border-l-4 border-[#d4af37] pl-8">
                    "Scaling is not about working more; it's about building the command systems that work while you sleep."
                  </p>

                  <div className="space-y-4 pt-4">
                     {["Leadership Architecture", "Scaling Mindset Protocols", "Accountability Frameworks"].map((item, idx) => (
                       <div key={idx} className="flex items-center gap-3 text-white/90 font-bold text-sm">
                          <CheckCircle2 size={18} className="text-[#d4af37] shrink-0" /> {item}
                       </div>
                     ))}
                  </div>
              </div>
          </div>
      </section>

      {/* 4. LOGISTICS */}
      <section className="py-32 max-w-4xl mx-auto text-center px-4">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-[#134e4a]/10">
               <Calendar className="mx-auto mb-4 text-[#134e4a]" size={32} />
               <p className="text-xl font-black text-[#3E2723] font-sora uppercase">Feb 28</p>
               <p className="text-[10px] font-black text-[#64748b] uppercase tracking-widest">Saturday 2026</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-[#134e4a]/10">
               <Clock className="mx-auto mb-4 text-[#134e4a]" size={32} />
               <p className="text-xl font-black text-[#3E2723] font-sora uppercase">09:00</p>
               <p className="text-[10px] font-black text-[#64748b] uppercase tracking-widest">Until 16:30</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-[#134e4a]/10">
               <MapPin className="mx-auto mb-4 text-[#134e4a]" size={32} />
               <p className="text-xl font-black text-[#3E2723] font-sora uppercase">Waterfall</p>
               <p className="text-[10px] font-black text-[#64748b] uppercase tracking-widest">Munyaka Estate</p>
            </div>
         </div>

         <div className="p-10 md:p-16 bg-[#3E2723] rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
            <p className="text-[10px] font-black uppercase text-[#d4af37] tracking-[0.4em] mb-10">Operation Commences In</p>
            <div className="grid grid-cols-4 gap-2 md:gap-6">
               {[{ v: timeLeft.days, l: "Days" }, { v: timeLeft.hours, l: "Hrs" }, { v: timeLeft.mins, l: "Mins" }, { v: timeLeft.secs, l: "Secs" }].map((t, i) => (
                 <div key={i} className="bg-white/5 backdrop-blur-md rounded-2xl py-6 border border-white/10">
                    <div className="text-3xl md:text-5xl font-black text-[#d4af37] font-sora mb-1">{t.v}</div>
                    <div className="text-[9px] font-bold uppercase text-white/40 tracking-widest">{t.l}</div>
                 </div>
               ))}
            </div>
            <Lock className="absolute -bottom-10 -right-10 text-white opacity-[0.03]" size={300} />
         </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-20 text-center space-y-8 px-4">
         <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl font-black uppercase font-sora text-[#3E2723] tracking-tighter">Secure Your <br/> <span className="text-[#134e4a]">Clearance.</span></h2>
            <p className="text-[#64748b] font-bold uppercase text-xs tracking-widest italic">Entry Limit: 50 Units • R 849.99</p>
         </div>
         <button 
           onClick={() => window.open(TICKET_LINK, '_blank')}
           className="inline-flex items-center gap-4 bg-[#134e4a] text-white px-16 py-8 rounded-[2rem] font-black text-2xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(19,78,74,0.3)] uppercase tracking-tighter border-2 border-[#134e4a]"
         >
           {CTA_TEXT} <ArrowRight size={28} className="text-[#d4af37]" />
         </button>
      </section>

    </div>
  );
}
