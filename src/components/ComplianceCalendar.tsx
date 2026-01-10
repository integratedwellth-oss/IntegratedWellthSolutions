import React from 'react';
import { Calendar, Bell, ShieldCheck, AlertCircle } from 'lucide-react';

const DEADLINES = [
  { month: 'Monthly', task: 'EMP201 (PAYE/UIF/SDL)', type: 'SARS', status: 'Recurring' },
  { month: 'Bi-Monthly', task: 'VAT201 Submissions', type: 'SARS', status: 'Recurring' },
  { month: 'February', task: 'Provisional Tax (1st Period)', type: 'SARS', status: 'Critical' },
  { month: 'August', task: 'Provisional Tax (2nd Period)', type: 'SARS', status: 'Critical' },
  { month: 'Annual', task: 'CIPC Annual Returns', type: 'CIPC', status: 'Governance' },
  { month: 'Annual', task: 'Workmen’s Compensation (COIDA)', type: 'DoL', status: 'Governance' },
];

const ComplianceCalendar = () => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
      <div className="bg-brand-900 p-8 text-white flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold font-sora flex items-center gap-3">
            <Calendar className="text-brand-gold" /> Statutory Compliance Radar
          </h3>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-bold">South African Regulatory Cycle</p>
        </div>
        <div className="hidden md:block">
           <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-black">SYSTEM: MONITORING</span>
        </div>
      </div>

      <div className="p-8">
        <div className="grid gap-4">
          {DEADLINES.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-transparent hover:border-brand-gold/30 hover:bg-white hover:shadow-md transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-16 text-center">
                  <span className="block text-[10px] font-black text-gray-400 uppercase tracking-tighter">{item.month}</span>
                </div>
                <div className="h-10 w-[1px] bg-gray-200"></div>
                <div>
                  <h4 className="font-bold text-brand-900 group-hover:text-brand-gold transition-colors">{item.task}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1 uppercase font-bold tracking-widest">
                    Authority: {item.type}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  item.status === 'Critical' ? 'bg-red-100 text-red-600' : 
                  item.status === 'Governance' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                }`}>
                  {item.status}
                </span>
                <Bell size={16} className="text-gray-300 group-hover:text-brand-gold transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-brand-50 rounded-2xl border border-brand-900/5 flex items-start gap-4">
          <AlertCircle className="text-brand-900 flex-shrink-0" />
          <p className="text-sm text-brand-900/80 leading-relaxed font-medium">
            <strong>The IWS Promise:</strong> We don't just remind you of deadlines; we ensure the governance structures are in place so these submissions are a formality, not a crisis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplianceCalendar;
