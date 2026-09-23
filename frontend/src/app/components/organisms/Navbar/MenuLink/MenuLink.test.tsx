import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { MenuLink } from './MenuLink';

describe('MenuLink', () => {
    beforeEach(() => {
        vi.mocked(usePathname).mockReturnValue('/');
    });

    it('should render a link for a fixture menu item', () => {
        render(<MenuLink data={{ id: '1', label: 'About', href: '/about', openInNewTab: false, anchor: null }} />);

        expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    });

    it('should render nothing when href is missing', () => {
        const { container } = render(
            <MenuLink data={{ id: '1', label: 'Empty', href: null, openInNewTab: false, anchor: null }} />,
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('should scroll to top when the link matches the current path', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();
        const scrollTo = vi.fn();
        window.scrollTo = scrollTo;
        vi.mocked(usePathname).mockReturnValue('/about');

        render(
            <MenuLink
                data={{ id: '1', label: 'About', href: '/about', openInNewTab: false, anchor: null }}
                handleClick={handleClick}
            />,
        );

        await user.click(screen.getByRole('button', { name: 'About' }));
        expect(handleClick).toHaveBeenCalledOnce();
        expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
});
