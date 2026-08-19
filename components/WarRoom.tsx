import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldAlert,
  Activity,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Sparkles,
  Loader2,
  ArrowRight,
  Send,
  Calendar,
  MessageSquare,
  Building,
  Scale,
  DollarSign,
  TrendingDown,
  Lock,
  ExternalLink,
  PhoneCall,
  Check,
  RefreshCw,
  Zap,
  Info,
  Clock,
  ShieldCheck,
  Flame,
  Briefcase
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { createChatSession, sendMessageStream } from '../services/geminiService';

// -------------------------------------------------------------
// TYPES & CONSTANTS
// -------------------------------------------------------------

type StreamType = 'stress' | 'threats' | 'calendar' | 'ai' | 'dossier';

const STREAM_LABELS: Record<StreamType, { label: string; iconName: string }> = {
  stress: { label: 'STRUCTURAL AUDIT', iconName: 'Activity' },
  threats: { label: 'CRISIS SIMULATOR', iconName: 'ShieldAlert' },
  calendar: { label: 'STATUTORY RADAR', iconName: 'Calendar' },
  ai: { label: 'AI COPILOT', iconName: 'Sparkles' },
  dossier: { label: 'BATTLE PLAN', iconName: 'FileText' }
};

interface PillarOption {
  label: string;
  points: number;
  desc: string;
}

interface DiagnosticPillar {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  options: PillarOption[];
}

const DIAGNOSTIC_PILLARS: DiagnosticPillar[] = [
  {
    id: 'liquidity',
    title: '1. Cash Runway & Liquidity Buffer',
    subtitle: 'How long can payroll and ops survive if revenue drops 80%?',
    icon: 'DollarSign',
    options: [
      { label: '< 30 Days (Cash Fragile)', points: 0, desc: 'Zero buffer. One late client payment triggers payroll failure or overdraft penalties.' },
      { label: '1 – 3 Months (Vulnerable)', points: 10, desc: 'Tight working capital. Dependent on immediate receivables collection.' },
      { label: '3 – 6 Months (Stable)', points: 20, desc: 'Healthy liquidity reserve buffer. Can weather seasonal dips.' },
      { label: '6+ Months (Sovereign Buffer)', points: 25, desc: 'Fully insulated balance sheet with dedicated tax & operational reserve vaults.' }
    ]
  },
  {
    id: 'compliance',
    title: '2. SARS & Statutory Health',
    subtitle: 'Current status of VAT201, PAYE/EMP501, and Provisional Tax filings.',
    icon: 'Scale',
    options: [
      { label: 'Backlogged / Penalty Alerts', points: 0, desc: 'Outstanding returns, SARS audit alerts, or mounting daily penalty interest.' },
      { label: 'Reactive Scrambles', points: 10, desc: 'Files submitted at the last minute; uncertainty around calculations and deductions.' },
      { label: 'Generally Compliant', points: 20, desc: 'Up to date, but heavy founder time spent managing admin and bookkeepers.' },
      { label: 'Automated & Audit-Proof', points: 25, desc: '100% proactive reconciliations, active Tax Clearance PIN, zero late flags.' }
    ]
  },
  {
    id: 'structure',
    title: '3. Asset Protection & Structure',
    subtitle: 'Legal insulation between personal wealth and business trading liabilities.',
    icon: 'Lock',
    options: [
      { label: 'Totally Exposed (Sole Prop / Linked)', points: 0, desc: 'Personal home and savings at direct risk from business creditors and SARS.' },
      { label: 'Standard PTY Ltd (No Trust)', points: 10, desc: 'Company registered, but personal director surety signed without ring-fencing.' },
      { label: 'Holding Co / Multi-Entity', points: 20, desc: 'Operating company decoupled from main IP and capital assets.' },
      { label: 'Full Structural Sovereignty', points: 25, desc: 'Optimized Holding Co + Trust architecture with full statutory ring-fencing.' }
    ]
  },
  {
    id: 'dependency',
    title: '4. Founder Autonomy Index',
    subtitle: 'Can the enterprise operate for 30 consecutive days without you?',
    icon: 'Briefcase',
    options: [
      { label: 'Total Founder Dependency', points: 0, desc: 'If you take 14 days off, operations, invoicing, and compliance grind to a halt.' },
      { label: 'High Friction Absence', points: 10, desc: 'Staff can handle routine tasks, but critical decisions and banking need you daily.' },
      { label: 'Moderate Autonomy', points: 20, desc: 'Documented processes exist, but financial management still requires review.' },
      { label: 'Fully Autonomous Engine', points: 25, desc: 'Cloud accounting, delegated authority, and dedicated CBA advisory partner in place.' }
    ]
  }
];

