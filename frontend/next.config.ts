import { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { config } from 'dotenv';
import path from 'path';
import { images } from './sklinet.config.json';

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

const { parsed: myEnv } = config({
    path: path.join(__dirname, '.env'),
});

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: images as NextConfig['images'],
    experimental: {
        staleTimes: {
            dynamic: 30, // Manually set dynamic route staleTime to 30 seconds
            static: 180,
        },
        inlineCss: true,
    },
    compiler: {
        relay: {
            src: './',
            language: 'typescript',
        },
    },
    // Turbopack configuration for SVG as React components
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
    // Add @reference directive for CSS modules to access Tailwind utilities
    sassOptions: {
        additionalData: `@reference "${path.resolve('./src/app/globals.css')}";`,
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
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src https: blob: data: 'unsafe-inline' 'unsafe-eval' http://localhost:3000 ws://localhost:3000  http://localhost:1337 ws://localhost:1337 https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com; frame-ancestors 'self' http://localhost:3000 http://localhost:1337 https://www.<project_name>.cz https://<project_name>.symbio.agency https://admin-<project_name>.symbio.agency;",
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

export default bundleAnalyzer(nextConfig);
