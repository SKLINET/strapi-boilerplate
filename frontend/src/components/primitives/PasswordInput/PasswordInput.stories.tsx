import React from 'react';
import { PasswordInput as PasswordInputComponent, PasswordInputProps } from './PasswordInput';
import { Story } from '@storybook/react/types-6-0';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    component: PasswordInputComponent,
    title: 'Primitives/PasswordInput',
    args: {
        name: 'password',
        register: () => false,
        placeholder: 'Heslo',
    },
};

const Template: Story<PasswordInputProps> = (args) => <PasswordInputComponent {...args} />;

export const PasswordInput = Template.bind({});

export const Error = Template.bind({});
Error.args = { error: 'Toto pole je povinné!' };
