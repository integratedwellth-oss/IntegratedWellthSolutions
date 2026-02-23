import React, { useState, useEffect } from 'react';
import { Shield, Activity, X, ArrowRight, Sparkles, Loader2, TrendingUp, Lock } from 'lucide-react';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

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
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [detailedAnswers, setDetailedAnswers] = useState<{q: string, a: string}[]>([]);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', enterprise: '' });

  // Listen for user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Reset quiz when opened
  useEffect(() => {
     if (isOpen) {
        setStarted(false);
        setCurrentStep(0);
        setScore(0);
        setDetailedAnswers([]);
        setShowProfileForm(false);
     }
  }, [isOpen]);

  if (isModal && !isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsAuthLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setStarted(true); // Auto-start quiz after login
    } catch (err) {
      alert("Authentication failed.");
    }
    setIsAuthLoading(false);
  };

  const handleAnswer = (answerText: string, points: number) => {
    const newAnswers = [...detailedAnswers, { q: QUESTIONS[currentStep].question, a: answerText }];
    setDetailedAnswers(newAnswers);
    const newScore = score + points;
    
    if (currentStep < QUESTIONS.length - 1) {
      setScore(newScore);
      setCurrentStep(currentStep + 1);
    } else {
      setScore(newScore);
      setShowProfileForm(true);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let persona = "DAILY LABORER";
    let msg = "Critical Triage: Your business is currently a high-stress job, not an asset. We need an immediate 'Clean Sweep' intervention.";
    if (score >= 28) { persona = "VISIONARY ARCHITECT"; msg = "Legacy Engineering: Optimized for scale. Your structure is ready to support multi-generational wealth."; }
    else if (score >= 15) { persona = "THE INTEGRATOR"; msg = "Bridge Building: You're moving away from founder-dependency. Now is the time to deploy AI to fully decouple."; }

    try {
      if (db && user) {
        await addDoc(collection(db, 'assessments'), {
          name: formData.name || user.displayName || 'Unknown',
          enterprise: formData.enterprise,
          email: user.email,
          userId: user.uid,
          score: score,
          maxScore: QUESTIONS.length * 4,
          persona: persona,
          diagnosis: msg,
          intelligence_report: detailedAnswers,
          timestamp: serverTimestamp()
        });

        // Redirect to Dashboard immediately after saving
        if (onClose) onClose();
        window.location.hash = '#my-intel';
      }
    } catch (err) {
      alert("Error saving data. Please try again.");
    }
    setIsSubmitting(false);
  };

  // State Machine logic for rendering the right screen
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/95 backdrop-blur-xl font-sans text-left">
      <div className="bg-white rounded-[3rem] p-1 w-full max-w-4xl max-h-[90vh] overflow-hidden relative shadow-2xl">
        <div className="bg-white rounded-[2.8rem] h-full overflow-y-auto p-8 md:p-16 relative flex flex-col justify-center">
          <button onClick={onClose} className="absolute top-8 right-8 text-brand-900/40 hover:text-brand-900"><X size={32}/></button>

          {!user ? (
            // 1. MUST LOG IN FIRST
            <div className="text-center space-y-8 max-w-md mx-auto">
              <div className="w-20 h-20 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                 <Lock size={40} />
              </div>
              <div>
                <h2 className="text-3xl md:text-5xl font-sora font-black text-brand-900 uppercase tracking-tighter">Client Portal</h2>
                <p className="text-brand-900/60 font-medium mt-4">Authenticate to take the Financial Vitals Check and unlock your personal dashboard.</p>
              </div>
              <button onClick={handleGoogleLogin} disabled={isAuthLoading} className="w-full flex items-center justify-center gap-3 bg-brand-900 text-white py-5 rounded-2xl hover:bg-brand-gold hover:text-brand-900 transition-all font-black uppercase tracking-widest shadow-xl">
                {isAuthLoading ? <Loader2 className="animate-spin" /> : 'Sign in with Google'}
              </button>
            </div>
          ) : !started ? (
            // 2. LOGGED IN, READY TO START
             <div className="text-center space-y-8">
              <div className="w-20 h-20 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mx-auto shadow-xl"><Sparkles size={40}/></div>
              <h2 className="text-4xl md:text-6xl font-sora font-black text-brand-900 uppercase tracking-tighter text-center">Financial <br/><span className="text-brand-gold italic">Vitals Check.</span></h2>
              <p className="text-lg text-brand-900/60 text-center font-medium max-w-lg mx-auto leading-relaxed">Answer 9 quick metrics to reveal your business archetype.</p>
              <button onClick={() => setStarted(true)} className="rounded-full px-12 py-5 text-lg bg-brand-gold text-brand-900 font-black uppercase shadow-2xl hover:scale-105 transition-all mx-auto block">Start Audit</button>
            </div>
          ) : !showProfileForm ? (
            // 3. THE QUIZ
            <div className="space-y-12 w-full">
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
                    <button key={i} onClick={() => handleAnswer(opt.text, opt.score)} className="group p-6 text-left rounded-2xl border-2 border-brand-900/5 hover:border-brand-gold bg-brand-50/30 hover:bg-white transition-all flex justify-between items-center font-bold text-brand-900 text-sm md:text-base">
                       <span>{opt.text}</span>
                       <ArrowRight size={20} className="text-brand-900/20 group-hover:text-brand-gold"/>
                    </button>
                  ))}
               </div>
            </div>
          ) : (
            // 4. FINAL DETAILS BEFORE DASHBOARD
             <div className="max-w-md mx-auto text-center space-y-8 py-10">
               <h3 className="text-3xl font-black text-brand-900 uppercase tracking-tighter">Audit Complete.</h3>
               <p className="text-brand-900/60 font-medium leading-relaxed">Enter your business name to generate your professional archetype report on your dashboard.</p>
               <form onSubmit={handleFinalSubmit} className="space-y-4 text-left">
                  <input required className="w-full bg-brand-50 border-2 border-brand-900/5 rounded-xl px-6 py-4 font-bold text-brand-900 outline-none focus:border-brand-gold" placeholder="FULL NAME" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input required className="w-full bg-brand-50 border-2 border-brand-900/5 rounded-xl px-6 py-4 font-bold text-brand-900 outline-none focus:border-brand-gold" placeholder="BUSINESS NAME" value={formData.enterprise} onChange={(e) => setFormData({...formData, enterprise: e.target.value})} />
                  
                  <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-full bg-brand-900 text-white font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-900 transition-all shadow-xl flex justify-center">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'REVEAL SCORE ON DASHBOARD'}
                  </button>
               </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
