import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f8f9fa] pt-32 pb-20">
      {/* Background Subtle Text */}
      <div className="absolute top-40 left-10 opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[18rem] font-black text-iws-teal leading-none">CAPITAL</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Container with Premium Shadow */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-iws-gold/10 rounded-[50px] rotate-2 transition-transform group-hover:rotate-1"></div>
            <div className="relative overflow-hidden rounded-[40px] shadow-2xl aspect-[4/5] bg-iws-teal">
              {/* Ensure image exists in /public/marcia-hero.jpg */}
              <img 
                src="/marcia-hero.jpg" 
                alt="Marcia Kgaphola" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-iws-gold font-black uppercase tracking-[0.3em] text-xs">The Architect</span>
              <h2 className="text-5xl md:text-7xl font-black text-iws-teal leading-[1.1]">
                Marcia <br />Kgaphola.
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-iws-teal/80 leading-relaxed font-medium italic border-l-4 border-iws-gold pl-6">
              "Business is not just math; it is psychology. I built Integrated Wellth to serve the founder who has conquered the market but is still fighting the chaos within their own operations."
            </p>

            <button className="flex items-center gap-4 text-iws-teal font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform border-b-2 border-iws-gold pb-2">
              Read Full Bio <ArrowRight className="text-iws-gold" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
