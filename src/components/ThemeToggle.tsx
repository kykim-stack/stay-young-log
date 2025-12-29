'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  // 마운트 전에는 레이아웃 깨짐 방지를 위해 투명한 공간만 유지
  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="group relative p-2 rounded-md hover:bg-(--vsc-border) transition-colors flex items-center justify-center overflow-hidden"
      aria-label="Toggle Theme"
    >
      <div className="absolute inset-0 opacity-0 group-active:opacity-10 bg-(--accent) transition-opacity" />

      {theme === 'dark' ? (
        /* 달 아이콘 */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#DCDCAA] group-hover:rotate-12 transition-transform duration-300"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : (
        /* 해 아이콘*/
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#795E26] group-hover:rotate-90 transition-transform duration-500"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      )}

      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-(--vsc-tab) border border-(--vsc-border) text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md text-(--foreground)">
        Color Theme: {theme === 'dark' ? 'Dark+' : 'Light+'}
      </span>
    </button>
  );
}
