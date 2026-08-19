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
  AlertCircle,
  Building2,
  Heart
} from 'lucide-react';
import { getFirebaseAuth, getFirebaseDb } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { BUSINESS_QUESTIONS, NGO_NPO_QUESTIONS, Question } from './FinancialHealthData';

export interface FinancialHealthScoreProps {
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isOpen = true, onClose }) => {
  const [user, setUser] = useState<any>(null);
  
  // Track selection: 'business' vs 'ngo_npo'
  const [track, setTrack] = useState<'business' | 'ngo_npo'>('business');
  
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [detailedAnswers, setDetailedAnswers] = useState<{ q: string; a: string }[]>([]);
  
  // Stages: 'questionnaire' -> 'profile' -> 'auth' -> 'complete'
  const [stage, setStage] = useState<'questionnaire' | 'profile' | 'auth' | 'complete'>('questionnaire');
  
  const [formData, setFormData] = useState({ name: '', enterprise: '' });
  
  // Auth state
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeQuestions: Question[] = track === 'business' ? BUSINESS_QUESTIONS : NGO_NPO_QUESTIONS;

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && stage === 'auth') {
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

  const handleTrackChange = (newTrack: 'business' | 'ngo_npo') => {
    setTrack(newTrack);
    setCurrentStep(0);
    setScore(0);
    setDetailedAnswers([]);
  };

  const handleAnswer = (answerText: string, points: number) => {
    const newAnswers = [...detailedAnswers, { q: activeQuestions[currentStep].question, a: answerText }];
    setDetailedAnswers(newAnswers);
    const newScore = score + points;
    setScore(newScore);

    if (currentStep < activeQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setStage('profile');
    }
  };

  const getResult = (finalScore: number) => {
    if (track === 'ngo_npo') {
      if (finalScore >= 24) return { persona: 'SUSTAINABLE STEWARD', msg: 'Audit-Ready Governance: Fully structured for donor scale and grant recovery.' };
      if (finalScore >= 14) return { persona: 'TRANSITIONAL NPO', msg: 'Moving from volunteer ad-hoc practices toward institutional compliance.' };
      return { persona: 'AT-RISK ENTITY', msg: 'High Deregistration Risk: Urgent compliance & fund accounting triage required.' };
    } else {
      if (finalScore >= 24) return { persona: 'VISIONARY ARCHITECT', msg: 'Legacy Engineering: Fully structured for scale and capital.' };
      if (finalScore >= 14) return { persona: 'THE INTEGRATOR', msg: 'Bridge Building: Moving away from reactive compliance dependency.' };
      return { persona: 'DAILY LABORER', msg: 'Critical Triage: Enterprise is operating under high penalty risk.' };
    }
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
          enterprise: formData.enterprise || (track === 'ngo_npo' ? 'My Organisation' : 'My Enterprise'),
          email: userEmail,
          userId: authenticatedUser.uid,
          track: track,
          score: score,
          maxScore: activeQuestions.length * 4,
          persona: res.persona,
          diagnosis: res.msg,
          intelligence_report: detailedAnswers,
          timestamp: serverTimestamp()
        });

        await addDoc(collection(db, 'mail'), {
          to: userEmail,
          message: {
            subject: `Your Financial Health & Compliance Score: ${res.persona}`,
            html: `<h1>Assessment Complete</h1><p>Track: <strong>${track.toUpperCase()}</strong></p><p>Your persona: <strong>${res.persona}</strong></p><p><a href="https://www.integratedwellth.co.za/#my-intel">Access your Client Hub</a></p>`
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

  const progressPercent = ((currentStep + 1) / activeQuestions.length) * 100;
  const currentResult = getResult(score);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-brand-900/95 backdrop-blur-xl font-sans text-left animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-1 w-full max-w-4xl max-h-[92vh] overflow-hidden relative shadow-2xl my-auto">
        <div className="bg-white rounded-[1.8rem] sm:rounded-[2.8rem] h-full overflow-y-auto p-4 sm:p-8 md:p-14 relative flex flex-col justify-center">
          
          {/* Progress bar during questionnaire */}
          {stage === 'questionnaire' && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100 rounded-t-[2.8rem] overflow-hidden">
              <div
                className="h-full bg-brand-gold transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-brand-900/40 hover:text-brand-900 z-50 p-2"
            aria-label="Close Assessment"
          >
            <X size={28} className="sm:w-8 sm:h-8" />
          </button>

          {/* STAGE 1: QUESTIONNAIRE */}
          {stage === 'questionnaire' && (
            <div className="space-y-6 sm:space-y-10 w-full pt-2 sm:pt-4">
              
              {/* TRACK SELECTOR: Formal Business vs NGO / NPO */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-brand-900/10 pb-4">
                <div>
                  <p className="text-brand-gold text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                    Question {currentStep + 1} of {activeQuestions.length}
                  </p>
                  <h3 className="text-lg sm:text-xl font-black text-brand-900 uppercase">
                    {activeQuestions[currentStep].category}
                  </h3>
                </div>

                <div className="flex bg-brand-50 p-1 rounded-2xl border border-brand-900/10 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleTrackChange('business')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                      track === 'business'
                        ? 'bg-brand-900 text-brand-gold shadow-md'
                        : 'text-brand-900/60 hover:text-brand-900'
                    }`}
                  >
                    <Building2 size={14} /> Business / SME
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTrackChange('ngo_npo')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                      track === 'ngo_npo'
                        ? 'bg-brand-900 text-brand-gold shadow-md'
                        : 'text-brand-900/60 hover:text-brand-900'
                    }`}
                  >
                    <Heart size={14} /> NGO / NPO
                  </button>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-900 leading-tight">
                {activeQuestions[currentStep].question}
              </h2>

              <div className="grid gap-3 sm:gap-4">
                {activeQuestions[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.text, opt.score)}
                    className="group p-4 sm:p-6 text-left rounded-2xl border-2 border-brand-900/5 hover:border-brand-gold bg-brand-50/30 hover:bg-white transition-all flex justify-between items-center font-bold text-brand-900 text-xs sm:text-sm md:text-base leading-snug"
                  >
                    <span className="pr-4">{opt.text}</span>
                    <ArrowRight size={18} className="text-brand-900/20 group-hover:text-brand-gold shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STAGE 2: PROFILE DETAILS */}
          {stage === 'profile' && (
            <div className="max-w-md mx-auto text-center space-y-6 sm:space-y-8 py-4 sm:py-6">
              <div className="inline-flex px-4 py-1.5 bg-brand-gold/20 text-brand-900 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                Assessment Complete
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-brand-900 uppercase tracking-tighter">
                Enter Your {track === 'ngo_npo' ? 'Organisation' : 'Business'} Details
              </h3>
              <p className="text-brand-900/60 text-xs sm:text-sm font-medium leading-relaxed">
                Provide your details to unlock your tailored diagnostic report and archetype score.
              </p>
              <form onSubmit={handleProfileNext} className="space-y-4 text-left">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-900/60 mb-1.5">
                    Full Name
                  </label>
                  <input
                    required
                    className="w-full bg-brand-50 border-2 border-brand-900/5 rounded-xl px-5 py-3.5 font-bold text-brand-900 outline-none focus:border-brand-gold text-sm"
                    placeholder="e.g. Marcia Kgaphola"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-900/60 mb-1.5">
                    {track === 'ngo_npo' ? 'Organisation / NPO Name' : 'Business / Enterprise Name'}
                  </label>
                  <input
                    required
                    className="w-full bg-brand-50 border-2 border-brand-900/5 rounded-xl px-5 py-3.5 font-bold text-brand-900 outline-none focus:border-brand-gold text-sm"
                    placeholder={track === 'ngo_npo' ? 'e.g. Integrated Community Foundation' : 'e.g. Integrated Wellth Solutions'}
                    value={formData.enterprise}
                    onChange={(e) => setFormData({ ...formData, enterprise: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 sm:py-5 rounded-full bg-brand-900 text-white font-black uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-brand-900 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  Continue to Save & View Score <ArrowRight size={16} />
                </button>
              </form>
            </div>
          )}

          {/* STAGE 3: AUTHENTICATION CHOICE (AFTER QUESTIONNAIRE) */}
          {stage === 'auth' && (
            <div className="max-w-md mx-auto text-center space-y-5 sm:space-y-6 py-2 sm:py-4">
              <div className="w-14 h-16 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <Lock size={28} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-brand-900 uppercase tracking-tighter">
                  Save Your Assessment
                </h3>
                <p className="text-brand-900/60 text-xs sm:text-sm font-medium mt-1">
                  Create an account or sign in to save your <strong className="text-brand-900">{currentResult.persona}</strong> score and access your Client Hub.
                </p>
              </div>

              {authError && (
                <div className="p-3.5 bg-red-50 border-2 border-red-500/20 text-red-700 rounded-xl text-xs font-bold flex items-center gap-2.5 text-left">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Option A: Google Auth */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isAuthLoading || isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-brand-900 text-white py-3.5 sm:py-4 rounded-2xl hover:bg-brand-gold hover:text-brand-900 transition-all font-black uppercase tracking-widest text-xs shadow-lg"
              >
                {isAuthLoading ? <Loader2 className="animate-spin" /> : 'Continue with Google'}
              </button>

              <div className="flex items-center my-3">
                <div className="flex-1 border-t border-brand-900/10" />
                <span className="px-3 text-[10px] font-black uppercase tracking-widest text-brand-900/40">
                  OR EMAIL
                </span>
                <div className="flex-1 border-t border-brand-900/10" />
              </div>

              {/* Option B: Email + Password (Sign Up & Sign In) */}
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
                      className="w-full pl-12 pr-4 py-3.5 bg-brand-50 border-2 border-brand-900/5 rounded-xl text-xs sm:text-sm font-bold text-brand-900 outline-none focus:border-brand-gold"
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
                      className="w-full pl-12 pr-4 py-3.5 bg-brand-50 border-2 border-brand-900/5 rounded-xl text-xs sm:text-sm font-bold text-brand-900 outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthLoading || isSubmitting}
                  className="w-full py-3.5 sm:py-4 rounded-2xl bg-brand-gold text-brand-900 font-black uppercase tracking-widest text-xs hover:bg-brand-900 hover:text-white transition-all shadow-md flex items-center justify-center gap-2"
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

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                    setAuthError(null);
                  }}
                  className="text-[10px] font-black uppercase tracking-widest text-brand-900/70 hover:text-brand-900 underline"
                >
                  {authMode === 'signin'
                    ? "Need an account? Sign Up with Email"
                    : 'Already have an account? Sign In'}
                </button>
              </div>
            </div>
          )}

          {/* STAGE 4: COMPLETE */}
          {stage === 'complete' && (
            <div className="text-center py-16 sm:py-20 space-y-6">
              <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-2xl sm:text-3xl font-black text-brand-900 uppercase">
                Assessment Results Saved
              </h3>
              <p className="font-bold text-brand-900/60 text-xs sm:text-sm">
                Redirecting to your Client Hub...
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
