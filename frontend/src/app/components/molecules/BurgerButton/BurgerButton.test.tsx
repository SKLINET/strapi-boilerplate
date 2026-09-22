import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BurgerButton } from './BurgerButton';

const app = {
    systemResources: [
        { codename: 'show_menu', value: 'Show menu' },
        { codename: 'hide_menu', value: 'Hide menu' },
    ],
} as any;

describe('BurgerButton', () => {
    it('should call onClick and use the show label when inactive', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<BurgerButton onClick={onClick} active={false} app={app} />);

        await user.click(screen.getByRole('button', { name: 'Show menu' }));
        expect(onClick).toHaveBeenCalledOnce();
    });

    it('should use the hide label when active', () => {
        render(<BurgerButton onClick={vi.fn()} active app={app} />);
        expect(screen.getByRole('button', { name: 'Hide menu' })).toBeInTheDocument();
    });
});
