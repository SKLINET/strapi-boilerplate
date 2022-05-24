const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/blocks/**/*.{js,ts,jsx,tsx}',
    ],
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
        extend: {
            maxHeight: {
                '16-9': '56.25vw',
            },
            gridColumnEnd: {
                13: '13',
                14: '14',
                15: '15',
                16: '16',
                17: '17',
            },
            transitionProperty: {
                width: 'width',
            },
            colors: {
                secondary: '#fff',
                red: '#ff0000',
                error: '#ff0000',
                logo: '#f60',
                primary: '#000',
            },
            zIndex: {
                9999: '9999',
            },
            padding: {
                '16/9': '56.25%',
            },
            height: {
                '56.25vw': '56.25vw',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [lineClamp],
};
