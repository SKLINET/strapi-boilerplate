import React from 'react';
import { Switch as SwitchComponent, SwitchProps } from './Switch';
import { Story } from '@storybook/react';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    component: SwitchComponent,
    title: 'Primitives/Switch',
    args: {
        name: 'nwsl',
        register: () => false,
        placeholder: 'Chci začít odebírat novinky',
    },
};

const Template: Story<SwitchProps> = (args) => <SwitchComponent {...args} />;

export const Checkbox = Template.bind({});

export const Checked = Template.bind({});
Checked.args = { checked: true };

export const Error = Template.bind({});
Error.args = { error: 'Toto pole je povinné!' };
