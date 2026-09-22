import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
    title: 'Primitives/Label',
    component: Label,
    parameters: {
        layout: 'padded',
    },
    args: {
        children: 'Novinky',
    },
    argTypes: {
        children: { control: 'text' },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};
