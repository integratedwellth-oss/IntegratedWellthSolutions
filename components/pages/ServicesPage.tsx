import React, { useState } from 'react';
import RevealOnScroll from '../RevealOnScroll';
import NewsTicker from '../NewsTicker';
import Button from '../Button';
import ServicesJourney from '../ServicesJourney';
import { ShieldCheck, Tag, CheckCircle2, ArrowRight, Loader2, Upload, Building, X } from 'lucide-react';
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PACKAGES = [
  { id: 'sys_config', title: 'System Configuration & Setup', regular: 'R3,500.00', special: 'R2,625.00', saving: 'Save R875', note: 'Once-off setup', features: ['Chart of Accounts', 'Bank Account Integration', 'Invoices & Bills Setup', 'Open Balances Setup'] },
  { id: 'monthly_rev', title: 'Monthly Review & Journal Entries', regular: 'R1,500.00', special: 'R1,125.00', saving: 'Save R375', note: 'Per month', features: ['Review monthly expenses', 'GL reconciliations', 'Process journal entries', 'Management accounts'] },
  { id: 'monthly_book', title: 'Monthly Bookkeeping', regular: 'R2,500.00', special: 'R1,875.00', saving: 'Save R625', note: 'Per month', features: ['Bookkeeping services', 'Management Accounts', 'Annual Returns', 'Annual Statements'] },
  { id: 'annual_fin', title: 'Annual Financial Statements & Returns', regular: 'R6,000.00', special: 'R4,500.00', saving: 'Save R1,500', note: 'Per annum', features: ['Turnover: R499k & below', 'Turnover: R500k & above', 'Annual SARS Return', 'Annual CIPC Return'] }
];

