import React from 'react';
import { User, Phone, Mail, Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function LeadCard({ lead }: { lead: any }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-gold/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold">
          <User size={18} />
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
          {new Date(lead.createdAt?.seconds * 1000).toLocaleDateString()}
        </span>
      </div>
      <h4 className="text-white font-bold uppercase tracking-tight mb-1">{lead.name || 'Anonymous Intelligence'}</h4>
      <div className="space-y-2 text-xs text-gray-400">
        <div className="flex items-center gap-2"><Mail size={12}/> {lead.email}</div>
        <div className="flex items-center gap-2"><Phone size={12}/> {lead.phone || 'No Phone'}</div>
      </div>
      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Exposure Value</div>
        <div className="text-brand-gold font-mono font-bold">{formatCurrency(lead.exposure || 0)}</div>
      </div>
    </div>
  );
}
