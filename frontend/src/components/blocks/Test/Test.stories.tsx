import React from 'react';
import { Test as Component, TestProps } from './Test';
import { Meta, Story } from '@storybook/react/types-6-0';

const config = {
    component: Component,
    title: 'Blocks/Test',
} as Meta;

const Template: Story<TestProps> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};

export default config;
