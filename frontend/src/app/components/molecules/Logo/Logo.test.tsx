import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { Logo } from './Logo';

const homepageApp = {
    locale: 'cs',
    page: { documentId: 'home' },
    webSetting: { homePage: { documentId: 'home', title: 'Home', url: 'homepage' } },
    systemResources: [{ codename: 'go_to_homepage', value: 'Go to homepage' }],
} as any;

const otherPageApp = {
    locale: 'cs',
    page: { documentId: 'about' },
    webSetting: { homePage: { documentId: 'home', title: 'Home', url: 'homepage' } },
    systemResources: [{ codename: 'go_to_homepage', value: 'Go to homepage' }],
} as any;

describe('Logo', () => {
    it('should scroll to the top when already on the homepage', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();
        const scrollTo = vi.fn();
        window.scrollTo = scrollTo;

        render(<Logo app={homepageApp} handleClick={handleClick} />);
        await user.click(screen.getByRole('button', { name: 'Go to homepage' }));

        expect(handleClick).toHaveBeenCalledOnce();
        expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('should navigate to the homepage from another page', async () => {
        const user = userEvent.setup();
        const push = vi.fn();
        vi.mocked(useRouter).mockReturnValue({ push, replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() } as any);

        render(<Logo app={otherPageApp} />);
        await user.click(screen.getByRole('button', { name: 'Go to homepage' }));

        expect(push).toHaveBeenCalledWith('/', undefined);
    });
});
