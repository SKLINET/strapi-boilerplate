import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon, Icons } from './Icon';

const names: Icons[] = [
    'alert',
    'arrowDown',
    'arrowLeft',
    'arrowRight',
    'attachment',
    'chevronDown',
    'cross',
    'edit',
    'exit',
    'facebook',
    'gridOff',
    'gridOn',
    'instagram',
    'loader',
    'play',
    'plus',
    'sklinet-round',
    'sklinet',
    'symbio',
    'tick',
];

const meta: Meta<typeof Icon> = {
    title: 'Primitives/Icon',
    component: Icon,
    parameters: {
        layout: 'padded',
    },
    args: {
        name: 'arrowRight',
    },
    argTypes: {
        name: {
            control: { type: 'select' },
            options: names,
        },
        onClick: { action: 'clicked', table: { disable: true } },
        className: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const AllIcons: Story = {
    argTypes: {
        name: { table: { disable: true } },
    },
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(7rem, 1fr))', gap: '1rem' }}>
            {names.map((name) => (
                <div key={name} style={{ display: 'grid', gap: '0.5rem', justifyItems: 'center', fontSize: '0.75rem' }}>
                    <div style={{ width: '2rem', height: '2rem' }}>
                        <Icon name={name} />
                    </div>
                    <span>{name}</span>
                </div>
            ))}
        </div>
    ),
};

export const Empty: Story = {
    args: {
        name: '',
    },
};
