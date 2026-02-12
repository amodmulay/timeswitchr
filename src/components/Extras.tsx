'use client';

import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { COMMON_TIMEZONES, WORLD_CLOCK_ZONES, convertTime, getBestCityForZone } from '@/lib/time';
import styles from './Extras.module.css';
import { trackEvent } from '@/lib/analytics';

interface Preset {
    from: string;
    to: string;
    label: string;
}

const PRESETS: Preset[] = [
    { from: 'America/New_York', to: 'Asia/Kolkata', label: 'US → India' },
    { from: 'America/New_York', to: 'Asia/Shanghai', label: 'US → China' },
    { from: 'America/New_York', to: 'Asia/Tokyo', label: 'US → Japan' },
    { from: 'Europe/Berlin', to: 'Asia/Kolkata', label: 'CET → India' },
    { from: 'Europe/Berlin', to: 'Asia/Shanghai', label: 'CET → China' },
    { from: 'Europe/Berlin', to: 'Asia/Tokyo', label: 'CET → Japan' },
];

interface PresetsProps {
    onSelect: (from: string, to: string) => void;
    userPresets?: string[];
    baseTime?: string;
    baseZone?: string;
}

export function Presets({ onSelect, userPresets = [], baseTime = '12:00', baseZone = 'UTC' }: PresetsProps) {
    const handleSelect = (from: string, to: string, label: string) => {
        onSelect(from, to);
        trackEvent({
            action: 'preset_click',
            category: 'presets',
            label: label
        });
    };

    if (userPresets.length > 0) {
        return (
            <div className={styles.userPresetsGrid}>
                {userPresets.map((zoneId) => {
                    const result = convertTime(baseTime, baseZone, zoneId);
                    const city = getBestCityForZone(zoneId);
                    const now = DateTime.now().setZone(zoneId);
                    const abbrev = now.toFormat('ZZZZ');

                    return (
                        <div
                            key={zoneId}
                            className={styles.clockItem}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSelect(baseZone, zoneId, `User Preset ${city}`)}
                        >
                            <span className={styles.clockLabel}>{city}</span>
                            <span className={styles.clockTime}>{result.convertedTime}</span>
                            <span className={styles.clockDate}>{now.toFormat('ccc, LLL d')}</span>
                            <span style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '0.25rem' }}>
                                {abbrev}
                            </span>
                        </div>
                    );
                })}
                <p className={styles.privacyNote}>
                    Presets are stored locally in your browser and never sent to a server.
                </p>
            </div>
        );
    }

    return (
        <div className={styles.presets}>
            {PRESETS.map((p) => (
                <button
                    key={p.label}
                    className={styles.presetButton}
                    onClick={() => handleSelect(p.from, p.to, p.label)}
                >
                    {p.label}
                </button>
            ))}
        </div>
    );
}

export function WorldClock() {
    const [times, setTimes] = useState<Record<string, { time: string, date: string, city: string, abbrev: string }>>({});

    useEffect(() => {
        const update = () => {
            const now = DateTime.now();
            const newTimes: Record<string, { time: string, date: string, city: string, abbrev: string }> = {};

            WORLD_CLOCK_ZONES.forEach(z => {
                const tz = COMMON_TIMEZONES.find(t => t.id === z);
                if (tz) {
                    const zTime = now.setZone(z);
                    const city = getBestCityForZone(z);
                    const abbrev = zTime.toFormat('ZZZZ');

                    newTimes[z] = {
                        time: zTime.toFormat('h:mm a'),
                        date: zTime.toFormat('ccc, LLL d'),
                        city,
                        abbrev
                    };
                }
            });
            setTimes(newTimes);
        };

        update();
        const timer = setInterval(update, 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.worldClock}>
            {Object.entries(times).map(([zoneId, info]) => (
                <div key={zoneId} className={styles.clockItem}>
                    <span className={styles.clockLabel}>{info.city}</span>
                    <span className={styles.clockTime}>{info.time}</span>
                    <span className={styles.clockDate}>{info.date}</span>
                    <span style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '0.25rem' }}>
                        {info.abbrev}
                    </span>
                </div>
            ))}
        </div>
    );
}
