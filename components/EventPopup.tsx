
import React from 'react';
import { X, Calendar, MapPin, Clock, ArrowRight, Zap } from 'lucide-react';
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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-brand-900/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_60px_120px_rgba(0,0,0,0.6)] w-full max-w-6xl flex flex-col md:flex-row overflow-hidden border border-white/20 max-h-[95vh] md:max-h-[85vh] backdrop-blur-xl">
        
        {/* Fixed Close Button for Mobile Accessibility */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[70] p-3 bg-brand-900/10 hover:bg-brand-900 hover:text-white rounded-full transition-all shadow-lg border border-brand-900/5 group md:top-8 md:right-8"
        >
          <X size={20} className="transition-transform duration-300 group-hover:rotate-90 md:size-24" />
        </button>

        {/* Media Side - Centered and Contained for Mobile */}
        <div className="w-full md:w-1/2 relative bg-gray-100 md:bg-brand-900 flex items-center justify-center p-4 md:p-0">
           <div className="w-full h-full flex items-center justify-center">
             <img 
                src="https://res.cloudinary.com/dka0498ns/image/upload/v1765658087/Financial_Clarity_For_Non-Financial_Business_Owners._IWS_event_Post_icwvbb.png" 
                alt="Financial Clarity Summit Flyer" 
                className="max-w-full max-h-[40vh] md:max-h-full object-contain md:object-cover shadow-2xl md:shadow-none rounded-xl md:rounded-none"
             />
           </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-6 md:p-20 flex flex-col justify-center relative overflow-y-auto bg-white">
           <div className="max-w-xl space-y-6 md:space-y-12 relative z-10">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 text-brand-gold font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px]">
                   <Zap size={14} className="md:size-16 animate-pulse" />
                   <span>Strategic Event Protocol</span>
                </div>
                <div className="bg-brand-900 inline-block p-6 md:p-10 rounded-2xl md:rounded-[3rem] shadow-2xl">
                  <h2 className="text-2xl md:text-5xl lg:text-6xl font-sora font-extrabold text-white tracking-tighter leading-tight md:leading-[0.9] uppercase">
                     CLARITY <br/> 
                     <span className="text-brand-gold italic">FOR FOUNDERS</span>
                  </h2>
                </div>
              </div>

              <div className="space-y-4 md:space-y-8">
                <p className="text-sm md:text-2xl leading-relaxed font-medium text-brand-900/70 border-l-4 border-brand-gold/30 pl-4 md:pl-8">
                  Stop fearing the numbers. Join <span className="text-brand-900 font-bold">Marcia Kgaphola</span> to demystify 2026 tax compliance and engineer your business for institutional scaling.
                </p>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 md:gap-x-8 md:gap-y-4">
                  {[
                    "Real-time Bookkeeping",
                    "SARS 2026 Blueprint",
                    "Cognitive Loading",
                    "Institutional Wealth"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-brand-900/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-8 bg-brand-50/50 p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-brand-900/5">
                 <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase text-brand-gold tracking-[0.2em]">When</p>
                    <div className="flex items-center gap-2 text-brand-900">
                       <Calendar size={14} className="opacity-40" />
                       <span className="font-black text-xs md:text-sm">28 Feb 2026</span>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase text-brand-gold tracking-[0.2em]">Where</p>
                    <div className="flex items-center gap-2 text-brand-900">
                       <MapPin size={14} className="opacity-40" />
                       <span className="font-black text-xs md:text-sm">Munyaka Estate</span>
                    </div>
                 </div>
              </div>

              <div className="pt-2">
                 <Button 
                    onClick={handleRegister} 
                    size="lg" 
                    className="w-full sm:w-auto rounded-full px-8 md:px-16 py-4 md:py-8 bg-brand-900 text-white font-black uppercase tracking-widest text-[10px] md:text-sm shadow-2xl hover:scale-105 transition-all group flex items-center justify-center gap-2 md:gap-4 border border-white/10"
                 >
                    Secure Your Invitation <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
