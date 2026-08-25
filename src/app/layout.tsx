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
  description: "Portfolio of Saidul Ali Mallick (Sami) - Backend Developer & AI/ML Engineer at Pathvex Digital Solutions (pathvex.in). Designing scalable architectures, secure RESTful APIs, and intelligent data systems.",
  keywords: [
    "Saidul Ali Mallick",
    "Sami",
    "Pathvex",
    "Pathvex Digital Solutions",
    "pathvex.in",
    "Pathvex developer",
    "Backend Developer",
    "AI/ML Engineer",
    "Python Django Developer",
    "Full Stack Developer",
    "Portfolio Flow Studio",
  ],
  authors: [{ name: "Saidul Ali Mallick", url: "https://saidulalimallick.studio" }],
  creator: "Saidul Ali Mallick",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saidulalimallick.studio",
    title: "Saidul Ali Mallick | Portfolio Flow",
    description: "Portfolio of Saidul Ali Mallick (Sami) - Backend Developer & AI/ML Engineer at Pathvex Digital Solutions (pathvex.in).",
    siteName: "Saidul Ali Mallick Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saidul Ali Mallick | Portfolio Flow",
    description: "Backend Developer & AI/ML Engineer at Pathvex Digital Solutions (pathvex.in).",
    creator: "@saidulmallick04",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Saidul Ali Mallick",
  "alternateName": "Sami",
  "url": "https://saidulalimallick.studio",
  "jobTitle": "Backend Developer & AI/ML Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "Pathvex Digital Solutions",
    "url": "https://pathvex.in"
  },
  "sameAs": [
    "https://github.com/saidulalimallick04",
    "https://www.linkedin.com/in/saidulalimallick04",
    "https://x.com/saidulmallick04",
    "https://kaggle.com/saidulalimallick04"
  ]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
