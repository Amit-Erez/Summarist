"use client"
import { useState, useEffect } from "react";

export function useSearchBounce<T>(value: T, delay = 300): T | null {
    const [debouncedValue, setDebouncedValue] = useState<T | null>(value);

    useEffect(() => {
        if (value === "" || value === null) {
      setDebouncedValue(null);
      return;
    }

        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(handler);
            
        };
    }, [value, delay])

    return debouncedValue;
}