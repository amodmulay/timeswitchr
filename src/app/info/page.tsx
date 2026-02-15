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

        </main>
    );
}
