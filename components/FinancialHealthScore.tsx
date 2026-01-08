import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, Lock } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants'; 
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
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowLeadForm(true);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tier = score >= 35 ? "Optimized" : score >= 20 ? "Reflection Needed" : "Critical Triage";
    try {
      await addDoc(collection(db, "leads"), { ...leadData, score, resultType: tier, timestamp: serverTimestamp() });
      navigate('/assessment-success', { state: { email: leadData.email, enterprise: leadData.enterprise } });
    } catch (err) { console.error(err); }
  };

  return (
    <div className={isModal ? "fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4" : ""}>
      <div className="bg-white rounded-[2rem] p-8 max-w-xl w-full relative shadow-2xl">
        {isModal && <button onClick={onClose} className="absolute top-4 right-4"><X /></button>}
        
        {!showLeadForm ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-brand-900 uppercase">Step {step + 1} of {QUIZ_QUESTIONS.length}</h2>
            <p className="text-lg font-bold">{QUIZ_QUESTIONS[step].question}</p>
            <div className="grid gap-2">
              {QUIZ_QUESTIONS[step].options.map((opt, i) => (
                <button key={i} onClick={() => handleOptionSelect(opt.score)} className="p-4 text-left border rounded-xl hover:border-brand-gold">
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <h2 className="text-xl font-black uppercase text-center">Secure Your Strategy</h2>
            <input required placeholder="Name" className="w-full p-3 bg-gray-50 rounded-lg" onChange={e => setLeadData({...leadData, name: e.target.value})} />
            <input required placeholder="Enterprise" className="w-full p-3 bg-gray-50 rounded-lg" onChange={e => setLeadData({...leadData, enterprise: e.target.value})} />
            <input required type="email" placeholder="Email" className="w-full p-3 bg-gray-50 rounded-lg" onChange={e => setLeadData({...leadData, email: e.target.value})} />
            <input required placeholder="Phone" className="w-full p-3 bg-gray-50 rounded-lg" onChange={e => setLeadData({...leadData, phone: e.target.value})} />
            <Button type="submit" className="w-full py-4 uppercase font-bold">Get My Results</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FinancialHealthScore;
