import React from 'react';
import { TestForm as TestFormComponent } from './TestForm';
import { Story } from '@storybook/react';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    component: TestFormComponent,
    title: 'Organisms/Form',
    args: {},
};

const Template: Story = (args) => <TestFormComponent {...args} />;

export const CardSlider = Template.bind({});
