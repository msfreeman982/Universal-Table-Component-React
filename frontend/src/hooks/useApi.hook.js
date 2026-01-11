import { useState, useCallback } from 'react';

export const useApi = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setPage] = useState(1);
    // TO OD: USe state as object

    const fetchAPI = useCallback(async (url = '', method = 'GET', body = null, params = {}) => {
        setLoading(true);
        setError(null);

        // TO DO: Need to fix url
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
        let fullUrl = `${baseUrl}${url}`;

        if (method === 'GET') {
            const queryParams = new URLSearchParams({ page: currentPage, ...params });
            fullUrl += `?${queryParams}`;
        }

        try {
            const requestBody = body && method !== 'GET' ? JSON.stringify(body) : undefined;

            const response = await fetch(fullUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody,
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage;
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.message;
                } catch {
                    errorMessage = errorText || response.statusText;
                }
                throw new Error(errorMessage || `HTTP ${response.status}`);
            }

            if (response.status === 204) return null;

            const responseData = await response.json();
            setData(responseData);
            return responseData;
        } catch (error) {
            const errorMessage = error.message || 'Something went wrong';
            setError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    const resetError = () => {
        setError(null);
    };

    return {
        data,
        loading,
        error,
        fetchAPI,
        setPage,
        currentPage,
        resetError
    };
};
