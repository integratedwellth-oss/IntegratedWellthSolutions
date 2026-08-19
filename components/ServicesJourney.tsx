import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Users,
  ShieldCheck,
  Building2,
  Rocket,
  Loader2,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import { getFirebaseDb } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ServiceOption {
  name: string;
  desc: string;
  price: string;
}

const SERVICES_DATA: Record<string, { title: string; items: ServiceOption[] }> = {
  accounting: {
    title: 'Accounting & Financial Reporting',
    items: [
      { name: 'Management Accounts', desc: 'Monthly/quarterly P&L, Balance Sheet, Cash Flow, KPI commentary', price: 'R 5,000' },
      { name: 'Annual Financial Statements (AFS)', desc: 'IFRS for SMEs compliant — full compilation & sign-off', price: 'Custom' },
      { name: "Accountant's Letter", desc: 'CIBA/SAIT signed verification for banks, leases, visas', price: 'R 1,200 – R 2,000' },
      { name: 'Cloud Accounting Setup', desc: 'Xero, Sage, QuickBooks, Zoho Books or Wave configuration', price: 'Custom' }
    ]
  },
  payroll: {
    title: 'Payroll & Employer Statutory Compliance',
    items: [
      { name: 'Monthly Payroll Administration', desc: 'Digital payslips, leave tracking, third-party payouts', price: 'R 350 – R 400/mo' },
      { name: 'EMP201 Submission (Trading)', desc: 'Monthly PAYE, UIF, SDL calculation & eFiling', price: 'R 350 – R 400/mo' },
      { name: 'EMP201 Submission (Nil)', desc: 'Zero-payroll filing with written confirmation', price: 'Included / Specific Fee' },
      { name: 'EMP501 Reconciliation', desc: 'Bi-annual & annual reconciliation + IRP5/IT3(a) certificates', price: 'Custom' },
      { name: 'COIDA Registration', desc: 'Compensation Fund registration + Letter of Good Standing', price: 'R 1,400' },
      { name: 'COIDA Nature of Business Change', desc: 'Risk reclassification & rate adjustment', price: 'R 1,400' }
    ]
  },
  tax: {
    title: 'SARS Tax Governance & Dispute Resolution',
    items: [
      { name: 'Periodic VAT201 Submission', desc: 'Monthly/bi-monthly VAT calculation & SARS eFiling', price: 'Custom' },
      { name: 'Tax Clearance Certificate (TCC PIN)', desc: 'TCC PIN issuance — 1-2 working days', price: 'R 250' },
      { name: 'SARS Section 104 Notice of Objection', desc: 'Formal notice of objection under Tax Admin Act', price: 'Custom' },
      { name: 'Section 200 Debt Compromise', desc: 'Negotiation for insolvent entities', price: 'Custom' },
      { name: 'PAYE Registration', desc: 'New employer tax registration — 3-5 working days', price: 'R 1,000' },
      { name: 'Remission of Administrative Penalties', desc: 'Formal SARS penalty remission application', price: 'Custom' }
    ]
  },
  cipc: {
    title: 'CIPC Corporate Secretarial Services',
    items: [
      { name: 'CIPC Annual Returns', desc: 'Prevent deregistration — 1-2 working days', price: 'R 450 (excl CIPC fees)' },
      { name: 'Beneficial Ownership Register Filing', desc: 'Mandatory BO register submission to CIPC', price: 'Custom' },
      { name: 'Share Certificate Issuance', desc: 'Drafted & issued per MOI — 1-2 working days', price: 'R 200' },
      { name: 'Personal Liability Company (PLC)', desc: 'Inc/PLC registration — 7-10 working days', price: 'R 1,600' },
      { name: 'External (Foreign) Company', desc: 'Foreign company registration in SA', price: 'Custom' },
      { name: 'Co-operative Society Formation', desc: 'Co-op formation & compliance', price: 'Custom' }
    ]
  }
};

