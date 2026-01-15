import React from 'react';
import NewsTicker from '../NewsTicker';
import Button from '../Button';
import AudienceNav from '../AudienceNav';
import { CheckCircle2, ChevronDown, ChevronUp, Shield, Globe, Users } from 'lucide-react';
import RevealOnScroll from '../RevealOnScroll';

const NPOSolutions: React.FC = () => {
  const services = [
    { title: "Compliance & Financial Oversight", desc: "We act as your external watchdog to ensure total transparency. This includes setting up 'Checks and Balances,' monitoring internal spending against grant requirements, and ensuring you meet all legal obligations to the DSD and SARS." },
    { title: "Capacity Assessment", desc: "Deep-dive evaluations of your organization’s internal systems, governance, and human resources to identify strengths and weaknesses for donor readiness." },
    { title: "Annual Work Plan Drafting", desc: "Translating your mission into a structured, actionable plan for the year ahead to ensure project success and measurable impact." },
    { title: "Grant Budgeting & Forecasting", desc: "Align your project goals with your budget through precise forecasting that meets strict donor requirements and audit standards." },
    { title: "PBO & NPO Registration", desc: "Expert guidance through the complex PBO registration process with SARS to secure tax-exempt status and Section 18A benefits." }
  ];

  const faqs = [
    { q: "What is the difference between an NPO and a PBO?", a: "NPO is a registration with the Department of Social Development. PBO (Public Benefit Organization) is a tax status with SARS that allows you to issue Section 18A tax certificates to donors. We help you secure both." },
    { q: "Why do we need a Capacity Assessment?", a: "Donors today want to fund organizations that are sustainable and well-run. An assessment proves to donors that you have identified your risks and have a plan to manage them." },
    { q: "How can you help us with donor reporting?", a: "Reporting is often where NPOs fail, leading to funding cuts. We act as your compliance officer, ensuring every Rand is accounted for according to donor contract line items." }
  ];

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="pt-20 bg-white min-h-screen">
      <AudienceNav active="npos" />
      
      <div className="bg-brand-900 text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
           <Globe size={800} className="absolute -right-60 -top-60" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-[8rem] font-sora font-extrabold tracking-tighter leading-[0.8] mb-12">NGO & NPO <br/> <span className="text-brand-gold italic">INTEGRITY.</span></h1>
          <p className="text-xl md:text-3xl text-brand-100 max-w-4xl mx-auto font-light">
            Specialized compliance and institutional management for the non-profit sector.
          </p>
        </div>
      </div>

      <NewsTicker />

      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          {services.map((s, i) => (
            <RevealOnScroll key={i} delay={i * 0.05} width="100%">
              <div className="group p-10 bg-gray-50 rounded-[2.5rem] border border-brand-900/5 hover:border-brand-gold transition-all duration-500 h-full flex flex-col">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-900 mb-8 shadow-sm group-hover:bg-brand-900 group-hover:text-white transition-all">
                  <Shield size={24} />
                </div>
                <h3 className="text-2xl font-black text-brand-900 mb-4 uppercase tracking-tighter">{s.title}</h3>
                <p className="text-brand-900/60 leading-relaxed flex-grow">{s.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="bg-brand-50 rounded-[3rem] p-12 md:p-20 mb-20 shadow-inner">
          <h2 className="text-4xl font-sora font-black text-center text-brand-900 mb-16 tracking-tighter">GOVERNANCE <span className="text-brand-gold italic">INTEL.</span></h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-brand-900/5 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center font-bold text-brand-900 hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  {openFaq === i ? <Shield className="text-brand-gold" /> : <Shield className="text-brand-900/20" />}
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8 text-brand-900/60 leading-relaxed text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-20 bg-brand-900 rounded-[4rem] text-white px-6">
          <Users size={64} className="mx-auto text-brand-gold mb-12 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-sora font-black tracking-tighter mb-8">SECURE YOUR <span className="text-brand-gold">SOCIAL IMPACT.</span></h2>
          <Button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} size="lg" className="rounded-full px-12 py-6 bg-white text-brand-900 font-black uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-white transition-all">
            Initiate NPO Audit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NPOSolutions;