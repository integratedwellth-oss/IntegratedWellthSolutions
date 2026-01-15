// IntegratedWellthSolutions/constants.ts

export const CONTACT_INFO = {
  email: "enquiries@integratedwellth.co.za",
  phone: "+27 12 345 6789", // Update with actual phone if known
  address: "Pretoria, South Africa",
  calendlyUrl: "https://calendly.com/enquiries-integratedwellth/30min"
};

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

export const QUIZ_QUESTIONS = [
  {
    category: "Financial Hygiene",
    question: "Do you have separate bank accounts for business and personal use?",
    options: [
      { text: "Yes, strictly separated", score: 4 },
      { text: "Mostly, but sometimes I mix", score: 2 },
      { text: "No, everything goes into one", score: 0 }
    ]
  },
  {
    category: "Compliance",
    question: "Are your tax returns (SARS) up to date?",
    options: [
      { text: "Yes, fully compliant", score: 4 },
      { text: "I think so, but unsure", score: 2 },
      { text: "No, I'm behind", score: 0 }
    ]
  },
  {
    category: "Strategy",
    question: "Do you have a clear financial forecast for the next 12 months?",
    options: [
      { text: "Yes, detailed plan", score: 4 },
      { text: "Rough idea in my head", score: 2 },
      { text: "No, I operate day-to-day", score: 0 }
    ]
  },
  {
    category: "Resilience",
    question: "How often do you experience decision fatigue or burnout?",
    options: [
      { text: "Rarely, I have good balance", score: 4 },
      { text: "Sometimes during crunch time", score: 2 },
      { text: "Constantly", score: 0 }
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: "Thabiso N.",
    role: "Director",
    quote: "Integrated Wellth Solutions transformed our chaotic books into a strategic asset. The clarity we gained was immediate.",
    type: "Corporate"
  },
  {
    name: "Sarah L.",
    role: "Founder",
    quote: "Finally, a accountant who understands the stress of entrepreneurship. The coaching aspect changed how I lead.",
    type: "Startup"
  },
  {
    name: "Community Hope",
    role: "Treasurer",
    quote: "Their guidance on NPO compliance ensured we kept our funding and maintained donor trust.",
    type: "NPO"
  }
];

export const IWS_CONFIG = {
 firmName: "Integrated Wellth Solutions",
 founder: "Marcia Kgaphola",
 tagline: "Architecture for Sovereignty",
 pillars: [
 { id: 'structural', title: 'Structural Sovereignty', description: 'Decoupling identity from risk.' },
 { id: 'operational', title: 'Operational Intelligence', description: 'Automated resilience engines.' },
 { id: 'psychological', title: 'Psychological Resilience', description: 'Transitioning from laborer to architect.' }
 ]
};

export const WAR_ROOM_QUIZ = [
 {
 id: 1,
 category: "Founder Dependency",
 question: "If you stepped away for 30 days, would your revenue remain stable?",
 options: ["Yes, fully automated", "Partially, but with friction", "No, I am the engine"]
 },
 {
 id: 2,
 category: "Structural Risk",
 question: "Are your personal assets legally insulated from your business liabilities?",
 options: ["Fully Decoupled", "Partially Linked", "Totally Exposed"]
 },
 {
 id: 3,
 category: "Compliance",
 question: "Can you provide a clean, audit-ready due diligence folder in 2 hours?",
 options: ["Instantly", "Within a few days", "Not at all"]
 }
];