const PATHWAYS_DATA = [
  {
    id: 'foundation',
    badge: 'Foundation',
    badgeBg: 'bg-amber-100 text-amber-900',
    title: 'Foundation Pathway',
    subtitle: 'For early-stage enterprises under R1M annual turnover',
    price: 'Custom Investment',
    period: '/ month',
    features: [
      'Quarterly Management Reports',
      'Complete SARS, CIPC & Labour statutory compliance',
      'Fixed operational expenditure',
      'Eliminates compliance risk & administrative penalties'
    ]
  },
  {
    id: 'ascension',
    badge: 'Ascension',
    badgeBg: 'bg-blue-100 text-blue-900',
    title: 'Ascension Pathway',
    subtitle: 'For growing businesses past the R1M VAT threshold',
    price: 'Custom Investment',
    period: '/ month',
    features: [
      'Bi-monthly Management Accounts',
      'Periodic VAT201 Calculation & Submissions',
      'Cash flow forecasting & budgeting assistance',
      'Everything in Foundation, upgraded'
    ]
  },
  {
    id: 'sovereign',
    badge: 'Sovereign',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    title: 'Sovereign Pathway',
    subtitle: 'Fractional CBA for enterprises up to R25M annually',
    price: 'Custom Investment',
    period: '/ month',
    features: [
      'Monthly Reports + Unlimited CBA Advisory Services',
      'War Room structural stress-testing engine',
      'Financial Health Score & Battle Plan',
      'Priority audit defense & strategic capital allocation'
    ]
  }
];

