/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { images } = require('./sklinet.config');
const path = require('path');
const webpack = require('webpack');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const { parsed: myEnv } = require('dotenv').config({
    path: path.join(__dirname, '.env'),
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images,
    experimental: {
        staleTimes: {
            dynamic: 30, // Manually set dynamic route staleTime to 30 seconds
            static: 180,
        },
        webpackMemoryOptimizations: true,
        inlineCss: true,
    },
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
        // config.plugins.push(new webpack.EnvironmentPlugin(myEnv));

        return config;
    },
    eslint: {
        dirs: ['src/app', 'src/lib', 'src/providers', 'src/utils'],
    },
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/sitemap',
            },
            {
                source: '/sitemap/:provider',
                destination: '/sitemap/:provider',
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src https: blob: data: 'unsafe-inline' 'unsafe-eval' http://localhost:3000 ws://localhost:3000  http://localhost:1337 ws://localhost:1337 https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com; frame-ancestors 'self' https://www.<project_name>.cz https://<project_name>.symbio.agency https://admin-<project_name>.symbio.agency;",
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'no-referrer-when-downgrade',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'geolocation=(self "https://www.<project_name>.cz" "https://<project_name>.symbio.agency" "http://localhost:3000"), notifications=(self), push=(self), sync-xhr=(self), speaker=(self), vibrate=(self), fullscreen=(self)',
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

module.exports = withBundleAnalyzer(nextConfig);
