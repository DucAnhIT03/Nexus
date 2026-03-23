'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, Loader2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { MOCK_PRODUCTS } from '../lib/constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Xin chào! Tôi là trợ lý Nexus. Tôi có thể giúp bạn tìm tài khoản game, công cụ hoặc dịch vụ tốt nhất. Bạn đang tìm kiếm gì hôm nay?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = "gemini-3-flash-preview";
      
      const systemInstruction = `
        Bạn là trợ lý chuyên gia của NexusMarket, một chợ số cho tài sản game MMO, công cụ và dịch vụ.
        Mục tiêu của bạn là giúp người dùng tìm sản phẩm từ danh mục của chúng tôi.
        Luôn trả lời bằng tiếng Việt.
        
        Sản phẩm hiện có:
        ${JSON.stringify(MOCK_PRODUCTS.map(p => ({ name: p.name, category: p.category, price: p.price, description: p.description })))}
        
        Hướng dẫn:
        1. Chuyên nghiệp, hữu ích và ngắn gọn.
        2. Nếu người dùng hỏi gợi ý, đề xuất sản phẩm cụ thể từ danh sách trên.
        3. Giải thích tại sao sản phẩm phù hợp với nhu cầu của họ.
        4. Nếu họ hỏi về thứ không có trong danh sách, cho biết chúng tôi đang cập nhật kho hàng liên tục và gợi ý danh mục gần nhất.
        5. Giữ câu trả lời dưới 3 đoạn văn.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: messages.concat({ role: 'user', text: userMessage }).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "Xin lỗi, tôi không thể xử lý yêu cầu đó. Tôi có thể giúp gì khác cho bạn?";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Tôi đang gặp sự cố kết nối. Vui lòng thử lại sau giây lát!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-primary/40 hover:scale-110 transition-transform"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-white/20 p-2">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Trợ lý AI Nexus</h3>
                  <p className="text-[10px] opacity-80">Trực tuyến • Hỗ trợ bởi Gemini</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-50"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    m.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 shadow-sm border border-primary/5 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-primary/5 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-primary/10 p-4 bg-white">
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
                <input 
                  type="text" 
                  placeholder="Hỏi về công cụ hoặc tài khoản..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="rounded-lg bg-primary p-2 text-white hover:bg-primary-hover disabled:opacity-50 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

