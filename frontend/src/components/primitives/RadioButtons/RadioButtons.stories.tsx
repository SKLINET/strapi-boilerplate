import React from 'react';
import { RadioButtons as RadioButtonsComponent, RadioButtonsProps } from './RadioButtons';
import { Story } from '@storybook/react/types-6-0';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    component: RadioButtonsComponent,
    title: 'Primitives/RadioButtons',
    args: {
        items: ['Červená', 'Zelená', 'Modrá', 'Žlutá'],
        name: 'colors',
        register: () => false,
    },
};

const Template: Story<RadioButtonsProps> = (args) => <RadioButtonsComponent {...args} />;

export const RadioButtons = Template.bind({});

export const Selected = Template.bind({});
Selected.args = { value: 'Zelená' };

export const Error = Template.bind({});
Error.args = { error: 'Toto pole je povinné!' };
