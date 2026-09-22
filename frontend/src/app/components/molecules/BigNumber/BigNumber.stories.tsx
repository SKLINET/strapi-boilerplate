import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BigNumber } from './BigNumber';

const meta: Meta<typeof BigNumber> = {
    title: 'Molecules/BigNumber',
    component: BigNumber,
    parameters: {
        layout: 'padded',
    },
    args: {
        data: { id: '1', value: 1250, additionLabel: '+' },
        // The count-up animation only runs once this flips to true.
        allowIncrement: true,
    },
    argTypes: {
        data: { control: 'object' },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof BigNumber>;

export const Default: Story = {};

export const WithoutLabel: Story = {
    args: {
        data: { id: '2', value: 28, additionLabel: null },
    },
};

export const Decimal: Story = {
    args: {
        data: { id: '3', value: 99.8, additionLabel: ' %' },
    },
};

export const BeforeIncrement: Story = {
    args: {
        allowIncrement: false,
    },
};
