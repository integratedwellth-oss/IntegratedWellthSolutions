import React, { useState, useMemo } from 'react';
import RevealOnScroll from '../RevealOnScroll';
import NewsTicker from '../NewsTicker';
import Button from '../Button';
import {
  ShieldCheck,
  Tag,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Upload,
  Building,
  X,
  Check,
  Search,
  Filter,
  Sparkles,
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Calculator,
  FileText,
  Briefcase,
  UserCheck,
  Scale,
  Clock,
  TrendingUp,
  AlertTriangle,
  Copy,
  ExternalLink,
  Calendar,
  Plus,
  Minus,
  MessageSquare,
  BadgePercent,
  CheckCircle
} from 'lucide-react';
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// -------------------------------------------------------------
// SERVICE DEFINITIONS & DATA
// -------------------------------------------------------------

export interface ServiceItem {
  id: string;
  code: string;
  category: 'core' | 'pathway' | 'payg';
  title: string;
  subtitle: string;
  description: string;
  type: 'once-off' | 'monthly' | 'annual' | 'turnaround';
  turnaround?: string;
  regularPrice: number;
  specialPrice: number;
  savingsLabel?: string;
  isRecommended?: boolean;
  modules: string[];
  requirements?: string;
  bestFor?: string;
}

// 1. Core Promotional Packages (Configuration Modules)
const CORE_PACKAGES: ServiceItem[] = [
  {
    id: 'sys_config',
    code: '01',
    category: 'core',
    title: 'System Configuration & Setup',
    subtitle: 'Once-off deployment & foundational architecture',
    description: 'Establish the foundational digital architecture for your financial reporting, cloud ledger, and compliance.',
    type: 'once-off',
    regularPrice: 3500,
    specialPrice: 2625,
    savingsLabel: 'Save R875',
    isRecommended: false,
    modules: ['Chart of Accounts', 'Bank Account Integration', 'Invoices & Bills Setup', 'Open Balances Setup'],
    requirements: 'Company registration number, bank confirmation letter, past financial records or trial balance.'
  },
  {
    id: 'monthly_rev',
    code: '02',
    category: 'core',
    title: 'Monthly Review & Journal Entries',
    subtitle: 'Recurring monthly oversight & precision adjustments',
    description: 'Ongoing oversight and precision adjustments to ensure complete data integrity, reconciliations, and hygiene.',
    type: 'monthly',
    regularPrice: 1500,
    specialPrice: 1125,
    savingsLabel: 'Save R375 / mo',
    isRecommended: true,
    modules: ['Review Monthly Expenses', 'GL Reconciliations', 'Process Journal Entries', 'Management Accounts'],
    requirements: 'Monthly bank statements, supplier invoices, sales summaries.'
  },
  {
    id: 'monthly_book',
    code: '03',
    category: 'core',
    title: 'Monthly Bookkeeping',
    subtitle: 'Comprehensive monthly ledger maintenance',
    description: 'Full-service transaction categorization, bank reconciliations, accounts payable/receivable, and reporting.',
    type: 'monthly',
    regularPrice: 2500,
    specialPrice: 1875,
    savingsLabel: 'Save R625 / mo',
    isRecommended: false,
    modules: ['Core Bookkeeping', 'Management Accounts', 'Annual Returns Prep', 'Accounts Receivable / Payable'],
    requirements: 'Cloud accounting access or raw transaction feeds and slips.'
  },
  {
    id: 'annual_fin',
    code: '04',
    category: 'core',
    title: 'Annual Financial Statements & Returns',
    subtitle: 'Year-end compliance bundle & SARS submission',
    description: 'Compilation of official SARS and CIPC compliant year-end financial statements signed off by accredited professionals.',
    type: 'annual',
    regularPrice: 6000,
    specialPrice: 4500,
    savingsLabel: 'Save R1,500 / yr',
    isRecommended: false,
    modules: ['Annual SARS Returns', 'Annual CIPC Returns', 'Full AFS Compilation', 'Audit Ready Support'],
    requirements: 'Full 12-month general ledger, fixed asset register, bank statements.'
  }
];

// 2. Sovereignty Pathways (Monthly Plans in Simple English with CBA)
export interface PathwayPlan {
  id: string;
  name: string;
  turnoverLimit: string;
  badge: string;
  monthlyPrice: number;
  targetDescription: string;
  simpleHeadline: string;
  features: string[];
  plainEnglishBenefit: string;
  isPopular?: boolean;
}

const SOVEREIGNTY_PATHWAYS: PathwayPlan[] = [
  {
    id: 'pathway_foundation',
    name: 'Foundation',
    turnoverLimit: 'Turning over less than R1 Million / year',
    badge: 'Just Getting Started',
    monthlyPrice: 3500,
    targetDescription: 'For startups and early-stage businesses getting their compliance fully locked down.',
    simpleHeadline: 'For businesses just getting started',
    features: [
      'Quarterly management reports (know your numbers every 3 months)',
      'Monthly bookkeeping and bank reconciliations',
      'Annual Financial Statements (official signed AFS)',
      'Provisional and annual income tax filings',
      'CIPC Annual Returns filed on time',
      'Full payroll processing & slip distribution',
      'Monthly PAYE and UIF submissions',
      'Active Tax Clearance PIN maintenance',
      'Dedicated Wellth Advisor who knows your business',
      'Strategic review every quarter'
    ],
    plainEnglishBenefit: "You're fully compliant. SARS, CIPC, and Labour are sorted. You have a dedicated professional to call when you're confused, and you stop worrying about surprise penalties."
  },
  {
    id: 'pathway_ascension',
    name: 'Ascension',
    turnoverLimit: 'Turning over up to R7 Million / year',
    badge: 'Growing Fast • Most Popular',
    monthlyPrice: 7000,
    targetDescription: 'For growing businesses moving from basic compliance to real forward-looking financial planning.',
    simpleHeadline: 'For businesses that are growing',
    isPopular: true,
    features: [
      'Everything in Foundation, PLUS:',
      'Bi-monthly management reports (every 2 months — faster insight)',
      'VAT201 calculations and timely submissions',
      'Beneficial Ownership register filings with CIPC',
      'Cash flow forecasting (know before cash gets tight)',
      'Budgeting assistance and expense variance tracking',
      'Financial Manager support & direct desk access',
      'Monthly strategic review sessions',
      'Fractional CBA-level advisory'
    ],
    plainEnglishBenefit: "You move from 'staying legal' to 'actually planning.' You see cash flow bottlenecks before they hit and make strategic decisions based on real numbers, not gut feel."
  },
  {
    id: 'pathway_sovereign',
    name: 'Sovereign',
    turnoverLimit: 'Turning over up to R25 Million / year',
    badge: 'Established Scale',
    monthlyPrice: 11500,
    targetDescription: 'For established enterprises demanding executive-level financial architecture and priority support.',
    simpleHeadline: 'For established businesses running at scale',
    features: [
      'Everything in Ascension, PLUS:',
      'Monthly management reports (fresh numbers every single month)',
      'Advanced financial governance & internal control audits',
      'Continuous active cash management',
      'Comprehensive tax planning & restructuring',
      'Dedicated Senior Partner review',
      'Priority support with rapid turnaround',
      'Unlimited CBA advisory & strategic board support',
      'Unlimited strategic business review sessions',
      'Access to our War Room stress-testing tool',
      'Your Financial Health Score & Customised Battle Plan'
    ],
    plainEnglishBenefit: 'You get a full executive financial leadership team without hiring a full-time CBA. You get senior-level strategic thinking at a fraction of the cost, freeing your time to scale.'
  }
];

