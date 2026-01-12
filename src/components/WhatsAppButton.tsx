/**
 * IWS SOVEREIGNTY - SECURE LINE BRIDGE (WHATSAPP)
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "27123456789"; // Replace with your actual office number
  const message = encodeURIComponent("I require a structural triage. Please initialize protocol.");

  return (
    <a 
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[90] p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
    >
      <MessageSquare size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
        Secure Line
      </span>
    </a>
  );
}
