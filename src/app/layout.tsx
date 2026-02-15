import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ConsentBanner from "@/components/ConsentBanner";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://timeswitchr.com"),
  title: "TimeSwitchr | Minimalist Time Zone Converter",
  description: "Fast, minimalist time zone converter. Convert between CET, IST, ET, PT, and UTC with zero clicks.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TimeSwitchr",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* AdSense and GA are loaded conditionally below */}
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />

        <footer style={{ marginTop: '4rem', padding: '2rem 1rem', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.875rem', color: 'var(--muted)' }}>
          <div className="container">
            <nav style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
              <a href="/" style={{ color: 'var(--foreground)', fontWeight: 500 }}>Home</a>
              <a href="/about">About</a>
              <a href="/info">Guide</a>
              <a href="/impressum">Impressum</a>
              <a href="/privacy">Privacy</a>
              <a href="/stack">Stack</a>
              <a href="mailto:themvpletter@gmail.com">Contact</a>
            </nav>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', fontSize: '0.75rem', opacity: 0.8 }}>
              <span>Partners:</span>
              <a href="https://www.thefiscaloracle.com/" target="_blank" rel="noopener">The Fiscal Oracle</a>
              <a href="https://themvpletter.com/" target="_blank" rel="noopener">The MVP Letter</a>
            </div>
            <p style={{ marginTop: '1rem' }}>
              © 2026 TimeSwitchr
              <span style={{ opacity: 0.5, marginLeft: '0.5rem', fontSize: '0.7rem' }}>
                v{process.env.NEXT_PUBLIC_APP_VERSION}
              </span>
            </p>
          </div>
        </footer>

        <ConsentBanner />

        {/* Google Tag Manager / Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />

        {/* Google AdSense */}
        <Script
          id="adsense-init"
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2123835135599458"
          strategy="afterInteractive"
        />

        <Script id="consent-manager" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // 1. Initial consent state: denied
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'personalization_storage': 'denied',
              'functionality_storage': 'granted',
              'security_storage': 'granted',
              'wait_for_update': 500
            });

            // 2. Load existing consent from localStorage
            var consentState = localStorage.getItem('cookie-consent');
            if (consentState === 'accepted') {
              gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'personalization_storage': 'granted'
              });
            }

            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            gtag('config', 'ca-pub-2123835135599458');

            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
