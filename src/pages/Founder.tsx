import React from 'react';
import { Quote, ArrowRight, Mic2, ShieldCheck, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Founder = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pt-32 font-inter">
      {/* HEADER - High Authority */}
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
          
          {/* PRIMARY IMAGE COLUMN - THE KEYNOTE PHOTO */}
          <div className="lg:col-span-6 lg:sticky lg:top-36">
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-gold/15 rounded-[2.5rem] transform rotate-2"></div>
              
              {/* THE REQUESTED KEYNOTE IMAGE */}
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-white">
                <img 
                  src="https://res.cloudinary.com/dka0498ns/image/upload/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg" 
                  alt="Marcia Kgaphola Keynote Speech" 
                  className="w-full h-auto object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-900/80 to-transparent p-8">
                   <div className="flex items-center gap-3 text-brand-gold">
                      <Mic2 size={20} />
                      <span className="text-xs font-black uppercase tracking-widest text-white">Keynote: Women in Business Conference</span>
                   </div>
                </div>
              </div>

              {/* STATS OVERLAY */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border-t-2 border-brand-gold text-center">
                  <ShieldCheck className="mx-auto text-brand-900 mb-2" size={20} />
                  <span className="block text-[10px] font-bold uppercase text-gray-400">Governance</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border-t-2 border-brand-gold text-center">
                  <TrendingUp className="mx-auto text-brand-900 mb-2" size={20} />
                  <span className="block text-[10px] font-bold uppercase text-gray-400">Scale</span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border-t-2 border-brand-gold text-center">
                  <Mic2 className="mx-auto text-brand-900 mb-2" size={20} />
                  <span className="block text-[10px] font-bold uppercase text-gray-400">Leadership</span>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT COLUMN */}
          <div className="lg:col-span-6 space-y-10 text-lg text-gray-600 leading-relaxed">
            <section className="space-y-6">
              <h2 className="text-4xl font-black text-brand-900 font-sora tracking-tight leading-tight">
                "We don't just fix books; we fix the behavior that breaks them."
              </h2>
              <p className="text-xl font-medium text-brand-900/70 border-l-4 border-brand-gold pl-6 py-2">
                Marcia Kgaphola is a Certified Accountant (SA) and Behavioral Wealth Specialist who realized that traditional financial advice fails because it ignores the human element.
              </p>
              <p>
                As the founder of Integrated Wellth Solutions, Marcia has spent over a decade helping entrepreneurs move from "survival mode" to "sovereign command." Her methodology combines rigorous financial auditing with a deep understanding of leadership psychology.
              </p>
            </section>

            <div className="space-y-4 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
               <h3 className="text-xl font-bold text-brand-900 font-sora uppercase tracking-tight">The IWS Framework</h3>
               <ul className="space-y-4">
                 <li className="flex gap-4 items-start">
                   <div className="mt-1 w-5 h-5 rounded-full bg-brand-gold flex-shrink-0" />
                   <p className="text-sm"><strong>Financial Engineering:</strong> Restructuring cash flow and debt to create a foundation for growth.</p>
                 </li>
                 <li className="flex gap-4 items-start">
                   <div className="mt-1 w-5 h-5 rounded-full bg-brand-gold flex-shrink-0" />
                   <p className="text-sm"><strong>Legacy Governance:</strong> Implementing board-level structures for SMMEs and NGOs.</p>
                 </li>
                 <li className="flex gap-4 items-start">
                   <div className="mt-1 w-5 h-5 rounded-full bg-brand-gold flex-shrink-0" />
                   <p className="text-sm"><strong>Behavioral EQ:</strong> Training founders to manage the emotional triggers behind spending and investment.</p>
                 </li>
               </ul>
            </div>

            <p>
              Whether she is speaking at national conferences or conducting high-stakes triage in the "War Room," Marcia’s goal remains the same: ensuring that the wealth you build today becomes a legacy that lasts for generations.
            </p>

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
