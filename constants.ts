export const CONTACT_INFO = {
  email: "enquiries@integratedwellth.co.za",
  phone: "+27 81 235 5910",
  address: "Pretoria, South Africa",
  calendlyUrl: "https://calendly.com/marcia-kgaphola/new-meeting"
};

export const NAV_LINKS = [
  { label: 'How We Work', hash: '#protocol' },
  { label: 'Services', hash: '#services' },
  { label: 'Who We Help', hash: '#who-we-help' },
  { label: 'Compliance Dates', hash: '#compliance-calendar' },
  { label: 'Our Team', hash: '#team' }
];

export const COMPANY_CONTEXT = `
Integrated Wellth Solutions is a strategic business consultancy founded by Marcia Kgaphola.
We combine financial integrity (IQ) with psychological resilience (EQ).
We help startups, existing businesses, NPOs, and individuals.
`;

export const PILLARS = [
  {
    title: "Financial Integrity",
    description: "Robust accounting and strategic financial services tailored for the South African market.",
    iconName: "ShieldCheck"
  },
  {
    title: "Innovation & AI",
    description: "We leverage AI and smart automation to simplify complex financial processes.",
    iconName: "Calculator"
  },
  {
    title: "Behavioral Wellness",
    description: "Addressing the underlying psychological drivers that influence financial choices.",
    iconName: "Brain"
  }
];

export const AUDIENCES = [
  {
    id: "startups",
    label: "Startups",
    content: "Laying a solid financial foundation for early-stage ventures.",
    services: ["Due Diligence", "Bookkeeping", "Financial Literacy"]
  },
  {
    id: "existing-business",
    label: "Existing Business",
    content: "Growth, optimization, and 2026 tax compliance for established enterprises.",
    services: ["Capacity Assessment", "Tax Compliance", "Financial Modelling"]
  },
  {
    id: "npos",
    label: "NGOs & NPOs",
    content: "Specialized compliance, grant management, and financial oversight.",
    services: ["Compliance Oversight", "Donor Reporting", "PBO Registration"]
  },
  {
    id: "individuals",
    label: "Individuals",
    content: "Personal wealth mapping, career guidance, and tax returns.",
    services: ["Wealth Mapping", "Tax Returns", "Career Guidance"]
  },
  {
    id: "wellness",
    label: "Wellness",
    content: "Empowering individuals to master their internal world and day-to-day finances.",
    services: ["Burnout Prevention", "Mindfulness", "Financial Therapy"]
  },
  {
    id: "accountability",
    label: "Accountability",
    content: "Bridging the gap between strategy and action through founder support.",
    services: ["Strategic Check-ins", "Founder Support", "Goal Tracking"]
  }
];
