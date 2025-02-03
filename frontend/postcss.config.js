module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-import': {},
        'postcss-flexbugs-fixes': {},
        'postcss-preset-env': {
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
        },
        ...(process.env.NODE_ENV === 'production'
            ? {
                  cssnano: {
                      preset: 'default',
                  },
              }
            : {}),
        ...(process.env.NODE_ENV === 'production'
            ? {
                  '@fullhuman/postcss-purgecss': {
                      content: [
                          './src/app/components/**/*.{js,ts,jsx,tsx}',
                          './src/app/components/**/*.{css,scss}',
                          './src/styles/**/*.{css,scss}',
                          './public/**/*.html',
                      ],
                      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                      safelist: {
                          standard: [
                              /^li:/, // Retain classes starting with "li:"
                              /^Cookie/, // Retain classes starting with "Cookie"
                              /^Cybot/, // Retain classes starting with "Cybot"
                          ],
                      },
                  },
              }
            : {}),
    },
};
