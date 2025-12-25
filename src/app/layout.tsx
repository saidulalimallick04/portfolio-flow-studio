import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { BottomNav } from '@/components/shared/BottomNav';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { PageTransition } from '@/components/shared/PageTransition';
import { ThunderCursor } from '@/components/shared/ThunderCursor';
import { MusicPlayer } from '@/components/shared/MusicPlayer';

export const metadata: Metadata = {
  title: 'Sami | PortfolioFlow | A Creative Portfolio',
  description: 'A personal portfolio showcasing projects, experience, and creative work.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
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
            <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4">
              <BottomNav />
              <MusicPlayer />
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
