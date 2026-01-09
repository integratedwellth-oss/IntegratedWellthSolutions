import React from 'react';
import { useNavigate } from 'react-router-dom';
import FinancialHealthScore from '../components/FinancialHealthScore';
import { Zap, ChevronRight, User } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      
      {/* HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 rounded-b-[3rem] overflow-hidden shadow-2xl">
        
        {/* BACKGROUND IMAGE - REAL: Accountability Partnership Session */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dka0498ns/image/upload/v1765644818/Accountability_Partnership._SMMEs_review_session._egzihs.jpg" 
            alt="Accountability Partnership - SMME Review Session" 
            className="w-full h-full object-cover object-center" 
          />
          {/* Lightened gradient so we can SEE the people (Thabo, etc) */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/80 via-brand-900/60 to-transparent"></div>
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
              We bridge the gap between Technical IQ and Behavioral EQ. Move from survival mode to sovereign command.
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
                <User size={18} /> Meet Marcia
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER TEASER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 bg-brand-gold/20 rounded-[2rem] transform rotate-3"></div>
              {/* REAL IMAGE: Marcia Kgaphola */}
              <img 
                src="https://res.cloudinary.com/dka0498ns/image/upload/v1765321877/Integrated_Wellth_Solution_Founder._Marcia_Kgaphola_t5u2ea.jpg" 
                alt="Marcia Kgaphola" 
                className="relative rounded-[2rem] shadow-2xl w-full h-auto object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <span className="text-brand-gold font-bold uppercase tracking-widest text-sm">The Architect</span>
              <h2 className="text-4xl font-black text-brand-900 font-sora">Marcia Kgaphola.</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                "Business is not just math; it is psychology. I built Integrated Wellth to serve the founder who has conquered the market but is still fighting the chaos within their own operations."
              </p>
              <button onClick={() => navigate('/founder')} className="text-brand-900 font-bold border-b-2 border-brand-gold pb-1 hover:text-brand-gold transition-colors flex items-center gap-2">
                Read Full Bio <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC SECTION */}
      <section id="assess" className="py-24 px-6 bg-slate-50 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black text-brand-900 uppercase tracking-tighter mb-4 font-sora">Strategic Triage</h2>
          <div className="w-24 h-1.5 bg-brand-gold mx-auto rounded-full"></div>
          <p className="text-gray-500 mt-6 text-lg">Determine your operational readiness with our comprehensive diagnostic engine.</p>
        </div>
        <FinancialHealthScore />
      </section>
    </div>
  );
};

export default Home;
