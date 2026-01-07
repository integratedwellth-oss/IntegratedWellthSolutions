import React from 'react';
import { X, Calendar, MapPin, Clock, Zap } from 'lucide-react';
import Button from './Button';

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-brand-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-[2.5rem] max-w-xl w-full p-10 relative animate-scaleIn shadow-2xl border border-gray-100">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-brand-900"><X size={24} /></button>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <Zap size={14} />
            <span>Exclusive Event invitation</span>
          </div>
          <h2 className="text-3xl font-black text-brand-900 uppercase tracking-tighter mb-4">Financial Clarity Workshop</h2>
          <p className="text-gray-600 font-medium italic">Stop fearing the numbers. Start engineering your legacy.</p>
        </div>

        <div className="space-y-4 mb-10 bg-gray-50 p-6 rounded-2xl">
          <div className="flex items-center text-brand-900 font-bold">
            <Calendar className="w-5 h-5 mr-4 text-brand-gold" />
            <span>Saturday, 28 February 2026</span>
          </div>
          <div className="flex items-center text-brand-900 font-bold">
            <Clock className="w-5 h-5 mr-4 text-brand-gold" />
            <span>09:00 AM - 16:30 PM</span>
          </div>
          <div className="flex items-center text-brand-900 font-bold">
            <MapPin className="w-5 h-5 mr-4 text-brand-gold" />
            <span>Munyaka Lifestyle Estate</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={() => window.open('https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/', '_blank')} className="w-full py-5 text-sm uppercase font-black">Secure Your Seat</Button>
          <button onClick={onClose} className="w-full text-xs text-gray-400 font-bold uppercase hover:text-brand-900 transition-colors">Dismiss Protocol</button>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
