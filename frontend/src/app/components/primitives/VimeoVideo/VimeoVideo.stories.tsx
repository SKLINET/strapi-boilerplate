import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { VimeoVideo } from './VimeoVideo';

const meta: Meta<typeof VimeoVideo> = {
    title: 'Primitives/VimeoVideo',
    component: VimeoVideo,
    parameters: {
        layout: 'padded',
    },
    args: {
        uid: '76979871',
    },
    argTypes: {
        uid: { control: 'text' },
        loaded: { action: 'loaded', table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof VimeoVideo>;

export const Default: Story = {};
