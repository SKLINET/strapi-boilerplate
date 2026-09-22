import { describe, expect, it, vi } from 'vitest';
import { bypassCacheIfPreview } from './index';

describe('bypassCacheIfPreview', () => {
    it('should read from the cached branch when preview is off', async () => {
        const readCached = vi.fn(async () => 'cached');
        const readFresh = vi.fn(async () => 'fresh');

        await expect(bypassCacheIfPreview(false, readCached, readFresh)).resolves.toBe('cached');
        expect(readFresh).not.toHaveBeenCalled();
    });

    it('should treat an undefined preview flag as published', async () => {
        const readCached = vi.fn(async () => 'cached');
        const readFresh = vi.fn(async () => 'fresh');

        await expect(bypassCacheIfPreview(undefined, readCached, readFresh)).resolves.toBe('cached');
        expect(readFresh).not.toHaveBeenCalled();
    });

    it('should never enter the cached branch in preview', async () => {
        // The point of the helper: a draft payload must not be able to fill a published cache entry.
        const readCached = vi.fn(async () => 'cached');
        const readFresh = vi.fn(async () => 'fresh');

        await expect(bypassCacheIfPreview(true, readCached, readFresh)).resolves.toBe('fresh');
        expect(readCached).not.toHaveBeenCalled();
    });
});
