'use client';

import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';

function ThemeProviderContent({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="portfolio-theme">
      {children}
    </ThemeProvider>
  );
}

export function Providers({ children }) {
  return (
    <Suspense fallback={children}>
      <ThemeProviderContent>{children}</ThemeProviderContent>
    </Suspense>
  );
}
