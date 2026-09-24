import { describe, it, expect, vi } from 'vitest';

vi.mock('../../../app/components/organisms/FormBuilder/FormBuilder', () => ({
    shouldRenderField: vi.fn(() => true),
}));

vi.mock('../../strapi/getSystemResource', () => ({
    getSystemResource: (_key: string) => _key,
}));

import { getValidationObject } from './index';
import { shouldRenderField } from '../../../app/components/organisms/FormBuilder/FormBuilder';
import { IApp } from '../../../types/base/app';
import { IFormField } from '../../../types/form';

const app = { systemResources: [] } as unknown as IApp;

describe('getValidationObject', () => {
    it('should return an empty object for no fields', () => {
        expect(getValidationObject([], app)).toEqual({});
    });

    it('should require named text fields when required', async () => {
        const fields = [{ type: 'textinput', name: 'title', required: true }] as IFormField[];
        const schema = getValidationObject(fields, app);
        await expect(schema.title.validate('ok')).resolves.toBe('ok');
        await expect(schema.title.validate('')).rejects.toThrow();
    });

    it('should skip unnamed fields', () => {
        const fields = [{ type: 'textinput', required: true }] as IFormField[];
        expect(getValidationObject(fields, app)).toEqual({});
    });

    it('should validate email format', async () => {
        const fields = [{ type: 'email', name: 'email', required: true }] as IFormField[];
        const schema = getValidationObject(fields, app);
        await expect(schema.email.validate('a@b.cz')).resolves.toBe('a@b.cz');
        await expect(schema.email.validate('nope')).rejects.toThrow();
    });

    it('should default checkbox to boolean schema', async () => {
        const fields = [{ type: 'checkbox', name: 'agree' }] as IFormField[];
        const schema = getValidationObject(fields, app);
        await expect(schema.agree.validate(false)).resolves.toBe(false);
    });

    it('keeps the inner schema error message on visible conditional fields', () => {
        const fields = [
            { type: 'email', name: 'email', required: true, conditions: [{}] },
            { type: 'phone', name: 'phone', required: true, conditions: [{}] },
            { type: 'productsSelection', name: 'products', conditions: [{}] },
        ] as IFormField[];
        const schema = getValidationObject(fields, app);

        expect(() => schema.email.validateSync('')).toThrow('required_field');
        expect(() => schema.email.validateSync('not-an-email')).toThrow('invalid_email');
        expect(() => schema.phone.validateSync('123')).toThrow('invalid_phone_number');
        expect(() => schema.products.validateSync([])).toThrow('empty_products_selection');
        expect(schema.email.isValidSync('valid@example.com')).toBe(true);
    });

    it('skips validation of hidden conditional fields', () => {
        vi.mocked(shouldRenderField).mockReturnValueOnce(false);
        const fields = [{ type: 'email', name: 'email', required: true, conditions: [{}] }] as IFormField[];
        const schema = getValidationObject(fields, app);

        expect(schema.email.isValidSync('')).toBe(true);
    });
});
