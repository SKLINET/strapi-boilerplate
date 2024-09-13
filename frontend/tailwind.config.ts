import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/app/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        screens: {
            'mobile-landscape': '36rem',
            tablet: '48rem',
            'tablet-landscape': '64rem',
            desktop: '80rem',
            'large-desktop': '90rem',
            fullhd: '120rem',
        },
        fontFamily: {
            primary: ['var(--font-primary)'],
        },
        fontSize: {
            32: '2rem',
            24: '1.5rem',
            16: '1rem',
            14: '0.875rem',
        },
        lineHeight: {
            1: '1',
            1.5: '1.5',
        },
        extend: {
            colors: {
                red: '#e41f47',
                black: '#000000',
                white: '#ffffff',
                grey: '#ececec',
                green: '#14BA2F',
                orange: '#ED702D',
            },
            gap: {
                'grid-gap': 'var(--grid-gap)',
            },
            gridColumnEnd: {
                13: '13',
                14: '14',
                15: '15',
                16: '16',
                17: '17',
            },
            height: {
                '56.25vw': '56.25vw',
            },
            margin: {
                //
            },
            maxHeight: {
                '16-9': '56.25vw',
            },
            maxWidth: {
                360: '90rem',
            },
            padding: {
                '16/9': '56.25%',
            },
            spacing: {
                //
            },
            transitionProperty: {
                width: 'width',
                height: 'height',
                'visibility-opacity': 'visibility, opacity',
                'transform-opacity': 'transform, opacity',
            },
            width: {
                //
            },
            zIndex: {
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                100: '100',
                9999: '9999',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

export default config;
