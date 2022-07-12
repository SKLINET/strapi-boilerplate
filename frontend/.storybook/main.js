const webpack = require('webpack');
const sklinet = require('../sklinet.config.json');

module.exports = {
    core: {
        builder: 'webpack5',
    },
    stories: ['../src/**/*.stories.tsx'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                },
                'postcss-loader',
                'sass-loader',
            ],
        });

        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.__NEXT_IMAGE_OPTS': JSON.stringify(sklinet.images),
            }),
        );

        const fileLoaderRule = config.module.rules.find(
            (rule) => rule.test && !Array.isArray(rule.test) && rule.test.test('.svg'),
        );
        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/;
            config.module.rules.push({
                test: /\.svg$/,
                enforce: 'pre',
                loader: require.resolve('@svgr/webpack'),
            });
        }

        return config;
    },
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-controls',
        '@storybook/addon-actions',
        '@storybook/addon-viewport',
        '@storybook/addon-storysource',
        '@storybook/addon-backgrounds',
        '@storybook/addon-a11y',
        'storybook-addon-next-router',
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
    ],
};
