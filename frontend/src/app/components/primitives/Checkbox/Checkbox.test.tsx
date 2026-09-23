import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

const register = ((name: string) => ({
    onChange: () => undefined,
    onBlur: () => undefined,
    name,
    ref: () => undefined,
})) as any;

describe('Checkbox', () => {
    it('should render a checkbox that can be toggled', async () => {
        const user = userEvent.setup();
        render(<Checkbox name="terms" register={register} checked={false} label="I agree" />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();

        await user.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it('should show the error message when provided', () => {
        render(<Checkbox name="terms" register={register} checked={false} error="Required" />);
        expect(screen.getByText('Required')).toBeInTheDocument();
    });
});
