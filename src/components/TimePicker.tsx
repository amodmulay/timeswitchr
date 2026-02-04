'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './TimePicker.module.css';

interface WheelProps {
    range: number[];
    value: number;
    onChange: (val: number) => void;
    onEnterTypeMode: () => void;
    label: string;
}

function Wheel({ range, value, onChange, onEnterTypeMode, label }: WheelProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollOffset, setScrollOffset] = useState(0);
    const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
    const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const itemHeight = 60;

    useEffect(() => {
        const index = range.indexOf(value);
        setScrollOffset(-index * itemHeight);
    }, [value, range]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartY(e.pageY - scrollOffset);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const newOffset = e.pageY - startY;
        setScrollOffset(newOffset);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const index = Math.round(-scrollOffset / itemHeight);
        const safeIndex = Math.max(0, Math.min(range.length - 1, index));
        onChange(range[safeIndex]);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartY(e.touches[0].pageY - scrollOffset);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const newOffset = e.touches[0].pageY - startY;
        setScrollOffset(newOffset);
    };

    const handleWheel = (e: React.WheelEvent) => {
        const direction = e.deltaY > 0 ? 1 : -1;
        const currentIndex = range.indexOf(value);
        const nextIndex = Math.max(0, Math.min(range.length - 1, currentIndex + direction));
        onChange(range[nextIndex]);
    };

    const step = (direction: 1 | -1) => {
        const currentIndex = range.indexOf(value);
        const nextIndex = (currentIndex + direction + range.length) % range.length;
        onChange(range[nextIndex]);
    };

    const startHold = (e: React.MouseEvent | React.TouchEvent, direction: 1 | -1) => {
        e.stopPropagation(); // Prevent triggering type mode on parent if any
        step(direction);
        holdTimerRef.current = setTimeout(() => {
            holdIntervalRef.current = setInterval(() => {
                step(direction);
            }, 100);
        }, 300);
    };

    const stopHold = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };

    return (
        <div className={styles.columnContainer}>
            <button
                className={styles.scrollBtn}
                onMouseDown={(e) => startHold(e, -1)}
                onMouseUp={(e) => stopHold(e)}
                onMouseLeave={(e) => stopHold(e)}
                onTouchStart={(e) => startHold(e, -1)}
                onTouchEnd={(e) => stopHold(e)}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Scroll ${label} up`}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
            </button>

            <div
                className={styles.column}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                onWheel={handleWheel}
                onClick={(e) => { e.stopPropagation(); onEnterTypeMode(); }}
            >
                <div
                    className={styles.scrollArea}
                    style={{
                        transform: `translateY(${scrollOffset + (120 / 2) - (itemHeight / 2)}px)`,
                        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                >
                    {range.map((num) => (
                        <div
                            key={num}
                            className={`${styles.digit} ${value === num ? styles.digitActive : ''}`}
                        >
                            {num.toString().padStart(2, '0')}
                        </div>
                    ))}
                </div>
            </div>

            <button
                className={styles.scrollBtn}
                onMouseDown={(e) => startHold(e, 1)}
                onMouseUp={(e) => stopHold(e)}
                onMouseLeave={(e) => stopHold(e)}
                onTouchStart={(e) => startHold(e, 1)}
                onTouchEnd={(e) => stopHold(e)}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Scroll ${label} down`}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
        </div>
    );
}

interface TimePickerProps {
    value: string; // HH:mm
    onChange: (value: string) => void;
    is24h: boolean;
    onToggle24h: (val: boolean) => void;
}

export default function TimePicker({ value, onChange, is24h, onToggle24h }: TimePickerProps) {
    const [period, setPeriod] = useState<'AM' | 'PM'>('PM');
    const [isTypeMode, setIsTypeMode] = useState(false);
    const [typeValue, setTypeValue] = useState(value);

    const [h, m] = value.split(':').map(Number);
    const hoursRange = is24h ? Array.from({ length: 24 }, (_, i) => i) : Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i);
    const minutesRange = Array.from({ length: 60 }, (_, i) => i);

    const currentHour = is24h ? h : (h % 12 === 0 ? 12 : h % 12);
    const currentMinute = m;

    useEffect(() => {
        if (h >= 12) setPeriod('PM');
        else setPeriod('AM');
        setTypeValue(value);
    }, [h, value]);

    const handleHourChange = (newH: number) => {
        let finalH = newH;
        if (!is24h) {
            if (period === 'PM' && newH < 12) finalH += 12;
            if (period === 'AM' && newH === 12) finalH = 0;
        }
        onChange(`${finalH.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`);
    };

    const handleMinuteChange = (newM: number) => {
        onChange(`${h.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`);
    };

    const handleTypeChange = (val: string) => {
        setTypeValue(val);
        if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val)) {
            onChange(val);
        }
    };

    return (
        <div className={styles.timePicker}>
            {!isTypeMode ? (
                <div className={styles.pickerWrapper}>
                    <div className={styles.selectionIndicator} />
                    <Wheel range={hoursRange} value={currentHour} onChange={handleHourChange} onEnterTypeMode={() => setIsTypeMode(true)} label="hour" />
                    <span className={styles.separator}>:</span>
                    <Wheel range={minutesRange} value={currentMinute} onChange={handleMinuteChange} onEnterTypeMode={() => setIsTypeMode(true)} label="minute" />
                </div>
            ) : (
                <div className={styles.typeWrapper}>
                    <input
                        autoFocus
                        type="time"
                        className={`${styles.timeInputBox} ${styles.hideTimeIcon}`}
                        value={typeValue}
                        onChange={(e) => handleTypeChange(e.target.value)}
                        onBlur={() => setIsTypeMode(false)}
                    />
                    <button className={styles.doneButton} onClick={() => setIsTypeMode(false)}>Done</button>
                </div>
            )}

            <div className={styles.toggleContainer}>
                <button
                    className={`${styles.toggleButton} ${is24h ? styles.toggleButtonActive : ''}`}
                    onClick={(e) => { e.stopPropagation(); onToggle24h(true); }}
                >
                    24H
                </button>
                <button
                    className={`${styles.toggleButton} ${!is24h ? styles.toggleButtonActive : ''}`}
                    onClick={(e) => { e.stopPropagation(); onToggle24h(false); }}
                >
                    12H
                </button>
                {!is24h && (
                    <button
                        className={styles.toggleButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            const newPeriod = period === 'AM' ? 'PM' : 'AM';
                            setPeriod(newPeriod);
                            let finalH = currentHour;
                            if (newPeriod === 'PM' && finalH < 12) finalH += 12;
                            if (newPeriod === 'AM' && finalH === 12) finalH = 0;
                            onChange(`${finalH.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`);
                        }}
                    >
                        {period}
                    </button>
                )}
                <button
                    className={styles.typeToggle}
                    onClick={(e) => { e.stopPropagation(); setIsTypeMode(!isTypeMode); }}
                >
                    {isTypeMode ? 'Wheel' : 'Keyboard'}
                </button>
            </div>
            <p className="text-sm text-muted">
                {isTypeMode ? 'Type the time' : 'Scroll wheels, use buttons, or click to type'}
            </p>
        </div>
    );
}
