import React, { useState } from 'react';
import { CheckCircle2, TrendingUp, Shield, Activity, X, ArrowRight, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FinancialHealthScoreProps {
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const QUESTIONS = [
  // SECTION 1: FINANCIAL HYGIENE
  { category: "Financial Hygiene", question: "Do you have separate bank accounts for business and personal use?", options: [{ text: "Yes, strictly separated", score: 4 }, { text: "Mostly, but sometimes I mix", score: 2 }, { text: "No, everything goes into one", score: 0 }] },
  { category: "Financial Hygiene", question: "How often do you review your management accounts?", options: [{ text: "Monthly with a professional", score: 4 }, { text: "Quarterly or when I remember", score: 2 }, { text: "Only at year-end for tax", score: 0 }] },
  { category: "Financial Hygiene", question: "Do you have a documented budget for the next 12 months?", options: [{ text: "Yes, detailed and tracked", score: 4 }, { text: "Rough estimates in my head", score: 2 }, { text: "No, I operate day-to-day", score: 0 }] },
  // SECTION 2: COMPLIANCE & RISK
  { category: "Compliance Protocol", question: "Are your tax returns (SARS/VAT/PAYE) fully up to date?", options: [{ text: "Yes, 100% compliant", score: 4 }, { text: "I think so, but unsure", score: 2 }, { text: "No, I have a backlog", score: 0 }] },
  { category: "Compliance Protocol", question: "Is your CIPC Annual Return current?", options: [{ text: "Yes, filed on time", score: 4 }, { text: "I don't know", score: 1 }, { text: "No, might be deregistered", score: 0 }] },
  // SECTION 3: STRATEGY & WEALTH
  { category: "Strategic Architecture", question: "Does your business operate under a Holding Company or Trust structure?", options: [{ text: "Yes, fully structured for protection", score: 4 }, { text: "Planning to, but not yet", score: 2 }, { text: "No, just a standard PTY/Sole Prop", score: 0 }] },
  { category: "Strategic Architecture", question: "If you stopped working today, would revenue continue for 3 months?", options: [{ text: "Yes, systems run without me", score: 4 }, { text: "Maybe for a few weeks", score: 2 }, { text: "No, income stops immediately", score: 0 }] },
  // SECTION 4: PSYCHOLOGY (EQ)
  { category: "Founder Resilience", question: "How would you rate your financial anxiety level?", options: [{ text: "Low. I have total clarity.", score: 4 }, { text: "Moderate. Cash flow keeps me up sometimes.", score: 2 }, { text: "High. I dread looking at the bank account.", score: 0 }] },
  { category: "Founder Resilience", question: "Do you have a dedicated partner/CFO to discuss strategy with?", options: [{ text: "Yes, I have a strategic advisor", score: 4 }, { text: "I have an accountant, but they just do tax", score: 2 }, { text: "No, I am on this journey alone", score: 0 }] }
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
    const newAnswers = [...detailedAnswers, { q: QUESTIONS[currentStep].question, a: answerText }];
    setDetailedAnswers(newAnswers);
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
    // Max Score is 36
    if (score >= 28) return { persona: "VISIONARY ARCHITECT", color: "text-emerald-600", bg: "bg-emerald-50", icon: <TrendingUp />, msg: "Legacy Engineering: Optimized for scale. Your structure is ready to support multi-generational wealth." };
    if (score >= 15) return { persona: "THE INTEGRATOR", color: "text-brand-gold", bg: "bg-yellow-50", icon: <Activity />, msg: "Bridge Building: You're moving away from founder-dependency. Now is the time to deploy AI to fully decouple." };
    return { persona: "DAILY LABORER", color: "text-rose-600", bg: "bg-rose-50", icon: <Shield />, msg: "Critical Triage: Your business is currently a high-stress job, not an asset. We need an immediate 'Clean Sweep' intervention." };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = getResult();

    try {
      if (db) {
        await addDoc(collection(db, 'assessments'), {
          ...formData,
          score,
          persona: res.persona,
          intelligence_report: detailedAnswers,
          timestamp: serverTimestamp()
        });

        const emailBody = detailedAnswers.map(item => `<b>${item.q}</b><br/>${item.a}<br/><br/>`).join('');
        
        await addDoc(collection(db, 'mail'), {
          to: formData.email,
          message: {
            subject: `REPORT: ${formData.enterprise} Assessment Results`,
            html: `
              <div style="font-family: Arial, sans-serif; color: #134e4a; max-width: 600px;">
                <h1 style="color: #d4af37;">ASSESSMENT COMPLETE</h1>
                <p>Hello ${formData.name},</p>
                <div style="background: #f0fdfa; padding: 20px; border-left: 5px solid #d4af37; margin-bottom: 20px;">
                  <h3>ARCHETYPE: ${res.persona}</h3>
                  <p>${res.msg}</p>
                </div>
                <h2>Your Discovery Trail</h2>
                <div style="color: #64748b; font-size: 14px;">${emailBody}</div>
                <div style="text-align: center; margin-top: 40px;">
                  <a href="https://calendly.com/enquiries-integratedwellth/30min" style="background-color: #134e4a; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 50px;">BOOK YOUR FREE CONSULTATION</a>
                </div>
                <hr style="margin: 40px 0; border: 0; border-top: 1px solid #eee;"/>
                <p>Join us for the <b>Financial Clarity Summit</b> on Feb 28, 2026. <a href="https://www.integratedwellth.co.za/#summit">Book Your Seat Here</a></p>
              </div>
            `
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/95 backdrop-blur-xl animate-fadeIn font-sans">
      <div className="bg-white rounded-[3rem] p-1 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
        <div className="bg-white rounded-[2.8rem] h-full overflow-y-auto p-8 md:p-16 relative">
          <button onClick={onClose} className="absolute top-8 right-8 text-brand-900/40 hover:text-brand-900"><X size={32} /></button>

          {!started ? (
            <div className="text-center space-y-8 py-12">
              <div className="w-20 h-20 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mx-auto shadow-xl"><Sparkles size={40} /></div>
              <h2 className="text-4xl md:text-6xl font-sora font-black text-brand-900 uppercase leading-none tracking-tighter">Financial <br/><span className="text-brand-gold italic">Vitals Check.</span></h2>
              <p className="text-lg text-brand-900/60 max-w-lg mx-auto font-medium leading-relaxed">Discover if your entity is built for Sovereignty or if you are trapped in a high-stress job.</p>
              <button onClick={() => setStarted(true)} className="rounded-full px-12 py-5 text-lg bg-brand-gold text-brand-900 font-black uppercase shadow-2xl hover:scale-105 transition-all mx-auto block">Start Audit</button>
            </div>
          ) : !showForm && !showResult ? (
            <div className="space-y-12 animate-fadeIn">
               <div className="flex justify-between items-end border-b border-brand-900/10 pb-6">
                  <div>
                    <p className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-2">Diagnostic 0{currentStep+1}</p>
                    <h3 className="text-xl font-black text-brand-900 uppercase">{QUESTIONS[currentStep].category}</h3>
                  </div>
                  <div className="flex gap-1.5">{QUESTIONS.map((_, i) => <div key={i} className={`w-3 h-1 rounded-full ${i <= currentStep ? 'bg-brand-900' : 'bg-brand-900/10'}`}></div>)}</div>
               </div>
               <h2 className="text-2xl md:text-3xl font-bold text-brand-900 leading-tight">{QUESTIONS[currentStep].question}</h2>
               <div className="grid gap-4">
                  {QUESTIONS[currentStep].options.map((opt, i) => (
                    <button key={i} onClick={() => handleAnswer(opt.text, opt.score)} className="group p-6 text-left rounded-2xl border-2 border-brand-900/5 hover:border-brand-gold bg-brand-50/30 hover:bg-white transition-all flex justify-between items-center">
                       <span className="text-base font-bold text-brand-900">{opt.text}</span>
                       <ArrowRight className="text-brand-900/20 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" size={20}/>
                    </button>
                  ))}
               </div>
            </div>
          ) : showForm ? (
            <div className="max-w-md mx-auto text-center space-y-8 py-10 animate-fadeIn">
               <h3 className="text-3xl font-black text-brand-900 uppercase tracking-tighter">Audit Complete.</h3>
               <p className="text-brand-900/60 font-medium leading-relaxed">Uplink your credentials to unlock your professional archetype and recovery brief.</p>
               <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                  <input required className="w-full bg-brand-50 border-2 border-brand-900/5 rounded-xl px-6 py-4 font-bold text-brand-900 outline-none focus:border-brand-gold" placeholder="FULL NAME" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input required className="w-full bg-brand-50 border-2 border-brand-900/5 rounded-xl px-6 py-4 font-bold text-brand-900 outline-none focus:border-brand-gold" placeholder="ENTERPRISE NAME" value={formData.enterprise} onChange={(e) => setFormData({...formData, enterprise: e.target.value})} />
                  <input required type="email" className="w-full bg-brand-50 border-2 border-brand-900/5 rounded-xl px-6 py-4 font-bold text-brand-900 outline-none focus:border-brand-gold" placeholder="SECURE EMAIL" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-full bg-brand-900 text-white font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-900 transition-all shadow-xl">
                    {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : 'REVEAL ARCHETYPE'}
                  </button>
               </form>
            </div>
          ) : (
            <div className="text-center space-y-10 py-6 animate-fadeIn">
               <div className="mx-auto w-24 h-24 rounded-[2rem] flex items-center justify-center bg-brand-50 border border-brand-gold shadow-inner text-brand-gold">
                  <Activity size={40}/>
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-900/40 mb-2">Archetype Identified</p>
                  <h2 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter ${result.color}`}>{result.persona}</h2>
               </div>
               <p className="text-xl text-brand-900/80 font-medium italic max-w-xl mx-auto leading-relaxed">"{result.msg}"</p>
               <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="rounded-full px-12 py-5 bg-brand-gold text-brand-900 font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all shadow-2xl">Book Discovery Call</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