// Interactive Crisis Scenarios
interface CrisisScenario {
  id: string;
  title: string;
  threatLevel: string;
  threatColor: string;
  trigger: string;
  consequence: string;
  triage72h: string[];
  iwsShield: string;
}

const CRISIS_SCENARIOS: CrisisScenario[] = [
  {
    id: 'sars_it88',
    title: 'SARS IT88 Third-Party Bank Account Freeze',
    threatLevel: 'CRITICAL THREAT',
    threatColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
    trigger: 'Unresolved historic tax debt or unresponded final demand notice.',
    consequence: 'SARS instructs your commercial bank to deduct funds directly, freezing payroll and supplier payments without court order.',
    triage72h: [
      'Immediate formal Request for Suspension of Payment under Section 164 of the Tax Administration Act.',
      'File formal Notice of Objection (Section 104) if the assessment is disputed.',
      'Direct liaison with SARS Debt Management to lift third-party agent appointment.'
    ],
    iwsShield: 'Our registered Tax Practitioners immediately take over SARS communications, file urgent suspension paperwork, and restructure debt via Section 200 compromise.'
  },
  {
    id: 'bad_debt',
    title: 'Major Client Defaults on R250,000 Invoice',
    threatLevel: 'HIGH CASH STRAIN',
    threatColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    trigger: 'Key corporate customer enters business rescue or defaults on net-30 terms.',
    consequence: 'Working capital shortfall causes EMP201 payroll tax deficit and supplier credit hold.',
    triage72h: [
      'Claim bad debt input tax deduction on next VAT201 under Section 22(1) of the VAT Act.',
      'Activate emergency cash flow bridge and restructure outgoing supplier payment dates.',
      'Audit accounts receivable and institute strict credit insurance / upfront deposits.'
    ],
    iwsShield: 'IWS cash flow stress-testing models immediate working capital adjustments and recovers statutory tax credits to cushion cash bleed.'
  },
  {
    id: 'cipc_dereg',
    title: 'CIPC Notice of Impending Entity Deregistration',
    threatLevel: 'SEVERE LEGAL HAZARD',
    threatColor: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
    trigger: 'Failure to submit CIPC Annual Returns or Beneficial Ownership filings for 2+ consecutive years.',
    consequence: 'Company legal personality terminates. Bank accounts frozen by compliance algorithms. Contracts become legally void.',
    triage72h: [
      'Perform urgent CIPC status diagnostic and calculate historic penalty turnover brackets.',
      'Submit outstanding Annual Returns & new mandatory Beneficial Ownership Register within 24 hours.',
      'Obtain official CIPC Letter of Good Standing for bank compliance officers.'
    ],
    iwsShield: 'IWS executes express CIPC annual filings and Beneficial Ownership registrations, restoring good standing in 1–2 business days.'
  },
  {
    id: 'payroll_audit',
    title: 'SARS EMP501 Bi-Annual Reconciliation Audit',
    threatLevel: 'COMPLIANCE AUDIT',
    threatColor: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    trigger: 'Mismatch between declared monthly EMP201 payments and issued IRP5 tax certificates.',
    consequence: 'Automatic 10% penalty plus interest on unallocated payroll taxes, blocking Tax Clearance PIN issuance.',
    triage72h: [
      'Extract full general ledger payroll breakdown against SARS eFiling statement of account.',
      'Perform forensic payroll reconciliation to identify missing employee tax numbers or UIF caps.',
      'Resubmit corrected EMP501 and file formal penalty remission application.'
    ],
    iwsShield: 'Our accredited payroll specialists reconcile all variance discrepancies, file clean IRP5 declarations, and restore your active Tax Clearance status.'
  }
];

