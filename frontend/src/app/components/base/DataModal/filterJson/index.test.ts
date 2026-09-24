import { describe, it, expect } from 'vitest';
import { filterJson } from '@/app/components/base/DataModal/filterJson';

describe('filterJson', () => {
    it('should return the data untouched for an empty query', () => {
        const data = { title: 'Home' };

        expect(filterJson(data, '  ')).toEqual({ data, matches: 0 });
    });

    it('should keep the whole subtree under a matching key', () => {
        const { data, matches } = filterJson({ seo: { title: 'A', description: 'B' }, title: 'Home' }, 'SEO');

        expect(data).toEqual({ seo: { title: 'A', description: 'B' } });
        expect(matches).toBe(1);
    });

    it('should keep leaves whose value matches, case-insensitively', () => {
        const { data, matches } = filterJson({ id: 6, title: 'Hlavní stránka', url: 'homepage', count: 60 }, '6');

        expect(data).toEqual({ id: 6, count: 60 });
        expect(matches).toBe(2);
    });

    it('should keep the original indices of matching array items', () => {
        const { data } = filterJson([{ name: 'a' }, { name: 'phone_number' }], 'phone');

        expect(Array.isArray(data)).toBe(true);
        expect(Object.keys(data as object)).toEqual(['1']);
        expect((data as unknown[])[1]).toEqual({ name: 'phone_number' });
    });

    it('should keep the plain fields of a matching array item for context', () => {
        const { data, matches } = filterJson(
            [{ codename: 'invalid_phone', value: 'Zadejte telefon', meta: { id: 1 } }],
            'phone',
        );

        // The text next to a matching codename is what one searches for; nested objects stay out.
        expect(data).toEqual([{ codename: 'invalid_phone', value: 'Zadejte telefon' }]);
        expect(matches).toBe(1);
    });

    it('should match null and booleans by their printed value', () => {
        expect(filterJson({ anchor: null, hidden: false }, 'null').data).toEqual({ anchor: null });
        expect(filterJson({ anchor: null, hidden: false }, 'fal').data).toEqual({ hidden: false });
    });

    it('should return undefined data when nothing matches', () => {
        expect(filterJson({ title: 'Home' }, 'xyz')).toEqual({ data: undefined, matches: 0 });
    });
});
