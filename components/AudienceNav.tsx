import React from 'react';

interface AudienceNavProps {
  active: 'startups' | 'existing-business' | 'npos' | 'individuals' | 'wellness';
}

const AudienceNav: React.FC<AudienceNavProps> = ({ active }) => {
  const tabs = [
    { id: 'startups', label: 'Startups', link: '#startups' },
    { id: 'existing-business', label: 'Existing Business', link: '#existing-business' },
    { id: 'npos', label: 'NGOs / NPOs', link: '#npos' },
    { id: 'individuals', label: 'Individuals & Teens', link: '#individuals' },
    { id: 'wellness', label: 'Personal Wellness', link: '#wellness' },
  ];

  return (
    <div className="bg-white py-4 border-b border-gray-100 sticky top-16 z-20 shadow-sm/50 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-nowrap md:flex-wrap md:justify-center gap-2 sm:gap-4 min-w-max md:min-w-0 pb-2 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => window.location.hash = tab.link}
              className={`
                px-4 sm:px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap
                ${active === tab.id 
                  ? 'bg-brand-600 text-white shadow-md transform scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 hover:border-brand-200'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudienceNav;