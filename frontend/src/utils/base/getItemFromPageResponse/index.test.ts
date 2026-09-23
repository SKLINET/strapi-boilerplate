import { describe, expect, it } from 'vitest';
import { getItemFromPageResponse } from './index';

describe('getItemFromPageResponse', () => {
    it('should read item from the first array entry', () => {
        expect(getItemFromPageResponse({ blocksPropsMap: [{ item: { id: 'a' } }] } as any)).toEqual({ id: 'a' });
        expect(getItemFromPageResponse({ blocksPropsMap: [{ data: { item: { id: 'b' } } }] } as any)).toEqual({
            id: 'b',
        });
    });

    it('should read item from the first object key', () => {
        expect(
            getItemFromPageResponse({
                blocksPropsMap: { k: { item: { id: 'c' } } },
            } as any),
        ).toEqual({ id: 'c' });
        expect(
            getItemFromPageResponse({
                blocksPropsMap: { k: { data: { item: { id: 'd' } } } },
            } as any),
        ).toEqual({ id: 'd' });
    });

    it('should return undefined when nothing is present', () => {
        expect(getItemFromPageResponse({ blocksPropsMap: [] } as any)).toBeUndefined();
        expect(getItemFromPageResponse({} as any)).toBeUndefined();
    });
});
