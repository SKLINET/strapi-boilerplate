import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CookiebotLink } from './CookiebotLink';

const meta: Meta<typeof CookiebotLink> = {
    title: 'Molecules/CookiebotLink',
    component: CookiebotLink,
    parameters: {
        layout: 'padded',
    },
    args: {
        data: {
            id: 'cookie-1',
            label: 'Nastavenie cookies',
            href: null,
            openInNewTab: false,
            anchor: null,
        },
    },
    argTypes: {
        data: { control: 'object' },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof CookiebotLink>;

// Clicking only does something when the Cookiebot script is loaded on the page.
export const Default: Story = {};
