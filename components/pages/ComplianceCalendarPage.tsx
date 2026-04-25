import React, { useState } from 'react';
import RevealOnScroll from '../RevealOnScroll';
import { ShieldCheck, AlertTriangle, Clock, Building2, User, Landmark, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../Button';
import BusinessTracker from '../BusinessTracker';

const SCHEDULE = [
  { month: 'May 2026', deadlines: [
    { day: '31', entity: 'Employers', task: 'EMP501 Interim Reconciliation', risk: 'Critical', desc: 'Bi-annual payroll reconciliation. Major audit trigger if incorrect.' },
    { day: '31', entity: 'NPOs', task: 'Section 18A Third Party Data', risk: 'High', desc: 'Submission of donor data to SARS.' },
  ]},
  { month: 'June 2026', deadlines: [
    { day: '30', entity: 'Corporate', task: 'Provisional Tax (IRP6) 3rd Period', risk: 'Medium', desc: 'Voluntary top-up to avoid Section 89quat interest.' },
  ]},
  { month: 'July 2026', deadlines: [
    { day: '01', entity: 'Individuals', task: 'Tax Season Opens (Filing)', risk: 'Low', desc: '2026 Filing season official open date.' },
  ]},
  { month: 'August 2026', deadlines: [
    { day: '31', entity: 'Provisional Taxpayers', task: 'Provisional Tax (IRP6) 1st Period (2027)', risk: 'High', desc: 'First estimation for the 2027 tax year.' },
  ]},
  { month: 'October 2026', deadlines: [
    { day: '23', entity: 'Individuals (Non-Provisional)', task: 'ITR12 – eFiling Deadline', risk: 'Critical', desc: 'Final deadline for non-provisional individual taxpayers filing via eFiling.' },
  ]},
  { month: 'November 2026', deadlines: [
    { day: '30', entity: 'Employers', task: 'EMP501 Annual Reconciliation', risk: 'Critical', desc: 'Second bi-annual payroll reconciliation. Discrepancies trigger assessments.' },
  ]},
];

const FAQS = [
  { q: 'How will the 2026 VAT threshold increase affect my small business?', a: 'Effective 1 April 2026, the compulsory VAT registration threshold increases from R1 million to R2.3 million. If your rolling 12-month turnover sits below this threshold, you may apply for VAT deregistration — reducing your monthly admin and cash-flow burden. The voluntary registration threshold also increased from R50,000 to R120,000.' },
  { q: 'Why is my SARS eFiling status showing Pending instead of Submitted?', a: 'A Pending status means SARS is verifying your registration details (2–21 working days) or awaiting supporting documentation. A Processing status means your return has been flagged for audit or verification, which can take up to 21 business days for a standard check or 90 days for a full audit.' },
  { q: 'Can I file my CIPC Annual Return without a Beneficial Ownership declaration?', a: 'No. The CIPC enforces a hard-stop: you cannot file your Annual Return unless your Beneficial Ownership declaration is up to date. For simpler entities, the CIPC Optimised System allows a simplified securities register to be completed online without uploading physical mandate documents.' },
  { q: 'I am a social media influencer. Does SARS track my income?', a: 'Yes. Under its Modernisation 3.0 framework, SARS uses AI and data-driven insights to profile risk with a specific focus on the gig and social media economies. Influencer income is taxed as that of an independent contractor or sole proprietor and must be declared at your marginal rate.' },
  { q: 'What happens if I miss a provisional tax deadline?', a: 'Missing the first or second provisional tax period attracts a 10% penalty on the underpayment, plus interest at the prescribed rate. If your estimate is more than 20% below the basic amount, SARS may impose additional underestimation penalties. Timely submission with a reasonable estimate is critical.' },
];

const ComplianceCalendarPage: React.FC = () => {
  const TREE_HERO_URL = 'https://res.cloudinary.com/dka0498ns/image/upload/f_auto,q_auto/v1772373342/Profuse_Beauty_Logo_Tree_z1nc3c.png';
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-slate-50 font-sans text-brand-900 selection:bg-brand-gold selection:text-brand-900 pb-20">

      <section className="relative h-[55vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-brand-900 border-b-4 border-brand-gold">
        <div className="absolute inset-0 z-0">
          <img src={TREE_HERO_URL} alt="Growth Ecosystem" className="w-full h-full object-cover opacity-20 mix-blend-overlay scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/50 to-slate-50"></div>
        </div>
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto z-10 relative mt-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 mb-6 backdrop-blur-md">
              <ShieldCheck size={14} className="text-brand-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">Statutory Governance</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter mb-6 leading-[1] text-white">
              2026 COMPLIANCE <br /><span className="text-brand-gold">CALENDAR.</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
              The definitive operational timeline for South African entities. Missed deadlines are the silent killers of wealth.
            </p>
          </div>
        </RevealOnScroll>
      </section>

      <BusinessTracker />

      <section className="py-4 px-6 max-w-7xl mx-auto relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-brand-900/5 overflow-hidden">
          <div className="p-8 md:p-12 bg-brand-900 text-white flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold font-sora mb-2">Master Schedule</h2>
              <p className="text-brand-gold text-sm font-bold uppercase tracking-widest">Fiscal Year 2026 / 2027</p>
            </div>
            <Clock className="text-brand-gold opacity-50" size={48} />
          </div>
          <div className="divide-y divide-gray-100">
            {SCHEDULE.map((monthGroup: any, idx: number) => (
              <div key={idx} className="p-8 md:p-10 hover:bg-gray-50 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="md:w-1/4">
                    <h3 className="text-2xl font-black text-brand-900 uppercase tracking-tight">{monthGroup.month}</h3>
                  </div>
                  <div className="md:w-3/4 space-y-6">
                    {monthGroup.deadlines.map((item: any, i: number) => (
                      <div key={i} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        <div className="flex-shrink-0 w-16 h-16 bg-brand-50 rounded-2xl flex flex-col items-center justify-center border border-brand-900/10 group-hover:border-brand-gold/50 transition-colors">
                          <span className="text-2xl font-black text-brand-900 leading-none">{item.day}</span>
                          <span className="text-[10px] font-bold uppercase text-brand-900/40">Day</span>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${
                              item.risk === 'Critical' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                              item.risk === 'High' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                              'bg-emerald-50 text-emerald-600 border-emerald-200'
                            }`}>{item.risk} Priority</span>
                            <span className="text-[10px] font-bold text-brand-900/40 uppercase tracking-widest flex items-center gap-1">
                              {item.entity === 'Corporate' ? <Building2 size={10} /> : item.entity === 'Individuals' ? <User size={10} /> : <Landmark size={10} />}
                              {item.entity}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-brand-900">{item.task}</h4>
                          <p className="text-sm text-brand-900/60 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-5xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-50 rounded-full text-brand-900 mb-4 border border-brand-900/10">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-brand-900 uppercase tracking-tighter">Frequently Asked Questions</h2>
            <p className="text-brand-900/60 mt-4 text-lg">Real-world compliance queries trending in South Africa (2026).</p>
          </div>
          <div className="bg-white rounded-[2rem] shadow-xl border border-brand-900/5 overflow-hidden">
            {FAQS.map((faq: any, i: number) => (
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

      <section className="py-24 bg-white text-center px-6 border-t border-brand-900/5">
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="mx-auto text-brand-gold mb-6" size={48} />
            <h2 className="text-4xl font-black text-brand-900 mb-6 uppercase tracking-tighter">Need a Sovereign Compliance Timeline?</h2>
            <p className="text-xl text-brand-900/60 mb-10 leading-relaxed">
              Add your businesses above to get personalised 30-day reminders, or book a full compliance assessment with our team today.
            </p>
            <Button onClick={() => window.location.hash = '#assessment'} size="lg" className="bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900 shadow-2xl uppercase">
              Start Strategic Compliance Assessment
            </Button>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
};

export default ComplianceCalendarPage;
