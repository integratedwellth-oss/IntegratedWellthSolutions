/**
 * IWS SOVEREIGNTY - TERMS OF ENGAGEMENT
 * STATUS: POPIA & FSCA COMPLIANT
 */

import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-6 font-mono text-gray-500 uppercase tracking-widest text-[10px]">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="text-4xl font-black text-white italic tracking-tighter lowercase">Terms of Engagement.</h1>
        
        <div className="space-y-8 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-brand-gold font-black underline">1. Simulation Accuracy</h2>
            <p>The War Room and AI Diagnostic tools are intended for structural stress-testing and behavioral analysis. Calculations are based on user-provided data and South African fiscal coefficients. They do not constitute formal tax, legal, or financial advice.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-brand-gold font-black underline">2. No Fiduciary Relationship</h2>
            <p>Accessing this terminal does not establish a fiduciary relationship. Engagement with Integrated Wellth Solutions (IWS) is finalized only upon the signing of a formal structural mandate.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-brand-gold font-black underline">3. Intellectual Property</h2>
            <p>The "Sovereignty Score" and "Wealth Archetype" diagnostic frameworks are the proprietary intellectual property of IWS. Unauthorized reproduction is strictly prohibited.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