// 3. Pay-As-You-Go Menu
const PAYG_SERVICES: ServiceItem[] = [
  {
    id: 'payg_cipc_return',
    code: 'PAYG-01',
    category: 'payg',
    title: 'CIPC Annual Return',
    subtitle: 'Keep your company active & legally compliant',
    description: 'File your annual return with CIPC so your entity stays in business and avoids administrative deregistration.',
    type: 'turnaround',
    turnaround: '1–2 days',
    regularPrice: 650,
    specialPrice: 450,
    savingsLabel: '+ CIPC fee',
    modules: ['CIPC Submission', 'Status Verification', 'Good Standing Confirmation'],
    requirements: 'Company reg number, latest turnover figures, director ID copies.'
  },
  {
    id: 'payg_mgmt_accs',
    code: 'PAYG-02',
    category: 'payg',
    title: 'Stand-alone Management Accounts',
    subtitle: 'Detailed snapshot of business profitability',
    description: 'Comprehensive financial statements showing profit & loss, balance sheet, cash flows, and key performance ratios.',
    type: 'turnaround',
    turnaround: '3–5 days',
    regularPrice: 6500,
    specialPrice: 5000,
    savingsLabel: 'Save R1,500',
    modules: ['Income Statement', 'Balance Sheet', 'Cash Flow Analysis', 'Executive Summary'],
    requirements: 'Accounting software access, bank statements, invoices, payroll summaries.'
  },
  {
    id: 'payg_acc_letter',
    code: 'PAYG-03',
    category: 'payg',
    title: "Accountant's Letter / Proof of Income",
    subtitle: 'Signed verification for tenders, visas & bank loans',
    description: 'Official letter from accredited accountant (SAIT/CIBA/SAICA) certifying business turnover, drawings, or solvency.',
    type: 'turnaround',
    turnaround: '1 day',
    regularPrice: 2000,
    specialPrice: 1200,
    savingsLabel: 'Save R800',
    modules: ['Income Verification', 'Certified Sign-off', 'Express 24h Delivery'],
    requirements: '3-6 months bank statements, proof of income, recipient details.'
  },
  {
    id: 'payg_coida_reg',
    code: 'PAYG-04',
    category: 'payg',
    title: 'COIDA Registration & Letter of Good Standing',
    subtitle: 'Compensation Fund registration for employee safety',
    description: 'Register with the Compensation Commissioner to ensure injury cover for staff and obtain your Letter of Good Standing for tenders.',
    type: 'turnaround',
    turnaround: '1–2 days',
    regularPrice: 1800,
    specialPrice: 1400,
    savingsLabel: 'Save R400',
    modules: ['Compensation Fund Reg', 'Return of Earnings Prep', 'Good Standing Letter'],
    requirements: 'CIPC documents, certified director IDs, proof of address, estimated payroll.'
  },
  {
    id: 'payg_coida_nature',
    code: 'PAYG-05',
    category: 'payg',
    title: 'COIDA Nature of Business Change',
    subtitle: 'Reclassification of operational industry risk',
    description: 'Update your official Compensation Fund business classification when expanding services or changing industries.',
    type: 'turnaround',
    turnaround: '21–60 days',
    regularPrice: 1800,
    specialPrice: 1400,
    savingsLabel: 'Official SARS/Labour',
    modules: ['Risk Class Update', 'Assessment Adjustment', 'Labour Dept Liaison'],
    requirements: 'COIDA reg number, current Letter of Good Standing, description of new activities.'
  },
  {
    id: 'payg_emp201_staff',
    code: 'PAYG-06',
    category: 'payg',
    title: 'Monthly EMP201 Submission (With Staff)',
    subtitle: 'PAYE, UIF & SDL calculation and filing',
    description: 'Accurate calculation of monthly payroll taxes and submission to SARS eFiling before the 7th deadline.',
    type: 'monthly',
    regularPrice: 500,
    specialPrice: 350,
    savingsLabel: 'Per month',
    modules: ['PAYE Calculation', 'UIF & SDL Submissions', 'Payment Reference Generation'],
    requirements: 'Monthly payroll data, SARS eFiling login, payment confirmation.'
  },
  {
    id: 'payg_emp201_nil',
    code: 'PAYG-07',
    category: 'payg',
    title: 'Monthly EMP201 Nil Return (No Staff)',
    subtitle: 'Avoid automatic SARS non-compliance penalties',
    description: 'File official zero declarations on eFiling to keep your tax status clear when running without active payroll.',
    type: 'monthly',
    regularPrice: 250,
    specialPrice: 150,
    savingsLabel: 'Per month',
    modules: ['Nil Declaration', 'SARS Verification', 'Penalty Shield'],
    requirements: 'SARS eFiling login, written confirmation of no payroll that month.'
  },
  {
    id: 'payg_paye_reg',
    code: 'PAYG-08',
    category: 'payg',
    title: 'PAYE Registration with SARS',
    subtitle: 'Register your entity for employer taxes',
    description: 'Formal setup of your employer tax profile on SARS eFiling with appointment of registered tax representative.',
    type: 'turnaround',
    turnaround: '3–5 days',
    regularPrice: 1500,
    specialPrice: 1000,
    savingsLabel: 'Save R500',
    modules: ['SARS Profile Setup', 'Tax Representative Appointment', 'Compliance Verification'],
    requirements: 'CIPC documents, authorised rep ID, bank confirmation, good tax standing.'
  },
  {
    id: 'payg_tax_pin',
    code: 'PAYG-09',
    category: 'payg',
    title: 'Tax Clearance PIN (TCS)',
    subtitle: 'Instant Good Standing PIN for tenders & contracts',
    description: 'Review compliance status, resolve blocking flags, and generate official SARS Tax Compliance Status PIN.',
    type: 'turnaround',
    turnaround: '1–2 days',
    regularPrice: 450,
    specialPrice: 250,
    savingsLabel: 'Express Turnaround',
    modules: ['SARS Diagnostic Check', 'Outstanding Return Remediation', 'Valid TCS PIN'],
    requirements: 'SARS eFiling login, company registration documents, Power of Attorney.'
  },
  {
    id: 'payg_inc_reg',
    code: 'PAYG-10',
    category: 'payg',
    title: 'Personal Liability Company (Inc) Registration',
    subtitle: 'For legal, medical, accounting & engineering professionals',
    description: 'Full incorporation of an Incorporated (Inc) entity with CIPC, tailored MOI, and official share certificates.',
    type: 'turnaround',
    turnaround: '7–10 days',
    regularPrice: 2200,
    specialPrice: 1600,
    savingsLabel: 'Save R600',
    modules: ['Name Reservation', 'Specialised MOI', 'CIPC Filing', 'Share Certificates'],
    requirements: 'Certified director/shareholder IDs, 3-4 name choices, business address.'
  },
  {
    id: 'payg_share_certs',
    code: 'PAYG-11',
    category: 'payg',
    title: 'Share Certificates & Securities Register',
    subtitle: 'Legally compliant ownership documentation',
    description: 'Drafting of formal, legally valid share certificates, securities register, and board approval resolutions.',
    type: 'turnaround',
    turnaround: '1–2 days',
    regularPrice: 350,
    specialPrice: 200,
    savingsLabel: 'Save R150',
    modules: ['Securities Register', 'Official Certificates', 'Board Resolution'],
    requirements: 'Company registration number, shareholder details, share breakdown, MOI copy.'
  },
  {
    id: 'payg_sars_obj',
    code: 'PAYG-12',
    category: 'payg',
    title: 'SARS Objection (Section 104)',
    subtitle: 'Dispute unfair or erroneous tax assessments',
    description: 'Drafting and filing of formal legal dispute documents against incorrect SARS audits or penalty assessments.',
    type: 'turnaround',
    turnaround: '5–7 days',
    regularPrice: 4500,
    specialPrice: 3200,
    savingsLabel: 'Save R1,300',
    modules: ['Legal Assessment Review', 'Grounds for Objection Draft', 'SARS eFiling Filing'],
    requirements: 'Assessment notice, dispute background, supporting accounting evidence.'
  },
  {
    id: 'payg_debt_compromise',
    code: 'PAYG-13',
    category: 'payg',
    title: 'SARS Debt Compromise (Section 200)',
    subtitle: 'Negotiate reduction or restructuring of tax debt',
    description: 'Structured proposal to SARS to write off or reduce unmanageable tax liabilities based on genuine financial hardship.',
    type: 'turnaround',
    turnaround: '14–30 days',
    regularPrice: 6000,
    specialPrice: 4500,
    savingsLabel: 'High Impact',
    modules: ['Hardship Assessment', 'Settlement Proposal Drafting', 'SARS Debt Office Liaison'],
    requirements: 'Full management accounts, 12m bank statements, statement of assets & liabilities.'
  }
];

