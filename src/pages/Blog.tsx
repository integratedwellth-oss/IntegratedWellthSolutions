import React from 'react';
import { ArrowUpRight, Calendar, User, Tag } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The CEO Trap: Why Your Business Cannot Survive Without You",
    excerpt: "If you stepped away for 3 months, would your revenue collapse? Here is the blueprint for moving from 'Operator' to 'Owner'.",
    date: "Jan 12, 2026",
    category: "Strategy",
    author: "Marcia Kgaphola",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Silence in the Boardroom: The Cost of Ignoring EQ",
    excerpt: "Financial data tells you 'what' happened. Emotional Intelligence tells you 'why'. How to read the room before you read the balance sheet.",
    date: "Dec 28, 2025",
    category: "Psychology",
    author: "Marcia Kgaphola",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Audit Your Circle: Is Your Network An Asset or Liability?",
    excerpt: "Your personal wealth is directly tied to the governance of those around you. It is time for a relational audit.",
    date: "Nov 15, 2025",
    category: "Governance",
    author: "Team IWS",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 font-inter">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-4 block">Tactical Briefings</span>
          <h1 className="text-4xl md:text-6xl font-black text-brand-900 font-sora mb-6">
            Intelligence <span className="text-brand-gold">Feed.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Insights on wealth preservation, psychological resilience, and corporate governance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1">
                  <Tag size={12} className="text-brand-gold" /> {post.category}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-gray-400 text-xs mb-4 font-medium uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-brand-900 mb-4 leading-tight font-sora group-hover:text-brand-gold transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-500 line-clamp-3 mb-6 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                
                <button className="text-brand-900 font-bold text-sm uppercase tracking-wider flex items-center gap-2 group/btn">
                  Read Briefing <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;
