import { constructMetadata } from '@/lib/metadata';
import InfoSection from '@/components/InfoSection';

export const metadata = constructMetadata({
    title: 'Why Use TimeSwitchr? FAQ & Tips | TimeSwitchr',
    description: 'Learn why TimeSwitchr is the best choice for global teams. Frequently asked questions about UTC, DST, and tips for cross-continental scheduling.',
});

export default function InfoPage() {
    return (
        <main className="container" style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Information & Guide</h1>

            <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '3rem' }}>
                Everything you need to know about using TimeSwitchr effectively for your global coordination.
            </p>

            <InfoSection />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        'mainEntity': [
                            {
                                '@type': 'Question',
                                'name': 'How do I convert time between two specific cities?',
                                'acceptedAnswer': {
                                    '@type': 'Answer',
                                    'text': 'TimeSwitchr uses the IANA database to link major cities to their respective time zones. Type the city name in the input box to instantly resolve and convert the time.'
                                }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Does this tool account for Daylight Saving Time (DST) automatically?',
                                'acceptedAnswer': {
                                    '@type': 'Answer',
                                    'text': 'Yes, the conversion engine calculates the exact offset for the specific date and time entered, accounting for regional DST transitions for both the origin and destination zones.'
                                }
                            },
                            {
                                '@type': 'Question',
                                'name': 'What is the difference between UTC and GMT?',
                                'acceptedAnswer': {
                                    '@type': 'Answer',
                                    'text': 'UTC is a high-precision atomic time standard and the primary reference for civil time, while GMT is a specific time zone. UTC serves as the stable anchor as it does not observe DST.'
                                }
                            },
                            {
                                '@type': 'Question',
                                'name': 'How can I schedule a meeting across three or more time zones?',
                                'acceptedAnswer': {
                                    '@type': 'Answer',
                                    'text': 'The World Clock feature on the homepage allows you to see how your primary time translates across multiple zones simultaneously, helping you find the best overlap for global meetings.'
                                }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Is the converted time always accurate for future dates?',
                                'acceptedAnswer': {
                                    '@type': 'Answer',
                                    'text': 'The tool relies on the latest IANA Time Zone Database (Zoneinfo). It remains accurate as long as government changes to time laws are reported and updated in the database.'
                                }
                            }
                        ]
                    })
                }}
            />
        </main>
    );
}
