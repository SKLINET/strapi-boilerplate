import React from 'react';
import { Pagination as PaginationComponent, PaginationProps } from './Pagination';
import { Story } from '@storybook/react';

export default {
    component: PaginationComponent,
    title: 'Organisms/Pagination',
    args: {
        page: 1,
        total: 10,
    },
    argTypes: {
        className: {
            table: {
                disable: true,
            },
        },
    },
};

const Template: Story<PaginationProps> = (args) => <PaginationComponent {...args} />;

export const Pagination = Template.bind({});
