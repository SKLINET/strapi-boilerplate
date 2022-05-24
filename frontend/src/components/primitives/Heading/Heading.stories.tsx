import React from 'react';
import { Heading as HeadingComponent, HeadingProps } from './Heading';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: HeadingComponent,
    title: 'Primitives/Heading',
    argTypes: {
        className: { table: { disable: true } },
    },
    args: {
        tag: 'h1',
        size: 'xl',
        children: 'I am Heading',
    },
};

const Template: Story<HeadingProps> = (args) => <HeadingComponent {...args} />;

export const Heading = Template.bind({});
