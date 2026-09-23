/// <reference types="next" />
import React from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { Poppins } from 'next/font/google';
import '../src/styles/global.css';

const primary = Poppins({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
    variable: '--font-primary',
    display: 'swap',
});

const preview: Preview = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        controls: {
            matchers: {
                color: /(backgroundColor|background)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: 'white',
            options: {
                white: { name: 'White', value: '#ffffff' },
                grey: { name: 'Grey', value: '#ececec' },
                black: { name: 'Black', value: '#000000' },
            },
        },
        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
        },
        options: {
            storySort: {
                order: ['Blocks', 'Organisms', 'Molecules', 'Primitives'],
            },
        },
    },
    initialGlobals: {
        backgrounds: { value: 'white' },
    },
    decorators: [
        (Story) => {
            document.body.classList.add(primary.variable);
            return React.createElement(Story);
        },
    ],
};

export default preview;
