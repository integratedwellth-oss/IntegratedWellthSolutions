import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, Download, Calendar, Clock, ChevronDown, Lock, Activity, Eye } from 'lucide-react';
import Button from './Button';
import ZohoFinanceWidget from './ZohoFinanceWidget';
import { logUserActivity } from '../services/loggingService';

interface UserDashboardProps {
  onTriggerAssessment: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onTriggerAssessment }) => {
  const [assessmentHistory, setAssessmentHistory] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('iws_health_score_results');
    if (saved) setAssessmentHistory(JSON.parse(saved));
    logUserActivity('Command Center', 'POPIA Session Verified');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER BAR */}
        <div className="mb-10 bg-[#134e4a] text-white rounded-[2.5rem] p-8 border-b-8 border-brand-gold shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-brand-gold rounded-3xl flex items-center justify-center text-brand-900 shadow-xl"><ShieldCheck size={32} /></div>
              <div>
                 <h4 className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-2">POPIA Data Protection</h4>
                 <p className="text-brand-100 text-lg font-medium italic opacity-90">Your data is stored in localized SA servers following absolute privacy standards.</p>
              </div>
           </div>
           <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 shadow-inner">
              <Lock size={16} className="text-brand-gold" />
              <span className="text-xs font-black uppercase tracking-widest">Section 18 Compliant</span>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <h1 className="text-5xl md:text-7xl font-black text-brand-900 tracking-tighter uppercase">Command <br/><span className="text-brand-gold italic">Center.</span></h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min')}><Calendar size={16} className="mr-2" /> Book Strategy</Button>
            <Button onClick={onTriggerAssessment}><Clock size={16} className="mr-2" /> Refresh Score</Button>
          </div>
        </div>

        {/* ASSESSMENT REVIEW */}
        {assessmentHistory && (
          <div className="mb-12 bg-white rounded-[2.5rem] p-8 shadow-xl border border-brand-900/5 animate-fadeIn">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full border-4 border-brand-gold flex items-center justify-center font-black text-2xl text-brand-900">{assessmentHistory.totalScore}%</div>
                <h3 className="text-xl font-black text-brand-900 uppercase">Intelligence Rating</h3>
              </div>
              <button onClick={() => setShowHistory(!showHistory)} className="px-6 py-2 bg-gray-50 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold transition-all">Review Logic</button>
            </div>
            {showHistory && (
              <div className="mt-8 pt-8 border-t grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  {Object.entries(assessmentHistory.sections || {}).map(([k, v]: [any, any]) => (
                    <div key={k} className="flex justify-between p-3 bg-gray-50 rounded-xl font-black uppercase text-[10px]"><span>{k}</span> <span>{v}%</span></div>
                  ))}
                </div>
                <div className="bg-brand-900 text-white p-6 rounded-2xl border-l-4 border-brand-gold"><p className="text-xs leading-relaxed italic">Diagnosis: Architecture is stable. Focus on the next growth node.</p></div>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <ZohoFinanceWidget />
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-brand-900/5">
              <h3 className="text-xl font-black text-brand-900 uppercase tracking-tight mb-8 flex justify-between">Secure Vault <Lock size={18} className="text-brand-gold" /></h3>
              <div className="space-y-4">
                {['Feb 2026 Management Accounts.pdf', 'Tax Clearance Certificate.pdf', 'Director Resolution.pdf'].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 group border border-transparent hover:border-brand-gold/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-4"><FileText size={24} className="text-brand-900" /> <span className="font-bold text-sm">{doc}</span></div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-3 bg-white text-gray-400 hover:text-brand-900 rounded-xl"><Eye size={18} /></button>
                      <button className="p-3 bg-brand-900 text-brand-gold rounded-xl"><Download size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 h-full"><div className="bg-brand-900 rounded-[2.5rem] p-8 text-white h-full border border-brand-gold/20"><ShieldCheck size={32} className="text-brand-gold mb-6" /><h3 className="text-xl font-black uppercase tracking-tight mb-8">Compliance Hub</h3><div className="space-y-8">{['CIPC Annual', 'SARS VAT', 'PAYE/UIF', 'COIDA'].map(l => (<div key={l} className="flex justify-between items-center border-b border-white/5 pb-4"><p className="text-[10px] font-black uppercase text-brand-gold">{l}</p><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /></div>))}</div></div></div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
