import React from 'react';
import { Carousel as CarouselComponent, CarouselProps, TextAlignCms } from './Carousel';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: CarouselComponent,
    title: 'Organisms/Carousel',
    argTypes: {
        textAlign: 'vlevo',
    },
    args: {
        banners: [
            {
                id: '4540835',
                image: {
                    id: '1621273',
                    url: 'https://www.datocms-assets.com/20999/1586567450-passat1.jpg',
                    responsiveImage: {
                        srcSet: 'https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=0.25 816w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=0.5 1632w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=0.75 2448w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg 3264w',
                        webpSrcSet:
                            'https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=0.25&fm=webp 816w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=0.5&fm=webp 1632w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=0.75&fm=webp 2448w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?fm=webp 3264w',
                        sizes: '(max-width: 3264px) 100vw, 3264px',
                        src: 'https://www.datocms-assets.com/20999/1586567450-passat1.jpg',
                        width: 3264,
                        height: 2448,
                        aspectRatio: 1.3333333333333333,
                        alt: 'Nabouraný VW Passat',
                        title: null,
                        base64: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoSCAgLFQoXDhgQDg0NFx0VFhEWJh0ZGCgmGh4mHysvHR0oHRUWJDUlNC0vMkoyGSI4PTcwUi0xMi8BCgsLDg0OHBAQHDsoIigvLy80Oy81LzU7Oy8vLy8vLy87Ly8vLy8yMC8vMi8vLy8vLzUvLzUvLy81Ly8vLy8vL//AABEIABIAGAMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAABQEGB//EACEQAAEDBAIDAQAAAAAAAAAAAAEAAgMEBREhMTISFDMT/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgME/8QAGhEBAQACAwAAAAAAAAAAAAAAAQAiMQISE//aAAwDAQACEQMRAD8Aslbco2MOSEpZfoBL3CSXuom9Z3gTnCodM64yV2nv53lDqLaDhgttkF+gDewQs1aK4RjDipT8yiM7uvyKQ0YH7nQ5UIQNVWeNA8BpCEJlO//Z',
                    },
                },
                video: null,
                headline: 'Slušně zbouraný auto',
                description: '',
                textAlign: 'vpravo',
            },
        ],
    },
};

const Template: Story<CarouselProps> = (args) => <CarouselComponent {...args} />;

export const Carousel = Template.bind({});
