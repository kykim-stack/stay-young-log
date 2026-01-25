'use client';

import { useGuestbook } from './AICopilotProvider';
import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function AICopilotModal() {
  const { isOpen, close } = useGuestbook();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<
    { role: 'user' | 'model'; text: string }[]
  >([
    {
      role: 'model',
      text: '기록보관소의 AI 비서입니다. 궁금하신 내용을 편히 물어봐 주세요.',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤 로직
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: '비서 시스템을 활성화할 수 없습니다. (API Key Missing)',
        },
      ]);
      return;
    }
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-lite',
        // https://generativelanguage.googleapis.com/v1beta/models?key=NEXT_PUBLIC_GEMINI_API_KEY
        // 해당 페이지에서 가능한 모델 사용
      });

      const result = await model.generateContent(input);
      const response = await result.response;
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: response.text() },
      ]);
    } catch (error: any) {
      console.error('AI Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: '잠시 서고가 혼잡합니다. 잠시 후 다시 여쭤봐 주세요.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in font-serif">
      <div className="absolute inset-0" onClick={close} />

      <div className="w-full max-w-xl bg-(--background) border border-(--vsc-border)/30 shadow-2xl overflow-hidden relative z-10 animate-zoom-in">
        <div className="px-6 py-4 flex items-center justify-between border-b border-(--vsc-border)/10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-(--accent) animate-pulse" />
            <span className="text-[10px] tracking-[0.4em] opacity-40 uppercase font-sans font-bold">
              Wisdom Assistant
            </span>
          </div>
          <button
            onClick={close}
            className="text-xl opacity-20 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          <div
            ref={scrollRef}
            className="space-y-10 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2 py-4"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[9px] opacity-20 uppercase tracking-[0.2em] font-sans">
                  {msg.role === 'model' ? 'Assistant' : 'Guest'}
                </span>
                <div
                  className={`max-w-[85%] text-sm leading-[1.8] break-all whitespace-pre-wrap ${msg.role === 'user' ? 'text-right opacity-60' : 'text-left text-(--foreground)'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col gap-2 items-start">
                <span className="text-[9px] opacity-20 uppercase tracking-[0.2em] font-sans">
                  Assistant
                </span>
                <div className="flex gap-1.5 py-2">
                  <div className="w-1 h-1 bg-(--accent) rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-(--accent) rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-(--accent) rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 pt-6 border-t border-(--vsc-border)/10">
            <form onSubmit={handleChat} className="relative group">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="지혜를 빌려보세요..."
                className="w-full bg-transparent outline-none text-base py-2 placeholder:opacity-20 font-serif"
                autoFocus
                disabled={isLoading}
              />
              <div className="absolute bottom-0 left-0 w-0 h-px bg-(--accent)/40 group-focus-within:w-full transition-all duration-700" />
            </form>
            <p className="mt-4 text-[9px] opacity-20 tracking-tighter text-right font-sans">
              Press Enter to send / Esc to close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
