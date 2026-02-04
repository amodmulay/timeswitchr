import HomeContainer from '@/components/HomeContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TimeSwitchr | Minimalist Time Zone Converter',
  description: 'Fast, minimalist time zone converter. Convert between CET, IST, ET, PT, and UTC with zero clicks. Modern UI, mobile-first, and SEO-friendly.',
  keywords: 'time zone converter, timezone conversion, CET to IST, IST to ET, EST to CET, PT to ET, minimalist world clock',
  openGraph: {
    title: 'TimeSwitchr | Minimalist Time Zone Converter',
    description: 'Instantly convert time between zones with the fastest, zero-click converter.',
    url: 'https://timeswitchr.com',
    siteName: 'TimeSwitchr',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TimeSwitchr - Minimalist Time Zone Converter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TimeSwitchr | Minimalist Time Zone Converter',
    description: 'The fastest way to convert time zones. Minimalist design, mobile-first, and zero clicks.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  return <HomeContainer />;
}
