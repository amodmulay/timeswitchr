'use client';

import { COMMON_TIMEZONES, convertTime } from '@/lib/time';
import styles from './Converter.module.css';
import { trackEvent } from '@/lib/analytics';
import TimePicker from './TimePicker';
import TimeZoneSelector from './TimeZoneSelector';

interface ConverterProps {
    time: string;
    setTime: (t: string) => void;
    fromZone: string;
    setFromZone: (z: string) => void;
    toZone: string;
    setToZone: (z: string) => void;
    is24h: boolean;
    onToggle24h: (val: boolean) => void;
    onAddPreset?: (z: string) => void;
    isPreset?: boolean;
}

export default function Converter({
    time,
    setTime,
    fromZone,
    setFromZone,
    toZone,
    setToZone,
    is24h,
    onToggle24h,
    onAddPreset,
    isPreset,
}: ConverterProps) {
    const result = convertTime(time, fromZone, toZone);

    const handleSwap = () => {
        const temp = fromZone;
        setFromZone(toZone);
        setToZone(temp);
        trackEvent({
            action: 'swap_zones',
            category: 'converter',
            label: `${fromZone}_to_${toZone}`
        });
    };

    const handleTimeChange = (t: string) => {
        setTime(t);
        // Track full time changes
        if (t.length === 5) {
            trackEvent({
                action: 'time_change',
                category: 'converter',
                label: t
            });
        }
    };

    const handleFromChange = (z: string) => {
        setFromZone(z);
        trackEvent({
            action: 'from_zone_change',
            category: 'converter',
            label: z
        });
    };

    const handleToChange = (z: string) => {
        setToZone(z);
        trackEvent({
            action: 'to_zone_change',
            category: 'converter',
            label: z
        });
    };

    return (
        <div className={styles.converter}>
            <div className={styles.inputGroup}>
                <label className={styles.label}>Select Time</label>
                <TimePicker
                    value={time}
                    onChange={handleTimeChange}
                    is24h={is24h}
                    onToggle24h={onToggle24h}
                />
            </div>

            <div className={styles.zoneSelection}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>From</label>
                    <TimeZoneSelector
                        value={fromZone}
                        onChange={handleFromChange}
                        label="From Time Zone"
                    />
                </div>

                <button className={styles.swapButton} onClick={handleSwap} aria-label="Swap Time Zones">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M7 10l5-5 5 5M7 14l5 5 5-5" />
                    </svg>
                </button>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>To</label>
                    <TimeZoneSelector
                        value={toZone}
                        onChange={handleToChange}
                        label="To Time Zone"
                    />
                </div>
            </div>

            <div className={styles.resultSection}>
                <span className={styles.resultTime}>{result.convertedTime}</span>
                <span className={styles.resultDay}>{result.dayLabel}</span>

                {onAddPreset && (
                    <div style={{ marginTop: '0.5rem' }}>
                        {isPreset ? (
                            <span className={styles.addedBadge}>Saved to Presets</span>
                        ) : (
                            <button
                                className={styles.addPresetButton}
                                onClick={() => onAddPreset(toZone)}
                            >
                                + Add to Presets
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
