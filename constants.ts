// IntegratedWellthSolutions/constants.ts

export const CONTACT_INFO = {
  email: "enquiries@integratedwellth.co.za",
  phone: "+27 12 345 6789",
  address: "Pretoria, South Africa",
  calendlyUrl: "https://calendly.com/enquiries-integratedwellth/30min"
};

export const COMPANY_CONTEXT = `
Integrated Wellth Solutions is a strategic business consultancy founded by Marcia Kgaphola.
We combine financial integrity (IQ) with psychological resilience (EQ).
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
    content: "Growth, optimization, and 2026 tax compliance.",
    services: ["Capacity Assessment", "Tax Compliance", "Financial Modelling"]
  },
  {
    id: "npos",
    label: "NGOs & NPOs",
    content: "Specialized compliance, grant management, and oversight.",
    services: ["Compliance Oversight", "Donor Reporting", "PBO Registration"]
  },
  {
    id: "individuals",
    label: "Individuals",
    content: "Personal wealth mapping, career guidance, and tax returns.",
    services: ["Wealth Mapping", "Tax Returns", "Career Guidance"]
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "Financial Hygiene",
    question: "Do you have separate bank accounts for business and personal use?",
    options: [
      { text: "Yes, strictly separated", score: 4 },
      { text: "Mostly, but sometimes I mix", score: 2 },
      { text: "No, everything goes into one", score: 0 }
    ]
  },
  {
    id: 2,
    category: "Compliance",
    question: "Are your tax returns (SARS) up to date?",
    options: [
      { text: "Yes, fully compliant", score: 4 },
      { text: "I think so, but unsure", score: 2 },
      { text: "No, I'm behind", score: 0 }
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: "Thabiso N.",
    role: "Director",
    quote: "Integrated Wellth Solutions transformed our chaotic books into a strategic asset.",
    type: "Corporate"
  }
];

export const IWS_CONFIG = {
  firmName: "Integrated Wellth Solutions",
  founder: "Marcia Kgaphola",
  tagline: "Architecture for Sovereignty"
};

// FIXED: Added 'text' and 'score' to match your QuizQuestion interface
export const WAR_ROOM_QUIZ = [
  {
    id: 1,
    category: "Founder Dependency",
    question: "If you stepped away for 30 days, would your revenue remain stable?",
    options: [
      { text: "Yes, fully automated", score: 4 },
      { text: "Partially, but with friction", score: 2 },
      { text: "No, I am the engine", score: 0 }
    ]
  },
  {
    id: 2,
    category: "Structural Risk",
    question: "Are your personal assets legally insulated from your business liabilities?",
    options: [
      { text: "Fully Decoupled", score: 4 },
      { text: "Partially Linked", score: 2 },
      { text: "Totally Exposed", score: 0 }
    ]
  },
  {
    id: 3,
    category: "Compliance",
    question: "Can you provide a clean, audit-ready due diligence folder in 2 hours?",
    options: [
      { text: "Instantly", score: 4 },
      { text: "Within a few days", score: 2 },
      { text: "Not at all", score: 0 }
    ]
  }
];