// Why This Works & Risks Data (From Playbook)
const WHY_THIS_WORKS = [
  {
    title: 'We Fixed the Pricing Problem',
    tag: 'Transparent & Fixed',
    desc: 'Traditional accountants bill by the hour so you hesitate to call. We offer fixed monthly plans and upfront prices with zero surprise bills.'
  },
  {
    title: 'We Fixed the Distance Problem',
    tag: '100% Cloud & Digital',
    desc: "You don't need to drive to an office or sit in traffic. Upload from your phone, get signed financials delivered to your inbox anywhere in South Africa."
  },
  {
    title: 'We Fixed the "I Forgot" Problem',
    tag: 'Automated Deadline Shield',
    desc: 'We track every SARS, CIPC, and Labour deadline. We alert you early, calculate cleanly, and submit on time so penalties never snowball.'
  },
  {
    title: 'We Fixed the Founder-Dependency Problem',
    tag: 'Documented Cloud Systems',
    desc: 'We set up organized cloud books and documented workflows so your company runs smoothly without you micromanaging every single slip.'
  }
];

const RISKS_TABLE = [
  { risk: 'Late SARS Payments', consequence: 'Penalties + compounding daily interest', solution: 'We track deadlines and submit before due date' },
  { risk: 'Missed CIPC Annual Return', consequence: 'Company deregistered, bank accounts frozen', solution: 'We file annually & monitor CIPC status live' },
  { risk: 'COIDA Non-Compliance', consequence: 'Employee injury lawsuits & lost tenders', solution: 'We maintain your Letter of Good Standing' },
  { risk: 'EMP501 Mismatch', consequence: 'SARS audit & payroll penalties', solution: 'Monthly reconciliations ensure clean year-ends' },
  { risk: 'Expired Tax Clearance', consequence: 'Disqualified from tenders & corporate RFPs', solution: 'Active TCS PIN monitoring and renewal' }
];

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------

