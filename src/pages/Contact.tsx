import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Send, CheckCircle2, Loader, Shield } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const [formState, setFormState] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('SENDING');
    
    try {
      // We save this to the same 'leads' collection so it appears in your Admin Deck
      // We give it a score of 0 and a type of 'INQUIRY' to distinguish it
      await addDoc(collection(db, "leads"), {
        name: formData.name,
        email: formData.email,
        enterprise: "DIRECT INQUIRY", // Special tag for the dashboard
        score: 0, // Inquiry, not assessment
        message: formData.message,
        type: 'CONTACT_FORM',
        timestamp: serverTimestamp()
      });
      
      setTimeout(() => setFormState('SUCCESS'), 1000);
    } catch (error) {
      console.error("Transmission Failed", error);
      setFormState('IDLE');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-brand-900 uppercase tracking-tighter mb-6">
            Secure <span className="text-brand-gold">Comms.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Direct line to the War Room. All transmissions are encrypted and prioritized.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* INFO CARD (LEFT) */}
          <div className="bg-brand-900 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden order-2 lg:order-1">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="space-y-10 relative z-10">
              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-4 rounded-2xl flex-shrink-0"><MapPin className="text-brand-gold" size={24}/></div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm text-brand-gold mb-1">HQ Location</h3>
                  <p className="text-lg font-medium leading-relaxed">Munyaka Lifestyle Estate,<br/>Waterfall City, Pretoria</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-4 rounded-2xl flex-shrink-0"><Mail className="text-brand-gold" size={24}/></div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm text-brand-gold mb-1">Digital Comms</h3>
                  <p className="text-lg font-medium">enquiries@integratedwellth.co.za</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-white/10 p-4 rounded-2xl flex-shrink-0"><Phone className="text-brand-gold" size={24}/></div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-sm text-brand-gold mb-1">Direct Line</h3>
                  <p className="text-lg font-medium">+27 74 494 0771</p>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/10">
                <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="w-full py-4 bg-brand-gold text-brand-900 font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 group">
                  <Calendar size={18} className="group-hover:scale-110 transition-transform"/> Book Strategy Session
                </button>
              </div>
            </div>
          </div>

          {/* SECURE TRANSMISSION FORM (RIGHT) - NEW UPGRADE */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl order-1 lg:order-2 relative overflow-hidden">
            {formState === 'SUCCESS' ? (
              <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
                <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mb-6 text-brand-gold">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-black text-brand-900 uppercase mb-2">Transmission Received.</h3>
                <p className="text-gray-500 max-w-sm mb-8">Your message has been encrypted and routed to the Command Deck. Stand by for response.</p>
                <button onClick={() => {setFormState('IDLE'); setFormData({name:'', email:'', message:''})}} className="text-xs font-bold uppercase tracking-widest text-brand-900 underline">Send New Message</button>
              </div>
            ) : null}

            <div className="flex items-center gap-2 text-brand-gold font-bold uppercase text-xs mb-8">
              <Shield size={14} /> Encrypted Protocol
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Identify Yourself</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 bg-gray-50 rounded-xl font-bold text-brand-900 outline-none focus:ring-2 ring-brand-gold border-transparent border-2 focus:bg-white transition-all"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Secure Return Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full p-4 bg-gray-50 rounded-xl font-bold text-brand-900 outline-none focus:ring-2 ring-brand-gold border-transparent border-2 focus:bg-white transition-all"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Intelligence Brief</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 bg-gray-50 rounded-xl font-bold text-brand-900 outline-none focus:ring-2 ring-brand-gold border-transparent border-2 focus:bg-white transition-all resize-none"
                  placeholder="How can we assist your command?"
                />
              </div>

              <button 
                type="submit" 
                disabled={formState === 'SENDING'}
                className="w-full py-5 bg-brand-900 text-white font-black uppercase tracking-widest rounded-xl hover:bg-brand-dark transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === 'SENDING' ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
                {formState === 'SENDING' ? 'Encrypting & Sending...' : 'Initiate Transmission'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
