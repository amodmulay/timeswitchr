'use client';

import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import styles from './HomeContainer.module.css';
import Converter from '@/components/Converter';
import { Presets, WorldClock, ConversionTable } from '@/components/Extras';
import InfoSection from '@/components/InfoSection';
import { getLocalTimeZone } from '@/lib/time';

interface HomeContainerProps {
    initialFrom?: string;
    initialTo?: string;
    title?: string;
    description?: string;
}

function AdPlaceholder({ id, type }: { id: string; type: 'native' | 'sticky' }) {
    return (
        <div
            id={id}
            className={type === 'sticky' ? styles.adSticky : styles.adNative}
        >
            Would you like to place your ad here?
        </div>
    );
}

export default function HomeContainer({
    initialFrom,
    initialTo,
    title = "Fast, Professional Time Zone Converter",
    description
}: HomeContainerProps) {
    const [time, setTime] = useState('12:00');
    const [fromZone, setFromZone] = useState(initialFrom || 'UTC');
    const [toZone, setToZone] = useState(initialTo || 'Asia/Kolkata');
    const [is24h, setIs24h] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const [userPresets, setUserPresets] = useState<string[]>([]);

    // Load preferences on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedFrom = localStorage.getItem('pref-from-zone');
            const storedTo = localStorage.getItem('pref-to-zone');
            const stored24h = localStorage.getItem('pref-is24h');
            const storedPresets = localStorage.getItem('pref-user-presets');

            // Only restore from storage if not on an SEO landing page
            if (!initialFrom && storedFrom) setFromZone(storedFrom);
            if (!initialTo && storedTo) setToZone(storedTo);
            if (stored24h !== null) setIs24h(stored24h === 'true');
            if (storedPresets) setUserPresets(JSON.parse(storedPresets));

            // If no storage and no initial, try local
            if (!initialFrom && !storedFrom) {
                const local = getLocalTimeZone();
                setFromZone(local.id);
            }

            // Set current time on load
            setTime(DateTime.now().toFormat('HH:mm'));

            setIsInitialized(true);
        }
    }, [initialFrom, initialTo]);

    // Save preferences on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('pref-from-zone', fromZone);
            localStorage.setItem('pref-to-zone', toZone);
            localStorage.setItem('pref-is24h', is24h.toString());
            localStorage.setItem('pref-user-presets', JSON.stringify(userPresets));
        }
    }, [fromZone, toZone, is24h, userPresets, isInitialized]);

    const handlePresetSelect = (from: string, to: string) => {
        setFromZone(from);
        setToZone(to);
    };

    const handleAddPreset = (zone: string) => {
        setUserPresets(prev => {
            const next = prev.filter(p => p !== zone);
            next.unshift(zone); // Add to front
            return next.slice(0, 3); // Keep only 3
        });
    };

    return (
        <main className="container">
            <h1>{title}</h1>

            {userPresets.length > 0 ? (
                <>
                    <div className={styles.sectionHeader}>
                        <h2 className="text-center">Your Presets</h2>
                        <button
                            className={styles.clearButton}
                            onClick={() => {
                                if (confirm('Clear all your saved presets?')) {
                                    setUserPresets([]);
                                }
                            }}
                        >
                            - Clear
                        </button>
                    </div>
                    <Presets
                        userPresets={userPresets}
                        onSelect={handlePresetSelect}
                        baseTime={time}
                        baseZone={fromZone}
                    />
                </>
            ) : (
                <>
                    <div className={styles.sectionHeader}>
                        <h2 className="text-center">Popular Conversions</h2>
                        <div className={styles.quickLinks}>
                            <a href="/info#why" className={styles.quickLink}>Why?</a>
                            <a href="/info#faq" className={styles.quickLink}>FAQ</a>
                            <a href="/info#tips" className={styles.quickLink}>Tips</a>
                            <a href="mailto:themvpletter@gmail.com" className={styles.quickLink}>Contact</a>
                        </div>
                    </div>
                    <Presets
                        userPresets={[]}
                        onSelect={handlePresetSelect}
                        baseTime={time}
                        baseZone={fromZone}
                    />
                </>
            )}

            <div className="mt-8">
                <Converter
                    time={time}
                    setTime={setTime}
                    fromZone={fromZone}
                    setFromZone={setFromZone}
                    toZone={toZone}
                    setToZone={setToZone}
                    is24h={is24h}
                    onToggle24h={setIs24h}
                    onAddPreset={handleAddPreset}
                    isPreset={userPresets.includes(toZone)}
                    isInitialized={isInitialized}
                />
            </div>

            <AdPlaceholder id="native-ad-1" type="native" />

            <h2 className="mt-8 text-center">World Clock</h2>
            <WorldClock />

            <ConversionTable />

            <section className="mt-8 text-sm text-muted" style={{ maxWidth: '600px', margin: '1.25rem auto 0' }}>
                {(description ? description.split(/\n\s*\n/) : [
                    "TimeSwitchr is a professional-grade time zone converter built for global teams and remote work coordination.",
                    "The tool provides instant, zero-click conversions between timezones like CET, IST, ET, PT, and hundreds of other world regions.",
                    "Whether you are scheduling cross-continental meetings or tracking global market hours, TimeSwitchr offers a minimalist and high-performance experience.",
                    "Optimized for both desktop and mobile use, helping you manage international schedules with precision and speed."
                ]).map((para, i) => (
                    <p key={`para-${i}`} className={i > 0 ? 'mt-4' : ''}>
                        {para.trim()}
                    </p>
                ))}
            </section>
        </main>
    );
}
