'use client';

import { useEffect, useState } from 'react';

export default function PwaUpdater() {
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistration().then(reg => {
                if (!reg) return;
                setRegistration(reg);

                // Check for updates on load
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                setUpdateAvailable(true);
                            }
                        });
                    }
                });

                // If there's already a waiting worker
                if (reg.waiting) {
                    setUpdateAvailable(true);
                }
            });

            // Listen for controller changes (reload when new SW takes over)
            let refreshing = false;
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (refreshing) return;
                refreshing = true;
                window.location.reload();
            });
        }
    }, []);

    const updateApp = () => {
        if (registration && registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        setUpdateAvailable(false);
    };

    if (!updateAvailable) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '1rem',
            background: 'var(--foreground)',
            color: 'var(--background)',
            padding: '1rem',
            borderRadius: 'var(--radius)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            maxWidth: '280px',
            animation: 'slideUp 0.3s ease-out'
        }}>
            <style jsx>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500 }}>
                A new version of TimeSwitchr is available!
            </p>
            <button
                onClick={updateApp}
                style={{
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                    border: 'none',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                }}
            >
                Refresh to Update
            </button>
        </div>
    );
}
