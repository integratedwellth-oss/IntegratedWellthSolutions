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
      <div className="relative bg-white/95 rounded-[3.5rem] shadow-[0_60px_120px_rgba(0,0,0,0.6)] w-full max-w-6xl flex flex-col md:flex-row overflow-hidden border border-white/20 max-h-[95vh] md:max-h-[85vh] backdrop-blur-xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-[70] p-3 bg-brand-900/10 hover:bg-brand-900 hover:text-white rounded-full transition-all shadow-lg border border-brand-900/5 group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Media Side */}
        <div className="md:w-1/2 relative h-[300px] md:h-auto bg-brand-900 overflow-hidden">
           <img 
              src="https://res.cloudinary.com/dka0498ns/image/upload/v1765658087/Financial_Clarity_For_Non-Financial_Business_Owners._IWS_event_Post_icwvbb.png" 
              alt="Financial Clarity Summit Flyer" 
              className="w-full h-full object-cover md:object-center opacity-90"
           />
           {/* Visual Border Overlay */}
           <div className="absolute inset-8 border border-white/20 pointer-events-none rounded-3xl" />
           <div className="absolute top-12 left-12 flex flex-col gap-1">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.6em]">Exclusive Admission</span>
           </div>
        </div>

        {/* Content Side */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative overflow-y-auto">
           {/* Decorative Accent */}
           <div className="absolute top-0 right-0 p-24 opacity-[0.03] pointer-events-none">
              <Zap size={400} className="text-brand-900" />
           </div>

           <div className="max-w-xl space-y-10 relative z-10">
              {/* Title Block - Adjusted to 2 lines and reduced font size */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-brand-gold font-black uppercase tracking-[0.4em] text-[10px]">
                   <Zap size={16} className="animate-pulse" />
                   <span>Strategic Event Protocol</span>
                </div>
                <div className="bg-brand-900/80 backdrop-blur-md inline-block p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/10">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-extrabold text-white tracking-tighter leading-[1.1] uppercase">
                     FINANCIAL CLARITY <br/> 
                     <span className="text-brand-gold italic text-2xl md:text-3xl lg:text-4xl block mt-2">FOR FOUNDERS</span>
                  </h2>
                </div>
              </div>

              {/* Body Content */}
              <div className="space-y-6">
                <p className="text-lg md:text-xl leading-relaxed font-medium text-brand-900/70 border-l-4 border-brand-gold/30 pl-6">
                  Stop fearing the numbers. Join <span className="text-brand-900 font-bold">Marcia Kgaphola</span> to demystify 2026 tax compliance and engineer your business for institutional scaling.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-2">
                  {[
                    "Real-time Bookkeeping Stacks",
                    "SARS 2026 Audit-Ready Blueprint",
                    "Cognitive Load Reduction",
                    "Institutional Wealth Strategy"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-900/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Details Row */}
              <div className="grid grid-cols-2 gap-6 bg-brand-50/50 p-6 rounded-[2rem] border border-brand-900/5">
                 <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase text-brand-gold tracking-[0.2em]">When</p>
                    <div className="flex items-center gap-2 text-brand-900">
                       <Calendar size={16} className="opacity-40" />
                       <span className="font-black text-xs">28 Feb 2026</span>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase text-brand-gold tracking-[0.2em]">Where</p>
                    <div className="flex items-center gap-2 text-brand-900">
                       <MapPin size={16} className="opacity-40" />
                       <span className="font-black text-xs">Munyaka Estate</span>
                    </div>
                 </div>
              </div>

              {/* Call to Action */}
              <div className="pt-2">
                 <Button 
                    onClick={handleRegister} 
                    size="lg" 
                    className="w-full sm:w-auto rounded-full px-12 py-6 bg-brand-900 text-white font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition-all group flex items-center justify-center gap-4 border border-white/10"
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
