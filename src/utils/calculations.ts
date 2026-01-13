export const calculateSovereignty = (exposure: number, offshore: number) => {
  // Logic: 0 ZAR exposure = 100%. 100% Offshore = +20% boost.
  const exposureRisk = Math.min((exposure / 10000000) * 50, 60); 
  const offshoreStrength = (offshore / 100) * 30;
  
  const rawScore = 90 - exposureRisk + offshoreStrength;
  return Math.min(Math.max(Math.round(rawScore), 5), 99);
};

export const getRequirement = (exposure: number) => {
  return exposure * 0.45; // Suggested 45% offshore shielding
};
