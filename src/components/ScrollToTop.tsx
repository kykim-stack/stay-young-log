'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const toggleVisibility = () => {
      if (container.scrollTop > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    container.addEventListener('scroll', toggleVisibility);
    return () => container.removeEventListener('scroll', toggleVisibility);
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    scrollContainerRef?.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-8 z-100 group flex items-center gap-3 px-4 py-2 
                bg-(--vsc-tab) border border-(--vsc-border) text-(--foreground) 
                shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:bg-(--vsc-border) 
                transition-all duration-300 rounded-md animate-in fade-in slide-in-from-right-5"
    >
      <div className="relative w-4 h-4 overflow-hidden">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-(--accent) group-hover:-translate-y-full transition-transform duration-300"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </div>
      <div className="flex flex-col items-start leading-none gap-1">
        <span className="text-[11px] font-bold tracking-tight">
          Scroll to Top
        </span>
        <span className="text-[9px] opacity-30 font-medium">
          editor.action.scrollToTop
        </span>
      </div>
      <div className="ml-2 px-1.5 py-0.5 rounded bg-(--background) border border-(--vsc-border) text-[9px] opacity-60 font-mono shadow-inner">
        ⇧ ⌘ ↑
      </div>{' '}
    </button>
  );
}
