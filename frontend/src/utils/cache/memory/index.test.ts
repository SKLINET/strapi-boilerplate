import { afterEach, describe, expect, it, vi } from 'vitest';

import { CACHE_MAX_MEMORY_SIZE, PRODUCTION_RAM_BYTES, snapshotMemoryUsage } from './index';

describe('cache memory snapshot', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should repeat the documented 50 MB default next to the production box size', () => {
        expect(CACHE_MAX_MEMORY_SIZE).toBe(50 * 1024 * 1024);
        expect(PRODUCTION_RAM_BYTES).toBe(512 * 1024 * 1024);
    });

    it('should stay in step with next.config, which leaves cacheMaxMemorySize on its default', async () => {
        // If the option is ever set there, the constant has to move with it or the report draws the
        // wrong cap.
        const { default: nextConfig } = await import('../../../../next.config');

        expect(nextConfig.cacheMaxMemorySize ?? CACHE_MAX_MEMORY_SIZE).toBe(CACHE_MAX_MEMORY_SIZE);
    });

    it('should put process.memoryUsage next to that budget so heapUsed and arrayBuffers can be told apart', () => {
        vi.spyOn(process, 'memoryUsage').mockReturnValue({
            rss: 256 * 1024 * 1024,
            heapTotal: 180 * 1024 * 1024,
            heapUsed: 140 * 1024 * 1024,
            external: 24 * 1024 * 1024,
            arrayBuffers: 16 * 1024 * 1024,
        });
        vi.spyOn(process, 'uptime').mockReturnValue(3661.4);

        expect(snapshotMemoryUsage()).toEqual({
            rss: 256 * 1024 * 1024,
            heapTotal: 180 * 1024 * 1024,
            heapUsed: 140 * 1024 * 1024,
            external: 24 * 1024 * 1024,
            arrayBuffers: 16 * 1024 * 1024,
            cacheMaxMemorySize: CACHE_MAX_MEMORY_SIZE,
            mib: {
                rss: 256,
                heapTotal: 180,
                heapUsed: 140,
                external: 24,
                arrayBuffers: 16,
                cacheMaxMemorySize: 50,
            },
            uptimeSeconds: 3661,
        });
    });
});
