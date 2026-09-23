import { describe, it, expect } from 'vitest';
import { getItemUrl } from './index';
import { IApp } from '../../types/base/app';

const app = { locale: 'cs' } as IApp;

describe('getItemUrl', () => {
    it('should return null when baseUrl is missing', () => {
        expect(getItemUrl(null, { slug: 'a' }, app)).toBeNull();
        expect(getItemUrl(undefined, { slug: 'a' }, app)).toBeNull();
    });

    it('should return empty page url when baseUrl already starts with a slash', () => {
        expect(getItemUrl('/articles/:slug', { slug: 'hello' }, app)).toBe('');
    });

    it('should interpolate slug when baseUrl has no leading slash', () => {
        expect(getItemUrl('articles/:slug', { slug: 'hello' }, app)).toBe('/articles/hello');
    });

    it('should prefer item.url over slug', () => {
        expect(getItemUrl('articles/:slug', { url: 'from-url', slug: 'from-slug' }, app)).toBe('/articles/from-url');
    });
});
