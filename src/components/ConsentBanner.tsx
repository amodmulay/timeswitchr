'use client';

import { useState, useEffect } from 'react';
import styles from './ConsentBanner.module.css';

export default function ConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);

        // Update Google Consent Mode
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'personalization_storage': 'granted'
            });
        }

        window.dispatchEvent(new Event('cookie-consent-updated'));
        window.location.reload(); // Still reload to be safe and activate all features
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
        window.dispatchEvent(new Event('cookie-consent-updated'));
    };

    if (!isVisible) return null;

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <p>
                    We use cookies to improve your experience and for advertising.
                    Manage your preferences below or read our <a href="/privacy">Privacy Policy</a>.
                </p>
                <div className={styles.buttons}>
                    <button onClick={handleAccept} className={styles.accept}>Accept</button>
                    <button onClick={handleDecline} className={styles.decline}>Decline</button>
                </div>
            </div>
        </div>
    );
}
