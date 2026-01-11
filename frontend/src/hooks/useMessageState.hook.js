import { useState, useCallback } from 'react';

export const useMessageState = (timeout = 3000) => {
    const [message, setMessage] = useState('');

    const setMessageWithTimeout = useCallback((msg) => {
        setMessage(msg);
        if (msg) {
            setTimeout(() => setMessage(''), timeout);
        }
    }, [timeout]);

    return [message, setMessageWithTimeout];
};