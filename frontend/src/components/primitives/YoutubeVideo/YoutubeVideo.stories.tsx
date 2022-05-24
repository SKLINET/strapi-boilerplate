import React from 'react';
import { YoutubeVideo as YoutubeVideoComponent, YoutubeVideoProps } from './YoutubeVideo';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: YoutubeVideoComponent,
    title: 'Primitives/YoutubeVideo',
    argTypes: {
        className: { table: { disable: true } },
    },
    args: {
        width: 640,
        height: 480,
        uid: 'oavMtUWDBTM',
    },
};

const Template: Story<YoutubeVideoProps> = (args) => <YoutubeVideoComponent {...args} />;

export const YoutubeVideo = Template.bind({});
