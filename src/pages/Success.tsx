/**
 * IWS SOVEREIGNTY - TRIAGE & LEAD CAPTURE
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ShieldCheck, Send, AlertTriangle } from 'lucide-react';

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const { runway, shock, cash } = location.state || { runway: 0, shock: 0, cash: 0 };

  const [formData, setFormData] = useState({ name: '', business: '', whatsapp: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Pushing lead data + simulation results to Firebase
      await addDoc(collection(db, "leads"), {
        ...formData,
        assessment: { runway, shock, cash },
        status: 'new',
        timestamp: serverTimestamp()
      });
      
      // Redirect to a final "Thank You" or directly to Calendly
      alert("Diagnostic Sent. We will contact you via WhatsApp.");
      navigate('/');
    } catch (error) {
      console.error("Transmission Failure:", error);
      alert("Critical Transmission Error. Check Connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-[#0a0c12] border border-white/5 p-10 rounded-3xl space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-brand-gold/10 rounded-full">
              <ShieldCheck className="text-brand-gold" size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Initialize Triage</h2>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">Secure Diagnostic Transmission</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-500 tracking-widest ml-1">Full Name</label>
            <input 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-gold outline-none transition-all text-white"
              placeholder="Full Name"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-500 tracking-widest ml-1">Business Entity</label>
            <input 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-gold outline-none transition-all text-white"
              placeholder="Company Name"
              onChange={(e) => setFormData({...formData, business: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-500 tracking-widest ml-1">WhatsApp (Secure Line)</label>
            <input 
              required
              type="tel"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-brand-gold outline-none transition-all text-white"
              placeholder="+27..."
              onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-gold text-brand-900 font-black uppercase text-xs tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Transmitting..." : "Send Full Diagnostic"} <Send size={14} />
          </button>
        </form>

        <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl">
          <AlertTriangle className="text-brand-gold shrink-0" size={16} />
          <p className="text-[9px] text-gray-500 leading-relaxed font-bold uppercase tracking-tighter">
            By clicking transmit, you authorize a structural audit of your simulation data. All transmissions are encrypted.
          </p>
        </div>
      </div>
    </div>
  );
}
