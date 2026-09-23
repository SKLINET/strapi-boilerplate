import { describe, it, expect } from 'vitest';
import { getDefaultValues } from './index';
import { IFormField } from '../../../types/form';

describe('getDefaultValues', () => {
    it('should return empty object for no fields', () => {
        expect(getDefaultValues([])).toEqual({});
    });

    it('should map field types to defaults', () => {
        const fields = [
            { type: 'textinput', name: 'a' },
            { type: 'checkbox', name: 'b' },
            { type: 'select', name: 'c' },
            { type: 'file', name: 'd' },
            { type: 'amount', name: 'e' },
        ] as IFormField[];

        expect(getDefaultValues(fields)).toEqual({
            a: '',
            b: false,
            c: null,
            d: [],
            e: 0,
        });
    });

    it('should skip fields without a name', () => {
        expect(getDefaultValues([{ type: 'textinput' }] as IFormField[])).toEqual({});
    });
});
