import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Blockquote } from './Blockquote';

const meta: Meta<typeof Blockquote> = {
    title: 'Primitives/Blockquote',
    component: Blockquote,
    parameters: {
        layout: 'padded',
    },
    args: {
        children: 'Spolupráce proběhla přesně podle dohody a termín jsme stihli s rezervou.',
    },
    argTypes: {
        children: { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<typeof Blockquote>;

export const Default: Story = {};
