/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-flexbugs-fixes': {},
        'postcss-preset-env': {
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
            features: {
                'custom-properties': false,
            },
        },
        ...(process.env.NODE_ENV === 'production'
            ? {
                  '@fullhuman/postcss-purgecss': {
                      content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './public/**/*.html'],
                      safelist: [],
                      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                  },
              }
            : {}),
    },
};
