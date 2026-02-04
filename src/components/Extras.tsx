'use client';

import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { COMMON_TIMEZONES } from '@/lib/time';
import styles from './Extras.module.css';
import * as analytics from '@/lib/analytics';

interface Preset {
    from: string;
    to: string;
    label: string;
}

const PRESETS: Preset[] = [
    { from: 'Europe/Berlin', to: 'Asia/Kolkata', label: 'CET → IST' },
    { from: 'Asia/Kolkata', to: 'America/New_York', label: 'IST → ET' },
    { from: 'Europe/Berlin', to: 'America/New_York', label: 'CET → ET' },
    { from: 'Europe/Berlin', to: 'America/Los_Angeles', label: 'CET → PT' },
    { from: 'UTC', to: 'Asia/Kolkata', label: 'UTC → IST' },
];

export function Presets({ onSelect }: { onSelect: (from: string, to: string) => void }) {
    const handleSelect = (from: string, to: string, label: string) => {
        onSelect(from, to);
        analytics.event({
            action: 'preset_click',
            category: 'presets',
            label: label
        });
    };

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
    const [times, setTimes] = useState<Record<string, { time: string, date: string }>>({});

    useEffect(() => {
        const update = () => {
            const now = DateTime.now();
            const newTimes: Record<string, { time: string, date: string }> = {};
            const zones = ['Europe/Berlin', 'Asia/Kolkata', 'America/New_York', 'America/Los_Angeles'];

            zones.forEach(z => {
                const tz = COMMON_TIMEZONES.find(t => t.id === z);
                if (tz) {
                    const zTime = now.setZone(z);
                    newTimes[tz.label] = {
                        time: zTime.toFormat('h:mm a'),
                        date: zTime.toFormat('ccc, LLL d')
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
            {Object.entries(times).map(([label, info]) => (
                <div key={label} className={styles.clockItem}>
                    <span className={styles.clockLabel}>{label}</span>
                    <span className={styles.clockTime}>{info.time}</span>
                    <span className={styles.clockDate}>{info.date}</span>
                </div>
            ))}
        </div>
    );
}
