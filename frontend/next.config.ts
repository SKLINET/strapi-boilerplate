import { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { config } from 'dotenv';
import path from 'path';
import { images } from './sklinet.config.json';

type ImageConfig = NonNullable<NextConfig['images']>;
type ImageRemotePattern = NonNullable<ImageConfig['remotePatterns']>[number];
type ImageConfigWithDomains = ImageConfig & { domains?: string[] };

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

config({
    path: path.join(__dirname, '.env'),
});

const createPattern = (protocol: 'http' | 'https', hostname: string, port = ''): ImageRemotePattern => ({
    protocol,
    hostname,
    port,
    pathname: '/**',
});

const toUniquePatternKey = (pattern: ImageRemotePattern): string =>
    `${pattern.protocol ?? ''}|${pattern.hostname}|${pattern.port ?? ''}|${pattern.pathname ?? '/**'}|${pattern.search ?? ''}`;

const parseDomainEntry = (domain: string): ImageRemotePattern[] => {
    const normalizedDomain = domain.trim();
    if (!normalizedDomain) {
        return [];
    }

    const hasProtocol = normalizedDomain.startsWith('http://') || normalizedDomain.startsWith('https://');
    const source = hasProtocol ? normalizedDomain : `https://${normalizedDomain}`;

    try {
        const { protocol, hostname, port } = new URL(source);

        if (hasProtocol) {
            return [createPattern(protocol.replace(':', '') as 'http' | 'https', hostname, port)];
        }

        return [createPattern('https', hostname, port), createPattern('http', hostname, port)];
    } catch {
        return [];
    }
};

const getImagesConfig = (): NextConfig['images'] => {
    const input = images as ImageConfigWithDomains;
    const normalizedPatterns = [
        ...(input.remotePatterns ?? []),
        ...(input.domains ?? []).flatMap(parseDomainEntry),
    ].map((pattern) => ({
        ...pattern,
        pathname: pattern.pathname ?? '/**',
    }));

    const uniquePatterns = Array.from(
        new Map(normalizedPatterns.map((pattern) => [toUniquePatternKey(pattern), pattern])).values(),
    );

    const { domains: _deprecatedDomains, ...imageConfig } = input;

    return {
        ...imageConfig,
        remotePatterns: uniquePatterns,
    };
};

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: getImagesConfig(),
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
        additionalData: `@reference "${path.resolve('./src/styles/global.css')}";`,
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
