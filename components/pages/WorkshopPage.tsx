import React, { useState } from 'react';
import RevealOnScroll from '../RevealOnScroll';
import Button from '../Button';
import WorkshopRegistrationForm from '../WorkshopRegistrationForm';
import { Monitor, Tag, ShieldCheck, ChevronRight, CheckCircle2, ArrowRight, HelpCircle, AlertTriangle } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';

const FOUNDER_URL = "https://res.cloudinary.com/dkyg07qvv/image/upload/v1778472133/Marcia_Kgaphola._SARS._CIPC._COMPLIANCE_e9mn4f.jpg";
const TREE_LOGO_URL = "https://res.cloudinary.com/dka0498ns/image/upload/v1765747786/favicon_ofkkb1.png";

const ASSESSMENT_QUESTIONS = [
  {
    q: "Do you have separate bank accounts for business and personal use?",
    options: [
      { text: "Yes, strictly separated", score: 10 },
      { text: "Mostly, but they sometimes mix", score: 5 },
      { text: "No, everything goes into one account", score: 0 }
    ]
  },
  {
    q: "Are your tax returns (SARS/VAT/PAYE) fully up to date?",
    options: [
      { text: "Yes, 100% compliant", score: 10 },
      { text: "I think so, but I am unsure", score: 5 },
      { text: "No, I have an active backlog", score: 0 }
    ]
  },
  {
    q: "Is your CIPC Annual Return paid and current?",
    options: [
      { text: "Yes, filed on time", score: 10 },
      { text: "I am not sure", score: 2 },
      { text: "No, might be deregistered", score: 0 }
    ]
  }
];

