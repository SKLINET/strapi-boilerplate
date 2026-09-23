import { describe, it, expect, vi } from 'vitest';

vi.mock('../../../providers', () => ({
    default: {
        article: { getId: () => 'api::article.article', getApiKey: () => 'article' },
        page: { getId: () => 'api::page.page', getApiKey: () => 'page' },
    },
}));

import { findProvider } from './index';

describe('findProvider', () => {
    it('should resolve by object key', () => {
        expect(findProvider('article')?.getApiKey()).toBe('article');
    });

    it('should resolve by getId when key is missing', () => {
        expect(findProvider('api::page.page')?.getApiKey()).toBe('page');
    });

    it('should return undefined for unknown ids', () => {
        expect(findProvider('unknown')).toBeUndefined();
    });
});
