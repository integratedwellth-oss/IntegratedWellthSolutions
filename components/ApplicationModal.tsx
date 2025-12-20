import React, { useState } from 'react';
import { X, Send, Briefcase, User, Phone, Mail, Loader2, Calendar } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { db } from '../firebaseConfig'; 

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, packageName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    commitment: '', // Updated from revenue to commitment
    challenges: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. SAVE TO FIREBASE (Using 'mail' collection confirmed working in image_0b044f.png)
      await addDoc(collection(db, "mail"), {
        to: formData.email, 
        message: {
          subject: `Strategic Partnership Application: ${packageName}`,
          html: `
            <h1>Thank you for your application, ${formData.name}!</h1>
            <p>We have received your interest in the <strong>${packageName}</strong> partnership with a <strong>${formData.commitment}</strong> commitment period.</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Our Lead Advisor will review your business profile and current bottlenecks.</li>
              <li>You will receive a calendar invite for your preliminary assessment call within 24 hours.</li>
            </ul>
            <p>We look forward to helping you achieve operational peace.</p>
            <p>Best regards,<br><strong>The Integrated Wellth Solutions Team</strong></p>
          `
        },
        // Meta-data for your internal records
        applicantDetails: {
          name: formData.name,
          business: formData.businessName,
          phone: formData.phone,
          commitment: formData.commitment,
          challenge: formData.challenges,
          package: packageName,
          status: 'new_lead',
          submittedAt: serverTimestamp()
        }
      });

      // 2. OPEN WHATSAPP 
      const cleanMessage = `IWS PARTNERSHIP APPLICATION%0A%0APackage: ${packageName}%0AApplicant: ${formData.name}%0ABusiness: ${formData.businessName}%0ACommitment: ${formData.commitment}%0AChallenge: ${formData.challenges}%0A%0ARequesting preliminary assessment call.`;
      
      window.open(`https://wa.me/27812355910?text=${cleanMessage}`, '_blank');

      // 3. CLOSE & RESET
      setIsLoading(false);
      onClose();
      alert("Application submitted! Check your email for confirmation.");

    } catch (error) {
      console.error("Submission error: ", error);
      setIsLoading(false);
      alert("Error submitting. Please contact us directly on WhatsApp.");
    }
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

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
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input required type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-brand-500 outline-none"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input required type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input required type="tel" placeholder="WhatsApp No." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                  value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>

            <div className="relative">
              <Briefcase className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input required type="text" placeholder="Registered Business Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-brand-500 outline-none"
                value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
            </div>

            {/* Commitment Period Dropdown - UPDATED */}
            <div className="relative">
              <Calendar className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <select required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-600 focus:ring-2 focus:ring-brand-500 outline-none appearance-none"
                value={formData.commitment} onChange={(e) => setFormData({...formData, commitment: e.target.value})} >
                <option value="">Commitment Period</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="9 months">9 months</option>
                <option value="12 months">12 months</option>
              </select>
            </div>

            <textarea rows={3} placeholder="What is your biggest operational or financial bottleneck right now?" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-brand-500 outline-none resize-none"
              value={formData.challenges} onChange={(e) => setFormData({...formData, challenges: e.target.value})} />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-brand-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-800 transition-all shadow-lg disabled:opacity-70" >
            {isLoading ? <Loader2 className="animate-spin" /> : <>Submit Application <Send size={18} /></>}
          </button>
          
          <p className="text-center text-xs text-gray-400">By applying, you agree to a preliminary assessment call.</p>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;
