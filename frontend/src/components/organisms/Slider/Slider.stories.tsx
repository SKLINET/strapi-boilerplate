import React from 'react';
import { Slider as SliderComponent, SliderProps } from './Slider';
import { Story } from '@storybook/react/types-6-0';
import { Icon } from '../../primitives/Icon/Icon';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    component: SliderComponent,
    title: 'Organisms/Slider',
    args: {},
};

const Template: Story<SliderProps> = (args) => (
    <SliderComponent {...args}>
        <div className="w-80 h-80 bg-rose-500 mr-8" />
        <div className="w-80 h-80 bg-pink-500 mr-8" />
        <div className="w-80 h-80 bg-fuchsia-500 mr-8" />
        <div className="w-80 h-80 bg-purple-500 mr-8" />
        <div className="w-80 h-80 bg-violet-500 mr-8" />
        <div className="w-80 h-80 bg-indigo-500 mr-8" />
        <div className="w-80 h-80 bg-blue-500 mr-8" />
        <div className="w-80 h-80 bg-cyan-500 mr-8" />
        <div className="w-80 h-80 bg-teal-500 mr-8" />
        <div className="w-80 h-80 bg-green-500 mr-8" />
        <div className="w-80 h-80 bg-yellow-500" />
    </SliderComponent>
);

export const Slider = Template.bind({});

export const SliderWithControls = Template.bind({});
SliderWithControls.args = {
    controls: 'top',
    className: 'pt-8',
    sliderClassName: 'pt-8 px-8',
    controlsClassName: 'flex justify-end px-8',
    leftBtnContent: <Icon name="arrowLeft" className="w-8" />,
    leftBtnClassName: 'w-12 h-12 flex items-center justify-center text-center text-lg border border-black mr-4',
    rightBtnContent: <Icon name="arrowRight" className="w-8" />,
    rightBtnClassName: 'w-12 h-12 flex items-center justify-center text-center text-lg border border-black',
};
