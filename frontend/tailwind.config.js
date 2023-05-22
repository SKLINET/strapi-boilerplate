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
            colors: {
                secondary: '#ffffff',
                red: '#ff0000',
                error: '#ff0000',
                logo: '#f60',
                white: '#ffffff',
                black: '#000000',
                primary: '#000000',
                grey: '#F2F3F4',
                darkGrey: '#636363',
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
                2.5: '0.625rem',
                3.5: '0.875rem',
                5: '1.25rem',
                5.5: '1.375rem',
            },
            margin: {
                0.25: '0.0625rem',
                0.5: '0.125rem',
            },
            maxHeight: {
                '16-9': '56.25vw',
            },
            maxWidth: {
                120: '30rem',
            },
            padding: {
                '16/9': '56.25%',
                2.5: '0.625rem',
                5: '1.25rem',
            },
            transitionProperty: {
                width: 'width',
                'transform-color': 'transform, color',
            },
            width: {
                2.5: '0.625rem',
                3.5: '0.875rem',
                5: '1.25rem',
                5.5: '1.375rem',
            },
            zIndex: {
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                100: '100',
                9997: '9997',
                9998: '9998',
                9999: '9999',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
