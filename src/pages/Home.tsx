import React from 'react';
import { useNavigate } from 'react-router-dom';
import FinancialHealthScore from '../components/FinancialHealthScore';
import ComplianceCalendar from '../components/ComplianceCalendar';
import { Zap, ChevronRight, User, ShieldCheck, Target, TrendingUp } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      
      {/* HERO SECTION - Featuring the Accountability Partnership Image */}
      <section className="relative pt-48 pb-32 px-6 rounded-b-[3.5rem] overflow-hidden shadow-2xl">
        
        {/* BACKGROUND IMAGE - AUTHENTIC SESSION */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dka0498ns/image/upload/v1765644818/Accountability_Partnership._SMMEs_review_session._egzihs.jpg" 
            alt="Accountability Partnership Session with Thabo Leslie Motsumi" 
            className="w-full h-full object-cover object-center"
          />
          {/* Sophisticated gradient overlay to ensure text legibility while keeping the team visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/70 to-brand-900/30"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-10 animate-in slide-in-from-left duration-700">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase tracking-widest shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System Status: ONLINE
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1] text-white font-sora drop-shadow-2xl">
              Legacy <br/>
              <span className="text-brand-gold italic">
                Engineering.
              </span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-lg leading-relaxed font-medium drop-shadow-md">
              Bridging the gap between Technical IQ and Behavioral EQ. Move from survival mode to sovereign command.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => navigate('/war-room')} 
                className="px-8 py-4 bg-brand-gold text-brand-900 font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center gap-2"
              >
                <Zap size={18} fill="currentColor" /> Enter War Room
              </button>
              <button 
                onClick={() => navigate('/founder')} 
                className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-black uppercase tracking-widest rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <User size={18} /> Meet The Architect
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER TEASER - Real Keynote Image */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:row items-center gap-16 lg:flex-row">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-brand-gold/15 rounded-[2.5rem] transform rotate-3"></div>
              <img 
                src="https://res.cloudinary.com/dka0498ns/image/upload/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg" 
                alt="Marcia Kgaphola Keynote" 
                className="relative rounded-[2.5rem] shadow-2xl w-full h-[550px] object-cover"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-sm">The Architect</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-900 font-sora leading-tight">Marcia Kgaphola.</h2>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                "Business is not just math; it is psychology. I built Integrated Wellth to serve the founder who has conquered the market but is still fighting the chaos within their own operations."
              </p>
              
              <div className="grid grid-cols-2 gap-6 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-50 rounded-lg text-brand-gold"><Target size={20} /></div>
                  <span className="font-bold text-brand-900 text-sm uppercase tracking-wider">Strategy</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-50 rounded-lg text-brand-gold"><TrendingUp size={20} /></div>
                  <span className="font-bold text-brand-900 text-sm uppercase tracking-wider">Growth</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/founder')} 
                className="text-brand-900 font-black border-b-4 border-brand-gold pb-1 hover:text-brand-gold transition-colors flex items-center gap-2 uppercase tracking-widest text-sm"
              >
                View Founder Profile <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE RADAR SECTION - The Governance Tool */}
      <section className="py-24 px-6 bg-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-gold/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-brand-gold font-bold uppercase tracking-[0.2em] text-sm">Governance Intelligence</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-900 font-sora leading-tight">
              Master Your <br/> <span className="text-brand-gold">Compliance</span> Cycle.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Regulatory compliance is the foundation of institutional trust. Our roadmap ensures your business remains audit-ready, shielding you from penalties and legal friction.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 font-bold text-brand-900">
                <ShieldCheck className="text-emerald-500" /> SARS Alignment Protocol
              </li>
              <li className="flex items-center gap-3 font-bold text-brand-900">
                <ShieldCheck className="text-emerald-500" /> CIPC Annual Governance
              </li>
              <li className="flex items-center gap-3 font-bold text-brand-900">
                <ShieldCheck className="text-emerald-500" /> Labour Law Compliance (UIF/SDL)
              </li>
            </ul>
          </div>
          
          <div className="lg:col-span-7">
            <ComplianceCalendar />
          </div>
        </div>
      </section>

      {/* STRATEGIC TRIAGE SECTION (Assessment) */}
      <section id="assess" className="py-24 px-6 bg-white relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-sm block mb-4">Immediate Diagnostic</span>
          <h2 className="text-4xl md:text-5xl font-black text-brand-900 uppercase tracking-tighter font-sora">Strategic Triage</h2>
          <div className="w-24 h-2 bg-brand-gold mx-auto rounded-full mt-4"></div>
          <p className="text-gray-500 mt-8 text-xl max-w-2xl mx-auto">
            Before we engineer the solution, we must measure the friction. Use our diagnostic engine to determine your operational readiness.
          </p>
        </div>
        <FinancialHealthScore />
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-brand-900 text-white text-center px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold font-sora">Ready to enter the War Room?</h2>
          <p className="text-gray-400 text-lg">Stop firefighting. Start building. Secure your strategic consultation today.</p>
          <button 
            onClick={() => navigate('/contact')} 
            className="px-12 py-5 bg-white text-brand-900 font-black uppercase tracking-widest rounded-full hover:bg-brand-gold hover:text-brand-900 transition-all shadow-2xl"
          >
            Initiate Contact
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;
