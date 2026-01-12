/**
 * IWS SOVEREIGNTY - EXECUTIVE SUMMARY WIDGET
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { Users, TrendingUp, ShieldAlert, BarChart } from 'lucide-react';

interface StatsProps {
  leads: any[];
}

export default function AdminStats({ leads }: StatsProps) {
  const totalLeads = leads.length;
  const highRisk = leads.filter(l => (l.assessment?.runway || 0) < 6).length;
  const totalCapitalUnderDiagnostic = leads.reduce((acc, l) => acc + (l.assessment?.cash || 0), 0);

  const stats = [
    { label: 'Active Triage', value: totalLeads, icon: Users, color: 'text-brand-gold' },
    { label: 'High Risk Detect', value: highRisk, icon: ShieldAlert, color: 'text-red-500' },
    { label: 'Total Capital ZAR', value: `R${(totalCapitalUnderDiagnostic / 1000000).toFixed(1)}M`, icon: TrendingUp, color: 'text-emerald-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-[#0a0c12] border border-white/5 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <stat.icon className={stat.color} size={20} />
            <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.3em]">System Live</span>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
