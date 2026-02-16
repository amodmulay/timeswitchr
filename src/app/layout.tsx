import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ConsentBanner from "@/components/ConsentBanner";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://timeswitchr.com"),
  title: "Time Zone Converter | Fast, Minimalist & Professional",
  description: "TimeSwitchr is a professional time zone converter for global teams. Effortlessly convert between CET, ET, PT, and UTC with zero clicks and absolute precision.",
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

import Footer from "@/components/Footer";
import PwaUpdater from "@/components/PwaUpdater";

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

        <Footer />

        <PwaUpdater />
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
                navigator.serviceWorker.register('/sw.js').then(function(reg) {
                  // Registration was successful
                  console.log('ServiceWorker registration successful');
                }).catch(function(err) {
                  // registration failed :(
                  console.log('ServiceWorker registration failed: ', err);
                });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
