import React from 'react';
import { VimeoVideo as VimeoVideoComponent, VimeoVideoProps } from './VimeoVideo';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: VimeoVideoComponent,
    title: 'Primitives/VimeoVideo',
    argTypes: {
        className: { table: { disable: true } },
    },
    args: {
        width: 640,
        height: 480,
        uid: '10245458',
    },
};

const Template: Story<VimeoVideoProps> = (args) => <VimeoVideoComponent {...args} />;

export const VimeoVideo = Template.bind({});
