import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, BatteryWarning, BrainCircuit, ShieldAlert, CheckCircle } from 'lucide-react';
import Button from '../Button'; // Assuming you have this shared component
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
    <div className="pt-20 bg-white">
      
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

      {/* THE PROBLEM: FOUNDER BURNOUT */}
      <section className="py-20">
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
             {/* Decorative quote styling */}
             <div className="absolute top-0 left-0 text-9xl text-gray-200 font-serif leading-none ml-4 -mt-4">“</div>
             <p className="relative z-10 text-xl font-medium text-gray-800 italic text-center my-auto">
               "The business is only as healthy as the founder. If you break, the business breaks."
             </p>
          </div>
        </div>
      </section>

      {/* PERSONAL NOTE - "From my heart to yours" */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-10 md:p-14 rounded-xl shadow-lg border border-amber-100 relative">
            {/* Letter Header */}
            <div className="mb-8 border-b border-gray-100 pb-6">
              <h3 className="text-2xl font-serif font-bold text-gray-800">A Note from my heart to yours</h3>
              <p className="text-gray-500 text-sm mt-1">To the founder reading this at 2 AM</p>
            </div>

            {/* Letter Body */}
            <div className="prose prose-lg text-gray-600 font-serif leading-relaxed">
              <p>
                As an entrepreneur myself, I know that your business is only as healthy as you are. 
                We often spend thousands on compliance, marketing, and technology, yet we neglect the most important asset in the company: 
                <strong> the founder’s mind.</strong>
              </p>
              <p>
                Entrepreneurship is a high-pressure environment that, if left unmanaged, leads to chronic burnout, 
                debilitating anxiety, and a total collapse of work-life balance. 
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

            {/* Signature */}
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

      {/* SUBSCRIPTION PLANS */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Retainers for Resilience</h2>
          <p className="text-gray-600 mt-4">Consistent support to keep you performing at your peak.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1: Maintenance */}
          <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow bg-white flex flex-col">
            <h3 className="text-xl font-bold text-gray-900">The Check-In</h3>
            <p className="text-gray-500 text-sm mt-2">Maintenance & Clarity</p>
            <div className="my-6">
              <span className="text-4xl font-bold text-gray-900">Basic</span>
              <span className="text-gray-500"> / month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex gap-3 text-gray-700 text-sm">
                <CheckCircle size={18} className="text-brand-600 flex-shrink-0" />
                1 x 60min Strategy & Venting Session
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <CheckCircle size={18} className="text-brand-600 flex-shrink-0" />
                Monthly "Headspace" Audit
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <CheckCircle size={18} className="text-brand-600 flex-shrink-0" />
                Email Support
              </li>
            </ul>
            <Button onClick={openCalendly} variant="outline" className="w-full justify-center">Start Basic</Button>
          </div>

          {/* Card 2: Growth (Highlighted) */}
          <div className="border-2 border-brand-500 rounded-2xl p-8 shadow-xl bg-white flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-gray-900">The Co-Pilot</h3>
            <p className="text-gray-500 text-sm mt-2">Active Resilience Building</p>
            <div className="my-6">
              <span className="text-4xl font-bold text-gray-900">Growth</span>
              <span className="text-gray-500"> / month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex gap-3 text-gray-700 text-sm">
                <CheckCircle size={18} className="text-brand-600 flex-shrink-0" />
                2 x 60min Deep-Dive Sessions
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <CheckCircle size={18} className="text-brand-600 flex-shrink-0" />
                Decision-Fatigue Analysis
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <CheckCircle size={18} className="text-brand-600 flex-shrink-0" />
                WhatsApp Voice Note Access (Mon-Fri)
              </li>
            </ul>
            <Button onClick={openCalendly} variant="primary" className="w-full justify-center">Start Growth</Button>
          </div>

          {/* Card 3: Premium */}
          <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow bg-gray-50 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900">The Inner Circle</h3>
            <p className="text-gray-500 text-sm mt-2">Intensive Leadership Support</p>
            <div className="my-6">
              <span className="text-4xl font-bold text-gray-900">Premium</span>
              <span className="text-gray-500"> / month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex gap-3 text-gray-700 text-sm">
                <CheckCircle size={18} className="text-brand-600 flex-shrink-0" />
                Weekly 60min Executive Sessions
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <CheckCircle size={18} className="text-brand-600 flex-shrink-0" />
                Priority Crisis Calls
              </li>
              <li className="flex gap-3 text-gray-700 text-sm">
                <CheckCircle size={18} className="text-brand-600 flex-shrink-0" />
                Full Personal & Business Alignment
              </li>
            </ul>
            <Button onClick={openCalendly} variant="outline" className="w-full justify-center">Start Premium</Button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AccountabilityPartnership;
