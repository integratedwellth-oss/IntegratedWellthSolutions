import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, Activity, ShieldCheck, Lock, User, Building, Mail, Phone } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants';
import Button from './Button';

// ✅ IMPORT DATABASE FROM YOUR NEW firebase.ts
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
  
  // ✅ STATE MATCHING YOUR FIREBASE FIELDS
  const [leadData, setLeadData] = useState({
    name: '',
    enterprise: '',
    email: '',
    phone: ''
  });

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

  // ✅ UPDATED SUBMISSION LOGIC
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate resultType for your Detailed Dashboard
    const resultType = score >= 30 ? "Optimized" : score >= 20 ? "Reflection Needed" : "Critical Triage";

    try {
      // 1. Sync data to Firebase leads collection
      await addDoc(collection(db, "leads"), {
        name: leadData.name,
        enterprise: leadData.enterprise,
        email: leadData.email,
        phone: leadData.phone,
        score: score,
        resultType: resultType, 
        timestamp: serverTimestamp()
      });

      // 2. Transition to Success Page with State
      navigate('/assessment-success', { 
        state: { 
          email: leadData.email, 
          enterprise: leadData.enterprise 
        } 
      });
    } catch (error) {
      console.error("Critical Protocol Failure:", error);
      alert("Error syncing with Command Center. Please check your connection.");
    }
  };

  const content = (
    <div className="space-y-8 p-4">
      {!showLeadForm ? (
        <div className="space-y-6">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-black text-brand-900 uppercase">Step {step + 1} of {QUIZ_QUESTIONS.length}</h2>
          </div>
          <h3 className="text-xl font-bold text-brand-900 leading-tight">{QUIZ_QUESTIONS[step].question}</h3>
          <div className="grid gap-3">
            {QUIZ_QUESTIONS[step].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option.score)}
                className="group flex items-center justify-between p-6 text-left bg-white border border-gray-100 rounded-2xl hover:border-brand-gold transition-all duration-300"
              >
                <span className="font-bold text-gray-700">{option.text}</span>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-brand-gold" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn">
          <div className="text-center">
            <Lock size={32} className="mx-auto text-brand-gold mb-4" />
            <h2 className="text-3xl font-black text-brand-900 uppercase tracking-tighter">Secure Your Roadmap</h2>
          </div>
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input required placeholder="Full Name" className="w-full p-4 bg-gray-50 border rounded-xl font-bold" value={leadData.name} onChange={e => setLeadData({...leadData, name: e.target.value})} />
              <input required placeholder="Enterprise Name" className="w-full p-4 bg-gray-50 border rounded-xl font-bold" value={leadData.enterprise} onChange={e => setLeadData({...leadData, enterprise: e.target.value})} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input required type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 border rounded-xl font-bold" value={leadData.email} onChange={e => setLeadData({...leadData, email: e.target.value})} />
              <input required placeholder="Phone Number" className="w-full p-4 bg-gray-50 border rounded-xl font-bold" value={leadData.phone} onChange={e => setLeadData({...leadData, phone: e.target.value})} />
            </div>
            <Button type="submit" className="w-full py-5 text-sm font-black uppercase tracking-widest">Initialize My 2026 Strategy</Button>
          </form>
        </div>
      )}
    </div>
  );

  return isModal ? (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-brand-900/90 backdrop-blur-2xl">
      <div className="bg-white rounded-[3.5rem] w-full max-w-2xl relative p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-brand-900 transition-colors"><X size={24} /></button>
        {content}
      </div>
    </div>
  ) : <div className="bg-white rounded-[3.5rem] border border-gray-100 p-8 md:p-12 shadow-2xl">{content}</div>;
};

export default FinancialHealthScore;
