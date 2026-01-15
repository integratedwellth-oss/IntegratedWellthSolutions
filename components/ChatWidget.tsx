
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Chat, GenerateContentResponse } from '@google/genai';

interface ChatWidgetProps {
  currentView?: string;
}

const SUGGESTIONS: Record<string, string[]> = {
  'home': ["What services do you offer?", "Tell me about the upcoming workshop", "How do I book a consultation?"],
  'who-we-help': ["Who is your typical client?", "Do you help Non-Profits?", "I'm just an individual, can you help?"],
  'default': ["What services do you offer?", "Where are you located?", "Book a consultation"]
};

const ChatWidget: React.FC<ChatWidgetProps> = ({ currentView = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('wellth_chat_history');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('wellth_chat_history', JSON.stringify(messages));
    scrollToBottom();
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    if (!chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
    }

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    if (!textOverride) setInput('');
    setIsLoading(true);

    try {
      const result = await sendMessageStream(chatSessionRef.current, userMsg.text);
      let fullResponse = '';
      const modelMsgId = Date.now();
      
      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: modelMsgId }]);

      for await (const chunk of result) {
         const chunkText = (chunk as GenerateContentResponse).text;
         if (chunkText) {
             fullResponse += chunkText;
             setMessages(prev => 
                prev.map(msg => 
                    msg.timestamp === modelMsgId ? { ...msg, text: fullResponse } : msg
                )
             );
         }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Protocol fault. Please attempt reconnection or contact support.", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
      setMessages([]);
      localStorage.removeItem('wellth_chat_history');
      chatSessionRef.current = null;
  };

  const renderMessageText = (text: string) => {
    let cleanText = text.replace(/^#+\s*/gm, '').replace(/^\s*\*\s/gm, '• ');
    const parts = cleanText.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-brand-800">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const currentSuggestions = SUGGESTIONS[currentView] || SUGGESTIONS['default'];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[600px] animate-fadeIn transition-all">
          <div className="bg-brand-900 text-white p-4 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                 <Sparkles size={20} className="text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight tracking-tight uppercase">Advisor</h3>
              </div>
            </div>
            <div className="flex items-center gap-1">
                <button onClick={handleClear} className="text-brand-200 hover:text-white p-2 rounded-full transition-colors"><Trash2 size={18} /></button>
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-brand-200 p-2 rounded-full transition-colors"><X size={22} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
            {messages.length === 0 && (
                <div className="text-center mt-8 px-4 animate-fadeIn">
                    <p className="text-gray-800 font-bold text-lg mb-2 uppercase tracking-tighter">Security Verification Complete</p>
                    <p className="text-gray-500 text-xs mb-6 uppercase tracking-widest opacity-50">Select Intelligence Module</p>
                    <div className="flex flex-col gap-2">
                        {currentSuggestions.map((q, idx) => (
                            <button key={idx} onClick={() => handleSend(q)} className="text-xs bg-white border border-gray-200 text-brand-700 hover:bg-brand-900 hover:text-white py-4 px-4 rounded-xl text-left transition-all shadow-sm flex items-center justify-between group">
                                {q} <Send size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-brand-900 text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}
            {isLoading && <Loader2 className="animate-spin text-brand-600 w-4 h-4 mx-auto" />}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask the Advisor..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <button onClick={() => handleSend()} disabled={isLoading || !input.trim()} className="bg-brand-900 text-white p-3 rounded-full hover:scale-110 disabled:opacity-30 transition-all">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="bg-brand-900 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all flex items-center gap-3 group">
            <MessageSquare size={26} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-black uppercase tracking-widest text-xs pr-0 group-hover:pr-2">Intel Portal</span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
