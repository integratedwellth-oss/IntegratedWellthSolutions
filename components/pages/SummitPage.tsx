import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Calendar, Users, Radio } from 'lucide-react';

export default function SummitPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
    <div className="min-h-screen bg-[#f0fdfa] font-sans text-brand-900 pt-20">
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#134e4a] opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Radio size={14} className="text-[#d4af37] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#134e4a]">Confidential Briefing</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-[#134e4a]">
            Financial <span className="text-[#d4af37]">Clarity</span><br />
            Summit 2026
          </h1>
          <p className="text-lg md:text-xl text-[#64748b] max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop fearing the numbers. Join us at Munyaka Estate for a tactical briefing on business architecture and digital sovereignty.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
             <a href="https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/" target="_blank" rel="noreferrer" className="px-8 py-4 bg-[#134e4a] text-white rounded-full font-black uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#134e4a] transition-all shadow-xl flex items-center gap-2">
                Secure Seat <ArrowRight size={18} />
             </a>
          </div>
        </div>
      </section>

      {/* DETAILS GRID */}
      <section className="py-24 bg-white">
         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#f0fdfa] border border-[#134e4a]/10">
               <Calendar size={32} className="text-[#134e4a] mb-4" />
               <h3 className="text-xl font-black uppercase mb-2">28 February 2026</h3>
               <p className="text-sm opacity-60">09:00 - 16:00 SAST</p>
            </div>
            <div className="p-8 rounded-3xl bg-[#f0fdfa] border border-[#134e4a]/10">
               <MapPin size={32} className="text-[#134e4a] mb-4" />
               <h3 className="text-xl font-black uppercase mb-2">Munyaka Estate</h3>
               <p className="text-sm opacity-60">Waterfall City, Midrand</p>
            </div>
            <div className="p-8 rounded-3xl bg-[#f0fdfa] border border-[#134e4a]/10">
               <Users size={32} className="text-[#134e4a] mb-4" />
               <h3 className="text-xl font-black uppercase mb-2">Limited Capacity</h3>
               <p className="text-sm opacity-60">50 Seats Only (20 Remaining)</p>
            </div>
         </div>
      </section>
    </div>
  );
}
