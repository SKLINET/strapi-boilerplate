import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
    title: 'Primitives/TextArea',
    component: TextArea,
    parameters: {
        layout: 'padded',
    },
    args: {
        name: 'message',
        label: 'Správa',
        placeholder: 'Popište nám váš projekt…',
        required: true,
        disabled: false,
    },
    argTypes: {
        error: { control: 'text' },
        register: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
    render: function Render(args) {
        const { register } = useForm();
        return <TextArea {...args} register={register} />;
    },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};

export const WithError: Story = {
    args: {
        error: 'Povinné pole',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
