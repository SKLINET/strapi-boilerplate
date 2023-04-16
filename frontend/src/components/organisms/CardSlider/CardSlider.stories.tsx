import React from 'react';
import { CardSlider as CardSliderComponent, CardSliderProps } from './CardSlider';
import { Story } from '@storybook/react';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    component: CardSliderComponent,
    title: 'Organisms/CardSlider',
    args: {
        data: [
            {
                id: 1,
                title: 'Nadpis 1',
                description: 'text text text ...',
            },
            {
                id: 2,
                title: 'Nadpis 2',
                description: 'text text text ...',
            },
            {
                id: 3,
                title: 'Nadpis 3',
                description: 'text text text ...',
            },
            {
                id: 4,
                title: 'Nadpis 4',
                description: 'text text text ...',
            },
            {
                id: 5,
                title: 'Nadpis 5',
                description: 'text text text ...',
            },
            {
                id: 6,
                title: 'Nadpis 6',
                description: 'text text text ...',
            },
            {
                id: 7,
                title: 'Nadpis 7',
                description: 'text text text ...',
            },
            {
                id: 8,
                title: 'Nadpis 8',
                description: 'text text text ...',
            },
        ],
    },
};

const Template: Story<CardSliderProps> = (args) => <CardSliderComponent {...args} />;

export const CardSlider = Template.bind({});
