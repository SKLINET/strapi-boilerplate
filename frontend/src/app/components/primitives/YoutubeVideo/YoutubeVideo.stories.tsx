import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { YoutubeVideo } from './YoutubeVideo';

const meta: Meta<typeof YoutubeVideo> = {
    title: 'Primitives/YoutubeVideo',
    component: YoutubeVideo,
    parameters: {
        layout: 'padded',
    },
    args: {
        uid: 'aqz-KE-bpKQ',
    },
    argTypes: {
        uid: { control: 'text' },
        loaded: { action: 'loaded', table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof YoutubeVideo>;

export const Default: Story = {};

export const FixedSize: Story = {
    args: {
        width: 560,
        height: 315,
    },
};
