import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300','400','500','600','700','800','900'],
});

export const metadata: Metadata = {
  title: 'Prakash Poudel | Web Developer',
  description: 'Portfolio of Prakash Poudel – Web Developer from Kathmandu, Nepal.',
};

import Cursor from '@/components/Cursor';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body suppressHydrationWarning className={`${outfit.variable} font-sans bg-background text-foreground overflow-x-hidden transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} enableColorScheme={false} disableTransitionOnChange>
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
