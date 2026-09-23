import { describe, expect, it } from 'vitest';
import { getUploadedVideoType } from './index';

describe('getUploadedVideoType', () => {
    it('should return null without a url', () => {
        expect(getUploadedVideoType(null)).toBeNull();
        expect(getUploadedVideoType({} as any)).toBeNull();
    });

    it('should map the mime type and rewrite mov to mp4', () => {
        expect(getUploadedVideoType({ url: 'https://cdn.example/a.mp4' } as any)).toEqual({
            url: 'https://cdn.example/a.mp4',
            type: 'video/mp4',
        });
        expect(getUploadedVideoType({ url: 'https://cdn.example/a.mov' } as any)).toEqual({
            url: 'https://cdn.example/a.mov',
            type: 'video/mp4',
        });
    });
});
