import React from 'react';
import { Quote, ArrowRight, Award, Brain, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Founder = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pt-32 font-inter">
      {/* HEADER SECTION */}
      <div className="bg-brand-900 text-white py-24 px-6 rounded-b-[3.5rem] shadow-2xl mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-6 block animate-pulse">
            Executive Profile
          </span>
          <h1 className="text-5xl md:text-8xl font-black font-sora mb-6 tracking-tighter">
            The <span className="text-brand-gold">Architect.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Marcia Kgaphola: Bridging the gap between corporate governance and the psychology of wealth.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* IMAGE COLUMN - KEYNOTE FOCUS */}
          <div className="lg:col-span-5 lg:sticky lg:top-36">
            <div className="relative group">
              <div className="absolute -inset-4 bg-brand-gold/20 rounded-[2.5rem] transform rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              
              {/* THE REQUESTED KEYNOTE IMAGE */}
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl aspect-[4/5]">
                <img 
                  src="https://res.cloudinary.com/dka0498ns/image/upload/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg" 
                  alt="Marcia Kgaphola Keynote Speech" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent"></div>
              </div>

              {/* FLOATING CAPTION */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl z-20 max-w-[280px] border border-brand-gold/20">
                 <Quote className="text-brand-gold mb-3" size={28} />
                 <p className="text-brand-900 font-bold italic text-sm leading-snug">
                   "Wealth is a behavior before it is a balance sheet. We engineer the mindset that sustains the legacy."
                 </p>
              </div>
            </div>
            
            {/* CREDENTIALS GRID */}
            <div className="mt-16 grid grid-cols-2 gap-4">
               <div className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-brand-gold">
                  <Award className="text-brand-gold mb-3" size={24} />
                  <h4 className="font-bold text-brand-900 text-sm uppercase">Compliance</h4>
                  <p className="text-xs text-gray-500">Certified Accountant (SA)</p>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-brand-900">
                  <Brain className="text-brand-900 mb-3" size={24} />
                  <h4 className="font-bold text-brand-900 text-sm uppercase">Psychology</h4>
                  <p className="text-xs text-gray-500">Behavioral Wealth Specialist</p>
               </div>
            </div>
          </div>

          {/* BIOGRAPHY CONTENT */}
          <div className="lg:col-span-7 space-y-10 text-lg text-gray-600 leading-relaxed">
            <section className="space-y-6">
              <h2 className="text-4xl font-black text-brand-900 font-sora tracking-tight">
                Engineering Financial Sovereignty.
              </h2>
              <p>
                As the founder of <strong>Integrated Wellth Solutions</strong>, Marcia Kgaphola has redefined the intersection of business accounting and personal legacy. Her approach moves beyond traditional bookkeeping, treating financial health as a holistic ecosystem.
              </p>
              <p>
                With years of experience advising SMMEs and large organizations, Marcia identified the "CEO Trap"—where business owners find themselves enslaved to their operations rather than empowered by them.
              </p>
            </section>

            <div className="bg-brand-900 rounded-[2rem] p-10 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 opacity-10"><Target size={200} /></div>
              <h3 className="text-2xl font-bold mb-4 text-brand-gold font-sora">The Mission</h3>
              <p className="relative z-10 text-gray-300 italic text-xl">
                "I built this firm for the visionary who is tired of 'just getting by' despite high revenues. We are here to build a fortress around your wealth through psychological discipline and rigorous financial engineering."
              </p>
            </div>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-brand-900 font-sora">A Strategic Partnership</h3>
              <p>
                Marcia's leadership extends beyond the boardroom. Whether she is delivering a keynote at a business conference or facilitating a high-stakes "War Room" session, her focus remains the same: <strong>Operational Excellence and Behavioral Shift.</strong>
              </p>
              <p>
                Under her guidance, IWS serves as a strategic triage for businesses in distress and a growth engine for those ready to scale.
              </p>
            </section>

            <div className="pt-10 border-t border-gray-200">
              <button 
                onClick={() => navigate('/contact')} 
                className="group px-10 py-5 bg-brand-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-brand-gold hover:text-brand-900 transition-all duration-300 shadow-2xl flex items-center gap-4"
              >
                Schedule a Consultation with Marcia
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Founder;
