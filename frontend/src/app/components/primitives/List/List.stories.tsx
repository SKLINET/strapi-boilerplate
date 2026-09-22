import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { List } from './List';

const meta: Meta<typeof List> = {
    title: 'Primitives/List',
    component: List,
    parameters: {
        layout: 'padded',
    },
    args: {
        tag: 'ul',
    },
    argTypes: {
        tag: {
            control: { type: 'radio' },
            options: ['ul', 'ol'],
        },
        children: { control: false, table: { disable: true } },
    },
    render: (args) => (
        <List {...args}>
            <li>Zameranie u zákazníka</li>
            <li>Výroba na mieru</li>
            <li>Montáž a odovzdanie</li>
        </List>
    ),
};

export default meta;

type Story = StoryObj<typeof List>;

export const Unordered: Story = {};

export const Ordered: Story = {
    args: {
        tag: 'ol',
    },
};
