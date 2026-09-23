import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from './TextInput';

const register = ((name: string) => ({
    onChange: () => undefined,
    onBlur: () => undefined,
    name,
    ref: () => undefined,
})) as any;

describe('TextInput', () => {
    it('should render a labelled textbox that accepts typing', async () => {
        const user = userEvent.setup();
        render(<TextInput name="email" label="Email" register={register} placeholder="you@x.com" />);

        const input = screen.getByRole('textbox');
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'you@x.com');

        await user.type(input, 'a@b.c');
        expect(input).toHaveValue('a@b.c');
    });

    it('should show the error message when provided', () => {
        render(<TextInput name="email" register={register} error="Required" />);
        expect(screen.getByText('Required')).toBeInTheDocument();
    });
});
