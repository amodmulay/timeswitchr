import { useRef, useCallback } from 'react';

/**
 * A hook that provides a consistent way to handle "hold-to-repeat" actions.
 * Useful for buttons that should trigger an action repeatedly when pressed and held.
 */
export function useHoldToRepeat(action: () => void, delay = 300, interval = 100) {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const start = useCallback(() => {
        action();
        timerRef.current = setTimeout(() => {
            intervalRef.current = setInterval(() => {
                action();
            }, interval);
        }, delay);
    }, [action, delay, interval]);

    const stop = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
        timerRef.current = null;
        intervalRef.current = null;
    }, []);

    return { start, stop };
}
