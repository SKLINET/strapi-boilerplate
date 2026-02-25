import { fetchContent, FetchOptions } from '@croct/plug-next/server';
import { JsonObject } from '@croct/plug-react';
import { croctConfig } from './config';
import { CroctFetchOptions, FetchCroctResult } from '../../types/croct';

export async function fetchCroctContent<T extends JsonObject>(
    options: CroctFetchOptions<T>,
): Promise<FetchCroctResult<T>> {
    const { slotId, fallback, preferredLocale, timeout = 5000 } = options;

    if (!croctConfig.appId) {
        if (croctConfig.debug) {
            console.warn('[Croct] App ID not configured, using fallback');
        }
        return {
            content: fallback,
            usedCroct: false,
            error: 'Croct not configured',
        };
    }

    try {
        const fetchOptions: FetchOptions = {
            fallback: fallback as unknown as JsonObject,
            preferredLocale,
            timeout,
        };

        const result = await fetchContent(slotId as any, fetchOptions as any);

        if (croctConfig.debug) {
            console.log(`[Croct] Slot "${slotId}" fetched successfully`);
        }

        return {
            content: result.content as unknown as T,
            usedCroct: true,
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        if (croctConfig.debug) {
            console.error(`[Croct] Error fetching slot "${slotId}":`, errorMessage);
        }

        return {
            content: fallback,
            usedCroct: false,
            error: errorMessage,
        };
    }
}

// Batch fetch multiple slots in parallel
export async function fetchCroctContentBatch<T extends Record<string, CroctFetchOptions<JsonObject>>>(
    slots: T,
): Promise<{
    [K in keyof T]: FetchCroctResult<T[K]['fallback']>;
}> {
    const entries = Object.entries(slots);
    const results = await Promise.all(entries.map(([_, options]) => fetchCroctContent(options)));
    return Object.fromEntries(entries.map(([key], index) => [key, results[index]])) as {
        [K in keyof T]: FetchCroctResult<T[K]['fallback']>;
    };
}
