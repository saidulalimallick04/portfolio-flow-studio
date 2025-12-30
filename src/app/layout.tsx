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
  metadataBase: new URL('https://saidul-portfolio.vercel.app'), // Replace with actual domain
  title: {
    default: 'Saidul Ali Mallick | Backend Sage | Portfolio',
    template: '%s | Saidul Ali Mallick',
  },
  description: 'I build powerful systems behind the scenes—simple, secure, and scalable. Rooted in code, driven by curiosity, and inspired by nature.',
  keywords: ['Backend Developer', 'Python', 'Django', 'Machine Learning', 'Web Development', 'Portfolio', 'Saidul Ali Mallick'],
  authors: [{ name: 'Saidul Ali Mallick' }],
  creator: 'Saidul Ali Mallick',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saidulalimallick.studio',
    title: 'Saidul Ali Mallick | Backend Sage',
    description: 'I build powerful systems behind the scenes—simple, secure, and scalable.',
    siteName: 'Saidul Ali Mallick Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Saidul Ali Mallick Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saidul Ali Mallick | Backend Sage',
    description: 'I build powerful systems behind the scenes—simple, secure, and scalable.',
    images: ['/og-image.png'],
    creator: '@saidulmallick04',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
