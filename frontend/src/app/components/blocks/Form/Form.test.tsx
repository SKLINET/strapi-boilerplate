import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../../organisms/FormBuilder/FormBuilder', () => ({
    FormBuilder: ({ data }: { data: { title?: string } }) => <div>form-builder-{data.title}</div>,
}));

import { Form } from './Form';

const app = { locale: 'cs' } as any;

describe('Form', () => {
    it('should render nothing when no form is provided', async () => {
        const el = await Form({
            blocksData: { id: '1', form: null, sendEmail: null, anchor: null } as any,
            app,
        });
        const { container } = render(el);
        expect(container).toBeEmptyDOMElement();
    });

    it('should render FormBuilder for a form fixture', async () => {
        const el = await Form({
            blocksData: {
                id: '1',
                form: {
                    documentId: 'f1',
                    title: 'Contact',
                    data: [],
                    successMessage: 'Thanks',
                    errorMessage: 'Error',
                },
                sendEmail: null,
                anchor: null,
            } as any,
            app,
        });
        render(el);

        expect(screen.getByText('form-builder-Contact')).toBeInTheDocument();
    });
});
