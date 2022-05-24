import React from 'react';
import { GoogleMap as GoogleMapComponent, GoogleMapProps } from './GoogleMap';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: GoogleMapComponent,
    title: 'Primitives/GoogleMap',
    args: {
        latitude: 49.633209,
        longitude: 15.114905,
        isMarkerShown: true,
        bubbleText: 'Zdravim z prdele',
        apiKey: 'AIzaSyAyzEgX9JLR4sJE2BE27ZvnqfexEnlfWjM',
    },
};

const Template: Story<GoogleMapProps> = (args) => <GoogleMapComponent {...args} />;

export const GoogleMap = Template.bind({});
