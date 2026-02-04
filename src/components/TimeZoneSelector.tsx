'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { getAllTimeZones, TimeZone, isSameZone } from '@/lib/time';
import styles from './TimeZoneSelector.module.css';

interface TimeZoneSelectorProps {
    value: string; // IANA ID
    onChange: (id: string) => void;
    label?: string;
}

export default function TimeZoneSelector({ value, onChange, label }: TimeZoneSelectorProps) {
    const allZones = useMemo(() => getAllTimeZones(), []);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedZone = useMemo(() =>
        allZones.find(tz => isSameZone(tz.id, value) || tz.label === value),
        [allZones, value]);

    // Reset search when value changes from outside (e.g. presets or swap)
    useEffect(() => {
        setSearch('');
    }, [value]);

    const filteredZones = useMemo(() => {
        if (!search) return allZones.slice(0, 100); // Show first 100 if no search
        const lowerSearch = search.toLowerCase();
        return allZones.filter(tz =>
            tz.label.toLowerCase().includes(lowerSearch) ||
            tz.id.toLowerCase().includes(lowerSearch) ||
            tz.name.toLowerCase().includes(lowerSearch)
        ).slice(0, 100);
    }, [allZones, search]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputClick = () => {
        setIsOpen(true);
        if (!isOpen) setSearch(''); // Reset search when opening
    };

    const handleSelect = (zone: TimeZone) => {
        onChange(zone.id);
        setIsOpen(false);
        setSearch('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') setIsOpen(true);
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex(prev => (prev < filteredZones.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (activeIndex >= 0 && filteredZones[activeIndex]) {
                    handleSelect(filteredZones[activeIndex]);
                } else if (filteredZones.length > 0) {
                    handleSelect(filteredZones[0]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    // Auto-scroll the active item into view
    useEffect(() => {
        if (activeIndex >= 0) {
            const dropdown = containerRef.current?.querySelector(`.${styles.dropdown}`) as HTMLElement;
            const item = dropdown?.children[activeIndex] as HTMLElement;
            if (item && dropdown) {
                const itemTop = item.offsetTop;
                const itemHeight = item.offsetHeight;
                const itemBottom = itemTop + itemHeight;
                const dropdownTop = dropdown.scrollTop;
                const dropdownHeight = dropdown.offsetHeight;
                const dropdownBottom = dropdownTop + dropdownHeight;

                if (itemTop < dropdownTop) {
                    dropdown.scrollTop = itemTop;
                } else if (itemBottom > dropdownBottom) {
                    dropdown.scrollTop = itemBottom - dropdownHeight;
                }
            }
        }
    }, [activeIndex]);

    return (
        <div className={styles.selectorWrapper} ref={containerRef}>
            <div className={`${styles.inputWrapper} ${isOpen ? styles.inputWrapperActive : ''}`}>
                <input
                    ref={inputRef}
                    type="text"
                    className={styles.searchInput}
                    placeholder={selectedZone ? selectedZone.label : "Search city or timezone..."}
                    value={isOpen ? search : (selectedZone?.label || '')}
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={handleInputClick}
                    onFocus={handleInputClick}
                    onKeyDown={handleKeyDown}
                    aria-label={label}
                />
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    {filteredZones.length > 0 ? (
                        filteredZones.map((tz, index) => (
                            <div
                                key={tz.id}
                                className={`${styles.option} ${index === activeIndex ? styles.optionActive : ''}`}
                                onClick={() => handleSelect(tz)}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <span className={styles.optionLabel}>{tz.label}</span>
                                <span className={styles.optionName}>{tz.name}</span>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noResults}>No cities found for "{search}"</div>
                    )}
                </div>
            )}
        </div>
    );
}
