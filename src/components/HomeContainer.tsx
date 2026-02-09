'use client';

import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import styles from './HomeContainer.module.css';
import Converter from '@/components/Converter';
import { Presets, WorldClock } from '@/components/Extras';
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
            Ad Slot: {id} ({type})
        </div>
    );
}

export default function HomeContainer({
    initialFrom,
    initialTo,
    title = "TimeSwitchr",
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
            return next.slice(0, 4); // Keep only 4
        });
    };

    return (
        <main className="container">
            <h1>{title}</h1>

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
            />

            <AdPlaceholder id="native-ad-1" type="native" />

            <h2 className="mt-8 text-center">{userPresets.length > 0 ? 'Your Presets' : 'Quick Presets'}</h2>
            <Presets
                userPresets={userPresets}
                onSelect={handlePresetSelect}
                baseTime={time}
                baseZone={fromZone}
            />

            <h2 className="mt-8 text-center">World Clock</h2>
            <WorldClock />

            <section className="mt-8 text-sm text-muted" style={{ maxWidth: '600px', margin: '2rem auto 0' }}>
                {(description || `TimeSwitchr is a minimalist time zone converter designed for speed. 
          Instantly convert between CET, IST, ET, PT, and more with zero clicks.
          Perfect for scheduled meetings and international calls.`).split('\n\n').map((para, i) => (
                    <p key={i} className={i > 0 ? 'mt-4' : ''}>
                        {para.trim()}
                    </p>
                ))}
            </section>

            <AdPlaceholder id="footer-ad" type="sticky" />
        </main>
    );
}
