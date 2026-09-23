import { describe, expect, it } from 'vitest';
import { getSocialNetworksType } from './index';

describe('getSocialNetworksType', () => {
    it('should return null for missing input', () => {
        expect(getSocialNetworksType(null)).toBeNull();
    });

    it('should map facebook and twitter meta', () => {
        const image = {
            documentId: 'i1',
            url: 'https://cdn.example/a.jpg',
            alternativeText: '',
            width: 1,
            height: 1,
        };

        expect(
            getSocialNetworksType({
                id: 's1',
                facebookMeta: { id: 'f', title: 'FB', description: null, image },
                twitterMeta: null,
            } as any),
        ).toMatchObject({
            id: 's1',
            facebook: { id: 'f', title: 'FB' },
            twitter: null,
        });
    });
});
