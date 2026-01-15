import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Button from './Button';

const EventHighlight: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target Date: Jan 31, 2026
    const targetDate = new Date("Jan 31, 2026 00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const openBooking = () => {
    // Redirect to Quicket for ticket booking
    window.open('https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/', '_blank');
  };

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-brand-50 border border-brand-100 rounded-lg p-3 min-w-[70px] md:min-w-[80px] shadow-sm">
      <span className="text-2xl md:text-3xl font-bold text-brand-900 leading-none">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-wider text-brand-600 font-medium mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <section id="upcoming-event" className="py-16 bg-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 relative h-96 md:h-auto bg-gray-100">
            <img 
              src="https://res.cloudinary.com/dka0498ns/image/upload/v1765658087/Financial_Clarity_For_Non-Financial_Business_Owners._IWS_event_Post_icwvbb.png" 
              alt="Financial Clarity Workshop Flyer" 
              className="w-full h-full object-contain md:object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-2">Exclusive Event</h2>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Financial Clarity For Non-Financial Business Owners</h3>
            <p className="text-gray-600 mb-6">
              Stop fearing the numbers. Join Marcia Kgaphola for a transformative workshop designed to demystify bookkeeping, 2026 tax compliance, and strategic planning.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-3 text-brand-500" />
                <span>Saturday, 28 February 2026</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Clock className="w-5 h-5 mr-3 text-brand-500" />
                <span>09:00 - 16:30</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-3 text-brand-500" />
                <span>Fred Messenger Ave, Pretoria</span>
              </div>
            </div>

            {/* Countdown Section */}
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-center text-sm font-bold text-yellow-800 uppercase mb-3">
                Early Bird Ticket Sales End In:
              </p>
              <div className="flex justify-center gap-3 md:gap-4">
                <TimeBox value={timeLeft.days} label="Days" />
                <TimeBox value={timeLeft.hours} label="Hours" />
                <TimeBox value={timeLeft.minutes} label="Mins" />
                <TimeBox value={timeLeft.seconds} label="Secs" />
              </div>
            </div>

            <Button onClick={openBooking} size="lg" className="w-full md:w-auto">Secure Your Spot</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHighlight;