import React, { useState, useEffect } from 'react';
import { Shield, Activity, X, ArrowRight, Sparkles, Loader2, Lock, CheckCircle } from 'lucide-react';
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
  const [submissionComplete, setSubmissionComplete] = useState(false); // NEW STATE
  const [formData, setFormData] = useState({ name: '', enterprise: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
      if (currentUser && !started && isOpen) {
        setStarted(true);
      }
    });
    return () => unsubscribe();
  }, [started, isOpen]);

  // Reset state when opened/closed
  useEffect(() => {
     if (isOpen && user) {
        setStarted(true);
        setCurrentStep(0);
        setScore(0);
        setDetailedAnswers([]);
        setShowProfileForm(false);
        setSubmissionComplete(false);
     }
  }, [isOpen, user]);

  if (isModal && !isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsAuthLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setStarted(true);
    } catch (err) {
      console.error(err);
      alert("Authentication failed.");
    }
    setIsAuthLoading(false);
  };

  const handleAnswer = (answerText: string, points: number) => {
    setDetailedAnswers([...detailedAnswers, { q: QUESTIONS[currentStep].question, a: answerText }]);
    const newScore = score + points;
    
    if (currentStep < QUESTIONS.length - 1) {
      setScore(newScore);
      setCurrentStep(currentStep + 1);
    } else {
      setScore(newScore);
      setShowProfileForm(true);
    }
  };

  const getResult = (finalScore: number) => {
    if (finalScore >= 28) return { persona: "VISIONARY ARCHITECT", msg: "Legacy Engineering: Optimized for scale." };
    if (finalScore >= 15) return { persona: "THE INTEGRATOR", msg: "Bridge Building: You're moving away from founder-dependency." };
    return { persona: "DAILY LABORER", msg: "Critical Triage: Your business is currently a high-stress job, not an asset." };
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const res = getResult(score);

    try {
      if (db && user) {
        const userEmail = user.email;
        
        await addDoc(collection(db, 'assessments'), {
          name: formData.name || user.displayName,
          enterprise: formData.enterprise,
          email: userEmail,
          userId: user.uid,
          score: score,
          maxScore: QUESTIONS.length * 4,
          persona: res.persona,
          diagnosis: res.msg,
          intelligence_report: detailedAnswers,
          timestamp: serverTimestamp()
        });

        // Trigger Email
        const emailBody = detailedAnswers.map(item => `<b>${item.q}</b><br/>${item.a}<br/><br/>`).join('');
        await addDoc(collection(db, 'mail'), {
          to: userEmail,
          message: {
            subject: `Your Financial Health Score: ${res.persona}`,
            html: `
              <div style="font-family: Arial, sans-serif; color: #134e4a; padding: 20px; max-width: 600px;">
                <h1 style="color: #d4af37;">ASSESSMENT COMPLETE</h1>
                <p>Hello ${formData.name || user.displayName},</p>
                <div style="background: #f0fdfa; padding: 20px; border-left: 5px solid #d4af37; margin: 20px 0;">
                  <h3 style="margin-top:0;">ARCHETYPE: ${res.persona}</h3>
                  <p><strong>Score:</strong> ${score} / ${QUESTIONS.length * 4}</p>
                  <p><strong>Diagnosis:</strong> ${res.msg}</p>
                </div>
                <h2>Your Discovery Trail</h2>
                <div style="color: #64748b; font-size: 14px;">${emailBody}</div>
                <p style="text-align: center; margin: 30px 0;">
                  <a href="https://calendly.com/enquiries-integratedwellth/30min" style="background-color: #134e4a; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 50px;">BOOK YOUR RESULTS REVIEW</a>
                </p>
              </div>
            `
          }
        });
        
        setIsSubmitting(false);
        setSubmissionComplete(true);

        // THE FIX: Wait 1.5 seconds for Firebase to index the data, then reload the dashboard
        setTimeout(() => {
          if (onClose) onClose();
          // Force a full reload of the intelligence hub to ensure fresh data
          window.location.href = '/#my-intel';
          window.location.reload(); 
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      alert("Error saving data. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/95 backdrop-blur-xl font-sans text-left animate-fadeIn">
      <div className="bg-white rounded-[3rem] p-1 w-full max-w-4xl max-h-[90vh] overflow-hidden relative shadow-2xl">
        <div className="bg-white rounded-[2.8rem] h-full overflow-y-auto p-8 md:p-16 relative flex flex-col justify-center">
          <button onClick={onClose} className="absolute top-8 right-8 text-brand-900/40 hover:text-brand-900"><X size={32}/></button>

          {!user ? (
            <div className="text-center space-y-8 animate-fadeIn max-w-md mx-auto">
              <div className="w-20 h-20 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                 <Lock size={40} />
              </div>
              <div>
                <h2 className="text-3xl md:text-5xl font-sora font-black text-brand-900 uppercase tracking-tighter">Client Portal</h2>
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
          ) : submissionComplete ? (
            // THE FIX: Success state while we wait for the redirect
            <div className="text-center py-20 space-y-6 animate-fadeIn">
               <CheckCircle className="w-24 h-24 text-emerald-500 mx-auto" />
               <h3 className="text-3xl font-black text-brand-900 uppercase tracking-tighter">Data Secured</h3>
               <p className="font-bold text-brand-900/60">Routing to your Intelligence Hub...</p>
            </div>
          ) : isSubmitting ? (
            <div className="text-center py-20 space-y-6">
               <Loader2 className="animate-spin w-16 h-16 text-brand-gold mx-auto" />
               <p className="font-black uppercase tracking-widest text-brand-900">Uplinking to Dashboard...</p>
            </div>
          ) : !showProfileForm ? (
            <div className="space-y-12 animate-fadeIn w-full">
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
             <div className="max-w-md mx-auto text-center space-y-8 py-10 animate-fadeIn">
               <h3 className="text-3xl font-black text-brand-900 uppercase tracking-tighter">Audit Complete.</h3>
               <p className="text-brand-900/60 font-medium leading-relaxed">Enter your business details to save this report to your Client Dashboard.</p>
               <form onSubmit={handleFinalSubmit} className="space-y-4 text-left">
                  <input required className="w-full bg-brand-50 border-2 border-brand-900/5 rounded-xl px-6 py-4 font-bold text-brand-900 outline-none focus:border-brand-gold" placeholder="FULL NAME" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input required className="w-full bg-brand-50 border-2 border-brand-900/5 rounded-xl px-6 py-4 font-bold text-brand-900 outline-none focus:border-brand-gold" placeholder="BUSINESS NAME" value={formData.enterprise} onChange={(e) => setFormData({...formData, enterprise: e.target.value})} />
                  <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-full bg-brand-900 text-white font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-900 transition-all shadow-xl">
                    REVEAL SCORE ON DASHBOARD
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
