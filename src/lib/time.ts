import { DateTime } from 'luxon';
import { EXTRA_CITIES, COUNTRY_PRIMARY_TZ } from './timezone-data';

export interface TimeZone {
    id: string; // IANA name
    label: string; // Abbreviation or City name
    name: string; // Offset and description
}

// These are still used for presets and initial loads
export const COMMON_TIMEZONES: TimeZone[] = [
    { id: 'UTC', label: 'UTC', name: 'Universal Coordinated Time' },
    { id: 'Europe/Berlin', label: 'CET', name: 'Central European Time' },
    { id: 'Europe/Athens', label: 'EET', name: 'Eastern European Time' },
    { id: 'Asia/Kolkata', label: 'IST', name: 'India Standard Time' },
    { id: 'America/New_York', label: 'ET', name: 'Eastern Time' },
    { id: 'America/Los_Angeles', label: 'PT', name: 'Pacific Time' },
    { id: 'America/Chicago', label: 'CT', name: 'Central Time' },
    { id: 'America/Denver', label: 'MT', name: 'Mountain Time' },
    { id: 'Europe/London', label: 'GMT', name: 'Greenwich Mean Time' },
    { id: 'Asia/Tokyo', label: 'JST', name: 'Japan Standard Time' },
    { id: 'Australia/Sydney', label: 'AEST', name: 'Australian Eastern Standard Time' },
    { id: 'Asia/Dubai', label: 'GST', name: 'Gulf Standard Time' },
    { id: 'Asia/Singapore', label: 'SGT', name: 'Singapore Time' },
];

export const WORLD_CLOCK_ZONES = [
    'Europe/Berlin',
    'Asia/Kolkata',
    'America/New_York',
    'America/Los_Angeles'
];

// Heuristic to check if two zone IDs represent the same time rules
export const isSameZone = (id1: string, id2: string) => {
    if (!id1 || !id2) return false;
    if (id1 === id2) return true;
    try {
        const now = DateTime.now();
        const d1 = now.setZone(id1);
        const d2 = now.setZone(id2);
        // Must have same offset and same abbreviation to be considered "the same" for search
        return d1.offset === d2.offset && d1.toFormat('ZZZZ') === d2.toFormat('ZZZZ');
    } catch {
        return false;
    }
};

let allZonesCache: TimeZone[] | null = null;

export function getAllTimeZones(): TimeZone[] {
    if (allZonesCache) return allZonesCache;

    const zones = Intl.supportedValuesOf('timeZone');

    allZonesCache = zones.map(id => {
        const dt = DateTime.now().setZone(id);
        const offset = dt.toFormat('ZZ');
        const cityLabel = id.split('/').pop()?.replace(/_/g, ' ') || id;
        const abbrev = dt.toFormat('ZZZZ');

        // Find all relevant keywords for this zone ID
        const keywords = new Set<string>();

        EXTRA_CITIES.forEach(({ city, country, tzId }) => {
            if (isSameZone(tzId, id)) {
                keywords.add(city);
                keywords.add(country);
            }
        });

        Object.entries(COUNTRY_PRIMARY_TZ).forEach(([country, tzId]) => {
            if (isSameZone(tzId, id)) {
                keywords.add(country);
            }
        });

        // Search for a common name/label
        const common = COMMON_TIMEZONES.find(c => isSameZone(c.id, id));

        const kwList = Array.from(keywords);
        const keywordStr = kwList.length > 0 ? ` - ${kwList.join(', ')}` : '';

        let name = `(UTC${offset}) ${abbrev}`;
        if (common) name += ` - ${common.name}`;
        if (keywordStr) name += `${keywordStr}`;
        name += ` [${id}]`;

        return {
            id,
            label: common?.label || cityLabel,
            name
        };
    }).sort((a, b) => a.label.localeCompare(b.label));

    // De-duplicate zones that have the same display name/offset
    // We keep the one with the shortest ID (usually the canonical one)
    const unique = new Map<string, TimeZone>();
    allZonesCache.forEach(tz => {
        // Remove the [id] from the name for de-duplication comparison
        const baseName = tz.name.split(' [')[0];
        const existing = unique.get(baseName);
        if (!existing || tz.id.length < existing.id.length) {
            unique.set(baseName, tz);
        }
    });
    allZonesCache = Array.from(unique.values());

    return allZonesCache;
}

export interface ConversionResult {
    convertedTime: string;
    dayDiff: number; // -1, 0, 1
    dayLabel: string;
}

export function convertTime(
    timeStr: string, // HH:MM
    fromZone: string,
    toZone: string
): ConversionResult {
    const [hours, minutes] = timeStr.split(':').map(Number);

    // Set current date in 'from' zone but with target time
    const fromDateTime = DateTime.now().setZone(fromZone).set({
        hour: hours,
        minute: minutes,
        second: 0,
        millisecond: 0,
    });

    const toDateTime = fromDateTime.setZone(toZone);

    const dayDiff = toDateTime.startOf('day').diff(fromDateTime.startOf('day'), 'days').days;
    //set the difference to = O if it is -0 as this is what the standard defines
    //The implementation of -0 and +0 is introduced in 1985 by IEEE as part of the IEEE 754 standard.
    //https://en.wikipedia.org/wiki/IEEE_754
    const dayDiffInt = Math.round(dayDiff) + 0;
    let dayLabel = 'Same day';

    if (dayDiffInt > 0) {
        dayLabel = `Next day (+${dayDiffInt})`;
    } else if (dayDiffInt < 0) {
        dayLabel = `Previous day (${dayDiffInt})`;
    }

    return {
        convertedTime: toDateTime.toFormat('h:mm a'),
        dayDiff: dayDiffInt,
        dayLabel,
    };
}

export function getLocalTimeZone(): TimeZone {
    const iana = DateTime.now().zoneName;
    const all = getAllTimeZones();
    const found = all.find(tz => tz.id === iana);

    if (found) return found;

    const dt = DateTime.now().setZone(iana);
    const offset = dt.toFormat('ZZ');
    const city = iana.split('/').pop()?.replace(/_/g, ' ') || iana;

    return {
        id: iana,
        label: city,
        name: `(UTC${offset}) ${dt.toFormat('ZZZZ')} - ${iana}`,
    };
}

export function parseSlug(slug: string): { from: TimeZone | null, to: TimeZone | null } {
    const parts = slug.toLowerCase().split('-to-');
    if (parts.length !== 2) return { from: null, to: null };

    const [fromLabel, toLabel] = parts;
    const all = getAllTimeZones();

    const findZone = (label: string) => {
        // First try common abbreviations
        const common = COMMON_TIMEZONES.find(tz => tz.label.toLowerCase() === label);
        if (common) return common;

        // Then try all zones by label (city)
        return all.find(tz => tz.label.toLowerCase() === label || tz.id.toLowerCase().includes(label)) || null;
    };

    return { from: findZone(fromLabel), to: findZone(toLabel) };
}
