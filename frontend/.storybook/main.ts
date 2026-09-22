import path from 'node:path';
import type { StorybookConfig } from '@storybook/nextjs-vite';
import svgr from 'vite-plugin-svgr';

const globalCss = path.resolve(process.cwd(), 'src/styles/global.css');

const config: StorybookConfig = {
    stories: ['../src/app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
    framework: {
        name: '@storybook/nextjs-vite',
        options: {
            image: {
                excludeFiles: ['**/*.svg'],
            },
        },
    },
    staticDirs: ['../public'],
    viteFinal: async (config) => {
        // Server actions ('use server') drag the Strapi/Elastic providers into the
        // browser bundle. Swap them for browser-safe stubs so the client
        // components that call them still render.
        config.resolve = config.resolve || {};
        config.resolve.alias = [
            ...(Array.isArray(config.resolve.alias) ? config.resolve.alias : []),
            {
                find: /^.*\/actions\/fetch-articles$/,
                replacement: path.resolve(process.cwd(), 'src/storybook/mocks/fetch-articles.ts'),
            },
        ];

        config.plugins = config.plugins || [];
        config.plugins.push(
            svgr({
                include: '**/*.svg',
                svgrOptions: {
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'preset-default',
                                params: {
                                    overrides: {
                                        removeViewBox: false,
                                    },
                                },
                            },
                        ],
                    },
                },
            }),
        );

        config.css = {
            ...config.css,
            preprocessorOptions: {
                ...config.css?.preprocessorOptions,
                scss: {
                    ...config.css?.preprocessorOptions?.scss,
                    additionalData: `@reference "${globalCss}";`,
                    // @import stays until mixins move to @use; @use cannot follow injected @reference
                    silenceDeprecations: ['import'],
                },
            },
        };

        // Next.js SVGR loads icons from public/; Vite forbids JS imports from publicDir.
        // Storybook already serves public via staticDirs.
        config.publicDir = false;

        return config;
    },
};

export default config;
