import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import Button from './Button';
import { CONTACT_INFO } from '../constants';
import { CheckCircle2, AlertCircle, TrendingUp, Calendar, BookOpen, Users, X, Loader2 } from 'lucide-react';

// 🔌 FIREBASE IMPORTS
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

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

  // Added 'phone' to the state
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // 💾 Saving Phone Number to Firebase now
      await addDoc(collection(db, "leads"), {
        name: formData.name,
        enterprise: formData.enterprise,
        email: formData.email,
        phone: formData.phone, // <--- New Field
        score: score,
        resultType: getResult().title,
        timestamp: new Date()
      });

      setShowForm(false);
      setShowResult(true);
    } catch (error) {
      console.error("Error saving lead:", error);
      setShowForm(false);
      setShowResult(true);
    } finally {
      setIsSaving(false);
    }
  };

  const getResult = () => {
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
      {isModal && (
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
      )}

      {!isModal && (
        <>
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </>
      )}

      <div className={containerClasses}>
        
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
                strategy, finances, compliance, systems, and wellbeing before moving into your next phase of growth.
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
                   <p className={`text-sm ${isModal ? 'text-gray-600' : 'text-gray-300'}`}>
                     <strong>Completion time:</strong> 5–7 minutes<br/>
                     <strong>Outcome:</strong> Actionable strategic insight
                   </p>
                </div>
              </div>
            </div>

            <Button onClick={() => setStarted(true)} size="lg" variant={isModal ? 'primary' : 'secondary'} className="px-12 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
              Start Assessment
            </Button>
          </div>
        )}

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
                <h3 className="text-3xl font-bold mb-2 text-gray-900">Assessment Complete</h3>
                <p className="text-gray-600 mb-8">Enter your details to generate your tailored Strategic SME Reset Plan.</p>
                
                <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={isSaving}
                    />
                  </div>
                  <div>
                    <label htmlFor="enterprise" className="block text-sm font-bold text-gray-700 mb-1">Name of Enterprise</label>
                    <input
                      type="text"
                      id="enterprise"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow"
                      placeholder="e.g. Innovate Holdings"
                      value={formData.enterprise}
                      onChange={(e) => setFormData({...formData, enterprise: e.target.value})}
                      disabled={isSaving}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={isSaving}
                    />
                  </div>
                  {/* PHONE NUMBER FIELD ADDED HERE */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow"
                      placeholder="e.g. 082 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={isSaving}
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full justify-center text-lg py-3 flex items-center gap-2"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="animate-spin w-5 h-5" />
                          Analyzing & Saving...
                        </>
                      ) : (
                        "Reveal My Results"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Results View */}
            {showResult && (
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-full ${getResult().bgColor}`}>
                    {getResult().icon}
                  </div>
                </div>

                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Results for {formData.enterprise}</p>
                <div className={`text-4xl font-bold mb-2 ${getResult().color}`}>{getResult().title}</div>
                <div className="inline-block px-4 py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-sm mb-6">
                  Score: {score} / 16
                </div>

                <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto leading-relaxed border-t border-b border-gray-100 py-6">
                  {getResult().msg}
                </p>
                
                <div className="bg-brand-50 rounded-xl p-6 mb-8 text-left">
                  <h4 className="font-bold text-brand-900 mb-4 text-center">What This Reset Is Inviting You To Do</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button onClick={openBooking} className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-brand-100 hover:border-brand-500 hover:shadow-md transition-all group">
                      <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        <Calendar size={20} />
                      </div>
                      <span className="font-bold text-gray-800 text-sm">Book a SME Reset<br/>Clarity Session</span>
                    </button>

                    <button onClick={() => window.location.hash = '#contact'} className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-brand-100 hover:border-brand-500 hover:shadow-md transition-all group">
                       <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        <BookOpen size={20} />
                      </div>
                      <span className="font-bold text-gray-800 text-sm">Access Financial &<br/>Compliance Toolkits</span>
                    </button>

                    <button onClick={scrollToEvent} className="relative flex flex-col items-center text-center p-4 bg-gradient-to-b from-yellow-50 to-white rounded-lg border-2 border-yellow-400 hover:border-yellow-500 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group overflow-visible">
                       <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap animate-pulse">
                        LIMITED SEATS
                       </div>
                       <div className="w-10 h-10 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center mb-3 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                        <Users size={20} />
                      </div>
                      <span className="font-bold text-gray-900 text-sm">Join Upcoming<br/>SME Clinics</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                   <Button onClick={resetQuiz} variant="outline" size="md">Start New Assessment</Button>
                   {isModal && onClose && (
                     <Button onClick={onClose} variant="secondary" size="md">Close</Button>
                   )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default FinancialHealthScore;
