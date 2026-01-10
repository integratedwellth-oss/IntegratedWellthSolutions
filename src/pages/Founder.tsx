import React from 'react';
import { Quote, ArrowRight, Mic2, ShieldCheck, TrendingUp, Award, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Founder = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pt-32 font-inter">
      {/* HEADER - High Authority Branding */}
      <div className="bg-brand-900 text-white py-24 px-6 rounded-b-[3.5rem] shadow-2xl mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-6 block">
            The Visionary Behind IWS
          </span>
          <h1 className="text-5xl md:text-8xl font-black font-sora mb-6 tracking-tighter">
            The <span className="text-brand-gold">Architect.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Marcia Kgaphola: Engineering financial sovereignty through governance and behavioral psychology.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* PRIMARY IMAGE COLUMN - FEATURING YOUR REQUESTED KEYNOTE IMAGE */}
          <div className="lg:col-span-6 lg:sticky lg:top-36">
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-gold/15 rounded-[2.5rem] transform rotate-2"></div>
              
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white">
                {/* THE KEYNOTE IMAGE YOU PROVIDED */}
                <img 
                  src="https://res.cloudinary.com/dka0498ns/image/upload/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg" 
                  alt="Marcia Kgaphola Keynote Speech" 
                  className="w-full h-auto object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-900/90 to-transparent p-8">
                   <div className="flex items-center gap-3 text-brand-gold">
                      <Mic2 size={20} />
                      <span className="text-xs font-black uppercase tracking-widest text-white">Founder & Keynote Speaker</span>
                   </div>
                </div>
              </div>

              {/* CREDENTIALS QUICK-VIEW */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-brand-gold">
                  <Award className="text-brand-gold mb-3" size={24} />
                  <h4 className="font-bold text-brand-900 text-sm uppercase">Compliance</h4>
                  <p className="text-xs text-gray-500">Certified Accountant (SA)</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-brand-900">
                  <Brain className="text-brand-900 mb-3" size={24} />
                  <h4 className="font-bold text-brand-900 text-sm uppercase">Psychology</h4>
                  <p className="text-xs text-gray-500">Behavioral Wealth Specialist</p>
                </div>
              </div>
            </div>
          </div>

          {/* BIOGRAPHY CONTENT */}
          <div className="lg:col-span-6 space-y-10 text-lg text-gray-600 leading-relaxed">
            <section className="space-y-6">
              <h2 className="text-4xl font-black text-brand-900 font-sora tracking-tight leading-tight">
                "We don't just fix books; we fix the behavior that breaks them."
              </h2>
              <p className="text-xl font-medium text-brand-900/70 border-l-4 border-brand-gold pl-6 py-2">
                Marcia Kgaphola realized that traditional financial advice fails because it ignores the human element.
              </p>
              <p>
                As the founder of Integrated Wellth Solutions, Marcia has spent over a decade helping entrepreneurs move from "survival mode" to "sovereign command." Her methodology combines rigorous financial auditing with a deep understanding of leadership psychology.
              </p>
            </section>

            <div className="bg-brand-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-brand-gold font-sora">The Vision</h3>
              <p className="relative z-10 text-gray-300 italic text-xl">
                "Business is not just math; it is psychology. I built IWS to serve the founder who has conquered the market but is still fighting the chaos within their own operations."
              </p>
            </div>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-brand-900 font-sora">A Strategic Leadership</h3>
              <p>
                Whether she is delivering a keynote at a business conference or facilitating a high-stakes "War Room" session, her focus remains the same: <strong>Operational Excellence and Behavioral Shift.</strong>
              </p>
              <p>
                Under her guidance, IWS serves as a strategic triage for businesses in distress and a growth engine for those ready to scale.
              </p>
            </section>

            <div className="pt-8">
              <button 
                onClick={() => navigate('/contact')} 
                className="w-full md:w-auto px-10 py-5 bg-brand-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-brand-gold hover:text-brand-900 transition-all duration-300 shadow-xl flex items-center justify-center gap-4"
              >
                Inquire for Keynote or Consultation
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Founder;
