import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormattedText } from './FormattedText';

const meta: Meta<typeof FormattedText> = {
    title: 'Molecules/FormattedText',
    component: FormattedText,
    parameters: {
        layout: 'padded',
    },
    args: {
        content: [
            '<h2>Ako pracujeme</h2>',
            '<p>Každú zákazku začíname <b>zameraním na mieste</b>.</p>',
            '<ol><li>Zameranie</li><li>Cenová ponuka</li><li>Výroba</li><li>Montáž</li></ol>',
        ].join(''),
    },
    argTypes: {
        content: { control: 'text' },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof FormattedText>;

export const Default: Story = {};
