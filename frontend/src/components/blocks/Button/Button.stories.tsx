import React from 'react';
import { Button as Component, ButtonProps } from './Button';
import { Meta, Story } from '@storybook/react/types-6-0';

export default {
    component: Component,
    title: 'Blocks/Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
