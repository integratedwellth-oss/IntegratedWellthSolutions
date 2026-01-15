
import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, Eye, Edit3, Trash2, Layout, Type, Tag } from 'lucide-react';
import Button from './Button';
import { BlogPost } from '../types';

interface BlogEditorProps {
  onSave: (post: BlogPost) => void;
  onClose: () => void;
  initialPost?: BlogPost | null;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSave, onClose, initialPost }) => {
  const [post, setPost] = useState<BlogPost>(initialPost || {
    id: Date.now().toString(),
    title: '',
    category: 'Market Intelligence',
    date: new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' }),
    excerpt: '',
    content: '',
    image: 'https://picsum.photos/1200/600',
    author: 'Marcia Kgaphola'
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (field: keyof BlogPost, value: string) => {
    setPost(prev => ({ ...prev, [field]: value }));
  };

  const renderPreview = (text: string) => {
    // Simple markdown parser logic
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-black text-brand-900 mb-6 mt-8">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-black text-brand-900 mb-4 mt-6">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-black text-brand-900 mb-3 mt-4">{line.replace('### ', '')}</h3>;
      if (line.startsWith('* ') || line.startsWith('- ')) return (
        <div key={i} className="flex gap-2 items-start mb-2 ml-4">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
          <span className="text-brand-900/80">{line.replace(/^[\*\-]\s/, '')}</span>
        </div>
      );
      if (line.trim() === '') return <div key={i} className="h-4" />;
      
      // Basic bolding
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="mb-4 text-brand-900/70 leading-relaxed">
          {parts.map((part, pi) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pi} className="font-bold text-brand-900">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-brand-900/90 backdrop-blur-xl p-4 md:p-10 animate-fadeIn">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-6xl h-full flex flex-col overflow-hidden futuristic-border">
        
        {/* Editor Header */}
        <div className="p-6 md:p-8 bg-brand-50 border-b border-brand-900/5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-900 text-brand-gold flex items-center justify-center">
               <Edit3 size={24} />
            </div>
            <div>
              <h2 className="font-sora font-black text-brand-900 uppercase tracking-tighter text-xl">Intel Composer</h2>
              <p className="text-[10px] font-bold text-brand-900/40 uppercase tracking-[0.3em]">Protocol Alpha-1</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
                onClick={() => setPreviewMode(!previewMode)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${previewMode ? 'bg-brand-gold text-brand-900' : 'bg-brand-900/5 text-brand-900'}`}
             >
                {previewMode ? <Edit3 size={14} /> : <Eye size={14} />}
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
             </button>
             <Button onClick={() => onSave(post)} variant="primary" className="rounded-full px-8 py-2.5 text-[10px] font-black uppercase tracking-widest bg-brand-900 shadow-xl">
                <Save size={14} className="mr-2" /> Commit Post
             </Button>
             <button onClick={onClose} className="p-3 bg-white rounded-full hover:bg-brand-900 hover:text-white transition-all shadow-sm">
                <X size={20} />
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Main Workspace */}
          <div className={`flex-1 overflow-y-auto p-8 md:p-12 transition-all ${previewMode ? 'bg-white' : 'bg-gray-50'}`}>
             {previewMode ? (
               <article className="max-w-3xl mx-auto prose">
                  <div className="mb-10 text-center">
                    <span className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">{post.category}</span>
                    <h1 className="text-5xl md:text-6xl font-sora font-black text-brand-900 tracking-tighter leading-none mb-6">{post.title || 'Post Title'}</h1>
                    <p className="text-brand-900/40 text-xs font-bold uppercase tracking-widest">{post.date} • By {post.author}</p>
                  </div>
                  <img src={post.image} className="w-full h-[400px] object-cover rounded-[2.5rem] mb-12 shadow-2xl" alt="Featured" />
                  <div className="max-w-2xl mx-auto">
                    <p className="text-2xl font-medium italic text-brand-900/60 leading-relaxed mb-10 pb-10 border-b border-brand-900/5">
                      {post.excerpt || 'Brief summary of the insight...'}
                    </p>
                    {renderPreview(post.content)}
                  </div>
               </article>
             ) : (
               <div className="max-w-4xl mx-auto space-y-10 pb-20">
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-900/40 ml-2">
                           <Layout size={12} /> Post Category
                        </label>
                        <select 
                          value={post.category}
                          onChange={(e) => handleChange('category', e.target.value)}
                          className="w-full bg-white border border-brand-900/10 rounded-2xl px-6 py-4 text-sm font-bold text-brand-900 focus:ring-2 focus:ring-brand-gold outline-none shadow-sm"
                        >
                          <option>Market Intelligence</option>
                          <option>Compliance Blueprint</option>
                          <option>Resilience Strategy</option>
                          <option>Wealth Mapping</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-900/40 ml-2">
                           <ImageIcon size={12} /> Featured Image URL
                        </label>
                        <input 
                          type="text"
                          value={post.image}
                          onChange={(e) => handleChange('image', e.target.value)}
                          placeholder="https://..."
                          className="w-full bg-white border border-brand-900/10 rounded-2xl px-6 py-4 text-sm font-bold text-brand-900 focus:ring-2 focus:ring-brand-gold outline-none shadow-sm"
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-900/40 ml-2">
                       <Type size={12} /> Insight Headline
                    </label>
                    <input 
                      type="text"
                      value={post.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      placeholder="Enter a compelling title..."
                      className="w-full bg-white border border-brand-900/10 rounded-[2rem] px-8 py-6 text-3xl font-sora font-black text-brand-900 tracking-tighter outline-none focus:ring-2 focus:ring-brand-gold shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-900/40 ml-2">
                       <Tag size={12} /> Abstract (Excerpt)
                    </label>
                    <textarea 
                      value={post.excerpt}
                      onChange={(e) => handleChange('excerpt', e.target.value)}
                      placeholder="A short summary of the core insight..."
                      rows={2}
                      className="w-full bg-white border border-brand-900/10 rounded-3xl px-8 py-6 text-base font-medium text-brand-900/60 outline-none focus:ring-2 focus:ring-brand-gold shadow-sm resize-none italic"
                    />
                  </div>

                  <div className="space-y-2 h-full flex flex-col">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-900/40 ml-2">
                       <Layout size={12} /> Strategic Content (Markdown Supported)
                    </label>
                    <textarea 
                      value={post.content}
                      onChange={(e) => handleChange('content', e.target.value)}
                      placeholder="## Use Markdown to structure your insight&#10;&#10;* High-fidelity points&#10;**Bold terminology**&#10;&#10;Write the full protocol here..."
                      className="flex-1 w-full bg-white border border-brand-900/10 rounded-[2.5rem] px-8 py-10 text-lg font-medium text-brand-900/80 outline-none focus:ring-2 focus:ring-brand-gold shadow-sm min-h-[400px] font-mono leading-relaxed"
                    />
                  </div>
               </div>
             )}
          </div>

          {/* Sidebar Info */}
          {!previewMode && (
            <div className="w-full md:w-80 bg-brand-50 border-l border-brand-900/5 p-8 overflow-y-auto">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-900/30 mb-8">Metadata Context</h3>
               <div className="space-y-8">
                  <div className="p-6 bg-white rounded-3xl border border-brand-900/5 shadow-sm">
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-gold mb-2">Author Authority</p>
                    <p className="text-sm font-bold text-brand-900">{post.author}</p>
                  </div>
                  <div className="p-6 bg-white rounded-3xl border border-brand-900/5 shadow-sm">
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-gold mb-2">Publication Stamp</p>
                    <p className="text-sm font-bold text-brand-900">{post.date}</p>
                  </div>
                  <div className="p-6 bg-brand-900 rounded-3xl text-white shadow-xl">
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-gold mb-4">Editing Blueprint</p>
                    <ul className="space-y-3 text-[10px] font-bold opacity-70">
                       <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                          Use # for Headings
                       </li>
                       <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                          Use ** for Bold
                       </li>
                       <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                          Use * for Lists
                       </li>
                    </ul>
                  </div>
                  <div className="pt-10 flex flex-col gap-4">
                     <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-red-500/50 hover:text-red-500 transition-colors">
                        <Trash2 size={16} /> Discard Protocol
                     </button>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
