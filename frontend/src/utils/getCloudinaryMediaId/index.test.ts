import { describe, it, expect } from 'vitest';
import { getCloudinaryMediaId } from './index';

describe('getCloudinaryMediaId', () => {
    it('should take the path after upload/ up to the last extension', () => {
        expect(getCloudinaryMediaId('https://res.cloudinary.com/demo/video/upload/v1/folder/file.mp4')).toBe(
            'folder/file',
        );
    });
});
