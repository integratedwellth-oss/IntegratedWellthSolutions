import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Bot, Loader2, Send } from 'lucide-react';
import { functions } from '../firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import { encryptData, decryptData } from '../services/cryptoService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const SUGGESTIONS = [
  "What is the Sovereignty Protocol?",
  "How do I register for the War Room?",
  "What compliance deadlines apply to my business?",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentSuggestions, setCurrentSuggestions] = useState(SUGGESTIONS);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ─── SECURITY FIX: Load encrypted chat history ───
  useEffect(() => {
    const loadHistory = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const saved = localStorage.getItem('iws_chat_history');
      if (saved && user) {
        try {
          const decrypted = await decryptData(saved, user.uid);
          if (decrypted && Array.isArray(decrypted)) {
            setMessages(decrypted as Message[]);
          }
        } catch {
          // ignore corrupt localStorage
        }
      }
    };
    loadHistory();
  }, []);

  // ─── SECURITY FIX: Save encrypted chat history ───
  useEffect(() => {
    const saveHistory = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user && messages.length > 0) {
        const encrypted = await encryptData(messages, user.uid);
        localStorage.setItem('iws_chat_history', encrypted);
      }
    };
    saveHistory();
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const currentHistory = [...messages];

    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (!functions) {
        throw new Error('Firebase Functions not initialized');
      }

      const chatCall = httpsCallable(functions, 'websiteChat');
      const response = (await chatCall({
        message: userMsg,
        history: currentHistory,
      })) as { data?: { reply?: string } };

      const replyText = response.data?.reply || 'Connection lost.';
      setMessages((prev) => [...prev, { role: 'bot', text: replyText }]);
    } catch (err: any) {
      console.error('Chat Widget Error:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Service temporarily unavailable. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── SECURITY FIX: Render as plain text, NEVER dangerouslySetInnerHTML ───
  const renderMessageText = (text: string) => {
    return (
      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
        {text}
      </p>
    );
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-80 md:w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[600px] animate-fade-in">
          <div className="bg-[#134e4a] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Bot size={20} className="text-[#d4af37]" />
              <span className="font-bold text-sm tracking-widest uppercase">
                Wellth Advisor
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto h-80 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <p className="text-xs text-emerald-700 font-medium">
                    Security Verification Complete
                  </p>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  Select Intelligence Module
                </p>
                {currentSuggestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(q);
                    }}
                    className="w-full text-left text-sm text-[#134e4a] bg-white border border-gray-200 rounded-lg p-3 hover:border-[#d4af37] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl ${
                    msg.role === 'user'
                      ? 'bg-[#134e4a] text-white rounded-tr-sm'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                  }`}
                >
                  {renderMessageText(msg.text)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-500 text-xs p-3 rounded-xl rounded-tl-sm flex items-center gap-2 shadow-sm">
                  <Loader2 className="animate-spin text-[#d4af37]" size={14} />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-200 flex gap-2 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask the Advisor..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-[#134e4a] text-[#d4af37] p-3 rounded-full disabled:opacity-50 hover:scale-105 transition-transform"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#134e4a] text-[#d4af37] p-4 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-[#d4af37]"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </>
  );
}
