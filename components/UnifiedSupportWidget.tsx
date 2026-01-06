import React from 'react';
import { MessageSquare } from 'lucide-react';

const UnifiedSupportWidget: React.FC = () => {
  return (
    <button 
      onClick={() => window.open('https://wa.link/o1ezvw', '_blank')}
      className="fixed bottom-24 left-6 z-40 bg-brand-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform border border-brand-gold/30"
    >
      <MessageSquare size={24} />
    </button>
  );
};

export default UnifiedSupportWidget;
