import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Bot, Loader2 } from 'lucide-react';
import { functions } from '@/firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import { encryptData, decryptData } from '../../services/cryptoService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Hello! I am the Integrated Wellth Advisor. How can I help you achieve financial and psychological sovereignty today?',
    },
  ]);

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
      if (user && messages.length > 1) {
        const encrypted = await encryptData(messages, user.uid);
        localStorage.setItem('iws_chat_history', encrypted);
      }
    };
    saveHistory();
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    const currentHistory = [...messages];

    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      if (!functions) {
        console.error(
          'CRITICAL: Firebase Functions instance is null. Production environment variables are missing.'
        );
        throw new Error('Initialization Failed');
      }

      const chatCall = httpsCallable(functions, 'websiteChat');
      const response = (await chatCall({
        message: userMsg,
        history: currentHistory,
      })) as { data?: { reply?: string } };

      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: response.data?.reply || 'Connection lost.' },
      ]);
    } catch (err: any) {
      console.error('Chat Call Failed:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'System Configuration Error: Missing production environment keys. Please deploy with VITE_ variables.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-[#134e4a] text-[#d4af37] p-4 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-[#d4af37]"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-80 md:w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[600px] animate-fade-in">
          <div className="bg-[#134e4a] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Bot size={20} className="text-[#d4af37]" />
              <span className="font-bold text-sm tracking-widest uppercase">
                Wellth Advisor
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] text-white/70 font-medium uppercase tracking-widest">
                Online
              </span>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto h-80 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#134e4a] text-white rounded-tr-sm'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                  }`}
                >
                  {/* SECURITY FIX: Render as plain text, NEVER dangerouslySetInnerHTML */}
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-500 text-xs p-3 rounded-xl rounded-tl-sm flex items-center gap-2 shadow-sm">
                  <Loader2 className="animate-spin text-[#d4af37]" size={14} />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <form
            onSubmit={sendMessage}
            className="p-3 bg-white border-t border-gray-200 flex gap-2 items-center"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about compliance or strategy..."
              className="flex-1 bg-gray-50 text-gray-800 text-sm p-3 rounded-lg border border-gray-200 focus:border-[#d4af37] outline-none transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="text-[#134e4a] hover:text-[#d4af37] p-2 disabled:opacity-50 font-bold text-sm uppercase tracking-widest"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
