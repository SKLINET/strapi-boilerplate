import { useState, useEffect, useMemo } from 'react';

export interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
    loading: boolean;
}

interface GeolocationOptions {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
}

const useGeolocation = (options: GeolocationOptions = {}) => {
    const [state, setState] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        error: null,
        loading: true,
    });

    const memoizedOptions = useMemo(
        () => ({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
            ...options,
        }),
        [options.enableHighAccuracy, options.timeout, options.maximumAge],
    );

    useEffect(() => {
        if (!('geolocation' in navigator)) {
            setState((prev) => ({
                ...prev,
                error: 'Geolocation is not supported by this browser',
                loading: false,
            }));
            return;
        }

        const successHandler = (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            setState({
                latitude,
                longitude,
                error: null,
                loading: false,
            });
        };

        const errorHandler = (error: GeolocationPositionError) => {
            let errorMessage = 'Unknown geolocation error';

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Geolocation permission denied';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information unavailable';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Geolocation request timed out';
                    break;
            }

            setState((prev) => ({
                ...prev,
                error: errorMessage,
                loading: false,
            }));
        };

        navigator.geolocation.getCurrentPosition(successHandler, errorHandler, memoizedOptions);

        // Cleanup function to prevent memory leaks
        return () => {
            // Note: getCurrentPosition doesn't return a watch ID, so no cleanup needed
            // But we keep the cleanup function for consistency and future extensibility
        };
    }, [memoizedOptions]);

    return state;
};

export { useGeolocation };
