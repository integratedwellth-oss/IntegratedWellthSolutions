import React from 'react';
import RevealOnScroll from '../RevealOnScroll';
import Button from '../Button';
import WorkshopRegistrationForm from '../WorkshopRegistrationForm';
import { Calendar, Clock, Monitor, Tag, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

const FOUNDER_URL = "https://res.cloudinary.com/dka0498ns/image/upload/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg";

const WorkshopPage: React.FC = () => {
  return (
    <div className="animate-fadeIn bg-white">
      
      {/* 1. Impact Hero */}
      <div className="bg-brand-900 text-white pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <ShieldCheck size={14} className="text-brand-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Executive Training</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter uppercase mb-8 leading-[0.9]">
              Governance, Recordkeeping <br className="hidden md:block"/> & <span className="text-brand-gold italic">Compliance</span>
            </h1>
            
            <div className="flex flex-wrap gap-4 justify-center font-black tracking-widest uppercase text-xs md:text-sm mb-12">
              <span className="bg-brand-gold text-brand-900 px-6 py-3 rounded-full shadow-lg">CIPC</span>
              <span className="bg-brand-gold text-brand-900 px-6 py-3 rounded-full shadow-lg">SARS</span>
              <span className="bg-brand-gold text-brand-900 px-6 py-3 rounded-full shadow-lg">Labour</span>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* 2. Tactical Details Bar */}
      <div className="bg-brand-gold text-brand-900 py-6 px-6 border-b-4 border-brand-900 relative z-20 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center font-black uppercase tracking-widest gap-6 text-xs md:text-sm">
          <div className="flex items-center gap-3"><Calendar size={18} /> 22nd May 2026</div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-brand-900/30"></div>
          <div className="flex items-center gap-3"><Clock size={18} /> 18h00 - 20h00</div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-brand-900/30"></div>
          <div className="flex items-center gap-3"><Monitor size={18} /> Online Session</div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-brand-900/30"></div>
          <div className="flex items-center gap-3 bg-brand-900 text-white px-4 py-2 rounded-lg"><Tag size={16} className="text-brand-gold" /> R250 Per Person</div>
        </div>
      </div>

      {/* 3. The Problem & Solution (Split Layout) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-sora font-black text-brand-900 leading-tight tracking-tighter">
                Governance sets the direction, proper recordkeeping provides the evidence, and compliance <span className="text-brand-gold italic">secures your opportunities.</span>
              </h2>
              
              <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-6">
                <p className="text-xl text-brand-900 font-bold leading-relaxed">
                  Can't participate in tenders or excluded from funding?
                </p>
                <p className="text-base text-brand-900/70 font-medium leading-relaxed">
                  Learn exactly how to meet strict compliance requirements, build audit-ready documentation, and secure your business opportunities before the 2026 deadlines.
                </p>
                <div className="pt-6 border-t border-gray-200">
                  <Button onClick={() => { document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full rounded-full py-5 text-xs font-black uppercase tracking-widest">
                    Secure Your Seat <ChevronRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-brand-gold rounded-[3rem] -z-10"></div>
              <div className="bg-brand-900 rounded-[3rem] p-2 overflow-hidden shadow-2xl">
                 <img src={FOUNDER_URL} alt="Marcia Kgaphola" className="w-full h-[500px] object-cover rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="absolute bottom-10 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[250px]">
                <p className="font-black text-brand-900 uppercase tracking-tight text-lg mb-1">Marcia Kgaphola</p>
                <p className="text-xs font-bold text-brand-900/50 uppercase tracking-widest">Host & Principal Architect</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 4. What You Will Learn */}
      <section className="py-24 bg-brand-50 border-y border-brand-900/5">
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
                <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-brand-900/5 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-12 h-12 bg-brand-gold/20 text-brand-gold rounded-xl flex items-center justify-center font-black text-xl mb-6">{idx + 1}</div>
                  <h3 className="text-xl font-black text-brand-900 uppercase tracking-tight mb-4">{module.title}</h3>
                  <p className="text-brand-900/70 leading-relaxed font-medium text-sm">{module.desc}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 5. Registration Form Injection */}
      <section className="py-32 bg-slate-900" id="registration">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-sora font-black text-white tracking-tighter uppercase">Secure Your <br/> <span className="text-brand-gold italic">Seat.</span></h2>
            <p className="text-lg text-white/60 mt-6 font-medium max-w-2xl mx-auto">Complete the diagnostic below to reserve your spot and receive the meeting link.</p>
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
