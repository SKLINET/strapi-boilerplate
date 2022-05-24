import React from 'react';
import { Blockquote as BlockquoteComponent, BlockquoteProps } from './Blockquote';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: BlockquoteComponent,
    title: 'Primitives/Blockquote',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am blockquote',
    },
};

const Template: Story<BlockquoteProps> = (args) => <BlockquoteComponent {...args} />;

export const Blockquote = Template.bind({});
