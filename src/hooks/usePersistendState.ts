import { useEffect, useState } from "react";

export function usePersistedState<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = sessionStorage.getItem(key);
            return stored ? (JSON.parse(stored) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch(err) {
            console.error(err);
        }
    }, [key, value]);

    return [value, setValue] as const;
}