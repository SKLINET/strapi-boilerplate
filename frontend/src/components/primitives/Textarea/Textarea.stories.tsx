import React from 'react';
import { TextArea as TextAreaComponent, TextAreaProps } from './TextArea';
import { Story } from '@storybook/react/types-6-0';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    component: TextAreaComponent,
    title: 'Primitives/TextArea',
    args: {
        name: 'password',
        register: () => false,
        placeholder: 'Heslo',
    },
};

const Template: Story<TextAreaProps> = (args) => <TextAreaComponent {...args} />;

export const TextArea = Template.bind({});

export const Error = Template.bind({});
Error.args = { error: 'Toto pole je povinné!' };
