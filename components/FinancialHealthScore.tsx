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
  { category: "Compliance Protocol", question: "Are your tax returns (SARS/VAT/PAYE) fully up to date?", options: [{ text: "Yes, 100% compliant", score: 4 }, { text: "I think so, but unsure", score: 2 }, { text: "No, I have a backlog", score: 0 }] },
  { category: "Strategic Architecture", question: "If you stopped working today, would revenue continue for 3 months?", options: [{ text: "Yes, systems run without me", score: 4 }, { text: "Maybe for a few weeks", score: 2 }, { text: "No, income stops immediately", score: 0 }] },
  { category: "Founder Resilience", question: "How would you rate your financial anxiety level?", options: [{ text: "Low. I have total clarity.", score: 4 }, { text: "Moderate. Cash flow keeps me up sometimes.", score: 2 }, { text: "High. I dread looking at the bank account.", score: 0 }] }
];

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isModal = false, isOpen = true, onClose }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [detailedAnswers, setDetailedAnswers] = useState<{q: string, a: string}[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isModal && !isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsAuthLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      console.error(err);
      alert("Authentication failed.");
    }
    setIsAuthLoading(false);
  };

  const getResult = (finalScore: number) => {
    if (finalScore >= 15) return { persona: "VISIONARY ARCHITECT", msg: "Optimized for scale." };
    if (finalScore >= 8) return { persona: "THE INTEGRATOR", msg: "Moving away from dependency." };
    return { persona: "DAILY LABORER", msg: "High-stress job, not an asset." };
  };

  const processSubmission = async (finalScore: number, finalAnswers: any[]) => {
    setIsSubmitting(true);
    const res = getResult(finalScore);

    try {
      if (db && user) {
        // Save to Database linked to their email
        await addDoc(collection(db, 'assessments'), {
          email: user.email,
          name: user.displayName || 'Sovereign Client',
          score: finalScore,
          maxScore: QUESTIONS.length * 4,
          persona: res.persona,
          intelligence_report: finalAnswers,
          timestamp: serverTimestamp()
        });
        
        // Redirect them to their personal dashboard where they can see the result
        window.location.hash = '#my-intel';
        if (onClose) onClose();
      }
    } catch (err) {
      console.error(err);
      alert("Error saving data.");
    }
    setIsSubmitting(false);
  };

  const handleAnswer = async (answerText: string, points: number) => {
    const newAnswers = [...detailedAnswers, { q: QUESTIONS[currentStep].question, a: answerText }];
    setDetailedAnswers(newAnswers);
    const newScore = score + points;
    
    if (currentStep < QUESTIONS.length - 1) {
      setScore(newScore);
      setCurrentStep(currentStep + 1);
    } else {
      // Final Question Answered -> Process immediately
      await processSubmission(newScore, newAnswers);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/95 backdrop-blur-xl font-sans text-left animate-fadeIn">
      <div className="bg-white rounded-[3rem] p-1 w-full max-w-4xl max-h-[90vh] overflow-hidden relative shadow-2xl">
        <div className="bg-white rounded-[2.8rem] h-full overflow-y-auto p-8 md:p-16 relative">
          <button onClick={onClose} className="absolute top-8 right-8 text-brand-900/40 hover:text-brand-900"><X size={32}/></button>

          {/* STEP 1: AUTHENTICATION GATE */}
          {!user ? (
            <div className="text-center space-y-8 py-12 animate-fadeIn max-w-md mx-auto">
              <div className="w-20 h-20 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                 <Lock size={40} />
              </div>
              <div>
                <h2 className="text-3xl font-sora font-black text-brand-900 uppercase tracking-tighter">Secure Client Portal</h2>
                <p className="text-brand-900/60 font-medium mt-4">Authenticate to take the Financial Vitals Check and unlock your personal dashboard.</p>
              </div>
              <button 
                onClick={handleGoogleLogin} 
                disabled={isAuthLoading}
                className="w-full flex items-center justify-center gap-3 bg-brand-900 text-white py-5 rounded-2xl hover:bg-brand-gold hover:text-brand-900 transition-all font-black uppercase tracking-widest shadow-xl"
              >
                {isAuthLoading ? <Loader2 className="animate-spin" /> : 'Sign in with Google'}
              </button>
            </div>
          ) : isSubmitting ? (
            // SUBMITTING STATE
            <div className="text-center py-20 space-y-6">
               <Loader2 className="animate-spin w-16 h-16 text-brand-gold mx-auto" />
               <p className="font-black uppercase tracking-widest text-brand-900">Uplinking to Dashboard...</p>
            </div>
          ) : (
            // STEP 2: THE QUIZ
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
                    <button key={i} onClick={() => handleAnswer(opt.text, opt.score)} className="group p-6 text-left rounded-2xl border-2 border-brand-900/5 hover:border-brand-gold bg-brand-50/30 hover:bg-white transition-all flex justify-between items-center font-bold text-brand-900 text-sm">
                       <span>{opt.text}</span>
                       <ArrowRight size={20} className="text-brand-900/20 group-hover:text-brand-gold"/>
                    </button>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
