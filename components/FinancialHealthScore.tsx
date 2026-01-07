import React, { useState } from 'react';
import { X, ChevronRight, Activity, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS, CONTACT_INFO } from '../constants';
import Button from './Button';

interface FinancialHealthScoreProps {
  isOpen: boolean;
  onClose: () => void;
  isModal?: boolean;
}

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isOpen, onClose, isModal = false }) => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const handleOptionSelect = (optionScore: number) => {
    const newScore = score + optionScore;
    setScore(newScore);

    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setScore(0);
    setIsFinished(false);
  };

  const getResult = () => {
    const maxScore = QUIZ_QUESTIONS.length * 4;
    const percentage = (score / maxScore) * 100;

    if (percentage >= 80) return {
      status: "Optimized",
      message: "Your foundations are strong for the 2026 Watershed. You are ready for strategic scaling.",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    };
    if (percentage >= 50) return {
      status: "Moderate Risk",
      message: "You have basic controls, but the SARS AI transition may highlight structural gaps.",
      color: "text-brand-gold",
      bg: "bg-brand-gold/5"
    };
    return {
      status: "High Compliance Risk",
      message: "Critical triage is required. Your current systems may not withstand 2026 data triangulation.",
      color: "text-red-500",
      bg: "bg-red-50"
    };
  };

  const content = (
    <div className="relative overflow-hidden">
      {!isFinished ? (
        <div className="space-y-8 p-4">
          {/* Progress Header */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-2">Compliance Triage</p>
              <h2 className="text-2xl font-black text-brand-900 uppercase tracking-tighter">Step {step + 1} of {QUIZ_QUESTIONS.length}</h2>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-brand-900/10 italic">0{step + 1}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-900 transition-all duration-500 ease-out"
              style={{ width: `${((step + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-widest">
              <Activity size={14} />
              <span>{QUIZ_QUESTIONS[step].category}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-brand-900 leading-tight">
              {QUIZ_QUESTIONS[step].question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid gap-3">
            {QUIZ_QUESTIONS[step].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option.score)}
                className="group flex items-center justify-between p-5 text-left bg-white border border-gray-100 rounded-2xl hover:border-brand-gold hover:shadow-xl hover:shadow-brand-gold/5 transition-all duration-300"
              >
                <span className="font-semibold text-gray-700 group-hover:text-brand-900 transition-colors">{option.text}</span>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="text-center space-y-8 py-8 animate-fadeIn">
          <div className={`inline-flex p-6 rounded-full ${getResult().bg} ${getResult().color} mb-4`}>
            <ShieldCheck size={48} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.5em] text-brand-gold">Health Diagnostic</h2>
            <h3 className={`text-4xl font-black uppercase tracking-tighter ${getResult().color}`}>
              {getResult().status}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto font-medium leading-relaxed">
              {getResult().message}
            </p>
          </div>

          <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-900/40 italic">Next Step: Predictive Reassurance Call</span>
            </div>
            <p className="text-brand-900 font-bold mb-8">
              Resolve your leadership isolation. Let's map your path through the 2026 SARS AI transition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')}
                className="rounded-full px-8 py-4 bg-brand-900 text-white font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-all"
              >
                Initialize Strategy Call <ArrowRight size={14} className="ml-2" />
              </Button>
              <button 
                onClick={resetQuiz}
                className="text-[10px] font-black uppercase tracking-widest text-brand-900/30 hover:text-brand-900 transition-colors px-4 py-4"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-brand-900/90 backdrop-blur-2xl animate-fadeIn">
        <div className="bg-white rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] w-full max-w-2xl relative overflow-hidden border border-white/10">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 z-10 p-2 text-gray-400 hover:text-brand-900 transition-colors bg-gray-50 rounded-full"
          >
            <X size={20} />
          </button>
          <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="assessment" className="py-24 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-[4rem] border border-gray-100 p-8 md:p-16 shadow-2xl shadow-brand-900/5">
          {content}
        </div>
      </div>
    </section>
  );
};

export default FinancialHealthScore;
