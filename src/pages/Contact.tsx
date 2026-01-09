import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Send, CheckCircle2, Loader, Shield, Lock } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const [formState, setFormState] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('SENDING');
    try {
      await addDoc(collection(db, "leads"), {
        name: formData.name,
        email: formData.email,
        enterprise: "DIRECT INQUIRY",
        score: 0,
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
    <div className="min-h-screen bg-slate-50 pt-40 pb-20 px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-brand-900 uppercase tracking-tighter mb-6 font-sora">
            Secure <span className="text-brand-gold">Comms.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Direct line to the War Room. All transmissions are encrypted and prioritized.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* INFO CARD (LEFT) */}
          <div className="bg-brand-900 text-white p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            <div className="space-y-12 relative z-10">
              {/* Location */}
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-900 transition-colors duration-300">
                  <MapPin size={24}/>
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-xs text-brand-gold/80 mb-2">HQ Location</h3>
                  <p className="text-lg font-medium leading-relaxed font-sora">574 Fred Messenger Avenue,<br/>Pretoria, South Africa</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-6 group">
                 <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-900 transition-colors duration-300">
                  <Mail size={24}/>
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-xs text-brand-gold/80 mb-2">Digital Comms</h3>
                  <p className="text-lg font-medium font-sora">enquiries@integratedwellth.co.za</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-6 group">
                 <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-900 transition-colors duration-300">
                  <Phone size={24}/>
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-xs text-brand-gold/80 mb-2">Direct Line</h3>
                  <p className="text-lg font-medium font-sora">+27 74 494 0771</p>
                </div>
              </div>
            </div>

            <div className="pt-10 mt-10 border-t border-white/10">
              <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="w-full py-5 bg-brand-gold text-brand-900 font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-colors flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Calendar size={20} className="group-hover:scale-110 transition-transform"/> Book Strategy Session
              </button>
            </div>
          </div>

          {/* STYLISH DARK FORM (RIGHT) - REPLACING THE DULL WHITE BOX */}
          <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-brand-gold/20 shadow-2xl relative overflow-hidden">
            
            {/* SUCCESS STATE */}
            {formState === 'SUCCESS' ? (
              <div className="absolute inset-0 bg-slate-900 z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
                <div className="w-24 h-24 bg-brand-gold rounded-full flex items-center justify-center mb-6 text-brand-900 shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black text-white uppercase mb-2 font-sora">Transmission Received.</h3>
                <p className="text-gray-400 max-w-sm mb-8">Your message has been encrypted and routed to the Command Deck.</p>
                <button onClick={() => {setFormState('IDLE'); setFormData({name:'', email:'', message:''})}} className="text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-white underline transition-colors">Send New Message</button>
              </div>
            ) : null}

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2 text-brand-gold font-bold uppercase text-xs tracking-widest">
                <Shield size={16} /> Encrypted Protocol
              </div>
              <Lock size={16} className="text-gray-500" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Identify Yourself</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 bg-black/40 border border-white/10 rounded-xl font-bold text-white outline-none focus:border-brand-gold/50 focus:bg-black/60 transition-all placeholder-gray-600"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Secure Return Address</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full p-4 bg-black/40 border border-white/10 rounded-xl font-bold text-white outline-none focus:border-brand-gold/50 focus:bg-black/60 transition-all placeholder-gray-600"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Intelligence Brief</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 bg-black/40 border border-white/10 rounded-xl font-bold text-white outline-none focus:border-brand-gold/50 focus:bg-black/60 transition-all resize-none placeholder-gray-600"
                  placeholder="How can we assist your command?"
                />
              </div>

              <button 
                type="submit" 
                disabled={formState === 'SENDING'}
                className="w-full py-5 bg-gradient-to-r from-brand-gold to-yellow-600 text-brand-900 font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4"
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
