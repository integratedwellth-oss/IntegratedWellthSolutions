import React from 'react';
import RevealOnScroll from '../RevealOnScroll';
import { ShieldCheck, CheckCircle2, Settings, BookOpen, PieChart, FileBarChart, Send, Zap, ArrowRight, Quote } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';

interface LandingPageProps {
  onOpenAssessment: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onOpenAssessment }) => {
  
  // Directs to the War Room / AI Logic
  const handleCta = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.hash = '#warroom';
  };

  const TREE_HERO_URL = "https://res.cloudinary.com/dka0498ns/image/upload/f_auto,q_auto/v1772373342/Profuse_Beauty_Logo_Tree_z1nc3c.png";
  const FOUNDER_URL = "https://res.cloudinary.com/dka0498ns/image/upload/f_auto,q_auto/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg";

  return (
    <div className="bg-slate-950 font-sans text-white selection:bg-brand-gold selection:text-brand-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION: High Conversion, Low Noise */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
        
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <img 
            src={TREE_HERO_URL} 
            alt="Growth Ecosystem" 
            className="w-full h-full object-cover opacity-35 mix-blend-screen scale-110 animate-pulse-slow"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950 z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)]"></div>
        </div>

        <RevealOnScroll>
          <div className="max-w-5xl mx-auto z-10 relative">
            
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 mb-10 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              <Zap size={14} className="text-brand-gold animate-pulse" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-brand-gold">IWS Growth Partnership</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-sora font-extrabold tracking-tighter mb-8 leading-[1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              Master compliance. <br/>
              <span className="text-brand-gold">Optimize wealth.</span>
            </h1>
            
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
                Integrated Wellth Solutions offers comprehensive personal and professional growth support, integrating financial, emotional, and empowerment services for diverse clients, from entrepreneurs to teens. Their team of experts provides tailored solutions, encompassing financial planning, accounting, financial management, organizational development, and digital marketing, ensuring holistic support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button 
                onClick={onOpenAssessment}
                className="group relative bg-brand-gold text-brand-900 font-black uppercase tracking-widest text-sm md:text-base px-12 py-6 rounded-full transition-all duration-300 w-full sm:w-auto hover:scale-105 hover:bg-white hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
              >
                Find My Cash Leaks & Fix Them
              </button>
              <button 
                onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')}
                className="group relative bg-white/5 border border-white/20 text-white font-black uppercase tracking-widest text-sm px-12 py-6 rounded-full transition-all duration-300 w-full sm:w-auto hover:bg-white/10 hover:border-brand-gold/50"
              >
                Talk To An Expert
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 text-xs text-brand-100/50 font-bold uppercase tracking-widest border-t border-white/5 pt-10">
              <span className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                SARS Authorized
              </span>
              <span className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                CIPC Compliant
              </span>
              <span className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                CIBA Registered
              </span>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 2. THE ANCHOR: Founder Mission */}
      <section className="py-24 bg-white relative overflow-hidden text-brand-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Image Side */}
            <div className="lg:w-1/2 relative">
              <RevealOnScroll>
                <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 rotate-2 hover:rotate-0 transition-all duration-700">
                  <img 
                    src={FOUNDER_URL} 
                    alt="Marcia Kgaphola Keynote" 
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-900/90 to-transparent p-8">
                    <p className="text-white font-black uppercase tracking-widest text-lg">Marcia Kgaphola</p>
                    <p className="text-brand-gold text-xs font-bold uppercase tracking-widest">Founder & Principal Architect</p>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/20 rounded-full blur-3xl -z-0"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-900/20 rounded-full blur-3xl -z-0"></div>
              </RevealOnScroll>
            </div>

            {/* Text Side */}
            <div className="lg:w-1/2">
              <RevealOnScroll delay={0.2}>
                <div className="inline-flex items-center gap-2 text-brand-900/40 font-black uppercase tracking-[0.4em] text-xs mb-6">
                  <Quote size={16} /> The Founder's Mission
                </div>
                <h2 className="text-4xl md:text-6xl font-sora font-black text-brand-900 mb-8 tracking-tighter leading-tight">
                  Stop building on <br/><span className="text-brand-gold italic">shaky ground.</span>
                </h2>
                <div className="space-y-6 text-lg text-brand-900/70 font-medium leading-relaxed">
                  <p>
                    "I built Integrated Wellth Solutions because I saw too many brilliant South African businesses fail—not from a lack of talent, but from a lack of <strong>structural integrity</strong>."
                  </p>
                  <p>
                    We don't just file your taxes. We act as the <strong>strategic anchor</strong> for your business, combining high-precision financial systems with the psychological resilience you need to lead.
                  </p>
                </div>
                
                <div className="mt-10 flex gap-4">
                  <div className="px-6 py-4 bg-brand-50 rounded-2xl border border-brand-900/5">
                    <p className="text-3xl font-black text-brand-900">100%</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-900/40">Compliance Rate</p>
                  </div>
                  <div className="px-6 py-4 bg-brand-50 rounded-2xl border border-brand-900/5">
                    <p className="text-3xl font-black text-brand-900">15+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-900/40">Years Experience</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* 3. THE OFFER: Pricing Cards (Updated to "Starting From") */}
      <section className="py-32 px-6 bg-slate-950 relative border-t border-brand-gold/20">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <RevealOnScroll>
            <div className="text-center mb-20">
              <span className="bg-brand-900/50 text-brand-gold border border-brand-gold/20 text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest">Professional Financial Solutions</span>
              <h2 className="text-5xl md:text-7xl font-sora font-black mt-8 mb-6 tracking-tighter uppercase text-white">
                Strategic <span className="text-brand-gold">Retainers</span>
              </h2>
              <p className="text-brand-100/60 font-medium tracking-wide text-sm max-w-2xl mx-auto">
                Secure enterprise-grade financial infrastructure for your SME. Transparent, baseline pricing designed to scale with your growth.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1 */}
            <RevealOnScroll delay={0.1}>
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-full hover:border-brand-gold transition-all duration-300 hover:bg-white/10 group relative overflow-hidden">
                <div>
                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight"><Settings className="text-brand-gold" size={32} /> System Configuration</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs text-brand-100/70 mb-10 font-bold uppercase tracking-wider">
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Chart of Accounts</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Invoices Setup</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Bank integration</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Open balances</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-dashed border-white/10 pt-8">
                  <div className="flex flex-col">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Starting From</p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black text-white mb-2 font-sora">R2 500</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Card 2 */}
            <RevealOnScroll delay={0.2}>
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-full hover:border-brand-gold transition-all duration-300 hover:bg-white/10 group">
                <div>
                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight"><PieChart className="text-brand-gold" size={32} /> Monthly Review</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs text-brand-100/70 mb-10 font-bold uppercase tracking-wider">
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Expense Review</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Journal Entries</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> GL Reconciliations</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Management Acc.</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-dashed border-white/10 pt-8">
                  <div className="flex flex-col">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Starting From</p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black text-white mb-2 font-sora">R999</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Card 3 */}
            <RevealOnScroll delay={0.3}>
              <div className="bg-white/5 border border-brand-gold/50 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-full hover:border-brand-gold transition-all duration-300 hover:bg-white/10 group relative overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                <div className="absolute top-0 right-0 p-3 bg-brand-gold text-brand-900 font-black text-[10px] uppercase tracking-widest rounded-bl-2xl">Most Popular</div>
                <div>
                  <h3 className="text-2xl font-black text-brand-gold mb-6 flex items-center gap-3 uppercase tracking-tight"><BookOpen className="text-brand-gold" size={32} /> Monthly Bookkeeping</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs text-brand-100/70 mb-10 font-bold uppercase tracking-wider">
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Full Bookkeeping</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Annual Returns</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Management Acc.</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Annual Statements</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-dashed border-white/10 pt-8">
                  <div className="flex flex-col">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Starting From</p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black text-brand-gold mb-2 font-sora">R1 999</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Card 4 */}
            <RevealOnScroll delay={0.4}>
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-full hover:border-brand-gold transition-all duration-300 hover:bg-white/10 group">
                <div>
                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight"><FileBarChart className="text-brand-gold" size={32} /> Annual Financials</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-xs text-brand-100/70 mb-10 font-bold uppercase tracking-wider">
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Turnover &lt; R500K</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Turnover &gt; R500K</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> SARS Returns</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> CIPC Returns</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-dashed border-white/10 pt-8">
                  <div className="flex flex-col">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Starting From</p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black text-white mb-2 font-sora">R5 500</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

          </div>
          
          <div className="mt-16 text-center">
            <p className="text-sm text-brand-100/50 mb-6">Looking for a custom enterprise solution or NPO setup?</p>
            <button 
                onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')}
                className="bg-transparent border-2 border-brand-gold text-brand-gold font-black uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-brand-gold hover:text-brand-900 transition-all"
              >
                Request Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* 4. DIAGNOSTIC / AI CHAT CTA */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <RevealOnScroll>
          <div className="bg-white rounded-[3rem] p-10 md:p-16 text-center border-t-8 border-brand-gold shadow-2xl relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-sora font-black mb-6 tracking-tighter uppercase text-brand-900">Skip the forms. <br className="md:hidden"/>Talk to us.</h2>
            <p className="text-brand-900/60 mb-10 font-medium text-lg leading-relaxed max-w-2xl mx-auto">Tell us what you're trying to build, solve, or comply with. Our Advisor will match you with the right specialist.</p>
            
            <form onSubmit={handleCta} className="bg-brand-50 rounded-2xl p-2 flex items-center border-2 border-brand-900/10 focus-within:border-brand-gold transition-colors max-w-2xl mx-auto">
              <input 
                type="text" 
                placeholder="E.g., I'd like to structure a retainer for..." 
                className="bg-transparent w-full text-brand-900 px-6 py-4 outline-none placeholder-brand-900/30 font-bold"
                required
              />
              <button 
                type="submit"
                className="bg-brand-900 text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-brand-gold hover:text-brand-900 transition-all flex items-center gap-2"
              >
                Execute <ArrowRight size={14} />
              </button>
            </form>
            <p className="text-[10px] font-bold text-brand-900/30 uppercase tracking-widest mt-6">Secure, autonomous matching. No spam, ever.</p>
          </div>
        </RevealOnScroll>
      </section>

    </div>
  );
};

export default LandingPage;
