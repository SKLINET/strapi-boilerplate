import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from './TextArea';

const register = ((name: string) => ({
    onChange: () => undefined,
    onBlur: () => undefined,
    name,
    ref: () => undefined,
})) as any;

describe('TextArea', () => {
    it('should render a labelled textarea that accepts typing', async () => {
        const user = userEvent.setup();
        render(<TextArea name="message" label="Message" register={register} placeholder="Write here" />);

        const input = screen.getByRole('textbox');
        expect(screen.getByText('Message')).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'Write here');

        await user.type(input, 'Hello');
        expect(input).toHaveValue('Hello');
    });

    it('should show the error message when provided', () => {
        render(<TextArea name="message" register={register} error="Required" />);
        expect(screen.getByText('Required')).toBeInTheDocument();
    });
});
