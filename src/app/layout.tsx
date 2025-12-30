'use client';

import '../styles/globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import MyCursor from '@/components/MyCursor';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const TABS = [
    { name: 'Home.tsx', path: '/', icon: 'tsx', color: '#007ACC' },
    { name: 'Blog.mdx', path: '/blog', icon: 'mdx', color: '#4EC9B0' },
    {
      name: 'GuestBook.log',
      path: '/guestbook',
      icon: 'log',
      color: '#DCDCAA',
    },
    { name: 'README.md', path: '/about', icon: 'M↓', color: '#E37933' },
  ];

  const activeFile = TABS.find((tab) =>
    tab.path === '/' ? pathname === '/' : pathname.startsWith(tab.path),
  ) || { name: 'Untitled', icon: '??', color: '#858585' };

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen bg-(--background) text-(--foreground) transition-colors duration-300 font-mono">
        <ThemeProvider>
          {/* <MyCursor /> */}

          <header className="fixed top-0 z-50 w-full bg-(--vsc-tab) border-b border-(--vsc-border) backdrop-blur-md">
            <nav className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="text-sm font-bold tracking-tight flex items-center gap-2"
                >
                  <span className="text-[#007ACC] dark:text-[#3794FF]">●</span>
                  YOUNG.{' '}
                  <span className="opacity-40 font-normal hidden md:inline">
                    - Visual Studio Code
                  </span>
                </Link>
              </div>
              <input
                type="text"
                placeholder="Search Young Log"
                className="hidden lg:flex items-center bg-(--background) border border-(--vsc-border) rounded px-20 py-1 text-[11px] opacity-40"
                readOnly
              />
              {/* 추후 검색 기능 개발 예정 */}
              <div className="flex items-center space-x-6">
                <nav className="hidden md:flex space-x-6 text-[12px] opacity-70">
                  <Link
                    href="/blog"
                    className="hover:text-(--accent) transition-colors"
                  >
                    blog
                  </Link>
                  <Link
                    href="/guestbook"
                    className="hover:text-(--accent) transition-colors"
                  >
                    guestbook
                  </Link>
                  <Link
                    href="/about"
                    className="hover:text-(--accent) transition-colors"
                  >
                    about
                  </Link>
                </nav>
                <ThemeToggle />
              </div>
            </nav>
          </header>

          <main className="grow pt-12 pb-10 flex flex-col items-center">
            <div className="max-w-6xl w-full border-x border-(--vsc-border) bg-(--background) min-h-[calc(100vh-80px)] shadow-2xl">
              <div className="flex bg-(--vsc-tab) border-b border-(--vsc-border) sticky top-12 z-40 overflow-x-auto scrollbar-hide">
                {TABS.map((tab) => {
                  const isActive =
                    tab.path === '/'
                      ? pathname === '/'
                      : pathname.startsWith(tab.path);
                  return (
                    <Link
                      key={tab.path}
                      href={tab.path}
                      className={`
                        flex items-center gap-2 px-4 py-2 border-r border-(--vsc-border) min-w-fit transition-all group
                        ${
                          isActive
                            ? 'bg-(--background) border-t-2 opacity-100'
                            : 'bg-(--vsc-tab) opacity-50 hover:opacity-80 hover:bg-(--background)/50'
                        }
                      `}
                      style={{
                        borderTopColor: isActive ? tab.color : 'transparent',
                      }}
                    >
                      <span
                        style={{ color: tab.color }}
                        className="text-xs font-bold"
                      >
                        {tab.icon}
                      </span>
                      <span className="text-sm font-medium">{tab.name}</span>
                      <span
                        className={`text-[10px] ml-2 transition-opacity ${
                          isActive
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-40'
                        }`}
                      >
                        ×
                      </span>
                    </Link>
                  );
                })}
                <div className="grow bg-(--vsc-tab) border-b border-(--vsc-border)" />
              </div>

              <div className="p-4 md:p-10">{children}</div>
            </div>
          </main>

          <footer className="bg-[#007ACC] text-white py-1 px-4 text-[11px] font-medium flex justify-between items-center fixed bottom-0 w-full z-50">
            <div className="flex items-center space-x-4">
              <span className="hover:bg-white/10 px-2 cursor-pointer">
                main*
              </span>
              <span className="hover:bg-white/10 px-2 cursor-pointer">
                0 △ 0 ⊗
              </span>
            </div>
            <div className="flex items-center space-x-4 italic opacity-80">
              <span>UTF-8</span>
              <span>{activeFile.name.split('.').pop()?.toUpperCase()} JSX</span>
              <span className="bg-white/20 px-2">Prettier</span>
            </div>
          </footer>
          <div className="h-6"></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