export default function WorkshopPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Computes the upcoming First Monday of the Month dynamically
  const getNextFirstMondayDate = () => {
    const now = new Date();
    const getFirstMonday = (y: number, m: number) => {
      const d = new Date(y, m, 1);
      while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
      }
      d.setHours(18, 0, 0, 0);
      return d;
    };

    let targetDate = getFirstMonday(now.getFullYear(), now.getMonth());
    if (now.getTime() > targetDate.getTime()) {
      targetDate = getFirstMonday(now.getFullYear(), now.getMonth() + 1);
    }
    return new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }).format(targetDate);
  };

  const nextMondayDate = getNextFirstMondayDate();

  const handleAnswer = (points: number) => {
    const nextScore = score + points;
    setScore(nextScore);
    if (currentStep < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const getRiskProfile = (finalScore: number) => {
    if (finalScore >= 25) return { label: "LOW RISK", color: "text-emerald-500", desc: "Your basic compliance is solid. Book a free session to scale your setup." };
    if (finalScore >= 12) return { label: "MODERATE RISK", color: "text-brand-gold", desc: "Critical administrative gaps exist. Let's trace and clean them up." };
    return { label: "HIGH RISK", color: "text-rose-500", desc: "Your entity is exposed to penalties or deregistration. Immediate action is required." };
  };

  return (
    <div className="animate-fadeIn bg-white selection:bg-brand-gold/20">
      <div className="bg-[#f4f1ea] text-brand-900 pt-32 pb-20 px-6 relative overflow-hidden border-b-8 border-brand-900">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#134e4a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll>
            <div className="space-y-8">
              <div className="flex justify-start mb-6">
                <img src={TREE_LOGO_URL} alt="IWS Logo" className="w-32 h-32 object-contain" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-black tracking-tighter uppercase leading-[1.1] text-brand-900">
                Governance, Recordkeeping, <br className="hidden md:block" />
                <span className="text-brand-900">& Compliance Workshop</span>
              </h1>
              <div className="flex items-center gap-4 font-black tracking-widest uppercase text-lg md:text-2xl text-brand-900">
                <span>CIPC</span><span className="text-brand-gold">|</span><span>SARS</span><span className="text-brand-gold">|</span><span>Labour</span>
              </div>
              <div className="bg-brand-900 text-white p-6 rounded-r-3xl rounded-l-md shadow-2xl inline-block mt-8 border-l-8 border-brand-gold">
                <p className="text-2xl md:text-3xl font-black tracking-tight mb-2">{nextMondayDate}</p>
                <p className="text-xl opacity-90 mb-2">18h00 - 20h00 SAST</p>
                <div className="flex flex-wrap items-center gap-4 text-sm font-bold tracking-widest uppercase text-brand-gold mt-4">
                  <span className="flex items-center gap-2"><Monitor size={16} /> Online Session</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block"></span>
                  <span className="flex items-center gap-2"><Tag size={16} /> Cost: R250 Per Person</span>
                </div>
              </div>
              <div className="pt-8">
                <Button onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full py-5 px-10 text-sm font-black uppercase tracking-widest bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900 shadow-xl transition-all">
                  Secure Your Seat Now <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <img src={FOUNDER_URL} alt="Marcia Kgaphola" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-900 to-transparent p-8 pt-32">
                <p className="text-white font-black uppercase tracking-widest text-xl">Marcia Kgaphola</p>
                <p className="text-brand-gold font-bold text-xs uppercase tracking-widest">Principal Architect</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Embedded Compliance Assessment Section */}
      <section className="py-24 bg-brand-900 text-white relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-sora font-black uppercase tracking-tighter text-brand-gold">60-Second Compliance Check</h2>
            <p className="text-brand-100 max-w-2xl mx-auto text-base">Check your entity standing instantly, then book a free discovery call to secure your operational blueprint.</p>
          </div>
          <div className="bg-white text-brand-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            {!showResults ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Step {currentStep + 1} of {ASSESSMENT_QUESTIONS.length}</span>
                  <HelpCircle size={20} className="text-brand-gold" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold leading-tight">{ASSESSMENT_QUESTIONS[currentStep].q}</h3>
                <div className="grid gap-4">
                  {ASSESSMENT_QUESTIONS[currentStep].options.map((opt, idx) => (
                    <button key={idx} onClick={() => handleAnswer(opt.score)} className="group p-5 text-left rounded-xl border-2 border-brand-900/5 hover:border-brand-gold bg-brand-50/50 hover:bg-white transition-all flex justify-between items-center font-bold text-sm">
                      <span>{opt.text}</span>
                      <ArrowRight size={16} className="text-brand-900/20 group-hover:text-brand-gold transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-8 py-4">
                <AlertTriangle size={64} className="text-brand-gold mx-auto animate-bounce" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Assessment Complete</h3>
                  <p className="text-lg font-bold">Your Entity standing is:</p>
                  <span className={`inline-block text-2xl font-black ${getRiskProfile(score).color}`}>{getRiskProfile(score).label}</span>
                </div>
                <p className="text-gray-600 max-w-md mx-auto">{getRiskProfile(score).desc}</p>
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-bold text-brand-900 mb-6 uppercase tracking-wider">Book Your Free Discovery Call</h4>
                  <Button onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')} size="lg" className="rounded-full py-4 px-12 bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900 transition-all font-black uppercase tracking-widest text-xs shadow-lg">
                    Book Free Consultation
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-24 bg-white border-y border-brand-900/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-sora font-black text-brand-900 tracking-tighter mb-4">Workshop Curriculum</h2>
            <p className="text-lg text-brand-900/60 font-medium">Actionable intelligence for South African founders.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "CIPC Navigation", desc: "Mastering Annual Returns, Beneficial Ownership, and protecting your entity status from deregistration." },
              { title: "SARS Architecture", desc: "Understanding Provisional Tax, VAT thresholds, and building audit-proof recordkeeping systems." },
              { title: "Labour Compliance", desc: "Structuring PAYE, UIF, and SDL correctly to avoid compounding penalties and protect your workforce." }
            ].map((module, idx) => (
              <div key={idx} className="bg-gray-50 p-10 rounded-[2.5rem] shadow-sm border border-brand-900/5 hover:-translate-y-2 hover:shadow-xl hover:border-brand-gold transition-all duration-300">
                <div className="w-12 h-12 bg-brand-900 text-brand-gold rounded-xl flex items-center justify-center font-black text-xl mb-6">{idx + 1}</div>
                <h3 className="text-xl font-black text-brand-900 uppercase tracking-tight mb-4">{module.title}</h3>
                <p className="text-brand-900/70 leading-relaxed font-medium text-sm">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-32 bg-[#f4f1ea]" id="registration">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-sora font-black text-brand-900 tracking-tighter uppercase">Secure Your <span className="text-brand-gold italic">Seat.</span></h2>
            <p className="text-lg text-brand-900/60 mt-6 font-medium max-w-2xl mx-auto">Complete the registration protocol below to reserve your spot and receive the meeting link.</p>
          </div>
          <RevealOnScroll>
            <WorkshopRegistrationForm
              eventName="Governance, Recordkeeping & Compliance Workshop"
              eventDate={`${nextMondayDate}, 18h00 - 20h00`}
              eventLink="https://zoom.us/j/iws-workshop-link"
            />
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
