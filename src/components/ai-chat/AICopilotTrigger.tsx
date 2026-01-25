'use client';
import { useGuestbook } from './AICopilotProvider';

export default function AICopilotTrigger() {
  const { open } = useGuestbook();

  return (
    <button
      onClick={open}
      className="fixed bottom-10 right-8 z-[100] group flex items-center gap-4 px-6 py-3 bg-(--vsc-tab) border-2 border-(--accent)/30 text-(--foreground) shadow-[4px_4px_15px_rgba(0,0,0,0.1)] hover:border-(--accent) hover:shadow-[4px_4px_20px_rgba(142,62,38,0.2)] transition-all duration-500 font-serif overflow-hidden"
    >
      <div className="absolute -right-2 -bottom-2 text-4xl opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-700 select-none">
        卍
      </div>

      <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full group-hover:scale-110 transition-transform"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M12 6v10" />
          <path d="M9 9h6" />
        </svg>
        <div className="absolute inset-0 bg-(--accent)/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex flex-col items-start gap-0.5 relative z-10">
        <span className="text-[12px] font-bold tracking-[0.2em] text-(--accent)">
          지혜의 빌림
        </span>
        <span className="text-[9px] opacity-40 font-medium tracking-tighter">
          AI 비서 (秘書)
        </span>
      </div>

      <div className="ml-2 px-1.5 py-0.5 border border-(--accent)/20 text-[9px] text-(--accent) opacity-60 font-serif shrink-0 group-hover:opacity-100 transition-opacity">
        ⌘ I
      </div>
    </button>
  );
}