const ServicesPage: React.FC = () => {
  const [checkoutPkg, setCheckoutPkg] = useState<any | null>(null);
  const [formData, setFormData] = useState({ fullName: '', email: '', businessName: '', cellphone: '', proofFile: null as File | null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitInvestment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !formData.proofFile) return;
    setIsSubmitting(true);
    try {
      let popUrl = '';
      if (storage) {
        const fileRef = ref(storage, `service_pops/${Date.now()}_${formData.proofFile.name}`);
        const uploadResult = await uploadBytes(fileRef, formData.proofFile);
        popUrl = await getDownloadURL(uploadResult.ref);
      }
      await addDoc(collection(db, 'workshop_registrations'), {
        fullName: formData.fullName,
        email: formData.email,
        businessName: formData.businessName,
        cellphone: formData.cellphone,
        eventName: `Service Investment: ${checkoutPkg.title}`,
        eventDate: checkoutPkg.note,
        eventLink: "https://calendly.com/marcia-kgaphola/new-meeting",
        proofOfPaymentUrl: popUrl,
        status: 'pending_verification',
        timestamp: serverTimestamp()
      });
      await addDoc(collection(db, 'mail'), {
        to: formData.email,
        message: {
          subject: `Investment Received: ${checkoutPkg.title}`,
          html: `<div style="font-family:sans-serif;color:#134e4a;padding:20px;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;">
            <h1 style="color:#d4af37;text-transform:uppercase;letter-spacing:1px;">Investment Initialized</h1>
            <p>Hi ${formData.fullName},</p>
            <p>We have successfully received your Proof of Payment for the <strong>${checkoutPkg.title}</strong> package.</p>
            <p>Our team is currently validating your transfer. Once confirmed, you will receive your system credentials and onboarding calendar invites.</p>
            <p style="margin-top:20px;">Please secure your onboarding discovery slot here: <a href="https://calendly.com/marcia-kgaphola/new-meeting" style="color:#d4af37;font-weight:bold;">Book Onboarding Session</a></p>
          </div>`
        }
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fadeIn bg-white selection:bg-brand-gold/20">
      <div className="bg-brand-900 text-white pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_hsla(174,84%,93%,0.2)_0,transparent_70%)]"></div></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-12">
              <ShieldCheck size={14} className="text-brand-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Strategic Ecosystem</span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-sora font-extrabold tracking-tighter leading-[0.8] mb-12">PILLARS OF <br /> <span className="text-brand-gold italic">PRECISION.</span></h1>
            <p className="text-xl md:text-3xl text-brand-100 max-w-4xl mx-auto font-light leading-relaxed">Accounting handles your history. We engineer your trajectory through multidisciplinary technical IQ and behavioral EQ.</p>
          </RevealOnScroll>
        </div>
      </div>
      <NewsTicker />
      <ServicesJourney />
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 mb-6">
                <Tag size={14} className="text-brand-gold" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-900">April 2026 Offer — Limited Window</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-sora font-black text-brand-900 tracking-tighter mb-4">Accounting <span className="text-brand-gold italic">Packages.</span></h2>
              <p className="text-brand-900/60 text-xl max-w-2xl mx-auto leading-relaxed">Professional financial solutions for South African SMEs. Book before end of April to lock in your discounted rate.</p>
            </div>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((pkg, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.08} width="100%">
                <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-brand-900/5 hover:border-brand-gold hover:bg-white hover:shadow-2xl transition-all duration-500 h-full flex flex-col justify-between group">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-3">0{idx + 1}</div>
                    <h3 className="text-xl font-black text-brand-900 leading-tight mb-6 tracking-tight">{pkg.title}</h3>
                    <ul className="space-y-2 mb-8 flex-grow">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-brand-900/70 font-medium"><CheckCircle2 size={15} className="text-brand-500 flex-shrink-0" /> {f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-brand-900/10 pt-6">
                    <p className="text-xs text-brand-900/40 font-bold line-through mb-1">Regular {pkg.regular}</p>
                    <p className="text-3xl font-black text-brand-900 tracking-tighter">{pkg.special}</p>
                    <div className="flex items-center justify-between mt-2 mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">{pkg.saving}</span>
                      <span className="text-[10px] text-brand-900/40 font-bold">{pkg.note}</span>
                    </div>
                    <Button variant="outline" className="w-full rounded-2xl py-4 font-black uppercase tracking-widest text-[10px] border-brand-900/10 group-hover:border-brand-900 group-hover:bg-brand-900 group-hover:text-white transition-all" onClick={() => setCheckoutPkg(pkg)}>
                      INVEST NOW <ArrowRight size={12} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Service Payment Gate Modal */}
      {checkoutPkg && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-white text-brand-900 w-full max-w-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] relative">
            <button onClick={() => { setCheckoutPkg(null); setIsSuccess(false); }} className="absolute top-8 right-8 p-3 bg-gray-50 rounded-full hover:bg-gray-200 text-brand-900 transition-all"><X size={20} /></button>
            {!isSuccess ? (
              <form onSubmit={handleSubmitInvestment} className="space-y-6">
                <div>
                  <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em]">Onboarding Gateway</span>
                  <h3 className="text-2xl font-black uppercase mt-1">Invest in {checkoutPkg.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                  <input required type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <input required type="text" placeholder="Business Name" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
                  <input required type="tel" placeholder="Cellphone" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl" value={formData.cellphone} onChange={e => setFormData({...formData, cellphone: e.target.value})} />
                </div>
                <div className="bg-brand-900 text-white p-6 rounded-2xl space-y-4">
                  <h4 className="font-black text-brand-gold uppercase tracking-wider text-sm">Corporate Banking Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div><span className="opacity-50 block">Bank</span><span>Capitec Business Account</span></div>
                    <div><span className="opacity-50 block">Account Name</span><span>INTEGRATEDWELLTH SOLUTIONS</span></div>
                    <div><span className="opacity-50 block">Account Number</span><span className="text-brand-gold font-bold">1054966877</span></div>
                    <div><span className="opacity-50 block">Branch Code</span><span>450105</span></div>
                    <div className="col-span-2 bg-white/5 p-3 rounded-lg"><span className="opacity-50 block">Required Reference</span><span className="font-bold">{formData.businessName || formData.fullName || 'Company / Name'}</span></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-brand-900/60">Upload Proof of Payment</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <Upload className="text-brand-gold w-8 h-8 mb-2" />
                    <span className="text-xs font-bold text-gray-500">{formData.proofFile ? formData.proofFile.name : 'Click to upload POP (PDF, PNG, JPG)'}</span>
                    <input required type="file" className="hidden" accept=".pdf,image/*" onChange={e => setFormData({...formData, proofFile: e.target.files?.[0] || null})} />
                  </label>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full py-4 bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900 rounded-xl font-black uppercase tracking-widest text-xs">
                  {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : 'Confirm Investment'}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-6 py-12">
                <CheckCircle2 size={64} className="text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-black uppercase">Investment Initialized</h3>
                <p className="text-gray-600 max-w-sm mx-auto">Your Proof of Payment is pending manual verification. Our team will verify and send your onboarding package to your inbox.</p>
                <Button onClick={() => { setCheckoutPkg(null); setIsSuccess(false); }} className="px-8 py-3 bg-brand-900 text-white rounded-xl font-black uppercase tracking-widest text-xs">Close</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
