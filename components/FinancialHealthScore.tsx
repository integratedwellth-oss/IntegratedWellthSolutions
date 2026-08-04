import React, { useState, useEffect } from 'react';
import {
  Shield,
  Activity,
  X,
  ArrowRight,
  Sparkles,
  Loader2,
  Lock,
  CheckCircle,
  Mail,
  Key,
  UserPlus,
  LogIn,
  AlertCircle
} from 'lucide-react';
import { getFirebaseAuth, getFirebaseDb } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  Auth
} from 'firebase/auth';
import { QUESTIONS } from './FinancialHealthData';

export interface FinancialHealthScoreProps {
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isOpen = true, onClose }) => {
  const [user, setUser] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [detailedAnswers, setDetailedAnswers] = useState<{ q: string; a: string }[]>([]);
  
  // Stages: 'questionnaire' -> 'profile' -> 'auth' -> 'complete'
  const [stage, setStage] = useState<'questionnaire' | 'profile' | 'auth' | 'complete'>('questionnaire');
  
  const [formData, setFormData] = useState({ name: '', enterprise: '' });
  
  // Auth state
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && stage === 'auth') {
        // Auto-advance if signed in during auth stage
        saveAndFinalize(currentUser);
      }
    });
    return () => unsubscribe();
  }, [stage]);

  useEffect(() => {
    if (isOpen) {
      const auth = getFirebaseAuth();
      const currentUser = auth?.currentUser;
      setUser(currentUser || null);
      setCurrentStep(0);
      setScore(0);
      setDetailedAnswers([]);
      setStage('questionnaire');
      setAuthError(null);
      setEmail('');
      setPassword('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAnswer = (answerText: string, points: number) => {
    const newAnswers = [...detailedAnswers, { q: QUESTIONS[currentStep].question, a: answerText }];
    setDetailedAnswers(newAnswers);
    const newScore = score + points;
    setScore(newScore);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Questionnaire complete -> collect Profile / Details first
      setStage('profile');
    }
  };

  const getResult = (finalScore: number) => {
    if (finalScore >= 28) return { persona: 'VISIONARY ARCHITECT', msg: 'Legacy Engineering: Optimized for scale.' };
    if (finalScore >= 15) return { persona: 'THE INTEGRATOR', msg: "Bridge Building: Moving away from dependency." };
    return { persona: 'DAILY LABORER', msg: 'Critical Triage: Business is currently a job, not an asset.' };
  };

  const handleProfileNext = (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getFirebaseAuth();
    const currentUser = auth?.currentUser;
    if (currentUser) {
      saveAndFinalize(currentUser);
    } else {
      setStage('auth');
    }
  };

  const saveAndFinalize = async (authenticatedUser: any) => {
    setIsSubmitting(true);
    setAuthError(null);
    const res = getResult(score);
    const db = getFirebaseDb();

    try {
      if (db && authenticatedUser) {
        const userEmail = authenticatedUser.email || email;
        const userName = formData.name || authenticatedUser.displayName || 'Client';

        await addDoc(collection(db, 'assessments'), {
          name: userName,
          enterprise: formData.enterprise || 'My Enterprise',
          email: userEmail,
          userId: authenticatedUser.uid,
          score: score,
          maxScore: QUESTIONS.length * 4,
          persona: res.persona,
          diagnosis: res.msg,
          intelligence_report: detailedAnswers,
          timestamp: serverTimestamp()
        });

        await addDoc(collection(db, 'mail'), {
          to: userEmail,
          message: {
            subject: `Your Financial Health Score: ${res.persona}`,
            html: `<h1>Assessment Complete</h1><p>Your persona is <strong>${res.persona}</strong>.</p><p><a href="https://www.integratedwellth.co.za/#my-intel">View your dashboard</a></p>`
          }
        });
      }
      setStage('complete');
      setTimeout(() => {
        if (onClose) onClose();
        window.location.href = '/#my-intel';
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      console.error(err);
      // Even if Firestore save fails (e.g. offline/demo mode), finish gracefully
      setStage('complete');
      setTimeout(() => {
        if (onClose) onClose();
        window.location.href = '/#my-intel';
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsAuthLoading(true);
    setAuthError(null);
    const auth = getFirebaseAuth();
    if (!auth) {
      setAuthError('Authentication unavailable in offline mode.');
      setIsAuthLoading(false);
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      if (res.user) {
        await saveAndFinalize(res.user);
      }
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Google authentication failed.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError(null);
    const auth = getFirebaseAuth();

    if (!auth) {
      setAuthError('Authentication unavailable in demo mode.');
      setIsAuthLoading(false);
      return;
    }

    try {
      let resUser: any = null;
      if (authMode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        resUser = cred.user;
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        resUser = cred.user;
      }
      if (resUser) {
        await saveAndFinalize(resUser);
      }
    } catch (err: any) {
      console.error(err);
      let friendlyMsg = err.message;
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        friendlyMsg = 'Invalid email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        friendlyMsg = 'An account with this email already exists. Try signing in.';
      } else if (err.code === 'auth/weak-password') {
        friendlyMsg = 'Password should be at least 6 characters.';
      }
      setAuthError(friendlyMsg);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const progressPercent = ((currentStep + 1) / QUESTIONS.length) * 100;
  const currentResult = getResult(score);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/95 backdrop-blur-xl font-sans text-left animate-fadeIn">
      <div className="bg-white rounded-[3rem] p-1 w-full max-w-4xl max-h-[90vh] overflow-hidden relative shadow-2xl">
        <div className="bg-white rounded-[2.8rem] h-full overflow-y-auto p-8 md:p-16 relative flex flex-col justify-center">
          
          {/* Progress bar during questionnaire */}
          {stage === 'questionnaire' && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100 rounded-t-[2.8rem] overflow-hidden">
              <div
                className="h-full bg-brand-gold transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}

          <button onClick={onClose} className="absolute top-8 right-8 text-brand-900/40 hover:text-brand-900 z-50">
            <X size={32} />
          </button>

          {/* STAGE 1: QUESTIONNAIRE */}
          {stage === 'questionnaire' && (
            <div className="space-y-12 w-full pt-4">
              <div className="flex justify-between items-end border-b border-brand-900/10 pb-6">
                <div>
                  <p className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                    Question {currentStep + 1} of {QUESTIONS.length}
                  </p>
                  <h3 className="text-xl font-black text-brand-900 uppercase">
                    {QUESTIONS[currentStep].category}
                  </h3>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-900 leading-tight">
                {QUESTIONS[currentStep].question}
              </h2>
              <div className="grid gap-4">
                {QUESTIONS[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.text, opt.score)}
                    className="group p-6 text-left rounded-2xl border-2 border-brand-900/5 hover:border-brand-gold bg-brand-50/30 hover:bg-white transition-all flex justify-between items-center font-bold text-brand-900 text-sm md:text-base"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight size={20} className="text-brand-900/20 group-hover:text-brand-gold" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 2: PROFILE DETAILS */}
          {stage === 'profile' && (
            <div className="max-w-md mx-auto text-center space-y-8 py-6">
              <div className="inline-flex px-4 py-1.5 bg-brand-gold/20 text-brand-900 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                Assessment Complete
              </div>
              <h3 className="text-3xl font-black text-brand-900 uppercase tracking-tighter">
                Enter Your Business Details
              </h3>
              <p className="text-brand-900/60 font-medium leading-relaxed">
                Provide your details to unlock your tailored diagnostic report and archetype.
              </p>
              <form onSubmit={handleProfileNext} className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-900/60 mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    className="w-full bg-brand-50 border-2 border-brand-900/5 rounded-xl px-6 py-4 font-bold text-brand-900 outline-none focus:border-brand-gold"
                    placeholder="e.g. Marcia Kgaphola"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-900/60 mb-2">
                    Business / Entity Name
                  </label>
                  <input
                    required
                    className="w-full bg-brand-50 border-2 border-brand-900/5 rounded-xl px-6 py-4 font-bold text-brand-900 outline-none focus:border-brand-gold"
                    placeholder="e.g. Integrated Wellth Solutions"
                    value={formData.enterprise}
                    onChange={(e) => setFormData({ ...formData, enterprise: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 rounded-full bg-brand-900 text-white font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-900 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  Continue to Save & View Score <ArrowRight size={18} />
                </button>
              </form>
            </div>
          )}

          {/* STAGE 3: AUTHENTICATION CHOICE (AFTER QUESTIONNAIRE) */}
          {stage === 'auth' && (
            <div className="max-w-md mx-auto text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <Lock size={32} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-brand-900 uppercase tracking-tighter">
                  Save Your Assessment
                </h3>
                <p className="text-brand-900/60 text-sm font-medium mt-2">
                  Create an account or sign in to save <strong className="text-brand-900">{currentResult.persona}</strong> score and access your Client Hub.
                </p>
              </div>

              {authError && (
                <div className="p-4 bg-red-50 border-2 border-red-500/20 text-red-700 rounded-xl text-xs font-bold flex items-center gap-3 text-left">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Option A: Google Auth */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isAuthLoading || isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-brand-900 text-white py-4 rounded-2xl hover:bg-brand-gold hover:text-brand-900 transition-all font-black uppercase tracking-widest text-xs shadow-lg"
              >
                {isAuthLoading ? <Loader2 className="animate-spin" /> : 'Continue with Google'}
              </button>

              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-brand-900/10" />
                <span className="px-4 text-[10px] font-black uppercase tracking-widest text-brand-900/40">
                  OR EMAIL
                </span>
                <div className="flex-1 border-t border-brand-900/10" />
              </div>

              {/* Option B: Email + Password */}
              <form onSubmit={handleEmailAuth} className="space-y-3 text-left">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-900/40" size={18} />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-brand-50 border-2 border-brand-900/5 rounded-xl text-sm font-bold text-brand-900 outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-900/40" size={18} />
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-brand-50 border-2 border-brand-900/5 rounded-xl text-sm font-bold text-brand-900 outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthLoading || isSubmitting}
                  className="w-full py-4 rounded-2xl bg-brand-gold text-brand-900 font-black uppercase tracking-widest text-xs hover:bg-brand-900 hover:text-white transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {(isAuthLoading || isSubmitting) ? (
                    <Loader2 className="animate-spin" />
                  ) : authMode === 'signup' ? (
                    <>
                      <UserPlus size={16} /> Create Account & Save
                    </>
                  ) : (
                    <>
                      <LogIn size={16} /> Sign In & Save
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                    setAuthError(null);
                  }}
                  className="text-[10px] font-black uppercase tracking-widest text-brand-900/60 hover:text-brand-900 underline"
                >
                  {authMode === 'signin'
                    ? "Don't have an account? Sign Up"
                    : 'Already have an account? Sign In'}
                </button>
              </div>
            </div>
          )}

          {/* STAGE 4: COMPLETE */}
          {stage === 'complete' && (
            <div className="text-center py-20 space-y-6">
              <CheckCircle className="w-24 h-24 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-3xl font-black text-brand-900 uppercase">Results Saved</h3>
              <p className="font-bold text-brand-900/60">
                Redirecting to your personalized Client Hub...
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
