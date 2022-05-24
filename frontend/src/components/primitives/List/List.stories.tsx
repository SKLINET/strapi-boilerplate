import React from 'react';
import { List as ListComponent, ListProps } from './List';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: ListComponent,
    title: 'Primitives/List',
    args: {
        children: (
            <>
                <li>Položka 1</li>
                <li>Položka 2</li>
                <li>Položka 3</li>
            </>
        ),
    },
};

const Template: Story<ListProps> = (args) => <ListComponent {...args} />;

export const List = Template.bind({});
