import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
    title: 'Primitives/Text',
    component: Text,
    parameters: {
        layout: 'padded',
    },
    args: {
        tag: 'p',
        children:
            'Vyrábame a montujeme sklenené konštrukcie na mieru. Od zábradlí a prístreškov až po celosklenené fasády.',
    },
    argTypes: {
        tag: {
            control: { type: 'radio' },
            options: ['p', 'span'],
        },
        children: { control: 'text' },
        className: { control: false, table: { disable: true } },
        style: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const AsSpan: Story = {
    args: {
        tag: 'span',
        children: 'Inline text',
    },
};
