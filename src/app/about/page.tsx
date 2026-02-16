'use client';

import BackButton from "@/components/BackButton";

export default function AboutPage() {
    return (
        <main className="container" style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem' }}>
            <BackButton />
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>About TimeSwitchr</h1>

            <section style={{ marginBottom: '3rem' }}>
                <h2>What is Vibe Coding?</h2>
                <p>
                    TimeSwitchr is a product of <strong>Vibe Coding</strong>—a development methodology where human creativity and intent are translated into high-quality code through advanced AI collaboration.
                    The project was built using <strong>Antigravity</strong>, Google's powerful AI agentic workflow, allowing for rapid iteration, complex refactoring, and logical consistency at the speed of thought.
                </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2>Technical Stack</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '1rem' }}>
                        <strong>Framework:</strong> Built with <a href="https://nextjs.org/" target="_blank" rel="noopener">Next.js</a> using the modern <strong>App Router</strong> for optimized performance and SEO.
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                        <strong>Logic & Time:</strong> Powered by <a href="https://moment.github.io/luxon/" target="_blank" rel="noopener">Luxon</a>, chosen for its superior handling of IANA timezone data and Daylight Saving Time (DST) complexities.
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                        <strong>Language:</strong> Strictly typed with <strong>TypeScript</strong> to ensure robust data handling and developer productivity.
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                        <strong>Styling:</strong> Minimalist aesthetics achieved via <strong>Vanilla CSS Modules</strong>, emphasizing speed and zero-runtime overhead.
                    </li>
                </ul>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2>Project Structure</h2>
                <p>The application follows a clean, modular architecture:</p>
                <code style={{ display: 'block', background: 'var(--muted-background)', padding: '1rem', borderRadius: 'var(--radius)', fontSize: '0.85rem', whiteSpace: 'pre' }}>
                    {`/src
  /app         - Next.js App Router (Pages, Layouts, Manifest)
  /components  - Modular React components (Converter, Extras, Info)
  /lib         - Core logic (Time conversion, Analytics, Metadata)
  /hooks       - Custom React hooks
/public        - Static assets (PWA icons, Service Worker)`}
                </code>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2>Development Principles</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div style={{ background: 'var(--muted-background)', padding: '1.25rem', borderRadius: 'var(--radius)' }}>
                        <h4 style={{ marginTop: 0 }}>Zero Click</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Information and conversions are provided instantly as the user interacts.</p>
                    </div>
                    <div style={{ background: 'var(--muted-background)', padding: '1.25rem', borderRadius: 'var(--radius)' }}>
                        <h4 style={{ marginTop: 0 }}>Privacy First</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>User preferences and presets are stored locally, never on a third-party server.</p>
                    </div>
                    <div style={{ background: 'var(--muted-background)', padding: '1.25rem', borderRadius: 'var(--radius)' }}>
                        <h4 style={{ marginTop: 0 }}>SEO Optimized</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Dynamic metadata generation for thousands of timezone pairs.</p>
                    </div>
                </div>
            </section>

            <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h2>Repository</h2>
                <p>Curious about the code? Check out the project on GitHub:</p>
                <a
                    href="https://github.com/amodmulay/timeswitchr"
                    target="_blank"
                    rel="noopener"
                    style={{
                        display: 'inline-block',
                        background: 'var(--foreground)',
                        color: 'var(--background)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '20px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        marginTop: '1rem'
                    }}
                >
                    View on GitHub
                </a>
            </section>

        </main >
    );
}
