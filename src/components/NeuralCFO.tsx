import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Loader, Phone } from 'lucide-react';

const NeuralCFO = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Secure Channel Open. I am your Neural CFO. Status: Listening.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    // SIMULATION MODE (Safe for deployment without API keys)
    // Future Upgrade: Connect this to geminiService.ts
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "Intelligence Received. Analysis suggests this is a cash-flow anxiety trigger. Recommendation: Review the War Room buffer before making a decision. Accessing defensive protocols..." 
      }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="bg-slate-900 border border-emerald-500/30 w-80 h-96 rounded-2xl shadow-2xl mb-4 pointer-events-auto flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          {/* HEADER */}
          <div className="bg-emerald-900/20 p-4 border-b border-emerald-500/20 flex justify-between items-center">
            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-widest">
              <Bot size={16} /> Neural CFO
            </div>
            <button onClick={() => setIsOpen(false)} className="text-emerald-500/50 hover:text-emerald-400">
              <X size={16} />
            </button>
          </div>
          
          {/* MESSAGES */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-emerald-900">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-br-none' 
                    : 'bg-slate-800 text-emerald-100/80 border border-emerald-500/10 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-emerald-500/50 flex gap-1 items-center text-xs"><Loader size={12} className="animate-spin" /> Processing...</div>}
          </div>

          {/* INPUT */}
          <div className="p-3 bg-slate-950 border-t border-emerald-500/20 flex gap-2">
            <input 
              className="flex-grow bg-slate-900 text-white text-xs p-2 rounded-lg border border-emerald-500/20 focus:border-emerald-500 outline-none placeholder-emerald-500/30"
              placeholder="Query Intelligence Database..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="bg-emerald-600 p-2 rounded-lg text-white hover:bg-emerald-500">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* TRIGGER BUTTONS */}
      <div className="flex gap-3 pointer-events-auto">
        {/* WHATSAPP TRIGGER */}
        <button 
          onClick={() => window.open('https://wa.me/27744940771', '_blank')}
          className="bg-[#25D366] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform text-white border-2 border-white/10"
        >
          <Phone size={20} />
        </button>

        {/* AI TRIGGER */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="bg-brand-900 text-brand-gold w-14 h-14 rounded-full flex items-center justify-center shadow-2xl border border-brand-gold/30 hover:scale-110 transition-transform animate-pulse-slow"
        >
          {isOpen ? <X /> : <MessageSquare />}
        </button>
      </div>
    </div>
  );
};

export default NeuralCFO;
