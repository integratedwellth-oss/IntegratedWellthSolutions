import React, { useState } from 'react';
import RevealOnScroll from '../RevealOnScroll';
import { Calendar, ShieldCheck, AlertTriangle, Clock, FileText, Building2, User, Landmark, HelpCircle, ChevronDown, ChevronUp, Send, ArrowRight, Globe, Zap } from 'lucide-react';
import Button from '../Button';

const ComplianceCalendarPage: React.FC = () => {
  const TREE_HERO_URL = "https://res.cloudinary.com/dka0498ns/image/upload/f_auto,q_auto/v1772373342/Profuse_Beauty_Logo_Tree_z1nc3c.png";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // --- DATA: SCHEDULE (Kept for Summary) ---
  const SCHEDULE = [
    { month: "February 2026", deadlines: [{ day: "28", entity: "All Entities", task: "Provisional Tax (IRP6) - 2nd Period", risk: "High", desc: "Mandatory payment to avoid 10% penalty + interest." }, { day: "28", entity: "Individuals", task: "IT3(b) & IT3(c) Data Prep", risk: "Medium", desc: "Gather investment and interest certificates." }] },
    { month: "March 2026", deadlines: [{ day: "31", entity: "Corporate", task: "CIPC Annual Returns", risk: "Critical", desc: "Hard deadline to prevent deregistration process initiation." }, { day: "25", entity: "VAT Vendors", task: "VAT 201 Submission & Payment", risk: "High", desc: "Category B vendors (periods ending Feb)." }] },
    { month: "April 2026", deadlines: [{ day: "07", entity: "Employers", task: "EMP201 Submission", risk: "Medium", desc: "PAYE, SDL and UIF for March." }] },
    { month: "May 2026", deadlines: [{ day: "31", entity: "Employers", task: "EMP501 Interim Reconciliation", risk: "Critical", desc: "Bi-annual payroll reconciliation. Major audit trigger if incorrect." }, { day: "31", entity: "NPOs", task: "Section 18A Third Party Data", risk: "High", desc: "Submission of donor data to SARS." }] },
    { month: "June 2026", deadlines: [{ day: "30", entity: "Corporate", task: "Provisional Tax (IRP6) - 3rd Period", risk: "Medium", desc: "Voluntary top-up to avoid Section 89quat interest." }] },
    { month: "July 2026", deadlines: [{ day: "01", entity: "Individuals", task: "Tax Season Opens (Filing)", risk: "Low", desc: "2026 Filing season official open date." }] },
    { month: "August 2026", deadlines: [{ day: "31", entity: "Provisional Taxpayers", task: "Provisional Tax (IRP6) - 1st Period (2027)", risk: "High", desc: "First estimation for the 2027 tax year." }] }
  ];

  // --- DATA: NEW DETAILED SECTIONS ---
  const ComplianceGuide = () => (
    <div className="space-y-16">
      
      {/* SECTION 1: Regulatory Technology Paradigm */}
      <RevealOnScroll>
        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-brand-900/10">
          <div className="flex items-center gap-4 mb-6 text-brand-900/70">
            <Globe size={24} className="text-brand-gold" />
            <h3 className="text-2xl font-sora font-black uppercase tracking-tight">Introduction to the Regulatory Technology Paradigm</h3>
          </div>
          <div className="space-y-6 text-lg text-brand-900/80 leading-relaxed">
            <p>The landscape of South African compliance is no longer document-driven; it is data-driven. SARS and CIPC are leveraging advanced AI/ML technologies to cross-reference transactional data in real-time, moving beyond annual audits to continuous monitoring. This shift renders traditional, reactive compliance obsolete.</p>
            <p><strong>Our Approach:</strong> We employ **RegTech** principles to harmonize your data streams (accounting, payroll, digital footprints) *before* SARS triangulates discrepancies, ensuring preemptive alignment with evolving mandates.</p>
            
            <h4 className="text-xl font-bold text-brand-900 pt-4 border-t border-brand-900/10">Key Technological Shifts</h4>
            <ul className="space-y-3 list-none">
                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> **AI Profiling:** SARS uses machine learning to score risk based on your data velocity and patterns.</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> **Data Triangulation:** Integrating bank feeds, social media presence, and eFiling history.</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> **Automated Disclosure:** Compliance is shifting from 'submission' to 'instantaneous disclosure'.</li>
            </ul>
          </div>
        </div>
      </RevealOnScroll>

      {/* SECTION 2: Fiscal Adjustments and Tax Rates */}
      <RevealOnScroll delay={0.2}>
        <div className="bg-brand-900 text-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-white/10">
          <div className="flex items-center gap-4 mb-6 text-brand-gold">
            <Zap size={24} />
            <h3 className="text-2xl font-sora font-black uppercase tracking-tight">Fiscal Adjustments & The 2026 National Budget Impact</h3>
          </div>
          <p className="text-brand-100/80 mb-8 text-lg font-light">The 2026 Budget introduced critical changes impacting cash flow projections and personal asset protection.</p>
          
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white border-b border-brand-gold/30 pb-2">VAT Threshold Revision</h4>
            <p className="text-white/70">The most significant change for SMEs is the **compulsory VAT registration threshold increase to R2.3 Million** (from R1 Million) effective April 1, 2026. This creates a compliance window for smaller businesses to deregister and preserve cash flow.</p>

            <h4 className="text-xl font-bold text-white border-b border-brand-gold/30 pb-2">Two-Pot System Implications</h4>
            <p className="text-white/70">Withdrawals from the 'Savings Pot' are taxed at marginal income rates. Furthermore, SARS's enhanced authority allows for automatic debt recovery directly from withdrawal amounts before funds reach the taxpayer.</p>
            
            <div className="mt-8 bg-black/50 p-6 rounded-2xl border border-brand-gold/20 shadow-inner">
                <h5 className="text-sm font-bold text-brand-gold uppercase mb-3">Key Action Item: Re-assess Tax Residency Status</h5>
                <p className="text-sm text-white/70">Changes to the **Expatriate Tax Rules (Section 9H)** demand immediate re-verification of tax residency status for business owners with international dealings.</p>
            </div>
          </div>
        </div>
      </RevealOnScroll>
      
      {/* SECTION 3: Statutory Deadline Engine (Detailed Table) */}
      <section className="py-20">
        <RevealOnScroll delay={0.1}>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-brand-900 uppercase tracking-tight mb-4">The Statutory Deadline Engine</h2>
                <p className="text-lg text-brand-900/60">Visualizing Immediate Action Tasks for Q1/Q2 2026.</p>
            </div>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-brand-900/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-900 text-white text-xs uppercase tracking-widest">
                  <th className="p-4 rounded-tl-2xl">Obligation</th>
                  <th className="p-4">Due Date (2026)</th>
                  <th className="p-4">Client Type</th>
                  <th className="p-4">Impact of Failure</th>
                  <th className="p-4 rounded-tr-2xl">Strategic Pillar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Data based on WarRoom/ComplianceTracker milestones */}
                <tr className="hover:bg-brand-50 transition-colors">
                  <td className="p-4 font-bold text-brand-900">Trust Tax Return (ITR12T)</td>
                  <td className="p-4 font-mono text-sm text-rose-600">19 Jan</td>
                  <td className="p-4 text-sm">High-Net-Worth Individuals</td>
                  <td className="p-4 text-sm text-rose-600 font-bold">Compounding Penalties</td>
                  <td className="p-4 text-xs text-brand-gold">Gap Audit</td>
                </tr>
                <tr className="hover:bg-brand-50 transition-colors">
                  <td className="p-4 font-bold text-brand-900">VAT Period 02/2026</td>
                  <td className="p-4 font-mono text-sm text-brand-gold">25 Mar</td>
                  <td className="p-4 text-sm">Corporate</td>
                  <td className="p-4 text-sm text-orange-600 font-bold">Cash Flow Impact</td>
                  <td className="p-4 text-xs text-brand-900/60">Liquidity Lock-Down</td>
                </tr>
                <tr className="hover:bg-brand-50 transition-colors">
                  <td className="p-4 font-bold text-brand-900">Provisional Tax (IRP6)</td>
                  <td className="p-4 font-mono text-sm text-rose-600">28 Feb</td>
                  <td className="p-4 text-sm">All Taxpayers</td>
                  <td className="p-4 text-sm text-rose-600 font-bold">Underestimation Penalty (20%)</td>
                  <td className="p-4 text-xs text-brand-gold">Liquidity Lock-Down</td>
                </tr>
                <tr className="hover:bg-brand-50 transition-colors">
                  <td className="p-4 font-bold text-brand-900">CIPC Annual Returns</td>
                  <td className="p-4 font-mono text-sm text-rose-600">31 Mar</td>
                  <td className="p-4 text-sm">Corporate Entities</td>
                  <td className="p-4 text-sm text-rose-600 font-bold">Risk of Deregistration</td>
                  <td className="p-4 text-xs text-brand-900/60">Tactical Accountability</td>
                </tr>
              </tbody>
            </table>
          </div>
        </RevealOnScroll>
      </section>

      {/* SECTION 4: CIPC Protocols */}
      <section className="py-20 bg-brand-900/10">
        <RevealOnScroll delay={0.1}>
          <div className="max-w-5xl mx-auto">
            <div className="p-10 bg-white rounded-[2.5rem] shadow-xl border border-brand-gold/20">
              <div className="flex items-center gap-4 mb-6">
                <Building2 size={28} className="text-brand-gold" />
                <h3 className="text-3xl font-sora font-black uppercase tracking-tight text-brand-900">Corporate Governance & CIPC Protocols</h3>
              </div>
              <p className="text-lg text-brand-900/70 mb-8">The CIPC is non-negotiable. Non-compliance blocks annual filings and triggers automatic asset freezing protocols under certain conditions.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-brand-50 border border-brand-900/10 shadow-md">
                  <h4 className="font-bold text-brand-900 mb-2">BO Declaration</h4>
                  <p className="text-sm text-brand-900/70">Must be filed BEFORE the Annual Return. Filing is blocked otherwise.</p>
                </div>
                <div className="p-6 rounded-2xl bg-brand-50 border border-brand-900/10 shadow-md">
                  <h4 className="font-bold text-brand-900 mb-2">Digital Authority</h4>
                  <p className="text-sm text-brand-900/70">Use the CIPC Optimized System for simplified online structure registration.</p>
                </div>
                <div className="p-6 rounded-2xl bg-brand-50 border border-brand-900/10 shadow-md">
                  <h4 className="font-bold text-brand-900 mb-2">Asset Freeze Risk</h4>
                  <p className="text-sm text-brand-900/70">Failure to file for 2 consecutive years may place the company in 'Deregistration in process' status.</p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
      
      {/* 5. FAQ SECTION (Re-using styles from previous request) */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-50 rounded-full text-brand-900 mb-4 border border-brand-900/10">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-brand-900 uppercase tracking-tighter">Your Compliance Questions Answered</h2>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl border border-brand-900/5 overflow-hidden">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-brand-900/5 last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 text-left flex justify-between items-start gap-4 hover:bg-brand-50 transition-colors group"
                >
                  <span className={`font-bold text-lg leading-tight text-brand-900 group-hover:text-brand-gold transition-colors ${openFaq === i ? 'text-brand-gold' : ''}`}>
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 mt-1 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                    {openFaq === i ? <ChevronUp className="text-brand-gold" size={20} /> : <ChevronDown className="text-brand-900/20 group-hover:text-brand-900" size={20} />}
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-8 pb-8 text-brand-900/70 text-sm md:text-base border-l-4 border-brand-gold/20 ml-8 mb-6">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* 5. FINAL CTA */}
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
              className="bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900 shadow-2xl"
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
