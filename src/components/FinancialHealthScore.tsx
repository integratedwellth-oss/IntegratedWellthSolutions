import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Lock, Activity, CheckCircle2 } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const FinancialHealthScore = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', enterprise: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleSelect = (val: number) => {
    setScore(s => s + val);
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(s => s + 1);
    } else {
      setShowForm(true);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        score,
        totalQuestions: QUIZ_QUESTIONS.length,
        tier: score > 25 ? "Optimized" : "Critical",
        type: 'FULL_DIAGNOSTIC',
        timestamp: serverTimestamp()
      });
      // Navigate to War Room to show them the result of their survival
      navigate('/war-room'); 
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const progress = ((step + 1) / QUIZ_QUESTIONS.length) * 100;

  if (showForm) return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-[2.5rem] shadow-2xl border border-brand-gold/20 animate-in fade-in zoom-in duration-300">
      <div className="flex items-center gap-2 text-brand-gold font-bold uppercase text-xs mb-6 tracking-widest">
        <Lock size={14} /> Analysis Complete
      </div>
      <h3 className="text-3xl font-black text-brand-900 mb-2 font-sora">Save Intelligence.</h3>
      <p className="text-gray-500 mb-8 text-sm">Your diagnostic score is ready. Enter your credentials to unlock the War Room report.</p>
      
      <form onSubmit={submit} className="space-y-4">
        <input required placeholder="Commander Name" className="w-full p-4 bg-gray-50 rounded-xl font-bold text-brand-900 outline-none focus:ring-2 ring-brand-gold transition-all" onChange={e => setFormData({...formData, name: e.target.value})} />
        <input required placeholder="Enterprise Identity" className="w-full p-4 bg-gray-50 rounded-xl font-bold text-brand-900 outline-none focus:ring-2 ring-brand-gold transition-all" onChange={e => setFormData({...formData, enterprise: e.target.value})} />
        <input required type="email" placeholder="Secure Comms (Email)" className="w-full p-4 bg-gray-50 rounded-xl font-bold text-brand-900 outline-none focus:ring-2 ring-brand-gold transition-all" onChange={e => setFormData({...formData, email: e.target.value})} />
        
        <button type="submit" disabled={loading} className="w-full py-4 bg-brand-900 text-white font-black uppercase tracking-widest rounded-xl hover:bg-brand-gold hover:text-brand-900 transition-all shadow-lg flex justify-center items-center gap-2">
          {loading ? 'Processing...' : 'Unlock Report'} <ChevronRight size={16} />
        </button>
      </form>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
      {/* HEADER */}
      <div className="bg-brand-900 p-8 text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Activity className="text-brand-gold" />
          <span className="font-bold uppercase tracking-widest text-sm">Live Diagnostic</span>
        </div>
        <span className="text-brand-gold font-black text-xl font-mono">
          {step + 1}<span className="text-white/30 text-sm">/{QUIZ_QUESTIONS.length}</span>
        </span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full h-1 bg-brand-900/10">
        <div className="h-full bg-brand-gold transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
      
      {/* QUESTION BODY */}
      <div className="p-8 md:p-12">
        <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-900 text-[10px] font-black uppercase tracking-widest mb-6 border border-brand-200">
          {QUIZ_QUESTIONS[step].category}
        </span>
        
        <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-10 leading-tight font-sora">
          {QUIZ_QUESTIONS[step].question}
        </h2>
        
        <div className="grid gap-4">
          {QUIZ_QUESTIONS[step].options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handleSelect(opt.score)} 
              className="w-full p-6 text-left bg-white border-2 border-gray-100 rounded-2xl hover:border-brand-gold hover:bg-brand-50/50 transition-all group flex justify-between items-center shadow-sm hover:shadow-md"
            >
              <span className="font-bold text-gray-700 group-hover:text-brand-900">{opt.text}</span>
              <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold text-white transition-all">
                <CheckCircle2 size={16} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
