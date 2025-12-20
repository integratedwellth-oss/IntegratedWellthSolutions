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
    commitment: '',
    challenges: ''
  });

  if (!isOpen) return null;

  // 📝 HELPER: Get dynamic content based on the package selected
  const getPackageContent = (pkg: string) => {
    switch (pkg) {
      case 'Strategic Pulse':
        return {
          headline: "Your Essential Safety Net",
          body: "We are thrilled you've chosen the Strategic Pulse. This is your monthly checkpoint to ensure compliance, track goals, and prevent burnout before it starts.",
          whatsAppTag: "I am ready to secure my safety net."
        };
      case 'Growth Partner':
        return {
          headline: "Scaling Without the Fatigue",
          body: "Welcome to the Growth Partner model. You are taking a major step towards removing decision fatigue and gaining a dedicated strategic ally for your bi-weekly sprints.",
          whatsAppTag: "I am ready to scale with a partner."
        };
      case 'Founder Concierge':
        return {
          headline: "Total Operational Peace",
          body: "We are honored to receive your application for the Founder Concierge. You are prioritizing your peace of mind and operational excellence. We are ready to step in as your full strategic right hand.",
          whatsAppTag: "I need total operational peace."
        };
      default:
        return {
          headline: "Strategic Partnership",
          body: "Thank you for applying for a partnership with Integrated Wellth Solutions. We are reviewing your business profile.",
          whatsAppTag: "I am interested in a partnership."
        };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const packageContent = getPackageContent(packageName);

    try {
      // 1. SAVE TO 'MAIL' COLLECTION (Triggers Dynamic Email)
      await addDoc(collection(db, "mail"), {
        to: formData.email, 
        message: {
          subject: `Application Received: ${packageName}`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <h2 style="color: #004D40;">Application Received: ${packageName}</h2>
              <p>Dear ${formData.name},</p>
              
              <p>${packageContent.body}</p>
              
              <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #bbf7d0; margin: 20px 0;">
                <p style="margin: 0; color: #166534;"><strong>Commitment Period:</strong> ${formData.commitment}</p>
                <p style="margin: 5px 0 0 0; color: #166534;"><strong>Business:</strong> ${formData.businessName}</p>
              </div>

              <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />

              <h3 style="color: #BFA15C;">EXCLUSIVE INVITATION: MASTER YOUR NUMBERS</h3>
              <p>While we review your application, we want to invite you to a session critical for every founder's success:</p>
              
              <div style="border-left: 4px solid #BFA15C; padding-left: 15px; background-color: #f9f9f9; padding: 15px;">
                <p style="margin: 0; font-weight: bold; font-size: 16px;">"Financial Clarity For Non-Financial Business Owners"</p>
                <p style="margin: 5px 0;">📍 <strong>Location:</strong> Munyaka Lifestyle Centre</p>
                <p style="margin: 5px 0;">🎯 <strong>Goal:</strong> Stop guessing. Start mastering your compliance and wealth preservation.</p>
                <br/>
                <a href="https://integratedwellth.co.za/#upcoming-event" style="background-color: #004D40; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Secure Your Seat</a>
              </div>

              <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />

              <p><strong>What happens next?</strong><br/>
              Our Lead Advisor, Marcia, will review your submission. Expect a calendar invite or WhatsApp message within 24 hours to schedule your preliminary assessment call.</p>
              
              <p>To your integrated wealth,</p>
              <p><strong>The Integrated Wellth Solutions Team</strong><br/>
              <a href="https://integratedwellth.co.za" style="color: #004D40;">www.integratedwellth.co.za</a></p>
            </div>
          `
        },
        // Internal Data
        applicantDetails: {
          name: formData.name,
          business: formData.businessName,
          phone: formData.phone,
          commitment: formData.commitment,
          challenge: formData.challenges,
          package: packageName,
          status: 'new_application',
          submittedAt: serverTimestamp()
        }
      });

      // 2. OPEN WHATSAPP (Tailored Message)
      const cleanMessage = `IWS APPLICATION 📝%0A%0APackage: ${packageName}%0AApplicant: ${formData.name}%0ABusiness: ${formData.businessName}%0ACommitment: ${formData.commitment}%0A%0ANote: ${packageContent.whatsAppTag}`;
      
      window.open(`https://wa.me/27812355910?text=${cleanMessage}`, '_blank');

      // 3. CLOSE & RESET
      setIsLoading(false);
      onClose();
      alert(`Application for ${packageName} submitted successfully! Please check your email.`);

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
            <p className="text-brand-200 text-sm mt-1">{getPackageContent(packageName).headline}</p>
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

            {/* Commitment Period Dropdown */}
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
