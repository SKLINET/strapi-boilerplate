import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('next/cache', () => ({
    revalidatePath: vi.fn(),
}));

import { revalidatePath as revalidatePathNext } from 'next/cache';
import { revalidateAll, revalidatePath } from './index';

describe('cache path helpers', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should revalidate layout and page at root', () => {
        revalidateAll();
        expect(revalidatePathNext).toHaveBeenCalledWith('/', 'layout');
        expect(revalidatePathNext).toHaveBeenCalledWith('/', 'page');
    });

    it('should revalidate a specific path', () => {
        revalidatePath('/about');
        expect(revalidatePathNext).toHaveBeenCalledWith('/about');
    });
});
