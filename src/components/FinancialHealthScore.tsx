import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Lock } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const FinancialHealthScore = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', enterprise: '', email: '' });

  const handleSelect = (val: number) => {
    setScore(s => s + val);
    if (step < QUIZ_QUESTIONS.length - 1) setStep(s => s + 1);
    else setShowForm(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        score,
        tier: score > 10 ? "Optimized" : "Critical",
        timestamp: serverTimestamp()
      });
      navigate('/war-room');
    } catch (err) {
      console.error(err);
    }
  };

  if (showForm) return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <div className="flex items-center gap-2 text-brand-gold font-bold uppercase text-xs mb-6">
        <Lock size={14} /> Encrypted Protocol
      </div>
      <h3 className="text-2xl font-black text-brand-900 mb-6 uppercase">Save Intelligence</h3>
      <form onSubmit={submit} className="space-y-4">
        <input required placeholder="Commander Name" className="w-full p-4 bg-gray-50 rounded-xl font-bold text-brand-900 outline-none focus:ring-2 ring-brand-gold" onChange={e => setFormData({...formData, name: e.target.value})} />
        <input required placeholder="Enterprise Identity" className="w-full p-4 bg-gray-50 rounded-xl font-bold text-brand-900 outline-none focus:ring-2 ring-brand-gold" onChange={e => setFormData({...formData, enterprise: e.target.value})} />
        <input required type="email" placeholder="Secure Comms (Email)" className="w-full p-4 bg-gray-50 rounded-xl font-bold text-brand-900 outline-none focus:ring-2 ring-brand-gold" onChange={e => setFormData({...formData, email: e.target.value})} />
        <button type="submit" className="w-full py-4 bg-brand-900 text-white font-black uppercase tracking-widest rounded-xl hover:bg-brand-gold hover:text-brand-900 transition-all">
          Initialize War Room
        </button>
      </form>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Step {step + 1}/{QUIZ_QUESTIONS.length}</span>
          <span className="text-xs font-black text-brand-gold uppercase tracking-widest">{QUIZ_QUESTIONS[step].category}</span>
        </div>
        
        <h2 className="text-3xl font-bold text-brand-900 mb-8 leading-tight">{QUIZ_QUESTIONS[step].question}</h2>
        
        <div className="space-y-3">
          {QUIZ_QUESTIONS[step].options.map((opt, i) => (
            <button key={i} onClick={() => handleSelect(opt.score)} className="w-full p-6 text-left bg-gray-50 rounded-2xl hover:bg-brand-900 hover:text-white transition-all group flex justify-between items-center">
              <span className="font-bold">{opt.text}</span>
              <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
