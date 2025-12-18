import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, BatteryWarning, BrainCircuit, ShieldAlert, CheckCircle } from 'lucide-react';
import Button from '../Button';
import { CONTACT_INFO } from '../../constants';

const AccountabilityPartnership = () => {
  
  const openCalendly = () => {
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: CONTACT_INFO.calendlyUrl });
    } else {
      window.open(CONTACT_INFO.calendlyUrl, '_blank');
    }
  };

  return (
    <div className="pt-20 bg-gray-50">
      
      {/* HERO SECTION */}
      <section className="bg-brand-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-brand-100 mb-6">
              <HeartHandshake size={20} />
              <span className="font-medium">Founder Resilience Program</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">The "Lonely Journey" Ends Here.</h1>
            <p className="text-xl text-brand-100 max-w-3xl mx-auto leading-relaxed">
              Specialized psychological support for the unique demands of entrepreneurship. 
              Protecting your most valuable asset: <span className="text-white font-bold underline decoration-yellow-500">Your Mind.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Entrepreneurship is a Marathon of High-Stakes Pressure.</h2>
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
             <p className="relative z-10 text-xl font-medium text-gray-800 italic text-center my-auto">
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
              <p className="bg-amber-50 p-4 border-l-4 border-amber-400 italic">
                Investing in these resilience sessions isn't just a 'perk'—it is preventative maintenance.
              </p>
              <p>
                By taking a proactive, human-centered approach now, you are protecting yourself from the massive financial 
                and personal costs of future mental health crises, medication, or medical bills. I understand these challenges 
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

      {/* SUBSCRIPTION PLANS - EXACT TEXT MATCH */}
      <section className="py-24 px-4 max-w-7xl mx-auto bg-white" id="plans">
        
        {/* Logo/Header Area */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end">
             <div className="mb-6 md:mb-0">
               <h2 className="text-4xl font-bold text-gray-900 tracking-tight">IWS<span className="text-yellow-600">SOVEREIGN</span></h2>
             </div>
             <div>
                <Button onClick={openCalendly} className="bg-brand-900 text-white hover:bg-brand-800">
                    Book Strategic Intel
                </Button>
             </div>
        </div>

        {/* The 3 Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Strategic Pulse */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-gray-900">Strategic Pulse</h3>
            <p className="text-brand-600 text-xs font-bold uppercase tracking-widest mt-2 mb-4">THE ESSENTIAL SAFETY NET</p>
            
            <h4 className="text-xl font-bold text-gray-900 mb-6">Monthly Subscription</h4>
            
            <ul className="space-y-4 flex-grow mb-8">
                <li className="flex gap-3 text-gray-700 text-sm items-start">
                  <CheckCircle size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Monthly 90-min Deep Dive Session</span>
                </li>
                <li className="flex gap-3 text-gray-700 text-sm items-start">
                  <CheckCircle size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Strategic Goal Tracking</span>
                </li>
                <li className="flex gap-3 text-gray-700 text-sm items-start">
                  <CheckCircle size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Resilience & Burnout Check-in</span>
                </li>
                 <li className="flex gap-3 text-gray-700 text-sm items-start">
                  <CheckCircle size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Email Support</span>
                </li>
                <li className="flex gap-3 text-gray-700 text-sm items-start">
                  <CheckCircle size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>2026 Compliance Guidance</span>
                </li>
            </ul>

            <button 
              onClick={openCalendly}
              className="w-full py-3 rounded-md border border-brand-600 text-brand-600 font-medium hover:bg-brand-50 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Card 2: Growth Partner */}
          <div className="bg-white border-2 border-brand-600 rounded-2xl p-8 flex flex-col h-full relative shadow-xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
              RECOMMENDED
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-2">Growth Partner</h3>
            <p className="text-brand-600 text-xs font-bold uppercase tracking-widest mt-2 mb-4">MOST POPULAR FOR SCALING FOUNDERS</p>
            
            <h4 className="text-xl font-bold text-gray-900 mb-6">Retainer Model</h4>
            
            <ul className="space-y-4 flex-grow mb-8">
                <li className="flex gap-3 text-gray-700 text-sm items-start">
                  <CheckCircle size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Bi-Weekly Strategy Calls</span>
                </li>
                <li className="flex gap-3 text-gray-700 text-sm items-start">
                  <CheckCircle size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Decision-Making Fatigue Support</span>
                </li>
                <li className="flex gap-3 text-gray-700 text-sm items-start">
                  <CheckCircle size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Financial Dashboard Review</span>
                </li>
                <li className="flex gap-3 text-gray-700 text-sm items-start">
                  <CheckCircle size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>WhatsApp Priority Access</span>
                </li>
                 <li className="flex gap-3 text-gray-700 text-sm items-start">
                  <CheckCircle size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Conflict Resolution Support</span>
                </li>
                <li className="flex gap-3 text-gray-700 text-sm items-start">
                  <CheckCircle size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>Quarterly Business Reset</span>
                </li>
            </ul>

            <button 
              onClick={openCalendly}
              className="w-full py-3 rounded-md bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Card 3: Founder Concierge */}
          <div className="bg-brand-900 rounded-2xl p-8 flex flex-col h-full shadow-lg text-white">
            <h3 className="text-2xl font-bold text-white">Founder Concierge</h3>
            <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mt-2 mb-4">TOTAL OPERATIONAL & EMOTIONAL PEACE</p>
            
            <h4 className="text-xl font-bold text-white mb-6">Tailored Retainer</h4>
            
            <ul className="space-y-4 flex-grow mb-8">
                <li className="flex gap-3 text-gray-100 text-sm items-start">
                  <CheckCircle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Weekly Accountability Sprints</span>
                </li>
                <li className="flex gap-3 text-gray-100 text-sm items-start">
                  <CheckCircle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Full Management Accounts Access</span>
                </li>
                <li className="flex gap-3 text-gray-100 text-sm items-start">
                  <CheckCircle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Unlimited Resilience Coaching</span>
                </li>
                 <li className="flex gap-3 text-gray-100 text-sm items-start">
                  <CheckCircle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Operational Bottleneck Solving</span>
                </li>
                <li className="flex gap-3 text-gray-100 text-sm items-start">
                  <CheckCircle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Investor Readiness Partnership</span>
                </li>
                <li className="flex gap-3 text-gray-100 text-sm items-start">
                  <CheckCircle size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Bespoke Strategic Planning</span>
                </li>
            </ul>

            <button 
              onClick={openCalendly}
              className="w-full py-3 rounded-md bg-yellow-600 text-brand-900 font-bold hover:bg-yellow-500 transition-colors"
            >
              Get Started
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AccountabilityPartnership;
