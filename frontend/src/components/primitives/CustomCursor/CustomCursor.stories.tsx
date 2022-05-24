import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CustomCursor as CustomCursorComponent } from '../../primitives/CustomCursor/CustomCursor';
import { CustomCursorProvider } from './CustomCursorProvider';
import { DefaultCursor } from '../../cursors/DefaultCursor/DefaultCursor';

export default {
    component: CustomCursorComponent,
    title: 'Primitives/CustomCursor',
    decorators: [
        (StoryFn) => {
            return (
                <CustomCursorProvider>
                    <StoryFn />
                </CustomCursorProvider>
            );
        },
    ],
} as Meta;

const Template: Story = () => (
    <>
        <CustomCursorComponent component={<DefaultCursor />}>
            {(ref) => (
                <p ref={ref}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, delectus ut voluptas dolorum animi
                    sit? Saepe, voluptate <a href="/">asperiores</a> quis deserunt temporibus, voluptatibus eligendi
                    quaerat provident reprehenderit ducimus nisi aperiam harum?
                </p>
            )}
        </CustomCursorComponent>
    </>
);

export const CustomCursor = Template.bind({});
