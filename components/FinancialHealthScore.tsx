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
  // SECTION 1: FINANCIAL HYGIENE
  {
    category: "Financial Hygiene",
    question: "Do you have separate bank accounts for business and personal use?",
    options: [
      { text: "Yes, strictly separated", score: 4 },
      { text: "Mostly, but sometimes I mix", score: 2 },
      { text: "No, everything goes into one", score: 0 }
    ]
  },
  {
    category: "Financial Hygiene",
    question: "How often do you review your management accounts?",
    options: [
      { text: "Monthly with a professional", score: 4 },
      { text: "Quarterly or when I remember", score: 2 },
      { text: "Only at year-end for tax", score: 0 }
    ]
  },
  {
    category: "Financial Hygiene",
    question: "Do you have a documented budget for the next 12 months?",
    options: [
      { text: "Yes, detailed and tracked", score: 4 },
      { text: "Rough estimates in my head", score: 2 },
      { text: "No, I operate day-to-day", score: 0 }
    ]
  },

  // SECTION 2: COMPLIANCE & RISK
  {
    category: "Compliance Protocol",
    question: "Are your tax returns (SARS/VAT/PAYE) fully up to date?",
    options: [
      { text: "Yes, 100% compliant", score: 4 },
      { text: "I think so, but unsure", score: 2 },
      { text: "No, I have a backlog", score: 0 }
    ]
  },
  {
    category: "Compliance Protocol",
    question: "Is your CIPC Annual Return current?",
    options: [
      { text: "Yes, filed on time", score: 4 },
      { text: "I don't know", score: 1 },
      { text: "No, might be deregistered", score: 0 }
    ]
  },

  // SECTION 3: STRATEGY & WEALTH
  {
    category: "Strategic Architecture",
    question: "Does your business operate under a Holding Company or Trust structure?",
    options: [
      { text: "Yes, fully structured for protection", score: 4 },
      { text: "Planning to, but not yet", score: 2 },
      { text: "No, just a standard PTY/Sole Prop", score: 0 }
    ]
  },
  {
    category: "Strategic Architecture",
    question: "If you stopped working today, would revenue continue for 3 months?",
    options: [
      { text: "Yes, systems run without me", score: 4 },
      { text: "Maybe for a few weeks", score: 2 },
      { text: "No, income stops immediately", score: 0 }
    ]
  },

  // SECTION 4: PSYCHOLOGY (EQ)
  {
    category: "Founder Resilience",
    question: "How would you rate your financial anxiety level?",
    options: [
      { text: "Low. I have total clarity.", score: 4 },
      { text: "Moderate. Cash flow keeps me up sometimes.", score: 2 },
      { text: "High. I dread looking at the bank account.", score: 0 }
    ]
  },
  {
    category: "Founder Resilience",
    question: "Do you have a dedicated partner/CFO to discuss strategy with?",
    options: [
      { text: "Yes, I have a strategic advisor", score: 4 },
      { text: "I have an accountant, but they just do tax", score: 2 },
      { text: "No, I am on this journey alone", score: 0 }
    ]
  }
];

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isModal = false, isOpen = true, onClose }) => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState({ name: '', enterprise: '', email: '' });

  if (isModal && !isOpen) return null;

  const handleAnswer = (points: number) => {
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
    if (score >= 28) return {
      persona: "VISIONARY ARCHITECT",
      title: "SOVEREIGN",
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-200",
      icon: <TrendingUp className="w-12 h-12 text-emerald-600" />,
      msg: "Legacy Engineering: Optimized for scale. Your structure is ready to support multi-generational wealth."
    };
    if (score >= 15) return {
      persona: "THE INTEGRATOR",
      title: "TRANSITIONING",
      color: "text-brand-gold",
      bg: "bg-yellow-50 border-yellow-200",
      icon: <Activity className="w-12 h-12 text-brand-gold" />,
      msg: "Bridge Building: You're moving away from founder-dependency. Now is the time to deploy AI to fully decouple."
    };
    return {
      persona: "DAILY LABORER",
      title: "AT RISK",
      color: "text-rose-600",
      bg: "bg-rose-50 border-rose-200",
      icon: <Shield className="w-12 h-12 text-rose-600" />,
      msg: "Critical Triage: Your business is currently a high-stress job, not an asset. We need an immediate 'Clean Sweep' intervention."
    };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = getResult();

    try {
      if (db) {
        // 1. Save Lead to 'assessments' collection
        await addDoc(collection(db, 'assessments'), {
          ...formData,
          score: score,
          maxScore: QUESTIONS.length * 4,
          persona: result.persona,
          diagnosis: result.msg,
          timestamp: serverTimestamp()
        });

        // 2. Trigger Email via 'mail' collection
        await addDoc(collection(db, 'mail'), {
          to: formData.email,
          message: {
            subject: `Your Financial Health Score: ${result.persona}`,
            html: `
              <div style="font-family: Arial, sans-serif; color: #134e4a; padding: 20px;">
                <h1 style="color: #d4af37;">ASSESSMENT COMPLETE</h1>
                <p>Hello ${formData.name},</p>
                
                <div style="background: #f0fdfa; padding: 20px; border-left: 5px solid #d4af37; margin: 20px 0;">
                  <h3 style="margin-top:0;">ARCHETYPE: ${result.persona}</h3>
                  <p><strong>Score:</strong> ${score} / ${QUESTIONS.length * 4}</p>
                  <p><strong>Diagnosis:</strong> ${result.msg}</p>
                </div>
                
                <p>To fix this score and move to Sovereign status, we need to implement the Protocol.</p>
                
                <p style="text-align: center; margin: 30px 0;">
                  <a href="https://calendly.com/enquiries-integratedwellth/30min" style="background-color: #134e4a; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; font-size: 16px;">BOOK YOUR RESULTS REVIEW</a>
                </p>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />

                <h3>🎟️ EXCLUSIVE SUMMIT INVITATION</h3>
                <p>This diagnosis is just the start. Join Marcia Kgaphola at the <strong>Financial Clarity Summit</strong> on Feb 28, 2026.</p>
                <p><a href="https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/" style="color: #d4af37; font-weight: bold;">Secure Your Seat Here</a></p>
              </div>
            `
          }
        });
      }
      setIsSubmitting(false);
      setShowForm(false);
      setShowResult(true);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert("Connection error. Please try again.");
    }
  };

  const result = getResult();

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/95 backdrop-blur-xl animate-fadeIn`}>
      <div className="bg-white rounded-[3rem] p-1 md:p-1.5 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
        
        <div className="bg-white rounded-[2.8rem] h-full overflow-y-auto p-8 md:p-16 relative">
          <button onClick={onClose} className="absolute top-8 right-8 text-brand-900/40 hover:text-brand-900 transition-colors">
            <X size={32} />
          </button>

          {!started ? (
            <div className="text-center space-y-10 py-12">
              <div className="w-24 h-24 bg-brand-900 text-brand-gold rounded-full flex items-center justify-center mx-auto shadow-xl">
                <Sparkles size={40} />
              </div>
              <h2 className="text-4xl md:text-6xl font-sora font-black text-brand-900 tracking-tighter leading-[0.9]">
                FINANCIAL <br/> <span className="text-brand-gold italic">VITALS CHECK.</span>
              </h2>
              <p className="text-xl text-brand-900/60 max-w-xl mx-auto font-medium">
                9 Questions. 3 Minutes. <br/>Discover if you are building an Asset or a Trap.
              </p>
              <button 
                onClick={() => setStarted(true)} 
                className="rounded-full px-16 py-6 text-xl bg-brand-gold text-brand-900 font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
              >
                Start Assessment
              </button>
            </div>
          ) : !showForm && !showResult ? (
            <div className="space-y-12">
              <div className="flex justify-between items-end border-b border-brand-900/10 pb-6">
                <div>
                  <p className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-2">Question 0{currentStep + 1}</p>
                  <h3 className="text-2xl font-sora font-black text-brand-900 uppercase tracking-tighter">{QUESTIONS[currentStep].category}</h3>
                </div>
                <div className="flex gap-2">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-brand-900' : 'bg-brand-900/10'}`}></div>
                  ))}
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-brand-900 leading-tight">
                {QUESTIONS[currentStep].question}
              </h2>

              <div className="grid gap-4">
                {QUESTIONS[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.score)}
                    className="group p-6 text-left rounded-2xl border-2 border-brand-900/5 hover:border-brand-gold bg-brand-50/50 hover:bg-white transition-all flex justify-between items-center"
                  >
                    <span className="text-lg font-bold text-brand-900 group-hover:text-brand-gold transition-colors">{opt.text}</span>
                    <ArrowRight size={20} className="text-brand-900/20 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : showForm ? (
            <div className="max-w-md mx-auto py-8 text-center space-y-8">
               <div className="w-20 h-20 bg-brand-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Activity size={32} />
               </div>
               <h3 className="text-3xl font-black text-brand-900 uppercase tracking-tighter">CALCULATION COMPLETE.</h3>
               <p className="text-brand-900/60 font-medium">Enter your details to unlock your Strategic Persona.</p>
               
               <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                  <input required className="w-full bg-brand-50 border-2 border-brand-900/10 rounded-2xl px-6 py-4 text-brand-900 font-bold focus:border-brand-gold outline-none" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input required className="w-full bg-brand-50 border-2 border-brand-900/10 rounded-2xl px-6 py-4 text-brand-900 font-bold focus:border-brand-gold outline-none" placeholder="Business Name" value={formData.enterprise} onChange={(e) => setFormData({...formData, enterprise: e.target.value})} />
                  <input required type="email" className="w-full bg-brand-50 border-2 border-brand-900/10 rounded-2xl px-6 py-4 text-brand-900 font-bold focus:border-brand-gold outline-none" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  
                  <button type="submit" disabled={isSubmitting} className="w-full py-6 rounded-full text-base bg-brand-900 text-white font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'REVEAL SCORE'}
                  </button>
               </form>
            </div>
          ) : (
            <div className="text-center space-y-10 py-4">
               <div className={`mx-auto w-24 h-24 rounded-[2rem] flex items-center justify-center ${result.bg} shadow-xl`}>
                  {result.icon}
               </div>
               <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-900/40">Your Archetype</p>
                  <h2 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter ${result.color}`}>{result.persona}</h2>
               </div>
               <p className="text-xl text-brand-900 font-medium leading-relaxed max-w-2xl mx-auto italic">
                  "{result.msg}"
               </p>
               <div className="pt-8">
                  <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="rounded-full px-12 py-5 bg-brand-gold text-brand-900 font-black uppercase tracking-widest hover:bg-brand-900 hover:text-white transition-all shadow-2xl">
                     Book Strategy Review
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
