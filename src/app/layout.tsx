import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { PageTransition } from '@/components/shared/PageTransition';
import { ThunderCursor } from '@/components/shared/ThunderCursor';
import { BottomControls } from '@/components/shared/BottomControls';
import { FloatingControls } from '@/components/shared/FloatingControls';

export const metadata: Metadata = {
  title: 'Saidul Ali Mallick | Backend Sage | Portfolio',
  description: 'I build powerful systems behind the scenes—simple, secure, and scalable. Rooted in code, driven by curiosity, and inspired by nature.',
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
          <ThunderCursor />
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
        </ThemeProvider>
      </body>
    </html>
  );
}
