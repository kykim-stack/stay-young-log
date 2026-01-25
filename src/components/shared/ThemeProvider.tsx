'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  // 컴포넌트가 마운트될 때까지 대기 (Hydration 에러 방지)
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 아직 마운트되지 않았다면 children만 렌더
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      // script 태그의 위치 문제를 해결
      nonce="optional-nonce"
    >
      {children}
    </NextThemesProvider>
  );
}
