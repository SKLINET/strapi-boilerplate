import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
    it('should call onClick when the button is clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Save</Button>);

        await user.click(screen.getByRole('button', { name: 'Save' }));

        expect(onClick).toHaveBeenCalledOnce();
    });

    it('should not call onClick when disabled', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(
            <Button onClick={onClick} disabled>
                Save
            </Button>,
        );

        expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
        await user.click(screen.getByRole('button', { name: 'Save' }));
        expect(onClick).not.toHaveBeenCalled();
    });

    it('should render a link when href is provided', () => {
        render(<Button href="/next">Continue</Button>);
        expect(screen.getByRole('link', { name: 'Continue' })).toHaveAttribute('href', '/next');
    });
});
