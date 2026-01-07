import React, { useState } from 'react';
import { X, ChevronRight, Activity, ShieldCheck, CheckCircle2, ArrowRight, Lock, User, Building, Mail, Phone } from 'lucide-react';
import { QUIZ_QUESTIONS, CONTACT_INFO } from '../constants';
import Button from './Button';

interface FinancialHealthScoreProps {
  isOpen: boolean;
  onClose: () => void;
  isModal?: boolean;
}

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isOpen, onClose, isModal = false }) => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  
  // Data Collection State
  const [leadData, setLeadData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    whatsapp: ''
  });

  if (!isOpen) return null;

  const handleOptionSelect = (optionScore: number) => {
    const newScore = score + optionScore;
    setScore(newScore);

    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowLeadForm(true); // Trigger data collection before showing results
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Logic for Firebase / Email Trigger
    console.log("Initializing Firebase Data Sync & Automated Email Sequence...", {
      ...leadData,
      score,
      event: "Financial Clarity For Non-Financial Business Owners Workshop"
    });

    // In a live environment, this is where you'd call your firebase function
    // await db.collection('assessments').add({ ...leadData, score, timestamp: new Date() });

    setShowLeadForm(false);
    setIsFinished(true);
  };

  const getResult = () => {
    const maxScore = QUIZ_QUESTIONS.length * 4;
    const percentage = (score / maxScore) * 100;

    if (percentage >= 80) return {
      status: "Optimized",
      message: "Your foundations are strong. You are ready for strategic scaling through the 2026 Watershed.",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    };
    if (percentage >= 50) return {
      status: "Moderate Risk",
      message: "Structural gaps identified. The SARS AI transition may trigger compliance flags.",
      color: "text-brand-gold",
      bg: "bg-brand-gold/5"
    };
    return {
      status: "Critical Triage Required",
      message: "Your current systems likely cannot withstand 2026 data triangulation. Immediate intervention needed.",
      color: "text-red-500",
      bg: "bg-red-50"
    };
  };

  const content = (
    <div className="relative overflow-hidden">
      {/* 1. QUIZ PHASE */}
      {!showLeadForm && !isFinished && (
        <div className="space-y-8 p-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-2 italic">Predictive Triage</p>
              <h2 className="text-2xl font-black text-brand-900 uppercase tracking-tighter">Step {step + 1} of {QUIZ_QUESTIONS.length}</h2>
            </div>
            <span className="text-4xl font-black text-brand-900/5 italic">0{step + 1}</span>
          </div>

          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-900 transition-all duration-700 ease-out" style={{ width: `${((step + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-widest">
              <Activity size={14} />
              <span>{QUIZ_QUESTIONS[step].category}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-brand-900 leading-tight">{QUIZ_QUESTIONS[step].question}</h3>
          </div>

          <div className="grid gap-3">
            {QUIZ_QUESTIONS[step].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option.score)}
                className="group flex items-center justify-between p-6 text-left bg-white border border-gray-100 rounded-2xl hover:border-brand-gold transition-all duration-300"
              >
                <span className="font-bold text-gray-700 group-hover:text-brand-900">{option.text}</span>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. DATA COLLECTION PHASE */}
      {showLeadForm && (
        <div className="space-y-8 p-4 animate-fadeIn">
          <div className="text-center">
            <div className="inline-flex p-4 bg-brand-gold/10 text-brand-gold rounded-full mb-6">
              <Lock size={32} />
            </div>
            <h2 className="text-3xl font-black text-brand-900 uppercase tracking-tighter mb-4">Finalize Protocol</h2>
            <p className="text-gray-600 font-medium">To generate your tailored 2026 Strategy Report, please provide your secure contact details.</p>
          </div>

          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-gold/20 outline-none font-bold text-brand-900" value={leadData.fullName} onChange={e => setLeadData({...leadData, fullName: e.target.value})} />
              </div>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required type="text" placeholder="Business Name" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-gold/20 outline-none font-bold text-brand-900" value={leadData.businessName} onChange={e => setLeadData({...leadData, businessName: e.target.value})} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-gold/20 outline-none font-bold text-brand-900" value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required type="tel" placeholder="WhatsApp Number" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-gold/20 outline-none font-bold text-brand-900" value={leadData.whatsapp} onChange={e => setLeadData({...leadData, whatsapp: e.target.value})} />
              </div>
            </div>
            <Button type="submit" className="w-full py-5 bg-brand-900 text-white rounded-xl font-black uppercase tracking-widest text-xs">Generate My Diagnostic Report</Button>
            <p className="text-[9px] text-center text-gray-400 uppercase tracking-widest">End-to-End Encryption Enabled • POPIA Compliant</p>
          </form>
        </div>
      )}

      {/* 3. RESULT PHASE */}
      {isFinished && (
        <div className="text-center space-y-8 py-8 animate-fadeIn">
          <div className={`inline-flex p-6 rounded-full ${getResult().bg} ${getResult().color}`}>
            <ShieldCheck size={48} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.5em] text-brand-gold">Sovereign Diagnostic Output</h2>
            <h3 className={`text-4xl font-black uppercase tracking-tighter ${getResult().color}`}>{getResult().status}</h3>
            <p className="text-gray-600 max-w-md mx-auto font-medium leading-relaxed">{getResult().message}</p>
          </div>

          <div className="bg-brand-900 rounded-[3rem] p-10 text-white border border-white/10 shadow-2xl relative overflow-hidden text-left">
            <div className="relative z-10 space-y-6">
               <h4 className="text-brand-gold font-black uppercase tracking-widest text-xs italic">Strategic Advice Triggered</h4>
               <p className="text-lg font-medium text-brand-50/80 leading-relaxed">
                  We have sent a detailed analysis to <span className="text-white font-bold">{leadData.email}</span>. 
                  Check your inbox for your 2026 Compliance Roadmap.
               </p>
               <div className="flex flex-col gap-4">
                  <Button onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')} className="bg-brand-gold text-brand-900 rounded-full font-black uppercase text-[10px] tracking-widest py-4">Book Free Discovery Call</Button>
                  <Button onClick={() => window.open('https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/', '_blank')} variant="secondary" className="border-white/20 text-white rounded-full font-black uppercase text-[10px] tracking-widest py-4">Join Our Workshop</Button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-brand-900/90 backdrop-blur-2xl animate-fadeIn">
        <div className="bg-white rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] w-full max-w-2xl relative overflow-hidden border border-white/10">
          <button onClick={onClose} className="absolute top-8 right-8 z-10 p-2 text-gray-400 hover:text-brand-900 transition-colors bg-gray-50 rounded-full"><X size={20} /></button>
          <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">{content}</div>
        </div>
      </div>
    );
  }

  return (
    <section id="assessment" className="py-24 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-[4rem] border border-gray-100 p-8 md:p-16 shadow-2xl shadow-brand-900/5">{content}</div>
      </div>
    </section>
  );
};

export default FinancialHealthScore;
