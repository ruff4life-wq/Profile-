import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    // Add user message and a placeholder for the assistant
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantPlaceholder: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
    };

    const updatedMessages = [...messages, userMessage];
    setMessages([...updatedMessages, assistantPlaceholder]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          // Only send role and content to the API
          messages: updatedMessages.map(({ role, content }) => ({ role, content })) 
        }),
      });

      if (!response.ok) throw new Error('Failed to connect to Marvin\'s Assistant');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No stream available');

      let accumulatedText = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        // Functional update to avoid closure staleness
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, content: accumulatedText } : msg
          )
        );
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId 
            ? { ...msg, content: "I'm having trouble connecting right now. Please check your connection or try again shortly." } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[90vw] sm:w-[400px] h-[550px] flex flex-col rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl bg-[#0A192F]/95 text-white"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#D4AF37]/20 bg-[#0A192F] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#112240]">
                  <Bot size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-[#D4AF37]">Marvin's AI Assistant</h3>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">Security & Governance</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-40 text-center px-8">
                  <Shield size={40} className="mb-4 text-[#D4AF37]" />
                  <p className="text-sm italic">"Secure connection established. How can I assist with Marvin's professional inquiries?"</p>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-blue-600/20 border border-blue-500/30 text-blue-50' 
                      : 'bg-[#112240] border border-[#D4AF37]/20 text-gray-200'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && !messages[messages.length - 1]?.content && (
                <div className="flex items-center gap-2 text-gray-400 text-xs italic">
                  <Loader2 size={12} className="animate-spin" />
                  Encrypting response...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer Input */}
            <div className="p-4 bg-[#0A192F]/50 border-t border-[#D4AF37]/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Marvin's expertise..."
                  className="w-full bg-[#112240] border border-[#D4AF37]/20 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-full bg-[#D4AF37] text-[#0A192F] hover:scale-105 transition-transform disabled:opacity-30"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[9px] text-center mt-3 text-gray-500 uppercase tracking-widest">
                Identity Verified &bull; AI Governance Compliant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0A192F] shadow-xl hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

// Simple Shield icon fallback for the empty state
const Shield = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default ChatBot;
