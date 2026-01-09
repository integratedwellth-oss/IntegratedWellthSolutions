import React from 'react';
import { Quote, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Founder = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pt-32 font-inter">
      {/* HEADER */}
      <div className="bg-brand-900 text-white py-20 px-6 rounded-b-[3rem] shadow-2xl mb-12">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-4 block">The Origin Story</span>
          <h1 className="text-5xl md:text-7xl font-black font-sora mb-6">The Architect.</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Blending strict financial governance with behavioral psychology to build resilient legacies.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          
          {/* IMAGE COLUMN */}
          <div className="md:col-span-5 sticky top-32">
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-gold/10 rounded-[2rem] transform -rotate-2"></div>
              {/* REAL IMAGE: Marcia Kgaphola */}
              <img 
                src="https://res.cloudinary.com/dka0498ns/image/upload/v1765321877/Integrated_Wellth_Solution_Founder._Marcia_Kgaphola_t5u2ea.jpg" 
                alt="Marcia Kgaphola" 
                className="w-full rounded-[2rem] shadow-2xl relative z-10" 
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs border border-gray-100 hidden md:block">
                 <Quote className="text-brand-gold mb-2" size={24} />
                 <p className="text-brand-900 font-bold italic text-sm">
                   "We don't just fix books; we fix the behavior that breaks them."
                 </p>
              </div>
            </div>
            
            <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
               <h3 className="font-bold text-brand-900 mb-4 uppercase tracking-wider text-sm">Credentials</h3>
               <ul className="space-y-3 text-sm text-gray-600">
                 <li className="flex items-center gap-2">✔ Certified Accountant (SA)</li>
                 <li className="flex items-center gap-2">✔ Behavioral Finance Specialist</li>
                 <li className="flex items-center gap-2">✔ Board Advisor</li>
                 <li className="flex items-center gap-2">✔ Legacy Strategist</li>
               </ul>
            </div>
          </div>

          {/* TEXT COLUMN */}
          <div className="md:col-span-7 space-y-8 text-lg text-gray-600 leading-relaxed">
            <h2 className="text-3xl font-bold text-brand-900 font-sora">Why I Built Integrated Wellth.</h2>
            
            <p>
              I saw a pattern destroying successful African businesses. It wasn't a lack of sales, and it wasn't a lack of talent. It was a disconnect between the <strong>Wallet</strong> and the <strong>Mind</strong>.
            </p>

            <p>
              Traditional accounting firms would hand over a spreadsheet and walk away. Traditional therapists would listen to the stress but couldn't fix the cash flow causing it.
            </p>

            <div className="bg-brand-50 p-8 rounded-2xl border-l-4 border-brand-gold my-8">
              <p className="font-medium text-brand-900 italic">
                "I realized that to truly save a business, you cannot just be an accountant. You must be a strategic partner who understands the psychological weight of leadership."
              </p>
            </div>

            <p>
              That is why <strong>Integrated Wellth Solutions</strong> exists. We are not just bookkeepers. We are the 'War Room' for founders who are ready to stop firefighting and start engineering a legacy that outlives them.
            </p>

            <h3 className="text-2xl font-bold text-brand-900 font-sora mt-12">My Promise</h3>
            <p>
              We will be uncomfortable. We will ask hard questions about your spending, your discipline, and your long-term plans. But if you trust the process, we will build a fortress around your wealth that no market shift can destroy.
            </p>

            <div className="pt-8">
              <button 
                onClick={() => navigate('/contact')} 
                className="px-8 py-4 bg-brand-900 text-white font-black uppercase tracking-widest rounded-xl hover:bg-brand-gold hover:text-brand-900 transition-all shadow-lg flex items-center gap-2"
              >
                Work With Marcia <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Founder;
