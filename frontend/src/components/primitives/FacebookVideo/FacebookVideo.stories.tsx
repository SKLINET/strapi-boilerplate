import React from 'react';
import { FacebookVideo as Component, FacebookVideoProps } from './FacebookVideo';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: Component,
    title: 'Primitives/FacebookVideo',
    argTypes: {
        className: { table: { disable: true } },
    },
    args: {
        width: 640,
        height: 480,
        url: 'https%3A%2F%2Fwww.facebook.com%2Fjustinflomofficial%2Fvideos%2F232607608664114%2F',
    },
};

const Template: Story<FacebookVideoProps> = (args) => <Component {...args} />;

export const FacebookVideo = Template.bind({});
