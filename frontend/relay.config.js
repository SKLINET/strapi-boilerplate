module.exports = {
    // ...
    // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
    src: './',
    schema: './src/schema/schema.graphql',
    exclude: ['**/.next/**', '**/node_modules/**', '**/test/**', '**/__generated__/**', '**/schema/**'],
    language: 'typescript',
    customScalars: {
        ItemId: 'string',
        BooleanType: 'boolean',
        UploadId: 'string',
        IntType: 'number',
        FloatType: 'number',
        DateTime: 'string',
        SiteLocale: 'string',
    },
};
