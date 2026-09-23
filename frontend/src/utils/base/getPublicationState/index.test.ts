import { describe, it, expect } from 'vitest';
import getPublicationState from './index';

describe('getPublicationState', () => {
    it('should return DRAFT when preview is true', () => {
        expect(getPublicationState(true)).toBe('DRAFT');
    });

    it('should return PUBLISHED when preview is false or undefined', () => {
        expect(getPublicationState(false)).toBe('PUBLISHED');
        expect(getPublicationState(undefined)).toBe('PUBLISHED');
    });
});
