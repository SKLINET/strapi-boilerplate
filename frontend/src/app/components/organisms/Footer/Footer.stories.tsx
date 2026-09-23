import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Footer } from './Footer';
import { app } from '../../../../storybook/fixtures';

const meta: Meta<typeof Footer> = {
    title: 'Organisms/Footer',
    component: Footer,
    parameters: {
        layout: 'fullscreen',
        // Footer is an async server component.
        react: { rsc: true },
    },
    args: {
        app,
    },
    argTypes: {
        app: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
