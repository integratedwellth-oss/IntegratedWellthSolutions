import React, { useState, useEffect } from 'react';
import Button from './Button';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('wellth_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('wellth_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-2xl p-4 z-50 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-600">
        We use cookies to ensure you get the best experience on our website. By continuing, you agree to our <a href="#privacy" className="text-brand-600 underline">Privacy Policy</a>.
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={accept}>Accept</Button>
      </div>
    </div>
  );
};

export default CookieConsent;