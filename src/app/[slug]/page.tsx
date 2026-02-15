import { parseSlug } from '@/lib/time';
import HomeContainer from '@/components/HomeContainer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/metadata';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const { from, to } = parseSlug(slug);

    if (!from || !to) {
        return constructMetadata({ title: 'Page Not Found' });
    }

    const title = `${from.label} to ${to.label} Time Converter`;
    const description = `Easily convert time from ${from.label} (${from.name}) to ${to.label} (${to.name}). Fast, minimalist, and real-time conversion with TimeSwitchr.`;

    return constructMetadata({
        title,
        description,
        urlPath: `/${slug}`
    });
}

export default async function PresetPage({ params }: PageProps) {
    const { slug } = await params;
    const { from, to } = parseSlug(slug);

    if (!from || !to) {
        notFound();
    }

    const title = `${from.label} to ${to.label}`;
    const description = `This dedicated landing page helps you convert time between ${from.name} and ${to.name} instantly. 
  Whether you're scheduling a meeting in ${from.label} for a team in ${to.label}, or just checking the current offset, 
  TimeSwitchr provides the fastest way to get the job done. Use the input below to see the time difference in real-time.

  ### Why use TimeSwitchr for ${from.label} to ${to.label}?
  Converting time zones can be confusing, especially with Daylight Saving Time changes and varying offsets. 
  My tool is designed to be the fastest way to see the time difference. 
  - **Zero Click Conversion**: Just type the time or use the rolling wheels.
  - **Always Accurate**: Powered by the latest IANA timezone data.
  - **Perfect for Meetings**: Quickly find the best time for your global team members in ${from.label} and ${to.label}.

  ### How it works
  1. **Select the Time**: Use the premium rolling wheels or switch to keyboard mode to enter the time in ${from.label}.
  2. **Instant Result**: The converted time for ${to.label} appears immediately below.
  3. **Day Shift Alerts**: If the conversion crosses into the next or previous day, you'll see a clear label (e.g., "+1 Day").
  4. **Swap Zones**: Click the swap button to instantly see the conversion from ${to.label} to ${from.label}.

  TimeSwitchr is optimized for mobile and desktop, ensuring you have a smooth experience no matter where you are. 
  Save this page to your bookmarks for quick access to your most common timezone conversions.`;

    return (
        <>
            <HomeContainer
                initialFrom={from.id}
                initialTo={to.id}
                title={title}
                description={description}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            '@context': 'https://schema.org',
                            '@type': 'SoftwareApplication',
                            'name': 'TimeSwitchr',
                            'applicationCategory': 'UtilitiesApplication',
                            'offers': {
                                '@type': 'Offer',
                                'price': '0',
                                'priceCurrency': 'USD'
                            },
                            'description': description,
                            'operatingSystem': 'All'
                        },
                        {
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            'itemListElement': [
                                {
                                    '@type': 'ListItem',
                                    'position': 1,
                                    'name': 'Home',
                                    'item': 'https://timeswitchr.com'
                                },
                                {
                                    '@type': 'ListItem',
                                    'position': 2,
                                    'name': title,
                                    'item': `https://timeswitchr.com/${slug}`
                                }
                            ]
                        }
                    ])
                }}
            />
        </>
    );
}
