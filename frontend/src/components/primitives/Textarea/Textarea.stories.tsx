import React from 'react';
import { Textarea as TextareaComponent, TextareaProps } from './Textarea';
import { Story } from '@storybook/react';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    component: TextareaComponent,
    title: 'Primitives/Textarea',
    args: {
        name: 'password',
        register: () => false,
        placeholder: 'Heslo',
    },
};

const Template: Story<TextareaProps> = (args) => <TextareaComponent {...args} />;

export const Textarea = Template.bind({});

export const Error = Template.bind({});
Error.args = { error: 'Toto pole je povinné!' };
