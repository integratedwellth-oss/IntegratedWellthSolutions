import React, { useState } from 'react';
import RevealOnScroll from '../RevealOnScroll';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Settings, 
  BookOpen, 
  PieChart, 
  FileBarChart, 
  Download, 
  ArrowRight, 
  Quote, 
  HeartHandshake, 
  Scale, 
  CheckSquare, 
  FileText, 
  Phone, 
  Mail, 
  Building2, 
  Calendar,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { CONTACT_INFO } from '../../constants';
import { downloadFounderChecklistPDF } from '../../services/exportService';
import { submitLeadMagnet } from '../../services/leadMagnetService';

interface LandingPageProps {
  onOpenAssessment: () => void;
}

const CHECKLIST_STEPS = [
  {
    id: 1,
    number: "01",
    title: 'The "Mindful Minute" Cash Flow Check',
    psychology: "Avoidance breeds anxiety. We fear looking at our bank balances when we don't feel entirely in control of our spending.",
    action: "Spend exactly 60 seconds each morning reviewing your bank balance and upcoming payments. Awareness is the crucial first step to taking back financial control.",
    benefit: "Eliminates morning dread and gives proactive clarity before daily operations begin.",
    diagnosticQuestion: "Do you review your exact business cash balance every single morning?"
  },
  {
    id: 2,
    number: "02",
    title: "Strict Boundary Setting (Self vs. Business)",
    psychology: "Blurred lines between personal and business finances lead to identity enmeshment and extreme tax-season panic.",
    action: "Audit your accounts today. Ensure zero personal expenses run through the business account. This simple boundary protects your corporate veil and simplifies your financial reporting.",
    benefit: "Protects your limited liability status under South African company law and simplifies SARS audits.",
    diagnosticQuestion: "Are your personal and business bank transactions 100% strictly separated?"
  },
  {
    id: 3,
    number: "03",
    title: 'The Monthly "Sanity Reconciliation"',
    psychology: "Unfinished loops drain your cognitive energy. Unreconciled books sit in the back of your mind as a heavy, subconscious weight.",
    action: "Schedule a non-negotiable 2-hour block by the 5th of every month to reconcile the previous month's bank statements. Treat this appointment as an act of self-care.",
    benefit: "Closes psychological cognitive debt and prevents chaotic year-end catch-up scrambles.",
    diagnosticQuestion: "Are your bank recons and general ledger reconciled by the 5th of each month?"
  },
  {
    id: 4,
    number: "04",
    title: "Elevating to IFRS for SMEs",
    psychology: "Imposter syndrome peaks when founders have to present unstandardized financials to a bank, investor, or tender board.",
    action: 'Shift your mindset from "doing the books for SARS" to "compiling financials for growth." Ensure your AFS complies with the IFRS for SMEs standard to build instant credibility.',
    benefit: "Unlocks tender approval, bank overdrafts, IDC/NEF funding, and institutional investor trust.",
    diagnosticQuestion: "Are your Annual Financial Statements prepared to formal IFRS for SMEs standards?"
  },
  {
    id: 5,
    number: "05",
    title: 'The "Founder\'s Reward" Protocol',
    psychology: "Founders who reinvest 100% of revenue and starve themselves build deep resentment towards their own business, inevitably leading to burnout.",
    action: "Structure a fixed, regular salary for yourself. Factor it into your breakeven analysis. You are your business's most valuable asset—compensate yourself accordingly.",
    benefit: "Restores founder emotional equilibrium and creates true financial sustainability.",
    diagnosticQuestion: "Do you draw a regular, budgeted market-related salary from your business?"
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onOpenAssessment }) => {
  // Interactive checklist state
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  
  // Lead capture form state
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const FOUNDER_URL = "https://res.cloudinary.com/dka0498ns/image/upload/f_auto,q_auto/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg";

  const toggleStep = (id: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const auditScorePercent = Math.round((completedCount / CHECKLIST_STEPS.length) * 100);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail || !leadName) return;

    setIsSubmitting(true);
    await submitLeadMagnet({
      fullName: leadName,
      email: leadEmail,
      businessName: leadCompany,
      checklistSelfAuditScore: auditScorePercent,
      source: 'landing_page_checklist_hero'
    });

    downloadFounderChecklistPDF(leadName);
    setIsSubmitting(false);
    setDownloadSuccess(true);
  };

  const handleInstantDownload = () => {
    downloadFounderChecklistPDF(leadName || 'Founder');
  };

  return (
    <div className="bg-[#FAF8F5] font-sans text-slate-900 selection:bg-brand-gold selection:text-brand-900 overflow-x-hidden min-h-screen">
      
      {/* ─── 0. TOP CREDENTIALS & STATUTORY BANNER ─── */}
      <section className="bg-brand-900 text-white border-b border-brand-gold/30 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-wider">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-brand-gold">
              <ShieldCheck size={14} className="text-brand-gold" />
              CIBA Registered Practice
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 size={14} className="text-emerald-400" />
              SARS Authorized Tax Practitioner
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Building2 size={14} className="text-emerald-400" />
              CIPC Good Standing Specialist
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-black">
            <a 
              href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} 
              className="text-white/80 hover:text-brand-gold transition-colors flex items-center gap-1.5"
            >
              <Phone size={13} className="text-brand-gold" /> 067 055 5941
            </a>
            <span className="text-white/20">|</span>
            <a 
              href="mailto:enquiries@integratedwellth.co.za" 
              className="text-white/80 hover:text-brand-gold transition-colors flex items-center gap-1.5"
            >
              <Mail size={13} className="text-brand-gold" /> enquiries@integratedwellth.co.za
            </a>
          </div>
        </div>
      </section>

      {/* ─── 1. HERO SECTION: The Founder's Financial Self-Care Checklist ─── */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-900 via-brand-900 to-teal-950 text-white overflow-hidden">
        
        {/* Subtle geometric grid & glow */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,_transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Subtext & Lead Capture Form */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping"></span>
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-brand-gold">
                  Official IWS Lead Magnet & Practice Framework
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sora font-extrabold tracking-tight leading-[1.08] text-white">
                The Founder’s <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-gold">
                  Financial Self-Care
                </span> <br />
                Checklist
              </h1>

              <p className="text-lg md:text-xl text-brand-100/90 font-light leading-relaxed max-w-2xl">
                <strong>5 Steps to Audit-Ready Books & Zero Anxiety.</strong> Bridge the gap between your psychological resilience as a leader and your company's statutory accounting rigor.
              </p>

              {/* Lead Capture Box */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl border-2 border-brand-gold/40">
                {!downloadSuccess ? (
                  <form onSubmit={handleDownload} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-brand-900 font-sora">
                          Get Instant Access & Download PDF
                        </h3>
                        <p className="text-xs text-slate-500">
                          Receive the printable 2-page executive checklist + action guide.
                        </p>
                      </div>
                      <FileText size={24} className="text-brand-gold shrink-0" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input 
                          type="text"
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="Marcia / Thabo"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1">
                          Business Email *
                        </label>
                        <input 
                          type="email"
                          required
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="founder@company.co.za"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-900 hover:bg-brand-gold hover:text-brand-900 text-white font-black uppercase tracking-widest text-xs sm:text-sm py-4 px-6 rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download size={18} />
                      {isSubmitting ? 'Generating Your PDF...' : 'Download The 5-Step Checklist (PDF)'}
                    </button>
                    
                    <p className="text-[10px] text-center text-slate-400 font-medium">
                      🔒 Direct download. Zero spam. Prepared by Marcia Kgaphola, Registered Accountant.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-4 space-y-4 animate-fadeIn">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-xl font-sora font-extrabold text-brand-900">
                      Checklist Successfully Downloaded!
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Your high-resolution PDF has been generated. You can re-download anytime below or proceed through the live interactive audit.
                    </p>
                    <div className="flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleInstantDownload}
                        className="bg-brand-gold text-brand-900 font-black uppercase tracking-widest text-xs px-5 py-2.5 rounded-xl hover:bg-slate-900 hover:text-white transition-all flex items-center gap-2"
                      >
                        <Download size={14} /> Re-download PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-sora text-brand-gold">100%</p>
                  <p className="text-[10px] sm:text-xs text-brand-100/70 font-semibold uppercase tracking-wider">CIPC & SARS Rate</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-sora text-brand-gold">IFRS</p>
                  <p className="text-[10px] sm:text-xs text-brand-100/70 font-semibold uppercase tracking-wider">For SMEs Compliant</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-sora text-brand-gold">15+ Yrs</p>
                  <p className="text-[10px] sm:text-xs text-brand-100/70 font-semibold uppercase tracking-wider">Advisory Experience</p>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Book/Checklist Cover Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <RevealOnScroll>
                <div className="relative group max-w-sm">
                  {/* Decorative Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-brand-gold to-teal-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-1000"></div>
                  
                  {/* Lead Magnet Preview Card */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-4 border-brand-gold/60 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] transform transition-transform duration-500 hover:-translate-y-2">
                    <img 
                      src="/lead_magnet_cover.jpg" 
                      alt="The Founder's Financial Self-Care Checklist" 
                      className="w-full h-auto object-cover"
                      loading="eager"
                    />

                    <div className="p-5 bg-brand-900/95 border-t border-brand-gold/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
                          <CheckCircle2 size={12} className="text-emerald-400" />
                          Complete 2-Page Guide
                        </span>
                        <span className="text-[10px] font-mono text-white/60">PDF Format</span>
                      </div>
                      <p className="text-xs text-white/90 font-medium">
                        Authored by Marcia Kgaphola, Founder of Integratedwellth Solutions
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. THE ANCHOR: A Message From Marcia (Verbatim & Authoritative) ─── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          
          <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 md:p-16 border-2 border-brand-gold/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-brand-gold/15 pointer-events-none">
              <Quote size={120} />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
              
              {/* Founder Portrait */}
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden border-4 border-brand-gold shadow-xl">
                <img 
                  src={FOUNDER_URL} 
                  alt="Marcia Kgaphola - Founder of Integratedwellth Solutions" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Message Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-brand-gold font-black uppercase tracking-[0.3em] text-xs">
                  <HeartHandshake size={15} />
                  A Personal Message from Marcia
                </div>

                <blockquote className="space-y-4 text-slate-700 text-base md:text-lg leading-relaxed font-medium">
                  <p>
                    "I know firsthand that messy books and pending Annual Financial Statements (AFS) can keep you awake at night. If you run a business in South Africa, you already know that messy bookkeeping and delayed compliance are the number one reason tenders get rejected and funding falls through."
                  </p>
                  <p>
                    "But beyond the missed opportunities, the psychological weight of financial chaos leads straight to founder burnout. That's why I created this checklist. It's time to bridge the gap between your mental well-being and your financial clarity."
                  </p>
                </blockquote>

                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-black text-brand-900 font-sora">Marcia Kgaphola</p>
                    <p className="text-xs text-brand-gold font-bold uppercase tracking-wider">
                      Founder & Principal Advisory Lead, Integratedwellth Solutions
                    </p>
                  </div>
                  <button
                    onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')}
                    className="bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2"
                  >
                    Book An Alignment Review <ArrowRight size={14} />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ─── 3. THE 5-STEP INTERACTIVE AUDIT PROTOCOL ─── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]" id="checklist-steps">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-brand-900/5 text-brand-900 border border-brand-900/10 text-xs font-black uppercase tracking-widest">
              The 5-Step Practice Protocol
            </span>
            <h2 className="text-3xl sm:text-5xl font-sora font-extrabold text-brand-900 tracking-tight">
              Interactive <span className="text-brand-gold">Self-Care Audit</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Examine each step below. Understand the psychological root cause, execute the prescriptive accounting action, and check off what your business already has in place.
            </p>

            {/* Live Score Tracker Bar */}
            <div className="bg-white p-6 rounded-2xl border-2 border-brand-gold/30 shadow-md max-w-xl mx-auto mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-brand-900">
                  Your Current Audit-Readiness:
                </span>
                <span className="text-base font-black font-sora text-brand-900">
                  {completedCount} of 5 Completed ({auditScorePercent}%)
                </span>
              </div>
              
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brand-gold to-emerald-500 transition-all duration-500 rounded-full"
                  style={{ width: `${auditScorePercent}%` }}
                ></div>
              </div>

              <div className="mt-3 text-xs text-left text-slate-600 flex items-center justify-between">
                <span>{auditScorePercent === 100 ? '🎉 Exemplary Structural Sovereignty' : auditScorePercent >= 60 ? '⚡ Strong Foundation — Let\'s close the remaining gap' : '⚠️ Critical Vulnerability — Book a review with Marcia'}</span>
                <button 
                  onClick={handleInstantDownload}
                  className="text-brand-900 hover:text-brand-gold font-bold underline flex items-center gap-1 text-[11px]"
                >
                  <Download size={12} /> Save PDF
                </button>
              </div>
            </div>
          </div>

          {/* Step Cards Grid */}
          <div className="space-y-6">
            {CHECKLIST_STEPS.map((step) => {
              const isChecked = !!completedSteps[step.id];

              return (
                <RevealOnScroll key={step.id}>
                  <div 
                    className={`rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-300 border-2 ${
                      isChecked 
                        ? 'bg-emerald-50/40 border-emerald-400/80 shadow-md' 
                        : 'bg-white border-slate-200/80 hover:border-brand-gold/50 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      
                      {/* Left: Number + Content */}
                      <div className="space-y-4 flex-1">
                        
                        <div className="flex items-center gap-4">
                          <span className="text-2xl sm:text-3xl font-black font-sora text-brand-gold">
                            {step.number}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold font-sora text-brand-900">
                            {step.title}
                          </h3>
                        </div>

                        {/* Psychology & Action Two-Column Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          
                          <div className="bg-rose-50/60 rounded-2xl p-4 border border-rose-100 space-y-1.5">
                            <div className="flex items-center gap-2 text-rose-800 text-[10px] font-black uppercase tracking-wider">
                              <AlertCircle size={13} />
                              The Psychology
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                              {step.psychology}
                            </p>
                          </div>

                          <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 space-y-1.5">
                            <div className="flex items-center gap-2 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                              <CheckCircle2 size={13} />
                              The Action
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                              {step.action}
                            </p>
                          </div>

                        </div>

                        {/* South African Business Benefit */}
                        <p className="text-xs text-slate-500 italic pt-1">
                          <strong>Strategic Impact:</strong> {step.benefit}
                        </p>
                      </div>

                      {/* Right: Interactive Toggle Button */}
                      <div className="md:w-64 shrink-0 flex flex-col items-start md:items-end justify-center pt-2 md:pt-0">
                        <button
                          type="button"
                          onClick={() => toggleStep(step.id)}
                          className={`w-full md:w-auto px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isChecked
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-slate-100 text-slate-700 hover:bg-brand-900 hover:text-white border border-slate-200'
                          }`}
                        >
                          <CheckSquare size={16} className={isChecked ? 'text-white' : 'text-slate-400'} />
                          {isChecked ? 'Audit Passed' : 'Mark as Implemented'}
                        </button>
                        <p className="text-[10px] text-slate-400 mt-2 text-center md:text-right">
                          {step.diagnosticQuestion}
                        </p>
                      </div>

                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── 4. WHY COMPLIANCE & CLEAN BOOKS UNLOCK SOUTH AFRICAN GROWTH ─── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-4 py-1.5 rounded-full bg-brand-gold/15 text-brand-900 border border-brand-gold/30 text-xs font-black uppercase tracking-widest">
              South African Market Realities
            </span>
            <h2 className="text-3xl sm:text-5xl font-sora font-extrabold text-brand-900 tracking-tight">
              Why Messy Books Kill <span className="text-brand-gold">Tenders & Funding</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              In the South African economic landscape, institutional counterparties do not evaluate your intentions; they evaluate your statutory records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-900 text-brand-gold flex items-center justify-center">
                <Scale size={24} />
              </div>
              <h3 className="text-xl font-bold font-sora text-brand-900">
                Tenders & RFQs
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A single lapsed CIPC Annual Return or a non-compliant SARS Tax Compliance Status (PIN) results in immediate administrative disqualification from high-value public and private sector tenders.
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-900 text-brand-gold flex items-center justify-center">
                <Building2 size={24} />
              </div>
              <h3 className="text-xl font-bold font-sora text-brand-900">
                Bank & DFI Funding
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Commercial banks and development financiers (NEF, IDC, Sefa) require 2 to 3 years of signed Annual Financial Statements (AFS) adhering strictly to IFRS for SMEs to underwrite growth capital.
              </p>
            </div>

            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-900 text-brand-gold flex items-center justify-center">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-xl font-bold font-sora text-brand-900">
                Zero Anxiety Leadership
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Messy records force you to lead from fear. Up-to-date monthly management accounts and clean balance sheets restore your authority and psychological peace of mind.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 5. STRATEGIC RETAINERS & ACCOUNTING PACKAGES ─── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-brand-900 text-white relative">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest">
              Tailored Professional Retainers
            </span>
            <h2 className="text-3xl sm:text-5xl font-sora font-extrabold text-white tracking-tight">
              Move From <span className="text-brand-gold">Chaos to Clarity</span>
            </h2>
            <p className="text-brand-100/70 text-sm sm:text-base leading-relaxed">
              Transparent, baseline retainers designed for South African SMEs, founders, and NPOs seeking audit-ready books and statutory peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Package 1 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:border-brand-gold/60 transition-all hover:bg-white/10">
              <div>
                <Settings className="text-brand-gold mb-4" size={28} />
                <h3 className="text-lg font-bold font-sora text-white mb-2">System Configuration</h3>
                <p className="text-xs text-slate-300 mb-6">Foundational accounting setup & chart of accounts configuration.</p>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-400" /> Chart of Accounts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-400" /> Invoicing Templates</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-400" /> Bank Feed Integration</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-400" /> Opening Balances</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Starting From</p>
                <p className="text-3xl font-black font-sora text-white">R2 500 <span className="text-xs font-normal text-white/60">once-off</span></p>
              </div>
            </div>

            {/* Package 2 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:border-brand-gold/60 transition-all hover:bg-white/10">
              <div>
                <PieChart className="text-brand-gold mb-4" size={28} />
                <h3 className="text-lg font-bold font-sora text-white mb-2">Monthly Review</h3>
                <p className="text-xs text-slate-300 mb-6">Oversight for businesses with an internal bookkeeper.</p>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-400" /> Expense & VAT Review</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-400" /> Adjusting Journal Entries</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-400" /> GL Balance Recons</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-400" /> Management Accounts</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Starting From</p>
                <p className="text-3xl font-black font-sora text-white">R999 <span className="text-xs font-normal text-white/60">/month</span></p>
              </div>
            </div>

            {/* Package 3 - Highlighted */}
            <div className="bg-gradient-to-b from-brand-900 to-teal-950 border-2 border-brand-gold rounded-3xl p-6 flex flex-col justify-between relative shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <div className="absolute -top-3 right-6 bg-brand-gold text-brand-900 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                Most Popular
              </div>
              <div>
                <BookOpen className="text-brand-gold mb-4" size={28} />
                <h3 className="text-lg font-bold font-sora text-brand-gold mb-2">Full Bookkeeping</h3>
                <p className="text-xs text-slate-200 mb-6">Complete hands-off monthly bookkeeping and compliance.</p>
                <ul className="space-y-2.5 text-xs text-slate-200 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-brand-gold" /> End-to-End Bookkeeping</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-brand-gold" /> VAT & EMP201 Returns</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-brand-gold" /> Monthly Management Accounts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-brand-gold" /> CIPC Annual Return Filing</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-brand-gold/30">
                <p className="text-[10px] text-brand-gold/80 uppercase tracking-wider">Starting From</p>
                <p className="text-3xl font-black font-sora text-brand-gold">R1 999 <span className="text-xs font-normal text-white/60">/month</span></p>
              </div>
            </div>

            {/* Package 4 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:border-brand-gold/60 transition-all hover:bg-white/10">
              <div>
                <FileBarChart className="text-brand-gold mb-4" size={28} />
                <h3 className="text-lg font-bold font-sora text-white mb-2">Annual Financials</h3>
                <p className="text-xs text-slate-300 mb-6">Compilation of IFRS for SMEs Annual Financial Statements.</p>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-400" /> AFS for Tender & Banks</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-400" /> IFRS for SMEs Standard</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-400" /> IT14 Corporate Tax Return</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-emerald-400" /> Accounting Officer Sign-off</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Starting From</p>
                <p className="text-3xl font-black font-sora text-white">R5 500 <span className="text-xs font-normal text-white/60">/annum</span></p>
              </div>
            </div>

          </div>

          <div className="text-center">
            <button
              onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')}
              className="bg-brand-gold text-brand-900 font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-xl hover:bg-white transition-all shadow-xl inline-flex items-center gap-2"
            >
              Discuss Retainers With Marcia <ExternalLink size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* ─── 6. FINAL CALL TO ACTION: Direct Alignment Review ─── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-brand-900 rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl border-4 border-brand-gold/40">
            
            <h2 className="text-3xl sm:text-5xl font-sora font-extrabold mb-4 tracking-tight">
              Ready to move from <span className="text-brand-gold">Chaos to Clarity?</span>
            </h2>

            <p className="text-brand-100/80 text-base md:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Stop letting messy books steal your peace of mind. Let Integratedwellth Solutions build your holistic, IFRS-compliant financial system.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <button 
                onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')}
                className="w-full sm:w-auto bg-brand-gold text-brand-900 font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-xl hover:bg-white transition-all shadow-xl"
              >
                Book Your Financial Well-being Alignment Review
              </button>
              <button 
                onClick={onOpenAssessment}
                className="w-full sm:w-auto bg-white/10 border border-white/20 text-white font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-xl hover:bg-white/20 transition-all"
              >
                Launch Diagnostic Tool
              </button>
            </div>

            {/* Contact Details Pill */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-3 rounded-full bg-black/30 border border-white/10 text-xs font-bold text-slate-200">
              <a href="mailto:enquiries@integratedwellth.co.za" className="hover:text-brand-gold transition-colors">
                enquiries@integratedwellth.co.za
              </a>
              <span className="text-white/30">•</span>
              <a href="tel:0670555941" className="hover:text-brand-gold transition-colors">
                067 055 5941
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-brand-100/60 font-medium space-y-1">
              <p>Integratedwellth Solutions Incorporated | Accounting • Tax • Advisory</p>
              <p className="text-brand-gold/80 italic">Empowering Women. Strengthening Businesses.</p>
              <p className="text-slate-400 text-[10px]">LinkedIn: @integratedwellth | Instagram: @integratedwellth | Facebook: @integratedwellth</p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;
