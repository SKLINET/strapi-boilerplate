import React from 'react';
import { Paragraph as ParagraphComponent, ParagraphProps } from './Paragraph';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: ParagraphComponent,
    title: 'Primitives/Paragraph',
    args: {
        children: 'I am Paragraph',
    },
};

const Template: Story<ParagraphProps> = (args) => <ParagraphComponent {...args} />;

export const Paragraph = Template.bind({});
