import React, { useState } from 'react';
import { CheckCircle2, TrendingUp, Shield, Activity, X, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FinancialHealthScoreProps {
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const QUESTIONS = [
  { category: "Financial Hygiene", question: "Do you have separate bank accounts for business and personal use?", options: [{ text: "Yes, strictly separated", score: 4 }, { text: "Mostly, but sometimes I mix", score: 2 }, { text: "No, everything goes into one", score: 0 }] },
  { category: "Financial Hygiene", question: "How often do you review your management accounts?", options: [{ text: "Monthly with a professional", score: 4 }, { text: "Quarterly or when I remember", score: 2 }, { text: "Only at year-end for tax", score: 0 }] },
  { category: "Compliance Protocol", question: "Are your tax returns (SARS/VAT/PAYE) fully up to date?", options: [{ text: "Yes, 100% compliant", score: 4 }, { text: "I think so, but unsure", score: 2 }, { text: "No, I have a backlog", score: 0 }] },
  { category: "Strategic Architecture", question: "If you stopped working today, would revenue continue for 3 months?", options: [{ text: "Yes, systems run without me", score: 4 }, { text: "Maybe for a few weeks", score: 2 }, { text: "No, income stops immediately", score: 0 }] },
  { category: "Founder Resilience", question: "How would you rate your financial anxiety level?", options: [{ text: "Low. I have total clarity.", score: 4 }, { text: "Moderate. Cash flow keeps me up sometimes.", score: 2 }, { text: "High. I dread looking at the bank account.", score: 0 }] }
];

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isModal = false, isOpen = true, onClose }) => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [detailedAnswers, setDetailedAnswers] = useState<{q: string, a: string}[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState({ name: '', enterprise: '', email: '' });

  if (isModal && !isOpen) return null;

  const handleAnswer = (answerText: string, points: number) => {
    setDetailedAnswers([...detailedAnswers, { q: QUESTIONS[currentStep].question, a: answerText }]);
    const newScore = score + points;
    if (currentStep < QUESTIONS.length - 1) {
      setScore(newScore);
      setCurrentStep(currentStep + 1);
    } else {
      setScore(newScore);
      setShowForm(true);
    }
  };

  const getResult = () => {
    if (score >= 15) return { persona: "VISIONARY ARCHITECT", color: "text-emerald-600", msg: "Legacy Engineering: Optimized for scale." };
    if (score >= 8) return { persona: "THE INTEGRATOR", color: "text-brand-gold", msg: "Bridge Building: Moving away from dependency." };
    return { persona: "DAILY LABORER", color: "text-rose-600", msg: "Critical Triage: Business is currently a job, not an asset." };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = getResult();
    try {
      if (db) {
        await addDoc(collection(db, 'assessments'), { ...formData, score, persona: res.persona, intelligence_report: detailedAnswers, timestamp: serverTimestamp() });
        await addDoc(collection(db, 'mail'), {
          to: formData.email,
          message: {
            subject: `REPORT: ${formData.enterprise} Assessment`,
            html: `<h1>Assessment Complete</h1><p>Archetype: ${res.persona}</p><p>Book a call to fix your score.</p>`
          }
        });
      }
      setShowForm(false);
      setShowResult(true);
    } catch (err) { console.error(err); }
    setIsSubmitting(false);
  };

  const result = getResult();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/95 backdrop-blur-xl font-sans text-left animate-fadeIn">
      <div className="bg-white rounded-[3rem] p-1 w-full max-w-4xl max-h-[90vh] overflow-hidden relative shadow-2xl">
        <div className="bg-white rounded-[2.8rem] h-full overflow-y-auto p-8 md:p-16 relative">
          <button onClick={onClose} className="absolute top-8 right-8 text-brand-900/40 hover:text-brand-900"><X size={32}/></button>

          {!started ? (
            <div className="text-center py-12 space-y-8">
              <div className="w-20 h-20 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mx-auto shadow-xl"><Sparkles size={40}/></div>
              <h2 className="text-4xl md:text-6xl font-sora font-black text-brand-900 uppercase tracking-tighter">Financial <br/><span className="text-brand-gold italic">Vitals Check.</span></h2>
              <button onClick={() => setStarted(true)} className="rounded-full px-12 py-5 text-lg bg-brand-gold text-brand-900 font-black uppercase shadow-2xl hover:scale-105 transition-all mx-auto block">Start Audit</button>
            </div>
          ) : !showForm && !showResult ? (
            <div className="space-y-12">
               <div className="border-b border-brand-900/10 pb-6"><p className="text-brand-gold text-[10px] font-black uppercase mb-2">Diagnostic 0{currentStep+1}</p><h3 className="text-xl font-black text-brand-900 uppercase">{QUESTIONS[currentStep].category}</h3></div>
               <h2 className="text-2xl md:text-3xl font-bold text-brand-900">{QUESTIONS[currentStep].question}</h2>
               <div className="grid gap-4">
                  {QUESTIONS[currentStep].options.map((opt, i) => (
                    <button key={i} onClick={() => handleAnswer(opt.text, opt.score)} className="group p-6 text-left rounded-2xl border-2 border-brand-900/5 hover:border-brand-gold bg-brand-50/30 hover:bg-white transition-all flex justify-between items-center font-bold text-brand-900">
                       <span>{opt.text}</span>
                       <ArrowRight size={20} className="text-brand-900/20 group-hover:text-brand-gold"/>
                    </button>
                  ))}
               </div>
            </div>
          ) : showForm ? (
            <div className="max-w-md mx-auto py-10 space-y-8 text-center">
               <h3 className="text-3xl font-black text-brand-900 uppercase">Audit Complete</h3>
               <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input required className="w-full bg-brand-50 border-2 rounded-xl px-6 py-4 font-bold text-brand-900 outline-none focus:border-brand-gold" placeholder="FULL NAME" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input required className="w-full bg-brand-50 border-2 rounded-xl px-6 py-4 font-bold text-brand-900 outline-none focus:border-brand-gold" placeholder="ENTERPRISE" value={formData.enterprise} onChange={(e) => setFormData({...formData, enterprise: e.target.value})} />
                  <input required type="email" className="w-full bg-brand-50 border-2 rounded-xl px-6 py-4 font-bold text-brand-900 outline-none focus:border-brand-gold" placeholder="SECURE EMAIL" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-full bg-brand-900 text-white font-black uppercase tracking-widest transition-all hover:bg-brand-gold hover:text-brand-900 shadow-xl">{isSubmitting ? <Loader2 className="animate-spin mx-auto"/> : 'REVEAL ARCHETYPE'}</button>
               </form>
            </div>
          ) : (
            <div className="text-center space-y-10 py-6">
               <div className="mx-auto w-24 h-24 rounded-[2rem] flex items-center justify-center bg-brand-50 text-brand-gold shadow-inner"><Activity size={40}/></div>
               <h2 className={`text-4xl md:text-6xl font-black uppercase ${result.color}`}>{result.persona}</h2>
               <p className="text-xl italic font-medium leading-relaxed max-w-xl mx-auto">"{result.msg}"</p>
               <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="rounded-full px-12 py-5 bg-brand-gold text-brand-900 font-black uppercase shadow-2xl transition-all hover:bg-brand-900 hover:text-white">Book Discovery Call</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
