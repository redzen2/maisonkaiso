import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2, User, Bot } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello. I am Kanso, your design assistant. Tell me about the space you are looking to furnish, or describe the atmosphere you wish to create.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
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

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMessage.text);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
       // Error handling handled in service, but safety fallback here
       const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I seem to be having trouble connecting. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 w-[90vw] max-w-[400px] h-[600px] bg-white rounded-lg shadow-2xl flex flex-col border border-kanso-200 overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-kanso-800 to-kanso-900 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/10 rounded-full">
                <Sparkles size={16} className="text-indigo-200" />
            </div>
            <div>
                <h3 className="font-serif font-medium">Kanso AI</h3>
                <p className="text-[10px] text-kanso-300 opacity-80 uppercase tracking-widest">Design Consultant</p>
            </div>
        </div>
        <button onClick={onClose} className="hover:text-kanso-200 transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-kanso-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-kanso-200 text-kanso-600' : 'bg-kanso-900 text-white'
            }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-white border border-kanso-200 text-kanso-900 shadow-sm'
                  : 'bg-kanso-100 text-kanso-900'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-kanso-900 text-white flex items-center justify-center flex-shrink-0">
                    <Bot size={14} />
                 </div>
                 <div className="bg-kanso-100 p-3 rounded-lg">
                    <Loader2 size={16} className="animate-spin text-kanso-500" />
                 </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-kanso-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for advice..."
            className="flex-1 bg-kanso-50 border border-kanso-200 rounded px-4 py-2 text-sm focus:outline-none focus:border-kanso-400 focus:bg-white transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-kanso-900 text-white p-2 rounded hover:bg-kanso-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-kanso-400 mt-2">
            AI can make mistakes. Please check important info.
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;
