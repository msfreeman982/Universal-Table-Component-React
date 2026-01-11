import { useState, useEffect } from 'react';

export const useDebounce = (value, duration = 800) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebouncedValue(value);
        }, duration);

        return () => clearTimeout(debounceTimer);
    }, [value, duration]);

    return debouncedValue;
};
