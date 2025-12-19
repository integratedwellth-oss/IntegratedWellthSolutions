import React, { useState } from 'react';
import { X, Send, CheckCircle, Briefcase, User, Phone, Mail } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, packageName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    revenue: '',
    challenges: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the professional application message
    const message = `*NEW IWS APPLICATION* 📝%0A%0A*Package:* ${packageName}%0A*Applicant:* ${formData.name}%0A*Business:* ${formData.businessName}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Revenue Stage:* ${formData.revenue}%0A*Key Challenge:* ${formData.challenges}%0A%0A_Please review my application for the ${packageName} program._`;
    
    // Open WhatsApp with the pre-filled application
    window.open(`https://wa.me/27763606352?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-brand-900 p-6 flex justify-between items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-3 border border-brand-gold/20">
              <Briefcase size={12} /> Application Phase
            </span>
            <h3 className="text-2xl font-bold text-white font-sora">Apply for {packageName}</h3>
            <p className="text-brand-200 text-sm mt-1">Please provide your details for pre-approval.</p>
          </div>
          <button onClick={onClose} className="text-brand-200 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
          <div className="space-y-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input 
                required
                type="text" 
                placeholder="Full Name"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input 
                  required
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input 
                  required
                  type="tel" 
                  placeholder="WhatsApp No."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Business Name */}
            <div className="relative">
              <Briefcase className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input 
                required
                type="text" 
                placeholder="Registered Business Name"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              />
            </div>

            {/* Revenue Selection */}
            <select 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
              value={formData.revenue}
              onChange={(e) => setFormData({...formData, revenue: e.target.value})}
            >
              <option value="">Select Current Annual Revenue</option>
              <option value="Pre-Revenue">Pre-Revenue (Startup)</option>
              <option value="R0 - R1m">R0 - R1m</option>
              <option value="R1m - R5m">R1m - R5m</option>
              <option value="R5m+">R5m+</option>
            </select>

            {/* Challenge */}
            <textarea 
              rows={3}
              placeholder="What is your biggest operational or financial bottleneck right now?"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none"
              value={formData.challenges}
              onChange={(e) => setFormData({...formData, challenges: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-800 transform hover:scale-[1.02] transition-all shadow-lg shadow-brand-900/20"
          >
            Submit Application <Send size={18} />
          </button>
          
          <p className="text-center text-xs text-gray-400">
            By applying, you agree to a preliminary assessment call.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;
