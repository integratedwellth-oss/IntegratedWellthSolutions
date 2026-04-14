import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Bot, Loader2 } from 'lucide-react';
import { functions } from '../firebaseConfig'; 
import { httpsCallable } from 'firebase/functions';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hello! I am the Happy Hunter Digital assistant. How can I help accelerate your digital growth today?' }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('happy_hunter_chat_history');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('happy_hunter_chat_history', JSON.stringify(messages));
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput('');
    const currentHistory = [...messages];
    
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    
    try {
      const chatCall = httpsCallable(functions, 'websiteChat');
      const response = await chatCall({ message: userMsg, history: currentHistory }) as any;
      
      setMessages(prev => [...prev, { role: 'bot', text: response.data?.reply || "Connection lost." }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'bot', text: "Error connecting to server. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-80 md:w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[600px] animate-fade-in">
          
          <div className="bg-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Bot size={20} />
              <span className="font-bold text-sm">Digital Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-xs text-blue-100 font-medium">Online</span>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto h-80 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                  }`}
                  dangerouslySetInnerHTML={{ __html: m.text }} 
                />
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-500 text-xs p-3 rounded-xl rounded-tl-sm flex items-center gap-2 shadow-sm">
                  <Loader2 className="animate-spin" size={14} />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-200 flex gap-2 items-center">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask me anything..." 
              className="flex-1 bg-gray-50 text-gray-800 text-sm p-3 rounded-lg border border-gray-200 focus:border-blue-600 outline-none transition-colors" 
              disabled={loading} 
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()} 
              className="text-blue-600 hover:text-blue-800 p-2 disabled:opacity-50 font-bold text-sm"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