const ServicesPage: React.FC = () => {
  // Mode selection: 'wizard' (Conversational Multi-Step) vs 'dashboard' (Modular Catalogue)
  const [activeMode, setActiveMode] = useState<'dashboard' | 'wizard'>('dashboard');

  // Selected Services in Catalogue (Set of IDs)
  const [selectedIds, setSelectedIds] = useState<string[]>(['monthly_rev']); // Default recommended selected
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | 'core' | 'payg'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Conversational Multi-Step Wizard States
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardFocus, setWizardFocus] = useState<string>('');
  const [wizardScale, setWizardScale] = useState<string>('');
  const [wizardSelectedPlan, setWizardSelectedPlan] = useState<string>('pathway_ascension');
  const [wizardAddons, setWizardAddons] = useState<string[]>(['sys_config']);

  // Checkout & Onboarding Modal States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    cellphone: '',
    notes: '',
    proofFile: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  // Toggle service selection in dashboard
  const toggleSelectService = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Combine all items for lookup
  const allServicesLookup = useMemo(() => {
    const map = new Map<string, ServiceItem>();
    CORE_PACKAGES.forEach(p => map.set(p.id, p));
    PAYG_SERVICES.forEach(p => map.set(p.id, p));
    SOVEREIGNTY_PATHWAYS.forEach(p => {
      map.set(p.id, {
        id: p.id,
        code: p.name.toUpperCase(),
        category: 'pathway',
        title: `${p.name} Monthly Pathway`,
        subtitle: p.simpleHeadline,
        description: p.plainEnglishBenefit,
        type: 'monthly',
        regularPrice: p.monthlyPrice * 1.2,
        specialPrice: p.monthlyPrice,
        savingsLabel: 'Full Compliance & CBA',
        isRecommended: p.isPopular,
        modules: p.features.slice(0, 4)
      });
    });
    return map;
  }, []);

  // Filtered Services for Dashboard
  const filteredServices = useMemo(() => {
    let list: ServiceItem[] = [];
    if (selectedCategoryTab === 'all' || selectedCategoryTab === 'core') {
      list = [...list, ...CORE_PACKAGES];
    }
    if (selectedCategoryTab === 'all' || selectedCategoryTab === 'payg') {
      list = [...list, ...PAYG_SERVICES];
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        item =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.modules.some(m => m.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategoryTab, searchQuery]);

  // Selected Services Summary Calculations
  const summaryCalculations = useMemo(() => {
    let setupTotal = 0;
    let monthlyTotal = 0;
    let annualTotal = 0;
    let savingsTotal = 0;
    const items: ServiceItem[] = [];

    selectedIds.forEach(id => {
      const s = allServicesLookup.get(id);
      if (s) {
        items.push(s);
        savingsTotal += Math.max(0, s.regularPrice - s.specialPrice);
        if (s.type === 'once-off' || s.type === 'turnaround') {
          setupTotal += s.specialPrice;
        } else if (s.type === 'monthly') {
          monthlyTotal += s.specialPrice;
        } else if (s.type === 'annual') {
          annualTotal += s.specialPrice;
        }
      }
    });

    return {
      count: items.length,
      items,
      setupTotal,
      monthlyTotal,
      annualTotal,
      savingsTotal,
      grandTotal: setupTotal + monthlyTotal + (annualTotal > 0 ? annualTotal / 12 : 0)
    };
  }, [selectedIds, allServicesLookup]);

  // Quick select a single item into checkout
  const handleQuickInvest = (itemOrId: ServiceItem | PathwayPlan | string) => {
    const id = typeof itemOrId === 'string' ? itemOrId : itemOrId.id;
    if (!selectedIds.includes(id)) {
      setSelectedIds([id]);
    }
    setIsCheckoutOpen(true);
  };

  // Submit Investment Form to Firebase
  const handleSubmitInvestment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let popUrl = '';
      if (storage && formData.proofFile) {
        const fileRef = ref(storage, `service_pops/${Date.now()}_${formData.proofFile.name}`);
        const uploadResult = await uploadBytes(fileRef, formData.proofFile);
        popUrl = await getDownloadURL(uploadResult.ref);
      }

      const selectedNames = summaryCalculations.items.map(i => `${i.title} (R${i.specialPrice})`).join(', ');

      if (db) {
        await addDoc(collection(db, 'workshop_registrations'), {
          fullName: formData.fullName,
          email: formData.email,
          businessName: formData.businessName,
          cellphone: formData.cellphone,
          notes: formData.notes || '',
          selectedServices: selectedNames,
          monthlyTotal: summaryCalculations.monthlyTotal,
          setupTotal: summaryCalculations.setupTotal,
          totalInvestment: summaryCalculations.setupTotal + summaryCalculations.monthlyTotal + summaryCalculations.annualTotal,
          eventName: `Service Selection (${summaryCalculations.count} items): ${selectedNames.slice(0, 60)}...`,
          eventDate: new Date().toLocaleDateString('en-ZA'),
          eventLink: 'https://calendly.com/marcia-kgaphola/new-meeting',
          proofOfPaymentUrl: popUrl || 'pending_payment',
          status: 'pending_verification',
          timestamp: serverTimestamp()
        });

        // Trigger confirmation mail if mail collection exists
        await addDoc(collection(db, 'mail'), {
          to: formData.email,
          message: {
            subject: `IWS Service Configuration Received: ${formData.businessName || formData.fullName}`,
            html: `<div style="font-family:sans-serif;color:#134e4a;padding:24px;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:16px;">
              <h1 style="color:#d4af37;text-transform:uppercase;letter-spacing:1px;font-size:22px;">Configuration Received</h1>
              <p>Hi <strong>${formData.fullName}</strong>,</p>
              <p>Thank you for choosing Integrated Wellth Solutions. We have registered your service configuration:</p>
              <div style="background:#f0fdfa;padding:16px;border-radius:12px;margin:16px 0;">
                <p style="margin:0;font-weight:bold;color:#134e4a;">Selected Services:</p>
                <p style="margin:4px 0 0 0;color:#0f172a;">${selectedNames}</p>
                <p style="margin:8px 0 0 0;font-weight:bold;color:#d4af37;">Total Monthly: R${summaryCalculations.monthlyTotal.toLocaleString()} | Setup/Once-off: R${summaryCalculations.setupTotal.toLocaleString()}</p>
              </div>
              <p>Our registered accounting and compliance team is ready to begin. Please finalize your discovery session below:</p>
              <p style="margin-top:24px;">
                <a href="https://calendly.com/marcia-kgaphola/new-meeting" style="background:#d4af37;color:#0f172a;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Book Onboarding Discovery Session</a>
              </p>
            </div>`
          }
        });
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyBankDetails = () => {
    navigator.clipboard.writeText('Capitec Business Account | 1054966877 | Branch: 450105 | INTEGRATEDWELLTH SOLUTIONS');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 3000);
  };

  return (
    <div className="animate-fadeIn bg-white selection:bg-brand-gold/20 min-h-screen text-brand-900 pb-20 md:pb-0">
      
      {/* --------------------------------------------------------- */}
      {/* HERO SECTION WITH VIEW SWITCHER */}
      {/* --------------------------------------------------------- */}
      <section className="bg-brand-900 text-white pt-36 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_hsla(174,84%,93%,0.25)_0,transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <ShieldCheck size={16} className="text-brand-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">
                South African Compliance & Growth Architecture
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-sora font-extrabold tracking-tighter leading-tight mb-6">
              SERVICE CONFIGURATION <br />
              <span className="text-brand-gold italic">DASHBOARD.</span>
            </h1>

            <p className="text-lg md:text-2xl text-brand-100 max-w-3xl mx-auto font-light leading-relaxed mb-10">
              Pick what you need with clear, fixed pricing upfront. No surprise hourly rates, no hidden fees, and zero compliance anxiety.
            </p>

            {/* Interactive Mode Toggle */}
            <div className="inline-flex p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 max-w-md mx-auto shadow-2xl">
              <button
                onClick={() => setActiveMode('dashboard')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  activeMode === 'dashboard'
                    ? 'bg-brand-gold text-brand-900 shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Building size={16} /> Modular Dashboard
              </button>
              <button
                onClick={() => setActiveMode('wizard')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  activeMode === 'wizard'
                    ? 'bg-brand-gold text-brand-900 shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles size={16} /> Interactive Assistant
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <NewsTicker />

      {/* --------------------------------------------------------- */}
      {/* CONVERSATIONAL MULTI-STEP ASSISTANT (WIZARD MODE) */}
      {/* --------------------------------------------------------- */}
      {activeMode === 'wizard' && (
        <section className="py-16 px-4 md:px-8 bg-brand-50/50 min-h-[700px]">
          <div className="max-w-4xl mx-auto">
            {/* Step Progress Header */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-brand-900/10 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">
                  Conversational Solution Finder • Step {wizardStep} of 4
                </span>
                <span className="text-xs font-bold text-brand-900/60">
                  {Math.round((wizardStep / 4) * 100)}% Complete
                </span>
              </div>
              {/* Progress Track */}
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-brand-gold h-full transition-all duration-500 ease-out"
                  style={{ width: `${(wizardStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: Easy, Low-Commitment Starting Point */}
            {wizardStep === 1 && (
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-brand-900/10 animate-fadeIn space-y-8">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-brand-gold">Step 01 • Low-Commitment Start</span>
                  <h2 className="text-3xl md:text-4xl font-sora font-extrabold text-brand-900 mt-2">
                    What is currently your primary business challenge?
                  </h2>
                  <p className="text-brand-900/60 mt-2">
                    Click the option that best describes what you want off your desk today:
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: 'messy_books', icon: <FileText className="text-brand-gold" size={24} />, title: 'Messy Books & Unallocated Slips', desc: 'Need bank recons, expense sorting, and clean management accounts.' },
                    { id: 'sars_tax', icon: <Scale className="text-brand-gold" size={24} />, title: 'SARS Tax Filings & Clearance', desc: 'VAT201, provisional tax, Tax Clearance PIN, or fixing a penalty.' },
                    { id: 'cipc_coida', icon: <Building className="text-brand-gold" size={24} />, title: 'Company Secretarial & COIDA', desc: 'CIPC Annual Returns, Beneficial Ownership, or Letter of Good Standing.' },
                    { id: 'monthly_peace', icon: <ShieldCheck className="text-brand-gold" size={24} />, title: 'All-in-One Monthly Financial Peace', desc: 'Ongoing monthly compliance, bookkeeping, and part-time CBA advisory.' }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setWizardFocus(option.id);
                        if (option.id === 'messy_books') setSelectedIds(['sys_config', 'monthly_book']);
                        if (option.id === 'sars_tax') setSelectedIds(['payg_tax_pin', 'annual_fin']);
                        if (option.id === 'cipc_coida') setSelectedIds(['payg_cipc_return', 'payg_coida_reg']);
                        if (option.id === 'monthly_peace') setSelectedIds(['pathway_ascension']);
                        setTimeout(() => setWizardStep(2), 250);
                      }}
                      className={`text-left p-6 rounded-2xl border-2 transition-all flex flex-col justify-between group hover:border-brand-gold hover:shadow-lg ${
                        wizardFocus === option.id
                          ? 'border-brand-gold bg-brand-50/50 shadow-md'
                          : 'border-gray-100 bg-gray-50/50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                        {option.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-900 text-lg group-hover:text-brand-gold transition-colors">{option.title}</h4>
                        <p className="text-xs text-brand-900/60 mt-1 leading-relaxed">{option.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Business Stage & Scale (Builds Momentum) */}
            {wizardStep === 2 && (
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-brand-900/10 animate-fadeIn space-y-8">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-brand-gold">Step 02 • Sizing Your Trajectory</span>
                  <h2 className="text-3xl md:text-4xl font-sora font-extrabold text-brand-900 mt-2">
                    What is your approximate annual turnover?
                  </h2>
                  <p className="text-brand-900/60 mt-2">
                    This ensures we match your exact statutory tier and prevent paying for excess overhead.
                  </p>
                </div>

                <div className="grid gap-4">
                  {[
                    { id: 'scale_foundation', tier: 'Foundation Plan', turnover: 'Under R1 Million / year', desc: 'Ideal for early-stage founders, freelancers, and small boutique operations.', planId: 'pathway_foundation' },
                    { id: 'scale_ascension', tier: 'Ascension Plan (Recommended)', turnover: 'R1 Million – R7 Million / year', desc: 'For growing teams requiring VAT201, cash flow projections, and monthly strategic insight.', planId: 'pathway_ascension' },
                    { id: 'scale_sovereign', tier: 'Sovereign Plan', turnover: 'R7 Million – R25 Million / year', desc: 'For established enterprises demanding executive CBA partnership and continuous oversight.', planId: 'pathway_sovereign' }
                  ].map(scale => (
                    <button
                      key={scale.id}
                      onClick={() => {
                        setWizardScale(scale.id);
                        setWizardSelectedPlan(scale.planId);
                        setTimeout(() => setWizardStep(3), 250);
                      }}
                      className={`text-left p-6 rounded-2xl border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-brand-gold hover:shadow-lg ${
                        wizardScale === scale.id
                          ? 'border-brand-gold bg-brand-50/50 shadow-md'
                          : 'border-gray-100 bg-gray-50/50'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">{scale.tier}</span>
                        <h4 className="font-bold text-xl text-brand-900">{scale.turnover}</h4>
                        <p className="text-xs text-brand-900/60">{scale.desc}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-brand-900 shrink-0">
                        Select <ChevronRight size={16} className="text-brand-gold" />
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-900/60 hover:text-brand-900"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Recommended Solution & Add-on Selection */}
            {wizardStep === 3 && (
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-brand-900/10 animate-fadeIn space-y-8">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-brand-gold">Step 03 • Your Tailored Package</span>
                  <h2 className="text-3xl md:text-4xl font-sora font-extrabold text-brand-900 mt-2">
                    Review Your Custom Solution
                  </h2>
                  <p className="text-brand-900/60 mt-2">
                    Here is our recommended monthly pathway based on your scale, plus optional high-value add-ons.
                  </p>
                </div>

                {/* Primary Recommended Plan */}
                {(() => {
                  const plan = SOVEREIGNTY_PATHWAYS.find(p => p.id === wizardSelectedPlan) || SOVEREIGNTY_PATHWAYS[1];
                  return (
                    <div className="p-6 md:p-8 rounded-3xl bg-brand-900 text-white shadow-xl relative overflow-hidden border border-brand-gold/30">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold text-brand-gold text-[10px] font-black uppercase tracking-wider mb-2">
                            {plan.badge}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-sora font-black">{plan.name} Monthly Pathway</h3>
                          <p className="text-brand-100 text-sm">{plan.simpleHeadline}</p>
                        </div>
                        <div className="text-left md:text-right">
                          <span className="text-3xl md:text-4xl font-sora font-black text-brand-gold">
                            R{plan.monthlyPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-white/70 block">/ month</span>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-2 text-xs text-brand-100/90 pt-4 border-t border-white/10 mb-6">
                        {plan.features.slice(0, 6).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-brand-gold shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-white/10 p-4 rounded-xl text-xs text-brand-100 italic">
                        "{plan.plainEnglishBenefit}"
                      </div>
                    </div>
                  );
                })()}

                {/* Optional Setup & Fast-Track Addons */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-brand-900/70">
                    Recommended Fast-Track Add-Ons (Optional)
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { id: 'sys_config', name: 'System Setup & Chart of Accounts', price: 'R2,625 (Once-off)', desc: 'Full cloud accounting configuration.' },
                      { id: 'payg_tax_pin', name: 'Tax Clearance PIN (TCS)', price: 'R250 (Express)', desc: 'Valid compliance PIN for tenders.' },
                      { id: 'payg_cipc_return', name: 'CIPC Annual Return Filing', price: 'R450', desc: 'Avoid administrative deregistration.' },
                      { id: 'payg_acc_letter', name: "Signed Accountant's Letter", price: 'R1,200', desc: 'Proof of income for visas/banks.' }
                    ].map(addon => {
                      const isAdded = wizardAddons.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          onClick={() => {
                            setWizardAddons(prev =>
                              prev.includes(addon.id) ? prev.filter(x => x !== addon.id) : [...prev, addon.id]
                            );
                          }}
                          className={`text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                            isAdded ? 'border-brand-gold bg-brand-50/60' : 'border-gray-100 bg-gray-50/40 hover:border-gray-300'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-sm text-brand-900">{addon.name}</div>
                            <div className="text-xs text-brand-gold font-bold">{addon.price}</div>
                          </div>
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                            isAdded ? 'bg-brand-gold text-brand-900 font-bold' : 'border border-gray-300'
                          }`}>
                            {isAdded && <Check size={14} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setWizardStep(2)}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-900/60 hover:text-brand-900"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <Button
                    onClick={() => {
                      setSelectedIds([wizardSelectedPlan, ...wizardAddons]);
                      setWizardStep(4);
                    }}
                    className="bg-brand-gold text-brand-900 hover:bg-brand-900 hover:text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-md flex items-center gap-2"
                  >
                    Continue to Onboarding <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: Contact & Onboarding Info (Saved for Last) */}
            {wizardStep === 4 && (
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-brand-900/10 animate-fadeIn space-y-8">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-brand-gold">Step 04 • Final Onboarding Step</span>
                  <h2 className="text-3xl md:text-4xl font-sora font-extrabold text-brand-900 mt-2">
                    Where should we send your onboarding roadmap?
                  </h2>
                  <p className="text-brand-900/60 mt-2">
                    Enter your contact details. You'll receive instant corporate bank credentials, access to our compliance portal, and discovery call scheduling.
                  </p>
                </div>

                <form onSubmit={handleSubmitInvestment} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">Full Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Marcia Kgaphola"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-gold focus:outline-none text-sm"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">Work Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="name@company.co.za"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-gold focus:outline-none text-sm"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">Business / Registered Entity Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Acacia Innovations (Pty) Ltd"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-gold focus:outline-none text-sm"
                        value={formData.businessName}
                        onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">Cellphone / WhatsApp *</label>
                      <input
                        required
                        type="tel"
                        placeholder="082 123 4567"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-gold focus:outline-none text-sm"
                        value={formData.cellphone}
                        onChange={e => setFormData({ ...formData, cellphone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">Optional Notes or Urgent SARS Deadlines</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need Tax Clearance PIN urgently by Friday for a tender submission..."
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-gold focus:outline-none text-sm"
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  {/* Corporate Banking Box */}
                  <div className="bg-brand-900 text-white p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-brand-gold uppercase tracking-wider text-xs flex items-center gap-2">
                        <Building size={16} /> Official Corporate Banking Details
                      </h4>
                      <button
                        type="button"
                        onClick={copyBankDetails}
                        className="text-[10px] font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1 hover:underline"
                      >
                        <Copy size={12} /> {copiedBank ? 'Copied!' : 'Copy Bank Details'}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div><span className="opacity-50 block">Bank</span><span className="font-bold">Capitec Business</span></div>
                      <div><span className="opacity-50 block">Account Name</span><span className="font-bold truncate block">INTEGRATEDWELLTH</span></div>
                      <div><span className="opacity-50 block">Account No.</span><span className="text-brand-gold font-bold">1054966877</span></div>
                      <div><span className="opacity-50 block">Branch Code</span><span className="font-bold">450105</span></div>
                    </div>

                    <div className="bg-white/5 p-3 rounded-lg text-xs flex items-center justify-between">
                      <span className="opacity-70">Payment Reference:</span>
                      <span className="font-bold text-brand-gold font-mono">
                        {formData.businessName || formData.fullName || 'Company / Name'}
                      </span>
                    </div>
                  </div>

                  {/* Proof of Payment Upload Dropzone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-brand-900/70">
                      Upload Proof of Payment (Optional if paying later)
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Upload className="text-brand-gold w-6 h-6 mb-1" />
                      <span className="text-xs font-bold text-gray-600">
                        {formData.proofFile ? formData.proofFile.name : 'Click to attach POP (PDF, PNG, JPG)'}
                      </span>
                      <span className="text-[10px] text-gray-400">Can also be emailed directly after submission</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,image/*"
                        onChange={e => setFormData({ ...formData, proofFile: e.target.files?.[0] || null })}
                      />
                    </label>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setWizardStep(3)}
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-900/60 hover:text-brand-900"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-brand-gold text-brand-900 hover:bg-brand-900 hover:text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={16} /> Submitting...
                        </>
                      ) : (
                        <>
                          Confirm & Initialize Onboarding <CheckCircle2 size={16} />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      )}

      {/* --------------------------------------------------------- */}
      {/* MODULAR SERVICE DASHBOARD (DESKTOP & MOBILE BLENDED) */}
      {/* --------------------------------------------------------- */}
      {activeMode === 'dashboard' && (
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          
          {/* Header Controls & Filter Tabs */}
          <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-900 text-[10px] font-black uppercase tracking-wider mb-2">
                <Tag size={12} className="text-brand-gold" /> April 2026 Promotional Allocations Active
              </div>
              <h2 className="text-3xl md:text-5xl font-sora font-extrabold text-brand-900">
                Service Catalog & Architecture
              </h2>
              <p className="text-brand-900/60 text-sm md:text-base mt-1 max-w-2xl">
                Configure your modular financial stack or select individual pay-as-you-go services. Click items to toggle selection in real time.
              </p>
            </div>

            {/* Category Filter Pills & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search service by name or code..."
                  className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-gold w-full sm:w-64"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold text-brand-900">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'core', label: 'Core Packages' },
                  { key: 'payg', label: 'Pay-As-You-Go' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedCategoryTab(tab.key as any)}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      selectedCategoryTab === tab.key
                        ? 'bg-white shadow-sm text-brand-900'
                        : 'text-brand-900/60 hover:text-brand-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Main Layout: Service Grid / Rows (Left) & Sticky Summary Cart (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT COLUMN: Service List & Cards */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Category Header Row on Desktop */}
              <div className="hidden md:grid grid-cols-[auto_1fr_1.5fr_auto] gap-4 px-6 py-3 bg-gray-50 rounded-xl border border-gray-200/60 text-[11px] font-black uppercase tracking-wider text-brand-900/60 items-center">
                <div className="w-12 text-center">ID</div>
                <div>Service Module</div>
                <div>Investment Allocation</div>
                <div className="w-28 text-center">Selection</div>
              </div>

              {/* Service Cards / Rows */}
              <div className="space-y-4">
                {filteredServices.map((service) => {
                  const isSelected = selectedIds.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleSelectService(service.id)}
                      className={`p-5 md:p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group relative overflow-hidden ${
                        isSelected
                          ? 'border-brand-gold bg-brand-50/40 shadow-md'
                          : service.isRecommended
                          ? 'border-brand-900/20 bg-white hover:border-brand-gold hover:shadow-md'
                          : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      {/* Highlight bar for recommended / selected */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-gold" />
                      )}

                      {/* ID Badge & Header */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="hidden md:flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-gray-100 font-mono text-xs font-bold text-brand-900 shrink-0 group-hover:bg-brand-900 group-hover:text-white transition-colors">
                          {service.code}
                        </div>

                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="md:hidden font-mono text-[10px] font-bold bg-gray-100 text-brand-900 px-2 py-0.5 rounded">
                              {service.code}
                            </span>
                            {service.isRecommended && (
                              <span className="text-[9px] font-black uppercase tracking-wider bg-brand-900 text-white px-2 py-0.5 rounded">
                                Recommended
                              </span>
                            )}
                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-900/60 bg-gray-100 px-2 py-0.5 rounded">
                              {service.type === 'once-off'
                                ? 'Once-off'
                                : service.type === 'monthly'
                                ? 'Monthly Retainer'
                                : service.type === 'annual'
                                ? 'Annual Bundle'
                                : `Turnaround: ${service.turnaround}`}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-brand-900 font-sora leading-tight">
                            {service.title}
                          </h3>

                          <p className="text-xs text-brand-900/70 leading-relaxed max-w-xl">
                            {service.description}
                          </p>

                          {/* Module Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {service.modules.map((m, mIdx) => (
                              <span
                                key={mIdx}
                                className="text-[10px] bg-gray-50 border border-gray-200 text-brand-900 px-2 py-0.5 rounded-md font-medium"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Pricing & Action Button */}
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 shrink-0">
                        <div className="text-left md:text-right">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black font-sora text-brand-900">
                              R{service.specialPrice.toLocaleString()}
                            </span>
                            {service.regularPrice > service.specialPrice && (
                              <span className="text-xs text-gray-400 line-through font-bold">
                                R{service.regularPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          {service.savingsLabel && (
                            <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider inline-flex items-center gap-1">
                              <BadgePercent size={12} /> {service.savingsLabel}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelectService(service.id);
                          }}
                          className={`w-28 py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                            isSelected
                              ? 'bg-brand-900 text-white shadow-sm'
                              : 'bg-white border border-brand-900/20 text-brand-900 hover:bg-brand-900 hover:text-white'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check size={14} className="text-brand-gold" /> Selected
                            </>
                          ) : (
                            <>
                              <Plus size={14} /> Select
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: Sticky Configuration Summary (Cart) on Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-xl border border-brand-900/10 space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-sora font-extrabold text-brand-900">Configuration Summary</h3>
                    <span className="text-xs font-bold bg-brand-gold/20 text-brand-900 px-2.5 py-1 rounded-full">
                      {summaryCalculations.count} selected
                    </span>
                  </div>
                  <p className="text-xs text-brand-900/60 mt-1">Real-time breakdown of your chosen allocations.</p>
                </div>

                {/* Selected Item List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {summaryCalculations.items.length === 0 ? (
                    <div className="text-center py-6 text-xs text-gray-400">
                      No services selected yet. Click any service on the left to add it.
                    </div>
                  ) : (
                    summaryCalculations.items.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl text-xs border border-gray-100"
                      >
                        <div className="truncate pr-2">
                          <p className="font-bold text-brand-900 truncate">{item.title}</p>
                          <p className="text-[10px] text-gray-500 uppercase">{item.type}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-bold text-brand-900">R{item.specialPrice.toLocaleString()}</span>
                          <button
                            onClick={() => toggleSelectService(item.id)}
                            className="p-1 hover:bg-gray-200 rounded-md text-gray-400 hover:text-red-500"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-2 pt-4 border-t border-gray-100 text-xs">
                  <div className="flex justify-between text-brand-900/70">
                    <span>Setup & Once-Off Fees:</span>
                    <span className="font-bold text-brand-900">R{summaryCalculations.setupTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-brand-900/70">
                    <span>Monthly Retainer Fees:</span>
                    <span className="font-bold text-brand-900">R{summaryCalculations.monthlyTotal.toLocaleString()} / mo</span>
                  </div>
                  {summaryCalculations.annualTotal > 0 && (
                    <div className="flex justify-between text-brand-900/70">
                      <span>Annual Compliance Bundle:</span>
                      <span className="font-bold text-brand-900">R{summaryCalculations.annualTotal.toLocaleString()} / yr</span>
                    </div>
                  )}
                  {summaryCalculations.savingsTotal > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 p-2 rounded-lg">
                      <span>Total Promotional Savings:</span>
                      <span>Save R{summaryCalculations.savingsTotal.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Total & Action Button */}
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-brand-900">Estimated Total:</span>
                    <span className="text-2xl font-black font-sora text-brand-gold">
                      R{summaryCalculations.grandTotal.toLocaleString()}
                      <span className="text-xs text-gray-500 font-normal"> (initial)</span>
                    </span>
                  </div>

                  <Button
                    onClick={() => setIsCheckoutOpen(true)}
                    disabled={summaryCalculations.count === 0}
                    className="w-full py-4 rounded-xl bg-brand-gold text-brand-900 hover:bg-brand-900 hover:text-white font-black uppercase tracking-widest text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Onboarding <ArrowRight size={16} />
                  </Button>

                  <p className="text-[10px] text-center text-gray-400">
                    No credit card charged immediately. Verified via corporate EFT / Proof of Payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* --------------------------------------------------------- */}
      {/* SOVEREIGNTY PATHWAYS SECTION (IN PLAIN ENGLISH WITH CBA) */}
      {/* --------------------------------------------------------- */}
      <section className="py-24 px-4 md:px-8 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-900 text-white text-[10px] font-black uppercase tracking-[0.4em]">
                <ShieldCheck size={14} className="text-brand-gold" /> The Sovereignty Pathways
              </div>
              <h2 className="text-4xl md:text-6xl font-sora font-extrabold text-brand-900 tracking-tighter">
                Pick a Monthly Plan That <br />
                <span className="text-brand-gold italic">Grows With Your Business.</span>
              </h2>
              <p className="text-lg md:text-xl text-brand-900/70 leading-relaxed font-light">
                We handle your monthly tax filings and compliance paperwork, keep your books up to date, and give you access to a part-time CBA so you get expert financial guidance without hiring one full-time.
              </p>
            </div>
          </RevealOnScroll>

          {/* 3 Pathway Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {SOVEREIGNTY_PATHWAYS.map((pathway, idx) => (
              <RevealOnScroll key={pathway.id} delay={idx * 0.1} width="100%">
                <div
                  className={`rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-full transition-all duration-300 relative group hover:scale-[1.02] ${
                    pathway.isPopular
                      ? 'bg-brand-900 text-white shadow-2xl border-2 border-brand-gold ring-4 ring-brand-gold/20'
                      : 'bg-white text-brand-900 shadow-lg border border-gray-200'
                  }`}
                >
                  {pathway.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                      Most Popular Plan
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                        pathway.isPopular ? 'bg-white/10 text-brand-gold' : 'bg-brand-50 text-brand-900'
                      }`}>
                        {pathway.badge}
                      </span>
                    </div>

                    <h3 className="text-3xl font-sora font-black mb-2">{pathway.name}</h3>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-6 ${
                      pathway.isPopular ? 'text-brand-gold' : 'text-brand-gold'
                    }`}>
                      {pathway.turnoverLimit}
                    </p>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl md:text-5xl font-black font-sora">
                          R{pathway.monthlyPrice.toLocaleString()}
                        </span>
                        <span className={`text-xs font-medium ${pathway.isPopular ? 'text-white/70' : 'text-gray-500'}`}>
                          / month
                        </span>
                      </div>
                      <p className={`text-xs mt-2 ${pathway.isPopular ? 'text-white/80' : 'text-gray-600'}`}>
                        {pathway.simpleHeadline}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${
                        pathway.isPopular ? 'text-white/60' : 'text-gray-400'
                      }`}>
                        What You Get:
                      </p>
                      <ul className="space-y-2.5 text-xs">
                        {pathway.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 size={16} className="text-brand-gold shrink-0 mt-0.5" />
                            <span className={pathway.isPopular ? 'text-white/90' : 'text-brand-900/80'}>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Benefit & Button */}
                  <div className="space-y-6 pt-6 border-t border-current/10">
                    <div className={`p-4 rounded-2xl text-xs italic ${
                      pathway.isPopular ? 'bg-white/5 text-brand-100' : 'bg-gray-50 text-gray-700'
                    }`}>
                      "{pathway.plainEnglishBenefit}"
                    </div>

                    <Button
                      onClick={() => handleQuickInvest(pathway)}
                      className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
                        pathway.isPopular
                          ? 'bg-brand-gold text-brand-900 hover:bg-white'
                          : 'bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900'
                      }`}
                    >
                      Choose {pathway.name} <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- */}
      {/* WHY THIS ACTUALLY WORKS (THE REAL TALK) */}
      {/* --------------------------------------------------------- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="max-w-3xl mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">
                The Practical Advantage
              </span>
              <h2 className="text-4xl md:text-6xl font-sora font-extrabold text-brand-900 mt-2">
                Why This Actually Works <br />
                <span className="text-brand-gold italic">(The Real Talk).</span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_THIS_WORKS.map((item, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.08} width="100%">
                <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 h-full flex flex-col justify-between hover:border-brand-gold hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                      {item.tag}
                    </span>
                    <h3 className="text-xl font-bold font-sora text-brand-900">{item.title}</h3>
                    <p className="text-xs text-brand-900/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- */}
      {/* THE RISKS WE PROTECT YOU FROM */}
      {/* --------------------------------------------------------- */}
      <section className="py-20 px-6 bg-brand-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-sora font-black">
                The Risks We Protect You From
              </h2>
              <p className="text-brand-100/70 text-sm mt-2">
                Real problems that happen when compliance is ignored — and how IWS prevents them.
              </p>
            </div>

            <div className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-brand-gold font-black uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">The Risk</th>
                    <th className="py-3 px-4">What Actually Happens</th>
                    <th className="py-3 px-4">How IWS Prevents It</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {RISKS_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                        <AlertTriangle size={14} className="text-brand-gold shrink-0" />
                        {row.risk}
                      </td>
                      <td className="py-4 px-4 text-red-200">{row.consequence}</td>
                      <td className="py-4 px-4 text-brand-100 font-medium">{row.solution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* --------------------------------------------------------- */}
      {/* MOBILE BOTTOM DOCKING CHECKOUT BAR */}
      {/* --------------------------------------------------------- */}
      {activeMode === 'dashboard' && summaryCalculations.count > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-500 block">
              {summaryCalculations.count} selected
            </span>
            <span className="text-lg font-black font-sora text-brand-900">
              R{summaryCalculations.grandTotal.toLocaleString()}
            </span>
          </div>

          <Button
            onClick={() => setIsCheckoutOpen(true)}
            className="bg-brand-gold text-brand-900 py-3 px-6 rounded-xl font-black uppercase tracking-wider text-xs flex items-center gap-2 shadow-md"
          >
            Checkout <ArrowRight size={14} />
          </Button>
        </div>
      )}

      {/* --------------------------------------------------------- */}
      {/* ONBOARDING & CHECKOUT MODAL */}
      {/* --------------------------------------------------------- */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-white text-brand-900 w-full max-w-2xl rounded-[2.5rem] p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setIsSuccess(false);
              }}
              className="absolute top-6 right-6 p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-brand-900 transition-all"
            >
              <X size={20} />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmitInvestment} className="space-y-6">
                <div>
                  <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em]">
                    Onboarding Gateway
                  </span>
                  <h3 className="text-2xl md:text-3xl font-sora font-extrabold mt-1">
                    Confirm Service Selection
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Configuring {summaryCalculations.count} modules. No immediate debit card charge.
                  </p>
                </div>

                {/* Selected Modules Summary Box */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs space-y-2">
                  <span className="font-bold text-brand-900 uppercase tracking-wider block text-[10px]">
                    Allocated Items:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {summaryCalculations.items.map(item => (
                      <span key={item.id} className="bg-white border border-gray-200 px-2.5 py-1 rounded-lg font-medium text-brand-900">
                        {item.title} (R{item.specialPrice.toLocaleString()})
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-brand-900">
                    <span>Monthly: R{summaryCalculations.monthlyTotal.toLocaleString()} / mo</span>
                    <span>Setup/Once-off: R{summaryCalculations.setupTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sipho Ndlovu"
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-gold text-sm"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="sipho@business.co.za"
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-gold text-sm"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">Business Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Company Name (Pty) Ltd"
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-gold text-sm"
                      value={formData.businessName}
                      onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-1">Cellphone / WhatsApp *</label>
                    <input
                      required
                      type="tel"
                      placeholder="082 123 4567"
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-brand-gold text-sm"
                      value={formData.cellphone}
                      onChange={e => setFormData({ ...formData, cellphone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Corporate Banking Box */}
                <div className="bg-brand-900 text-white p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-brand-gold uppercase tracking-wider text-xs flex items-center gap-2">
                      <Building size={16} /> Capitec Business Banking
                    </h4>
                    <button
                      type="button"
                      onClick={copyBankDetails}
                      className="text-[10px] font-bold text-brand-gold uppercase tracking-widest flex items-center gap-1 hover:underline"
                    >
                      <Copy size={12} /> {copiedBank ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><span className="opacity-50 block">Account Name</span><span>INTEGRATEDWELLTH SOLUTIONS</span></div>
                    <div><span className="opacity-50 block">Account No.</span><span className="text-brand-gold font-bold">1054966877</span></div>
                    <div><span className="opacity-50 block">Branch Code</span><span>450105</span></div>
                    <div><span className="opacity-50 block">Reference</span><span className="font-bold">{formData.businessName || formData.fullName || 'Company Name'}</span></div>
                  </div>
                </div>

                {/* Proof of Payment Upload */}
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-brand-900/70">
                    Upload Proof of Payment (Optional)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Upload className="text-brand-gold w-5 h-5 mb-1" />
                    <span className="text-xs font-bold text-gray-500">
                      {formData.proofFile ? formData.proofFile.name : 'Click to attach POP (PDF, PNG, JPG)'}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,image/*"
                      onChange={e => setFormData({ ...formData, proofFile: e.target.files?.[0] || null })}
                    />
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-gold text-brand-900 hover:bg-brand-900 hover:text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Submitting...
                    </>
                  ) : (
                    <>
                      Confirm & Initialize Onboarding <CheckCircle2 size={16} />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              /* Success Screen with Green Checkmark */
              <div className="text-center space-y-6 py-8">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                  <CheckCircle size={48} />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold bg-brand-50 px-3 py-1 rounded-full">
                    Onboarding Initiated
                  </span>
                  <h3 className="text-3xl font-sora font-extrabold text-brand-900">
                    Welcome to Integrated Wellth!
                  </h3>
                  <p className="text-gray-600 text-sm max-w-md mx-auto">
                    We have recorded your service selection. A copy of your invoice and banking reference has been queued for your inbox.
                  </p>
                </div>

                <div className="p-6 bg-brand-50 rounded-2xl max-w-md mx-auto text-left text-xs space-y-3">
                  <div className="font-bold text-brand-900 flex items-center gap-2">
                    <Calendar size={16} className="text-brand-gold" /> Next Step: Discovery Call
                  </div>
                  <p className="text-brand-900/70">
                    Lock in your 30-minute founder discovery session directly on our calendar:
                  </p>
                  <a
                    href="https://calendly.com/marcia-kgaphola/new-meeting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-brand-900 text-white rounded-xl font-bold hover:bg-brand-gold hover:text-brand-900 transition-colors"
                  >
                    Schedule Onboarding Session <ExternalLink size={14} />
                  </a>
                </div>

                <Button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setIsSuccess(false);
                  }}
                  className="px-8 py-3 bg-gray-100 text-brand-900 hover:bg-gray-200 rounded-xl font-bold text-xs"
                >
                  Return to Dashboard
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ServicesPage;
