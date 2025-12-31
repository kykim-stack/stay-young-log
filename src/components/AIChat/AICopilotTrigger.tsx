'use client';
import { useGuestbook } from './AICopilotProvider';

export default function AICopilotTrigger() {
  const { open } = useGuestbook();

  return (
    <button
      onClick={open}
      className="fixed bottom-10 right-8 z-100 group flex items-center justify-between w-64 px-4 py-2.5 
                 bg-(--vsc-tab) border border-(--vsc-border) text-(--foreground) 
                 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:bg-(--vsc-border) 
                 transition-all duration-300 rounded-md animate-in fade-in slide-in-from-right-5"
    >
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 text-[#007ACC] flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M12 8V4H8M2 14h2M20 14h2M15 13v2M9 13v2" />
          </svg>
        </div>

        <div className="flex flex-col items-start leading-none gap-1">
          <span className="text-[11px] font-bold tracking-tight">
            AI Copilot
          </span>
          <span className="text-[9px] opacity-30 font-medium">
            extension.youngLog.chat
          </span>
        </div>
      </div>

      <div className="px-1.5 py-0.5 rounded bg-(--background) border border-(--vsc-border) text-[9px] opacity-60 font-mono shrink-0">
        ⌘ I
      </div>
    </button>
  );
}
