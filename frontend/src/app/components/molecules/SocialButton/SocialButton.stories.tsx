import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SocialButton } from './SocialButton';
import { app } from '../../../../storybook/fixtures';

const meta: Meta<typeof SocialButton> = {
    title: 'Molecules/SocialButton',
    component: SocialButton,
    parameters: {
        layout: 'padded',
    },
    args: {
        type: 'facebook',
        href: 'https://facebook.com/sklinet',
        app,
    },
    argTypes: {
        type: {
            control: { type: 'radio' },
            options: ['facebook', 'instagram'],
        },
        href: { control: 'text' },
        app: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof SocialButton>;

export const Facebook: Story = {};

export const Instagram: Story = {
    args: {
        type: 'instagram',
        href: 'https://instagram.com/sklinet',
    },
};
