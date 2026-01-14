import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f8f9fa] overflow-hidden">
      {/* Background Decorative Element - Restoring the "Subtle Giant" Look */}
      <div className="absolute top-40 -left-20 opacity-[0.02] pointer-events-none select-none hidden lg:block">
        <h1 className="text-[25rem] font-black text-[#1a4d4d] leading-none tracking-tighter">
          SOVEREIGNTY
        </h1>
      </div>

      {/* Main Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: The High-Res Professional Profile */}
          <div className="relative group">
            {/* Premium Gold Frame Decoration */}
            <div className="absolute -inset-4 bg-[#C5A059]/10 rounded-[60px] rotate-3 transition-transform group-hover:rotate-1"></div>
            
            <div className="relative aspect-[4/5] rounded-[50px] overflow-hidden shadow-2xl border-8 border-white bg-[#1a4d4d]">
              <img 
                src="https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg" 
                alt="Marcia Kgaphola - The Architect" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a4d4d]/40 to-transparent"></div>
            </div>
          </div>

          {/* Right: The Identity & Authority */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-12 bg-[#C5A059]"></div>
                <span className="text-[#C5A059] font-black uppercase tracking-[0.4em] text-[10px]">
                  Founding Architect
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-[#1a4d4d] leading-[0.9] italic uppercase tracking-tighter">
                Marcia <br />Kgaphola.
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-[#1a4d4d]/80 leading-relaxed font-medium italic border-l-4 border-[#C5A059] pl-8">
              "Business is not just math; it is psychology. I built Integrated Wellth to serve the founder who has conquered the market but is still fighting the chaos within their own operations."
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <button className="bg-[#1a4d4d] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#C5A059] transition-all shadow-xl">
                Enter The War Room <ArrowRight size={16} />
              </button>
              <button className="border-2 border-[#1a4d4d]/10 text-[#1a4d4d] px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
                The Methodology
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Section: Quick Stats/Values */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="flex items-start gap-6">
            <div className="text-[#C5A059]"><ShieldCheck size={32} /></div>
            <div>
              <h4 className="font-black text-[#1a4d4d] uppercase text-sm mb-2">Structural Integrity</h4>
              <p className="text-xs text-[#1a4d4d]/60 leading-relaxed uppercase tracking-tight">Governance and oversight that protects your capital.</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="text-[#C5A059]"><TrendingUp size={32} /></div>
            <div>
              <h4 className="font-black text-[#1a4d4d] uppercase text-sm mb-2">Psychological Capital</h4>
              <p className="text-xs text-[#1a4d4d]/60 leading-relaxed uppercase tracking-tight">Understanding the behavioral risks behind business math.</p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <div className="text-[#C5A059]"><BarChart3 size={32} /></div>
            <div>
              <h4 className="font-black text-[#1a4d4d] uppercase text-sm mb-2">Sovereignty Logic</h4>
              <p className="text-xs text-[#1a4d4d]/60 leading-relaxed uppercase tracking-tight">Decoupling your success from market volatility.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
