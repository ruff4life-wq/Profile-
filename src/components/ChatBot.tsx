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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input || !input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Initialize assistant message
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
    };
    setMessages([...newMessages, assistantMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;

        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === assistantMessageId 
              ? { ...msg, content: accumulatedContent } 
              : msg
          )
        );
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === assistantMessageId 
            ? { ...msg, content: 'Sorry, I encountered an error. Please try again.' } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend();
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
            className="mb-4 w-[90vw] sm:w-[400px] h-[500px] flex flex-col rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl bg-[#0A192F]/90 text-white"
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
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#D4AF37]/20">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <Bot size={32} className="text-[#D4AF37]/40 mb-2" />
                  <p className="text-sm text-gray-400 italic">
                    "How can I assist you with Marvin's professional profile today?"
                  </p>
                </div>
              )}
              
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border ${
                      m.role === 'user' ? 'border-blue-400/50 bg-blue-900/30' : 'border-[#D4AF37]/50 bg-[#112240]'
                    }`}>
                      {m.role === 'user' ? <User size={12} /> : <Bot size={12} className="text-[#D4AF37]" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-blue-600/20 border border-blue-500/30 text-blue-50' 
                        : 'bg-[#112240] border border-[#D4AF37]/20 text-gray-200'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && messages[messages.length - 1]?.content === '' && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center bg-[#112240] border border-[#D4AF37]/20 p-3 rounded-2xl">
                    <Loader2 size={14} className="animate-spin text-[#D4AF37]" />
                    <span className="text-xs text-gray-400">Assistant is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#D4AF37]/10 bg-[#0A192F]/50">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Marvin's expertise..."
                  className="w-full bg-[#112240] border border-[#D4AF37]/20 rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-gray-500"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input || !input.trim()}
                  className="absolute right-1.5 p-1.5 rounded-full bg-[#D4AF37] text-[#0A192F] hover:bg-[#F4CF67] disabled:opacity-50 disabled:hover:bg-[#D4AF37] transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[9px] text-center mt-2 text-gray-500 uppercase tracking-tighter">
                Powered by Claude Sonnet 4.5 • AI Governance Compliant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen 
            ? 'bg-[#112240] border border-[#D4AF37] text-[#D4AF37]' 
            : 'bg-[#D4AF37] text-[#0A192F] hover:shadow-[#D4AF37]/20'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default ChatBot;
