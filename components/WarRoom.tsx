import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShieldCheck,
  Scale,
  Calendar,
  FileText,
  ArrowRight,
  CheckCircle2,
  Building2,
  Lock,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Clock,
  Award,
  BookOpen,
  Sparkles,
  ChevronDown,
  UserCheck,
  Check
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// -------------------------------------------------------------
// SECTION DEFINITIONS & DATA
// -------------------------------------------------------------

interface SectionItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'diagnostic', number: '01', title: 'Financial Health Diagnostic', shortTitle: 'Diagnostic Audit' },
  { id: 'playbooks', number: '02', title: 'Advisory Playbooks & Risk Defense', shortTitle: 'Advisory Playbooks' },
  { id: 'deadlines', number: '03', title: 'Statutory Regulatory Radar', shortTitle: 'Compliance Calendar' },
  { id: 'consultation', number: '04', title: 'Confidential Strategy Consultation', shortTitle: 'Book Consultation' }
];

interface DiagnosticQuestion {
  id: string;
  category: string;
  question: string;
  guidance: string;
  options: {
    label: string;
    points: number;
    implication: string;
  }[];
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'cashflow',
    category: '1. Liquidity & Working Capital Buffer',
    question: 'How many months of operational expenditure (OPEX & payroll) does your balance sheet hold in dedicated reserves?',
    guidance: 'Liquidity buffer is the single strongest predictor of SME continuity during client payment delays or macroeconomic friction in South Africa.',
    options: [
      {
        label: 'Less than 30 Days (Critical Exposure)',
        points: 0,
        implication: 'Immediate liquidity strain. High vulnerability to commercial overdraft fees or payroll shortfall.'
      },
      {
        label: '1 to 3 Months (Moderate Reserve)',
        points: 10,
        implication: 'Baseline working capital. Sufficient for steady months, but vulnerable to significant client defaults.'
      },
      {
        label: '3 to 6 Months (Healthy Balance)',
        points: 20,
        implication: 'Prudent reserve management. Operational stability allows strategic planning and supplier discounts.'
      },
      {
        label: '6+ Months (Sovereign Buffer)',
        points: 25,
        implication: 'Executive-level balance sheet resilience with dedicated statutory tax and emergency cash vaults.'
      }
    ]
  },
  {
    id: 'sars_compliance',
    category: '2. SARS & Statutory Filing Status',
    question: 'What is the current status of your VAT201, EMP201/501, and Corporate Income Tax (ITR14 / IRP6) returns?',
    guidance: 'Unreconciled returns compound daily interest and trigger automated third-party appointment notices from SARS Debt Management.',
    options: [
      {
        label: 'Backlogged / Outstanding Returns / Disputed Penalties',
        points: 0,
        implication: 'High risk of SARS admin penalties, Tax Clearance PIN suspension, or IT88 third-party agent appointments.'
      },
      {
        label: 'Reactive (Filed on deadline with frequent adjustments)',
        points: 10,
        implication: 'Compliance consumes executive time; risk of missed input tax claims and year-end reconciliation surprises.'
      },
      {
        label: 'Generally Up to Date (Handled by external bookkeeper)',
        points: 20,
        implication: 'Statutory returns are filed regularly, though strategic tax planning and forecasting remain limited.'
      },
      {
        label: 'Proactive & Fully Reconciled (Active TCS PIN & Clean Ledger)',
        points: 25,
        implication: 'Impeccable statutory standing, proactive tax structuring, and zero non-compliance exposure.'
      }
    ]
  },
  {
    id: 'legal_insulation',
    category: '3. Corporate Structure & Asset Protection',
    question: 'How is your enterprise legally structured to protect personal wealth and foundational assets from trading risks?',
    guidance: 'Operating risks (supplier debts, customer claims, labour disputes) should never bleed into IP, property, or founder personal assets.',
    options: [
      {
        label: 'Sole Proprietor / Direct Personal Exposure',
        points: 0,
        implication: 'Personal home, savings, and assets are 100% attached to business debt and creditor liabilities.'
      },
      {
        label: 'Single Operating PTY Ltd (Without Ring-Fencing)',
        points: 10,
        implication: 'Basic legal entity, but personal director sureties often expose personal assets to commercial creditors.'
      },
      {
        label: 'Holding Company / Multi-Entity Separation',
        points: 20,
        implication: 'Good separation between trading operations and key assets, reducing risk exposure across entities.'
      },
      {
        label: 'Optimized Trust & Holding Company Architecture',
        points: 25,
        implication: 'Premier estate and corporate insulation. Assets are legally ring-fenced from operational trading risks.'
      }
    ]
  },
  {
    id: 'governance_autonomy',
    category: '4. Financial Governance & Founder Autonomy',
    question: 'Could your enterprise operate, invoice, reconcile, and maintain compliance for 30 days without your daily involvement?',
    guidance: 'A sovereign enterprise operates on documented financial controls, automated cloud accounting, and structured advisory oversight.',
    options: [
      {
        label: 'Total Founder Bottleneck (Operations stall completely)',
        points: 0,
        implication: 'Founder carries all accounting, banking, and strategic decisions in their head; zero documented handover.'
      },
      {
        label: 'High Friction (Staff handle tasks, but decisions stall)',
        points: 10,
        implication: 'Routine work continues, but strategic billing, compliance reviews, and authorizations halt.'
      },
      {
        label: 'Structured Processes (Monthly management accounts in place)',
        points: 20,
        implication: 'Cloud accounting and documented routines enable normal operations with periodic founder check-ins.'
      },
      {
        label: 'Autonomous Financial Engine (Fractional CBA & Cloud Controls)',
        points: 25,
        implication: 'Professional management accounts, continuous forecasting, and strategic advisory running autonomously.'
      }
    ]
  }
];

