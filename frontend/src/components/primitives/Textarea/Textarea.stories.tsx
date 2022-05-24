import React from 'react';
import { Textarea as TextareaComponent, TextareaProps } from './Textarea';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: TextareaComponent,
    title: 'Primitives/Textarea',
    argTypes: {
        id: { table: { disable: true } },
        name: { table: { disable: true } },
        form: { table: { disable: true } },
    },
    args: {
        children: 'I am Textarea',
        form: {
            errors: [],
            touched: [],
        },
    },
};

const Template: Story<TextareaProps> = (args) => <TextareaComponent {...args} />;

export const Textarea = Template.bind({});
