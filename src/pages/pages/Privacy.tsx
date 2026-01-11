/**
 * IWS SOVEREIGNTY - PRIVACY PROTOCOL (POPIA COMPLIANT)
 */

import React from 'react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-6 font-mono text-gray-500">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Privacy Protocol</h1>
        <div className="space-y-6 text-[11px] leading-relaxed uppercase tracking-widest">
          <p className="text-brand-gold font-black underline">1. DATA ENCAPSULATION</p>
          <p>Integrated Wellth Solutions (IWS) treats fiscal simulation data as highly classified. Under POPIA regulations, your simulation results are encrypted and only accessible by authorized structural auditors.</p>
          
          <p className="text-brand-gold font-black underline">2. BEHAVIORAL ANALYTICS</p>
          <p>We analyze simulation movements to better understand the fiscal psychology of South African founders. This data is used to improve our structural AI diagnostic engine.</p>
          
          <p className="text-brand-gold font-black underline">3. THE "RIGHT TO EXIT"</p>
          <p>Users may request the immediate purging of their lead data from our Firebase instance at any time via a secure line transmission.</p>
        </div>
      </div>
    </div>
  );
}
