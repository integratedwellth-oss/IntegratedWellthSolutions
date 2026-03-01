import React from 'react';
import RevealOnScroll from '../RevealOnScroll';
import { ShieldCheck, CheckCircle2, Settings, BookOpen, PieChart, FileBarChart, Send, Sparkles, Zap, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  
  // Directs to the War Room / AI Logic
  const handleCta = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.hash = '#warroom';
  };

  return (
    <div className="bg-slate-950 font-sans text-white selection:bg-brand-gold selection:text-brand-900 overflow-hidden">
      
      {/* 1. HERO SECTION: High Conversion, Low Noise */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6">
        {/* Background Atmosphere */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-900/40 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-900/10 via-slate-950 to-slate-950 z-0"></div>

        <RevealOnScroll>
          <div className="max-w-5xl mx-auto z-10 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 mb-8 backdrop-blur-md">
              <Zap size={12} className="text-brand-gold animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">IWS Growth Partnership</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-sora font-extrabold tracking-tighter mb-8 leading-[1.1]">
              Master compliance. <br/>
              Optimize wealth. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-100 to-brand-gold">Unlock lasting success.</span>
            </h1>
            
            <p className="text-xl text-brand-100/60 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              The holistic financial infrastructure and psychological wellness partnership designed to scale South African enterprises, empower NGOs, and guide ambitious individuals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button 
                onClick={() => window.location.hash = '#assessment'}
                className="group relative bg-brand-gold text-brand-900 font-black uppercase tracking-widest text-sm px-10 py-5 rounded-full transition-all duration-300 w-full sm:w-auto hover:scale-105 hover:bg-white hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
              >
                Get My Financial Blueprint
              </button>
              <button 
                onClick={() => window.location.hash = '#contact'}
                className="group relative bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm px-10 py-5 rounded-full transition-all duration-300 w-full sm:w-auto hover:bg-white/10"
              >
                Talk To An Expert
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-xs text-brand-100/40 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                SARS Authorized
              </span>
              <span className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                CIPC Compliant
              </span>
              <span className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                CIBA Registered
              </span>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 2. THE FRAMEWORK GRID (TL;DR) */}
      <section className="py-20 bg-brand-900/20 border-y border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-black mb-10 text-center">The IWS Ecosystem</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
              {[
                { title: "Financial Expertise", desc: "Bookkeeping, tax management, and investment readiness." },
                { title: "Psychological Wellness", desc: "Stress reduction, emotional intelligence, and resilience coaching." },
                { title: "Personal Development", desc: "Capacity building, career coaching, and accountability." },
                { title: "Org Consulting", desc: "Digital marketing, diversity management, and team-building." },
                { title: "Compliance", desc: "Statutory adherence, e-learning, and leadership training." }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <strong className="text-white block font-black uppercase tracking-wide text-xs">{item.title}</strong>
                  <span className="text-brand-100/50 leading-relaxed text-xs">{item.desc}</span>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 3. BENTO GRID: TAILORED STRATEGIES */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-sora font-black text-center mb-20 tracking-tighter">
            Tailored strategies for your <span className="text-brand-gold">ecosystem.</span>
          </h2>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          
          {/* Startups (Large Card) */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 md:col-span-2 flex flex-col justify-between hover:border-brand-gold/30 transition-colors group">
            <RevealOnScroll delay={0.1}>
              <div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-brand-gold transition-colors">New Businesses & Startups</h3>
                <p className="text-brand-100/60 mb-8 font-medium leading-relaxed max-w-xl">From zero to fully compliant and market-ready. We lay the foundation so you can focus on building.</p>
                <ul className="grid sm:grid-cols-2 gap-4 text-xs text-white/80 font-bold uppercase tracking-wide">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> CIPC, Domain & Tax Setup</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Startup Bookkeeping</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Business Plan Prep</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Founder Resilience</li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          {/* NGOs */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between hover:border-brand-gold/30 transition-colors group">
            <RevealOnScroll delay={0.2}>
              <div>
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-brand-gold transition-colors">NGOs & NPOs</h3>
                <p className="text-brand-100/60 mb-6 font-medium text-sm leading-relaxed">Dedicated grant management and operational support.</p>
                <ul className="space-y-3 text-xs text-white/80 font-bold uppercase tracking-wide">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> NPO/PBO Registration</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Grant Management</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Due Diligence</li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          {/* Existing Businesses */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between hover:border-brand-gold/30 transition-colors group">
            <RevealOnScroll delay={0.3}>
              <div>
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-brand-gold transition-colors">Existing Businesses</h3>
                <p className="text-brand-100/60 mb-6 font-medium text-sm leading-relaxed">Scale efficiently and maintain SARS compliance.</p>
                <ul className="space-y-3 text-xs text-white/80 font-bold uppercase tracking-wide">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Audit Readiness</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Strategic Growth</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Burnout Prevention</li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          {/* Individuals */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between hover:border-brand-gold/30 transition-colors group">
            <RevealOnScroll delay={0.4}>
              <div>
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-brand-gold transition-colors">Individuals</h3>
                <p className="text-brand-100/60 mb-6 font-medium text-sm leading-relaxed">Take control of your personal finances and career.</p>
                <ul className="space-y-3 text-xs text-white/80 font-bold uppercase tracking-wide">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Debt Planning</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Career Coaching</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Emotional Intel</li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          {/* Teens */}
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between hover:border-brand-gold/30 transition-colors group">
            <RevealOnScroll delay={0.5}>
              <div>
                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-brand-gold transition-colors">Teens</h3>
                <p className="text-brand-100/60 mb-6 font-medium text-sm leading-relaxed">Equipping the next generation for success.</p>
                <ul className="space-y-3 text-xs text-white/80 font-bold uppercase tracking-wide">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Uni Guidance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Personal Branding</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-gold" /> Basic Budgeting</li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* 4. PROMO SECTION: THE OFFER */}
      <section className="py-24 px-6 bg-brand-900 border-y border-brand-gold/10 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="bg-rose-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl animate-pulse">Limited Time Offer</span>
            <h2 className="text-4xl md:text-7xl font-sora font-black mt-8 mb-6 tracking-tighter uppercase text-white">25% OFF <span className="text-brand-gold">SERVICES</span></h2>
            <p className="text-brand-100/60 font-medium tracking-wide text-sm">Professional Financial Solutions for SMEs. Valid for new retainers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Promo Card 1 */}
            <div className="bg-slate-950/80 border border-brand-gold/20 rounded-[2rem] p-8 flex flex-col justify-between hover:border-brand-gold transition-all duration-300 hover:shadow-2xl hover:shadow-brand-gold/10 group">
              <div>
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                  <Settings className="text-brand-gold" size={24} /> System Configuration
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs text-brand-100/60 mb-8 font-bold uppercase tracking-wider">
                  <p>• Chart of Accounts</p>
                  <p>• Invoices Setup</p>
                  <p>• Bank integration</p>
                  <p>• Open balances</p>
                </div>
              </div>
              <div className="flex justify-between items-end border-t border-white/10 pt-6">
                <div>
                  <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold mb-1">Standard Rate</p>
                  <p className="text-lg text-white/30 line-through font-bold">R2500.00</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-white mb-2 font-sora group-hover:text-brand-gold transition-colors">R1875</p>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">Save R625</span>
                </div>
              </div>
            </div>

            {/* Promo Card 2 */}
            <div className="bg-slate-950/80 border border-brand-gold/20 rounded-[2rem] p-8 flex flex-col justify-between hover:border-brand-gold transition-all duration-300 hover:shadow-2xl hover:shadow-brand-gold/10 group">
              <div>
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                  <PieChart className="text-brand-gold" size={24} /> Monthly Review
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs text-brand-100/60 mb-8 font-bold uppercase tracking-wider">
                  <p>• Expense Review</p>
                  <p>• Journal Entries</p>
                  <p>• GL Reconciliations</p>
                  <p>• Management Acc.</p>
                </div>
              </div>
              <div className="flex justify-between items-end border-t border-white/10 pt-6">
                <div>
                  <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold mb-1">Standard Rate</p>
                  <p className="text-lg text-white/30 line-through font-bold">R999.00</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-white mb-2 font-sora group-hover:text-brand-gold transition-colors">R749</p>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">Save R250</span>
                </div>
              </div>
            </div>

            {/* Promo Card 3 */}
            <div className="bg-slate-950/80 border border-brand-gold/20 rounded-[2rem] p-8 flex flex-col justify-between hover:border-brand-gold transition-all duration-300 hover:shadow-2xl hover:shadow-brand-gold/10 group">
              <div>
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                  <BookOpen className="text-brand-gold" size={24} /> Monthly Bookkeeping
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs text-brand-100/60 mb-8 font-bold uppercase tracking-wider">
                  <p>• Full Bookkeeping</p>
                  <p>• Annual Returns</p>
                  <p>• Management Acc.</p>
                  <p>• Annual Statements</p>
                </div>
              </div>
              <div className="flex justify-between items-end border-t border-white/10 pt-6">
                <div>
                  <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold mb-1">Standard Rate</p>
                  <p className="text-lg text-white/30 line-through font-bold">R1999.00</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-white mb-2 font-sora group-hover:text-brand-gold transition-colors">R1499</p>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">Save R500</span>
                </div>
              </div>
            </div>

            {/* Promo Card 4 */}
            <div className="bg-slate-950/80 border border-brand-gold/20 rounded-[2rem] p-8 flex flex-col justify-between hover:border-brand-gold transition-all duration-300 hover:shadow-2xl hover:shadow-brand-gold/10 group">
              <div>
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                  <FileBarChart className="text-brand-gold" size={24} /> Annual Financials
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs text-brand-100/60 mb-8 font-bold uppercase tracking-wider">
                  <p>• Turnover &lt; R500K</p>
                  <p>• Turnover &gt; R500K</p>
                  <p>• SARS Returns</p>
                  <p>• CIPC Returns</p>
                </div>
              </div>
              <div className="flex justify-between items-end border-t border-white/10 pt-6">
                <div>
                  <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold mb-1">Standard Rate</p>
                  <p className="text-lg text-white/30 line-through font-bold">R5500.00</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-white mb-2 font-sora group-hover:text-brand-gold transition-colors">R4125</p>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">Save R1375</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. DIAGNOSTIC / AI CHAT CTA */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <RevealOnScroll>
          <div className="bg-white rounded-[3rem] p-10 md:p-16 text-center border-t-8 border-brand-gold shadow-2xl relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-sora font-black mb-6 tracking-tighter uppercase text-brand-900">Skip the forms. <br className="md:hidden"/>Talk to us.</h2>
            <p className="text-brand-900/60 mb-10 font-medium text-lg leading-relaxed max-w-2xl mx-auto">Tell us what you're trying to build, solve, or comply with. Our AI Advisor will match you with the right specialist.</p>
            
            <form onSubmit={handleCta} className="bg-brand-50 rounded-2xl p-2 flex items-center border-2 border-brand-900/10 focus-within:border-brand-gold transition-colors max-w-2xl mx-auto">
              <input 
                type="text" 
                placeholder="E.g., I'd like to claim the 25% off setup offer..." 
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
