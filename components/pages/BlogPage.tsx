import React from 'react';
import BlogPost from '../BlogPost';

const BlogPage: React.FC = () => {
  return (
    <div className="pt-40 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
         <h1 className="text-5xl font-sora font-extrabold text-brand-900 uppercase tracking-tighter">
           Strategic <span className="text-brand-gold italic">Insights.</span>
         </h1>
      </div>
      <BlogPost />
    </div>
  );
};

export default BlogPage;
