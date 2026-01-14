import React from 'react';

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#f8f9fa]">
      {/* Background Decorative Text */}
      <div className="absolute top-20 left-10 opacity-[0.03] select-none pointer-events-none">
        <h1 className="text-[15rem] font-black leading-none">CAPITAL</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: The Image Card from your Screenshot */}
          <div className="relative">
            <div className="bg-[#C5A059]/20 absolute -inset-4 rounded-[50px] rotate-3"></div>
            <img 
              src="/marcia-hero.jpg" 
              alt="The Architect" 
              className="relative rounded-[40px] shadow-2xl w-full object-cover aspect-[4/5]"
            />
          </div>

          {/* Right: The Content */}
          <div className="space-y-8">
            <div>
              <span className="text-iws-gold font-bold uppercase tracking-[0.2em] text-xs">The Architect</span>
              <h2 className="text-5xl md:text-6xl font-black text-iws-teal mt-4 leading-tight">
                Marcia Kgaphola.
              </h2>
            </div>
            
            <p className="text-xl text-iws-teal/80 leading-relaxed italic font-medium">
              "Business is not just math; it is psychology. I built Integrated Wellth to serve the founder who has conquered the market but is still fighting the chaos within their own operations."
            </p>

            <button className="group flex items-center gap-3 text-iws-teal font-black uppercase tracking-widest text-xs border-b-2 border-iws-gold pb-2 hover:gap-5 transition-all">
              Read Full Bio <span className="text-iws-gold">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
