
import React from 'react';
import NewsTicker from '../NewsTicker';
import Button from '../Button';
import AudienceNav from '../AudienceNav';
import { CheckCircle2, Heart, Shield, Sparkles, MessageCircle, HeartHandshake } from 'lucide-react';
import RevealOnScroll from '../RevealOnScroll';

const AccountabilityPartnership: React.FC = () => {
  const plans = [
    {
      name: "Strategic Pulse",
      type: "Monthly Subscription",
      meta: "THE ESSENTIAL SAFETY NET",
      features: [
        "Monthly 90-min Deep Dive Session",
        "Strategic Goal Tracking",
        "Resilience & Burnout Check-in",
        "Email Support",
        "2026 Compliance Guidance"
      ]
    },
    {
      name: "Growth Partner",
      type: "Retainer Model",
      meta: "MOST POPULAR FOR SCALING FOUNDERS",
      featured: true,
      features: [
        "Bi-Weekly Strategy Calls",
        "Decision-Making Fatigue Support",
        "Financial Dashboard Review",
        "WhatsApp Priority Access",
        "Conflict Resolution Support",
        "Quarterly Business Reset"
      ]
    },
    {
      name: "Founder Concierge",
      type: "Tailored Retainer",
      meta: "TOTAL OPERATIONAL & EMOTIONAL PEACE",
      dark: true,
      features: [
        "Weekly Accountability Sprints",
        "Full Management Accounts Access",
        "Unlimited Resilience Coaching",
        "Operational Bottleneck Solving",
        "Investor Readiness Partnership",
        "Bespoke Strategic Planning"
      ]
    }
  ];

  return (
    <div className="pt-20 bg-white min-h-screen">
      <AudienceNav active="accountability" />
      
      {/* Dramatic Hero Section */}
      <section className="bg-brand-900 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-white/20 rounded-full animate-spin-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-12">
               <HeartHandshake size={18} className="text-brand-gold" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">IWS Sovereign Membership</span>
            </div>
            <h1 className="text-7xl md:text-[9rem] font-sora font-extrabold tracking-tighter leading-[0.8]">
              THE "LONELY <br/> JOURNEY" <span className="text-brand-gold italic">ENDS HERE.</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-100 max-w-3xl mx-auto mt-12 leading-relaxed font-light">
              Specialized psychological support for the unique demands of entrepreneurship. 
              Protecting your most valuable asset: <span className="text-white font-black underline decoration-brand-gold underline-offset-8">Your Mind.</span>
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <NewsTicker />

      {/* The Problem Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
           <RevealOnScroll>
              <div className="space-y-8">
                <h2 className="text-5xl md:text-6xl font-sora font-black text-brand-900 tracking-tighter leading-tight">
                  Entrepreneurship is a Marathon of <span className="text-brand-gold italic">High-Stakes Pressure.</span>
                </h2>
                <p className="text-xl text-brand-900/60 leading-relaxed">
                  You spend thousands on compliance and marketing, yet neglect the engine that drives it all. This service provides a confidential professional space to navigate decision fatigue, anxiety, and the isolation of leadership.
                </p>
                <div className="grid gap-6">
                   {[
                     { label: "Combat Decision Fatigue", desc: "Maintain mental clarity for strategic choices." },
                     { label: "Prevent Burnout", desc: "Proactive management of energy and stress levels." },
                     { label: "Resolve Conflict", desc: "Navigate co-founder disputes and leadership isolation." }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4 p-6 bg-brand-50 rounded-2xl border border-brand-900/5">
                        <div className="w-10 h-10 rounded-full bg-brand-900 text-white flex items-center justify-center flex-shrink-0 font-black">!</div>
                        <div>
                           <p className="font-black text-brand-900 uppercase text-sm tracking-tight">{item.label}</p>
                           <p className="text-brand-900/50 text-sm">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
           </RevealOnScroll>
           <RevealOnScroll delay={0.2}>
              <div className="bg-brand-900 rounded-[4rem] p-16 text-center shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 p-12 text-[12rem] font-serif text-white/5 leading-none">“</div>
                 <p className="text-3xl md:text-4xl text-white font-sora italic leading-tight relative z-10">
                    "The business is only as healthy as the founder. If you break, <span className="text-brand-gold">the business breaks.</span>"
                 </p>
              </div>
           </RevealOnScroll>
        </div>
      </section>

      {/* Subscription Plans Matrix */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-24">
           <h2 className="text-5xl md:text-7xl font-sora font-black text-brand-900 tracking-tighter">LEVELS OF <span className="text-brand-gold italic">SUPPORT.</span></h2>
           <p className="text-xl text-brand-900/40 mt-4 uppercase tracking-[0.2em] font-bold">Retainers for Resilience</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
           {plans.map((plan, i) => (
             <div key={i} className={`p-12 rounded-[3.5rem] flex flex-col h-full transition-all duration-500 hover:scale-[1.02] shadow-xl ${plan.dark ? 'bg-brand-900 text-white' : 'bg-white text-brand-900'} ${plan.featured ? 'ring-4 ring-brand-gold shadow-2xl' : ''}`}>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-4">{plan.meta}</p>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{plan.name}</h3>
                <p className={`text-sm font-bold uppercase tracking-widest mb-10 ${plan.dark ? 'text-brand-200' : 'text-brand-900/40'}`}>{plan.type}</p>
                
                <ul className="space-y-6 flex-grow mb-12">
                   {plan.features.map((f, idx) => (
                     <li key={idx} className="flex gap-4 items-start text-sm font-medium">
                        <CheckCircle2 size={18} className="text-brand-gold flex-shrink-0" />
                        <span className={plan.dark ? 'text-white/80' : 'text-brand-900/70'}>{f}</span>
                     </li>
                   ))}
                </ul>

                <Button 
                   variant={plan.dark ? 'secondary' : 'primary'} 
                   className="w-full rounded-2xl py-6 font-black uppercase tracking-widest text-xs"
                   onClick={() => window.open('https://wa.link/o1ezvw', '_blank')}
                >
                   Initiate Partnership
                </Button>
             </div>
           ))}
        </div>
      </section>

      {/* Founder's Personal Note - Editorial Style */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-6">
           <div className="bg-brand-50 rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10 space-y-12">
                 <div className="space-y-2">
                    <h3 className="text-4xl md:text-5xl font-sora font-black text-brand-900 tracking-tighter uppercase leading-none">A Note from my <br/> <span className="text-brand-gold italic">Heart to Yours.</span></h3>
                    <p className="text-xs font-black text-brand-900/30 uppercase tracking-[0.5em]">To the founder reading this at 2 AM</p>
                 </div>

                 <div className="text-xl md:text-2xl text-brand-900/70 font-medium leading-relaxed italic space-y-8">
                    <p>"As an entrepreneur myself, I know that your business is only as healthy as you are."</p>
                    <p>"We often spend thousands on compliance, marketing, and technology, yet we neglect the most important asset in the company: <span className="text-brand-900 font-black underline decoration-brand-gold">the founder’s mind.</span>"</p>
                    <p>"By taking a proactive approach now, you are protecting yourself from the massive financial and personal costs of future mental health crises. Let’s protect your most valuable asset before it reaches a breaking point."</p>
                 </div>

                 <div className="flex items-center gap-6 pt-12 border-t border-brand-900/10">
                    <img src="https://res.cloudinary.com/dka0498ns/image/upload/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg" className="w-20 h-20 rounded-3xl object-cover grayscale" alt="Marcia" />
                    <div>
                       <p className="font-black text-brand-900 text-xl tracking-tight uppercase">Marcia Kgaphola</p>
                       <p className="text-brand-600 font-bold text-xs uppercase tracking-widest">Founder & Your Strategic Partner</p>
                    </div>
                    <Button onClick={() => window.open('https://wa.link/o1ezvw', '_blank')} className="ml-auto hidden md:flex rounded-full bg-[#25D366] border-0 hover:bg-[#20bd5a] text-white gap-2">
                       <MessageCircle size={18} /> Connect Personally
                    </Button>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default AccountabilityPartnership;
