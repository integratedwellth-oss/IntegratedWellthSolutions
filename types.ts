/**
 * GLOBAL TYPE DEFINITIONS
 * Centrally manages data structures for the IWS ecosystem.
 */

// 1. Audience Segmentation (used in WhoWeHelpPage)
export interface Audience {
  title: string;
  description: string;
  path: string;
}

// 2. Service Pillars (used in Services.tsx)
export interface Pillar {
  title: string;
  description: string;
  details: string[];
}

// 3. Social Proof (used in Testimonials.tsx)
export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  type: 'Founder' | 'Corporate' | 'Individual';
}

// 4. Sovereign Diagnostic Logic (used in FinancialHealthScore.tsx)
export interface QuizOption {
  text: string;
  score: number;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

// 5. Intelligence Lead Data (matches your Firebase structure)
export interface Lead {
  id?: string;
  name: string;
  enterprise: string;
  email: string;
  phone: string;
  score: number;
  resultType: string;
  timestamp?: any;
}
