import { describe, it, expect } from 'vitest';
import { findNearestGps, haversineDistance } from './index';

describe('haversineDistance', () => {
    it('should return 0 for the same coordinates', () => {
        expect(haversineDistance(50, 14, 50, 14)).toBe(0);
    });
});

describe('findNearestGps', () => {
    it('should return the closest point and sort the list in place', () => {
        const list = [
            { lat: 50.1, lng: 14.5 },
            { lat: 50.0, lng: 14.4 },
        ];
        const nearest = findNearestGps(list, { lat: 50.0, lng: 14.4 });
        expect(nearest).toEqual({ lat: 50.0, lng: 14.4 });
        expect(list[0]).toEqual({ lat: 50.0, lng: 14.4 });
    });
});
