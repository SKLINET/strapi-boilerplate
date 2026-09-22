import { describe, it, expect } from 'vitest';
import { getBlockType } from './index';

describe('getBlockType', () => {
    it('should map ComponentBlock typenames', () => {
        expect(getBlockType('ComponentBlockArticleDetailBlock')).toBe('ArticleDetailBlock');
        expect(getBlockType('ComponentBlockFormBlock')).toBe('FormBlock');
        expect(getBlockType('ComponentBlockVideoBlock')).toBe('VideoBlock');
    });

    it('should return empty string for unknown or missing types', () => {
        expect(getBlockType('Nope')).toBe('');
        expect(getBlockType(undefined)).toBe('');
    });
});
