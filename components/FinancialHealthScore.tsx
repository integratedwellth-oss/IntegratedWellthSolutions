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
  { category: "Financial Hygiene", question: "Do you have a documented budget for the next 12 months?", options: [{ text: "Yes, detailed and tracked", score: 4 }, { text: "Rough estimates in my head", score: 2 }, { text: "No, I operate day-to-day", score: 0 }] },
  { category: "Compliance Protocol", question: "Are your tax returns (SARS/VAT/PAYE) fully up to date?", options: [{ text: "Yes, 100% compliant", score: 4 }, { text: "I think so, but unsure", score: 2 }, { text: "No, I have a backlog", score: 0 }] },
  { category: "Compliance Protocol", question: "Is your CIPC Annual Return current?", options: [{ text: "Yes, filed on time", score: 4 }, { text: "I don't know", score: 1 }, { text: "No, might be deregistered", score: 0 }] },
  { category: "Strategic Architecture", question: "Does your business operate under a Holding Company or Trust structure?", options: [{ text: "Yes, fully structured for protection", score: 4 }, { text: "Planning to, but not yet", score: 2 }, { text: "No, just a standard PTY/Sole Prop", score: 0 }] },
  { category: "Strategic Architecture", question: "If you stopped working today, would revenue continue for 3 months?", options: [{ text: "Yes, systems run without me", score: 4 }, { text: "Maybe for a few weeks", score: 2 }, { text: "No, income stops immediately", score: 0 }] },
  { category: "Founder Resilience", question: "How would you rate your financial anxiety level?", options: [{ text: "Low. I have total clarity.", score: 4 }, { text: "Moderate. Cash flow keeps me up sometimes.", score: 2 }, { text: "High. I dread looking at the bank account.", score: 0 }] },
  { category: "Founder Resilience", question: "Do you have a dedicated partner/CFO to discuss strategy with?", options: [{ text: "Yes, I have a strategic advisor", score: 4 }, { text: "I have an accountant, but they just do tax", score: 2 }, { text: "No, I am on this journey alone", score: 0 }] }
];

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isModal = false, isOpen = true, onClose }) => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  // NEW: Track specific answers
  const [answers, setAnswers] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState({ name: '', enterprise: '', email: '' });

  if (isModal && !isOpen) return null;

  const handleAnswer = (text: string, points: number) => {
    setAnswers([...answers, text]);
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
    if (score >= 28) return { persona: "VISIONARY ARCHITECT", color: "text-emerald-600", bg: "bg-emerald-50", icon: <TrendingUp />, msg: "Legacy Engineering: Optimized for scale." };
    if (score >= 15) return { persona: "THE INTEGRATOR", color: "text-brand-gold", bg: "bg-yellow-50", icon: <Activity />, msg: "Bridge Building: Moving away from dependency." };
    return { persona: "DAILY LABORER", color: "text-rose-600", bg: "bg-rose-50", icon: <Shield />, msg: "Critical Triage: Business is currently a job, not an asset." };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = getResult();

    // Create a readable summary for email/dashboard
    const discoverySummary = QUESTIONS.map((q, i) => `${q.question}: ${answers[i]}`).join('<br/>');

    try {
      if (db) {
        await addDoc(collection(db, 'assessments'), {
          ...formData,
          score,
          persona: res.persona,
          raw_answers: discoverySummary, // SAVED FOR DASHBOARD
          timestamp: serverTimestamp()
        });

        await addDoc(collection(db, 'mail'), {
          to: formData.email,
          message: {
            subject: `REPORT: ${formData.enterprise} Assessment Results`,
            html: `
              <div style="font-family: sans-serif; color: #134e4a;">
                <h1>Assessment Complete</h1>
                <p>Hello ${formData.name},</p>
                <div style="background: #f0fdfa; padding: 20px; border-left: 5px solid #d4af37;">
                  <h3>ARCHETYPE: ${res.persona}</h3>
                  <p>${res.msg}</p>
                </div>
                <h3>Your Pain Point Analysis:</h3>
                <p>${discoverySummary}</p>
                <p style="text-align: center; margin: 30px 0;">
                  <a href="https://calendly.com/enquiries-integratedwellth/30min" style="background-color: #134e4a; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px;">BOOK YOUR DISCOVERY CALL</a>
                </p>
                <hr/>
                <h3>🎟️ SUMMIT INVITE</h3>
                <p>Join us Feb 28, 2026. <a href="https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/">Secure Seat</a></p>
              </div>
            `
          }
        });
      }
      setShowForm(false);
      setShowResult(true);
    } catch (err) { alert("Error ulinking. Try again."); }
    setIsSubmitting(false);
  };

  const result = getResult();

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/95 backdrop-blur-xl animate-fadeIn`}>
      <div className="bg-white rounded-[3rem] p-1 md:p-1.5 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
        <div className="bg-white rounded-[2.8rem] h-full overflow-y-auto p-8 md:p-16 relative">
          <button onClick={onClose} className="absolute top-8 right-8 text-brand-900/40 hover:text-brand-900"><X size={32} /></button>

          {!started ? (
            <div className="text-center space-y-10 py-12">
              <div className="w-24 h-24 bg-brand-900 text-brand-gold rounded-full flex items-center justify-center mx-auto shadow-xl"><Sparkles size={40} /></div>
              <h2 className="text-4xl md:text-6xl font-sora font-black text-brand-900">FINANCIAL <br/><span className="text-brand-gold italic">VITALS CHECK.</span></h2>
              <p className="text-xl text-brand-900/60 font-medium">9 Questions. Discover if you are building an Asset or a Trap.</p>
              <button onClick={() => setStarted(true)} className="rounded-full px-16 py-6 text-xl bg-brand-gold text-brand-900 font-black uppercase shadow-2xl">Start Assessment</button>
            </div>
          ) : !showForm && !showResult ? (
            <div className="space-y-12">
               <div className="flex justify-between items-end border-b pb-6">
                 <div>
                    <p className="text-brand-gold text-[10px] font-black uppercase tracking-widest mb-2">Q0{currentStep+1}</p>
                    <h3 className="text-2xl font-black text-brand-900">{QUESTIONS[currentStep].category}</h3>
                 </div>
                 <div className="flex gap-1">
                    {QUESTIONS.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i <= currentStep ? 'bg-brand-900' : 'bg-brand-900/10'}`}></div>)}
                 </div>
               </div>
               <h2 className="text-3xl font-bold text-brand-900">{QUESTIONS[currentStep].question}</h2>
               <div className="grid gap-4">
                  {QUESTIONS[currentStep].options.map((opt, i) => (
                    <button key={i} onClick={() => handleAnswer(opt.text, opt.score)} className="group p-6 text-left rounded-2xl border-2 border-brand-900/5 hover:border-brand-gold transition-all flex justify-between items-center bg-brand-50/50">
                       <span className="text-lg font-bold">{opt.text}</span>
                       <ArrowRight className="text-brand-900/20 group-hover:text-brand-gold" />
                    </button>
                  ))}
               </div>
            </div>
          ) : showForm ? (
            <div className="max-w-md mx-auto text-center space-y-8">
               <h3 className="text-3xl font-black text-brand-900 uppercase">CALCULATION COMPLETE.</h3>
               <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                  <input required className="w-full bg-brand-50 border-2 rounded-2xl px-6 py-4 font-bold" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input required className="w-full bg-brand-50 border-2 rounded-2xl px-6 py-4 font-bold" placeholder="Business Name" value={formData.enterprise} onChange={(e) => setFormData({...formData, enterprise: e.target.value})} />
                  <input required type="email" className="w-full bg-brand-50 border-2 rounded-2xl px-6 py-4 font-bold" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <button type="submit" disabled={isSubmitting} className="w-full py-6 rounded-full bg-brand-900 text-white font-black uppercase tracking-widest">{isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : 'REVEAL SCORE'}</button>
               </form>
            </div>
          ) : (
            <div className="text-center space-y-10">
               <div className="mx-auto w-24 h-24 rounded-[2rem] flex items-center justify-center bg-brand-50 shadow-xl">{result.icon}</div>
               <h2 className={`text-4xl md:text-6xl font-black uppercase ${result.color}`}>{result.persona}</h2>
               <p className="text-xl italic font-medium">"{result.msg}"</p>
               <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="rounded-full px-12 py-5 bg-brand-gold text-brand-900 font-black uppercase shadow-2xl">Book Strategy Review</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
