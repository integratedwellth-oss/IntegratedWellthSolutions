/**
 * IWS SOVEREIGNTY - ACCOUNTING COMPLIANCE CHECKLIST
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { CheckCircle2, Circle, AlertTriangle } from 'lucide-react';

export default function ComplianceChecklist() {
  const items = [
    { label: 'Offshore Trust Layering', status: 'missing', risk: 'High' },
    { label: 'Section 12J Exit Strategy', status: 'pending', risk: 'Medium' },
    { label: 'SARS Provisional Alignment', status: 'verified', risk: 'Low' },
    { label: 'CIPC Beneficial Ownership', status: 'missing', risk: 'High' },
  ];

  return (
    <div className="bg-[#0a0c12] border border-white/5 p-6 rounded-3xl space-y-6 font-mono">
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Structural Integrity Audit</h3>
      
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              {item.status === 'verified' ? (
                <CheckCircle2 className="text-emerald-500" size={14} />
              ) : item.status === 'missing' ? (
                <AlertTriangle className="text-red-500" size={14} />
              ) : (
                <Circle className="text-gray-600" size={14} />
              )}
              <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                {item.label}
              </span>
            </div>
            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
              item.risk === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-gray-500/10 text-gray-500'
            }`}>
              {item.risk} Risk
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
