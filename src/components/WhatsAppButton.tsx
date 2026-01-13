import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND } from '../constants';

export default function WhatsAppButton() {
  const message = encodeURIComponent("I require a structural shielding audit for my ZAR assets.");
  const url = `https://wa.me/${BRAND.contact.whatsapp}?text=${message}`;

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
    >
      <MessageCircle size={28} />
    </a>
  );
}
