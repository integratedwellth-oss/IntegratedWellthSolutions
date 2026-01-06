import React from 'react';
import { X, Calendar, MapPin, ArrowRight, Zap } from 'lucide-react';
import Button from './Button';

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleRegister = () => {
    window.open('https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/', '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-brand-900/95 backdrop-blur-2xl animate-fadeIn">
      <div className="relative bg-white rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] w-full max-w-6xl flex flex-col md:flex-row overflow-hidden border border-white/10 max-h-[95vh] md:max-h-[85vh]">
        <button onClick={onClose} className="absolute top-4 right-4 md:top-8 md:right-8 z-[60] p-2 bg-white/80 hover:bg-brand-900 hover:text-white rounded-full transition-all shadow-lg"><X size={20} /></button>
        <div className="md:w-1/2 relative h-72 md:h-auto bg-brand-50 flex items-center justify-center p-4 md:p-8 border-b md:border-b-0 md:border-r border-brand-900/5">
           <img src="https://res.cloudinary.com/dka0498ns/image/upload/v1765658087/Financial_Clarity_For_Non-Financial_Business_Owners._IWS_event_Post_icwvbb.png" alt="Event Flyer" className="w-full h-full object-contain drop-shadow-2xl" />
        </div>
        <div className="md:w-1/2 p-6 md:p-16 flex flex-col justify-center bg-white relative overflow-y-auto">
           <div className="space-y-8 relative z-10">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-sora font-extrabold text-brand-900 tracking-tighter leading-[0.95] uppercase">FINANCIAL CLARITY <br/> <span className="text-brand-gold italic">FOR FOUNDERS.</span></h2>
              <p className="text-lg md:text-xl text-brand-900/70 leading-relaxed font-medium">Stop fearing the numbers. Join <strong>Marcia Kgaphola</strong> for a transformative summit designed to demystify 2026 tax compliance.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-brand-50/50 p-6 rounded-3xl border border-brand-900/5">
                 <div className="flex items-start gap-3"><Calendar size={18} className="text-brand-900" /><div><p className="text-[9px] font-black uppercase text-brand-900/40">Date</p><p className="text-sm font-bold text-brand-900">28 Feb 2026</p></div></div>
                 <div className="flex items-start gap-3"><MapPin size={18} className="text-brand-900" /><div><p className="text-[9px] font-black uppercase text-brand-900/40">Location</p><p className="text-sm font-bold text-brand-900">Munyaka Estate</p></div></div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                 <Button onClick={handleRegister} className="w-full sm:w-auto rounded-full px-10 py-6 bg-brand-900 text-white font-black uppercase shadow-xl hover:scale-105 transition-all group">Secure Invitation <ArrowRight className="ml-3 group-hover:translate-x-1" /></Button>
                 <button onClick={onClose} className="text-brand-900/30 font-black uppercase text-xs hover:text-brand-900 transition-colors">I'll gain clarity later</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
