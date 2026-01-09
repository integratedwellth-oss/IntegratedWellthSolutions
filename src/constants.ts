export const QUIZ_QUESTIONS = [
  // SECTION 1: FINANCIAL IQ
  {
    category: "Financial Hygiene",
    question: "How often are your management accounts reconciled and reviewed?",
    options: [
      { text: "Annually (Only for tax season)", score: 1 },
      { text: "Quarterly (Catch-up)", score: 2 },
      { text: "Monthly (Standard)", score: 3 },
      { text: "Weekly/Continuous (Real-time intel)", score: 4 }
    ]
  },
  {
    category: "Financial Hygiene",
    question: "Do you have a documented 12-month cash flow forecast?",
    options: [
      { text: "No, I run on bank balance.", score: 1 },
      { text: "Rough mental estimate.", score: 2 },
      { text: "Yes, distinct from the budget.", score: 3 },
      { text: "Yes, stress-tested for scenarios.", score: 4 }
    ]
  },
  {
    category: "Financial Hygiene",
    question: "Is your personal wealth separated from business capital?",
    options: [
      { text: "No, it's all one pot.", score: 1 },
      { text: "Mostly, but I dip in occasionally.", score: 2 },
      { text: "Yes, clear separation.", score: 3 },
      { text: "Yes, with a holding structure.", score: 4 }
    ]
  },
  
  // SECTION 2: BEHAVIORAL EQ
  {
    category: "Founder Psychology",
    question: "How dependent is the business on your daily presence?",
    options: [
      { text: "It stops if I stop.", score: 1 },
      { text: "Decisions wait for me.", score: 2 },
      { text: "Teams run operations, I lead strategy.", score: 3 },
      { text: "Fully autonomous (Legacy Ready).", score: 4 }
    ]
  },
  {
    category: "Founder Psychology",
    question: "How would you rate your decision fatigue levels?",
    options: [
      { text: "Overwhelming / Burnout imminent.", score: 1 },
      { text: "High stress, constant firefighting.", score: 2 },
      { text: "Manageable pressure.", score: 3 },
      { text: "Clear, calm, strategic.", score: 4 }
    ]
  },
  {
    category: "Founder Psychology",
    question: "Do you have a succession plan in place?",
    options: [
      { text: "No plan.", score: 1 },
      { text: "Vague idea in my head.", score: 2 },
      { text: "Documented but not communicated.", score: 3 },
      { text: "Fully legal and communicated plan.", score: 4 }
    ]
  },

  // SECTION 3: SYSTEM EFFICIENCY
  {
    category: "Digital Maturity",
    question: "How manual are your administrative workflows?",
    options: [
      { text: "100% Manual / Paper-based.", score: 1 },
      { text: "Excel heavy / Disconnected apps.", score: 2 },
      { text: "Cloud accounting + some tools.", score: 3 },
      { text: "Fully integrated tech stack.", score: 4 }
    ]
  },
  {
    category: "Digital Maturity",
    question: "Are your tax submissions automated or manual triage?",
    options: [
      { text: "Panic at the deadline.", score: 1 },
      { text: "Manual preparation every time.", score: 2 },
      { text: "Outsourced but reactive.", score: 3 },
      { text: "Automated & proactive compliance.", score: 4 }
    ]
  }
];
