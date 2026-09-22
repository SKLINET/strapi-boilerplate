import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Primitives/Button',
    component: Button,
    parameters: {
        layout: 'padded',
    },
    args: {
        children: 'Button',
        type: 'fill',
        color: 'black',
        size: 'md',
        disabled: false,
        loading: false,
        stretchOnMobile: false,
    },
    argTypes: {
        type: {
            control: { type: 'radio' },
            options: ['fill', 'outline'],
        },
        color: {
            control: { type: 'select' },
            options: ['black'],
        },
        size: {
            control: { type: 'radio' },
            options: ['md'],
        },
        icon: {
            control: { type: 'select' },
            options: [undefined, 'plus', 'arrowRight', 'tick', 'edit'],
        },
        iconPosition: {
            control: { type: 'radio' },
            options: ['left', 'right'],
        },
        children: {
            control: 'text',
        },
        alt: {
            control: 'text',
            table: { disable: true },
        },
        onClick: {
            action: 'clicked',
            table: { disable: true },
        },
        href: {
            control: 'text',
            table: { disable: true },
        },
        openInNewTab: {
            control: 'boolean',
            table: { disable: true },
        },
        anchor: {
            control: 'text',
            table: { disable: true },
        },
        submit: { control: 'boolean', table: { disable: true } },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        stretchOnMobile: { control: 'boolean' },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Outline: Story = {
    args: {
        type: 'outline',
    },
};

export const WithIcon: Story = {
    args: {
        icon: 'plus',
        iconPosition: 'left',
        children: 'Add item',
    },
};

export const Loading: Story = {
    args: {
        loading: true,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
