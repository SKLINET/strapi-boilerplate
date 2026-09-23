import { describe, it, expect } from 'vitest';
import { kebabCase } from './index';

describe('kebabCase', () => {
    it('should prefix uppercase letters with a hyphen and lowercase them', () => {
        expect(kebabCase('HelloWorld')).toBe('-hello-world');
        expect(kebabCase('already')).toBe('already');
    });

    it('should treat Latin-1 accented capitals as uppercase', () => {
        expect(kebabCase('Àla')).toBe('-àla');
    });
});
