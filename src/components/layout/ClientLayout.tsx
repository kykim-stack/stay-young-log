'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { AICopilotProvider } from '@/components/ai-chat/AICopilotProvider';
import ScrollToTop from '@/components/shared/ScrollToTop';
import ThemeToggle from '@/components/shared/ThemeToggle';
import AICopilotTrigger from '@/components/ai-chat/AICopilotTrigger';
import AICopilotModal from '@/components/ai-chat/AICopilotModal';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  const NAV_ITEMS = [
    { name: '기록', path: '/blog' },
    { name: '방명록', path: '/guestbook' },
    { name: '소개', path: '/about' },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);
  return (
    <ThemeProvider>
      <AICopilotProvider>
        <nav className="fixed top-0 z-50 w-full bg-(--background)/80 backdrop-blur-sm px-6 py-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-8 h-8 border border-(--accent) flex items-center justify-center text-(--accent) text-[10px] font-bold group-hover:bg-(--accent) group-hover:text-white transition-all">
                영이
              </div>
              <span className="font-serif tracking-[0.3em] text-sm opacity-80">
                기록보관소
              </span>
            </Link>

            <div className="flex items-center gap-8 font-serif text-sm">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`transition-all hover:text-(--accent) ${
                    pathname.startsWith(item.path)
                      ? 'text-(--accent) border-b border-(--accent)'
                      : 'opacity-40'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pl-4 border-l border-(--vsc-border)">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>

        <main className="min-h-screen bg-(--background) pt-32 pb-20 overflow-x-hidden">
          <div
            ref={scrollRef}
            className="max-w-4xl mx-auto px-6 font-serif relative"
          >
            {children}
          </div>
        </main>

        <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-(--vsc-border)/30 flex justify-between items-center opacity-30 font-serif text-[10px] tracking-widest">
          <div>© 2026 STAY YOUNG ARCHIVE</div>
          <div className="flex gap-4">
            <span>계해년 정월</span>
            <span>정갈한 기록</span>
          </div>
        </footer>

        <ScrollToTop scrollContainerRef={scrollRef} />
        <AICopilotTrigger />
        <AICopilotModal />
      </AICopilotProvider>
    </ThemeProvider>
  );
}
