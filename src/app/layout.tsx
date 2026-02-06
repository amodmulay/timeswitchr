import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ConsentBanner from "@/components/ConsentBanner";

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

        <footer style={{ marginTop: '4rem', padding: '2rem 1rem', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.875rem', color: 'var(--muted)' }}>
          <div className="container">
            <nav style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
              <a href="/">Home</a>
              <a href="/impressum">Impressum</a>
              <a href="/privacy">Privacy</a>
            </nav>
            <p style={{ marginTop: '1rem' }}>© {new Date().getFullYear()} TimeSwitchr</p>
          </div>
        </footer>

        <ConsentBanner />

        <Script id="consent-manager" strategy="afterInteractive">
          {`
            (function() {
              const consent = localStorage.getItem('cookie-consent');
              const GA_ID = '${process.env.NEXT_PUBLIC_GA_ID}';
              const ADSENSE_ID = '${process.env.NEXT_PUBLIC_ADSENSE_ID}';

              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Set default consent to denied
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied'
              });

              if (consent === 'accepted') {
                gtag('consent', 'update', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'granted'
                });

                // Load GA
                const gaScript = document.createElement('script');
                gaScript.async = true;
                gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
                document.head.appendChild(gaScript);

                gtag('js', new Date());
                gtag('config', GA_ID);

                // Load AdSense
                const adsenseScript = document.createElement('script');
                adsenseScript.async = true;
                adsenseScript.crossOrigin = 'anonymous';
                adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_ID;
                document.head.appendChild(adsenseScript);
              }

              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
