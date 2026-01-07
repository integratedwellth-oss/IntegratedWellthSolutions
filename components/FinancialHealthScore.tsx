import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, Activity, ShieldCheck, Lock, User, Building, Mail, Phone } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants';
import Button from './Button';

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
  const [leadData, setLeadData] = useState({ fullName: '', businessName: '', email: '', whatsapp: '' });

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
    // Firebase trigger logic would go here
    navigate('/assessment-success', { 
      state: { email: leadData.email, businessName: leadData.businessName } 
    });
  };

  const content = (
    <div className="space-y-8 p-4">
       {/* Diagnostic Logic and Form UI as previously defined */}
       {!showLeadForm ? (
         <div className="space-y-6">
           <h3 className="text-xl font-bold text-brand-900">{QUIZ_QUESTIONS[step].question}</h3>
           <div className="grid gap-3">
             {QUIZ_QUESTIONS[step].options.map((opt, i) => (
               <button key={i} onClick={() => handleOptionSelect(opt.score)} className="p-4 border rounded-xl hover:border-brand-gold text-left">
                 {opt.text}
               </button>
             ))}
           </div>
         </div>
       ) : (
         <form onSubmit={handleLeadSubmit} className="space-y-4">
           <h3 className="text-xl font-bold">Secure Your 2026 Roadmap</h3>
           <input required placeholder="Full Name" className="w-full p-4 bg-gray-50 rounded-xl" onChange={e => setLeadData({...leadData, fullName: e.target.value})} />
           <input required placeholder="Business Name" className="w-full p-4 bg-gray-50 rounded-xl" onChange={e => setLeadData({...leadData, businessName: e.target.value})} />
           <input required type="email" placeholder="Email" className="w-full p-4 bg-gray-50 rounded-xl" onChange={e => setLeadData({...leadData, email: e.target.value})} />
           <input required placeholder="WhatsApp" className="w-full p-4 bg-gray-50 rounded-xl" onChange={e => setLeadData({...leadData, whatsapp: e.target.value})} />
           <Button type="submit" className="w-full">Generate Report</Button>
         </form>
       )}
    </div>
  );

  return isModal ? (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div className="bg-white rounded-[3rem] max-w-2xl w-full p-8 relative">
        <button onClick={onClose} className="absolute top-6 right-6"><X /></button>
        {content}
      </div>
    </div>
  ) : <div className="bg-white rounded-[3rem] shadow-xl p-8">{content}</div>;
};

export default FinancialHealthScore; // CRITICAL: This must be a default export
