'use client';

import styles from './HomeContainer.module.css';

export default function Footer() {
    return (
        <footer style={{ marginTop: '4rem', padding: '2rem 1rem', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.875rem', color: 'var(--muted)' }}>
            <div className="container">
                <nav style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <a href="/" style={{ color: 'var(--foreground)', fontWeight: 500 }}>Home</a>
                    <a href="/about">About</a>
                    <a href="/info">Guide</a>
                    <a href="/knowledge">Knowledge</a>
                    <a href="/impressum">Impressum</a>
                    <a href="/privacy">Privacy</a>
                    <a href="/stack">Stack</a>
                    <a href="mailto:themvpletter@gmail.com">Contact</a>
                </nav>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', fontSize: '0.75rem', opacity: 0.8, marginBottom: '1rem' }}>
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
    );
}
