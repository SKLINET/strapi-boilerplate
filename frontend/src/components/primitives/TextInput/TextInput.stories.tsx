import React from 'react';
import { TextInput as TextInputComponent, TextInputProps } from './TextInput';
import { Story } from '@storybook/react/types-6-0';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    component: TextInputComponent,
    title: 'Primitives/TextInput',
    args: {
        name: 'email',
        register: () => false,
        placeholder: 'E-mail',
    },
};

const Template: Story<TextInputProps> = (args) => <TextInputComponent {...args} />;

export const TextArea = Template.bind({});

export const Error = Template.bind({});
Error.args = { error: 'Toto pole je povinné!' };
