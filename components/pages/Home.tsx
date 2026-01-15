import React from 'react';
import Hero from '../Hero';
import TrustedBy from '../TrustedBy';
import Services from '../Services';
import RevealOnScroll from '../RevealOnScroll';
import Button from '../Button';
import NewsTicker from '../NewsTicker';
import { ArrowUpRight, Sparkles, Target, ChevronRight, HeartHandshake } from 'lucide-react';
import Testimonials from '../Testimonials';
import Gallery from '../Gallery';
import { CONTACT_INFO } from '../../constants';

interface HomeProps {
  onOpenAssessment: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenAssessment }) => {
  return (
    <div className="space-y-0 bg-white">
      <Hero />
      <TrustedBy />
      <NewsTicker />

      {/* Primary Solutions Ecosystem */}
      <div id="services-anchor">
        <Services />
      </div>

      {/* Dramatic Transition: The Lonely Journey Entrance */}
      <section className="py-40 bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-12 text-brand-gold">
                <HeartHandshake size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Sovereign Accountability</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <h2 className="text-6xl md:text-[9rem] font-sora font-extrabold text-white tracking-tighter leading-[0.8] mb-12">
                THE "LONELY <br/> JOURNEY" <span className="text-brand-gold italic">ENDS HERE.</span>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.4}>
              <p className="text-xl md:text-3xl text-brand-100/60 max-w-4xl mx-auto font-light leading-relaxed mb-16">
                Entrepreneurship is often sold as a solo sprint. We know it's a marathon of high-stakes pressure. 
                Our Accountability Partnership provides the psychological and strategic safety net you've been missing.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={() => window.location.hash = '#accountability'} 
                  size="lg" 
                  className="rounded-full px-16 py-8 text-xl bg-brand-gold text-brand-900 font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl"
                >
                  Enter Sovereignty
                </Button>
                <button 
                  onClick={() => window.location.hash = '#contact'}
                  className="text-white/40 hover:text-white font-black uppercase tracking-widest text-sm transition-colors pt-4 sm:pt-0"
                >
                  Request Partnership Brochure
                </button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Firm Logic & Audit Section */}
      <section className="py-40 relative bg-brand-50/30 overflow-hidden border-y border-brand-900/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            
            <div className="lg:w-1/2 space-y-10">
              <RevealOnScroll>
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-brand-900 text-white shadow-2xl">
                   <Target size={18} className="text-brand-gold animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em]">Strategic Reset Module</span>
                </div>
              </RevealOnScroll>
              
              <h2 className="text-7xl md:text-8xl font-sora font-extrabold text-brand-900 tracking-tighter leading-[0.85]">
                AUDIT YOUR <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-900 to-brand-gold italic">TRAJECTORY.</span>
              </h2>

              <p className="text-2xl text-brand-900/70 font-medium leading-relaxed max-w-xl">
                Most businesses fail due to skill-gaps. We protect your enterprise by aligning high-end IQ compliance with neural resilience.
              </p>

              <div className="pt-8">
                <Button onClick={onOpenAssessment} size="lg" className="rounded-[2.5rem] px-14 py-8 bg-brand-900 shadow-[0_40px_80px_rgba(19,78,74,0.3)] group border border-white/20 text-xl font-black uppercase tracking-widest">
                  Initialize Structural Audit <ArrowUpRight className="ml-4 group-hover:rotate-45 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="lg:w-1/2">
                <RevealOnScroll delay={0.3}>
                    <div className="bg-brand-900 rounded-[4rem] p-16 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 p-12 text-[12rem] font-serif text-white/5 leading-none">“</div>
                        <p className="text-3xl md:text-4xl text-white font-sora italic leading-tight relative z-10">
                            "Reduced audit risk to <span className="text-brand-gold">Zero</span> while scaling 40%. The management accounts provided actionable insights we never had."
                        </p>
                        <div className="mt-12 flex flex-col items-center gap-2 relative z-10">
                            <p className="text-brand-gold font-black uppercase tracking-widest text-sm">Thabiso Nothana</p>
                            <p className="text-white/40 font-bold text-[10px] uppercase">Nothana Holdings • Executive Director</p>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Intelligence Stats */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { label: "Audit Resolution", value: "100%", sub: "Technical Clarity" },
                    { label: "Compliance Delta", value: "40%", sub: "Structural Growth" },
                    { label: "Risk Mitigation", value: "Zero", sub: "Exposure Gap" },
                    { label: "Active Partners", value: "150+", sub: "Firm Network" }
                ].map((stat, i) => (
                    <div key={i} className="bg-gray-50 border border-brand-900/5 p-10 rounded-[2.5rem] text-center group hover:bg-brand-900 transition-all duration-500">
                        <p className="text-brand-900 group-hover:text-brand-gold font-black text-5xl tracking-tighter mb-2 transition-colors">{stat.value}</p>
                        <p className="text-brand-900 group-hover:text-white font-bold text-sm uppercase tracking-tight transition-colors">{stat.label}</p>
                        <p className="text-brand-900/30 group-hover:text-white/30 text-[10px] uppercase font-black tracking-widest mt-2 transition-colors">{stat.sub}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <Testimonials />
      <Gallery />

      {/* Final Institutional Call */}
      <section className="py-60 bg-white relative flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#134e4a 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
        
        <RevealOnScroll>
          <div className="space-y-12">
            <div className="flex justify-center mb-10">
                <div className="w-24 h-24 bg-brand-900 rounded-[2rem] flex items-center justify-center shadow-2xl animate-float">
                   <Sparkles className="text-brand-gold" size={40} />
                </div>
            </div>
            <h2 className="text-8xl md:text-[14rem] font-sora font-black text-brand-900 tracking-tighter leading-[0.75]">
              LEGACY <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-900 via-brand-700 to-brand-gold italic">SECURED.</span>
            </h2>
            <p className="text-2xl md:text-4xl text-brand-900/30 font-light max-w-4xl mx-auto leading-relaxed">
              Tomorrow belongs to the <span className="text-brand-900 font-bold">Integrated</span>. <br/>Join the elite network of resilient founders.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-12">
              <Button 
                onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')}
                size="lg" 
                className="rounded-[2.5rem] px-20 py-10 text-3xl font-black bg-brand-900 shadow-[0_40px_100px_rgba(19,78,74,0.4)] hover:bg-brand-gold hover:text-brand-900 transition-all border border-white/10 hover:scale-105"
              >
                CONSULT LEADERSHIP
              </Button>
              <button onClick={() => window.location.hash = '#contact'} className="text-brand-900 font-black text-xl border-b-4 border-brand-900/10 hover:border-brand-gold transition-all pb-2 tracking-tighter uppercase">
                Request Firm Credentials
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
};

export default Home;