import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
    title: 'Technologies & Open Source Stack | TimeSwitchr',
    description: 'Explore the modern technology stack behind TimeSwitchr: Next.js, TypeScript, Luxon, and more. Open source timezone conversion architecture.',
});

export default function TechStackPage() {
    return (
        <main className="container" style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Technologies & Architecture</h1>

            <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '3rem' }}>
                TimeSwitchr is built using a modern, high-performance web stack designed for precision and speed.
            </p>

            <section style={{ marginBottom: '3rem' }}>
                <h2>Core Technologies</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div style={{ border: '1px solid var(--border)', padding: '1.5rem', borderRadius: 'var(--radius)' }}>
                        <h3>Next.js 16</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>The framework for the web, utilizing the App Router for server-side rendering (SSR) and optimized static generation.</p>
                    </div>
                    <div style={{ border: '1px solid var(--border)', padding: '1.5rem', borderRadius: 'var(--radius)' }}>
                        <h3>React 19</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Leveraging Concurrent Mode and Server Components to deliver a seamless, state-driven user interface.</p>
                    </div>
                    <div style={{ border: '1px solid var(--border)', padding: '1.5rem', borderRadius: 'var(--radius)' }}>
                        <h3>TypeScript</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>A strictly typed superset of JavaScript that ensures data integrity and prevents common runtime errors.</p>
                    </div>
                    <div style={{ border: '1px solid var(--border)', padding: '1.5rem', borderRadius: 'var(--radius)' }}>
                        <h3>Luxon</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>A powerful library for working with dates and times in JS, used for its robust IANA timezone support.</p>
                    </div>
                </div>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2>Project Structure</h2>
                <p style={{ marginBottom: '1rem' }}>The codebase is organized following a minimalist and modular approach:</p>
                <code style={{ display: 'block', background: 'var(--muted-background)', padding: '1.5rem', borderRadius: 'var(--radius)', fontSize: '0.85rem', whiteSpace: 'pre', overflowX: 'auto' }}>
                    {`timeswitchr/
├── src/
│   ├── app/           # Next.js 15 App Router routes
│   │   ├── [slug]/    # Dynamic SEO-optimized landing pages
│   │   └── stack/     # This technology documentation page
│   ├── components/    # Reusable UI components
│   ├── lib/           # Core logic: timezone math, metadata, analytics
│   ├── hooks/         # Custom React hooks for interactions
│   └── styles/        # Global CSS and modular styling
├── public/            # Static assets and PWA manifest
└── package.json       # Project dependencies and scripts`}
                </code>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2>Open Source</h2>
                <p>
                    Transparency and community are core values of this project. The entire source code for TimeSwitchr is available on GitHub under the MIT License. I encourage developers to explore the architecture or contribute to the project.
                </p>
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <a
                        href="https://github.com/amodmulay/timeswitchr"
                        target="_blank"
                        rel="noopener"
                        style={{
                            display: 'inline-block',
                            background: 'var(--foreground)',
                            color: 'var(--background)',
                            padding: '0.75rem 1.75rem',
                            borderRadius: '30px',
                            fontWeight: 600,
                            textDecoration: 'none'
                        }}
                    >
                        View Repository on GitHub
                    </a>
                </div>
            </section>

            <section>
                <h2>Performance & Hosting</h2>
                <p>
                    TimeSwitchr is deployed on the <strong>Vercel Edge Network</strong>, ensuring ultra-low latency globally. Performance is monitored via <strong>Vercel Analytics</strong> to maintain a Core Web Vitals "Pass" status across all devices.
                </p>
            </section>

            <footer style={{ marginTop: '4rem', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                <a href="/" style={{ color: 'var(--foreground)', fontWeight: 500 }}>← Back to Time Converter</a>
            </footer>
        </main>
    );
}
