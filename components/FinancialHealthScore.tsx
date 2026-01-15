
import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import Button from './Button';
import { CONTACT_INFO } from '../constants';
import { CheckCircle2, AlertCircle, TrendingUp, Cpu, Activity, Shield, X, ArrowRight, Sparkles, FileText, Download } from 'lucide-react';
import { generatePDFReport } from '../services/exportService';

interface FinancialHealthScoreProps {
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ isModal = false, isOpen = true, onClose }) => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', enterprise: '', email: '' });

  useEffect(() => {
    if (isModal && isOpen) {
      setStarted(false);
      setCurrentStep(0);
      setScore(0);
      setShowResult(false);
      setShowForm(false);
    }
  }, [isModal, isOpen]);

  if (isModal && !isOpen) return null;

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setScore(newScore);
      setCurrentStep(currentStep + 1);
    } else {
      setScore(newScore);
      setShowForm(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setShowResult(true);
  };

  const getResult = () => {
    // New Max Score is 36 (9 questions * 4 pts)
    if (score >= 28) return {
      persona: "VISIONARY ARCHITECT",
      title: "SOVEREIGN",
      color: "text-brand-500",
      icon: <TrendingUp className="w-12 h-12" />,
      msg: "Legacy Engineering: Optimized for scale. Your structure is ready to support multi-generational wealth succession."
    };
    if (score >= 16) return {
      persona: "THE INTEGRATOR",
      title: "TRANSITIONING",
      color: "text-brand-gold",
      icon: <Activity className="w-12 h-12" />,
      msg: "Bridge Building: You're moving away from founder-dependency. Now is the time to deploy agentic AI to fully decouple."
    };
    return {
      persona: "DAILY LABORER",
      title: "AT RISK",
      color: "text-red-500",
      icon: <Shield className="w-12 h-12" />,
      msg: "Critical Triage: Your business is currently a high-stress job, not an asset. We need an immediate 'Clean Sweep' intervention."
    };
  };

  const handleDownloadBattlePlan = () => {
    const res = getResult();
    generatePDFReport({
      title: "SOVEREIGNTY BATTLE PLAN",
      subtitle: `Enterprise Identity: ${formData.enterprise} | Strategic Persona: ${res.persona}`,
      sections: [
        {
          heading: "Current Trajectory Diagnostics",
          content: `Based on your recent Sovereignty Audit, you have been categorized as ${res.persona}. Your current state is defined as ${res.title}.`,
          table: {
            headers: ["Assessment Metric", "Outcome", "Priority"],
            rows: [
              ["Sovereignty Score", `${score} / 36`, "N/A"],
              ["Persona Type", res.persona, "High"],
              ["Diagnostic Message", res.msg, "Actionable"]
            ]
          }
        },
        {
          heading: "Tactical Response Directives",
          content: [
            "De-bottleneck operational friction points immediately.",
            "Establish a 12-month Compliance Guardrail roadmap.",
            "Bridge the IQ-EQ gap through Neural Resilience coaching.",
            "Prepare for 2026 AI-driven SARS reporting."
          ]
        },
        {
          heading: "Institutional Recommendation",
          content: "We recommend a comprehensive Phase 01: Sovereignty Audit to map the 'Leaks' in your capital and founder-time. The goal is to move from Founder-Dependency to systematic independence."
        }
      ]
    }, `IWS_Battle_Plan_${formData.enterprise.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-900/95 backdrop-blur-xl animate-fadeIn`}>
      <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-1 md:p-1.5 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative futuristic-border">
        
        <div className="bg-white rounded-[2.9rem] p-8 md:p-12 overflow-y-auto max-h-[calc(90vh-1rem)]">
          <button onClick={onClose} className="absolute top-8 right-8 text-brand-900/40 hover:text-brand-900 transition-colors">
            <X size={32} />
          </button>

          {!started ? (
            <div className="text-center space-y-8 py-12">
               <div className="w-20 h-20 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                  <Sparkles size={40} />
               </div>
               <h2 className="text-4xl md:text-6xl font-sora font-extrabold text-brand-900 tracking-tighter uppercase leading-none">
                  FIND YOUR <br/> <span className="text-brand-gold italic">PEACE OF MIND.</span>
               </h2>
               <p className="text-xl text-brand-900/60 max-w-2xl mx-auto leading-relaxed font-medium">
                  Let's take 3 minutes to see where you're at and where you're stuck. <br/>It's time to stop guessing and start <span className="text-brand-900 font-bold">knowing.</span>
               </p>
               <Button onClick={() => setStarted(true)} size="lg" className="rounded-full px-16 py-6 text-xl bg-brand-900 text-white hover:bg-brand-gold transition-all font-black uppercase tracking-widest">
                  Let's Start Your Plan
               </Button>
            </div>
          ) : !showForm && !showResult ? (
            <div className="space-y-12">
               <div className="flex justify-between items-end border-b border-brand-900/10 pb-6">
                  <div>
                    <p className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-2">Clarity Check 0{currentStep + 1}</p>
                    <h3 className="text-2xl font-sora font-black text-brand-900 uppercase tracking-tighter">{QUIZ_QUESTIONS[currentStep].category}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-brand-900/20 text-[10px] font-black mb-1 uppercase tracking-widest">Your Progress</p>
                    <div className="flex gap-1.5">
                      {QUIZ_QUESTIONS.map((_, i) => (
                        <div key={i} className={`w-4 h-1 rounded-full transition-all duration-700 ${i <= currentStep ? 'bg-brand-500 shadow-lg' : 'bg-brand-900/5'}`}></div>
                      ))}
                    </div>
                  </div>
               </div>

               <h2 className="text-3xl md:text-5xl font-black text-brand-900 leading-tight tracking-tighter uppercase">
                  {QUIZ_QUESTIONS[currentStep].question}
               </h2>

               <div className="grid md:grid-cols-2 gap-4">
                  {QUIZ_QUESTIONS[currentStep].options.map((opt, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleAnswer(opt.score)}
                      className="group p-8 text-left rounded-3xl border border-brand-900/5 hover:border-brand-gold bg-brand-50 hover:bg-white hover:shadow-2xl transition-all flex justify-between items-center"
                    >
                      <span className="text-lg font-bold text-brand-900 group-hover:text-brand-gold transition-colors">{opt.text}</span>
                      <div className="w-10 h-10 rounded-full border border-brand-900/10 flex items-center justify-center group-hover:bg-brand-900 group-hover:border-brand-900">
                         <ArrowRight size={18} className="text-brand-gold group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
               </div>
            </div>
          ) : showForm ? (
            <div className="max-w-md mx-auto py-12 space-y-10 text-center">
               <div className="w-16 h-16 bg-brand-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Activity size={32} />
               </div>
               <h3 className="text-4xl font-sora font-black text-brand-900 uppercase tracking-tighter">WE HAVE YOUR ANSWERS.</h3>
               <p className="text-brand-900/60 font-medium">Where should we send your <span className="text-brand-900 font-bold">Business Clarity Report</span>?</p>
               <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                  <input 
                    required 
                    className="w-full bg-brand-50 border border-brand-900/5 rounded-2xl px-6 py-5 text-brand-900 font-bold focus:outline-none focus:border-brand-gold transition-colors"
                    placeholder="YOUR NAME / COMPANY"
                    value={formData.enterprise}
                    onChange={(e) => setFormData({...formData, enterprise: e.target.value})}
                  />
                  <input 
                    required 
                    type="email"
                    className="w-full bg-brand-50 border border-brand-900/5 rounded-2xl px-6 py-5 text-brand-900 font-bold focus:outline-none focus:border-brand-gold transition-colors"
                    placeholder="YOUR BEST EMAIL ADDRESS"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <Button type="submit" className="w-full py-6 rounded-2xl text-base bg-brand-900 text-white font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-brand-gold transition-colors">See My Results</Button>
               </form>
            </div>
          ) : (
            <div className="text-center space-y-12 py-8">
               <div className="flex justify-center">
                  <div className={`p-10 rounded-[3rem] bg-brand-50 shadow-inner ${getResult().color}`}>
                    {getResult().icon}
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles size={16} className="text-brand-gold" />
                    <p className="text-brand-900/40 text-[10px] font-black tracking-[0.4em] uppercase">Your Business Persona</p>
                  </div>
                  <h3 className="text-2xl font-black text-brand-gold tracking-[0.2em]">{getResult().persona}</h3>
                  <h2 className={`text-6xl md:text-8xl font-sora font-extrabold tracking-tighter leading-none ${getResult().color}`}>
                    {getResult().title}
                  </h2>
               </div>
               <p className="text-2xl text-brand-900/60 max-w-2xl mx-auto italic font-medium leading-relaxed">
                  "{getResult().msg}"
               </p>
               <div className="pt-12 flex flex-col md:flex-row justify-center gap-8">
                  <Button size="lg" onClick={handleDownloadBattlePlan} className="rounded-full px-20 py-8 bg-brand-gold text-brand-900 text-xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-4">
                    <Download size={24} /> Download Battle Plan
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => window.open(CONTACT_INFO.calendlyUrl, '_blank')} className="rounded-full px-20 py-8 text-brand-900 text-xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                    Book a Free Clarity Call
                  </Button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
