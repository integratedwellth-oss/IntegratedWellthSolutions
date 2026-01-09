import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WhoWeHelp = () => {
  const navigate = useNavigate();

  const segments = [
    {
      title: "Existing Businesses",
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765745275/Integrated_Wellth_in_support_for_existing_businesses._nnnmib.png",
      description: "For established entities needing governance restructuring, cash flow optimization, and legacy planning."
    },
    {
      title: "Startups & SMMEs",
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765744607/Integrated_Wellth_that_support_for_startup_businesses_wtnrwq.png",
      description: "For founders building their first fortress. We set the financial pillars before the weight of revenue crushes the foundation."
    },
    {
      title: "NGOs & NPOs",
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765745902/Integrated_Wellth_in_support_for_NGOs_NPOs_u7exko.png",
      description: "For impact organizations that need corporate-level compliance and donor reporting structures."
    },
    {
      title: "Individuals & Teens",
      image: "https://res.cloudinary.com/dka0498ns/image/upload/v1765746428/Integrated_Wellth_in_support_for_Individuals_Teens_Solutions._j58vsp.png",
      description: "Financial literacy and behavioral wealth training for the next generation of leaders."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">Target Profiles</span>
          <h1 className="text-4xl md:text-5xl font-black text-brand-900 mt-4 mb-6 font-sora">Who We Serve.</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Our methodology adapts to the lifecycle stage of your wealth, from inception to legacy preservation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {segments.map((segment, index) => (
            <div key={index} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="h-64 overflow-hidden bg-brand-900 relative">
                <img 
                  src={segment.image} 
                  alt={segment.title} 
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-brand-900 mb-3 font-sora">{segment.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {segment.description}
                </p>
                <button 
                  onClick={() => navigate('/contact')}
                  className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-wider text-sm hover:gap-4 transition-all"
                >
                  Initiate Protocol <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FEATURED WORKSHOP BANNER */}
        <div className="mt-20 bg-brand-900 rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl"></div>
          
          <div className="w-full md:w-1/3">
             <img 
               src="https://res.cloudinary.com/dka0498ns/image/upload/v1765658087/Financial_Clarity_For_Non-Financial_Business_Owners._IWS_event_Post_icwvbb.png" 
               alt="Financial Clarity Workshop" 
               className="rounded-xl shadow-2xl border-2 border-brand-gold/50 rotate-[-5deg] hover:rotate-0 transition-all duration-500"
             />
          </div>
          
          <div className="w-full md:w-2/3 text-white">
            <span className="bg-brand-gold text-brand-900 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Featured Workshop</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4 font-sora">Financial Clarity for Non-Financial Owners</h2>
            <p className="text-white/80 mb-8 text-lg">
              Stop nodding along to your accountant when you don't understand the numbers. This workshop decrypts the language of finance for visionary leaders.
            </p>
            <button onClick={() => navigate('/contact')} className="bg-white text-brand-900 px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-brand-gold transition-colors">
              Secure Your Seat
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhoWeHelp;
