import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';

const systemResources = [{ codename: 'go_to_homepage', value: 'Go to homepage' }];

describe('Navbar', () => {
    it('should render the header, logo and menu labels', async () => {
        const el = await Navbar({
            app: {
                locale: 'cs',
                page: { documentId: 'home' },
                webSetting: {
                    homePage: { documentId: 'home', title: 'Home', url: 'homepage' },
                    mainMenu: {
                        documentId: 'menu-1',
                        title: 'Main',
                        items: [
                            {
                                id: 'item-1',
                                label: 'About',
                                page: { documentId: 'p2', title: 'About', url: 'about' },
                                externalUrl: null,
                                openInNewTab: false,
                                anchor: null,
                            },
                        ],
                    },
                },
                systemResources,
            } as any,
        });

        render(el);

        expect(screen.getByRole('banner')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Go to homepage' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Change locale' })).toBeInTheDocument();
    });

    it('should render the logo and locale switcher when the menu is empty', async () => {
        const el = await Navbar({
            app: {
                locale: 'cs',
                page: { documentId: 'home' },
                webSetting: {
                    homePage: { documentId: 'home', title: 'Home', url: 'homepage' },
                    mainMenu: null,
                },
                systemResources,
            } as any,
        });

        render(el);

        expect(screen.getByRole('banner')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Go to homepage' })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'About' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Change locale' })).toHaveTextContent('EN');
    });
});
