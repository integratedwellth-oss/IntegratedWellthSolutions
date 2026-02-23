import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Activity, ShieldCheck, AlertTriangle, Brain, RefreshCw } from 'lucide-react';
import Button from './Button';
import { QUIZ_QUESTIONS } from '../constants';
import { logUserActivity } from '../services/loggingService';

interface FinancialHealthScoreProps {
  isOpen: boolean;
  onClose: () => void;
}

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'calculating' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [sectionScores, setSectionScores] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isOpen) {
      setStep('intro');
      setCurrentQuestion(0);
      setAnswers({});
    }
  }, [isOpen]);

  const handleAnswer = (scoreValue: number) => {
    const newAnswers = { ...answers, [currentQuestion]: scoreValue };
    setAnswers(newAnswers);
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestion(curr => curr + 1), 200);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<number, number>) => {
    setStep('calculating');
    let total = 0;
    let max = 0;
    const sections: Record<string, { cur: number; max: number }> = {};

    QUIZ_QUESTIONS.forEach((q, i) => {
      const s = finalAnswers[i] || 0;
      const m = Math.max(...q.options.map(o => o.score));
      total += s;
      max += m;
      if (!sections[q.category]) sections[q.category] = { cur: 0, max: 0 };
      sections[q.category].cur += s;
      sections[q.category].max += m;
    });

    const finalPct = Math.round((total / max) * 100);
    const finalSections: Record<string, number> = {};
    Object.keys(sections).forEach(k => {
      finalSections[k] = Math.round((sections[k].cur / sections[k].max) * 100);
    });

    setScore(finalPct);
    setSectionScores(finalSections);

    const result = {
      totalScore: finalPct,
      sections: finalSections,
      date: new Date().toLocaleDateString('en-ZA')
    };
    
    localStorage.setItem('iws_health_score_results', JSON.stringify(result));
    logUserActivity('Assessment Finished', `Score: ${finalPct}%`);

    setTimeout(() => setStep('results'), 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-brand-900/90 backdrop-blur-md" />
      
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* WORKING CLOSE BUTTON */}
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-400 transition-all z-50">
          <X size={20} />
        </button>

        {step === 'intro' && (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center mx-auto mb-6"><Brain size={40} className="text-brand-900" /></div>
            <h2 className="text-3xl font-black text-brand-900 uppercase mb-4">Financial Health Check</h2>
            <p className="text-gray-600 mb-8">Evaluate your business hygiene, compliance, and mental resilience.</p>
            <Button onClick={() => setStep('quiz')} className="w-full md:w-auto px-12">Begin Diagnostic</Button>
          </div>
        )}

        {step === 'quiz' && (
          <div className="p-8 md:p-12">
            <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block">{QUIZ_QUESTIONS[currentQuestion].category}</span>
            <h3 className="text-2xl font-bold text-brand-900 mb-8">{QUIZ_QUESTIONS[currentQuestion].question}</h3>
            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentQuestion].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt.score)} className="w-full text-left p-5 rounded-xl bg-gray-50 hover:bg-brand-50 border border-transparent hover:border-brand-900/10 transition-all font-bold text-gray-700">
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'calculating' && (
          <div className="p-20 text-center space-y-4">
            <RefreshCw size={48} className="text-brand-gold animate-spin mx-auto" />
            <p className="font-black text-brand-900 uppercase tracking-widest">Analyzing Architecture...</p>
          </div>
        )}

        {step === 'results' && (
          <div className="flex flex-col">
            <div className="bg-brand-900 text-white p-12 text-center">
              <h2 className="text-5xl font-black mb-2 text-brand-gold">{score}%</h2>
              <p className="text-sm font-bold uppercase tracking-widest opacity-70">Intelligence Score</p>
            </div>
            <div className="p-8">
               <Button onClick={onClose} className="w-full">Reveal Score on Dashboard</Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FinancialHealthScore;
