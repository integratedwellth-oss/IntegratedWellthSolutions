import React, { useState } from 'react';
import { Upload, CreditCard, Building, CheckCircle, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import Button from './Button';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface FormData {
  fullName: string;
  cellphone: string;
  email: string;
  businessName: string;
  sector: string;
  employees: string;
  yearsInOperation: string;
  financialYearEnd: string;
  internalControls: string;
  taxClearance: string;
  lastProvisionalTax: string;
  paymentMethod: 'card' | 'eft' | '';
  proofOfPayment: File | null;
  consent: boolean;
}

const WorkshopRegistrationForm: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '', cellphone: '', email: '', businessName: '', sector: '',
    employees: '', yearsInOperation: '', financialYearEnd: '', internalControls: '',
    taxClearance: '', lastProvisionalTax: '', paymentMethod: '', proofOfPayment: null, consent: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, proofOfPayment: e.target.files![0] }));
    }
  };

  const nextStep = () => setStep(prev => (prev < 3 ? prev + 1 : prev) as 1 | 2 | 3);
  const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : prev) as 1 | 2 | 3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let popUrl = '';
      
      // 1. Upload POP to Firebase Storage if EFT was selected
      if (formData.paymentMethod === 'eft' && formData.proofOfPayment && storage) {
        const fileRef = ref(storage, `workshop_pops/${Date.now()}_${formData.proofOfPayment.name}`);
        const uploadResult = await uploadBytes(fileRef, formData.proofOfPayment);
        popUrl = await getDownloadURL(uploadResult.ref);
      }

      // 2. Save Registration Data to Firestore
      if (db) {
        await addDoc(collection(db, 'workshop_registrations'), {
          fullName: formData.fullName,
          cellphone: formData.cellphone,
          email: formData.email,
          businessName: formData.businessName,
          sector: formData.sector,
          employees: formData.employees,
          yearsInOperation: formData.yearsInOperation,
          financialYearEnd: formData.financialYearEnd,
          internalControls: formData.internalControls,
          taxClearance: formData.taxClearance,
          lastProvisionalTax: formData.lastProvisionalTax,
          paymentMethod: formData.paymentMethod,
          proofOfPaymentUrl: popUrl,
          status: formData.paymentMethod === 'card' ? 'verified' : 'pending_verification',
          timestamp: serverTimestamp()
        });
      }
      
      setStep(3);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-brand-900/5 max-w-4xl mx-auto" id="register-form">
      <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-6">
        <h3 className="text-2xl md:text-3xl font-black text-brand-900 uppercase tracking-tighter">
          {step === 1 ? 'Business Profiling' : step === 2 ? 'Payment Gateway' : 'Registration Secured'}
        </h3>
        {step < 3 && (
          <span className="text-xs font-black text-brand-gold bg-brand-900 px-4 py-2 rounded-full uppercase tracking-widest hidden sm:inline-block">
            Step {step} of 2
          </span>
        )}
      </div>

      {step === 3 ? (
        <div className="text-center py-16">
          <CheckCircle size={80} className="text-green-500 mx-auto mb-8 animate-bounce" />
          <h4 className="text-3xl md:text-4xl font-black text-brand-900 mb-4 tracking-tighter uppercase">Clearance Confirmed</h4>
          <p className="text-lg text-brand-900/60 mb-8 max-w-xl mx-auto font-medium">
            {formData.paymentMethod === 'eft'
              ? 'Your proof of payment is pending manual verification. Our team will issue your calendar invite shortly.'
              : 'Transaction successful. Your automated tax invoice and calendar access have been dispatched to your inbox.'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-brand-900 mb-2">Full Name</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border-transparent rounded-xl focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-medium text-brand-900" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-brand-900 mb-2">Cellphone Number</label>
                <input required type="tel" name="cellphone" value={formData.cellphone} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border-transparent rounded-xl focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-medium text-brand-900" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-brand-900 mb-2">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border-transparent rounded-xl focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-medium text-brand-900" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-brand-900 mb-2">Business Name</label>
                <input required type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border-transparent rounded-xl focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-medium text-brand-900" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-brand-900 mb-2">Business Sector</label>
                <input required type="text" name="sector" value={formData.sector} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border-transparent rounded-xl focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-medium text-brand-900" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-brand-900 mb-2">Number of Employees</label>
                <input required type="number" name="employees" value={formData.employees} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border-transparent rounded-xl focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-medium text-brand-900" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-brand-900 mb-2">Years in Operation</label>
                <input required type="number" name="yearsInOperation" value={formData.yearsInOperation} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border-transparent rounded-xl focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-medium text-brand-900" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-brand-900 mb-2">Financial Year End</label>
                <input required type="date" name="financialYearEnd" value={formData.financialYearEnd} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border-transparent rounded-xl focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-medium text-brand-900" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-brand-900 mb-2">Last Prov. Tax Filed</label>
                <input required type="date" name="lastProvisionalTax" value={formData.lastProvisionalTax} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border-transparent rounded-xl focus:border-brand-gold focus:bg-white focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all font-medium text-brand-900" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-5 p-6 border-2 border-brand-900/5 rounded-2xl mt-4 bg-gray-50/50">
                <label className="flex items-start sm:items-center gap-4 cursor-pointer group">
                  <input type="checkbox" name="internalControls" checked={formData.internalControls === 'yes'} onChange={(e) => setFormData(prev => ({...prev, internalControls: e.target.checked ? 'yes' : 'no'}))} className="mt-1 sm:mt-0 w-6 h-6 text-brand-gold border-gray-300 rounded focus:ring-brand-gold transition-all" />
                  <span className="text-sm font-bold text-brand-900 group-hover:text-brand-gold transition-colors">We have documented internal controls (policies and procedures).</span>
                </label>
                <label className="flex items-start sm:items-center gap-4 cursor-pointer group">
                  <input type="checkbox" name="taxClearance" checked={formData.taxClearance === 'yes'} onChange={(e) => setFormData(prev => ({...prev, taxClearance: e.target.checked ? 'yes' : 'no'}))} className="mt-1 sm:mt-0 w-6 h-6 text-brand-gold border-gray-300 rounded focus:ring-brand-gold transition-all" />
                  <span className="text-sm font-bold text-brand-900 group-hover:text-brand-gold transition-colors">We currently hold a valid tax clearance certificate.</span>
                </label>
              </div>
              <div className="md:col-span-2 pt-6 flex justify-end border-t border-gray-100">
                <Button type="button" onClick={nextStep} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900">
                  Proceed to Payment <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className={`cursor-pointer p-8 border-2 rounded-2xl flex flex-col items-center gap-4 transition-all ${formData.paymentMethod === 'card' ? 'border-brand-gold bg-brand-gold/5 shadow-lg' : 'border-gray-200 hover:border-brand-900/20 bg-gray-50'}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} className="hidden" />
                  <CreditCard size={40} className={formData.paymentMethod === 'card' ? 'text-brand-gold' : 'text-gray-400'} />
                  <span className="font-black text-brand-900 uppercase tracking-widest text-center">Credit / Debit Card</span>
                </label>
                <label className={`cursor-pointer p-8 border-2 rounded-2xl flex flex-col items-center gap-4 transition-all ${formData.paymentMethod === 'eft' ? 'border-brand-gold bg-brand-gold/5 shadow-lg' : 'border-gray-200 hover:border-brand-900/20 bg-gray-50'}`}>
                  <input type="radio" name="paymentMethod" value="eft" checked={formData.paymentMethod === 'eft'} onChange={handleInputChange} className="hidden" />
                  <Building size={40} className={formData.paymentMethod === 'eft' ? 'text-brand-gold' : 'text-gray-400'} />
                  <span className="font-black text-brand-900 uppercase tracking-widest text-center">Manual EFT</span>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="p-8 bg-gray-50 rounded-2xl text-center border-2 border-dashed border-gray-200">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Secure Gateway Initialized</p>
                  <div className="h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm font-medium shadow-inner">
                    [Stripe / PayFast Element Injection Zone]
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'eft' && (
                <div className="p-8 bg-brand-900 text-white rounded-2xl space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Building size={200} />
                  </div>
                  <h4 className="font-black text-brand-gold uppercase tracking-[0.3em] text-sm md:text-base mb-6 border-b border-white/10 pb-4">Corporate Banking Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm font-medium relative z-10">
                    <div className="flex flex-col"><span className="text-brand-100/50 text-xs uppercase tracking-widest mb-1">Bank</span><span className="text-lg">Capitec Business Account</span></div>
                    <div className="flex flex-col"><span className="text-brand-100/50 text-xs uppercase tracking-widest mb-1">Account Name</span><span className="text-lg">INTEGRATEDWELLTH SOLUTIONS (PTY) LTD</span></div>
                    <div className="flex flex-col"><span className="text-brand-100/50 text-xs uppercase tracking-widest mb-1">Account Number</span><span className="text-lg text-brand-gold">1054966877</span></div>
                    <div className="flex flex-col"><span className="text-brand-100/50 text-xs uppercase tracking-widest mb-1">Branch Code</span><span className="text-lg">450105</span></div>
                    <div className="flex flex-col md:col-span-2 mt-4 p-4 bg-white/5 rounded-xl border border-white/10"><span className="text-brand-100/50 text-xs uppercase tracking-widest mb-1">Required Reference</span><span className="text-lg md:text-xl font-black text-white break-all">{formData.businessName || formData.fullName || 'Company / Name'}</span></div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                    <label className="block text-sm font-black text-brand-gold mb-4 uppercase tracking-widest">Transmit Proof of Payment</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-brand-gold/30 rounded-xl cursor-pointer bg-black/20 hover:bg-black/40 hover:border-brand-gold transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                          <Upload className="w-10 h-10 mb-4 text-brand-gold mx-auto" />
                          <p className="mb-2 text-sm text-white font-medium"><span className="font-black text-brand-gold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-brand-100/50 font-bold tracking-widest">PDF, PNG, JPG (MAX 5MB)</p>
                        </div>
                        <input type="file" className="hidden" accept=".pdf,image/*" onChange={handleFileChange} required />
                      </label>
                    </div>
                    {formData.proofOfPayment && (
                      <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                        <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                        <span className="text-sm font-bold text-green-100 truncate">{formData.proofOfPayment.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-8 border-t border-gray-100">
                <label className="flex items-start gap-4 mb-8 cursor-pointer group bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <input required type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} className="mt-1 w-6 h-6 text-brand-gold border-gray-300 rounded focus:ring-brand-gold transition-all flex-shrink-0" />
                  <span className="text-sm font-medium text-brand-900/80 leading-relaxed group-hover:text-brand-900 transition-colors">I consent to IntegratedWellth Solutions processing my entity data to finalize this registration, transmit financial invoices, and send strategic workshop materials.</span>
                </label>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <button type="button" onClick={prevStep} disabled={isSubmitting} className="w-full sm:w-auto justify-center text-brand-900/60 font-black uppercase tracking-widest text-sm flex items-center gap-2 hover:text-brand-900 transition-colors disabled:opacity-50">
                    <ArrowLeft size={18} /> Return
                  </button>
                  <Button type="submit" disabled={isSubmitting || !formData.paymentMethod || (formData.paymentMethod === 'eft' && !formData.proofOfPayment) || !formData.consent} className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest shadow-xl bg-brand-gold text-brand-900 hover:bg-brand-900 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Execute Registration'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default WorkshopRegistrationForm;
