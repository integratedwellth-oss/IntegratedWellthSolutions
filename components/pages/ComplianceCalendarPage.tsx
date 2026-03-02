import React, { useState } from 'react';
import RevealOnScroll from '../RevealOnScroll';
import { Calendar, ShieldCheck, AlertTriangle, Clock, Building2, User, Landmark, HelpCircle, ChevronDown, ChevronUp, ChevronRight, CheckCircle2, Globe, Zap, Scale, LineChart, Cpu, FileText } from 'lucide-react';
import Button from '../Button';

const ComplianceCalendarPage: React.FC = () => {
  const TREE_HERO_URL = "https://res.cloudinary.com/dka0498ns/image/upload/f_auto,q_auto/v1772373342/Profuse_Beauty_Logo_Tree_z1nc3c.png";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // High-Level Summary for Visual Schedule Grid
  const SCHEDULE = [
    { month: "February 2026", deadlines: [{ day: "28", entity: "All Entities", task: "Provisional Tax (IRP6) 2nd Period", risk: "High", desc: "Mandatory payment to avoid 10% penalty plus interest." }, { day: "28", entity: "Individuals", task: "IT3(b) & IT3(c) Data Prep", risk: "Medium", desc: "Gather investment and interest certificates." }] },
    { month: "March 2026", deadlines: [{ day: "31", entity: "Corporate", task: "CIPC Annual Returns", risk: "Critical", desc: "Hard deadline to prevent deregistration process initiation." }, { day: "25", entity: "VAT Vendors", task: "VAT 201 Submission & Payment", risk: "High", desc: "Category B vendors (periods ending Feb)." }] },
    { month: "April 2026", deadlines: [{ day: "07", entity: "Employers", task: "EMP201 Submission", risk: "Medium", desc: "PAYE, SDL and UIF for March." }] },
    { month: "May 2026", deadlines: [{ day: "31", entity: "Employers", task: "EMP501 Interim Reconciliation", risk: "Critical", desc: "Bi-annual payroll reconciliation. Major audit trigger if incorrect." }, { day: "31", entity: "NPOs", task: "Section 18A Third Party Data", risk: "High", desc: "Submission of donor data to SARS." }] },
    { month: "June 2026", deadlines: [{ day: "30", entity: "Corporate", task: "Provisional Tax (IRP6) 3rd Period", risk: "Medium", desc: "Voluntary top-up to avoid Section 89quat interest." }] },
    { month: "July 2026", deadlines: [{ day: "01", entity: "Individuals", task: "Tax Season Opens (Filing)", risk: "Low", desc: "2026 Filing season official open date." }] },
    { month: "August 2026", deadlines: [{ day: "31", entity: "Provisional Taxpayers", task: "Provisional Tax (IRP6) 1st Period (2027)", risk: "High", desc: "First estimation for the 2027 tax year." }] }
  ];

  const FAQS = [
    {
      q: "How will the 2026 VAT threshold increase affect my small business?",
      a: "Effective 1 April 2026, the compulsory VAT registration threshold significantly increases from R1 million to R2.3 million. If your business's 12-month rolling turnover sits below this new threshold, you are legally entitled to apply for VAT deregistration, which can greatly reduce your monthly administrative and cash-flow burdens. Additionally, the voluntary VAT registration threshold has been increased from R50,000 to R120,000."
    },
    {
      q: "Why is my SARS eFiling status showing Pending or Processing instead of Submitted, and why is my refund delayed?",
      a: "In the eFiling ecosystem, a Pending status generally means that SARS is verifying your registration details (which can take 2 to 21 working days) or awaiting the upload of supporting documentation. Processing (or In Progress) indicates that your return has been flagged for audit or verification; this process can take up to 21 business days for a standard verification or up to 90 business days for a full audit. If you are owed a refund, SARS typically aims to pay it within 72 hours after the audit or verification is successfully finalized, provided your banking details are correct and you have no other outstanding tax debt."
    },
    {
      q: "Why was a portion of my Two-Pot Retirement System savings withdrawal taken by SARS?",
      a: "The Two-Pot retirement system rules dictate that any withdrawals made from your savings pot prior to retirement are taxed at your marginal income tax rate. Furthermore, if you have an outstanding tax debt with SARS, the revenue authority will instruct your retirement fund to automatically deduct the owed debt amount from your withdrawal and pay it directly to SARS before releasing the remaining balance to you."
    },
    {
      q: "I am a social media influencer. Does SARS track my income, and are they really using AI to do so?",
      a: "Yes. Under its Modernisation 3.0 framework, SARS utilizes artificial intelligence and data-driven insights to profile risk and detect non-compliance, with a specific, publicly stated focus on individuals earning income in the gig and social media economies. SARS views social influencers as independent contractors or sole proprietors who must declare their earnings, which are then taxed according to the standard personal income tax brackets."
    },
    {
      q: "Can I file my CIPC Annual Return without submitting a Beneficial Ownership (BO) declaration?",
      a: "No. The CIPC strictly enforces a hard-stop functionality. This means you will be completely blocked from filing your Annual Return on the CIPC platforms unless your Beneficial Ownership declaration has been filed and is up to date for that calendar year. For smaller entities without complex ownership structures, the CIPC has rolled out an Optimised System that allows you to complete a simplified securities register online without the need to upload physical mandate documents."
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
            className="w-full h-full object-cover opacity-20 mix-blend-overlay scale-105"
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
              2026 COMPLIANCE <br/><span className="text-brand-gold">CALENDAR.</span>
            </h1>
            <p className="text-xl text-brand-900/70 max-w-2xl mx-auto font-medium leading-relaxed">
              The definitive operational timeline for South African entities. Missed deadlines are the silent killers of wealth.
            </p>
          </div>
        </RevealOnScroll>
      </section>

      {/* 2. THE SCHEDULE GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto -mt-20 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-brand-900/5 overflow-hidden">
          <div className="p-8 md:p-12 bg-brand-900 text-white flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold font-sora mb-2">Master Schedule</h2>
              <p className="text-brand-gold text-sm font-bold uppercase tracking-widest">Fiscal Year 2026/2027</p>
            </div>
            <Clock className="text-brand-gold opacity-50" size={48} />
          </div>

          <div className="divide-y divide-gray-100">
            {SCHEDULE.map((monthGroup, idx) => (
              <div key={idx} className="p-8 md:p-10 hover:bg-gray-50 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="md:w-1/4">
                    <h3 className="text-2xl font-black text-brand-900 uppercase tracking-tight">{monthGroup.month}</h3>
                  </div>
                  <div className="md:w-3/4 space-y-6">
                    {monthGroup.deadlines.map((item, i) => (
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
                            }`}>
                              {item.risk} Priority
                            </span>
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

      {/* 3. DETAILED REPORT SECTIONS */}
      <section className="py-20 px-6 max-w-5xl mx-auto space-y-16">

        {/* Section 1: Regulatory Technology Paradigm */}
        <RevealOnScroll>
          <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-brand-900/10">
            <div className="flex items-center gap-4 mb-8">
              <Globe size={32} className="text-brand-gold" />
              <h2 className="text-3xl font-sora font-black text-brand-900 tracking-tight uppercase">Introduction to the Regulatory Technology Paradigm</h2>
            </div>
            <div className="space-y-6 text-lg text-brand-900/80 leading-relaxed font-medium">
              <p>The South African regulatory and fiscal landscape in 2026 presents an inherently complex, interconnected matrix of compliance obligations that span corporate governance, direct and indirect taxation, and labour statutory requirements. For corporate entities, fiduciary agents, and independent tax practitioners, the margin for administrative error has been systematically eradicated through the aggressive digitization of government service portals. Entities must now navigate a rapidly evolving technological ecosystem that encompasses the modernized South African Revenue Service (SARS) eFiling platform, the Companies and Intellectual Property Commission (CIPC) BizPortal, and the Department of Employment and Labour's digital reporting systems.1</p>
              <p>To effectively mitigate the risks of administrative penalties, operational paralysis, and deregistration, the deployment of a dedicated <strong>Compliance Calendar</strong> widget represents a critical evolution in Regulatory Technology (RegTech) design. The theoretical widget proposed in this report relies on two foundational pillars to keep clients perpetually ahead of their obligations. The first pillar is the <strong>Upcoming Deadlines</strong> module, which utilizes clear, color-coded alerts to flag immediate, statutory tasks such as Value-Added Tax (VAT) submissions, provisional tax payments, and annual corporate returns. The second pillar is the <strong>Filing Status</strong> taxonomy, which programmatically translates highly opaque backend government application programming interface (API) response codes into intuitive <strong>Pending</strong>, <strong>Processing</strong>, and <strong>Submitted</strong> badges, thereby providing clients with absolute certainty regarding the lifecycle of their statutory submissions.</p>
              <p>By synthesizing official 2026 data, including the February 2026 National Budget Speech adjustments, updated CIPC Beneficial Ownership regulations, and newly implemented Independent Software Vendor (ISV) technical interface specifications, this comprehensive research report provides an authoritative framework for understanding and automating South African compliance. The subsequent sections will exhaustively detail the underlying software architecture, the specific statutory deadlines, the underlying fiscal calculation logic, and the user interface mapping required to operationalize this tool for the South African market.</p>
              
              <h3 className="text-2xl font-bold text-brand-900 pt-6">Architectural Framework and API Interoperability</h3>
              <p>To successfully deploy a dynamic Compliance Calendar widget, the underlying software architecture must interface directly with government databases through secure, authenticated, and highly structured digital channels. The South African government has increasingly adopted Service Oriented Architecture (SOA) and RESTful Web Services to facilitate this sophisticated machine-to-machine communication.3 The days of manual data capture and localized spreadsheets have been entirely superseded by direct data flow systems.</p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Section 2: Fiscal Adjustments and Tax Rates */}
        <RevealOnScroll>
          <div className="bg-brand-900 text-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <Zap size={32} className="text-brand-gold" />
              <h2 className="text-3xl font-sora font-black tracking-tight uppercase text-white">Fiscal Adjustments and Tax Rates: The 2026 National Budget Impact</h2>
            </div>
            <div className="space-y-6 text-lg text-brand-100/80 leading-relaxed font-light">
              <p>The underlying logic of any predictive compliance calendar must be dynamically updated to reflect prevailing legislative rates. The 2026 National Budget Speech, delivered by Finance Minister Enoch Godongwana on 25 February 2026, introduced critical fiscal adjustments that fundamentally alter the calculation engines embedded within tax forecasting software.15</p>
              <p>Entering the 2026 fiscal cycle, there were widespread concerns that the government would implement R20 billion in previously proposed tax increases to offset sluggish economic growth and rising debt-service costs.17 However, due to marginally improving fiscal metrics and a strategic desire to protect disposable household income, the National Treasury officially withdrew the R20 billion tax hike, opting instead to provide inflation-linked relief.17 The compliance widget's underlying calculation matrix must therefore incorporate a 3.4% upward adjustment across all personal income tax brackets.15</p>
              
              <h3 className="text-2xl font-bold text-white pt-6 border-b border-brand-gold/30 pb-2">Personal Income Tax (1 March 2026 to 28 February 2027)</h3>
              <p>The entry threshold for individual income tax has been explicitly elevated to combat the economic phenomenon of bracket creep.18 For individuals under the age of 65, the tax threshold increases to R99,000 (up from the previous R95,750).15 For individuals aged 65 to 74, the threshold rises to R153,250, and for those aged 75 and over, it is set at R171,300.15</p>
              <p>The widget's backend must calculate estimated tax liabilities based on the following statutory tax brackets for the 2026/2027 tax year:</p>

              {/* Table 1 */}
              <div className="overflow-hidden rounded-xl border border-white/20 shadow-xl my-8">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-black/40 text-brand-gold text-xs uppercase tracking-widest">
                    <tr>
                      <th className="p-4 border-b border-white/10">Taxable Income Band (ZAR)</th>
                      <th className="p-4 border-b border-white/10">Rate of Tax Applicable for 2026/2027</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/5 divide-y divide-white/10 text-sm font-medium">
                    <tr className="hover:bg-white/10">
                      <td className="p-4 font-mono">1 – 245,100</td>
                      <td className="p-4">18% of taxable income 16</td>
                    </tr>
                    <tr className="hover:bg-white/10">
                      <td className="p-4 font-mono">245,101 – 383,100</td>
                      <td className="p-4">R44,118 + 26% of taxable income above R245,100 16</td>
                    </tr>
                    <tr className="hover:bg-white/10">
                      <td className="p-4 font-mono">383,101 – 530,200</td>
                      <td className="p-4">R79,998 + 31% of taxable income above R383,100 16</td>
                    </tr>
                    <tr className="hover:bg-white/10">
                      <td className="p-4 font-mono">530,201 – 695,800</td>
                      <td className="p-4">R125,599 + 36% of taxable income above R530,200 16</td>
                    </tr>
                    <tr className="hover:bg-white/10">
                      <td className="p-4 font-mono">695,801 – 887,000</td>
                      <td className="p-4">R185,215 + 39% of taxable income above R695,800 16</td>
                    </tr>
                    <tr className="hover:bg-white/10">
                      <td className="p-4 font-mono">887,001 – 1,878,600</td>
                      <td className="p-4">R259,783 + 41% of taxable income above R887,000 16</td>
                    </tr>
                    <tr className="bg-brand-gold/20">
                      <td className="p-4 font-mono font-bold text-white">1,878,601 and above</td>
                      <td className="p-4 font-bold text-white">R666,339 + 45% of taxable income above R1,878,600 16</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>The top marginal rate of 45% now applies only to taxable income exceeding R1,878,600, a slight elevation from the prior threshold.15 Furthermore, the widget's payroll algorithms must reflect the enhancement of the Medical Scheme Fees Tax Credit, which has been increased to R376 per month for the primary member and the first dependent, and R254 for each subsequent dependent.15</p>
              <p>Wealth transfer and capital gains parameters were similarly softened in 2026 to stimulate investment. The primary residence exclusion was raised to R3 million, the annual capital gains exclusion lifted to R50,000, and the annual donations tax exemption bumped to R150,000.25 Notably, the annual tax-free investment contribution limit also saw a significant enhancement, rising from R36,000 to R46,000.18</p>

              <h3 className="text-2xl font-bold text-white pt-6 border-b border-brand-gold/30 pb-2">Corporate, Small Business, and Turnover Taxes</h3>
              <p>Standard corporate entities remain subject to a flat tax rate of 27% on taxable income for years of assessment ending between 1 April 2026 and 31 March 2027.21 However, the Compliance Calendar must programmatically segment Small Business Corporations (SBCs) and Micro Businesses, applying alternative algorithmic logic to these specific entities to prevent over-estimation of tax liabilities.</p>
              <p>One of the most consequential strategic shifts in the 2026 Budget was the decisive increase of the compulsory VAT registration threshold from R1 million to R2.3 million.18 This regulatory shift removes thousands of micro-enterprises from the mandatory VAT net, alleviating immense administrative friction. Consequently, the compliance widget must monitor an entity's rolling 12-month turnover 19; if the projected turnover falls below R2.3 million, the widget should suppress standard VAT alerts and recommend deregistration or a transition to the simplified Turnover Tax regime, if appropriate.</p>
              <p>For qualifying SBCs, the graduated tax rates provide significant, structured relief:</p>

              {/* Table 2 */}
              <div className="overflow-hidden rounded-xl border border-white/20 shadow-xl my-8">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-black/40 text-brand-gold text-xs uppercase tracking-widest">
                    <tr>
                      <th className="p-4 border-b border-white/10">SBC Taxable Income (ZAR)</th>
                      <th className="p-4 border-b border-white/10">Rate of Tax Applicable for 2026/2027</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/5 divide-y divide-white/10 text-sm font-medium">
                    <tr className="hover:bg-white/10">
                      <td className="p-4 font-mono">1 – 99,000</td>
                      <td className="p-4">0% of taxable income 15</td>
                    </tr>
                    <tr className="hover:bg-white/10">
                      <td className="p-4 font-mono">99,001 – 365,000</td>
                      <td className="p-4">7% of taxable income above R99,000 15</td>
                    </tr>
                    <tr className="hover:bg-white/10">
                      <td className="p-4 font-mono">365,001 – 550,000</td>
                      <td className="p-4">R18,620 + 21% of taxable income above R365,000 15</td>
                    </tr>
                    <tr className="bg-brand-gold/20">
                      <td className="p-4 font-mono font-bold text-white">550,001 and above</td>
                      <td className="p-4 font-bold text-white">R57,470 + 27% of the amount above R550,000 15</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>Similarly, for Micro Businesses registered under the highly simplified Turnover Tax regime, the rates range from 0% on the first R600,000 of taxable turnover, scaling gradually to a maximum of R12,500 plus 3% for turnover exceeding R1.4 million.21</p>

              <h3 className="text-2xl font-bold text-white pt-6 border-b border-brand-gold/30 pb-2">Indirect Taxes and Levies</h3>
              <p>While indirect levies do not always require discrete filing by the end-user corporate entity, their continuous tracking is crucial for accurate cost-forecasting functions within the widget. The 2026 Budget instituted a 7 cents per litre increase in the Road Accident Fund (RAF) levy for both petrol and diesel, raising the levy from R2.18 to R2.25.20 The general fuel levy increased by 9 cents on petrol and 8 cents on diesel.20 The Carbon Tax on Fuel was increased by 5 cents per litre for petrol and 6 cents per litre for diesel, alongside a broader 3.39% hike in excise duties on alcoholic beverages, tobacco products, and notably, electronic nicotine and non-nicotine delivery systems (vaping products).20</p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Section 3: Statutory Deadline Engine */}
        <RevealOnScroll>
          <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-brand-900/10">
            <div className="flex items-center gap-4 mb-8">
              <Calendar size={32} className="text-brand-gold" />
              <h2 className="text-3xl font-sora font-black text-brand-900 tracking-tight uppercase">The Statutory Deadline Engine: Visualizing Immediate Action Tasks</h2>
            </div>
            <div className="space-y-6 text-lg text-brand-900/80 leading-relaxed font-medium">
              <p>The core utility of the Compliance Calendar widget lies in its capacity to accurately forecast and alert users to impending statutory deadlines. The user interface must employ a color-coded hierarchy—<strong>Red</strong> for immediate/overdue actions, <strong>Amber</strong> for approaching deadlines, and <strong>Green</strong> for compliant or distant tasks—to manage the complex chronology of the 2026 and 2027 tax years.</p>
              
              <h3 className="text-2xl font-bold text-brand-900 pt-6 border-b border-brand-900/10 pb-2">Provisional Tax Obligations</h3>
              <p>Provisional taxation is an anti-avoidance mechanism designed to smooth the tax collection process for individuals and entities earning income other than standard PAYE remuneration. Individuals become provisional taxpayers if they derive income from active business operations, or if their total taxable income from passive sources (interest, dividends, and rentals) exceeds R30,000 annually, provided their total taxable income breaches the prevailing tax threshold.22</p>
              <p>The compliance widget must programmatically generate <strong>Amber</strong> alerts thirty days prior, and <strong>Red</strong> alerts seven days prior, to the following critical provisional tax nodes for the 2026 and 2027 tax years:</p>

              {/* Table 3 */}
              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md my-8">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-brand-900 text-white text-xs uppercase tracking-widest">
                    <tr>
                      <th className="p-4 border-b border-gray-200">Tax Year</th>
                      <th className="p-4 border-b border-gray-200">First Provisional Return (Period 1)</th>
                      <th className="p-4 border-b border-gray-200">Second Provisional Return (Period 2)</th>
                      <th className="p-4 border-b border-gray-200">Voluntary Top-Up Payment (Period 3)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-brand-900">2026 Tax Year</td>
                      <td className="p-4">31 August 2025 22</td>
                      <td className="p-4">27 February 2026 22</td>
                      <td className="p-4">30 September 2026 22</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-brand-900">2027 Tax Year</td>
                      <td className="p-4">28 August 2026 22</td>
                      <td className="p-4">27 February 2027 22</td>
                      <td className="p-4">30 September 2027 22</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>Failure to accurately estimate taxable income (incorporating all income minus business-related expenses) and submit these IRP6 returns timeously results in severe administrative under-estimation penalties.22</p>
              <p>Furthermore, for non-provisional and provisional taxpayers alike, the final deadline for submitting the annual Personal Income Tax (PIT) and Trust Income Tax (ITR12 and ITR12T) returns for the preceding year of assessment falls on 19 January 2026.19 The compliance calendar must flag this date distinctly across all relevant client portfolios, emphasizing the available submission channels such as the SARS MobiApp, eFiling, or branch appointments via eBooking.28 The SARS MobiApp has evolved significantly by 2026, offering functionalities such as a Two-Pot Retirement System Calculator, biometric authentication, and branch waiting-queue time estimations.30</p>

              <h3 className="text-2xl font-bold text-brand-900 pt-6 border-b border-brand-900/10 pb-2">High-Frequency Monthly Tax and Customs Declarations</h3>
              <p>Beyond biannual provisional submissions, the widget must manage high-frequency, monthly obligations. Using February 2026 as a demonstrative baseline, the statutory timeline dictates specific recurring filing days that must trigger localized widget notifications:</p>

              {/* Table 4 */}
              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md my-8">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-brand-900 text-white text-xs uppercase tracking-widest">
                    <tr>
                      <th className="p-4 border-b border-gray-200">Event Description</th>
                      <th className="p-4 border-b border-gray-200">Statutory Deadline (Example: Feb 2026)</th>
                      <th className="p-4 border-b border-gray-200">Modality / Mechanism</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-brand-900">PAYE, SDL, and UIF Submissions</td>
                      <td className="p-4 font-mono text-rose-600 font-bold">6 February 2026 27</td>
                      <td className="p-4">EMP201 submission via eFiling / ISV 27</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-brand-900">Customs Declarations</td>
                      <td className="p-4 font-mono text-rose-600 font-bold">6 February 2026 27</td>
                      <td className="p-4">Direct EDI or Customs System 27</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-brand-900">VAT Manual Submissions</td>
                      <td className="p-4 font-mono text-rose-600 font-bold">25 February 2026 27</td>
                      <td className="p-4">Over-the-counter payments 27</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-brand-900">Excise Duty Payments</td>
                      <td className="p-4 font-mono text-rose-600 font-bold">26 February 2026 27</td>
                      <td className="p-4">Electronic Funds Transfer / Branch 27</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-brand-900">VAT Electronic Submissions</td>
                      <td className="p-4 font-mono text-rose-600 font-bold">27 February 2026 27</td>
                      <td className="p-4">Last business day via eFiling 27</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-brand-900">Corporate/Personal Provisional Tax</td>
                      <td className="p-4 font-mono text-rose-600 font-bold">27 February 2026 27</td>
                      <td className="p-4">IRP6 electronic submission 27</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-brand-900 pt-6 border-b border-brand-900/10 pb-2">Employer Interim and Annual Reconciliations (EMP501)</h3>
              <p>Employers face a dual reconciliation burden, requiring the submission of the Employer Reconciliation Declaration (EMP501), corresponding employee tax certificates (IRP5/IT3a), and the reconciliation of monthly EMP201 declarations against actual payments made.33 These reconciliations must meticulously balance Pay-As-You-Earn (PAYE), Skills Development Levies (SDL), Unemployment Insurance Contributions (UIC), and the Employment Tax Incentive (ETI).33</p>
              <p>The compliance widget must track two distinct filing seasons for these reconciliations. The Interim Employer Reconciliation, covering the six-month period from 1 March 2025 to 31 August 2025, opens for submission on 22 September 2025 and closes strictly on 31 October 2025.34 Subsequently, the Annual Employer Reconciliation for the full 2026 tax year (1 March 2025 to 28 February 2026) mandates submission between 1 April 2026 and 31 May 2026.34</p>
              <p>From a technical standpoint, the underlying Business Requirements Specification (BRS) v24.0.2 introduced new validation rules and source codes (e.g., 3623/3723, 4042, 4588) applicable from 1 March 2025.33 The compliance software must cross-verify client payroll data against these exact specifications prior to transmitting the data to SARS to prevent massive batch rejection errors. Additionally, as of the 2026 reconciliation period, every employer is mandated to provide Income Tax numbers for all employees whose earnings exceed the tax threshold, requiring the widget to prompt bulk ITREG registrations via the e@syFile application prior to the EMP501 deadline.28</p>
            </div>
          </div>
        </RevealOnScroll>
      );

  const CipcAndGovernance = () => (
    <DetailSection title="Corporate Governance and CIPC Protocols">
      <p>Beyond taxation, the widget must holistically manage the rigid timelines dictated by the Companies Act 71 of 2008. The CIPC mandates the annual submission of statutory returns, failing which an entity risks swift administrative penalties and ultimate deregistration.39</p>
      
      <h3 className="text-2xl font-bold text-brand-900 pt-6 border-b border-brand-900/10 pb-2">Annual Return Timelines and Variable Fee Structures</h3>
      <p>The timeline for CIPC Annual Returns is inherently dynamic, relying strictly on the exact anniversary of the entity's incorporation rather than a standardized calendar month. The widget's internal calculation engine must determine these dates precisely:</p>
      <div className="pl-6 space-y-3">
        <div className="flex gap-3 items-start"><ChevronRight size={20} className="text-brand-gold shrink-0 mt-0.5" /><p><strong>Private and Public Companies (including external companies):</strong> Must file their annual returns within 30 business days strictly following the anniversary date of their incorporation.39</p></div>
        <div className="flex gap-3 items-start"><ChevronRight size={20} className="text-brand-gold shrink-0 mt-0.5" /><p><strong>Close Corporations (CCs):</strong> Must file from the first day of their anniversary month up until the conclusion of the month immediately following.39</p></div>
      </div>
      
      <p className="mt-6">The prescribed filing fee is directly proportional to the entity's Annual Turnover. This is calculated in strict accordance with Section 223 read with Regulation 164 of the Companies Act.40 The widget must proactively prompt the user for forecasted turnover data to estimate impending liabilities accurately:</p>

      {/* Table 5 */}
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md my-8">
        <table className="w-full text-left border-collapse">
          <thead className="bg-brand-900 text-white text-xs uppercase tracking-widest">
            <tr>
              <th className="p-4 border-b border-gray-200">Annual Turnover Band</th>
              <th className="p-4 border-b border-gray-200">On-Time Filing Fee (ZAR)</th>
              <th className="p-4 border-b border-gray-200">Late Lodgment Penalty (ZAR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-mono">Less than R1 million</td>
              <td className="p-4">R100 39</td>
              <td className="p-4 text-rose-600 font-bold">R150 39</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-mono">R1 million to &lt; R10 million</td>
              <td className="p-4">R450 39</td>
              <td className="p-4 text-rose-600 font-bold">R600 39</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-mono">R10 million to &lt; R25 million</td>
              <td className="p-4">R2,000 39</td>
              <td className="p-4 text-rose-600 font-bold">R2,500 39</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-mono">R25 million or more</td>
              <td className="p-4">R3,000 39</td>
              <td className="p-4 text-rose-600 font-bold">R4,000 39</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>Simultaneously, the CIPC requires the mandatory submission of financial records—referred to as the "Hard-stop" functionality—on the exact same day the annual return is filed.39 Depending on the entity's Public Interest Score, this involves submitting either Audited Financial Statements (AFS), Independently Reviewed Financial Statements, or a Financial Accountability Supplement (FAS).39</p>

      <h3 className="text-2xl font-bold text-brand-900 pt-6 border-b border-brand-900/10 pb-2">The Beneficial Ownership (BO) Imperative</h3>
      <p>An integral component of modern corporate governance in South Africa is the transparent disclosure of Beneficial Ownership. The compliance widget must integrate these rules into its primary alert system, as BO declarations must be submitted concurrently with the CIPC Annual Return, or updated within a strict 10-business-day window whenever ownership structures undergo any material change.43</p>
      <p>The regulatory framework distinguishes between "affected" and "non-affected" companies.45 Affected companies (typically listed entities or those with complex, multi-tiered structures) are required to submit extensive disclosure forms and structural organograms detailing management reporting and shareholder hierarchies.45</p>
      <p>Conversely, to reduce the regulatory burden, the CIPC rolled out an "Optimised System" specifically for non-affected entities, small profit companies, and CCs that possess zero additional ownership, influence, or control beyond their primary directors or members.43 Under the optimized flow, users are no longer required to upload physical mandate documents or offline securities registers.43 Instead, the filer completes the securities register directly within the e-Services system and verifies the submission via an SMS or Email One-Time-Pin (OTP).43</p>
      <p>However, this introduces a unique systemic delay that the widget must navigate. The OTP is routed strictly to the contact details held on the CIPC customer profile. If these details are updated, a mandatory 48-hour cooling-off period is enforced before the OTP can be routed to the new details.43 The widget must actively warn clients to verify their CIPC contact details days before the filing deadline to prevent being locked out by this security mechanism. Furthermore, the widget must generate an internal checklist reminding practitioners to retain written mandates on file, as the CIPC retains the right to demand them for ad hoc auditing.43</p>
    </DetailSection>
  );

  const LabourStatutoryReporting = () => (
    <DetailSection title="Labour Statutory Reporting: COIDA and Employment Equity">
      <p>A holistic compliance widget must extend beyond SARS and the CIPC to encapsulate the obligations enforced by the Department of Employment and Labour (DoEL) and the Compensation Fund.</p>
      
      <h3 className="text-2xl font-bold text-brand-900 pt-6 border-b border-brand-900/10 pb-2">Employment Equity (EE) Reporting</h3>
      <p>The Employment Equity Amendment Act, No. 4 of 2022, which became fully operational in 2025, introduced aggressive sector-specific numerical targets spanning 18 economic sectors.47 These targets aim to ensure equitable representation across the four upper occupational levels against the demographics of the economically active population (EAP) over a strict five-year implementation period running from 1 September 2025 to 31 August 2030.47</p>
      <p>For the 2025/2026 reporting cycle, the widget must display an unyielding deadline of midnight on Thursday, 15 January 2026, for the online submission of the EEA2 and EEA4 reports.47 A critical point of regulatory relief integrated into the system is the redefinition of a "Designated Employer." Entities employing between 1 and 49 employees are no longer classified as designated employers.47 However, the widget must still prompt these smaller, non-designated entities to log into the EE portal to verify their details. This action is imperative to secure an EE Compliance Certificate—a mandatory prerequisite under Section 53 for accessing state contracts or conducting business with any organ of state.47</p>

      <h3 className="text-2xl font-bold text-brand-900 pt-6 border-b border-brand-900/10 pb-2">Compensation for Occupational Injuries and Diseases Act (COIDA)</h3>
      <p>Under Section 82 of COIDA, employers are mandated to annually submit a Return of Earnings (ROE) to the Compensation Fund.51 This submission serves a dual purpose: confirming actual staff costs for the preceding assessment year and projecting provisional earnings for the upcoming year to calculate the firm's insurance assessment.52</p>
      <p>The widget's calculation parameters must define the COID assessment year strictly from 1 March to the final day of February.51 During the annual submission window, which typically runs from 1 April to 31 July (with portals occasionally down for maintenance until mid-April), employers must declare:</p>
      <div className="pl-6 space-y-3 font-bold text-brand-900">
        <div className="flex gap-3 items-start"><span className="text-brand-gold">1.</span><p>Actual Earnings for the period 1 March 2024 to 28 February 2025, subject to a maximum annual earnings limit of R597,328 per employee.52</p></div>
        <div className="flex gap-3 items-start"><span className="text-brand-gold">2.</span><p>Provisional Earnings for the period 1 March 2025 to 28 February 2026, subject to an elevated annual forecast limit of R633,168 per employee.52</p></div>
      </div>
      <p className="mt-6">Following a notice issued by the Minister of Employment and Labour in 2025, the statutory definition of earnings encompasses 24 specific earning types.51 Crucially, the widget's internal payroll analyzer must ensure the inclusion of all regular salaries, 13th cheques, holiday bonuses, and both regular and occasional travel and production bonuses.51 Failure to accurately forecast these inclusions results in punitive reassessments.</p>
    </DetailSection>
  );

  const ProfessionalPractitioner = () => (
    <DetailSection title="Professional Practitioner Obligations (SAICA Integration)">
      <p>For tax practitioners and accountants utilizing the compliance widget on behalf of clients, their own professional compliance is a prerequisite for system access. The South African Institute of Chartered Accountants (SAICA) and SARS impose strict continuous professional development (CPD) requirements on registered tax practitioners.</p>
      <p>To maintain their licensing, practitioners must complete an annual declaration on the SAICA Member Portal, affirming compliance with the SAICA code of ethics, reporting any criminal convictions under Section 240(3) of the Tax Administration Act, and verifying their CPD hours.54</p>
      <p>The widget can track these professional obligations, generating an alert before the 31 December deadline to ensure the practitioner has completed a minimum of 18 verifiable CPD hours annually.54 These hours are strictly categorized: 10 hours of tax-related training, 2 hours of ethics training, and 6 hours of general business/accounting training.19</p>
      <p>Furthermore, SAICA's newly updated 2026 Training Regulations introduced specific guidelines regarding the responsible use of Artificial Intelligence (AI) by trainee accountants.55 The widget's AI-assisted forecasting tools must operate within these ethical boundaries, ensuring that AI acts merely as a support tool to enhance clarity, while maintaining the practitioner's ultimate accountability and personal judgment.55</p>
    </DetailSection>
  );

  const StatusTaxonomy = () => (
    <DetailSection title="Status Taxonomy Translation: Implementing the Badging System">
      <p>The second major requirement of the compliance widget is the real-time tracking of document lifecycles via simple, color-coded badges: <strong>Pending</strong>, <strong>Processing</strong>, and <strong>Submitted</strong>. Government portals output highly technical, varied, and asynchronous status codes. The widget's backend must parse these responses and map them onto the simplified user interface.</p>
      
      <h3 className="text-2xl font-bold text-brand-900 pt-6 border-b border-brand-900/10 pb-2">Parsing the SARS eFiling and Customs Ecosystem</h3>
      <p>When an ISV application transmits a tax return or bulk data file via API, SARS responds with specific File Response Codes.6</p>
      <div className="pl-6 space-y-4">
        <div className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-yellow-500 shrink-0 mt-1" /><div><p><strong>Pending (Yellow Badge):</strong> This state encompasses the initial transmission phase or account verification stages. If the widget receives a backend status of <em>Awaiting Registration Verification</em> or <em>Awaiting upload of documentation</em>, the entity's profile is still under preliminary scrutiny by SARS. This verification process involves matching the submitted data against the national population register, typically requiring between 2 and 21 working days to resolve.56</p></div></div>
        <div className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-blue-500 shrink-0 mt-1" /><div><p><strong>Processing (Blue Badge):</strong> This aligns with the SARS "In Progress" status displayed on the Income Tax Work Page, or the backend API code <em>Case Created</em>.1 In the context of bulk IT3 submissions, if the system returns code R004 (Accepted with warnings) or R006 (Partial upload with rejected fields or duplicate records), the widget must flag the batch as Processing, prompting the user for immediate remedial intervention before finalization.6 Similarly, within the Customs system, if the API returns a Status 13 (Flagged for inspection) or Status 33 (Supporting docs submitted), the widget reflects "Processing".58 If a standard return is selected for manual audit, processing timelines extend to 90 business days, effectively freezing any associated refund mechanisms.59</p></div></div>
        <div className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-emerald-500 shrink-0 mt-1" /><div><p><strong>Submitted & Finalized (Green Badge):</strong> This optimal state corresponds to the response code R003 (Successfully uploaded: all records accepted and processed).6 In the Customs framework, this equates to Status 8 (Released) or Status 34 (Case Closed).58 Once SARS completes its assessment, the status transitions to <em>Assessment received</em>, triggering the issuance of the ITA34 Notice of Assessment, allowing the widget to mark the cycle as strictly <em>Filed</em>.1</p></div></div>
      </div>
      <p className="mt-6">The widget must also account for critical edge cases, such as the <strong>Cancelled</strong> status. This represents a Total Discharged Return under Section 98 of the Tax Administration Act, applied when a return is deemed fraudulent, issued to the wrong taxpayer, or allocated to an incorrect tax period.1 This should trigger an immediate, high-priority <strong>Red</strong> alert.</p>

      <h3 className="text-2xl font-bold text-brand-900 pt-6 border-b border-brand-900/10 pb-2">Decoding CIPC Application Statuses</h3>
      <p>The CIPC operates a distinct array of statuses that the widget must query via the change_ent_STATUS or co_status API endpoints.12</p>
      <div className="pl-6 space-y-4">
        <div className="flex gap-4 items-start"><ChevronRight size={24} className="text-brand-gold shrink-0 mt-1" /><div><p><strong>Pending / Processing:</strong> Applies when annual returns, Beneficial Ownership declarations, or directorship amendments are transmitted but not yet legally codified into the enterprise registry.</p></div></div>
        <div className="flex gap-4 items-start"><ChevronRight size={24} className="text-brand-gold shrink-0 mt-1" /><div><p><strong>Submitted:</strong> Confirms the successful lodging of the return and the successful clearing of the associated monetary fee.</p></div></div>
        <div className="flex gap-4 items-start"><AlertTriangle size={24} className="text-rose-600 shrink-0 mt-1" /><div><p><strong>Critical Alerts (Deregistration Dynamics):</strong> If annual returns remain outstanding for two successive years, the CIPC forcefully initiates the deregistration process.39 The widget must instantly flag the shift from <em>In Business</em> to <em>Deregistration Process</em> with a critical Red badge.41 If no objection or remediation occurs, the status degrades to <em>AR Final Deregistered</em>. At this point, the juristic personality is legally withdrawn, and the company ceases to exist, exposing active directors to severe personal liability for actions taken while the company was ostensibly in business.39 Re-instatement requires the submission of form CoR40.5, a R200 fee, and the settling of all historic returns.39</p></div></div>
      </div>

      <h3 className="text-2xl font-bold text-brand-900 pt-6 border-b border-brand-900/10 pb-2">Tax Compliance Status (TCS) and Verification</h3>
      <p>Finally, the overarching health of an entity is dictated by its Tax Compliance Status (TCS) Pin. Using the SARS Online Query System (SOQS) or eFiling, third parties and procurement officers utilize this pin to verify compliance.31 The TCS system natively uses color-coding: <strong>Red</strong> indicates the taxpayer's affairs are out of order, while <strong>Green</strong> confirms total compliance.62 The compliance widget can ingest this exact binary logic, keeping a live monitor on the TCS Pin to ensure the client remains eligible for state tenders and corporate onboarding processes.63</p>
    </DetailSection>
  );

  const AnalyticalInsights = () => (
    <DetailSection title="Analytical Insights and Strategic Operational Imperatives">
      <p>Synthesizing the vast arrays of data surrounding South African compliance in 2026 yields several critical second and third-order insights that highlight the indispensable value of an automated compliance widget for risk management.</p>
      <p><strong>First, the interconnectedness of statutory compliance creates a highly volatile, cascading risk environment.</strong> Regulatory bodies in South Africa no longer operate in isolated silos. A failure to submit a minor CIPC Annual Return triggers the <em>Deregistration Process</em>.39 An entity in deregistration naturally defaults on its SARS obligations, thereby invalidating its Green Tax Compliance Status (TCS) Pin.62 Without a compliant TCS Pin, the entity is legally prohibited from engaging in government procurement. Furthermore, the inability to secure an Employment Equity Compliance Certificate by the 15 January 2026 deadline acts as a secondary hard-stop against doing business with the state.47 Therefore, a seemingly insignificant administrative oversight—such as missing a R100 CIPC turnover fee—can precipitate a total paralysis of the firm’s commercial operational capacity. The widget's predictive, cross-functional alerts mitigate this specific, non-linear risk.</p>
      <p><strong>Second, the structural changes introduced in the 2026 National Budget inherently shift corporate behavior.</strong> By increasing the VAT registration threshold to R2.3 million 18, the government has structurally incentivized micro-enterprises to manage their revenue to remain beneath this ceiling, thereby avoiding the immense administrative friction and cash-flow pressures of bi-monthly VAT submissions. The compliance widget, by constantly monitoring revenue inflows against this R2.3 million threshold, acts not merely as a static calendar, but as an active strategic advisory tool. It alerts directors well in advance of crossing the mandatory registration threshold, allowing for strategic deferment of billing or restructuring.19</p>
      <p><strong>Third, the evolution of Beneficial Ownership regulations and the deployment of the CIPC Optimised System reflect a broader governmental strategy to aggressively combat money laundering and grey-listing while attempting to minimize collateral damage to legitimate small and medium enterprises (SMEs).</strong>46 The reliance on digital One-Time-Pins (OTPs) connected strictly to the CIPC customer profile necessitates rigorous, continuous profile maintenance.43 If a practitioner fails to update a client's email or cell phone number on the CIPC portal, the 48-hour delay in OTP delivery routing will inevitably cause the firm to miss statutory deadlines.43 The widget circumvents this operational trap by identifying and flagging unconfirmed contact details proactively.1</p>
      <p><strong>Finally, the aggressive push toward direct API integrations (SARS ISV, CIPC iXBRL REST endpoints) signals the absolute termination of manual data entry in tax administration.</strong> As SARS advances toward Modernisation 3.0—which aims to implement PEPPOL-standard real-time VAT e-invoicing by 2028—the ultimate goal of the state is to achieve perfect, real-time visibility of business activities before tax returns are even filed.19 The theoretical compliance widget proposed in this report is essentially the private sector's necessary technological response to a government that is rapidly arming itself with algorithmic auditing, bulk third-party data matching, and automated penalty generation systems. To survive in this ecosystem, fiduciaries must possess tools that operate at the same speed and with the same level of digital integration as the revenue authority itself.</p>
    </DetailSection>
  );

  return (
    <div className="bg-slate-50 font-sans text-brand-900 selection:bg-brand-gold selection:text-brand-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[55vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-brand-900 border-b-4 border-brand-gold">
        <div className="absolute inset-0 z-0">
          <img src={TREE_HERO_URL} alt="Growth Ecosystem" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/50 to-slate-50"></div>
        </div>

        <RevealOnScroll>
          <div className="max-w-4xl mx-auto z-10 relative mt-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 mb-6 backdrop-blur-md">
              <ShieldCheck size={14} className="text-brand-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-900">Statutory Governance</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-sora font-extrabold tracking-tighter mb-6 leading-[1] text-brand-900">
              2026 COMPLIANCE <br/><span className="text-brand-gold">CALENDAR.</span>
            </h1>
            <p className="text-xl text-brand-900/70 max-w-2xl mx-auto font-medium">
              The definitive operational timeline for South African entities.
            </p>
          </div>
        </RevealOnScroll>
      </section>

      {/* 2. THE SCHEDULE OVERVIEW (Summary Boxes) */}
      <section className="py-20 px-6 max-w-7xl mx-auto -mt-20 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-brand-900/5 overflow-hidden">
          <div className="p-8 md:p-12 bg-brand-900 text-white flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold font-sora mb-2 uppercase">Master Schedule</h2>
              <p className="text-brand-gold text-sm font-bold tracking-widest uppercase">Fiscal Year 2026/2027</p>
            </div>
            <Clock className="text-brand-gold opacity-50" size={48} />
          </div>
          <div className="divide-y divide-gray-100">
            {SCHEDULE.map((monthGroup, idx) => (
              <div key={idx} className="p-8 md:p-10 hover:bg-gray-50 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="md:w-1/4">
                    <h3 className="text-2xl font-black text-brand-900 uppercase">{monthGroup.month}</h3>
                  </div>
                  <div className="md:w-3/4 space-y-6">
                    {monthGroup.deadlines.map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        <div className="flex-shrink-0 w-16 h-16 bg-brand-50 rounded-2xl flex flex-col items-center justify-center border border-brand-900/10 group-hover:border-brand-gold/50">
                          <span className="text-2xl font-black text-brand-900 leading-none">{item.day}</span>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${item.risk === 'Critical' ? 'bg-rose-50 text-rose-600 border-rose-200' : item.risk === 'High' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                              {item.risk} Priority
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

      {/* 3. DETAILED CONTENT SECTIONS */}
      <section className="py-20 px-6 max-w-5xl mx-auto space-y-16">
        <IntroToRegTech />
        <FiscalAdjustments />
        <StatutoryDeadlineEngine />
        <CipcProtocols />
        <LabourStatutoryReporting />
        <ProfessionalPractitioner />
        <StatusTaxonomy />
        <AnalyticalInsights />
      </section>

      {/* 4. FAQ SECTION */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-50 rounded-full text-brand-900 mb-4 border border-brand-900/10">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-brand-900 uppercase tracking-tighter">Regulatory FAQ</h2>
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
            <h2 className="text-4xl font-black text-brand-900 mb-6 uppercase tracking-tighter">Need to Build Your Sovereign Timeline?</h2>
            <p className="text-xl text-brand-900/60 mb-10 leading-relaxed">
              Integrate the full Compliance Calendar logic into your real-time monitoring system today.
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
