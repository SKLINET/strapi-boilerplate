'use client';

import { useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAP_API_KEY } from '../../constants';

// Global state to track if loader has been initialized and with what locale
let loaderInitialized = false;
let initializedLocale: string | null = null;

/**
 * Hook to load Google Maps API only once when needed
 * Ensures that all map instances use the same locale to avoid loader conflicts
 */
export const useGoogleMapsLoader = (locale: string) => {
    // If this is the first call, store the locale
    if (!loaderInitialized) {
        initializedLocale = locale;
        loaderInitialized = true;
    }

    // Always use the initially set locale to avoid the error
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAP_API_KEY,
        language: initializedLocale || locale,
        libraries: ['maps'],
    });

    return { isLoaded };
};
