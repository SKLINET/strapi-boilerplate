import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { FormBuilder } from './FormBuilder';
import { IBuiltForm } from '../../../../types/form';

vi.mock('axios', () => ({
    default: {
        post: vi.fn(),
    },
}));

const app = {
    locale: 'cs',
    systemResources: [{ codename: 'required_field', value: 'Required' }],
} as any;

const form: IBuiltForm = {
    id: 'form-1',
    title: 'Contact',
    successMessage: 'Thanks for submitting',
    errorMessage: 'Something went wrong',
    data: [
        {
            id: 'f1',
            type: 'textinput',
            name: 'name',
            label: 'Your name',
            placeholder: 'Name',
            required: true,
            useOnly: false,
            onFullWidth: true,
        },
        {
            id: 'f2',
            type: 'submit',
            label: 'Send',
            onFullWidth: true,
        },
    ],
};

describe('FormBuilder', () => {
    beforeEach(() => {
        vi.mocked(axios.post).mockResolvedValue({ data: { success: true } });
    });

    it('should render fixture fields', () => {
        render(<FormBuilder data={form} app={app} />);

        expect(screen.getByText('Your name')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Name');
        expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
    });

    it('should show a validation error when a required field is empty', async () => {
        const user = userEvent.setup();
        render(<FormBuilder data={form} app={app} />);

        await user.click(screen.getByRole('button', { name: 'Send' }));

        expect(await screen.findByText('Required')).toBeInTheDocument();
        expect(axios.post).not.toHaveBeenCalled();
    });

    it('should submit the form and show the success message', async () => {
        const user = userEvent.setup();
        render(<FormBuilder data={form} app={app} />);

        await user.type(screen.getByRole('textbox'), 'Ada');
        await user.click(screen.getByRole('button', { name: 'Send' }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                '/api/submit-form',
                expect.any(FormData),
                expect.objectContaining({ withCredentials: true }),
            );
        });
        expect(await screen.findByText('Thanks for submitting')).toBeInTheDocument();
    });
});
