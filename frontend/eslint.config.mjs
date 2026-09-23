import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import storybook from 'eslint-plugin-storybook';

export default defineConfig([
    globalIgnores([
        '.cache',
        '.next/**',
        'storybook-static/**',
        'out/**',
        'build/**',
        '__generated__',
        'src/relay/__generated__/**',
        '**/node_modules/**',
        'next-env.d.ts',
        '*.config.js',
        '*.config.ts',
    ]),
    ...nextVitals,
    ...nextTs,
    prettierRecommended,
    ...storybook.configs['flat/recommended'],
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            'import/no-anonymous-default-export': 'off',
            'react-hooks/exhaustive-deps': 'off',
            'react-hooks/set-state-in-effect': 'off',
            'react-hooks/incompatible-library': 'off',
        },
    },
]);
