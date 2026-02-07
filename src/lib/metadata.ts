import { Metadata } from 'next';

interface MetadataProps {
    title?: string;
    description?: string;
    urlPath?: string;
    ogImage?: string;
}

const DEFAULT_TITLE = 'TimeSwitchr | Minimalist Time Zone Converter';
const DEFAULT_DESC = 'Fast, minimalist time zone converter. Convert between CET, IST, ET, PT, and UTC with zero clicks. Modern UI, mobile-first, and SEO-friendly.';
const BASE_URL = 'https://timeswitchr.com';

export function constructMetadata({
    title = DEFAULT_TITLE,
    description = DEFAULT_DESC,
    urlPath = '',
    ogImage = '/opengraph-image'
}: MetadataProps = {}): Metadata {
    const fullTitle = title.includes('TimeSwitchr') ? title : `${title} | TimeSwitchr`;
    const fullUrl = `${BASE_URL}${urlPath}`;

    return {
        title: fullTitle,
        description,
        keywords: 'time zone converter, timezone conversion, CET to IST, IST to ET, EST to CET, PT to ET, minimalist world clock',
        alternates: {
            canonical: fullUrl,
        },
        openGraph: {
            title: fullTitle,
            description,
            url: fullUrl,
            siteName: 'TimeSwitchr',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [ogImage],
        }
    };
}
