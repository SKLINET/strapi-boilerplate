import { describe, expect, it } from 'vitest';
import { getBuiltFormType, getBuiltFormListType } from './index';

describe('getBuiltFormType', () => {
    it('should return null for missing input', () => {
        expect(getBuiltFormType(null)).toBeNull();
    });

    it('should parse string data and fall back to [] for non-arrays', () => {
        expect(
            getBuiltFormType({
                documentId: 'f1',
                title: 'Contact',
                data: '[{"name":"email"}]',
                successMessage: 'ok',
                errorMessage: 'err',
            } as any),
        ).toEqual({
            id: 'f1',
            title: 'Contact',
            data: [{ name: 'email' }],
            successMessage: 'ok',
            errorMessage: 'err',
        });

        expect(
            getBuiltFormType({
                documentId: 'f2',
                title: 'X',
                data: { nope: true },
                successMessage: null,
                errorMessage: null,
            } as any),
        ).toMatchObject({ data: [] });
    });
});

describe('getBuiltFormListType', () => {
    it('should skip nulls', () => {
        expect(getBuiltFormListType([null, { documentId: 'f', title: 'A', data: [] }] as any)).toHaveLength(1);
    });
});
