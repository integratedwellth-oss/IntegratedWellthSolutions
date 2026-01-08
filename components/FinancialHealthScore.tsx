import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, Lock } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants'; // Ensure this matches constants.ts
import Button from './Button';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const FinancialHealthScore = ({ isOpen, onClose, isModal = false }: any) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', enterprise: '', email: '', phone: '' });

  if (!isOpen) return null;

  const handleOptionSelect = (optionScore: number) => {
    setScore(score + optionScore);
    // FIX: Corrected spelling from QUI_QUESTIONS to QUIZ_QUESTIONS
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowLeadForm(true);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      console.error("Firebase Sync Error:", error);
    }
  };

  return (
    <div className={isModal ? "fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-brand-900/90 backdrop-blur-md" : ""}>
      <div className="bg-white rounded-[2rem] w-full max-w-2xl p-10 shadow-2xl relative overflow-hidden">
        {isModal && <button onClick={onClose} className="absolute top-8 right-8 text-gray-400"><X size={24} /></button>}
        
        {!showLeadForm ? (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-3xl font-black text-brand-900 uppercase italic tracking-tighter">Step {step + 1} of {QUIZ_QUESTIONS.length}</h2>
            <h3 className="text-xl font-bold text-gray-700 leading-tight">{QUIZ_QUESTIONS[step].question}</h3>
            <div className="grid gap-3">
              {QUIZ_QUESTIONS[step].options.map((opt: any, i: number) => (
                <button key={i} onClick={() => handleOptionSelect(opt.score)} className="group flex items-center justify-between p-6 text-left bg-gray-50 border border-gray-100 rounded-2xl hover:border-brand-gold transition-all duration-300">
                  <span className="font-bold text-gray-700">{opt.text}</span>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-brand-gold" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleLeadSubmit} className="space-y-6">
            <div className="text-center mb-8">
              <Lock size={32} className="mx-auto text-brand-gold mb-2" />
              <h2 className="text-2xl font-black text-brand-900 uppercase italic tracking-tighter">Secure Your Protocol</h2>
            </div>
            <div className="grid gap-4">
              <input required placeholder="Full Name" className="w-full p-4 bg-gray-50 border rounded-xl font-bold" onChange={e => setLeadData({...leadData, name: e.target.value})} />
              <input required placeholder="Enterprise" className="w-full p-4 bg-gray-50 rounded-xl font-bold" onChange={e => setLeadData({...leadData, enterprise: e.target.value})} />
              <input required type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 border rounded-xl font-bold" onChange={e => setLeadData({...leadData, email: e.target.value})} />
              <input required placeholder="Phone Number" className="w-full p-4 bg-gray-50 border rounded-xl font-bold" onChange={e => setLeadData({...leadData, phone: e.target.value})} />
              <Button type="submit" className="w-full py-5 font-black uppercase tracking-widest text-xs">Initialize My Strategy</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FinancialHealthScore;
