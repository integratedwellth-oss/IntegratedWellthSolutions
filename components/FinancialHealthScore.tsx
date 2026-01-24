const QUESTIONS = [
  // SECTION 1: FINANCIAL HYGIENE
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
    category: "Financial Hygiene",
    question: "How often do you review your management accounts?",
    options: [
      { text: "Monthly with a professional", score: 4 },
      { text: "Quarterly or when I remember", score: 2 },
      { text: "Only at year-end for tax", score: 0 }
    ]
  },
  {
    category: "Financial Hygiene",
    question: "Do you have a documented budget for the next 12 months?",
    options: [
      { text: "Yes, detailed and tracked", score: 4 },
      { text: "Rough estimates in my head", score: 2 },
      { text: "No, I operate day-to-day", score: 0 }
    ]
  },

  // SECTION 2: COMPLIANCE & RISK
  {
    category: "Compliance Protocol",
    question: "Are your tax returns (SARS/VAT/PAYE) fully up to date?",
    options: [
      { text: "Yes, 100% compliant", score: 4 },
      { text: "I think so, but unsure", score: 2 },
      { text: "No, I have a backlog", score: 0 }
    ]
  },
  {
    category: "Compliance Protocol",
    question: "Is your CIPC Annual Return current?",
    options: [
      { text: "Yes, filed on time", score: 4 },
      { text: "I don't know", score: 1 },
      { text: "No, might be deregistered", score: 0 }
    ]
  },

  // SECTION 3: STRATEGY & WEALTH
  {
    category: "Strategic Architecture",
    question: "Does your business operate under a Holding Company or Trust structure?",
    options: [
      { text: "Yes, fully structured for protection", score: 4 },
      { text: "Planning to, but not yet", score: 2 },
      { text: "No, just a standard PTY/Sole Prop", score: 0 }
    ]
  },
  {
    category: "Strategic Architecture",
    question: "If you stopped working today, would revenue continue for 3 months?",
    options: [
      { text: "Yes, systems run without me", score: 4 },
      { text: "Maybe for a few weeks", score: 2 },
      { text: "No, income stops immediately", score: 0 }
    ]
  },

  // SECTION 4: PSYCHOLOGY (EQ)
  {
    category: "Founder Resilience",
    question: "How would you rate your financial anxiety level?",
    options: [
      { text: "Low. I have total clarity.", score: 4 },
      { text: "Moderate. Cash flow keeps me up sometimes.", score: 2 },
      { text: "High. I dread looking at the bank account.", score: 0 }
    ]
  },
  {
    category: "Founder Resilience",
    question: "Do you have a dedicated partner/CFO to discuss strategy with?",
    options: [
      { text: "Yes, I have a strategic advisor", score: 4 },
      { text: "I have an accountant, but they just do tax", score: 2 },
      { text: "No, I am on this journey alone", score: 0 }
    ]
  }
];
