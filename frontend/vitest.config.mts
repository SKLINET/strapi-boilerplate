import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const root = path.dirname(fileURLToPath(import.meta.url));

const aliases = [{ find: /^@\//, replacement: `${path.join(root, 'src')}/` }];

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: aliases,
    },
    test: {
        alias: aliases,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            exclude: ['.next/**', 'node_modules/**', '**/__generated__/**'],
        },
        projects: [
            {
                extends: true,
                test: {
                    name: 'node',
                    environment: 'node',
                    include: ['src/**/*.test.ts'],
                    setupFiles: ['./vitest.setup.ts'],
                },
            },
            {
                extends: true,
                test: {
                    name: 'jsdom',
                    environment: 'jsdom',
                    include: ['src/**/*.test.tsx'],
                    setupFiles: ['./vitest.setup.ts', './vitest.setup.dom.ts'],
                },
            },
        ],
    },
});
