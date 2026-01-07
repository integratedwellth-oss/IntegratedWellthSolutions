import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Calendar, Mail } from 'lucide-react';
import Button from '../Button';

const AssessmentSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, enterprise } = location.state || { email: "your inbox", enterprise: "your business" };

  return (
    <div className="pt-40 pb-24 min-h-screen bg-brand-900 text-white flex items-center">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-[3.5rem] p-12 border border-white/20 shadow-2xl">
          <div className="w-20 h-20 bg-brand-gold text-brand-900 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">Protocol Complete</h1>
          <p className="text-xl text-brand-100 mb-8">
            Strategic advice for <span className="text-white font-bold">{enterprise}</span> has been dispatched to <span className="text-brand-gold font-bold">{email}</span>.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Button 
              onClick={() => window.open('https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/', '_blank')} 
              className="py-4 bg-brand-gold text-brand-900 font-bold"
            >
              <Calendar size={18} className="mr-2" /> Join Workshop
            </Button>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline" 
              className="py-4 border-white text-white hover:bg-white/10"
            >
              Return Home <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
          <p className="text-xs text-brand-200 uppercase tracking-widest">Strategic Intelligence Sync: Active</p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentSuccess;
