import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MenuLink } from './MenuLink';

const meta: Meta<typeof MenuLink> = {
    title: 'Organisms/Navbar/MenuLink',
    component: MenuLink,
    parameters: {
        layout: 'padded',
    },
    args: {
        data: {
            id: 'menu-1',
            label: 'O nás',
            href: '/o-nas',
            openInNewTab: false,
            anchor: null,
        },
    },
    argTypes: {
        data: { control: 'object' },
        handleClick: { action: 'clicked', table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof MenuLink>;

export const Default: Story = {};

export const ExternalInNewTab: Story = {
    args: {
        data: {
            id: 'menu-2',
            label: 'Symbio',
            href: 'https://symbio.agency',
            openInNewTab: true,
            anchor: null,
        },
    },
};

export const WithAnchor: Story = {
    args: {
        data: {
            id: 'menu-3',
            label: 'Kontakt',
            href: '/kontakt',
            openInNewTab: false,
            anchor: 'formular',
        },
    },
};

// Without `href` the component renders nothing.
export const WithoutHref: Story = {
    args: {
        data: {
            id: 'menu-4',
            label: 'Bez odkazu',
            href: null,
            openInNewTab: false,
            anchor: null,
        },
    },
};