export const ServicesJourney: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);

  // Client contact info for proposal submission
  const [clientInfo, setClientInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePillarSelect = (pillarKey: string) => {
    setSelectedPillar(pillarKey);
    setSelectedServices([]);
    if (pillarKey === 'pathway') {
      setStep(2); // Goes to Pathways view
    } else {
      setStep(2);
    }
  };

  const toggleService = (idx: number) => {
    if (selectedServices.includes(idx)) {
      setSelectedServices(selectedServices.filter((i) => i !== idx));
    } else {
      setSelectedServices([...selectedServices, idx]);
    }
  };

  const handlePathwaySelect = (pathwayId: string) => {
    setSelectedPathway(pathwayId);
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const db = getFirebaseDb();

    try {
      if (db) {
        let selectedDetails = '';
        if (selectedPillar === 'pathway' && selectedPathway) {
          selectedDetails = `Pathway: ${selectedPathway.toUpperCase()}`;
        } else if (selectedPillar && SERVICES_DATA[selectedPillar]) {
          selectedDetails = selectedServices
            .map((i) => SERVICES_DATA[selectedPillar!].items[i].name)
            .join(', ');
        }

        await addDoc(collection(db, 'workshop_registrations'), {
          fullName: clientInfo.fullName,
          email: clientInfo.email,
          cellphone: clientInfo.phone,
          businessName: clientInfo.businessName,
          eventName: `Strategic Analysis Selection: ${selectedPillar || 'General'}`,
          eventDate: selectedDetails || 'Custom Services Request',
          status: 'pending_proposal',
          timestamp: serverTimestamp()
        });

        await addDoc(collection(db, 'mail'), {
          to: clientInfo.email,
          message: {
            subject: `IWS Sovereignty Proposal Request: ${clientInfo.businessName || clientInfo.fullName}`,
            html: `<h1>Proposal Request Received</h1><p>Hi ${clientInfo.fullName},</p><p>We have received your selection (${selectedDetails}). A Wellth Advisor will send your tailored proposal within 1 business day.</p>`
          }
        });
      }
      setStep(4);
    } catch (err) {
      console.error(err);
      setStep(4); // Advance anyway
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetJourney = () => {
    setStep(1);
    setSelectedPillar(null);
    setSelectedServices([]);
    setSelectedPathway(null);
    setClientInfo({ fullName: '', email: '', phone: '', businessName: '' });
  };

  return (
    <section className="py-16 md:py-24 bg-surface-warm font-sans text-brand-900" id="journey">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Progress Tracker Bar */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3, 4].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step === s
                    ? 'bg-[#0d7377] text-white ring-4 ring-[#0d7377]/15'
                    : step > s
                    ? 'bg-[#14a085] text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step > s ? <Check size={16} /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`w-8 sm:w-12 h-1 rounded-full transition-all ${
                    step > s ? 'bg-[#14a085]' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* STEP 1: CHOOSE YOUR FOCUS */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-900 mb-3">
                What does your enterprise need?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                Select one operational area to begin your sovereignty journey. You can add additional services later.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div
                onClick={() => handlePillarSelect('accounting')}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#0d7377] hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-teal-50 text-[#0d7377] rounded-xl flex items-center justify-center mb-4 text-2xl">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-[#0d7377] transition-colors">
                  Accounting & Reporting
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Management accounts, annual financial statements, and official accountant verification letters.
                </p>
                <span className="inline-block px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-[10px] font-bold">
                  From R 1,200
                </span>
              </div>

              <div
                onClick={() => handlePillarSelect('payroll')}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#0d7377] hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-teal-50 text-[#0d7377] rounded-xl flex items-center justify-center mb-4 text-2xl">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-[#0d7377] transition-colors">
                  Payroll & Statutory Compliance
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Monthly payroll, EMP201/501, COIDA registrations, and Department of Labour compliance.
                </p>
                <span className="inline-block px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-[10px] font-bold">
                  From R 350/mo
                </span>
              </div>

              <div
                onClick={() => handlePillarSelect('tax')}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#0d7377] hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-teal-50 text-[#0d7377] rounded-xl flex items-center justify-center mb-4 text-2xl">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-[#0d7377] transition-colors">
                  SARS Tax Governance & Disputes
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  VAT201 submissions, Tax Clearance PINs, Section 104 objections, and debt compromise.
                </p>
                <span className="inline-block px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-[10px] font-bold">
                  From R 250
                </span>
              </div>

              <div
                onClick={() => handlePillarSelect('cipc')}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#0d7377] hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-teal-50 text-[#0d7377] rounded-xl flex items-center justify-center mb-4 text-2xl">
                  <Building2 size={24} />
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-[#0d7377] transition-colors">
                  CIPC & Corporate Secretarial
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Annual returns, beneficial ownership register, share certificates, and company registrations.
                </p>
                <span className="inline-block px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-[10px] font-bold">
                  From R 200
                </span>
              </div>
            </div>

            {/* Pathway Option Card */}
            <div
              onClick={() => handlePillarSelect('pathway')}
              className="bg-white rounded-2xl p-6 text-center border-2 border-dashed border-[#0d7377]/40 hover:border-[#0d7377] hover:bg-teal-50/30 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Rocket size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-brand-900 group-hover:text-[#0d7377] transition-colors">
                Explore Sovereignty Pathways
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-3">
                Ongoing monthly compliance, management accounts, and fractional CBA advisory.
              </p>
              <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-900 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Foundation · Ascension · Sovereign
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: INDIVIDUAL SERVICES SELECTOR */}
        {step === 2 && selectedPillar !== 'pathway' && selectedPillar && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-900 mb-2">
                {SERVICES_DATA[selectedPillar].title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Select the services required. We will consolidate them into a clear, fixed-investment proposal.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {SERVICES_DATA[selectedPillar].items.map((svc, i) => {
                const isSelected = selectedServices.includes(i);
                return (
                  <div
                    key={i}
                    onClick={() => toggleService(i)}
                    className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0d7377] bg-teal-50/40 shadow-sm'
                        : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors shrink-0 ${
                          isSelected ? 'bg-[#0d7377] border-[#0d7377] text-white' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <Check size={14} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-900">{svc.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{svc.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-[#0d7377] shrink-0 ml-2">
                      {svc.price}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                disabled={selectedServices.length === 0}
                onClick={() => setStep(3)}
                className="flex-1 py-4 rounded-xl bg-brand-900 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-[#0d7377] transition-all disabled:opacity-40 disabled:pointer-events-none shadow-lg flex items-center justify-center gap-2"
              >
                Continue ({selectedServices.length} Selected) <ArrowRight size={16} />
              </button>
              <button
                onClick={() => setStep(1)}
                className="py-4 px-6 rounded-xl border-2 border-gray-200 font-bold text-xs uppercase tracking-widest text-gray-600 hover:border-brand-900 hover:text-brand-900 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Back
              </button>
            </div>
          </div>
        )}

        {/* STEP 2B: SOVEREIGNTY PATHWAYS SELECTOR */}
        {step === 2 && selectedPillar === 'pathway' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-900 mb-2">
                Select Your Sovereignty Pathway
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                Fixed monthly investments. Zero hourly billing unpredictability. Scale seamless oversight as your enterprise grows.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {PATHWAYS_DATA.map((path) => {
                const isSelected = selectedPathway === path.id;
                return (
                  <div
                    key={path.id}
                    onClick={() => handlePathwaySelect(path.id)}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer relative bg-white ${
                      isSelected
                        ? 'border-[#0d7377] shadow-xl ring-2 ring-[#0d7377]/20'
                        : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4 w-7 h-7 bg-[#0d7377] text-white rounded-full flex items-center justify-center">
                        <Check size={16} />
                      </div>
                    )}
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-3 ${path.badgeBg}`}>
                      {path.badge}
                    </span>
                    <h3 className="text-xl font-extrabold text-brand-900 mb-1">{path.title}</h3>
                    <p className="text-xs text-gray-500 mb-3">{path.subtitle}</p>
                    <div className="text-2xl font-black text-[#0d7377] mb-4">
                      {path.price} <span className="text-xs font-normal text-gray-500">{path.period}</span>
                    </div>
                    <ul className="space-y-2 border-t border-gray-100 pt-4">
                      {path.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                          <span className="text-[#0d7377] font-bold">—</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                disabled={!selectedPathway}
                onClick={() => setStep(3)}
                className="flex-1 py-4 rounded-xl bg-brand-900 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-[#0d7377] transition-all disabled:opacity-40 disabled:pointer-events-none shadow-lg flex items-center justify-center gap-2"
              >
                Continue with Selection <ArrowRight size={16} />
              </button>
              <button
                onClick={() => setStep(1)}
                className="py-4 px-6 rounded-xl border-2 border-gray-200 font-bold text-xs uppercase tracking-widest text-gray-600 hover:border-brand-900 hover:text-brand-900 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Back
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW SUMMARY & REQUEST PROPOSAL */}
        {step === 3 && (
          <div className="animate-fadeIn max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-900 mb-2">
                Your Sovereignty Summary
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Review your selections and enter your details to receive a fixed-investment proposal.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6 space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Selected Service Focus
                </span>
                <p className="text-base font-bold text-brand-900 mt-1">
                  {selectedPillar === 'pathway'
                    ? PATHWAYS_DATA.find((p) => p.id === selectedPathway)?.title
                    : SERVICES_DATA[selectedPillar || 'accounting']?.title}
                </p>
              </div>

              {selectedPillar !== 'pathway' && (
                <div className="space-y-2 border-b border-gray-100 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Services Scope
                  </span>
                  {selectedServices.map((idx) => {
                    const item = SERVICES_DATA[selectedPillar!]?.items[idx];
                    return (
                      <div key={idx} className="flex justify-between text-xs font-bold text-gray-700">
                        <span>{item?.name}</span>
                        <span className="text-[#0d7377]">{item?.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-brand-900">Total Investment Model</span>
                <span className="text-base font-black text-[#0d7377]">Custom Fixed Quote</span>
              </div>
            </div>

            {/* Proposal Request Form */}
            <form onSubmit={handleRequestSubmit} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-brand-900">
                Enter Details for Official Proposal
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={clientInfo.fullName}
                  onChange={(e) => setClientInfo({ ...clientInfo, fullName: e.target.value })}
                  className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-brand-900 outline-none focus:border-[#0d7377]"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-brand-900 outline-none focus:border-[#0d7377]"
                />
                <input
                  required
                  type="tel"
                  placeholder="Cellphone Number"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-brand-900 outline-none focus:border-[#0d7377]"
                />
                <input
                  required
                  type="text"
                  placeholder="Business / Entity Name"
                  value={clientInfo.businessName}
                  onChange={(e) => setClientInfo({ ...clientInfo, businessName: e.target.value })}
                  className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-brand-900 outline-none focus:border-[#0d7377]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-brand-900 text-white font-black text-xs uppercase tracking-widest hover:bg-[#0d7377] transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Request Custom Proposal'}
              </button>
            </form>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-3 py-3 text-center text-xs font-bold text-gray-500 hover:text-brand-900"
            >
              ← Back to Selections
            </button>
          </div>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION */}
        {step === 4 && (
          <div className="animate-fadeIn text-center max-w-lg mx-auto py-8">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-900 mb-2">
              Proposal Request Received
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-8 leading-relaxed">
              Your sovereignty journey has begun. A dedicated Wellth Advisor will review your selections and issue a transparent, fixed-investment proposal within one business day.
            </p>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 text-left space-y-4 mb-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Your Next Steps
              </h4>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-[#0d7377] flex items-center justify-center text-xs font-bold shrink-0">1</div>
                <div>
                  <strong className="text-xs font-bold text-brand-900 block">Document Checklist</strong>
                  <span className="text-[11px] text-gray-500">We'll email you a tailored list of required supporting documents.</span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-[#0d7377] flex items-center justify-center text-xs font-bold shrink-0">2</div>
                <div>
                  <strong className="text-xs font-bold text-brand-900 block">Secure Upload</strong>
                  <span className="text-[11px] text-gray-500">Upload bank statements & certificates via your Client Hub.</span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-[#0d7377] flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <div>
                  <strong className="text-xs font-bold text-brand-900 block">Accredited Execution</strong>
                  <span className="text-[11px] text-gray-500">CIBA / SAIT accredited practitioners process your filings with SARS & CIPC.</span>
                </div>
              </div>
            </div>

            <button
              onClick={resetJourney}
              className="py-3.5 px-8 rounded-xl border-2 border-brand-900 text-brand-900 font-black text-xs uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all"
            >
              Start Another Request
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default ServicesJourney;
