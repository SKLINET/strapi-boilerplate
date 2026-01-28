import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    {
        ignores: [
            '.next/**',
            'node_modules/**',
            'src/relay/__generated__/**',
            '*.config.js',
            '*.config.ts',
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            'prettier/prettier': 'error',
            'import/no-anonymous-default-export': 'off',
            'react-hooks/exhaustive-deps': 'off',
        },
    },
];
