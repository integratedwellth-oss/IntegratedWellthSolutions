
export interface Pillar {
  title: string;
  description: string;
  iconName: string;
}

export interface Audience {
  id: string;
  label: string;
  content: string;
  services: string[];
  image?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  type: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface QuizQuestion {
  id: number;
  category?: string;
  question: string;
  options: { text: string; score: number }[];
}

export interface QuizResult {
  score: number;
  archetype: string;
  advice: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
}
