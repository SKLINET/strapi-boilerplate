import React from 'react';
import { UploadedVideo as UploadedVideoComponent, UploadedVideoI } from './UploadedVideo';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: UploadedVideoComponent,
    title: 'Primitives/UploadedVideo',
    args: {
        objectFit: 'cover',
        objectPosition: 'top',
    },
};

const Template: Story<UploadedVideoI> = (args) => <UploadedVideoComponent {...args} />;

export const UploadedVideo = Template.bind({});