// Professional Practice Advisory Playbooks
interface AdvisoryPlaybook {
  id: string;
  title: string;
  statutoryReference: string;
  tag: string;
  trigger: string;
  consequences: string;
  actionProtocol: string[];
  practiceSupport: string;
}

const ADVISORY_PLAYBOOKS: AdvisoryPlaybook[] = [
  {
    id: 'sars_it88',
    title: 'SARS Third-Party Agent Appointment (IT88 Bank Notice)',
    statutoryReference: 'Section 164 & 179 of the Tax Administration Act No. 28 of 2011',
    tag: 'Urgent Tax Dispute',
    trigger: 'Unresolved historic tax assessment, unallocated return discrepancy, or unanswered final demand notice.',
    consequences: 'SARS instructs commercial banks to remit funds directly from trading accounts to satisfy the alleged tax debt, risking immediate payroll failure.',
    actionProtocol: [
      'Submit an immediate formal Request for Suspension of Payment under Section 164(2) of the Tax Administration Act.',
      'Lodge a formal Notice of Objection (NOO / Section 104) if the assessment contains factual or legal errors.',
      'Engage SARS Debt Management with an audited statement of assets and liabilities to negotiate a structured deferral (Section 200).'
    ],
    practiceSupport: 'Our registered Tax Practitioners assume direct liaison with SARS, file statutory suspension notices to safeguard your bank accounts, and rectify erroneous assessments.'
  },
  {
    id: 'vat_bad_debt',
    title: 'Major Client Insolvency & Unpaid Trade Invoices',
    statutoryReference: 'Section 22(1) of the Value-Added Tax Act No. 89 of 1991',
    tag: 'Cash Flow Protection',
    trigger: 'A commercial debtor goes into business rescue, liquidation, or defaults past 90–120 days on a significant invoice.',
    consequences: 'Your business has already paid output VAT on revenue never received, creating a double cash deficit and restricting working capital.',
    actionProtocol: [
      'Formally write off the irrecoverable balance in the general ledger with complete supporting audit trail and recovery correspondence.',
      'Claim an input tax deduction under Section 22(1) on the subsequent VAT201 return to recover output VAT previously remitted to SARS.',
      'Revise future standard terms of service to include retention-of-title clauses, upfront milestone billing, or credit insurance.'
    ],
    practiceSupport: 'We audit the bad-debt write-off schedule, compile required evidentiary documentation for SARS verification, and adjust working capital forecasts.'
  },
  {
    id: 'cipc_compliance',
    title: 'CIPC Impending Deregistration & Beneficial Ownership',
    statutoryReference: 'Companies Act No. 71 of 2008 & General Laws Amendment Act of 2022',
    tag: 'Corporate Governance',
    trigger: 'Failure to submit annual returns for consecutive periods or non-filing of the mandatory Beneficial Ownership (BO) register.',
    consequences: 'The entity enters "Deregistration Process" with CIPC. Corporate bank accounts are frozen, and contracts, licenses, and leases risk becoming legally unenforceable.',
    actionProtocol: [
      'Perform an immediate CIPC status check and calculate outstanding filing fees and turnover declarations.',
      'Prepare and file the mandatory Beneficial Ownership Register alongside compliant MOI and director identification records.',
      'Obtain an updated CIPC Disclosure Certificate confirming active good standing for commercial banks and tender compliance.'
    ],
    practiceSupport: 'As registered CIPC filing agents, we resolve historic arrear returns, establish compliance monitoring schedules, and keep your corporate standing spotless.'
  },
  {
    id: 'payroll_reconciliation',
    title: 'Bi-Annual EMP501 Payroll Discrepancies & Audit Flags',
    statutoryReference: 'Fourth Schedule to the Income Tax Act No. 58 of 1962',
    tag: 'Payroll & Labour',
    trigger: 'Discrepancies between monthly EMP201 returns, actual employee salary records, and the bi-annual EMP501 reconciliation.',
    consequences: 'Automatic 10% penalty for late or erroneous reconciliation, accompanied by compounding interest and suspension of Tax Compliance Status (TCS).',
    actionProtocol: [
      'Conduct a thorough month-by-month payroll reconciliation against SARS eFiling statement of accounts and general ledger journals.',
      'Re-issue corrected IRP5/IT3(a) certificates and re-submit via e@syFile or eFiling.',
      'Submit a formal Request for Remission of Administrative Penalties citing procedural compliance history.'
    ],
    practiceSupport: 'Our payroll specialists perform forensic reconciliation, rectify submission discrepancies, and restore your active Tax Clearance PIN.'
  }
];

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------

