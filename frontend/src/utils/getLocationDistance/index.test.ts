import { describe, it, expect } from 'vitest';
import { getLocationDistance } from './index';

describe('getLocationDistance', () => {
    it('should return 0 for the same point', () => {
        expect(getLocationDistance(50, 14, 50, 14)).toBe(0);
    });

    it('should return a positive km distance between two cities', () => {
        const km = getLocationDistance(50.0755, 14.4378, 49.1951, 16.6068);
        expect(km).toBeGreaterThan(150);
        expect(km).toBeLessThan(250);
    });
});
