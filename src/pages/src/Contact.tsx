/**
 * IWS SOVEREIGNTY - SECURE CONTACT TERMINAL
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import { Mail, Phone, ShieldAlert, Send } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for direct inquiry can be added here (Firebase or Email)
    alert("Inquiry transmitted via secure line.");
  };

  return (
    <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-6 font-mono">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        
        {/* Left Side: Identity & Security Notice */}
        <div className="space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Secure Transmission</h1>
            <p className="text-xs text-brand-gold font-bold uppercase tracking-[0.3em]">Direct Engagement Protocol</p>
          </header>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                <Mail size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">sovereignty@iws.wellth</span>
            </div>
            
            <div className="flex items-center gap-4 text-gray-400">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                <Phone size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">+27 (REDACTED)</span>
            </div>
          </div>

          <div className="p-6 bg-brand-gold/5 border border-brand-gold/10 rounded-2xl flex items-start gap-4 mt-12">
            <ShieldAlert className="text-brand-gold shrink-0" size={20} />
            <p className="text-[9px] text-gray-500 leading-relaxed font-bold uppercase tracking-tighter">
              Notice: All communications are encrypted at rest. High-impact structural audits are strictly confidential and subject to NDA.
            </p>
          </div>
        </div>

        {/* Right Side: Triage Form */}
        <form onSubmit={handleSubmit} className="bg-[#0a0c12] border border-white/10 p-10 rounded-3xl space-y-6 shadow-2xl">
          <Input 
            label="Entity Name" 
            placeholder="Corporate / Trust Name" 
            required 
          />
          
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-500 tracking-widest ml-1">Inquiry Type</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-gold outline-none appearance-none cursor-pointer">
              <option className="bg-[#0a0c12]">Tax Sovereignty</option>
              <option className="bg-[#0a0c12]">Asset Shielding</option>
              <option className="bg-[#0a0c12]">Black Swan Readiness</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-500 tracking-widest ml-1">Context</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-gold outline-none h-32 resize-none" 
              placeholder="Briefly describe the fiscal objective..." 
            />
          </div>

          <Button type="submit" fullWidth icon={<Send size={14} />}>
            Initiate Contact
          </Button>
        </form>

      </div>
    </div>
  );
}
