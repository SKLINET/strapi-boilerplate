import React from 'react';
import { Checkbox as CheckboxComponent, CheckboxProps } from './Checkbox';
import { Story } from '@storybook/react/types-6-0';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    component: CheckboxComponent,
    title: 'Primitives/Checkbox',
    args: {
        name: 'gdpr',
        register: () => false,
        placeholder: 'Souhlasím se zpracováním osobních údajů',
    },
};

const Template: Story<CheckboxProps> = (args) => <CheckboxComponent {...args} />;

export const Checkbox = Template.bind({});

export const Checked = Template.bind({});
Checked.args = { checked: true };

export const Error = Template.bind({});
Error.args = { error: 'Toto pole je povinné!' };
