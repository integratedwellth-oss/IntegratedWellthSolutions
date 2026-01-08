import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { QUIZ_QUESTIONS } from '../constants';
import Button from './Button';
import { Lock, ChevronRight, X } from 'lucide-react';

const FinancialHealthScore = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', enterprise: '', email: '', phone: '' });

  const handleOptionSelect = (optionScore: number) => {
    const newScore = score + optionScore;
    setScore(newScore);
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowLeadForm(true);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Scoring Rationale: 0-19 Triage, 20-34 Reflection, 35-48 Optimized
    const resultType = score >= 35 ? "Optimized" : score >= 20 ? "Reflection Needed" : "Critical Triage";

    try {
      await addDoc(collection(db, "leads"), {
        ...leadData,
        score,
        resultType,
        timestamp: serverTimestamp()
      });
      navigate('/assessment-success', { state: { email: leadData.email, enterprise: leadData.enterprise } });
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-brand-900/90 backdrop-blur-xl">
      <div className="bg-white rounded-[3rem] w-full max-w-2xl relative p-10 overflow-hidden shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-brand-900"><X size={24} /></button>
        
        {!showLeadForm ? (
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black uppercase text-brand-gold tracking-widest mb-1">Diagnostic Protocol</p>
                <h2 className="text-3xl font-black text-brand-900 uppercase">Step {step + 1} of {QUIZ_QUESTIONS.length}</h2>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-brand-900 leading-tight">{QUIZ_QUESTIONS[step].question}</h3>
              <div className="grid gap-3">
                {QUIZ_QUESTIONS[step].options.map((opt, i) => (
                  <button key={i} onClick={() => handleOptionSelect(opt.score)} className="group flex items-center justify-between p-6 text-left bg-gray-50 border border-gray-100 rounded-2xl hover:border-brand-gold transition-all duration-300">
                    <span className="font-bold text-gray-700">{opt.text}</span>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-brand-gold" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLeadSubmit} className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <Lock size={32} className="mx-auto text-brand-gold mb-4" />
              <h2 className="text-3xl font-black text-brand-900 uppercase tracking-tighter">Secure Your Protocol</h2>
              <p className="text-gray-500 font-medium">Transmit your data to initialize strategic triage.</p>
            </div>
            <div className="grid gap-4">
              <input required placeholder="Full Name" className="w-full p-4 bg-gray-50 border rounded-xl font-bold" onChange={e => setLeadData({...leadData, name: e.target.value})} />
              <input required placeholder="Enterprise Name" className="w-full p-4 bg-gray-50 border rounded-xl font-bold" onChange={e => setLeadData({...leadData, enterprise: e.target.value})} />
              <input required type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 border rounded-xl font-bold" onChange={e => setLeadData({...leadData, email: e.target.value})} />
              <input required placeholder="Phone" className="w-full p-4 bg-gray-50 border rounded-xl font-bold" onChange={e => setLeadData({...leadData, phone: e.target.value})} />
              <Button type="submit" className="w-full py-5 text-sm font-black uppercase tracking-widest">Generate My 2026 Strategy</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FinancialHealthScore;
