import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
    title: 'Primitives/Table',
    component: Table,
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        children: { control: false, table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
    render: () => (
        <Table>
            <thead>
                <tr>
                    <th>Typ skla</th>
                    <th>Tloušťka</th>
                    <th>Max. rozměr</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Kalené</td>
                    <td>8 mm</td>
                    <td>2000 × 3000 mm</td>
                </tr>
                <tr>
                    <td>Lepené</td>
                    <td>10 mm</td>
                    <td>2400 × 4000 mm</td>
                </tr>
                <tr>
                    <td>Izolačné</td>
                    <td>24 mm</td>
                    <td>1800 × 2500 mm</td>
                </tr>
            </tbody>
        </Table>
    ),
};
