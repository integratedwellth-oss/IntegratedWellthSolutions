import React, { useState } from 'react';
import { AUDIENCES } from '../constants';
import { CheckCircle } from 'lucide-react';

const Audience: React.FC = () => {
  // 1. Ensure we have a default to prevent undefined errors
  const [activeTab, setActiveTab] = useState(AUDIENCES[0]?.id || 'startups');
  
  // 2. Find the content based on the tab
  const activeContent = AUDIENCES.find((a: any) => a.id === activeTab);

  if (!activeContent) return null;

  return (
    <section id="audience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-900">Who We Help</h2>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {AUDIENCES.map((audience: any) => (
            <button
              key={audience.id}
              onClick={() => setActiveTab(audience.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === audience.id
                  ? 'bg-brand-600 text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {audience.label}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200 min-h-[300px]">
          <div className="grid md:grid-cols-2 gap-12 items-center animate-fadeIn">
            <div>
              <h3 className="text-2xl font-bold text-brand-800 mb-4">
                {activeContent.label} Solutions
              </h3>
              <p className="text-lg text-gray-600 mb-6">{activeContent.content}</p>
              <ul className="space-y-3">
                {/* 3. Explicitly type the map parameters here to fix the build error */}
                {activeContent.services.map((service: string, idx: number) => (
                  <li key={idx} className="flex items-center text-gray-700 font-medium">
                    <CheckCircle className="w-5 h-5 text-yellow-500 mr-3" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative h-64 rounded-xl overflow-hidden shadow-inner">
              <img
                src={activeContent.image || `https://picsum.photos/seed/${activeContent.id}/600/400`}
                alt={activeContent.label}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Audience;
