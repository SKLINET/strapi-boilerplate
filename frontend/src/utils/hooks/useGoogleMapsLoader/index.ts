'use client';

import { useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAP_API_KEY } from '../../../constants';

// Global state to track if loader has been initialized and with what locale
let loaderInitialized = false;
let initializedLocale: string | null = null;

/**
 * Latches the locale of the first caller.
 *
 * The Google Maps script is a page-wide singleton, so every map has to load under one language —
 * a second map asking for another one is a loader conflict. The latch lives in a module function
 * rather than in the hook body because the module, not a render, owns this state; reassigning it
 * during render would be a side effect (`react-hooks/globals`).
 */
const resolveLoaderLocale = (locale: string): string => {
    if (!loaderInitialized) {
        initializedLocale = locale;
        loaderInitialized = true;
    }

    return initializedLocale || locale;
};

/**
 * Hook to load Google Maps API only once when needed
 * Ensures that all map instances use the same locale to avoid loader conflicts
 */
export const useGoogleMapsLoader = (locale: string) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAP_API_KEY,
        language: resolveLoaderLocale(locale),
        libraries: ['maps'],
    });

    return { isLoaded };
};
