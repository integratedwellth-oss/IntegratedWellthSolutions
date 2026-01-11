/**
 * IWS SOVEREIGNTY - LEAD CARD MODULE
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { User, Briefcase, Calendar, ShieldAlert } from 'lucide-react';
import { cn } from '../utils/cn';

interface LeadProps {
  lead: {
    name: string;
    business: string;
    whatsapp: string;
    timestamp: any;
    assessment?: { runway: number; shock: number };
  };
}

export default function LeadCard({ lead }: LeadProps) {
  const date = lead.timestamp?.toDate().toLocaleDateString() || "Pending...";
  const isHighRisk = (lead.assessment?.runway || 0) < 6;

  return (
    <div className="bg-[#0a0c12] border border-white/5 p-6 rounded-2xl hover:border-brand-gold/40 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
      <div className="flex items-center gap-4 flex-1">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center border",
          isHighRisk ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-brand-gold/10 border-brand-gold/20 text-brand-gold"
        )}>
          {isHighRisk ? <ShieldAlert size={18} /> : <User size={18} />}
        </div>
        <div>
          <h4 className="text-white font-black uppercase text-xs tracking-widest">{lead.name}</h4>
          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter flex items-center gap-1">
            <Briefcase size={10} /> {lead.business}
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-1">
        <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Contact Transmission</p>
        <p className="text-xs text-white font-mono">{lead.whatsapp}</p>
      </div>

      <div className="flex-1 space-y-1">
        <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Detection Date</p>
        <p className="text-[10px] text-gray-400 flex items-center gap-1">
          <Calendar size={12} /> {date}
        </p>
      </div>

      <button className="px-4 py-2 bg-white/5 hover:bg-white text-gray-400 hover:text-black text-[9px] font-black uppercase tracking-widest rounded transition-all">
        Open Dossier
      </button>
    </div>
  );
}
