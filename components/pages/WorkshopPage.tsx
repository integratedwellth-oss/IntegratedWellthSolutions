import React from 'react';
import RevealOnScroll from '../RevealOnScroll';
import Button from '../Button';
import WorkshopRegistrationForm from '../WorkshopRegistrationForm';
import { Calendar, Clock, Monitor, Tag, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

const FOUNDER_URL = "https://res.cloudinary.com/dka0498ns/image/upload/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg";
const TREE_LOGO_URL = "https://res.cloudinary.com/dka0498ns/image/upload/v1765747786/favicon_ofkkb1.png";

const WorkshopPage: React.FC = () => {
  return (
    <div className="animate-fadeIn bg-white selection:bg-brand-gold/20">
      
      <div className="bg-[#f4f1ea] text-brand-900 pt-32 pb-20 px-6 relative overflow-hidden border-b-8 border-brand-900">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#134e4a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll>
            <div className="space-y-8">
              <div className="flex justify-start mb-6">
                <img src={TREE_LOGO_URL} alt="IWS Logo" className="w-32 h-32 object-contain" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-black tracking-tighter uppercase leading-[1.1] text-brand-900">
                Governance, Recordkeeping, <br className="hidden md:block"/> 
                <span className="text-brand-900">& Compliance Workshop</span>
              </h1>
              
              <div className="flex items-center gap-4 font-black tracking-widest uppercase text-lg md:text-2xl text-brand-900">
                <span>CIPC</span>
                <span className="text-brand-gold">|</span>
                <span>SARS</span>
                <span className="text-brand-gold">|</span>
                <span>Labour</span>
              </div>

              <div className="bg-brand-900 text-white p-6 rounded-r-3xl rounded-l-md shadow-2xl inline-block mt-8 border-l-8 border-brand-gold">
                <p className="text-2xl md:text-3xl font-black tracking-tight mb-2">22nd May, 18h00–20h00</p>
                <div className="flex flex-wrap items-center gap-4 text-sm font-bold tracking-widest uppercase text-brand-gold mt-4">
                  <span className="flex items-center gap-2"><Monitor size={16} /> Online Session</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block"></span>
                  <span className="flex items-center gap-2"><Tag size={16} /> Cost: R250 Per Person</span>
                </div>
              </div>

              <div className="pt-8">
                <Button onClick={() => { document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' }); }} className="rounded-full py-5 px-10 text-sm font-black uppercase tracking-widest bg-brand-gold text-brand-900 hover:bg-brand-900 hover:text-white shadow-xl transition-all">
                  Secure Your Seat Now <ChevronRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <img src={FOUNDER_URL} alt="Marcia Kgaphola" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-900 to-transparent p-8 pt-32">
                 <p className="text-white font-black uppercase tracking-widest text-xl">Marcia Kgaphola</p>
                 <p className="text-brand-gold font-bold text-xs uppercase tracking-widest">Principal Architect</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <section className="py-24 bg-brand-900 text-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <RevealOnScroll>
            <p className="text-2xl md:text-4xl font-sora font-medium leading-relaxed tracking-tight">
              <span className="font-black italic text-brand-gold">Governance</span> sets the direction, proper recordkeeping provides the evidence, and compliance secures your opportunities.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div className="w-24 h-1 bg-brand-gold/30 mx-auto rounded-full"></div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <div className="space-y-6">
              <p className="text-xl md:text-2xl font-bold leading-relaxed text-white/90">
                Can't participate in tenders or excluded from funding?
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-brand-gold">
                Learn how to meet compliance requirements and secure your business opportunities.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-brand-900/5">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-sora font-black text-brand-900 tracking-tighter mb-4">Workshop Curriculum</h2>
              <p className="text-lg text-brand-900/60 font-medium">Actionable intelligence for South African founders.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "CIPC Navigation", desc: "Mastering Annual Returns, Beneficial Ownership, and protecting your entity status from deregistration." },
                { title: "SARS Architecture", desc: "Understanding Provisional Tax, VAT thresholds, and building audit-proof recordkeeping systems." },
                { title: "Labour Compliance", desc: "Structuring PAYE, UIF, and SDL correctly to avoid compounding penalties and protect your workforce." }
              ].map((module, idx) => (
                <div key={idx} className="bg-gray-50 p-10 rounded-[2.5rem] shadow-sm border border-brand-900/5 hover:-translate-y-2 hover:shadow-xl hover:border-brand-gold transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-900 text-brand-gold rounded-xl flex items-center justify-center font-black text-xl mb-6">{idx + 1}</div>
                  <h3 className="text-xl font-black text-brand-900 uppercase tracking-tight mb-4">{module.title}</h3>
                  <p className="text-brand-900/70 leading-relaxed font-medium text-sm">{module.desc}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-32 bg-[#f4f1ea]" id="registration">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-sora font-black text-brand-900 tracking-tighter uppercase">Secure Your <br/> <span className="text-brand-gold italic">Seat.</span></h2>
            <p className="text-lg text-brand-900/60 mt-6 font-medium max-w-2xl mx-auto">Complete the registration protocol below to reserve your spot and receive the meeting link.</p>
          </div>
          
          <RevealOnScroll>
            <WorkshopRegistrationForm />
          </RevealOnScroll>
        </div>
      </section>

    </div>
  );
};

export default WorkshopPage;
