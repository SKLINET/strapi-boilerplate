import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
    title: 'Primitives/Heading',
    component: Heading,
    parameters: {
        layout: 'padded',
    },
    args: {
        tag: 'h1',
        children: 'Sklo, ktoré mení priestor',
        withoutAutosize: false,
    },
    argTypes: {
        tag: {
            control: { type: 'select' },
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
        size: {
            control: { type: 'select' },
            options: [undefined, 'xl', 'lg', 'md', 'sm'],
        },
        color: {
            control: { type: 'radio' },
            options: [undefined, 'black', 'white'],
        },
        children: { control: 'text' },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const AllLevels: Story = {
    render: () => (
        <>
            <Heading tag="h1">Nadpis h1</Heading>
            <Heading tag="h2">Nadpis h2</Heading>
            <Heading tag="h3">Nadpis h3</Heading>
            <Heading tag="h4">Nadpis h4</Heading>
            <Heading tag="h5">Nadpis h5</Heading>
            <Heading tag="h6">Nadpis h6</Heading>
        </>
    ),
};

export const OnBlack: Story = {
    args: {
        color: 'white',
    },
    globals: {
        backgrounds: { value: 'black' },
    },
};

export const WithBoldPart: Story = {
    args: {
        children: 'Sklo, ktoré <b>mení priestor</b>',
    },
};
