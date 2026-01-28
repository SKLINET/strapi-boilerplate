module.exports = {
    src: './',
    schema: './src/schema/schema.graphql',
    exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
    language: 'typescript',
    artifactDirectory: './src/relay/__generated__',
};
