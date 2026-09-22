import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Logo } from './Logo';
import { app, homePage } from '../../../../storybook/fixtures';

const meta: Meta<typeof Logo> = {
    title: 'Molecules/Logo',
    component: Logo,
    parameters: {
        layout: 'padded',
    },
    args: {
        app,
    },
    argTypes: {
        handleClick: { action: 'clicked', table: { disable: true } },
        app: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Logo>;

// On a subpage the logo navigates to the homepage.
export const OnSubpage: Story = {};

// On the homepage it scrolls back to the top instead.
export const OnHomepage: Story = {
    args: {
        app: { ...app, page: homePage } as unknown as typeof app,
    },
};
