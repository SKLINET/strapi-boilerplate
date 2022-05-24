import React from 'react';
import { Icon as IconComponent, IconProps } from './Icon';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: IconComponent,
    title: 'Primitives/Icon',
    args: {
        name: 'symbio',
    },
    argTypes: {
        className: { table: { disable: true } },
    },
};

const Template: Story<IconProps> = (args) => <IconComponent {...args} />;

export const Icon = Template.bind({});
