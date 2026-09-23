import { describe, expect, it } from 'vitest';

import { CACHE_MAX_MEMORY_SIZE, PRODUCTION_RAM_BYTES } from './index';
import { formatUptime, percentOfRam, renderMemoryReport } from './report';

const snapshot = {
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
};

describe('memory report', () => {
    it('measures each reading against the 512 MB App Platform box', () => {
        expect(PRODUCTION_RAM_BYTES).toBe(512 * 1024 * 1024);
        expect(percentOfRam(256 * 1024 * 1024)).toBe(50);
        expect(percentOfRam(PRODUCTION_RAM_BYTES)).toBe(100);
        expect(percentOfRam(PRODUCTION_RAM_BYTES * 2)).toBe(100);
    });

    it('renders uptime in hours and minutes', () => {
        expect(formatUptime(3661)).toBe('1 h 1 min');
        expect(formatUptime(45)).toBe('45 s');
    });

    it('exports a Czech HTML page with progress bars and cache labels', () => {
        const html = renderMemoryReport(snapshot);

        expect(html).toContain('<!DOCTYPE html>');
        expect(html).toContain('512 MB RAM');
        expect(html).toContain('1 Shared vCPU');
        expect(html).toContain('50 GB');
        expect(html).toContain('style="width: 50%"');
        expect(html).toContain('rss');
        expect(html).toContain('App Platform');
        expect(html).toContain('heapUsed');
        expect(html).toContain('LRU');
        expect(html).toContain('arrayBuffers');
        expect(html).toContain('cacheMaxMemorySize');
        expect(html).toContain('50');
        expect(html).toContain('1 h 1 min');
        expect(html).toContain('Paměť procesu');
    });
});
