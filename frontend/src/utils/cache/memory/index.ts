/**
 * Next's documented default for `cacheMaxMemorySize`, repeated here so `/api/memory` can draw the
 * cap the LRUs are actually working against.
 *
 * It is **not** pinned in `next.config.ts`; this is the value Next applies when the option is unset.
 * If the option is ever set there, change this constant with it. Note that Next sizes the server/ISR
 * cache and the `'use cache'` handler separately, so the figure counts twice. Raising it cannot stop
 * RSS growth — it only lets each LRU hold more before eviction.
 */
export const CACHE_MAX_MEMORY_SIZE = 50 * 1024 * 1024;

/**
 * The box that hosts production `next start`. Percentages in the HTML report are read against this,
 * so keep it in step with the actual App Platform instance size — a wrong number here makes a
 * healthy process look like it is about to be killed, or the other way round.
 */
export const PRODUCTION_RAM_BYTES = 512 * 1024 * 1024;
export const PRODUCTION_INSTANCE = {
    ramLabel: '512 MB RAM',
    ramShort: '512 MB',
    vcpuLabel: '1 Shared vCPU',
    bandwidthLabel: '50 GB bandwidth',
} as const;

const bytesToMiB = (bytes: number): number => Math.round((bytes / (1024 * 1024)) * 10) / 10;

/**
 * @description Point-in-time Node RSS vs JS heap vs off-heap buffers, next to the cache cap.
 *
 * `heapUsed` climbing toward the cap with flat `arrayBuffers` is the LRU filling. `arrayBuffers`
 * climbing independently of `heapUsed` is a stream or retention leak outside that LRU. `rss` is what
 * the hosting platform graphs and what the cgroup kills on.
 * @returns {MemorySnapshot} Raw byte counters plus their MiB equivalents and the process uptime
 **/
export const snapshotMemoryUsage = () => {
    const { rss, heapTotal, heapUsed, external, arrayBuffers } = process.memoryUsage();

    return {
        rss,
        heapTotal,
        heapUsed,
        external,
        arrayBuffers,
        cacheMaxMemorySize: CACHE_MAX_MEMORY_SIZE,
        mib: {
            rss: bytesToMiB(rss),
            heapTotal: bytesToMiB(heapTotal),
            heapUsed: bytesToMiB(heapUsed),
            external: bytesToMiB(external),
            arrayBuffers: bytesToMiB(arrayBuffers),
            cacheMaxMemorySize: bytesToMiB(CACHE_MAX_MEMORY_SIZE),
        },
        uptimeSeconds: Math.round(process.uptime()),
    };
};

export type MemorySnapshot = ReturnType<typeof snapshotMemoryUsage>;
