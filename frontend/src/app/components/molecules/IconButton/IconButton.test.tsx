import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from './IconButton';

describe('IconButton', () => {
    it('should call onClick when the button is clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<IconButton onClick={onClick} alt="Close" icon="cross" type="fill" color="black" />);

        await user.click(screen.getByRole('button', { name: 'Close' }));
        expect(onClick).toHaveBeenCalledOnce();
    });

    it('should not call onClick when disabled', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<IconButton onClick={onClick} alt="Close" icon="cross" type="fill" color="black" disabled />);

        expect(screen.getByRole('button', { name: 'Close' })).toBeDisabled();
        await user.click(screen.getByRole('button', { name: 'Close' }));
        expect(onClick).not.toHaveBeenCalled();
    });
});
