import '../styles/globals.css';
import Link from 'next/link';
import MyCursor from '@/components/MyCursor';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen bg-(--background) text-(--foreground) transition-colors duration-300">
        <ThemeProvider>
          <MyCursor />

          <header className="fixed top-0 z-50 w-full bg-(--background)/70 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 transition-colors">
            <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
              <Link
                href="/"
                className="text-2xl font-black tracking-tighter hover:scale-105 transition-transform text-(--foreground)"
              >
                YOUNG.
              </Link>

              <div className="flex items-center space-x-8">
                <div className="hidden md:flex space-x-12 font-bold text-sm text-(--foreground) opacity-70 tracking-widest">
                  <Link
                    href="/blog"
                    className="hover:text-(--accent) transition-colors"
                  >
                    LOG
                  </Link>
                  <Link
                    href="/side"
                    className="hover:text-(--accent) transition-colors"
                  >
                    SIDE
                  </Link>
                  <Link
                    href="/about"
                    className="hover:text-(--accent) transition-colors"
                  >
                    ABOUT
                  </Link>
                </div>
                <ThemeToggle />
              </div>
            </nav>
          </header>

          <main className="grow pt-32 pb-20 text-(--foreground)">
            <div className="max-w-6xl mx-auto px-6 w-full">{children}</div>
          </main>

          <footer className="py-20 border-t border-slate-100 dark:border-white/5 transition-colors">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-(--foreground) opacity-50">
              <p className="font-medium">© 2025. Stay Young, Stay Foolish.</p>
              <div className="flex space-x-8 font-bold">
                <a
                  href="https://github.com/Kikayoung"
                  className="hover:text-(--accent) transition-colors"
                >
                  GITHUB
                </a>
                <a
                  href="mailto:kayoung7189@naver.com"
                  className="hover:text-(--accent) transition-colors"
                >
                  CONTACT
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
