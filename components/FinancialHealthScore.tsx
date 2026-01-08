import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, Activity, ShieldCheck, Lock, User, Building, Mail, Phone } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants';
import Button from './Button';
// Correct relative path from components/ to src/
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FinancialHealthScoreProps {
  isOpen: boolean;
  onClose: () => void;
  isModal?: boolean;
}

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isOpen, onClose, isModal = false }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', enterprise: '', email: '', phone: '' });

  if (!isOpen) return null;

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
    const resultType = score >= 30 ? "Optimized" : score >= 20 ? "Reflection Needed" : "Critical Triage";
    try {
      await addDoc(collection(db, "leads"), { ...leadData, score, resultType, timestamp: serverTimestamp() });
      navigate('/assessment-success', { state: { email: leadData.email, enterprise: leadData.enterprise } });
    } catch (error) {
      console.error("Firebase Sync Error:", error);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      {/* Logic for Quiz/Form rendering here */}
      {!showLeadForm ? (
         <div className="space-y-6">
           <h3 className="text-xl font-bold">{QUIZ_QUESTIONS[step].question}</h3>
           {QUIZ_QUESTIONS[step].options.map((opt, i) => (
             <button key={i} onClick={() => handleOptionSelect(opt.score)} className="block w-full p-4 border rounded-xl hover:border-brand-gold text-left">{opt.text}</button>
           ))}
         </div>
      ) : (
        <form onSubmit={handleLeadSubmit} className="space-y-4">
           <input required placeholder="Full Name" className="w-full p-4 bg-gray-50 rounded-xl" onChange={e => setLeadData({...leadData, name: e.target.value})} />
           <input required placeholder="Enterprise" className="w-full p-4 bg-gray-50 rounded-xl" onChange={e => setLeadData({...leadData, enterprise: e.target.value})} />
           <input required type="email" placeholder="Email" className="w-full p-4 bg-gray-50 rounded-xl" onChange={e => setLeadData({...leadData, email: e.target.value})} />
           <input required placeholder="Phone" className="w-full p-4 bg-gray-50 rounded-xl" onChange={e => setLeadData({...leadData, phone: e.target.value})} />
           <Button type="submit" className="w-full py-4">Generate Roadmap</Button>
        </form>
      )}
    </div>
  );
};

export default FinancialHealthScore;
