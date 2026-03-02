import React from 'react';
import RevealOnScroll from '../RevealOnScroll';
import { ShieldCheck, CheckCircle2, Settings, BookOpen, PieChart, FileBarChart, Send, Sparkles } from 'lucide-react';

interface HomeProps {
  onOpenAssessment: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenAssessment }) => {
  
  // Triggers the Unified AI Chat Widget or War Room
  const triggerAI = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.hash = '#warroom';
  };

  return (
    <div className="bg-brand-900 font-sans text-white selection:bg-brand-gold selection:text-brand-900 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
        {/* Brand Glow Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-gold/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        
        <RevealOnScroll>
          <div className="max-w-5xl mx-auto z-10">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-sora font-extrabold tracking-tighter mb-6 leading-[1.1] uppercase">
              Master compliance, optimize wealth, and <span className="text-brand-gold italic">unlock lasting success.</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-100/80 mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
              The holistic financial infrastructure and psychological wellness partnership designed to scale South African enterprises, empower NGOs, and guide ambitious individuals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={onOpenAssessment}
                className="group relative bg-brand-gold text-brand-900 font-black uppercase tracking-widest text-sm md:text-base px-10 py-5 rounded-full transition-all duration-300 w-full sm:w-auto hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]"
              >
                Find My Cash Leaks & Fix Them
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs md:text-sm text-brand-100/60 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                SARS Authorized
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                CIPC Compliant
              </span>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* THE IWS FRAMEWORK TL;DR */}
      <section className="py-16 bg-black/20 border-y border-white/10 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-black mb-10 text-center">The IWS Framework: TL;DR</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
              <div><strong className="text-brand-gold block mb-2 uppercase tracking-wide text-xs">Financial Expertise</strong> <span className="text-white/70 leading-relaxed">Bookkeeping, tax management, and investment readiness.</span></div>
              <div><strong className="text-brand-gold block mb-2 uppercase tracking-wide text-xs">Psychological Wellness</strong> <span className="text-white/70 leading-relaxed">Stress reduction, emotional intelligence, and resilience coaching.</span></div>
              <div><strong className="text-brand-gold block mb-2 uppercase tracking-wide text-xs">Personal & Pro Dev</strong> <span className="text-white/70 leading-relaxed">Capacity building, career coaching, and accountability.</span></div>
              <div><strong className="text-brand-gold block mb-2 uppercase tracking-wide text-xs">Org Consulting</strong> <span className="text-white/70 leading-relaxed">Digital marketing, diversity management, and team-building.</span></div>
              <div><strong className="text-brand-gold block mb-2 uppercase tracking-wide text-xs">Compliance & Training</strong> <span className="text-white/70 leading-relaxed">Statutory adherence, e-learning, and leadership training.</span></div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* BENTO GRID: TAILORED STRATEGIES */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-6xl font-sora font-black text-center mb-20 tracking-tighter uppercase leading-none">
            Tailored strategies for your <br/><span className="text-brand-gold italic">specific ecosystem.</span>
          </h2>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          
          {/* Startups (Large Card) */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 md:col-span-2 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:bg-white/10">
            <RevealOnScroll delay={0.1}>
              <div>
                <h3 className="text-3xl font-sora font-black text-brand-gold mb-4 uppercase tracking-tight">New Businesses & Startups</h3>
                <p className="text-white/70 mb-8 font-medium text-lg leading-relaxed max-w-xl">From zero to fully compliant and market-ready. We lay the foundation so you can focus on building the empire.</p>
                <ul className="space-y-4 text-sm text-white/80 font-medium">
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-gold" /> CIPC, Domain, BBBEE & Tax Registrations</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-gold" /> Startup Bookkeeping & Gap Analysis</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-gold" /> Business Plan & Tender Document Prep</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-gold" /> Entrepreneur Stress Management & Resilience</li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          {/* NGOs */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:bg-white/10">
            <RevealOnScroll delay={0.2}>
              <div>
                <h3 className="text-2xl font-sora font-black text-brand-gold mb-4 uppercase tracking-tight">NGOs & NPOs</h3>
                <p className="text-white/70 mb-6 font-medium text-sm leading-relaxed">Dedicated grant management and operational support for organizations making a real-world impact.</p>
                <ul className="space-y-3 text-sm text-white/80 font-medium">
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> NPO/PBO Registration</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> Donor & Grant Management</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> Capacity & Due Diligence</li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          {/* Existing Businesses */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:bg-white/10">
            <RevealOnScroll delay={0.3}>
              <div>
                <h3 className="text-2xl font-sora font-black text-brand-gold mb-4 uppercase tracking-tight">Existing Businesses</h3>
                <p className="text-white/70 mb-6 font-medium text-sm leading-relaxed">Scale efficiently, maintain SARS compliance, and optimize your team's operational output.</p>
                <ul className="space-y-3 text-sm text-white/80 font-medium">
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> Audit Readiness & VAT Recon</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> Strategic Growth & Valuations</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> Burnout Prevention Training</li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          {/* Individuals */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:bg-white/10">
            <RevealOnScroll delay={0.4}>
              <div>
                <h3 className="text-2xl font-sora font-black text-brand-gold mb-4 uppercase tracking-tight">Individuals</h3>
                <p className="text-white/70 mb-6 font-medium text-sm leading-relaxed">Take control of your personal finances, mental health, and career trajectory.</p>
                <ul className="space-y-3 text-sm text-white/80 font-medium">
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> Debt & Retirement Planning</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> Career & LinkedIn Coaching</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> Emotional Intelligence</li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>

          {/* Teens */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:bg-white/10">
            <RevealOnScroll delay={0.5}>
              <div>
                <h3 className="text-2xl font-sora font-black text-brand-gold mb-4 uppercase tracking-tight">Teens</h3>
                <p className="text-white/70 mb-6 font-medium text-sm leading-relaxed">Equipping the next generation with tools for career success and digital safety.</p>
                <ul className="space-y-3 text-sm text-white/80 font-medium">
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> University Application Guidance</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> Personal Branding Literacy</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" /> Basic Budgeting & Savings</li>
                </ul>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* PROMO SECTION */}
      <section className="py-24 px-6 bg-slate-950 border-y border-brand-gold/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="bg-rose-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg animate-pulse">Today Only</span>
              <h2 className="text-4xl md:text-6xl font-sora font-black mt-6 mb-4 tracking-tighter uppercase text-white">25% OFF ALL SERVICES</h2>
              <p className="text-brand-100/60 font-medium">Professional Financial Solutions for SMEs. <a href="https://Integratedwellth.co.za" className="text-brand-gold underline hover:text-white transition-colors">Integratedwellth.co.za</a> | 081 235 5910</p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Promo 1 */}
            <RevealOnScroll delay={0.1}>
              <div className="bg-white/5 border border-emerald-500/20 rounded-3xl p-8 flex flex-col justify-between h-full hover:bg-white/10 transition-colors">
                <div>
                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                    <Settings className="text-emerald-400" size={28} /> System Configuration
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-white/60 mb-8 font-medium">
                    <p>• Chart of Accounts</p>
                    <p>• Invoices & Bills setup</p>
                    <p>• Bank integration</p>
                    <p>• Open balances setup</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-white/10 pt-6">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Regular Price</p>
                    <p className="text-xl text-white/40 line-through font-bold">R2500.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-white mb-2 font-sora">R1875.00</p>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">SAVE R625</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Promo 2 */}
            <RevealOnScroll delay={0.2}>
              <div className="bg-white/5 border border-emerald-500/20 rounded-3xl p-8 flex flex-col justify-between h-full hover:bg-white/10 transition-colors">
                <div>
                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                    <PieChart className="text-emerald-400" size={28} /> Monthly Review & Journals
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-white/60 mb-8 font-medium">
                    <p>• Review monthly expenses</p>
                    <p>• Process journal entries</p>
                    <p>• GL reconciliations</p>
                    <p>• Management accounts</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-white/10 pt-6">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Regular Price</p>
                    <p className="text-xl text-white/40 line-through font-bold">R999.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-white mb-2 font-sora">R749.25</p>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">SAVE R249.75</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Promo 3 */}
            <RevealOnScroll delay={0.3}>
              <div className="bg-white/5 border border-emerald-500/20 rounded-3xl p-8 flex flex-col justify-between h-full hover:bg-white/10 transition-colors">
                <div>
                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                    <BookOpen className="text-emerald-400" size={28} /> Monthly Bookkeeping
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-white/60 mb-8 font-medium">
                    <p>• Bookkeeping services</p>
                    <p>• Annual Returns</p>
                    <p>• Management Accounts</p>
                    <p>• Annual Financial Stats</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-white/10 pt-6">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Regular Price</p>
                    <p className="text-xl text-white/40 line-through font-bold">R1999.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-white mb-2 font-sora">R1499.25</p>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">SAVE R499.75</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Promo 4 */}
            <RevealOnScroll delay={0.4}>
              <div className="bg-white/5 border border-emerald-500/20 rounded-3xl p-8 flex flex-col justify-between h-full hover:bg-white/10 transition-colors">
                <div>
                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tight">
                    <FileBarChart className="text-emerald-400" size={28} /> Annual Financial Returns
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-white/60 mb-8 font-medium">
                    <p>• Turnover: R499K & below</p>
                    <p>• Turnover: R500K & above</p>
                    <p>• Annual SARS Return</p>
                    <p>• Annual CIPC Return</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-white/10 pt-6">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Regular Price</p>
                    <p className="text-xl text-white/40 line-through font-bold">R5500.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black text-white mb-2 font-sora">R4125.00</p>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">SAVE R1375</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>

      {/* DIAGNOSTIC / AI CHAT CTA */}
      <section className="py-32 px-6 max-w-4xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 text-center border-t-4 border-t-brand-gold shadow-2xl relative overflow-hidden">
            {/* Background subtle icon */}
            <Sparkles size={200} className="absolute -top-10 -right-10 text-brand-gold opacity-5" />
            
            <h2 className="text-4xl md:text-5xl font-sora font-black mb-6 tracking-tighter uppercase text-white">Skip the forms. <br className="md:hidden"/>Talk to our AI.</h2>
            <p className="text-white/60 mb-10 font-medium text-lg leading-relaxed max-w-2xl mx-auto">Tell us what you're trying to build, solve, or comply with. Our AI Advisor will instantly generate your initial action plan.</p>
            
            <form onSubmit={triggerAI} className="bg-black/40 rounded-2xl p-2 flex items-center border border-white/10 focus-within:border-brand-gold transition-colors max-w-2xl mx-auto shadow-inner">
              <input 
                type="text" 
                placeholder="E.g., I'd like to claim the 25% off setup offer..." 
                className="bg-transparent w-full text-white px-6 py-4 outline-none placeholder-white/30 font-medium"
                required
              />
              <button 
                type="submit"
                className="bg-brand-gold text-brand-900 font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-white transition-all flex items-center gap-2"
              >
                Summon Advisor <Send size={14} />
              </button>
            </form>
            <p className="text-[10px] font-bold text-brand-gold/60 uppercase tracking-widest mt-6">Secure, autonomous matching. No spam, ever.</p>
          </div>
        </RevealOnScroll>
      </section>

    </div>
  );
};

export default Home;
