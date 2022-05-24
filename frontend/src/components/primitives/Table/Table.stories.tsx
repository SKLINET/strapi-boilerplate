import React from 'react';
import { Table as TableComponent, TableProps } from './Table';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: TableComponent,
    title: 'Primitives/Table',
    argType: {
        children: { table: { disable: true } },
    },
    args: {
        children: (
            <>
                <tr>
                    <th>Table header 1</th>
                    <th>Table header 2</th>
                </tr>
                <tr>
                    <td>Table cell 1</td>
                    <td>Table cell 2</td>
                </tr>
            </>
        ),
    },
};

const Template: Story<TableProps> = (args) => <TableComponent {...args} />;

export const Table = Template.bind({});
