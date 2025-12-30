import NextTopLoader from 'nextjs-toploader';
import { CursorProvider } from '@/components/shared/CursorContext';
import { CursorManager } from '@/components/shared/CursorManager';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { PageTransition } from '@/components/shared/PageTransition';
import { BottomControls } from '@/components/shared/BottomControls';
import { FloatingControls } from '@/components/shared/FloatingControls';

export const metadata: Metadata = {
  metadataBase: new URL('https://saidulalimallick.studio'),
  alternates: {
    canonical: './',
  },
  title: "Saidul Ali Mallick | Portfolio Flow",
  description: "A creative developer portfolio showcasing projects, skills, and my journey in tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <NextTopLoader
            color="hsl(var(--primary))"
            initialPosition={0.25}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px hsl(var(--primary)),0 0 5px hsl(var(--primary))"
          />
          <CursorProvider>
            <CursorManager />
            <div className="relative z-10 bg-background/50">
              <Header />
              <main className="pb-24">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <Footer />
              <BottomControls />
            </div>
            <FloatingControls />
            <Toaster />
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
