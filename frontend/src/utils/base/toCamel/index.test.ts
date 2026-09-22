import { describe, it, expect } from 'vitest';
import { toCamel } from './index';

describe('toCamel', () => {
    it('should convert hyphen and underscore segments', () => {
        expect(toCamel('article-detail')).toBe('articleDetail');
        expect(toCamel('article_detail')).toBe('articleDetail');
    });

    it('should leave already-camel strings unchanged', () => {
        expect(toCamel('articleDetail')).toBe('articleDetail');
    });
});
