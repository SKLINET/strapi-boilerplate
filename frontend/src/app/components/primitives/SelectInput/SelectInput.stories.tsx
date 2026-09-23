import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { SelectInput, ISelectItem } from './SelectInput';
import { app } from '../../../../storybook/fixtures';

type Item = ISelectItem<{ code: string }>;

const options: Item[] = [
    { typename: 'select', id: '1', title: 'Kalené sklo', data: { code: 'kalene' } },
    { typename: 'select', id: '2', title: 'Lepené sklo', data: { code: 'lepene' } },
    { typename: 'select', id: '3', title: 'Izolační sklo', data: { code: 'izolacne' } },
    { typename: 'select', id: '4', title: 'Zrkadlo', data: { code: 'zrkadlo' } },
];

const categoryOptions = [
    { title: 'Interiér', options: [options[0], options[3]] },
    { title: 'Exteriér', options: [options[1], options[2]] },
];

const meta: Meta<typeof SelectInput<{ code: string }>> = {
    title: 'Primitives/SelectInput',
    component: SelectInput,
    parameters: {
        // The dropdown opens downwards, so give it room.
        layout: 'padded',
    },
    args: {
        name: 'glass',
        label: 'Typ skla',
        placeholder: 'Vyberte typ skla',
        options,
        required: true,
        disabled: false,
        largeDropdown: false,
        app,
    },
    argTypes: {
        error: { control: 'text' },
        selectedItem: { control: false, table: { disable: true } },
        onChange: { control: false, table: { disable: true } },
        categoryOptions: { control: false, table: { disable: true } },
        app: { control: false, table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
    // Selection is controlled by the parent, so hold it in the story.
    render: function Render(args) {
        const [selected, setSelected] = useState<Item | null>(null);

        return (
            <div style={{ minHeight: '20rem' }}>
                <SelectInput {...args} selectedItem={selected} onChange={setSelected} />
            </div>
        );
    },
};

export default meta;

type Story = StoryObj<typeof SelectInput<{ code: string }>>;

export const Default: Story = {};

export const WithCategories: Story = {
    args: {
        options: [],
        categoryOptions,
    },
};

export const WithError: Story = {
    args: {
        error: 'Vyberte jednu z možností',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const Empty: Story = {
    args: {
        options: [],
    },
};
