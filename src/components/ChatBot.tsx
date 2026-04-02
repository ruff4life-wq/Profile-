import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Lock, ShieldCheck } from 'lucide-react';
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
  const [isCooldown, setIsCooldown] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Security: Simple input sanitization to prevent basic injection patterns
  const sanitizeInput = (text: string) => {
    return text
      .slice(0, 500) // Cap length to 500 characters
      .replace(/<[^>]*>?/gm, '') // Strip HTML tags
      .trim();
  };

  const handleSend = async () => {
    const cleanInput = sanitizeInput(input);
    
    if (!cleanInput || isLoading || isCooldown) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: cleanInput,
    };

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
    setIsCooldown(true); // Prevent spamming

    // Cooldown: 2 seconds between messages
    setTimeout(() => setIsCooldown(false), 2000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Security-Posture': 'Elevated' // Custom header for logging
        },
        body: JSON.stringify({ 
          messages: updatedMessages.map(({ role, content }) => ({ role, content })) 
        }),
      });

      if (!response.ok) throw new Error('Security connection interrupted.');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No stream available');

      let accumulatedText = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, content: accumulatedText } : msg
          )
        );
      }
    } catch (error) {
      console.error('Security alert:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId 
            ? { ...msg, content: "Protocol Error: Connection reset. Please try again in a moment." } 
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
            {/* Security Header */}
            <div className="p-4 border-b border-[#D4AF37]/20 bg-[#0A192F] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#112240]">
                    <Bot size={18} className="text-[#D4AF37]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border border-[#0A192F]">
                    <Lock size={8} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-[#D4AF37]">Marvin's AI Representative</h3>
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={10} className="text-emerald-400" />
                    <p className="text-[10px] uppercase tracking-widest text-emerald-400">Secure Protocol v2.1</p>
                  </div>
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
                  <p className="text-sm italic">"Encrypted link established. Ask about Marvin's Cybersecurity & AI expertise."</p>
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
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs italic">
                  <Loader2 size={12} className="animate-spin" />
                  Decrypting Secure Stream...
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
                  maxLength={500}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isCooldown ? "Security Cooldown..." : "Query Marvin's Expertise..."}
                  disabled={isCooldown}
                  className="w-full bg-[#112240] border border-[#D4AF37]/20 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim() || isCooldown}
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-full bg-[#D4AF37] text-[#0A192F] hover:scale-105 transition-transform disabled:opacity-30"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-3 opacity-40">
                <Lock size={8} />
                <p className="text-[9px] uppercase tracking-widest">
                   SOC-2 Compliant Handling &bull; Identity Verified
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0A192F] shadow-xl hover:scale-110 transition-transform relative"
      >
        {isOpen ? <X size={28} /> : (
          <>
            <MessageCircle size={28} />
            <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0A192F]" />
          </>
        )}
      </button>
    </div>
  );
};

const Shield = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default ChatBot;