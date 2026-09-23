import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
    title: 'Molecules/IconButton',
    component: IconButton,
    parameters: {
        layout: 'padded',
    },
    args: {
        icon: 'arrowRight',
        type: 'fill',
        color: 'black',
        size: 'large',
        alt: 'Ďalej',
        disabled: false,
    },
    argTypes: {
        icon: {
            control: { type: 'select' },
            options: ['arrowLeft', 'arrowRight', 'arrowDown', 'cross', 'plus', 'tick', 'edit', 'play'],
        },
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
            options: ['large'],
        },
        onClick: { action: 'clicked', table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Fill: Story = {};

export const Outline: Story = {
    args: {
        type: 'outline',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
