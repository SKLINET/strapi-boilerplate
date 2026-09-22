import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FacebookVideo } from './FacebookVideo';

const meta: Meta<typeof FacebookVideo> = {
    title: 'Primitives/FacebookVideo',
    component: FacebookVideo,
    parameters: {
        layout: 'padded',
    },
    args: {
        url: 'https://www.facebook.com/facebook/videos/10153231379946729/',
    },
    argTypes: {
        url: { control: 'text' },
        loaded: { action: 'loaded', table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof FacebookVideo>;

export const Default: Story = {};
