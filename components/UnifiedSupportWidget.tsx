import { X, Send, Loader2, Sparkles, MessageCircle, Zap, ArrowRight, RefreshCcw } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';

const SUGGESTIONS: Record<string, string[]> = {
  'home': ["What is the SARS Safety Net?", "How do I join the next workshop?", "Can you fix my messy books?"],
  'startups': ["How do I get investor-ready?", "What paperwork do I need to start?", "How do I manage my first grant?"],
  'existing-business': ["Is my business SARS compliant?", "Why am I not making enough profit?", "How do I win bigger contracts?"],
  'npos': ["How do I register an NPO?", "Help with donor reports", "Tax-exempt status help"],
  'wellness': ["I'm feeling burnt out", "Tips for leader stress", "Better money habits for my team"],
  'default': ["Show me your services", "Where is your office?", "Book a free chat"]
};

const UnifiedSupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'menu' | 'chat'>('menu');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentView = typeof window !== 'undefined' ? window.location.hash.replace('#', '') || 'home' : 'home';
  const activeSuggestions = SUGGESTIONS[currentView] || SUGGESTIONS['default'];

  useEffect(() => {
    const saved = localStorage.getItem('wellth_chat_history');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('wellth_chat_history', JSON.stringify(messages));
    if (mode === 'chat') {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages, mode]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;
    setHasError(false);
    if (!chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
    }
    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    if (!textOverride) setInput('');
    setIsLoading(true);

    try {
      const stream = await sendMessageStream(chatSessionRef.current, userMsg.text);
      let fullResponse = '';
      const modelMsgId = Date.now();
      
      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: modelMsgId }]);
      
      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          fullResponse += text;
          setMessages(prev => 
            prev.map(msg => 
              msg.timestamp === modelMsgId ? { ...msg, text: fullResponse } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("AI Error:", error);
      setHasError(true);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "### PROTOCOL INTERRUPTED\n\nI am having trouble maintaining the connection to the Sovereignty Core. Please try again or contact Marcia directly.", 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem('wellth_chat_history');
    chatSessionRef.current = null;
    setMode('menu');
  };

  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('### ')) {
        return <h4 key={i} className="text-brand-900 font-sora font-black text-base mt-4 mb-2 uppercase tracking-tight">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const content = line.replace(/^[\*\-]\s/, '');
        return (
          <div key={i} className="flex gap-2 items-start mb-2 ml-1 text-brand-900/80">
             <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0"></div>
             <span className="text-sm">{content}</span>
          </div>
        );
      }
      return line.trim() ? <p key={i} className="mb-3 text-sm leading-relaxed text-brand-900/90">{line}</p> : <div key={i} className="h-2" />;
    });
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setMode('menu');
  };

  return (
    <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[500] font-sans">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[92vw] md:w-[420px] max-h-[75vh] flex flex-col bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(19,78,74,0.25)] border border-brand-900/10 overflow-hidden animate-reveal">
          <div className="bg-brand-900 p-6 flex justify-between items-center text-white relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"></div>
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                 <Sparkles className={`text-brand-gold ${isLoading ? 'animate-spin' : 'animate-pulse'}`} size={24} />
               </div>
               <div>
                 <h3 className="font-sora font-black text-sm uppercase tracking-widest">Wellth Advisor</h3>
                 <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${hasError ? 'bg-rose-500' : 'bg-emerald-400'} animate-pulse`}></div>
                    <p className="text-[10px] text-brand-200 font-bold uppercase tracking-widest">
                       {hasError ? 'Connection Issue' : 'System Optimized'}
                    </p>
                 </div>
               </div>
             </div>
             <div className="flex items-center gap-2">
                <button onClick={handleClear} className="hover:bg-white/10 p-2 rounded-full transition-colors opacity-40 hover:opacity-100" title="Reset Session"><RefreshCcw size={16} /></button>
                <button onClick={toggleWidget} className="hover:bg-white/10 p-2 rounded-full transition-colors"><X size={20} /></button>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto bg-gray-50/30 flex flex-col min-h-[400px]">
            {mode === 'menu' ? (
              <div className="p-8 space-y-6">
                <button onClick={() => setMode('chat')} className="w-full group p-6 rounded-3xl bg-white border border-brand-900/5 hover:border-brand-500 hover:shadow-2xl transition-all text-left flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-900 flex items-center justify-center group-hover:bg-brand-900 group-hover:text-white transition-all"><Zap size={32} /></div>
                  <div>
                    <h4 className="font-black text-brand-900 uppercase tracking-tighter text-base">Initialize Chat</h4>
                    <p className="text-xs text-brand-900/40">Secure, predictive IQ+EQ guidance.</p>
                  </div>
                </button>
                <button onClick={() => window.open('https://wa.link/o1ezvw', '_blank')} className="w-full group p-6 rounded-3xl bg-white border border-brand-900/5 hover:border-[#25D366] hover:shadow-2xl transition-all text-left flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-green-50 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-all"><MessageCircle size={32} /></div>
                  <div>
                     <h4 className="font-black text-brand-900 uppercase tracking-tighter text-base">Direct Tactical Feed</h4>
                     <p className="text-xs text-brand-900/40">WhatsApp link to the Architects.</p>
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex flex-col h-full max-h-[550px]">
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                   {messages.length === 0 && (
                     <div className="grid gap-2">
                        <p className="text-[10px] font-black text-brand-900/30 uppercase tracking-[0.4em] mb-4 text-center">Intel Suggestions</p>
                        {activeSuggestions.map(s => (
                          <button key={s} onClick={() => handleSend(s)} className="p-4 bg-white border border-brand-900/5 rounded-2xl text-xs font-bold text-brand-900 text-left hover:bg-brand-900 hover:text-white transition-all flex justify-between items-center group shadow-sm">
                             {s} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                          </button>
                        ))}
                     </div>
                   )}
                   {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[88%] p-5 rounded-3xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-900 text-white shadow-xl' : 'bg-white border border-brand-900/10 text-brand-900 shadow-sm'}`}>
                           {msg.role === 'user' ? msg.text : renderMarkdown(msg.text)}
                        </div>
                      </div>
                   ))}
                   {isLoading && (
                     <div className="flex justify-start pl-4 animate-pulse">
                        <div className="bg-brand-100/50 p-4 rounded-3xl">
                           <Loader2 className="animate-spin text-brand-900/20" size={16} />
                        </div>
                     </div>
                   )}
                   <div ref={messagesEndRef} />
                </div>
                <div className="p-4 bg-white border-t border-brand-900/5 flex gap-3">
                   <button onClick={() => setMode('menu')} className="p-3 bg-brand-50 rounded-2xl hover:bg-brand-900 hover:text-white transition-all" title="Back to Menu"><Zap size={20} /></button>
                   <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about 2026 compliance..." className="flex-1 bg-brand-50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-900/10" />
                   <button onClick={() => handleSend()} disabled={isLoading || !input.trim()} className="bg-brand-900 text-white p-3.5 rounded-2xl hover:scale-105 transition-all disabled:opacity-30 disabled:hover:scale-100"><Send size={20} /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <button onClick={toggleWidget} className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-700 hover:rotate-[360deg] ${isOpen ? 'bg-brand-900 text-white' : 'bg-white text-brand-900 hover:scale-110'}`}>
         {isOpen ? <X size={28} /> : <Zap size={32} className="animate-pulse" />}
      </button>
    </div>
  );
};

export default UnifiedSupportWidget;
