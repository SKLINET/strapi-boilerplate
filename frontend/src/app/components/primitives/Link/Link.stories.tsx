import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
    title: 'Primitives/Link',
    component: Link,
    parameters: {
        layout: 'padded',
    },
    args: {
        href: '/o-nas',
        children: 'O nás',
        openInNewTab: false,
        prefetch: false,
        download: false,
    },
    argTypes: {
        href: { control: 'text' },
        children: { control: 'text' },
        alt: { control: 'text' },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Internal: Story = {};

export const External: Story = {
    args: {
        href: 'https://sklinet.sk',
        children: 'sklinet.sk',
        openInNewTab: true,
    },
};

export const Mailto: Story = {
    args: {
        href: 'mailto:info@sklinet.sk',
        children: 'info@sklinet.sk',
    },
};
