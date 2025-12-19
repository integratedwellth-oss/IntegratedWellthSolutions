import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, BatteryWarning, BrainCircuit, ShieldAlert, CheckCircle, Shield, Target, TrendingUp } from 'lucide-react';
import ApplicationModal from '../ApplicationModal';

const AccountabilityPartnership = () => {
  // Modal State Logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const openApplication = (pkg: string) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-20 bg-gray-50 font-sans">
      
      {/* HERO SECTION */}
      <section className="bg-brand-900 text-white py-20 relative overflow-hidden">
        {/* Optional background pattern/image overlay could go here */}
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-brand-100 mb-6 border border-white/10 backdrop-blur-sm">
              <HeartHandshake size={20} className="text-brand-gold" />
              <span className="font-medium font-sora tracking-wide text-brand-gold">IWS Sovereign Membership</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sora leading-tight">
              The "Lonely Journey"<br/>Ends Here.
            </h1>
            <p className="text-xl text-brand-100 max-w-3xl mx-auto leading-relaxed font-light">
              Specialized psychological support for the unique demands of entrepreneurship. 
              Protecting your most valuable asset: <span className="text-white font-bold underline decoration-brand-gold underline-offset-4">Your Mind.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-sora">Entrepreneurship is a Marathon of High-Stakes Pressure.</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              You spend thousands on compliance and marketing, yet neglect the engine that drives it all. 
              This service provides a confidential professional space to navigate decision fatigue, anxiety, and the isolation of leadership.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <BrainCircuit className="text-brand-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Combat Decision Fatigue:</strong> Maintain mental clarity for strategic choices.</span>
              </li>
              <li className="flex items-start gap-3">
                <BatteryWarning className="text-brand-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Prevent Burnout:</strong> Proactive management of your energy and stress levels.</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldAlert className="text-brand-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700"><strong>Resolve Conflict:</strong> Navigate co-founder disputes and leadership isolation.</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-3xl p-8 md:p-12 relative overflow-hidden">
             <div className="absolute top-0 left-0 text-9xl text-gray-200 font-serif leading-none ml-4 -mt-4">“</div>
             <p className="relative z-10 text-xl font-medium text-gray-800 italic text-center my-auto font-serif">
               "The business is only as healthy as the founder. If you break, the business breaks."
             </p>
          </div>
        </div>
      </section>

      {/* PERSONAL NOTE */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-10 md:p-14 rounded-xl shadow-lg border border-amber-100 relative">
            <div className="mb-8 border-b border-gray-100 pb-6">
              <h3 className="text-2xl font-serif font-bold text-gray-800">A Note from my heart to yours</h3>
              <p className="text-gray-500 text-sm mt-1">To the founder reading this at 2 AM</p>
            </div>
            <div className="prose prose-lg text-gray-600 font-serif leading-relaxed">
              <p>
                As an entrepreneur myself, I know that your business is only as healthy as you are. 
                We often spend thousands on compliance, marketing, and technology, yet we neglect the most important asset in the company: 
                <strong> the founder’s mind.</strong>
              </p>
              <p className="bg-amber-50 p-4 border-l-4 border-amber-400 italic rounded-r-lg">
                Investing in these resilience sessions isn't just a 'perk'—it is preventative maintenance.
              </p>
              <p>
                By taking a proactive, human-centered approach now, you are protecting yourself from the massive financial 
                and personal costs of future mental health crises. I understand these challenges 
                because I am walking this path too. Let’s protect your most valuable asset before it reaches a breaking point.
              </p>
            </div>
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-4">
              <img 
                 src="https://res.cloudinary.com/dka0498ns/image/upload/v1766077285/Chartered_Business_Accountant_in_Practice_CIBA_Hons_Psychological_Counselling_Risk_and_Project_Management_ubcpy9.jpg" 
                 alt="Marcia Kgaphola" 
                 className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div>
                <p className="font-bold text-gray-900">Marcia Kgaphola</p>
                <p className="text-sm text-brand-600">Founder & Fellow Traveler</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION PLANS - UPDATED WITH MODAL LOGIC */}
      <section className="py-24 px-4 max-w-7xl mx-auto" id="plans">
        
        {/* Header Area */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-sora">Choose Your Level of Support</h2>
          <p className="text-gray-600">From monthly check-ins to full operational immersion.</p>
        </div>

        {/* The 3 Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Card 1: Strategic Pulse */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col h-full hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-sora">Strategic Pulse</h3>
            <p className="text-brand-500 text-xs font-bold uppercase tracking-wider mb-6">THE ESSENTIAL SAFETY NET</p>
            
            <div className="mb-8">
               <span className="text-xl font-bold text-gray-900">Monthly Subscription</span>
            </div>
            
            <ul className="space-y-4 flex-grow mb-8">
               {[
                 "Monthly 90-min Deep Dive Session",
                 "Strategic Goal Tracking",
                 "Resilience & Burnout Check-in",
                 "Email Support",
                 "2026 Compliance Guidance"
               ].map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-600 text-sm items-start">
                  <CheckCircle size={18} className="text-brand-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
               ))}
            </ul>

            <button 
              onClick={() => openApplication('Strategic Pulse')}
              className="w-full py-4 rounded-xl border-2 border-brand-500 text-brand-600 font-bold hover:bg-brand-50 transition-colors"
            >
              Apply for Access
            </button>
          </div>

          {/* Card 2: Growth Partner */}
          <div className="bg-white border-2 border-brand-500 rounded-3xl p-8 flex flex-col h-full relative shadow-2xl transform lg:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
              Recommended
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-2 font-sora">Growth Partner</h3>
            <p className="text-brand-500 text-xs font-bold uppercase tracking-wider mb-6">MOST POPULAR FOR SCALING FOUNDERS</p>
            
            <div className="mb-8">
              <span className="text-xl font-bold text-gray-900">Retainer Model</span>
            </div>
            
            <ul className="space-y-4 flex-grow mb-8">
               {[
                 "Bi-Weekly Strategy Calls",
                 "Decision-Making Fatigue Support",
                 "Financial Dashboard Review",
                 "WhatsApp Priority Access",
                 "Conflict Resolution Support",
                 "Quarterly Business Reset"
               ].map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-700 text-sm items-start font-medium">
                  <CheckCircle size={18} className="text-brand-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
               ))}
            </ul>

            <button 
              onClick={() => openApplication('Growth Partner')}
              className="w-full py-4 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 shadow-lg shadow-brand-600/30 transition-all"
            >
              Apply for Partnership
            </button>
          </div>

          {/* Card 3: Founder Concierge */}
          <div className="bg-brand-900 rounded-3xl p-8 border border-brand-800 shadow-2xl text-white flex flex-col h-full">
            <h3 className="text-2xl font-bold text-white mb-2 font-sora">Founder Concierge</h3>
            <p className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-6">TOTAL OPERATIONAL & EMOTIONAL PEACE</p>
            
            <div className="mb-8">
              <span className="text-xl font-bold text-white">Tailored Retainer</span>
            </div>
            
            <ul className="space-y-4 flex-grow mb-8">
               {[
                 "Weekly Accountability Sprints",
                 "Full Management Accounts Access",
                 "Unlimited Resilience Coaching",
                 "Operational Bottleneck Solving",
                 "Investor Readiness Partnership",
                 "Bespoke Strategic Planning"
               ].map((item, i) => (
                <li key={i} className="flex gap-3 text-brand-100 text-sm items-start">
                  <Shield size={18} className="text-brand-gold flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
               ))}
            </ul>

            <button 
              onClick={() => openApplication('Founder Concierge')}
              className="w-full py-4 rounded-xl bg-brand-gold text-brand-950 font-black hover:bg-white transition-all shadow-lg shadow-brand-gold/20"
            >
              Apply for Concierge
            </button>
          </div>

        </div>
      </section>

      {/* RENDER THE APPLICATION MODAL */}
      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packageName={selectedPackage} 
      />

    </div>
  );
};

export default AccountabilityPartnership;