const WarRoom: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('diagnostic');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({
    cashflow: 10,
    sars_compliance: 10,
    legal_insulation: 10,
    governance_autonomy: 10
  });

  const [activePlaybookId, setActivePlaybookId] = useState<string>('sars_it88');

  // Consultation Intake Form
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    workEmail: '',
    contactNumber: '',
    turnoverBracket: 'R1M – R7M / year (Growing SME)',
    primaryChallenge: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of SECTIONS) {
        const el = document.getElementById(`section-${section.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`section-${id}`);
    if (element) {
      const navOffset = 110;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  };

  // Compute Total Score
  const totalScore = useMemo(() => {
    return Object.values(selectedAnswers).reduce((a, b) => a + b, 0);
  }, [selectedAnswers]);

  // Score Assessment Details
  const assessmentDetails = useMemo(() => {
    if (totalScore <= 35) {
      return {
        level: 'Critical Vulnerability — Structural Intervention Required',
        tierBadge: 'High Risk Exposure',
        badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
        summary: 'Your enterprise is operating with elevated exposure to SARS penalties, cash flow bottlenecks, and personal liability risks.',
        recommendation: 'Immediate forensic compliance catch-up, cash vault segregation, and formal representation before regulatory authorities.',
        suggestedService: 'Foundation Compliance Pathway & Urgent Remediation'
      };
    } else if (totalScore <= 65) {
      return {
        level: 'Reactive Compliance — Growth Bottlenecks Present',
        tierBadge: 'Moderate Exposure',
        badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
        summary: 'Statutory obligations are managed, but administrative overhead consumes valuable leadership time. Financial systems lack forward-looking forecasting.',
        recommendation: 'Implement bi-monthly management accounts, automated VAT/EMP workflows, and cash flow forecasting models.',
        suggestedService: 'Ascension Pathway — Fractional CBA & Financial Governance'
      };
    } else if (totalScore <= 85) {
      return {
        level: 'Stable Foundation — Ready for Strategic Scale',
        tierBadge: 'Stable Standing',
        badgeColor: 'bg-teal-50 text-teal-900 border-teal-200',
        summary: 'Sound operational disciplines with low immediate regulatory risk. Next priority is tax optimization and balance sheet efficiency.',
        recommendation: 'Enhance corporate restructuring, asset insulation, and executive board-level financial reporting.',
        suggestedService: 'Ascension or Sovereign Advisory Retainer'
      };
    } else {
      return {
        level: 'Sovereign Standing — Premier Balance Sheet Architecture',
        tierBadge: 'Audit-Proof & Insulated',
        badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
        summary: 'Exemplary financial hygiene, robust asset ring-fencing, and high founder autonomy. Focus remains on wealth preservation and legacy growth.',
        recommendation: 'Continuous fractional CBA governance, tax restructuring, and strategic capital allocation.',
        suggestedService: 'Sovereign Pathway — Complete Executive Financial Leadership'
      };
    }
  }, [totalScore]);

  // Dynamic South African Statutory Calendar
  const statutoryDeadlines = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Next EMP201 (7th of next month)
    const nextEmpMonth = (currentMonth + 1) % 12;
    const nextEmpYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const empDate = new Date(nextEmpYear, nextEmpMonth, 7);

    // Next VAT201 (25th of cycle)
    let vatDate: Date;
    if (now.getDate() <= 25) {
      vatDate = new Date(currentYear, currentMonth, 25);
    } else {
      const nextVatMonth = (currentMonth + 1) % 12;
      const nextVatYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      vatDate = new Date(nextVatYear, nextVatMonth, 25);
    }

    // Provisional Tax Periods (31 Aug & 28 Feb)
    let provDate: Date;
    if (currentMonth < 7 || (currentMonth === 7 && now.getDate() <= 31)) {
      provDate = new Date(currentYear, 7, 31);
    } else {
      const febYear = currentMonth >= 8 ? currentYear + 1 : currentYear;
      provDate = new Date(febYear, 1, 28);
    }

    const calcDays = (target: Date) => {
      const diff = target.getTime() - now.getTime();
      return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    return [
      {
        name: 'EMP201 Monthly Payroll & UIF Submission',
        authority: 'South African Revenue Service (SARS)',
        dueDate: empDate.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }),
        daysRemaining: calcDays(empDate),
        description: 'Monthly declaration of PAYE, SDL, and UIF deductions withheld from employee remuneration.'
      },
      {
        name: 'VAT201 Bi-Monthly Return & Settlement',
        authority: 'South African Revenue Service (SARS)',
        dueDate: vatDate.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }),
        daysRemaining: calcDays(vatDate),
        description: 'Statutory reconciliation and settlement of output VAT collected against allowable input VAT incurred.'
      },
      {
        name: 'Provisional Tax Return (IRP6 Period)',
        authority: 'South African Revenue Service (SARS)',
        dueDate: provDate.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }),
        daysRemaining: calcDays(provDate),
        description: 'Statutory estimate and advance payment of corporate and director taxable income.'
      },
      {
        name: 'CIPC Annual Return & Beneficial Ownership Filing',
        authority: 'Companies and Intellectual Property Commission',
        dueDate: 'Annual Anniversary Cycle',
        daysRemaining: 14,
        description: 'Mandatory annual enterprise turnover declaration and Beneficial Ownership register verification.'
      }
    ];
  }, []);

  // Handle Form Submission
  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (db) {
        await addDoc(collection(db, 'war_room_leads'), {
          name: formData.fullName,
          company: formData.companyName,
          email: formData.workEmail,
          phone: formData.contactNumber,
          turnover: formData.turnoverBracket,
          primaryChallenge: formData.primaryChallenge || '',
          score: totalScore,
          assessmentStatus: assessmentDetails.level,
          recommendedPathway: assessmentDetails.suggestedService,
          submittedAt: serverTimestamp()
        });

        // Email dispatch
        await addDoc(collection(db, 'mail'), {
          to: formData.workEmail,
          message: {
            subject: `[CONFIDENTIAL] Financial Health & Compliance Assessment: ${formData.companyName}`,
            html: `<div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 640px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #134e4a; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">Executive Financial Health Summary</h2>
              <p>Dear <strong>${formData.fullName}</strong>,</p>
              <p>Thank you for completing the Strategic Financial Diagnostic for <strong>${formData.companyName}</strong>.</p>
              <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; margin: 16px 0; border-left: 4px solid #134e4a;">
                <p style="margin: 0; font-size: 13px; color: #64748b; text-transform: uppercase;">Diagnostic Score</p>
                <h3 style="margin: 4px 0 0 0; color: #134e4a; font-size: 24px;">${totalScore} / 100</h3>
                <p style="margin: 4px 0 0 0; font-weight: bold; color: #0f172a;">${assessmentDetails.level}</p>
              </div>
              <p><strong>Professional Recommendation:</strong><br/>${assessmentDetails.recommendation}</p>
              <p><strong>Suggested Structure:</strong><br/>${assessmentDetails.suggestedService}</p>
              <p style="margin-top: 24px;">
                <a href="https://calendly.com/marcia-kgaphola/new-meeting" style="background-color: #134e4a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Schedule Discovery Consultation</a>
              </p>
              <p style="font-size: 12px; color: #94a3b8; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                Integrated Wellth Solutions · Chartered Business Accountants (CIBA) · Registered Tax Practitioners (SAIT)
              </p>
            </div>`
          }
        });
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] text-stone-900 min-h-screen font-sans selection:bg-brand-gold/30 pt-32 pb-32">
      
      {/* --------------------------------------------------------- */}
      {/* HEADER SECTION */}
      {/* --------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <RevealOnScroll width="100%">
          <div className="border-b border-stone-200/80 pb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-semibold">
                <ShieldCheck size={14} className="text-teal-700" /> Executive Advisory & Diagnostic Center
              </span>
              <span className="text-xs text-stone-600 font-medium">
                CIBA · SAIT · SAICA Accredited Practice
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sora font-extrabold text-brand-900 tracking-tight leading-[1.08]">
                  The Strategic <span className="text-brand-gold italic">War Room</span>.
                </h1>
                <p className="text-base sm:text-lg text-stone-600 max-w-3xl leading-relaxed">
                  A structured advisory diagnostic designed for South African founders and directors to stress-test liquidity reserves, resolve statutory tax vulnerabilities, and establish long-term financial sovereignty.
                </p>
              </div>

              {/* Dynamic Score Preview */}
              <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-3 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Diagnostic Index</span>
                  <span className="text-3xl font-sora font-black text-brand-900">{totalScore} <span className="text-xs text-stone-400 font-normal">/ 100</span></span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-gold h-full transition-all duration-500 ease-out"
                    style={{ width: `${totalScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between pt-1 text-xs text-stone-600 font-medium">
                  <span>Current Assessment:</span>
                  <strong className="text-stone-900 truncate max-w-[170px]">{assessmentDetails.tierBadge}</strong>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* --------------------------------------------------------- */}
      {/* STICKY MINIMALIST SECTION TOGGLE BAR */}
      {/* --------------------------------------------------------- */}
      <div className="sticky top-20 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-y border-stone-200/80 py-3 px-6 mb-16 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`group relative px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-brand-900 text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 border border-stone-200/70'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-brand-gold' : 'text-stone-400 group-hover:text-stone-600'}`}>
                    {sec.number}
                  </span>
                  <span>{sec.shortTitle}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Consultation Trigger */}
          <button
            onClick={() => scrollToSection('consultation')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-brand-900 hover:text-brand-gold transition-colors shrink-0 uppercase tracking-wider"
          >
            Speak to a CBA <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-24">

        {/* ------------------------------------------------------- */}
        {/* SECTION 01: FINANCIAL HEALTH DIAGNOSTIC */}
        {/* ------------------------------------------------------- */}
        <section id="section-diagnostic" className="scroll-mt-36">
          <RevealOnScroll width="100%">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-brand-900 text-brand-gold font-mono font-bold text-xs flex items-center justify-center">
                  01
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                    Interactive Evaluation
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-sora font-extrabold text-brand-900">
                    Financial Health Diagnostic
                  </h2>
                </div>
              </div>
              <span className="hidden md:inline-flex text-xs font-semibold text-stone-500 bg-white px-3 py-1 rounded-full border border-stone-200">
                4-Pillar Structural Audit
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: The 4 Diagnostic Pillar Cards */}
              <div className="lg:col-span-8 space-y-6">
                {DIAGNOSTIC_QUESTIONS.map((item, qIdx) => {
                  const currentVal = selectedAnswers[item.id] ?? 10;
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-stone-300"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                            {item.category}
                          </span>
                          <h3 className="text-lg font-bold text-stone-900 font-sora mt-1 leading-snug">
                            {item.question}
                          </h3>
                          <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                            {item.guidance}
                          </p>
                        </div>
                      </div>

                      {/* Options Toggle List */}
                      <div className="space-y-2.5 pt-1">
                        {item.options.map((opt, oIdx) => {
                          const isSelected = currentVal === opt.points;
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => setSelectedAnswers(prev => ({ ...prev, [item.id]: opt.points }))}
                              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start justify-between gap-4 group ${
                                isSelected
                                  ? 'border-brand-900 bg-teal-50/40 shadow-sm ring-1 ring-brand-900/20'
                                  : 'border-stone-200 bg-stone-50/40 hover:bg-white hover:border-stone-300'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                      isSelected
                                        ? 'border-brand-900 bg-brand-900'
                                        : 'border-stone-300 group-hover:border-stone-400'
                                    }`}
                                  >
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  </div>
                                  <span className={`text-sm font-bold ${isSelected ? 'text-brand-900' : 'text-stone-800'}`}>
                                    {opt.label}
                                  </span>
                                </div>
                                <p className="text-xs text-stone-600 pl-6 leading-relaxed">
                                  {opt.implication}
                                </p>
                              </div>
                              <span className="text-xs font-mono font-semibold text-stone-400 shrink-0 pt-0.5">
                                {opt.points} pts
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: Sticky Executive Diagnostic Dossier */}
              <div className="lg:col-span-4 sticky top-36 space-y-6">
                <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-gold block mb-1">
                      Audited Resilience
                    </span>
                    <h3 className="text-xl font-sora font-extrabold text-brand-900">
                      Executive Finding
                    </h3>
                  </div>

                  {/* Score Matrix */}
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Diagnostic Score:</span>
                      <span className="text-2xl font-black font-sora text-brand-900">{totalScore}%</span>
                    </div>
                    <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-900 h-full transition-all duration-300"
                        style={{ width: `${totalScore}%` }}
                      />
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold border ${assessmentDetails.badgeColor}`}>
                      {assessmentDetails.tierBadge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-stone-900 uppercase tracking-wider block text-[11px]">
                      Practice Evaluation:
                    </span>
                    <p className="text-stone-600 leading-relaxed">
                      {assessmentDetails.summary}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs border-t border-stone-100 pt-4">
                    <span className="font-bold text-stone-900 uppercase tracking-wider block text-[11px]">
                      Prescribed Strategy:
                    </span>
                    <p className="text-stone-800 font-medium leading-relaxed bg-teal-50/50 p-3.5 rounded-xl border border-teal-100/80">
                      {assessmentDetails.recommendation}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => scrollToSection('consultation')}
                      className="w-full py-3.5 bg-brand-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-gold hover:text-brand-900 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                    >
                      Book Confidential Review <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </RevealOnScroll>
        </section>

        {/* ------------------------------------------------------- */}
        {/* SECTION 02: ADVISORY PLAYBOOKS & RISK DEFENSE */}
        {/* ------------------------------------------------------- */}
        <section id="section-playbooks" className="scroll-mt-36">
          <RevealOnScroll width="100%">
            <div className="bg-[#F4F3EE] border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-300/60 pb-6">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-brand-900 text-brand-gold font-mono font-bold text-xs flex items-center justify-center">
                    02
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                      South African Statutory Defense
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-sora font-extrabold text-brand-900">
                      Advisory Playbooks & Risk Defense
                    </h2>
                  </div>
                </div>
                <p className="text-xs text-stone-600 max-w-sm sm:text-right">
                  Standard operating procedures for managing critical tax, CIPC, and commercial liquidity challenges.
                </p>
              </div>

              {/* Minimalist Toggle Selector Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {ADVISORY_PLAYBOOKS.map(item => {
                  const isSelected = activePlaybookId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePlaybookId(item.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'border-brand-900 bg-white shadow-md ring-1 ring-brand-900/10'
                          : 'border-stone-300/70 bg-white/60 hover:bg-white text-stone-600'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block mb-1">
                          {item.tag}
                        </span>
                        <h4 className="font-bold text-sm text-stone-900 leading-snug">
                          {item.title}
                        </h4>
                      </div>
                      <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-stone-500">View Protocol</span>
                        <ChevronRight size={14} className={isSelected ? 'text-brand-900' : 'text-stone-400'} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Playbook Detailed Dossier */}
              {(() => {
                const activePlaybook = ADVISORY_PLAYBOOKS.find(p => p.id === activePlaybookId) || ADVISORY_PLAYBOOKS[0];
                return (
                  <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
                    <div className="border-b border-stone-100 pb-4 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-900 border border-teal-200">
                          {activePlaybook.tag}
                        </span>
                        <span className="text-xs font-mono text-stone-500 font-medium">
                          {activePlaybook.statutoryReference}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-sora font-extrabold text-brand-900">
                        {activePlaybook.title}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                      <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 space-y-2">
                        <span className="font-bold text-stone-900 uppercase tracking-wider block text-[11px]">
                          Trigger & Commercial Hazard:
                        </span>
                        <p className="text-stone-700 leading-relaxed">{activePlaybook.trigger}</p>
                        <p className="text-rose-900 font-medium leading-relaxed pt-2 border-t border-stone-200">
                          <strong>Consequence:</strong> {activePlaybook.consequences}
                        </p>
                      </div>

                      <div className="bg-teal-50/50 p-5 rounded-xl border border-teal-100 space-y-2">
                        <span className="font-bold text-teal-900 uppercase tracking-wider block text-[11px]">
                          How Integrated Wellth Protects You:
                        </span>
                        <p className="text-teal-950 leading-relaxed font-medium">
                          {activePlaybook.practiceSupport}
                        </p>
                      </div>
                    </div>

                    {/* Step-by-Step Response Protocol */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                        <Award size={15} className="text-brand-gold" /> Step-by-Step Statutory Remediation Protocol:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {activePlaybook.actionProtocol.map((step, sIdx) => (
                          <div key={sIdx} className="bg-stone-50/70 border border-stone-200 p-4 rounded-xl space-y-1 text-xs">
                            <span className="text-[10px] font-mono font-bold text-brand-gold">PHASE 0{sIdx + 1}</span>
                            <p className="text-stone-700 leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <p className="text-xs text-stone-500">
                        Facing this issue right now? Our registered tax practitioners can intervene on your behalf.
                      </p>
                      <button
                        onClick={() => scrollToSection('consultation')}
                        className="px-6 py-3 bg-brand-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-gold hover:text-brand-900 transition-colors shrink-0"
                      >
                        Engage Practice for this Issue
                      </button>
                    </div>
                  </div>
                );
              })()}

            </div>
          </RevealOnScroll>
        </section>

        {/* ------------------------------------------------------- */}
        {/* SECTION 03: STATUTORY REGULATORY RADAR */}
        {/* ------------------------------------------------------- */}
        <section id="section-deadlines" className="scroll-mt-36">
          <RevealOnScroll width="100%">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-brand-900 text-brand-gold font-mono font-bold text-xs flex items-center justify-center">
                  03
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                    Statutory Telemetry
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-sora font-extrabold text-brand-900">
                    Statutory Compliance Calendar
                  </h2>
                </div>
              </div>
              <a
                href="#compliance-calendar"
                className="text-xs font-bold text-brand-900 hover:text-brand-gold uppercase tracking-wider flex items-center gap-1"
              >
                Access Full Calendar View <ExternalLink size={13} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {statutoryDeadlines.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-4 hover:border-stone-300 transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded">
                        {item.authority}
                      </span>
                      <span className="text-xs font-mono font-bold text-stone-600">
                        {item.dueDate}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-stone-900 font-sora pt-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-400">Estimated Days Remaining:</span>
                    <span className={`text-lg font-black font-sora ${item.daysRemaining <= 7 ? 'text-rose-600' : 'text-brand-900'}`}>
                      {item.daysRemaining} Days
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-6 text-xs text-stone-600 space-y-2">
              <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-gold" /> Proactive Compliance Management:
              </h4>
              <p className="leading-relaxed">
                Under our ongoing monthly Sovereignty Pathways (Foundation, Ascension, Sovereign), Integrated Wellth Solutions handles all monthly transaction categorization, VAT201 calculations, EMP201 submissions, and CIPC filings well in advance of these deadlines to ensure zero administrative penalties.
              </p>
            </div>
          </RevealOnScroll>
        </section>

        {/* ------------------------------------------------------- */}
        {/* SECTION 04: CONFIDENTIAL STRATEGY CONSULTATION */}
        {/* ------------------------------------------------------- */}
        <section id="section-consultation" className="scroll-mt-36">
          <RevealOnScroll width="100%">
            <div className="bg-brand-900 text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

              {!isSubmitted ? (
                <div className="max-w-3xl mx-auto space-y-8 relative z-10">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                    <span className="w-7 h-7 rounded-full bg-brand-gold text-brand-900 font-mono font-bold text-xs flex items-center justify-center">
                      04
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block">
                        Direct Practice Engagement
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-sora font-extrabold text-white">
                        Schedule Confidential Strategy Session
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-100/80 leading-relaxed">
                    Discuss your enterprise structure, resolve outstanding SARS audit inquiries, or explore fractional CBA advisory with Principal Practice Leader Marcia Kgaphola.
                  </p>

                  {/* Diagnostic Context Pill */}
                  <div className="bg-white/10 p-4 rounded-xl border border-white/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                    <div>
                      <span className="text-white/60 uppercase tracking-wider block text-[10px]">Diagnostic Index</span>
                      <span className="font-bold text-white">Score: {totalScore}/100 — {assessmentDetails.tierBadge}</span>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-white/60 uppercase tracking-wider block text-[10px]">Suggested Advisory Tier</span>
                      <span className="font-bold text-brand-gold">{assessmentDetails.suggestedService}</span>
                    </div>
                  </div>

                  <form onSubmit={handleIntakeSubmit} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-brand-100 uppercase tracking-wider mb-1">Full Name *</label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. Marcia Kgaphola"
                          className="w-full p-3.5 bg-white/5 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:border-brand-gold focus:bg-white/10 outline-none placeholder:text-white/40"
                          value={formData.fullName}
                          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-100 uppercase tracking-wider mb-1">Business / Registered Entity *</label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. Acacia Innovations (Pty) Ltd"
                          className="w-full p-3.5 bg-white/5 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:border-brand-gold focus:bg-white/10 outline-none placeholder:text-white/40"
                          value={formData.companyName}
                          onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-100 uppercase tracking-wider mb-1">Work Email *</label>
                        <input
                          required
                          type="email"
                          placeholder="director@company.co.za"
                          className="w-full p-3.5 bg-white/5 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:border-brand-gold focus:bg-white/10 outline-none placeholder:text-white/40"
                          value={formData.workEmail}
                          onChange={e => setFormData({ ...formData, workEmail: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-100 uppercase tracking-wider mb-1">Cellphone / WhatsApp *</label>
                        <input
                          required
                          type="tel"
                          placeholder="082 123 4567"
                          className="w-full p-3.5 bg-white/5 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:border-brand-gold focus:bg-white/10 outline-none placeholder:text-white/40"
                          value={formData.contactNumber}
                          onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-100 uppercase tracking-wider mb-1">Annual Turnover Bracket</label>
                      <select
                        value={formData.turnoverBracket}
                        onChange={e => setFormData({ ...formData, turnoverBracket: e.target.value })}
                        className="w-full p-3.5 bg-brand-900 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:border-brand-gold outline-none"
                      >
                        <option value="Under R1M / year (Foundation Tier)">Under R1 Million / year (Foundation Tier)</option>
                        <option value="R1M – R7M / year (Growing SME)">R1 Million – R7 Million / year (Ascension Tier)</option>
                        <option value="R7M – R25M+ / year (Established Enterprise)">R7 Million – R25 Million+ / year (Sovereign Tier)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-100 uppercase tracking-wider mb-1">Primary Compliance or Advisory Challenge (Optional)</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Outstanding VAT reconciliations, CIPC beneficial ownership filing, fractional CBA advisory..."
                        className="w-full p-3.5 bg-white/5 border border-white/20 rounded-xl text-xs sm:text-sm text-white focus:border-brand-gold focus:bg-white/10 outline-none placeholder:text-white/40"
                        value={formData.primaryChallenge}
                        onChange={e => setFormData({ ...formData, primaryChallenge: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-gold text-brand-900 font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg hover:bg-white transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      {isSubmitting ? 'Transmitting Request...' : 'Submit Strategy Consultation Request'} <ArrowRight size={14} />
                    </button>

                    <p className="text-[11px] text-center text-white/50 pt-1">
                      All consultation inquiries and financial disclosures are protected by professional non-disclosure standards.
                    </p>
                  </form>
                </div>
              ) : (
                /* Confirmation Screen */
                <div className="max-w-xl mx-auto text-center space-y-6 py-6">
                  <div className="w-16 h-16 bg-white/10 text-brand-gold rounded-full flex items-center justify-center mx-auto border border-brand-gold/30">
                    <CheckCircle2 size={36} />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-white/10 px-3 py-1 rounded-full">
                      Consultation Logged
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-sora font-extrabold text-white">
                      Thank You, {formData.fullName}
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-100/80 leading-relaxed">
                      Your diagnostic file for <strong>{formData.companyName}</strong> has been received. A summary copy has been queued for <strong>{formData.workEmail}</strong>.
                    </p>
                  </div>

                  <div className="p-6 bg-white/10 rounded-2xl text-left text-xs space-y-3 border border-white/15">
                    <span className="font-bold text-brand-gold uppercase tracking-wider block text-[10px]">
                      Immediate Next Step
                    </span>
                    <p className="text-brand-100">
                      Reserve your 30-minute discovery consultation directly on Principal Marcia Kgaphola's calendar:
                    </p>
                    <a
                      href="https://calendly.com/marcia-kgaphola/new-meeting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-brand-gold text-brand-900 rounded-xl font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-md"
                    >
                      Schedule Discovery Session <ExternalLink size={14} />
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        scrollToSection('diagnostic');
                      }}
                      className="text-xs text-white/60 hover:text-white underline"
                    >
                      Return to Diagnostic Top
                    </button>
                  </div>
                </div>
              )}
            </div>
          </RevealOnScroll>
        </section>

      </div>
    </div>
  );
};

export default WarRoom;
