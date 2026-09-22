import { describe, it, expect, vi } from 'vitest';
import { sleep, DEFAULT_SLEEP_DURING_API_CALLS } from './index';

describe('sleep', () => {
    it('should resolve after the given delay', async () => {
        vi.useFakeTimers();
        const done = vi.fn();
        const p = sleep(50).then(done);
        await vi.advanceTimersByTimeAsync(49);
        expect(done).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(1);
        await p;
        expect(done).toHaveBeenCalledOnce();
        vi.useRealTimers();
    });

    it('should default to DEFAULT_SLEEP_DURING_API_CALLS', () => {
        expect(DEFAULT_SLEEP_DURING_API_CALLS).toBe(100);
    });
});
