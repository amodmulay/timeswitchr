export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export type AnalyticsEvent =
    | { action: 'preset_click', category: 'presets', label: string }
    | { action: 'swap_zones', category: 'converter', label: string }
    | { action: 'time_change', category: 'converter', label: string }
    | { action: 'from_zone_change', category: 'converter', label: string }
    | { action: 'to_zone_change', category: 'converter', label: string }
    | { action: 'mode_toggle', category: 'settings', label: string };

export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

export const trackEvent = (event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event.action, {
            event_category: event.category,
            event_label: event.label,
        });
    }
};

// Compatibility export
export const event = (evt: any) => trackEvent(evt);
