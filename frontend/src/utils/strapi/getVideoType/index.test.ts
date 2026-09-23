import { describe, expect, it } from 'vitest';
import { getVideoType } from './index';

describe('getVideoType', () => {
    it('should return null for missing input', () => {
        expect(getVideoType(null)).toBeNull();
    });

    it('should map uploaded, external and optional image', () => {
        expect(
            getVideoType({
                id: 'v1',
                uploadedVideo: { url: 'https://cdn.example/a.mp4' },
                externalVideo: 'https://youtu.be/x',
                optionalImage: {
                    documentId: 'i1',
                    url: 'https://cdn.example/p.jpg',
                    alternativeText: '',
                    width: 1,
                    height: 1,
                },
            } as any),
        ).toMatchObject({
            id: 'v1',
            uploadedVideo: { url: 'https://cdn.example/a.mp4', type: 'video/mp4' },
            externalVideo: 'https://youtu.be/x',
            image: { id: 'i1' },
        });
    });
});
