import React from 'react';
import RevealOnScroll from '../RevealOnScroll';
import { ShieldCheck, Settings, PieChart, Zap, ArrowRight, Quote } from 'lucide-react';
import Button from '../Button';

interface HomeProps {
  onOpenAssessment: () => void;
}

const LandingPage: React.FC<HomeProps> = ({ onOpenAssessment }) => {
  const handleCta = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.hash = '#warroom';
  };

  const TREE_HERO_URL = "https://res.cloudinary.com/dka0498ns/image/upload/f_auto,q_auto/v1772373342/Profuse_Beauty_Logo_Tree_z1nc3c.png";
  const FOUNDER_URL = "https://res.cloudinary.com/dka0498ns/image/upload/f_auto,q_auto/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg";

  return (
    <div className="bg-slate-950 font-sans text-white selection:bg-brand-gold overflow-x-hidden">
      
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
        <div className="absolute inset-0 z-0">
          <img src={TREE_HERO_URL} alt="IWS" className="w-full h-full object-cover opacity-30 mix-blend-screen scale-110 animate-pulse-slow" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950"></div>
        </div>

        <RevealOnScroll>
          <div className="max-w-5xl mx-auto z-10 relative">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 mb-10 backdrop-blur-xl">
              <Zap size={14} className="text-brand-gold animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Strategic Growth Partnership</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-sora font-extrabold tracking-tighter mb-8 leading-none">
              Master compliance. <br/><span className="text-brand-gold">Optimize wealth.</span>
            </h1>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Integrated Wellth Solutions provides tailored personal and professional growth support, combining high-precision financial management with emotional resilience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button onClick={onOpenAssessment} className="rounded-full px-12 py-8 text-lg">Find My Cash Leaks</Button>
              <Button variant="outline" onClick={() => window.location.hash = '#contact'} className="rounded-full px-12 py-8 text-lg border-white/20 text-white hover:bg-white/5">Talk To An Expert</Button>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* FOUNDER MISSION */}
      <section className="py-32 bg-white text-brand-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <RevealOnScroll>
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 rotate-2"><img src={FOUNDER_URL} alt="Marcia" className="w-full grayscale hover:grayscale-0 transition-all duration-700" /></div>
            </RevealOnScroll>
          </div>
          <div className="lg:w-1/2">
            <RevealOnScroll delay={0.2}>
              <h2 className="text-4xl md:text-6xl font-sora font-black mb-8 tracking-tighter">The Vision is <br/><span className="text-brand-gold italic">Structural Integrity.</span></h2>
              <p className="text-lg opacity-70 mb-6 italic leading-relaxed">"We act as the strategic anchor for your business, combining high-precision systems with the resilience you need to lead."</p>
              <div className="flex gap-4">
                <div className="px-6 py-4 bg-brand-50 rounded-2xl border border-brand-900/5"><p className="text-3xl font-black">100%</p><p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Compliance Rate</p></div>
                <div className="px-6 py-4 bg-brand-50 rounded-2xl border border-brand-900/5"><p className="text-3xl font-black">15+</p><p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Years Experience</p></div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* PRICING - "FROM" IMPLEMENTED */}
      <section className="py-32 px-6 bg-slate-950 relative border-t border-brand-gold/20">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-sora font-black tracking-tighter uppercase mb-6">Strategic Solutions</h2>
            <p className="text-brand-100/60 font-medium uppercase tracking-[0.2em]">Fixed Rate Professional Infrastructure</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "System Configuration", price: "R2 500", icon: <Settings className="text-brand-gold" /> },
              { title: "Monthly Review", price: "R999", icon: <PieChart className="text-brand-gold" /> }
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:border-brand-gold transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">{card.icon}</div>
                  <h3 className="text-2xl font-black uppercase">{card.title}</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-brand-gold font-bold text-lg uppercase tracking-widest">from</span>
                  <p className="text-6xl font-black font-sora">{card.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
