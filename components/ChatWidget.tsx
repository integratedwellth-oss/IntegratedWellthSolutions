import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Chat, GenerateContentResponse } from '@google/genai';

interface ChatWidgetProps {
  currentView?: string;
}

const SUGGESTIONS: Record<string, string[]> = {
  'home': [
    "What services do you offer?",
    "Tell me about the upcoming workshop",
    "How do I book a consultation?"
  ],
  'who-we-help': [
    "Who is your typical client?",
    "Do you help Non-Profits?",
    "I'm just an individual, can you help?"
  ],
  'startups': [
    "How can you help my startup?",
    "What is a Gap Analysis?",
    "Do you help with grant management?"
  ],
  'existing-business': [
    "What is 2026 Tax Compliance?",
    "How does a Capacity Assessment work?",
    "Help me with a business plan"
  ],
  'npos': [
    "How do I register as an NPO?",
    "Difference between NPO and PBO?",
    "Can you help with donor reporting?"
  ],
  'individuals': [
    "Do I need to file a tax return?",
    "What is Personal Wealth Mapping?",
    "Help me with budgeting"
  ],
  'wellness': [
    "What are your wellness workshops?",
    "How does financial stress affect health?",
    "Tell me about mindfulness sessions"
  ],
  'blog': [
    "What is the latest tax news?",
    "Summarize the 2026 Compliance post",
    "Tips for small businesses"
  ],
  'privacy': [
    "How is my data used?",
    "Who is the Information Officer?",
    "Cookie policy details"
  ],
  'default': [
    "What services do you offer?",
    "Where are you located?",
    "Book a consultation"
  ]
};

const ChatWidget: React.FC<ChatWidgetProps> = ({ currentView = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load history
    const saved = localStorage.getItem('wellth_chat_history');
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save history
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
      
      // Initial placeholder for streaming
      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: modelMsgId }]);

      for await (const chunk of result) {
         const c = chunk as GenerateContentResponse;
         if (c.text) {
             fullResponse += c.text;
             setMessages(prev => 
                prev.map(msg => 
                    msg.timestamp === modelMsgId ? { ...msg, text: fullResponse } : msg
                )
             );
         }
      }

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again or book a consultation.", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
      setMessages([]);
      localStorage.removeItem('wellth_chat_history');
      chatSessionRef.current = null;
      // We keep the widget open so they can start a new chat, but reset to "Start" state
  };

  // Helper to parse basic markdown (bolding) and preserve whitespace
  const renderMessageText = (text: string) => {
    // 1. Split by bold markers (**text**)
    const parts = text.split(/(\*\*.*?\*\*)/g);
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
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[600px] animate-fadeIn transition-all">
          {/* Header */}
          <div className="bg-brand-900 text-white p-4 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                 <Sparkles size={20} className="text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Wellth Advisor</h3>
                <div className="flex items-center gap-2 text-xs text-brand-200">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span>Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
                <button 
                    onClick={handleClear}
                    title="End Chat & Clear History"
                    className="text-brand-200 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                    <Trash2 size={18} />
                </button>
                <button 
                    onClick={() => setIsOpen(false)} 
                    title="Close"
                    className="text-white hover:text-brand-200 hover:bg-white/10 p-2 rounded-full transition-colors ml-1"
                >
                  <X size={22} />
                </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
            {messages.length === 0 && (
                <div className="text-center mt-8 px-4 animate-fadeIn">
                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600 shadow-sm">
                        <MessageSquare size={32} />
                    </div>
                    <p className="text-gray-800 font-bold text-lg mb-2">How can we help you?</p>
                    <p className="text-gray-500 text-sm mb-6">Ask about <span className="font-semibold text-brand-600">{currentView.replace(/-/g, ' ')}</span> or select a topic:</p>
                    
                    {/* Suggestions (Quick Replies) */}
                    <div className="flex flex-col gap-2">
                        {currentSuggestions.map((q, idx) => (
                            <button 
                                key={idx}
                                onClick={() => handleSend(q)}
                                className="text-sm bg-white border border-gray-200 text-brand-700 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-800 py-3 px-4 rounded-xl text-left transition-all duration-200 shadow-sm active:scale-95 flex items-center justify-between group"
                            >
                                {q}
                                <Send size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-400 -translate-x-2 group-hover:translate-x-0 transform duration-200" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-brand-100 flex-shrink-0 mr-2 flex items-center justify-center mt-1 border border-brand-200">
                        <Sparkles size={14} className="text-brand-600" />
                    </div>
                )}
                <div 
                    className={`
                        max-w-[85%] rounded-2xl p-4 text-sm whitespace-pre-wrap leading-relaxed shadow-sm
                        ${msg.role === 'user' 
                            ? 'bg-brand-600 text-white rounded-br-sm' 
                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                        }
                    `}
                >
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start items-center gap-2 pl-10 animate-fadeIn">
                 <div className="bg-gray-200/50 rounded-full p-2">
                    <Loader2 className="animate-spin text-brand-600 w-4 h-4" />
                 </div>
                 <span className="text-xs text-gray-400 animate-pulse">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
             <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Close Chat"
            >
                <X size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-gray-400"
            />
            <button 
                onClick={() => handleSend()} 
                disabled={isLoading || !input.trim()}
                className="bg-brand-600 text-white p-3 rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-600 text-white p-4 rounded-full shadow-xl hover:bg-brand-700 transition-all hover:scale-105 flex items-center gap-3 group relative animate-fadeIn"
        >
            {/* Notification dot if closed */}
            <span className="absolute top-0 right-0 -mt-1 -mr-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></span>
            
            <MessageSquare size={26} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-medium pr-0 group-hover:pr-2">
                Ask Wellth Advisor
            </span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;