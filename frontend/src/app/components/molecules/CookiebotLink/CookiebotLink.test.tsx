import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CookiebotLink } from './CookiebotLink';

describe('CookiebotLink', () => {
    afterEach(() => {
        delete (window as any).Cookiebot;
    });

    it('should render the menu label and renew cookies on click', async () => {
        const user = userEvent.setup();
        const renew = vi.fn();
        (window as any).Cookiebot = { renew };

        render(<CookiebotLink data={{ id: '1', label: 'Cookies', href: null, openInNewTab: false, anchor: null }} />);

        await user.click(screen.getByRole('button', { name: 'Cookies' }));
        expect(renew).toHaveBeenCalledOnce();
    });

    it('should still render when Cookiebot is missing', async () => {
        const user = userEvent.setup();
        render(<CookiebotLink data={{ id: '1', label: 'Cookies', href: null, openInNewTab: false, anchor: null }} />);

        await user.click(screen.getByRole('button', { name: 'Cookies' }));
        expect(screen.getByRole('button', { name: 'Cookies' })).toBeInTheDocument();
    });
});
