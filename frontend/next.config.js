/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n, images } = require('./sklinet.config');
// const withPWA = require('next-pwa');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    i18n,
    images,
    compiler: {
        relay: {
            src: './',
            language: 'typescript',
        },
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        config.plugins = config.plugins || [];
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
            };
        }
        config.plugins = [...config.plugins];
        // Read the .env file
        config.plugins.push(
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true,
            }),
        );

        return config;
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    // {
                    //     key: 'Content-Security-Policy',
                    //     value: "default-src https: blob: data: 'unsafe-inline' 'unsafe-eval' http://localhost:3000",
                    // },
                    {
                        key: 'Referrer-Policy',
                        value: 'no-referrer-when-downgrade',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'geolocation=(self); notifications=(self); push=(self); sync-xhr=(self); speaker=(self); vibrate=(self); fullscreen=(self)',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                    },
                ],
            },
            {
                source: '/storybook/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                ],
            },
        ];
    },
};

// module.exports = withBundleAnalyzer(withPWA(nextConfig));
module.exports = withBundleAnalyzer(nextConfig);
