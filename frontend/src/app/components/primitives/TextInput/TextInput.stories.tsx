import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
    title: 'Primitives/TextInput',
    component: TextInput,
    parameters: {
        layout: 'padded',
    },
    args: {
        name: 'email',
        label: 'E-mail',
        type: 'email',
        placeholder: 'vas@email.cz',
        required: true,
        disabled: false,
    },
    argTypes: {
        type: {
            control: { type: 'radio' },
            options: ['text', 'email'],
        },
        error: { control: 'text' },
        register: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
    // `register` comes from the parent form, so stories provide their own.
    render: function Render(args) {
        const { register } = useForm();
        return <TextInput {...args} register={register} />;
    },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

export const WithError: Story = {
    args: {
        error: 'Zadajte platný e-mail',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const WithoutLabel: Story = {
    args: {
        label: undefined,
    },
};
