import { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { config } from 'dotenv';
import path from 'path';
import sklinetConfig from './sklinet.config.json';
import { ImageConfigComplete } from 'next/dist/shared/lib/image-config';

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

config({
    path: path.join(__dirname, '.env'),
});

const nextConfig: NextConfig = {
    images: sklinetConfig.images as ImageConfigComplete,
    // Next.js 16 Cache Components
    cacheComponents: true,
    // CMS content, settings, redirects and sitemaps all run on `default`. Freshness comes from the
    // tags burned by the Strapi webhook after a publish; the TTL is only a backstop, which is why it
    // is long. `external` stays short for third-party data that has no webhook to invalidate it.
    cacheLife: {
        default: {
            stale: 86400, // 1 day
            revalidate: 2592000, // 30 days
            expire: 31536000, // 1 year
        },
        external: {
            stale: 300, // 5 minutes
            revalidate: 1800, // 30 minutes
            expire: 3600, // 1 hour
        },
    },
    experimental: {
        inlineCss: true,
    },
    reactCompiler: true,
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
        additionalData: `@reference "${path.resolve('./src/styles/global.css')}";`,
        // @import stays until mixins move to @use; @use cannot follow injected @reference
        silenceDeprecations: ['import'],
    },
    async rewrites() {
        return [
            {
                source: '/:file(favicon\\.ico|favicon\\.svg|favicon-96x96\\.png|apple-touch-icon\\.png|site\\.webmanifest|web-app-manifest-(?:192x192|512x512)\\.png)',
                destination: '/favicon/:file',
            },
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
