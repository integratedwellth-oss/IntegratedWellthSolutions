
import React, { useState, useEffect } from 'react';
import BlogPost from '../BlogPost';
import BlogEditor from '../BlogEditor';
import RevealOnScroll from '../RevealOnScroll';
import { Plus, Search, Filter, ArrowRight, Zap, Edit2, Trash2, Clock, Sparkles } from 'lucide-react';
import Button from '../Button';
import { BlogPost as BlogPostType } from '../../types';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostType | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    // Load posts from localStorage or use defaults
    const savedPosts = localStorage.getItem('iws_blog_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const initialPosts: BlogPostType[] = [
        {
          id: '1',
          title: "South Africa's 2026 Tax Compliance Blueprint",
          category: "Compliance Blueprint",
          date: "February 10, 2026",
          excerpt: "As SARS transitions to an AI-driven monitoring framework, SMMEs must rethink their reporting protocols to avoid immediate anomalies.",
          content: "## The Shift to AI-Driven Audits\n\nSARS is no longer just looking at your numbers; they are looking at the **relationships** between your data streams. Bank feeds, e-filing patterns, and cross-border movements are now being triangulated in real-time.\n\n### Why 2026 is the Threshold\nBy 2026, the 'Continuous Audit' protocol will be the standard. This means that compliance isn't an annual event—it's an operational pulse.\n\n* **Clean Status Shield**: Your primary defense.\n* **Tech Harmonization**: Ensuring your tools talk to each other.\n* **Audit Trails**: Built while you work.",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200",
          author: "Marcia Kgaphola"
        },
        {
          id: '2',
          title: "Neural Resilience: The Founder's ROI",
          category: "Resilience Strategy",
          date: "January 28, 2026",
          excerpt: "How cognitive load reduction directly impacts your bottom line. We analyze the intersection of psychology and profit.",
          content: "## The Hidden Cost of Decision Fatigue\n\nEvery administrative stress point is a withdrawal from your strategic bank account. When a founder is bogged down in compliance anxiety, their ability to lead with clarity drops by nearly 40%.\n\n### The IQ + EQ Balance\nWe promote a framework where technical accounting (IQ) is handled by systems, freeing your emotional intelligence (EQ) for leadership.",
          image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200",
          author: "Marcia Kgaphola"
        }
      ];
      setPosts(initialPosts);
      localStorage.setItem('iws_blog_posts', JSON.stringify(initialPosts));
    }
  }, []);

  // SEO Side Effect for individual blog posts
  useEffect(() => {
    if (selectedPost) {
      const originalTitle = document.title;
      const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

      // Update document title
      document.title = `${selectedPost.title} | Integrated Wellth Solutions | ${selectedPost.category}`;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', selectedPost.excerpt);
      } else {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        metaDesc.setAttribute('content', selectedPost.excerpt);
        document.head.appendChild(metaDesc);
      }

      // Cleanup: revert to original metadata when unmounting or post is closed
      return () => {
        document.title = originalTitle;
        if (metaDesc) {
          metaDesc.setAttribute('content', originalDescription);
        }
      };
    }
  }, [selectedPost]);

  const savePost = (post: BlogPostType) => {
    let updatedPosts;
    if (posts.find(p => p.id === post.id)) {
      updatedPosts = posts.map(p => p.id === post.id ? post : p);
    } else {
      updatedPosts = [post, ...posts];
    }
    setPosts(updatedPosts);
    localStorage.setItem('iws_blog_posts', JSON.stringify(updatedPosts));
    setShowEditor(false);
    setEditingPost(null);
  };

  const deletePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedPosts = posts.filter(p => p.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('iws_blog_posts', JSON.stringify(updatedPosts));
  };

  if (selectedPost) {
    return (
      <div className="animate-fadeIn pb-20">
         <div className="pt-32 px-6">
            <button 
              onClick={() => setSelectedPost(null)}
              className="group flex items-center gap-2 text-brand-900/40 hover:text-brand-900 font-black uppercase tracking-widest text-[10px] mb-12"
            >
              <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Intel Hub
            </button>
            <article className="max-w-4xl mx-auto">
               <div className="text-center mb-16">
                 <span className="inline-block px-4 py-1 bg-brand-gold text-brand-900 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">{selectedPost.category}</span>
                 <h1 className="text-6xl md:text-8xl font-sora font-extrabold text-brand-900 tracking-tighter leading-[0.85] mb-8">{selectedPost.title}</h1>
                 <div className="flex items-center justify-center gap-8 text-brand-900/40 font-bold uppercase tracking-widest text-[10px]">
                    <span className="flex items-center gap-2"><Clock size={14} /> {selectedPost.date}</span>
                    <span>By {selectedPost.author}</span>
                 </div>
               </div>
               <div className="relative mb-20">
                 <div className="absolute -inset-4 border-2 border-brand-gold/20 rounded-[3.5rem] -rotate-1" />
                 <img src={selectedPost.image} className="w-full h-[60vh] object-cover rounded-[3rem] relative z-10 shadow-2xl" alt={selectedPost.title} />
               </div>
               <div className="max-w-2xl mx-auto">
                  <p className="text-2xl md:text-3xl text-brand-900/80 font-medium italic leading-relaxed mb-16 pb-16 border-b border-brand-900/10">
                    {selectedPost.excerpt}
                  </p>
                  
                  {/* Render content with basic markdown handling */}
                  <div className="space-y-8 text-lg text-brand-900/70 leading-relaxed font-medium">
                     {selectedPost.content.split('\n').map((line, i) => {
                       if (line.startsWith('## ')) return <h2 key={i} className="text-4xl font-sora font-black text-brand-900 tracking-tighter mt-12 mb-4 uppercase">{line.replace('## ', '')}</h2>;
                       if (line.startsWith('### ')) return <h3 key={i} className="text-2xl font-sora font-black text-brand-900 tracking-tighter mt-8 mb-3 uppercase">{line.replace('### ', '')}</h3>;
                       if (line.startsWith('* ')) return (
                          <div key={i} className="flex gap-4 items-start pl-4">
                            <div className="w-2 h-2 rounded-full bg-brand-gold mt-2.5 flex-shrink-0" />
                            <span>{line.replace('* ', '')}</span>
                          </div>
                       );
                       return line.trim() ? <p key={i}>{line.replace(/\*\*(.*?)\*\*/g, (m, p1) => `<strong class="text-brand-900">${p1}</strong>`)}</p> : null;
                     })}
                  </div>
                  
                  <div className="mt-20 pt-20 border-t border-brand-900/10 text-center">
                     <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-900/30 mb-8">End of Intel Update</p>
                     <Button 
                        onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')}
                        className="rounded-full px-12 py-6 bg-brand-900 text-white font-black uppercase tracking-widest text-xs"
                     >
                        Discuss This Strategy
                     </Button>
                  </div>
               </div>
            </article>
         </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn min-h-screen bg-white pb-32">
      {/* Dynamic Header */}
      <div className="bg-brand-900 text-white pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <Zap size={800} className="absolute -left-40 -top-40 text-brand-gold" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <Sparkles size={14} className="text-brand-gold" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Intel Distribution Hub</span>
              </div>
              <h1 className="text-6xl md:text-[9rem] font-sora font-extrabold tracking-tighter leading-[0.8] mb-6">
                MARKET <br/> <span className="text-brand-gold italic">INTELLIGENCE.</span>
              </h1>
              <p className="text-xl md:text-3xl text-brand-100 max-w-2xl font-light leading-relaxed">
                Navigating the 2026 Compliance Era with predictive clarity and behavioral foresight.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => { setEditingPost(null); setShowEditor(true); }}
                className="group flex items-center gap-4 bg-brand-gold text-brand-900 px-8 py-5 rounded-full shadow-2xl hover:bg-white transition-all font-black uppercase tracking-widest text-xs"
              >
                <Plus size={18} /> Compose Insight
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl border border-brand-900/5 flex flex-col md:flex-row gap-4 mb-20">
           <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-900/20" size={20} />
              <input 
                type="text" 
                placeholder="Query intellectual property database..." 
                className="w-full pl-16 pr-8 py-5 bg-brand-50 rounded-full text-sm font-bold text-brand-900 outline-none focus:ring-2 focus:ring-brand-gold"
              />
           </div>
           <div className="flex gap-2">
              <button className="flex items-center gap-3 px-8 py-5 bg-brand-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold transition-all">
                 <Filter size={16} /> Filter Modules
              </button>
           </div>
        </div>

        {/* Featured Post Implementation */}
        {posts.length > 0 && (
          <div 
            onClick={() => setSelectedPost(posts[0])}
            className="group cursor-pointer mb-24 relative overflow-hidden rounded-[3.5rem] bg-brand-900 text-white min-h-[600px] flex items-end p-8 md:p-20 shadow-2xl"
          >
             <div className="absolute inset-0 z-0">
               <img src={posts[0].image} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[2s]" alt="Featured" />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/20 to-transparent" />
             </div>
             <div className="relative z-10 max-w-4xl space-y-8">
                <span className="inline-block px-5 py-2 bg-brand-gold text-brand-900 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{posts[0].category}</span>
                <h2 className="text-5xl md:text-8xl font-sora font-extrabold tracking-tighter leading-[0.9] group-hover:text-brand-gold transition-colors">{posts[0].title}</h2>
                <p className="text-xl md:text-2xl text-brand-100/60 max-w-2xl font-light leading-relaxed">{posts[0].excerpt}</p>
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-3">
                      <img src="https://res.cloudinary.com/dka0498ns/image/upload/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg" className="w-12 h-12 rounded-xl object-cover grayscale" alt="Marcia" />
                      <p className="text-xs font-black uppercase tracking-widest">{posts[0].author}</p>
                   </div>
                   <div className="w-px h-8 bg-white/10" />
                   <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{posts[0].date}</p>
                </div>
             </div>
          </div>
        )}

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.slice(1).map((post, i) => (
            <RevealOnScroll key={post.id} delay={i * 0.1} width="100%">
              <div 
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer bg-white rounded-[3rem] border border-brand-900/5 hover:border-brand-gold hover:shadow-2xl transition-all flex flex-col h-full overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                   <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                   <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-brand-900 shadow-lg">{post.category}</span>
                   </div>
                </div>
                <div className="p-10 flex flex-col flex-grow space-y-6">
                  <h3 className="text-2xl font-black text-brand-900 leading-tight uppercase tracking-tighter group-hover:text-brand-gold transition-colors">{post.title}</h3>
                  <p className="text-brand-900/50 text-sm leading-relaxed flex-grow">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-brand-900/5">
                     <div className="flex items-center gap-3 text-brand-900/30 text-[9px] font-black uppercase tracking-widest">
                        <Clock size={14} /> {post.date}
                     </div>
                     <div className="flex gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setEditingPost(post); setShowEditor(true); }}
                          className="p-3 bg-brand-50 rounded-xl text-brand-900 hover:bg-brand-900 hover:text-white transition-all shadow-sm"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={(e) => deletePost(post.id, e)}
                          className="p-3 bg-brand-50 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                          <Trash2 size={14} />
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {showEditor && (
        <BlogEditor 
          onSave={savePost} 
          onClose={() => { setShowEditor(false); setEditingPost(null); }} 
          initialPost={editingPost}
        />
      )}
    </div>
  );
};

export default BlogPage;
