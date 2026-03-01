import React, { useState } from 'react';
import RevealOnScroll from '../RevealOnScroll';
import { Calendar, ShieldCheck, AlertTriangle, Clock, FileText, Building2, User, Landmark, HelpCircle, ChevronDown, ChevronUp, Send, ArrowRight, Globe, Zap, CheckCircle2 } from 'lucide-react';
import Button from '../Button';

const ComplianceCalendarPage: React.FC = () => {
  const TREE_HERO_URL = "https://res.cloudinary.com/dka0498ns/image/upload/f_auto,q_auto/v1772373342/Profuse_Beauty_Logo_Tree_z1nc3c.png";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const SCHEDULE = [
    { month: "February 2026", deadlines: [{ day: "28", entity: "All Entities", task: "Provisional Tax (IRP6) - 2nd Period", risk: "High", desc: "Mandatory payment to avoid 10% penalty + interest." }, { day: "28", entity: "Individuals", task: "IT3(b) & IT3(c) Data Prep", risk: "Medium", desc: "Gather investment and interest certificates." }] },
    { month: "March 2026", deadlines: [{ day: "31", entity: "Corporate", task: "CIPC Annual Returns", risk: "Critical", desc: "Hard deadline to prevent deregistration process initiation." }, { day: "25", entity: "VAT Vendors", task: "VAT 201 Submission & Payment", risk: "High", desc: "Category B vendors (periods ending Feb)." }] },
    { month: "April 2026", deadlines: [{ day: "07", entity: "Employers", task: "EMP201 Submission", risk: "Medium", desc: "PAYE, SDL and UIF for March." }] },
    { month: "May 2026", deadlines: [{ day: "31", entity: "Employers", task: "EMP501 Interim Reconciliation", risk: "Critical", desc: "Bi-annual payroll reconciliation. Major audit trigger if incorrect." }, { day: "31", entity: "NPOs", task: "Section 18A Third Party Data", risk: "High", desc: "Submission of donor data to SARS." }] },
    { month: "June 2026", deadlines: [{ day: "30", entity: "Corporate", task: "Provisional Tax (IRP6) - 3rd Period", risk: "Medium", desc: "Voluntary top-up to avoid Section 89quat interest." }] },
    { month: "July 2026", deadlines: [{ day: "01", entity: "Individuals", task: "Tax Season Opens (Filing)", risk: "Low", desc: "2026 Filing season official open date." }] },
    { month: "August 2026", deadlines: [{ day: "31", entity: "Provisional Taxpayers", task: "Provisional Tax (IRP6) - 1st Period (2027)", risk: "High", desc: "First estimation for the 2027 tax year." }] }
  ];

  const FAQS = [
    {
      q: "How will the 2026 VAT threshold increase affect my small business?",
      a: "Effective 1 April 2026, the compulsory VAT registration threshold significantly increases from R1 million to R2.3 million. If turnover sits below this, you can apply for VAT deregistration."
    },
    {
      q: "Why is my SARS eFiling status showing 'Pending' or 'Processing'?",
      a: "Pending usually means SARS is verifying registration details. Processing indicates the return is flagged for audit or verification (up to 21-90 business days)."
    },
    {
      q: "Why was a portion of my Two-Pot Retirement System savings withdrawal taken by SARS?",
      a: "Withdrawals from the 'savings pot' are taxed at your marginal income tax rate. SARS also instructs automatic deduction of any outstanding tax debt before releasing funds."
    },
    {
      q: "I am a social media influencer. Does SARS track my income?",
      a: "Yes. SARS uses data-driven profiling for the gig and social media economy, treating influencers as independent contractors who must declare earnings."
    },
    {
      q: "Can I file my CIPC Annual Return without submitting a Beneficial Ownership (BO) declaration?",
      a: "No. CIPC enforces a 'hard-stop'. Filing is blocked until the BO declaration is up to date."
    }
  ];

  return (
    <div className="bg-slate-50 font-sans text-brand-900 selection:bg-brand-gold selection:text-brand-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-brand-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={TREE_HERO_URL} 
            alt="Growth Ecosystem" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/50 to-slate-50"></div>
        </div>

        <RevealOnScroll>
          <div className="max-w-4xl mx-auto z-10 relative mt-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 mb-6 backdrop-blur-md">
              <ShieldCheck size={14} className="text-brand-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-900">Statutory Governance</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter mb-6 leading-[1] text-brand-900">
              2026 Compliance <span className="text-brand-gold italic">Calendar.</span>
            </h1>
            <p className="text-xl text-brand-900/70 max-w-2xl mx-auto font-medium">
              The definitive operational timeline for South African entities.
            </p>
          </div>
        </RevealOnScroll>
      </section>

      {/* 2. THE SCHEDULE (DETAILED TABLE) */}
      <section className="py-20 px-6 max-w-7xl mx-auto -mt-20 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-brand-900/5 overflow-hidden">
          <div className="p-8 md:p-12 bg-brand-900 text-white flex justify-between items-end">
            <div><h2 className="text-3xl font-bold font-sora mb-2 uppercase">Master Schedule</h2><p className="text-brand-gold text-sm font-bold tracking-widest uppercase">Fiscal Year 2026/2027</p></div>
            <Clock className="text-brand-gold opacity-50" size={48} />
          </div>
          <div className="divide-y divide-gray-100">{SCHEDULE.map((monthGroup, idx) => (
            <div key={idx} className="p-8 md:p-10 hover:bg-gray-50 transition-colors group">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="md:w-1/4"><h3 className="text-2xl font-black text-brand-900 uppercase">{monthGroup.month}</h3></div>
                <div className="md:w-3/4 space-y-6">{monthGroup.deadlines.map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="flex-shrink-0 w-16 h-16 bg-brand-50 rounded-2xl flex flex-col items-center justify-center border border-brand-900/10 group-hover:border-brand-gold/50"><span className="text-2xl font-black text-brand-900 leading-none">{item.day}</span></div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1"><span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${item.risk === 'Critical' ? 'bg-rose-50 text-rose-600 border-rose-200' : item.risk === 'High' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>{item.risk} Priority</span></div>
                      <h4 className="text-lg font-bold text-brand-900">{item.task}</h4>
                      <p className="text-sm text-brand-900/60 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}</div>
              </div>
            </div>
          ))}</div>
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-50 rounded-full text-brand-900 mb-4 border border-brand-900/10"><HelpCircle size={24} /></div>
            <h2 className="text-3xl md:text-4xl font-black text-brand-900 uppercase tracking-tighter">Your Compliance Questions Answered</h2>
            <p className="text-brand-900/60 mt-4 text-lg">Real-world compliance queries trending in South Africa (2026).</p>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl border border-brand-900/5 overflow-hidden">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-brand-900/5 last:border-0">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-8 py-6 text-left flex justify-between items-start gap-4 hover:bg-brand-50 transition-colors group">
                  <span className={`font-bold text-lg leading-tight ${openFaq === i ? 'text-brand-gold' : 'text-brand-900'}`}>{faq.q}</span>
                  <div className={`flex-shrink-0 mt-1 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                    {openFaq === i ? <ChevronUp className="text-brand-gold" size={20} /> : <ChevronDown className="text-brand-900/20 group-hover:text-brand-900" size={20} />}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-8 pb-8 text-brand-900/70 text-sm md:text-base border-l-4 border-brand-gold/20 ml-8 mb-6">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* 4. CTA */}
      <section className="py-24 bg-white text-center px-6 border-t border-brand-900/5">
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="mx-auto text-brand-gold mb-6" size={48} />
            <h2 className="text-4xl font-black text-brand-900 mb-6 uppercase tracking-tighter">Don't Wait for the Audit Letter.</h2>
            <p className="text-xl text-brand-900/60 mb-10 leading-relaxed">
              Secure your spot now to get your compliance mapped against the 2026 regulatory framework.
            </p>
            <Button 
              onClick={() => window.location.hash = '#assessment'}
              size="lg" 
              className="bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900 shadow-2xl uppercase"
            >
              Start Strategic Compliance Assessment
            </Button>
          </div>
        </RevealOnScroll>
      </section>

    </div>
  );
};

export default ComplianceCalendarPage;
