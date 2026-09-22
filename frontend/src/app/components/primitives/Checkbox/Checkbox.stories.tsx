import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm, useWatch } from 'react-hook-form';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'Primitives/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'padded',
    },
    args: {
        name: 'consent',
        label: 'Souhlasím se <a href="/gdpr" title="Zpracování údajů">zpracováním údajů</a>',
        required: true,
        disabled: false,
    },
    argTypes: {
        error: { control: 'text' },
        checked: { control: false, table: { disable: true } },
        register: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
    // The parent form owns the checked state; mirror that with a local form.
    render: function Render(args) {
        const { register, control } = useForm({ defaultValues: { [args.name]: false } });
        const checked = useWatch({ control, name: args.name });

        return <Checkbox {...args} register={register} checked={!!checked} />;
    },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const WithError: Story = {
    args: {
        error: 'Musíte souhlasit se zpracováním údajů',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
