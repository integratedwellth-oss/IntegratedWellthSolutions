import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import Button from './Button';
import { CONTACT_INFO } from '../constants';
import { CheckCircle2, AlertCircle, TrendingUp, Calendar, BookOpen, Users, X, Loader2 } from 'lucide-react';

// 🔌 FIREBASE IMPORTS
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

interface FinancialHealthScoreProps {
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isModal = false, isOpen = true, onClose }) => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    enterprise: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (isModal && isOpen) {
      setStarted(false);
      setCurrentStep(0);
      setScore(0);
      setShowResult(false);
      setShowForm(false);
      setIsSaving(false);
    }
  }, [isModal, isOpen]);

  if (isModal && !isOpen) return null;

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setScore(newScore);
      setCurrentStep(currentStep + 1);
    } else {
      setScore(newScore);
      setShowForm(true);
    }
  };

  const getResultUI = () => {
    if (score >= 12) {
      return {
        title: "Results Ready",
        subtitle: "Your business shows strong alignment and readiness.",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: <TrendingUp className="w-12 h-12 text-green-600" />,
        msg: "Your business is in a strong position! You have good systems and clarity. The next step is optimization and scaling strategies to preserve wealth and expand sustainably."
      };
    }
    if (score >= 8) {
      return {
        title: "Reset in Progress",
        subtitle: "You have a base, but gaps may slow growth.",
        color: "text-orange-500",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        icon: <AlertCircle className="w-12 h-12 text-orange-500" />,
        msg: "You are doing many things right, but specific strategic refinements and systems support are needed to prevent bottlenecks and ensure you handle 2026 compliance changes smoothly."
      };
    }
    return {
      title: "Reflection Needed",
      subtitle: "Your business is operating under pressure with high risk exposure.",
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: <AlertCircle className="w-12 h-12 text-red-500" />,
      msg: "A reset is highly recommended. Your business needs foundational support to address compliance risks, financial blind spots, and operational dependency before you can safely grow."
    };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const resultData = getResultUI();

    try {
      await addDoc(collection(db, "mail"), {
        to: formData.email,
        message: {
          subject: `Your Assessment Results: ${resultData.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <p>Hi ${formData.name},</p>
              
              <p>Thank you for completing the SME Strategic Self-Assessment for <strong>${formData.enterprise}</strong>.</p>
              
              <p>Running a business requires clarity, control, and constant adaptation. This assessment was designed to give you a mirror to see exactly where you stand right now.</p>
              
              <p>Here is your snapshot:</p>
              
              <div style="border-top: 1px dashed #ccc; border-bottom: 1px dashed #ccc; padding: 15px 0; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>YOUR SCORE:</strong> ${score} / 16</p>
                <p style="margin: 5px 0;"><strong>RESULT PROFILE:</strong> ${resultData.title}</p>
              </div>
              
              <h3 style="color: #BFA15C; margin-bottom: 5px;">WHAT THIS MEANS FOR YOU:</h3>
              <p style="margin-top: 0;">${resultData.msg}</p>
              
              <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
              
              <h3 style="color: #004D40;">EXCLUSIVE INVITATION: JOIN US AT MUNYAKA</h3>
              <p>Data is useful, but clarity is powerful. We would like to invite you to our upcoming exclusive workshop:</p>
              
              <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #BFA15C; margin: 15px 0;">
                <p style="margin: 0;"><strong>"Financial Clarity For Non-Financial Business Owners"</strong></p>
                <p style="margin: 5px 0;">📍 <strong>Location:</strong> Munyaka Lifestyle Centre</p>
                <p style="margin: 5px 0;">🎯 <strong>Goal:</strong> Stop guessing and start mastering your numbers, compliance, and wealth preservation.</p>
              </div>
              
              <p>This session is specifically designed for founders who are experts in their trade but need stronger financial control to navigate the 2026 regulatory changes.</p>
              
              <p>
                <a href="https://integratedwellth.co.za/#upcoming-event" style="background-color: #004D40; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Secure your seat here</a>
              </p>
              
              <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
              
              <h3 style="color: #333;">IMMEDIATE NEXT STEP</h3>
              <p>If you need urgent assistance interpreting your score, we recommend booking a complimentary 15-minute "Triage Call" to identify your immediate compliance risks.</p>
              
              <p><a href="https://calendly.com/integrated-wellth-solutions" style="color: #BFA15C; font-weight: bold;">Book your slot here</a></p>
              
              <br />
              <p>To your integrated wealth,</p>
              <p><strong>The Integrated Wellth Solutions Team</strong><br>
              <a href="https://integratedwellth.co.za">https://integratedwellth.co.za</a></p>
            </div>
          `
        },
        assessmentData: {
          name: formData.name,
          enterprise: formData.enterprise,
          email: formData.email,
          phone: formData.phone,
          score: score,
          resultType: resultData.title,
          submittedAt: serverTimestamp()
        }
      });

      setShowForm(false);
      setShowResult(true);

    } catch (error) {
      console.error("Error saving assessment:", error);
      setShowForm(false);
      setShowResult(true);
    } finally {
      setIsSaving(false);
    }
  };

  const resetQuiz = () => {
    setStarted(false);
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setShowForm(false);
    setFormData({ name: '', enterprise: '', email: '', phone: '' });
  };

  const openBooking = () => {
    // @ts-ignore
    if (window.Calendly) {
       // @ts-ignore
      window.Calendly.initPopupWidget({ url: CONTACT_INFO.calendlyUrl });
    } else {
      window.open(CONTACT_INFO.calendlyUrl, '_blank');
    }
  };

  const scrollToEvent = () => {
    if (isModal && onClose) {
      onClose();
    }
    const el = document.getElementById('upcoming-event');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const Wrapper = isModal ? 'div' : 'section';
  const wrapperProps = isModal 
    ? { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/80 backdrop-blur-sm animate-fadeIn" }
    : { id: "assessment", className: "py-20 bg-brand-900 text-white relative overflow-hidden" };

  const containerClasses = isModal
    ? "bg-white text-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-scaleIn"
    : "max-w-4xl mx-auto px-4 sm:px-6 relative z-10";

  return (
    <Wrapper {...wrapperProps}>
      {/* For Modal: Close Button */}
      {isModal && (
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
      )}

      {/* Background Decor */}
      {!isModal && (
        <>
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </>
      )}

      <div className={containerClasses}>
        
        {/* Intro Screen */}
        {!started && (
          <div className={`text-center animate-fadeIn ${isModal ? 'py-4' : ''}`}>
            <div className="inline-block bg-yellow-500 text-brand-900 font-bold px-4 py-1 rounded-full text-sm uppercase mb-6 tracking-wider">
              SME Strategic Self-Assessment
            </div>
            <h2 className={`font-bold mb-4 leading-tight ${isModal ? 'text-2xl md:text-4xl text-brand-900' : 'text-3xl md:text-5xl text-white'}`}>
              From Reflection to Results:<br/>The SME Reset Experience
            </h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isModal ? 'text-gray-600' : 'text-brand-100'}`}>
              A Strategic Self-Assessment for SMEs Ready to Reset, Refocus & Plan for Sustainable Growth.
            </p>

            <div className={`${isModal ? 'bg-brand-50 border-brand-100' : 'bg-white/10 border-white/10 backdrop-blur-md'} rounded-xl p-8 mb-8 text-left max-w-3xl mx-auto border`}>
              <h3 className="text-lg font-bold text-yellow-500 mb-4 uppercase tracking-wide">About This Reset</h3>
              <p className={`mb-6 leading-relaxed ${isModal ? 'text-gray-700' : 'text-gray-200'}`}>
                Running a business requires clarity, control, and conscious decision-making. 
                This is not just a test—it's a reset point designed to help you pause, assess, and identify critical gaps across 
                strategy, finances, compliance, systems, and wellbeing.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-bold mb-2 flex items-center gap-2 ${isModal ? 'text-brand-900' : 'text-white'}`}>
                    <CheckCircle2 size={18} className="text-brand-500" /> How to Use
                  </h4>
                  <ul className={`text-sm space-y-2 ml-6 list-disc ${isModal ? 'text-gray-600' : 'text-gray-300'}`}>
                    <li>Answer each question honestly</li>
                    <li>Select the option that fits best</li>
                    <li>Total score reveals your path</li>
                  </ul>
                </div>
                <div>
                   <h4 className={`font-bold mb-2 flex items-center gap-2 ${isModal ? 'text-brand-900' : 'text-white'}`}>
                    <CheckCircle2 size={18} className="text-brand-500" /> Details
                  </h4>
                   {/* FIXED SECTION BELOW - NO MORE BROKEN TAGS */}
                   <div className={`text-sm ${isModal ? 'text-gray-600' : 'text-gray-300'}`}>
                     <div className="mb-2"><strong>Completion time:</strong> 5–7 minutes</div>
                     <div><strong>Outcome:</strong> Actionable strategic insight</div>
                   </div>
                </div>
              </div>
            </div>

            <Button onClick={() => setStarted(true)} size="lg" variant={isModal ? 'primary' : 'secondary'} className="px-12 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
              Start Assessment
            </Button>
          </div>
        )}

        {/* Quiz & Form Container */}
        {(started || showForm || showResult) && (
          <div className={`${!isModal ? 'bg-white text-gray-900 rounded-2xl p-6 md:p-10 shadow-2xl transition-all duration-300 min-h-[500px] flex flex-col justify-center animate-fadeIn' : 'w-full'}`}>
            
            {/* Question View */}
            {started && !showForm && !showResult && (
              <div>
                <div className="mb-8">
                  <div className="flex justify-between items-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                    <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                    <span>Reset Phase</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-600 transition-all duration-500 ease-out" 
                      style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <h3 className="text-brand-600 font-bold uppercase tracking-wide text-sm mb-2">
                  {QUIZ_QUESTIONS[currentStep].category}
                </h3>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 leading-snug">
                  {QUIZ_QUESTIONS[currentStep].question}
                </h2>
                
                <div className="space-y-3">
                  {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.score)}
                      className="w-full text-left p-5 rounded-xl border-2 border-gray-100 hover:border-brand-500 hover:bg-brand-50 transition-all font-medium text-lg flex items-center justify-between group"
                    >
                      <span>{option.text}</span>
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-brand-500 group-hover:bg-brand-500 transition-colors"></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form View */}
            {showForm && (
              <div className="w-full max-w-md mx-auto text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-brand-600" />
                </div>
                <h3 className="text-3xl font