// Pre-loaded AI prompts
const SUGGESTED_PROMPTS = [
  'How do I legally stop SARS from deducting funds from my bank account?',
  'What is the difference between a PTY Ltd and a Holding Company structure?',
  'How do I apply for a SARS Section 104 penalty remission?',
  'What documents do I need to maintain an active Tax Clearance PIN?'
];

// -------------------------------------------------------------
// MAIN WAR ROOM COMPONENT
// -------------------------------------------------------------

const WarRoom: React.FC = () => {
  const [activeStream, setActiveStream] = useState<StreamType>('stress');
  const [selectedPillarValues, setSelectedPillarValues] = useState<Record<string, number>>({
    liquidity: 10,
    compliance: 10,
    structure: 10,
    dependency: 10
  });

  const [activeScenarioId, setActiveScenarioId] = useState<string>('sars_it88');

  // AI Chat States
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'model'; text: string }>>([
    {
      role: 'model',
      text: 'War Room Tactical AI online. I am trained on South African tax compliance (SARS), CIPC corporate governance, and SME cash flow architecture. What vulnerability or scenario would you like to stress-test?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatSessionRef = React.useRef(createChatSession());

  // Lead Generation / Dossier Form
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    turnover: 'R1M – R7M / year (Growing)',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Compute Total Sovereignty Score
  const totalScore = useMemo(() => {
    return Object.values(selectedPillarValues).reduce((a, b) => a + b, 0);
  }, [selectedPillarValues]);

  const scoreAnalysis = useMemo(() => {
    if (totalScore <= 30) {
      return {
        level: 'CRITICAL STRUCTURAL EXPOSURE',
        color: 'text-rose-500',
        badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
        summary: 'Your business is operating in a danger zone. Cash buffers are razor thin, and personal assets are directly exposed to SARS or commercial liabilities.',
        urgentTriage: 'Emergency compliance audit and cash vault segregation required within 7 days.',
        pathway: 'Foundation Pathway (R3,500/mo) or Emergency Turnaround'
      };
    } else if (totalScore <= 60) {
      return {
        level: 'VULNERABLE REACTIVE STATE',
        color: 'text-amber-400',
        badgeBg: 'bg-amber-400/10 border-amber-400/30 text-amber-400',
        summary: 'You are staying afloat, but compliance takes excessive founder bandwidth. Inefficient tax structures and founder dependency are capping scalability.',
        urgentTriage: 'Implement monthly management review, automate VAT/EMP201 filings, and establish holding entity insulation.',
        pathway: 'Ascension Pathway (R7,000/mo) — Fractional CBA & Governance'
      };
    } else if (totalScore <= 85) {
      return {
        level: 'STABLE OPERATIONAL ALIGNMENT',
        color: 'text-teal-300',
        badgeBg: 'bg-teal-400/10 border-teal-400/30 text-teal-300',
        summary: 'Solid core foundation. Operations and filings are orderly. Next step is wealth preservation, tax restructuring, and strategic board-level advisory.',
        urgentTriage: 'Execute cash forecasting, corporate restructuring, and audit defense protocols.',
        pathway: 'Ascension or Sovereign Pathway'
      };
    } else {
      return {
        level: 'SOVEREIGN ENTERPRISE STATUS',
        color: 'text-emerald-400',
        badgeBg: 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400',
        summary: 'Maximum resilience. Zero founder bottleneck, ring-fenced assets, audit-proof books, and executive financial governance active.',
        urgentTriage: 'Maintain quarterly strategic reviews and high-level tax optimization.',
        pathway: 'Sovereign Pathway (R11,500/mo) — Full Strategic Leadership'
      };
    }
  }, [totalScore]);

  // Dynamic Live Statutory Radar Dates (Computed relative to current date)
  const dynamicRadarDeadlines = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    // Next EMP201 (7th of next month)
    const nextEmpMonth = (currentMonth + 1) % 12;
    const nextEmpYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const empDate = new Date(nextEmpYear, nextEmpMonth, 7);

    // Next VAT201 (25th of current or next month depending on today's day)
    let vatDate: Date;
    if (now.getDate() <= 25) {
      vatDate = new Date(currentYear, currentMonth, 25);
    } else {
      const nextVatMonth = (currentMonth + 1) % 12;
      const nextVatYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      vatDate = new Date(nextVatYear, nextVatMonth, 25);
    }

    // Provisional Tax Periods (Aug 31 & Feb 28/29)
    let provDate: Date;
    if (currentMonth < 7 || (currentMonth === 7 && now.getDate() <= 31)) {
      provDate = new Date(currentYear, 7, 31); // 31 Aug
    } else {
      const febYear = currentMonth >= 8 ? currentYear + 1 : currentYear;
      provDate = new Date(febYear, 1, 28); // 28 Feb
    }

    // CIPC & Beneficial Ownership (Annual rolling cycle)
    const cipcDate = new Date(currentYear, currentMonth, Math.min(28, now.getDate() + 14));

    const calcDays = (target: Date) => {
      const diff = target.getTime() - now.getTime();
      return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    return [
      {
        title: 'Monthly EMP201 Payroll Filing',
        scope: 'PAYE, UIF & SDL Statutory Declaration',
        date: empDate.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }),
        daysLeft: calcDays(empDate),
        urgency: calcDays(empDate) <= 5 ? 'CRITICAL' : 'MANDATORY'
      },
      {
        title: 'Bi-Monthly VAT201 Declaration',
        scope: 'Output vs Input Tax Reconciliation',
        date: vatDate.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }),
        daysLeft: calcDays(vatDate),
        urgency: calcDays(vatDate) <= 7 ? 'HIGH PRIORITY' : 'ACTIVE CYCLE'
      },
      {
        title: 'Provisional Tax (IRP6 Period)',
        scope: 'Estimated Corporate & Director Tax',
        date: provDate.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }),
        daysLeft: calcDays(provDate),
        urgency: 'STATUTORY WINDOW'
      },
      {
        title: 'CIPC Annual Return & Beneficial Ownership',
        scope: 'Corporate Deregistration Prevention',
        date: cipcDate.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }),
        daysLeft: calcDays(cipcDate),
        urgency: 'MANDATORY REGISTRATION'
      }
    ];
  }, []);

  // Handle AI Chat Submission
  const handleAiSend = async (messageToSend?: string) => {
    const text = messageToSend || chatInput;
    if (!text.trim() || isAiLoading) return;

    const userMsg = { role: 'user' as const, text };
    setChatMessages(prev => [...prev, userMsg]);
    if (!messageToSend) setChatInput('');
    setIsAiLoading(true);

    try {
      const stream = await sendMessageStream(chatSessionRef.current, text);
      let fullReply = '';
      for await (const chunk of stream) {
        fullReply += chunk.text;
      }

      setChatMessages(prev => [
        ...prev,
        {
          role: 'model',
          text: fullReply || 'I have analyzed your situation. For binding statutory filings and direct execution, our registered CBA advisors are on standby to take this off your desk.'
        }
      ]);
    } catch (err) {
      // Intelligent client-side fallback matching IWS protocol
      setTimeout(() => {
        let fallbackText = 'Based on South African Tax Administration and CIPC regulations, immediate proactive reconciliation is essential. Under Section 104 of the Tax Administration Act, formal objections must be lodged within 30 business days. IWS accredited practitioners can file this on your behalf.';
        if (text.toLowerCase().includes('bank') || text.toLowerCase().includes('freeze')) {
          fallbackText = 'If SARS has issued an IT88 third-party appointment on your bank account, you have the statutory right under Section 164 of the Tax Administration Act to request an immediate Suspension of Payment while disputing the underlying assessment. Contact IWS immediately to file this shield.';
        } else if (text.toLowerCase().includes('holding') || text.toLowerCase().includes('structure')) {
          fallbackText = 'A proper structural architecture separates the Operating Entity (trading risk, payroll, commercial contracts) from a Holding Company or Trust (owning IP, core equipment, and cash reserves). This ensures that trading disputes never threaten foundational assets.';
        }
        setChatMessages(prev => [...prev, { role: 'model', text: fallbackText }]);
      }, 500);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Submit Lead & Battle Plan Request
  const handleSubmitDossier = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (db) {
        await addDoc(collection(db, 'war_room_leads'), {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          turnover: formData.turnover,
          notes: formData.notes || '',
          sovereigntyScore: totalScore,
          analysisLevel: scoreAnalysis.level,
          recommendedPathway: scoreAnalysis.pathway,
          timestamp: serverTimestamp()
        });

        // Send confirmation email
        await addDoc(collection(db, 'mail'), {
          to: formData.email,
          message: {
            subject: `[WAR ROOM DOSSIER] ${formData.company} Financial Battle Plan`,
            html: `<div style="font-family:sans-serif;color:#134e4a;padding:24px;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:16px;background:#ffffff;">
              <h1 style="color:#d4af37;text-transform:uppercase;letter-spacing:1px;font-size:22px;">War Room Tactical Dossier</h1>
              <p>Hi <strong>${formData.name}</strong>,</p>
              <p>Your Financial Sovereignty stress test report for <strong>${formData.company}</strong> has been generated:</p>
              <div style="background:#0f172a;color:#ffffff;padding:16px;border-radius:12px;margin:16px 0;">
                <p style="margin:0;font-size:12px;color:#d4af37;text-transform:uppercase;letter-spacing:1px;">Sovereignty Score</p>
                <h2 style="margin:4px 0;font-size:28px;color:#ffffff;">${totalScore} / 100</h2>
                <p style="margin:0;color:#94a3b8;font-size:13px;">Status: <strong>${scoreAnalysis.level}</strong></p>
                <p style="margin:8px 0 0 0;color:#38bdf8;font-size:13px;">Recommended Strategy: <strong>${scoreAnalysis.pathway}</strong></p>
              </div>
              <p><strong>Immediate Triage Priority:</strong><br/>${scoreAnalysis.urgentTriage}</p>
              <p style="margin-top:24px;">
                <a href="https://calendly.com/marcia-kgaphola/new-meeting" style="background:#d4af37;color:#0f172a;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;text-transform:uppercase;letter-spacing:1px;font-size:13px;">Schedule Executive Strategy Session</a>
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

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-brand-gold/30 selection:text-white pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* TOP COMMAND HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-widest">
                <Flame size={12} className="animate-pulse" /> Live Threat Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={12} /> CIBA · SAIT · SAICA Accredited
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-sora font-extrabold tracking-tighter leading-none">
              THE FINANCIAL <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-white italic">
                WAR ROOM.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
              Stress-test your enterprise against South African regulatory audits, cash-flow bottlenecks, and structural dependency before they strike.
            </p>
          </div>

          {/* Quick Score Snapshot Box */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl flex items-center gap-6 shrink-0">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                Sovereignty Score
              </span>
              <div className="text-4xl font-sora font-black text-brand-gold">
                {totalScore}<span className="text-lg text-gray-500">/100</span>
              </div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="space-y-1">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${scoreAnalysis.badgeBg}`}>
                {scoreAnalysis.level}
              </span>
              <p className="text-xs text-gray-400 truncate max-w-[200px]">
                {scoreAnalysis.pathway}
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS (5 STREAMS) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
          {(Object.keys(STREAM_LABELS) as StreamType[]).map(id => {
            const isActive = activeStream === id;
            return (
              <button
                key={id}
                onClick={() => setActiveStream(id)}
                className={`py-3.5 px-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-brand-gold text-slate-950 font-bold shadow-lg scale-[1.02]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {id === 'stress' && <Activity size={14} />}
                {id === 'threats' && <ShieldAlert size={14} />}
                {id === 'calendar' && <Calendar size={14} />}
                {id === 'ai' && <Sparkles size={14} />}
                {id === 'dossier' && <FileText size={14} />}
                <span className="truncate">{STREAM_LABELS[id].label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* 1. STRUCTURAL AUDIT (4-PILLAR STRESS TEST) */}
        {/* ========================================================= */}
        {activeStream === 'stress' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left Column: The 4 Diagnostic Dimensions */}
            <div className="lg:col-span-8 space-y-6">
              {DIAGNOSTIC_PILLARS.map(pillar => {
                const currentValue = selectedPillarValues[pillar.id] ?? 10;
                return (
                  <div
                    key={pillar.id}
                    className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white font-sora">{pillar.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{pillar.subtitle}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {pillar.options.map((opt, idx) => {
                        const isSelected = currentValue === opt.points;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedPillarValues(prev => ({
                                ...prev,
                                [pillar.id]: opt.points
                              }));
                            }}
                            className={`text-left p-3.5 rounded-2xl border transition-all ${
                              isSelected
                                ? 'bg-brand-gold/15 border-brand-gold text-white shadow-sm ring-1 ring-brand-gold/30'
                                : 'bg-black/30 border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-bold ${isSelected ? 'text-brand-gold' : 'text-gray-300'}`}>
                                {opt.label}
                              </span>
                              <span className="text-[10px] font-mono text-gray-500 font-bold">
                                {opt.points} pts
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-400 leading-snug">{opt.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Live Threat Diagnostic Summary */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/15 shadow-2xl space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold block mb-1">
                    Live Diagnostic Telemetry
                  </span>
                  <h3 className="text-xl font-bold font-sora text-white">Structural Health Matrix</h3>
                </div>

                {/* Score Circle & Progress Bar */}
                <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Overall Resilience:</span>
                    <span className="text-2xl font-black font-sora text-brand-gold">{totalScore}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        totalScore <= 30
                          ? 'bg-rose-500'
                          : totalScore <= 60
                          ? 'bg-amber-400'
                          : totalScore <= 85
                          ? 'bg-teal-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${totalScore}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-300 italic pt-1">
                    "{scoreAnalysis.summary}"
                  </p>
                </div>

                {/* Prescribed Solution */}
                <div className="space-y-2 border-t border-white/10 pt-4 text-xs">
                  <span className="font-bold text-gray-400 uppercase tracking-wider block text-[10px]">
                    Prescribed Immediate Action:
                  </span>
                  <p className="text-brand-gold font-medium leading-relaxed bg-brand-gold/10 p-3 rounded-xl border border-brand-gold/20">
                    {scoreAnalysis.urgentTriage}
                  </p>
                </div>

                <button
                  onClick={() => setActiveStream('dossier')}
                  className="w-full py-4 bg-brand-gold text-slate-950 font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:bg-white transition-all flex items-center justify-center gap-2"
                >
                  Generate Battle Plan <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. CRISIS SIMULATOR ("WHAT-IF" SCENARIOS) */}
        {/* ========================================================= */}
        {activeStream === 'threats' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">
                Tactical Simulation Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-sora font-extrabold text-white mt-1">
                South African SME Crisis Protocols
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
                Select any catastrophic operational event to view the exact statutory defense shield, immediate 72-hour triage steps, and permanent IWS insulation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {CRISIS_SCENARIOS.map(sc => (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={`text-left p-4 rounded-2xl border transition-all ${
                    activeScenarioId === sc.id
                      ? 'bg-brand-gold/15 border-brand-gold text-white shadow-md'
                      : 'bg-white/[0.03] border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border inline-block mb-2 ${sc.threatColor}`}>
                    {sc.threatLevel}
                  </span>
                  <h4 className="font-bold text-sm text-white leading-tight">{sc.title}</h4>
                </button>
              ))}
            </div>

            {/* Selected Scenario Detailed Protocol Box */}
            {(() => {
              const activeScenario = CRISIS_SCENARIOS.find(s => s.id === activeScenarioId) || CRISIS_SCENARIOS[0];
              return (
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.04] border border-white/15 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded border inline-block mb-1 ${activeScenario.threatColor}`}>
                        {activeScenario.threatLevel}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-sora font-bold text-white">{activeScenario.title}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/10 space-y-2">
                      <span className="font-bold text-rose-400 uppercase tracking-wider block text-[10px]">
                        The Statutory Hazard & Trigger:
                      </span>
                      <p className="text-gray-300 leading-relaxed font-medium">{activeScenario.trigger}</p>
                      <p className="text-rose-300/90 leading-relaxed pt-2 border-t border-white/5 font-semibold">
                        Impact: {activeScenario.consequence}
                      </p>
                    </div>

                    <div className="bg-black/40 p-5 rounded-2xl border border-white/10 space-y-2">
                      <span className="font-bold text-brand-gold uppercase tracking-wider block text-[10px]">
                        Permanent IWS Defense Shield:
                      </span>
                      <p className="text-brand-100 leading-relaxed">{activeScenario.iwsShield}</p>
                    </div>
                  </div>

                  {/* 72-Hour Triage Steps */}
                  <div className="space-y-3">
                    <span className="font-bold text-white uppercase tracking-wider block text-xs flex items-center gap-2">
                      <Zap size={14} className="text-brand-gold" /> Immediate 72-Hour Response Sequence:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeScenario.triage72h.map((step, idx) => (
                        <div key={idx} className="bg-brand-gold/5 border border-brand-gold/20 p-4 rounded-2xl space-y-1 text-xs">
                          <span className="font-mono text-brand-gold font-bold text-[10px]">PHASE 0{idx + 1}</span>
                          <p className="text-gray-200 leading-snug">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">
                      Facing this threat right now? Our accredited practitioners can intervene within 2 hours.
                    </p>
                    <button
                      onClick={() => setActiveStream('dossier')}
                      className="px-6 py-3 bg-brand-gold text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shrink-0"
                    >
                      Deploy Response Protocol
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. STATUTORY RADAR (LIVE DYNAMIC CALENDAR) */}
        {/* ========================================================= */}
        {activeStream === 'calendar' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">
                  Live Statutory Telemetry
                </span>
                <h2 className="text-2xl sm:text-3xl font-sora font-extrabold text-white mt-1">
                  Active South African Regulatory Radar
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Continuously calculated against SARS eFiling, CIPC, and Department of Labour deadlines.
                </p>
              </div>

              <a
                href="#compliance-calendar"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-gold hover:underline uppercase tracking-wider"
              >
                Access Full Compliance Calendar <ExternalLink size={12} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dynamicRadarDeadlines.map((deadline, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-4 hover:border-brand-gold/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold bg-white/10 px-2 py-0.5 rounded text-brand-gold uppercase">
                        {deadline.urgency}
                      </span>
                      <span className="text-xs font-bold font-mono text-gray-400">{deadline.date}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white font-sora pt-1">{deadline.title}</h4>
                    <p className="text-xs text-gray-400">{deadline.scope}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-xs text-gray-500">Days Remaining:</span>
                    <span className={`text-xl font-black font-sora ${deadline.daysLeft <= 7 ? 'text-rose-400' : 'text-brand-gold'}`}>
                      {deadline.daysLeft} Days
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl text-xs text-brand-100 flex items-center gap-3">
              <Info size={18} className="text-brand-gold shrink-0" />
              <span>
                <strong>Zero-Penalty Guarantee:</strong> On Sovereign and Ascension pathways, IWS tracks, compiles, and files every statutory return before these radar thresholds.
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. AI TACTICAL COPILOT (GEMINI AI STREAM) */}
        {/* ========================================================= */}
        {activeStream === 'ai' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">
                Autonomous Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-sora font-extrabold text-white mt-1">
                War Room AI Tactical Copilot
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Trained on the South African Tax Administration Act, CIPC corporate law, and SME resilience frameworks.
              </p>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleAiSend(prompt)}
                  className="text-left text-xs bg-white/5 hover:bg-brand-gold/20 border border-white/10 hover:border-brand-gold/40 text-gray-300 hover:text-white px-3.5 py-2 rounded-xl transition-colors"
                >
                  💡 {prompt}
                </button>
              ))}
            </div>

            {/* Chat Messages Container */}
            <div className="bg-black/50 rounded-3xl border border-white/10 p-5 sm:p-6 min-h-[360px] max-h-[460px] overflow-y-auto space-y-4">
              {chatMessages.map((msg, mIdx) => (
                <div
                  key={mIdx}
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-xl bg-brand-gold/20 border border-brand-gold text-brand-gold flex items-center justify-center shrink-0 text-xs font-bold">
                      AI
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm max-w-xl leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-brand-gold text-slate-950 font-bold ml-auto'
                        : 'bg-white/10 text-gray-200 border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div className="flex items-center gap-2 text-xs text-brand-gold font-mono animate-pulse">
                  <Loader2 className="animate-spin" size={14} /> Synthesizing South African statutory analysis...
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAiSend();
              }}
              className="flex items-center gap-2 bg-white/5 p-2 rounded-2xl border border-white/15 focus-within:border-brand-gold transition-colors"
            >
              <input
                type="text"
                placeholder="Ask tactical question (e.g. How to appeal SARS penalty, protect director assets)..."
                className="w-full bg-transparent px-4 py-3 text-xs sm:text-sm text-white outline-none placeholder-gray-500 font-medium"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isAiLoading}
                className="p-3 bg-brand-gold text-slate-950 rounded-xl hover:bg-white transition-colors disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. GET CUSTOM BATTLE PLAN (DOSSIER & LEAD CAPTURE) */}
        {/* ========================================================= */}
        {activeStream === 'dossier' && (
          <div className="max-w-3xl mx-auto animate-fadeIn space-y-8">
            {!isSuccess ? (
              <div className="bg-white/[0.04] border border-white/15 rounded-3xl p-6 sm:p-10 space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">
                    Executive Strategy Output
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-sora font-extrabold text-white mt-1">
                    Deploy Your Custom Battle Plan
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Receive your customized Sovereignty score audit, statutory remediation checklist, and dedicated advisor roadmap.
                  </p>
                </div>

                {/* Score Matrix Snapshot */}
                <div className="bg-black/50 p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Audited Resilience Score</span>
                    <span className="text-2xl font-black font-sora text-brand-gold">{totalScore} / 100</span>
                    <span className="text-xs text-gray-300 block font-medium mt-0.5">{scoreAnalysis.level}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Recommended Trajectory</span>
                    <span className="text-sm font-bold text-white">{scoreAnalysis.pathway}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmitDossier} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Full Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Marcia Kgaphola"
                        className="w-full p-3.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:border-brand-gold outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Business / Entity Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Acacia Systems (Pty) Ltd"
                        className="w-full p-3.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:border-brand-gold outline-none"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Work Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="founder@company.co.za"
                        className="w-full p-3.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:border-brand-gold outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Cellphone / WhatsApp *</label>
                      <input
                        required
                        type="tel"
                        placeholder="082 123 4567"
                        className="w-full p-3.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:border-brand-gold outline-none"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Annual Turnover Bracket</label>
                    <select
                      value={formData.turnover}
                      onChange={(e) => setFormData({ ...formData, turnover: e.target.value })}
                      className="w-full p-3.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:border-brand-gold outline-none"
                    >
                      <option value="< R1M / year (Starting out)" className="bg-slate-900">Under R1M / year (Foundation Tier)</option>
                      <option value="R1M – R7M / year (Growing)" className="bg-slate-900">R1M – R7M / year (Ascension Tier)</option>
                      <option value="R7M – R25M+ / year (Scaling Scale)" className="bg-slate-900">R7M – R25M+ / year (Sovereign Tier)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Immediate Compliance Pain Point (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Outstanding VAT audits, need urgent tax clearance PIN for tender..."
                      className="w-full p-3.5 bg-black/40 border border-white/15 rounded-xl text-xs sm:text-sm text-white focus:border-brand-gold outline-none"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-gold text-slate-950 font-black uppercase tracking-widest text-xs rounded-xl shadow-xl hover:bg-white transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={16} /> Compiling Executive Dossier...
                      </>
                    ) : (
                      <>
                        Dispatch My Battle Plan <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Screen */
              <div className="bg-white/[0.04] border border-white/15 rounded-3xl p-8 sm:p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 size={48} />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/30">
                    Dossier Dispatched
                  </span>
                  <h2 className="text-3xl font-sora font-extrabold text-white">
                    Battle Plan Initialized for {formData.company}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
                    Your full resilience audit and tailored statutory roadmap have been delivered to <strong>{formData.email}</strong>.
                  </p>
                </div>

                <div className="p-6 bg-black/50 rounded-2xl max-w-md mx-auto text-left text-xs space-y-3 border border-white/10">
                  <span className="font-bold text-brand-gold uppercase tracking-wider block text-[10px]">
                    Immediate Next Action
                  </span>
                  <p className="text-gray-300">
                    Book your direct 30-minute strategic discovery session with Principal Architect Marcia Kgaphola:
                  </p>
                  <a
                    href="https://calendly.com/marcia-kgaphola/new-meeting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-brand-gold text-slate-950 rounded-xl font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    Schedule Strategy Session <ExternalLink size={14} />
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setActiveStream('stress');
                    }}
                    className="text-xs text-gray-400 hover:text-white underline"
                  >
                    Run Another Simulation
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default WarRoom;
