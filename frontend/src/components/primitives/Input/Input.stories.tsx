import React from 'react';
import { Input as InputComponent, InputProps } from './Input';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: InputComponent,
    title: 'Primitives/Input',
    args: {
        form: {
            errors: [],
            touched: [],
        },
    },
    argTypes: {
        id: { table: { disable: true } },
        name: { table: { disable: true } },
        form: { table: { disable: true } },
    },
};

const Template: Story<InputProps> = (args) => <InputComponent {...args} />;

export const Input = Template.bind({});
