import { describe, expect, it } from 'vitest';
import { getMetaFromItem } from './index';

describe('getMetaFromItem', () => {
    it('should return null for missing or non-article items', () => {
        expect(getMetaFromItem(null)).toBeNull();
        expect(getMetaFromItem({ __typename: 'Page', title: 'X' } as any)).toBeNull();
    });

    it('should map article title, image and seo', () => {
        const meta = getMetaFromItem({
            __typename: 'Article',
            title: 'Hello',
            image: {
                documentId: 'i1',
                url: 'https://cdn.example/a.jpg',
                alternativeText: 'alt',
                width: 10,
                height: 20,
            },
            seo: { title: 'SEO' },
        } as any);

        expect(meta).toMatchObject({
            title: 'Hello',
            description: null,
            seo: { title: 'SEO' },
            image: {
                id: 'i1',
                url: 'https://cdn.example/a.jpg',
                alternativeText: 'alt',
                width: 10,
                height: 20,
            },
        });
    });
});
