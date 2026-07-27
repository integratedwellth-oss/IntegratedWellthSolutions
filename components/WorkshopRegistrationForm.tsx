import { useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CheckCircle, ArrowRight, ArrowLeft, Upload } from 'lucide-react';

interface Props {
  eventName?: string;
  eventDate?: string;
  eventLink?: string;
}

const WorkshopRegistrationForm = ({
  eventName = "Governance, Recordkeeping & Compliance Workshop",
  eventDate = "22nd May 2026, 18h00 - 20h00",
  eventLink = "https://zoom.us/j/iws-workshop-link"
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    cellphone: '',
    email: '',
    businessName: '',
    sector: '',
    employees: '',
    yearsInOperation: '',
    financialYearEnd: '',
    internalControls: '',
    taxClearance: '',
    lastProvisionalTax: '',
    paymentMethod: '',
    proofOfPayment: null as File | null,
    consent: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

      if (formData.paymentMethod === 'eft' && formData.proofOfPayment && storage) {
        // ─── SECURITY FIX: Use crypto.randomUUID instead of predictable Date.now() ───
        const randomSuffix = crypto.randomUUID();
        const fileRef = ref(storage, `workshop_pops/${randomSuffix}_${formData.proofOfPayment.name}`);
        const uploadResult = await uploadBytes(fileRef, formData.proofOfPayment);
        popUrl = await getDownloadURL(uploadResult.ref);
      }

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
          eventName: eventName,
          eventDate: eventDate,
          eventLink: eventLink,
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
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-[#134e4a] p-6 text-white">
        <h2 className="text-xl font-bold">
          {step === 1 ? 'Business Profiling' : step === 2 ? 'Payment Gateway' : 'Registration Secured'}
        </h2>
        {step < 3 && (
          <p className="text-sm text-white/70 mt-1">Step {step} of 2</p>
        )}
      </div>

      <div className="p-6">
        {step === 3 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#134e4a] mb-2">Clearance Confirmed</h3>
            <p className="text-gray-600">
              {formData.paymentMethod === 'eft'
                ? 'Your proof of payment is pending manual verification. Our team will issue your calendar invite shortly.'
                : 'Transaction successful. Your automated tax invoice and calendar access have been dispatched to your inbox.'}
            </p>
          </div>
        ) : (
          <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cellphone</label>
                  <input
                    type="tel"
                    name="cellphone"
                    value={formData.cellphone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  />
                </div>
                <div className="flex items-start gap-2 mt-4">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                  <label className="text-xs text-gray-500">
                    I consent to the collection and processing of my personal data in accordance with POPIA.
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                  >
                    <option value="">Select method</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="eft">Bank Transfer (EFT)</option>
                  </select>
                </div>

                {formData.paymentMethod === 'eft' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proof of Payment</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                        id="pop-upload"
                      />
                      <label htmlFor="pop-upload" className="text-sm text-[#134e4a] cursor-pointer hover:underline">
                        {formData.proofOfPayment ? formData.proofOfPayment.name : 'Click to upload proof of payment'}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={16} /> Back
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting || (step === 1 && !formData.consent)}
                className="flex-1 px-4 py-3 bg-[#134e4a] text-[#d4af37] rounded-lg font-medium hover:bg-[#0d3a36] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Processing...' : step === 2 ? 'Complete Registration' : 'Continue'}
                {!isSubmitting && step !== 2 && <ArrowRight size={16} />}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default WorkshopRegistrationForm;
