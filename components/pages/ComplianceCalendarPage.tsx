import React, { useState } from 'react';
import RevealOnScroll from '../RevealOnScroll';
import { ShieldCheck, AlertTriangle, Clock, Building2, User, Landmark, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../Button';
import BusinessTracker from '../BusinessTracker';

import { SCHEDULE, FAQS } from '../ComplianceCalendarData';

const ComplianceCalendarPage: React.FC = () => {
  const TREE_HERO_URL = 'https://res.cloudinary.com/dka0498ns/image/upload/f_auto,q_auto/v1772373342/Profuse_Beauty_Logo_Tree_z1nc3c.png';
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getDaysRemaining = (dateStr?: string) => {
    if (!dateStr) return null;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const due = new Date(dateStr);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

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
                    {monthGroup.deadlines.map((item: any, i: number) => {
                      const daysLeft = item.date ? getDaysRemaining(item.date) : null;
                      const isUrgent = daysLeft !== null && daysLeft >= 0 && daysLeft <= 30;

                      return (
                        <div key={i} className={`flex flex-col sm:flex-row gap-6 items-start sm:items-center p-4 rounded-3xl transition-all duration-300 ${
                          isUrgent ? 'border border-rose-500/20 bg-rose-500/[0.02] border-l-4 border-l-rose-500' : ''
                        }`}>
                          <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center border transition-colors ${
                            isUrgent 
                              ? 'bg-rose-50 border-rose-500 text-rose-600' 
                              : 'bg-brand-50 border-brand-900/10 text-brand-900 group-hover:border-brand-gold/50'
                          }`}>
                            <span className={`text-2xl font-black leading-none ${isUrgent ? 'text-rose-600' : 'text-brand-900'}`}>{item.day}</span>
                            <span className={`text-[10px] font-bold uppercase ${isUrgent ? 'text-rose-500/60' : 'text-brand-900/40'}`}>Day</span>
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${
                                item.risk === 'Critical' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                                item.risk === 'High' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                                'bg-emerald-50 text-emerald-600 border-emerald-200'
                              }`}>{item.risk} Priority</span>
                              <span className="text-[10px] font-bold text-brand-900/40 uppercase tracking-widest flex items-center gap-1">
                                {item.entity === 'Corporate' ? <Building2 size={10} /> : item.entity === 'Individuals' ? <User size={10} /> : <Landmark size={10} />}
                                {item.entity}
                              </span>
                              {isUrgent && (
                                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-rose-600 text-white border border-rose-600 animate-pulse flex items-center gap-1">
                                  <span className="w-1 h-1 rounded-full bg-white animate-ping"></span>
                                  {daysLeft === 0 ? 'DUE TODAY' : `Due in ${daysLeft} days`}
                                </span>
                              )}
                            </div>
                            <h4 className="text-lg font-bold text-brand-900">{item.task}</h4>
                            <p className="text-sm text-brand-900/60 mt-1">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
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
