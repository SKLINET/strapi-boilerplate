import { describe, expect, it } from 'vitest';
import { getFileType, getFileListType } from './index';

describe('getFileType', () => {
    it('should return null for missing input', () => {
        expect(getFileType(null)).toBeNull();
    });

    it('should convert size from KB-ish units and label it MB', () => {
        expect(
            getFileType({
                documentId: 'f1',
                name: 'doc.pdf',
                url: 'https://cdn.example/doc.pdf',
                size: 1024,
            } as any),
        ).toEqual({
            id: 'f1',
            name: 'doc.pdf',
            href: 'https://cdn.example/doc.pdf',
            size: '1 MB',
        });
    });
});

describe('getFileListType', () => {
    it('should skip nulls', () => {
        expect(getFileListType(null)).toEqual([]);
        expect(
            getFileListType([null, { documentId: 'f1', name: 'a', url: 'https://cdn.example/a', size: 0 }] as any),
        ).toHaveLength(1);
    });
});
