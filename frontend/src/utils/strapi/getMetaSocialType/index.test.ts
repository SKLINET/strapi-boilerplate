import { describe, expect, it } from 'vitest';
import { getMetaSocialType } from './index';

describe('getMetaSocialType', () => {
    it('should return null without an image', () => {
        expect(getMetaSocialType(null)).toBeNull();
        expect(getMetaSocialType({ id: '1', title: 'T', description: 'D', image: null } as any)).toBeNull();
    });

    it('should map title, description and image', () => {
        expect(
            getMetaSocialType({
                id: '1',
                title: 'T',
                description: 'D',
                image: {
                    documentId: 'i1',
                    url: 'https://cdn.example/a.jpg',
                    alternativeText: '',
                    width: 1,
                    height: 1,
                },
            } as any),
        ).toMatchObject({
            id: '1',
            title: 'T',
            description: 'D',
            image: { id: 'i1' },
        });
    });
});
